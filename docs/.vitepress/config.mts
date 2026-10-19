import { defineConfig } from 'vitepress'

// Sitio PÚBLICO (jugadores): las páginas de /admin se excluyen.
// Para verlas en tu PC:  npm run dev:admin
const repo = process.env.GITHUB_REPOSITORY ?? 'mestisexo/loginmod-docs'

// ─────────────────────────────────────────────────────────────
//  MODS  ← AQUÍ es el único lugar donde agregas un mod nuevo.
//  key   : nombre de la carpeta en docs/   (docs/login/...)
//  name  : texto en el menú superior "Mods"
//  title : título del menú lateral
//  pages : [texto del menú, nombre del archivo .md sin extensión]
//          (la primera página es la que abre el menú superior)
// ─────────────────────────────────────────────────────────────
type Mod = { key: string; name: string; title: string; pages: [string, string][] }

const mods: Mod[] = [
  {
    key: 'login',
    name: 'Login',
    title: 'Login',
    pages: [
      ['Ingreso', 'access'],
      ['Comandos', 'commands'],
      ['Clave', 'key'],
      ['Bloqueo', 'block']
    ]
  },
  {
    key: 'furniture',
    name: 'Muebles',
    title: 'Muebles',
    pages: [
      ['Introducción', 'intro'],
      ['Comandos', 'commands'],
      ['Tienda', 'tienda']
    ]
  }
]

const modSidebar = (m: Mod) => [
  {
    text: m.title,
    items: m.pages.map(([text, page]) => ({ text, link: `/${m.key}/${page}` }))
  }
]

export default defineConfig({
  lang: 'es-ES',
  title: 'El server del sexo',
  description: 'Nuestra guía oficial',
  // En GitHub Pages el sitio vive en /nombre-del-repo/ (lo pone el workflow)
  base: process.env.BASE ?? '/',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⛏️</text></svg>"
      }
    ]
  ],
  themeConfig: {
    nav: [
      {
        text: 'Mods',
        items: mods.map((m) => ({ text: m.name, link: `/${m.key}/${m.pages[0][1]}` }))
      },
    ],
    sidebar: {
      ...Object.fromEntries(mods.map((m) => [`/${m.key}/`, modSidebar(m)])),
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/mestisexo/Login-Mod-Minecraft' }],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: 'Buscar', buttonAriaLabel: 'Buscar' },
          modal: {
            displayDetails: 'Mostrar detalles',
            resetButtonTitle: 'Borrar búsqueda',
            backButtonTitle: 'Cerrar',
            noResultsText: 'Sin resultados para',
            footer: { selectText: 'seleccionar', navigateText: 'navegar', closeText: 'cerrar' }
          }
        }
      }
    },
    editLink: { pattern: `https://github.com/${repo}/edit/main/docs/:path`, text: 'Editar esta página' },
    lastUpdated: { text: 'Actualizado' },
    docFooter: { prev: 'Anterior', next: 'Siguiente' },
    outline: { label: 'En esta página', level: [2, 3] },
    returnToTopLabel: 'Volver arriba',
    sidebarMenuLabel: 'Menú',
    darkModeSwitchLabel: 'Tema',
    lightModeSwitchTitle: 'Cambiar a tema claro',
    darkModeSwitchTitle: 'Cambiar a tema oscuro',
    footer: { message: 'El server de la locura y la obscenidad', copyright: 'Mestisexo' }
  }
})
