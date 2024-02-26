import axios from "axios";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { ViewIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, FormControl, FormLabel, Input, Grid, SimpleGrid } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'
import {
    Flex,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";
import {
    Menu,
    MenuButton,
    useDisclosure,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import Information from "views/admin/profile/components/Information";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
export default function ColumnsTable(props) {
    const { columnsData, tableData, handleDelete, cancelDelete, cancelRef, confirmDelete, isDeleteDialogOpen,
        isModalOpenP, openModalP, closeModalP, fetchData, isEditModalOpen, closeEditModal,setIsEditModalOpen} = props;
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const [editedCourse, setEditedCourse] = useState({}); // Déclaration et initialisation de la variable editedCourse
    ////////////////////////
        // Fonction pour sauvegarder les modifications du cours
        const handleSaveEdit = async () => {
            try {
                // Effectuer la requête API pour mettre à jour le cours avec les nouvelles données
                await axios.put(`http://localhost:8080/api/Course/update/${editedCourse._id}`, editedCourse);
                //console.log (editedCourse._id,"aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                console.log("Course updated successfully");
                setIsEditModalOpen(false); // Fermer la modal d'édition après la sauvegarde
                fetchData(); // Rafraîchir les données des cours
            } catch (error) {
                console.error("Error updating course:", error);
            }
        };
    const handleEdit = (course) => {
       setEditedCourse(course); // Charger les données du cours à éditer dans editedCourse
       openEditModal(); // Ouvrir le formulaire d'édition
    };

// La fonction pour ouvrir le formulaire d'édition
    const openEditModal = () => {
    setIsEditModalOpen(true);
};
///////////////////////

    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
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
    const cardShadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "unset"
    );
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
    const [profInfo, setProfInfo] = useState(null);
    const handleView = (userData) => {
        setProfInfo(userData);
        setIsModalViewOpen(true);
    };
    const closeModalViewA = () => {
        setIsModalViewOpen(false);
    };
    
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        duration: "",
        startDate: "",
        endDate: "",
        capacity: "",
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const validateForm = async () => {
        let errors = {};

        if (!formData.name.trim()) {
            errors.name = 'All fields are required'
        } else if (!formData.type.trim()) {
            errors.type = 'All fields are required'
        } else if (!formData.duration.trim()) {
            errors.duration = 'All fields are required'
        } else if (!formData.capacity.trim()) {
            errors.capacity = 'All fields are required'
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
                    "http://localhost:8080/api/Course/add",
                    formData
                );
                fetchData()
                closeModalP()
                console.log(response.data);
            } catch (error) {
                console.error("Error registering prof:", error);
            }
        }
    };
    return (
        <Card
            direction='column'
            w='70%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px='25px' justify='space-between' mb='20px' align='center'>
                <Text
                    color={textColor}
                    fontSize='22px'
                    fontWeight='700'
                    lineHeight='100%'>
                    Courses Table
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
                        onClick={openModalP} // Open the modal when the add icon is clicked
                        borderRadius='10px'
                        {...rest}>
                        <AddIcon color={iconColor} w='20px' h='20px' />
                    </MenuButton>
                </Menu>

                {/* Modal for adding user */}
                <Modal isOpen={isModalOpenP} onClose={closeModalP}>
                    <ModalOverlay />
                    <ModalContent>
                        <form onSubmit={handleSubmit} noValidate>
                            <ModalHeader>Add Course</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Grid templateColumns="1fr 1fr" gap={4}>
                                    <FormControl>
                                        <FormLabel>Name</FormLabel>
                                        <Input type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Type</FormLabel>
                                        <Input type="text"
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </Grid>
                                <FormControl mt={4}>
                                    <FormLabel>Duration</FormLabel>
                                    <Input type="text"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                    />
                                </FormControl>               
                                <FormControl mt={4}>
                                    <FormLabel>Capacity</FormLabel>
                                    <Input type="number"
                                        name="capacity"
                                        value={formData.capacity}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                
                            </ModalBody>
                            {errors.name && <Text color="red">{errors.name}</Text>}
                            {errors.type && <Text color="red">{errors.type}</Text>}
                            {errors.duration && <Text color="red">{errors.duration}</Text>}
                           
                            {errors.capacity && <Text color="red">{errors.capacity}</Text>}
                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} onClick={closeModalP}>
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
                                    if (cell.column.Header === "name") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "type") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "duration") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    }
                                     else if (cell.column.Header === "capacity") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    }      
                                    else if (cell.column.Header === "ACTIONS") {
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
                                                    <ModalHeader>Edit Course</ModalHeader>
                                                    <ModalCloseButton />
                                                    {editedCourse && ( // Vérifiez si editedCourse est disponible
                                                        <ModalBody>
                                                            {/* Formulaire pour l'édition du cours */}
                                                            <FormControl id="name">
                                                                <FormLabel>Name</FormLabel>
                                                                <Input type="text" value={editedCourse.name} onChange={(e) => setEditedCourse({ ...editedCourse, name: e.target.value })} />
                                                            </FormControl>
                                                            <FormControl id="type">
                                                                <FormLabel>Type</FormLabel>
                                                                <Input type="text" value={editedCourse.type} onChange={(e) => setEditedCourse({ ...editedCourse, type: e.target.value })} />
                                                            </FormControl>
                                                            <FormControl id="duration">
                                                                <FormLabel>Duration</FormLabel>
                                                                <Input type="number" value={editedCourse.duration} onChange={(e) => setEditedCourse({ ...editedCourse, duration: parseInt(e.target.value) })} />
                                                            </FormControl>
                                                            <FormControl id="capacity">
                                                                <FormLabel>Capacity</FormLabel>
                                                                <Input type="number" value={editedCourse.capacity} onChange={(e) => setEditedCourse({ ...editedCourse, capacity: parseInt(e.target.value) })} />
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
                                                                Delete Course
                                                            </AlertDialogHeader>

                                                            <AlertDialogBody>
                                                                Are you sure you want to delete this course?
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
                                                        <ModalHeader>Course Information</ModalHeader>
                                                        <ModalCloseButton />
                                                        <ModalBody>
                                                            {profInfo && (
                                                                <>
                                                                    {profInfo.profilePicture}
                                                                    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
                                                                        <Text
                                                                            color={textColorPrimary}
                                                                            fontWeight='bold'
                                                                            fontSize='2xl'
                                                                            mt='10px'
                                                                            mb='4px'>
                                                                            {profInfo.name} 
                                                                        </Text>
                                                                        
                                                                        <SimpleGrid columns='2' gap='20px'>
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Name'
                                                                                value={profInfo.name}
                                                                            />
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Type'
                                                                                value={profInfo.type}
                                                                            />
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Duration'
                                                                                value={profInfo.duration }
                                                                            />
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Capaciity'
                                                                                value={profInfo.capacity }
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
