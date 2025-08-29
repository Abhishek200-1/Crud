import mongoose from "mongoose";        

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true,
        unique: true 
    },      
    age: { 
        type: Number, 
        required: true 
    },
    gender: { 
        type: String       
    },
    hobby: { 
        type: [String]    
    }
}); 

export default mongoose.model("User", userSchema);