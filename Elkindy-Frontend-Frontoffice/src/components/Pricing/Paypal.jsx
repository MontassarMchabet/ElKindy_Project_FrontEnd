import React, { useRef, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api';
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";

const Paypal = ({ planValue }) => {
    const paypal = useRef();
    const [user, setUser] = useState(null);
    const [subscriptionUpdated, setSubscriptionUpdated] = useState(false);

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Elkindy Plan",
                                amount: {
                                    currency_code: "USD",
                                    value: planValue,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);

                    updateUserSubscription();
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, [planValue]);

    const updateUserSubscription = async () => {
        try {
            const storedToken = Cookies.get('token');
            const decodedToken = jwtDecode(storedToken);
            const { userId, role } = decodedToken;

            let subscriptionType = '';
            let subscriptionPrice = 0;
            if (planValue === 50) {
                subscriptionType = 'monthly';
                subscriptionPrice = 50;
            } else if (planValue === 600) {
                subscriptionType = 'yearly';
                subscriptionPrice = 600;
            } else if (planValue === 300) {
                subscriptionType = '6 months';
                subscriptionPrice = 300;
            } else {
                console.error('Unexpected planValue:', planValue);
                return;
            }

            const response = await api.put(`https://elkindy-project-backend.onrender.com/api/auth/updateSubscription/${userId}`, {
                subscription: subscriptionType,
                subscriptionPrice: subscriptionPrice,
            }, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });

            const responseHistory = await api.post(`https://elkindy-project-backend.onrender.com/api/auth/addSubscriptionHistory/${userId}`, {
                subscriptionType: subscriptionType,
                subscriptionPrice: subscriptionPrice,
            }, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });


            setSubscriptionUpdated(true);
        } catch (error) {
            console.error('Error updating subscription:', error);
        }
    };

    if (subscriptionUpdated) {
        return <Navigate to="/fillInfos" />;
    }

    console.log(subscriptionUpdated);
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div ref={paypal}></div>
        </div>
    );
}

export default Paypal