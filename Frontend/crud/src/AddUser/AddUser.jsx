import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './AddUser.css';

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    let errs = {};
    if (!name) errs.name = "Name is required";
    if (!email) errs.email = "Email is required";
    if (!age) errs.age = "Age is required";
    else if (age < 18) errs.age = "Age must be 18+";
    if (!gender) errs.gender = "Select your gender";
    if (hobbies.length === 0) errs.hobbies = "Select at least one hobby";

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      await axios.post("http://localhost:3000/api/users", { name, email, age, gender, hobbies });
      alert("User added successfully!");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckbox = (value, checked) => {
    if (checked) setHobbies([...hobbies, value]);
    else setHobbies(hobbies.filter(hobby => hobby !== value));
  };

  return (
    <div className="addUser">
      <Link to="/" className="btnBack">Go Back</Link>
      <h3>Add New User</h3>

      <form className="addUserForm" onSubmit={submitForm}>
        <div className="userInput">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <div className="text-danger">{errors.name}</div>}

          <label>Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <div className="text-danger">{errors.email}</div>}

          <label>Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          {errors.age && <div className="text-danger">{errors.age}</div>}

          <label>Select Gender</label>
          <div className="radioGroup">
            <label>
              <input type="radio" value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)} /> Male
            </label>
            <label>
              <input type="radio" value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} /> Female
            </label>
          </div>
          {errors.gender && <div className="text-danger">{errors.gender}</div>}

          <label>Select Hobbies</label>
          <div className="checkboxGroup">
            <label>
              <input type="checkbox" value="Reading" checked={hobbies.includes("Reading")} onChange={(e) => handleCheckbox("Reading", e.target.checked)} /> Reading
            </label>
            <label>
              <input type="checkbox" value="Sports" checked={hobbies.includes("Sports")} onChange={(e) => handleCheckbox("Sports", e.target.checked)} /> Sports
            </label>
            <label>
              <input type="checkbox" value="Music" checked={hobbies.includes("Music")} onChange={(e) => handleCheckbox("Music", e.target.checked)} /> Music
            </label>
          </div>
          {errors.hobbies && <div className="text-danger">{errors.hobbies}</div>}
        </div>

        <button className="btnSubmit" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUser;
