const express = require("express");
const User = require("./models/user");
const Doctor = require("./models/doctor");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = "M1M2W8";
const getAllDocuments = require("./products")
const getAllDoctors = require("./doctors")
const diagnose = require("./Diagnose")
const multer = require('multer');

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.urlencoded({ extended: true })); // For form-encoded payloads
app.use(express.json());
const upload = multer({ dest: 'uploads/' }); 

// Middleware to verify token
const authenticateToken = (req, res, next) => {
   const token = req.headers["authorization"]?.split(" ")[1]; // Get the token from the header
   if (!token) return res.status(401).json({ error: "Token is required" });

   try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // Attach the decoded payload to the request
      next(); // Pass control to the next middleware or route handler
   } catch (err) {
      res.status(403).json({ error: "Invalid or expired token" });
   }
};

//-----------------------------sign up ---------------/


// Route to create a user
app.post("/createUser", async (req, res) => {
   try {
      const { email, username, fullName, hashedPassword } = req.body;
      // Debug: Log req.body to ensure data is received
      if (!email || !username || !fullName || !hashedPassword) {
         return res.status(400).send({ error: "All fields are required." });
      }
      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
         return res.status(400).json({ error: "Email is already in use." });
      }

      const existingUserByUsername = await User.findOne({ username });
      if (existingUserByUsername) {
         return res.status(400).json({ error: "Username is already taken." });
      }
      const existingDocByEmail = await Doctor.findOne({ email });
      if (existingDocByEmail) {
         return res.status(400).json({ error: "Email is already in use." });
      }

      const existingDocByUsername = await Doctor.findOne({ username });
      if (existingDocByUsername) {
         return res.status(400).json({ error: "Username is already taken." });
      }
      const salt = bcrypt.genSaltSync(10);
      const password = req.body.hashedPassword;
      const hashedPassword1 = bcrypt.hashSync(password, salt);

      const user = new User({
         email: req.body.email,
         username: req.body.username,
         avatar: "https://cdn1.iconfinder.com/data/icons/people-cultures/512/_saudi_arabian_man-1024.png",
         fullName: req.body.fullName,
         isDoc: false,
         hashedPassword: hashedPassword1,
      });

      await user.save();
      res.status(201).send({ message: "User was saved successfully." });
   } catch (err) {
      res.status(500).send({ error: "Failed to create user. Please try again." });
   }
});

// Route to create a doctor
app.post("/createDoc", async (req, res) => {
   try {
      const { email, username, fullName, hashedPassword } = req.body;
      if (!email || !username || !fullName || !hashedPassword) {
         return res.status(400).send({ error: "All fields are required." });
      }
      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
         return res.status(400).json({ error: "Email is already in use." });
      }
      const existingUserByUsername = await User.findOne({ username });
      if (existingUserByUsername) {
         return res.status(400).json({ error: "Username is already taken." });
      }
      const existingDocByEmail = await Doctor.findOne({ email });
      if (existingDocByEmail) {
         return res.status(400).json({ error: "Email is already in use." });
      }

      const existingDocByUsername = await Doctor.findOne({ username });
      if (existingDocByUsername) {
         return res.status(400).json({ error: "Username is already taken." });
      }

      const salt = bcrypt.genSaltSync(10);
      const password = req.body.hashedPassword;
      const hashedPassword1 = bcrypt.hashSync(password, salt);

      const doctor = new Doctor({
         email: req.body.email,
         username: req.body.username,
         avatar: "https://example.com/default-avatar.png",
         fullName: req.body.fullName,
         isDoc: true,
         hashedPassword: hashedPassword1, // Store the password as is (no hashing)
      });
      await doctor.save();
      res.status(201).send({ message: "Doctor was saved successfully." });
   } catch (err) {
      res.status(500).send({ error: "Failed to create doctor. Please try again." });
   }
});

//-------------------------------------------------------//
//--------------------sign in -------------------------
app.post("/signin", async (req, res) => {
   try {
      const { email, password } = req.body;
      // Validate input
      if (!email || !password) {
         return res.status(400).json({ error: "Email and password are required." });
      }
      // Find user by email
      let user = await User.findOne({ email });
      if (!user) {
         user = await Doctor.findOne({ email });
         if (!user) {
            return res.status(401).json({ error: "Invalid email or password." });
         }
      }
      // Compare raw passwords
      const isMatch = bcrypt.compareSync(password, user.hashedPassword);
      if (!isMatch) {//not hashed
         return res.status(401).json({ error: "Invalid email or password." });
      }
      // Return user info
      const token = jwt.sign({ hashedPassword: user.hashedPassword, email: email }, JWT_SECRET);

      res.status(200).json({ token, message: "Login successful" });
   } catch (err) {
      console.error("Error during sign-in:", err);
      res.status(500).json({ error: "Internal server error." });
   }
});

// Route to access protected data
app.get("/api/products", async (req, res) => {
   res.json({ array: await getAllDocuments()});
});
app.get("/api/doctors", async (req, res) => {
   res.json({ array: await getAllDoctors()});
});

app.post('/api/diagnose', upload.single('file'), async (req, res) => {
   try {
     const filePath = req.file.path; // Path to the uploaded file
     console.log('Uploaded File Path:', filePath);
     // Pass filePath to your `diagnose` function
     const result = await diagnose(filePath);
     res.json(result);
   } catch (error) {
     console.error('Error processing image:', error);
     res.status(500).json({ error: 'Failed to process the image' });
   }
 });

// app.get("/api/diagnose", async (req, res) => {
//    const { uri } = req.query;
 
//    if (!uri) {
//      return res.status(400).json({ error: "Missing 'uri' query parameter" });
//    }
 
//    try {
//      // Remove 'file://' prefix if it exists
//      const sanitizedUri = uri.startsWith("file://") ? uri.replace("file://", "") : uri;
 
//      // Use the sanitized path for further processing
//      const result = await diagnose(sanitizedUri); // Assuming diagnose reads/processes the file
//      res.json(result);
//    } catch (error) {
//      console.error("Failed to process the image:", error);
//      res.status(500).json({ error: "Failed to read or process the image" });
//    }
//  });
 


// Start the server
app.listen(3002, () => {
   console.log("Server is listening on port 3002");
});
