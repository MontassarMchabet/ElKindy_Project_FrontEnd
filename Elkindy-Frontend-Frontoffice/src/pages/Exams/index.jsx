import React from "react";
import Layout from "../../layouts/Layout";
import ExamsArea from "../../components/ExamsArea/ExamsArea";

const ExamsComponent = () => {
    return (
        <Layout header={4} footer={1}>
            <br /><br /><br /><br /><br /><br />
            <ExamsArea />
            <br /><br /><br /><br /><br /><br />
        </Layout>
    );
};

export default ExamsComponent;