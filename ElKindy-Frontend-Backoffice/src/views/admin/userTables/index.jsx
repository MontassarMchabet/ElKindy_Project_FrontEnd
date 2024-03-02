// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import AdminTable from "views/admin/userTables/components/AdminTable";
import ClientTable from "views/admin/userTables/components/ClientTable";
import ProfTable from "views/admin/userTables/components/ProfTable";
import tableDataComplex from "views/admin/userTables/variables/tableDataComplex.json";
import React from "react";
import { adminsData, clientData, profData } from "./variables/columnsData";

export default function Settings() {
    return (
        <Box width="3150px" pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 2 }}
                spacing={{ base: "20px", xl: "20px" }}>
                <AdminTable
                    columnsData={adminsData}
                    tableData={tableDataComplex}
                />
            </SimpleGrid>
            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 2 }}
                spacing={{ base: "20px", xl: "20px" }}>
                <ProfTable
                    columnsData={profData}
                    tableData={tableDataComplex}
                />
            </SimpleGrid>
            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 2 }}
                spacing={{ base: "20px", xl: "20px" }}>
                <ClientTable
                    columnsData={clientData}
                    tableData={tableDataComplex}
                />
            </SimpleGrid>
        </Box>
        
    );
}
