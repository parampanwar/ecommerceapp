"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import './UserDetails.css';

const UserDetails = () => {
    useEffect(() => {
        document.title = 'Details Page';
      }, []);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    // Fetch users from the API
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users/');
            setUsers(response.data);
        } catch (error) {
            if (error.response) {
                setError(`Error: ${error.response.data.detail || 'An unexpected error occurred'}`);
            } else {
                setError('Error fetching data');
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

  
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="user-details">
            <h1>User Details</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && users.length === 0 && <p>No users found.</p>}
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        // Ensure that key is unique, using user.id if available
                        <tr key={user.id}> {/* Using user.id as a unique key */}
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserDetails;
