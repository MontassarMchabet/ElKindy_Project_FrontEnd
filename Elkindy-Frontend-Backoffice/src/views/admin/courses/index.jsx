import { Box, SimpleGrid } from "@chakra-ui/react";
import CourseTable from "views/admin/courses/components/courseTable";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import  CoursesData from "./variables/columnsData.js";
export default function Settings() {
    const [editedCourse, setEditedCourse] = useState(null); // État pour stocker les données du cours en cours update
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // État pour contrôler l'ouverture et la fermeture de la modal update
    const [CoursessData, setCoursesData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const CourseResponse = await axios.get('http://localhost:8080/api/Course/getall');
            setCoursesData(CourseResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
// La fonction pour ouvrir le formulaire d'update
    const openEditModal = () => {
    setIsEditModalOpen(true);
};

     // Fonction pour fermer la modal d'update
     const closeEditModal = () => {
        setIsEditModalOpen(false);
    };
    // Fonction pour sauvegarder les modifications du cours
    const handleSaveEdit = async () => {
            try {
                // Effectuer la requête API pour MAJ le cours avec les nouvelles données
                await axios.put(`http://localhost:8080/api/Course/update/${editedCourse._id}`, editedCourse);
                console.log("Course updated successfully");
                setIsEditModalOpen(false); // Fermer la modal d'édition après la sauvegarde
                fetchData(); // Rafraîchir les données des cours
            } catch (error) {
                console.error("Error updating course:", error);
            }
        };

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deletingUserId, setDeletingUserId] = useState(null);
    const cancelRef = useRef();

    const confirmDelete = (userId) => {
        setDeletingUserId(userId);
        setIsDeleteDialogOpen(true);
    };

    const cancelDelete = () => {
        setIsDeleteDialogOpen(false);
    };
    const handleDelete = async () => {
        setIsDeleteDialogOpen(false);
        try {
            await axios.delete(`http://localhost:8080/api/Course/delete/${deletingUserId}`);
            console.log("Course deleted successfully");
            setIsEditModalOpen(false);
            fetchData();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };
    const [isModalOpenP, setIsModalOpenP] = useState(false);
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
                    isDeleteDialogOpen={isDeleteDialogOpen}
                    openModalP={openModalP}
                    closeModalP={closeModalP}
                    isModalOpenP={isModalOpenP}
                    fetchData={fetchData}
                    isEditModalOpen={isEditModalOpen} // Passer l'état de la modal d'édition
                    closeEditModal={closeEditModal} // Passer la fonction pour fermer la modal d'édition
                    setIsEditModalOpen={setIsEditModalOpen} // Passer la fonction pour sauvegarder les modifications du cours
                />
            </SimpleGrid>

        </Box>

    );
}
