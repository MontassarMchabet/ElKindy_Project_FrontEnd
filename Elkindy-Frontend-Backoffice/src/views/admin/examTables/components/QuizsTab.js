import React, { useState, useEffect, useRef ,useMemo} from "react";
import { Flex, Table, Thead, Tbody, Tr, Th, Td, Avatar, Text, Box, Progress, Button } from '@chakra-ui/react';
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table';
import Card from "components/card/Card";
import { ViewIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, FormControl, FormLabel, Input, Grid, SimpleGrid ,Select ,Textarea} from "@chakra-ui/react";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
function Quizes(props) {
    const {  handleDeleteQ, cancelDeleteQ,  confirmDeleteQ, isDeleteDialogOpenQ,cancelRefQ,
        isModalOpenA, openModalA, closeModalA, fetchData , isEditModalOpenQ, closeEditModalQ,setIsEditModalOpenQ,setQuizData} = props;


    const { columnsData, tableData } = props;
    const [editedQuiz, setEditedQuiz] = useState({
        quizTitle: '',
        questions: [], // Initialize questions as an empty array
      });
      
    const columns = React.useMemo(() => columnsData, [columnsData]);
    const data = React.useMemo(() => tableData, [tableData]);
   

    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = tableInstance;

    const textColor = 'navy.700';
    const textColorSecondary = 'secondaryGray.600';
    const handleSaveEdit = async () => {
        try {
            // Ensure editedQuiz has the correct format before sending the request
            const editedData = {
                quizTitle: editedQuiz.quizTitle,
                questions: editedQuiz.questions.map(question => ({
                    question: question.question,
                    answers: question.answers,
                    correctAnswer: question.correctAnswer,
                    messageForCorrectAnswer: question.messageForCorrectAnswer,
                    messageForIncorrectAnswer: question.messageForIncorrectAnswer,
                    explanation: question.explanation,
                    point: question.point
                }))
            };
    
            await axios.put(`http://localhost:9090/api/quiz/${editedQuiz._id}`, editedData);
            
            setIsEditModalOpenQ(false);
            fetchData();
            window.location.reload(); 
        } catch (error) {
            console.error("Error updating Quiz:", error);
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
        setEditedQuiz(prevState => ({
            ...prevState,
            questions: [
                ...prevState.questions,
                {
                    question: '',
                    questionType: 'text',
                    answers: ['', ''],
                    correctAnswer: '',
                    messageForCorrectAnswer: '',
                    messageForIncorrectAnswer: '',
                    explanation: '',
                    point: ''
                }
            ]
        }));
    };
    
    const handleChangeQuestion = (index, e) => {
        const { name, value } = e.target;
        setEditedQuiz(prevState => {
            const updatedQuestions = [...prevState.questions];
            updatedQuestions[index][name] = value;
            return { ...prevState, questions: updatedQuestions };
        });
    };
    
    const handleAddAnswer = (questionIndex) => {
        setEditedQuiz(prevState => {
            const updatedQuestions = [...prevState.questions];
            if (updatedQuestions[questionIndex].answers.length < 4) {
                updatedQuestions[questionIndex].answers.push('');
            }
            return { ...prevState, questions: updatedQuestions };
        });
    };
    
    
    const handleEdit = (quiz) => {
        setEditedQuiz(quiz);
        openEditModalQ(); 
     };
     const openEditModalQ = () => {
        setIsEditModalOpenQ(true);
    };
    const handleChangeAnswer = (questionIndex, answerIndex, e) => {
        const { value } = e.target;
        setEditedQuiz(prevState => {
            const updatedQuestions = [...prevState.questions];
            updatedQuestions[questionIndex].answers[answerIndex] = value;
            return { ...prevState, questions: updatedQuestions };
        });
    };
    
    const handleRemoveQuestion = (index) => {
        setQuestions(prevQuestions => prevQuestions.filter((_, i) => i !== index));
    };

    return (
        <>
        <Card
            direction='column'
            w='100%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex direction='column' w='100%' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
            
        <Text
                    color={textColor}
                    fontSize='22px'
                    fontWeight='700'
                    lineHeight='100%'>
                    Quiz Table
                </Text>

                <Modal isOpen={isEditModalOpenQ} onClose={closeEditModalQ}>
  <ModalOverlay />
  <ModalContent maxW={'800px'}>
    <ModalHeader>Edit Quiz</ModalHeader>
    <ModalCloseButton />
    {editedQuiz && (
      <ModalBody>
        <FormControl>
          <FormLabel>Quiz Title</FormLabel>
          <Input
            type="text"
            value={editedQuiz.quizTitle}
            onChange={(e) => setEditedQuiz(prevState => ({ ...prevState, quizTitle: e.target.value }))}
          />
        </FormControl>
        {/* Render question details inputs dynamically */}
        {editedQuiz.questions.map((question, index) => (
          <div key={index}>
            <FormControl>
              <FormLabel>Question</FormLabel>
              <Input
                type="text"
                value={question.question}
                onChange={(e) => handleChangeQuestion(index, e)}
              />
            </FormControl>
            {question.answers.map((answer, answerIndex) => (
              <FormControl key={answerIndex}>
                <FormLabel>Answer {answerIndex + 1}</FormLabel>
                <Input
                  type="text"
                  value={answer}
                  onChange={(e) => handleChangeAnswer(index, answerIndex, e)}
                />
              </FormControl>
            ))}
            <Button onClick={() => handleAddAnswer(index)}>Add Answer</Button>
            <FormControl>
              <FormLabel>Correct Answer</FormLabel>
              <Select
                value={question.correctAnswer}
                onChange={(e) => handleChangeQuestion(index, e)}
              >
                {question.answers.map((answer, answerIndex) => (
                  <option key={answerIndex} value={answerIndex}>
                    {answer}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Message for Correct Answer</FormLabel>
              <Textarea
                value={question.messageForCorrectAnswer}
                onChange={(e) => handleChangeQuestion(index, e)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Message for Incorrect Answer</FormLabel>
              <Textarea
                value={question.messageForIncorrectAnswer}
                onChange={(e) => handleChangeQuestion(index, e)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Explanation</FormLabel>
              <Textarea
                value={question.explanation}
                onChange={(e) => handleChangeQuestion(index, e)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Point</FormLabel>
              <Input
                type="text"
                value={question.point}
                onChange={(e) => handleChangeQuestion(index, e)}
              />
            </FormControl>
            {index > 0 && (
            <Button onClick={() => handleRemoveQuestion(index)}>Remove Question</Button>
        )}
          </div>
        ))}
        <Button onClick={handleAddQuestion}>Add Question</Button>
      </ModalBody>
    )}
    <ModalFooter>
      <Button colorScheme="blue" mr={3} onClick={handleSaveEdit}>
        Save
      </Button>
      <Button onClick={closeEditModalQ}>
        Cancel
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
<AlertDialog
                                                    isOpen={isDeleteDialogOpenQ}
                                                    leastDestructiveRef={cancelRefQ}
                                                    onClose={cancelDeleteQ}
                                                >
                                                    <AlertDialogOverlay>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                                                Delete Quiz
                                                            </AlertDialogHeader>

                                                            <AlertDialogBody>
                                                                Are you sure you want to delete this quiz?
                                                            </AlertDialogBody>

                                                            <AlertDialogFooter>
                                                                <Button ref={cancelRefQ} onClick={cancelDeleteQ}>
                                                                    Cancel
                                                                </Button>
                                                                <Button colorScheme="red" onClick={handleDeleteQ} ml={3}>
                                                                    Delete
                                                                </Button>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialogOverlay>
                                                </AlertDialog>
            <Table {...getTableProps()} variant='simple' color='gray.500' bg="white" mb='24px'>

                
                <Thead>
                    {headerGroups.map((headerGroup, index) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, index) => (
                                <Th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    pe='10px'
                                    key={index}
                                    borderColor='transparent'>
                                    <Flex
                                        justify='space-between'
                                        align='center'
                                        fontSize={{ sm: '10px', lg: '12px' }}
                                        color='gray.400'>
                                        {column.render('Header')}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>

                <Tbody {...getTableBodyProps()} style={{ minHeight: '200px' }}>
                    {page.map((row, index) => {
                       

                        
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()} key={index}>
                                {row.cells.map((cell, index) => {
                                   
                                    let data = '';
                                   // Inside the cell rendering logic
                                   if (cell.column.Header === 'Title') {
                                   
                                    data = (
                                        <Flex align='center'>
                                           

                                            <Text color={textColor} fontSize='sm' fontWeight='600'>
                                                {cell.value}
                                            </Text>
                                        </Flex>
                                    );
                                }else if (cell.column.Header === 'Nbr of Questions') {
                                    // Extracting a part of the URL to display

                    
                                    data = (
                                        <Flex align='center'>
                                           

                                            <Text color={textColor} fontSize='sm' fontWeight='600'>
                                                {cell.value}
                                            </Text>
                                        </Flex>
                                    );
                                    
                                }
                            
                                else if (cell.column.Header === 'Note') {
                                    // Check if cell.value.score is undefined or null
                                    const score = cell.value.score != null ? cell.value.score : '--';
                                    data = (
                                        <Text color={textColorSecondary} fontSize='sm' fontWeight='500'>
                                            {score}/20
                                        </Text>
                                    );
                                }
                                else if (cell.column.Header === 'Rating') {
                                        data = (
                                            <Box>
                                                <Progress
                                                    variant='table'
                                                    colorScheme='brandScheme'
                                                    value={cell.value}
                                                />
                                            </Box>
                                        );
                                    }
                                    else if (cell.column.Header === 'Actions') {
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

                                                <DeleteIcon
                                                    w='20px'
                                                    h='20px'
                                                    me='5px'
                                                    color={"red.500"}
                                                    cursor="pointer"
                                                    onClick={() => confirmDeleteQ(row.original._id)}
                                                />
                                                </Flex>
                                        );
                                    }
                                    return (
                                        <Td
                                            {...cell.getCellProps()}
                                            key={index}
                                            fontSize={{ sm: '14px' }}
                                            minW={{ sm: '150px', md: '200px', lg: 'auto' }}
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
        </Flex>
        </Card>
        </>
    );
}

export default Quizes;
