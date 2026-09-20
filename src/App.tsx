import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ProfileGallery from './components/ProfileGallery';
import Experience from './components/Experience';
import Expertise from './components/Expertise';
import Languages from './components/Languages';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PhotoLightboxModal from './components/PhotoLightboxModal';
import FadeInSection from './components/FadeInSection';
import { profileData } from './data/cvData';
import { ProfilePhoto } from './types';

export default function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<ProfilePhoto | null>(null);

  // Clear any old customized avatar/photos from localStorage so authentic files always display
  useEffect(() => {
    try {
      localStorage.removeItem('paras_portfolio_photos');
      localStorage.removeItem('paras_portfolio_avatar');
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-sky-500 selection:text-white flex flex-col font-sans">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections with Intersection Observer Scroll Animations */}
      <main className="flex-1">
        <FadeInSection threshold={0}>
          <Hero />
        </FadeInSection>

        <FadeInSection threshold={0.08}>
          <About />
        </FadeInSection>

        <FadeInSection threshold={0.08}>
          <ProfileGallery
            photos={profileData.photos}
            onSelectPhoto={(photo) => setSelectedPhoto(photo)}
          />
        </FadeInSection>

        <FadeInSection threshold={0.08}>
          <Experience />
        </FadeInSection>

        <FadeInSection threshold={0.08}>
          <Expertise />
        </FadeInSection>

        <FadeInSection threshold={0.08}>
          <Languages />
        </FadeInSection>

        <FadeInSection threshold={0.08}>
          <Contact />
        </FadeInSection>
      </main>

      {/* Footer */}
      <FadeInSection threshold={0.05}>
        <Footer />
      </FadeInSection>

      {/* Fullscreen Photo Lightbox Modal for gallery viewing */}
      <PhotoLightboxModal
        photo={selectedPhoto}
        allPhotos={profileData.photos}
        onClose={() => setSelectedPhoto(null)}
        onSelectPhoto={(photo) => setSelectedPhoto(photo)}
      />
    </div>
  );
}
