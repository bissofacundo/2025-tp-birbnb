export class Moneda  {
    moneda;

    constructor(moneda){
        this.moneda = moneda
    }
}

TipoUsuario.HUESPED = new TipoUsuario("Huesped")
TipoUsuario.ANFITRION =  new TipoUsuario("Anfitrion")


Moneda.DOLAR_USA = new Moneda("DOLAR_USA")
Moneda.PESO_ARG = new Moneda ("PESO_ARG")
Moneda.REALES = new Moneda("REALES")