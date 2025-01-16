import express from "express";
import { createProduct, deleteProduct, updateProduct, getProducts } from "../controller/product.controller.js";

const router = express.Router();

// Get All Products from database
router.get("/", getProducts);

// Create New Products
router.post("/", createProduct);

// Delete Product using default database ID
router.delete("/:id", deleteProduct);

// Update Product using its Default database ID
router.put("/:id" , updateProduct);

export default router; // Ensure you export the router