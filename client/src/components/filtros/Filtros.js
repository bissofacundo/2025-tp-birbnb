import {TextField} from "@mui/material";
import { useState } from "react";
export const FiltroPrecioMax = () => {
    const [precioMax, setPrecioMax] = useState(Infinity)

    return(
        <div className='filtro'>
            <h5>Precio Maximo</h5>
            <TextField 
                name='Filtro Precio Max'
                value={precioMax}
                onChange={(e) => setPrecioMax(e.target.value)}
            />
        </div>
    )
} 

export const FiltroPrecioMin = () => {
    const [precioMin, setPrecioMin] = useState(0)

    return(
        <div className='filtro'>
            <h5>Precio Minimo</h5>
            <TextField 
                name='Filtro Precio Minimo'
                value={precioMin}
                onChange={(e) => setPrecioMin(e.target.value)}
            />
        </div>
    )
} 