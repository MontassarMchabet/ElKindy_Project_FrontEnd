import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useNavigate } from "react-router-dom";

const SpecialProduct = (props) => {
  const { data } = props;

  const navigate = useNavigate();
  return (
    <>
      {Array.isArray(data) && data.map((item, index) => {
        if (item.totalscore > 0 && item.totalrating > 3) {
          return (
            <div key={index} className="col-6 mb-3">
              <div className="special-product-card">
                <div className="d-flex justify-content-between">
                  <div>
                    <img src={item.images} width={300} className="img-fluid" alt="watch" />
                  </div>
                  <div style={{ width: "300px" }} className="special-product-content">
                    <h5 className="brand">{item.title}</h5>
                    <h6 className="title">
                      {item.description}
                    </h6>
                    <ReactStars
                      count={5}
                      size={24}
                      value={item?.totalrating}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="price">
                      <span className="red-p">{item.price}dt</span>
                    </p>
                    <div className="discount-till d-flex align-items-center gap-10">
                      <div className="d-flex gap-10 align-items-center">
                        <span className="badge p-3 bg-danger">Best Rating Product</span>
                      </div>
                    </div>
                    <br />
                    <button onClick={() => navigate("/shop/products/" + item._id)} className="button">see product</button>
                  </div>
                </div>
              </div>
            </div>
          )
        }

      })
      }
    </>
  );
};

export default SpecialProduct;