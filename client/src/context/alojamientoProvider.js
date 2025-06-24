import {createContext, useEffect, useState} from "react";
import { getAlojamientos, getAlojamientosSlowly } from "../api/api";


export const AlojamientosContext = createContext()

export const AlojamientosProvider = ({children}) => {

  const [alojamientos, setAlojamientos] = useState([]);
  const [alojamientoDetallado, setDetallado] = useState()

  const detallarAlojamiento = (alojamientoADetallar) => {
    setDetallado(alojamientoADetallar);
  }

  useEffect(() => {
    const cargarAlojamientos = async () => setAlojamientos(await getAlojamientosSlowly())
    cargarAlojamientos()
  }, [])

  const contextValue = {
    alojamientos,
    alojamientoDetallado,
    detallarAlojamiento
  }

  return <AlojamientosContext value={contextValue}>
    {children}
  </AlojamientosContext>
}