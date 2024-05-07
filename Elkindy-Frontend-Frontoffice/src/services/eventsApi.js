import axios from "axios";

const apiURL = "https://elkindy-project-backend.onrender.com/event";
const apiTicketURL = "https://elkindy-project-backend.onrender.com/tickets";

export async function getAllEvents(config) {
  return await axios.get(`${apiURL}/all`,config);
}

// export async function getEventById(id,config) {
//   return await axios.get(`${apiURL}/${id}`,config);
// }


export async function getEventById(id, config) {
  try {
    const response = await axios.get(`${apiURL}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'événement par ID :", error);
    throw error;
  }
} 
// export async function getEventById(id, config) {
//     try {
//       const response = await axios.get(`${apiURL}/${id}`, config);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching event with id ${id}:`, error);
//       throw error;
//     }
//   }
  
  export async function addEvent(eventData, config) {
    try {
      const response = await axios.post(`${apiURL}/add`, eventData, config);
      return response.data;
    } catch (error) {
      console.error("Error adding event:", error);
      throw error;
    }
  }
  
  export async function updateEvent(id, eventData, config) {
    try {
      const response = await axios.put(`${apiURL}/update/${id}`, eventData, config);
      return response.data;
    } catch (error) {
      console.error(`Error updating event with id ${id}:`, error);
      throw error;
    }
  }
  
  export async function deleteEvent(id, config) {
    try {
      const response = await axios.delete(`${apiURL}/delete/${id}`, config);
      return response.data;
    } catch (error) {
      console.error(`Error deleting event with id ${id}:`, error);
      throw error;
    }
  }
  
  export async function getEventTickets(eventId, config) {
    try {
      const response = await axios.get(`${apiURL}/${eventId}/tickets`, config);
      return response.data;
    } catch (error) {
      console.error(`Error fetching tickets for event with id ${eventId}:`, error);
      throw error;
    }
  }
  
  export async function getEventComments(eventId, config) {
    try {
      const response = await axios.get(`${apiURL}/${eventId}/comments`, config);
      return response.data;
    } catch (error) {
      console.error(`Error fetching comments for event with id ${eventId}:`, error);
      throw error;
    }
  }

  