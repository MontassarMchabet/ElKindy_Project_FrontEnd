import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../public/images/watch.jpg";
import cross from "../public/images/cross.svg";
import Container from "../components/Container";
import Header from "../components/Header";
import Layout from "../../../layouts/Layout";

const CompareProduct = () => {
  return (
    <>
      <Layout header={4} footer={3} className="" mainClassName="">
        <br />
        <br />
        <br />
        <br />
        
      <Header />
      <Meta title={"Compare Products"} />
      <BreadCrumb title="Compare Products" />
      <Container class1="compare-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="compare-product-card position-relative">
              <img
                src={cross}
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="product-card-image">
                <img src={watch} alt="watch" />
              </div>
              <div className="compare-product-details">
                <h5 className="title">
                  Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi+3G Tablet
                </h5>
                <h6 className="price mb-3 mt-3">$ 100</h6>

                <div>
                  <div className="product-detail">
                    <h5>Brand:</h5>
                    <p>Havels</p>
                  </div>
                  <div className="product-detail">
                    <h5>Type:</h5>
                    <p>Watch</p>
                  </div>
                  <div className="product-detail">
                    <h5>Availablity:</h5>
                    <p>In Stock</p>
                  </div>
                  <div className="product-detail">
                    <h5>Size:</h5>
                    <div className="d-flex gap-10">
                      <p>S</p>
                      <p>M</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="compare-product-card position-relative">
              <img
                src={cross}
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="product-card-image">
                <img src={watch} alt="watch" />
              </div>
              <div className="compare-product-details">
                <h5 className="title">
                  Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi+3G Tablet
                </h5>
                <h6 className="price mb-3 mt-3">$ 100</h6>

                <div>
                  <div className="product-detail">
                    <h5>Brand:</h5>
                    <p>Havels</p>
                  </div>
                  <div className="product-detail">
                    <h5>Type:</h5>
                    <p>Watch</p>
                  </div>
                  <div className="product-detail">
                    <h5>Availablity:</h5>
                    <p>In Stock</p>
                  </div>
                  <div className="product-detail">
                    <h5>Size:</h5>
                    <div className="d-flex gap-10">
                      <p>S</p>
                      <p>M</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      </Layout>
    </>
  );
};

export default CompareProduct;