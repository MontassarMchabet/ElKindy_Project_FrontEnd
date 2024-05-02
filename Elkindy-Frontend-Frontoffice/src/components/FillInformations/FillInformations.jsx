import React, { useRef, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api';
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";
const imageCancel = require('../../img/elkindy.jpg');

const FillInformations = () => {
    const [formData, setFormData] = useState({
        level: '',
        dateOfBirth: '',
        parentCinNumber: '',
        parentPhoneNumber: '',
        fatherOccupation: '',
        motherOccupation: '',
        instrument: '',
        otherInstruments: '',
    });
    const [navigateToHome, setNavigateToHome] = useState(false);

    const addInformation = async () => {
        try {
            const storedToken = Cookies.get('token');
            const decodedToken = jwtDecode(storedToken);
            const { userId, role } = decodedToken;

            const response = await api.patch(`http://localhost:9090/api/auth/editClient/${userId}`, formData);

            setNavigateToHome(true);
        } catch (error) {
            console.error('Error canceling subscription:', error);
        }
    };
    if (navigateToHome) {
        return <Navigate to="/" />;
    }
    const handleConfirm = () => {
        addInformation();
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const yesButtonStyle = {
        backgroundColor: '#4169E1',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px',
    };

    return (
        <div>
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.5)",
                    zIndex: 9998,
                }}
            />
            <div
                style={{
                    background: "white",
                    width: "700px",
                    height: "900px",
                    position: "fixed",
                    borderRadius: "60px",
                    boxShadow: "0px 0px 10000px rgba(255, 255, 255, 0.5)",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 9999,
                }}
            >
                <div style={{
                    marginLeft: "20px",
                    marginRight: "20px",
                    position: "absolute",
                    marginTop: "-30px",
                    width: "62%",
                }}>
                    <img src={imageCancel}
                        style={{
                            width: "300px",
                            height: "150px",
                            marginLeft: "60px",
                        }}
                    />
                    <h5 className="modal-title" style={{ textAlign: "center" }}>
                        Welcome !
                    </h5>
                    <label style={{ textAlign: "center" }}>
                        Please Fill the informations to complete your subscription
                    </label>
                    <br />
                    <br />
                    <div style={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <p style={{ marginBottom: "10px" }}>Choose your level :</p>
                        <select
                            name="level"
                            value={formData.level}
                            style={{ marginBottom: "10px" }}
                            onChange={handleChange}
                        >
                            {['Initiation', 'Préparatoire', '1ère année', '2ème année', '3ème année', '4ème année', '5ème année', '6ème année', '7ème année'].map((level, index) => (
                                <option key={index} value={level}>{level}</option>
                            ))}
                        </select>
                        <p style={{ marginBottom: "10px" }}>Birth Date :</p>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            placeholder="Enter your birth date"
                            style={{ marginBottom: "10px" }}
                            onChange={handleChange}
                        />
                        <div style={{ display: "flex", marginBottom: "10px" }}>
                            <div style={{ marginRight: "20px" }}>
                                <p style={{ marginBottom: "5px" }}>Parent CIN:</p>
                                <input
                                    type="text"
                                    name="parentCinNumber"
                                    value={formData.parentCinNumber}
                                    placeholder="8 digital number"
                                    style={{ marginBottom: "10px" }}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <p style={{ marginBottom: "5px" }}>Parent Phone Number:</p>
                                <input
                                    type="text"
                                    name="parentPhoneNumber"
                                    value={formData.parentPhoneNumber}
                                    placeholder="8 digital number"
                                    style={{ marginBottom: "10px" }}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div style={{ display: "flex", marginBottom: "10px" }}>
                            <div style={{ marginRight: "20px" }}>
                                <p style={{ marginBottom: "5px" }}>Father Occupation:</p>
                                <input
                                    type="text"
                                    name="fatherOccupation"
                                    value={formData.fatherOccupation}
                                    placeholder="Your father occupation"
                                    style={{ marginBottom: "10px" }}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <p style={{ marginBottom: "5px" }}>Mother Occupation:</p>
                                <input
                                    type="text"
                                    name="motherOccupation"
                                    value={formData.motherOccupation}
                                    placeholder="Your mother occupation"
                                    style={{ marginBottom: "10px" }}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <p style={{ marginBottom: "10px" }}>Instrument :</p>
                        <input
                            type="text"
                            name="instrument"
                            value={formData.instrument}
                            placeholder="Instrument you want to learn"
                            style={{ marginBottom: "10px" }}
                            onChange={handleChange}
                        />
                        <p style={{ marginBottom: "10px" }}>Other Instruments :</p>
                        <input
                            type="text"
                            name="otherInstruments"
                            value={formData.otherInstruments}
                            placeholder="Other instruments you want to learn"
                            style={{ marginBottom: "10px" }}
                            onChange={handleChange}
                        />
                        <br />
                        <button onClick={handleConfirm} style={yesButtonStyle}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FillInformations
