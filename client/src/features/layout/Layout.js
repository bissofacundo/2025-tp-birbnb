import { Outlet } from "react-router";
import NavBar from "../../components/navbar/NavBar.js";

export const Layout = () => {
    return(
        <>
            <NavBar></NavBar>
            <Outlet />
        </>
    )
}