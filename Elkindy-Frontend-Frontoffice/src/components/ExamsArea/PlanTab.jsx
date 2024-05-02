import React, { useEffect,useMemo, useState } from "react";
import axios from "axios";
import { ViewIcon, DeleteIcon, EditIcon,Icon } from "@chakra-ui/icons";
import { Modal, Button, Form } from 'react-bootstrap';
const PlanTable = ({ notes }) => {
    const [plannings, setPlannings] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedRoom, seteditedRoom] = useState({}); 
    const [evaluation, setEvaluation] = useState();
    const closeEditModal = () => {
        setIsEditModalOpen(false);
       
    };
  
    const handleEdit = (note) => {
        seteditedRoom(note); 
        console.log("edited room :", editedRoom);
        setShowModal(true); 
      };
     
     const [showModal, setShowModal] = useState(false);
     const handleSaveEdit = async () => {
        try {
          // Update the evaluation value in the editedRoom object
          const updatedRoom = { ...editedRoom, evaluation };
          
          // Perform the API request to update the planning with the new data
          await axios.put(`http://localhost:9090/api/plannings/updateevaluation/${editedRoom._id}`, updatedRoom);
      
          console.log("Planning updated successfully");
          setIsEditModalOpen(false);
          window.location.reload();
        } catch (error) {
          console.error("Error updating plannings:", error);
        }
        setShowModal(false);
      };

    return (
        <div className="note-table-container" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px' }}>
            <h2>Classes</h2>
            <table className="note-table" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Student</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Date</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Evaluation</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Add Evaluation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.map((note, index) => (
                            <tr key={index}>
                                              <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{note.Subject}</td>

                                <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{new Date(note.date).toLocaleDateString()}</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
  {note.evaluation ? note.evaluation : "No evaluation yet"}
</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                                {/* Eye icon for viewing */}
                                

<EditIcon
                                                   w='20px'
                                                   h='20px'
                                                   me='5px'
                                                   color={"green.500"}
                                                   cursor="pointer"
                                                   onClick={() => handleEdit(note)}
                                                   />
<Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add Evaluation to student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
    <Form>
    <Form.Group className="d-flex align-items-center">
    <Form.Label className="mr-2">Evaluation:</Form.Label>
    <Form.Control 
    type="text" 
    value={evaluation} 
    onChange={(e) => {
        const value = e.target.value;
        setEvaluation(value);}}
/>
    <Button 
        className="btn" 
        style={{ fontSize: '15px', marginLeft:'5px',marginRight:'5px',padding: '10px 20px' }} 
        onClick={handleSaveEdit}
    >
        Submit
    </Button>
</Form.Group>

    </Form>
</Modal.Body>
            </Modal>



                                {/* Report icon for reporting */}
                               {/*  <i className="fal fa-exclamation-triangle" style={{ color: 'red', cursor: 'pointer' }}></i>*/}
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    );
};

export default PlanTable;