
import { defineConfig, type DefaultTheme } from 'vitepress'

// Sitio PÚBLICO (jugadores): las páginas de /admin se excluyen.
// Para verlas en tu PC: npm run dev:admin
const repo = process.env.GITHUB_REPOSITORY ?? 'mestisexo/loginmod-docs'

interface ThemeConfig extends DefaultTheme.Config {
  tableSearch?: {
    enabled?: boolean
    minRows?: number
    placeholder?: string
  }
}

// ─────────────────────────────────────────────────────────────
// MODS ← AQUÍ es el único lugar donde agregas un mod nuevo.
// key   : nombre de la carpeta en docs/
// name  : texto en el menú superior "Mods"
// title : título del menú lateral
// pages : [texto del menú, nombre del archivo .md sin extensión]
// ─────────────────────────────────────────────────────────────
type Mod = {
  key: string
  name: string
  title: string
  pages: [string, string][]
}

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
  },
  {
    key: 'recipes',
    name: 'Recetario',
    title: 'Recetario',
    pages: [
      ['Recetas del inventario', 'inventory'],
      ['Recetas de la mesa de elaboración', 'craftingtable']
    ]
  }
]

const modSidebar = (m: Mod) => [
  {
    text: m.title,
    items: m.pages.map(([text, page]) => ({
      text,
      link: `/${m.key}/${page}`
    }))
  }
]

export default defineConfig<ThemeConfig>({
  lang: 'es-ES',
  title: 'El server del sexo',
  description: 'Nuestra guía oficial',

  // En GitHub Pages el sitio vive en /nombre-del-repo/
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
    // Configuración de búsqueda dentro de las tablas Markdown
    tableSearch: {
      enabled: true,
      minRows: 2,
      placeholder: 'Buscar objeto...'
    },

    nav: [
      {
        text: 'Mods',
        items: mods.map((m) => ({
          text: m.name,
          link: `/${m.key}/${m.pages[0][1]}`
        }))
      }
    ],

    sidebar: {
      ...Object.fromEntries(
        mods.map((m) => [`/${m.key}/`, modSidebar(m)])
      )
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/mestisexo/Login-Mod-Minecraft'
      }
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Buscar',
            buttonAriaLabel: 'Buscar'
          },
          modal: {
            displayDetails: 'Mostrar detalles',
            resetButtonTitle: 'Borrar búsqueda',
            backButtonTitle: 'Cerrar',
            noResultsText: 'Sin resultados para',
            footer: {
              selectText: 'seleccionar',
              navigateText: 'navegar',
              closeText: 'cerrar'
            }
          }
        }
      }
    },

    editLink: {
      pattern: `https://github.com/${repo}/edit/main/docs/:path`,
      text: 'Editar esta página'
    },

    lastUpdated: {
      text: 'Actualizado'
    },

    docFooter: {
      prev: 'Anterior',
      next: 'Siguiente'
    },

    outline: {
      label: 'En esta página',
      level: [2, 3]
    },

    returnToTopLabel: 'Volver arriba',
    sidebarMenuLabel: 'Menú',
    darkModeSwitchLabel: 'Tema',
    lightModeSwitchTitle: 'Cambiar a tema claro',
    darkModeSwitchTitle: 'Cambiar a tema oscuro',

    footer: {
      message: 'El server de la locura y la obscenidad',
      copyright: 'Mestisexo'
    }
  }
})
