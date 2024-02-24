import React from "react";
import Layout from "../../layouts/Layout";
import BannerTwo from "../../components/Banner/BannerTwo";
import BrandArea from "../../components/Brand/BrandArea";
import AboutAreaTwo from "../../components/About/AboutAreaTwo";
import CounterArea from "../../components/CounterArea/CounterArea";
import ServicesAreaTwo from "../../components/ServicesArea/ServicesAreaTwo";
import PricingArea from "../../components/Pricing/PricingArea";
import WorkArea from "../../components/Work/WorkArea";
import TestimonialAreaTwo from "../../components/Testimonial/TestimonialAreaTwo";
import BlogAreaTwo from "../../components/Blog/BlogAreaTwo";
import Contact from "../../components/Contact/Contact";
import ProjectAreaTwo from "../../components/Project/ProjectAreaTwo";

const PersonalPortfolio = () => {
  return (
    <Layout header={2} footer={2} className="black-background">
      <BannerTwo />
      <BrandArea />
      <AboutAreaTwo />
      <CounterArea />
      <ServicesAreaTwo />
      <ProjectAreaTwo />
      <PricingArea />
      <WorkArea />
      <TestimonialAreaTwo />
      <BlogAreaTwo />
      <Contact />
    </Layout>
  );
};

export default PersonalPortfolio;
