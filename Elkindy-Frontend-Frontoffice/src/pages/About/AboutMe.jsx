import React from "react";
import BreadcrumbArea from "../../components/BreadcrumbArea/BreadcrumbArea";
import MyClientArea from "../../components/ClientArea/MyClientArea";
import DeveloperArea from "../../components/DeveloperArea/DeveloperArea";
import Faq from "../../components/Faq/Faq";
import InnerProjectArea from "../../components/Project/InnerProjectArea";
import TestimonialAreaFive from "../../components/Testimonial/TestimonialAreaFive";
import ToolsArea from "../../components/ToolsArea/ToolsArea";
import Layout from "../../layouts/Layout";
import BlogArea from "../../components/Blog/BlogArea";

const AboutMe = () => {
  return (
    <Layout header={1} footer={1} className="" mainClassName="">
      <BreadcrumbArea
        title="About Me"
        subtitle={"About Me"}
        className={"pt-175 pb-140"}
      />
      <DeveloperArea />
      <ToolsArea />
      <Faq />
      <MyClientArea />
      <InnerProjectArea />
      <TestimonialAreaFive />
      <BlogArea />
    </Layout>
  );
};

export default AboutMe;
