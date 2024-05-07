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
import pdfToText from 'react-pdftotext'
import { Popup } from 'reactjs-popup';
import SpaceTwo from "../SpaceTwo/SpaceTwo";
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedToken = Cookies.get('token');
                const decodedToken = jwtDecode(storedToken);
                const { userId } = decodedToken;
                
                // Fetch user data
                const response = await api.get(`https://elkindy-project-backend.onrender.com/api/auth/user/${userId}`);
                setUser(response.data);
    
                // Fetch exam details after setting user data
                const examResponse = await fetch(`https://elkindy-project-backend.onrender.com/api/exam/${id}`);
                if (examResponse.ok) {
                    const data = await examResponse.json();
                    setExamDetails(data);
    
                    // Check if user has answered the exam
                    const answerResponse = await axios.get(`https://elkindy-project-backend.onrender.com/api/answer/exam/${id}/client/${userId}`);
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
          
          const clientId = user._id;
          const quizzId = examDetails.quiz._id;
  
          const response = await axios.post('https://elkindy-project-backend.onrender.com/api/note/check', { clientId, quizzId });
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

    function calculateSimilarity(text1, text2) {
     
      const tokenize = (text) => {
          return new Set(text.toLowerCase().match(/\b\w+\b/g));
      };
  
     
      const dotProduct = (vector1, vector2) => {
          let product = 0;
          for (const word in vector1) {
              if (word in vector2) {
                  product += vector1[word] * vector2[word];
              }
          }
          return product;
      };
  
     
      const magnitude = (vector) => {
          let sum = 0;
          for (const word in vector) {
              sum += Math.pow(vector[word], 2);
          }
          return Math.sqrt(sum);
      };
  
      // Tokenize both texts
      const tokens1 = tokenize(text1);
      const tokens2 = tokenize(text2);
  
      const vector1 = {};
      const vector2 = {};
      for (const word of tokens1) {
          vector1[word] = 1; 
      }
      for (const word of tokens2) {
          vector2[word] = 1;
      }
  
      
      const dotProd = dotProduct(vector1, vector2);
      const mag1 = magnitude(vector1);
      const mag2 = magnitude(vector2);
      const similarity = dotProd / (mag1 * mag2);
  
      return similarity;
  }


    const handleSubmitAnswer = async () => {
      try {
          
          const isValid = !!answerFile;
          let maxSimilarity = 0; 
          if (isValid && examDetails && user) {
              const examId = examDetails._id;
              const clientId = user._id;
              
              
              const pdfAnswersResponse = await axios.get(`https://elkindy-project-backend.onrender.com/api/answer/answers/${examId}`);
        const answerPdfUrls = pdfAnswersResponse.data.map(answer => answer.answerPdf);
        
              const text = await pdfToText(answerFile);
            
              let isCheatingDetected = false;
              for (let i = 0; i < answerPdfUrls.length; i++) {
               
                   
                try {

                  const pdfUrl = answerPdfUrls[i];
                  const response = await axios.get('https://elkindy-project-backend.onrender.com/api/answer/fetch-pdf', {
                    params: { url: pdfUrl },
                    responseType: 'blob' 
                });
                
                const pdfBlob = response.data;
              
                const filename = `answer_${i}.pdf`;
                
                const pdfFile = new File([pdfBlob], filename, { type: 'application/pdf' });
                  const pdfAnswerText = await pdfToText(pdfFile);
                  const similarity = calculateSimilarity(text, pdfAnswerText);

                  if (similarity > maxSimilarity) {
                    maxSimilarity = similarity; 
                }
        
                  if (similarity >= 0.7) { 
                      isCheatingDetected = true;
                      break;
                  }
                  
                } catch (error) {
                  console.error("Error extracting text from PDF:", error);
                
              }
              }
  
              if (isCheatingDetected) {
                  
                const confirmMessage = `We have detected a significant similarity (${(maxSimilarity * 100).toFixed(2)}%) between your answer and another submission for this exam. We take academic integrity seriously and do not tolerate cheating. Are you sure you want to proceed with uploading your answer?`;
                const confirmSubmission = window.confirm(confirmMessage);
                  if (confirmSubmission) {
                     
                      const formDataToSend = new FormData();
                      formDataToSend.append("image", answerFile);
                     
                      const uploadResponse = await axios.post(
                          "https://elkindy-project-backend.onrender.com/api/image/uploadimage",
                          formDataToSend,
                          {
                              headers: {
                                  "Content-Type": "multipart/form-data",
                              },
                          }
                      );
  
                      const answerPdf = uploadResponse.data.downloadURL[0];
                      const response = await axios.post(
                          "https://elkindy-project-backend.onrender.com/api/answer",
                          { examId, answerPdf, clientId }
                      );
                      window.location.reload();
                      setShowModal(false);
                  } else {
                      console.log('Submission cancelled.');
                  }
              } else {
                  
                  const formDataToSend = new FormData();
                  formDataToSend.append("image", answerFile);
                  const uploadResponse = await axios.post(
                      "https://elkindy-project-backend.onrender.com/api/image/uploadimage",
                      formDataToSend,
                      {
                          headers: {
                              "Content-Type": "multipart/form-data",
                          },
                      }
                  );
  
                  const answerPdf = uploadResponse.data.downloadURL[0];
                  const response = await axios.post(
                      "https://elkindy-project-backend.onrender.com/api/answer",
                      { examId, answerPdf, clientId }
                  );
                  window.location.reload();
                  setShowModal(false);
              }
          } else {
              console.error("Please select an answer file or exam details and user are not available");
          }
      } catch (error) {
          console.error("Error creating answer:", error);
      }
  };
  
    const handleDeleteExam = async (examId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this exam?');
        
        if (confirmDelete) {
            try {
               
                const response = await axios.delete(`https://elkindy-project-backend.onrender.com/api/exam/${examId}`);
        
               
                if (response.status === 200) {
                   
                    navigate(-1);
                } else {
                 
                    console.error('Failed to delete exam.');
                }
            } catch (error) {
               
                console.error('Error deleting exam:', error);
            }
        } else {
            
            console.log('Deletion canceled by user.');
        }
    };
    
    const passQuizFunction = () => {
        // Assuming examDetails.quiz holds the quiz details or quiz ID
        const quizDetailsOrId = examDetails.quiz;
        if (quizDetailsOrId) {
          setQuizDetailsOrId(quizDetailsOrId);
          setShowSpaceTwo(true);
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
                          {examDetails.title} {user && user.role === 'prof' && user._id === examDetails.prof && (
                                            <Button 
                                            onClick={() => handleDeleteExam(examDetails._id)} 
                                            style={{ 
                                                fontSize: '14px', 
                                                padding: '5px 10px', 
                                                backgroundColor: '#FFCC80', // Light orange color
                                                color: 'white', 
                                                border: 'none', 
                                                borderRadius: '4px' // Optional: adds a slight border radius for rounded corners
                                            }}
                                        >
                                            Delete Exam
                                        </Button>
                                        )}
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
                             
                              <p>Exam ended</p>
                            ) : (
                              
                              <>
                                {examDetails.format === 'pdf' && (
                                  
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
