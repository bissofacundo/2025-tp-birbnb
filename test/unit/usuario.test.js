import {Usuario} from '../../src/domain/usuario.js'
import {TipoUsuario} from '../../src/domain/enums/tipoUsuario.js';

describe('Usuario', () => {
    test('usuario creado correctamente', () => {
        const usuario = new Usuario('Juan Perez', 'jp@test.com', TipoUsuario.HUESPED);
        expect(usuario.nombre).toBe('Juan Perez');  
        expect(usuario.email).toBe('jp@test.com');
        expect(usuario.tipoUsuario).toBe(TipoUsuario.HUESPED);
    })
    test('usuario creado sin nombre', () => {
        expect(() => new Usuario(null, 'jp@test.com', TipoUsuario.HUESPED)).toThrow('El nombre, el email y el tipo de usuario son obligatorios, se recibio nombre: null, email: jp@test.com y tipo: Huesped');
    })
    test('usuario creado sin email', () => {
        expect(() => new Usuario('Juan Perez', null, TipoUsuario.HUESPED)).toThrow('El nombre, el email y el tipo de usuario son obligatorios, se recibio nombre: Juan Perez, email: null y tipo: Huesped');
    })
    test('usuario creado sin tipo', () => {
        expect(() => new Usuario('Juan Perez', 'jp@test.com', null)).toThrow('El nombre, el email y el tipo de usuario son obligatorios, se recibio nombre: Juan Perez, email: jp@test.com y tipo: null');
    })
    test('usuario creado con email invalido', () => {
        expect(() => new Usuario('Juan Perez', 'jp@test', TipoUsuario.HUESPED)).toThrow('El email ingresado tiene un formato invalido, se recibio: jp@test');
    })
})   