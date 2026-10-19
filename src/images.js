// All photos are imported so the build can embed them straight into index.html.
const files = import.meta.glob('./assets/img/*.webp', { eager: true, import: 'default' })
export const IMG = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop().replace('.webp', ''), url]),
)
export const img = (name) => IMG[name]
