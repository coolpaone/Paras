import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Maximize2, ChevronLeft, ChevronRight, Plus, Image as ImageIcon } from 'lucide-react';
import { profileData } from '../data/cvData';
import { ProfilePhoto } from '../types';

interface ProfileGalleryProps {
  onSelectPhoto: (photo: ProfilePhoto) => void;
  photos?: ProfilePhoto[];
}

interface CustomSlot {
  id: string;
  url: string | null;
}

export default function ProfileGallery({ onSelectPhoto, photos = profileData.photos }: ProfileGalleryProps) {
  const [failedIds, setFailedIds] = useState<Record<string, boolean>>({});
  const [currentSrcs, setCurrentSrcs] = useState<Record<string, string>>({});
  const [slots, setSlots] = useState<CustomSlot[]>([
    { id: 'slot-1', url: null },
    { id: 'slot-2', url: null },
  ]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  const getFallbacks = (id: string, url: string): string[] => {
    if (id === 'paras-profile-pic' || id === 'photo-formal-id') {
      return ['/ParasProfilePic.jpg', '/Paras Profile Pic.png', '/Paras-Profile-Pic.png', '/images/ParasProfilePic.jpg', '/Paras Profile Pic.jpg', '/paras-original-avatar.jpg'];
    }
    if (id === 'paras-1') {
      return ['/Paras (1).jpg', '/images/Paras (1).jpg', '/Paras-1.jpg', '/images/Paras-1.jpg', '/Paras1.jpg'];
    }
    if (id === 'paras-2' || id === 'photo-burj-skyline') {
      return ['/Paras (2).jpg', '/images/Paras (2).jpg', '/Paras-2.jpg', '/images/Paras-2.jpg', '/Paras2.jpg'];
    }
    if (id === 'paras-3' || id === 'photo-retail-uniform') {
      return ['/Paras (3).jpg', '/images/Paras (3).jpg', '/Paras-3.jpg', '/images/Paras-3.jpg', '/Paras3.jpg'];
    }
    if (id === 'paras-5' || id === 'paras-4' || id === 'photo-casual-profile') {
      return ['/Paras (5).jpg', '/images/Paras (5).jpg', '/Paras-5.jpg', '/images/Paras-5.jpg', '/Paras5.jpg', '/Paras (4).jpg'];
    }
    if (id === 'paras-6' || id === 'paras-street' || id === 'photo-executive-portrait') {
      return ['/Paras (6).jpg', '/images/Paras (6).jpg', '/Paras-6.jpg', '/images/Paras-6.jpg', '/Paras.jpg', '/images/Paras.jpg'];
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

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollButtons);
      window.addEventListener('resize', updateScrollButtons);
    }
    return () => {
      if (el) el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollStep = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollStep : scrollStep,
        behavior: 'smooth',
      });
    }
  };

  const handleFileUpload = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newUrl = URL.createObjectURL(file);
      setSlots((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], url: newUrl };
        return next;
      });
    }
  };

  const visiblePhotos = photos.filter((p) => !failedIds[p.id]);

  return (
    <section className="py-16 sm:py-20 bg-slate-950/60 border-t border-slate-800/80" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gallery Header with Aero Navigation Buttons */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Gallery
          </h2>

          {/* Aero / Arrow Next & Previous Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous photos"
              className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next photos"
              className="px-4 h-10 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-sky-600/30 hover:translate-x-0.5 disabled:opacity-40 disabled:hover:translate-x-0"
              id="gallery-next-btn"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Container with side floating arrows */}
        <div className="relative group/carousel">
          {/* Left Floating Arrow */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
              className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/90 hover:bg-sky-600 text-white border border-slate-700/90 shadow-2xl items-center justify-center transition-all cursor-pointer backdrop-blur-md hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Floating Arrow Next */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
              className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/90 hover:bg-sky-600 text-white border border-slate-700/90 shadow-2xl items-center justify-center transition-all cursor-pointer backdrop-blur-md hover:scale-105"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Scrollable Photos Track */}
          <div
            ref={scrollContainerRef}
            className="flex items-stretch gap-5 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* Existing Authentic Pictures - Clean, Pure Image Display */}
            {visiblePhotos.map((photo) => {
              const displayUrl = currentSrcs[photo.id] || photo.url;
              return (
                <div
                  key={photo.id}
                  onClick={() => onSelectPhoto({ ...photo, url: displayUrl })}
                  className="group relative flex-shrink-0 w-64 sm:w-72 aspect-[3/4] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer hover:border-sky-500/60 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-1 snap-start"
                >
                  <img
                    src={displayUrl}
                    alt={photo.title || 'Paras Nepali photograph'}
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(photo)}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Clean hover icon */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <span className="w-8 h-8 rounded-lg bg-slate-900/80 backdrop-blur-md text-sky-400 border border-slate-700/80 flex items-center justify-center shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Slot 1 for Additional Photo */}
            <div
              className="flex-shrink-0 w-64 sm:w-72 aspect-[3/4] snap-start"
              onClick={() => {
                if (slots[0].url) {
                  onSelectPhoto({
                    id: 'custom-slot-1',
                    url: slots[0].url,
                    title: '',
                    category: '',
                    description: '',
                    locationTag: '',
                    featured: false,
                  });
                } else {
                  fileInputRef1.current?.click();
                }
              }}
            >
              <input
                type="file"
                ref={fileInputRef1}
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(0, e)}
              />
              {slots[0].url ? (
                <div className="group relative w-full h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer hover:border-sky-500/60 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-1">
                  <img
                    src={slots[0].url}
                    alt="Additional photograph"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <span className="w-8 h-8 rounded-lg bg-slate-900/80 backdrop-blur-md text-sky-400 border border-slate-700/80 flex items-center justify-center shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-slate-900/40 border-2 border-dashed border-slate-800/80 hover:border-sky-500/60 rounded-2xl flex flex-col items-center justify-center p-6 text-center transition-all cursor-pointer group hover:bg-slate-900/70">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 group-hover:bg-sky-500/10 text-slate-500 group-hover:text-sky-400 flex items-center justify-center mb-3 transition-colors">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-800/40 flex items-center justify-center text-slate-600 group-hover:text-sky-400/80 transition-colors">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>

            {/* Slot 2 for Additional Photo */}
            <div
              className="flex-shrink-0 w-64 sm:w-72 aspect-[3/4] snap-start"
              onClick={() => {
                if (slots[1].url) {
                  onSelectPhoto({
                    id: 'custom-slot-2',
                    url: slots[1].url,
                    title: '',
                    category: '',
                    description: '',
                    locationTag: '',
                    featured: false,
                  });
                } else {
                  fileInputRef2.current?.click();
                }
              }}
            >
              <input
                type="file"
                ref={fileInputRef2}
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(1, e)}
              />
              {slots[1].url ? (
                <div className="group relative w-full h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer hover:border-sky-500/60 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-1">
                  <img
                    src={slots[1].url}
                    alt="Additional photograph"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <span className="w-8 h-8 rounded-lg bg-slate-900/80 backdrop-blur-md text-sky-400 border border-slate-700/80 flex items-center justify-center shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-slate-900/40 border-2 border-dashed border-slate-800/80 hover:border-sky-500/60 rounded-2xl flex flex-col items-center justify-center p-6 text-center transition-all cursor-pointer group hover:bg-slate-900/70">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 group-hover:bg-sky-500/10 text-slate-500 group-hover:text-sky-400 flex items-center justify-center mb-3 transition-colors">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-800/40 flex items-center justify-center text-slate-600 group-hover:text-sky-400/80 transition-colors">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
