

export default function ColumnsTable(props) {
    const { columnsData, tableData, handleDelete,handleTickets, cancelDelete, cancelRef, confirmDelete, isDeleteDialogOpen,
        isModalOpenA, openModalA, closeModalA, fetchData, isEditModalOpen, closeEditModal,setIsEditModalOpen } = props;
    const [editedEvent, setEditedEvent] = useState({}); // Déclaration et initialisation
    const [tickets, setTickets] = useState([]);
    const [comments, setComments] = useState([]);
    const [eventInfo, setEventInfo] = useState(null);
    

    ////////////////////////
        // Fonction pour sauvegarder les modifications du l'event
        const handleSaveEdit = async () => {
            try {
                // Effectuer la requête API pour mettre à jour le event avec les nouvelles données
                await axios.put(`http://localhost:9090/event/update/${editedEvent._id}`, editedEvent);
                //console.log (editedEvent._id,"aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                console.log("Course updated successfully");
                setIsEditModalOpen(false); // Fermer la modal d'édition après la sauvegarde
                fetchData(); // Rafraîchir les données des cours
            } catch (error) {
                console.error("Error updating course:", error);
            }
        };
    const handleEdit = (course) => {
       setEditedEvent(course); // Charger les données du cours à éditer dans editedEvent
       openEditModal(); // Ouvrir le formulaire d'édition
    };
    const handleTicketsClick = async () => {
        if (!eventInfo || !eventInfo.id) {
            console.error('Event info is missing or does not have an ID');
            return;
        }
        try {
            const response = await fetch(`/admin/events/${eventInfo.id}/tickets`);
            const data = await response.json();
            setTickets(data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    const handleCommentsClick = async () => {
        try {
            const response = await fetch(`/admin/events/${eventInfo.id}/comments`);
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
    const handleView = (eventData) => {
        setEventInfo(eventData);
        setIsModalViewOpen(true);
    };
    const closeModalViewA = () => {
        setIsModalViewOpen(false);
    };


 
    return (
        <Card direction='column' w='100%' px='0px' overflowX={{ sm: "scroll", lg: "hidden" }}>
          
            
          
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
                                    if  (cell.column.Header === "IMAGE") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                <img src={cell.value} alt="Event Image" />
                                            </Text>
                                        );
                                    }else if(cell.column.Header === "NAME") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
              
                                    }  else if (cell.column.Header === "ACTIONS") {
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
                                                        {/* <ModalHeader>Event Information</ModalHeader> */}
                                                        <ModalCloseButton />
                                                        <ModalBody>
                                                            {eventInfo && (
                                                                <>
                                                                     <img src={eventInfo.imageUrl} alt="Event Image" />
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
                                                                            {eventInfo.description}
                                                                        </Text>
                                                                        <SimpleGrid columns='2' gap='20px'>
                                                                            <Information
                                                                                boxShadow={cardShadow}
                                                                                title='Date'
                                                                                value={eventInfo.date}
                                                                            />
                                                                  
                                                                            <ModalFooter>
                                                                                <NavLink to={`/admin/events/${eventInfo.id}/tickets`} onClick={handleTicketsClick}>Tickets</NavLink>
                                                                                <Button colorScheme="orange" onClick={handleCommentsClick}>Comments</Button>
                                                                            </ModalFooter>
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