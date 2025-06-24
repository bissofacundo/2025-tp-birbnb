
import { useState } from "react"
import { FiltrosInput } from "./FiltroInput"
import { Filtro } from "./Filtros"



export const FiltroPrecio = ({modificarFiltros, precioMin, precioMax}) => {
    const [parametros, setParametros] = useState([{nombreParam: precioMin, input: ""}, {nombreParam: precioMax, input: ""}]) 
    
    const guardarFiltros = () => {
        const filtros = parametros.filter(param => param.input !== "").map(param => ({nombre: param.nombreParam, valor: param.input}))
        console.log(filtros)
        modificarFiltros(filtros)
    }

    const modificarInput = (valor, nombre) => 
        setParametros( parametros.map( param => param.nombreParam === nombre ? {...param, input: valor} : param ))
        

    return <Filtro guardarFiltros={guardarFiltros} descripcionBoton={"Seleccionar Precio"}>
            <FiltrosInput parametros={parametros} modificarInput={modificarInput} />
        </Filtro>
}