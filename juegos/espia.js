/*

/espia
Espia (requiere 3 personas o más)
Instrucciones...
Usuario responde: /espia_iniciar

Cuántos juegan?
Usuario responde: 3
// Se debe guardar en memoria, tal vez en un archivo USUARIOID_espia.ini?

Cuántos espías? (siempre debe haber al menos 1 normal)
Usuario responde: 3
// También se debería guardar en memoria

Cuántos minutos de juego?
Usuario responde: 1
// También se debería guardar en memoria

// Genera lugar aleatorioa, también se debería almacenar en memoria

// Mientras falten jugadores por asignar:
  [Espía|LUGAR]
  Usuario responde: /espia_pasarDispositivo

  // El mensaje anterior se elimina

  Usuario responde: /espia_revelar

  // El mensaje anterior se elimina

Sistema inicia, cada 30 segundos envía un mensaje

Al llegar a 0, envía el lugar y termina el juego

*/
