import { useState } from 'react';
import { motion } from 'motion/react';
import { profileData } from '../data/cvData';
import { ProfilePhoto } from '../types';

interface ProfileGalleryProps {
  onSelectPhoto: (photo: ProfilePhoto) => void;
  photos?: ProfilePhoto[];
}

export default function ProfileGallery({ onSelectPhoto, photos = profileData.photos }: ProfileGalleryProps) {
  const [failedIds, setFailedIds] = useState<Record<string, boolean>>({});
  const [currentSrcs, setCurrentSrcs] = useState<Record<string, string>>({});

  const getFallbacks = (id: string, url: string): string[] => {
    if (id === 'paras-profile-pic' || id === 'photo-formal-id') {
      return ['/Paras Profile Pic.jpg'];
    }
    if (id === 'paras-1') {
      return ['/Paras (1).jpg'];
    }
    if (id === 'paras-2' || id === 'photo-burj-skyline') {
      return ['/Paras (2).jpg'];
    }
    return [url];
  };

  const handleImageError = (photo: ProfilePhoto) => {
    const fallbacks = getFallbacks(photo.id, photo.url);
    const current = currentSrcs[photo.id] || photo.url;
    const currentIndex = fallbacks.indexOf(current);

    if (currentIndex >= 0 && currentIndex < fallbacks.length - 1) {
      setCurrentSrcs((prev) => ({
        ...prev,
        [photo.id]: fallbacks[currentIndex + 1],
      }));
    } else {
      setFailedIds((prev) => ({
        ...prev,
        [photo.id]: true,
      }));
    }
  };

  const visiblePhotos = photos.filter((p) => !failedIds[p.id]);

  return (
    <section className="py-16 sm:py-20 bg-slate-950/60 border-t border-slate-800/80" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gallery Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-8 sm:mb-10"
        >
          <div className="flex items-center gap-2 text-sky-400 font-semibold tracking-wider text-xs uppercase mb-2">
            <span className="w-6 h-0.5 bg-sky-500"></span>
            Archive
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Media Assets
          </h2>
        </motion.div>

        {/* Re-adjusted Responsive Photo Showcase Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {visiblePhotos.map((photo) => {
            const displayUrl = currentSrcs[photo.id] || photo.url;

            // Optical framing adjustment:
            // - Official Portrait: centered head & shoulders
            // - Corporate Standing: top-aligned for full height posture
            // - Lounge Portrait: centered subject & Burj Khalifa background
            let objectPositionClass = 'object-center';
            if (photo.id === 'paras-1') {
              objectPositionClass = 'object-top';
            } else if (photo.id === 'paras-profile-pic' || photo.id === 'photo-formal-id') {
              objectPositionClass = 'object-center';
            } else if (photo.id === 'paras-2' || photo.id === 'photo-burj-skyline') {
              objectPositionClass = 'object-center';
            }

            return (
              <div
                key={photo.id}
                onClick={() => onSelectPhoto({ ...photo, url: displayUrl })}
                className="group relative w-full aspect-[4/5] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer hover:border-sky-500/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-1.5"
              >
                <img
                  src={displayUrl}
                  alt={photo.title || 'Paras Nepali photograph'}
                  referrerPolicy="no-referrer"
                  onError={() => handleImageError(photo)}
                  className={`w-full h-full object-cover ${objectPositionClass} group-hover:scale-105 transition-transform duration-500 ease-out`}
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
