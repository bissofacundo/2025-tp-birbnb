import axios from "axios"


export const getAlojamientosFiltrados = async (filtros) => {
    const params = new URLSearchParams()
    filtros.forEach(filtro => 
        params.append(filtro.nombre, filtro.valor) )
    console.log(`http://localhost:4000/alojamientos`)
    return axios.get(`http://localhost:4000/alojamientos`, params).then(r => r.data)
}