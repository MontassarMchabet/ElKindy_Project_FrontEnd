import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogCommentForm from "../Blog/BlogDetails/BlogCommentForm";
import BlogComments from "../Blog/BlogDetails/BlogComments";
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api';
import Cookies from 'js-cookie';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";
import { data } from "jquery";
import AnswersPage from "./answers";
import { Popup } from 'reactjs-popup';
import SpaceTwo from "../SpaceTwo/SpaceTwo";

const ExamDet = () => {
    const {id} = useParams(); 
    const [examDetails, setExamDetails] = useState(null);
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false); 
    const [answerFile, setAnswerFile] = useState(null);
    const [userHasAddedAnswer, setUserHasAddedAnswer] = useState(false);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [quizDetailsOrId, setQuizDetailsOrId] = useState(null);
  const [showSpaceTwo, setShowSpaceTwo] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedToken = Cookies.get('token');
                const decodedToken = jwtDecode(storedToken);
                const { userId } = decodedToken;
                
                // Fetch user data
                const response = await api.get(`http://localhost:9090/api/auth/user/${userId}`);
                setUser(response.data);
    
                // Fetch exam details after setting user data
                const examResponse = await fetch(`http://localhost:9090/api/exam/${id}`);
                if (examResponse.ok) {
                    const data = await examResponse.json();
                    setExamDetails(data);
    
                    // Check if user has answered the exam
                    const answerResponse = await axios.get(`http://localhost:9090/api/answer/exam/${id}/client/${userId}`);
                    if (answerResponse.data.answer) {
                        localStorage.setItem(`hasAnswered_${id}`, 'true');
                        setHasAnswered(true);
                    } else {
                        localStorage.removeItem(`hasAnswered_${id}`);
                        setHasAnswered(false);
                    }
                } else {
                    throw new Error('Failed to fetch exam details');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [id]);
  
   
    useEffect(() => {
        const storedHasAnswered = localStorage.getItem(`hasAnswered_${id}`);
        if (storedHasAnswered === 'true') {
            setHasAnswered(true);
        }
    }, [id]);

    useEffect(() => {
      const checkNoteExists = async () => {
        try {
          // Define clientId and quizzId directly within the useEffect hook
          const clientId = user._id;
          const quizzId = examDetails.quiz._id;
  
          const response = await axios.post('http://localhost:9090/api/note/check', { clientId, quizzId });
          setIsButtonDisabled(response.data.isButtonDisabled);
        } catch (error) {
          console.error('Error checking Note document:', error);
        }
      };
  
      checkNoteExists();
    }, [user, examDetails]);

    const handleFileChange = (e) => {
        setAnswerFile(e.target.files[0]);
    };

    const handleSubmitAnswer = async () => {
        try {
            console.log("examDetails:", examDetails);
    
            const isValid = !!answerFile; 
        
            if (isValid && examDetails && user) {
                const examId = examDetails._id;
                const clientId = user._id; 
                console.log(examId)
                console.log(clientId)
                const formDataToSend = new FormData();
                formDataToSend.append("image", answerFile);
    console.log(formDataToSend)
               
                const uploadResponse = await axios.post(
                    "http://localhost:9090/api/image/uploadimage",
                    formDataToSend,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            
               
                const answerPdf = uploadResponse.data.downloadURL[0];
            
                
                const response = await axios.post(
                    "http://localhost:9090/api/answer",
                    { examId, answerPdf, clientId }
                );
            
                // Handle success
                console.log("Answer created:", response.data);
            
                setShowModal(false);
            } else {
                console.error("Please select an answer file or exam details and user are not available");
            }
        } catch (error) {
            console.error("Error creating answer:", error);
        }
    };
    
    const passQuizFunction = () => {
        // Assuming examDetails.quiz holds the quiz details or quiz ID
        const quizDetailsOrId = examDetails.quiz;
        if (quizDetailsOrId) {
          setQuizDetailsOrId(quizDetailsOrId);
          setShowSpaceTwo(true);
          console.log(quizDetailsOrId)
        } else {
          console.error('Quiz details or ID not found.');
        }
        
      };
      
    
    
      return (
        <>
          <section className="blog-details-area pt-175 pb-120">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-10">
                  {examDetails ? (
                    <div className="blog-details-wrap">
                      <div className="bd-content-top text-center">
                        <div className="blog-meta-two">
                          <ul className="list-wrap">
                            <li className="tag">
                              <a href="#">{examDetails.type}</a>
                            </li>
                            <li>
                              <i className="fal fa-calendar"></i>
                              {new Date(examDetails.endAt).toLocaleDateString()} - {new Date(examDetails.endAt).getHours()}:{(new Date(examDetails.endAt).getMinutes() < 10 ? '0' : '') + new Date(examDetails.endAt).getMinutes()}
                            </li>
                          </ul>
                        </div>
                        <h2 className="title">
                          {examDetails.title}
                        </h2>
                        <p>
                          {examDetails.description}
                        </p>

                        {examDetails.format === 'pdf' && (
                    <object data={examDetails.pdfFile} type="application/pdf" width="100%" height="500px">
                      <p>PDF cannot be displayed. <a href={examDetails.pdfFile} target="_blank" rel="noopener noreferrer">Download PDF</a> instead.</p>
                    </object>
                  )}

{examDetails.format === 'quizz' && (
                    <div>
                      <h3>Quiz Title: {examDetails.quiz.quizTitle}</h3>
                      <p>Number of Questions: {examDetails.quiz.nrOfQuestions}</p>
                      {/* You can add more details about the quiz here */}
                    </div>
                  )}
                        {/* Conditional rendering of buttons or message based on user role and exam format */}
                        {user && user.role === 'client' && (
                          <>
                            {examDetails.endAt && new Date(examDetails.endAt) < new Date() ? (
                              // Show "Exam expired" message if the endAt date and time have passed
                              <p>Exam ended</p>
                            ) : (
                              // Render buttons based on exam format
                              <>
                                {examDetails.format === 'pdf' && (
                                  // Render "Add Answer to Exam" button for PDF format
                                  <Button
                                    className="btn"
                                    style={{ fontSize: '18px', padding: '10px 20px' }}
                                    onClick={() => setShowModal(true)}
                                    disabled={hasAnswered} // Disable the button if hasAnswered is true
                                  >
                                    {hasAnswered ? 'Exam Answered' : 'Add Answer to Exam'}
                                  </Button>
                                )}
                                {examDetails.format === 'quizz' && (
                                  // Render "Pass Quiz" button for Quizz format
                                  <Button
  className="btn"
  style={{ fontSize: '18px', padding: '10px 20px' }}
  onClick={passQuizFunction}
  disabled={isButtonDisabled}
>
  {isButtonDisabled ? 'Quiz Answered' : 'Pass Quiz'}
</Button>

                                )}
                              </>
                            )}
                          </>
                        )}
      
                        {/* Modal for adding answer */}
                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                          <Modal.Header closeButton>
                            <Modal.Title>Add Answer to Exam</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form>
                              <Form.Group>
                                <Form.Label>Upload Answer File</Form.Label>
                                <Form.Control type="file" accept=".pdf" onChange={handleFileChange} />
                              </Form.Group>
                            </Form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button 
                              className="btn" 
                              style={{ 
                                fontSize: '18px', 
                                padding: '10px 20px',
                                backgroundColor: 'orange', // Set background color to orange
                                color: 'white', // Set text color to white
                                border: 'none', // Remove border
                                marginRight: '10px' // Add some space between buttons
                              }} 
                              onClick={() => setShowModal(false)}
                            >
                              Close
                            </Button>
                            <Button 
                              className="btn" 
                              style={{ 
                                fontSize: '18px', 
                                padding: '10px 20px' 
                              }} 
                              onClick={handleSubmitAnswer}
                            >
                              Submit Answer
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                  ) : (
                    <p>Loading exam details...</p>
                  )}
                </div>
              </div>
              {/* Conditional rendering of AnswersPage based on user role */}
              {(user && (user.role === 'prof')) && <AnswersPage examId={id} />}
            </div>
          </section>
          {showSpaceTwo && <SpaceTwo quizDetailsOrId={quizDetailsOrId} />}
 
        </>
      );
      
};

export default ExamDet;
