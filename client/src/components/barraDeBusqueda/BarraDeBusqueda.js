import { FiltroCaracteristicas } from "../filtros/FiltroCaracteristicas"
import { FiltroPais } from "../filtros/FiltroPais"
import { FiltroInput } from "../filtros/FiltroInput"
import { FiltroPrecio } from "../filtros/FiltroPrecio"
import { Button } from "@mui/material"
import "./BarraDeBusqueda.css"
import { useState } from "react"
import { FiltroUbicacion } from "../filtros/FiltroUbicacion"
import { FiltroCantidadHuespedes } from "../filtros/FiltroCantidadHuespedes"

const filtrosPosibles = [{nombre:"caracteristicas", valor:""}, 
    {nombre:"huespedes", valor:""}, {nombre:"ciudad", valor:""}, {nombre:"pais", valor:""},
    {nombre:"precioMin", valor:""}, {nombre:"precioMax", valor:""}]

export const BarraDeBusqueda = ({alBuscarAlojamientos}) => {
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
                <FiltroUbicacion/>
                <div className="separador-filtros"></div>
                <FiltroCantidadHuespedes modificarFiltro={modificarFiltro}/>
                <FiltroInput modificarFiltro={modificarFiltro} nombreParam="Pais" />
                <div className="separador-filtros"></div>
                <FiltroInput modificarFiltro={modificarFiltro} nombreParam="Ciudad" />
                <div className="separador-filtros"></div>
                <FiltroInput modificarFiltro={modificarFiltro} nombreParam="PrecioMin" />
                <div className="separador-filtros"></div>
                <FiltroInput modificarFiltro={modificarFiltro} nombreParam="PrecioMax" />
            </div>
            <Button variant="contained" className="boton-busqueda" onClick={buscarAlojamientos} >Buscar</Button>
        </div>
    )
}