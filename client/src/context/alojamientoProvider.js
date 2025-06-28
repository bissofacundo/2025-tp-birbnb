import {createContext, useEffect, useState} from "react";
import { getAlojamientosFiltrados } from "../api/alojamientosAPI";


export const AlojamientosContext = createContext()

export const AlojamientosProvider = ({children}) => {

  const [alojamientos, setAlojamientos] = useState([]);

  const parseId = (alojamientos) => {
    let i = 0
    const alojamientosFront = alojamientos.map(alojamiento => {
      return {...alojamiento, idFront: ++i}
    })
    setAlojamientos(alojamientosFront)
  }

  const findAlojamientoById = (idAlojamiento) => {
    return alojamientos.find(alojamiento => alojamiento.id === idAlojamiento)
  }

  useEffect(() => {
    const cargarAlojamientos = async () => parseId(await getAlojamientosFiltrados())
    cargarAlojamientos()
  }, [])

  const contextValue = {
    alojamientos,
    setAlojamientos,
    findAlojamientoById
  }

  return <AlojamientosContext value={contextValue}>
    {children}
  </AlojamientosContext>
}