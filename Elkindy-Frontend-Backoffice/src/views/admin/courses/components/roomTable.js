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
        isModalOpenR, openModalR, closeModalR, fetchData, isEditModalOpen, closeEditModal,setIsEditModalOpen} = props;
    const textColorPrimary            = useColorModeValue("secondaryGray.900", "white");
    const [editedRoom, seteditedRoom] = useState({});
      ////////////////////////
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
    const handleEdit = (course) => {
       seteditedRoom(course); 
       openEditModal(); 
    };

  // La fonction pour ouvrir le formulaire d'édition
    const openEditModal = () => {
    setIsEditModalOpen(true);
};
  ///////////////////////

    const columns       = useMemo(() => columnsData, [columnsData]);
    const data          = useMemo(() => tableData, [tableData]);
    const { ...rest }   = props;
    const iconColor     = useColorModeValue("brand.500", "white");
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

    const textColor   = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    const {
        isOpen : isOpen1,
        onOpen : onOpen1,
        onClose: onClose1,
    } = useDisclosure();
    const bgList   = useColorModeValue("white", "whiteAlpha.100");
    const bgShadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
        "unset"
    );
    const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const bgHover  = useColorModeValue(
        { bg: "secondaryGray.400" },
        { bg: "whiteAlpha.50" }
    );
    const bgFocus = useColorModeValue(
        { bg: "secondaryGray.300" },
        { bg: "whiteAlpha.100" }
    );
    const [show, setShow] = React.useState(false);
    const handleClick     = () => setShow(!show);




    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [profInfo, setProfInfo]               = useState(null);
    const handleView                            = (userData) => {
        setProfInfo(userData);
        setIsModalViewOpen(true);
    };
    const closeModalViewA = () => {
        setIsModalViewOpen(false);
    };
    
    const [formData, setFormData] = useState({
        room_number: "",
        capacity   : "",
        location   : ""
       
    });
    const [errors, setErrors] = useState({});
    const handleChange        = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const validateForm = async () => {
        let errors = {};

        if (!formData.room_number.trim()) {
            errors.room_number = 'All fields are required'
        } else if (!formData.capacity.trim()) {
            errors.capacity = 'All fields are required'
        } else if (!formData.location.trim()) {
            errors.location = 'All fields are required'
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
                    "http://localhost:9090/api/Room/add",
                    formData
                );
                fetchData()
                closeModalR()
                console.log(response.data);
            } catch (error) {
                console.error("Error registering prof:", error);
            }
        }
    };
    return (
        <Card
                  direction = 'column'
                  w         = '70%'
                  px        = '0px'
                  overflowX = {{ sm: "scroll", lg: "hidden" }}>
            <Flex px        = '25px' justify = 'space-between' mb = '20px' align = 'center'>
                <Text
                    color      = {textColor}
                    fontSize   = '22px'
                    fontWeight = '700'
                    lineHeight = '100%'>
                    Room Table
                </Text>
                <Menu isOpen = {isOpen1} onClose = {onClose1}>
                    <MenuButton
                        align          = 'center'
                        justifyContent = 'center'
                        bg             = {bgButton}
                        _hover         = {bgHover}
                        _focus         = {bgFocus}
                        _active        = {bgFocus}
                        w              = '37px'
                        h              = '37px'
                        lineHeight     = '100%'
                        onClick        = {openModalR}  // Open the modal when the add icon is clicked
                        borderRadius   = '10px'
                        {...rest}>
                        <AddIcon color = {iconColor} w = '20px' h = '20px' />
                    </MenuButton>
                </Menu>

                {/* Modal for adding user */}
                <Modal isOpen = {isModalOpenR} onClose = {closeModalR}>
                    <ModalOverlay />
                    <ModalContent>
                        <form onSubmit = {handleSubmit} noValidate>
                            <ModalHeader>Add Room</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Grid templateColumns = "1fr 1fr" gap = {4}>
                                    <FormControl>
                                        <FormLabel>RoomNumber</FormLabel>
                                        <Input type     = "text"
                                               name     = "room_number"
                                               value    = {formData.room_number}
                                               onChange = {handleChange}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Capacity</FormLabel>
                                        <Input type     = "number"
                                               name     = "capacity"
                                               value    = {formData.capacity}
                                               onChange = {handleChange}
                                               min      = {0}
                                               max      = {30}
                                        />
                                    </FormControl>
                                </Grid>
                                <FormControl mt = {4}>
                                    <FormLabel>Location</FormLabel>
                                    <Input type     = "text"
                                           name     = "location"
                                           value    = {formData.location}
                                           onChange = {handleChange}
                                    />
                                </FormControl>               
                               
                                
                            </ModalBody>
                            {errors.room_number && <Text color="red">{errors.room_number}</Text>}
                            {errors.capacity && <Text color="red">{errors.capacity}</Text>}
                            {errors.location && <Text color="red">{errors.location}</Text>}
                            <ModalFooter>
                                <Button colorScheme = "blue" mr = {3} onClick = {closeModalR}>
                                    Close
                                </Button>
                                <Button type = "submit" colorScheme = "green">
                                    Save
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>
            </Flex>
            <Modal isOpen = {isEditModalOpen} onClose = {closeEditModal}>
                                                <ModalOverlay />
                                                    <ModalContent maxW = {'800px'}>
                                                        <ModalHeader>Edit Room</ModalHeader>
                                                        <ModalCloseButton />
                                                        {editedRoom && ( // Vérifiez si editedRoom est disponible
                                                            <ModalBody>
                                                                {/* Formulaire pour l'édition du cours */}
                                                                <FormControl id = "room_number">
                                                                    <FormLabel>Room Number</FormLabel>
                                                                    <Input type = "text" value = {editedRoom.room_number} onChange = {(e) => seteditedRoom({ ...editedRoom, room_number: e.target.value })} />
                                                                </FormControl>
                                                                <FormControl id = "capacity">
                                                                    <FormLabel>Capacity</FormLabel>
                                                                    <Input type = "number" value = {editedRoom.capacity} onChange = {(e) => seteditedRoom({ ...editedRoom, capacity: e.target.value })} />
                                                                </FormControl>
                                                                <FormControl id = "location">
                                                                    <FormLabel>Location</FormLabel>
                                                                    <Input type = "text" value = {editedRoom.location} onChange = {(e) => seteditedRoom({ ...editedRoom, location: parseInt(e.target.value) })} />
                                                                </FormControl>
                                                            
                                                            </ModalBody>
                                                        )}
                                                        <ModalFooter>
                                                            <Button colorScheme = "blue" mr = {3} onClick = {handleSaveEdit}>Save</Button>
                                                            <Button onClick     = {closeEditModal}>Cancel</Button>
                                                        </ModalFooter>
                                                    </ModalContent>
            </Modal>
                                           
            <Modal isOpen = {isModalViewOpen} onClose = {closeModalViewA}>
                                                    <ModalOverlay />
                                                    <ModalContent maxW = {'800px'}>
                                                        <ModalHeader>Room Information</ModalHeader>
                                                        <ModalCloseButton />
                                                        <ModalBody>
                                                            {profInfo && (
                                                                <>
                                                                    
                                                                    <Card mb = {{ base: "0px", "2xl": "20px" }} {...rest}>
                                                                        <Text
                                                                            color      = {textColorPrimary}
                                                                            fontWeight = 'bold'
                                                                            fontSize   = '2xl'
                                                                            mt         = '10px'
                                                                            mb         = '4px'>
                                                                            {profInfo.room_number} 
                                                                        </Text>
                                                                        
                                                                        <SimpleGrid columns = '2' gap = '20px'>
                                                                            <Information
                                                                                boxShadow = {cardShadow}
                                                                                title     = 'room_number'
                                                                                value     = {profInfo.room_number}
                                                                            />
                                                                            <Information
                                                                                boxShadow = {cardShadow}
                                                                                title     = 'capacity'
                                                                                value     = {profInfo.capacity}
                                                                            />
                                                                            <Information
                                                                                boxShadow = {cardShadow}
                                                                                title     = 'location'
                                                                                value     = {profInfo.location }
                                                                            />
                                                                            
                                                                        </SimpleGrid>
                                                                    </Card>
                                                                </>
                                                            )}
                                                        </ModalBody>
                                                    </ModalContent>
            </Modal>
               {/* Delete icon */}
               <AlertDialog
                                                    isOpen              = {isDeleteDialogOpen}
                                                    leastDestructiveRef = {cancelRef}
                                                    onClose             = {cancelDelete}
                                                >
                                                    <AlertDialogOverlay>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader fontSize = "lg" fontWeight = "bold">
                                                                Delete Room
                                                            </AlertDialogHeader>

                                                            <AlertDialogBody>
                                                                Are you sure you want to delete this room?
                                                            </AlertDialogBody>

                                                            <AlertDialogFooter>
                                                                <Button ref = {cancelRef} onClick = {cancelDelete}>
                                                                    Cancel
                                                                </Button>
                                                                <Button colorScheme = "red" onClick = {handleDelete} ml = {3}>
                                                                    Delete
                                                                </Button>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialogOverlay>
                </AlertDialog>

            <Table {...getTableProps()} variant = 'simple' color = 'gray.500' mb = '24px'>
                <Thead>
                    {headerGroups.map((headerGroup, index) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} key = {index}>
                            {headerGroup.headers.map((column, index) => (
                                <Th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    pe          = '10px'
                                    key         = {index}
                                    borderColor = {borderColor}>
                                    <Flex
                                        justify  = 'space-between'
                                        align    = 'center'
                                        fontSize = {{ sm: "10px", lg: "12px" }}
                                        color    = 'gray.400'>
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
                            <Tr {...row.getRowProps()} key = {index}>
                                {row.cells.map((cell, index) => {
                                    let data = "";
                                    if (cell.column.Header === "room_number") {
                                        data = (
                                            <Text color = {textColor} fontSize = 'sm' fontWeight = '700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "capacity") {
                                        data = (
                                            <Text color = {textColor} fontSize = 'sm' fontWeight = '700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "location") {
                                        data = (
                                            <Text color = {textColor} fontSize = 'sm' fontWeight = '700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    }
                                         
                                    else if (cell.column.Header === "ACTIONS") {
                                        data = (
                                            <Flex align = "center">
                                                {/* Edit icon */}
                                                <EditIcon
                                                   w       = '20px'
                                                   h       = '20px'
                                                   me      = '5px'
                                                   color   = {"green.500"}
                                                   cursor  = "pointer"
                                                   onClick = {() => handleEdit(row.original)}
                                                   />
                                        
                                                <DeleteIcon
                                                    w       = '20px'
                                                    h       = '20px'
                                                    me      = '5px'
                                                    color   = {"red.500"}
                                                    cursor  = "pointer"
                                                    onClick = {() => confirmDelete(row.original._id)}
                                                />
                                                {/* View icon */}
                                                <ViewIcon
                                                    w       = '20px'
                                                    h       = '20px'
                                                    me      = '5px'
                                                    color   = {"orange.500"}
                                                    cursor  = "pointer"
                                                    onClick = {() => handleView(row.original)}
                                                />
                                            
                                            </Flex>
                                        );
                                    }
                                    return (
                                        <Td
                                            {...cell.getCellProps()}
                                            key         = {index}
                                            fontSize    = {{ sm: "14px" }}
                                            minW        = {{ sm: "150px", md: "200px", lg: "auto" }}
                                            borderColor = 'transparent'>
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
