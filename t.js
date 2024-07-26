class T {

        #ultimoEvento;
        #ultimoMensajeTemporalEnviadoId;

        obtenerId(evento) {
                return evento.from.id;
        }

        actualizarUltimoEvento(evento) {
                this.ultimoEvento = evento;
        }

        eliminarMensaje(evento, mensajeId) {
                evento.deleteMessage(mensajeId);
        }

        eliminarUltimoMensajeTemporal() {
                this.eliminarMensaje(
                        this.ultimoEvento,
                        this.ultimoMensajeTemporalEnviadoId,
                );
        }

        async enviarMensajeTemporal(evento, mensaje) {
                const mensajeEnviado = (
                        await this.enviarMensaje(evento, mensaje)
                );
                this.ultimoMensajeTemporalEnviadoId = mensajeEnviado.message_id;
                setTimeout(this.eliminarUltimoMensajeTemporal.bind(this), 2000);
        }

        async enviarMensaje(evento, mensaje) {
                return await evento.replyWithMarkdownV2(mensaje);
        }

        enviarMensajeLineas(evento, mensajeLineas) {
                const mensaje = (
                        mensajeLineas.join('\n')
                        // Limpia caracteres que son formato para Telegram
                        .split('_').join('\\_')
                        .split('.').join('\\.')
                        .split('-').join('\\-')
                        .split('(').join('\\(')
                        .split(')').join('\\)')
                        .split('#').join('\\#')
                        // Re-asigna formato de Telegram
                        .split('»').join('>')
                        .split('«').join('||')
                        // Junta líneas que deberían continuar
                        .split('→\n').join('')
                );
                this.enviarMensaje(evento, mensaje);
        }

        obtenerMensaje(evento) {
                return evento.update.message;
        }

        obtenerMensajeId(evento) {
                return this.obtenerMensaje(evento).message_id;
        }

        obtenerTexto(evento) {
                return this.obtenerMensaje(evento).text;
        }

        obtenerArgumentos(evento) {
                return this.obtenerTexto(evento).toLowerCase().split('_');
        }

        obtenerComando(evento) {
                const comando = (this.obtenerArgumentos(evento)[0] || '');
                if (comando[0] !== '/') {
                        return '';
                }
                return comando.substring(1);
        }

        }

};
module.exports = new T();
