import React, { useEffect } from 'react';
import type { PortfolioConfig } from '@/types/config';

interface PortfolioViewProps {
    config: PortfolioConfig;
}

export const ContentFirst: React.FC<PortfolioViewProps> = ({ config }) => {
    useEffect(() => {
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,400&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return () => { document.head.removeChild(link); }
    }, []);

    return (
        <div className="min-h-screen bg-[#f8f5f2] text-[#2c2c2c] font-serif selection:bg-[#2c2c2c] selection:text-white" style={{ fontFamily: '"Merriweather", serif' }}>

            <div className="max-w-3xl mx-auto px-8 py-20 md:py-32">

                {/* Header */}
                <header className="mb-24 flex items-baseline justify-between border-b border-[#2c2c2c] pb-8">
                    <h1 className="text-2xl font-bold tracking-tight">{config.personal.name}</h1>
                    <nav className="text-sm italic text-neutral-600 gap-6 flex">
                        <a href="#about" className="hover:text-black">About</a>
                        <a href="#articles" className="hover:text-black">Selected Works</a>
                        <a href="#contact" className="hover:text-black">Contact</a>
                    </nav>
                </header>

                {/* Intro */}
                {config.sections.find(s => s.id === 'hero' && s.enabled) && (
                    <section className="mb-32">
                        <p className="text-3xl md:text-5xl leading-tight font-light mb-8">
                            {config.personal.bio}
                        </p>
                        <div className="text-sm font-sans tracking-widest uppercase text-neutral-500">
                            {config.personal.roles.join('  •  ')}
                        </div>
                    </section>
                )}

                {/* Works / Projects */}
                {config.sections.find(s => s.id === 'projects' && s.enabled) && (
                    <section id="articles" className="mb-32">
                        <h2 className="text-sm font-sans font-bold uppercase tracking-widest mb-12 border-b border-gray-300 pb-2">Selected Works</h2>

                        <div className="space-y-16">
                            {config.projects.map((project) => (
                                <article key={project.id} className="group cursor-pointer">
                                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                                        <h3 className="text-2xl font-bold group-hover:underline underline-offset-4 decoration-1">{project.title}</h3>
                                        <span className="text-sm font-sans text-neutral-500 mt-2 md:mt-0 italic">{project.tags[0]}</span>
                                    </div>
                                    <p className="text-lg text-neutral-700 leading-relaxed max-w-xl">
                                        {project.description}
                                    </p>
                                    {project.link && (
                                        <a href={project.link} className="inline-block mt-4 text-sm font-sans font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 hover:opacity-60 transition-opacity">
                                            Read Case Study
                                        </a>
                                    )}
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {/* About & Contact combined */}
                <div className="grid md:grid-cols-2 gap-16 pt-16 border-t border-[#2c2c2c]">

                    {config.sections.find(s => s.id === 'about' && s.enabled) && (
                        <section id="about">
                            <h3 className="text-sm font-sans font-bold uppercase tracking-widest mb-6">About</h3>
                            <p className="text-lg leading-relaxed text-neutral-700">
                                I specialize in translating complex technical concepts into clear, accessible narratives.
                                With a background in {config.personal.roles[0]}, I bridge the gap between product and user.
                            </p>
                        </section>
                    )}

                    {config.sections.find(s => s.id === 'contact' && s.enabled) && (
                        <section id="contact">
                            <h3 className="text-sm font-sans font-bold uppercase tracking-widest mb-6">Connect</h3>
                            <ul className="space-y-4 text-lg">
                                <li>
                                    <a href={`mailto:${config.personal.social.email}`} className="hover:italic">
                                        Email ↗
                                    </a>
                                </li>
                                <li>
                                    <a href={config.personal.social.linkedin} className="hover:italic">
                                        LinkedIn ↗
                                    </a>
                                </li>
                                <li>
                                    <a href={config.personal.social.github} className="hover:italic">
                                        GitHub ↗
                                    </a>
                                </li>
                            </ul>
                        </section>
                    )}
                </div>

                <footer className="mt-32 pt-8 border-t border-gray-200 text-center text-xs font-sans text-neutral-400">
                    © {new Date().getFullYear()} {config.personal.name}. All rights reserved.
                </footer>
            </div>
        </div>
    );
};
