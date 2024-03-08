import React from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api';
import Cookies from 'js-cookie';

const DeveloperAreaTabs = () => {
  const [user, setUser] = useState(null);

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

  return (
    <>
      <img
        src={`${user?.profilePicture}`}
        style={{ boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", width: "200px", height: "200px", borderRadius: "50%", marginLeft: "230px", marginBottom: "15px" }}
      />

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
                      <p>{`${user?.schoolGrade}`}</p>
                    </div>
                  </li>
                </ul>
              </div>



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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeveloperAreaTabs;
