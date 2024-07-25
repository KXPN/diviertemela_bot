# diviertemela_bot

# Ejecución de prueba
```
npm update
node index.js
```

# Ejecución en producción

## Ubuntu
```
nano /etc/systemd/system/diviertemela_bot.service
```
Agregar:
```
[Unit]
Description=diviertemela_bot

[Service]
ExecStart=node /RUTA/diviertemela_bot/index.js

[Install]
WantedBy=multi-user.target
```
Y luego:
```
systemctl enable --now diviertemela_bot
```
