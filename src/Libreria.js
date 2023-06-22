const Cliente = require('./Cliente');

class Libreria {
  constructor() {
    this._compras = [];
    this._clientes = [];
  }

  registrarCliente(id, credito) {
    const cliente = new Cliente(id, credito);
    this._clientes.push(cliente);
    return cliente;
  }

  // método largo
  rkCli() {
    const aux = {};
    this._clientes.forEach((cliente) => {
      if (!aux[cliente.id()]) {
        aux[cliente.id()] = 0;
      }
      cliente._compras.forEach((comp) => {
        comp.libros().forEach((l) => (aux[cliente.id()] += l.precio()));
      });
    });
    const rk = [];
    Object.keys(aux).forEach((clientId) =>
      rk.push({ id: clientId, total: aux[clientId] })
    );
    for (let i = 0; i < rk.length; i++) {
      for (let j = i + 1; j < rk.length; j++) {
        if (rk[j].total > rk[i].total) {
          const elem = rk[i];
          rk[i] = rk[j];
          rk[j] = elem;
        }
      }
    }
    return rk;
  }

  recomendarLibros(cliente, criterio) {
    if (criterio == 'popular') {
      const ventas = [];
      const librosVendidos = this._clientes.flatMap((c) => c.librosComprados());
      new Set(librosVendidos).forEach((libro) => {
        ventas.push({
          libro,
          cantidad: librosVendidos.filter((l) => libro == l),
        });
      });
      return ventas
        .sort((venta, otroVenta) => otroVenta.total - venta.total)
        .map((venta) => venta.libro)
        .filter((libro) => !cliente.librosComprados().includes(libro));
    } else if (criterio == 'similar') {
      const librosCandidatos = new Set(
        cliente.librosComprados().flatMap((libro) => libro.similares())
      );
      return Array.from(librosCandidatos).filter(
        (libro) => !cliente.librosComprados().includes(libro)
      );
    }
  }
}

module.exports = Libreria;
