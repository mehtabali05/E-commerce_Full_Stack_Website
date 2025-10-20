import mongoose from 'mongoose';
const { Schema } = mongoose;

const otpSchema = new Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expireIn: { type: Number, required: true },
}, { timestamps: true });

const Otp = mongoose.model('Otp', otpSchema,'Otp');
export default Otp;