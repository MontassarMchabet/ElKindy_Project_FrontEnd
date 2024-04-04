import React, { useRef, useEffect } from "react";

const Paypal = ({ planValue }) => {
    const paypal = useRef();

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
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, [planValue]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div ref={paypal}></div>
        </div>
    );

}

export default Paypal
