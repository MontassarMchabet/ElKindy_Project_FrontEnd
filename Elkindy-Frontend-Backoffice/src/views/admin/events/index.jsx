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
            const eventResponse = await axios.get('http://localhost:9090/event/all');
            seteventsData(eventResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    //const [eventId, setEventId] = useState(null);
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
            await axios.delete(`http://localhost:9090/event/delete/${deletingId}`);
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
        <Box width="2180px" pt={{ base: "130px", md: "80px", xl: "80px" }}>
            
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

