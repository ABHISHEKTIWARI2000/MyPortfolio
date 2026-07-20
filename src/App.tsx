import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Research } from './components/Research';
import { Projects } from './components/Projects';
import { Publication } from './components/Publication';
import { Skills } from './components/Skills';
import { ProblemSolving } from './components/ProblemSolving';
import { CurrentlyLearning } from './components/CurrentlyLearning';
import { Achievements } from './components/Achievements';
import { Coursework } from './components/Coursework';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { BackToTop } from './components/BackToTop';
import { CommandPalette } from './components/CommandPalette';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';

function App() {
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(o => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <Navbar onCommand={() => setCmdOpen(true)} />

      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Research />
        <Projects />
        <Publication />
        <Skills />
        <ProblemSolving />
        <CurrentlyLearning />
        <Achievements />
        <Coursework />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
}

export default App;
