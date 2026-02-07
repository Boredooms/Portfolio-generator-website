import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';

export const AboutPage = () => {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-12"
                >
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                            Empowering Developers.
                        </h1>
                        <p className="text-xl text-neutral-400 leading-relaxed">
                            PortfolioBuilder was born from a simple idea: developers should spend their time building products, not fighting with CSS for their portfolio.
                        </p>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">The Mission</h2>
                            <p className="text-neutral-500 leading-relaxed">
                                To provide best-in-class, performant, and accessible portfolio templates that help engineers, designers, and creatives land their dream jobs.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">The Stack</h2>
                            <p className="text-neutral-500 leading-relaxed">
                                Built with React, TypeScript, Tailwind CSS, and Framer Motion. We believe in sticking to standards and shipping fast, specialized code.
                            </p>
                        </div>
                    </div>

                    <div className="bg-neutral-900/50 border border-white/5 rounded-3xl p-8 md:p-12 text-center space-y-6">
                        <h3 className="text-xl font-medium">Ready to build yours?</h3>
                        <p className="text-neutral-500 max-w-lg mx-auto">
                            Join thousands of developers who have launched their site with PortfolioBuilder.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
