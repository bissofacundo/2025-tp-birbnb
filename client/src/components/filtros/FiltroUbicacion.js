import { useState } from "react";
import { Button, Menu, TextField } from "@mui/material";

export const FiltroUbicacion = () => {
    const [pais,setPais] = useState()
    const [ciudad,setCiudad] = useState()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const clikearBoton = (elementoSeleccionado) => {
        setAnchorEl(elementoSeleccionado)
    }
    const handleClose = () => {
        
        setAnchorEl(null)
    }

    return (
        <>
            <Button
                id="button-menu"
                aria-controls={open ? 'button-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(e) => clikearBoton(e.currentTarget)}
            >
            Ubicacion
            </Button>
            <Menu
                            id="menu-ubicacion"
                            aria-labelledby="button-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            
                                <TextField id="outlined-basic" label="Pais" variant="outlined" />
                                <TextField id="outlined-basic" label="Ciudad" variant="outlined" />
                            
            </Menu>
        </>
    )
}