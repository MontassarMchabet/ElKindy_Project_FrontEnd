import React from "react";
import BreadcrumbArea from "../components/BreadcrumbArea/BreadcrumbArea";
import CaseStudy from "../components/CaseStudy/CaseStudy";
import CompanyArea from "../components/CompanyArea/CompanyArea";
import CounterAreaFour from "../components/CounterArea/CounterAreaFour";
import NewsLetterArea from "../components/NewsLetter/NewsLetterArea";
import InnerServiceAreaTwo from "../components/ServicesArea/InnerServiceAreaTwo";
import ServicesDetailsArea from "../components/ServicesArea/ServicesDetailsArea";
import Layout from "../layouts/Layout";

const ServicesDetailsPage = () => {
  return (
    <Layout header={1} footer={1} className="" mainClassName="">
      <BreadcrumbArea
        title={"Web Design"}
        subtitle={"Service Details"}
        className={"breadcrumb-area-two pt-175"}
        showShape={false}
      />
      <ServicesDetailsArea />
      <CounterAreaFour />
      <CompanyArea />
      <InnerServiceAreaTwo />
      <CaseStudy />
      <NewsLetterArea />
    </Layout>
  );
};

export default ServicesDetailsPage;
