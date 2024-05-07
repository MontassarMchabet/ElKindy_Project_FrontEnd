import { Box, SimpleGrid } from "@chakra-ui/react";

import EventCalendar from "views/admin/eventsCalendar/components/EventCalendar";



import React, { useState, useEffect, useRef } from "react";
import axios from "axios";



export default function Settings() {
    const [eventssData, seteventsData] = useState([]);
    

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const eventResponse = await axios.get('https://elkindy-project-backend.onrender.com/event/all');
            seteventsData(eventResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    
    return (
        <Box width="2180px" pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 2 }}
                spacing={{ base: "20px", xl: "20px" }}>
                <EventCalendar
                    eventsData={eventssData}
                />
        
            </SimpleGrid>

            
        </Box>

    );
}

