import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Table,
  Spinner,
  Alert,
} from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaVideo } from 'react-icons/fa';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const TeacherMeetingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roomName: '',
    date: '',
    time: '',
    participants: [],
  });

  const [students, setStudents] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/auth/clients');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    const fetchMeetings = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/plannings/get-meetings');
        setMeetings(response.data.meetings);
        setLoading(false);
      } catch (err) {
        setError('Error fetching meetings.');
        setLoading(false);
      }
    };

    fetchStudents();
    fetchMeetings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOptions) => {
    setFormData({
      ...formData,
      participants: selectedOptions.map((option) => option.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedToken = Cookies.get('token');
    const decodedToken = jwtDecode(storedToken);
    const teacherName = decodedToken.userId;

    try {
      await axios.post('http://localhost:9090/api/plannings/create-meeting', {
        ...formData,
        teacherName,
      });

      const response = await axios.get('http://localhost:9090/api/plannings/get-meetings');
      setMeetings(response.data.meetings);

      setFormData({
        roomName: '',
        date: '',
        time: '',
        participants: [],
      });
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  const deleteMeeting = async (meetingId) => {
    try {
      await axios.delete(`http://localhost:9090/api/plannings/delete-meeting/${meetingId}`);
      const updatedMeetings = meetings.filter((m) => m._id !== meetingId);
      setMeetings(updatedMeetings);
    } catch (error) {
      console.error('Error deleting meeting:', error);
    }
  };

  const joinMeeting = (roomName,teacherName) => {
    navigate(`/meeting/${roomName}`, { search: `teacherName=${teacherName}` });

  };

  const studentOptions = students.map((student) => ({
    value: student._id,
    label: `${student.name} ${student.lastname}`,
  }));

  return (
    <Container>
      <Row>
      <Col md={6}>
  <Card>
    <Card.Header>Create a New Meeting</Card.Header>
    <Card.Body>
      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label style={{ marginBottom: '5px' }}>Room Name</Form.Label>
          <Form.Control
            type="text"
            name="roomName"
            value={formData.roomName}
            onChange={handleChange}
            required
            className="border bg-light"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ marginBottom: '5px' }}>Meeting Time</Form.Label>
          <Row>
            <Col md={6}>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="border bg-light"
              />
            </Col>
            <Col md={6}>
              <Form.Control
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="border bg-light"
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ marginBottom: '5px' }}>Participants</Form.Label>
          <Select
            isMulti
            options={studentOptions}
            onChange={handleSelectChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="btn-block btn-lg">
          Create Meeting
        </Button>
      </Form>
    </Card.Body>
  </Card>
</Col>

        <Col md={6}>
          <Card style={{height:417}}>
            <Card.Header>My Created Meetings</Card.Header>
            <Card.Body>
              {loading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : error ? (
                <Alert variant="danger">{error}</Alert>
              ) : (
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Room Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {meetings.map((
meeting, index) => (
  <tr key={index}>
  <td>{meeting.roomName}</td>
  <td>{new Date(meeting.date).toLocaleDateString()}</td>
  <td>{meeting.time}</td>
  <td>
  <Button
  variant='danger'
  style={{ padding: '5px 10px' }}
  onClick={() => deleteMeeting(meeting._id)}
  >
  <FaTrash />
  </Button>
  <Button
  variant='success'
  style={{ padding: '5px 10px' }}
  onClick={() => joinMeeting(meeting.roomName, meeting.teacherName)}
  >
  <FaVideo />
  </Button>
  </td>
  </tr>
  ))}
  </tbody>
  </Table>
  </div>
  )}
  </Card.Body>
  </Card>
  </Col>
  </Row>
  </Container>
  );
  };
  
  export default TeacherMeetingPage;