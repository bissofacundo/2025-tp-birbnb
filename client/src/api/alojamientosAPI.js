import axios from "axios"
import qs from "qs"

export const getAlojamientosFiltrados = async (filtros) => {
    const filtrosTransformados = filtros ? filtros.map(filtro => `params[${filtro.nombre}]=${filtro.valor}`).join("&") : ''
    return axios.get(`https://two025-tp-birbnb.onrender.com/alojamientos`, qs.parse(filtrosTransformados)).then(r => r.data.resultados)
}