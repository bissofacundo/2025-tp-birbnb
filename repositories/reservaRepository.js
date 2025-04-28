//agregar import de ENUMS

export const ReservaRepository = {
    reservas: [],

    cambiarEstado(id, estado){ //TODO: checkear que el ENUM y el id existan
        reservaElegida = FindById(id, this.reservas)
        reservaElegida.estado = estado //vi que el profesor no actualizaba, sino que removía el elemento y añadía el actualizado
        return reservaElegida
    }
}

function FindById(id, lista){
    return lista.find(e => e.id === id)
}