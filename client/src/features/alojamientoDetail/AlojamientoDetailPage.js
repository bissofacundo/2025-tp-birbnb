import { useContext, useEffect } from 'react';
import { AlojamientosContext } from '../../context/alojamientoProvider';
import "./AlojamientoDetail.css"
import { Button, ImageListItemBar } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { DetailContext } from '../../context/detailProvider';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const AlojamientoDetail = () => {

    const {alojamientoDetallado: alojamiento} = useContext(DetailContext); 


    const [showedFoto, setShowed] = useState({fotos: alojamiento.fotos, indice: 0})

    const handleLeft = () => {
        setShowed(prev => {
            const nuevoIndice = prev.indice === 0 ? prev.indice : prev.indice - 1
            return { ...prev, indice: nuevoIndice};
        });
    }

    const handleRight = () => {
        setShowed(prev => {
            const nuevoIndice = prev.indice === alojamiento.fotos.length - 1 ? prev.indice : prev.indice + 1
            return { ...prev, indice: nuevoIndice};
        });
    }

    return(
        <>      
        <div class="body">
            <div class="image">
                <div class="leftButton">
                    <Button onClick={() => handleLeft()}>
                        <ArrowBackIosIcon></ArrowBackIosIcon>
                    </Button>
                </div>
                    <img src={showedFoto.fotos[showedFoto.indice].path}></img>
                <div class="rightButton">
                    <Button onClick={() => handleRight()}>
                        <ArrowForwardIosIcon></ArrowForwardIosIcon>
                    </Button>
                </div>
            </div>
            <div class="image-footer">
                <div class="description">
                    <div class="chips-box">
                        {alojamiento.caracteristicas.map(carac => {
                        return (<Chip label={carac}></Chip>)
                    })}
                    </div>
                    <h1>{alojamiento.nombre}</h1>
                    <p>{alojamiento.descripcion}</p>
                    <p>direccion: {alojamiento.direccion.calle} {alojamiento.direccion.altura}, {alojamiento.direccion.ciudad}, {alojamiento.direccion.pais}</p>
                    <p>precio por noche: {alojamiento.precioPorNoche} {alojamiento.moneda}</p>
                    <p>horario de Check In: {alojamiento.horarioCheckIn}</p>
                    <p>horario de Check Out: {alojamiento.horarioCheckOut}</p>
                    <p>hasta {alojamiento.cantHuespedesMax} huesped/es</p>
                </div>
                <div class="buying-section">

                </div>
            </div>
        </div>
        </>  
    )
}