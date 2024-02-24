import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Flex, Link, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react'
import { FaBars, FaTimes, FaFacebook, FaTwitter } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { RiInstagramFill } from "react-icons/ri";

function footerfront() {
  const mystyle = {
    backgroundColor: 'black',
    color: '#fff',
    padding: '20px 0',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: '450px',
  }
  const iconsStyle = {
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    width: '10%'
  }
  const lol = {
    padding: '20 px 0',
    marginTop: '80px',
    marginLeft: '150px',
    fontFamily: 'Poppins, sans-serif'
  }

  const lineStyle = {
    width: '90%',
    border: 'none',
    borderTop: '1px solid #787B88',
    margin: '20px 0 auto',
    opacity: 0.5,
    marginTop: '100px',
    marginLeft: '100px'
  };
  return (
    <div>
      <footer style={mystyle}>


        <div style={{ alignItems: 'center' }}>

          <div style={lol}>
            <h1 style={{ fontFamily: 'Poppins, sans-serif' }}>EL KINDY</h1>
            <br />
            <p style={{ color: "#787B88", fontFamily: 'Poppins, sans-serif' }}>
              At El Kindyn, we are passionate about
              providing the <br /> ultimate music courses to our clients.
            </p>
            <br />
            <br />
            <div style={iconsStyle}>
              <FaFacebook style={{ color: '#787B88', fontSize: '24px', }} />
              <IoLogoWhatsapp style={{ color: '#787B88', fontSize: '24px', }} />
              <RiInstagramFill style={{ color: '#787B88', fontSize: '24px', }} />
              <FaTwitter style={{ color: '#787B88', fontSize: '24px', }} />
            </div>
          </div>

        </div>


        <hr style={lineStyle} />
        <div style={{ justifyContent: 'space-between', marginTop: '20px' }}>
          <h style={{ color: '#787B88', marginLeft: '100px' }}>Terms & conditions</h>
          <h style={{ color: '#787B88', marginLeft: '1505px' }}>Privacy policy</h>
        </div>

      </footer>
    </div>
  )
}

export default footerfront

