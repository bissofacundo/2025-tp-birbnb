import { useState } from "react"
import {FormControlLabel, Switch, Button, Menu } from "@mui/material";

const caracteristicasPosibles = [ {id: "WIFI", nombre: 'WiFi', agregado: false},
    {id: "PISCINA", nombre: 'Piscina', agregado: false}, {id: "MASCOTAS_PERMITIDAS", nombre: 'Mascotas Permitidas', agregado: false}, 
    {id: "ESTACIONAMIENTO", nombre: 'Estacionamiento', agregado: false}] 


export const FiltroCaracteristicas = () => {
    const [caracteristicas, setCaracteristicas] = useState(caracteristicasPosibles)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const clikearBoton = (elementoSeleccionado) => {
        setAnchorEl(elementoSeleccionado)
    }
    const handleClose = () => {
        const caracteristicasElegidas = caracteristicas.filter(caract => caract.agregado)
        setAnchorEl(null)
    }
    const modificarCaracteristica = (idCaracteristica) => {
        caracteristicas.map(caract => ( caract.id === idCaracteristica ? {...caract, agregada: !caract.agregada} : caract ))
        setCaracteristicas(caracteristicas)
    }

    return(
        <>
            <Button
                id="button-menu"
                aria-controls={open ? 'button-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(e) => clikearBoton(e.currentTarget)}
            >
            Agregar Caracteristicas
            </Button>
            <Menu
                id="menu-caracteristicas"
                aria-labelledby="button-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {
                    caracteristicasPosibles.map(caract => <Caracteristica nombre={caract.nombre} modificarCaracteristica={() => modificarCaracteristica(caract.id)}/>)
                }
            </Menu>
        </>
    )
}

const Caracteristica = ({ idCaracteristica, nombre, modificarCaracteristica}) => {
    return(
        <div>
            <FormControlLabel control={
                <Switch inputProps={{ 'aria-label': `Caracteristica ${nombre}` } }
                onChange={modificarCaracteristica(idCaracteristica)}/>} label={`${nombre}`}/>
        </div>
    )
}