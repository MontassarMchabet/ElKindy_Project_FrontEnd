import React from "react";
import BreadcrumbArea from "../components/BreadcrumbArea/BreadcrumbArea";
import InnerContactArea from "../components/Contact/InnerContactArea";
import Layout from "../layouts/Layout";

const ContactPage = () => {
  return (
    <Layout header={1} footer={3} className="" mainClassName="">
      <BreadcrumbArea
        title={"Contact Us"}
        subtitle={"Contact"}
        className={"breadcrumb-area-four pt-175 pb-160"}
        showShape={false}
        showShapeThree={true}
      />
      <InnerContactArea />
    </Layout>
  );
};

export default ContactPage;
