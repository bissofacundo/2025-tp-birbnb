import { FiltroCaracteristicas } from "../filtros/FiltroCaracteristicas"
import {Button} from "@mui/material"
import "./BarraDeBusqueda.css"
import { useState } from "react"
import { getAlojamientosFiltrados } from "../../api/alojamientosAPI"
import { FiltroUbicacion } from "../filtros/FiltroUbicacion"

const filtrosPosibles = [{nombre:"caracteristicas", valor:""}, 
    {nombre:"huespedes", valor:""}
]
export const BarraDeBusqueda = () => {
    const [filtros, setFiltros] = useState([])
    const [alojamientos, setAlojamientos] = useState([])
    const modificarFiltro = (nombre, valor) => setFiltros(filtrosPosibles.map(filt =>
    filt.nombre === nombre ? ({...filt, valor: valor}): filt 
    ))

    const pedirAlojamientos = async () => {
        try {
            const filtrosElegidos = filtros.filter(filtro => filtro.valor)
            setAlojamientos( await getAlojamientosFiltrados(filtrosElegidos) ) 
        } catch(error) {
            mostrarError(error.message)
        }
    }
    const mostrarError = (mensajeError) => {
        //TODO
    }

    return(
        <section className="barra-busqueda">
            <div className="filtros-busqueda">
                <FiltroCaracteristicas modificarFiltro={modificarFiltro}/>
                <FiltroUbicacion/>
            </div>
            <Button variant="contained" className="mi-boton" onClick={pedirAlojamientos} >Buscar</Button>
        </section>
    )
}