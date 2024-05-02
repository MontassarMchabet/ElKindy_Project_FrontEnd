import React from 'react';
import { useParams } from 'react-router-dom';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { Container, Spinner, Alert } from 'react-bootstrap';
import Layout from "../../layouts/Layout";

const MeetingPage = () => {
  const { roomName } = useParams();
  const [loading, setLoading] = React.useState(true); // Pour gérer l'état de chargement
  const [error, setError] = React.useState(null); // Pour gérer les erreurs

  // Simuler un délai de chargement pour montrer le spinner
  React.useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <Layout header={4} footer={1}>
      <Container className="meeting-container" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <Alert variant="danger">An error occurred while joining the meeting.</Alert>
        ) : (
          <div className="text-center">
            <br></br>
            <br></br>
            <h2>Welcome to the Meeting Room: {roomName}</h2> {/* Ajouter un titre */}
            <JitsiMeeting
            roomName={roomName}
            onApiReady={{}}
            domain='meet.jit.si'
            configOverwrite={{
              /* hosts:{}, // Disable host authentication */
              enableEmailInStats: false
            }}
            userInfo={{
              displayName: 'aaa',
              moderator: true, // Set teacher as moderator
              role:'moderator'
            }}
            interfaceConfigOverwrite = {{
              DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
          }}
            getIFrameRef={(node) => (node.style.height = '80vh')}
          />
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default MeetingPage;
