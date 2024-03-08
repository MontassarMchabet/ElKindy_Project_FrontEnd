// import axios from "axios";
// import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, Select, Box } from "@chakra-ui/react";
// import { ViewIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
// import { AddIcon } from '@chakra-ui/icons'
// import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, FormControl, FormLabel, Input, Grid, SimpleGrid } from "@chakra-ui/react";
// import {
//     Flex,
//     Table,
//     Tbody,
//     Icon,
//     Td,
//     Text,
//     Th,
//     Thead,
//     Tr,
//     useColorModeValue,
// } from "@chakra-ui/react";
// import { NavLink } from 'react-router-dom';
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { RiEyeCloseLine } from "react-icons/ri";

// import {
//     Menu,
//     MenuButton,
//     useDisclosure,
//     InputGroup,
//     InputRightElement,
    
// } from "@chakra-ui/react";
// import React, { useEffect, useMemo, useState } from "react";
// import { useParams } from 'react-router-dom';
// import {
//     useGlobalFilter,
//     usePagination,
//    useSortBy,
//     useTable,
// } from "react-table";
// // import {

// //     useTable
// // } from "react-table";
// import Card from "components/card/Card";
// //import Menu from "components/menu/MainMenu";
// import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
// import Information from "views/admin/events/components/Information";

// import { useHistory } from 'react-router-dom'; 


// export default function ColumnsTable(props) {
//     const { columnsData, tableData, handleDelete, cancelDelete, cancelRef, confirmDelete, isDeleteDialogOpen,
//         isModalOpenA, openModalA, closeModalA } = props;

//     const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
//     const cardShadow = useColorModeValue(
//         "0px 18px 40px rgba(112, 144, 176, 0.12)",
//         "unset"
//     );
//     const columns = useMemo(() => columnsData, [columnsData]);
//     const data = useMemo(() => tableData, [tableData]);
//     const textColorSecondary = "gray.400";
//     const { ...rest } = props;
//     const iconColor = useColorModeValue("brand.500", "white");
//     const tableInstance = useTable(
//         {
//             columns,
//             data,
        
//         },
//         useGlobalFilter,
//         useSortBy,
//         usePagination
//     );
    
//     const { eventId } = useParams(); // Utilisation du hook useParams pour obtenir l'ID de l'événement depuis l'URL
    
//     const [comments, setComments] = useState([]); // Déclaration de l'état pour stocker les tickets


//     console.log("heeeeeeeey", eventId);

//     // useEffect(() => {
//     //     const fetchComments = async () => {
//     //         try {
//     //             const response = await axios.get(`http://localhost:9090/event/${eventId}/comments`);
//     //             setComments(response.data);
//     //         } catch (error) {
//     //             console.error('Error fetching comments:', error);
//     //         }
//     //     };

//     //     fetchComments();
//     // }, [eventId]);

//     const fetchComments = async () => {
//         try {
//             const response = await axios.get(`http://localhost:9090/event/${eventId}/comments`);
//             setComments(response.data);
//         } catch (error) {
//             console.error('Erreur lors de la récupération des commentaires :', error);
//         }
//     };
    
//     useEffect(() => {
//         fetchComments();
//     }, [eventId]);

    
//     const [commentInfo, setCommentInfo] = useState(null);

//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         page,
//         prepareRow,
//         initialState,
//     } = tableInstance;
//     initialState.pageSize = 99999999999999999;

//     const textColor = useColorModeValue("secondaryGray.900", "white");
//     const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
//     const {
//         isOpen: isOpen1,
//         onClose: onClose1,
//     } = useDisclosure();
//     const bgList = useColorModeValue("white", "whiteAlpha.100");
//     const bgShadow = useColorModeValue(
//         "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
//         "unset"
//     );
//     const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
//     const bgHover = useColorModeValue(
//         { bg: "secondaryGray.400" },
//         { bg: "whiteAlpha.50" }
//     );
//     const bgFocus = useColorModeValue(
//         { bg: "secondaryGray.300" },
//         { bg: "whiteAlpha.100" }
//     );
//     const [show, setShow] = React.useState(false);
//     const handleClick = () => setShow(!show);


//     const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    

//     const handleView = (commentData) => {
//         setCommentInfo(commentData);
//         setIsModalViewOpen(true);
//     };
//     const closeModalViewA = () => {
//         setIsModalViewOpen(false);
//     };


//     const [formData, setFormData] = useState({
//         user:'65e25825b58277cff4cc33ae',
//         comment: "",  
//         date: "",
        
