import { useContext } from 'react';
import { AlojamientosContext } from '../../context/alojamientoProvider';

export const AlojamientoDetail = () => {

    const {alojamientoDetallado: alojamiento} = useContext(AlojamientosContext); 

    return(

        <>
            <p>En progreso el detalle de alojamiento!</p>
            <p>{alojamiento.nombre}</p>
            <p>{alojamiento.descripcion}</p>
        </>
    )
}