import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HNN',
    short_name: 'HNN',
    description: 'A more intuitive UI for Hacker News',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png'
      },
      {
        src: '/favicon.ico',
        sizes: '180x180',
        type: 'image/ico'
      }
    ]
  }
}
