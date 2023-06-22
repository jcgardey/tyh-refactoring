const LibroDigital = require('./LibroDigital');
const Libreria = require('./Libreria');
const LibroImpreso = require('./LibroImpreso');

test('detalle de compra', () => {
  const libreria = new Libreria();
  const pedro = libreria.registrarCliente('pedro', 7000);
  refactoring = new LibroDigital('Refactoring', 'Martin Fowler', 3500);
  tdd = new LibroImpreso('TDD', 'Kent Beck', 2000);
  const compra = pedro.comprar([tdd, refactoring]);
  expect(compra.detalle()).toBe(
    'TDD - Kent Beck - $2420\nRefactoring - Martin Fowler - $3570\nTOTAL: $5990'
  );
});
