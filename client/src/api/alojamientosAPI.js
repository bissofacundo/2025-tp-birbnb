import axios from "axios"

const alojamientosAPI = axios.create({baseURL: process.env.SERVER_URL})

export const getAlojamientosFiltrados = async (filtros) => {
    const params = new URLSearchParams()
    filtros.forEach(filtro => 
        params.append(filtro.nombre, filtro.valor) )
    return alojamientosAPI.get("/alojamientos", params).then(r => r.data)
}