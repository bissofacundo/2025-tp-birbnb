import { BarraDeBusqueda } from "../../components/barraDeBusqueda/BarraDeBusqueda"
import "./Alojamientos.css"
import { useState } from "react"
import { getAlojamientosFiltrados } from "../../api/alojamientosAPI"

export const Alojamientos = () => {
    const [alojamientos, setAlojamientos] = useState([])
    
    const mostrarError = (mensajeError) => {
        //TODO
    }
    const alBuscarAlojamientos = async (queryParams) => {
        try {
            setAlojamientos( await getAlojamientosFiltrados(queryParams) ) 
        } catch(error) {
            mostrarError(error.message)
        }
    }

    return(
        <>
        <section>
            <header className="cabecera-alojamientos">
                <BarraDeBusqueda alBuscarAlojamientos={alBuscarAlojamientos}/>
            </header>
        </section>
        </>
    )
}