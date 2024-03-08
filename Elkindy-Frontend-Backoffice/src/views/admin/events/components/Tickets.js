import axios from 'axios';

import {  SimpleGrid } from "@chakra-ui/react";
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
import { Link } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import {
    Menu,
    MenuButton,
    useDisclosure,
    InputGroup,
    InputRightElement,
    
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import ticketsData from "../variables/columnsData";
    
import React, { useMemo, useState,useEffect } from "react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";
import Card from "components/card/Card";
//import Menu from "components/menu/MainMenu";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import Information from "views/admin/events/components/Information";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from 'react-router-dom'; 





export function Tickets(props) {
    const { columnsData, tableData, handleDelete, cancelDelete, cancelRef, confirmDelete, isDeleteDialogOpen,
        isModalOpenA, openModalA, closeModalA, fetchData, isEditModalOpen, closeEditModal,setIsEditModalOpen } = props;

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
    

    //const eventId = '65de60ac69889e0c3cfa4bd3';
        const { eventId } = useParams(); // Utilisation du hook useParams pour obtenir l'ID de l'événement depuis l'URL
    
    const [tickets, setTickets] = useState([]); // Déclaration de l'état pour stocker les tickets


    console.log("heeeeeeeey", eventId);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/event/${eventId}/tickets`);
                setTickets(response.data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, [eventId]);



    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    
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

    return (
        <Box width="2180px" pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 2 }}
                spacing={{ base: "20px", xl: "20px" }}>
                <Card direction='column' w='100%' px='0px' overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <Flex px='25px' justify='space-between' mb='20px' align='center'>
                        <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
                            Event's tickets
                        </Text>

                        

                    </Flex>

                    {/* <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
                    
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
                            {tickets && tickets.map(ticket => {
                                prepareRow(ticket);
                                return (
                                    <Tr {...ticket.getRowProps()} key={ticket._id}>
                                        {ticket.cells.map((cell, index) => {
                                            let data = "";
                                            if  (cell.column.Header === "EVENT") {
                                                data = (
                                                    <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                        {ticket.event}
                                                    </Text>
                                                );
                                            } else if(cell.column.Header === "USER") {
                                                data = (
                                                    <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                        {ticket.user}
                                                    </Text>
                                                );
                                            } else if (cell.column.Header === "PRICE") {
                                                data = (
                                                    <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                        {ticket.price}
                                                    </Text>
                                                );
                                            } else if (cell.column.Header === "SELECTEDSEATS") {
                                                data = (
                                                    <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                        {ticket.selectedSeats}
                                                    </Text>
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
                    </Table> */}
                    <div>
                    <h1>Liste des billets pour l'événement</h1>
                    <ul>
                        {tickets.map(ticket => (
                            <li key={ticket._id}>
                                <p>Nom: {ticket.event}</p>
                                <p>Prix: {ticket.price}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                </Card>
            </SimpleGrid>
        </Box>
    );
}





export default Tickets;






// function Tickets() {
//     const { eventId } = useParams(); // Utilisation du hook useParams pour obtenir l'ID de l'événement depuis l'URL
    
//     const [tickets, setTickets] = useState([]); // Déclaration de l'état pour stocker les tickets

//     useEffect(() => {
//         const fetchTickets = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:9090/event/${eventId}/tickets`); // Effectuer une requête GET pour récupérer les tickets
//                 setTickets(response.data); // Mettre à jour l'état avec les tickets récupérés depuis la réponse
//             } catch (error) {
//                 console.error('Error fetching tickets:', error); // Afficher une erreur si la requête échoue
//             }
//         };

//         fetchTickets(); // Appeler la fonction fetchTickets une fois que le composant est monté ou que l'ID de l'événement change
//     }, [eventId]); // Utilisation de l'ID de l'événement comme dépendance pour que useEffect se déclenche lorsque l'ID change

//     return (
//         <div>
//             <h1>Liste des billets pour l'événement</h1>
//             <ul>
//                 {tickets.map(ticket => (
//                     <li key={ticket._id}>
//                         <p>Nom: {ticket.event}</p>
//                         <p>Prix: {ticket.price}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default Tickets;