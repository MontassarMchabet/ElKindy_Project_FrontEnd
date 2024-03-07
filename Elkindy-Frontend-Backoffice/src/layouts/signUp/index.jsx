import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import axios from 'axios';
// Chakra imports
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/elkindey.jpg";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

function SignUp() {
    // Chakra color mode
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");

    // check if already logged in
    const history = useHistory();
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('token') !== null;
        if (isLoggedIn) {
            history.push('/home');
        }
    }, [history]);


    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        username: ""
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const validateForm = async () => {
        let errors = {};

        if (!formData.name.trim()) {
            errors.name = 'All fields are required'
        } else if (!formData.lastname.trim()) {
            errors.lastname = 'All fields are required'
        } else if (!formData.email.trim()) {
            errors.email = 'All fields are required'
        } else if (!formData.password.trim()) {
            errors.password = 'All fields are required'
        } else if (!formData.confirmPassword.trim()) {
            errors.confirmPassword = 'All fields are required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        } else if (formData.username.trim().length < 3) {
            errors.username = 'Username must be at least 3 characters long';
        } else if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        try {
            const emailResponse = await axios.get(`http://localhost:8080/api/auth/check/email/${formData.email}`);
            if (emailResponse.data.exists) {
                errors.email = 'Email already in use';
            }
        } catch (error) {
            console.error('Error checking email:', error);
        }

        try {
            const usernameResponse = await axios.get(`http://localhost:8080/api/auth/check/username/${formData.username}`);
            if (usernameResponse.data.exists) {
                errors.username = 'Username already taken';
            }
        } catch (error) {
            console.error('Error checking username:', error);
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await validateForm();
        console.log("Submitting form");
        if (isValid) {
            try {
                const response = await axios.post(
                    "http://localhost:8080/api/auth/register",
                    formData
                );
                console.log(response.data);
            } catch (error) {
                console.error("Error registering user:", error);
            }
        }
    };


    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    return (
        <DefaultAuth illustrationBackground={illustration} image={illustration}>
            <Flex
                maxW={{ base: "100%", md: "max-content" }}
                w='100%'
                mx={{ base: "auto", lg: "0px" }}
                me='auto'
                h='100%'
                alignItems='start'
                justifyContent='center'
                mb={{ base: "30px", md: "60px" }}
                px={{ base: "25px", md: "0px" }}
                mt={{ base: "40px", md: "14vh" }}
                flexDirection='column'>
                <Box me='auto'>
                    <Heading color={textColor} fontSize='36px' mb='10px'>
                        Sign Up
                    </Heading>
                    <Text
                        mb='36px'
                        ms='4px'
                        color={textColorSecondary}
                        fontWeight='400'
                        fontSize='md'>
                        Enter your informations to create an account!
                    </Text>
                </Box>
                <Flex
                    zIndex='2'
                    direction='column'
                    w={{ base: "100%", md: "420px" }}
                    maxW='100%'
                    background='transparent'
                    borderRadius='15px'
                    mx={{ base: "auto", lg: "unset" }}
                    me='auto'
                    mb={{ base: "20px", md: "auto" }}>
                    <form onSubmit={handleSubmit} noValidate>
                        <FormControl>

                            <FormLabel
                                display='flex'
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}
                                mb='8px'>
                                Name<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                isRequired={true}
                                variant='auth'
                                fontSize='sm'
                                ms={{ base: "0px", md: "0px" }}
                                type='text'
                                placeholder='Name here'
                                mb='24px'
                                fontWeight='500'
                                size='lg'
                                width='200px'


                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />

                            <FormLabel
                                display='flex'
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}
                                mb='8px'
                                position='absolute'
                                marginTop='-100px'
                                left='215px'>
                                Lastname<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                isRequired={true}
                                variant='auth'
                                fontSize='sm'
                                ms={{ base: "0px", md: "0px" }}
                                type='text'
                                placeholder='Lastname here'
                                mb='24px'
                                fontWeight='500'
                                size='lg'
                                width='200px'
                                position='absolute'
                                marginTop='00px'
                                left='215px'

                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                            />



                            <FormLabel
                                display='flex'
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}
                                mb='8px'>
                                Email<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                isRequired={true}
                                variant='auth'
                                fontSize='sm'
                                ms={{ base: "0px", md: "0px" }}
                                type='email'
                                placeholder='mail@gmail.com'
                                mb='24px'
                                fontWeight='500'
                                size='lg'
                                width='200px'

                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />


                            <FormLabel
                                display='flex'
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}
                                mb='8px'
                                position='absolute'
                                marginTop='-100px'
                                left='215px'>
                                Username<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                isRequired={true}
                                variant='auth'
                                fontSize='sm'
                                ms={{ base: "0px", md: "0px" }}
                                type='text'
                                placeholder='Username here'
                                mb='24px'
                                fontWeight='500'
                                size='lg'
                                width='200px'
                                position='absolute'
                                marginTop='00px'
                                left='215px'

                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />




                            <FormLabel
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}
                                display='flex'>
                                Password<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    isRequired={true}
                                    fontSize='sm'
                                    placeholder='Min. 8 characters'
                                    mb='24px'
                                    size='lg'
                                    type={show ? "text" : "password"}
                                    variant='auth'

                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />

                                <InputRightElement display='flex' alignItems='center' mt='4px'>
                                    <Icon
                                        color={textColorSecondary}
                                        _hover={{ cursor: "pointer" }}
                                        as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                        onClick={handleClick}
                                    />
                                </InputRightElement>
                            </InputGroup>



                            <FormLabel
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}
                                display='flex'>
                                Password Confirmation<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    isRequired={true}
                                    fontSize='sm'
                                    placeholder='Min. 8 characters'
                                    mb='24px'
                                    size='lg'
                                    type={show ? "text" : "password"}
                                    variant='auth'

                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <InputRightElement display='flex' alignItems='center' mt='4px'>
                                    <Icon
                                        color={textColorSecondary}
                                        _hover={{ cursor: "pointer" }}
                                        as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                        onClick={handleClick}
                                    />
                                </InputRightElement>
                            </InputGroup>

                            {errors.name && <Text color="red">{errors.name}</Text>}
                            {errors.lastname && <Text color="red">{errors.lastname}</Text>}
                            {errors.email && <Text color="red">{errors.email}</Text>}
                            {errors.username && <Text color="red">{errors.username}</Text>}
                            {errors.password && <Text color="red">{errors.password}</Text>}
                            {errors.confirmPassword && <Text color="red">{errors.confirmPassword}</Text>}
                            <br></br>


                            <Button
                                type="submit"
                                fontSize='sm'
                                variant='brand'
                                fontWeight='500'
                                w='100%'
                                h='50'
                                mb='24px'>
                                Sign Up
                            </Button>
                        </FormControl>


                    </form>
                    <Flex
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='start'
                        maxW='100%'
                        mt='0px'>
                        <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
                            Already have an account?
                            <NavLink to='/auth/sign-in'>
                                <Text
                                    color={textColorBrand}
                                    as='span'
                                    ms='5px'
                                    fontWeight='500'>
                                    <NavLink
                                        to='/signin'>
                                        Sign in
                                    </NavLink>
                                </Text>
                            </NavLink>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </DefaultAuth>
    );
}

export default SignUp;