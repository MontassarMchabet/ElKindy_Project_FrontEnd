import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
    useColorModeValue,Select 
} from "@chakra-ui/react";
import React, { useEffect,useMemo, useState } from "react";
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
        isModalOpenR, openModalR, closeModalR, fetchData, isEditModalOpen, closeEditModal,setIsEditModalOpen,courseOptions,roomOptions,teacherOptions,studentOptions} = props;
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const [editedRoom, seteditedRoom] = useState({}); 
 
        const handleSaveEdit = async () => {
            try {
                // Effectuer la requête API pour mettre à jour le cours avec les nouvelles données
                await axios.put(`http://localhost:9090/api/Room/update/${editedRoom._id}`, editedRoom);
               
                console.log("Course updated successfully");
                setIsEditModalOpen(false); 
                fetchData(); 
            } catch (error) {
                console.error("Error updating course:", error);
            }
        };

const [isRoomAvailablePopupOpen, setIsRoomAvailablePopupOpen] = useState(false);  
const [isTeacherAvailablePopupOpen, setIsTeacherAvailablePopupOpen] = useState(false);    
const [isStudentAvailablePopupOpen, setIsStudentAvailablePopupOpen] = useState(false); 
const [checkDurationPopupOpen, setcheckDurationPopupOpen] = useState(false); 
const [TotalIndividualStudyPopupOpen, setTotalIndividualStudyPopupOpen] = useState(false); 
const [TotalStudyHoursPopupOpen, setTotalStudyHoursPopupOpen] = useState(false); 
const openRoomAvailablePopup = () => {
    setIsRoomAvailablePopupOpen(true);
};
const openTecherAvailablePopup = () => {
    setIsTeacherAvailablePopupOpen(true);
};
const openStudentAvailablePopup = () => {
    setIsStudentAvailablePopupOpen(true);
};
const openDurationPopup = () => {
    setcheckDurationPopupOpen(true);
};
const openIndividualStudyPopup = () => {
    setTotalIndividualStudyPopupOpen(true);
};
const openTotalStudyHoursPopup = () => {
    setTotalStudyHoursPopupOpen(true);
};
    // Fonction pour vérifier la disponibilité de la salle
