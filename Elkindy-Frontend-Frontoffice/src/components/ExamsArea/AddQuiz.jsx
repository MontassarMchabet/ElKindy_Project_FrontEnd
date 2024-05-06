import React, { useState, useEffect } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

const FormQuiz = () => {
  const navigate = useNavigate()


  const [user, setUser] = useState(null);
  const {id} = useParams(); 

  const classOptions = ['Initiation', 'Préparatoire', '1ère année', '2ème année', '3ème année', '4ème année', '5ème année', '6ème année', '7ème année'];
    const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: '',
    type: '',
    format: '',
    pdfFile: '',
    endAtDate: '', 
        endAtTime: '', 
        endAt:'', 
        quiz: ''
  });

  const handleChange = (e) => {
    if (e.target.name === 'pdfFile') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
 // Validation function for the form
const validateFormQ = async () => {
    let errors2 = {};

    
        if (!quizData.quizTitle.trim()) {
            errors2.quizTitle = 'Quiz Title is required';
        }
        // Add other validation rules for step 1 fields if needed
     
        questions.forEach((question, index) => {
            if (!question.question.trim()) {
                errors2[`question_${index}`] = `Question ${index + 1} is required`;
            }

            // Validate answers
            question.answers.forEach((answer, answerIndex) => {
                if (!answer.trim()) {
                    errors2[`answer_${index}_${answerIndex}`] = `Answer ${answerIndex + 1} for question ${index + 1} is required`;
                }
            });

            // Validate correct answer
            if (question.correctAnswer === '') {
                errors2[`correctAnswer_${index}`] = `Correct answer for question ${index + 1} is required`;
            }

            // Validate other fields in each question if needed
            if (!question.messageForCorrectAnswer.trim()) {
                errors2[`messageForCorrectAnswer_${index}`] = `Message for Correct Answer for question ${index + 1} is required`;
            }

            if (!question.messageForIncorrectAnswer.trim()) {
                errors2[`messageForIncorrectAnswer_${index}`] = `Message for Incorrect Answer for question ${index + 1} is required`;
            }

            if (!question.explanation.trim()) {
                errors2[`explanation_${index}`] = `Explanation for question ${index + 1} is required`;
            }

            const numberRegex = /^\d+$/;

// Validate point field
if (!question.point.trim()) {
    errors2[`point_${index}`] = `Point for question ${index + 1} is required`;
} else if (!numberRegex.test(question.point.trim())) {
    errors2[`point_${index}`] = `Point for question ${index + 1} must be a number`;
}
        });
    
    setErrors2(errors2);
    return Object.keys(errors2).length === 0;
};


const [errors2, setErrors2] = useState({});
const [questions, setQuestions] = useState([
    {
        question: '',
        questionType: 'text',
        answers: ['', ''],
        correctAnswer: '',
        messageForCorrectAnswer: '',
        messageForIncorrectAnswer: '',
        explanation: '',
        point: '',
    }
]);

const handleAddQuestion = () => {
    setQuestions(prevQuestions => [
        ...prevQuestions,
        {
            question: '',
            questionType: 'text',
            answers: ['', ''],
            correctAnswer: '',
            messageForCorrectAnswer: '',
            messageForIncorrectAnswer: '',
            explanation: '',
            point: '',
        }
    ]);
};

const handleChangeQuestion = (index, e) => {
    const { name, value } = e.target;
    

    const newQuestions = [...questions];
    newQuestions[index][name] = name === 'correctAnswer' ? (value !== '' ? value.toString() : '0') : value;
   
    setQuestions(newQuestions);
};

const [quizData, setQuizData] = useState({
    quizTitle: '',
    quizSynopsis: '',
    nrOfQuestions: '',
    questions: [],
});


const handleChangeAnswer = (questionIndex, answerIndex, e) => {
    const { value } = e.target;
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = value;
    setQuestions(newQuestions);
};

const handleRemoveQuestion = (index) => {
    setQuestions(prevQuestions => prevQuestions.filter((_, i) => i !== index));
};
const handleAddAnswer = (questionIndex) => {
    setQuestions(prevQuestions => {
        const updatedQuestions = [...prevQuestions];
        const currentQuestion = updatedQuestions[questionIndex];
        if (currentQuestion.answers.length < 4) {
            currentQuestion.answers.push('');
        }
        return updatedQuestions;
    });
};
const handleChangeB = (e) => {
    const { name, value } = e.target;
    setQuizData(prevData => ({
        ...prevData,
        [name]: value
    }));
};
useEffect(() => {
  const fetchUserData = async () => {
    try {
        const storedToken = Cookies.get('token');
        const decodedToken = jwtDecode(storedToken);
        const { userId } = decodedToken;
        const response = await api.get(`http://localhost:9090/api/auth/user/${userId}`);
        
        setUser(response.data);
        
    } catch (error) {
        console.error('Error fetching user data:', error);
       
        return; 
    }
};

fetchUserData();
}, [id]); 


// Define handleSubmitB function
// Define handleSubmitB function
const handleSubmitB = async (e) => {
    e.preventDefault();
    const isValid = await validateFormQ();
    if (isValid) {
        try {
            // Construct the quiz data object
            const dataToSend = {
                quizTitle: quizData.quizTitle,
                quizSynopsis: 'test',
                nrOfQuestions: questions.length,
                questions: questions.map(question => ({
                    question: question.question,
                    questionType: question.questionType,
                    answers: question.answers,
                    correctAnswer: question.correctAnswer,
                    messageForCorrectAnswer: question.messageForCorrectAnswer,
                    messageForIncorrectAnswer: question.messageForIncorrectAnswer,
                    explanation: question.explanation,
                    point: question.point
                }))
            };

            
            const response = await axios.post('http://localhost:9090/api/quiz/quizzes', dataToSend);

            

            navigate(-1);
        } catch (error) {
            
            console.error('Error saving quiz:', error.message);
           
        }
    } else {
        
        console.log('Form validation errors:', errors2);
        
    }
};


  return (
    <div className="consultation-form-wrap" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '50%' }}>
        <h4 className="title">Add Quiz</h4>
        <form onSubmit={handleSubmitB} noValidate style={{ display: 'flex', flexDirection: 'column' }}>
  <div className="form-grp">
    <input
      type="text"
      placeholder="Quiz Title"
      name="quizTitle"
      value={quizData.quizTitle}
      onChange={handleChangeB}
    />
    {errors2.quizTitle && <span style={{ color: 'red' }}>{errors2.quizTitle}</span>}
  </div>
  {/* Add other quiz details inputs */}
  {questions.map((question, index) => (
    <div key={index}>
      <div className="form-grp">
        <label>Question</label>
        <input
          type="text"
          name="question"
          value={question.question}
          onChange={(e) => handleChangeQuestion(index, e)}
        />
        {errors2[`question_${index}`] && <span style={{ color: 'red' }}>{errors2[`question_${index}`]}</span>}
      </div>
      {question.answers.map((answer, answerIndex) => (
        <div className="form-grp" key={answerIndex}>
          <label>Answer {answerIndex + 1}</label>
          <input
            type="text"
            value={answer}
            onChange={(e) => handleChangeAnswer(index, answerIndex, e)}
          />
          {errors2[`answer_${index}_${answerIndex}`] && <span style={{ color: 'red' }}>{errors2[`answer_${index}_${answerIndex}`]}</span>}
        </div>
      ))}
      {question.answers.length < 4 && (
        <button style={{
            padding: '3px 8px', 
            backgroundColor: 'white',
            color: 'blue',
            border: '1px solid blue',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            width: '200px', 
            margin: '0 auto', 
            display: 'block', 
          }} type="button" className="btn" onClick={() => handleAddAnswer(index)}>Add Answer</button>
      )}
      {question.answers.length > 1 && (
        <div className="form-grp">
          <label>Correct Answer</label>
          <select
            value={question.correctAnswer}
            onChange={(e) => handleChangeQuestion(index, e)}
            name="correctAnswer" className="form-select"
            aria-label="Default select example"
          >
            {question.answers.map((answer, answerIndex) => (
              <option key={answerIndex} value={answerIndex}>
                {answer}
              </option>
            ))}
          </select>
          {errors2[`correctAnswer_${index}`] && <span style={{ color: 'red' }}>{errors2[`correctAnswer_${index}`]}</span>}
        </div>
      )}
      <div className="form-grp">
        <label>Message for Correct Answer</label>
        <textarea
         style={{
            width: "100%",
            height: "50px", // Adjust the height as needed
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "15px",
            resize: "vertical" // Allow vertical resizing
          }}
          name="messageForCorrectAnswer"
          value={question.messageForCorrectAnswer}
          onChange={(e) => handleChangeQuestion(index, e)}
        />
        {errors2[`messageForCorrectAnswer_${index}`] && <span style={{ color: 'red' }}>{errors2[`messageForCorrectAnswer_${index}`]}</span>}
      </div>
      <div className="form-grp">
        <label>Message for InCorrect Answer</label>
        <textarea
         style={{
            width: "100%",
            height: "50px", // Adjust the height as needed
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "15px",
            resize: "vertical" // Allow vertical resizing
          }}
          name="messageForIncorrectAnswer"
          value={question.messageForIncorrectAnswer}
          onChange={(e) => handleChangeQuestion(index, e)}
        />
        {errors2[`messageForIncorrectAnswer${index}`] && <span style={{ color: 'red' }}>{errors2[`messageForIncorrectAnswer${index}`]}</span>}
      </div>
      {/* Add other question details inputs as needed */}
      <div className="form-grp">
        <label>Explanation</label>
        <textarea
         style={{
            width: "100%",
            height: "50px", // Adjust the height as needed
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "15px",
            resize: "vertical" // Allow vertical resizing
          }}
          name="explanation"
          value={question.explanation}
          onChange={(e) => handleChangeQuestion(index, e)}
        />
        {errors2[`explanation_${index}`] && <span style={{ color: 'red' }}>{errors2[`explanation_${index}`]}</span>}
      </div>
      <div className="form-grp">
        <label>Point</label>
        <input
          type="text"
          name="point"
          value={question.point}
          onChange={(e) => handleChangeQuestion(index, e)}
        />
        {errors2[`point_${index}`] && <span style={{ color: 'red' }}>{errors2[`point_${index}`]}</span>}
      </div>
      {/* Add other question details inputs as needed */}
      {index > 0 && (
        <button style={{
            padding: '3px 8px', // Adjust padding to make the button smaller
            backgroundColor: 'white',
            color: 'blue',
            border: '1px solid blue',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px', // Adjust font size to make the text smaller
            width: '200px', // Adjust the width of the button
            margin: '0 auto', // Center the button horizontally
            display: 'block', // Ensure the button is displayed as a block element
          }}  type="button" className="btn" onClick={() => handleRemoveQuestion(index)}>Remove Question</button>
      )}
    </div>
  ))}
  <button   style={{
    padding: '3px 8px', 
    backgroundColor: 'white',
    color: 'blue',
    border: '1px solid blue',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px', 
    width: '200px', 
    margin: '0 auto', 
    display: 'block', 
  }} type="button" onClick={handleAddQuestion}>Add Question</button>
  <button className="btn" type="submit" colorScheme="green">Save</button>

</form>
    </div>
    </div>
  );
};

export default FormQuiz;
