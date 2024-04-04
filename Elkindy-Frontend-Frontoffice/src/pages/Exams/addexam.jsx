import React from "react";
import Layout from "../../layouts/Layout";
import ExamsArea from "../../components/ExamsArea/ExamsArea";
import FormComponent from "../../components/ExamsArea/AddForm";
const AddExamsComponent = () => {
    return (
        <Layout header={4} footer={1}>
            <br /><br /><br /><br /><br /><br />
            <FormComponent />
            <br /><br /><br /><br /><br /><br />
        </Layout>
    );
};

export default AddExamsComponent;