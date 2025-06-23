import {TextField} from "@mui/material";
import { useState } from "react";
import {Button, Menu } from "@mui/material";
import "./Filtros.css"

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


export const Filtro = ({children, obtenerFiltro, modificarFiltro, descripcionBoton}) => {
     const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const clikearBoton = (elementoSeleccionado) => {
        setAnchorEl(elementoSeleccionado)
    }

    const handleClose = () => {
        const {nombre ,filtro} = obtenerFiltro()
        modificarFiltro( nombre, filtro)
        setAnchorEl(null)
    }

    return(
        <>
            <Button
                aria-controls={open ? 'button-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(e) => clikearBoton(e.currentTarget)}
                className="boton-filtro"
            >
            {descripcionBoton}
            </Button>
            <Menu
                aria-labelledby="button-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className="menu-filtro"
            > 
            {children}
            </Menu>
        </>
    )
}