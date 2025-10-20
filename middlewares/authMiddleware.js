import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// PROTECTED ROUTES TOKEN BASE
export const requireSignIn = (req,res,next) =>{

    try {
        const token = req.cookies?.token ;

        // console.log("User Token ",token);

        if (!token && req.headers.authorization) {
            token = req.headers.authorization.replace("Bearer ", "");
          }

        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            }); 
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        // console.log("Decoded user ",decoded);
        req.user = decoded;  
        next();
    } catch (error) {
        // console.log("Error in authUser middleware:",error);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
              success: false,
              message: "Session expired. Please log in again.",
            });
        }
       
        return res.status(401).json({
            success: false,
            message: "Unauthorized access. Please log in again.",
        });
    }
}
 
// ADMIN ACCESS
export const isAdmin = async (req,res,next) =>{
    try{
        const user = await userModel.findById(req.user.id);
        // console.log("Admin middleware user ",user);
        if(user.role !== 1){
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access"
            });
        }else{
            next();
        }
    }catch(error){
        // console.error(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middleware"
        })
    }
}