const letrasLineasPorLetra = require('./letrasLineasPorLetra');
const stop = function(t, evento) {
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
                        '...para reiniciar el juego',
                        '',
                        ('/stop\\_' + letrasExcluidasTexto),
                        '...para obtener otra letra sin repetir',
                ];
        }
        const letraNumero = (letrasExcluidasCantidad + 1);
        const mensajeLineas = [
                (letraSeleccionada + ' - Letra #' + letraNumero),
                '```',
                ...letrasLineasPorLetra[letraSeleccionada],
                '```',
                ...mensajeContinuacionLineas,
        ];
        t.enviarMensajeLineas(evento, mensajeLineas);
};
module.exports = stop;
