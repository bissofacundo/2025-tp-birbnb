import { FiltroCaracteristicas } from "../filtros/FiltroCaracteristicas"
import {Button} from "@mui/material"
import "./BarraDeBusqueda.css"
import { FiltroUbicacion } from "../filtros/FiltroUbicacion"

export const BarraDeBusqueda = () => {
    return(
        <section className="barra-busqueda">
            <div className="filtros-busqueda">
                <FiltroCaracteristicas/>
                <FiltroUbicacion/>
            </div>
            <Button>Buscar</Button>
        </section>
    )
}