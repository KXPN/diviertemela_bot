const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

const env = require('./.env');
const t = require('./t');
const juegos = require('./juegos/');

const bot = new Telegraf(env.LLAVE);
const autorizadosPorId = env.AUTORIZADOS_POR_ID;

bot.start(enviarSaludoInicial);
bot.help(enviarAyuda);
bot.on(message('text'), revisarMensaje);

function enviarAyuda(evento) {
        const juegosLineas = [];
        for (const juego in juegos) {
                juegosLineas.push('/' + juego);
        }
        const mensajeLineas = [
                'Esto son los juegos que sé jugar hasta ahora:',
                '',
                ...juegosLineas,
        ];
        t.enviarMensajeLineas(evento, mensajeLineas);
}

function enviarSaludoInicial(evento) {
        enviarAyuda(evento);
}

function validarAutorizacion(usuarioId) {
        const usuarioEstaAutorizado = !!autorizadosPorId[usuarioId];
        return usuarioEstaAutorizado;
}

function ejecutarComando(evento) {
        const comando = t.obtenerComando(evento);
        if ((comando in juegos) && (typeof juegos[comando] === 'function')) {
                juegos[comando](t, evento);
                return;
        }
        t.enviarMensaje(evento, 'No conozco ese comando 😢');
}

function revisarMensaje(evento) {
        const mensaje = t.obtenerMensaje(evento);
        const mensajeTexto = t.obtenerTexto(evento);
        const comando = t.obtenerComando(evento);
        if (comando) {
                ejecutarComando(evento);
                return;
        }
        const usuarioEstaAutorizado = validarAutorizacion(t.obtenerId(evento));
        if (!usuarioEstaAutorizado) {
                t.enviarMensaje(evento, 'Mis respuestas son limitadas 🤓');
                return;
        }
        t.enviarMensaje(evento, 'Alguno de los dos está fallando 🤪');
}

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
