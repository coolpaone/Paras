import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { profileData } from '../data/cvData';
import { ProfilePhoto } from '../types';

interface ProfileGalleryProps {
  onSelectPhoto: (photo: ProfilePhoto) => void;
  photos?: ProfilePhoto[];
}

export default function ProfileGallery({ onSelectPhoto, photos = profileData.photos }: ProfileGalleryProps) {
  const [failedIds, setFailedIds] = useState<Record<string, boolean>>({});
  const [currentSrcs, setCurrentSrcs] = useState<Record<string, string>>({});
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

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

  const handleMobileScroll = () => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const scrollLeft = container.scrollLeft;
    const width = container.clientWidth;
    if (width > 0) {
      const newIndex = Math.round(scrollLeft / width);
      if (newIndex >= 0 && newIndex < visiblePhotos.length && newIndex !== activeMobileIndex) {
        setActiveMobileIndex(newIndex);
      }
    }
  };

  const scrollToPhoto = (index: number) => {
    if (sliderRef.current) {
      const width = sliderRef.current.clientWidth;
      sliderRef.current.scrollTo({
        left: index * width,
        behavior: 'smooth',
      });
      setActiveMobileIndex(index);
    }
  };

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

        {/* Desktop Photo Showcase Grid (PC Version - Untouched) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {visiblePhotos.map((photo) => {
            const displayUrl = currentSrcs[photo.id] || photo.url;

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

        {/* Mobile Horizontal Slide Gallery (iPhone Photos Style) */}
        <div className="md:hidden relative max-w-sm mx-auto">
          {/* Main Slide Carousel Container with Native Smooth Snap */}
          <div
            ref={sliderRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth w-full rounded-2xl"
          >
            {visiblePhotos.map((photo, index) => {
              const displayUrl = currentSrcs[photo.id] || photo.url;

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
                  key={`mobile-${photo.id}`}
                  onClick={() => onSelectPhoto({ ...photo, url: displayUrl })}
                  className="w-full flex-shrink-0 snap-center px-1"
                >
                  <div className="relative w-full aspect-[4/5] bg-slate-900 border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl active:scale-[0.99] transition-transform">
                    <img
                      src={displayUrl}
                      alt={photo.title || 'Paras Nepali photograph'}
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(photo)}
                      className={`w-full h-full object-cover ${objectPositionClass}`}
                    />

                    {/* iPhone-style photo counter pill */}
                    <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/10 text-[11px] font-medium text-slate-200 shadow-md pointer-events-none">
                      {index + 1} / {visiblePhotos.length}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Navigation Arrow Buttons */}
          {activeMobileIndex > 0 && (
            <button
              type="button"
              onClick={() => scrollToPhoto(activeMobileIndex - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-white flex items-center justify-center shadow-xl active:scale-90 transition-transform z-10 cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {activeMobileIndex < visiblePhotos.length - 1 && (
            <button
              type="button"
              onClick={() => scrollToPhoto(activeMobileIndex + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-white flex items-center justify-center shadow-xl active:scale-90 transition-transform z-10 cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* iOS Pagination Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {visiblePhotos.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                type="button"
                onClick={() => scrollToPhoto(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === activeMobileIndex
                    ? 'w-6 h-1.5 bg-sky-400'
                    : 'w-1.5 h-1.5 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Slide to photo ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

