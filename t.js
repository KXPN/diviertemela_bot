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
                return await evento.replyWithMarkdown(mensaje);
        }

        enviarMensajeLineas(evento, mensajeLineas) {
                const mensaje = mensajeLineas.join('\n');
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

        obtenerComando(evento) {
                const comando = (
                        this
                        .obtenerTexto(evento)
                        .toLowerCase()
                        .split(' ')
                        [0]
                        .split('_')
                        [0]
                );
                if (comando[0] !== '/') {
                        return '';
                }
                return comando.substring(1);
        }

        obtenerArgumentos(evento) {
                return this.obtenerTexto(evento).split(' ')[0].split('_');
        }

};
module.exports = new T();
