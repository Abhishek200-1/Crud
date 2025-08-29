import React from 'react'
import { useState } from 'react'
import './User.css'
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const User = () => {
 
    const [user, setUser] = useState([]);

    useEffect(() => {
       const fetchData =    async () => {       
        try {
            const response = await axios.get('http://localhost:3000/api/users');
            setUser(response.data);
           } catch (error) {
               console.error('Error fetching user data:', error);
           }
       };
       fetchData();        
    },[]);

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:3000/api/users/${id}`)
        .then((response) => {       
            console.log("User deleted successfully:", response.data);
            setUser((prevUsers) => prevUsers.filter((user) => user._id !== id));
        })
        .catch((error) => {     
            console.error("Error deleting user:", error);
        }
        );  
    };


  return (
    <>  
        <div className="container">
            <h2 style={{ textAlign: 'center', margin: '20px 0' }}>User Details</h2>
            <div className="addUserBtn">
                <Link to="/addUser" type="button" className="btn btn-primary">Add new user</Link>
            </div>

            <div className="user-container">
                {user.map((user) => (
                <div className="user-card" key={user._id}>
                    <h3><strong>Name :</strong> {user.name}</h3>
                    <p><strong>Email :</strong> {user.email}</p>
                    <p><strong>Age :</strong> {user.age}</p>
                    <p><strong>Gender :</strong> {user.gender}</p>
                    <p><strong>Hobby :</strong> {user.hobby}</p>

                    <div className="btn-group">
                        <Link to={'/update/'+ user._id} type='button' class="btn btn-info">Edit</Link>
                        <button style={{marginLeft:"10px"}} onClick={() => deleteUser(user._id)} type='button' class="btn btn-danger">Delete</button>
                    </div>
                </div>
                ))}
            </div>
            {user.length === 0 && <h3 style={{textAlign: "center", marginTop: "20px"}}>No users found</h3>}
        </div>
    </>
)}

export default User
