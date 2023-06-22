const Libro = require('./Libro.js');
const Compra = require('./Compra.js');
const TipoClienteNormal = require('./TipoDeClienteNormal.js');
const TipoDeClienteVIP = require('./TipoDeClienteVIP.js');

class Cliente {
  constructor(id, credito) {
    this._id = id;
    this._credito = credito || 0;
    this._compras = [];
    this._tipo = new TipoClienteNormal();
  }

  id() {
    return this._id;
  }

  credito() {
    return this._credito;
  }
  recargarCredito(monto) {
    this._credito = this._credito + monto + this._tipo.bonificarRecarga(monto);
  }

  montoCompra(libros) {
    return libros.reduce((total, libro) => total + libro.precio(), 0);
  }

  comprar(libros) {
    if (this._credito < this.montoCompra(libros)) {
      throw new Error('Credito insuficiente');
    }
    this._credito =
      this._credito -
      this.montoCompra(libros) +
      this._tipo.bonificacionCompra(this.montoCompra(libros));
    let compra = new Compra(libros, this);
    this._compras.push(compra);

    let comprasDelMes = this._compras.filter((compra) => compra.delMesActual());
    let gastoDelMes = comprasDelMes.reduce(
      (total, compra2) => total + compra2.monto(),
      0
    );
    if (gastoDelMes > 200) this._tipo = new TipoDeClienteVIP();
    return compra;
  }

  librosComprados() {
    return this._compras.flatMap((compra) => compra.libros());
  }

  esVIP() {
    return this._tipo.esVIP();
  }
}
module.exports = Cliente;
