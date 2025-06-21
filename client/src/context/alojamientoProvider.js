import {createContext, useEffect, useState} from "react";
import { getAlojamientos } from "../api/api";


export const AlojamientosContext = createContext()

export const AlojamientosProvider = ({children}) => {
  const [alojamientos, setAlojamientos] = useState([]);

  useEffect(() => {
    const cargarAlojamientos = async () => setAlojamientos(await getAlojamientos())
    cargarAlojamientos()
  }, [])

  const contextValue = {
    alojamientos
  }

  return <AlojamientosContext value={contextValue}>
    {children}
  </AlojamientosContext>
}