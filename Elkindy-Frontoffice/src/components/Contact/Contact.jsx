import React from "react";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <section className="contact-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title title-style-two white-title text-center mb-75">
              <span className="sub-title">Contact</span>
              <h2 className="title">I Want to Hear from You</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 order-0 order-lg-2">
            <div className="contact-info-wrap">
              <ul className="list-wrap">
                <li>
                  <div className="icon">
                    <img src="/img/icon/loction_icon02.png" alt="" />
                  </div>
                  <div className="content">
                    <h4 className="title">Address</h4>
                    <span>UN82 Dhanmondi Dhaka - 1207</span>
                  </div>
                </li>
                <li>
                  <div className="icon">
                    <img src="/img/icon/mail_icon02.png" alt="" />
                  </div>
                  <div className="content">
                    <h4 className="title">Email</h4>
                    <a href="mailto:your@email.com">your@email.com</a>
                  </div>
                </li>
                <li>
                  <div className="icon">
                    <img src="/img/icon/phone_icon02.png" alt="" />
                  </div>
                  <div className="content">
                    <h4 className="title">Phone</h4>
                    <a href="tel:0123456789">+12548789300</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
