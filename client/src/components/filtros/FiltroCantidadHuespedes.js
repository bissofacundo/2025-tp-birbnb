import { useState } from "react"
import { Filtro } from "./Filtros"
import {Button, ButtonGroup} from "@mui/material"
import "./FiltroCantidadHuespedes.css"

export const FiltroCantidadHuespedes = ({modificarFiltros, nombreParam}) => {
    const [cantHuespedes, setCantHuespedes] = useState(1)

    const agregarCantHuespedes = (cantidad) => 
        setCantHuespedes(Math.max(1, cantHuespedes + cantidad))

    const guardarFiltros = () => {
        const filtroAEnviar = cantHuespedes > 1 ? `${cantHuespedes}` :  ""
        modificarFiltros([{nombre: nombreParam, valor: filtroAEnviar}])
    }
    
    return <Filtro guardarFiltros={guardarFiltros} descripcionBoton={"Cantidad de Huespedes"}>
        <div key={"cantidad-huespedes"}>
            <h5>Cantidad de Huespedes Maxima</h5>
            <BotonSelectorDeCantidad cantHuespedes={cantHuespedes} agregarCantHuespedes={agregarCantHuespedes}/>
        </div>
    </Filtro>
}


const BotonSelectorDeCantidad = ({cantHuespedes, agregarCantHuespedes}) => {
    return(
        <div>
                <ButtonGroup variant="contained" aria-label="Basic button group">
                    <Button onClick={() => agregarCantHuespedes(-1)} disabled={cantHuespedes <= 1}>-</Button>
                    <div className="cantidad-huespedes">{cantHuespedes}</div>
                    <Button onClick={() => agregarCantHuespedes(1)}>+</Button>
                </ButtonGroup>
        </div>
    )
}