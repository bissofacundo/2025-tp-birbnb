//agregar import de ENUMS

export const ReservaRepository = {
    reservas: [],

    cambiarEstado(id, estado){ //TODO: checkear que el ENUM y el id existan
        reservaElegida = this.findReservaId(id)
        reservaElegida.actualizarEstado(estado)
        return reservaElegida
    },

    findReservaId(id){
        return this.reservas.find(e => e.id === id)
    },
    
    agregarReserva(nuevaReserva){
        this.reservas.push(nuevaReserva)
    }
}