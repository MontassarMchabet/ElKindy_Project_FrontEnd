import React from 'react'
import "../App.css";
import Header from '../components/Header'
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import mainbanner1 from "../public/images/aaa1.jpg";
import catbanner1 from "../public/images/aaa2.jpeg";
import catbanner2 from "../public/images/aaa3.jpeg";
import catbanner3 from "../public/images/aaa4.jpg";
import catbanner4 from "../public/images/aaa6.jpg";
import camera from "../public/images/camera.jpg";
import tv from "../public/images/tv.jpg";
import headphone from "../public/images/headphone.jpg";
import famous1 from "../public/images/famous-1.webp";
import famous2 from "../public/images/famous-2.webp";
import famous3 from "../public/images/famous-3.webp";
import famous4 from "../public/images/famous-4.webp";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import Layout from '../../../layouts/Layout';
//import { services } from "../utils/Data";

function Home() {
  return (
    <>
      <Layout header={4} footer={3} className="" mainClassName="">
        <br />
        <br />
        <br />
        <br />
        <Header />
        <Container class1="home-wrapper-1 py-5">
          <div className="row">
            <div className="col-lg-6">
              <div className="main-banner position-relative">
                <img
                  src={mainbanner1}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="main-banner-content position-absolute">
                  <h4>Elkendy Shop</h4>
                  <h5>instruments</h5>
                  <h5>And</h5>
                  <h5>books</h5>
                  <Link className="button">BUY NOW</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
                <div className="small-banner position-relative">
                  <img
                    src={catbanner1}
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                </div>
                <div className="small-banner position-relative">
                  <img
                    src={catbanner2}
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                </div>
                <div className="small-banner position-relative">
                  <img
                    src={catbanner3}
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                </div>
                <div className="small-banner position-relative">
                  <img
                    src={catbanner4}
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
        <div className="text-center mt-4">
          <Link to="/shop/products" className="button">start shopping</Link>
        </div>
        <br />
      </Layout>
    </>
  );
  
}

export default Home