import { create } from 'zustand';
import { initialConfig } from '../types/config';
import type { PortfolioConfig, Project } from '../types/config';

interface TemplateState {
    config: PortfolioConfig;
    updatePersonal: (field: keyof PortfolioConfig['personal'], value: any) => void;
    updateSocial: (field: keyof PortfolioConfig['personal']['social'], value: string) => void;
    updateTheme: (field: keyof PortfolioConfig['theme'], value: any) => void;
    toggleSection: (id: string) => void;
    addProject: (project: Project) => void;
    removeProject: (id: string) => void;
    updateProject: (id: string, project: Partial<Project>) => void;
    setConfig: (config: PortfolioConfig) => void;
}

export const useTemplateStore = create<TemplateState>((set) => ({
    config: initialConfig,
    updatePersonal: (field, value) =>
        set((state) => ({
            config: {
                ...state.config,
                personal: { ...state.config.personal, [field]: value },
            },
        })),
    updateSocial: (field, value) =>
        set((state) => ({
            config: {
                ...state.config,
                personal: {
                    ...state.config.personal,
                    social: { ...state.config.personal.social, [field]: value },
                },
            },
        })),
    updateTheme: (field, value) =>
        set((state) => ({
            config: {
                ...state.config,
                theme: { ...state.config.theme, [field]: value },
            },
        })),
    toggleSection: (id) =>
        set((state) => ({
            config: {
                ...state.config,
                sections: state.config.sections.map((s) =>
                    s.id === id ? { ...s, enabled: !s.enabled } : s
                ),
            },
        })),
    addProject: (project) =>
        set((state) => ({
            config: {
                ...state.config,
                projects: [...state.config.projects, project],
            },
        })),
    removeProject: (id) =>
        set((state) => ({
            config: {
                ...state.config,
                projects: state.config.projects.filter((p) => p.id !== id),
            },
        })),
    updateProject: (id, project) =>
        set((state) => ({
            config: {
                ...state.config,
                projects: state.config.projects.map((p) =>
                    p.id === id ? { ...p, ...project } : p
                ),
            },
        })),
    setConfig: (config) => set({ config }),
}));
