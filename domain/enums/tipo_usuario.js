export class TipoUsuario  {
    tipoUsuario;

    static fromString(token){
        return values(TipoUsuario).find(tipo => tipo.tipoUsuario.toUpperCase() === token)
    }

    constructor(tipo){
        this.tipoUsuario = tipo
    }

}

TipoUsuario.HUESPED = new TipoUsuario("Huesped")
TipoUsuario.ANFITRION =  new TipoUsuario("Anfitrion")

