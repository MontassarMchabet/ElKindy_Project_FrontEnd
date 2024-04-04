// Chakra imports
import { Box, SimpleGrid, Select, useColorModeValue } from "@chakra-ui/react";
import ExamTable from "views/admin/examTables/components/ExamTable";
import RevisionTable from "views/admin/examTables/components/RevisionTable";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ExamData } from "./variables/columnsData";
import Quizes from "./components/QuizsTab";
import { QuizesData } from "./variables/columnsData";
export default function Settings() {
  
    const [selectedClass, setSelectedClass] = useState('');
    const [examData, setExamData] = useState([]);
    const [quizData, setQuizData] = useState([]);
    useEffect(() => {
        fetchData();
        fetchQuizData();
    }, []);

    const fetchData = async (classLevel = null) => {
        let url = 'http://localhost:9090/api/exam/';
        if (classLevel) {
          url = `http://localhost:9090/api/exam/byclass/${classLevel}`;
        }
        try {
          const examResponse = await axios.get(url);
          setExamData(examResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      

      const fetchQuizData = async () => {
        const url = 'http://localhost:9090/api/quiz/quizzes/all'; // Route to fetch all quizzes
        try {
          const quizResponse = await axios.get(url);
          setQuizData(quizResponse.data)
          console.log(quizResponse.data)// Return the fetched quiz data
        } catch (error) {
          console.error('Error fetching quiz data:', error);
          
        }
      };
      const [isDeleteDialogOpenQ, setIsDeleteDialogOpenQ] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deletingExamId, setDeletingExamId] = useState(null);
    const [deletingQuizId, setDeletingQuizId] = useState(null);
    const cancelRef = useRef();
    const cancelRefQ = useRef();
    const confirmDelete = (examId) => {
        setDeletingExamId(examId); // Make sure examId is being set here
        setIsDeleteDialogOpen(true);
    };
    
    const confirmDeleteQ = (quizId) => {
        setDeletingQuizId(quizId); // Make sure quizId is being set here
        setIsDeleteDialogOpenQ(true);
    };
    
    const cancelDelete = () => {
        setIsDeleteDialogOpen(false);
    };
    const cancelDeleteQ = () => {
        setIsDeleteDialogOpenQ(false);
    };

    const handleDelete = async () => {
        setIsDeleteDialogOpen(false);
        try {
            await axios.delete(`http://localhost:9090/api/exam/${deletingExamId}`);
            console.log("Exam deleted successfully");
            console.log(deletingExamId)
            fetchData();
        } catch (error) {
            console.error("Error deleting exam :", error);
        }
    };
    const handleDeleteQ = async () => {
        setIsDeleteDialogOpenQ(false);
        if (!deletingQuizId) {
            console.error("Quiz ID is null");
            return;
        }
        try {
            await axios.delete(`http://localhost:9090/api/quiz/delete/${deletingQuizId}`);
            console.log("Quiz deleted successfully");
            fetchData();
            window.location.reload(); 
        } catch (error) {
            console.error("Error deleting quiz:", error);
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
const [isEditModalOpenQ, setIsEditModalOpenQ] = useState(false);
const closeEditModalQ = () => {
    setIsEditModalOpenQ(false);
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
                    setExamData={setExamData} 
                />
                <h2></h2>
                 <Quizes columnsData={QuizesData} tableData={quizData} isEditModalOpenQ={isEditModalOpenQ} 
                    closeEditModalQ={closeEditModalQ} 
                    setIsEditModalOpenQ={setIsEditModalOpenQ}
                    handleDeleteQ={handleDeleteQ}
                    cancelDeleteQ={cancelDeleteQ}
                    confirmDeleteQ={confirmDeleteQ}
                    isDeleteDialogOpenQ={isDeleteDialogOpenQ}
                    cancelRefQ={cancelRefQ}/>
            </SimpleGrid>
        </Box>
        </div>
    );
}