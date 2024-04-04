// import axios from 'axios';
// import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, Select } from "@chakra-ui/react";
// import { ViewIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
// import { AddIcon } from '@chakra-ui/icons'
// import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, FormControl, FormLabel, Input, Grid, SimpleGrid } from "@chakra-ui/react";
// import {
//     Flex,
//     Table,
//     Tbody,
//     Icon,
//     Td,
//     Text,
//     Th,
//     Thead,
//     Tr,
//     useColorModeValue,
// } from "@chakra-ui/react";
// import { Link } from 'react-router-dom';
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { RiEyeCloseLine } from "react-icons/ri";
// import {
//     Menu,
//     MenuButton,
//     useDisclosure,
//     InputGroup,
//     InputRightElement,
    
// } from "@chakra-ui/react";
// import { Box } from "@chakra-ui/react";
// import { useParams } from 'react-router-dom';
// import ticketsData from "../variables/columnsData";
    
// import React, { useMemo, useState,useEffect } from "react";
// import {
//     useGlobalFilter,
//     usePagination,
//     useSortBy,
//     useTable,
// } from "react-table";
// import Card from "components/card/Card";
// //import Menu from "components/menu/MainMenu";
// import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
// import Information from "views/admin/events/components/Information";
// import { NavLink } from "react-router-dom/cjs/react-router-dom";
// import { useHistory } from 'react-router-dom'; 




// export function Tickets(props) {
//     const { columnsData, tableData} = props;

//     const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
//     const cardShadow = useColorModeValue(
//         "0px 18px 40px rgba(112, 144, 176, 0.12)",
//         "unset"
//     );
//     const columns = useMemo(() => columnsData, [columnsData]);
//     const data = useMemo(() => tableData, [tableData]);
//     const textColorSecondary = "gray.400";
//     const { ...rest } = props;
//     const iconColor = useColorModeValue("brand.500", "white");
    

//     //const eventId = '65de60ac69889e0c3cfa4bd3';
//         const { eventId } = useParams(); // Utilisation du hook useParams pour obtenir l'ID de l'événement depuis l'URL



//     const textColor = useColorModeValue("secondaryGray.900", "white");
//     const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
//     const {
//         isOpen: isOpen1,
//         onClose: onClose1,
//     } = useDisclosure();
//     const bgList = useColorModeValue("white", "whiteAlpha.100");
//     const bgShadow = useColorModeValue(
//         "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
//         "unset"
//     );
//     const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
//     const bgHover = useColorModeValue(
//         { bg: "secondaryGray.400" },
//         { bg: "whiteAlpha.50" }
//     );
//     const bgFocus = useColorModeValue(
//         { bg: "secondaryGray.300" },
//         { bg: "whiteAlpha.100" }
//     );

//     return (
//         <Box width="2180px" pt={{ base: "130px", md: "80px", xl: "80px" }}>
//             <SimpleGrid
//                 mb='20px'
//                 columns={{ sm: 1, md: 2 }}
//                 spacing={{ base: "20px", xl: "20px" }}>
//                 <Card direction='column' w='100%' px='0px' overflowX={{ sm: "scroll", lg: "hidden" }}>
//                     <Flex px='25px' justify='space-between' mb='20px' align='center'>
//                         <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
//                             Event's tickets
//                         </Text>

                        

//                     </Flex>

//                     <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
                    
