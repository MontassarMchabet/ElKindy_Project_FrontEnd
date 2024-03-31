import React, { useEffect, useState } from "react";
import $ from "jquery";
import { Link, useLocation } from "react-router-dom";
import cn from "classnames";
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api';
import Cookies from 'js-cookie';


const NavExams = () => {

    const [user, setUser] = useState(null);
        
        
        const isLoggedIn = Cookies.get('token') !== undefined;
    useEffect(() => {
        /*=============================================
    =     Menu sticky & Scroll to top      =
    =============================================*/
        $(window).on("scroll", function () {
            var scroll = $(window).scrollTop();
            if (scroll < 245) {
                $("#sticky-header").removeClass("sticky-menu");
                $(".scroll-to-target").removeClass("open");
            } else {
                $("#sticky-header").addClass("sticky-menu");
                $(".scroll-to-target").addClass("open");
            }
        });

        //SubMenu Dropdown Toggle
        if ($(".menu-area li.menu-item-has-children ul").length) {
            $(".menu-area .navigation li.menu-item-has-children").append(
                '<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>'
            );
        }

        //Mobile Nav Hide Show
        if ($(".mobile-menu").length) {
            var mobileMenuContent = $(".menu-area .main-menu").html();
            $(".mobile-menu .menu-box .menu-outer").append(mobileMenuContent);

            //Dropdown Button
            $(".mobile-menu li.menu-item-has-children .dropdown-btn").on(
                "click",
                function () {
                    $(this).toggleClass("open");
                    $(this).prev("ul").slideToggle(300);
                }
            );
            //Menu Toggle Btn
            $(".mobile-nav-toggler").on("click", function () {
                $("body").addClass("mobile-menu-visible");
            });

            //Menu Toggle Btn
            $(".menu-backdrop, .mobile-menu .close-btn").on("click", function () {
                $("body").removeClass("mobile-menu-visible");
            });
        }

        /*=============================================
      =          header btn active               =
    =============================================*/
        $(function () {
            $(".header-btn").on("click", function () {
                $(".header-contact-wrap, .body-contact-overlay").toggleClass("active");
                $("body").toggleClass("fix");
                return false;
            });
            $(".body-contact-overlay").on("click", function () {
                $(".header-contact-wrap, .body-contact-overlay").removeClass("active");
                $("body").removeClass("fix");
                return false;
            });
        });

        const fetchUserData = async () => {
            try {
                const storedToken = Cookies.get('token');
                const storedRefreshToken = Cookies.get('refreshToken');
                const decodedToken = jwtDecode(storedToken);
                const { userId, role } = decodedToken;

                const response = await api.get(`http://localhost:9090/api/auth/user/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const { pathname } = useLocation();

    const isActiveClassName = (path) => {
        return path === pathname ? "active" : "";
    
    
    
    };


    return (
        <>
             <header style={{ position: "fixed", top: 160, width: "100%", zIndex: 999 }}>
                <div id="sticky-header" className="menu-area transparent-header" >
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="mobile-nav-toggler">
                                    <i className="fas fa-bars"></i>
                                </div>

                                <div className="menu-wrap">
                                    <nav className="menu-nav">


                                        <div className="header-action">
                                            <ul className="list-wrap">

                                            {user && user.role === 'prof' &&<Link
  to="/addexams"
  className="btn"
  style={{ fontSize: '18px', padding: '10px 20px' }} // Adjust the font size and padding as needed
>
  Add Exam <span></span>
</Link>}

                                            </ul>
                                        </div>

                                        <div className="navbar-wrap main-menu d-none d-lg-flex">
                                            <ul className="navigation">

                                                <li className={cn(isActiveClassName("/"))}>
                                                    <Link to="/">Planning</Link>
                                                </li>
                                                {user && user.role === 'client' &&<li className={cn(isActiveClassName("/"))}>
                                                    <Link to="/notes">Notes</Link>
                                                </li>}
                                                <li className={cn(isActiveClassName("/exams"))}>
                                                    <Link to="/exams">Exams</Link>
                                                </li>

                                            </ul>
                                        </div>

                                        <div className="header-action">
                                            <ul className="list-wrap">
                                                <div className="navbar-wrap main-menu d-none d-lg-flex">
                                                    <ul className="navigation">
                                                    </ul>
                                                </div>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>

                                {/* <!-- Mobile Menu  --> */}
                                <div className="mobile-menu">
                                    <nav className="menu-box">
                                        <div className="close-btn">
                                            <i className="fas fa-times"></i>
                                        </div>
                                        <div className="nav-logo">
                                            <Link to="/">
                                                <img src="/img/logo/logo.png" alt="Logo" />
                                            </Link>
                                        </div>
                                        <div className="menu-outer">
                                            {/* <!--Here Menu Will Come Automatically Via Javascript / Same Menu as in Header--> */}
                                        </div>
                                        <div className="social-links">
                                            <ul className="clearfix list-wrap">
                                                <li>
                                                    <a href="#">
                                                        <i className="fab fa-facebook-f"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fab fa-twitter"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fab fa-instagram"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fab fa-linkedin-in"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fab fa-youtube"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>



                                    </nav>
                                </div>
                                <div className="menu-backdrop"></div>
                                {/* <!-- End Mobile Menu --> */}
                            </div>
                        </div>
                    </div>


                </div>
            </header>
        </>
    );
};

export default NavExams;