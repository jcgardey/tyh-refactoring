const Libro = require('./Libro.js');

class LibroDigital extends Libro{
    porcentajeDeComision(){
        return 0.02;
    }
}

module.exports = LibroDigital;