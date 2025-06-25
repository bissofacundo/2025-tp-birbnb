import { useContext, useEffect } from 'react';
import { AlojamientosContext } from '../../context/alojamientoProvider';
import "./AlojamientoDetail.css"
import { Button, ImageListItemBar } from '@mui/material';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import { DetailContext } from '../../context/detailProvider';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from 'react-router';

export const AlojamientoDetail = () => {
    
    const params = useParams();
    const {alojamientoDetallado, detallarAlojamiento} = useContext(DetailContext);
    
    
    const handleLeft = () => {
        setShowed(prev => {
            const nuevoIndice = prev.indice === 0 ? prev.indice : prev.indice - 1
            return { ...prev, indice: nuevoIndice};
        });
    }
    
    const handleRight = () => {
        setShowed(prev => {
            const nuevoIndice = prev.indice === alojamientoDetallado.fotos.length - 1 ? prev.indice : prev.indice + 1
            return { ...prev, indice: nuevoIndice};
        });
    }
    
    const mockFotos = () => {
        return {
            fotos: [{
                path: ""
            }],
            indice: 0
        }
    }
    
    const fillFotos = () => {
        return alojamientoDetallado.fotos.length === 0 ? mockFotos() : {fotos: alojamientoDetallado.fotos, indice: 0}
    }

    useEffect(() => {
        detallarAlojamiento(params.id)
    }, []);

    
    const [showedFoto, setShowed] = useState(fillFotos())

    useEffect(() => {
        setShowed(fillFotos())
    }, [alojamientoDetallado.fotos]) //mmmmh, algo huele mal

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
                        {alojamientoDetallado.caracteristicas.map(carac => {
                        return (<Chip label={carac}></Chip>)
                    })}
                    </div>
                    <h1>{alojamientoDetallado.nombre}</h1>
                    <p>{alojamientoDetallado.descripcion}</p>
                    <p>direccion: {alojamientoDetallado.direccion.calle} {alojamientoDetallado.direccion.altura}, {alojamientoDetallado.direccion.ciudad}, {alojamientoDetallado.direccion.pais}</p>
                    <p>precio por noche: {alojamientoDetallado.precioPorNoche} {alojamientoDetallado.moneda}</p>
                    <p>horario de Check In: {alojamientoDetallado.horarioCheckIn}</p>
                    <p>horario de Check Out: {alojamientoDetallado.horarioCheckOut}</p>
                    <p>hasta {alojamientoDetallado.cantHuespedesMax} huesped/es</p>
                </div>
                <div class="buying-section">

                </div>
            </div>
        </div>
        </>  
    )
}