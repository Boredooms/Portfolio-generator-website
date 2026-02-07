import React from 'react';
import { Sidebar } from '../editor/Sidebar';
import { useTemplateStore } from '@/store/useTemplateStore';
import { Button } from '../ui/button';
import { Download } from 'lucide-react';

export const EditorLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { config } = useTemplateStore();

    const handleDownload = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(config),
            });

            if (!response.ok) throw new Error('Download failed');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${config.personal.name.replace(/\s+/g, '-').toLowerCase()}-portfolio.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Download error:', error);
            alert('Failed to download portfolio. Please try again.');
        }
    };

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            {/* Sidebar - Visual Editor */}
            <div className="w-80 border-r border-border flex flex-col bg-card">
                <div className="p-4 border-b border-border flex justify-between items-center">
                    <h1 className="font-bold text-xl tracking-tighter">Portfolio<span className="text-primary">Builder</span></h1>
                </div>

                <Sidebar />

                <div className="p-4 border-t border-border mt-auto">
                    <Button className="w-full gap-2" onClick={handleDownload}>
                        <Download size={16} />
                        Download Code
                    </Button>
                </div>
            </div>

            {/* Main Preview Area */}
            <div className="flex-1 overflow-auto bg-neutral-950 relative flex items-center justify-center p-8">
                <div className="w-full max-w-5xl h-full shadow-2xl overflow-y-auto overflow-x-hidden rounded-md border border-neutral-800 bg-black relative">
                    {children}
                </div>
            </div>
        </div>
    );
};
