import axios from "axios";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, Textarea } from "@chakra-ui/react";
import { ViewIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { AddIcon } from '@chakra-ui/icons'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, FormControl, FormLabel, Input, Grid, SimpleGrid ,Select } from "@chakra-ui/react";
import { AnswersData } from "../variables/columnsData";
import Answers from "./AnswersTab";
import React, { useState, useEffect, useRef ,useMemo} from "react";
import {
    Flex,
    Table,
    Progress,
    Icon,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import {
    MdOutlineMoreHoriz,
    MdOutlinePerson,
    MdOutlineCardTravel,
    MdOutlineLightbulb,
    MdOutlineSettings,
} from "react-icons/md";

import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";
import Card from "components/card/Card";
//import Menu from "components/menu/MainMenu";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import Information from "views/admin/profile/components/Information";


export default function ColumnsTable(props) {
    const { columnsData, tableData, handleDelete, cancelDelete, cancelRef, confirmDelete, isDeleteDialogOpen,
        isModalOpenA, openModalA, closeModalA, fetchData , isEditModalOpen, closeEditModal,setIsEditModalOpen,setExamData} = props;

    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const cardShadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "unset"
    );
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
    const textColorSecondary = "gray.400";
    const { ...rest } = props;
    const iconColor = useColorModeValue("brand.500", "white");
    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    
    const [editedExam, setEditedExam] = useState({});
    ////////////////////////
        // Fonction pour sauvegarder les modifications du cours
        const handleSaveEdit = async () => {
            try {
                
                await axios.put(`http://localhost:9090/api/exam/${editedExam._id}`, editedExam);
                console.log("Exam updated successfully");
                setIsEditModalOpen(false); 
                fetchData(); 
            } catch (error) {
                console.error("Error updating exam:", error);
            }
        };
    const handleEdit = (exam) => {
       setEditedExam(exam);
       openEditModal(); 
    };

// La fonction pour ouvrir le formulaire d'édition
    const openEditModal = () => {
    setIsEditModalOpen(true);
};


const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Fetch quizzes when the component mounts
    fetchQuizzes();
  }, []);

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
    


const [isModalOpenB, setIsModalOpenB] = useState(false);
    const [step, setStep] = useState(1);
    const [quizData, setQuizData] = useState({
        quizTitle: '',
        quizSynopsis: '',
        nrOfQuestions: '',
        questions: [],
    });

    const openModalB = () => {
        setIsModalOpenB(true);
    };

    const closeModalB = () => {
        setIsModalOpenB(false);
        setStep(1); // Reset step when modal is closed
    };

    const handleChangeB = (e) => {
        const { name, value } = e.target;
        setQuizData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };


// Define handleSubmitB function
const handleSubmitB = async (e) => {
    e.preventDefault();
    const isValid = await validateFormQ();
    // Call the form validation function
    

    // Check if there are any errors
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

            // Make a POST request to save the quiz data
            const response = await axios.post('http://localhost:9090/api/quiz/quizzes', dataToSend);

            // Handle successful response
            console.log('Quiz saved successfully:', response.data);

            // Close the modal
            closeModalB();
            window.location.reload();
        } catch (error) {
            // Handle errors
            console.error('Error saving quiz:', error.message);
            // You can optionally set an error state or display an error message to the user
        }
    } else {
        // Handle validation errors
        console.log('Form validation errors:', errors);
        // You can optionally set an error state or display error messages to the user
    }
};

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
        console.log("Name:", name); // Check if name is correct
        console.log("Value:", value); // Check if value is correct
    
        const newQuestions = [...questions];
        newQuestions[index][name] = name === 'correctAnswer' ? (value !== '' ? value.toString() : '0') : value;
        console.log("New Questions:", newQuestions); // Check if newQuestions has correct values
        setQuestions(newQuestions);
    };
    
    
    
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
    


