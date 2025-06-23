import { FiltroCaracteristicas } from "../filtros/FiltroCaracteristicas"
import { Button } from "@mui/material"
import "./BarraDeBusqueda.css"
import { useState } from "react"
import { FiltroPais } from "../filtros/FiltroPais"
import { FiltroInput } from "../filtros/FiltroInput"
import { FiltroPrecio } from "../filtros/FiltroPrecio"

const filtrosPosibles = [{ nombre: "caracteristicas", valor: "" },
{ nombre: "huespedes", valor: "" }
]
export const BarraDeBusqueda = ({ alBuscarAlojamientos }) => {
    const [filtros, setFiltros] = useState([])
    const modificarFiltro = (nombre, valor) => setFiltros(filtrosPosibles.map(filt =>
        filt.nombre === nombre ? ({ ...filt, valor: valor }) : filt
    ))

    const buscarAlojamientos = async () => {
        const filtrosElegidos = filtros.filter(filtro => filtro.valor)
        await alBuscarAlojamientos(filtros)
    }


    return (
        <div className="barra-busqueda">
            <div className="filtros-busqueda">
                <FiltroCaracteristicas modificarFiltro={modificarFiltro} />
                <div className="separador-filtros"></div>
                <FiltroInput modificarFiltro={modificarFiltro} nombreParam="Pais" />
                <FiltroInput modificarFiltro={modificarFiltro} nombreParam="Ciudad" />
                <FiltroInput modificarFiltro={modificarFiltro} nombreParam="PrecioMin" />
                <FiltroInput modificarFiltro={modificarFiltro} nombreParam="PrecioMax" />
            </div>
            <Button variant="contained" className="boton-busqueda" onClick={buscarAlojamientos} >Buscar</Button>
        </div>
    )
}