# diviertemela_bot

# Ejecución de prueba
1. Copiar el archivo `.env`
```
cp ._env.js .env.js
nano .env.js
```
2. Agregar la llave generada por https://t.me/BotFather
```
const env = {
        AUTORIZADOS_POR_ID: {'USUARIO_ID': 1},
        LLAVE: 'LLAVE_GENERADA_POR_BOTFATHER',
};
```
3. Instalar las dependencias y ejecutar
```
npm update
node --watch index.js
```

# Ejecución en producción

Se debe hacer lo mismo que para pruebas, y luego:

## Ubuntu
1. Crear el servicio para el bot
```
nano /etc/systemd/system/diviertemela_bot.service
```
2. Agregar el nombre, el archivo a ejecutar (aquí se debe cambiar `RUTA` por la
ruta en que esté el proyecto) y el momento en que se debe iniciar
```
[Unit]
Description=diviertemela_bot

[Service]
ExecStart=node /RUTA/diviertemela_bot/index.js

[Install]
WantedBy=multi-user.target
```
3. Habilitar el servicio para iniciar automática e inmediatamente
```
systemctl enable --now diviertemela_bot
```
