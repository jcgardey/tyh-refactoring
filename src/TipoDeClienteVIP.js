const TipoDeClienteNormal = require('./TipoDeClienteNormal.js');

class TipoDeClienteVIP extends TipoDeClienteNormal {
  esVIP() {
    return true;
  }

  bonificacionCompra(monto) {
    return monto * 0.05;
  }

  bonificarRecarga(monto) {
    monto > 50 ? monto * 0.05 : 0;
  }
}
module.exports = TipoDeClienteVIP;
