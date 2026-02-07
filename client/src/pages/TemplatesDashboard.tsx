import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Layout, Check, ChevronLeft } from 'lucide-react';

const templates = [
    {
        id: "modern-dark",
        title: "Modern Dark",
        desc: "A sleek, monochrome portfolio for developers. Perfect for showcasing code and projects.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        features: ["Dark Mode", "Project Grid", "Tech Stack"]
    },
    {
        id: "creative-pro",
        title: "Creative Pro",
        desc: "Bold typography and large visuals for designers. Make a statement with your work.",
        image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop",
        features: ["Visual Heavy", "Big Type", "Gallery"]
    },
    {
        id: "content-first",
        title: "Content First",
        desc: "Focused on writing and case studies. Ideal for technical writers and strategists.",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2666&auto=format&fit=crop",
        features: ["Minimalist", "Typography", "Blog Ready"]
    }
];

export const TemplatesDashboard = () => {
    const navigate = useNavigate();

    const handleSelect = (id: string) => {
        navigate(`/editor?template=${id}`);
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">

            <div className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
                <header className="flex items-center justify-between mb-16">
                    <Link to="/" className="flex items-center text-neutral-400 hover:text-white transition-colors group">
                        <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <Link to="/" className="text-xl font-bold tracking-tighter text-white">
                        Portfolio<span className="text-neutral-600">Builder</span>
                    </Link>
                    <div className="w-24" /> {/* Spacer for centering */}
                </header>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                        Select a starting point
                    </h1>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        Choose a template to customize. You can switch styles later in the editor.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {templates.map((template, index) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-white/5 flex flex-col"
                        >
                            {/* Image Area */}
                            <div className="aspect-[16/10] overflow-hidden relative">
                                <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                                <img
                                    src={template.image}
                                    alt={template.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                                />
                                <div className="absolute top-4 right-4 z-20">
                                    <div className="bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-medium px-3 py-1 rounded-full">
                                        Free
                                    </div>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">{template.title}</h3>
                                <p className="text-sm text-neutral-400 mb-6 flex-1">{template.desc}</p>

                                <div className="space-y-3 mb-6">
                                    {template.features.map(feature => (
                                        <div key={feature} className="flex items-center text-xs text-neutral-500">
                                            <Check className="w-3 h-3 mr-2 text-white" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    onClick={() => handleSelect(template.id)}
                                    className="w-full bg-white text-black hover:bg-neutral-200 rounded-lg h-10 font-medium group-hover:translate-y-0 transition-all duration-300"
                                >
                                    Select Template <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}

                    {/* Blank Slate Option */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="group relative bg-neutral-900/50 border border-white/5 border-dashed rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:bg-neutral-900 flex flex-col items-center justify-center p-8 text-center min-h-[400px]"
                    >
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Layout className="w-8 h-8 text-neutral-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Start from scratch</h3>
                        <p className="text-sm text-neutral-400 mb-8 max-w-xs">
                            Build your portfolio completely from the ground up without any preset styles.
                        </p>
                        <Button
                            onClick={() => handleSelect('blank')}
                            variant="outline"
                            className="bg-transparent border-neutral-700 text-white hover:bg-white hover:text-black rounded-lg h-10 px-8 font-medium transition-all duration-300"
                        >
                            Start Blank
                        </Button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
