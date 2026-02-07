import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Layout, Smartphone, Zap } from 'lucide-react';

const skills = [
    { icon: <Layout className="w-5 h-5" />, name: "Responsive Design", desc: "Pixel-perfect on any device." },
    { icon: <Zap className="w-5 h-5" />, name: "Fast Performance", desc: "Optimized for speed and SEO." },
    { icon: <Code className="w-5 h-5" />, name: "Clean Code", desc: "Built with React & TypeScript." },
    { icon: <Smartphone className="w-5 h-5" />, name: "Mobile First", desc: "Designed for touch interfaces." }
];

export const LandingPage = () => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/20 font-sans">

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 px-6 overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">

                {/* Background Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_40%)] pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-neutral-400 mb-4 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            v1.0 is now live
                        </div>

                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-600 pb-2">
                            Build your portfolio.<br />
                            <span className="text-white">In minutes.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
                            A production-ready portfolio builder for developers. <br className="hidden md:block" />
                            Crafted with the best modern design principles.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link to="/templates">
                                <Button size="lg" className="bg-white text-black hover:bg-neutral-200 rounded-full px-8 h-12 text-base font-medium transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                    Start Building <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Skills / Features Section */}
            <section className="py-32 border-t border-white/5 bg-neutral-950/50 relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,1))] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why choose PortfolioBuilder?</h2>
                        <p className="text-neutral-500 text-lg">Built with the best modern web technologies.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="group p-8 rounded-3xl bg-neutral-900/20 border border-white/5 hover:border-white/10 transition-all hover:bg-neutral-900/40"
                            >
                                <div className="mb-6 p-3 rounded-2xl bg-white/5 w-fit text-neutral-200 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-inner border border-white/5">
                                    {skill.icon}
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-neutral-200 group-hover:text-white transition-colors">{skill.name}</h3>
                                <p className="text-sm text-neutral-500 leading-relaxed group-hover:text-neutral-400 transition-colors">{skill.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/10 text-center">
                <p className="text-neutral-600 text-sm">© 2026 PortfolioBuilder. Designed for excellence.</p>
            </footer>
        </div>
    );
};