//                         <Thead>
//                             {headerGroups.map((headerGroup, index) => (
//                                 <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
//                                     {headerGroup.headers.map((column, index) => (
//                                         <Th
//                                             {...column.getHeaderProps(column.getSortByToggleProps())}
//                                             pe='10px'
//                                             key={column.id || column.Header}
//                                             borderColor={borderColor}>
//                                             <Flex
//                                                 justify='space-between'
//                                                 align='center'
//                                                 fontSize={{ sm: "10px", lg: "12px" }}
//                                                 color='gray.400'>
//                                                 {column.render("Header")}
//                                             </Flex>
//                                         </Th>
//                                     ))}
//                                 </Tr>
//                             ))}
//                         </Thead>
//                         <Tbody {...getTableBodyProps()}>
//                             {tickets && tickets.map(ticket => {
//                                 prepareRow(ticket);
//                                 return (
//                                     <Tr {...ticket.getRowProps()} key={ticket._id}>
//                                         {ticket.cells.map((cell, index) => {
//                                             let data = "";
//                                             if  (cell.column.Header === "EVENT") {
//                                                 data = (
//                                                     <Text color={textColor} fontSize='sm' fontWeight='700'>
//                                                         {ticket.event}
//                                                     </Text>
//                                                 );
//                                             } else if(cell.column.Header === "USER") {
//                                                 data = (
//                                                     <Text color={textColor} fontSize='sm' fontWeight='700'>
//                                                         {ticket.user}
//                                                     </Text>
//                                                 );
//                                             } else if (cell.column.Header === "PRICE") {
//                                                 data = (
//                                                     <Text color={textColor} fontSize='sm' fontWeight='700'>
//                                                         {ticket.price}
//                                                     </Text>
//                                                 );
//                                             } else if (cell.column.Header === "SELECTEDSEATS") {
//                                                 data = (
//                                                     <Text color={textColor} fontSize='sm' fontWeight='700'>
//                                                         {ticket.selectedSeats}
//                                                     </Text>
//                                                 );
//                                             }
//                                             return (
//                                                 <Td
//                                                     {...cell.getCellProps()}
//                                                     key={index}
//                                                     fontSize={{ sm: "14px" }}
//                                                     minW={{ sm: "150px", md: "200px", lg: "auto" }}
//                                                     borderColor='transparent'>
//                                                     {data}
//                                                 </Td>
//                                             );
//                                         })}
//                                     </Tr>
//                                 );
//                             })}
//                         </Tbody>
//                     </Table>
//                     <div>
//                     <h1>Liste des billets pour l'événement</h1>
//                     <ul>
//                         {tickets.map(ticket => (
//                             <li key={ticket._id}>
//                                 <p>Nom: {ticket.event}</p>
//                                 <p>Prix: {ticket.price}</p>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//                 </Card>
//             </SimpleGrid>
//         </Box>
//     );
// }





// export default Tickets;






