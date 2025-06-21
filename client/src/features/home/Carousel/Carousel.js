import { useState } from 'react'
import './Carousel.css'
import { CardList } from '../CardList/CardList'

export const Carousel = () => {

    const [alojamientos, setAlojamientos] = useState([]) //a contextro

    return(
        <div class="carousel">
            <p>Alojamientos populares en Rio de Janeiro</p>
            {alojamientos.length === 0 ? <CardList></CardList> : <p>wait!</p>}
        </div>
    )
}