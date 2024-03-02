import React from "react";

const ContactForm = () => {
  return (
    <div className="contact-form-wrap">
      <form action="#">
        <div className="row">
          <div className="col-md-6">
            <div className="form-grp">
              <input type="text" placeholder="Name" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-grp">
              <input type="email" placeholder="Email" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-grp">
              <input type="text" placeholder="Your Number" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-grp">
              <input type="text" placeholder="Subject" />
            </div>
          </div>
        </div>
        <div className="form-grp">
          <textarea
            name="message"
            placeholder="Write your message here"
          ></textarea>
        </div>
        <button type="submit" className="btn">
          Submit Now <span></span>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
