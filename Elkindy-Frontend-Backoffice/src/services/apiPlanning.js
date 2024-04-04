const handleCreate = async (newPlanning) => {
    try {
        const response = await fetch('http://localhost:9090/api/plannings/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPlanning),
        });
        if (response.ok) {
            return true;
        } else {
            throw new Error('Erreur lors de la création du planning');
        }
    } catch (error) {
        console.error("Erreur lors de la création du planning :", error);
        throw error;
    }
};

const loadPlannings = async () => {
    try {
        const response = await fetch('http://localhost:9090/api/plannings/getall');
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Erreur lors du chargement des plannings');
        }
    } catch (error) {
        console.error("Erreur lors du chargement des plannings :", error);
        throw error;
    }
};

const handleUpdate = async (updatedPlanning) => {
    try {
        const response = await fetch(`http://localhost:9090/api/plannings/update/${updatedPlanning.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPlanning),
        });
        if (response.ok) {
            return true;
        } else {
            throw new Error('Erreur lors de la mise à jour du planning');
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour du planning :", error);
        throw error;
    }
};

const handleDelete = async (id) => {
    try {
        const response = await fetch(`http://localhost:9090/api/plannings/delete/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            return true;
        } else {
            throw new Error('Erreur lors de la suppression du planning');
        }
    } catch (error) {
        console.error("Erreur lors de la suppression du planning :", error);
        throw error;
    }
};

export { handleCreate, loadPlannings, handleUpdate, handleDelete };
