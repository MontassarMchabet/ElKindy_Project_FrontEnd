import React, { useState, useEffect,useMemo  } from "react";
import { Link, useParams} from "react-router-dom";
import InnerServicesAreaItem from "./InnerServicesAreaItem";
import NavExams from "./NavExams";
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api';
import Cookies from 'js-cookie';
const AboutArea = ({ setExamInfo }) => {
    const {id} = useParams();
    const [exams, setExams] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const handleItemClick = (examData) => {
        setExamInfo(examData);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedToken = Cookies.get('token');
                const decodedToken = jwtDecode(storedToken);
                const { userId } = decodedToken;
                const response = await api.get(`https://elkindy-project-backend.onrender.com/api/auth/user/${userId}`);
                
                setUser(response.data);
                if (response.data.role === 'client') {
                    const examsResponse = await api.get(`https://elkindy-project-backend.onrender.com/api/exam/byclass/${response.data.level}`);
                    setExams(examsResponse.data);
                } else {
                    const response = await api.get('https://elkindy-project-backend.onrender.com/api/exam/');
                    setExams(response.data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false); // Set loading to false after data fetching is complete
            }
        };
        
        fetchUserData();
        
    }, [id]); 


    const sortedExams = useMemo(() => {
        const currentDate = new Date();
        return exams.sort((a, b) => {
            // Sort by endAt date (ascending)
            if (a.endAt && b.endAt) {
                const endAtA = new Date(a.endAt);
                const endAtB = new Date(b.endAt);
                if (endAtA < endAtB) return -1;
                if (endAtA > endAtB) return 1;
            } else if (!a.endAt && b.endAt) {
                return 1; // Exams without endAt date go after exams with endAt date
            } else if (a.endAt && !b.endAt) {
                return -1; // Exams without endAt date go after exams with endAt date
            }
            // If endAt dates are equal or both exams have no endAt date,
            // sort by createdAt date (newest first)
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    }, [exams]);

    return (
        <section className="about-area">
            <div className="container custom-container">
                <div className="about-inner">
                    <div className="row align-items-center justify-content-center">

                        <NavExams />

                        <div className="inner-services-item-wrap">
                            <div className="row justify-content-center">
                                {loading ? ( // Conditionally render loading message while data is being fetched
                                    <div className="col-12 text-center">Loading...</div>
                                ) : (
                                    sortedExams.length === 0 ? (
                                        <div className="col-12 text-center">No exams yet.</div>
                                    ) : (
                                        sortedExams.map((exam, index) => (
                                            <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                                                <InnerServicesAreaItem item={exam} onItemClick={handleItemClick} />
                                            </div>
                                        ))
                                    )
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};
export default AboutArea;