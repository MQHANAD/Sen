const axios = require("axios");
const fs = require("fs");

const image = fs.readFileSync("original.jpg", {
    encoding: "base64"
});

axios({
    method: "POST",
    url: "https://detect.roboflow.com/yolov5-obj-ddt/2",
    params: {
        api_key: "Z1CEAq9PSHWL5SIYvE46"
    },
    data: image,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
.then(function(response) {
    console.log(response.data);
})
.catch(function(error) {
    console.log(error.message);
});