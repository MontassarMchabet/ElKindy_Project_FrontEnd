import axios from "axios";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, Select, Box } from "@chakra-ui/react";
import { ViewIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { AddIcon } from '@chakra-ui/icons'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, FormControl, FormLabel, Input, Grid, SimpleGrid } from "@chakra-ui/react";
import {
    Flex,
    Table,
    Tbody,
    Icon,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import { NavLink } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

import {
    Menu,
    MenuButton,
    useDisclosure,
    InputGroup,
    InputRightElement,
    
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from 'react-router-dom';
import {
    useGlobalFilter,
    usePagination,
   useSortBy,
    useTable,
} from "react-table";

import Card from "components/card/Card";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import Information from "views/admin/comments/components/Information";

import { useHistory } from 'react-router-dom'; 
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";


export default function ColumnsTable(props) {
    const { columnsData, tableData, handleDelete, cancelDelete, cancelRef, confirmDelete, isDeleteDialogOpen,
        isModalOpenA, openModalA, closeModalA } = props;

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
    
    const { eventId } = useParams(); // Utilisation du hook useParams pour obtenir l'ID de l'événement depuis l'URL
    
    const [comments, setComments] = useState([]); // Déclaration de l'état pour stocker les tickets
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getUserIdFromToken = () => {
            const storedToken = Cookies.get('token');
            if (storedToken) {
                const decodedToken = jwtDecode(storedToken);
                const userId = decodedToken.userId;
                setUserId(userId);
            }
        };
  
        getUserIdFromToken();
    }, []);


    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/event/${eventId}/comments`);
            setComments(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des commentaires :', error);
        }
    };
    
    useEffect(() => {
        fetchComments();
    }, [eventId]);

    
    const [commentInfo, setCommentInfo] = useState(null);

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
    

    const handleView = (commentData) => {
        setCommentInfo(commentData);
        setIsModalViewOpen(true);
    };
    const closeModalViewA = () => {
        setIsModalViewOpen(false);
    };
console.log('user',userId)

    const [formData, setFormData] = useState({
        user: userId,
        comment: "",  
        date: "",
        
      });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = async () => {
        let errors = {};
      
        if (!formData.comment.trim()) {
          errors.comment = 'Comment is required'
        } else if (formData.comment.length < 5) {
            errors.comment = 'comment doit contenir au moins 5 caractères';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await validateForm();
        if (isValid) {
          try {
            // Données du commentaire à envoyer
            const commentData = {
              eventId: eventId, // Incluez l'ID de l'événement dans les données du commentaire
              userId: userId, // Incluez l'ID de l'utilisateur connecté dans les données du commentaire
              comment: formData.comment, // Assurez-vous de remplacer formData.comment par le nom de votre champ de commentaire
              // Ajoutez d'autres données de commentaire si nécessaire
            };
      
            const response = await axios.post(
              `http://localhost:9090/comment/add/event/${eventId}`,
              commentData
            );
            fetchComments();
            closeModalA();
            console.log(response.data);
          } catch (error) {
            console.error("Error adding comment:", error);
          }
        }
      };
      
    return (
        
        <Card direction='column' w='100%' px='0px' overflowX={{ sm: "scroll", lg: "hidden" }}>
          <Flex px='25px' justify='space-between' mb='20px' align='center'>
            <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
              comments Table
            </Text>
            
          </Flex>
            
          
            <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
                
                <Thead>
                    {headerGroups.map((headerGroup, index) => (
                    <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                        {headerGroup.headers.map((column, index) => (
                        <Th
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            pe='10px'
                            key={column.id || column.Header}
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
                                    if  (cell.column.Header === "PICTURE") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>

                                                {/* <img src={cell.value} alt="User Image" style={{ width: "70px", height: "60px", margin: "auto" }} /> */}
                                                <img src={cell.value} alt="User Picture" style={{ maxWidth: "50px", maxHeight: "50px", borderRadius: "50%" }} />

                                            </Text>
                                        );
                                        } else if  (cell.column.Header === "USERNAME") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    }else if(cell.column.Header === "COMMENT") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    
                                    
                                    } else if (cell.column.Header === "DATE") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {new Date(cell.value).toLocaleString('tn-TN', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric'
                                                    
                                                })}
                                            </Text>
                                        );
                                    }    else if (cell.column.Header === "ACTIONS") {
                                        data = (
                                            <Flex align="center">
                                                
                                            
                                                {/* Delete icon */}
                                                <AlertDialog
                                                    isOpen={isDeleteDialogOpen}
                                                    leastDestructiveRef={cancelRef}
                                                    onClose={cancelDelete}
                                                >
                                                    <AlertDialogOverlay>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                                                Delete Comment
                                                            </AlertDialogHeader>

                                                            <AlertDialogBody>
                                                                Are you sure you want to delete this Comment?
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
                                                    <ModalContent maxW={'800px'}>
                                                        {/* <ModalHeader>comment Information</ModalHeader> */}
                                                        <ModalCloseButton />
                                                        <ModalBody>
                                                            {commentInfo && (
                                                                <>
                                                                    
                                                                    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
                                                                        {/* <Text
                                                                            color={textColorPrimary}
                                                                            fontWeight='bold'
                                                                            fontSize='2xl'
                                                                            mt='10px'
                                                                            mb='4px'>
                                                                            {commentInfo.user}
                                                                        </Text> */}
                                                                        <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
                                                                        <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Date'
                                                                                    value={new Date(commentInfo.date).toLocaleString('fr-FR', {
                                                                                    weekday: 'long',
                                                                                    year: 'numeric',
                                                                                    month: 'long',
                                                                                    day: 'numeric',
                                                                                    hour: 'numeric',
                                                                                    minute: 'numeric',
                                                                                    second: 'numeric',
                                                                                })}
                                                                            />
                                                                            
                                                                        </Text>
                                                                        <SimpleGrid columns='2' gap='20px'>
                                                                        <Information
                                                                            boxShadow={cardShadow}
                                                                            title='Comment'
                                                                                value={commentInfo.comment}
                                                                        />
                                                                        </SimpleGrid>
                                                                       
                                                                       
                                                                    </Card>
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
