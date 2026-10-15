import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HN Tech — Digital Products',
    short_name: 'HN Tech',
    description: 'HN Tech — Premium Technology Company building websites, web apps, SaaS platforms, and AI solutions.',
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
