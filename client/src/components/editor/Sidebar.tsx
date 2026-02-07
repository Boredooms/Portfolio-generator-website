import React from 'react';
import { useTemplateStore } from '@/store/useTemplateStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, Save } from 'lucide-react';

export const Sidebar: React.FC = () => {
    const { config, setConfig, updatePersonal, updateSocial, updateTheme, toggleSection, addProject, removeProject, updateProject } = useTemplateStore();

    const handleSave = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            const data = await res.json();
            if (data.id) {
                // Update URL without reload
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set('id', data.id);
                window.history.pushState({}, '', newUrl);

                // Update config with ID if needed (though backend handles it)
                setConfig({ ...config, id: data.id });
                alert('Saved successfully! Share this URL to edit later.');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to save.');
        }
    };

    return (
        <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">

                <div className="flex gap-2">
                    <Button className="flex-1" onClick={handleSave}>
                        <Save size={16} className="mr-2" /> Save Changes
                    </Button>
                </div>

                <Accordion type="single" collapsible defaultValue="personal">

                    {/* Personal Info */}
                    <AccordionItem value="personal">
                        <AccordionTrigger>Personal Info</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input
                                    value={config.personal.name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePersonal('name', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Bio</Label>
                                <Input
                                    value={config.personal.bio}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePersonal('bio', e.target.value)}
                                />
                            </div>
                            {/* Socials */}
                            <div className="pt-2 space-y-2">
                                <Label className="text-xs text-muted-foreground uppercase">Social Links</Label>
                                <Input
                                    placeholder="GitHub URL"
                                    value={config.personal.social.github || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSocial('github', e.target.value)}
                                />
                                <Input
                                    placeholder="LinkedIn URL"
                                    value={config.personal.social.linkedin || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSocial('linkedin', e.target.value)}
                                />
                                <Input
                                    placeholder="Email"
                                    value={config.personal.social.email || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSocial('email', e.target.value)}
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Theme */}
                    <AccordionItem value="theme">
                        <AccordionTrigger>Theme</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Accent Color</Label>
                                <div className="flex gap-2">
                                    <Input
                                        type="color"
                                        className="w-12 h-10 p-1 cursor-pointer"
                                        value={config.theme.accentColor}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTheme('accentColor', e.target.value)}
                                    />
                                    <Input
                                        value={config.theme.accentColor}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTheme('accentColor', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <Label>Gradient Background</Label>
                                <Switch
                                    checked={config.theme.gradient}
                                    onCheckedChange={(checked) => updateTheme('gradient', checked)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Font Family</Label>
                                <Select
                                    value={config.theme.font}
                                    onValueChange={(value: string) => updateTheme('font', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a font" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Inter">Inter</SelectItem>
                                        <SelectItem value="Roboto">Roboto</SelectItem>
                                        <SelectItem value="Poppins">Poppins</SelectItem>
                                        <SelectItem value="Montserrat">Montserrat</SelectItem>
                                        <SelectItem value="Lato">Lato</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Sections */}
                    <AccordionItem value="sections">
                        <AccordionTrigger>Sections</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            {config.sections.map((section) => (
                                <div key={section.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                                    <Label className="capitalize">{section.title}</Label>
                                    <Switch
                                        checked={section.enabled}
                                        onCheckedChange={() => toggleSection(section.id)}
                                    />
                                </div>
                            ))}
                        </AccordionContent>
                    </AccordionItem>

                    {/* Projects */}
                    <AccordionItem value="projects">
                        <AccordionTrigger>Projects</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            {config.projects.map((project) => (
                                <div key={project.id} className="border border-border rounded p-3 space-y-3 relative">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-1 right-1 h-6 w-6 text-destructive hover:bg-destructive/10"
                                        onClick={() => removeProject(project.id)}
                                    >
                                        <Trash2 size={14} />
                                    </Button>

                                    <div className="space-y-1">
                                        <Label className="text-xs">Title</Label>
                                        <Input
                                            value={project.title}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateProject(project.id, { title: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Description</Label>
                                        <Input
                                            value={project.description}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateProject(project.id, { description: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Link</Label>
                                        <Input
                                            value={project.link || ''}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateProject(project.id, { link: e.target.value })}
                                        />
                                    </div>
                                </div>
                            ))}
                            <Button className="w-full" size="sm" onClick={() => addProject({
                                id: crypto.randomUUID(),
                                title: 'New Project',
                                description: 'Description...',
                                tags: []
                            })}>
                                <Plus size={14} className="mr-2" /> Add Project
                            </Button>
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </div>
        </ScrollArea>
    );
};
