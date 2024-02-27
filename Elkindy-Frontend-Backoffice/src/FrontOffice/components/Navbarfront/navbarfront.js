import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    Link,
    Text,
    Button, Spacer, Heading,
    useColorModeValue,
    ChakraProvider
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { FaBars, FaTimes } from 'react-icons/fa';
import React, { useRef, useEffect, useState } from 'react'
import elkindylogo from "assets/img/elkindy.png";
import AdminNavbar from 'components/navbar/NavbarAdmin';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Navbarfront = () => {
    const isLoggedIn = localStorage.getItem('token') !== null;
    const history = useHistory();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const decodedToken = jwtDecode(token);
                const { userId, role } = decodedToken;

                const response = await axios.get(`http://localhost:8080/api/auth/user/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
        history.push('/home');
    };

    return (
        <div>
            <ChakraProvider>
                <Flex p="4" alignItems="center" justifyContent="space-between" marginTop={"20px"}>
                    <Box p="2">
                        <Heading size="md" marginLeft={"150px"}>
                            <img src={elkindylogo} style={{ width: '120px', height: 'auto' }} />
                        </Heading>
                    </Box>
                    <Box>
                        {isLoggedIn ? (
                            <>
                                <Button variant="ghost">{`${user?.name} ${user?.lastname}`}</Button>
                                <Button onClick={handleLogout} variant="ghost">Log out</Button>
                                {user?.role === 'admin' && (
                                    <NavLink to="/admin/dashboard">
                                        <Button variant="ghost">Dashboard</Button>
                                    </NavLink>
                                )}
                            </>
                        ) : (
                            <>
                                <NavLink to="/signin" variant="ghost"><Button>Sign in</Button></NavLink>
                                <NavLink to="/signup" variant="ghost"><Button>Sign up</Button></NavLink>
                            </>
                        )}
                    </Box>
                </Flex>
            </ChakraProvider>
        </div>
    );
}

export default Navbarfront