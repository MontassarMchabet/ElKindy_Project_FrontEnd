import Footerfront from "FrontOffice/components/Footerfront/footerfront";
import Navbarfront from "FrontOffice/components/Navbarfront/navbarfront";

export default function FrontOffice(props) {
    const { ...rest } = props;
    return (
        <div>
            <Navbarfront />
        </div>
    );
}