const checkRoomAvailability = async (roomId, date, startTime, endTime) => {
    try {
        const response = await axios.get(`http://localhost:9090/api/plannings/availability/room/${roomId}/${date}/${startTime}/${endTime}`);
        console.log(response.data.isRoomAvailable);
        return response.data.isRoomAvailable;
    } catch (error) {
        console.error('Error checking room availability:', error);
        // Gérer les erreurs de requête
        return false;
    }
};
const checkTeacherAvailability = async (teacherId, date, startTime, endTime) => {
    try {
        const response = await axios.get(`http://localhost:9090/api/plannings/availability/teacher/${teacherId}/${date}/${startTime}/${endTime}`);
        console.log(response.data.isTeacherAvailable);
        return response.data.isTeacherAvailable;
    } catch (error) {
        console.error('Error checking teacher availability:', error);
        // Gérer les erreurs de requête
        return false;
    }
};
const checkStudentAvailability = async (studentIds, date, startTime, endTime) => {
    console.log(studentIds)
    try {
        const response = await axios.get(`http://localhost:9090/api/plannings/availability/studends/${studentIds}/${date}/${startTime}/${endTime}`);
        console.log(response.data.areStudentsAvailable);
        return response.data.areStudentsAvailable;
    } catch (error) {
        console.error('Error checking student availability:', error);
        // Gérer les erreurs de requête
        return false;
    }
};
const checkDurationOfCourse = async (startTime, endTime) => {
    try {
        const response = await axios.get(`http://localhost:9090/api/plannings/CheckDuration/${startTime}/${endTime}`);
        return response.data.correctDuration;
    } catch (error) {
        console.error('Error checking course duration:', error);
        return false;
    }
};
const calculateTotalIndividualStudyHours  = async (studentIds,date,startTime, endTime,courseId) => {
    console.log(courseId)
    try {
        const response = await axios.get(`http://localhost:9090/api/plannings/TotalIndividualStudy/${studentIds}/${date}/${startTime}/${endTime}/${courseId}`);
        console.log(response.data.TotalIndividualStudy);
        return response.data.TotalIndividualStudy;
    } catch (error) {
        console.error('Error checking course duration:', error);
        return false;
    }
};
const calculateTotalStudyHours  = async (studentIds,date,startTime, endTime) => {
    try {
        const response = await axios.get(`http://localhost:9090/api/plannings/TotalStudyHours/${studentIds}/${date}/${startTime}/${endTime}`);
        console.log(response.data.totalStudyHoursPerWeek);
        return response.data.totalStudyHoursPerWeek;
    } catch (error) {
        console.error('Error checking course duration:', error);
        return false;
    }
};
    const handleEdit = (course) => {
       seteditedRoom(course); 
       openEditModal(); 
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
        courseId: "",
        date: "",
        startDate: "",
        endDate:"",
        roomId:"",
        teacherId:"",
        studentIds:[],


       
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "studentIds") {
            const selectedStudents = Array.from(e.target.selectedOptions, option => option.value);
            setFormData({ ...formData, [name]: selectedStudents });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = async () => {
        let errors = {};
    
        if (!formData.courseId.trim()) {
            errors.courseId = 'Course ID is required';
        }
        if (!formData.date) {
            errors.date = 'Date is required';
        }
        if (!formData.startDate.trim()) {
            errors.startDate = 'Start Date is required';
        }
        if (!formData.endDate.trim()) {
            errors.endDate = 'End Date is required';
        }
        if (!formData.roomId.trim()) {
            errors.roomId = 'Room ID is required';
        }
        if (!formData.teacherId.trim()) {
            errors.teacherId = 'Teacher ID is required';
        }
        if (!formData.studentIds.length) {
            errors.studentIds = 'Student IDs are required';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationResult = await validateForm(); // Attendre la validation du formulaire
        console.log("Submitting form");
        console.log(formData);
        if (!validationResult) {
            return; // Arrêtez le traitement si le formulaire n'est pas valide
        }
        const isRoomAvailable = await checkRoomAvailability(formData.roomId, formData.date, formData.startDate, formData.endDate);
        if (!isRoomAvailable) {
            openRoomAvailablePopup();
            return; // Arrêtez le traitement si la salle n'est pas disponible
        }
        const isTeacherAvailable = await checkTeacherAvailability(formData.teacherId, formData.date, formData.startDate, formData.endDate);
        if (!isTeacherAvailable) {
            openTecherAvailablePopup();
            return; // Arrêtez le traitement si la salle n'est pas disponible
        }
        const isStudentAvailable = await checkStudentAvailability(formData.studentIds, formData.date, formData.startDate, formData.endDate);
        if (!isStudentAvailable) {
            openStudentAvailablePopup();
            return; // Arrêtez le traitement si la salle n'est pas disponible
        }
        const isCorrectDuration = await checkDurationOfCourse(formData.startDate, formData.endDate);
    
    // Afficher une alerte en fonction du résultat
        if (!isCorrectDuration) {
           openDurationPopup();
           return;
        }
        const TotalIndividualStudy = await calculateTotalIndividualStudyHours(formData.studentIds, formData.date, formData.startDate, formData.endDate,formData.courseId);
        if (!TotalIndividualStudy) {
            openIndividualStudyPopup();
            return; // Arrêtez le traitement si la salle n'est pas disponible
        }
        const TotalStudyHours = await calculateTotalStudyHours(formData.studentIds, formData.date, formData.startDate, formData.endDate);
        if (!TotalStudyHours) {
            openTotalStudyHoursPopup();
            return; // Arrêtez le traitement si la salle n'est pas disponible
        }
        try {
            const response = await axios.post(
                "http://localhost:9090/api/plannings/add",
                formData
            );
            fetchData();
            closeModalR();
            console.log(response.data);
        } catch (error) {
            console.error("Error registering prof:", error);
        }
    };
    return (
        <Card
            direction='column'
            w='150%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px='25px' justify='space-between' mb='20px' align='center'>
                <Text
                    color={textColor}
                    fontSize='22px'
                    fontWeight='700'
                    lineHeight='100%'>
                    Planning Table
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
                        onClick={openModalR} // Open the modal when the add icon is clicked
                        borderRadius='10px'
                        {...rest}>
                        <AddIcon color={iconColor} w='20px' h='20px' />
                    </MenuButton>
                </Menu>
{/* 
                {/* Modal for adding  */}
                <Modal isOpen={isModalOpenR} onClose={closeModalR}>
    <ModalOverlay />
    <ModalContent>
        <form onSubmit={handleSubmit} noValidate>
            <ModalHeader>Add Planning</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                      <FormControl>
                        <FormLabel>Course ID</FormLabel>
                        <Select
                            name="courseId"
                            value={formData.courseId}
                            onChange={handleChange}
                        >
                            {courseOptions.map(course => (
                                <option key={course.id} value={course._id}>{course.name}</option>
                            ))}
                        </Select>
                        {errors.courseId && <Text color="red">{errors.courseId}</Text>}
                    </FormControl>
                     <FormControl>
                    <FormLabel>Date</FormLabel>
                 
                     <Input type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                    />
                    {errors.date && <Text color="red">{errors.date}</Text>}
                </FormControl>
                <FormControl>
                    <FormLabel>Start Date</FormLabel>
                    <Input
                        type="time"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                    />
                    {errors.startDate && <Text color="red">{errors.startDate}</Text>}
                </FormControl>
                <FormControl>
                    <FormLabel>End Date</FormLabel>
                    <Input
                        type="time"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                    />
                    {errors.endDate && <Text color="red">{errors.endDate}</Text>}
                </FormControl>
                <FormControl>
                    <FormLabel>Room ID</FormLabel>
                    <Select
                        name="roomId"
                        value={formData.roomId}
                        onChange={handleChange}
                    >
                        {roomOptions.map(room => (
                            <option key={room.id} value={room._id}>{room.room_number}</option>
                        ))}
                    </Select>
                    {errors.roomId && <Text color="red">{errors.roomId}</Text>}
                </FormControl>
                <FormControl>
                    <FormLabel>Teacher ID</FormLabel>
                    <Select
                        name="teacherId"
                        value={formData.teacherId}
                        onChange={handleChange}
                    >
                        <option value="">Select Teacher</option>
                        {teacherOptions.map(teacher => (
                            
                            <option key={teacher.id} value={teacher._id}>{teacher.name}</option>
                        ))}
                    </Select>
                    {errors.teacherId && <Text color="red">{errors.teacherId}</Text>}
                </FormControl>
                <FormControl>
                    <FormLabel>Student IDs</FormLabel>
                    <Select
                        name="studentIds"
                          
                        value={formData.studentIds.join(",")} 
                        onChange={handleChange}
                       
                        
                    >
                        {studentOptions.map(student => (
                            <option key={student.id} value={student._id}>{student.name}</option>
                        ))}
                    </Select>
                    {errors.studentIds && <Text color="red">{errors.studentIds}</Text>}
                </FormControl>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={closeModalR}>
                    Close
                </Button>
                <Button type="submit" colorScheme="green">
                    Save
                </Button>
            </ModalFooter>
        </form>
    </ModalContent>
</Modal>

<AlertDialog
    isOpen={isRoomAvailablePopupOpen}
    leastDestructiveRef={cancelRef}
    onClose={() => setIsRoomAvailablePopupOpen(false)}
>
    <AlertDialogOverlay>
        <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Room Availability
            </AlertDialogHeader>
            <AlertDialogBody>
                La salle de cours est déjà réservée à ce moment-là.
            </AlertDialogBody>
            <AlertDialogFooter>
                <Button onClick={() => setIsRoomAvailablePopupOpen(false)}>Close</Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialogOverlay>
</AlertDialog>
<AlertDialog
    isOpen={isTeacherAvailablePopupOpen}
    leastDestructiveRef={cancelRef}
    onClose={() => setIsTeacherAvailablePopupOpen(false)}
>
    <AlertDialogOverlay>
        <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Teacher Availability
            </AlertDialogHeader>
            <AlertDialogBody>
                this teacher is not availabile now .
            </AlertDialogBody>
            <AlertDialogFooter>
                <Button onClick={() => setIsTeacherAvailablePopupOpen(false)}>Close</Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialogOverlay>
</AlertDialog>
<AlertDialog
    isOpen={isStudentAvailablePopupOpen}
    leastDestructiveRef={cancelRef}
    onClose={() => setIsStudentAvailablePopupOpen(false)}
>
    <AlertDialogOverlay>
        <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Student Availability
            </AlertDialogHeader>
            <AlertDialogBody>
                this Student is not availabile now .
            </AlertDialogBody>
            <AlertDialogFooter>
                <Button onClick={() => setIsStudentAvailablePopupOpen(false)}>Close</Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialogOverlay>
</AlertDialog>
<AlertDialog
    isOpen={checkDurationPopupOpen}
    leastDestructiveRef={cancelRef}
    onClose={() => setcheckDurationPopupOpen(false)}
>
    <AlertDialogOverlay>
        <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Course Duration Alert
            </AlertDialogHeader>
            <AlertDialogBody>
            La durée du cours ne doit pas dépasser 30 minutes et l'heure de fin doit être postérieure à l'heure de début.
            </AlertDialogBody>
            <AlertDialogFooter>
                <Button onClick={() => setcheckDurationPopupOpen(false)}>Close</Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialogOverlay>
</AlertDialog>
<AlertDialog
    isOpen={TotalIndividualStudyPopupOpen}
    leastDestructiveRef={cancelRef}
    onClose={() => setTotalIndividualStudyPopupOpen(false)}
>
    <AlertDialogOverlay>
        <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Indivual Course Alert
            </AlertDialogHeader>
            <AlertDialogBody>
            cette utilisateur est deja affecte à une seance individuel dans cette semaine
            </AlertDialogBody>
            <AlertDialogFooter>
                <Button onClick={() => setTotalIndividualStudyPopupOpen(false)}>Close</Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialogOverlay>
</AlertDialog>
<AlertDialog
    isOpen={TotalStudyHoursPopupOpen}
    leastDestructiveRef={cancelRef}
    onClose={() => setTotalStudyHoursPopupOpen(false)}
>
    <AlertDialogOverlay>
        <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Total study hours Alert
            </AlertDialogHeader>
            <AlertDialogBody>
            cette utilisateur est depassé de nombre duree dans cette semaine 
            </AlertDialogBody>
            <AlertDialogFooter>
                <Button onClick={() => setTotalStudyHoursPopupOpen(false)}>Close</Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialogOverlay>
</AlertDialog>
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
                                    if (cell.column.Header === "Course ID") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                 {row.original.courseName}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "Date") {
                                        const date = new Date(cell.value);
                                        const formattedDate = date.toISOString().split('T')[0];
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {formattedDate}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "startDate") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    }
                                    else if (cell.column.Header === "endDate") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    }
                                    else if (cell.column.Header === "Room ID") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {row.original.RoomName}
                                            </Text>
                                        );
                                    }
                                    else if (cell.column.Header === "Teacher ID") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {row.original.TeacherName}
                                            </Text>
                                        );
                                    }
                                    else if (cell.column.Header === "Student IDs") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {row.original.studentName}
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
                                                    <ModalHeader>Edit Room</ModalHeader>
                                                    <ModalCloseButton />
                                                    {editedRoom && ( // Vérifiez si editedRoom est disponible
                                                        <ModalBody>
                                                            {/* Formulaire pour l'édition du cours */}
                                                            <FormControl id="room_number">
                                                                <FormLabel>Room Number</FormLabel>
                                                                <Input type="text" value={editedRoom.room_number} onChange={(e) => seteditedRoom({ ...editedRoom, room_number: e.target.value })} />
                                                            </FormControl>
                                                            <FormControl id="capacity">
                                                                <FormLabel>Capacity</FormLabel>
                                                                <Input type="number" value={editedRoom.capacity} onChange={(e) => seteditedRoom({ ...editedRoom, capacity: e.target.value })} />
                                                            </FormControl>
                                                            <FormControl id="location">
                                                                <FormLabel>Location</FormLabel>
                                                                <Input type="text" value={editedRoom.location} onChange={(e) => seteditedRoom({ ...editedRoom, location: parseInt(e.target.value) })} />
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
                                                                Delete Room
                                                            </AlertDialogHeader>

                                                            <AlertDialogBody>
                                                                Are you sure you want to delete this planning?
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
                                               {/*  <Modal isOpen={isModalViewOpen} onClose={closeModalViewA}>
                                                    <ModalOverlay />
                                                    <ModalContent maxW={'800px'}>
                                                        <ModalHeader>Room Information</ModalHeader>
                                                        <ModalCloseButton />
                                                        <ModalBody>
                                                            {profInfo && (
                                                                <>
                                                                    
                                                                    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
                                                                        <Text
                                                                            color={textColorPrimary}
                                                                            fontWeight='bold'
                                                                            fontSize='2xl'
                                                                            mt='10px'
                                                                            mb='4px'>
                                                                            {profInfo.room_number} 
                                                                        </Text>
                                                                        
                                                                        <SimpleGrid columns='2' gap='20px'>
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='room_number'
                                                                                value={profInfo.room_number}
                                                                            />
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='capacity'
                                                                                value={profInfo.capacity}
                                                                            />
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='location'
                                                                                value={profInfo.location }
                                                                            />
                                                                            
                                                                        </SimpleGrid>
                                                                    </Card>
                                                                </>
                                                            )}
                                                        </ModalBody>
                                                    </ModalContent>
                                                </Modal> */}
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
