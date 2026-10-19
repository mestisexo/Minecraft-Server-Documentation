# Instalación en el servidor real

1. Ejecuta `.\gradlew build` y toma el `.jar` de `build/libs/`.
2. Copia el `.jar` a `mods/` del servidor real.
3. Verifica en `server.properties`: `online-mode=false` y `white-list=true`.
4. **Registra primero tu cuenta de admin** y luego abre el servidor al público.
5. Revisa el log al arrancar: debe aparecer `LoginMod cargado` y `filtro de logs instalado`.
6. Verifica que `/login` no aparezca en `logs/latest.log`.

::: info Versiones
Mod para **Minecraft 1.21.1 + NeoForge 21.1.x** en `online-mode=false`.
:::
