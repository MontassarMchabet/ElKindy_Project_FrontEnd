// Chakra imports
import { Box, Grid } from "@chakra-ui/react";
import { jwtDecode } from 'jwt-decode';
import api from "services/api";
// Custom components
import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
import Notifications from "views/admin/profile/components/Notifications";
import Projects from "views/admin/profile/components/Projects";
import Storage from "views/admin/profile/components/Storage";
import Upload from "views/admin/profile/components/Upload";

// Assets
import banner from "assets/img/auth/eee.jpg";
import avatar from "assets/img/avatars/avatarons.jpg";
import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

export default function Overview() {
  const history = useHistory();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const { userId, role } = decodedToken;

        const response = await api.get(`http://localhost:9090/api/auth/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        // templateColumns={{
        //   base: "1fr",
        //   lg: "1.34fr 1fr 1.62fr",
        // }}
        // templateRows={{
        //   base: "repeat(3, 1fr)",
        //   lg: "1fr",
        // }}
        gap={{ base: "20px", xl: "20px" }}>
        <Banner
          gridArea='1 / 1 / 2 / 2'
          banner={banner}
          avatar={`${user?.profilePicture}`}
          name='Adela Parkson'
          job='Product Designer'
          posts='170'
          followers='3'
          following='50'
        />
        {/* <Storage
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          used={25.6}
          total={50}
        />
        <Upload
          gridArea={{
            base: "3 / 1 / 4 / 2",
            lg: "1 / 3 / 2 / 4",
          }}
          minH={{ base: "auto", lg: "420px", "2xl": "365px" }}
          pe='20px'
          pb={{ base: "100px", lg: "20px" }}
        /> */}
      </Grid>


      <Grid
        // mb='20px'
        // templateColumns={{
        //   base: "1fr",
        //   lg: "repeat(2, 1fr)",
        //   "2xl": "1.34fr 1.62fr 1fr",
        // }}
        // templateRows={{
        //   base: "1fr",
        //   lg: "repeat(2, 1fr)",
        //   "2xl": "1fr",
        // }}
        gap={{ base: "20px", xl: "20px" }}>
        {/* <Projects
          gridArea='1 / 2 / 2 / 2'
          banner={banner}
          avatar={avatar}
          name='Adela Parkson'
          job='Product Designer'
          posts='17'
          followers='9.7k'
          following='274'
        /> */}
        <General
          style={{ marginLeft: '-17px' }}
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          minH='365px'
          pe='20px'
        />
        <Notifications
          style={{ width: '100%', marginTop: '0px' }}
          used={25.6}
          total={50}
          gridArea={{
            base: "3 / 1 / 4 / 2",
            lg: "2 / 1 / 3 / 3",
            "2xl": "1 / 3 / 2 / 4",
          }}
        />
      </Grid>
    </Box>
  );
}
