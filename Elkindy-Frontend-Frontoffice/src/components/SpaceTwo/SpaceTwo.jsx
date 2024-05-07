import React, { useState, useEffect } from "react";
import Narrative from "./Narrative/Narrative";
import MyButton from "../UI/Button";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api';
//import Quiz from "react-quiz-component";
import Quiz from "react-quiz-component"
import { quiz } from "./Narrative/data";
import axios from "axios";

const SpaceTwo = ({ quizDetailsOrId }) => {
    const [quizResult, setQuizResult] = useState();
    const [quizData, setQuizData] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
            const storedToken = Cookies.get('token');
            const decodedToken = jwtDecode(storedToken);
            const { userId } = decodedToken;
            const response = await api.get(`https://elkindy-project-backend.onrender.com/api/auth/user/${userId}`);
            
            setUser(response.data);
            console.log(user._id)
        } catch (error) {
            console.error('Error fetching user data:', error);
           
            return; 
        }
    };

      const fetchQuizData = async () => {
        try {
          let quizId = quizDetailsOrId;
          if (typeof quizDetailsOrId === 'object') {
            // If quizDetailsOrId is an object (quiz details), extract the ID
            quizId = quizDetailsOrId._id; // Adjust accordingly based on the structure of quizDetailsOrId
          }
  console.log(quizId)
          const response = await fetch(`https://elkindy-project-backend.onrender.com/api/quiz/quizzes/${quizId}`); // Fetch quiz data by ID
          if (!response.ok) {
            throw new Error('Failed to fetch quiz data');
          }
          const quiz = await response.json();
          setQuizData(quiz);
        } catch (error) {
          console.error('Error fetching quiz data:', error);
        }
      };
  
      fetchQuizData();
      fetchUserData();
    }, [quizDetailsOrId]); 

    if (!quizData) {
      return <div>Loading...</div>; // Placeholder for loading state
    }
    const saveQuizResults = async (result) => {
      try {
        // If totalPoints is NaN, set it to 0
        const score = isNaN(result.correctPoints) ? 0 : result.correctPoints;
    console.log(result)
        // Replace exam ID with quiz ID
        const quizId = quizDetailsOrId._id;
    
        // Fetch user ID from user data or any other source
        const client = user._id;
    
       // Calculate the number of correct answers
    const numberOfCorrectAnswers = result.numberOfCorrectAnswers || 0;

    // Calculate the total number of questions
    const numberOfQuestions = result.numberOfQuestions || 0;

    // Construct the content string
    const content = `the number of correct answers is ${numberOfCorrectAnswers} / ${numberOfQuestions}`;
    
        // Construct the object to be saved
        const dataToSave = {
          quizz: quizId,
          client: client,
          content: content, // Replace content with the number of correct answers
          score: score,
        };
    console.log(dataToSave);
        // Send request to server to save quiz results
        const response = await axios.post('https://elkindy-project-backend.onrender.com/api/note/quiz/', dataToSave);
    
        console.log(response.data);
      } catch (error) {
        console.error('Error saving quiz results:', error);
      }
    };
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Quiz
        quiz={quizData}
        shuffle
        shuffleAnswer
        // continueTillCorrect
        onComplete={saveQuizResults}
        // onQuestionSubmit={(obj) => console.log('user question results:', obj)}
        disableSynopsis
        timer={1800}
      />
    </div>
    
    );
  };
export default SpaceTwo;
