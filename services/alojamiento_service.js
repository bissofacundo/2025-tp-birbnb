export const AlojamientoService = {
    async guardarAlojamiento(alojamiento, alojamientoMongo){
        UsuarioService.guardarUsuario(alojamiento.anfitrion, alojamientoMongo.anfitrion)
        return await ReservaRepository.guardarReserva(this.reservaADoc(reserva, reservaMongo))
    }
}