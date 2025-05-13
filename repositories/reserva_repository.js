

export class ReservaRepository {
    coleccionReserva

    constructor(DBCLIENT) {
        this.coleccionReserva = DBCLIENT.colection("")
    }

}