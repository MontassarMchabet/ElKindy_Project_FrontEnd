import * as React from 'react';
import { useEffect,useState } from 'react';
import { WorkWeek, Month, ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective, Inject, Agenda } from '@syncfusion/ej2-react-schedule';
import './group-custom-work-days.css';
import moment from 'moment';
import axios from 'axios';
import { position } from 'stylis';
import { border } from '@chakra-ui/system';

const GroupCustomWorkDays = () => {
    let scheduleObj;
    
    const [data, setData] = useState([]);
    const [resourceData, setResourceData] = useState([]);
    // Fonction pour générer une couleur aléatoire au format hexadécimal
      const getRandomColor = () => {
        // Génère trois composantes de couleur au hasard
        const color = Math.floor(Math.random()*16777215).toString(16);
        // Assure que la couleur a toujours six chiffres
        return "#" + "0".repeat(6 - color.length) + color;
      };
    useEffect(() => {
      const fetchPlannings = async () => {
        try {
          const response = await axios.get('http://localhost:9090/api/plannings/getall');
    
          const formattedData = await Promise.all(response.data.plannings.map(async planning => {
            if (planning.type === "instrument") {
              const studentResponse = await axios.get(`http://localhost:9090/api/auth/user/${planning.studentIds}`);
              const RoomResponse = await axios.get(`http://localhost:9090/api/Room/getById/${planning.roomId}`);
              return {
                ...planning,
                StartTime: moment(planning.date).set({
                  hour: moment(planning.startDate, 'HH:mm').hour(),
                  minute: moment(planning.startDate, 'HH:mm').minute(),
                }).toDate(),
                EndTime: moment(planning.date).set({
                  hour: moment(planning.endDate, 'HH:mm').hour(),
                  minute: moment(planning.endDate, 'HH:mm').minute(),
                }).toDate(),
                Subject: `${studentResponse.data.name} ${studentResponse.data.lastname}`,
                Location: RoomResponse.data.room_number
              };
            } else {
              const studentResponse = await axios.get(`http://localhost:9090/api/classroom/getById/${planning.classroomId}`);
              const RoomResponse = await axios.get(`http://localhost:9090/api/Room/getById/${planning.roomId}`);
              return {
                ...planning,
                StartTime: moment(planning.date).set({
                  hour: moment(planning.startDate, 'HH:mm').hour(),
                  minute: moment(planning.startDate, 'HH:mm').minute(),
                }).toDate(),
                EndTime: moment(planning.date).set({
                  hour: moment(planning.endDate, 'HH:mm').hour(),
                  minute: moment(planning.endDate, 'HH:mm').minute(),
                }).toDate(),
                Subject: studentResponse.data.name,
                Location: RoomResponse.data.room_number
              };
            }
          }));
    
          
          const filteredData = formattedData.filter(item => item !== null);
    
          setData(filteredData);
          console.log(filteredData);
        } catch (error) {
          console.error("Erreur lors de la récupération des plannings :", error);
        }
      };
    
      const fetchProfs = async () => {
        try {
          // Récupérer la liste des enseignants depuis l'API
          const response = await axios.get('http://localhost:9090/api/auth/profs');
          // Utiliser les données pour remplir resourceData
          setResourceData(response.data.map(prof => ({
            text: `${prof.name} ${prof.lastname}`,
            id: prof._id,
            imageURL: prof.profilePicture,
            color: getRandomColor(), // Générer une couleur aléatoire ou utiliser une couleur spécifique
            workDays: [0, 1, 2, 3, 4, 5, 6, 7], // Jours de travail
            startHour: '08:00', // Heure de début
            endHour: '23:00' // Heure de fin
          })));
        } catch (error) {
          console.error("Erreur lors de la récupération des enseignants :", error);
        }
      };
    
    
      fetchPlannings();
      fetchProfs();
    }, []);
    


    
  
    const getteacherName = (value) => {
        return ((value.resourceData) ? value.resourceData[value.resource.textField] : value.resourceName);
    };
   
    const getTeacherImage = (props) => {
      // Logique pour obtenir l'URL de l'image de l'enseignant en fonction des propriétés passées (props)
      // Assurez-vous de gérer les cas où les propriétés ne contiennent pas l'URL de l'image de l'enseignant et de renvoyer une valeur par défaut dans ce cas.
      return props && props.resourceData && props.resourceData.imageURL ? props.resourceData.imageURL : 'url_par_defaut.jpg';
  };

  const resourceHeaderTemplate = (props) => {
    return (
        <div className="template-wrap">
            <div className="resource-image">
                <img src={getTeacherImage(props)} alt="Teacher" /> {/* Affichage de l'image de l'enseignant */}
            </div>
            <div className="resource-detail">
                <div className="resource-name" style={{marginLeft:30,marginBottom:20,border:5}}>{getteacherName(props)}</div>
            </div>
        </div>
    );
};
    return (<div className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent style={{marginTop:100}} ref={schedule => scheduleObj = schedule} cssClass='custom-work-days' width='100%' height='650px' selectedDate={new Date()} startHour='09:00' currentView='WorkWeek' resourceHeaderTemplate={resourceHeaderTemplate} eventSettings={{ dataSource: data,allowEditing: false ,allowAdding:false ,allowDeleting:false  }}    group={{ resources: ['teachers'] }} >
            <ResourcesDirective>
              <ResourceDirective field='teacherId' title='Doctor Name' name='teachers' dataSource={resourceData} textField='text' idField='id' groupIDField='groupId' colorField='color' workDaysField='workDays' startHourField='startHour' endHourField='endHour'/>
            </ResourcesDirective>
            <ViewsDirective>
              <ViewDirective option='WorkWeek'/>
              <ViewDirective option='Month'/>
              <ViewDirective option='Agenda'/>
              {/* <ViewDirective option='ExcelExport'/> */}
            </ViewsDirective>
            <Inject services={[WorkWeek, Month, Agenda]}/>
          </ScheduleComponent>
        </div>
      </div>
    </div>);
};
export default GroupCustomWorkDays;