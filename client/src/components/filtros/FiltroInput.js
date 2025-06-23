import { useState } from "react";
import { TextField } from "@mui/material";
import { Filtro } from "./Filtros";


export const FiltroInput = ({ modificarFiltro,nombreParam}) => {
    const [input, setInput] = useState("")

    const obtenerFiltro = () => {
        return { nombre: `${nombreParam}`, input }
    }
    
    const modificarInput = (nuevoInput) => {
        setInput(nuevoInput)
    }
    return (
        <>
            <Filtro obtenerFiltro={obtenerFiltro} modificarFiltro={modificarFiltro} descripcionBoton={nombreParam}>
                {
                    <Input nombre={nombreParam} modificarInput={modificarInput} input={input} />}
            </Filtro>
        </>
    )
}

const Input = ({ nombre, modificarInput, input }) => {
    return (
        <div key={nombre} >
             <TextField
                label={nombre}
                variant="outlined"
                onChange={(e) => modificarInput(e.target.value)}
                value={input}
            />
        </div>
    )
}