//       });
//     const [errors, setErrors] = useState({});
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const validateForm = async () => {
//         let errors = {};
      
//         if (!formData.comment.trim()) {
//           errors.comment = 'Comment is required'
//         } else if (formData.comment.length < 5) {
//             errors.comment = 'Le commentaire doit contenir au moins 5 caractères';
//         }
//         setErrors(errors);
//         return Object.keys(errors).length === 0;
//       };

//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         const isValid = await validateForm();
//         console.log("Submitting form");
//         if (isValid) {
//           try {
//             const response = await axios.post(
//               `http://localhost:9090/comment/add/event/${eventId}`,
//               formData
//             );
//             fetchComments()
//             closeModalA()
//             console.log(response.data);
//           } catch (error) {
//             console.error("Error adding comment:", error);
//           }
//         }
//       };

//     return (
        
//         <Card direction='column' w='100%' px='0px' overflowX={{ sm: "scroll", lg: "hidden" }}>
//           <Flex px='25px' justify='space-between' mb='20px' align='center'>
//             <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
//               comments Table
//             </Text>
            
      
//             <Menu isOpen={isOpen1} onClose={onClose1}>
//               <MenuButton align='center' justifyContent='center' bg={bgButton} _hover={bgHover} _focus={bgFocus} _active={bgFocus} w='37px' h='37px' lineHeight='100%' onClick={openModalA} borderRadius='10px'>
//                 <AddIcon color={iconColor} w='20px' h='20px' />
//               </MenuButton>
//             </Menu>
      
//             {/* Modal for adding comment */}
//             <Modal isOpen={isModalOpenA} onClose={closeModalA}>
//               <ModalOverlay />
//               <ModalContent>
//                 <form onSubmit={handleSubmit} noValidate>
//                   <ModalHeader>Add comment</ModalHeader>
//                   <ModalCloseButton />
//                   <ModalBody>
//                     <Grid templateColumns="1fr 1fr" gap={4}>
//                       <FormControl>
//                         <FormLabel>Comments</FormLabel>
//                         <Input type="text" name="comment" value={formData.comment} onChange={handleChange} />
//                       </FormControl>
                      
//                     </Grid>
                    
//                   </ModalBody>
      
//                   {errors.comment && <Text color="red">{errors.comment}</Text>}
                              
//                  <ModalFooter>
//                     <Button colorScheme="blue" mr={3} onClick={closeModalA}>
//                       Close
//                     </Button>
//                     <Button type="submit" colorScheme="green">
//                       Save
//                     </Button>
//                   </ModalFooter>
//                 </form>
//               </ModalContent>
//             </Modal>
//           </Flex>
            
          
//             <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
                
//                 <Thead>
//                     {headerGroups.map((headerGroup, index) => (
//                     <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
//                         {headerGroup.headers.map((column, index) => (
//                         <Th
//                             {...column.getHeaderProps(column.getSortByToggleProps())}
//                             pe='10px'
//                             key={column.id || column.Header}
//                             borderColor={borderColor}>
//                             <Flex
//                             justify='space-between'
//                             align='center'
//                             fontSize={{ sm: "10px", lg: "12px" }}
//                             color='gray.400'>
//                             {column.render("Header")}
//                             </Flex>
//                         </Th>
//                         ))}
//                     </Tr>
//                     ))}
//             </Thead>
//                 <Tbody {...getTableBodyProps()}>
//                     {page.map((row, index) => {
//                         prepareRow(row);
//                         return (
//                             <Tr {...row.getRowProps()} key={index}>
//                                 {row.cells.map((cell, index) => {
//                                     let data = "";
//                                     if  (cell.column.Header === "USERNAME") {
//                                         data = (
//                                             <Text color={textColor} fontSize='sm' fontWeight='700'>
//                                                 {cell.value}
//                                             </Text>
//                                         );
//                                     }else if(cell.column.Header === "COMMENT") {
//                                         data = (
//                                             <Text color={textColor} fontSize='sm' fontWeight='700'>
//                                                 {cell.value}
//                                             </Text>
//                                         );
                                    
                                    
//                                     } else if (cell.column.Header === "DATE") {
//                                         data = (
//                                             <Text color={textColor} fontSize='sm' fontWeight='700'>
//                                                 {cell.value}
//                                             </Text>
//                                         );
//                                     }    else if (cell.column.Header === "ACTIONS") {
//                                         data = (
//                                             <Flex align="center">
                                                
                                            
//                                                 {/* Delete icon */}
//                                                 <AlertDialog
//                                                     isOpen={isDeleteDialogOpen}
//                                                     leastDestructiveRef={cancelRef}
//                                                     onClose={cancelDelete}
//                                                 >
//                                                     <AlertDialogOverlay>
//                                                         <AlertDialogContent>
//                                                             <AlertDialogHeader fontSize="lg" fontWeight="bold">
//                                                                 Delete Comment
//                                                             </AlertDialogHeader>

//                                                             <AlertDialogBody>
//                                                                 Are you sure you want to delete this Comment?
//                                                             </AlertDialogBody>

//                                                             <AlertDialogFooter>
//                                                                 <Button ref={cancelRef} onClick={cancelDelete}>
//                                                                     Cancel
//                                                                 </Button>
//                                                                 <Button colorScheme="red" onClick={handleDelete} ml={3}>
//                                                                     Delete
//                                                                 </Button>
//                                                             </AlertDialogFooter>
//                                                         </AlertDialogContent>
//                                                     </AlertDialogOverlay>
//                                                 </AlertDialog>

//                                                 <DeleteIcon
//                                                     w='20px'
//                                                     h='20px'
//                                                     me='5px'
//                                                     color={"red.500"}
//                                                     cursor="pointer"
//                                                     onClick={() => confirmDelete(row.original._id)}
//                                                 />
//                                                 {/* View icon */}
//                                                 <ViewIcon
//                                                     w='20px'
//                                                     h='20px'
//                                                     me='5px'
//                                                     color={"orange.500"}
//                                                     cursor="pointer"
//                                                     onClick={() => handleView(row.original)}
//                                                 />
//                                                 <Modal isOpen={isModalViewOpen} onClose={closeModalViewA}>
//                                                     <ModalOverlay />
//                                                     <ModalContent maxW={'800px'}>
//                                                         {/* <ModalHeader>comment Information</ModalHeader> */}
//                                                         <ModalCloseButton />
//                                                         <ModalBody>
//                                                             {commentInfo && (
//                                                                 <>
                                                                    
//                                                                     <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
//                                                                         <Text
//                                                                             color={textColorPrimary}
//                                                                             fontWeight='bold'
//                                                                             fontSize='2xl'
//                                                                             mt='10px'
//                                                                             mb='4px'>
//                                                                             {commentInfo.user}
//                                                                         </Text>
//                                                                         <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
//                                                                             {commentInfo.comment}
//                                                                         </Text>
//                                                                         <SimpleGrid columns='2' gap='20px'>
//                                                                             <Information
//                                                                                 boxShadow={cardShadow}
//                                                                                 title='Date'
//                                                                                 value={commentInfo.date}
//                                                                             />
                                                                            
//                                                                         </SimpleGrid>
                                                                       
                                                                       
//                                                                     </Card>
//                                                                 </>
//                                                             )}
//                                                         </ModalBody>
//                                                     </ModalContent>
//                                                 </Modal>
//                                             </Flex>
//                                         );
//                                     }
//                                     return (
//                                         <Td
//                                             {...cell.getCellProps()}
//                                             key={index}
//                                             fontSize={{ sm: "14px" }}
//                                             minW={{ sm: "150px", md: "200px", lg: "auto" }}
//                                             borderColor='transparent'>
//                                             {data}
//                                         </Td>
//                                     );
//                                 })}
//                             </Tr>
//                         );
//                     })}
//                 </Tbody>
//             </Table>
//         </Card>
//         // <Box width="2180px" pt={{ base: "130px", md: "80px", xl: "80px" }}>
//         //     <SimpleGrid
//         //         mb='20px'
//         //         columns={{ sm: 1, md: 2 }}
//         //         spacing={{ base: "20px", xl: "20px" }}>
//         //         <Card direction='column' w='100%' px='0px' overflowX={{ sm: "scroll", lg: "hidden" }}>
//         //             <Flex px='25px' justify='space-between' mb='20px' align='center'>
//         //                 <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
//         //                     Event's tickets
//         //                 </Text>

//         //                 <Menu isOpen={isOpen1} onClose={onClose1}>
//         //                     <MenuButton align='center' justifyContent='center' bg={bgButton} _hover={bgHover} _focus={bgFocus} _active={bgFocus} w='37px' h='37px' lineHeight='100%' onClick={openModalA} borderRadius='10px'>
//         //                         <AddIcon color={iconColor} w='20px' h='20px' />
//         //                     </MenuButton>
//         //                 </Menu>

//         //             </Flex>
//         //             <div>
//         //             <h1>Liste des billets pour l'événement</h1>
//         //             <ul>
//         //                 {comments.map(comment => (
//         //                     <li key={comment._id}>
//         //                         <p>User name: {comment.user}</p>
//         //                         <p>Comment: {comment.comment}</p>
//         //                         <p>date: {comment.date}</p>
//         //                     </li>
//         //                 ))}
//         //             </ul>
//         //         </div>
//         //         </Card>
//         //     </SimpleGrid>
//         // </Box>
//     );
// }


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
// import {

//     useTable
// } from "react-table";
import Card from "components/card/Card";
//import Menu from "components/menu/MainMenu";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import Information from "views/admin/events/components/Information";

import { useHistory } from 'react-router-dom'; 


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


    console.log("heeeeeeeey", eventId);

    // useEffect(() => {
    //     const fetchComments = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:9090/event/${eventId}/comments`);
    //             setComments(response.data);
    //         } catch (error) {
    //             console.error('Error fetching comments:', error);
    //         }
    //     };

    //     fetchComments();
    // }, [eventId]);

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


    const [formData, setFormData] = useState({
        user:'65e25825b58277cff4cc33ae',
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
            errors.comment = 'Le commentaire doit contenir au moins 5 caractères';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await validateForm();
        console.log("Submitting form");
        if (isValid) {
          try {
            const response = await axios.post(
              `http://localhost:9090/comment/add/event/${eventId}`,
              formData
            );
            fetchComments()
            closeModalA()
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
            
      
            <Menu isOpen={isOpen1} onClose={onClose1}>
              <MenuButton align='center' justifyContent='center' bg={bgButton} _hover={bgHover} _focus={bgFocus} _active={bgFocus} w='37px' h='37px' lineHeight='100%' onClick={openModalA} borderRadius='10px'>
                <AddIcon color={iconColor} w='20px' h='20px' />
              </MenuButton>
            </Menu>
      
            {/* Modal for adding comment */}
            <Modal isOpen={isModalOpenA} onClose={closeModalA}>
              <ModalOverlay />
              <ModalContent>
                <form onSubmit={handleSubmit} noValidate>
                  <ModalHeader>Add comment</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Grid templateColumns="1fr 1fr" gap={4}>
                      <FormControl>
                        <FormLabel>Comments</FormLabel>
                        <Input type="text" name="comment" value={formData.comment} onChange={handleChange} />
                      </FormControl>
                      
                    </Grid>
                    
                  </ModalBody>
      
                  {errors.comment && <Text color="red">{errors.comment}</Text>}
                              
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
                                    if  (cell.column.Header === "USERNAME") {
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
                                                                        <Text
                                                                            color={textColorPrimary}
                                                                            fontWeight='bold'
                                                                            fontSize='2xl'
                                                                            mt='10px'
                                                                            mb='4px'>
                                                                            {commentInfo.user}
                                                                        </Text>
                                                                        <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
                                                                            {commentInfo.comment}
                                                                        </Text>
                                                                        <SimpleGrid columns='2' gap='20px'>
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
        // <Box width="2180px" pt={{ base: "130px", md: "80px", xl: "80px" }}>
        //     <SimpleGrid
        //         mb='20px'
        //         columns={{ sm: 1, md: 2 }}
        //         spacing={{ base: "20px", xl: "20px" }}>
        //         <Card direction='column' w='100%' px='0px' overflowX={{ sm: "scroll", lg: "hidden" }}>
        //             <Flex px='25px' justify='space-between' mb='20px' align='center'>
        //                 <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
        //                     Event's tickets
        //                 </Text>

        //                 <Menu isOpen={isOpen1} onClose={onClose1}>
        //                     <MenuButton align='center' justifyContent='center' bg={bgButton} _hover={bgHover} _focus={bgFocus} _active={bgFocus} w='37px' h='37px' lineHeight='100%' onClick={openModalA} borderRadius='10px'>
        //                         <AddIcon color={iconColor} w='20px' h='20px' />
        //                     </MenuButton>
        //                 </Menu>

        //             </Flex>
        //             <div>
        //             <h1>Liste des billets pour l'événement</h1>
        //             <ul>
        //                 {comments.map(comment => (
        //                     <li key={comment._id}>
        //                         <p>User name: {comment.user}</p>
        //                         <p>Comment: {comment.comment}</p>
        //                         <p>date: {comment.date}</p>
        //                     </li>
        //                 ))}
        //             </ul>
        //         </div>
        //         </Card>
        //     </SimpleGrid>
        // </Box>
    );
}
