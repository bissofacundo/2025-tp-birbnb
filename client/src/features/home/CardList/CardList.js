import { Card, CardContent, Button} from '@mui/material'
import AspectRatio from '@mui/joy/AspectRatio';
import CardOverflow from '@mui/joy/CardOverflow';
import './CardList.css'

const alVerMas = () => {
    alert('clicked');
}

export const CardList = ({alojamientos}) => {

//console.log(alojamientos.map((alojamiento) =>alojamiento.fotos[0].path))

return(
    <div class="cardlist">{
        alojamientos.map((alojamiento) => 
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
                        src={alojamiento.fotos[0].path}
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
                            <Button variant="contained" color="primary" size="md" onClick={alVerMas}>
                                ver mas +
                            </Button>
                        </CardOverflow>
                    </div>
                </div>
            </Card>
            )}
        </div>
    )
}