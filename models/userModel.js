import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, "Username is required"],
        minlength: [3, "Username must be at least 3 characters long"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        trim: true,
    },
    phone: {
        type: Number,
        required: [true, "Phone number is required"],
        minlength: [10, "Phone number must be at least 10 digits long"],
    },
    address: {
        type: String,
        required: [true, "Address is required"],

    },
    role: {
        type: Number,
        default: 0
    }
},{timestamps: true});


export default mongoose.model("User",userSchema);