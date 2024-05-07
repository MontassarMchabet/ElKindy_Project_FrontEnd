import React, { useState, useEffect } from 'react';
import api from "services/api";
import { NavLink } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
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
    SimpleGrid,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import { FaChevronLeft } from "react-icons/fa";
import successpng from "assets/img/check.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useParams } from 'react-router-dom';


function ResetPassword() {
    const { token } = useParams();

    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const [errorPassword, setErrorPassword] = useState('');
    const [successImage, setSuccessImage] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [show, setShow] = React.useState(false);

    const history = useHistory();
    const handleClick = () => setShow(!show);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!password) {
                setErrorPassword("Password is required");
                return;
            }
            if (!confirmPassword) {
                setErrorPassword("Password confirmation is required");
                return;
            }
            if (password !== confirmPassword) {
                setErrorPassword("Passwords do not match");
                return;
            }
            const response = await api.put(`https://elkindy-project-backend.onrender.com/api/auth/passwordReset/${token}`, { password });
            if (response.data.message === 'Password reset successfully') {
                setErrorPassword('');
                setSuccessImage(true);
                setTimeout(() => {
                    history.push('/signin');
                }, 2000);
            } else {
                setErrorPassword('Failed to reset password');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Card py='15px' maxW="700px" height="580px" margin="auto" marginTop="200px" boxShadow="xl">

            {successImage ? (
                <>
                    <img style={{ height: "180px", width: "200px", margin: "auto", marginTop: "90px" }} src={successpng} alt="Success" />
                    <Box me='auto' margin="auto" marginBottom="60px">
                        <Heading color={textColor} fontSize='36px' mb='10px'>
                            Your Password is Reset!
                        </Heading>
                        <Text
                            mb='36px'
                            ms='4px'
                            color={textColorSecondary}
                            fontWeight='400'
                            fontSize='md' marginLeft="50px">
                            Your password has been reset successfully!
                        </Text>
                    </Box>
                </>

            ) : (
                <>
                    <NavLink
                        to='/signin'
                        style={
                            () => ({
                                width: "fit-content",
                                marginTop: "15px",
                            })
                        }>
                        <Flex
                            align='center'
                            ps={{ base: "25px", lg: "0px" }}
                            pt={{ lg: "0px", xl: "0px" }}
                            w='fit-content'>
                            <Icon
                                as={FaChevronLeft}
                                me='12px'
                                h='13px'
                                w='8px'
                                color='secondaryGray.600'
                            />
                            <Text ms='0px' fontSize='sm' color='secondaryGray.600'>
                                Back
                            </Text>
                        </Flex>
                    </NavLink >


                    <Flex
                        my='auto'
                        h='100%'
                        align={{ base: "center", xl: "start" }}
                        justify={{ base: "center", xl: "center" }}
                        marginLeft="180px"
                        marginTop="50px"
                    >
                        <Box me='auto'>
                            <Heading color={textColor} fontSize='36px' mb='10px'>
                                Reset Your Password!
                            </Heading>
                            <Text
                                mb='36px'
                                ms='4px'
                                color={textColorSecondary}
                                fontWeight='400'
                                fontSize='md' marginLeft="23px">
                                Enter your new password and confirm it!
                            </Text>
                        </Box>
                    </Flex>

                    <form onSubmit={handleSubmit} noValidate>
                        <div style={{ marginLeft: "100px" }}>
                            <FormLabel
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}
                                display='flex'>
                                Password<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <InputGroup size='md' w='80%'>
                                <Input
                                    isRequired={true}
                                    fontSize='sm'
                                    placeholder='Min. 8 characters'
                                    mb='24px'
                                    size='lg'
                                    type={show ? "text" : "password"}
                                    variant='auth'

                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                            <InputGroup size='md' w='80%'>
                                <Input
                                    isRequired={true}
                                    fontSize='sm'
                                    placeholder='Min. 8 characters'
                                    mb='24px'
                                    size='lg'
                                    type={show ? "text" : "password"}
                                    variant='auth'

                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                        </div>
                        <Flex marginLeft="100px" marginBottom="60px">
                            <Button
                                type='submit'
                                fontSize='sm'
                                variant='brand'
                                fontWeight='500'
                                w='80%'
                                h='50'
                                mb='24px'>
                                Submit
                            </Button>
                        </Flex>
                        {errorPassword && <Text color="red" marginLeft="280px" marginTop="-50px" position="absolute">{errorPassword}</Text>}
                    </form>
                </>
            )}
        </Card >
    )
}

export default ResetPassword
