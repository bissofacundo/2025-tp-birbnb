export class Usuario {
    nombre
    email
    tipo_usuario

    constructor(nombre, email, tipoUsuario) {
        this.validarDatosIngresados(nombre,email,tipoUsuario);
        this.nombre = nombre;
        this.email = email;
        this.tipoUsuario = tipoUsuario;
    }

    validarEmail(email) {
        const exp_reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        return exp_reg.test(email);
    }

    validarDatosIngresados(nombre,email,tipo) {
        if(!nombre || !email || !tipo) {
            throw new UsuarioInvalido(`El nombre, el email y el tipo de usuario son obligatorios, se recibio nombre: ${nombre}, email: ${email} y tipo: ${tipo}`);
        }
        if(!this.validarEmail(email)) {
            throw new UsuarioInvalido(`El email ingresado tiene un formato invalido, se recibio: ${email}`);
        }
    }
}
