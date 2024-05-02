import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import Layout from "../../../layouts/Layout";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { deleteACartProduct, getUserCart, updateACartProduct } from "../features/productSlice";

const Cart = () => {

    const [productUpdateDetail, setProductUpdateDetail] = useState(null)
    const [totalAmount, setTotalAmount] = useState(null)

    const dispatch = useDispatch();
    const UserCartState = useSelector(state => state.product.cartProducts)
    useEffect(() => {
        dispatch(getUserCart())
    }, [])
    useEffect(() => {
        if (productUpdateDetail !== null) {
            dispatch(updateACartProduct({ cartItemId: productUpdateDetail?.cartItemId, quantity: productUpdateDetail?.quantity }))
            setTimeout(() => {
                dispatch(getUserCart())
            }, 200)
        }
    }, [productUpdateDetail]);
    const deleteCartProduct = (id) => {
        dispatch(deleteACartProduct(id))
        setTimeout(() => {
            dispatch(getUserCart())
        }, 200)
    }

    useEffect(() => {
        let sum = 0;
        for (let index = 0; index < UserCartState?.length; index++) {
            sum = sum + (Number(UserCartState[index].quantity) * UserCartState[index].price)
        }
        setTotalAmount(sum);
    }, [UserCartState])

    return (
        <>
            <Layout header={4} footer={3} className="" mainClassName="">
                <br />
                <br />
                <br />
                <br />
                <Header />
                <Meta title={"Cart"} />
                <BreadCrumb title="Cart" />
                <Container class1="cart-wrapper home-wrapper-2 py-5">
                    <div className="row">
                        <div className="col-12">
                            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                                <h4 className="cart-col-1">Product</h4>
                                <h4 className="cart-col-2">Price</h4>
                                <h4 className="cart-col-3">Quantity</h4>
                                <h4 className="cart-col-4">Total</h4>
                            </div>
                            {
                                UserCartState && UserCartState?.map((item, index) => {
                                    return (
                                        <div key={index} className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                                            <div className="cart-col-1 gap-15 d-flex align-items-center">
                                                <div className="w-25">
                                                    <img src={item?.productId.images} className="img-fluid" alt="product image" />
                                                </div>
                                                <div className="w-75">
                                                    <p>{item?.productId.title}</p>
                                                    <p>{item?.productId.description}</p>

                                                </div>
                                            </div>
                                            <div className="cart-col-2">
                                                <h5 className="price">{item?.price} DT</h5>
                                            </div>
                                            <div className="cart-col-3 d-flex align-items-center gap-15">
                                                <div>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        name=""
                                                        min={1}
                                                        max={10}
                                                        id=""
                                                        value={item?.quantity}
                                                        onChange={(e) => { setProductUpdateDetail({ cartItemId: item?._id, quantity: e.target.value }) }}
                                                    />
                                                </div>
                                                <div>
                                                    <AiFillDelete onClick={() => { deleteCartProduct(item?._id) }} className="text-danger " />
                                                </div>
                                            </div>
                                            <div className="cart-col-4">
                                                <h5 className="price">{item?.price * item?.quantity} DT</h5>
                                            </div>
                                        </div>)
                                })
                            }

                        </div>
                        <div className="col-12 py-2 mt-4">
                            <div className="d-flex justify-content-between align-items-baseline">
                                <Link to="/shop/products" className="button">
                                    Continue To Shopping
                                </Link>
                                {
                                    (totalAmount !== null || totalAmount !== 0) &&
                                    <div className="d-flex flex-column align-items-end">
                                        <h4>SubTotal: {totalAmount} DT</h4>
                                        <p>Taxes and shipping calculated at checkout</p>
                                        <Link to="/shop/checkout" className="button">
                                            Checkout
                                        </Link>
                                    </div>

                                
                                }
                            </div>
                        </div>
                    </div>
                </Container>
            </Layout>
        </>
    );
};

export default Cart;