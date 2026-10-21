
<script setup lang="ts">
import { onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

interface TableSearchOptions {
  enabled?: boolean
  minRows?: number
  placeholder?: string
}

const { theme } = useData()
const route = useRoute()

let observer: MutationObserver | undefined

function initializeTableSearch() {
  const config = theme.value as typeof theme.value & {
    tableSearch?: TableSearchOptions
  }

  const options = config.tableSearch

  if (options?.enabled === false) return

  const root = document.querySelector('.vp-doc')
  if (!root) return

  const minRows = options?.minRows ?? 5
  const placeholder =
    options?.placeholder ?? 'Buscar en esta tabla...'

  root.querySelectorAll('table').forEach((table) => {
    if (table.dataset.tableSearchInitialized === 'true') return

    const rows = Array.from(
      table.querySelectorAll('tbody tr')
    )

    if (rows.length < minRows) return

    table.dataset.tableSearchInitialized = 'true'

    const container = document.createElement('div')
    container.className = 'vp-table-search'

    const input = document.createElement('input')
    input.type = 'search'
    input.placeholder = placeholder
    input.setAttribute('aria-label', 'Buscar en esta tabla')

    const count = document.createElement('span')
    count.className = 'vp-table-search__count'

    function filterRows() {
      const query = input.value
        .trim()
        .toLocaleLowerCase()

      let visible = 0

      rows.forEach((row) => {
        const text = (row.textContent ?? '')
          .toLocaleLowerCase()

        const matches = text.includes(query)
        row.hidden = !matches

        if (matches) visible++
      })

      count.textContent = `${visible} de ${rows.length} filas`
    }

    input.addEventListener('input', filterRows)

    container.append(input, count)
    table.parentNode?.insertBefore(container, table)

    filterRows()
  })
}

function scheduleInitialization() {
  void nextTick(initializeTableSearch)
}

onMounted(() => {
  initializeTableSearch()

  observer = new MutationObserver(scheduleInitialization)

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
})

watch(() => route.path, scheduleInitialization)

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <DefaultTheme.Layout />
</template>
