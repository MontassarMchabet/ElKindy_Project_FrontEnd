import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

import elkindylogo from "assets/img/elkindy.png";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <img src={elkindylogo} style={{ width: '200px', height: 'auto' }} />
      <br></br>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
