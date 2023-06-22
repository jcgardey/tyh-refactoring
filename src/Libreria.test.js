const LibroDigital = require('./LibroDigital');
const LibroImpreso = require('./LibroImpreso');
const Libreria = require('./Libreria');
const Libro = require('./Libro');

let juan, jose, pedro;
let libreria;
let patrones, refactoring, tdd;

beforeEach(() => {
  libreria = new Libreria();
  juan = libreria.registrarCliente('juan', 6000);
  jose = libreria.registrarCliente('jose');
  pedro = libreria.registrarCliente('pedro', 10000);

  patrones = new LibroImpreso('OO Patterns', 'Gamma et al', 5000); // 5450
  refactoring = new LibroDigital('Refactoring', 'Martin Fowler', 3500); // 3570
  tdd = new LibroImpreso('TDD', 'Kent Beck', 2000); // 2420

  patrones.agregarSimilar(refactoring);
  patrones.agregarSimilar(tdd);
  refactoring.agregarSimilar(tdd);
});

test('ranking de clientes', () => {
  juan.comprar([patrones]);
  pedro.comprar([tdd, refactoring]);
  expect(libreria.rkCli()).toEqual([
    { id: 'pedro', total: 2420 + 3570 },
    { id: 'juan', total: 5450 },
    { id: 'jose', total: 0 },
  ]);
  expect(libreria.rkCli()).not.toEqual([
    { id: 'juan', total: 5450 },
    { id: 'jose', total: 0 },
    { id: 'pedro', total: 2420 + 3570 },
  ]);
});

test('recomendar libros', () => {
  juan.comprar([patrones]);
  pedro.comprar([patrones, tdd]);
  expect(libreria.recomendarLibros(jose, 'popular')).toEqual([patrones, tdd]);
  expect(libreria.recomendarLibros(jose, 'similar')).toEqual([]);

  expect(libreria.recomendarLibros(juan, 'similar')).toContain(refactoring);
  expect(libreria.recomendarLibros(juan, 'similar')).toContain(tdd);
});
