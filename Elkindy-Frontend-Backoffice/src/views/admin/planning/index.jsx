import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PlanningTable from "./components/planningTable"; // Assurez-vous d'avoir un composant PlanningTable correspondant
import PlanningData from "./variables/planningData";
import { Box, SimpleGrid } from "@chakra-ui/react";
import ReactPaginate from 'react-paginate';
export default function Planning() {
    const [plannings, setPlannings] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedPlanning, setEditedPlanning] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deletingPlanningId, setDeletingPlanningId] = useState(null);
    //const [courseOptions, setCourseOptions] = useState([]);
    const [roomOptions, setRoomOptions] = useState([]);
    const [teacherOptions, setTeacherOptions] = useState([]);
    const [studentOptions, setStudentOptions] = useState([]);
    const [classroomOptions, setclassroomOptions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0); // Ajoutez un état pour la page courante
    const [pageCount, setPageCount] = useState(0); // Ajoutez un état pour le nombre total de pages
    const cancelRef = useRef();
    const itemsPerPage = 4
    useEffect(() => {
        fetchPlannings();
        //fetchCourseOptions();
        fetchRoomOptions();
        fetchTeacherOptions();
        fetchStudentOptions();
        fetchClassroomOptions();
    }, [currentPage]);

    const fetchPlannings = async () => {
        try {
            const response = await axios.get(`https://elkindy-project-backend.onrender.com/api/plannings/getall?page=${currentPage}&_limit=${itemsPerPage}`);
            console.log(response.data.plannings)
            // Pour chaque planning, récupérez le nom du cours
            const updatedPlannings = await Promise.all(response.data.plannings.map(async (planning) => {
                // Récupérez le nom du cours pour ce planning
                //const courseResponse = await axios.get(`https://elkindy-project-backend.onrender.com/api/classroom/getById/${planning.classroomId}`);
                let ClassroomName = "";
                if (planning.classroomId === undefined) {
                    ClassroomName = "--";
                } else {
                    const studentResponse = await axios.get(`https://elkindy-project-backend.onrender.com/api/classroom/getById/${planning.classroomId}`);
                    ClassroomName = studentResponse.data.name;
                }
                // Ajoutez le nom du cours au planning
                const RoomResponse = await axios.get(`https://elkindy-project-backend.onrender.com/api/Room/getById/${planning.roomId}`);
                const teacherResponse = await axios.get(`https://elkindy-project-backend.onrender.com/api/auth/user/${planning.teacherId}`);
                let studentName = "";
                if (planning.studentIds === undefined) {
                    studentName = "--";
                } else {
                    const studentResponse = await axios.get(`https://elkindy-project-backend.onrender.com/api/auth/user/${planning.studentIds}`);
                    studentName = studentResponse.data.name;
                }
                return {
                    ...planning,
                     courseName: ClassroomName, 
                    RoomName: RoomResponse.data.room_number,
                    TeacherName: teacherResponse.data.name,
                    studentName: studentName,
                };
            }));
            setPlannings(updatedPlannings);
            setPageCount(Math.ceil(response.data.totalDocuments / itemsPerPage));
            //console.log(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching plannings:', error);
        }
    };
    
   /*  const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected+1); // Mettez à jour la page courante lors du clic sur une nouvelle page
        //console.log(selectedPage.selected);
    }; */
    const handlePageClick = (nextPage) => {
        setCurrentPage(nextPage);
      };
    const fetchClassroomOptions = async () => {
        try {
            const response = await axios.get('https://elkindy-project-backend.onrender.com/api/classroom/getall');
            setclassroomOptions(response.data.classroom);
        } catch (error) {
            console.error('Error fetching classroom:', error);
        }
    };
    const fetchRoomOptions  = async () => {
        try {
            const response = await axios.get('https://elkindy-project-backend.onrender.com/api/Room/getall');
            setRoomOptions(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    const fetchTeacherOptions   = async () => {
        try {
            const response = await axios.get('https://elkindy-project-backend.onrender.com/api/auth/profs');
            setTeacherOptions(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    const fetchStudentOptions    = async () => {
        try {
            const response = await axios.get('https://elkindy-project-backend.onrender.com/api/auth/clients');
            setStudentOptions(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    const openEditModal = (planning) => {
        setIsEditModalOpen(true);
        setEditedPlanning(planning);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditedPlanning(null);
    };

    const confirmDelete = (planningId) => {
        setDeletingPlanningId(planningId);
        setIsDeleteDialogOpen(true);
    };

    const cancelDelete = () => {
        setIsDeleteDialogOpen(false);
        setDeletingPlanningId(null);
    };

    const handleDelete = async () => {
        setIsDeleteDialogOpen(false);
        try {
            await axios.delete(`https://elkindy-project-backend.onrender.com/api/plannings/delete/${deletingPlanningId}`);
            console.log("Planning deleted successfully");
            fetchPlannings();
        } catch (error) {
            console.error("Error deleting planning:", error);
        }
    };
    const [isModalOpenR, setIsModalOpenR] = useState(false);
    const openModalR = () => {
        setIsModalOpenR(true);
    };
    const closeModalR = () => {
        setIsModalOpenR(false);
    };
    return (
   
         <Box width="3150px" pt={{ base: "130px", md: "80px", xl: "80px" }}>
    
        
         <SimpleGrid
             mb='20px'
             columns={{ sm: 1, md: 2 }}
             spacing={{ base: "20px", xl: "20px" }}>
              <PlanningTable
                columnsData={PlanningData}
                tableData={plannings}
                handleDelete={handleDelete}
                cancelDelete={cancelDelete}
                cancelRef={cancelRef}
                confirmDelete={confirmDelete}
                isDeleteDialogOpen={isDeleteDialogOpen}
                openModalR={openModalR}
                closeModalR={closeModalR}
                isModalOpenR={isModalOpenR}
                fetchData={fetchPlannings} // Si vous avez besoin de rafraîchir les données après une action
                isEditModalOpen={isEditModalOpen}
                closeEditModal={closeEditModal}
                setIsEditModalOpen={setIsEditModalOpen}
                //courseOptions={courseOptions}
                roomOptions={roomOptions}
                teacherOptions={teacherOptions}
                studentOptions={studentOptions}
                classroomoptions={classroomOptions}
                pageCount={pageCount}
                handlePageClick={handlePageClick}
                currentPage={currentPage}
            />
         </SimpleGrid>
     

     </Box>
    );
}
