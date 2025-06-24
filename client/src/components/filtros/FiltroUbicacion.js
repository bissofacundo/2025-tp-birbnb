import { useState } from "react"
import { FiltrosInput } from "./FiltroInput"
import { Filtro } from "./Filtros"



export const FiltroUbicacion = ({modificarFiltros, nombrePais, nombreCiudad}) => {
    const [parametros, setParametros] = useState([{nombreParam: nombrePais, input: ""}, {nombreParam: nombreCiudad, input: ""}]) 
    
    const guardarFiltros = () => {
        const filtros = parametros.map(param => ({nombre: param.nombreParam, valor: param.input}))
        modificarFiltros(filtros)
    }

    const modificarInput = (valor, nombre) => 
        setParametros( parametros.map( param => param.nombreParam === nombre ? {...param, input: valor} : param ))
        

    return <Filtro guardarFiltros={guardarFiltros} descripcionBoton={"Seleccionar Ubicacion"}>
            <FiltrosInput parametros={parametros} modificarInput={modificarInput} />
        </Filtro>
}