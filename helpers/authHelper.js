import bcrypt from 'bcrypt';
import { toast } from 'react-hot-toast';

export const hashPassword = async (password) =>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        return hashedPassword;
    }catch(err){
        toast.error("Error in hashing password");
    }
}


export const comparePassword = (password,hashedPassword) =>{
    return bcrypt.compare(password,hashedPassword);
}