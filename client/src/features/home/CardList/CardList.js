import { Card, CardContent, Button} from '@mui/material'
import AspectRatio from '@mui/joy/AspectRatio';
import CardOverflow from '@mui/joy/CardOverflow';
import {useNavigate} from "react-router";
import './CardList.css'


const BirbnbCard = ({nombre, anfitrion, fotos, direccion, cantHuespedesMax, precioPorNoche, caracteristicas, id}) => {

    const navigate = useNavigate();

    const alVerMas = (id) => {
        //alert('clicked');
        navigate(`/alojamientos/${id}`);
        //navigate(`/alojamientos/1`);
    }

    return(
        <Card class= 'cardAlojamiento' color="primary" variant='outlined' sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg' }} >
            <div class="cardHeader">
                <content>
                    <h3 class="nombre">{nombre}</h3> 
                    <p class="anfitrion">{anfitrion}</p>
                </content>
            </div>
            <CardOverflow sx={{width: '100%'}}>
                <AspectRatio sx={{ minWidth: 200, width:'100%'}}>
                <img class="imagenAlojamiento"
                    src={fotos[0].path}
                    srcSet=""
                    loading="lazy"
                    alt={fotos[0].descripcion}
                />
                </AspectRatio>
            </CardOverflow>
            <div class="cardDescripcion">
                <div class="cardText"> 
                    <div class="ubicacion">
                        <p>Ciudad: {direccion.ciudad} </p>    
                        <p>Pais: {direccion.pais}</p>
                    </div>
                    <div class="detalles">
                        <p>Cantidad de Huspedes: {cantHuespedesMax}</p>
                        <p>Precio por noche: ${precioPorNoche}</p>
                        <p>Caracteristicas: {caracteristicas.map(caracterista => caracterista.toLowerCase()).join(", ")}</p>
                    </div>
                </div>
                <div class="cardButton">   
                    <CardOverflow>
                        <Button variant="contained" color="primary" size="md" onClick={() => alVerMas(id)}>
                            ver mas +
                        </Button>
                    </CardOverflow>
                </div>
            </div>
        </Card>
    )
}

export const CardList = ({alojamientos}) => {
//console.log(alojamientos)

    return(
        <div class="cardlist">{
            alojamientos.map((alojamiento) => 
                <BirbnbCard nombre={alojamiento.nombre} anfitrion={alojamiento.anfitrion} fotos={alojamiento.fotos} direccion={alojamiento.direccion}
                            cantHuespedesMax={alojamiento.cantHuespedesMax} precioPorNoche={alojamiento.precioPorNoche} caracteristicas={alojamiento.caracteristicas}
                            id={alojamiento._id}>
                </BirbnbCard>
            )}
        </div>
    )
}