import axios from "axios";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, Select } from "@chakra-ui/react";
import { ViewIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { AddIcon } from '@chakra-ui/icons'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, FormControl, FormLabel, Input, Grid, SimpleGrid } from "@chakra-ui/react";
import {
    Flex,
    Table,
    Tbody,
    Icon,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import {
    Menu,
    MenuButton,
    useDisclosure,
    InputGroup,
    InputRightElement,

} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";
import Card from "components/card/Card";
//import Menu from "components/menu/MainMenu";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import Information from "views/admin/tickets/components/Information";

import { useHistory } from 'react-router-dom';


export default function ColumnsTable(props) {
    const { columnsData, tableData, 
        isModalOpenA, openModalA } = props;

    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const cardShadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "unset"
    );
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
    const textColorSecondary = "gray.400";
    const { ...rest } = props;
    const iconColor = useColorModeValue("brand.500", "white");
    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );
    

    // const [eventId, setEventId] = useState(null);
    const eventId = '65de60ac69889e0c3cfa4bd3';
    const [ticketInfo, setTicketInfo] = useState(null);
    const history = useHistory();


   
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        initialState,
    } = tableInstance;
    initialState.pageSize = 99999999999999999;

    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    const {
        isOpen: isOpen1,
        onClose: onClose1,
    } = useDisclosure();
    const bgList = useColorModeValue("white", "whiteAlpha.100");
    const bgShadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
        "unset"
    );
    const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const bgHover = useColorModeValue(
        { bg: "secondaryGray.400" },
        { bg: "whiteAlpha.50" }
    );
    const bgFocus = useColorModeValue(
        { bg: "secondaryGray.300" },
        { bg: "whiteAlpha.100" }
    );
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);


    const [isModalViewOpen, setIsModalViewOpen] = useState(false);


    const handleView = (ticketData) => {
        setTicketInfo(ticketData);
        setIsModalViewOpen(true);
    };
    const closeModalViewA = () => {
        setIsModalViewOpen(false);
    };

    return (
        <Card direction='column' w='100%' px='0px' overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px='25px' justify='space-between' mb='20px' align='center'>
                <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
                    Reservation Table
                </Text>

                <Menu isOpen={isOpen1} onClose={onClose1}>
                    <MenuButton align='center' justifyContent='center' bg={bgButton} _hover={bgHover} _focus={bgFocus} _active={bgFocus} w='37px' h='37px' lineHeight='100%' onClick={openModalA} borderRadius='10px'>
                        <AddIcon color={iconColor} w='20px' h='20px' />
                    </MenuButton>
                </Menu>

            </Flex>


            <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
                <Thead>
                    {headerGroups.map((headerGroup, index) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, index) => (
                                <Th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    pe='10px'
                                    key={column.id || column.Header}
                                    borderColor={borderColor}>
                                    <Flex
                                        justify='space-between'
                                        align='center'
                                        fontSize={{ sm: "10px", lg: "12px" }}
                                        color='gray.400'>
                                        {column.render("Header")}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()} key={index}>
                                {row.cells.map((cell, index) => {
                                    let data = "";
                                    if (cell.column.Header === "EVENT") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "USER") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );


                                    } else if (cell.column.Header === "BOOKINGDATE") {
                                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {new Date(cell.value).toLocaleString('fr-FR', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric'

                                                })}
                                            </Text>
                                    } else if (cell.column.Header === "PRICE") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "SELECTEDSEATS") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );


                                    } else if (cell.column.Header === "ACTIONS") {
                                        data = (
                                            <Flex align="center">
                                                



                   
                                                
                                                {/* View icon */}
                                                <ViewIcon
                                                    w='20px'
                                                    h='20px'
                                                    me='5px'
                                                    color={"orange.500"}
                                                    cursor="pointer"
                                                    onClick={() => handleView(row.original)}
                                                />
                                                <Modal isOpen={isModalViewOpen} onClose={closeModalViewA}>
                                                    <ModalOverlay />
                                                    <ModalContent maxW={'800px'}>
                                                        {/* <ModalHeader>Event Information</ModalHeader> */}
                                                        <ModalCloseButton />
                                                        <ModalBody>
                                                            {ticketInfo && (
                                                                <>
                                                                    
                                                                    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
                                                                        <Text
                                                                            color={textColorPrimary}
                                                                            fontWeight='bold'
                                                                            fontSize='2xl'
                                                                            mt='10px'
                                                                            mb='4px'>
                                                                            {ticketInfo.user}
                                                                        </Text>
                                                                        <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
                                                                            {ticketInfo.event}
                                                                        </Text>
                                                                        <SimpleGrid columns='2' gap='20px'>
                                                                            <Information
                                                                                // boxShadow={cardShadow}
                                                                                // title='Date'
                                                                                // value={eventInfo.date}
                                                                                boxShadow={cardShadow}
                                                                                title=' Reservation Date'
                                                                                value={new Date(ticketInfo.date).toLocaleString('fr-FR', {
                                                                                    weekday: 'long',
                                                                                    year: 'numeric',
                                                                                    month: 'long',
                                                                                    day: 'numeric',
                                                                                    hour: 'numeric',
                                                                                    minute: 'numeric',
                                                                                    second: 'numeric',
                                                                                })}
                                                                            />
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Ticket Type'
                                                                                value={ticketInfo.ticketType}
                                                                            />
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Price'
                                                                                value={ticketInfo.price}
                                                                            />

                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Selected Seats'
                                                                                value={ticketInfo.selectedSeats}
                                                                            />
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Room Shape'
                                                                                value={ticketInfo.room_shape}
                                                                            />
                                                                            
                                                                        </SimpleGrid>

                                                                    </Card>
                                                                </>
                                                            )}
                                                        </ModalBody>
                                                    </ModalContent>
                                                </Modal>
                                            </Flex>
                                        );
                                    }
                                    return (
                                        <Td
                                            {...cell.getCellProps()}
                                            key={index}
                                            fontSize={{ sm: "14px" }}
                                            minW={{ sm: "150px", md: "200px", lg: "auto" }}
                                            borderColor='transparent'>
                                            {data}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </Card>
    );
}