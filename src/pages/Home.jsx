import { useCallback, useEffect, useState } from 'react';
import Loader from '../components/layout/Loader';
import ScrollProgress from '../components/layout/ScrollProgress';
import Cursor from '../components/layout/Cursor';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Capabilities from '../components/sections/Capabilities';
import Projects from '../components/sections/Projects';
import Workflow from '../components/sections/Workflow';
import Approach from '../components/sections/Approach';
import Workspace from '../components/sections/Workspace';
import Contact from '../components/sections/Contact';
import useActiveSection from '../hooks/useActiveSection';
import { nav } from '../data/site';

const sectionIds = [...nav.map((n) => n.id), 'approach', 'workspace'];

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* storage unavailable */
  }
  return 'dark';
}

export default function Home() {
  const [theme, setTheme] = useState(getInitialTheme);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Loader />
      <ScrollProgress />
      <Cursor />
      <Navbar active={active} theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Capabilities />
        <Projects />
        <Workflow />
        <Approach />
        <Workspace />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
