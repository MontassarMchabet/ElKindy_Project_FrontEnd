import React from "react";
import AgencyArea from "../../components/AgencyArea/AgencyArea";
import BlogAreaThree from "../../components/Blog/BlogAreaThree";
import BrandAreaTwo from "../../components/Brand/BrandAreaTwo";
import CounterAreaTwo from "../../components/CounterArea/CounterAreaTwo";
import NewsLetterAreaTwo from "../../components/NewsLetter/NewsLetterAreaTwo";
import ProjectAreaThree from "../../components/Project/ProjectAreaThree";
import ServiceAreaThree from "../../components/ServicesArea/ServiceAreaThree";
import SliderArea from "../../components/SliderArea/SliderArea";
import TestimonialAreaThree from "../../components/Testimonial/TestimonialAreaThree";
import Layout from "../../layouts/Layout";

const DigitalAgency = () => {
  return (
    <Layout header={1} footer={3} className="" mainClassName="fix">
      <SliderArea />
      <ServiceAreaThree />
      <BrandAreaTwo className={"pt-110"} />
      <AgencyArea />
      <CounterAreaTwo />
      <ProjectAreaThree />
      <TestimonialAreaThree />
      <BlogAreaThree />
      <NewsLetterAreaTwo />
    </Layout>
  );
};

export default DigitalAgency;
