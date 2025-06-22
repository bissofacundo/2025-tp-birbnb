import { Layout } from "./features/layout/Layout"
import { Home } from "./features/home/HomePage"
import {Route, Routes, BrowserRouter, Outlet} from "react-router-dom";
import {AlojamientoDetail} from "./features/alojamientoDetail/AlojamientoDetailPage"
import {Alojamientos} from "./features/alojamientos/AlojamientosPage"
import {Reserva} from "./features/reserva/ReservaPage"
import { Notificaciones } from "./features/notificacionesUsuario/NotificacionesPage";
import { ReservasUsuario } from "./features/reservasUsuario/ReservasUsuarioPage";
import { BarraDeBusqueda } from "./components/barraDeBusqueda/BarraDeBusqueda";

export const AppRoutes = () => {
    return <BrowserRouter>
             <Routes>
                <Route path="/" element={<><Layout /><Outlet/></>}>
                    {<Route index element={<Home />}/>}
                    <Route path="/alojamientos" element={<Alojamientos/>}/>
                    <Route path="/alojamientos/:nombre" element={<AlojamientoDetail />}/> 
                    <Route path="/reservas" element={<Reserva />}/>
                    <Route path="/:idUsuario/notificaciones" element={<Notificaciones />}/>
                    <Route path="/:idUsuario/reservas" element={<ReservasUsuario />}/>
                </Route>
            </Routes>
        </BrowserRouter>
}