import type { PortfolioConfig } from "../types/config";

const baseConfig: PortfolioConfig = {
    theme: {
        accentColor: '#ffffff',
        gradient: true,
        font: 'Inter'
    },
    personal: {
        name: 'Your Name',
        bio: 'Your Headline',
        roles: ['Role 1', 'Role 2'],
        social: {
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            email: 'hello@example.com'
        }
    },
    projects: [
        {
            id: '1',
            title: 'Project Title',
            description: 'Brief description of your work.',
            tags: ['Tag 1', 'Tag 2'],
            link: 'https://example.com'
        }
    ],
    sections: [
        { id: 'hero', type: 'hero', title: 'Hero', enabled: true, data: {} },
        { id: 'about', type: 'about', title: 'About', enabled: true, data: {} },
        { id: 'projects', type: 'projects', title: 'Projects', enabled: true, data: {} },
        { id: 'contact', type: 'contact', title: 'Contact', enabled: true, data: {} }
    ]
};

export const templates: Record<string, PortfolioConfig> = {
    'modern-dark': {
        ...baseConfig,
        id: 'modern-dark', // Add ID here
        theme: {
            accentColor: '#ffffff',
            gradient: true,
            font: 'Inter'
        },
        personal: {
            ...baseConfig.personal,
            name: 'Alex Dev',
            bio: 'Full Stack Engineer building scalable systems.',
            roles: ['Engineer', 'Architect']
        }
    },
    'creative-pro': {
        ...baseConfig,
        id: 'creative-pro', // Add ID here
        theme: {
            accentColor: '#e5e5e5',
            gradient: true,
            font: 'Oswald'
        },
        personal: {
            ...baseConfig.personal,
            name: 'Jordan Lee',
            bio: 'Visual Designer crafting digital experiences.',
            roles: ['Art Director', 'UI/UX']
        },
        projects: [
            {
                id: '1',
                title: 'Brand Identity System',
                description: 'Complete visual overhaul for a fintech startup.',
                tags: ['Branding', 'Typography'],
                link: '#'
            },
            {
                id: '2',
                title: 'Campaign 2024',
                description: 'Award-winning digital campaign assets.',
                tags: ['Visual Design', 'Motion'],
                link: '#'
            }
        ]
    },
    'content-first': {
        ...baseConfig,
        id: 'content-first', // Add ID here
        theme: {
            accentColor: '#f5f5f5',
            gradient: false, // Cleaner look for reading
            font: 'Merriweather'
        },
        personal: {
            ...baseConfig.personal,
            name: 'Casey Words',
            bio: 'Technical Writer & Content Strategist.',
            roles: ['Writer', 'Strategist']
        },
        sections: [
            { id: 'hero', type: 'hero', title: 'Hero', enabled: true, data: {} },
            { id: 'about', type: 'about', title: 'About', enabled: true, data: {} },
            // Projects could be repurposed as "Articles" via title edit if we supported it, but standards defaults are fine
            { id: 'projects', type: 'projects', title: 'Selected Works', enabled: true, data: {} },
            { id: 'contact', type: 'contact', title: 'Contact', enabled: true, data: {} }
        ],
        projects: [
            {
                id: '1',
                title: 'API Documentation Guide',
                description: 'Comprehensive guide for developer onboarding.',
                tags: ['Documentation', 'Technical Writing'],
                link: '#'
            },
            {
                id: '2',
                title: 'UX Copy Case Study',
                description: 'Improving conversion through better microcopy.',
                tags: ['UX Writing', 'Research'],
                link: '#'
            }
        ]
    }
};
