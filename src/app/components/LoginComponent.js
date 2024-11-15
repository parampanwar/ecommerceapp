"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'; // Ensure React is imported
import { useRouter } from 'next/navigation'; 
import axios from 'axios'; 
import './LoginComponent.css'; 

import UserDetails from './UserDetails'

const LoginComponent = () => {
    useEffect(() => {
        document.title = 'Login';
    }, []);
      
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(''); // Added state for error message
    const router = useRouter(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Reset error before making a new request
       
        try {
            const response = await axios.post('http://localhost:8000/login', formData);
            console.log('Logged In:', response.data);
            setIsLoggedIn(true); // Show FormComponents after login
            router.push('/users'); // Redirect to the users page
        } catch (error) {
            setError('Invalid email or password'); // Set error message on failed login
        } finally {
            setLoading(false);
        }
    };

    if (isLoggedIn) {
        return <UserDetails />;
    }

    return (
        <div className="formclass">
            <form onSubmit={handleSubmit}>
                <div>
                    <p className='loginp'>Login Here</p>
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
                <button type="submit" disabled={loading}>{'Login'}</button>
                {error && <p className="error-message">{error}</p>} {/* Display error message */}
            </form>
        </div>
    );
};
export default LoginComponent;
