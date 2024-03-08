import React from "react";
import { Link } from "react-router-dom";
import InnerServicesAreaItem from "./InnerServicesAreaItem";
import NavExams from "./NavExams";

const AboutArea = () => {
    const inner_services = [
        {
            tag: "Our Team",
            reading_time: "5 Min",
            // src: "/img/icon/inner_services_icon01.png",
            url: "/services-details",
            title: "Advertising",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
            // src: "/img/icon/inner_services_icon02.png",
            url: "/services-details",
            title: "Development",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
            // src: "/img/icon/inner_services_icon03.png",
            url: "/services-details",
            title: "Branding",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
            tag: "Solution",
            reading_time: "5 Min",
            // src: "/img/icon/inner_services_icon04.png",
            url: "/services-details",
            title: "Product Design",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
            // src: "/img/icon/inner_services_icon05.png",
            url: "/services-details",
            title: "Software",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
            tag: "Solution",
            reading_time: "5 Min",
            // src: "/img/icon/inner_services_icon06.png",
            url: "/services-details",
            title: "Marketing",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
            // src: "/img/icon/inner_services_icon07.png",
            url: "/services-details",
            title: "Cinematography",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
            // src: "/img/icon/inner_services_icon08.png",
            tag: "Our Team",
            reading_time: "5 Min",
            url: "/services-details",
            title: "Strategy Services",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
    ];

    const sectors = [
        {
            // url: "/blog-dtails",
            // src: "/img/blog/rc_post_img01.jpg",
            tag: "Sector",
            reading_time: "5 Min",
            title: "Skello launches electronic signature",
        },
        {
            // url: "/blog-dtails",
            // src: "/img/blog/rc_post_img02.jpg",
            tag: "Our Team",
            reading_time: "5 Min",
            title: "Skello launches electronic signature",
        },
        {
            // url: "/blog-dtails",
            // src: "/img/blog/rc_post_img03.jpg",
            tag: "Solution",
            reading_time: "5 Min",
            title: "Skello launches electronic signature",
        },
    ];


    return (
        <section className="about-area">
            <div className="container custom-container">
                <div className="about-inner">
                    <div className="row align-items-center justify-content-center">

                        <NavExams />

                        

                        <div className="inner-services-item-wrap" >
                            <div className="row justify-content-center">
                                {inner_services.map((x, index) => (
                                    <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-8" >
                                        <InnerServicesAreaItem item={x} />
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutArea;