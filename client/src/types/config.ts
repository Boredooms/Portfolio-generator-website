export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    link?: string;
    repo?: string;
}

export interface SocialLinks {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
}

export interface PersonalInfo {
    name: string;
    bio: string;
    roles: string[];
    social: SocialLinks;
}

export interface Section {
    id: string;
    type: 'hero' | 'about' | 'projects' | 'contact';
    title: string;
    enabled: boolean;
    data: any;
}

export interface ThemeConfig {
    accentColor: string; // Hex code
    gradient: boolean;
    font: string;
}

export interface PortfolioConfig {
    id?: string;
    theme: ThemeConfig;
    personal: PersonalInfo;
    projects: Project[];
    sections: Section[];
}

export const initialConfig: PortfolioConfig = {
    theme: {
        accentColor: '#ffffff',
        gradient: true,
        font: 'Inter'
    },
    personal: {
        name: 'John Doe',
        bio: 'Full Stack Developer',
        roles: ['Developer', 'Designer'],
        social: {
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            email: 'hello@example.com'
        }
    },
    projects: [
        {
            id: '1',
            title: 'Project Alpha',
            description: 'A cutting edge application.',
            tags: ['React', 'Node.js'],
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
