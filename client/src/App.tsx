import { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { EditorLayout } from "./components/layout/EditorLayout"
import { Navbar } from "./components/layout/Navbar"
import { LandingPage } from "./pages/LandingPage"
import { ShowcasePage } from "./pages/ShowcasePage"
import { AboutPage } from "./pages/AboutPage"
import { useTemplateStore } from "./store/useTemplateStore"
import { PortfolioView } from "./components/portfolio/PortfolioView"
import type { PortfolioConfig } from "./types/config"
import { templates } from "./data/templates"

function Editor() {
  const { config, setConfig } = useTemplateStore()
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const templateId = params.get('template');

    if (id) {
      // Load saved portfolio
      fetch(`http://localhost:5000/api/load/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            setConfig(data as PortfolioConfig);
          }
        })
        .catch(err => console.error(err));
    } else if (templateId && templates[templateId]) {
      // Load new template preset
      setConfig(templates[templateId]);
    }
  }, [setConfig, location.search]);

  return (
    <EditorLayout>
      <PortfolioView config={config} />
    </EditorLayout>
  )
}

import { TemplatesDashboard } from "./pages/TemplatesDashboard"

// ... imports

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<><Navbar /><LandingPage /></>} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/templates" element={<TemplatesDashboard />} />
        <Route path="/showcase" element={<ShowcasePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  )
}

export default App
