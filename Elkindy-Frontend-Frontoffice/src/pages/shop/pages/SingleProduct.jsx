import React, { useEffect, useState } from "react";
import "../App.css";
import Sentiment from 'sentiment';
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom"
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Header from "../components/Header";
import Layout from "../../../layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addProdToCart, addRating, addToWishlist, getAProduct, getUserCart } from "../features/productSlice";
import Swal from "sweetalert2";
import ReactStars from "react-stars";

const SingleProduct = () => {
    const [quantity, setQuantity] = useState(1);
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const [alreadyAddedToWish, setAlreadyAddedToWish] = useState(false);
    const location = useLocation()
    const navigate = useNavigate()
    const getProductId = location.pathname.split("/")[3]
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product.product)
    const cartState = useSelector(state => state.product.cartProducts)

    useEffect(() => {
        dispatch(getAProduct(getProductId))
        dispatch(getUserCart())
    }, [])

    const addToWish = (prodId) => {
        if (prodId) {
            dispatch(addToWishlist(prodId));
            setAlreadyAddedToWish(true)
        } else {
            console.error("Product ID is undefined");
        }
    }

    useEffect(() => {
        if (cartState) {
            for (let index = 0; index < cartState.length; index++) {
                if (getProductId === cartState[index].productId._id) {
                    setAlreadyAdded(true)
                }
            }
        }
    }, [cartState])

    const uploadCart = () => {
        dispatch(addProdToCart({ productId: productState._id, quantity, price: productState.price }))
    }

    const props = {
        width: 594,
        height: 600,
        zoomWidth: 600,

        img: productState?.images ? productState?.images : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg",
    };

    const [orderedProduct, setorderedProduct] = useState(true);
    const copyToClipboard = (text) => {
        var textField = document.createElement("textarea");
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand("copy");
        textField.remove();
    };

    const [star, setStar] = useState(null)
    const [comment, setComment] = useState(null)
    const sentiment = new Sentiment();
    const [inputText, setInputText] = useState("");
    const [result, setResult] = useState();

    useEffect(() => {
        const tempResult = sentiment.analyze(inputText);
        setResult(tempResult)
    }, [inputText])

    const addRatingToProduct = () => {
        if (star === null) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "please add a star rating",
                showConfirmButton: false,
                timer: 1500
            });
            return false;
        } else if (comment === null) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "please write a review about this product",
                showConfirmButton: false,
                timer: 1500
            });
            return false;
        } else {
            dispatch(addRating({ star: star, comment: comment, prodId: getProductId, score: result?.score }))
        }
        return false;
    };

    return (
        <>
            <Layout header={4} footer={3} className="" mainClassName="">
                <br />
                <br />
                <br />
                <br />
                <Header />
                <Meta title={"Product Name"} />
                <BreadCrumb title={productState.title} />
                <Container class1="main-product-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-6">
                            <div className="main-product-image">
                                <div>
                                    <ReactImageZoom {...props} />
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="main-product-details">
                                <div className="border-bottom">
                                    <h3 className="title">
                                        {productState.title}
                                    </h3>
                                </div>
                                <div className="border-bottom py-3">
                                    <p className="price">{productState.price} DT</p>
                                    <div className="d-flex align-items-center gap-10">
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={productState?.totalrating}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                    <a className="review-btn" href="#review">
                                        Write a Review
                                    </a>
                                </div>
                                <div className=" py-3">
                                    <br />
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">Type :</h3>
                                        <p className="product-data">{productState.category}</p>
                                    </div>
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">Category :</h3>
                                        <p className="product-data">{productState.category}</p>
                                    </div>
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">Avability :</h3>
                                        <p className="product-data">in stock</p>
                                    </div>
                                    {
                                        alreadyAdded === false && <>
                                            <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                                                <h3 className="product-heading">Quantity :</h3>
                                                <div className="">
                                                    <input
                                                        type="number"
                                                        name=""
                                                        min={1}
                                                        max={10}
                                                        className="form-control"
                                                        style={{ width: "70px" }}
                                                        id=""
                                                        onChange={(e) => { setQuantity(e.target.value) }}
                                                        value={quantity}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    }

                                    <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                                        <div className={alreadyAdded ? "ms-0" : "ms-5" + 'd-flex align-items-center gap-30 ms-5'}>
                                            <button
                                                className="button border-0"
                                                type="button"
                                                onClick={() => { alreadyAdded ? navigate('/shop/cart') : uploadCart() }}
                                            >
                                                {alreadyAdded ? "Go To Cart" : "Add to Cart"}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-15">
                                        {alreadyAddedToWish ? <div>
                                            <a onClick={(e) => { addToWish(productState._id); setAlreadyAddedToWish(false) }}>
                                                <FcLike className="fs-5 me-2" /> Already in the Wishlist
                                            </a>
                                        </div> : <div>
                                            <a onClick={(e) => { addToWish(productState._id) }}>
                                                <FcLikePlaceholder className="fs-5 me-2" /> Add to Wishlist
                                            </a>
                                        </div>}

                                    </div>
                                    <div className="d-flex gap-10 flex-column  my-3">
                                        <h3 className="product-heading">Description :</h3>
                                        <p className="product-data">
                                            {productState.description}
                                        </p>
                                    </div>
                                    <div className="d-flex gap-10 align-items-center my-3">
                                        <h3 className="product-heading">Product Link:</h3>
                                        <a
                                            href="javascript:void(0);"
                                            onClick={() => {
                                                copyToClipboard(
                                                    window.location.href
                                                );
                                            }}
                                        >
                                            Copy Product Link
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
                <Container class1="description-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-12">
                            <h4>Description</h4>
                            <div className="bg-white p-3">
                                <p>
                                    {productState.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
                <Container class1="reviews-wrapper home-wrapper-2">
                    <div className="row">
                        <div className="col-12">
                            <h3 id="review">Reviews</h3>
                            <div className="review-inner-wrapper">
                                <div className="review-head d-flex justify-content-between align-items-end">
                                    <div>
                                        <h4 className="mb-2">Customer Reviews</h4>
                                        <div className="d-flex align-items-center gap-10">
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                value={productState.totalrating}
                                                edit={false}
                                                activeColor="#ffd700"
                                            />
                                        </div>
                                    </div>
                                    {orderedProduct && (
                                        <div>
                                            <a className="text-dark text-decoration-underline" href="">
                                                Write a Review
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <div className="review-form py-4">
                                    <h4>Write a Review</h4>
                                    <div>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            edit={true}
                                            activeColor="#ffd700"
                                            onChange={(e) => {
                                                setStar(e)
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <textarea
                                            name=""
                                            id=""
                                            className="w-100 form-control"
                                            cols="30"
                                            rows="4"
                                            value={inputText}
                                            placeholder="Comments"
                                            onChange={(e) => {
                                                setComment(e.target.value);
                                                setInputText(e.target.value);
                                            }}
                                        ></textarea>
                                    </div>
                                    <div className="d-flex justify-content-end mt-3">
                                        <button onClick={addRatingToProduct} className="button border-0" type="button">Submit Review</button>
                                    </div>
                                </div>
                                <div className="reviews mt-4">
                                    {
                                        productState && productState.ratings?.map((item, index) => {
                                            return (
                                                <div className="review">
                                                    <div className="d-flex gap-10 align-items-center">
                                                        <img
                                                            src={`${item?.postedby?.profilePicture}`}
                                                            style={{ width: "40px", height: "40px", borderRadius: "50%", marginLeft: "10px", marginBottom: "15px" }}
                                                        />
                                                        <h6 className="mb-0">{item?.postedby?.username}</h6>
                                                        <ReactStars
                                                            count={5}
                                                            size={24}
                                                            value={item?.star}
                                                            edit={false}
                                                            activeColor="#ffd700"
                                                        />
                                                    </div>
                                                    <p className="mt-3">
                                                        {item?.comment}
                                                    </p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
                <Container class1="popular-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-12">

                        </div>
                    </div>
                    <div className="row">
                        <ProductCard />
                    </div>
                </Container>
            </Layout>
        </>
    );
};

export default SingleProduct;