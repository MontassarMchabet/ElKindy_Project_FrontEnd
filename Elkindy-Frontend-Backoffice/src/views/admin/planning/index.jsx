import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PlanningTable from "./components/planningTable"; // Assurez-vous d'avoir un composant PlanningTable correspondant
import PlanningData from "./variables/planningData";
import { Box, SimpleGrid } from "@chakra-ui/react";
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
    const cancelRef = useRef();

    useEffect(() => {
        fetchPlannings();
        //fetchCourseOptions();
        fetchRoomOptions();
        fetchTeacherOptions();
        fetchStudentOptions();
        fetchClassroomOptions();
    }, []);

    const fetchPlannings = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api/plannings/getall');
            // Pour chaque planning, récupérez le nom du cours
            const updatedPlannings = await Promise.all(response.data.map(async (planning) => {
                // Récupérez le nom du cours pour ce planning
                //const courseResponse = await axios.get(`http://localhost:9090/api/classroom/getById/${planning.classroomId}`);
                let ClassroomName = "";
                if (planning.classroomId === undefined) {
                    ClassroomName = "Individual";
                } else {
                    const studentResponse = await axios.get(`http://localhost:9090/api/classroom/getById/${planning.classroomId}`);
                    ClassroomName = studentResponse.data.name;
                }
                // Ajoutez le nom du cours au planning
                const RoomResponse = await axios.get(`http://localhost:9090/api/Room/getById/${planning.roomId}`);
                const teacherResponse = await axios.get(`http://localhost:9090/api/auth/user/${planning.teacherId}`);
                let studentName = "";
                if (planning.studentIds === undefined) {
                    studentName = "solfege";
                } else {
                    const studentResponse = await axios.get(`http://localhost:9090/api/auth/user/${planning.studentIds}`);
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
        } catch (error) {
            console.error('Error fetching plannings:', error);
        }
    };
    
  /*   const fetchCourseOptions = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api/classroom/getall');
            setCourseOptions(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }; */
    const fetchClassroomOptions = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api/classroom/getall');
            setclassroomOptions(response.data);
        } catch (error) {
            console.error('Error fetching classroom:', error);
        }
    };
    const fetchRoomOptions  = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api/Room/getall');
            setRoomOptions(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    const fetchTeacherOptions   = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api/auth/profs');
            setTeacherOptions(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    const fetchStudentOptions    = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api/auth/clients');
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
            await axios.delete(`http://localhost:9090/api/plannings/delete/${deletingPlanningId}`);
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
            />
         </SimpleGrid>
     

     </Box>
    );
}
