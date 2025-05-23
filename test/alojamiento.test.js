import { crearFiltro } from "../domain/filtro";

describe('construirFiltro', () => {
  test('Crear un filtro completo con todos sus parametros', () => {
    const req = {
      query: {
        precioMin: '50',
        precioMax: '100',
        ciudad: 'Buenos Aires',
        pais: 'Argentina',
        caracteristicas: 'WIFI,PISCINA',
        huespedes: 4,
        page: '2',
        limit: '5',
        calle: 'Bartolome Mitre',
        altura: 1780,
        lat: "76°223",
        long: "-176°223"
      }
    };

    const filtro = crearFiltro(req);

    expect(filtro.precioMin).toBe('50');
    expect(filtro.precioMax).toBe('100');
    expect(filtro.ciudad).toBe('Buenos Aires');
    expect(filtro.pais).toBe('Argentina');
    expect(filtro.caracteristicas).toEqual(['WIFI', 'PISCINA']);
    expect(filtro.huespedes).toEqual(4);
    expect(filtro.page).toBe(2);
    expect(filtro.limit).toBe(5);
    expect(filtro.calle).toBe('Bartolome Mitre');
    expect(filtro.altura).toBe(1780);
    expect(filtro.lat).toBe("76°223");
    expect(filtro.long).toBe("-176°223");
  });
  test('Crear un filtro a partir de una query vacia', () => {
    const req = {
      query: {}
    };
    const filtro = crearFiltro(req);

    expect(filtro.page).toBe(1);
    expect(filtro.limit).toBe(10);
  });
});
