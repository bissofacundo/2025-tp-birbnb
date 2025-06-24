import { useState } from "react"
import {FormControlLabel, Switch} from "@mui/material";
import "./FiltroCaracteristicas.css"
import { Filtro } from "./Filtros";

const caracteristicasPosibles = [ {id: "WIFI", nombre: 'WiFi', agregado: false},
    {id: "PISCINA", nombre: 'Piscina', agregado: false}, {id: "MASCOTAS_PERMITIDAS", nombre: 'Mascotas Permitidas', agregado: false}, 
    {id: "ESTACIONAMIENTO", nombre: 'Estacionamiento', agregado: false}] 


export const FiltroCaracteristicas = ({modificarFiltros, nombreparam}) => {
    const [caracteristicas, setCaracteristicas] = useState(caracteristicasPosibles)

    const guardarFiltros = () => {
        const caracteristicasElegidas = caracteristicas.filter(caract => caract.agregado)
        const filtro = caracteristicasElegidas.map(caract => caract.id).join(',')
        modificarFiltros([{nombre: nombreparam, valor: filtro}])
    }
    const modificarCaracteristica = (idCaracteristica) => {
        setCaracteristicas(caracteristicas.map(caract =>  caract.id === idCaracteristica ? {...caract, agregado: !caract.agregado} : caract ))
    }

    return(
        <>
            <Filtro guardarFiltros={guardarFiltros} descripcionBoton={"Agregar una caracteristica"}>
                {
                    caracteristicas.map(caract => <Caracteristica nombre={caract.nombre} modificarCaracteristica={() => modificarCaracteristica(caract.id)} agregado={caract.agregado}/>)
                }
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
                checked={agregado}
                className="boton-caracteristica"
                key={nombre}
                />} 
            label={`${nombre}`}/>
        </div>
    )
}