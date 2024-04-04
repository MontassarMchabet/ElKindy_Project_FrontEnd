import { useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import WOW from "wow.js";
import CreativeAgency from "./pages/Home/CreativeAgency";
import PersonalPortfolio from "./pages/Home/PersonalPortfolio";
import DigitalAgency from "./pages/Home/DigitalAgency";
import AboutUs from "./pages/About/AboutUs";
import AboutMe from "./pages/About/AboutMe";
import TeamPage from "./pages/Team/TeamPage";
import TeamPageDetails from "./pages/Team/TeamPageDetails";
import PortfolioDetailsPage from "./pages/PortfolioDetailsPage";
import ServicesDetailsPage from "./pages/ServicesDetailsPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/Blog/BlogPage";
import BlogDetailsPage from "./pages/Blog/BlogDetailsPage";
import EventsPage from "./pages/Events/EventsPage.jsx";
import EventDetailPage from "./pages/Events/EventDetailsPage.jsx";
import ReservationPage from "./components/BookEvent/BookEventApp.jsx";
import AnimatedCursor from "react-animated-cursor";

import ExamDetailsPage from "./pages/Exams/examdetails.jsx";
import Home from "./pages/shop/pages/Home";
import OurStore from "./pages/shop/pages/OurStore";
import SingleProduct from "./pages/shop/pages/SingleProduct";
import Wishlist from "./pages/shop/pages/Wishlist";
import CompareProduct from "./pages/shop/pages/CompareProduct";
import PassQuiz from "./pages/Exams/passquiz.jsx";
import AddExamsComponent from "./pages/Exams/addexam";
import AddQuizsComponent from "./pages/Exams/addquizpage.jsx";
import NotesPage from "./pages/Exams/notespage.jsx";

import AccountComponent from "./pages/Account";
import ExamsComponent from "./pages/Exams";

import Cart from "./pages/shop/pages/Cart.jsx";
import Checkout from "./pages/shop/pages/Checkout.jsx";
import Success from "./pages/shop/pages/Success.jsx";
import Fail from "./pages/shop/pages/Fail.jsx";
import Orders from "./pages/shop/pages/Orders.jsx";


import Piano from "./pages/Virtualinstrument/Piano";
import Drums from "./pages/Virtualinstrument/Drums";
import SubscribePage from "./pages/Subscribe";

function App() {
  useEffect(() => {
    const wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: false,
      live: true,
    });
    wow.init();
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <AnimatedCursor
        innerSize={8}
        outerSize={32}
        color="248, 158, 82"
        outerAlpha={0.15}
        innerScale={0}
        outerScale={0}
        clickables={[
          "a",
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          "label[for]",
          "select",
          "textarea",
          "button",
          ".link",
        ]}
      />

      <Routes>
        <Route path="/" element={<CreativeAgency />} />
        <Route path="/account" element={<AccountComponent />} />
        <Route path="/exams" element={<ExamsComponent />} />

        <Route path="/addexams" element={<AddExamsComponent />} />
        <Route path="/addquiz" element={<AddQuizsComponent />} />
        {/* <Route path="/home-two" element={<PersonalPortfolio />} />
        <Route path="/home-three" element={<DigitalAgency />} /> */}

        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog-details" element={<BlogDetailsPage />} />

        <Route path="/exam-details/:id" element={<ExamDetailsPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/events" element={<EventsPage />} />

        <Route path="/events/:eventId" element={<EventDetailPage />} />
        <Route path="/events/:eventId/:movieParam/bookTickets" element={<ReservationPage />} />

        <Route path="/passquiz" element={<PassQuiz />} />

        <Route path="/shop" element={<Home />} />
        <Route path="/shop/products" element={<OurStore />} />
        <Route path="/shop/products/:id" element={<SingleProduct />} />
        <Route path="/shop/wishlist" element={<Wishlist />} />
        <Route path="/shop/compare-product" element={<CompareProduct />} />
        <Route path="/shop/cart" element={<Cart />} />
        <Route path="/shop/my-orders" element={<Orders />} />
        <Route path="/shop/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<Fail />} />

        {/* <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog-details" element={<BlogDetailsPage />} /> */}

        <Route path="/subscribe" element={<SubscribePage />} />
        <Route path="/piano" element={<Piano />} />
        <Route path="/drums" element={<Drums />} />


      </Routes>
    </>
  );
}

export default App;
