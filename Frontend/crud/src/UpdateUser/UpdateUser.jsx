import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './UpdateUser.css';

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    hobby: []
  });

  useEffect (() => { 
    axios
    .get(`http://localhost:3000/api/users/${id}`) 
    .then((response) => { setUser(response.data); }) 
    .catch((error) => { console.error("Error fetching user data:", error); }); 
    }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/users/${id}`, user);
      alert("User updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const handleCheckbox = (value, checked) => {
    if (checked) setUser({ ...user, hobby: [...user.hobby, value] });
    else setUser({ ...user, hobby: user.hobby.filter(hobby => hobby !== value) });
  };

  return (
    <div className='addUser'>
      <Link to="/" className='btnBack'>Go Back</Link>
      <h3>Update User</h3>

      <form className='addUserForm' onSubmit={submitForm}>
        <div className="userInput">
          <label>Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

          <label>Email</label>
          <input
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <label>Age</label>
          <input
            type="number"
            value={user.age}
            onChange={(e) => setUser({ ...user, age: e.target.value })}
          />

          <label>Choose Gender</label>
          <div className="radioGroup">
            <label>
              <input
                type="radio"
                value="Male"
                checked={user.gender === "Male"}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
              /> Male
            </label>
            <label>
              <input
                type="radio"
                value="Female"
                checked={user.gender === "Female"}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
              /> Female
            </label>
            <label>
              <input
                type="radio"
                value="Other"
                checked={user.gender === "Other"}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
              /> Other
            </label>
          </div>

          <label>Select Hobbies</label>
          <div className="checkboxGroup">
            <label>
              <input
                type="checkbox"
                value="Reading"
                checked={user.hobby.includes("Reading")}
                onChange={(e) => handleCheckbox("Reading", e.target.checked)}
              /> Reading
            </label>
            <label>
              <input
                type="checkbox"
                value="Sports"
                checked={user.hobby.includes("Sports")}
                onChange={(e) => handleCheckbox("Sports", e.target.checked)}
              /> Sports
            </label>
            <label>
              <input
                type="checkbox"
                value="Music"
                checked={user.hobby.includes("Music")}
                onChange={(e) => handleCheckbox("Music", e.target.checked)}
              /> Music
            </label>
          </div>
        </div>

        <button className='btnSubmit' type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default UpdateUser;
