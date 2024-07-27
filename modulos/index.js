const modulosACargar = [
        'aleatorizador',
        'stop',
];

const modulos = {};

for (const moduloACargar of modulosACargar) {
        modulos[moduloACargar] = require('./' + moduloACargar);
}

module.exports = modulos;
