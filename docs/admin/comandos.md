# Comandos de administración

## LoginMod (OP nivel 3 o más)

| Comando | Para qué sirve |
|---|---|
| `/loginadmin reset <nombre>` | Borra la cuenta de un jugador. Al volver deberá usar `/register`. |
| `/loginadmin setpass <nombre> <clave>` | Cambia la contraseña de un jugador sin dejar la cuenta libre. **Recomendado** cuando alguien olvida su clave. |

- La consola del servidor siempre puede usar `/loginadmin`.

::: warning Prefiere setpass
Con `reset`, mientras la cuenta está libre cualquiera podría registrarse con ese nombre.
:::

## Minecraft

| Comando | Para qué sirve |
|---|---|
| `op <nombre>` / `deop <nombre>` | Da o quita permisos de administrador. |
| `whitelist add <nombre>` | Permite entrar a un jugador. |
| `whitelist remove <nombre>` | Quita a un jugador de la whitelist. |
| `kick <nombre>` | Expulsa a un jugador. |
| `ban <nombre>` / `pardon <nombre>` | Banea o perdona. |
| `save-all` | Guarda el mundo en disco. |
| `stop` | Apaga el servidor guardando todo. |
| `/tick query` | Muestra el tiempo promedio por tick (rendimiento). |
| `perf start` / `perf stop` | Genera un informe de rendimiento. |
