import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import OrderModel from "../models/OrderModel.js";
import userModel from "../models/userModel.js";
import validator from "validator";
import nodemailer from "nodemailer";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import Otp from "../models/OtpModel.js";

export const registerController = async (req,res) => { 
    try{
        let {name,email,password,phone,address} = req.body;

        // Validate required fields in one go
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({
            success: false,
            message: "All fields are required",
            });
        }

        // 2. Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        } 

        // 3. Password strength validation (at least 6 characters, include number)
        if (password.length < 6 || !/\d/.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long and contain a number",
            });
        }

        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(409).json({
                success: false,
                message: "User already registered, please login!"
            });
        }
        const hashedPassword = await hashPassword(password);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            address: address,
            phone: phone,
            // answer:answer
        });

        await newUser.save();

        const token = generateTokenAndSetCookie(res, newUser._id);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                address: newUser.address,
            },
            token,
        });

    }catch(error) {
        // console.log("Error during register User ",error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error: error.message,
        });
    }

} 

export const loginController = async (req,res) =>{
    try{
        let {email,password} = req.body;
        
        if(!email || !password){
            return res.status(400).send({
                success: false,
                message: "Please enter email or password"
            });
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(401).send({
                success: false,
                message: "email or password incorrect"
            });
        }

        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(401).send({
                success: false,
                message: "Email or password incorrect"
            });
        }

        const token = generateTokenAndSetCookie(res, user._id);
        res.status(200).json({
            success: true,
            message: "Login successfully",
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone,
                role: user.role,
            },
            token,
        });

    }catch(error){
        // console.log("Error during Login User",error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error:error.message,
        });
    }
} 

export const checkAuth = async (req,res) => {
    try {
        const userId = req.user.id;
        // console.log("User Check auth",req.user);
        const user = await userModel.findById(userId).select("-password");
        // console.log("User",user);
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            ok: true,
            user,
            token: req.cookies.token,
        });
    } catch (error) {
        // console.error("Error during User authentication:",error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const emailSendController = async (req,res) => {
    try {
        const {email} = req.body;
        // console.log("Email received for OTP: ", email);

        if(!email){
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        const user = await userModel.findOne({email});
        // console.log("User found: ", user);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "Email is not registered",
            });
        }

        const otpCode = Math.floor(100000 + Math.random() * 900000);

        const otpData = new Otp({
            email: email,
            otp: otpCode,
            expireIn: Date.now() + 5 * 60 * 1000 // OTP valid for 10 minutes
        });

        await otpData.save();

        mailer(email, otpCode);
        return res.status(200).json({
            success: true,
            message: "OTP sent to your email",
        });
    } catch (error) {
        // console.log("Error during sending email ",error);
        res.status(500).json({
            success: false,
            message: "Error in sending email",
            error: error.message,
        })
    }
}

export const resetPasswordController = async (req,res) => {
    try {
        const {email, otp,confirmPassword} = req.body;
        const newPassword = confirmPassword;

        if(!email || !otp || !newPassword){
            return res.status(400).json({
                success: false,
                message: "Email, OTP and new password are required",
            });
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        if(newPassword.length < 6 || !/\d/.test(newPassword)){
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long and contain a number",
            });
        }

        const data = await Otp.findOne({email, otp});
        if(!data){
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }   

        let currentTime = new Date().getTime();
        const diff = data.expireIn - currentTime;
        if(diff < 0){
            await Otp.deleteMany({email: email});
            return res.status(400).json({
                success: false,
                message: "OTP Expired",
            })
        } else{
            const user = await userModel.findOne({email});
            user.password = await hashPassword(newPassword);
            await user.save();
            return res.status(200).json({
                success: true,
                message: "Password Reset Successfully",
            });
        }
    } catch (error) {
        // console.log("Error during resetPassword ",error);
        return res.status(500).json({
            success: false,
            message: "Error in reset password",
            error: error.message,
        });
    }
}

const mailer = (email, otpCode) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions ={
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset OTP',
        text: "Your OTP code for password reset is: " + otpCode + ". It is valid for 5 minutes.",
    }

    // transporter.sendMail(mailOptions, function(error,info){
    //     if(error){
    //         console.log("Error sending email ",error);
    //     }else{
    //         console.log("Email sent: " + info.response);
    //     }
    // })
    transporter.sendMail(mailOptions);
}
 
export const updateProfileController = async (req,res) => {
    try {
        const {name,password,phone,address} = req.body;
        const user = await userModel.findById(req.user.id);

        if(password && password.length < 6){
            return res.json({error: "Password is Required and must be 6 characters long"});
        }

        const hashedPassword = password ? await hashPassword(password) : undefined;

        const updatedUser = await userModel.findByIdAndUpdate(req.user.id,{
            name : name || user.name,
            password : hashedPassword || user.password,
            phone : phone || user.phone,
            address: address || user.address
        },
        {new: true});
        res.status(200).send({
            success: true,
            message: "Profile Updated successfully",
            updatedUser,
        });
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating User Profile",
            error,
        });
    }
}
export const updateAdminProfileController = async (req,res) => {
    try {
        const {name,password,phone,address} = req.body;
        const user = await userModel.findById(req.user.id);

        if(password && password.length < 6){
            return res.json({error: "Password is Required and must be 6 characters long"});
        }

        const hashedPassword = password ? await hashPassword(password) : undefined;

        const updatedUser = await userModel.findByIdAndUpdate(req.user.id,{
            name : name || user.name,
            password : hashedPassword || user.password,
            phone : phone || user.phone,
            address: address || user.address
        },
        {new: true});
        res.status(200).send({
            success: true,
            message: "Profile Updated successfully",
            updatedUser,
        });
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating User Profile",
            error,
        });
    }
}


export const getOrdersController = async (req,res) => {
    try {
        const orders = await OrderModel.find({buyer:req.user.id}).populate("products","-photo").populate("buyer","name");
        res.json(orders);
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting Orders",
            error,
        });
    }
}

export const getAllOrdersController = async (req,res) => {
    try {
        const orders = await OrderModel.find({}).populate("products","-photo").populate("buyer","name").sort({createdAt: -1});
        // console.log("Get All Orders",orders);
        res.json(orders);
    } catch (error) {
        console.log(error); 
        res.status(500).send({
            success: false,
            message: "Error while getting Orders",
            error,
        }); 
    }
}


export const orderController = async (req,res) =>{
    try {
        let {cart} = req.body;
        let total = 0;
        cart.map((i) => {
            return total += i.price; 
        });

        const order = await new OrderModel({
            products: cart,
            payment:total,
            buyer: req.user.id
        }).save();
        res.json({ok:true});
    } catch (error) { 
        // console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while creating order",
            error,
        });
    }
}


export const orderStatusController = async (req,res) => {
    try {
        const {orderId} = req.params;
        const {status} = req.body;
        const orders = await OrderModel.findByIdAndUpdate(orderId,{status},{new:true});
        res.json(orders);
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating Order Status",
            error,
        });
    }
}