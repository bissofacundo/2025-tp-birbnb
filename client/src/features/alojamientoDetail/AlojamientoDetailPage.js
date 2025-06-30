import { useContext, useEffect } from 'react';
import { AlojamientosContext } from '../../context/alojamientoProvider';
import "./AlojamientoDetail.css"
import { Button} from '@mui/material';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from 'react-router';
import LinearProgress from '@mui/material/LinearProgress';

const AlojamientoDetailLoaded = ({alojamientoDetallado, fillFotos}) => {
    
    const [showedFoto, setShowed] = useState(fillFotos(alojamientoDetallado))

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

    const testeo = () => {
        console.log(alojamientoDetallado)
        console.log(showedFoto)
        return <></>
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
                    {testeo()}
                    <img src={showedFoto.fotos[showedFoto.indice].path} alt={`Alojamiento con ${alojamientoDetallado.id} y nombre ${alojamientoDetallado.nombre}`}></img>
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

export const AlojamientoDetail = () => {
    
    const {id} = useParams();
    const {findAlojamientoById} = useContext(AlojamientosContext)

    const fillFotos = (alojamientoDetalle) => {
        return alojamientoDetalle.fotos.path === "" ? mockFotos() : {fotos: alojamientoDetalle.fotos, indice: 0}
    }

    const mockFotos = () => {
        return {
            fotos: [{
                path: ""
            }],
            indice: 0
        }
    }

    return(
        <>
            {console.log(findAlojamientoById(id))}
            {findAlojamientoById(id) 
            ? <AlojamientoDetailLoaded alojamientoDetallado={findAlojamientoById(id)} fillFotos={fillFotos}></AlojamientoDetailLoaded> 
            : <LinearProgress color="secondary" />}
        </>
    )
}