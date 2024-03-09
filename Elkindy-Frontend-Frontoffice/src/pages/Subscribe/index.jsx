import React from "react";
import { Link } from "react-router-dom";
import PricingArea from "../../components/Pricing/PricingArea";

const SubscribePage = () => {
    return (
        <section className="pricing-area pb-90" style={{ overflowY: 'hidden' }}>
            <PricingArea />
        </section>
    );
};

export default SubscribePage;
