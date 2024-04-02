import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { ViewIcon, DeleteIcon, EditIcon,Icon } from "@chakra-ui/icons";
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
    useColorModeValue,Select ,Checkbox
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
export default function ColumnsTable(props) {
    const { columnsData, tableData, handleDelete, cancelDelete, cancelRef, confirmDelete, isDeleteDialogOpen,
        isModalOpenR, openModalR, closeModalR, fetchData, isEditModalOpen, closeEditModal,setIsEditModalOpen,roomOptions,teacherOptions,studentOptions,classroomoptions} = props;
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const [editedRoom, seteditedRoom] = useState({}); 
 
        const handleSaveEdit = async () => {
            const isRoomAvailable = await checkRoomAvailability(editedRoom.roomId, editedRoom.date, editedRoom.startDate, editedRoom.endDate);
        if (!isRoomAvailable) {
            openRoomAvailablePopup();
            return; // Arrêtez le traitement si la salle n'est pas disponible
        }
        const isTeacherAvailable = await checkTeacherAvailability(editedRoom.teacherId, editedRoom.date, editedRoom.startDate, editedRoom.endDate);
        if (!isTeacherAvailable) {
            openTecherAvailablePopup();
            return; // Arrêtez le traitement si la salle n'est pas disponible
        }
        
        if(editedRoom.type==="instrument"){
                const isStudentAvailable = await checkStudentAvailability(editedRoom.studentIds, editedRoom.date, editedRoom.startDate, editedRoom.endDate);
                if (!isStudentAvailable) {
                    openStudentAvailablePopup();
                    return; // Arrêtez le traitement si la salle n'est pas disponible
                }
                const TotalIndividualStudy = await calculateTotalIndividualStudyHours(editedRoom.studentIds, editedRoom.date,editedRoom.type);
                if (!TotalIndividualStudy) {
                    openIndividualStudyPopup();
                    return; // Arrêtez le traitement si la salle n'est pas disponible
                }
         }
        const isCorrectDuration = await checkDurationOfCourse(editedRoom.startDate, editedRoom.endDate,editedRoom.type);
    
    // Afficher une alerte en fonction du résultat
        if (!isCorrectDuration) {
           openDurationPopup();
           return;
        }
        if(editedRoom.type==="solfège"){
                const TotalStudyHours = await calculateTotalStudyHours(editedRoom.classroomId, editedRoom.date, editedRoom.startDate, editedRoom.endDate);
                if (!TotalStudyHours) {
                    openTotalStudyHoursPopup();
                    return; // Arrêtez le traitement si la salle n'est pas disponible
                }
        }
            try {
                // Effectuer la requête API pour mettre à jour le cours avec les nouvelles données
                await axios.put(`http://localhost:9090/api/plannings/update/${editedRoom._id}`, editedRoom);
               
                console.log("plannings updated successfully");
                setIsEditModalOpen(false); 
                fetchData(); 
            } catch (error) {
                console.error("Error updating plannings:", error);
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
const checkDurationOfCourse = async (startTime, endTime,type) => {
    try {
        const response = await axios.get(`http://localhost:9090/api/plannings/CheckDuration/${startTime}/${endTime}/${type}`);
        return response.data.correctDuration;
    } catch (error) {
        console.error('Error checking course duration:', error);
        return false;
    }
};
const calculateTotalIndividualStudyHours  = async (studentIds,date,type) => {
    
    try {
        const response = await axios.get(`http://localhost:9090/api/plannings/TotalIndividualStudy/${studentIds}/${date}/${type}`);
        console.log(response.data.TotalIndividualStudy);
        return response.data.TotalIndividualStudy;
    } catch (error) {
        console.error('Error checking course duration:', error);
        return false;
    }
};
const calculateTotalStudyHours  = async (classroomId,date,startTime, endTime) => {
    try {
        const response = await axios.get(`http://localhost:9090/api/plannings/TotalStudyHours/${classroomId}/${date}/${startTime}/${endTime}`);
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
       
        date: "",
        startDate: "",
        endDate:"",
        type:"",
        roomId:"",
        teacherId:"",
        studentIds:"",
        classroomId:""


       
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value,checked } = e.target;

        if (name === "studentIds") {
            const selectedStudents = Array.from(e.target.selectedOptions, option => option.value);
            setFormData({ ...formData, [name]: selectedStudents });
        }
        if (name === "type") {
            setFormData({
                ...formData,
                [name]: checked ? value : undefined
            });
        }
         else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = async () => {
        let errors = {};
    
        if (!formData.type) {
            errors.type = 'type is required';
        }
        if (!formData.date) {
            errors.date = 'Date is required';
        }
        if (!formData.startDate.trim()) {
            errors.startDate = 'Start Time is required';
        }
        if (!formData.endDate.trim()) {
            errors.endDate = 'End Time is required';
        }
        if (!formData.roomId.trim()) {
            errors.roomId = 'Room Name is required';
        }
        if (!formData.teacherId.trim()) {
            errors.teacherId = 'Teacher Name is required';
        }
        /* if (!formData.studentIds.length) {
            errors.studentIds = 'Student IDs are required';
        } */
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
        
        if(formData.type==="instrument"){
                const isStudentAvailable = await checkStudentAvailability(formData.studentIds, formData.date, formData.startDate, formData.endDate);
                if (!isStudentAvailable) {
                    openStudentAvailablePopup();
                    return; // Arrêtez le traitement si la salle n'est pas disponible
                }
                const TotalIndividualStudy = await calculateTotalIndividualStudyHours(formData.studentIds, formData.date,formData.type);
                if (!TotalIndividualStudy) {
                    openIndividualStudyPopup();
                    return; // Arrêtez le traitement si la salle n'est pas disponible
                }
         }
        const isCorrectDuration = await checkDurationOfCourse(formData.startDate, formData.endDate,formData.type);
    
    // Afficher une alerte en fonction du résultat
        if (!isCorrectDuration) {
           openDurationPopup();
           return;
        }
        if(formData.type==="solfège"){
                const TotalStudyHours = await calculateTotalStudyHours(formData.classroomId, formData.date, formData.startDate, formData.endDate);
                if (!TotalStudyHours) {
                    openTotalStudyHoursPopup();
                    return; // Arrêtez le traitement si la salle n'est pas disponible
                }
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
                <Modal isOpen={isModalOpenR} onClose={closeModalR}>
    <ModalOverlay />
    <ModalContent>
        <form onSubmit={handleSubmit} noValidate>
            <ModalHeader>Add Planning</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                 
                    
                    <FormControl>
                        <FormLabel>Type </FormLabel>
                        <Checkbox
                            name="type"
                            isChecked={formData.type === 'solfège'}
                            onChange={handleChange}
                            value="solfège"
                        >
                            Solfège
                        </Checkbox>
                        <Checkbox
                            name="type"
                            isChecked={formData.type === 'instrument'}
                            onChange={handleChange}
                            value="instrument"
                        >
                            Instrument
                        </Checkbox>
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
                <Grid templateColumns="1fr 1fr" gap={4}>
                <FormControl>
                    <FormLabel>StartTime</FormLabel>
                    <Input
                        type="time"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                    />
                    {errors.startDate && <Text color="red">{errors.startDate}</Text>}
                </FormControl>
                <FormControl>
                    <FormLabel>EndTime</FormLabel>
                    <Input
                        type="time"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                    />
                    {errors.endDate && <Text color="red">{errors.endDate}</Text>}
                </FormControl>
                </Grid>
                <FormControl>
                    <FormLabel>Room Name</FormLabel>
                    <Select
                        name="roomId"
                        value={formData.roomId}
                        onChange={handleChange}
                    >
                        <option value="">Select Room</option>
                        {roomOptions.map(room => (
                            <option key={room.id} value={room._id}>{room.room_number}</option>
                        ))}
                    </Select>
                    {errors.roomId && <Text color="red">{errors.roomId}</Text>}
                </FormControl>
                <FormControl>
                    <FormLabel>Teacher Name</FormLabel>
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
                                {formData.type === 'instrument' ? (
                    <FormControl>
                        <FormLabel>Student Name</FormLabel>
                        <Select
                            name="studentIds"
                            value={formData.studentIds}
                            onChange={handleChange}
                        >
                            <option value="">Select Sudent</option>
                            {studentOptions.map(student => (
                                <option key={student.id} value={student._id}>{student.name}</option>
                            ))}
                        </Select>
                        {errors.studentIds && <Text color="red">{errors.studentIds}</Text>}
                    </FormControl>
                ) : (
                    <FormControl>
                        <FormLabel>Classroom</FormLabel>
                        <Select
                            name="classroomId"
                            value={formData.classroomId}
                            onChange={handleChange}
                        >
                            <option value="">Select classroom</option>
                            {classroomoptions.map(classroom => (
                                <option key={classroom.id} value={classroom._id}>{classroom.name}</option>
                            ))}
                        </Select>
                        {errors.classroomId && <Text color="red">{errors.classroomId}</Text>}
                    </FormControl>
                )}
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

<AlertDialog  isOpen={isRoomAvailablePopupOpen} leastDestructiveRef={cancelRef} onClose={() => setIsRoomAvailablePopupOpen(false)}>
      <AlertDialogOverlay>
        <AlertDialogContent bg="white" borderRadius="lg" shadow="md">
          <AlertDialogHeader fontSize="lg" fontWeight="bold" display="flex" justifyContent="space-between">
            <div>Room Unavailable</div>
            <Icon viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-5.707l-7-7a1 1 0 00-1.414 1.414L6.3 12 5 13.707a1 1 0 001.414 1.414L10 14.142l3.707-3.707a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </Icon>
          </AlertDialogHeader>
          <AlertDialogBody fontSize="md">
          The room is already booked for this date and time.Please choose a different date or room .
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={() => setIsRoomAvailablePopupOpen(false)} colorScheme="blue">
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
</AlertDialog>
<AlertDialog  isOpen={isTeacherAvailablePopupOpen} leastDestructiveRef={cancelRef} onClose={() => setIsTeacherAvailablePopupOpen(false)}>
      <AlertDialogOverlay>
        <AlertDialogContent bg="white" borderRadius="lg" shadow="md">
          <AlertDialogHeader fontSize="lg" fontWeight="bold" display="flex" justifyContent="space-between">
            <div>Teacher Availability</div>
            <Icon viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-5.707l-7-7a1 1 0 00-1.414 1.414L6.3 12 5 13.707a1 1 0 001.414 1.414L10 14.142l3.707-3.707a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </Icon>
          </AlertDialogHeader>
          <AlertDialogBody fontSize="md">
          this teacher is not availabile now .
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={() => setIsTeacherAvailablePopupOpen(false)} colorScheme="blue">
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
</AlertDialog>
<AlertDialog  isOpen={isStudentAvailablePopupOpen} leastDestructiveRef={cancelRef} onClose={() => setIsStudentAvailablePopupOpen(false)}>
      <AlertDialogOverlay>
        <AlertDialogContent bg="white" borderRadius="lg" shadow="md">
          <AlertDialogHeader fontSize="lg" fontWeight="bold" display="flex" justifyContent="space-between">
            <div>Student Availability</div>
            <Icon viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-5.707l-7-7a1 1 0 00-1.414 1.414L6.3 12 5 13.707a1 1 0 001.414 1.414L10 14.142l3.707-3.707a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </Icon>
          </AlertDialogHeader>
          <AlertDialogBody fontSize="md">
          this Student is not availabile now .
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={() => setIsStudentAvailablePopupOpen(false)} colorScheme="blue">
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
</AlertDialog>
<AlertDialog  isOpen={checkDurationPopupOpen} leastDestructiveRef={cancelRef} onClose={() => setcheckDurationPopupOpen(false)}>
      <AlertDialogOverlay>
        <AlertDialogContent bg="white" borderRadius="lg" shadow="md">
          <AlertDialogHeader fontSize="lg" fontWeight="bold" display="flex" justifyContent="space-between">
            <div>Course Duration Alert</div>
            <Icon viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-5.707l-7-7a1 1 0 00-1.414 1.414L6.3 12 5 13.707a1 1 0 001.414 1.414L10 14.142l3.707-3.707a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </Icon>
          </AlertDialogHeader>
          <AlertDialogBody fontSize="md">
          tLa durée du cours ne doit pas dépasser 30 minutes et l'heure de fin doit être postérieure à l'heure de début.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={() => setcheckDurationPopupOpen(false)} colorScheme="blue">
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
</AlertDialog>
<AlertDialog  isOpen={TotalIndividualStudyPopupOpen} leastDestructiveRef={cancelRef} onClose={() => setTotalIndividualStudyPopupOpen(false)}>
      <AlertDialogOverlay>
        <AlertDialogContent bg="white" borderRadius="lg" shadow="md">
          <AlertDialogHeader fontSize="lg" fontWeight="bold" display="flex" justifyContent="space-between">
            <div>Indivual Course Alert</div>
            <Icon viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-5.707l-7-7a1 1 0 00-1.414 1.414L6.3 12 5 13.707a1 1 0 001.414 1.414L10 14.142l3.707-3.707a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </Icon>
          </AlertDialogHeader>
          <AlertDialogBody fontSize="md">
          cette utilisateur est deja affecte à une seance individuel dans cette semaine.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={() => setTotalIndividualStudyPopupOpen(false)} colorScheme="blue">
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
</AlertDialog>
<AlertDialog  isOpen={TotalStudyHoursPopupOpen} leastDestructiveRef={cancelRef} onClose={() => setTotalStudyHoursPopupOpen(false)}>
      <AlertDialogOverlay>
        <AlertDialogContent bg="white" borderRadius="lg" shadow="md">
          <AlertDialogHeader fontSize="lg" fontWeight="bold" display="flex" justifyContent="space-between">
            <div>Total study hours for solfege course Alert</div>
            <Icon viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-5.707l-7-7a1 1 0 00-1.414 1.414L6.3 12 5 13.707a1 1 0 001.414 1.414L10 14.142l3.707-3.707a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </Icon>
          </AlertDialogHeader>
          <AlertDialogBody fontSize="md">
          vous avez depasse le nombre d'heure pour cette semaine .
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={() => setTotalStudyHoursPopupOpen(false)} colorScheme="blue">
              Close
            </Button>
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
                                    } else if (cell.column.Header === "startTime") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    }
                                    else if (cell.column.Header === "endTime") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    }
                                    
                                    else if (cell.column.Header === "type") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    }
                                    else if (cell.column.Header === "Room ") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {row.original.RoomName}
                                            </Text>
                                        );
                                    }
                                    else if (cell.column.Header === "Teacher ") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {row.original.TeacherName}
                                            </Text>
                                        );
                                    }
                                    else if (cell.column.Header === "Student ") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {row.original.studentName}
                                            </Text>
                                        );
                                    }
                                    else if (cell.column.Header === "Classroom") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {row.original.courseName}
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
                                                    <ModalHeader>Edit Planning</ModalHeader>
                                                    <ModalCloseButton />
                                                    {editedRoom && ( // Vérifiez si editedRoom est disponible
                                                         
                                                        <ModalBody>
                                                            <FormControl>
                                                                <FormLabel>Type </FormLabel>
                                                                <Checkbox
                                                                    name="type"
                                                                    isChecked={editedRoom.type === 'solfège'}
                                                                    onChange={(e) => seteditedRoom({ ...editedRoom, type: e.target.checked ? 'solfège' : 'instrument' })}
                                                                    value="solfège"
                                                                >
                                                                    Solfège
                                                                </Checkbox>
                                                                <Checkbox
                                                                    name="type"
                                                                    isChecked={editedRoom.type === 'instrument'}
                                                                    onChange={(e) => seteditedRoom({ ...editedRoom, type: e.target.checked ? 'instrument' : 'solfège' })}
                                                                    value="instrument"
                                                                >
                                                                    Instrument
                                                                </Checkbox>
                                                            </FormControl>
                                                            <FormControl>
                                                            
                
                                                                <FormLabel>Date</FormLabel>
                                                                
                                                                <Input
                                                                   
                                                                    type="date"
                                                                    name="date"
                                                                    value={editedRoom?.date?.slice(0, 10)}
                                                                    onChange={(e) => seteditedRoom({ ...editedRoom, date: e.target.value })}
                                                                />
                                                                {/* {editErrors.date && <Text color="red">{editErrors.date}</Text>} */}
                                                            </FormControl>
                                                            <Grid templateColumns="1fr 1fr" gap={4}>
                                                                <FormControl>
                                                                    <FormLabel>StartTime</FormLabel>
                                                                    <Input
                                                                        type="time"
                                                                        name="startTime"
                                                                        value={editedRoom.startDate}
                                                                        onChange={(e) => seteditedRoom({ ...editedRoom, startDate: e.target.value })}
                                                                    />
                                                                   {/*  {editErrors.startTime && <Text color="red">{editErrors.startTime}</Text>} */}
                                                                </FormControl>
                                                                <FormControl>
                                                                    <FormLabel>EndTime</FormLabel>
                                                                    <Input
                                                                        type="time"
                                                                        name="endTime"
                                                                        value={editedRoom.endDate}
                                                                        onChange={(e) => seteditedRoom({ ...editedRoom, endDate: e.target.value })}
                                                                    />
                                                                    {/* {editErrors.endTime && <Text color="red">{editErrors.endTime}</Text>} */}
                                                                </FormControl>
                                                            </Grid>
                                                            <FormControl>
                                                                <FormLabel>Room Name</FormLabel>
                                                                <Select
                                                                    name="roomId"
                                                                    value={editedRoom.roomId}
                                                                    onChange={(e) => seteditedRoom({ ...editedRoom, roomId: e.target.value })}
                                                                >
                                                                    <option value="">Select Room</option>
                                                                    {roomOptions.map(room => (
                                                                        <option key={room.id} value={room._id}>{room.room_number}</option>
                                                                    ))}
                                                                </Select>
                                                                {/* {editErrors.roomId && <Text color="red">{editErrors.roomId}</Text>} */}
                                                            </FormControl>
                                                            <FormControl>
                                                                <FormLabel>Teacher Name</FormLabel>
                                                                <Select
                                                                    name="teacherId"
                                                                    value={editedRoom.teacherId}
                                                                    onChange={(e) => seteditedRoom({ ...editedRoom, teacherId: e.target.value })}
                                                                >
                                                                    <option value="">Select Teacher</option>
                                                                    {teacherOptions.map(teacher => (
                                                                        <option key={teacher.id} value={teacher._id}>{teacher.name}</option>
                                                                    ))}
                                                                </Select>
                                                                {/* {editErrors.teacherId && <Text color="red">{editErrors.teacherId}</Text>} */}
                                                            </FormControl>
                                                            {editedRoom.type === 'instrument' ? (
                                                                    <FormControl>
                                                                        <FormLabel>Student Name</FormLabel>
                                                                        <Select
                                                                            name="studentIds"
                                                                            value={editedRoom.studentIds}
                                                                            onChange={(e) => seteditedRoom({ ...editedRoom, studentIds: e.target.value })}
                                                                        >
                                                                            <option value="">Select Student</option>
                                                                            {studentOptions.map(student => (
                                                                                <option key={student.id} value={student._id}>{student.name}</option>
                                                                            ))}
                                                                        </Select>
                                                                       {/*  {editErrors.studentIds && <Text color="red">{editErrors.studentIds}</Text>} */}
                                                                    </FormControl>
                                                                ) : (
                                                                    <FormControl>
                                                                        <FormLabel>Classroom</FormLabel>
                                                                        <Select
                                                                            name="classroomId"
                                                                            value={editedRoom.classroomId}
                                                                            onChange={(e) => seteditedRoom({ ...editedRoom, classroomId: e.target.value })}
                                                                        >
                                                                            <option value="">Select Classroom</option>
                                                                            {classroomoptions.map(classroom => (
                                                                                <option key={classroom.id} value={classroom._id}>{classroom.name}</option>
                                                                            ))}
                                                                        </Select>
                                                                        {/* {editErrors.classroomId && <Text color="red">{editErrors.classroomId}</Text>} */}
                                                                    </FormControl>
                                                                )}
                                                           
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
                                                                Delete Planning
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
                                                 <Modal isOpen={isModalViewOpen} onClose={closeModalViewA}>
                                                    <ModalOverlay />
                                                    <ModalContent maxW={'800px'}>
                                                        <ModalHeader>Planning Information</ModalHeader>
                                                        <ModalCloseButton />
                                                        <ModalBody>
                                                            {profInfo && (
                                                                
                                                                <>
                                                                
                                                                    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
                                                                        
                                                                          {profInfo.type === 'instrument' && (
                                                                              <Text
                                                                              color={textColorPrimary}
                                                                              fontWeight='bold'
                                                                              fontSize='2xl'
                                                                              mt='10px'
                                                                              mb='4px'>
                                                                               Student Name : {profInfo.studentName} 
                                                                          </Text>
                                                                        )}
                                                                         {profInfo.type === 'solfège' && (
                                                                              <Text
                                                                              color={textColorPrimary}
                                                                              fontWeight='bold'
                                                                              fontSize='2xl'
                                                                              mt='10px'
                                                                              mb='4px'>
                                                                             Classroom  : {profInfo.courseName} 
                                                                          </Text>
                                                                        )}
                                                                        <SimpleGrid columns='2' gap='20px'>
                                                                            
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Date'
                                                                                value={profInfo.date}
                                                                            />
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Type'
                                                                                value={profInfo.type}
                                                                            />
                                                                           
                                                                            
                                                                        </SimpleGrid>
                                                                        <SimpleGrid columns='2' gap='20px'>
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='StartTime'
                                                                                value={profInfo.startDate}
                                                                            />
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='EndTime'
                                                                                value={profInfo.endDate}
                                                                            />
                                                                           
                                                                            
                                                                        </SimpleGrid>
                                                                        <SimpleGrid columns='2' gap='20px'>
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Room Name'
                                                                                value={profInfo.RoomName}
                                                                            />
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Teacher Name'
                                                                                value={profInfo.TeacherName}
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
