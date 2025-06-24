import {createContext, useEffect, useState} from "react";
import { getAlojamientosFiltrados } from "../api/alojamientosAPI";


export const AlojamientosContext = createContext()

export const AlojamientosProvider = ({children}) => {

  const [alojamientos, setAlojamientos] = useState([]);
  const [alojamientoDetallado, setDetallado] = useState()
  

  const detallarAlojamiento = (alojamientoADetallar) => {
    setDetallado(alojamientoADetallar);
  }

  useEffect(() => {
    const cargarAlojamientos = async () => setAlojamientos(await getAlojamientosFiltrados())
    cargarAlojamientos()
  }, [])

  const contextValue = {
    alojamientos,
    alojamientoDetallado,
    detallarAlojamiento,
    setAlojamientos
  }

  return <AlojamientosContext value={contextValue}>
    {children}
  </AlojamientosContext>
}