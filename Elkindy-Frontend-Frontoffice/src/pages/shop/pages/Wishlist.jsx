import React, { useEffect } from "react";
import "../App.css";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import Container from "../components/Container";
import Header from "../components/Header";
import Layout from "../../../layouts/Layout";
import cross from "../public/images/cross.svg";
import watch from "../public/images/watch.jpg";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, getUserProductWishlist } from "../features/productSlice";




const Wishlist = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    getWishlistFromDb();
  }, []);
  const getWishlistFromDb = () => {
    dispatch(getUserProductWishlist());
  };
  const wishlistState = useSelector((state) => state?.product?.wishlist?.wishlist);

  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 300)
  }

  return (
    <>
      <Layout header={4} footer={3} className="" mainClassName="">
        <br />
        <br />
        <br />
        <br />

        <Header />
        <Meta title={"Wishlist"} />
        <BreadCrumb title="Wishlist" />
        <Container class1="wishlist-wrapper home-wrapper-2 py-5">
          <div className="row">
            {wishlistState && wishlistState.map((item, index) => {
              return (
                <div className="col-3" key={index}>
                  <div className="wishlist-card position-relative">
                    <img onClick={() => { removeFromWishlist(item._id) }}
                      src={cross}
                      alt="cross"
                      className="position-absolute cross img-fluid"
                    />
                    <div className="wishlist-card-image">
                      <img
                        src={item.images}
                        className="img-fluid w-100"
                        alt="watch"
                      />
                    </div>
                    <div className="py-3 px-3">
                      <h5 className="title">
                        {item.title}
                      </h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value={item.totalrating.toString()}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <h6 className="price">{item.price}DT</h6>
                    </div>
                  </div>
                </div>
              );
            })

            }
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Wishlist;