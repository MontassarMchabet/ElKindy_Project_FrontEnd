import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api';
import Cookies from 'js-cookie';


const BannerOne = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const { userId } = decodedToken;

      api.get(`https://elkindy-project-backend.onrender.com/api/auth/user/${userId}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  let destinationUrl = 'https://el-kindy-project-front-end-t52l.vercel.app/elkindy#/signin';
  let buttonText = 'Subscribe now';

  if (user) {
    if (user.isSubscribed || user.role== "admin" || user.role== "prof") {
      destinationUrl = '/contact';
      buttonText = 'Contact us';
    } else {
      destinationUrl = '/subscribe';
      buttonText = 'Subscribe now';
    }
  }

  return (
    <section className="banner-area banner-bg">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="banner-img wow fadeInLeft" data-wow-delay=".4s">
              <img style={{ width: '900px' }} src="/img/banner/ytest.png" alt="" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="banner-content">
              <span className="sub-title wow fadeInUp" data-wow-delay=".2s">
                Amazing <strong>Starts</strong> Here
              </span>
              <h2 className="title wow fadeInUp" data-wow-delay=".4s">
                Explore the World of Music and Arts
              </h2>
              <Link
                to={destinationUrl}
                className="btn wow fadeInUp"
                data-wow-delay=".6s"
              >
                {buttonText}
                <span></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="banner-shape-wrap">
        <img src="/img/banner/banner_shape01.png" alt="" />
        <img
          src="/img/banner/banner_shape02.png"
          alt=""
          className="animationFramesOne"
        />
        <img
          src="/img/banner/banner_shape03.png"
          alt=""
          className="contactSwimmer"
        />
        <img src="/img/banner/banner_shape04.png" alt="" className="rotateme" />
        <img
          src="/img/banner/banner_shape05.png"
          alt=""
          className="animation1"
        />
        <img
          src="/img/banner/banner_shape06.png"
          alt=""
          className="ribbonRotate"
        />
        <img
          src="/img/banner/banner_shape07.png"
          alt=""
          className="float-bob-x"
        />
      </div>
    </section>
  );
};

export default BannerOne;
