export class TipoUsuario  {
    tipo_usuario;

    constructor(tipo){
        this.tipo_usuario = tipo
    }
}

TipoUsuario.HUESPED = new TipoUsuario("Huesped")
TipoUsuario.ANFITRION =  new TipoUsuario("Anfitrion")

