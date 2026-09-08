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
import PhotoManagerModal from './components/PhotoManagerModal';
import { profileData } from './data/cvData';
import { ProfilePhoto } from './types';
import { Camera } from 'lucide-react';

export default function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<ProfilePhoto | null>(null);
  const [photos, setPhotos] = useState<ProfilePhoto[]>(profileData.photos);
  const [avatarUrl, setAvatarUrl] = useState<string>(profileData.avatarCropUrl);
  const [isPhotoManagerOpen, setIsPhotoManagerOpen] = useState(false);

  // Load any user-customized photos from localStorage on mount
  useEffect(() => {
    try {
      const savedPhotos = localStorage.getItem('paras_portfolio_photos');
      if (savedPhotos) {
        setPhotos(JSON.parse(savedPhotos));
      }
      const savedAvatar = localStorage.getItem('paras_portfolio_avatar');
      if (savedAvatar) {
        setAvatarUrl(savedAvatar);
      }
    } catch {
      // ignore storage error
    }
  }, []);

  const handleUpdatePhotos = (newPhotos: ProfilePhoto[]) => {
    setPhotos(newPhotos);
    try {
      localStorage.setItem('paras_portfolio_photos', JSON.stringify(newPhotos));
    } catch {
      // ignore
    }
  };

  const handleUpdateAvatar = (newAvatar: string) => {
    setAvatarUrl(newAvatar);
    try {
      localStorage.setItem('paras_portfolio_avatar', newAvatar);
    } catch {
      // ignore
    }
  };

  const handleResetPhotos = () => {
    setPhotos(profileData.photos);
    setAvatarUrl(profileData.avatarCropUrl);
    try {
      localStorage.removeItem('paras_portfolio_photos');
      localStorage.removeItem('paras_portfolio_avatar');
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-sky-500 selection:text-white flex flex-col font-sans">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          avatarUrl={avatarUrl}
          onOpenPhotoManager={() => setIsPhotoManagerOpen(true)}
        />
        <About />
        <ProfileGallery
          photos={photos}
          onSelectPhoto={(photo) => setSelectedPhoto(photo)}
        />
        <Experience />
        <Expertise />
        <Languages />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Fullscreen Photo Lightbox Modal */}
      <PhotoLightboxModal
        photo={selectedPhoto}
        allPhotos={photos}
        onClose={() => setSelectedPhoto(null)}
        onSelectPhoto={(photo) => setSelectedPhoto(photo)}
      />

      {/* Photo Manager Modal */}
      <PhotoManagerModal
        isOpen={isPhotoManagerOpen}
        onClose={() => setIsPhotoManagerOpen(false)}
        currentAvatar={avatarUrl}
        onUpdateAvatar={handleUpdateAvatar}
        photos={photos}
        onUpdatePhotos={handleUpdatePhotos}
        onResetPhotos={handleResetPhotos}
      />

      {/* Discreet bottom floating button to manage / upload original photos */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => setIsPhotoManagerOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900/90 hover:bg-sky-600 text-slate-300 hover:text-white border border-slate-700/80 hover:border-sky-500/60 shadow-xl backdrop-blur-md text-xs font-semibold transition-all duration-200 cursor-pointer group"
          title="Manage or Upload Original Photos"
          aria-label="Manage Original Photos"
        >
          <Camera className="w-4 h-4 text-sky-400 group-hover:text-white transition-colors" />
          <span className="hidden sm:inline">Photos &amp; Avatar</span>
        </button>
      </div>
    </div>
  );
}
