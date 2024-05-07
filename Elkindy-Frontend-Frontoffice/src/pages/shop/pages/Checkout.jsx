import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import Header from "../components/Header";
import Layout from "../../../layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { createAnOrder, emptyCart } from "../features/productSlice";


const shippingSchema = yup.object({
    firstName: yup.string().required("firstName is required"),
    lastName: yup.string().required("lastName is required"),
    address: yup.string().required("address is required"),
    state: yup.string().required("state is required"),
    city: yup.string().required("city is required"),
    country: yup.string().required("country is required"),
    pincode: yup.string().required("pincode is required"),

})

const Checkout = () => {

    const dispatch = useDispatch()
    const cartState = useSelector(state => state?.product?.cartProducts)
    const [totalAmount, setTotalAmount] = useState(null)
    const [shippingInfo, setShippingInfo] = useState(null)
    const [cartProductState, setCartProductState] = useState([])
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const storedToken = Cookies.get('token');
            const storedRefreshToken = Cookies.get('refreshToken');
            const decodedToken = jwtDecode(storedToken);
            const { userId, role } = decodedToken;
    
            const response = await axios.get(`https://elkindy-project-backend.onrender.com/api/auth/user/${userId}`);
            setUser(response.data);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
        fetchUserData();
      }, []);
    
    const sendMail = async () => {
        try {
            const response = await axios.post("https://elkindy-project-backend.onrender.com/api/order/orderMail", {
                email: user.email,
                username: user.username
            });
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            console.error('Error adding order:', error);
            throw error;
        }
    };

    useEffect(() => {
        let sum = 0;
        for (let index = 0; index < cartState?.length; index++) {
            sum = sum + (Number(cartState[index].quantity) * cartState[index].price)
        }
        setTotalAmount(sum);
    }, [cartState])

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            address: "",
            state: "",
            city: "",
            country: "",
            pincode: "",
        },
        validationSchema: shippingSchema,
        onSubmit: (values) => {
            setTimeout(() => {
                checkOutHandler()
            },300);
        },
    });

    useEffect(() => {
        setShippingInfo(formik.values);
    }, [formik.values]);

    useEffect(()=>{
        let items =[]
        for (let index = 0; index < cartState?.length; index++) {
            items.push({productId: cartState[index].productId._id,quantity: cartState[index].productId.quantity,price: cartState[index].productId.price})
        }
        setCartProductState(items)
    },[])


    const checkOutHandler = async () => {
        await axios
            .post("https://elkindy-project-backend.onrender.com/api/order/payement", { amount: (totalAmount+7)*1000 })
            .then((res) => {
                const { result } = res.data
                window.location.href = result.link;

            })
            .catch((err) => console.error(err));
        
        dispatch(createAnOrder({totalPrice:totalAmount,totalPriceAfterDiscount:totalAmount,orderItems:cartProductState,shippingInfo:shippingInfo}))
        sendMail()
        dispatch(emptyCart())
    }

    return (
        <>
            <Layout header={4} footer={3} className="" mainClassName="">
                <br />
                <br />
                <br />
                <br />
                <Header />
                <Container class1="checkout-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-7">
                            <div className="checkout-left-data">
                                <h3 className="website-name">Dev Corner</h3>
                                <nav
                                    style={{ "--bs-breadcrumb-divider": ">" }}
                                    aria-label="breadcrumb"
                                >
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link className="text-dark total-price" to="/cart">
                                                Cart
                                            </Link>
                                        </li>
                                        &nbsp; /&nbsp;
                                        <li
                                            className="breadcrumb-ite total-price active"
                                            aria-current="page"
                                        >
                                            Information
                                        </li>
                                        &nbsp; /
                                        <li className="breadcrumb-item total-price active">
                                            Shipping
                                        </li>
                                        &nbsp; /
                                        <li
                                            className="breadcrumb-item total-price active"
                                            aria-current="page"
                                        >
                                            Payment
                                        </li>
                                    </ol>
                                </nav>
                                <h4 className="title total">Contact Information</h4>
                                <p className="user-details total">
                                    Navdeep Dahiya (monud0232@gmail.com)
                                </p>
                                <h4 className="mb-3">Shipping Address</h4>
                                <form
                                    onSubmit={formik.handleSubmit}
                                    action=""
                                    className="d-flex gap-15 flex-wrap justify-content-between"
                                >
                                    <div className="w-100">
                                        <select name="country" value={formik.values.country} onChange={formik.handleChange("country")} onBlur={formik.handleBlur("country")} className="form-control form-select" id="">
                                            <option value="" selected disabled>
                                                Select Country
                                            </option>
                                            <option value="Tunisia">
                                                Tunisia
                                            </option>
                                        </select>
                                        <div className="error ms-2 my-1" style={{ color: "red" }}>
                                            {
                                                formik.touched.country && formik.errors.country
                                            }
                                        </div>
                                    </div>
                                    <div className="flex-grow-1">
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            className="form-control"
                                            name="firstName"
                                            value={formik.values.firstName}
                                            onChange={formik.handleChange("firstName")}
                                            onBlur={formik.handleBlur("firstName")}
                                        />
                                        <div className="error ms-2 my-1" style={{ color: "red" }}>
                                            {
                                                formik.touched.firstName && formik.errors.firstName
                                            }
                                        </div>
                                    </div>
                                    <div className="flex-grow-1">
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            className="form-control"
                                            name="lastName"
                                            value={formik.values.lastName}
                                            onChange={formik.handleChange("lastName")}
                                            onBlur={formik.handleBlur("lastName")}
                                        />
                                        <div className="error ms-2 my-1" style={{ color: "red" }}>
                                            {
                                                formik.touched.lastName && formik.errors.lastName
                                            }
                                        </div>
                                    </div>
                                    <div className="w-100">
                                        <input
                                            type="text"
                                            placeholder="Address"
                                            className="form-control"
                                            name="address"
                                            value={formik.values.address}
                                            onChange={formik.handleChange("address")}
                                            onBlur={formik.handleBlur("address")}
                                        />
                                        <div className="error ms-2 my-1" style={{ color: "red" }}>
                                            {
                                                formik.touched.address && formik.errors.address
                                            }
                                        </div>
                                    </div>
                                    <div className="w-100">
                                        <input
                                            type="text"
                                            placeholder="Apartment, Suite ,etc"
                                            className="form-control"
                                            name="other"
                                            value={formik.values.other}
                                            onChange={formik.handleChange("other")}
                                            onBlur={formik.handleBlur("other")}
                                        />
                                        <div className="error ms-2 my-1" style={{ color: "red" }}>
                                            {
                                                formik.touched.other && formik.errors.other
                                            }
                                        </div>
                                    </div>
                                    <div className="flex-grow-1">
                                        <input
                                            type="text"
                                            placeholder="City"
                                            className="form-control"
                                            name="city"
                                            value={formik.values.city}
                                            onChange={formik.handleChange("city")}
                                            onBlur={formik.handleBlur("city")}
                                        />
                                        <div className="error ms-2 my-1" style={{ color: "red" }}>
                                            {
                                                formik.touched.city && formik.errors.city
                                            }
                                        </div>
                                    </div>
                                    <div className="flex-grow-1">
                                        <select name="state" value={formik.values.state} onChange={formik.handleChange("state")} onBlur={formik.handleBlur("state")} className="form-control form-select" id="">
                                            <option value="" selected disabled>
                                                Select State
                                            </option>
                                            <option value="tunis" >
                                                tunis
                                            </option>
                                        </select>
                                        <div className="error ms-2 my-1" style={{ color: "red" }}>
                                            {
                                                formik.touched.state && formik.errors.state
                                            }
                                        </div>
                                    </div>
                                    <div className="flex-grow-1">
                                        <input
                                            type="text"
                                            placeholder="Zipcode"
                                            className="form-control"
                                            name="pincode"
                                            value={formik.values.pincode}
                                            onChange={formik.handleChange("pincode")}
                                            onBlur={formik.handleBlur("pincode")}
                                        />
                                        <div className="error ms-2 my-1" style={{ color: "red" }}>
                                            {
                                                formik.touched.pincode && formik.errors.pincode
                                            }
                                        </div>
                                    </div>
                                    <div className="w-100">
                                        <div className="d-flex justify-content-between align-items-center mt-6">
                                            <Link to="/shop/cart" className="text-dark">
                                                <BiArrowBack className="me-2" />
                                                Return to Cart
                                            </Link>
                                            
                                            <button className="button" type="submit">Place Order</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="border-bottom py-4">


                                {cartState && cartState?.map((item, index) => {
                                    return (
                                        <div key={index} className="d-flex gap-10 mb-4 align-align-items-center">
                                            <div className="w-75 d-flex gap-10">
                                                <div className="w-25 position-relative">
                                                    <span
                                                        style={{ top: "-10px", right: "2px" }}
                                                        className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                                                    >
                                                        {item?.quantity}
                                                    </span>
                                                    <img className="img-fluid" src={item?.productId?.images} alt="product" />
                                                </div>
                                                <div>
                                                    <h5 className="total-price">{item?.productId?.title}</h5>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h5 className="total">{item?.price * item?.quantity} DT</h5>
                                            </div>
                                        </div>
                                    )
                                })
                                }



                            </div>
                            <div className="border-bottom py-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="total">Subtotal</p>
                                    <p className="total-price">{totalAmount ? totalAmount : 0} DT</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-0 total">Shipping</p>
                                    <p className="mb-0 total-price">7 DT</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
                                <h4 className="total">Total</h4>
                                <h5 className="total-price">{totalAmount ? totalAmount + 7 : 0} DT</h5>
                            </div>
                        </div>
                    </div>
                </Container>
            </Layout>
        </>
    );
};

export default Checkout;