import { useEffect, useState } from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element: Element, allowedRoles, ...rest }) => {
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const token = Cookies.get('token');
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const { role } = decodedToken;
                    setUserRole(role);
                    console.log('Role:', role);
                } else {
                    setUserRole(null);
                }
            } catch (error) {
                console.error('Error fetching user role:', error);
                setUserRole(null);  
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserRole();
    }, []);

    useEffect(() => {
        console.log('User Role:', userRole);
    }, [userRole]);

    if (userRole === 'client') {
        return <Element {...rest} />;
    } else {
        return <Navigate to="/" replace />;
    }
};

export default PrivateRoute;