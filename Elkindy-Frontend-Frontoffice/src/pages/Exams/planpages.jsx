import React from "react";
import Layout from "../../layouts/Layout";

import ClassesArea from "../../components/ExamsArea/DisplayPlan";

const PlansPage = () => {
    return (
        <Layout header={4} footer={1}>
            <br /><br /><br /><br /><br /><br />
            <ClassesArea />
            <br /><br /><br /><br /><br /><br />
        </Layout>
    );
};

export default PlansPage;