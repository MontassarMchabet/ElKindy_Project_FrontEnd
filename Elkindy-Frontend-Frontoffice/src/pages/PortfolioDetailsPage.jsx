import React from "react";
import BreadcrumbArea from "../components/BreadcrumbArea/BreadcrumbArea";
import CompanyArea from "../components/CompanyArea/CompanyArea";
import NewsLetterArea from "../components/NewsLetter/NewsLetterArea";
import ProjectDetailsArea from "../components/Project/ProjectDetailsArea";
import InnerServiceAreaTwo from "../components/ServicesArea/InnerServiceAreaTwo";
import Layout from "../layouts/Layout";

const PortfolioDetailsPage = () => {
  return (
    <Layout header={1} footer={1} className="" mainClassName="">
      <BreadcrumbArea
        title={"Portfolio Details"}
        subtitle={"Portfolio Details"}
        className={"breadcrumb-area-two pt-175"}
        showShape={false}
      />
      <ProjectDetailsArea />
      <CompanyArea />
      <InnerServiceAreaTwo />
      <NewsLetterArea />
    </Layout>
  );
};

export default PortfolioDetailsPage;
