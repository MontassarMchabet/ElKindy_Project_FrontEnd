import React from "react";
import BannerOne from "../../components/Banner/BannerOne";
import BlogAreaThree from "../../components/Blog/BlogAreaThree";
import ConsultationArea from "../../components/Consultation/ConsultationArea";
import NewsLetterArea from "../../components/NewsLetter/NewsLetterArea";
import ServicesArea from "../../components/ServicesArea/ServicesArea";
import TeamAreaTwo from "../../components/Team/TeamAreaTwo";
import TestimonialArea from "../../components/Testimonial/TestimonialArea";
import Layout from "../../layouts/Layout";
import ProjectAreaThree from "../../components/Project/ProjectAreaThree";
import EventsAreaThree from "../../components/Events/AllEvents/InnerEventArea";
import InnerServicesArea from "../../components/ServicesArea/InnerServicesArea";
import HistoryArea from "../../components/HistoryArea/HistoryArea";
import ProjectDetailsArea from "../../components/Project/ProjectDetailsArea";
import { Link } from "react-router-dom";

const CreativeAgency = () => {
  return (
    <Layout header={4} footer={1}>
      <BannerOne />
      <HistoryArea />
      <br /><br /><br /><br /><br /><br />
      <ServicesArea />
      <br /><br /><br /><br />
      <ProjectDetailsArea />
      <br /><br /><br /><br />
      <InnerServicesArea />
      <TeamAreaTwo />
      <br /><br /><br /><br />
      <ProjectAreaThree />
      
      <EventsAreaThree /> 
      <TestimonialArea />
      <BlogAreaThree />
      <ConsultationArea />
      <NewsLetterArea />
    </Layout>
  );
};

export default CreativeAgency;
