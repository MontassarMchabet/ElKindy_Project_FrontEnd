import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const username = localStorage.getItem('username');
                if (username) {
                    const response = await axios.get(`http://localhost:8080/api/auth/check/username/${username}`);
                    setUserRole(response.data.role);
                } else {
                    setUserRole(null);
                }
            } catch (error) {
                console.error('Error fetching user role:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserRole();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Route
            {...rest}
            render={(props) =>
                userRole && allowedRoles.includes(userRole) ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={userRole ? '/home' : '/signin'} />
                )
            }
        />
    );
};

export default PrivateRoute;