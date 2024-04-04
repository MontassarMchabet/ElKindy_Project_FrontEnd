// import React, { useState } from "react";
// import './styles.css';
// import Layout from "../../layouts/Layout";

// const ReservationPage = () => {
//   const [seatAvailable, setSeatAvailable] = useState([
//     'A1', 'A2', 'A3',
//     'B1', 'B2', 'B3',
//     'C1', 'C2', 'C3'
//   ]);
//   const [seatReserved, setSeatReserved] = useState([]);

//   const handleSeatSelect = (seat) => {
//     if (seatReserved.includes(seat)) {
//       setSeatAvailable([...seatAvailable, seat]);
//       setSeatReserved(seatReserved.filter(res => res !== seat));
//     } else {
//       setSeatReserved([...seatReserved, seat]);
//       setSeatAvailable(seatAvailable.filter(res => res !== seat));
//     }
//   };

//   return (
//     <Layout header={4} footer={1} className="" mainClassName=""></Layout>
//       <section className="blog-details-area pt-175 pb-120">
//         <div className="container">
//           <div className="row justify-content-center">
//             <div>
//               <h1>Seat Reservation System</h1>
//               <DrawGrid
//                 seat={seatAvailable.concat(seatReserved)}
//                 available={seatAvailable}
//                 reserved={seatReserved}
//                 onClickSeat={handleSeatSelect}
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// const DrawGrid = ({ seat, available, reserved, onClickSeat }) => {
//   return (
//     <section className="blog-details-area pt-175 pb-120">
//       <div className="container">
//         <div className="row justify-content-center">
//           <table className="grid">
//             <tbody>
//               <tr>
//                 {seat.map(row =>
//                   <td
//                     className={reserved.includes(row) ? 'reserved' : 'available'}
//                     key={row}
//                     onClick={() => onClickSeat(row)}
//                   >{row}</td>)}
//               </tr>
//             </tbody>
//           </table>
//           <AvailableList available={available} />
//           <ReservedList reserved={reserved} />
//         </div>
//       </div>
//     </section>
//   );
// };

// const AvailableList = ({ available }) => {
//   const seatCount = available.length;
//   return (
//     <section className="blog-details-area pt-175 pb-120">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="left">
//             <h4>Available Seats: ({seatCount === 0 ? 'No seats available' : seatCount})</h4>
//             <ul>
//               {available.map(res => <li key={res}>{res}</li>)}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const ReservedList = ({ reserved }) => {
//   return (
//     <div className="right">
//       <h4>Reserved Seats: ({reserved.length})</h4>
//       <ul>
//         {reserved.map(res => <li key={res}>{res}</li>)}
//       </ul>
//     </div>
//   );
// };

// export default ReservationPage;
import React, { useState } from "react";
import Layout from "../../layouts/Layout";
import './styles.css';

const ReservationPage = () => {
  const [seatAvailable, setSeatAvailable] = useState([
    'A1', 'A2', 'A3',
    'B1', 'B2', 'B3',
    'C1', 'C2', 'C3'
  ]);
  const [seatReserved, setSeatReserved] = useState([]);

  const handleSeatSelect = (seat) => {
    if (seatReserved.includes(seat)) {
      setSeatAvailable([...seatAvailable, seat]);
      setSeatReserved(seatReserved.filter(res => res !== seat));
    } else {
      setSeatReserved([...seatReserved, seat]);
      setSeatAvailable(seatAvailable.filter(res => res !== seat));
    }
  };

  return (
    <Layout header={4} footer={1} className="" mainClassName="">
      <section className="blog-details-area pt-175 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <h1>Seat Reservation System</h1>
              <DrawGrid
                seat={seatAvailable.concat(seatReserved)}
                available={seatAvailable}
                reserved={seatReserved}
                onClickSeat={handleSeatSelect}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const DrawGrid = ({ seat, available, reserved, onClickSeat }) => {
  return (
    <div className=" justify-content-center">
      <table className="grid">
        <tbody>
          <tr>
            {seat.map(row =>
              <td
                className={reserved.includes(row) ? 'reserved' : 'available'}
                key={row}
                onClick={() => onClickSeat(row)}
              >{row}</td>)}
          </tr>
        </tbody>
      </table>
      <AvailableList available={available} />
      <ReservedList reserved={reserved} />
      <div className="button-container">
  <button className="custom-button">Pay Your tickets</button>
</div>
      
    </div>
  );
};

const AvailableList = ({ available }) => {
  const seatCount = available.length;
  return (
    <div className="left">
      <h4>Available Seats: ({seatCount === 0 ? 'No seats available' : seatCount})</h4>
      <ul>
        {available.map(res => <li key={res}>{res}</li>)}
      </ul>
    </div>
  );
};

const ReservedList = ({ reserved }) => {
  return (
    <div className="right">
      <h4>Reserved Seats: ({reserved.length})</h4>
      <ul>
        {reserved.map(res => <li key={res}>{res}</li>)}
      </ul>
    </div>
  );
};

export default ReservationPage;
