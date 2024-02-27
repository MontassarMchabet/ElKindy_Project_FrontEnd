import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { ViewIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, SimpleGrid } from "@chakra-ui/react";
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
    const { columnsData, tableData, handleDelete, cancelDelete, cancelRef, confirmDelete, isDeleteDialogOpen,
        isModalOpenC, openModalC, closeModalC } = props;

    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
    const cardShadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "unset"
    );
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
                                    } else if (cell.column.Header === "Birth date") {
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
                                                    onClick={(e) => handleView(e, row.original)}
                                                />
                                                <Modal isOpen={isModalViewOpen} onClose={() => closeModalViewA()}>
                                                    <ModalOverlay />
                                                    <ModalContent maxW={'800px'}>
                                                        <ModalHeader>Admin Information</ModalHeader>
                                                        <ModalCloseButton />
                                                        <ModalBody>
                                                            {clientInfo && (
                                                                <>
                                                                    {clientInfo.profilePicture}
                                                                    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
                                                                        <Text
                                                                            color={textColorPrimary}
                                                                            fontWeight='bold'
                                                                            fontSize='2xl'
                                                                            mt='10px'
                                                                            mb='4px'>
                                                                            {clientInfo.name} {clientInfo.lastname}
                                                                        </Text>
                                                                        <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
                                                                            @{clientInfo.username}
                                                                        </Text>
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
                                                                                value={clientInfo.schoolGrade ? clientInfo.schoolGrade : "_"}
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
