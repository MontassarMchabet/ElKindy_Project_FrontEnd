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
import emailpng from "assets/img/email1.png";


function ForgotPassword() {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  
  const [errorEmail, setErrorEmail] = useState('');
  const [formData, setFormData] = useState({ email: '' });
  const [successImage, setSuccessImage] = useState(false);
  
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = formData;
    try {
      if (!email) {
        setErrorEmail("Email is required");
        return;
      }
      const isEmail = /\S+@\S+\.\S+/.test(email);
      if (!isEmail) {
        setErrorEmail("Invalid email");
        return;
      }
      const emailResponse = await api.get(`http://localhost:9090/api/auth/check/email/${email}`);
      if (!emailResponse.data.exists) {
        setErrorEmail("Email not found");
        return;
      }
      const response = await api.post('http://localhost:9090/api/auth/forgotpasswordtoken', formData);
      setErrorEmail('');
      setSuccessImage(true);
      setTimeout(() => {
        history.push('/signin');
      }, 2000);

    } catch (error) {
      console.error(error);
    }
  }



  return (
    <Card py='15px' maxW="700px" height="500px" margin="auto" marginTop="200px" boxShadow="xl">

      {successImage ? (
        <>
          <img style={{ height: "180px", width: "200px", margin: "auto", marginTop: "90px" }} src={emailpng} alt="Success" />
          <Box me='auto' margin="auto" marginBottom="60px">
            <Heading color={textColor} fontSize='36px' mb='10px'>
              Your Mail Sent Successfully!
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColorSecondary}
              fontWeight='400'
              fontSize='md' marginLeft="50px">
              A password reset link has been sent to your email.
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
                Forgot password?
              </Heading>
              <Text
                mb='36px'
                ms='4px'
                color={textColorSecondary}
                fontWeight='400'
                fontSize='md' marginLeft="23px">
                Enter your email for password reset!
              </Text>
            </Box>
          </Flex>

          <form onSubmit={handleSubmit} noValidate>
            <Flex marginLeft="100px">
              <FormControl>
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                  Email address <Text color={brandStars}>*</Text>
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
                  w="80%"

                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>
            </Flex>



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
            {errorEmail && <Text color="red" marginLeft="280px" marginTop="-50px" position="absolute">{errorEmail}</Text>}
          </form>
        </>
      )}
    </Card >
  );
}

export default ForgotPassword;