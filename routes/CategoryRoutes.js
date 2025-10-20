import express from "express";
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import { createCategoryController, updateCategoryController,categoryController, singleCategoryController, deleteCategoryController } from "../controllers/CategoryControllers.js";
const router = express.Router();

// GET ALL CATEGORY 
router.get("/all-category",categoryController);

// GET SINGLE CATEGORY
router.get("/single-category/:slug",singleCategoryController);

// CREATE CATEGORY ROUTE
router.post("/create-category",requireSignIn,isAdmin,createCategoryController); 

// UPDATE CATEGORY ROUTE
router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController);

// DELETE SINGLE CATEGORY
router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryController);

export default router;