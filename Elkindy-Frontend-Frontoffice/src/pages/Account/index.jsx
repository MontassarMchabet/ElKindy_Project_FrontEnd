import React from "react";
import AboutArea from "../../components/About/AboutArea";
import BannerOne from "../../components/Banner/BannerOne";
import BlogArea from "../../components/Blog/BlogArea";
import BlogAreaThree from "../../components/Blog/BlogAreaThree";
import ConsultationArea from "../../components/Consultation/ConsultationArea";
import NewsLetterArea from "../../components/NewsLetter/NewsLetterArea";
import ProjectArea from "../../components/Project/ProjectArea";
import ServicesArea from "../../components/ServicesArea/ServicesArea";
import TeamAreaTwo from "../../components/Team/TeamAreaTwo";
import TestimonialArea from "../../components/Testimonial/TestimonialArea";
import Layout from "../../layouts/Layout";
import CounterAreaTwo from "../../components/CounterArea/CounterAreaTwo";
import ProjectAreaThree from "../../components/Project/ProjectAreaThree";
import InnerServicesArea from "../../components/ServicesArea/InnerServicesArea";
import HistoryArea from "../../components/HistoryArea/HistoryArea";
import ProjectDetailsArea from "../../components/Project/ProjectDetailsArea";
import DeveloperArea from "../../components/DeveloperArea/DeveloperArea";

const AccountComponent = () => {
    return (
        <Layout header={4} footer={1}>
            <br /><br /><br /><br /><br /><br />
            <DeveloperArea />
        </Layout>
    );
};

export default AccountComponent;