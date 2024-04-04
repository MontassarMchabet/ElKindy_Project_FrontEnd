import axios from "axios";
import api from "services/api";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, Select, Textarea } from "@chakra-ui/react";
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
        isModalOpenPro, openModalPro, closeModalPro, fetchData } = props;

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
    const [productInfo, setProductInfo] = useState(null);
    const [price, setPrice] = useState(0);

    const handleView = (productData) => {
        setProductInfo(productData);
        setIsModalViewOpen(true);
    };
    const closeModalViewPro = () => {
        setIsModalViewOpen(false);
    };

    const closeModalViewA = () => {
        setIsModalViewOpen(false);
    };


    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        images: "",
    });
    const [editedProduct, setEditedProduct] = useState({});
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        if (e.target.type === "file") {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };
    const validateForm = async () => {
        let errors = {};

        if (!formData.title.trim()) {
            errors.title = 'title is required'
        } else if (!formData.description.trim()) {
            errors.description = 'description is required'
        } else if (!formData.price.trim()) {
            errors.price = 'price is required'
        } else if (!formData.price || formData.price <= 0) {
            errors.price = 'Price should be greater than 0';
        } else if (!formData.quantity.trim()) {
            errors.quantity = 'quantity is required'
        } else if (!formData.quantity || formData.quantity <= 0) {
            errors.quantity = 'Quantity should be greater than 0';
        } else if (!formData.category.trim()) {
            errors.category = 'category is required'
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await validateForm();
        if (isValid) {
            try {

                const formDataToSend = new FormData();
                formDataToSend.append("image", formData.images); // Use "image" as the key

                const uploadResponse = await axios.post(
                    "http://localhost:9090/api/image/uploadimage",
                    formDataToSend,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                const imagesUrl = uploadResponse.data.downloadURL[0];
                const formDataWithImages = { ...formData, images: imagesUrl };

                const response = await axios.post(
                    "http://localhost:9090/api/product",
                    formDataWithImages

                );
                fetchData()
                closeModalPro()
                console.log(response.data);
            } catch (error) {
                console.error("Error registering product:", error);
            }
        }
    };



    const handleSaveEdit = async () => {
        
            try {
                if (imagesFile) {
                    const formDataToSend = new FormData();
                    formDataToSend.append("image", imagesFile);

                    const uploadResponse = await axios.post(
                        "http://localhost:9090/api/image/uploadimage",
                        formDataToSend,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                    editedProduct.images = uploadResponse.data.downloadURL[0];
                }
                await axios.put(`http://localhost:9090/api/product/${editedProduct._id}`, editedProduct);
                setErrors('');
                setIsEditModalOpen(false);
                fetchData();
            } catch (error) {
                console.error("Error updating user:", error);
            }
        
    };
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [imagesFile, setImagesFile] = useState("");
    const handleEdit = (product) => {
        setEditedProduct(product); // Charger les données du cours à éditer dans editedEvent
        openEditModal(); // Ouvrir le formulaire d'édition
    };

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleImagesChange = (e) => {
        setImagesFile(e.target.files[0]);
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
                        onClick={openModalPro}
                        borderRadius='10px'
                        {...rest}>
                        <AddIcon color={iconColor} w='20px' h='20px' />
                    </MenuButton>
                </Menu>

                {/*////////////////////////////////// Modal for adding product ///////////////////////////////////////*/}
                <Modal isOpen={isModalOpenPro} onClose={closeModalPro}>
                    <ModalOverlay />
                    <ModalContent>
                        <form onSubmit={handleSubmit} noValidate>
                            <ModalHeader>Add Product</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Grid templateColumns="1fr 1fr" gap={4}>
                                    <FormControl>
                                        <FormLabel>Title</FormLabel>
                                        <Input type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <FormControl >
                                        <FormLabel>Price</FormLabel>
                                        <Input type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                        />
                                    </FormControl>

                                </Grid>
                                <FormControl mt={4}>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea type="text"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Quantity</FormLabel>
                                    <Input type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Category</FormLabel>
                                    <Select name="category" value={formData.category} onChange={handleChange}>
                                        <option selected disabled >-select category-</option>
                                        <option value="book">Book</option>
                                        <option value="instrument">Instument</option>
                                    </Select>
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Product Images</FormLabel>
                                    <Input type="file"
                                        name="images"
                                        onChange={handleChange}
                                    />
                                    {formData.images && (
                                        <p>Selected file: {formData.images.name}</p>
                                    )}
                                </FormControl>
                            </ModalBody>
                            {errors.title && <Text color="red">{errors.title}</Text>}
                            {errors.description && <Text color="red">{errors.description}</Text>}
                            {errors.price && <Text color="red">{errors.price}</Text>}
                            {errors.quantity && <Text color="red">{errors.quantity}</Text>}
                            {errors.category && <Text color="red">{errors.category}</Text>}
                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} onClick={closeModalPro}>
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


            {/* ////////////////////////////////////////////////view////////////////////////////////////////////////////  */}


            <Modal isOpen={isModalViewOpen} onClose={closeModalViewA}>
                <ModalOverlay />
                <ModalContent maxW={'800px'}>
                    <ModalHeader>Product Information</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {productInfo && (
                            <>
                                {productInfo.profilePicture}
                                <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
                                    <Text
                                        color={textColorPrimary}
                                        fontWeight='bold'
                                        fontSize='2xl'
                                        mt='10px'
                                        mb='4px'>
                                        {productInfo.title}
                                    </Text>
                                    <FormControl id="profilePicture" mt={4}>
                                        <img src={productInfo.images} alt="Image" style={{ maxWidth: "250px", maxHeight: "250px", margin: "auto" }} />
                                    </FormControl>
                                    <SimpleGrid columns='2' gap='20px'>
                                        <Information
                                            boxShadow={cardShadow}
                                            title='price'
                                            value={productInfo.price}
                                        />
                                        <Information
                                            boxShadow={cardShadow}
                                            title='Description'
                                            value={productInfo.description}
                                        />
                                        <Information
                                            boxShadow={cardShadow}
                                            title='Quantity'
                                            value={productInfo.quantity}
                                        />
                                        <Information
                                            boxShadow={cardShadow}
                                            title='Category'
                                            value={productInfo.category}
                                        />
                                    </SimpleGrid>
                                </Card>
                            </>
                        )}
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
                            Delete Product
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete this product?
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
                    <ModalHeader>Edit Product</ModalHeader>
                    <ModalCloseButton />
                    {editedProduct && ( // Vérifiez si editedEvent est disponible
                        <ModalBody>

                            <FormControl id="profilePicture" mt={4}>
                                <img src={editedProduct.images} alt="Image" style={{ maxWidth: "250px", maxHeight: "250px", margin: "auto" }} />
                                <input type="file" name="images" onChange={handleImagesChange} />
                            </FormControl>
                            <Grid templateColumns="1fr 1fr" gap={4}>
                                <FormControl>
                                    <FormLabel>Title</FormLabel>
                                    <Input type="text"
                                        name="title"
                                        value={editedProduct.title} onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })}
                                    />
                                </FormControl>
                                <FormControl >
                                    <FormLabel>Price</FormLabel>
                                    <Input type="number"
                                        name="price"
                                        value={editedProduct.price} onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                                    />
                                </FormControl>

                            </Grid>
                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Input type="text"
                                    name="description"
                                    value={editedProduct.description} onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Quantity</FormLabel>
                                <Input type="number"
                                    name="quantity"
                                    value={editedProduct.quantity} onChange={(e) => setEditedProduct({ ...editedProduct, quantity: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Category</FormLabel>
                                <Select name="category" value={editedProduct.category} onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}>
                                    <option selected disabled >-select category-</option>
                                    <option value="book">Book</option>
                                    <option value="instrument">Instument</option>
                                </Select>
                            </FormControl>
                        </ModalBody>
                    )}
                    {errors.title && <Text color="red">{errors.title}</Text>}
                    {errors.description && <Text color="red">{errors.description}</Text>}
                    {errors.price && <Text color="red">{errors.price}</Text>}
                    {errors.quantity && <Text color="red">{errors.quantity}</Text>}
                    {errors.category && <Text color="red">{errors.category}</Text>}
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
                                    if (cell.column.Header === "Image") {
                                        data = (
                                            <img src={cell.value} alt="Image" style={{ maxWidth: "50px", maxHeight: "50px" }} />
                                        );
                                    } else if (cell.column.Header === "title") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "description") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "price") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "quantity") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "category") {
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