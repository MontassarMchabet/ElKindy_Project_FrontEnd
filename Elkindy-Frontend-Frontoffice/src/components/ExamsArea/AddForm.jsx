import React, { useState, useEffect } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

const FormComponent = () => {
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
  const validateForm = () => {
    let errors = {};
  
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
  
  
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
  

    if (!formData.type.trim()) {
      errors.type = 'Type is required';
    }
  
  
    if (!formData.format.trim()) {
      errors.format = 'Format is required';
    }
  
    
    const currentDate = new Date();
    const selectedDate = new Date(formData.endAtDate);
  
    if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
      errors.endAtDate = 'Date must be today or after';
    } else if (selectedDate.toDateString() === currentDate.toDateString()) {
      const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
      const selectedTime = new Date(`01/01/2000 ${formData.endAtTime}`);
      const selectedHour = selectedTime.getHours() * 60 + selectedTime.getMinutes();
  
      if (selectedHour - currentTime < 30) {
        errors.endAtTime = 'Time must be at least 30 minutes from now';
      }
    }
  
   
    setErrors(errors);
  
  
    return Object.keys(errors).length === 0;
  };
  
  const [quizzes, setQuizzes] = useState([]);
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
       
        return; 
    }
};
fetchQuizzes();
fetchUserData();
}, [id]); 

const fetchQuizzes = async () => {
  try {
    const response = await axios.get('http://localhost:9090/api/quiz/quizzes/all');
    setQuizzes(response.data);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
  }};

  const handleQuizSelect = (e) => {
      const selectedQuizId = e.target.value; // Get the selected quiz ID
      setFormData({ ...formData, quiz: selectedQuizId });
    };
  
const handleSubmit = async (e) => {
  e.preventDefault();
  const isValid = validateForm();
  console.log("Submitting form");
  if (isValid) {
      try {
          const combinedDateTime = new Date(`${formData.endAtDate}T${formData.endAtTime}`);
          const formDataToSend = {
              ...formData,
              endAt: combinedDateTime,
          };

          const formDataToSendWithoutDateTime = { ...formDataToSend };
          delete formDataToSendWithoutDateTime.endAtDate;
          delete formDataToSendWithoutDateTime.endAtTime;

          const formDataWithPicture = { ...formDataToSendWithoutDateTime };
          
          if (formDataToSend.format === 'pdf') {
        
            delete formDataWithPicture.quiz;
        } else {
           
            formDataWithPicture.quiz = formData.quiz;
        }
          // Check if a file is present
          if (formDataToSend.pdfFile) {
              const formDataToUpload = new FormData();
              formDataToUpload.append("image", formDataToSend.pdfFile);
              
              const uploadResponse = await axios.post(
                  "http://localhost:9090/api/image/uploadimage",
                  formDataToUpload,
                  {
                      headers: {
                          "Content-Type": "multipart/form-data",
                      },
                  }
              );
              const examPictureUrl = uploadResponse.data.downloadURL[0];
              formDataWithPicture.pdfFile = examPictureUrl;
          }

          const professorId = user._id;
          console.log(professorId)
          const examData = { ...formDataWithPicture, prof: professorId };

          const registerResponse = await axios.post(
              "http://localhost:9090/api/exam/",
              examData
          );
          console.log(registerResponse)
          navigate(-1);
      } catch (error) {
          console.error("Error adding Exam:", error);
      }
  }
};

  return (
    <div className="consultation-form-wrap" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '50%' }}>
        <h4 className="title">Add Exam</h4>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }} noValidate>
        <div className="form-grp">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}
        </div>
        <div className="form-grp">
  <textarea
    style={{
      width: "100%",
      height: "100px", // Adjust the height as needed
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "15px",
      resize: "vertical" // Allow vertical resizing
    }}
    placeholder="Description"
    name="description"
    value={formData.description}
    onChange={handleChange}
  />
  {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
</div>
<div className="form-grp" style={{ display: "flex", alignItems: "center" }}>
  <div style={{ marginRight: "10px", flexGrow: "1" }}>
    <input
      name="endAtDate"
      type="date"
      value={formData.endAtDate}
      onChange={handleChange}
      style={{ width: "100%" }} 
    />
     {errors.endAtDate && <span style={{ color: 'red' }}>{errors.endAtDate}</span>}
  </div>
  <div style={{ flexGrow: "1" }}>
    <input
      name="endAtTime"
      type="time"
      value={formData.endAtTime}
      onChange={handleChange}
      style={{ width: "100%" }} 
    />
     {errors.endAtTime && <span style={{ color: 'red' }}>{errors.endAtTime}</span>}
  </div>
</div>

        <div className="form-grp">
        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="form-select"
            aria-label="Default select example"
        >
            <option value="" disabled>Select Level</option>
    {classOptions.map(option => (
        <option key={option} value={option}>{option}</option>
    ))}
        </select>
        {errors.level && <span style={{ color: 'red' }}>{errors.level}</span>}
        </div>
        <div className="form-grp">
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="" disabled>Select Type</option>
            <option value="revision">Revision</option>
            <option value="end of year exam">End of Year Exam</option>
            <option value="midterm exam">Midterm Exam</option>
          </select>
          {errors.type && <span style={{ color: 'red' }}>{errors.type}</span>}
        </div>
        <div className="form-grp">
          <select
            name="format"
            value={formData.format}
            onChange={handleChange}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="" disabled>Select Format</option>
            <option value="quizz">Quizz</option>
            <option value="pdf">PDF</option>
          </select>
          {errors.format && <span style={{ color: 'red' }}>{errors.format}</span>}
        </div>
        {formData.format === 'quizz' && (
          <div className="form-grp">
            <select
            name="quiId"
            value={formData.quiz}
            onChange={handleQuizSelect}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="" disabled>Select Quiz</option>
            {quizzes.map((quiz) => (
              <option key={quiz._id} value={quiz._id}>
                {quiz.quizTitle}
              </option>
            ))}
          </select>
          </div>
        )}
        {formData.format === 'pdf' && (
          <div className="form-grp">
            <label htmlFor="pdfFileInput">
              Upload PDF File:
              <input
                id="pdfFileInput"
                name="pdfFile"
                type="file"
                accept=".pdf"
                onChange={handleChange}
              />
            </label>
          </div>
        )}
        <button className="btn" type="submit">
          Add Exam
        </button>
      </form>
    </div>
    </div>
  );
};

export default FormComponent;
