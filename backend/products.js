const YourModel = require("./models/product")

async function getAllDocuments() {
    try {
        const documents = await YourModel.find({});
        return documents;
    } catch (err) {
        console.error('Error:', err);
    } 
}
module.exports = getAllDocuments