import { useState } from "react";
import { TextField } from "@mui/material";
import { Filtro } from "./Filtros";


export const FiltroPais = ({ modificarFiltro }) => {
    const [pais, setPais] = useState("")

    const obtenerFiltro = () => {
        return { nombre: "pais", pais }
    }

    const modificarPais = (nuevoPais) => {
        setPais(nuevoPais)
    }
    return (
        <>
            <Filtro obtenerFiltro={obtenerFiltro} modificarFiltro={modificarFiltro} descripcionBoton={"Pais"}>
                {
                    <Pais nombre="pais" modificarPais={modificarPais} pais={pais} />}
            </Filtro>
        </>
    )
}

const Pais = ({ nombre, modificarPais, pais }) => {
    return (
        <div key={nombre} >
             <TextField
                label="País"
                variant="outlined"
                onChange={(e) => modificarPais(e.target.value)}
                value={pais}
            />

        </div>
    )
}