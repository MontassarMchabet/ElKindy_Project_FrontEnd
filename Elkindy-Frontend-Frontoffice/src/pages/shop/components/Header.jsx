import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../public/images/compare.svg";
import wishlist from "../public/images/wishlist.svg";
import cart from "../public/images/cart.svg";
import { useDispatch, useSelector } from "react-redux";
const Header = () => {

  const dispatch = useDispatch();
  const cartState = useSelector(state =>state?.product?.cartProducts);
  const [total, setTotal] = useState(null);

  useEffect(()=>{
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++){
      sum = sum + (Number(cartState[index].quantity) * Number(cartState[index].price))
    }
    setTotal(sum);
  },[cartState])

  return (
    <>
      <header style={{ borderRadius: 40 }} className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-5">
              <div className="header-upper-links d-flex flex-wrap justify-content-between align-items-center">
                {<div className="mb-3 mb-lg-0">
                  <Link
                    to="/shop/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare" />
                    <p style={{ color: "white" }} className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>}
                <div className="mb-3 mb-lg-0">
                  <Link
                    to="/shop/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p style={{ color: "white" }} className="mb-0">
                      Favourite <br /> wishlist
                    </p>
                  </Link>
                </div>
                <div className="mb-3 mb-lg-0">
                  <Link
                    to="/shop/my-orders"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <p style={{ color: "white" }} className="mb-0">
                      My Orders
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/shop/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">
                        {cartState?.length ? cartState?.length : 0}
                      </span>
                      <p style={{ color: "white" }} className="mb-0">
                        {total ? total : 0} DT
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
  
};

export default Header;