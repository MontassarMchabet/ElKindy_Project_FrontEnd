// import React from "react";

// // Chakra imports
// import {
//   Box,
//   Button,
//   Flex,
//   Grid,
//   Link,
//   Text,
//   useColorModeValue,
//   SimpleGrid,
// } from "@chakra-ui/react";

// // Custom components
// import TableTopCreators from "views/admin/events/components/TableTopCreators";
// import NFT from "components/card/NFT";
// import Card from "components/card/Card.js";

// // Assets

// import Nft4 from "assets/img/nfts/Nft4.png";
// import Avatar1 from "assets/img/avatars/avatar1.png";
// import Avatar2 from "assets/img/avatars/avatar2.png";
// import Avatar3 from "assets/img/avatars/avatar3.png";
// import Avatar4 from "assets/img/avatars/avatar4.png";
// import tableDataTopCreators from "views/admin/events/variables/tableDataTopCreators.json";
// import { tableColumnsTopCreators } from "views/admin/events/variables/tableColumnsTopCreators";

// export default function Events() {
//   // Chakra Color Mode
//   const textColor = useColorModeValue("secondaryGray.900", "white");
//   return (
//     <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
//       {/* Main Fields */}
//       <Grid
//         mb='20px'
//         gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
//         gap={{ base: "20px", xl: "20px" }}
//         display={{ base: "block", xl: "grid" }}>
//         <Flex
//           flexDirection='column'
//           gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>

//           <Flex direction='column'>
//             <Text
//               mt='45px'
//               mb='36px'
//               color={textColor}
//               fontSize='2xl'
//               ms='24px'
//               fontWeight='700'>
//               Nos Événements
//             </Text>
//             <Text
//               mt='45px'
//               mb='36px'
//               color={textColor}
//               fontSize='2xl'
//               ms='424px'
//               fontWeight='700'>
//                 Ajouter Événement
//             </Text>
//             <SimpleGrid
//               columns={{ base: 1, md: 3 }}
//               gap='20px'
//               mb={{ base: "20px", xl: "0px" }}>
//               <NFT
//                 name='Swipe Circles'
//                 author='By Peter Will'
//                 bidders={[
//                   Avatar1,
//                   Avatar2,
//                   Avatar3,
//                   Avatar4,
//                   Avatar1,
//                   Avatar1,
//                   Avatar1,
//                   Avatar1,
//                 ]}
//                 image={Nft4}
//                 currentbid='0.91 ETH'
//                 download='#'
//               />
//             </SimpleGrid>
//           </Flex>
//         </Flex>
//       </Grid>
//       {/* Delete Product */}
//     </Box>
//   );
// }






// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // Chakra imports
// import {
//   Box,
//   Button,
//   Flex,
//   Grid,
//   Text,
//   useColorModeValue,
//   SimpleGrid,
// } from "@chakra-ui/react";

// // Custom components
// import NFT from "components/card/NFT";
// // Assets
// import Nft4 from "assets/img/nfts/Nft4.png";
// import Avatar1 from "assets/img/avatars/avatar1.png";
// import Avatar2 from "assets/img/avatars/avatar2.png";
// import Avatar3 from "assets/img/avatars/avatar3.png";
// import Avatar4 from "assets/img/avatars/avatar4.png";

// const EventList = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/event/all");
//         setEvents(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px' mb={{ base: "20px", xl: "0px" }}>
//       {events.map((event) => (
//         <NFT
//           key={event._id}
//           name={event.Name}
//           author={`Le ${new Date(event.Date).toLocaleDateString()}`}
//           bidders={[Avatar1, Avatar2, Avatar3, Avatar4]}
//           image={Nft4}
//           prix={`${event.price} DT`}
//           download='#'
//         />
//       ))}
//     </SimpleGrid>
//   );
// };

// export default function Events() {
//   // Chakra Color Mode
//   const textColor = useColorModeValue("secondaryGray.900", "white");

//   return (
//     <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
//       {/* Main Fields */}
//       <Grid
//         mb='20px'
//         gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
//         gap={{ base: "20px", xl: "20px" }}
//         display={{ base: "block", xl: "grid" }}>
//         <Flex
//           flexDirection='column'
//           gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>

//           <Flex direction='row' alignItems='center' justifyContent='space-between'>
//             <Text
//               mt='45px'
//               mb='36px'
//               color={textColor}
//               fontSize='2xl'
//               ms='24px'
//               fontWeight='700'>
//               Nos Événements
//             </Text>
//             <Button
//               mt='45px'
//               mb='36px'
//               colorScheme='blue'
//               ml='auto'
//               fontWeight='700'>
//               Ajouter Événement
//             </Button>
            
//           </Flex>

//           <EventList />
          
//         </Flex>
//       </Grid>
//       {/* Delete Product */}
//     </Box>
//   );
// }




