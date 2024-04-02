import React from "react";

import Layout from "../../layouts/Layout";

import HeaderBar from "../../components/Planning/calendar";

const PlanningComponent = () => {
    return (
        <Layout header={4} footer={1}>
            <br /><br /><br /><br /><br /><br />
            <HeaderBar />
        </Layout>
    );
};

export default PlanningComponent;