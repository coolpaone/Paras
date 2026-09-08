import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Expertise from './components/Expertise';
import Languages from './components/Languages';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CVDocumentModal from './components/CVDocumentModal';

export default function App() {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-sky-500 selection:text-white flex flex-col font-sans">
      {/* Navigation */}
      <Navbar onOpenCvModal={() => setIsCvModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenCvModal={() => setIsCvModalOpen(true)} />
        <About />
        <Experience />
        <Expertise />
        <Languages />
        <Contact onOpenCvModal={() => setIsCvModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Verified CV Scanned Document Modal */}
      <CVDocumentModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />
    </div>
  );
}
