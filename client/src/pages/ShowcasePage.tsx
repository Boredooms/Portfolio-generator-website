import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';

const showcases = [
    {
        name: "Alex Rivera",
        role: "Frontend Engineer",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop"
    },
    {
        name: "Sarah Chen",
        role: "UX Designer",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
    },
    {
        name: "Jordan Lee",
        role: "Product Manager",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
    },
    {
        name: "Emily Davis",
        role: "Full Stack Dev",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop"
    },
    {
        name: "Michael Brown",
        role: "Creative Director",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
    },
    {
        name: "Lisa Wong",
        role: "3D Artist",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2064&auto=format&fit=crop"
    }
];

export const ShowcasePage = () => {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20 space-y-4"
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                        Made with PortfolioBuilder
                    </h1>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        Discover what others are building. Get inspired by the community.
                    </p>
                </motion.div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {showcases.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="break-inside-avoid group relative rounded-2xl overflow-hidden border border-white/10 bg-neutral-900"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <h3 className="text-xl font-bold">{item.name}</h3>
                                <p className="text-sm text-neutral-400">{item.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
