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
      <Layout header={1} footer={3} className="" mainClassName="">
        <br />
        <br />
        <br />
        
      <Header />
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative ">
              <img
                src={mainbanner1}
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>From $999.00 or $41.62/mo.</p>
                <Link className="button">BUY NOW</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
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
              <div className="small-banner position-relative ">
                <img
                  src={catbanner3}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />

              </div>
              <div className="small-banner position-relative ">
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
      <div style={{paddingLeft:650}}><Link to="/shop/products" className="button">start shopping</Link></div>
      <br />

      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container>

      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src={famous1}
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399or $16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src={famous2}
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Studio Display</h5>
                <h6 className="text-dark">600 nits of brightness.</h6>
                <p className="text-dark">27-inch 5K Retina display</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src={famous3}
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">smartphones</h5>
                <h6 className="text-dark">Smartphone 13 Pro.</h6>
                <p className="text-dark">
                  Now in Green. From $999.00 or $41.62/mo. for 24 mo. Footnote*
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src={famous4}
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">home speakers</h5>
                <h6 className="text-dark">Room-filling sound.</h6>
                <p className="text-dark">
                  From $699 or $116.58/mo. for 12 mo.*
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          <SpecialProduct />
          <SpecialProduct />
          <SpecialProduct />
          <SpecialProduct />
        </div>
      </Container>

      </Layout>
    </>
  )
}

export default Home