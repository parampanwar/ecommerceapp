"use client"; // help to run code on client side
import { useState } from 'react'; // keeps track of form data
import axios from 'axios'  // to make http request to fastapi server
import './FormComponent.css'; 
import LoginComponent from './LoginComponent';
import Link from 'next/link';

// User registration page  
import React, { useEffect } from 'react';

const FormComponent = ()=>{
    useEffect(() => {
        document.title = 'User Registration';
      }, []);
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        address:''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({   // setFormData = update the state with new value
            ...prevData,
            [name]:value
        }));
};

    const handleSubmit = async (e) => {
        e.preventDefault();    // prevents page reload when form is submitted
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:8000/users/', formData);
            console.log('Data Saved', response.data);
            setSubmitted(true);
            setFormData({name:'', email:'',password:'', address:''});

        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.detail);  // Set error message
            } else {
                console.error('Error submitting the form', error);
            }
        } finally {
            setLoading(false); 
        }
};
return(
    <div className="formclass">
  
    <form onSubmit={handleSubmit}>
        <h1>User Registration</h1>
        <div>
            <label htmlFor="name">Name </label>
            <input 
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <label htmlFor="email">Email </label>
            <input 
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <label htmlFor="password">Password </label>
            <input 
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <label htmlFor="address">Address </label>
            <input 
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
            />
        </div>
        <button type="submit" disabled={loading}>{'Submit'}</button>
            {submitted && <p className="success-message">Form submitted successfully!</p>} 
            {error && <p className="error-message">{error}</p>}  
        
        <p>Already Have an Account! <Link href="/login">Login</Link></p>
        
    </form>
    
    </div>
);
};

export default FormComponent; // creates the form in react that sends data to server
