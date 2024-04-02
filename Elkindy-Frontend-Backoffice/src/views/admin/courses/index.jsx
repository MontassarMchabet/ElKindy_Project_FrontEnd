import { Box, SimpleGrid } from "@chakra-ui/react";
import CourseTable from "views/admin/courses/components/courseTable";
import RoomTable from "views/admin/courses/components/roomTable.js";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import  CoursesData from "./variables/columnsData.js";
import  RoomData from "./variables/roomData.js";
export default function Settings() {
   
    const [isCourseEditModalOpen, setIsCourseEditModalOpen] = useState(false); 
    const [isRoomEditModalOpen, setIsRoomEditModalOpen] = useState(false); 
    const [CoursessData, setCoursesData] = useState([]);
    const [RoomsData, setRoomData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const CourseResponse = await axios.get('http://localhost:9090/api/classroom/getall');
            setCoursesData(CourseResponse.data);
            const RoomResponse = await axios.get('http://localhost:9090/api/Room/getall');
            setRoomData(RoomResponse.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
     // Fonction pour fermer la modal d'update
     const closeCourseEditModal = () => {
        setIsCourseEditModalOpen(false);
    };
    const closeRoomEditModal = () => {
        setIsRoomEditModalOpen(false);
    };
    //const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isCourseDeleteDialogOpen, setIsCourseDeleteDialogOpen] = useState(false);
    const [isRoomDeleteDialogOpen, setIsRoomDeleteDialogOpen] = useState(false);
    const [deletingUserId, setDeletingUserId] = useState(null);
    const [deletingRoomId, setDeletingRoomId] = useState(null);
    const cancelRef = useRef();

    const confirmDelete = (userId) => {
        setDeletingUserId(userId);
        setIsCourseDeleteDialogOpen(true);
    };
    
    const confirmDeleteR = (RoomID) => {
        setDeletingRoomId(RoomID);
        setIsRoomDeleteDialogOpen(true);
    };
    const cancelDelete = () => {
        setIsCourseDeleteDialogOpen(false);
        
    };
    const handleDelete = async () => {
        setIsCourseDeleteDialogOpen(false);
        try {
            await axios.delete(`http://localhost:9090/api/classroom/delete/${deletingUserId}`);
            console.log("Course deleted successfully");
            setIsCourseEditModalOpen(false);
            fetchData();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };
    const cancelDeleteR = () => {
        setIsRoomDeleteDialogOpen(false);
    };
    const handleDeleteRoom = async () => {
        setIsRoomDeleteDialogOpen(false);
        try {
            await axios.delete(`http://localhost:9090/api/Room/delete/${deletingRoomId}`);
            console.log("Course deleted successfully");
            setIsRoomEditModalOpen(false);
            fetchData();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };
    const [isModalOpenP, setIsModalOpenP] = useState(false);
    const [isModalOpenR, setIsModalOpenR] = useState(false);
    const openModalR = () => {
        setIsModalOpenR(true);
    };
    const closeModalR = () => {
        setIsModalOpenR(false);
    };
    const openModalP = () => {
        setIsModalOpenP(true);
    };
    const closeModalP = () => {
        setIsModalOpenP(false);
    };
    return (
        <Box width="3150px" pt={{ base: "130px", md: "80px", xl: "80px" }}>
    
        
            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 2 }}
                spacing={{ base: "20px", xl: "20px" }}>
                <CourseTable
                    columnsData={CoursesData}
                    tableData={CoursessData}
                    handleDelete={handleDelete}
                    cancelDelete={cancelDelete}
                    cancelRef={cancelRef}
                    confirmDelete={confirmDelete}
                    isDeleteDialogOpen={isCourseDeleteDialogOpen}
                    openModalP={openModalP}
                    closeModalP={closeModalP}
                    isModalOpenP={isModalOpenP}
                    fetchData={fetchData}
                    isEditModalOpen={isCourseEditModalOpen} 
                    closeEditModal={closeCourseEditModal} 
                    setIsEditModalOpen={setIsCourseEditModalOpen} 
                />
            </SimpleGrid>
            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 2 }}
                spacing={{ base: "20px", xl: "20px" }}>
                <RoomTable
                    columnsData={RoomData}
                    tableData={RoomsData}
                    handleDelete={handleDeleteRoom}
                    cancelDelete={cancelDeleteR}
                    cancelRef={cancelRef}
                    confirmDelete={confirmDeleteR}
                    isDeleteDialogOpen={isRoomDeleteDialogOpen}
                    openModalR={openModalR}
                    closeModalR={closeModalR}
                    isModalOpenR={isModalOpenR}
                    fetchData={fetchData}
                    isEditModalOpen={isRoomEditModalOpen} 
                    closeEditModal={closeRoomEditModal} 
                    setIsEditModalOpen={setIsRoomEditModalOpen} 
                />
            </SimpleGrid>

        </Box>

    );
}