// import React, { useState, useEffect } from "react";
// import Axios from "axios";
// import AddEventForm from "./components/AddEvent";

// // Chakra imports
// import {
//   Box,
//   Button,
//   Flex,
//   Grid,
//   Text,
//   useColorModeValue,
//   SimpleGrid,
// } from "@chakra-ui/react";

// // Custom components
// import NFT from "components/card/NFT";
// // Assets
// import Nft4 from "assets/img/nfts/Nft4.png";
// import Avatar1 from "assets/img/avatars/avatar1.png";
// import Avatar2 from "assets/img/avatars/avatar2.png";
// import Avatar3 from "assets/img/avatars/avatar3.png";
// import Avatar4 from "assets/img/avatars/avatar4.png";

// export default function Events() {
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [events, setEvents] = useState([]);

//   const toggleAddFormVisibility = () => {
//     setShowAddForm(!showAddForm);
//   };

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await Axios.get("http://localhost:8080/event/all");
//         setEvents(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const handleAddEvent = (newEvent) => {
//     setEvents([...events, newEvent]);
//     toggleAddFormVisibility();
//   };

//   return (
//     <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
//       {/* Main Fields */}
//       <Grid
//         mb='20px'
//         gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
//         gap={{ base: "20px", xl: "20px" }}
//         display={{ base: "block", xl: "grid" }}>
//         <Flex
//           flexDirection='column'
//           gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>

//           <Flex direction='row' alignItems='center' justifyContent='space-between'>
//             <Text
//               mt='45px'
//               mb='36px'
//               color={'gray.800'}
//               fontSize='2xl'
//               ms='24px'
//               fontWeight='700'>
//               Nos Événements
//             </Text>
//             <Button
//               mt='45px'
//               mb='36px'
//               colorScheme='blue'
//               ml='auto'
//               fontWeight='700'
//               onClick={toggleAddFormVisibility}>
//               Ajouter Événement
//             </Button>
//             {showAddForm && <AddEventForm onAdd={handleAddEvent} />}
//           </Flex>

//           {!showAddForm ? (
//             <EventList events={events} />
//           ) : (
//             <></>
//           )}
//         </Flex>
//       </Grid>
//       {/* Delete Product */}
//     </Box>
//   );
// }

// function EventList({ events }) {
//   return (
//     <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px' mb={{ base: "20px", xl: "0px" }}>
//       {events.map((event) => (
//         <NFT
//           key={event._id}
//           name={event.Name}
//           author={`Le ${new Date(event.Date).toLocaleDateString()}`}
//           bidders={[Avatar1, Avatar2, Avatar3, Avatar4]}
//           image={Nft4}
//           prix={`${event.price} DT`}
//           download='#'
//         />
//       ))}
//     </SimpleGrid>
//   );
// }


import { Box, SimpleGrid } from "@chakra-ui/react";

import EventTable from "views/admin/events/components/EventTable";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import eventsData from "./variables/columnsData";

export default function Settings() {
    const [eventssData, seteventsData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const eventResponse = await axios.get('http://localhost:8080/event/all');
            seteventsData(eventResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const cancelRef = useRef();

    const confirmDelete = (id) => {
      setDeletingId(id);
      setIsDeleteDialogOpen(true);
    };


    const cancelDelete = () => {
        setIsDeleteDialogOpen(false);
    };
    const handleDelete = async () => {
        setIsDeleteDialogOpen(false);
        try {
            await axios.delete(`http://localhost:8080/event/delete/${deletingId}`);
            console.log("Event deleted successfully");
            fetchData();
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    const [isModalOpenA, setIsModalOpenA] = useState(false);

    //for event
    const openModalA = () => {
        setIsModalOpenA(true);
    };
    const closeModalA = () => {
        setIsModalOpenA(false);
    };
    //for edit
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// Fonction pour fermer la modal d'update
const closeEditModal = () => {
    setIsEditModalOpen(false);
};

    return (
        <Box width="3150px" pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 2 }}
                spacing={{ base: "20px", xl: "20px" }}>
                <EventTable
                    columnsData={eventsData}
                    tableData={eventssData}
                    handleDelete={handleDelete}
                    cancelDelete={cancelDelete}
                    cancelRef={cancelRef}
                    confirmDelete={confirmDelete}
                    isDeleteDialogOpen={isDeleteDialogOpen}
                    openModalA={openModalA}
                    closeModalA={closeModalA}
                    isModalOpenA={isModalOpenA}
                    fetchData={fetchData}
                    isEditModalOpen={isEditModalOpen} // Passer l'état de la modal d'édition
                    closeEditModal={closeEditModal} // Passer la fonction pour fermer la modal d'édition
                    setIsEditModalOpen={setIsEditModalOpen} // Passer la fonction pour sauvegarder les modifications du cours
                
                />
            </SimpleGrid>
        </Box>

    );
}
