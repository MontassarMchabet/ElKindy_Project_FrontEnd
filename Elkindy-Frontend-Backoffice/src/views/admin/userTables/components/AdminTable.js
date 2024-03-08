import axios from "axios";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { ViewIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { AddIcon } from '@chakra-ui/icons'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, FormControl, FormLabel, Input, Grid, SimpleGrid } from "@chakra-ui/react";
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
        isModalOpenA, openModalA, closeModalA, fetchData } = props;

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
    const [adminInfo, setAdminInfo] = useState(null);
    const handleView = (userData) => {
        setAdminInfo(userData);
        setIsModalViewOpen(true);
    };
    const closeModalViewA = () => {
        setIsModalViewOpen(false);
    };


    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        username: "",

        cinNumber: "",
        phoneNumber: "",
        dateOfBirth: "",
        profilePicture: "",
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const validateForm = async () => {
        let errors = {};

        if (!formData.name.trim()) {
            errors.name = 'All fields are required'
        } else if (!formData.lastname.trim()) {
            errors.lastname = 'All fields are required'
        } else if (!formData.email.trim()) {
            errors.email = 'All fields are required'
        } else if (!formData.password.trim()) {
            errors.password = 'All fields are required'
        } else if (!formData.confirmPassword.trim()) {
            errors.confirmPassword = 'All fields are required'
        } else if (!formData.username.trim()) {
            errors.confirmPassword = 'All fields are required'
        } else if (!formData.cinNumber.trim()) {
            errors.confirmPassword = 'All fields are required'
        } else if (!formData.phoneNumber.trim()) {
            errors.confirmPassword = 'All fields are required'
        } else if (!formData.dateOfBirth.trim()) {
            errors.confirmPassword = 'All fields are required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        } else if (formData.username.trim().length < 3) {
            errors.username = 'Username must be at least 3 characters long';
        } else if (formData.cinNumber.length !== 8 || isNaN(parseInt(formData.cinNumber))) {
            errors.cinNumber = 'CIN must be an 8-digit number';
        } else if (formData.phoneNumber.length !== 8 || isNaN(parseInt(formData.phoneNumber))) {
            errors.phoneNumber = 'Phone number must be an 8-digit number';
        } else if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        try {
            const emailResponse = await axios.get(`http://localhost:9090/api/auth/check/email/${formData.email}`);
            if (emailResponse.data.exists) {
                errors.email = 'Email already in use';
            }
        } catch (error) {
            console.error('Error checking email:', error);
        }

        try {
            const usernameResponse = await axios.get(`http://localhost:9090/api/auth/check/username/${formData.username}`);
            if (usernameResponse.data.exists) {
                errors.username = 'Username already taken';
            }
        } catch (error) {
            console.error('Error checking username:', error);
        }

        try {
            const cinResponse = await axios.get(`http://localhost:9090/api/auth/check/cin/${formData.cinNumber}`);
            if (cinResponse.data.exists) {
                errors.cinNumber = 'CIN is invalid';
            }
        } catch (error) {
            console.error('Error checking CIN:', error);
        }

        try {
            const phoneResponse = await axios.get(`http://localhost:9090/api/auth/check/phone/${formData.phoneNumber}`);
            if (phoneResponse.data.exists) {
                errors.phoneNumber = 'Phone number is invalid';
            }
        } catch (error) {
            console.error('Error checking Phone number:', error);
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
                    "http://localhost:9090/api/auth/registerAdmin",
                    formData
                );
                fetchData()
                closeModalA()
                console.log(response.data);
            } catch (error) {
                console.error("Error registering admin:", error);
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
                    Admins Table
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
                            <ModalHeader>Add Admin</ModalHeader>
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
                                        <FormLabel>Lastname</FormLabel>
                                        <Input type="text"
                                            name="lastname"
                                            value={formData.lastname}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </Grid>
                                <FormControl mt={4}>
                                    <FormLabel>Username</FormLabel>
                                    <Input type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup size='md'>
                                        <Input
                                            type={show ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
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
                                <FormControl mt={4}>
                                    <FormLabel>Password Confirmation</FormLabel>
                                    <InputGroup size='md'>
                                        <Input
                                            type={show ? "text" : "password"}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
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
                                <Grid templateColumns="1fr 1fr" gap={4}>
                                    <FormControl mt={4}>
                                        <FormLabel>CIN</FormLabel>
                                        <Input type="text"
                                            name="cinNumber"
                                            value={formData.cinNumber}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Phone number</FormLabel>
                                        <Input type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </Grid>
                                <FormControl mt={4}>
                                    <FormLabel>Birth date</FormLabel>
                                    <Input type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Profile picture</FormLabel>
                                    <Input type="file"
                                        name="profilePicture"
                                        value={formData.profilePicture}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </ModalBody>
                            {errors.name && <Text color="red">{errors.name}</Text>}
                            {errors.lastname && <Text color="red">{errors.lastname}</Text>}
                            {errors.email && <Text color="red">{errors.email}</Text>}
                            {errors.username && <Text color="red">{errors.username}</Text>}
                            {errors.password && <Text color="red">{errors.password}</Text>}
                            {errors.confirmPassword && <Text color="red">{errors.confirmPassword}</Text>}
                            {errors.cinNumber && <Text color="red">{errors.cinNumber}</Text>}
                            {errors.phoneNumber && <Text color="red">{errors.phoneNumber}</Text>}
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
                                    } else if (cell.column.Header === "CIN") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "Phone number") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "Profile picture") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
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
                                    } else if (cell.column.Header === "Birth date") {
                                        const date = new Date(cell.value);
                                        const formattedDate = date.toISOString().split('T')[0];
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {formattedDate}
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
                                                /*onClick={() => handleEdit(row.original)}*/
                                                />
                                                {/* Delete icon */}
                                                <AlertDialog
                                                    isOpen={isDeleteDialogOpen}
                                                    leastDestructiveRef={cancelRef}
                                                    onClose={cancelDelete}
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
                                                        <ModalHeader>Admin Information</ModalHeader>
                                                        <ModalCloseButton />
                                                        <ModalBody>
                                                            {adminInfo && (
                                                                <>
                                                                    {adminInfo.profilePicture}
                                                                    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
                                                                        <Text
                                                                            color={textColorPrimary}
                                                                            fontWeight='bold'
                                                                            fontSize='2xl'
                                                                            mt='10px'
                                                                            mb='4px'>
                                                                            {adminInfo.name} {adminInfo.lastname}
                                                                        </Text>
                                                                        <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
                                                                            @{adminInfo.username}
                                                                        </Text>
                                                                        <SimpleGrid columns='2' gap='20px'>
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Email'
                                                                                value={adminInfo.email}
                                                                            />
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Role'
                                                                                value={adminInfo.role}
                                                                            />
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Phone number'
                                                                                value={adminInfo.phoneNumber}
                                                                            />
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='CIN'
                                                                                value={adminInfo.cinNumber}
                                                                            />
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Status'
                                                                                value={adminInfo.isEmailVerified ? 'Verified' : 'Not Verified'}
                                                                            />
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Birthday'
                                                                                value={adminInfo.dateOfBirth ? adminInfo.dateOfBirth.substring(0, 10) : "N/A"}
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