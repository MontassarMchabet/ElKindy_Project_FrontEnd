import Navbarfront from "FrontOffice/components/Navbarfront/navbarfront";
import React from "react";
export default function FrontOffice(props) {
    const { ...rest } = props;
    return (
        <div>
            <Navbarfront />
        </div>
    );
}
