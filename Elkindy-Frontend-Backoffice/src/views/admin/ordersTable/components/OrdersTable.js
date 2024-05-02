import axios from "axios";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, Select, Textarea } from "@chakra-ui/react";
import { ViewIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, FormControl, FormLabel, Input, Grid, SimpleGrid } from "@chakra-ui/react";
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
import {useDisclosure} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";
import Card from "components/card/Card";
import Information from "views/admin/profile/components/Information";
import { io } from "socket.io-client";


export default function ColumnsTable(props) {
    const { columnsData, tableData, handleDelete, cancelDelete, cancelRef, confirmDelete, isDeleteDialogOpen,
        fetchData } = props;

    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const cardShadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "unset"
    );
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);

    const { ...rest } = props;
    /////////////////////////////////////////////////



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
    initialState.pageSize = 99;
    ////////////////////////////////////////////////////////////////
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");




    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [productInfo, setProductInfo] = useState(null);


    const handleView = (productData) => {
        setProductInfo(productData);
        setIsModalViewOpen(true);
    };


    const closeModalViewA = () => {
        setIsModalViewOpen(false);
    };


    const [formData, setFormData] = useState({
        orderStatus: "",
    });
    const [editedOrder, setEditedOrder] = useState({});
    const [errors, setErrors] = useState({});
    const validateForm = async () => {
        let errors = {};

        if (!formData.title.trim()) {
            errors.orderStatus = 'order Status is required'
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(io("http://localhost:8089"));
    }, []);


    const handleNotification = () => {
        if (socket) {
            const notificationData = {
                senderName: "Admin",
                receiverName: editedOrder.user.username,
                orderStatus: editedOrder.orderStatus,
            };
    
            socket.emit("sendNotification", notificationData);
        }
    };

    const handleSaveEdit = async () => {
        try {
            await axios.put(`http://localhost:9090/api/order/update-order/${editedOrder._id}`, editedOrder);
            setIsEditModalOpen(false);
            fetchData();
            handleNotification();
            await axios.post("http://localhost:9090/api/order/notif", {senderName: "Admin", receiverName:editedOrder.user.username, orderStatus: editedOrder.orderStatus});
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };


    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleEdit = (orderStatus) => {
        setEditedOrder(orderStatus);
        openEditModal();
    };

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => {
        setIsEditModalOpen(false);
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
                    Products Table
                </Text>

            </Flex>


            {/* ////////////////////////////////////////////////view////////////////////////////////////////////////////  */}


            <Modal isOpen={isModalViewOpen} onClose={closeModalViewA}>
                <ModalOverlay />
                <ModalContent maxW={'800px'}>
                    <ModalHeader>Product Information</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {productInfo && productInfo.orderItems && productInfo.orderItems.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
                                        <Text
                                            color={textColorPrimary}
                                            fontWeight='bold'
                                            fontSize='2xl'
                                            mt='10px'
                                            mb='4px'>
                                            {item.productId.title}
                                        </Text>
                                        <FormControl id="profilePicture" mt={4}>
                                            <img src={item.productId.images} alt="Image" style={{ maxWidth: "250px", maxHeight: "250px", margin: "auto" }} />
                                        </FormControl>
                                        <SimpleGrid columns='2' gap='20px'>
                                            <Information
                                                boxShadow={cardShadow}
                                                title='price'
                                                value={item.productId.price}
                                            />
                                            <Information
                                                boxShadow={cardShadow}
                                                title='Description'
                                                value={item.productId.description}
                                            />
                                            <Information
                                                boxShadow={cardShadow}
                                                title='Quantity'
                                                value={item.productId.quantity}
                                            />
                                            <Information
                                                boxShadow={cardShadow}
                                                title='Category'
                                                value={item.productId.category}
                                            />
                                        </SimpleGrid>
                                    </Card>
                                </React.Fragment>
                            )
                        })}
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* ////////////////////////////////////////////////delete////////////////////////////////////////////////////  */}
            <AlertDialog
                isOpen={isDeleteDialogOpen}
                leastDestructiveRef={cancelRef}
                onClose={cancelDelete}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Order
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete this order?
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

            {/* ////////////////////////////////////////////////edit////////////////////////////////////////////////////  */}
            <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                <ModalOverlay />
                <ModalContent maxW={'800px'}>
                    <ModalHeader>Edit Order Status</ModalHeader>
                    <ModalCloseButton />
                    {editedOrder && (
                        <ModalBody>


                            <FormControl>
                                <FormLabel>orderStatus</FormLabel>
                                <Select name="orderStatus" value={editedOrder.orderStatus} onChange={(e) => setEditedOrder({ ...editedOrder, orderStatus: e.target.value })}>
                                    <option value="Orderd">Orderd</option>
                                    <option value="Processed">Processed</option>
                                    <option value="shipped">shipped</option>
                                    <option value="Out For Delivery">Out For Delivery</option>
                                    <option value="Ddelivered">Ddelivered</option>
                                </Select>
                            </FormControl>
                        </ModalBody>
                    )}
                    {errors.orderStatus && <Text color="red">{errors.orderStatus}</Text>}
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSaveEdit}>Save</Button>
                        <Button onClick={closeEditModal}>Cancel</Button>
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
                                    if (cell.column.Header === "client's username") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "totalPrice") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "totalPriceAfterDiscount") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "paid At") {
                                        const date = new Date(cell.value);
                                        const formattedDate = date.toISOString().split('T')[0];
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {formattedDate}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "orderStatus") {
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