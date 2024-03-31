import React, { useState, useEffect } from "react";
import Narrative from "./Narrative/Narrative";
import MyButton from "../UI/Button";
//import Quiz from "react-quiz-component";
import Quiz from "react-quiz-component"
import { quiz } from "./Narrative/data";

const SpaceTwo = ({ quizDetailsOrId }) => {
    const [quizResult, setQuizResult] = useState();
    const [quizData, setQuizData] = useState(null);

    useEffect(() => {
      const fetchQuizData = async () => {
        try {
          let quizId = quizDetailsOrId;
          if (typeof quizDetailsOrId === 'object') {
            // If quizDetailsOrId is an object (quiz details), extract the ID
            quizId = quizDetailsOrId._id; // Adjust accordingly based on the structure of quizDetailsOrId
          }
  console.log(quizId)
          const response = await fetch(`http://localhost:9090/api/quiz/quizzes/${quizId}`); // Fetch quiz data by ID
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
    }, [quizDetailsOrId]); 

    if (!quizData) {
      return <div>Loading...</div>; // Placeholder for loading state
    }
  
    return (
      <div style={{ margin: 'auto', width: '500px' }}>
        <Quiz
          quiz={quizData}
          shuffle
          shuffleAnswer
          showInstantFeedback
          // continueTillCorrect
          // onComplete={setQuizResult}
          // onQuestionSubmit={(obj) => console.log('user question results:', obj)}
          disableSynopsis
          timer={60}
          allowPauseTimer
        />
      </div>
    );
  };
export default SpaceTwo;
