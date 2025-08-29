import  express from "express";
import { createUser, getUsers, getUserById, updateUser, deleteUser } from "../Controller/userController.js";   


const router = express.Router();
 

// Create a new user    
router.post("/users", createUser);
// Get all users
router.get("/users", getUsers); 
// Get a user by ID
router.get("/users/:id", getUserById);  
// Update a user by ID
router.put("/users/:id", updateUser);
// Delete a user by ID
router.delete("/users/:id", deleteUser);    

export default router;  

    