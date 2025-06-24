import './Carousel.css'
import { CardList } from '../CardList/CardList'
import { AlojamientosContext } from '../../../context/alojamientoProvider'
import { useState, useContext, useEffect } from 'react'
import LinearProgress from '@mui/material/LinearProgress';

export const Carousel = () => {

    const {alojamientos: alojamientosDeBDD} = useContext(AlojamientosContext); 

    const [alojamientos, setAlojamientos] = useState(alojamientosDeBDD)

    
    useEffect(() => {
        setAlojamientos(alojamientosDeBDD);
    }, [alojamientosDeBDD]);

    return(
        <div class="carousel">
            <p>Alojamientos populares</p>
            {alojamientos.length !== 0 ? <CardList alojamientos={alojamientos}></CardList> : <LinearProgress color="secondary" />}
        </div>
    )
}