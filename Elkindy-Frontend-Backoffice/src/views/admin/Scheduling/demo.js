import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios'; // Importez axios pour effectuer des requêtes HTTP
import CustomAppointmentForm from './AddPlanningForm'; 
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  DragDropProvider,
  DateNavigator,
  Toolbar,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';

const PREFIX = 'Demo';
export const classes = {
  container: `${PREFIX}-container`,
  text: `${PREFIX}-text`,
  formControlLabel: `${PREFIX}-formControlLabel`,
};

const theme = createTheme();

const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.container}`]: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  [`& .${classes.text}`]: theme.typography.h6,
  [`& .${classes.formControlLabel}`]: {
    ...theme.typography.caption,
    fontSize: '1rem',
  },
}));

const Demo = () => {
  const [data, setData] = useState([]);
  const [editingOptions, setEditingOptions] = useState({
    allowAdding: true,
    allowDeleting: true,
    allowUpdating: true,
    allowDragging: true,
    allowResizing: true,
  });
  const [addedAppointment, setAddedAppointment] = useState({});
  const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment());

  const { allowAdding, allowDeleting, allowUpdating, allowResizing, allowDragging } = editingOptions;

useEffect(() => {
  const fetchPlannings = async () => {
    try {
      const response = await axios.get('http://localhost:9090/api/plannings/getall');
      const formattedData = response.data.map(planning => ({
        ...planning,
        startDate: moment(planning.date).set({
          hour: moment(planning.startDate, 'HH:mm').hour(),
          minute: moment(planning.startDate, 'HH:mm').minute(),
        }).toDate(),
        endDate: moment(planning.date).set({
          hour: moment(planning.endDate, 'HH:mm').hour(),
          minute: moment(planning.endDate, 'HH:mm').minute(),
        }).toDate(),
      }));
      setData(formattedData);
     
    } catch (error) {
      console.error("Erreur lors de la récupération des plannings :", error);
    }
  };

  fetchPlannings();
}, []);

  console.log(setData);
  const onCommitChanges = useCallback(({ added, changed, deleted }) => {
    // Ajoutez ici la logique pour modifier, ajouter ou supprimer un planning sur le backend
  }, []);

  const onAddedAppointmentChange = useCallback((appointment) => {
    setAddedAppointment(appointment);
    setIsAppointmentBeingCreated(true);
  }, []);

  const handleEditingOptionsChange = useCallback(({ target }) => {
    const { value } = target;
    setEditingOptions(prevOptions => ({
      ...prevOptions,
      [value]: !prevOptions[value],
    }));
  }, []);

  const TimeTableCell = useCallback(({ onDoubleClick, ...restProps }) => (
    <WeekView.TimeTableCell
      {...restProps}
      onDoubleClick={allowAdding ? onDoubleClick : undefined}
    />
  ), [allowAdding]);

  const CommandButton = useCallback(({ id, ...restProps }) => {
    if (id === 'deleteButton') {
      return <AppointmentForm.CommandButton id={id} {...restProps} disabled={!allowDeleting} />;
    }
    return <AppointmentForm.CommandButton id={id} {...restProps} />;
  }, [allowDeleting]);

  const allDayLocalizationMessages = {
    'fr-FR': {
      allDay: 'Temps plein',
    },
    'de-GR': {
      allDay: 'Ganztägig',
    },
    'en-US': {
      allDay: 'All Day',
    },
  };

  const getAllDayMessages = locale => allDayLocalizationMessages[locale];

  const [locale, setLocale] = useState('fr-FR');
  const allowDrag = React.useCallback(
    () => allowDragging && allowUpdating,
    [allowDragging, allowUpdating],
  );
  const allowResize = React.useCallback(
    () => allowResizing && allowUpdating,
    [allowResizing, allowUpdating],
  );
  
  return (
    <React.Fragment>
      <StyledDiv className={classes.container}>
        <Typography className={classes.text}>
          Enabled Options
        </Typography>
      </StyledDiv>
      <Paper>
        <Scheduler
          data={data}
          height={600}
          locale={locale}
          onDataRendered={renderedData => console.log('Données rendues :', renderedData)}
          
        >
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={setCurrentDate}
          />
          <EditingState
            onCommitChanges={onCommitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />

          <IntegratedEditing />
          <WeekView
            startDayHour={8}
            endDayHour={24}
            timeTableCellComponent={TimeTableCell}
          />

          <Appointments />

          <AppointmentTooltip
            showOpenButton
            showDeleteButton={allowDeleting}
          />
          <AppointmentForm
            commandButtonComponent={CommandButton}
            readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
          
      
          />
  
          <Toolbar />
          <DateNavigator />
          <AllDayPanel messages={getAllDayMessages(locale)} />
          <DragDropProvider
            allowDrag={allowDrag}
            allowResize={allowResize}
          />
        </Scheduler>
      </Paper>
    </React.Fragment>
  );
};

const App = () => (
  <ThemeProvider theme={theme}>
    <Demo />
  </ThemeProvider>
);

export default App;

