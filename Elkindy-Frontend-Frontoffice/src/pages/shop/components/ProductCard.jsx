import React from "react";
import ReactStars from "react-rating-stars-component";
import { useLocation, useNavigate } from "react-router-dom";
import prodcompare from "../public/images/prodcompare.svg";
import wish from "../public/images/wish.svg";
import addcart from "../public/images/add-cart.svg";
import view from "../public/images/view.svg";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/productSlice";

const ProductCard = (props) => {
  const { grid, data } = props;
  let location = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const addToWish = (prodId) => {
    if (prodId) {
      dispatch(addToWishlist(prodId));
    } else {
      console.error("Product ID is undefined");
    }
  }

  return (
    <>
      {Array.isArray(data) && data.map((item, index) => {
        return (
          <div
            key={index}
            className={` ${location.pathname == "/shop/products" ? `gr-${grid}` : "col-3"
              } `}
          >
            <div className="product-card position-relative">
              <div className="wishlist-icon position-absolute">
                <button className="border-0 bg-transparent" onClick={(e) => { addToWish(item._id) }}>
                  <img src={wish} alt="wishlist" />
                </button>
              </div>
              <div  >
                <img src={item.images} className="img-fluid mx-auto" alt="product image" style={{ height: 250 }} />
              </div>
              <div className="product-details">
                <h6 className="brand">{item.title}</h6>
                <h5 className="product-title">
                  {item.category}
                </h5>
                <ReactStars
                  count={5}
                  size={24}
                  value={item.totalrating.toString()}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
                  {item.description}
                </p>
                <p className="price">{item.price}DT</p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <button className="border-0 bg-transparent">
                    <img src={prodcompare} alt="compare" />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img onClick={() => navigate("/shop/products/" + item._id)} src={view} alt="view" />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img src={addcart} alt="addcart" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })
      }

    </>
  );
};

export default ProductCard;