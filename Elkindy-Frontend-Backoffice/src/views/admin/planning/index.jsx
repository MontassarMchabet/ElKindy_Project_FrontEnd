import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PlanningTable from "./components/planningTable"; // Assurez-vous d'avoir un composant PlanningTable correspondant
import  PlanningData from "./variables/planningData";
export default function Planning() {
    const [plannings, setPlannings] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedPlanning, setEditedPlanning] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deletingPlanningId, setDeletingPlanningId] = useState(null);
    const cancelRef = useRef();

    useEffect(() => {
        fetchPlannings();
    }, []);

    const fetchPlannings = async () => {
        
        try {
            const response = await axios.get('http://localhost:8080/api/plannings/getall');
            setPlannings(response.data);
        } catch (error) {
            console.error('Error fetching plannings:', error);
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
            await axios.delete(`http://localhost:8080/api/planning/delete/${deletingPlanningId}`);
            console.log("Planning deleted successfully");
            fetchPlannings();
        } catch (error) {
            console.error("Error deleting planning:", error);
        }
    };

    return (
        <div>
            <PlanningTable
                columnsData={PlanningData}
                tableData={plannings}
                isEditModalOpen={isEditModalOpen}
                editedPlanning={editedPlanning}
                openEditModal={openEditModal}
                closeEditModal={closeEditModal}
                confirmDelete={confirmDelete}
                cancelDelete={cancelDelete}
                isDeleteDialogOpen={isDeleteDialogOpen}
                handleDelete={handleDelete}
                cancelRef={cancelRef}
                fetchData={fetchPlannings} // Si vous avez besoin de rafraîchir les données après une action
            />
        </div>
    );
}
