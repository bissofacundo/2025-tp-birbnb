import axios from "axios"

export const getAllReservasByIdusuario = (idUsuario) => {
    return axios.get(`https://two025-tp-birbnb.onrender.com/usuarios/${idUsuario}/reservas`).then(r => r.data)
}

export const modificarReserva = ({idReserva, cantHuespedes, fechaInicio, fechaFin}) => {
    return axios.put(`https://two025-tp-birbnb.onrender.com/reservas/${idReserva}`).then(r => r.data)
}

export const hacerReserva = ({huespedReservador, alojamiento, fechaInicio, fechaFin, cantHuespedes}) => {
    return axios.post(`https://two025-tp-birbnb.onrender.com/reservas`, 'data : { idUsuario: idUsuario, idAlojamiento: idAlojamiento, fechaInicio: fechaInicio, fechaFin: fechaFin}').then(r => r.data)
}

export const cancelarReserva = ({idReserva, motivo}) => {
    return axios.patch(`https://two025-tp-birbnb.onrender.com/reservas/${idReserva}`).then(r => r.data)
}