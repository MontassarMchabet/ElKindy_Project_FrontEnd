import { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const { role } = decodedToken;
                    setUserRole(role);
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