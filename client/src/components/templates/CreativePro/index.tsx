import React, { useEffect } from 'react';
import type { PortfolioConfig } from '@/types/config';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface PortfolioViewProps {
    config: PortfolioConfig;
}

export const CreativePro: React.FC<PortfolioViewProps> = ({ config }) => {
    useEffect(() => {
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return () => { document.head.removeChild(link); }
    }, []);

    const accent = config.theme.accentColor || '#e5e5e5';

    return (
        <div className="min-h-screen bg-neutral-900 text-white font-sans selection:bg-white/20" style={{ fontFamily: '"Oswald", sans-serif' }}>

            {/* Navigation (Simple) */}
            <nav className="fixed top-0 left-0 right-0 p-8 flex justify-between items-center z-50 mix-blend-difference">
                <div className="text-2xl font-bold tracking-tighter uppercase">{config.personal.name}</div>
                <div className="flex gap-6 uppercase text-sm tracking-widest">
                    <a href="#work" className="hover:text-neutral-400 transition-colors">Work</a>
                    <a href="#about" className="hover:text-neutral-400 transition-colors">Info</a>
                </div>
            </nav>

            {/* Hero */}
            {config.sections.find(s => s.id === 'hero' && s.enabled) && (
                <section className="h-screen flex items-end pb-20 px-6 md:px-20 relative overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-30">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[100px]" style={{ background: accent }} />
                    </div>

                    <div className="relative z-10 w-full">
                        <motion.h1
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[15vw] leading-[0.85] font-bold uppercase tracking-tighter"
                        >
                            {config.personal.roles[0] || 'Creative'}
                        </motion.h1>
                        <div className="flex justify-between items-end mt-8 border-t border-white/20 pt-8">
                            <p className="max-w-md text-xl md:text-2xl font-light normal-case tracking-normal">
                                {config.personal.bio}
                            </p>
                            <div className="hidden md:block text-right">
                                <p className="text-sm text-neutral-500 uppercase tracking-widest mb-1">Based in</p>
                                <p className="text-lg">Digital Space</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Projects - Gallery Style */}
            {config.sections.find(s => s.id === 'projects' && s.enabled) && (
                <section id="work" className="py-20 px-6 md:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                        {config.projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`group ${index % 2 === 1 ? 'md:mt-32' : ''}`}
                            >
                                <div className="aspect-[4/5] bg-neutral-800 mb-6 relative overflow-hidden">
                                    {/* Placeholder for project image since config doesn't have it yet, using patterns */}
                                    <div className="absolute inset-0 bg-neutral-800 group-hover:bg-neutral-700 transition-colors duration-500" />
                                    <div className="absolute inset-0 flex items-center justify-center text-9xl font-bold text-neutral-700/20 group-hover:text-neutral-600/20 transition-colors duration-500 select-none">
                                        {index + 1}
                                    </div>
                                </div>
                                <div className="flex justify-between items-start border-b border-white/20 pb-4 group-hover:border-white transition-colors duration-300">
                                    <div>
                                        <h3 className="text-3xl font-medium uppercase mb-1">{project.title}</h3>
                                        <p className="text-neutral-500 font-sans text-sm">{project.tags.join(' / ')}</p>
                                    </div>
                                    <ArrowUpRight className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Footer / Contact */}
            {config.sections.find(s => s.id === 'contact' && s.enabled) && (
                <section id="about" className="py-40 px-6 md:px-20 bg-white text-black mt-20">
                    <h2 className="text-[10vw] leading-[0.9] font-bold uppercase tracking-tighter mb-12 text-center">
                        Let's Talk
                    </h2>
                    <div className="flex justify-center gap-8 md:gap-16 text-xl md:text-2xl font-medium uppercase tracking-wide">
                        <a href={`mailto:${config.personal.social.email}`} className="hover:line-through decoration-2">Email</a>
                        <a href={config.personal.social.linkedin} className="hover:line-through decoration-2">LinkedIn</a>
                        <a href={config.personal.social.github} className="hover:line-through decoration-2">GitHub</a>
                    </div>
                </section>
            )}

        </div>
    );
};
