import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker/index.js';
const CustomAppointmentForm = ({ appointmentData, onAppointmentChange }) => {
  const [title, setTitle] = useState(appointmentData?.title || '');
  const [startDate, setStartDate] = useState(appointmentData?.startDate || new Date());
  const [endDate, setEndDate] = useState(appointmentData?.endDate || new Date(startDate.getTime() + 3600000)); // Add 1 hour by default

  const handleSave = () => {
    onAppointmentChange({ ...appointmentData, title, startDate, endDate }); // Update appointment data
  };

  return (
    <div>
      <TextField
        label="Titre"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <DateTimePicker
        label="Date de début"
        value={startDate}
        onChange={(newValue) => setStartDate(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
      <DateTimePicker
        label="Date de fin"
        value={endDate}
        onChange={(newValue) => setEndDate(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Sauvegarder
      </Button>
    </div>
  );
};

export default CustomAppointmentForm;
