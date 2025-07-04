import { useContext } from 'react';
import { AlojamientosContext } from '../../context/alojamientoProvider';
import "./AlojamientoDetail.css"
import { Button, FormControl, Input, InputLabel, TextField} from '@mui/material';
import { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from 'react-router';
import LinearProgress from '@mui/material/LinearProgress';
import { ChipBoxCaracteristicas } from '../../components/chipBoxCaracteristicas/ChipBoxCaracteristicas';

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

    const fechaFinal = () => {
        var fecha = new Date()
        fecha.setDate(fecha.getDate() + 5)
        return fecha.toISOString().split('T')[0]
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
                    <img src={showedFoto.fotos[showedFoto.indice].path} alt={`Alojamiento con ${alojamientoDetallado.id} y nombre ${alojamientoDetallado.nombre}`}></img>
                <div class="rightButton">
                    <Button onClick={() => handleRight()}>
                        <ArrowForwardIosIcon></ArrowForwardIosIcon>
                    </Button>
                </div>
            </div>
            <div class="image-footer">
                <div class="description">
                    <ChipBoxCaracteristicas caracteristicas={alojamientoDetallado.caracteristicas}/>
                    <h1>{alojamientoDetallado.nombre}</h1>
                    <p>{alojamientoDetallado.descripcion}</p>
                    <p>Dirección: {alojamientoDetallado.direccion.calle} {alojamientoDetallado.direccion.altura}, {alojamientoDetallado.direccion.ciudad}, {alojamientoDetallado.direccion.pais}</p>
                    <p>Precio por noche: {alojamientoDetallado.precioPorNoche} {alojamientoDetallado.moneda}</p>
                    <p>Horario de Check In: {alojamientoDetallado.horarioCheckIn}</p>
                    <p>Horario de Check Out: {alojamientoDetallado.horarioCheckOut}</p>
                    <p>Hasta {alojamientoDetallado.cantHuespedesMax} huesped/es</p>
                </div>
                <div class="buying-section">
                    <form>
                        <FormControl>
                            <InputLabel htmlFor='cant-huespedes'>Cantidad de Huespedes</InputLabel>
                            <Input type='number' aria-label='Cantidad de huespedes' id='cant-huespedes' />
                        </FormControl>
                        <FormControl>
                            <TextField type='date' label='Fecha de Inicio' defaultValue={new Date().toISOString().split('T')[0]} aria-label='Fecha de Inicio' id='fecha-inicio' name='fecha-inicio' required/>
                        </FormControl>
                        <FormControl>
                            <TextField type='date' label='Fecha de Finalización' defaultValue={fechaFinal()} aria-label='Fecha de Finalizacion' id='fecha-fin' name='fecha-fin' required/>
                        </FormControl>
                            <Button variant='contained' className='boton-reservar'>Reservar</Button>
                    </form>
                    
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
            {findAlojamientoById(id) 
            ? <AlojamientoDetailLoaded alojamientoDetallado={findAlojamientoById(id)} fillFotos={fillFotos} key={id} ></AlojamientoDetailLoaded> 
            : <LinearProgress color="secondary" />}
        </>
    )
}