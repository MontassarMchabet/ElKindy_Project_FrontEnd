import { Box, SimpleGrid } from "@chakra-ui/react";
import SubscriptionTable from "views/admin/subscriptionHistoryTable/components/SubscriptionTable";
import React, { useState, useEffect, useRef } from "react";
import api from "services/api";
import { subscriptionData } from "./variables/columnsData";
import axios from "axios";
import Cookies from "js-cookie";

export default function Settings() {
    const [subscriptionsData, setSubscriptionsData] = useState([]);

    const fetchData = async () => {
        try {
            const token = Cookies.get('token');
            const response = await api.get('http://localhost:9090/api/auth/getAllHistorySubscriptions', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            //Iterate over each subscription to fetch user details
            const updatedData = await Promise.all(response.data.map(async (subscription) => {
                const userResponse = await api.get(`http://localhost:9090/api/auth/user/${subscription.client}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const { profilePicture, username } = userResponse.data;

                return {
                    ...subscription,
                    profilePicture,
                    username,
                };
            }));

            setSubscriptionsData(updatedData);
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    return (
        
        <Box width="2350px" style={{marginTop:"80px"}}>
            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 2 }}
                spacing={{ base: "20px", xl: "20px" }}>
                <SubscriptionTable
                    columnsData={subscriptionData}
                    tableData={subscriptionsData}
                    fetchData={fetchData}
                />
            </SimpleGrid>
        </Box>
    );
}