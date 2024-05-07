// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Information from "views/admin/profile/components/Information";
import { jwtDecode } from 'jwt-decode';
import api from "services/api";
import Cookies from 'js-cookie';
// Assets
export default function GeneralInformation(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const history = useHistory();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get('token');
        const decodedToken = jwtDecode(token);
        const { userId, role } = decodedToken;

        const response = await api.get(`https://elkindy-project-backend.onrender.com/api/auth/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'>
        Welcome {`${user?.name}`}!
      </Text>
      <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
        Hello, Admin! We're glad to have you as part
        of the El Kindy Conservatory team. As an admin, you play a crucial
        role in managing and overseeing various aspects of our conservatory's operations.
        Feel free to navigate through the dashboard to access the tools and features necessary
        for your administrative tasks. If you have any questions or need assistance,
        don't hesitate to reach out to our support team.
        Thank you for your dedication and contribution to the success of El Kindy Conservatory!
      </Text>
      <SimpleGrid columns='2' gap='20px'>
        <Information
          boxShadow={cardShadow}
          title='Name'
          value={`${user?.name}`}
        />
        <Information
          boxShadow={cardShadow}
          title='Last Name'
          value={`${user?.lastname}`}
        />
        <Information
          boxShadow={cardShadow}
          title='Email'
          value={`${user?.email}`}
        />
        <Information
          boxShadow={cardShadow}
          title='Username'
          value={`${user?.username}`}
        />
        <Information
          boxShadow={cardShadow}
          title='Birthday'
          value={`${user?.dateOfBirth.substring(0, 10)}`}
        />
        <Information
          boxShadow={cardShadow}
          title='Email verification'
          value={`${user?.isEmailVerified ? 'Verified' : 'Not verified'}`}
        />
        <Information
          boxShadow={cardShadow}
          title='Phone Number'
          value={`${user?.phoneNumber}`}
        />
        <Information
          boxShadow={cardShadow}
          title='CIN'
          value={`${user?.cinNumber}`}
        />
      </SimpleGrid>
    </Card>
  );
}
