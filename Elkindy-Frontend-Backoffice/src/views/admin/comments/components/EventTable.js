import axios from "axios";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, Select } from "@chakra-ui/react";
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
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import {
    Menu,
    MenuButton,
    useDisclosure,
    InputGroup,
    InputRightElement,

} from "@chakra-ui/react";
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
import Information from "views/admin/events/components/Information";

import { useHistory } from 'react-router-dom';


export default function ColumnsTable(props) {
    const { columnsData, tableData, handleDelete, handleTickets, cancelDelete, cancelRef, confirmDelete, isDeleteDialogOpen,
        isModalOpenA, openModalA, closeModalA, fetchData, isEditModalOpen, closeEditModal, setIsEditModalOpen } = props;

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
    const [editedEvent, setEditedEvent] = useState({}); // Déclaration et initialisation
    const [tickets, setTickets] = useState([]);
    const [comments, setComments] = useState([]);
    // const [eventId, setEventId] = useState(null);
    const eventId = '65de60ac69889e0c3cfa4bd3';
    const [eventInfo, setEventInfo] = useState(null);
    const history = useHistory();


    ////////////////////////
    // Fonction pour sauvegarder les modifications du cours
    const handleSaveEdit = async () => {
        try {
            // Effectuer la requête API pour mettre à jour le cours avec les nouvelles données
            await axios.put(`http://localhost:8080/event/update/${editedEvent._id}`, editedEvent);
            //console.log (editedEvent._id,"aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            console.log("Course updated successfully");
            setIsEditModalOpen(false); // Fermer la modal d'édition après la sauvegarde
            fetchData(); // Rafraîchir les données des cours
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };
    const handleEdit = (course) => {
        setEditedEvent(course); // Charger les données du cours à éditer dans editedEvent
        openEditModal(); // Ouvrir le formulaire d'édition
    };
    // const handleTicketsClick = async () => {
    //     if (!eventId) { // Vérifiez si  son ID sont définis
    //         console.error('Event info is missing or does not have an ID');
    //         return;
    //     }
    //     try {
    //         const response = await axios.get(`http://localhost:8080/event/${eventId}/tickets`); // Utilisez eventInfo._id

    //         const data = await response.json();
    //         setTickets(data);
    //     } catch (error) {
    //         console.error('Error fetching tickets:', error);
    //     }
    // };
    const handleTicketsClick = async () => {
        if (!eventId) { // Vérifiez si l'ID de l'événement est défini
            console.error('Event info is missing or does not have an ID');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8080/event/${eventId}/tickets`); // Utilisez eventInfo._id

            const data = response.data; // Accédez directement aux données de la réponse
            //setTickets(data);

            // Redirigez l'utilisateur vers la page des tickets en utilisant history.push()
            history.push('/tickets');
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    const handleCommentsClick = async () => {
        if (!eventId) { // Vérifiez si eventInfo ou son ID sont définis
            console.error('Event info is missing or does not have an ID');
            return;
        }
        try {
            const response = await fetch(`/admin/event/${eventId}/comments`); // Utilisez eventInfo._id
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
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


    const handleView = (eventData) => {
        setEventInfo(eventData);
        setIsModalViewOpen(true);
    };
    const closeModalViewA = () => {
        setIsModalViewOpen(false);
    };


    const [formData, setFormData] = useState({
        name: "",
        description: "",
        imageUrl: "",
        date: "",
        location: "",
        price: "",

        room_name: "",
        room_shape: "",
        room_capacity: "",
        room_distributionSeats: ""

    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = async () => {
        let errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Nameis required'
        } else if (!formData.description.trim()) {
            errors.description = 'Description required'
        } else if (!formData.location.trim()) {
            errors.location = 'location required'
        } else if (!formData.price.trim()) {
            errors.price = 'price required'
        } else if (!formData.imageUrl.trim()) {
            errors.imageUrl = 'image required'
        } else if (!formData.date.trim()) {
            errors.date = 'date required'
        } else if (!formData.room_name.trim()) {
            errors.room_name = 'room required'
        } else if (!formData.room_capacity.trim()) {
            errors.room_capacity = 'room capacity required'
        } else if (!formData.room_shape.trim()) {
            errors.room_shape = 'room shape required'

        } else if (!formData.room_distributionSeats.trim()) {
            errors.room_distributionSeats = 'Seats required'
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
                    "http://localhost:8080/event/add",
                    formData
                );
                fetchData()
                closeModalA()
                console.log(response.data);
            } catch (error) {
                console.error("Error adding event:", error);
            }
        }
    };
    //   const [eventId, setEventId] = useState({});

    //   const handleTicketsClick = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/event/${eventId._id}/tickets`);
    //         //const response = await axios.(`http://localhost:8080/event/${eventId}/tickets`);
    //         if (!response.ok) {
    //             throw new Error('Erreur lors de la récupération des tickets');
    //         }
    //         // Gérez la réponse pour afficher la page de tickets
    //     } catch (error) {
    //         console.error(error);
    //         // Gérez les erreurs
    //     }
    // };




    //     const [tickets, setTickets] = useState([]);
    // const [eventId, setEventId] = useState({});
    //     const handleTicketsClick = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:8080/event/${eventId._id}/tickets`);
    //             if (!response.ok) {
    //                 throw new Error('Erreur lors de la récupération des tickets');
    //             }
    //             const data = await response.json();
    //             setTickets(data);
    //         } catch (error) {
    //             console.error(error);
    //             // Gérez les erreurs
    //         }
    //     }
    return (
        <Card direction='column' w='100%' px='0px' overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px='25px' justify='space-between' mb='20px' align='center'>
                <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
                    Events Table
                </Text>

                <Menu isOpen={isOpen1} onClose={onClose1}>
                    <MenuButton align='center' justifyContent='center' bg={bgButton} _hover={bgHover} _focus={bgFocus} _active={bgFocus} w='37px' h='37px' lineHeight='100%' onClick={openModalA} borderRadius='10px'>
                        <AddIcon color={iconColor} w='20px' h='20px' />
                    </MenuButton>
                </Menu>

                {/* Modal for adding event */}
                <Modal isOpen={isModalOpenA} onClose={closeModalA}>
                    <ModalOverlay />
                    <ModalContent>
                        <form onSubmit={handleSubmit} noValidate>
                            <ModalHeader>Add Event</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Grid templateColumns="1fr 1fr" gap={4}>
                                    <FormControl>
                                        <FormLabel>Name</FormLabel>
                                        <Input type="text" name="name" value={formData.name} onChange={handleChange} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Description</FormLabel>
                                        <Input type="text" name="description" value={formData.description} onChange={handleChange} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Location</FormLabel>
                                        <Input type="text" name="location" value={formData.location} onChange={handleChange} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Price</FormLabel>
                                        <Input type="number" name="price" value={formData.price} onChange={handleChange} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Room Name</FormLabel>
                                        <Input type="text" name="room_name" value={formData.room_name} onChange={handleChange} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>shape</FormLabel>
                                        {/* <Input type="text" name="room_shape" value={formData.room_shape} onChange={handleChange} /> */}
                                        <Select name="room_shape" value={formData.room_shape} onChange={handleChange}>
                                            <option value="Rectangular">Rectangular</option>
                                            <option value="Triangular">Triangular</option>
                                            <option value="Circle">Circle</option>
                                            <option value="Square">Square</option>
                                        </Select>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Capacity</FormLabel>
                                        <Input type="number" name="room_capacity" value={formData.room_capacity} onChange={handleChange} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Seats</FormLabel>
                                        <Input type="text" name="room_distributionSeats" value={formData.room_distributionSeats} onChange={handleChange} />
                                    </FormControl>
                                </Grid>
                                <FormControl mt={4}>
                                    <FormLabel>Date</FormLabel>
                                    <Input type="datetime-local" name="date" value={formData.date} onChange={handleChange} />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Image</FormLabel>
                                    <Input type="file" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                                </FormControl>

                            </ModalBody>

                            {errors.name && <Text color="red">{errors.name}</Text>}
                            {errors.description && <Text color="red">{errors.description}</Text>}
                            {errors.location && <Text color="red">{errors.location}</Text>}
                            {errors.price && <Text color="red">{errors.price}</Text>}
                            {errors.imageUrl && <Text color="red">{errors.imageUrl}</Text>}
                            {errors.date && <Text color="red">{errors.date}</Text>}
                            {errors.room_name && <Text color="red">{errors.room_name}</Text>}
                            {errors.room_shape && <Text color="red">{errors.room_shape}</Text>}
                            {errors.room_capacity && <Text color="red">{errors.room_capacity}</Text>}
                            {errors.room_distributionSeats && <Text color="red">{errors.room_distributionSeats}</Text>}






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
                                    if (cell.column.Header === "IMAGE") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                <img src={cell.value} alt="Event Image" />
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "NAME") {
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
                                    } else if (cell.column.Header === "LOCATION") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "PRICE") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );




                                    } else if (cell.column.Header === "ROOM") {
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
                                                        <ModalHeader>Edit Event</ModalHeader>
                                                        <ModalCloseButton />
                                                        {editedEvent && ( // Vérifiez si editedEvent est disponible
                                                            <ModalBody>
                                                                {/* Formulaire pour l'édition du cours */}
                                                                <FormControl id="name">
                                                                    <FormLabel>Name</FormLabel>
                                                                    <Input type="text" value={editedEvent.name} onChange={(e) => setEditedEvent({ ...editedEvent, name: e.target.value })} />
                                                                </FormControl>
                                                                <FormControl id="description">
                                                                    <FormLabel>Description</FormLabel>
                                                                    <Input type="text" value={editedEvent.description} onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })} />
                                                                </FormControl>
                                                                <FormControl id="location">
                                                                    <FormLabel>Location</FormLabel>
                                                                    <Input type="text" value={editedEvent.location} onChange={(e) => setEditedEvent({ ...editedEvent, location: e.target.value })} />
                                                                </FormControl>
                                                                <FormControl id="price">
                                                                    <FormLabel>Price</FormLabel>
                                                                    <Input type="number" value={editedEvent.price} onChange={(e) => setEditedEvent({ ...editedEvent, price: parseInt(e.target.value) })} />
                                                                </FormControl>
                                                                <FormControl id="date">
                                                                    <FormLabel>Date</FormLabel>
                                                                    <Input type="datetime-local" value={editedEvent.date} onChange={(e) => setEditedEvent({ ...editedEvent, date: e.target.value })} />
                                                                </FormControl>
                                                                <FormControl id="room_name">
                                                                    <FormLabel>Room Name</FormLabel>
                                                                    <Input type="text" value={editedEvent.room_name} onChange={(e) => setEditedEvent({ ...editedEvent, room_name: e.target.value })} />
                                                                </FormControl>
                                                                {/* <FormControl id="room_shape">
                                                                <FormLabel>Shape</FormLabel>
                                                                <Input type="text" value={editedEvent.room_shape} onChange={(e) => setEditedEvent({ ...editedEvent, room_shape: parseInt(e.target.value) })} />
                                                            
                                                            </FormControl> */}
                                                                <FormControl id="room_shape">
                                                                    <FormLabel>Shape</FormLabel>
                                                                    <Select value={editedEvent.room_shape} onChange={(e) => setEditedEvent({ ...editedEvent, room_shape: e.target.value })}>
                                                                        <option value="Rectangular">Rectangular</option>
                                                                        <option value="Triangular">Triangular</option>
                                                                        <option value="Circle">Circle</option>
                                                                        <option value="Square">Square</option>
                                                                    </Select>
                                                                </FormControl>

                                                                {/* Select name="room_shape" value={formData.room_shape} onChange={handleChange}>
                                                                    <option value="Rectangular">Rectangular</option>
                                                                    <option value="Triangular">Triangular</option>
                                                                    <option value="Circle">Circle</option>
                                                                    <option value="Square">Square</option>
                                                                </Select> */}
                                                                <FormControl id="room_capacity">
                                                                    <FormLabel>Capacity</FormLabel>
                                                                    <Input type="number" value={editedEvent.room_capacity} onChange={(e) => setEditedEvent({ ...editedEvent, room_capacity: parseInt(e.target.value) })} />
                                                                </FormControl>
                                                                <FormControl id="room_distributionSeats">
                                                                    <FormLabel>Seats</FormLabel>
                                                                    <Input type="text" value={editedEvent.room_distributionSeats} onChange={(e) => setEditedEvent({ ...editedEvent, room_distributionSeats: e.target.value })} />
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
                                                                Delete Event
                                                            </AlertDialogHeader>

                                                            <AlertDialogBody>
                                                                Are you sure you want to delete this event?
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
                                                        {/* <ModalHeader>Event Information</ModalHeader> */}
                                                        <ModalCloseButton />
                                                        <ModalBody>
                                                            {eventInfo && (
                                                                <>
                                                                    <img src={eventInfo.imageUrl} alt="Event Image" />
                                                                    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
                                                                        <Text
                                                                            color={textColorPrimary}
                                                                            fontWeight='bold'
                                                                            fontSize='2xl'
                                                                            mt='10px'
                                                                            mb='4px'>
                                                                            {eventInfo.name}
                                                                        </Text>
                                                                        <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
                                                                            {eventInfo.description}
                                                                        </Text>
                                                                        <SimpleGrid columns='2' gap='20px'>
                                                                            <Information
                                                                                // boxShadow={cardShadow}
                                                                                // title='Date'
                                                                                // value={eventInfo.date}
                                                                                boxShadow={cardShadow}
                                                                                title='Date'
                                                                                value={new Date(eventInfo.date).toLocaleString('fr-FR', {
                                                                                    weekday: 'long',
                                                                                    year: 'numeric',
                                                                                    month: 'long',
                                                                                    day: 'numeric',
                                                                                    hour: 'numeric',
                                                                                    minute: 'numeric',
                                                                                    second: 'numeric',
                                                                                })}
                                                                            />
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Location'
                                                                                value={eventInfo.location}
                                                                            />
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Price'
                                                                                value={eventInfo.price}
                                                                            />

                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Room Name'
                                                                                value={eventInfo.room_name}
                                                                            />
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Room Shape'
                                                                                value={eventInfo.room_shape}
                                                                            />
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Room Capacity'
                                                                                value={eventInfo.room_capacity}
                                                                            />
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Seats'
                                                                                value={eventInfo.room_distributionSeats}
                                                                            />
                                                                            <NavLink to={`/event/${eventInfo._id}/tickets`}>
                                                                                <Button colorScheme="blue" >Tickets</Button>
                                                                            </NavLink>
                                                                            <NavLink to={`/${eventInfo._id}/comments`}>
                                                                                <Button colorScheme="orange" >Comments</Button>
                                                                            </NavLink>

                                                                            {/* <ModalFooter>
                                                                                <NavLink to={`/admin/events/${eventInfo.id}/tickets`}>Tickets</NavLink>
                                                                                
                                                                                <Button  colorScheme="orange">
                                                                                comments
                                                                                </Button>
                                                                            </ModalFooter> */}
                                                                            {/* <ModalFooter>
                                                                                <NavLink to={`/admin/events/${eventInfo.id}/tickets`}>Tickets</NavLink>
                                                                                <Button colorScheme="blue" onClick={() => setShowTickets(true)}>
                                                                                tickets
                                                                                </Button>
                                                                                <Button colorScheme="orange" onClick={() => setShowComments(true)}>
                                                                                comments
                                                                                </Button>
                                                                            </ModalFooter> */}

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