# Respaldos

## Qué respaldar

1. **Mundo:** carpeta `world/`.
2. **Cuentas de login:** `config/loginmod-users.json`. Si se pierde, todos deben registrarse de nuevo y alguien podría adueñarse de un nombre.
3. **Configuración:** carpeta `config/`, `server.properties`, `ops.json`, `whitelist.json`.
4. **Mods:** carpeta `mods/` (o al menos la lista de versiones exactas).
5. **Código fuente del mod:** el proyecto de IntelliJ.

## Regla 3-2-1

- **3** copias de tus datos,
- en **2** tipos de almacenamiento distintos (por ejemplo disco del PC + disco externo),
- **1** copia fuera de casa (nube o servidor remoto).

## Copiar el mundo sin corromperlo

Con el servidor encendido, desde la consola:

```
save-off
save-all flush
```

Copia la carpeta del servidor y después:

```
save-on
```

La opción más simple y segura: **apagar con `stop`**, copiar y volver a encender.

## Automatizar en Windows

Guarda esto como `backup.bat` y prográmalo en el *Programador de tareas* de Windows (diario, con el servidor apagado o con un plugin de comandos de consola):

```bat
@echo off
set ORIGEN=C:\servidor
set DESTINO=D:\backups\servidor
set FECHA=%date:~-4%-%date:~3,2%-%date:~0,2%_%time:~0,2%%time:~3,2%
set FECHA=%FECHA: =0%

robocopy "%ORIGEN%" "%DESTINO%\%FECHA%" /E /XD logs crash-reports /R:1 /W:1
```

Ajusta `ORIGEN` y `DESTINO`. Esto **no** pausa el guardado: úsalo con el servidor apagado, o ejecuta antes `save-off` y `save-all flush`.

## Frecuencia y retención

- **Diario**, conservando los últimos 7.
- **Semanal**, conservando los últimos 4.
- **Antes de cambios grandes** (actualizar mods, cambiar de versión, editar `ops.json`): copia manual.
- Borra copias viejas. Un mundo comprimido (`.zip` o `.7z`) pesa mucho menos.

## Código del mod: usa Git

Sube el proyecto a GitHub y haz un commit cada vez que algo funcione. Guarda cada `.jar` que despliegues con su fecha, por ejemplo `loginmod-1.0-2026-10-17.jar`, para poder volver atrás.

::: danger Nunca subas `run/`
La carpeta `run/` contiene `loginmod-users.json`, mundos, IPs y logs. Debe estar en el `.gitignore`.
:::

## Seguridad de los respaldos

- `loginmod-users.json` contiene hashes de contraseñas. Aunque estén protegidos con sal y 120.000 iteraciones, **no lo subas a repositorios públicos ni lo compartas**.
- Guarda los respaldos en nube con contraseña o cifrados (por ejemplo `.7z` con clave).
- Restringe quién tiene acceso a la carpeta del servidor y al panel.
- **Prueba restaurar** un respaldo de vez en cuando en otra carpeta.

## Lista de verificación semanal

- ☐ Existe un respaldo reciente del mundo.
- ☐ `loginmod-users.json` incluido en el respaldo.
- ☐ Hay una copia fuera del PC.
- ☐ El código del mod está subido a Git.
- ☐ Probé abrir un respaldo al menos una vez este mes.
