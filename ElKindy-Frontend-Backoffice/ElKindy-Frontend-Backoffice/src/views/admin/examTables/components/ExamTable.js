import axios from "axios";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { ViewIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { AddIcon } from '@chakra-ui/icons'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, FormControl, FormLabel, Input, Grid, SimpleGrid ,Select } from "@chakra-ui/react";
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
import React, { useMemo, useState } from "react";
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
        isModalOpenA, openModalA, closeModalA, fetchData , isEditModalOpen, closeEditModal,setIsEditModalOpen} = props;

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
    const handleView = (examData) => {
        setExamInfo(examData);
        setIsModalViewOpen(true);
    };
    const closeModalViewA = () => {
        setIsModalViewOpen(false);
    };


    const [formData, setFormData] = useState({
        title: "",
        description: "",
        class:"",
        type: "",
        format: "",
        pdfFile: "",
    });
    const [selectedPdfFile, setSelectedPdfFile] = useState(null);

    const handlePdfFileChange = (e) => {
      setSelectedPdfFile(e.target.files[0]);
      
    };
    const [errors, setErrors] = useState({});
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log("Selected file:", selectedFile);
        setFormData({ ...formData, pdfFile: selectedFile }); 
    };
    
    const handleChange = (e) => {
        if (e.target.type === "file") {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
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

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await validateForm();
        console.log("Submitting form");
        if (isValid) {
            try {
                const formDataToSend = new FormData();
                formDataToSend.append("image", formData.pdfFile);
                console.log(formData);
                console.log(formDataToSend);
                const uploadResponse = await axios.post(
                    "http://localhost:9090/api/image/uploadimage",
                    formDataToSend,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                
                const examPictureUrl = uploadResponse.data.downloadURL[0];
                const formDataWithPicture = { ...formData, pdfFile: examPictureUrl };

                const registerResponse = await axios.post(
                    "http://localhost:9090/api/exam/",
                    formDataWithPicture
                );
                fetchData()
                closeModalA()
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






                <Menu isOpen={isOpen1} onClose={onClose1}>
                    <MenuButton
                        align='center'
                        justifyContent='center'
                        bg={bgButton}
                        _hover={bgHover}
                        _focus={bgFocus}
                        _active={bgFocus}
                        w='37px'
                        h='37px'
                        lineHeight='100%'
                        onClick={openModalA}
                        borderRadius='10px'
                        {...rest}>
                        <AddIcon color={iconColor} w='20px' h='20px' />
                    </MenuButton>
                </Menu>

                {/* Modal for adding user */}
                <Modal isOpen={isModalOpenA} onClose={closeModalA}>
                    <ModalOverlay />
                    <ModalContent>
                        <form onSubmit={handleSubmit} noValidate>
                            <ModalHeader>Add Exam</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Grid templateColumns="1fr 1fr" gap={4}>
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
                                        <Input type="text"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </Grid>
                                <FormControl mt={4} mr={4}>
        <FormLabel>Class</FormLabel>
        <Select
          name="type"
          value={formData.class}
          onChange={handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </Select>
      </FormControl>
                                <FormControl mt={4} mr={4}>
        <FormLabel>Type</FormLabel>
        <Select
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
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
        >
            <option value="quizz">Quizz</option>
          <option value="pdf">PDF</option>
        </Select>
      </FormControl>
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
                                                    <ModalContent maxW={'800px'}>
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