import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const PlanningForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, startDate, endDate });
    // Réinitialiser les champs après soumission si nécessaire
    setTitle('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        <TextField
          required
          id="title"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          required
          id="startDate"
          label="Start Date"
          type="datetime-local"
          variant="outlined"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
        />
        <TextField
          required
          id="endDate"
          label="End Date"
          type="datetime-local"
          variant="outlined"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
        />
      </Box>
      <Button variant="contained" type="submit">Submit</Button>
    </form>
  );
};

export default PlanningForm;
