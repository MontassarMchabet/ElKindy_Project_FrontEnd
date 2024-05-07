import React, { useState, useEffect } from "react";
import { Link, useParams} from "react-router-dom";
import NavExams from "./NavExams";
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api';
import NoteTable from './NoteTab'
import Cookies from 'js-cookie';
const NotesArea = () => {
    const {id} = useParams();
    const [user, setUser] = useState(null);
    const [notes, setNotes] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedToken = Cookies.get('token');
                const decodedToken = jwtDecode(storedToken);
                const { userId } = decodedToken;
                const response = await api.get(`https://elkindy-project-backend.onrender.com/api/auth/user/${userId}`);
                
                setUser(response.data);
                
                    const notesResponse = await api.get(`https://elkindy-project-backend.onrender.com/api/note/byclient/${userId}`);
                    setNotes(notesResponse.data);
                    
                
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
                                    <NoteTable notes={notes} />
                                ) : (
                                    <div>No notes yet</div> // Display message when no notes
                                )}

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};
export default NotesArea;