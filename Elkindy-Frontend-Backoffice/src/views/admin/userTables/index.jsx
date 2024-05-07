import { Box, SimpleGrid } from "@chakra-ui/react";
import AdminTable from "views/admin/userTables/components/AdminTable";
import ClientTable from "views/admin/userTables/components/ClientTable";
import ProfTable from "views/admin/userTables/components/ProfTable";
import React, { useState, useEffect, useRef } from "react";
import api from "services/api";
import { adminsData, profsData, clientsData } from "./variables/columnsData";
import axios from "axios";
export default function Settings() {

    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    // AFFICHAGE
    const [adminssData, setAdminsData] = useState([]);
    const [clientssData, setClientsData] = useState([]);
    const [profssData, setProfsData] = useState([]);
    const [classroomOptions, setclassroomOptions] = useState([]);
    useEffect(() => {
        fetchData();
        fetchClassroomOptions();
    }, []);
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            const adminResponse = await api.get('https://elkindy-project-backend.onrender.com/api/auth/admins', {
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setAdminsData(adminResponse.data);

            const clientResponse = await api.get('https://elkindy-project-backend.onrender.com/api/auth/clients', {
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(clientResponse.data)
            const updatedPlannings = await Promise.all(clientResponse.data.map(async (planning) => {

                let ClassroomName = "";
                if (planning.classroom === undefined) {
                    ClassroomName = "--";
                } else {
                    const studentResponse = await axios.get(`https://elkindy-project-backend.onrender.com/api/classroom/getById/${planning.classroom}`);
                    ClassroomName = studentResponse.data.name;
                    console.log(ClassroomName)
                }

                return {
                    ...planning,
                    courseName: ClassroomName,

                };
            }));

            setClientsData(updatedPlannings);

            const profResponse = await api.get('https://elkindy-project-backend.onrender.com/api/auth/profs', {
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setProfsData(profResponse.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    const fetchClassroomOptions = async () => {
        try {
            const response = await axios.get('https://elkindy-project-backend.onrender.com/api/classroom/getall');
            setclassroomOptions(response.data.classroom);
        } catch (error) {
            console.error('Error fetching classroom:', error);
        }
    };
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    // EDIT UWU
    //admin
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };
    //client
    const [isEditModalOpenC, setIsEditModalOpenC] = useState(false);
    const closeEditModalC = () => {
        setIsEditModalOpenC(false);
    };
    //prof
    const [isEditModalOpenP, setIsEditModalOpenP] = useState(false);
    const closeEditModalP = () => {
        setIsEditModalOpenP(false);
    };
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    // DELETE UWU
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deletingUserId, setDeletingUserId] = useState(null);
    const cancelref = useRef();

    const confirmDelete = (userId) => {
        setDeletingUserId(userId);
        setIsDeleteDialogOpen(true);
    };

    const canceldelete = () => {
        setIsDeleteDialogOpen(false);
    };
    const handledelete = async () => {
        setIsDeleteDialogOpen(false);
        try {
            console.log(deletingUserId);
            await api.delete(`https://elkindy-project-backend.onrender.com/api/auth/deleteUser/${deletingUserId}`);
            fetchData();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    const [isModalOpenA, setIsModalOpenA] = useState(false);
    const [isModalOpenC, setIsModalOpenC] = useState(false);
    const [isModalOpenP, setIsModalOpenP] = useState(false);

    //for admin
    const openModalA = () => {
        setIsModalOpenA(true);
    };
    const closeModalA = () => {
        setIsModalOpenA(false);
    };

    //for client
    const openModalC = () => {
        setIsModalOpenC(true);
    };
    const closeModalC = () => {
        setIsModalOpenC(false);
    };

    //for prof
    const openModalP = () => {
        setIsModalOpenP(true);
    };
    const closeModalP = () => {
        setIsModalOpenP(false);
    };

    return (

        <Box width="2350px" pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 2 }}
                spacing={{ base: "20px", xl: "20px" }}>
                <AdminTable
                    columnsData={adminsData}
                    tabledata={adminssData}
                    handledelete={handledelete}
                    canceldelete={canceldelete}
                    cancelref={cancelref}
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

            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 2 }}
                spacing={{ base: "20px", xl: "20px" }}>
                <ProfTable
                    columnsData={profsData}
                    tabledata={profssData}
                    handledelete={handledelete}
                    canceldelete={canceldelete}
                    cancelref={cancelref}
                    confirmDelete={confirmDelete}
                    isDeleteDialogOpen={isDeleteDialogOpen}
                    openModalP={openModalP}
                    closeModalP={closeModalP}
                    isModalOpenP={isModalOpenP}
                    fetchData={fetchData}
                    isEditModalOpenP={isEditModalOpenP}
                    closeEditModalP={closeEditModalP}
                    setIsEditModalOpenP={setIsEditModalOpenP}
                />
            </SimpleGrid>

            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 2 }}
                spacing={{ base: "20px", xl: "20px" }}>
                <ClientTable
                    columnsData={clientsData}
                    tabledata={clientssData}
                    handledelete={handledelete}
                    canceldelete={canceldelete}
                    cancelref={cancelref}
                    confirmDelete={confirmDelete}
                    isDeleteDialogOpen={isDeleteDialogOpen}
                    openModalC={openModalC}
                    closeModalC={closeModalC}
                    isModalOpenC={isModalOpenC}
                    fetchData={fetchData}
                    isEditModalOpenC={isEditModalOpenC}
                    closeEditModalC={closeEditModalC}
                    setIsEditModalOpenC={setIsEditModalOpenC}
                    classroomoptions={classroomOptions}
                />
            </SimpleGrid>
        </Box>

    );
}
