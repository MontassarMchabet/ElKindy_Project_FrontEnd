import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { FaVideo } from 'react-icons/fa';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const JoinMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = Cookies.get('token');
    const decodedToken = jwtDecode(storedToken);
    const studentName = decodedToken.userId;

    const fetchMeetings = async () => {
      try {
        const response = await axios.get(`https://elkindy-project-backend.onrender.com/api/plannings/meetings/participant/${studentName}`);
        const updatedPlannings = await Promise.all(response.data.meetings.map(async (planning) => {
          const teacherResponse = await axios.get(`https://elkindy-project-backend.onrender.com/api/auth/user/${planning.teacherName}`);

          return {
            ...planning,

            TeacherNames: teacherResponse.data.name,
        };
        }));  
        setMeetings(updatedPlannings);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching meetings:', err);
        setError('Failed to fetch meetings. Please try again later.');
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const joinMeeting = (roomName) => {
    navigate(`/meeting/${roomName}`);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Upcoming Meetings</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">{error}</Alert>
      ) : (
        <Row className="justify-content-center">
          {meetings.map((meeting, index) => (
            <Col key={index} md={6} lg={4} className="mb-4">
              <Card className="shadow">
                <Card.Header className="bg-primary text-white">{meeting.roomName}</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <strong>Teacher:</strong> {meeting.TeacherNames}
                  </Card.Text>
                  <Card.Text>
                    <strong>Date:</strong> {new Date(meeting.date).toLocaleDateString()} 
                    <strong> - Time:</strong> {meeting.time}
                  </Card.Text>
                  <Button variant="primary" className="btn-block" onClick={() => joinMeeting(meeting.roomName)}>
                    <FaVideo /> Join Meeting
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default JoinMeetings;
