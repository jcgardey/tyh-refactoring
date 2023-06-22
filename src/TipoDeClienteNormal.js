class TipoClienteNormal {
  esVIP() {
    return false;
  }

  bonificacionCompra(monto) {
    return 0;
  }

  bonificarRecarga(monto) {
    return 0;
  }
}
module.exports = TipoClienteNormal;
