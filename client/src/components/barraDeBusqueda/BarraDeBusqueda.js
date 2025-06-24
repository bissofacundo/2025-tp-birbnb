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
    const modificarFiltroPor = (filtro, filtrosModificados) => { 
        const filtroObtenido = filtrosModificados.find( filtroModificado => filtroModificado.nombre === filtro.nombre)
        return filtroObtenido ? {...filtro, valor: filtroObtenido.valor} : filtro
    }

    const modificarFiltros = (filtrosModificados) => {
        setFiltros(filtros.map( filtro => modificarFiltroPor(filtro, filtrosModificados)))
    }

    const buscarAlojamientos = async () => {
        const filtrosElegidos = filtros.filter(filtro => filtro.valor)
        await alBuscarAlojamientos(filtrosElegidos)
    }


    return (
        <div className="barra-busqueda">
            <div className="filtros-busqueda">
                <FiltroCaracteristicas modificarFiltros={modificarFiltros} nombreparam="caracteristicas"/>
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