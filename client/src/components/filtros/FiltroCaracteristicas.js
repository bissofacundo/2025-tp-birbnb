import { useState } from "react"
import {FormControlLabel, Switch} from "@mui/material";
import "./FiltroCaracteristicas.css"
import { Filtro } from "./Filtros";

const caracteristicasPosibles = [ {id: "WIFI", nombre: 'WiFi', agregado: false},
    {id: "PISCINA", nombre: 'Piscina', agregado: false}, {id: "MASCOTAS_PERMITIDAS", nombre: 'Mascotas Permitidas', agregado: false}, 
    {id: "ESTACIONAMIENTO", nombre: 'Estacionamiento', agregado: false}] 


export const FiltroCaracteristicas = ({modificarFiltro}) => {
    const [caracteristicas, setCaracteristicas] = useState(caracteristicasPosibles)

    const obtenerFiltro = () => {
        const caracteristicasElegidas = caracteristicas.filter(caract => caract.agregado)
        const filtro = caracteristicasElegidas.map(caract => caract.id).join(',')
        return {nombre: "caracteristicas", filtro}
    }
    const modificarCaracteristica = (idCaracteristica) => {
        setCaracteristicas(caracteristicas.map(caract =>  caract.id === idCaracteristica ? {...caract, agregado: !caract.agregado} : caract ))
    }

    return(
        <>
            <Filtro obtenerFiltro={obtenerFiltro} modificarFiltro={modificarFiltro} descripcionBoton={"Agregar una caracteristica"}>
                <div className="elementos-menu">
                {
                    caracteristicas.map(caract => <Caracteristica nombre={caract.nombre} modificarCaracteristica={() => modificarCaracteristica(caract.id)} agregado={caract.agregado}/>)
                }
                </div> 
            </Filtro>  
        </>
    )
}

const Caracteristica = ({ nombre, modificarCaracteristica, agregado}) => {
    return(
        <div key={nombre} >
            <FormControlLabel control={
                <Switch aria-label= {`Caracteristica ${nombre}` }
                onChange={modificarCaracteristica} 
                className="Switch"
                checked={agregado}
                />} 
            label={`${nombre}`}/>
        </div>
    )
}