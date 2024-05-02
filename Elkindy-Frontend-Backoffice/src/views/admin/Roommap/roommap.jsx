import React, { useState } from 'react';
import './room.css'
const Room = ({ room, status, onClick }) => {
  return (
    <div
      className={`room ${status}`}
      onClick={() => onClick(room.id)}
    >
      {room.name}
    </div>
  );
};

const FloorPlan = () => {
  // Liste de salles avec état initial de disponibilité
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Salle 1', status: 'available' },
    { id: 2, name: 'Salle 2', status: 'occupied' },
    { id: 3, name: 'Salle 3', status: 'available' },
  ]);

  // Fonction pour changer le statut de disponibilité d'une salle
  const toggleRoomStatus = (roomId) => {
    setRooms(rooms.map((room) => 
      room.id === roomId
        ? { ...room, status: room.status === 'available' ? 'occupied' : 'available' }
        : room
    ));
  };

  return (
    <div className="floor-plan">
      {rooms.map((room) => (
        <Room key={room.id} room={room} status={room.status} onClick={toggleRoomStatus} />
      ))}
    </div>
  );
};

export default FloorPlan;
