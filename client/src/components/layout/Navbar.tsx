import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold tracking-tighter text-white hover:opacity-80 transition-opacity">
                    Portfolio<span className="text-neutral-600">Builder</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
                    <Link to="/showcase" className="hover:text-white transition-colors">Showcase</Link>
                    <Link to="/about" className="hover:text-white transition-colors">About</Link>
                </div>

                <div className="flex items-center gap-4">
                    <a href="https://github.com/devargho" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                        <Github size={20} />
                    </a>
                    <Link to="/templates">
                        <Button variant="outline" className="h-9 px-4 border-neutral-800 bg-neutral-900/50 text-neutral-200 hover:bg-white hover:text-black hover:border-white transition-all duration-300 rounded-full text-xs font-semibold uppercase tracking-wider">
                            Open Builder
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
