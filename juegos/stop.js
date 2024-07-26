const letrasLineasPorLetra = require('./letrasLineasPorLetra');

function enviarInstrucciones(t, evento) {
        const mensajeLineas = [
                'STOP',
                '',
                'Si ya sabes cómo jugar, puedes recibir la primera letra con→',
                '/stop_iniciar, sino estas son las instrucciones:',
                '',
                '»1. Escribe las categorías en algún lugar, lo más común es→',
                'una hoja, y algunas categorías podrían ser:',
                '»- Animal',
                '»- Comida',
                '»- Famoso',
                '»- Lugar',
                '»- Objeto',
                '»o incluso podrías usar frases, algunas podrían ser:',
                '»- Llegué tarde por',
                '»- Mi papá me abandonó por',
                '»- Prefiero que me',
                '»',
                '»2. Escoge una letra (aquí es cuando entro yo) y con ella→',
                'los jugadores deben iniciar todas las respuestas',
                '»',
                '»3. El primer jugador en haber llenado todas las categorías→',
                'dice "STOP" y todos deben dejar de escribir. Luego lee cada→',
                'categoría, y cada jugador, incluyéndolo, lee lo que escribió→',
                'en ella. Los puntajes se suelen manejar así:',
                '»- 50 puntos para todas las personas que hayan llenado→',
                'correctamente la categoría, pero su respuesta también fue→',
                'escrita por alguien más',
                '»- 100 puntos para todas las personas que hayan llenado→',
                'correctamente la categoría, con una respuesta que nadie más→',
                'escribió',
                '»- 200 puntos para una persona si llenó correctamente una→',
                'categoría que nadie más llenó',
                '»',
                '»4. Al finalizar de escribir los puntos, cada jugador suma→',
                'los suyos',
                '»',
                '»5. Me pides otra letra para seguir a la siguiente ronda',
                '»',
                '»6. Al terminar las letras, o el juego, suman los puntos y→',
                '»determinan quien ganó',
                '»',
                '»Al iniciar te enviaré una letra aleatoria sin repetición',
                '»/stop_iniciar«',
        ];
        t.enviarMensajeLineas(evento, mensajeLineas);
}

function enviarSiguienteLetraSinRepeticion(t, evento) {
        const argumentos = t.obtenerArgumentos(evento);
        const letrasExcluidas = (argumentos[1] || '').toUpperCase().split('');
        const letrasExcluidasPorLetra = {};
        for (const letraExcluida of letrasExcluidas) {
                if (!letraExcluida.match(/[a-z]/i)) {
                        continue;
                }
                letrasExcluidasPorLetra[letraExcluida] = true;
        }
        const letrasExcluidasCantidad = (
                Object.keys(letrasExcluidasPorLetra).length
        );
        const letrasDisponiblesPorLetra = [];
        for (let letraCodigo = 65; letraCodigo <= 90; letraCodigo++) {
                const letra = String.fromCharCode(letraCodigo);
                if (letrasExcluidasPorLetra[letra]) {
                        continue;
                }
                letrasDisponiblesPorLetra[letra] = true;
        }
        const letrasDisponibles = Object.keys(letrasDisponiblesPorLetra);
        const letraSeleccionadaIndice = (
                parseInt(Math.random() * letrasDisponibles.length)
        );
        const letraSeleccionada = letrasDisponibles[letraSeleccionadaIndice];
        letrasExcluidasPorLetra[letraSeleccionada] = true;
        const estaEsLaUltimaLetra = (letrasExcluidasCantidad === 25);
        let mensajeContinuacionLineas = [
                'Esa fue la última letra, ahora revisa quien ganó!',
        ];
        if (!estaEsLaUltimaLetra) {
                const letrasExcluidasTexto = (
                        Object.keys(letrasExcluidasPorLetra).join('')
                );
                mensajeContinuacionLineas = [
                        '/stop',
                        '...para ver de nuevo las instrucciones',
                        '',
                        '/stop_iniciar',
                        '...para reiniciar el juego',
                        '',
                        ('/stop_' + letrasExcluidasTexto),
                        '...para obtener otra letra sin repetir',
                ];
        }
        const letraNumero = (letrasExcluidasCantidad + 1);
        const mensajeLineas = [
                (letraSeleccionada + ' - Letra #' + letraNumero),
                '',
                '```',
                ...letrasLineasPorLetra[letraSeleccionada],
                '```',
                '',
                ...mensajeContinuacionLineas,
        ];
        t.enviarMensajeLineas(evento, mensajeLineas);
}

const stop = function(t, evento) {
        const argumentos = t.obtenerArgumentos(evento);
        const primerArgumento = (argumentos[1] || '');
        switch (primerArgumento) {
                case '':
                        enviarInstrucciones(t, evento);
                        break;
                case 'iniciar':
                        t.borrarArgumentos(evento);
                default:
                        enviarSiguienteLetraSinRepeticion(t, evento);
        }
};

module.exports = stop;
