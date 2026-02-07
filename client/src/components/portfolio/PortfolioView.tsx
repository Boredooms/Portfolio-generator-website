import React from 'react';
import type { PortfolioConfig } from '@/types/config';
import { ModernDark } from '@/components/templates/ModernDark';
import { CreativePro } from '@/components/templates/CreativePro';
import { ContentFirst } from '@/components/templates/ContentFirst';

interface PortfolioViewProps {
    config: PortfolioConfig;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ config }) => {
    // Determine which template to render based on ID
    // Default to ModernDark if no ID match (or if ID is 'modern-dark')

    switch (config.id) {
        case 'creative-pro':
            return <CreativePro config={config} />;
        case 'content-first':
            return <ContentFirst config={config} />;
        case 'modern-dark':
        default:
            return <ModernDark config={config} />;
    }
};
