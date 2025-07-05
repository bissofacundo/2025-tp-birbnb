import axios from "axios"

export const getAllReservasByIdusuario = (idUsuario) => {
    return axios.get(`http://localhost:4000/usuarios/${idUsuario}/reservas`).then(r => r.data)
}

export const modificarReserva = ({idReserva, cantHuespedes, fechaInicio, fechaFin}) => {
    return axios.put(`http://localhost:4000/reservas/${idReserva}`).then(r => r.data)
}

export const hacerReserva = ({huespedReservador, alojamiento, fechaInicio, fechaFin, cantHuespedes}) => {
    return axios.post(`http://localhost:4000/reservas`, 'data : { idUsuario: idUsuario, idAlojamiento: idAlojamiento, fechaInicio: fechaInicio, fechaFin: fechaFin}').then(r => r.data)
}

export const cancelarReserva = ({idReserva, motivo}) => {
    return axios.patch(`http://localhost:4000/reservas/${idReserva}`).then(r => r.data)
}