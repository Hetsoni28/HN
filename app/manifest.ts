import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HN — Digital Products',
    short_name: 'HN',
    description: 'HN digital product studio',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0051FF',
    icons: [
      {
        src: '/hn-logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/hn-logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
