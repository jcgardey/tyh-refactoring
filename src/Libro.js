class Libro {
  constructor(titulo, autor, costo) {
    this._titulo = titulo;
    this._autor = autor;
    this._costo = costo;
    this._similares = [];
  }

  agregarSimilar(otroLibro) {
    this._similares.push(otroLibro);
    otroLibro._similares.push(this);
  }

  precio() {
    return this._costo + this.comision();
  }

  titulo() {
    return this._titulo;
  }

  autor() {
    return this._autor;
  }

  similares() {
    return this._similares;
  }

  comision() {
    return this._costo * this.porcentajeDeComision();
  }
  porcentajeDeComision() {
    throw new Error('Falta implementar el % de comision');
  }
}

module.exports = Libro;
