import axios from "axios";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    Table,
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

export default function PlanningTable(props) {
    const {
        columnsData,
        tableData,
        isEditModalOpen,
        editedPlanning,
        openEditModal,
        closeEditModal,
        confirmDelete,
        cancelDelete,
        isDeleteDialogOpen,
        handleDelete,
        cancelRef,
        fetchData,
    } = props;

    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);

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

    initialState.pageSize = 99999999999999999; // Set a large number to show all rows

    return (
        <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
            <Thead>
                {headerGroups.map((headerGroup, index) => (
                    <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                        {headerGroup.headers.map((column, index) => (
                            <Th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                pe="10px"
                                key={index}
                                borderColor={borderColor}
                            >
                                <Text
                                    color={textColor}
                                    fontSize={{ sm: "10px", lg: "12px" }}
                                    fontWeight="bold"
                                >
                                    {column.render("Header")}
                                </Text>
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
                            {row.cells.map((cell, index) => (
                                <Td
                                    {...cell.getCellProps()}
                                    key={index}
                                    fontSize={{ sm: "14px" }}
                                    minW={{ sm: "150px", md: "200px", lg: "auto" }}
                                    borderColor="transparent"
                                >
                                    <Text color={textColor} fontSize="sm">
                                        {cell.render("Cell")}
                                    </Text>
                                </Td>
                            ))}
                        </Tr>
                    );
                })}
            </Tbody>
        </Table>
    );
}
