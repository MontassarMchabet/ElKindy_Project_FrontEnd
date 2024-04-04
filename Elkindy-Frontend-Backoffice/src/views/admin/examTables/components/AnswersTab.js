import React from 'react';
import { Flex, Table, Thead, Tbody, Tr, Th, Td, Avatar, Text, Box, Progress, Button } from '@chakra-ui/react';
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table';

function Answers(props) {
    const { columnsData, tableData } = props;

    const columns = React.useMemo(() => columnsData, [columnsData]);
    const data = React.useMemo(() => tableData, [tableData]);

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
        prepareRow
    } = tableInstance;

    const textColor = 'navy.700';
    const textColorSecondary = 'secondaryGray.600';


    return (
        <Flex direction='column' w='100%' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
            <Flex
                align={{ sm: 'flex-start', lg: 'center' }}
                justify='space-between'
                w='100%'
                px='22px'
                pb='20px'
                mb='10px'
                boxShadow='0px 40px 58px -20px rgba(112, 144, 176, 0.26)'>
                <Text color={textColor} fontSize='xl' fontWeight='600'>
                    Exam Answers
                </Text>
                
            </Flex>
            <Table {...getTableProps()} variant='simple' color='gray.500'>
                
                <Thead>
                    {headerGroups.map((headerGroup, index) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, index) => (
                                <Th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    pe='10px'
                                    key={index}
                                    borderColor='transparent'>
                                    <Flex
                                        justify='space-between'
                                        align='center'
                                        fontSize={{ sm: '10px', lg: '12px' }}
                                        color='gray.400'>
                                        {column.render('Header')}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>

                <Tbody {...getTableBodyProps()} style={{ minHeight: '200px' }}>
                {console.log('Table data prop:', tableData)}
                    {page.map((row, index) => {
                       

                        
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()} key={index}>
                                {row.cells.map((cell, index) => {
                                   
                                    let data = '';
                                   // Inside the cell rendering logic
                                   if (cell.column.Header === 'Students') {
                                    const studentName = cell.value && cell.value.name ? cell.value.name : 'undefined';
                                    data = (
                                        <Flex align='center'>
                                          {cell.value && cell.value.profilePicture && (
    <Avatar
        src={cell.value.profilePicture}
        w='30px'
        h='30px'
        me='8px'
    />
)}


                                            <Text color={textColor} fontSize='sm' fontWeight='600'>
                                                {studentName}
                                            </Text>
                                        </Flex>
                                    );
                                }else if (cell.column.Header === 'PDF') {
                                    // Extracting a part of the URL to display

                                    const url = new URL(cell.value);
                                    const path = url.pathname;
                                    const start = path.lastIndexOf('/') + 1; // Find the index of the last '/'
                                    const end = path.indexOf('?'); // Find the index of '?'
                                    const filename = path.substring(start, end !== -1 ? end : undefined); // Extract the filename substring
                                    
                                    data = (
                                        <a href={cell.value} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'blue' }}>
                                            {filename}
                                        </a>
                                    );
                                    
                                }
                            
                                else if (cell.column.Header === 'Note') {
                                
                                    const score = cell.value && cell.value.score != null ? cell.value.score : '--';
                                    data = (
                                        <Text color={textColorSecondary} fontSize='sm' fontWeight='500'>
                                            {score}/20
                                        </Text>
                                    );
                                }
                                
                                else if (cell.column.Header === 'Rating') {
                                        data = (
                                            <Box>
                                                <Progress
                                                    variant='table'
                                                    colorScheme='brandScheme'
                                                    value={cell.value}
                                                />
                                            </Box>
                                        );
                                    }
                                    return (
                                        <Td
                                            {...cell.getCellProps()}
                                            key={index}
                                            fontSize={{ sm: '14px' }}
                                            minW={{ sm: '150px', md: '200px', lg: 'auto' }}
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
        </Flex>
    );
}

export default Answers;
