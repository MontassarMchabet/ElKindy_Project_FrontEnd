import axios from "axios";

const apiTicketURL = "https://elkindy-project-backend.onrender.com/tickets";


// *******tickets***
export async function addTickets(ticketData, config) {
    try {
      const response = await axios.post(`${apiTicketURL}/add`, ticketData, config);
      return response.data;
    } catch (error) {
      console.error("Error adding resrvation:", error);
      throw error;
    }
  }