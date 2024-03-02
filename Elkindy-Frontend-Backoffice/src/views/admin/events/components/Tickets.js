

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Tickets() {
    // const { eventId } = useParams();
    const eventId = '65de60ac69889e0c3cfa4bd3';
    const [tickets, setTickets] = useState([]);
  console.log("heeeeeeeey",eventId);


    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/event/${eventId}/tickets`);
                setTickets(response.data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, [eventId]);

    return (
        <>
        <div>
            <h1>Liste des billets pour l'événement</h1>
            <ul>
                {tickets.map(ticket => (
                    <li key={ticket._id}>
                        <p>Nom: {ticket.event}</p>
                        <p>Prix: {ticket.price}</p>
                    </li>
                ))}
            </ul>
        </div>
        </>
        

    );
}

export default Tickets;
