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
import Cookies from 'js-cookie';
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
        const token = Cookies.get('token');
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
      </Grid>


      <Grid
        gap={{ base: "20px", xl: "20px" }}>
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
