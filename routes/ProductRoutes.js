import express from "express"
import formidable from "express-formidable";

import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import { categoryProductController,createProductController, deleteProductController, getAllProductsController, getSingleProductController, productCountController, productFilterController, productListController, productPhotoController, relatedProductsController, searchProductController, updateProductController,createCheckoutSessionController } from "../controllers/ProductControllers.js";
import { orderStatusController } from "../controllers/authController.js";
const router = express.Router();
 
// CREATE PRODUCT ROUTE
router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController);

// UPDATE PRODUCT ROUTE
router.put("/update-product/:id",requireSignIn,isAdmin,formidable(),updateProductController);

// GET ALL PRODUCTS ROUTE
router.get("/all-products",getAllProductsController);

// GET SINGLE PRODUCT ROUTE
router.get("/single-product/:slug",getSingleProductController);

// PRODUCT PHOTO ROUTE
router.get("/product-photo/:id",productPhotoController);

router.delete("/delete-product/:id",requireSignIn,isAdmin,deleteProductController);

// PRODUCT FILTERS
router.post("/product-filters",productFilterController);

// PRODUCT COUNT 
router.get("/product-count",productCountController);

// PRODUCTS PER PAGE ROUTE
router.get("/product-list/:page",productListController);

// SEARCH PRODUCTS 
router.get("/search/:keyword",searchProductController);

// SIMILAR PRODUCTS 
router.get("/related-products/:pId/:cId",relatedProductsController);

// CATEGORY PRODUCT ROUTE
router.get("/category-product/:slug",categoryProductController);

router.post("/create-checkout-session",createCheckoutSessionController);

router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController);
export default router;