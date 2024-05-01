// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Tunis from "assets/img/dashboards/tunisie.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
  topClientData
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import React, { useState, useEffect, useRef } from "react";
import api from "services/api";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");


  const [topClientsData, setTopClientsData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalIncomeThisMonth, setTotalIncomeThisMonth] = useState(0);
  const [totalSubscriptionsThisMonth, setTotalSubscriptionsThisMonth] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [topClients, setTopClients] = useState([]);
  const [totalIncomeTND, setTotalIncomeTND] = useState(0);
  const [percentageIncreaseSubscription, setPercentageIncreaseSubscription] = useState(0);
  const [subscriptionStatus, setSubscriptionStatus] = useState({});


  useEffect(() => {
    fetchDataTopClients();
    fetchTotalIncome();
    fetchTotalIncomeThisMonth();
    fetchTotalSubscriptionsThisMonth();
    fetchTotalClients();
    fetchTopClients();
    fetchSubscriptionStatus();
  }, []);

  const fetchDataTopClients = async () => {
    try {
      const response = await api.get('http://localhost:9090/api/auth/subscription/topclients');
      const topClientsData = await Promise.all(response.data.TopClients.map(async (client) => {
        const userResponse = await api.get(`http://localhost:9090/api/auth/user/${client._id}`);
        const { profilePicture, username } = userResponse.data;
        return {
          ...client,
          profilePicture,
          username,
        };
      }));
      setTopClientsData(topClientsData);
    } catch (error) {
      console.error('Error fetching top clients:', error);
    }
  };



  const fetchTotalIncome = async () => {
    try {
      const response = await api.get('http://localhost:9090/api/auth/subscription/totalincome');
      setTotalIncome(response.data.TotalIncome);
      let variabletotalIncomeTND = response.data.TotalIncome * 3.3;
      setTotalIncomeTND(variabletotalIncomeTND);
    } catch (error) {
      console.error('Error fetching total income:', error);
    }
  };

  const fetchTotalIncomeThisMonth = async () => {
    try {
      const response = await api.get('http://localhost:9090/api/auth/subscription/totalincomeThisMonth');
      setTotalIncomeThisMonth(response.data.TotalIncomeThisMonth);
    } catch (error) {
      console.error('Error fetching total income this month:', error);
    }
  };

  const fetchTotalSubscriptionsThisMonth = async () => {
    try {
      const response = await api.get('http://localhost:9090/api/auth/subscription/SubscriptionThisMonth');
      setTotalSubscriptionsThisMonth(response.data.totalSubscriptions);
      setPercentageIncreaseSubscription(response.data.percentageIncrease)
    } catch (error) {
      console.error('Error fetching total subscriptions this month:', error);
    }
  };

  const fetchTotalClients = async () => {
    try {
      const response = await api.get('http://localhost:9090/api/auth/subscription/TotalClients');
      setTotalClients(response.data.TotalClients);
    } catch (error) {
      console.error('Error fetching total clients:', error);
    }
  };

  const fetchTopClients = async () => {
    try {
      const response = await api.get('http://localhost:9090/api/auth/subscription/topclients');
      setTopClients(response.data.TopClients);
    } catch (error) {
      console.error('Error fetching top clients:', error);
    }
  };
  const fetchSubscriptionStatus = async () => {
    try {
      const response = await api.get('http://localhost:9090/api/auth/subscription/status');
      setSubscriptionStatus(response.data);
    } catch (error) {
      console.error('Error fetching subscription status:', error);
    }
  };


  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Earnings'
          value={`$${totalIncome}`}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name='Earnings this month'
          value={`$${totalIncomeThisMonth}`}
        />

        <MiniStatistics
          endContent={
            <Flex me='-16px' mt='10px'>
              <FormLabel htmlFor='balance'>
                <Avatar src={Tunis} />
              </FormLabel>
            </Flex>
          }
          name='Earnings in TND'
          value={`${totalIncomeTND}`}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
            />
          }
          name='Total Clients'
          value={totalClients}
        />
        <MiniStatistics
          growth={`${percentageIncreaseSubscription}%`}
          name='Subscriptions this month'
          value={totalSubscriptionsThisMonth}
        />
        {/* <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name='Total Projects'
          value='2935'
        /> */}
      </SimpleGrid>



      <TotalSpent totalIncomeThisMonth={totalIncomeThisMonth} />

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        {/* <WeeklyRevenue /> */}
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>

        <CheckTable
          columnsData={topClientData}
          tableData={topClientsData}
          fetchDataTopClients={fetchDataTopClients}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          {/* <DailyTraffic /> */}
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          {/* <Tasks /> */}

        </SimpleGrid>
      </SimpleGrid>

    </Box>
  );
}
