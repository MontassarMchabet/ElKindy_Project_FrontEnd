import React from "react";
import { Link } from "react-router-dom";

const FooterOne = () => {
  return (
    <footer>
      <div className="footer-area">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <div className="footer-widget">
                  <div className="logo">
                    <Link to="/">
                      <img src="/img/logo/logokindy.png" alt="" />
                    </Link>
                  </div>
                  <div className="footer-social">
                    <ul className="list-wrap">
                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li className="active">
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-google-plus-g"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-contact">
                    <span>For Support</span>
                    <h2 className="title">
                      <a href="tel:0123456789">+216 20 669 545</a>
                    </h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="footer-widget">
                  <h4 className="fw-title">Primary Pages</h4>
                  <div className="fw-link">
                    <ul className="list-wrap">
                      <li>
                        <Link to="/index">Home</Link>
                      </li>
                      <li>
                        <Link to="/about-us">About</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>
                      <li>
                        <Link to="/services-details">Service</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="footer-widget">
                  <h4 className="fw-title">Pages</h4>
                  <div className="fw-link">
                    <ul className="list-wrap">
                      <li>
                        <Link to="/about-us">About</Link>
                      </li>
                      <li>
                        <Link to="/contact">Pricing</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>
                      <li>
                        <Link to="/contact">Request for Demo</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="footer-widget">
                  <h4 className="fw-title">Contact info</h4>
                  <div className="footer-about">
                    <ul className="list-wrap">
                      <li>
                        <img src="/img/icon/phone_icon.svg" alt="" />
                        <a href="tel:0123456789">+216 20 669 545</a>
                      </li>
                      <li>
                        <img src="/img/icon/mail_icon.svg" alt="" />
                        <a href="mailto:conservatoireelkindy@gmail.com">
                          conservatoireelkindy@gmail.com</a>
                      </li>
                      <li>
                        <img src="/img/icon/loction_icon.svg" alt="" />
                        <span>Villa N°24, Rue Manzel Mabrouk City olympique, Tunis, Tunisia</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="cart-img">
                  <img src="/img/images/cart_img.png" alt="" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="copyright-text text-end">
                  <p>© 2024 DevMasters. All Rights Reserved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterOne;
