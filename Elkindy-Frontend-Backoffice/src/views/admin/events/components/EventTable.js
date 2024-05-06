import axios from "axios";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, Select } from "@chakra-ui/react";
import { ViewIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { AddIcon } from '@chakra-ui/icons'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, FormControl, FormLabel, Input, Grid, SimpleGrid } from "@chakra-ui/react";
// import ReactTooltip from 'react-tooltip';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import api from "services/api";
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
import { format } from "util";


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
    const [eventInfo, setEventInfo] = useState(null);
    const [image, setImage] = useState("");

    const history = useHistory();
    const [errorsEdit, setErrorsEdit] = useState({});

    const validateEditForm = async () => {
        let errorsEdit = {};

        if (editedEvent.price < 0 || isNaN(editedEvent.price)) {
            errorsEdit.price = 'Price must be greater than or equal to 0';
        }

        else if (new Date(editedEvent.endDate) <= new Date(editedEvent.startDate)) {
            errorsEdit.endDate = 'End date must be after start date';
        } else if (parseInt(editedEvent.room_capacity) < 0 || isNaN(editedEvent.room_capacity)) {
            errorsEdit.room_capacity = 'Room capacity must be greater than or equal to 0';
        } else if (parseInt(editedEvent.seat) < 0) {
            errorsEdit.seat = 'Seats distribution must be greater than 0';
        }
        else if (editedEvent.seat.toString().length > 3) {
            errorsEdit.seat = 'Seats distribution must contain maximum 3 digits';
        } else {
            const seriesString = editedEvent.series.toString();
            const seriesArray = seriesString.split('-').map(item => item.trim());
            const uniqueLetters = new Set(seriesArray.join('').split(''));
            if (uniqueLetters.size !== seriesArray.join('').length) {
                errorsEdit.series = 'Series must contain unique letters separated by "-", don\'t repeat letters';
            }
        }

        setErrorsEdit(errorsEdit);
        return Object.keys(errorsEdit).length === 0;
    };


    const handleSaveEdit = async () => {
        const isValid = await validateEditForm();
        console.log("Submitting form");
        if (isValid) {
            try {
                if (image) {
                    const formDataToSend = new FormData();
                    formDataToSend.append("image", image);

                    const uploadResponse = await api.post(
                        "http://localhost:9090/api/image/uploadimage",
                        formDataToSend,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                    editedEvent.imageUrl = uploadResponse.data.downloadURL[0];
                }

                // Traitement spécial pour la série
                let seriesArray = [];
                if (editedEvent.series && typeof editedEvent.series === 'string') {
                    // Si editedEvent.series est une chaîne de caractères, la diviser en tableau
                    seriesArray = editedEvent.series.split('-').map(item => item.trim());
                } else if (Array.isArray(editedEvent.series)) {
                    // Si editedEvent.series est déjà un tableau, l'utiliser tel quel
                    seriesArray = editedEvent.series;
                }

                // Calcul de la capacité
                const seriesLength = seriesArray.reduce((acc, cur) => acc + cur.replace(/-/g, '').length, 0);
                const capacity = editedEvent.seat * seriesLength;

                // Mettre à jour les données de l'événement édité avec la série traitée et la capacité calculée
                const editedEventData = {
                    ...editedEvent,
                    series: seriesArray,
                    room_capacity: capacity,
                };

                // Effectuer la requête API pour mettre à jour l'événement avec les nouvelles données
                await axios.put(`http://localhost:9090/event/update/${editedEvent._id}`, editedEventData);
                console.log("Event updated successfully");
                setIsEditModalOpen(false); // Fermer la modal d'édition après la sauvegarde
                fetchData(); // Rafraîchir les données des cours
            } catch (error) {
                console.error("Error updating Event:", error);
            }
        } else {
            console.log("Form validation failed");
            // Gérer l'échec de la validation ici, par exemple, en mettant à jour l'état pour afficher des messages d'erreur à l'utilisateur
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleEdit = (event) => {
        setEditedEvent(event); // Charger les données du cours à éditer dans editedEvent
        openEditModal(); // Ouvrir le formulaire d'édition
    };

    // La fonction pour ouvrir le formulaire d'édition
    const openEditModal = () => {
        setIsEditModalOpen(true);
    };


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
        startDate: "",
        endDate: "",
        duration: "",
        location: "",
        price: "",
        room_name: "",
        room_shape: "",
        room_capacity: "",
        room_distributionSeats: "",
        series: [],
        seat: "",
        selectedSeats: [],

    });

    const [errors, setErrors] = useState({});

    const [showHelp, setShowHelp] = useState(false);
    const handleSeriesFocus = () => {
        setShowHelp(true);
    };

    const handleSeriesBlur = () => {
        setShowHelp(false);
    };
    const validateForm = async () => {
        let errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }
        else if (!formData.description.trim()) {
            errors.description = 'Description is required';
        }
        else if (!formData.location.trim()) {
            errors.location = 'Location is required';
        }
        else if (!formData.price.trim()) {
            errors.price = 'Price is required';
        }

        else if (parseFloat(formData.price) < 0) {
            errors.price = 'Price must be greater than or equal to 0';
        }
        else if (!formData.startDate.trim()) {
            errors.startDate = 'Start date is required';
        } else if (new Date(formData.startDate) <= new Date()) {
            errors.startDate = 'Start date must be after today';
        }
        else if (!formData.endDate.trim()) {
            errors.endDate = 'End date is required';
        } else if (new Date(formData.endDate) <= new Date(formData.startDate)) {
            errors.endDate = 'End date must be after start date';
        }
        else if (!formData.room_name.trim()) {
            errors.room_name = 'Room name is required';
            // }
            // else if (!formData.room_capacity.trim()) {
            //     errors.room_capacity = 'Room capacity is required';
        } else if (parseInt(formData.room_capacity) < 0) {
            errors.room_capacity = 'Room capacity must be greater than or equal to 0';
        }
        // else if (!formData.room_shape.trim()) {
        //     errors.room_shape = 'Room shape is required';
        // }

        else if (!formData.seat.trim()) {
            errors.seat = 'Seat is required';
        } else if (parseInt(formData.seat) < 0) {
            errors.seat = 'Seats distribution must be greater than 0';
        } else if (formData.seat.toString().length > 2) {
            errors.seat = 'Seats distribution must contain maximum 3 digits';


        } else if (!formData.series || typeof formData.series !== 'string' || !formData.series.trim()) {
            errors.series = 'Series are required';
        } else if (!/^[a-zA-Z]+(-[a-zA-Z]+)*$/.test(formData.series.trim())) {
            errors.series = 'Series must be like "a-b-c" and contain only letters separated by "-"';
            // } else if (!/^(?!.*(?:([a-zA-Z])-?\1)+)[a-zA-Z]+(?:-[a-zA-Z]+)*$/.test(formData.series.trim())) {
            //     errors.series = 'Series must contain unique letters separated by "-"';
            // }
        } else {
            const seriesArray = formData.series.trim().split('-').map(item => item.trim());
            const uniqueLetters = new Set(seriesArray.join('').split(''));
            if (uniqueLetters.size !== seriesArray.join('').length) {
                errors.series = 'Series must contain unique letters separated by "-", don\'t repeate letters';
            }
        }



        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await validateForm();
        
        if (isValid) {
            try {
                if (image) {
                    // Télécharger l'image
                    const formDataToSend = new FormData();
                    formDataToSend.append("image", image);

                    const uploadResponse = await api.post(
                        "http://localhost:9090/api/image/uploadimage",
                        formDataToSend,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                    // Ajouter l'URL de l'image téléchargée à formData
                    formData.imageUrl = uploadResponse.data.downloadURL[0];
                }
                // Traitement spécial pour la série
                let seriesArray = [];
                if (formData.series && typeof formData.series === 'string') {
                    // Si formData.series est une chaîne de caractères, la diviser en tableau
                    seriesArray = formData.series.split('-').map(item => item.trim());
                } else if (Array.isArray(formData.series)) {
                    // Si formData.series est déjà un tableau, l'utiliser tel quel
                    seriesArray = formData.series;
                }

                // Calcul de la capacité
                const seriesLength = seriesArray.reduce((acc, cur) => acc + cur.replace(/-/g, '').length, 0);
                const capacity = formData.seat * seriesLength;
                
                // Mettre à jour le formData avec la série traitée et la capacité calculée
                setFormData({ ...formData, series: seriesArray, room_capacity: capacity });

                const dataToSend = {
                    name: formData.name,
                    description: formData.description,
                    imageUrl: formData.imageUrl,
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    duration: formData.duration,
                    location: formData.location,
                    price: formData.price,
                    room_name: formData.room_name,
                    room_shape: formData.room_shape,
                    room_capacity: capacity, // Utilisez la capacité calculée ici
                    room_distributionSeats: formData.room_distributionSeats,
                    series: seriesArray,
                    seat: formData.seat,
                    selectedSeats: formData.selectedSeats,
                };

                const response = await axios.post("http://localhost:9090/event/add", dataToSend);
                
                fetchData();
                closeModalA();
            } catch (error) {
                console.error("Error adding event:", error);
                // Gérer l'erreur ici, par exemple, en mettant à jour l'état pour afficher un message d'erreur à l'utilisateur
            }
        } else {
            console.log("Form validation failed");
            // Gérer l'échec de la validation ici, par exemple, en mettant à jour l'état pour afficher des messages d'erreur à l'utilisateur
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

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
                                        <Input as="textarea" name="description" value={formData.description} onChange={handleChange} />
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
                                        <FormLabel>Shape</FormLabel>
                                        <Select name="room_shape" value={formData.room_shape} onChange={handleChange}>
                                            <option value="Rectangular">Rectangular</option>

                                        </Select>
                                    </FormControl>

                                    <FormControl>
                                        
                                        <FormLabel>Lines</FormLabel>
                                        <Input
                                            data-tooltip-id="seriesTooltip"
                                            type="text"
                                            name="series"
                                            value={formData.series}
                                            onChange={handleChange}
                                            placeholder="A-B-C"
                                            data-tooltip-content="The lines will be the names of the lines in your event room. For example, if you have 3 lines with the names a, b, and c, you will enter them as a-b-c."
                                            
                                        />
                                        <ReactTooltip id="seriesTooltip" />
                                        
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Seats Per Line</FormLabel>
                                        <Input type="number" name="seat" value={formData.seat} onChange={handleChange} data-tooltip-id="my-tooltip" data-tooltip-content="For example, if you have 20 seats per lines, you will enter 20." />
                                        
                                        <ReactTooltip id="my-tooltip" />
                                        {/* {showHelp && (
                                            <Text fontSize="sm" color="gray.500">
                                                For example, if you have 20 seats per lines, you will enter 20.
                                            </Text>
                                        )} */}
                                    </FormControl>

                                </Grid>
                                <FormControl mt={4}>
                                    <FormLabel>Start Date</FormLabel>
                                    <Input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>End Date</FormLabel>
                                    <Input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Image</FormLabel>
                                    <Input type="file" name="imageUrl" onChange={handleImageChange} />
                                </FormControl>
                            </ModalBody>
                            {errors.name && <Text color="red">{errors.name}</Text>}
                            {errors.description && <Text color="red">{errors.description}</Text>}
                            {errors.location && <Text color="red">{errors.location}</Text>}
                            {errors.room_name && <Text color="red">{errors.room_name}</Text>}
                            {/* {errors.room_shape && <Text color="red">{errors.room_shape}</Text>} */}
                            {errors.price && <Text color="red">{errors.price}</Text>}
                            {errors.startDate && <Text color="red">{errors.startDate}</Text>}
                            {errors.endDate && <Text color="red">{errors.endDate}</Text>}
                            {/* {errors.room_capacity && <Text color="red">{errors.room_capacity}</Text>} */}
                            {errors.seat && <Text color="red">{errors.seat}</Text>}
                            {errors.series && <Text color="red">{errors.series}</Text>}

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
                                <Input as="textarea" value={editedEvent.description} onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })} />
                            </FormControl>
                            <FormControl id="location">
                                <FormLabel>Location</FormLabel>
                                <Input type="text" value={editedEvent.location} onChange={(e) => setEditedEvent({ ...editedEvent, location: e.target.value })} />
                            </FormControl>
                            <FormControl id="price">
                                <FormLabel>Price</FormLabel>
                                <Input type="number" value={editedEvent.price} onChange={(e) => setEditedEvent({ ...editedEvent, price: parseFloat(e.target.value) })} />
                                {/* <Input type="number" value={editedEvent.price} onChange={(e) => setEditedEvent({ ...editedEvent, price: parseFloat(e.target.value) })} /> */}
                            </FormControl>
                            <FormControl id="startDate">
                                <FormLabel>Start Date</FormLabel>
                                <Input type="datetime-local" value={editedEvent.startDate || ''} onChange={(e) => setEditedEvent({ ...editedEvent, startDate: e.target.value })} />
                            </FormControl>
                            <FormControl id="endDate">
                                <FormLabel>End Date</FormLabel>
                                <Input type="datetime-local" value={editedEvent.endDate || ''} onChange={(e) => setEditedEvent({ ...editedEvent, endDate: e.target.value })} />
                            </FormControl>
                            <FormControl id="room_name">
                                <FormLabel>Room Name</FormLabel>
                                <Input type="text" value={editedEvent.room_name} onChange={(e) => setEditedEvent({ ...editedEvent, room_name: e.target.value })} />
                            </FormControl>
                            <FormControl id="lines">
                                <FormLabel>Lines</FormLabel>
                                <Input value={editedEvent.series} onChange={(e) => setEditedEvent({ ...editedEvent, series: e.target.value.split('\n') })} placeholder="Enter hyphen-separated series" />
                            </FormControl>
                            <FormControl id="seatsPerLine">
                                <FormLabel>Seats Per Line</FormLabel>
                                <Input type="number" value={editedEvent.seat} onChange={(e) => setEditedEvent({ ...editedEvent, seat: parseInt(e.target.value) })} />
                            </FormControl>
                            <FormControl id="imageUrl" mt={4}>
                                {/* <img src={editedEvent.imageUrl} alt="imageUrl" style={{ maxWidth: "250px", maxHeight: "250px", borderRadius: "50%", margin: "auto" }} /> */}

                                <FormLabel>Image</FormLabel>

                                <Input type="file" name="imageUrl" onChange={handleImageChange} />
                            </FormControl>

                        </ModalBody>

                    )}



                    {errorsEdit.price && <Text color="red">{errorsEdit.price}</Text>}
                    {errorsEdit.startDate && <Text color="red">{errorsEdit.startDate}</Text>}
                    {errorsEdit.endDate && <Text color="red">{errorsEdit.endDate}</Text>}
                    {errorsEdit.seat && <Text color="red">{errorsEdit.seat}</Text>}
                    {errorsEdit.series && <Text color="red">{errorsEdit.series}</Text>}
                    {/* {errorsEdit.room_capacity && <Text color="red">{errorsEdit.room_capacity}</Text>} */}



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
            <Modal isOpen={isModalViewOpen} onClose={closeModalViewA}>
                <ModalOverlay />
                <ModalContent maxW={'800px'}>
                    {/* <ModalHeader>Event Information</ModalHeader> */}
                    <ModalCloseButton />
                    <ModalBody>
                        {eventInfo && (
                            <>
                                {/* <img src={eventInfo.imageUrl} alt="Event Image" /> */}
                                {/* <img src={eventInfo.imageUrl} alt="imageUrl" style={{ maxWidth: "250px", maxHeight: "250px", borderRadius: "50%", margin: "auto" }} /> */}
                                <img src={eventInfo.imageUrl} alt="imageUrl" style={{ Width: "10S50px", maxHeight: "250px", margin: "auto" }} />

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
                                            title=' Start Date'
                                            value={new Date(eventInfo.startDate).toLocaleString('fr-FR', {
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
                                            title=' End Date'
                                            value={new Date(eventInfo.endDate).toLocaleString('fr-FR', {
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
                                            title='Available Seats'
                                            value={eventInfo.room_capacity}
                                        />
                                        <Information
                                            boxShadow={cardShadow}
                                            title='Lines'
                                            value={eventInfo.series}
                                        />
                                        <Information
                                            boxShadow={cardShadow}
                                            title='Seats per Line'
                                            value={eventInfo.seat}
                                        />
                                        <NavLink to={`/event/${eventInfo._id}/tickets`}>
                                            <Button colorScheme="blue" >Tickets</Button>
                                        </NavLink>
                                        <NavLink to={`/event/${eventInfo._id}/comments`}>
                                            <Button colorScheme="orange" >Comments</Button>
                                        </NavLink>
                                    </SimpleGrid>

                                </Card>
                            </>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
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

                                                <img src={cell.value} alt="Event Image" style={{ width: "70px", height: "60px", margin: "auto" }} />

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
                                                {new Date(cell.value).toLocaleString('fr-FR', {
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