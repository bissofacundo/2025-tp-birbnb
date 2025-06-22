import { Outlet } from "react-router";
import NavBar from "../../components/navbar/NavBar.js";
import Footer from "../../components/footer/Footer.js";

export const Layout = () => {
    return(
        <>
            <NavBar></NavBar>
            <Outlet />
            <Footer></Footer>
        </>
    )
}