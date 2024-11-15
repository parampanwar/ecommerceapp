"use client";
import { useState } from 'react'; 
import { useRouter } from 'next/navigation'; 
import axios from 'axios'; 
import './LoginComponent.css'; 
import FormComponents from './FormComponents';
import UserDetails from './UserDetails'
import React, { useEffect } from 'react';
const LoginComponent = () => {
    useEffect(() => {
        document.title = 'Login';
      }, []);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:8000/login', formData);
            console.log('Logged In:', response.data);
            setIsLoggedIn(true); // Show FormComponents after login
        } catch (error) {
            setError('Invalid email or password');
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
            <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            {error && <p className="error-message">{error}</p>}
        </form>
        </div>
    );
};
export default LoginComponent;