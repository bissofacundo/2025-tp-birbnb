import { BarraDeBusqueda } from "../../components/barraDeBusqueda/BarraDeBusqueda"
import "./Alojamientos.css"
import { useState } from "react"
import { getAlojamientosFiltrados } from "../../api/alojamientosAPI"

export const Alojamientos = () => {
    const [alojamientos, setAlojamientos] = useState([])

    const mostrarError = (mensajeError) => {
        console.error(mensajeError)
    }
    const alBuscarAlojamientos = async (queryParams) => {
        try {
            const alojamientosObtenidos = await getAlojamientosFiltrados(queryParams)
            console.log(alojamientosObtenidos)
            setAlojamientos( alojamientosObtenidos ) 
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