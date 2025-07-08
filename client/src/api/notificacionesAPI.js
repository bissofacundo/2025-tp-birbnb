import axios from "axios"
import qs from "qs"

export const getAlojamientosFiltrados = async (id_usuario, estaLeida) => {
    const filtrosTransformados = [{nombre: 'id_usuario', valor: id_usuario}, {nombre: 'leida', valor: estaLeida}].map(filtro => `params[${filtro.nombre}]=${filtro.valor}`).join("&")
    return axios.get(`https://two025-tp-birbnb.onrender.com/notificaciones`, qs.parse(filtrosTransformados)).then(r => r.data)
}

export const marcarComoLeidaLaNotificacion = async (id_notificacion) => {
    return axios.patch(`https://two025-tp-birbnb.onrender.com/notificaciones/${id_notificacion}`).then(r => r.data)
}