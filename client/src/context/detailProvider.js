import {createContext, useEffect, useState} from "react";
import { getAlojamientosFiltrados } from "../api/alojamientosAPI";


export const DetailContext = createContext()

export const DetailProvider = ({children}) => {

  const [alojamientoDetallado, setDetallado] = useState()
  
  const detallarAlojamiento = (alojamientoADetallar) => {
    setDetallado(alojamientoADetallar);
  }

  const contextValue = {
    alojamientoDetallado,
    detallarAlojamiento
  }

  return <DetailContext value={contextValue}>
    {children}
  </DetailContext>
}