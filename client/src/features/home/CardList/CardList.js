import { Card, CardContent, Button} from '@mui/material'
import AspectRatio from '@mui/joy/AspectRatio';
import CardOverflow from '@mui/joy/CardOverflow';
import {useNavigate} from "react-router";
import './CardList.css'
import { useContext } from 'react';
import { AlojamientosContext } from '../../../context/alojamientoProvider';


const BirbnbCard = ({alojamiento}) => {

    const navigate = useNavigate();

    const {detallarAlojamiento: detallarAlojamiento} = useContext(AlojamientosContext); 

    const alVerMas = (alojamiento) => {
        detallarAlojamiento(alojamiento)
        navigate(`/alojamientos/${alojamiento._id}`);
    }

    return(
        <Card class= 'cardAlojamiento' color="primary" variant='outlined' sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg' }} >
            <div class="cardHeader">
                <content>
                    <h3 class="nombre">{alojamiento.nombre}</h3> 
                    <p class="anfitrion">{alojamiento.anfitrion}</p>
                </content>
            </div>
            <CardOverflow sx={{width: '100%'}}>
                <AspectRatio sx={{ minWidth: 200, width:'100%'}}>
                <img class="imagenAlojamiento"
                    src={ alojamiento.fotos[0].path}
                    srcSet=""
                    loading="lazy"
                    alt={alojamiento.fotos[0].descripcion}
                />
                </AspectRatio>
            </CardOverflow>
            <div class="cardDescripcion">
                <div class="cardText"> 
                    <div class="ubicacion">
                        <p>Ciudad: {alojamiento.direccion.ciudad} </p>    
                        <p>Pais: {alojamiento.direccion.pais}</p>
                    </div>
                    <div class="detalles">
                        <p>Cantidad de Huspedes: {alojamiento.cantHuespedesMax}</p>
                        <p>Precio por noche: ${alojamiento.precioPorNoche}</p>
                        <p>Caracteristicas: {alojamiento.caracteristicas.map(caracterista => caracterista.toLowerCase()).join(", ")}</p>
                    </div>
                </div>
                <div class="cardButton">   
                    <CardOverflow>
                        <Button variant="contained" color="primary" size="md" onClick={() => alVerMas(alojamiento)}>
                            ver mas +
                        </Button>
                    </CardOverflow>
                </div>
            </div>
        </Card>
    )
}

export const CardList = ({alojamientos}) => {

    return(
        <div class="cardlist">{
            alojamientos.map((alojamiento) => 
                <BirbnbCard alojamiento={alojamiento}>
                </BirbnbCard>
            )}
        </div>
    )
}