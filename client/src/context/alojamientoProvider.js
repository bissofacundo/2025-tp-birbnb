import {createContext, useEffect, useState} from "react";
import { getAlojamientosFiltrados } from "../api/alojamientosAPI";


export const AlojamientosContext = createContext()

export const AlojamientosProvider = ({children}) => {

  const [alojamientos, setAlojamientos] = useState([]);

  const parseFotos = (alojamiento) => {
    return alojamiento.fotos.length === 0 
    ? {...alojamiento, fotos: mockFotosAlojamiento()} 
    : alojamiento
  }

  const mockFotosAlojamiento = () => {
      return [{
        descripcion: "",
        path: ""
      }]
  }

  const parseIdYFotos = (alojamientos) => {
    let i = 0
    const alojamientosFront = alojamientos.map(alojamiento => {
      return {...alojamiento, idFront: ++i}
    }).map(alojamiento => {
      return parseFotos(alojamiento)
    })
    setAlojamientos(alojamientosFront)
  }

  const findAlojamientoById = (idAlojamiento) => {
    return alojamientos.find(alojamiento => alojamiento.id === idAlojamiento)
  }

  useEffect(() => {
    const cargarAlojamientos = async () => parseIdYFotos(await getAlojamientosFiltrados())
    cargarAlojamientos()
  })

  const contextValue = {
    alojamientos,
    setAlojamientos,
    findAlojamientoById
  }



  return <AlojamientosContext value={contextValue}>
    {children}
  </AlojamientosContext>
}