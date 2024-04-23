import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { ViewIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Grid, Input, FormControl, FormLabel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, SimpleGrid } from "@chakra-ui/react";
import api from "services/api";
import { AddIcon } from '@chakra-ui/icons'
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
    useColorModeValue,Select
} from "@chakra-ui/react";
import {
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
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
    MenuItem,
    MenuList,
    useDisclosure,
} from "@chakra-ui/react";
import {
    MdOutlineMoreHoriz,
    MdOutlinePerson,
    MdOutlineCardTravel,
    MdOutlineLightbulb,
    MdOutlineSettings,
} from "react-icons/md";
// Custom components
import Card from "components/card/Card";
//import Menu from "components/menu/MainMenu";
import Information from "views/admin/profile/components/Information";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
export default function ColumnsTable(props) {
    const { columnsData, tabledata, handledelete, canceldelete, cancelref, confirmDelete, isDeleteDialogOpen,
        isModalOpenC, openModalC, closeModalC, closeEditModalC, isEditModalOpenC, setIsEditModalOpenC, fetchData , classroomoptions} = props;
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    ////////////////////////
    ////////////////////////
    ////////////////////////
    const [editedUser, setEditedUser] = useState({});
    const [originalParentPhoneNumber, setOriginalParentPhoneNumber] = useState("");
    const [originalParentCIN, setOriginalParentCIN] = useState("");
    const [originalUsername, setOriginalUsername] = useState("");
    const [originalEmail, setOriginalEmail] = useState("");
    const [profilePictureFile, setProfilePictureFile] = useState("");
    const [errorsEdit, setErrorsEdit] = useState({
        name: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        parentCinNumber: "",
        parentPhoneNumber: "",
        profilePicture: "",
    });
    const handleProfilePictureChange = (e) => {
        setProfilePictureFile(e.target.files[0]);
    };
    const validateName = (name) => {
        if (!name.trim()) {
            setErrorsEdit({ ...errorsEdit, name: "Name is required" });
            return false;
        } else {
            setErrorsEdit({ ...errorsEdit, name: "" });
            return true;
        }
    };
    const validateLastname = (lastname) => {
        if (!lastname.trim()) {
            setErrorsEdit({ ...errorsEdit, lastname: "Lastname is required" });
            return false;
        } else {
            setErrorsEdit({ ...errorsEdit, lastname: "" });
            return true;
        }
    };
    const validateEmail = async (email) => {
        const emailString = String(email).trim();
        if (!emailString) {
            setErrorsEdit({ ...errorsEdit, email: "Email is required" });
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorsEdit({ ...errorsEdit, email: "Email is invalid" });
            return false;
        } else {
            try {
                if (email !== originalEmail) {
                    const emailResponse = await api.get(`http://localhost:9090/api/auth/check/email/${email}`);
                    if (emailResponse.data.exists) {
                        setErrorsEdit({ ...errorsEdit, email: "Email is not valid" });
                        return false;
                    }
                }
                setErrorsEdit({ ...errorsEdit, email: "" });
                return true;
            } catch (error) {
                console.error("Error validating phone number:", error);
                return false;
            }
        }
    };
    const validateUsername = async (username) => {
        const usernameString = String(username).trim();
        if (!usernameString) {
            setErrorsEdit({ ...errorsEdit, username: "Username is required" });
            return false;
        } else if (usernameString.length < 3) {
            setErrorsEdit({ ...errorsEdit, username: "Username must be at least 3 characters long" });
            return false;
        } else {
            try {
                if (username !== originalUsername) {
                    const usernameResponse = await api.get(`http://localhost:9090/api/auth/check/username/${username}`);
                    if (usernameResponse.data.exists) {
                        setErrorsEdit({ ...errorsEdit, username: "Username is not valid" });
                        return false;
                    }
                }
                setErrorsEdit({ ...errorsEdit, username: "" });
                return true;
            } catch (error) {
                console.error("Error validating username:", error);
                return false;
            }
        }
    };
    const validatePassword = (password) => {
        const passwordString = String(password).trim();
        if (!passwordString) {
            setErrorsEdit({ ...errorsEdit, password: "Password is required" });
            return false;
        } else if (passwordString.length < 8) {
            setErrorsEdit({ ...errorsEdit, password: "Password must be at least 8 characters" });
            return false;
        } else {
            setErrorsEdit({ ...errorsEdit, password: "" });
            return true;
        }
    };
    const validateConfirmPassword = (confirmPassword) => {
        const confirmPasswordString = String(confirmPassword).trim();
        if (!confirmPasswordString) {
            setErrorsEdit({ ...errorsEdit, confirmPassword: "Password confirmation is required" });
            return false;
        } else if (confirmPasswordString !== editedUser.password) {
            setErrorsEdit({ ...errorsEdit, confirmPassword: "Passwords do not match" });
            return false;
        } else {
            setErrorsEdit({ ...errorsEdit, confirmPassword: "" });
            return true;
        }
    }
    const validateCIN = async (parentCinNumber) => {
        const cinString = String(parentCinNumber).trim();
        if (!parentCinNumber) {
            setErrorsEdit({ ...errorsEdit, parentCinNumber: "Parent CIN is required" });
            return false;
        }
        if (!cinString) {
            setErrorsEdit({ ...errorsEdit, parentCinNumber: "Parent CIN is required" });
            return false;
        } else if (cinString.length !== 8 || isNaN(parseInt(cinString))) {
            setErrorsEdit({ ...errorsEdit, parentCinNumber: "Parent CIN must be an 8-digit number" });
            return false;
        } else {
            try {
                if (parentCinNumber !== originalParentCIN) {
                    const cinResponse = await api.get(`http://localhost:9090/api/auth/check/cin/${parentCinNumber}`);
                    if (cinResponse.data.exists) {
                        setErrorsEdit({ ...errorsEdit, parentCinNumber: "Parent CIN number is not valid" });
                        return false;
                    }
                }
                setErrorsEdit({ ...errorsEdit, parentCinNumber: "" });
                return true;
            } catch (error) {
                console.error("Error validating phone number:", error);
                return false;
            }
        }
    };
    const validatePhoneNumber = async (parentPhoneNumber) => {
        const phoneString = String(parentPhoneNumber).trim();
        if (!parentPhoneNumber) {
            setErrorsEdit({ ...errorsEdit, parentPhoneNumber: "Phone number is required" });
            return false;
        }
        if (!phoneString) {
            setErrorsEdit({ ...errorsEdit, parentPhoneNumber: "Phone number is required" });
            return false;
        } else if (phoneString.length !== 8 || isNaN(parseInt(phoneString))) {
            setErrorsEdit({ ...errorsEdit, parentPhoneNumber: "Phone number must be an 8-digit number" });
            return false;
        } else {
            try {
                if (parentPhoneNumber !== originalParentPhoneNumber) {
                    const phoneResponse = await api.get(`http://localhost:9090/api/auth/check/phone/${parentPhoneNumber}`);
                    if (phoneResponse.data.exists) {
                        setErrorsEdit({ ...errorsEdit, parentPhoneNumber: "Phone number is not valid" });
                        return false;
                    }
                }
                setErrorsEdit({ ...errorsEdit, phoneNumber: "" });
                return true;
            } catch (error) {
                console.error("Error validating phone number:", error);
                return false;
            }
        }
    };

    const handleSaveEdit = async () => {
        const isNameValid = validateName(editedUser.name);
        const isLastnameValid = validateLastname(editedUser.lastname);
        const isEmailValid = validateEmail(editedUser.email);
        const isUsernameValid = validateUsername(editedUser.username);
        const isCINValid = validateCIN(editedUser.parentCinNumber);
        const isPhoneNumberValid = validatePhoneNumber(editedUser.parentPhoneNumber);

        if (editedUser.newPassword || editedUser.confirmPassword) {
            const isNewPasswordValid = validatePassword(editedUser.newPassword);
            const isConfirmPasswordValid = validateConfirmPassword(editedUser.confirmPassword);
            if (!isNewPasswordValid || !isConfirmPasswordValid) {
                console.log("Password validation errors detected");
                return;
            }
            editedUser.password = editedUser.newPassword;
        }

        if (
            !isNameValid ||
            !isLastnameValid ||
            !isEmailValid ||
            !isUsernameValid ||
            !isCINValid ||
            !isPhoneNumberValid
        ) {
            console.log("Validation errors detected");
            return;
        }

        try {
            if (profilePictureFile) {
                const formDataToSend = new FormData();
                formDataToSend.append("image", profilePictureFile);

                const uploadResponse = await api.post(
                    "http://localhost:9090/api/image/uploadimage",
                    formDataToSend,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                editedUser.profilePicture = uploadResponse.data.downloadURL[0];
            }

            await api.patch(`http://localhost:9090/api/auth/editClient/${editedUser._id}`, editedUser);

            setIsEditModalOpenC(false);
            fetchData();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };
    const handleEdit = (user) => {
        setEditedUser(user);
        setOriginalParentPhoneNumber(user.parentPhoneNumber); // Store original phone number
        setOriginalParentCIN(user.parentCinNumber); // Store original CIN number
        setOriginalUsername(user.username); // Store original username
        setOriginalEmail(user.email); // Store original email
        setErrorsEdit({
            name: "",
            lastname: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            parentCinNumber: "",
            parentPhoneNumber: "",
            profilePicture: "",
        });
        openEditModal();
    };
    const openEditModal = () => {
        setIsEditModalOpenC(true);
    };
    ////////////////////////
    ////////////////////////
    ////////////////////////
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tabledata, [tabledata]);
    const cardShadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "unset"
    );
    const { ...rest } = props;
    const iconColor = useColorModeValue("brand.500", "white");
    ////////////////////////////////////////////////////////
    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        initialState,
    } = tableInstance;
    initialState.pageSize = 99999999999999999;
