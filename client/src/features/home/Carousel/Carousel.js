import './Carousel.css'
import { CardList } from '../CardList/CardList'
import { AlojamientosContext } from '../../../context/alojamientoProvider'
import { useContext } from 'react'
import LinearProgress from '@mui/material/LinearProgress';

export const Carousel = ({subtitulo}) => {

    const {alojamientos} = useContext(AlojamientosContext); 

    return(
        <div class="carousel">
            <p className='subtitulo-carousel'>{subtitulo}</p>
            {alojamientos.length !== 0 ? <CardList alojamientos={alojamientos}></CardList> : <LinearProgress color="secondary" />}
        </div>
    )
}