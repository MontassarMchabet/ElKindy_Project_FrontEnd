import React from "react";

const DeveloperAreaTabs = () => {
  return (
    <>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="details-tab"
            data-bs-toggle="tab"
            data-bs-target="#details-tab-pane"
            type="button"
            role="tab"
            aria-controls="details-tab-pane"
            aria-selected="true"
          >
            My Details
          </button>
        </li>

        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="awards-tab"
            data-bs-toggle="tab"
            data-bs-target="#awards-tab-pane"
            type="button"
            role="tab"
            aria-controls="awards-tab-pane"
            aria-selected="false"
          >
            My Awards
          </button>
        </li>
        
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="skils-tab"
            data-bs-toggle="tab"
            data-bs-target="#skils-tab-pane"
            type="button"
            role="tab"
            aria-controls="skils-tab-pane"
            aria-selected="false"
          >
            My Skils
          </button>
        </li>
      </ul>

      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="details-tab-pane"
          role="tabpanel"
          aria-labelledby="details-tab"
          tabIndex="0"
        >
          <div className="developer-info-wrap">
            <div className="row">
              <div className="col-md-6">
                <ul className="list-wrap">
                  <li>
                    <div className="icon">
                      <img src="/img/icon/developer_icon01.png" alt="" />
                    </div>
                    <div className="content">
                      <span>Name:</span>
                      <p>Jams Robot</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <img src="/img/icon/developer_icon02.png" alt="" />
                    </div>
                    <div className="content">
                      <span>Email:</span>
                      <p>Jams Robot</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <img src="/img/icon/developer_icon03.png" alt="" />
                    </div>
                    <div className="content">
                      <span>Language:</span>
                      <p>Jams Robot</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-wrap">
                  <li>
                    <div className="icon">
                      <img src="/img/icon/developer_icon04.png" alt="" />
                    </div>
                    <div className="content">
                      <span>Phone No:</span>
                      <p>8 (495) 989—20—11</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <img src="/img/icon/developer_icon05.png" alt="" />
                    </div>
                    <div className="content">
                      <span>Address:</span>
                      <p>Ranelagh Place, L3 5UL, England</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <img src="/img/icon/developer_icon06.png" alt="" />
                    </div>
                    <div className="content">
                      <span>Nationality:</span>
                      <p>English, Russian, Frisian</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="awards-tab-pane"
          role="tabpanel"
          aria-labelledby="awards-tab"
          tabIndex="0"
        >
          <div className="developer-info-wrap">
            <div className="row">
              <div className="col-md-6">
                <ul className="list-wrap">
                  <li>
                    <div className="icon">
                      <img src="/img/icon/developer_icon01.png" alt="" />
                    </div>
                    <div className="content">
                      <span>Name:</span>
                      <p>Jams Robot</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <img src="/img/icon/developer_icon02.png" alt="" />
                    </div>
                    <div className="content">
                      <span>Email:</span>
                      <p>Jams Robot</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <img src="/img/icon/developer_icon03.png" alt="" />
                    </div>
                    <div className="content">
                      <span>Language:</span>
                      <p>Jams Robot</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-wrap">
                  <li>
                    <div className="icon">
                      <img src="/img/icon/developer_icon04.png" alt="" />
                    </div>
                    <div className="content">
                      <span>Phone No:</span>
                      <p>8 (495) 989—20—11</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <img src="/img/icon/developer_icon05.png" alt="" />
                    </div>
                    <div className="content">
                      <span>Address:</span>
                      <p>Ranelagh Place, L3 5UL, England</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <img src="/img/icon/developer_icon06.png" alt="" />
                    </div>
                    <div className="content">
                      <span>Nationality:</span>
                      <p>English, Russian, Frisian</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="skils-tab-pane"
          role="tabpanel"
          aria-labelledby="skils-tab"
          tabIndex="0"
        >
          <div className="developer-info-wrap">
            <div className="row">
              <div className="col-md-6">
                <ul className="list-wrap">
                  <li>
                    <div className="icon">
                      <img src="/img/icon/developer_icon01.png" alt="" />
                    </div>
                    <div className="content">
                      <span>Name:</span>
                      <p>Jams Robot</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <img src="/img/icon/developer_icon02.png" alt="" />
                    </div>
                    <div className="content">
                      <span>Email:</span>
                      <p>Jams Robot</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <img src="/img/icon/developer_icon03.png" alt="" />
                    </div>
                    <div className="content">
                      <span>Language:</span>
                      <p>Jams Robot</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-wrap">
                  <li>
                    <div className="icon">
                      <img src="/img/icon/developer_icon04.png" alt="" />
                    </div>
                    <div className="content">
                      <span>Phone No:</span>
                      <p>8 (495) 989—20—11</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <img src="/img/icon/developer_icon05.png" alt="" />
                    </div>
                    <div className="content">
                      <span>Address:</span>
                      <p>Ranelagh Place, L3 5UL, England</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <img src="/img/icon/developer_icon06.png" alt="" />
                    </div>
                    <div className="content">
                      <span>Nationality:</span>
                      <p>English, Russian, Frisian</p>
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
