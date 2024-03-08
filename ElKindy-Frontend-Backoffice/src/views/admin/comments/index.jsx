import { Box, SimpleGrid } from "@chakra-ui/react";

import CommentTable from "views/admin/comments/components/commentTable";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import commentsData from "./variables/columnsData";
import { useParams } from "react-router-dom";




export default function Settings() {


    const [commentssData, setCommentsData] = useState([]);
    const { eventId } = useParams();



    useEffect(() => {
        fetchData();
    }, [eventId]);

    const fetchData = async () => {
        try {
            const commentResponse = await axios.get(`http://localhost:9090/event/${eventId}/comments`);;
            setCommentsData(commentResponse.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
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
            await axios.delete(`http://localhost:9090/comment/delete/${deletingId}`);
            console.log("Comment deleted successfully");
            fetchData();
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };





    const [isModalOpenA, setIsModalOpenA] = useState(false);

    //for comment
    const openModalA = () => {
        setIsModalOpenA(true);
    };
    const closeModalA = () => {
        setIsModalOpenA(false);
    };

    return (
        <Box width="2180px" pt={{ base: "130px", md: "80px", xl: "80px" }}>

            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 2 }}
                spacing={{ base: "20px", xl: "20px" }}>

                <CommentTable

                    columnsData={commentsData}
                    tableData={commentssData}
                    handleDelete={handleDelete}

                    cancelDelete={cancelDelete}
                    cancelRef={cancelRef}
                    confirmDelete={confirmDelete}
                    isDeleteDialogOpen={isDeleteDialogOpen}
                    openModalA={openModalA}
                    closeModalA={closeModalA}
                    isModalOpenA={isModalOpenA}
                    fetchData={fetchData}

                />


            </SimpleGrid>
        </Box>

    );
}

