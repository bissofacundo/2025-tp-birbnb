export class TipoUsuario  {
    tipo_usuario;

    static fromString(token){
        return values(TipoUsuario).find(tipo => tipo.tipo_usuario.toUpperCase() === token)
    }

    constructor(tipo){
        this.tipo_usuario = tipo
    }

}

TipoUsuario.HUESPED = new TipoUsuario("Huesped")
TipoUsuario.ANFITRION =  new TipoUsuario("Anfitrion")

