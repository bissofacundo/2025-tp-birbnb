import { FiltroCaracteristicas } from "../filtros/FiltroCaracteristicas"
import {Button} from "@mui/material"
import "./BarraDeBusqueda.css"

export const BarraDeBusqueda = () => {
    return(
        <section className="barra-busqueda">
            <div className="filtros-busqueda">
                <FiltroCaracteristicas/>
            </div>
            <Button>Buscar</Button>
        </section>
    )
}