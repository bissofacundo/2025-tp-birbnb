import { BarraDeBusqueda } from "../../components/barraDeBusqueda/BarraDeBusqueda"
import "./Alojamientos.css"
import { getAlojamientosFiltrados } from "../../api/alojamientosAPI"
import { Carousel } from "../home/Carousel/Carousel"
import { useContext } from "react"
import { AlojamientosContext } from "../../context/alojamientoProvider"
import {Pagination, Input} from "@mui/material"

export const Alojamientos = () => {
    const {setAlojamientos, alojamientos} = useContext(AlojamientosContext); 

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
        <section>
            <header className="cabecera-alojamientos">
                <BarraDeBusqueda alBuscarAlojamientos={alBuscarAlojamientos}/>
            </header>
             {alojamientos.length  !== 0 ? <Carousel subtitulo={"Tus Alojamientos Recomendados"}></Carousel> : <h3 className="sin-alojamientos">No se encontraron los alojamientos filtrados</h3> } 
            <div className="paginacion">
                <Input  type="number" />
                <Pagination count={10} variant="outlined" />
            </div>
        </section>
    )
}