import {createContext, useEffect, useState} from "react";
import { getAlojamientosFiltrados } from "../api/alojamientosAPI";


export const AlojamientosContext = createContext()

export const AlojamientosProvider = ({children}) => {

  const [alojamientos, setAlojamientos] = useState([]);


  useEffect(() => {
    const cargarAlojamientos = async () => setAlojamientos(await getAlojamientosFiltrados())
    cargarAlojamientos()
  }, [])

  const contextValue = {
    alojamientos,
    setAlojamientos
  }

  return <AlojamientosContext value={contextValue}>
    {children}
  </AlojamientosContext>
}