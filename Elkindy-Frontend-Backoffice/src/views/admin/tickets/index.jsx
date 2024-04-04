import { Box, SimpleGrid } from "@chakra-ui/react";


import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ticketsData from "./variables/columnsData";
import { useParams } from "react-router-dom";
import TicketsTable from "./components/TicketsTable";
import SideBar from "../sideBarEvents/sideBar";



export default function Settings() {
    const [ticketssData, setTicketsData] = useState([]);
    console.log("ticketstssData",ticketssData);
    const { eventId } = useParams();
    //const { eventId } = "65de60ac69889e0c3cfa4bd3";
    console.log("heeeeeeeey sehr 3younouu", eventId);

    const cancelRef = useRef();
    useEffect(() => {
        fetchData();
    }, [eventId]);

    const fetchData = async () => {
        try {
            const ticketResponse = await axios.get(`http://localhost:9090/event/${eventId}/tickets`);
            setTicketsData(ticketResponse.data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };
    

    

    const [isModalOpenA, setIsModalOpenA] = useState(false);

    //for tickets
    const openModalA = () => {
        setIsModalOpenA(true);
    };
    const closeModalA = () => {
        setIsModalOpenA(false);
    };

    return (
        // <Box>
    
        // <Sidebar />
        // <Box marginLeft={'225px'} width="2180px" pt={{ base: "130px", md: "80px", xl: "80px" }}>
            
            
        //     <SimpleGrid
        //         mb='20px'
        //         columns={{ sm: 1, md: 2 }}
        //         spacing={{ base: "20px", xl: "20px" }}>
                
        //         <TicketsTable
                
        //             columnsData={ticketsData}
        //             tableData={ticketssData}
                    
        //             cancelRef={cancelRef}
        //             openModalA={openModalA}
        //             closeModalA={closeModalA}
        //             isModalOpenA={isModalOpenA}
                    
        //             fetchData={fetchData}
                
        //         />
                
            
        //     </SimpleGrid>
        // </Box>
        // </Box>
//         <Box display="flex">
//     <Sidebar />
//     <Box flex="1" marginLeft={'225px'} width="10" pt={{ base: "130px", md: "80px", xl: "80px" }}>
//         <SimpleGrid
//             mb='20px'
//             columns={{ sm: 1, md: 2 }}
//             spacing={{ base: "20px", xl: "20px" }}>
//             <TicketsTable
//                 columnsData={ticketsData}
//                 tableData={ticketssData}
//                 cancelRef={cancelRef}
//                 openModalA={openModalA}
//                 closeModalA={closeModalA}
//                 isModalOpenA={isModalOpenA}
//                 fetchData={fetchData}
//             />
//         </SimpleGrid>
//     </Box>
// </Box>
<>
<SideBar/>
<Box  marginLeft={'325px'} width="1900px" pt={{ base: "130px", md: "80px", xl: "80px" }}>
         <SimpleGrid
            mb='20px'
            columns={{ sm: 1, md: 2 }}
            spacing={{ base: "20px", xl: "20px" }}>
            <TicketsTable
                columnsData={ticketsData}
                tableData={ticketssData}
                cancelRef={cancelRef}
                openModalA={openModalA}
                closeModalA={closeModalA}
                isModalOpenA={isModalOpenA}
                fetchData={fetchData}
            />
        </SimpleGrid>
    </Box>
    </>
    );
}

