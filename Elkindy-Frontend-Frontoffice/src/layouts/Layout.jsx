import React from "react";
import FooterOne from "../components/Footers/FooterOne";
import FooterThree from "../components/Footers/FooterThree";
import FooterTwo from "../components/Footers/FooterTwo";
import HeaderOne from "../components/Headers/HeaderOne";
import HeaderTwo from "../components/Headers/HeaderTwo";
import Preloader from "../components/Preloader/Preloader";
import ScrollTop from "../components/ScrollTop/ScrollTop";

const Layout = ({ children, header = 1, footer, className, mainClassName }) => {
  return (
    <>
      <Preloader />
      <ScrollTop />

      <div className={className}>
        {header === 1 && <HeaderOne />}
        {header === 2 && <HeaderTwo />}

        <main className={mainClassName}>{children}</main>

        {footer === 1 && <FooterOne />}
        {footer === 2 && <FooterTwo />}
        {footer === 3 && <FooterThree />}
      </div>
    </>
  );
};

export default Layout;