/////////////////////////////////////////////////////////////////////
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

    const textColorSecondary = "gray.400";
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [clientInfo, setClientInfo] = useState(null);
    const handleView = (e, userData) => {
        e.preventDefault();
        setClientInfo(userData);
        setIsModalViewOpen(true);
    };
    const closeModalViewA = () => {
        setIsModalViewOpen(false);
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
                    Clients Table
                </Text>
            </Flex>



            <AlertDialog
                isOpen={isDeleteDialogOpen}
                leastDestructiveRef={cancelref}
                onClose={canceldelete}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete User
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete this user?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelref} onClick={canceldelete}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={handledelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>



            <Modal isOpen={isModalViewOpen} onClose={() => closeModalViewA()}>
                <ModalOverlay />
                <ModalContent maxW={'800px'}>
                    <ModalHeader>Client Information</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {clientInfo && (
                            <>
                                <img src={clientInfo.profilePicture} alt="Profile Picture" style={{ maxWidth: "250px", maxHeight: "250px", borderRadius: "50%", margin: "auto" }} />
                                <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
                                    <Text
                                        color={textColorPrimary}
                                        fontWeight='bold'
                                        fontSize='2xl'
                                        mt='10px'
                                        mb='4px' style={{ margin: "auto" }}>
                                        {clientInfo.name} {clientInfo.lastname}
                                    </Text>
                                    <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'
                                        style={{ margin: "auto" }}>
                                        @{clientInfo.username}
                                    </Text>
                                    <br />
                                    <SimpleGrid columns='2' gap='20px'>
                                        <Information
                                            boxShadow={cardShadow}
                                            title='Email'
                                            value={clientInfo.email}
                                        />
                                        <Information
                                            boxShadow={cardShadow}
                                            title='Role'
                                            value={clientInfo.role}
                                        />
                                        <Information
                                            boxShadow={cardShadow}
                                            title='Parent Phone number'
                                            value={clientInfo.parentPhoneNumber ? clientInfo.parentPhoneNumber : "_"}
                                        />
                                        <Information
                                            boxShadow={cardShadow}
                                            title='Parent CIN'
                                            value={clientInfo.parentCinNumber ? clientInfo.parentCinNumber : "_"}
                                        />
                                        <Information
                                            boxShadow={cardShadow}
                                            title='Father occupation'
                                            value={clientInfo.fatherOccupation ? clientInfo.fatherOccupation : "_"}
                                        />
                                        <Information
                                            boxShadow={cardShadow}
                                            title='Mother occupation'
                                            value={clientInfo.motherOccupation ? clientInfo.motherOccupation : "_"}
                                        />
                                        <Information
                                            boxShadow={cardShadow}
                                            title='Instrument'
                                            value={clientInfo.instrument ? clientInfo.instrument : "_"}
                                        />
                                        <Information
                                            boxShadow={cardShadow}
                                            title='Other instruments'
                                            value={clientInfo.otherInstruments ? clientInfo.otherInstruments : "_"}
                                        />
                                        <Information
                                            boxShadow={cardShadow}
                                            title='Status'
                                            value={clientInfo.isEmailVerified ? 'Verified' : 'Not Verified'}
                                        />
                                        <Information
                                            boxShadow={cardShadow}
                                            title='Status'
                                            value={clientInfo.isSubscribed ? 'Subscribed' : 'Not subscribed'}
                                        />
                                        <Information
                                            boxShadow={cardShadow}
                                            title='Birthday'
                                            value={clientInfo.dateOfBirth ? clientInfo.dateOfBirth.substring(0, 10) : "N/A"}
                                        />
                                        <Information
                                            boxShadow={cardShadow}
                                            title='School grade'
                                            value={clientInfo.level ? clientInfo.level : "_"}
                                        />
                                        <Information
                                            boxShadow={cardShadow}
                                            title='Password'
                                            value='**************'
                                        />
                                    </SimpleGrid>
                                </Card>
                            </>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>


            <Modal isOpen={isEditModalOpenC} onClose={closeEditModalC}>
                <ModalOverlay />
                <ModalContent maxW={'800px'}>
                    <ModalHeader>Edit User</ModalHeader>
                    <ModalCloseButton />
                    {editedUser && (
                        <ModalBody>
                            <FormControl id="profilePicture" mt={4}>
                                <img src={editedUser.profilePicture} alt="Profile Picture" style={{ maxWidth: "250px", maxHeight: "250px", borderRadius: "50%", margin: "auto" }} />
                                <input type="file" name="profilePicture" onChange={handleProfilePictureChange} />
                            </FormControl>
                            <Grid templateColumns="1fr 1fr" gap={4}>
                                <FormControl id="name" mt={4}>
                                    <FormLabel>Name</FormLabel>
                                    <Input type="text" value={editedUser.name} onChange={(e) => { setEditedUser({ ...editedUser, name: e.target.value }); validateName(e.target.value); }} />
                                </FormControl>
                                <FormControl id="lastname" mt={4}>
                                    <FormLabel>Lastname</FormLabel>
                                    <Input type="text" value={editedUser.lastname} onChange={(e) => { setEditedUser({ ...editedUser, lastname: e.target.value }); validateLastname(e.target.value); }} />
                                </FormControl>
                            </Grid>
                            <Grid templateColumns="1fr 1fr" gap={4}>
                                <FormControl id="email" mt={4}>
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email" value={editedUser.email} onChange={(e) => { setEditedUser({ ...editedUser, email: e.target.value }); validateEmail(e.target.value); }} />
                                </FormControl>
                                <FormControl id="username" mt={4}>
                                    <FormLabel>Username</FormLabel>
                                    <Input type="text" value={editedUser.username} onChange={(e) => { setEditedUser({ ...editedUser, username: e.target.value }); validateUsername(e.target.value); }} />
                                </FormControl>
                            </Grid>
                            <Grid templateColumns="1fr 1fr" gap={4}>
                                <FormControl id="password" mt={4}>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup size='md'>
                                        <Input type={show ? "text" : "password"} onChange={(e) => { setEditedUser({ ...editedUser, password: e.target.value }); validatePassword(e.target.value); }} />
                                        <InputRightElement display='flex' alignItems='center' mt='1px'>
                                            <Icon
                                                color={textColorSecondary}
                                                _hover={{ cursor: "pointer" }}
                                                as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                                onClick={handleClick}
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Password Confirmation</FormLabel>
                                    <InputGroup size='md'>
                                        <Input
                                            type={show ? "text" : "password"}
                                            onChange={(e) => { setEditedUser({ ...editedUser, confirmPassword: e.target.value }); validateConfirmPassword(e.target.value); }}
                                        />
                                        <InputRightElement display='flex' alignItems='center' mt='1px'>
                                            <Icon
                                                color={textColorSecondary}
                                                _hover={{ cursor: "pointer" }}
                                                as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                                onClick={handleClick}
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                            </Grid>
                            <Grid templateColumns="1fr 1fr" gap={4}>
                                <FormControl id="parentPhoneNumber" mt={4}>
                                    <FormLabel>Parent Phone Number</FormLabel>
                                    <Input type="number" value={editedUser.parentPhoneNumber} onChange={(e) => { setEditedUser({ ...editedUser, parentPhoneNumber: parseInt(e.target.value) }); validatePhoneNumber(e.target.value) }} />
                                </FormControl>
                                <FormControl id="parentCinNumber" mt={4}>
                                    <FormLabel>Parent CIN Number</FormLabel>
                                    <Input type="number" value={editedUser.parentCinNumber} onChange={(e) => { setEditedUser({ ...editedUser, parentCinNumber: parseInt(e.target.value) }); validateCIN(e.target.value) }} />
                                </FormControl>
                            </Grid>

                            <FormControl id="level" mt={4}>
                                <FormLabel>School Grade</FormLabel>
                                <Input type="text" value={editedUser.level} onChange={(e) => setEditedUser({ ...editedUser, level: e.target.value })} />
                            </FormControl>
                            <FormControl>
                            <FormLabel>Classroom</FormLabel>
                            <Select
                             name="classroom"
                            value={editedUser.classroom}
                            onChange={(e) => setEditedUser({ ...editedUser, classroom: e.target.value })}  >                                             
                             <option value="">Select Classroom</option>
                            {classroomoptions.map(classroom => (
                            <option key={classroom.id} value={classroom._id}>{classroom.name}</option>
                            ))}
                            </Select>                                            
                            </FormControl>                                                                     
                            
                        </ModalBody>
                    )}
                    {errorsEdit.name && <Text color="red">{errorsEdit.name}</Text>}
                    {errorsEdit.lastname && <Text color="red">{errorsEdit.lastname}</Text>}
                    {errorsEdit.email && <Text color="red">{errorsEdit.email}</Text>}
                    {errorsEdit.username && <Text color="red">{errorsEdit.username}</Text>}
                    {errorsEdit.password && <Text color="red">{errorsEdit.password}</Text>}
                    {errorsEdit.confirmPassword && <Text color="red">{errorsEdit.confirmPassword}</Text>}
                    {errorsEdit.parentCinNumber && <Text color="red">{errorsEdit.parentCinNumber}</Text>}
                    {errorsEdit.parentPhoneNumber && <Text color="red">{errorsEdit.parentPhoneNumber}</Text>}
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSaveEdit}>Save</Button>
                        <Button onClick={closeEditModalC}>Cancel</Button>
                    </ModalFooter>
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
                                    if (cell.column.Header === "NAME") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "Lastname") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "Username") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "Email") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "Profile picture") {
                                        data = (
                                            <img src={cell.value} alt="Profile Picture" style={{ maxWidth: "50px", maxHeight: "50px", borderRadius: "50%" }} />
                                        );
                                    } else if (cell.column.Header === "Password") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                *************
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "Verified") {
                                        data = (
                                            <Flex align='center'>
                                                <Icon
                                                    w='24px'
                                                    h='24px'
                                                    me='5px'
                                                    color={
                                                        cell.value === true
                                                            ? "green.500"
                                                            : cell.value === false
                                                                ? "red.500"
                                                                : cell.value === "Error"
                                                                    ? "orange.500"
                                                                    : null
                                                    }
                                                    as={
                                                        cell.value === true
                                                            ? MdCheckCircle
                                                            : cell.value === false
                                                                ? MdCancel
                                                                : cell.value === "Error"
                                                                    ? MdOutlineError
                                                                    : null
                                                    }
                                                />
                                                <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                    {cell.value ? "True" : "False"}
                                                </Text>
                                            </Flex>
                                        );
                                    } else if (cell.column.Header === "Subscribed") {
                                        data = (
                                            <Flex align='center'>
                                                <Icon
                                                    w='24px'
                                                    h='24px'
                                                    me='5px'
                                                    color={
                                                        cell.value === true
                                                            ? "green.500"
                                                            : cell.value === false
                                                                ? "red.500"
                                                                : cell.value === "Error"
                                                                    ? "orange.500"
                                                                    : null
                                                    }
                                                    as={
                                                        cell.value === true
                                                            ? MdCheckCircle
                                                            : cell.value === false
                                                                ? MdCancel
                                                                : cell.value === "Error"
                                                                    ? MdOutlineError
                                                                    : null
                                                    }
                                                />
                                                <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                    {cell.value ? "True" : "False"}
                                                </Text>
                                            </Flex>
                                        );
                                    } else if (cell.column.Header === "Parent phone Number") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "Parent cin") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "level") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    }
                                    else if (cell.column.Header === "classroom") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                 {row.original.courseName}
                                            </Text>
                                        );
                                    }
                                     else if (cell.column.Header === "Birth date") {
                                        const date = new Date(cell.value);
                                        const formattedDate = date.toISOString().split('T')[0];
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {formattedDate}
                                            </Text>
                                        );

                                        /*} else if (cell.column.Header === "PROGRESS") {
                                            data = (
                                                <Flex align='center'>
                                                    <Progress
                                                        variant='table'
                                                        colorScheme='brandScheme'
                                                        h='8px'
                                                        w='108px'
                                                        value={cell.value}
                                                    />
                                                </Flex>
                                            );*/
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
                                                {/* Delete icon */}

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
                                                    onClick={(e) => handleView(e, row.original)}
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
