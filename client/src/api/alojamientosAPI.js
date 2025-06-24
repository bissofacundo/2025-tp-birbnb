import axios from "axios"
import qs from "qs"

export const getAlojamientosFiltrados = async (filtros) => {
    const filtrosTransformados = filtros ? filtros.map(filtro => `params[${filtro.nombre}]=${filtro.valor}`).join("&") : ''
    return axios.get(`http://localhost:4000/alojamientos`, qs.parse(filtrosTransformados)).then(r => r.data.resultados)
}