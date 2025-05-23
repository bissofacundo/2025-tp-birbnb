export class Foto {
    descripcion;
    path;

    constructor(descripcion, path) {
        this.validarParametros(descripcion, path)
        this.descripcion = descripcion
        this.path = path
    }

    validarParametros(descripcion, path) {
        if ([descripcion, path].some(v => !v)) {
            throw new FotoInvalida(`La foto necesita descripcion y path, se recibio descripcion: ${descripcion}, path: ${path}` );
          }
    }
}