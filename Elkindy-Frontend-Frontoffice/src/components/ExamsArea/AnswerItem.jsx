import React, { useState, useEffect } from "react";
import cn from "classnames";
import { useParams } from "react-router-dom";
import { Modal, Button, Form } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api';
import Cookies from 'js-cookie';
import axios from "axios";

const AnswerItemCom = ({ item, className, onEvaluate }) => {
    const {id} = useParams();
    const createdAt = new Date(item.created_at);
    const [user, setUser] = useState(null);
    const date = createdAt.toLocaleDateString();
    const [showModal, setShowModal] = useState(false);
    const [evaluation, setEvaluation] = useState(0);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedToken = Cookies.get('token');
                const decodedToken = jwtDecode(storedToken);
                const { userId } = decodedToken;
                const response = await api.get(`http://localhost:9090/api/auth/user/${userId}`);
                
                setUser(response.data);
                console.log(user._id)
            } catch (error) {
                console.error('Error fetching user data:', error);
                // If user data cannot be fetched, handle the error accordingly
                // For example, you can show a message to the user or retry fetching user data
                return; // Stop execution if user data cannot be fetched
            }
        };
        fetchUserData();
        
    }, [id]);
    const handleEvaluate = () => {
        setShowModal(true);
    };
    const handleSubmit = async () => {
        try {
            const answerId = item.id; 
            const teacherId = user._id; 
            const content = "Your evaluation"; 
            const score = evaluation; 
    
            
            console.log("Answer ID:", answerId);
            console.log("Teacher ID:", teacherId);
            console.log("Content:", content);
            console.log("Score:", score);
    
            const response = await axios.post(
                'http://localhost:9090/api/note/',
                { answerId, teacherId, content, score }
            );
    
            console.log("Response:", response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error assigning score:', error);
        }
        setShowModal(false);
    };
    
    
    return (
        <>
        <div>
            <a href="#" className="services-item-four" style={{ backgroundColor: "white", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", height: "180px", overflow: "hidden", display: "flex", flexDirection: "column"}}>
                <div className={cn("comments-box", className)} style={{ display: "flex", alignItems: "left" }}>
                    <div className="comments-avatar">
                        <img src={item.src} alt="" />
                    </div>

                    <div className="comment-text" style={{ flexGrow: 1 }}>
                        <span>
                            <h4 className="title">{item.author}</h4>
                        </span>
                        <span>
                        <i className="fal fa-medal"></i>{item.score}
                        </span>
                        <span>
                            <i className="fal fa-calendar-alt"></i>
                            {date}
                        </span>
                        
                    </div>

                    <button 
    onClick={handleEvaluate} 
    disabled={item.score !== null && item.score !== undefined && item.score !== '--/20'} 
    style={{ 
        backgroundColor: item.score !== null && item.score !== undefined && item.score !== '--/20' ? "grey" : "#4CAF50", 
        color: "white", 
        padding: "10px 20px", 
        textAlign: "center", 
        textDecoration: "none", 
        display: "inline-block", 
        fontSize: "16px", 
        cursor: "pointer", 
        borderRadius: "25px", 
        transition: "background-color 0.3s ease", 
        border: "none" 
    }}
>
    Evaluate <i className="fal fa-pencil" style={{ marginLeft: "5px" }}></i>
</button>


                </div>
            </a>

            
        </div>
        
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add Evaluation to Answer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
    <Form>
    <Form.Group className="d-flex align-items-center">
    <Form.Label className="mr-2">Evaluation Number:</Form.Label>
    <Form.Control 
    type="number" 
    value={evaluation} 
    onChange={(e) => {
        const value = Math.max(0, Math.min(20, parseInt(e.target.value))); // Ensure value is between 0 and 20
        setEvaluation(isNaN(value) ? '' : value); // Set the state with the sanitized value
    }}
    min={0} // Set the minimum allowed value
    max={20} // Set the maximum allowed value
/>
    <Button 
        className="btn" 
        style={{ fontSize: '15px', marginLeft:'5px',marginRight:'5px',padding: '10px 20px' }} 
        onClick={handleSubmit}
    >
        Submit
    </Button>
</Form.Group>

    </Form>
    <object data={item.comment} type="application/pdf" width="100%" height="500px">
        <p>PDF cannot be displayed. <a href={item.comment} target="_blank" rel="noopener noreferrer">Download PDF</a> instead.</p>
    </object>
</Modal.Body>
            </Modal>
        </>
    );
};
    
    export default AnswerItemCom;