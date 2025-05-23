import {Notificacion} from '../../models/domain/notificacion.js';
import {Usuario} from '../../models/domain/usuario.js';
import {TipoUsuario} from '../../models/domain/enums/tipo_usuario.js';

describe('Notificacion', () => {
    const juanPerez = new Usuario('Juan Perez', 'juan_perez@test.com',TipoUsuario.HUESPED);   

    test('notificacion creada correctamente', () => {
        const notificacion = new Notificacion(juanPerez, 'test unitario');
        expect(notificacion.usuario).toBe(juanPerez);
        expect(notificacion.mensaje).toBe('test unitario');
        expect(notificacion.fechaAlta).toBeInstanceOf(Date);
        expect(notificacion.leida).toBe(false);
        expect(notificacion.fechaLeida).toBeNull();
    })

    test('notificacion creada sin usuario', () => {
        expect(() => new Notificacion(null, 'test unitario')).toThrow('El usuario y el mensaje son obligatorios, se recibio usuario: null y mensaje: test unitario');
    })

    test('notificacion creada sin mensaje', () => {
        expect(() => new Notificacion(juanPerez, null)).toThrow('El usuario y el mensaje son obligatorios, se recibio usuario: [object Object] y mensaje: null');
    })

    test('notificacion creada sin usuario y sin mensaje', () => {
        expect(() => new Notificacion(null, null)).toThrow('El usuario y el mensaje son obligatorios, se recibio usuario: null y mensaje: null');
    })

    test('marcar notificacion como leida', () => {
        const notificacion = new Notificacion(juanPerez, 'test unitario');
        notificacion.marcarComoLeida();
        expect(notificacion.leida).toBe(true);
        expect(notificacion.fechaLeida).toBeInstanceOf(Date);
    })


})
