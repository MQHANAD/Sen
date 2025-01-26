const db = require("../db");

const ProductSchema = new db.Schema( {
  productName:   String,   // Name of the product
  description:   String,   // Description of the product
  price:         Number,   // Price of the product
  picture:       String,  
});
const Product = db.model("Product", ProductSchema, "product");

module.exports = Product;
