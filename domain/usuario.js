export class Usuario {
    nombre
    email
    tipo_usuario

    constructor(nombre, email, tipoUsuario) {
        this.nombre = nombre;
        this.email = email;
        this.tipoUsuario = tipoUsuario;
    }
}
