import React from "react";
import BreadcrumbArea from "../../components/BreadcrumbArea/BreadcrumbArea";
import MyClientArea from "../../components/ClientArea/MyClientArea";
import DeveloperAreaTwo from "../../components/DeveloperArea/DeveloperAreaTwo";
import Faq from "../../components/Faq/Faq";
import NewsLetterArea from "../../components/NewsLetter/NewsLetterArea";
import InnerProjectArea from "../../components/Project/InnerProjectArea";
import TestimonialAreaFive from "../../components/Testimonial/TestimonialAreaFive";
import ToolsArea from "../../components/ToolsArea/ToolsArea";
import Layout from "../../layouts/Layout";

const TeamPageDetails = () => {
  return (
    <Layout header={1} footer={1} className="" mainClassName="">
      <BreadcrumbArea
        title={"Team Details"}
        subtitle={"Team Details"}
        className={"about-me-breadcrumb pt-175 pb-110"}
      />
      <DeveloperAreaTwo />
      <ToolsArea />
      <Faq />
      <MyClientArea />
      <InnerProjectArea />
      <TestimonialAreaFive />
      <NewsLetterArea />
    </Layout>
  );
};

export default TeamPageDetails;
