import {createContext, useEffect, useState} from "react";
import { getAlojamientosFiltrados } from "../api/alojamientosAPI";
import { AlojamientosContext } from "./alojamientoProvider";
import { useContext } from "react";


export const DetailContext = createContext()

export const DetailProvider = ({children}) => {

  const mocker = () => {
    return {
        nombre: "",
        descripcion: "",
        direccion: {
            calle: "",
            altura: "",
            ciudad: "",
            pais: "",
        },
        precioPorNoche: 0,
        moneda: "",
        horarioCheckIn: "",
        horarioCheckOut: "",
        cantHuespedesMax: 0,
        caracteristicas: [],
        fotos: []
    }
  }

  const {alojamientos} = useContext(AlojamientosContext); 
  const [alojamientoDetallado, setDetallado] = useState(mocker())
  
  const detallarAlojamiento = (id) => {
    console.log(alojamientos)
    setDetallado(alojamientos.find(alojamiento => alojamiento.idFront === parseInt(id)))
  }

  const contextValue = {
    alojamientoDetallado,
    detallarAlojamiento
  }

  return <DetailContext value={contextValue}>
    {children}
  </DetailContext>
}