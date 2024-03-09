// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from "services/api";
import { NavLink, useHistory } from 'react-router-dom';
import { EditIcon } from "@chakra-ui/icons";
import { Button, Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, FormControl, FormLabel, Input, Grid, SimpleGrid } from "@chakra-ui/react";
import {
  Icon,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import Cookies from 'js-cookie';
export default function Banner(props) {
  const { banner, avatar, name, job, posts, followers, following } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const history = useHistory();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get('token');
        const decodedToken = jwtDecode(token);
        const { userId, role } = decodedToken;

        const response = await api.get(`http://localhost:9090/api/auth/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  //////////////////////////////////////////////
  /////////////////////////////////////////////
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  const [editedUser, setEditedUser] = useState({});
  const [originalPhoneNumber, setOriginalPhoneNumber] = useState("");
  const [originalCIN, setOriginalCIN] = useState("");
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
    cinNumber: "",
    phoneNumber: "",
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
  const validateCIN = async (cinNumber) => {
    const cinString = String(cinNumber).trim();
    if (!cinNumber) {
      setErrorsEdit({ ...errorsEdit, cinNumber: "CIN is required" });
      return false;
    }
    if (!cinString) {
      setErrorsEdit({ ...errorsEdit, cinNumber: "CIN is required" });
      return false;
    } else if (cinString.length !== 8 || isNaN(parseInt(cinString))) {
      setErrorsEdit({ ...errorsEdit, cinNumber: "CIN must be an 8-digit number" });
      return false;
    } else {
      try {
        if (cinNumber !== originalCIN) {
          const cinResponse = await api.get(`http://localhost:9090/api/auth/check/cin/${cinNumber}`);
          if (cinResponse.data.exists) {
            setErrorsEdit({ ...errorsEdit, cinNumber: "CIN number is not valid" });
            return false;
          }
        }
        setErrorsEdit({ ...errorsEdit, cinNumber: "" });
        return true;
      } catch (error) {
        console.error("Error validating phone number:", error);
        return false;
      }
    }
  };
  const validatePhoneNumber = async (phoneNumber) => {
    const phoneString = String(phoneNumber).trim();
    if (!phoneNumber) {
      setErrorsEdit({ ...errorsEdit, phoneNumber: "Phone number is required" });
      return false;
    }
    if (!phoneString) {
      setErrorsEdit({ ...errorsEdit, phoneNumber: "Phone number is required" });
      return false;
    } else if (phoneString.length !== 8 || isNaN(parseInt(phoneString))) {
      setErrorsEdit({ ...errorsEdit, phoneNumber: "Phone number must be an 8-digit number" });
      return false;
    } else {
      try {
        if (phoneNumber !== originalPhoneNumber) {
          const phoneResponse = await api.get(`http://localhost:9090/api/auth/check/phone/${phoneNumber}`);
          if (phoneResponse.data.exists) {
            setErrorsEdit({ ...errorsEdit, phoneNumber: "Phone number is not valid" });
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

      await api.patch(`http://localhost:9090/api/auth/editAdminProf/${editedUser._id}`, editedUser);

      setIsEditModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleEdit = (user) => {
    setEditedUser({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      username: user.username,
      phoneNumber: user.phoneNumber,
      cinNumber: user.cinNumber,
      profilePicture: user.profilePicture,
      password: "", // You may choose to exclude the password from here
      confirmPassword: "", // You may choose to exclude the confirmPassword from here
    });
    setOriginalPhoneNumber(user.phoneNumber);
    setOriginalCIN(user.cinNumber);
    setOriginalUsername(user.username);
    setOriginalEmail(user.email);
    setErrorsEdit({
      name: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      cinNumber: "",
      phoneNumber: "",
      profilePicture: "",
    });
    openEditModal();
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  return (
    <Card mb={{ base: "0px", lg: "20px" }} align='center'>

      <Box
        bg={`url(${banner})`}
        bgSize='cover'
        borderRadius='16px'
        h='150px'
        w='100%'
      />
      <Avatar
        mx='auto'
        src={avatar}
        h='130px'
        w='130px'
        mt='-43px'
        border='4px solid'
        borderColor={borderColor}
      />

      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
        {`${user?.name} ${user?.lastname}`}
      </Text>
      <Text color={textColorSecondary} fontSize='sm'>
        @{`${user?.username}`}
      </Text>
      <br />
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
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
                <FormControl id="phoneNumber" mt={4}>
                  <FormLabel>Phone Number</FormLabel>
                  <Input type="number" value={editedUser.phoneNumber} onChange={(e) => { setEditedUser({ ...editedUser, phoneNumber: parseInt(e.target.value) }); validatePhoneNumber(e.target.value); }} />
                </FormControl>
                <FormControl id="cinNumber" mt={4}>
                  <FormLabel>CIN Number</FormLabel>
                  <Input type="number" value={editedUser.cinNumber} onChange={(e) => { setEditedUser({ ...editedUser, cinNumber: parseInt(e.target.value) }); validateCIN(e.target.value); }} />
                </FormControl>
              </Grid>

            </ModalBody>
          )}
          {errorsEdit.name && <Text color="red">{errorsEdit.name}</Text>}
          {errorsEdit.lastname && <Text color="red">{errorsEdit.lastname}</Text>}
          {errorsEdit.email && <Text color="red">{errorsEdit.email}</Text>}
          {errorsEdit.username && <Text color="red">{errorsEdit.username}</Text>}
          {errorsEdit.password && <Text color="red">{errorsEdit.password}</Text>}
          {errorsEdit.confirmPassword && <Text color="red">{errorsEdit.confirmPassword}</Text>}
          {errorsEdit.cinNumber && <Text color="red">{errorsEdit.cinNumber}</Text>}
          {errorsEdit.phoneNumber && <Text color="red">{errorsEdit.phoneNumber}</Text>}
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveEdit}>Save</Button>
            <Button onClick={closeEditModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <EditIcon
        w='20px'
        h='20px'
        me='5px'
        color={"green.500"}
        cursor="pointer"
        style={{ margin: "auto" }}
        onClick={() => handleEdit(user)}
      />


      {/* <Flex w='max-content' mx='auto' mt='26px'>
        <Flex mx='auto' me='60px' align='center' direction='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {posts}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Clients
          </Text>
        </Flex>
        <Flex mx='auto' me='60px' align='center' direction='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {followers}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Admins
          </Text>
        </Flex>
        <Flex mx='auto' align='center' direction='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {following}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Professors
          </Text>
        </Flex>
      </Flex> */}
    </Card>
  );
}
