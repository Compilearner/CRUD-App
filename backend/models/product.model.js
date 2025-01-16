import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type:String,
        required: true
    },
}, {timestamps:true}); // Adds two fields automatically to schema : createdAt , updatedAt to track the creation time of document and last updated time 

// Creating a Model 
const Product = mongoose.model('Product', productSchema);  // Collection

export default Product;