///////////////////////

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        initialState,
    } = tableInstance;
    initialState.pageSize = 99999999999999999;

    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    const {
        isOpen: isOpen1,
        onOpen: onOpen1,
        onClose: onClose1,
    } = useDisclosure();
  

    const bgList = useColorModeValue("white", "whiteAlpha.100");
    const bgShadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
        "unset"
    );
    const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const bgHover = useColorModeValue(
        { bg: "secondaryGray.400" },
        { bg: "whiteAlpha.50" }
    );
    const bgFocus = useColorModeValue(
        { bg: "secondaryGray.300" },
        { bg: "whiteAlpha.100" }
    );
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);



    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [examInfo, setExamInfo] = useState(null);
    const [answersData, setAnswersData] = useState([]);
    const handleView = async (examData) => {
        try {
            // Fetch answers data before opening the modal
            const answersData = await fetchAnswersData(examData._id); // Assuming examData has an 'id' property
            setExamInfo({ ...examData, answersData });
            setAnswersData(answersData)
            console.log(examData._id)
            console.log(answersData)
            setIsModalViewOpen(true);
        } catch (error) {
            console.error('Error while handling view:', error);
            // Handle error
        }
    };
    const closeModalViewA = () => {
        setIsModalViewOpen(false);
    };
    const [errors2, setErrors2] = useState({});

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        level:"",
        type: "",
        format: "",
        pdfFile: "",
        endAtDate: '', 
        endAtTime: '', 
        endAt:'',
        quiz: ''
    });

    const classOptions = ['Initiation', 'Préparatoire', '1ère année', '2ème année', '3ème année', '4ème année', '5ème année', '6ème année', '7ème année'];
    const [selectedClass, setSelectedClass] = useState(''); // No default selected class
   
    const handleClassChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedClass(selectedValue);
        if (selectedValue) {
          fetchData(selectedValue);
        } else {
          fetchData();
        }
      };
    
    const [errors, setErrors] = useState({});

    
    const handleChange = (e) => {
        if (e.target.type === "file") {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        }  else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

// Validation function for the form
const validateFormQ = () => {
    let errors2 = {};

    if (step === 1) {
        if (!quizData.quizTitle.trim()) {
            errors2.quizTitle = 'Quiz Title is required';
        }
        // Add other validation rules for step 1 fields if needed
    } else if (step === 2) {
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
    }
    setErrors2(errors2);
    return Object.keys(errors2).length === 0;
};

    const validateForm = async () => {
        let errors = {};

        if (!formData.title.trim()) {
            errors.title = 'All fields are required'
        } else if (!formData.description.trim()) {
            errors.description = 'All fields are required'
        } else if (!formData.type.trim()) {
            errors.type = 'All fields are required'
        } else if (!formData.format.trim()) {
            errors.format = 'All fields are required'
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
     
      const fetchAnswersData = async (examId) => {
        try {
            // Make an API call to fetch answers
            const response = await fetch(`http://localhost:9090/api/answer/answers/${examId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch answers');
            }
            const answers = await response.json();

            // Fetch notes for each answer
            const answersWithNotes = await Promise.all(answers.map(async (answer) => {
                const noteResponse = await fetch(`http://localhost:9090/api/note/byanswer/${answer._id}`);
                if (noteResponse.ok) {
                    const noteData = await noteResponse.json();
                    answer.note = noteData;
                }
                return answer;
            }));
    
            return answersWithNotes;
        } catch (error) {
          console.error('Error fetching answers with notes:', error);  
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await validateForm();
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
                if (formDataToSend.format === 'pdf') {
                    // Delete the quiz field if the format is 'pdf'
                    delete formDataToSendWithoutDateTime.quiz;
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
                    formDataToSendWithoutDateTime.pdfFile = examPictureUrl;
                }
    
                const registerResponse = await axios.post(
                    "http://localhost:9090/api/exam/",
                    formDataToSendWithoutDateTime
                );
                fetchData();
                closeModalA();
            } catch (error) {
                console.error("Error adding Exam:", error);
            }
        }
    };
    
    
    return (
        <Card
            direction='column'
            w='100%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px='25px' justify='space-between' mb='20px' align='center'>
                <Text
                    color={textColor}
                    fontSize='22px'
                    fontWeight='700'
                    lineHeight='100%'>
                    Exam Table
                </Text>

                <Select
    value={selectedClass}
    onChange={handleClassChange}
    bg={bgButton}
    color={textColor}
    _hover={bgHover}
    _focus={bgFocus}
    _active={bgFocus}
    w='150px'
    h='37px'
    borderRadius='10px'
    mr="10px"
    fetchData={fetchData} // Pass the fetchData function as a prop
>
    <option value="" disabled>Select Class</option>
    {classOptions.map(option => (
        <option key={option} value={option}>{option}</option>
    ))}
</Select>




<div style={{ display: 'flex', gap: '10px' }}>

<Menu isOpen={false} onClose={() => {}}>
                <MenuButton
                    align='center'
                    justifyContent='center'
                    bg='#ffb347'
                    w='100px'
                    h='37px'
                    lineHeight='100%'
                    onClick={openModalB}
                    borderRadius='10px'
                >
                    Add Quiz
                </MenuButton>
            </Menu>
    <Menu isOpen={isOpen1} onClose={onClose1}>
        <MenuButton
            align='center'
            justifyContent='center'
            bg='#a3e4f9'
            _hover={bgHover}
            w='100px'
            h='37px'
            lineHeight='100%'
            onClick={openModalA}
            borderRadius='10px'
            {...rest}>
           Add Exam
        </MenuButton>
    </Menu>

   
</div>
                
                <Modal isOpen={isModalOpenA} onClose={closeModalA}>
                    <ModalOverlay />
                    <ModalContent>
                        <form onSubmit={handleSubmit} noValidate>
                            <ModalHeader>Add Exam</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                
                                    <FormControl>
                                        <FormLabel>Title</FormLabel>
                                        <Input type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Description</FormLabel>
                                        <Textarea type="text"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <FormControl mt={4} mr={4}>
  <FormLabel>Level</FormLabel>
  <Select
    name="level"
    value={formData.level}
    onChange={handleChange}
  >
    <option value="" disabled>Select Level</option>
    <option value="Initiation">Initiation</option>
    <option value="Préparatoire">Préparatoire</option>
    <option value="1ère année">1ère année</option>
    <option value="2ème année">2ème année</option>
    <option value="3ème année">3ème année</option>
    <option value="4ème année">4ème année</option>
    <option value="5ème année">5ème année</option>
    <option value="6ème année">6ème année</option>
    <option value="7ème année">7ème année</option>
  </Select>
</FormControl>
      <FormControl mt={4}>
      <FormLabel>End Date and Time</FormLabel>
      
      <Input
        name="endAtDate"
        type="date"
        value={formData.endAtDate}
        onChange={handleChange}
      />
      {errors.endAtDate && (
        <span style={{ color: 'red' }}>{errors.endAtDate}</span>
    )}
      <Input
        name="endAtTime"
        type="time"
        value={formData.endAtTime}
        onChange={handleChange}
      />
      {errors.endAtTime && (
        <span style={{ color: 'red' }}>{errors.endAtTime}</span>
    )}
    </FormControl>
    
                                <FormControl mt={4} mr={4}>
        <FormLabel>Type</FormLabel>
        <Select
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
            <option value="" disabled>Select Type</option>
          <option value="revision">Revision</option>
          <option value="end of year exam">End of Year Exam</option>
          <option value="midterm exam">Midterm Exam</option>
        </Select>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Format</FormLabel>
        <Select
          name="format"
          value={formData.format}
          onChange={handleChange}
        ><option value="" disabled>Select Format</option>
            <option value="quizz">Quizz</option>
          <option value="pdf">PDF</option>
        </Select>
      </FormControl>

      {formData.format === 'quizz' && (
        <FormControl mt={4}>
          <FormLabel>Select Quiz</FormLabel>
          <Select
            name="quizId"
            value={formData.quiz}
            onChange={handleQuizSelect}
          >
            <option value="" disabled>Select Quiz</option>
            {quizzes.map((quiz) => (
              <option key={quiz._id} value={quiz._id}>
                {quiz.quizTitle}
              </option>
            ))}
          </Select>
        </FormControl>
      )}

      {formData.format === 'pdf' && (
       <FormControl mt={4}>
       <label htmlFor="pdfFileInput">
           Upload PDF File:
           <input
               name="pdfFile" 
               type="file"
               accept=".pdf"
               style={{ display: "inline" }}
               onChange={handleChange}
           />
       </label>
   </FormControl>
   
     

)}
                            </ModalBody>
                            {errors.title && <Text color="red">{errors.title}</Text>}
                            {errors.description && <Text color="red">{errors.description}</Text>}
                            {errors.type && <Text color="red">{errors.type}</Text>}
                            {errors.format && <Text color="red">{errors.format}</Text>}
                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} onClick={closeModalA}>
                                    Close
                                </Button>
                                <Button type="submit" colorScheme="green">
                                    Save
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>
                


                <Modal isOpen={isModalOpenB} onClose={closeModalB}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmitB} noValidate>
                        <ModalHeader>{step === 1 ? 'Add Quiz Details' : 'Add Question Details'}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {step === 1 && (
                                <>
                                    <FormControl>
                                        <FormLabel>Quiz Title</FormLabel>
                                        <Input type="text" name="quizTitle" value={quizData.quizTitle} onChange={handleChangeB} />
                                        {errors2.quizTitle && <Text color="red">{errors2.quizTitle}</Text>}
                                    </FormControl>
                                    {/* Add other quiz details inputs */}
                                </>
                            )}
                            {step === 2 && (
                                <>
                                    
                                    {questions.map((question, index) => (
    <div key={index}>
        <FormControl>
            <FormLabel>Question</FormLabel>
            <Input type="text" name="question" value={question.question} onChange={(e) => handleChangeQuestion(index, e)} />
            {errors2[`question_${index}`] && <Text color="red">{errors2[`question_${index}`]}</Text>}
        </FormControl>
        {question.answers.map((answer, answerIndex) => (
            <FormControl key={answerIndex}>
                <FormLabel>Answer {answerIndex + 1}</FormLabel>
                <Input type="text" value={answer} onChange={(e) => handleChangeAnswer(index, answerIndex, e)} />
                {errors2[`answer_${index}_${answerIndex}`] && <Text color="red">{errors2[`answer_${index}_${answerIndex}`]}</Text>}
            </FormControl>
        ))}
        {question.answers.length < 4 && (
            <Button onClick={() => handleAddAnswer(index)}>Add Answer</Button>
        )}
        {question.answers.length > 1 && (
            <FormControl>
                <FormLabel>Correct Answer</FormLabel>
                <Select
    value={question.correctAnswer} // Current correct answer index
    onChange={(e) => handleChangeQuestion(index, e)} // Pass event and index to handleChangeQuestion
    name="correctAnswer"
>
    {question.answers.map((answer, answerIndex) => (
        <option key={answerIndex} value={answerIndex}> {/* Pass answerIndex as the value */}
            {answer}
        </option>
    ))}
</Select>
{errors2[`correctAnswer_${index}`] && <Text color="red">{errors2[`correctAnswer_${index}`]}</Text>}
            </FormControl>
        )}

        <FormControl>
            <FormLabel>Message for Correct Answer</FormLabel>
            <Textarea name="messageForCorrectAnswer" value={question.messageForCorrectAnswer} onChange={(e) => handleChangeQuestion(index, e)} />
            {errors2[`messageForCorrectAnswer_${index}`] && <Text color="red">{errors2[`messageForCorrectAnswer_${index}`]}</Text>}

        </FormControl>

        <FormControl>
            <FormLabel>Message for Incorrect Answer</FormLabel>
            <Textarea name="messageForIncorrectAnswer" value={question.messageForIncorrectAnswer} onChange={(e) => handleChangeQuestion(index, e)} />
            {errors2[`messageForIncorrectAnswer_${index}`] && <Text color="red">{errors2[`messageForIncorrectAnswer_${index}`]}</Text>}
        </FormControl>

        <FormControl>
            <FormLabel>Explanation</FormLabel>
            <Textarea name="explanation" value={question.explanation} onChange={(e) => handleChangeQuestion(index, e)} />
            {errors2[`explanation_${index}`] && <Text color="red">{errors2[`explanation_${index}`]}</Text>}
        </FormControl>

        <FormControl>
            <FormLabel>Point</FormLabel>
            <Input type="text" name="point" value={question.point} onChange={(e) => handleChangeQuestion(index, e)} />
            {errors2[`point_${index}`] && <Text color="red">{errors2[`point_${index}`]}</Text>}
        </FormControl>

        {/* Add other question details inputs as needed */}

        {index > 0 && (
            <Button onClick={() => handleRemoveQuestion(index)}>Remove Question</Button>
        )}
    </div>
))}
<Button onClick={handleAddQuestion}>Add Question</Button>


                                </>
                            )}
                        </ModalBody>
                        <ModalFooter>
                {step !== 1 && (
                    <Button colorScheme="blue" mr={3} onClick={handleBack}>
                        Back
                    </Button>
                )}
                {step !== 2 && (
                    <Button colorScheme="blue" mr={3} onClick={handleNext}>
                        Next
                    </Button>
                )}
                {step === 2 && questions.length >= 2 && (
                    <Button type="submit" colorScheme="green">
                        Save
                    </Button>
                )}
            </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>




            </Flex>








            <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
                <Thead>
                    {headerGroups.map((headerGroup, index) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, index) => (
                                <Th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    pe='10px'
                                    key={index}
                                    borderColor={borderColor}>
                                    <Flex
                                        justify='space-between'
                                        align='center'
                                        fontSize={{ sm: "10px", lg: "12px" }}
                                        color='gray.400'>
                                        {column.render("Header")}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>


                <Tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()} key={index}>
                                {row.cells.map((cell, index) => {
                                    let data = "";
                                    if (cell.column.Header === "Title") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "Description") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    }else if (cell.column.Header === "DateOfCreation") {
                                        const date = new Date(cell.value);
                                        const formattedDate = date.toISOString().split('T')[0];
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {formattedDate}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "Type") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "Format") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "ACTIONS") {
                                        data = (
                                            <Flex align="center">
                                               {/* Edit icon */}
                                               <EditIcon
                                                    w='20px'
                                                    h='20px'
                                                    me='5px'
                                                    color={"green.500"}
                                                    cursor="pointer"
                                                onClick={() => handleEdit(row.original)}
                                                />
                                                


                                                <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                                            <ModalOverlay />
                                                <ModalContent maxW={'800px'}>
                                                    <ModalHeader>Edit Exam</ModalHeader>
                                                    <ModalCloseButton />
                                                    {editedExam && ( // Vérifiez si editedExam est disponible
                                                        <ModalBody>
                                                            {/* Formulaire pour l'édition du exam */}
                                                            <FormControl id="title">
                                                                <FormLabel>Title</FormLabel>
                                                                <Input type="text" value={editedExam.title} onChange={(e) => setEditedExam({ ...editedExam, title: e.target.value })} />
                                                            </FormControl>
                                                            <FormControl id="description">
                                                                <FormLabel>Description</FormLabel>
                                                                <Input type="text" value={editedExam.description} onChange={(e) => setEditedExam({ ...editedExam, description: e.target.value })} />
                                                            </FormControl>
                                                            <FormControl id="format">
                                                                <FormLabel>Format</FormLabel>
                                                                <Input type="text" value={editedExam.format} onChange={(e) => setEditedExam({ ...editedExam, format: parseInt(e.target.value) })} />
                                                            </FormControl>
                                                        </ModalBody>
                                                    )}
                                                    <ModalFooter>
                                                        <Button colorScheme="blue" mr={3} onClick={handleSaveEdit}>Save</Button>
                                                        <Button onClick={closeEditModal}>Cancel</Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal>
                                            
                                                {/* Delete icon */}
                                                <AlertDialog
                                                    isOpen={isDeleteDialogOpen}
                                                    leastDestructiveRef={cancelRef}
                                                    onClose={cancelDelete}
                                                >
                                                    <AlertDialogOverlay>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                                                Delete Exam
                                                            </AlertDialogHeader>

                                                            <AlertDialogBody>
                                                                Are you sure you want to delete this exam?
                                                            </AlertDialogBody>

                                                            <AlertDialogFooter>
                                                                <Button ref={cancelRef} onClick={cancelDelete}>
                                                                    Cancel
                                                                </Button>
                                                                <Button colorScheme="red" onClick={handleDelete} ml={3}>
                                                                    Delete
                                                                </Button>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialogOverlay>
                                                </AlertDialog>

                                                <DeleteIcon
                                                    w='20px'
                                                    h='20px'
                                                    me='5px'
                                                    color={"red.500"}
                                                    cursor="pointer"
                                                    onClick={() => confirmDelete(row.original._id)}
                                                />


                                                {/* View icon */}
                                                <ViewIcon
                                                    w='20px'
                                                    h='20px'
                                                    me='5px'
                                                    color={"orange.500"}
                                                    cursor="pointer"
                                                    onClick={() => handleView(row.original)}
                                                />
                                                <Modal isOpen={isModalViewOpen} onClose={closeModalViewA}>
                                                    <ModalOverlay />
                                                    <ModalContent maxW={'800px'} overflowY='auto'>
                                                        <ModalHeader>Exam Information</ModalHeader>
                                                        <ModalCloseButton />
                                                        <ModalBody>
                                                            {examInfo && (
                                                                <>
                                                                    <Text
                                        color={textColorPrimary}
                                        fontWeight='bold'
                                        fontSize='2xl'
                                        mt='10px'
                                        mb='4px'
                                        style={{ margin: "auto" }}>
                                        {examInfo.title} {examInfo.description}
                                    </Text>
                                                                    <object data={examInfo.pdfFile} type="application/pdf" width="100%" height="500px">
                                                                <p>PDF cannot be displayed. <a href={examInfo.pdfFile}>Download PDF</a> instead.</p>
                                                            </object>
                                                            {examInfo.format === 'pdf' && (
  <Answers columnsData={AnswersData} tableData={answersData} />
)}

                                                                </>
                                                            )}
                                                        </ModalBody>
                                                    </ModalContent>
                                                </Modal>
                                            </Flex>
                                        );
                                    }
                                    
                                    return (
                                        <Td
                                            {...cell.getCellProps()}
                                            key={index}
                                            fontSize={{ sm: "14px" }}
                                            minW={{ sm: "150px", md: "200px", lg: "auto" }}
                                            borderColor='transparent'>
                                            {data}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </Card>
    );
}