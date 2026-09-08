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

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <About />
        <ProfileGallery
          photos={profileData.photos}
          onSelectPhoto={(photo) => setSelectedPhoto(photo)}
        />
        <Experience />
        <Expertise />
        <Languages />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

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
