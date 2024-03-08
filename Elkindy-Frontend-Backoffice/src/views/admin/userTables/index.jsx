import { Box, SimpleGrid } from "@chakra-ui/react";
import AdminTable from "views/admin/userTables/components/AdminTable";
import ClientTable from "views/admin/userTables/components/ClientTable";
import ProfTable from "views/admin/userTables/components/ProfTable";
import React, { useState, useEffect, useRef } from "react";
import api from "services/api";
import { adminsData, profsData, clientsData } from "./variables/columnsData";

export default function Settings() {

    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    // AFFICHAGE
    const [adminssData, setAdminsData] = useState([]);
    const [clientssData, setClientsData] = useState([]);
    const [profssData, setProfsData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            const adminResponse = await api.get('http://localhost:9090/api/auth/admins', {
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setAdminsData(adminResponse.data);

            const clientResponse = await api.get('http://localhost:9090/api/auth/clients', {
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setClientsData(clientResponse.data);

            const profResponse = await api.get('http://localhost:9090/api/auth/profs', {
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
            await api.delete(`http://localhost:9090/api/auth/deleteUser/${deletingUserId}`);
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
        <div style={{ overflowX: 'hidden' }}>
            <Box width="3150px" pt={{ base: "130px", md: "80px", xl: "80px" }}>
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
                    />
                </SimpleGrid>
            </Box>
        </div>
    );
}
