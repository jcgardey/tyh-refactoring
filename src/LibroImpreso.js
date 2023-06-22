const Libro = require('./Libro.js');

class LibroImpreso extends Libro{
    precio(){
        return super.precio() + this.gastosDeEnvio();
    }
    gastosDeEnvio(){
        return 400;
    }
    porcentajeDeComision(){
        return 0.01;
    }
}
module.exports = LibroImpreso;