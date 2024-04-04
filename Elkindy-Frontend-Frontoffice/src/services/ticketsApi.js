import axios from "axios";

const apiTicketURL = "http://localhost:9090/tickets";


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