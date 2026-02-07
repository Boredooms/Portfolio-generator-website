import React, { useEffect } from 'react';
import type { PortfolioConfig } from '@/types/config';

interface PortfolioViewProps {
    config: PortfolioConfig;
}

export const ModernDark: React.FC<PortfolioViewProps> = ({ config }) => {
    useEffect(() => {
        if (!config.theme.font) return;
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${config.theme.font.replace(' ', '+')}:wght@400;700&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return () => { document.head.removeChild(link); }
    }, [config.theme.font]);

    return (
        <div className="min-h-screen bg-black text-white font-sans" style={{ fontFamily: `"${config.theme.font}", sans-serif` }}>

            {/* Dynamic CSS Variables for Theme */}
            <style>{`
        :root {
          --template-accent: ${config.theme.accentColor};
        }
      `}</style>

            <div className="fixed inset-0 pointer-events-none opacity-20" style={{
                background: config.theme.gradient
                    ? `radial-gradient(circle at 50% 50%, var(--template-accent), transparent 70%)`
                    : 'none'
            }} />

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 space-y-24">

                {/* Hero Section */}
                {config.sections.find(s => s.id === 'hero' && s.enabled) && (
                    <section className="min-h-[60vh] flex flex-col justify-center items-start">
                        <h1 className="text-6xl font-bold tracking-tighter mb-4">
                            Hi, I'm <span style={{ color: config.theme.accentColor }}>{config.personal.name}</span>
                        </h1>
                        <p className="text-xl text-neutral-400 max-w-lg leading-relaxed">
                            {config.personal.bio}
                        </p>
                        <div className="mt-8 flex gap-4">
                            {config.personal.roles.map(role => (
                                <span key={role} className="px-3 py-1 border border-neutral-800 rounded-full text-sm text-neutral-400">
                                    {role}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* About Section */}
                {config.sections.find(s => s.id === 'about' && s.enabled) && (
                    <section>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-[2px]" style={{ background: config.theme.accentColor }} />
                            About Me
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-neutral-400">
                            <p>
                                Passionate developer with a focus on creating minimal and functional interfaces.
                                I believe in the power of clean code and good design.
                            </p>
                            <div className="flex flex-col gap-2">
                                <a href={config.personal.social.github} className="hover:text-white transition-colors">GitHub</a>
                                <a href={config.personal.social.linkedin} className="hover:text-white transition-colors">LinkedIn</a>
                                <a href={`mailto:${config.personal.social.email}`} className="hover:text-white transition-colors">Email</a>
                            </div>
                        </div>
                    </section>
                )}

                {/* Projects Section */}
                {config.sections.find(s => s.id === 'projects' && s.enabled) && (
                    <section>
                        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                            <span className="w-8 h-[2px]" style={{ background: config.theme.accentColor }} />
                            Projects
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {config.projects.map(project => (
                                <div key={project.id} className="p-6 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors bg-neutral-950/50">
                                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                    <p className="text-neutral-500 text-sm mb-4">{project.description}</p>
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noreferrer" className="text-sm underline decoration-neutral-700 hover:decoration-white underline-offset-4" style={{ color: config.theme.accentColor }}>
                                            View Project
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Contact Section */}
                {config.sections.find(s => s.id === 'contact' && s.enabled) && (
                    <section className="py-20 text-center">
                        <h2 className="text-4xl font-bold mb-6">Let's work together.</h2>
                        <a href={`mailto:${config.personal.social.email}`} className="inline-block px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors">
                            Get in Touch
                        </a>
                    </section>
                )}

            </div>
        </div>
    );
};
