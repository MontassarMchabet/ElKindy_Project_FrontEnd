// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import ExamTable from "views/admin/examTables/components/ExamTable";
import RevisionTable from "views/admin/examTables/components/RevisionTable";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ExamData } from "./variables/columnsData";

export default function Settings() {
    const [examData, setExamData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const examResponse = await axios.get('http://localhost:9090/api/exam/');
            setExamData(examResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deletingExamId, setDeletingExamId] = useState(null);
    const cancelRef = useRef();

    const confirmDelete = (examId) => {
        setDeletingExamId(examId);
        setIsDeleteDialogOpen(true);
    };

    const cancelDelete = () => {
        setIsDeleteDialogOpen(false);
    };
    const handleDelete = async () => {
        setIsDeleteDialogOpen(false);
        try {
            await axios.delete(`http://localhost:9090/api/exam/${deletingExamId}`);
            console.log("Exam deleted successfully");
            fetchData();
        } catch (error) {
            console.error("Error deleting exam :", error);
        }
    };

    const [isModalOpenA, setIsModalOpenA] = useState(false);

    //for exam
    const openModalA = () => {
        setIsModalOpenA(true);
    };
    const closeModalA = () => {
        setIsModalOpenA(false);
    };
//for edit
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const closeEditModal = () => {
    setIsEditModalOpen(false);
};
    return (
        <div style={{ overflowX: 'hidden'}}>
        <Box width="2300px" pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 2 }}
                spacing={{ base: "20px", xl: "20px" }}>
                <ExamTable
                    columnsData={ExamData}
                    tableData={examData}
                    handleDelete={handleDelete}
                    cancelDelete={cancelDelete}
                    cancelRef={cancelRef}
                    confirmDelete={confirmDelete}
                    isDeleteDialogOpen={isDeleteDialogOpen}
                    openModalA={openModalA}
                    closeModalA={closeModalA}
                    isModalOpenA={isModalOpenA}
                    fetchData={fetchData}
                    isEditModalOpen={isEditModalOpen} 
                    closeEditModal={closeEditModal} 
                    setIsEditModalOpen={setIsEditModalOpen} 
                />
            </SimpleGrid>
        </Box>
        </div>
    );
}