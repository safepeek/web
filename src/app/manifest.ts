import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'SafePeek',
        short_name: 'SafePeek',
        description: 'Enhance Discord with secure link previews, metadata insights, and safety checks.',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#3871C1',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}