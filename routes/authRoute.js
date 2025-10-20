import express from 'express';
import { registerController,loginController,updateProfileController, getOrdersController, orderController, getAllOrdersController, emailSendController, resetPasswordController, checkAuth, updateAdminProfileController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';

const router = express.Router();

// REGISTER || POST METHOD
router.post("/register",registerController) 

// LOGIN || POST METHOD 
router.post("/login",loginController);  

// FORGOT PASSWORD
router.post("/email-send",emailSendController);
router.post("/change-password",resetPasswordController); 


// PROTECTED ROUTE FOR AUTHENTICATED USER
router.get("/user-auth",requireSignIn,checkAuth);

// PROTECTED ROUTE FOR AUTHENTICATED ADMIN
router.get("/admin-auth",requireSignIn,isAdmin,(req,res) =>{
    res.status(200).send({ok:true});
})

router.put("/profile",requireSignIn,updateProfileController);

router.put("/admin-profile",requireSignIn,isAdmin,updateAdminProfileController);

// Orders Route 
router.get("/orders",requireSignIn,getOrdersController);

router.get("/all-orders",requireSignIn,isAdmin,getAllOrdersController);

router.post("/orders",requireSignIn,orderController);

export default router;