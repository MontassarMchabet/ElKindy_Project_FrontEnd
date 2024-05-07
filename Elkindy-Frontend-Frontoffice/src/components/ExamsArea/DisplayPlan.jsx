import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NavExams from "./NavExams";
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api';
import NoteTable from './NoteTab'
import Cookies from 'js-cookie';
import PlanTable from "./PlanTab";
const ClassesArea = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [notes, setNotes] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
              // Retrieve the stored token from cookies
              const storedToken = Cookies.get('token');
              // Decode the token to extract the userId
              const decodedToken = jwtDecode(storedToken);
              const { userId, role } = decodedToken;
          
              // Fetch user data using the userId
              const response = await api.get(`https://elkindy-project-backend.onrender.com/api/auth/user/${userId}`);
              setUser(response.data);
             
          
              let planningResponse;
              if (role === 'prof') {
                // Fetch planning data for the teacher using the userId
                planningResponse = await api.get(`https://elkindy-project-backend.onrender.com/api/plannings/getByTeacherId/${userId}`);
              } else if (role === 'client') {
                // Fetch planning data for the client using the userId
                planningResponse = await api.get(`https://elkindy-project-backend.onrender.com/api/plannings/getallStudent/${userId}`);
              }
        
              if (planningResponse) {
                const formattedData = await Promise.all(
                  planningResponse.data.map(async (planning) => {
                   
                    if (planning.type === 'instrument') {
                      // Fetch student data using the studentIds from the planning
                      const studentResponse = await api.get(`https://elkindy-project-backend.onrender.com/api/auth/user/${planning.studentIds}`);
                      // Fetch room data using the roomId from the planning
                      const roomResponse = await api.get(`https://elkindy-project-backend.onrender.com/api/Room/getById/${planning.roomId}`);
                      return {
                        ...planning,
                        Subject: `${studentResponse.data.name} ${studentResponse.data.lastname}`,
                        Location: roomResponse.data.room_number,
                      };
                    }
                  })
                );
                const filteredData = formattedData.filter((item) => item !== undefined);
                // Set the formatted data in the component's state
                setNotes(filteredData);
                
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
            } finally {
              setLoading(false); // Set loading to false after data fetching is complete
            }
          };
      
        fetchUserData();
      }, [id]);
return (
    <section className="about-area">
        <div className="container custom-container">
            <div className="about-inner">
                <div className="row align-items-center justify-content-center">

                    <NavExams />

                    <div className="inner-services-item-wrap">
                        <div className="row justify-content-center">

                            {loading ? ( // Show loading message while fetching data
                                <div>Loading...</div>
                            ) : notes && notes.length > 0 ? ( // Check if notes exist and not empty
                                <PlanTable notes={notes} />
                            ) : (
                                <div>No evaluations yet</div> // Display message when no notes
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
);
};
export default ClassesArea;