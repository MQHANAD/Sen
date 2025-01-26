const YourModel = require("./models/doctor")

async function getAllDoctors() {
    try {
        const Doctors = await YourModel.find({});
        return Doctors;
    } catch (err) {
        console.error('Error:', err);
    } 
}
module.exports = getAllDoctors