import React, { useEffect } from 'react'
import Layout from '../../../layouts/Layout'
import Header from '../components/Header'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../features/productSlice'

function Orders() {
    const dispatch = useDispatch();
    const orderState = useSelector(state => state?.product?.getuserorders?.orders);
    useEffect(() => {
        dispatch(getOrders())
    }, [])
    return (
        <>
            <Layout header={4} footer={3} className="" mainClassName="">
                <br />
                <br />
                <br />
                <br />
                <Header />
                <BreadCrumb title='My Orders' />
                <Container class1='cart-wrapper home-wrapper-2 py-5'> <div className="row">
                    <div className="col-12">
                        <div className='row '>
                            <div className="col-3">
                                <h5>Order Id</h5>
                            </div>
                            <div className="col-3">
                                <h5>Total Amount</h5>
                            </div>
                            <div className="col-3">
                                <h5>Total Amount after Discount</h5>
                            </div>
                            <div className="col-3">
                                <h5>Status</h5>
                            </div>
                        </div>

                    </div>
                    <div className="col-12 mt-3">
                        {
                            Array.isArray(orderState) && orderState?.map((item, index) => {
                                return (
                                    <div style={{ backgroundColor: "#f89e52" }} className='row pt-3 my-3' key={index}>
                                        <div className="col-3">
                                            <p>{item?._id}</p>
                                        </div>
                                        <div className="col-3">
                                            <p>{item?.totalPrice}</p>
                                        </div>
                                        <div className="col-3">
                                            <p>{item?.totalPriceAfterDiscount}</p>
                                        </div>
                                        <div className="col-3">
                                            <p>{item?.orderStatus}</p>
                                        </div>
                                        <div className="col-12">
                                            <div className='row bg-secondary p-3'>
                                                <div className="col-3">
                                                    <h6 >image</h6>
                                                </div>
                                                <div className="col-3">
                                                    <h6 >product name</h6>
                                                </div>
                                                <div className="col-3">
                                                    <h6 >quantity</h6>
                                                </div>
                                                <div className="col-3">
                                                    <h6 >price</h6>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            item?.orderItems?.map((i, index) => {
                                                return (
                                                    <div className="col-12">
                                                        <div className='row bg-secondary p-3'>
                                                            <div className="col-3">
                                                                <img
                                                                    src={`${i?.productId?.images}`}
                                                                    style={{ width: "40px", height: "40px", borderRadius: "50%", marginLeft: "10px", marginBottom: "15px" }}
                                                                />
                                                            </div>
                                                            <div className="col-3">
                                                                <p className='text-white'>{i?.productId?.title}</p>
                                                            </div>
                                                            <div className="col-3">
                                                                <p className='text-white'>{i?.productId?.quantity}</p>
                                                            </div>
                                                            <div className="col-3">
                                                                <p className='text-white'>{i?.productId?.price}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                </Container>
            </Layout>
        </>





    )
}

export default Orders