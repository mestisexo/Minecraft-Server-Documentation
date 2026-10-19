# Configuración y archivos

## `config/loginmod-common.toml`

| Opción | Por defecto | Qué hace |
|---|---|---|
| `loginTimeoutSeconds` | 60 | Segundos para iniciar sesión antes de ser expulsado. |
| `maxAttempts` | 3 | Fallos por sesión antes de expulsar. |
| `minPasswordLength` | 6 | Largo mínimo de contraseña. |
| `ipMaxFails` | 6 | Fallos desde una IP antes de bloquearla. |
| `ipLockSeconds` | 300 | Duración del bloqueo de IP. |

Los cambios se aplican al reiniciar el servidor.

## Archivos importantes

| Archivo / carpeta | Contenido |
|---|---|
| `world/` | El mundo (nombre según `level-name` en `server.properties`). |
| `mods/` | Los `.jar` de los mods. |
| `config/loginmod-users.json` | Cuentas de login (hashes, sin texto plano). **Crítico.** |
| `config/loginmod-common.toml` | Ajustes del mod. |
| `config/` (resto) | Configuración de otros mods. |
| `server.properties`, `ops.json`, `whitelist.json` | Configuración y permisos del servidor. |
| `banned-players.json`, `banned-ips.json` | Baneos. |
