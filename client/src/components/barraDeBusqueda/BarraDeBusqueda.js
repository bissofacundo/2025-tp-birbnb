import { FiltroCaracteristicas } from "../filtros/FiltroCaracteristicas"
import { Button } from "@mui/material"
import "./BarraDeBusqueda.css"
import { useState } from "react"
import { FiltroCantidadHuespedes } from "../filtros/FiltroCantidadHuespedes"
import { FiltroUbicacion } from "../filtros/FiltroUbicacion"
import { FiltroPrecio } from "../filtros/FiltroPrecio"

const filtrosPosibles = [{nombre:"caracteristicas", valor:""}, 
    {nombre:"huespedes", valor:""}, {nombre:"ciudad", valor:""}, {nombre:"pais", valor:""},
    {nombre:"precioMin", valor:""}, {nombre:"precioMax", valor:""}]

export const BarraDeBusqueda = ({alBuscarAlojamientos}) => {
    const [filtros, setFiltros] = useState(filtrosPosibles)
    const modificarFiltro = (nombre, valor) => { 
        console.log(nombre === 'pais')
        setFiltros(filtros.map(filt =>
            filt.nombre === nombre ? ({ ...filt, valor: valor }) : filt
        ))
    }

    const modificarFiltros = (filtros) => {
        filtros.forEach(filtro => modificarFiltro(filtro.nombre, filtro.valor));
    }

    const buscarAlojamientos = async () => {
        const filtrosElegidos = filtros.filter(filtro => filtro.valor)
        await alBuscarAlojamientos(filtrosElegidos)
    }


    return (
        <div className="barra-busqueda">
            <div className="filtros-busqueda">
                <FiltroCaracteristicas modificarFiltros={modificarFiltros} nombreParam="caracteristicas" />
                <div className="separador-filtros"></div>
                <FiltroCantidadHuespedes modificarFiltros={modificarFiltros} nombreParam="huespedes"/>
                <div className="separador-filtros"></div>
                <FiltroUbicacion modificarFiltros={modificarFiltros} nombrePais={"pais"} nombreCiudad={"ciudad"} />
                <div className="separador-filtros"></div>
                <FiltroPrecio modificarFiltros={modificarFiltros} precioMin={"precioMin"} precioMax={"precioMax"} />
            </div>
            <Button variant="contained" className="boton-busqueda" onClick={buscarAlojamientos} >Buscar</Button>
        </div>
    )
}