import React from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api';
import Cookies from 'js-cookie';
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const DeveloperAreaTabs = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedToken = Cookies.get('token');
        const storedRefreshToken = Cookies.get('refreshToken');
        const decodedToken = jwtDecode(storedToken);
        const { userId, role } = decodedToken;

        const response = await api.get(`http://localhost:9090/api/auth/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);
  ////////////////////////////////////////////////////////////** */
  //EDIT PROFILE
  const [profilePictureFile, setProfilePictureFile] = useState("");

  const handleEditClick = () => {
    setShowModal(true);
    setFormData(user);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleProfilePictureChange = (e) => {
    setProfilePictureFile(e.target.files[0]);
  };
  const handleSubmitClient = async (e) => {
    e.preventDefault();
    try {
      if (profilePictureFile) {
        const formDataToSend = new FormData();
        formDataToSend.append("image", profilePictureFile);

        const uploadResponse = await api.post(
          "http://localhost:9090/api/image/uploadimage",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        user.profilePicture = uploadResponse.data.downloadURL[0];
      }

      await api.patch(`http://localhost:9090/api/auth/editClient/${user._id}`, formData);
      const response = await api.get(`http://localhost:9090/api/auth/user/${user._id}`);
      setUser(response.data);
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleSubmitAdmin = async (e) => {
    e.preventDefault();
    try {
      console.log('user:', user);
      console.log('user id:', user._id);
      await api.patch(`http://localhost:9090/api/auth/editAdminProf/${user._id}`, formData);
      const response = await api.get(`http://localhost:9090/api/auth/user/${user._id}`);
      setUser(response.data);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };


  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-block' }}>
          <img
            src={`${user?.profilePicture}`}
            style={{ boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", width: "200px", height: "200px", borderRadius: "50%", marginBottom: "15px" }}
          />
        </div>
        <br />
        <div>
          <MdEdit
            size={30}
            style={{ margin: "auto", display: 'block' }}
            onClick={handleEditClick}
          />
        </div>
      </div>
      <br />
      {user && !user.isSubscribed && (
        <p style={{ marginLeft: "30px" }}>
          You're not subscribed to EL Kindy yet.{" "}
          <Link to="/subscribe">Click here to subscribe now!</Link>
        </p>
      )}
      <ul className="nav nav-tabs" id="myTab" role="tablist" style={{ marginTop: "30px" }}>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="details-tab"
            data-bs-toggle="tab"
            data-bs-target="#details-tab-pane"
            type="button"
            role="tab"
            aria-controls="details-tab-pane"
            aria-selected="true">
            My Details
          </button>
        </li>
      </ul>

      <div className="tab-content" id="myTabContent" >
        <div
          className="tab-pane fade show active"
          id="details-tab-pane"
          role="tabpanel"
          aria-labelledby="details-tab"
          tabIndex="0">
          <div className="developer-info-wrap">



            {(user?.role === 'admin' || user?.role === 'prof') ? (
              <>
                <div className="row">
                  <div className="col-md-6">
                    <ul className="list-wrap">
                      <li>
                        <div className="icon">
                          <img src="/img/icon/developer_icon01.png" alt="" />
                        </div>
                        <div className="content">
                          <span>Full name:</span>
                          <p>{`${user?.name} ${user?.lastname}`}</p>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <img src="/img/icon/developer_icon02.png" alt="" />
                        </div>
                        <div className="content">
                          <span>Email:</span>
                          <p>{`${user?.email}`}</p>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <img src="/img/icon/developer_icon05.png" alt="" />
                        </div>
                        <div className="content">
                          <span>Birth date:</span>
                          <p>{user?.dateOfBirth ? user.dateOfBirth.substring(0, 10) : ''}</p>
                        </div>
                      </li>
                    </ul>
                  </div >



                  <div className="col-md-6">
                    <ul className="list-wrap">
                      <li>
                        <div className="icon">
                          <img src="/img/icon/developer_icon03.png" alt="" />
                        </div>
                        <div className="content">
                          <span>Username</span>
                          <p>{`${user?.username}`}</p>
                        </div>
                      </li>

                      <li>
                        <div className="icon">
                          <img src="/img/icon/developer_icon04.png" alt="" />
                        </div>
                        <div className="content">
                          <span>Parent Phone:</span>
                          <p>{`${user?.phoneNumber}`}</p>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <img src="/img/icon/developer_icon06.png" alt="" />
                        </div>
                        <div className="content">
                          <span>Parent CIN:</span>
                          <p>{`${user?.cinNumber}`}</p>
                        </div>
                      </li>

                    </ul>
                  </div>
                </div >

              </>
            ) : (
              <>

                <div className="row">
                  <div className="col-md-6">
                    <ul className="list-wrap">
                      <li>
                        <div className="icon">
                          <img src="/img/icon/developer_icon01.png" alt="" />
                        </div>
                        <div className="content">
                          <span>Full name:</span>
                          <p>{`${user?.name} ${user?.lastname}`}</p>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <img src="/img/icon/developer_icon02.png" alt="" />
                        </div>
                        <div className="content">
                          <span>Email:</span>
                          <p>{`${user?.email}`}</p>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <img src="/img/icon/developer_icon05.png" alt="" />
                        </div>
                        <div className="content">
                          <span>Birth date:</span>
                          <p>{user?.dateOfBirth ? user.dateOfBirth.substring(0, 10) : ''}</p>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <img src="/img/icon/developer_icon05.png" alt="" />
                        </div>
                        <div className="content">
                          <span>Instrument:</span>
                          <p>{`${user?.instrument}`}</p>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <img src="/img/icon/developer_icon05.png" alt="" />
                        </div>
                        <div className="content">
                          <span>Father's Occupation:</span>
                          <p>{`${user?.fatherOccupation}`}</p>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <img src="/img/icon/developer_icon05.png" alt="" />
                        </div>
                        <div className="content">
                          <span>School Grade:</span>
                          <p>{`${user?.level}`}</p>
                        </div>
                      </li>
                    </ul>
                  </div >



                  <div className="col-md-6">
                    <ul className="list-wrap">
                      <li>
                        <div className="icon">
                          <img src="/img/icon/developer_icon03.png" alt="" />
                        </div>
                        <div className="content">
                          <span>Username</span>
                          <p>{`${user?.username}`}</p>
                        </div>
                      </li>

                      <li>
                        <div className="icon">
                          <img src="/img/icon/developer_icon04.png" alt="" />
                        </div>
                        <div className="content">
                          <span>Parent Phone:</span>
                          <p>{`${user?.parentPhoneNumber}`}</p>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <img src="/img/icon/developer_icon06.png" alt="" />
                        </div>
                        <div className="content">
                          <span>Parent CIN:</span>
                          <p>{`${user?.parentCinNumber}`}</p>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <img src="/img/icon/developer_icon05.png" alt="" />
                        </div>
                        <div className="content">
                          <span>Other Instruments:</span>
                          <p>{`${user?.otherInstruments}`}</p>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <img src="/img/icon/developer_icon05.png" alt="" />
                        </div>
                        <div className="content">
                          <span>Mother's Occupation:</span>
                          <p>{`${user?.motherOccupation}`}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div >
              </>
            )}


          </div >
        </div >
      </div >

      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">

                {user?.role === 'client' && (
                  <form onSubmit={handleSubmitClient}>
                    {/* Client form fields */}
                    <formData id="profilePicture" mt={4}>
                      <img src={user.profilePicture} alt="Profile Picture" style={{ maxWidth: "150px", maxHeight: "150px", borderRadius: "50%", margin: "auto" }} />
                      <input type="file" name="profilePicture" onChange={handleProfilePictureChange} />
                    </formData>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastname">Lastname</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="parentPhoneNumber">Parent Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="parentPhoneNumber"
                        name="parentPhoneNumber"
                        value={formData.parentPhoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="parentCinNumber">Parent CIN Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="parentCinNumber"
                        name="parentCinNumber"
                        value={formData.parentCinNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dateOfBirth">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="instrument">Instrument</label>
                      <input
                        type="text"
                        className="form-control"
                        id="instrument"
                        name="instrument"
                        value={formData.instrument}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="fatherOccupation">Father's Occupation</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fatherOccupation"
                        name="fatherOccupation"
                        value={formData.fatherOccupation}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="level">School Grade</label>
                      <input

                        type="text"
                        className="form-control"
                        id="level"
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="otherInstruments">Other Instruments</label>
                      <input

                        type="text"
                        className="form-control"
                        id="otherInstruments"
                        name="otherInstruments"
                        value={formData.otherInstruments}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="motherOccupation">Mother's Occupation</label>
                      <input
                        type="text"
                        className="form-control"
                        id="motherOccupation"
                        name="motherOccupation"
                        value={formData.motherOccupation}
                        onChange={handleInputChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                  </form>
                )}
                {(user?.role === 'admin' || user?.role === 'prof') && (
                  <form onSubmit={handleSubmitAdmin}>
                    {/* Admin/Prof form fields */}
                    <img src={`${user.profilePicture}`} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastname">Lastname</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cinNumber">CIN Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="cinNumber"
                        name="cinNumber"
                        value={formData.cinNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dateOfBirth">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                    </div>


                    <button type="submit" className="btn btn-primary">Save Changes</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default DeveloperAreaTabs;
