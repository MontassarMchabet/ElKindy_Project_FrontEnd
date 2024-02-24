import React from "react";
import HistoryAreaRoadmap from "./HistoryAreaRoadmap";

const HistoryArea = () => {
  return (
    <section className="history-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8">
            <div className="section-title white-title text-center mb-45">
              <span className="sub-title">Our Conservatory</span>
              <h2 className="title">Conservatory's History</h2>
            </div>
          </div>
        </div>
        <div className="history-inner">
          <div className="history-img">
            <img src="/img/images/image-8.jpg" alt="" />
          </div>
          <div className="row g-0 justify-content-end">
            <div className="col-lg-6">
              <div className="history-content">
                <h2 className="title">
                  The Intention was to Establish The Company
                </h2>
                <p>
                  Since 1999, Conservatoire El Kindy has nurtured generations of musical artists through rich and demanding education, guided by the expertise and dedication of our team of seasoned specialists and professors. Over the years, our institution has continuously supported and guided aspiring artists. Our conservatory students have excelled in national competitions such as the amateur soloists of Megrine and the Néapolis music days, among others. Their educational journey often culminates in the attainment of the Arab music diploma recognized by the Tunisian Ministry of Culture.
                </p>
                <ul className="list-wrap">
                  <li>
                    <i className="far fa-check"></i>Everyone can design at low
                    cost
                  </li>
                  <li>
                    <i className="far fa-check"></i>Low price for all our products
                  </li>
                  <li>
                    <i className="far fa-check"></i>Many events every month
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* road map */}
        <HistoryAreaRoadmap />
      </div>

      <div className="history-shape-wrap">
        <img src="/img/images/history_shape01.png" alt="" />
        <img src="/img/images/history_shape02.png" alt="" />
      </div>
    </section>
  );
};

export default HistoryArea;
