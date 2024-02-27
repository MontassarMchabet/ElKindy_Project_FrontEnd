import axios from "axios";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
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


export default function ColumnsTable(props) {
    const { columnsData, tableData, handleDelete, cancelDelete, cancelRef, confirmDelete, isDeleteDialogOpen,
        isModalOpenA, openModalA, closeModalA, fetchData, isEditModalOpen, closeEditModal,setIsEditModalOpen } = props;

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
    const [editedCourse, setEditedCourse] = useState({}); // Déclaration et initialisation
    ////////////////////////
        // Fonction pour sauvegarder les modifications du cours
        const handleSaveEdit = async () => {
            try {
                // Effectuer la requête API pour mettre à jour le cours avec les nouvelles données
                await axios.put(`http://localhost:8080/event/update/${editedCourse._id}`, editedCourse);
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
    const [eventInfo, setEventInfo] = useState(null);
    const handleView = (eventData) => {
        setEventInfo(eventData);
        setIsModalViewOpen(true);
    };
    const closeModalViewA = () => {
        setIsModalViewOpen(false);
    };


    // const [formData, setFormData] = useState({
    //     Name: "",
    //     Description: "",
    //     imageUrl: "",
    //     Date: "",
    //     Location: "",
    //     price: "",

    //     room: {
    //         name: "",
    //         shape: "",
    //         capacity: "",
    //         distributionSeats: []
    //     }
    // });
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        imageUrl: "",
        date: "",
        location: "",
        price: "",
      
        room: {
          name: "",
          shape: "",
          capacity: "",
          distributionSeats:""
        }
      });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // const validateForm = async () => {
    //     let errors = {};

    //     if (!formData.Name.trim()) {
    //         errors.Name = 'All fields are required'
    //     } else if (!formData.Description.trim()) {
    //         errors.Description = 'All fields are required'
    //     } else if (!formData.Location.trim()) {
    //         errors.Location = 'All fields are required'
    //     } else if (!formData.price.trim()) {
    //         errors.price = 'All fields are required'
    //     } else if (!formData.imageUrl.trim()) {
    //         errors.imageUrl = 'All fields are required'
    //     } else if (!formData.Date.trim()) {
    //         errors.Date = 'All fields are required'
    //     } else if (!formData.room.name.trim()) {
    //         errors.room.name = 'All fields are required'
    //     } else if (!formData.room.capacity.trim()) {
    //         errors.room.capacity = 'All fields are required'
    //     } else if (!formData.room.shape.trim()) {
    //         errors.room.shape = 'All fields are required'
    //     } else if (formData.Name.trim().length < 3) {
    //         errors.Name = 'Name of event must be at least 3 characters long';
    //     }

    // };
    const validateForm = async () => {
        let errors = {};
      
        if (!formData.name.trim()) {
          errors.name = 'All fields are required'
        } else if (!formData.description.trim()) {
          errors.description = 'All fields are required'
        } else if (!formData.location.trim()) {
          errors.location = 'All fields are required'
        } else if (!formData.price.trim()) {
          errors.price = 'All fields are required'
        } else if (!formData.imageUrl.trim()) {
          errors.imageUrl = 'All fields are required'
        } else if (!formData.date.trim()) {
          errors.date = 'All fields are required'
        } 
      
        setErrors(errors);
        return Object.keys(errors).length === 0;
      };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const isValid = await validateForm();
    //     console.log("Submitting form");
    //     if (isValid) {
    //         try {
    //             const response = await axios.post(
    //                 "http://localhost:8080/event/add",
    //                 formData
    //             );
    //             fetchData()
    //             closeModalA()
    //             console.log(response.data);
    //         } catch (error) {
    //             console.error("Error adding event:", error);
    //         }
    //     }
    // };


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
    // return (
    //     <Card
    //         direction='column'
    //         w='100%'
    //         px='0px'
    //         overflowX={{ sm: "scroll", lg: "hidden" }}>
    //         <Flex px='25px' justify='space-between' mb='20px' align='center'>
    //             <Text
    //                 color={textColor}
    //                 fontSize='22px'
    //                 fontWeight='700'
    //                 lineHeight='100%'>
    //                 Events Table
    //             </Text>

    //             <Menu isOpen={isOpen1} onClose={onClose1}>
    //                 <MenuButton
    //                     align='center'
    //                     justifyContent='center'
    //                     bg={bgButton}
    //                     _hover={bgHover}
    //                     _focus={bgFocus}
    //                     _active={bgFocus}
    //                     w='37px'
    //                     h='37px'
    //                     lineHeight='100%'
    //                     onClick={openModalA}
    //                     borderRadius='10px'
    //                     {...rest}>
    //                     <AddIcon color={iconColor} w='20px' h='20px' />
    //                 </MenuButton>
    //             </Menu>

    //             {/* Modal for adding event */}
    //             <Modal isOpen={isModalOpenA} onClose={closeModalA}>
    //                 <ModalOverlay />
    //                 <ModalContent>
    //                     <form onSubmit={handleSubmit} noValidate>
    //                         <ModalHeader>Add Event</ModalHeader>
    //                         <ModalCloseButton />
    //                         <ModalBody>
    //                             <Grid templateColumns="1fr 1fr" gap={4}>
    //                                 <FormControl>
    //                                     <FormLabel>Name</FormLabel>
    //                                     <Input type="text"
    //                                         name="name"
    //                                         value={formData.Name}
    //                                         onChange={handleChange}
    //                                     />
    //                                 </FormControl>
    //                                 <FormControl>
    //                                     <FormLabel>Description</FormLabel>
    //                                     <Input type="text"
    //                                         name="Description"
    //                                         value={formData.Description}
    //                                         onChange={handleChange}
    //                                     />
    //                                 </FormControl>
    //                             </Grid>
                                
    //                             <FormControl mt={4}>
    //                                 <FormLabel>Date</FormLabel>
    //                                 <Input type="date"
    //                                     name="dateOfBirth"
    //                                     value={formData.Date}
    //                                     onChange={handleChange}
    //                                 />
    //                             </FormControl>
    //                             <FormControl mt={4}>
    //                                 <FormLabel>Image</FormLabel>
    //                                 <Input type="file"
    //                                     name="profilePicture"
    //                                     value={formData.imageUrl}
    //                                     onChange={handleChange}
    //                                 />
    //                             </FormControl>
    //                         </ModalBody>
    //                         {errors.Name && <Text color="red">{errors.Name}</Text>}
    //                         {errors. Description && <Text color="red">{errors.Description}</Text>}
    //                         {errors.Location && <Text color="red">{errors.Location}</Text>}
    //                         {errors.price && <Text color="red">{errors.price}</Text>}
    //                         {errors.imageUrl && <Text color="red">{errors.imageUrl}</Text>}
    //                         {errors.Date && <Text color="red">{errors.Date}</Text>}
    //                         {errors.room.name && <Text color="red">{errors.room.name}</Text>}
    //                         {errors.room.capacity && <Text color="red">{errors.room.capacity}</Text>}
    //                         {errors.room.shape && <Text color="red">{errors.room.shape}</Text>}
    //                         <ModalFooter>
    //                             <Button colorScheme="blue" mr={3} onClick={closeModalA}>
    //                                 Close
    //                             </Button>
    //                             <Button type="submit" colorScheme="green">
    //                                 Save
    //                             </Button>
    //                         </ModalFooter>
    //                     </form>
    //                 </ModalContent>
    //             </Modal>
    //         </Flex>
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
                        <Input type="text" name="price" value={formData.price} onChange={handleChange} />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Room Name</FormLabel>
                        <Input type="text" name="room" value={formData.room.name} onChange={handleChange} />
                      </FormControl>
                      <FormControl>
                        <FormLabel>shape</FormLabel>
                        <Input type="text" name="shape" value={formData.room.shape} onChange={handleChange} />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Capacity</FormLabel>
                        <Input type="number" name="capacity" value={formData.room.capacity} onChange={handleChange} />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Price</FormLabel>
                        <Input type="text" name="distributionSeats" value={formData.room.distributionSeats} onChange={handleChange} />
                      </FormControl>
                    </Grid>
                    <FormControl mt={4}>
                        <FormLabel>Date</FormLabel>
                        <Input type="date" name="date" value={formData.date} onChange={handleChange} />
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
            {/* <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
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
                </Thead> */}
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
                                    if (cell.column.Header === "NAME") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "DESCRIPTION") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    // } else if (cell.column.Header === "DATE") {
                                    //     const date = new Date(cell.value);
                                    //     const formattedDate = date.toISOString().split('T')[0];
                                    //     data = (
                                    //         <Text color={textColor} fontSize='sm' fontWeight='700'>
                                    //             {formattedDate}
                                    //         </Text>
                                    //     );
                                    } else if (cell.column.Header === "DATE") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "IMAGE") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
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
                                    } else if (cell.column.Header === "SHAPE") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "CAPACITY") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "SEATS") {
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
                                                        <ModalHeader>Event Information</ModalHeader>
                                                        <ModalCloseButton />
                                                        <ModalBody>
                                                            {eventInfo && (
                                                                <>
                                                                    {eventInfo.imageUrl}
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
                                                                            @{eventInfo.Description}
                                                                        </Text>
                                                                        <SimpleGrid columns='2' gap='20px'>
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Date'
                                                                                value={eventInfo.date}
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
                                                                                title='Date'
                                                                                value={eventInfo.date}
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