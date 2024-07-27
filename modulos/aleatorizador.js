/*

/aleatorizador
Dados
Instrucciones...
Usuario responde: /aleatorizador_iniciar

El sistema pregunta cuántas vainas se quieren aleatorizar

El sistema pregunta cada vaina que se quiere aleatorizar
Usuario responde: /aleatorizador_N1,N...,Nn para aleatorizar la lista requerida

*/

function enviarInstrucciones(t, evento) {
        const mensajeLineas = [
                'Aleatorizador',
                '',
                'Te ayudo si tienes una lista de ítems que quieres→',
                'aleatorizar. Puedes enviar el comando /aleatorizador_ITEMS→',
                'donde `ITEMS` son los items de tu lista separados por raya→',
                'al piso, por ejemplo /aleatorizador_jirafa_pato_perro_gato',
        ];
        t.enviarMensajeLineas(evento, mensajeLineas);
}

function enviarListaDesordenada(t, evento) {
        const argumentos = t.obtenerArgumentos(evento);
        argumentos.shift();
        argumentos.sort();
        const itemsSeparadosPorRayaAlPiso = argumentos.join('_');
        let mensajeLineas = [];
        while (argumentos.length) {
                const argumentoIndice = (
                        parseInt(Math.random() * argumentos.length)
                );
                const item = argumentos.splice(argumentoIndice, 1);
                mensajeLineas.push(item);
        }
        const mensajeContinuacionLineas = [
                '',
                '/aleatorizador',
                '...para ver de nuevo las instrucciones',
                '',
                ('/aleatorizador_' + itemsSeparadosPorRayaAlPiso),
                '...para aleatorizar la misma lista',
        ];
        mensajeLineas.push(...mensajeContinuacionLineas);
        t.enviarMensajeLineas(evento, mensajeLineas);
}

function ejecutar(t, evento) {
        const argumentos = t.obtenerArgumentos(evento);
        const primerArgumento = (argumentos[1] || '');
        switch (primerArgumento) {
                case '':
                        enviarInstrucciones(t, evento);
                        break;
                default:
                        enviarListaDesordenada(t, evento);
        }
}

const aleatorizador = {
        descripcion: 'para aleatorizar una lista',
        ejecutar,
};

module.exports = aleatorizador;
