import React from "react";

const InnerContactInfo = () => {
  const info_items = [
    {
      src: "/img/icon/loction_icon03.png",
      title: "Address",
      desc: (
        <>
          <p>Villa N°24, Rue Manzel Mabrouk<br /> City olympique, Tunis, Tunisia</p>
        </>
      ),
    },
    {
      src: "/img/icon/mail_icon03.png",
      title: "Email",
      desc: (
        <>
          <a href="mailto:conservatoireelkindy@gmail.com">conservatoireelkindy@gmail.com</a>
        </>
      ),
    },
    {
      src: "/img/icon/phone_icon03.png",
      title: "Phone",
      desc: (
        <>
          <a href="tel:0123456789">+216 20 669 545</a>
        </>
      ),
    },
  ];

  return (
    <ul className="list-wrap">
      {info_items.map((x, index) => (
        <li key={index}>
          <div className="contact-info-item">
            <div className="icon">
              <img src={x.src} alt="" />
            </div>
            <div className="content">
              <h6 className="title">{x.title}</h6>
              {x.desc}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default InnerContactInfo;
