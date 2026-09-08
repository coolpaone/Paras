import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProfilePhoto } from '../types';

interface PhotoLightboxModalProps {
  photo: ProfilePhoto | null;
  allPhotos: ProfilePhoto[];
  onClose: () => void;
  onSelectPhoto: (photo: ProfilePhoto) => void;
}

export default function PhotoLightboxModal({
  photo,
  allPhotos,
  onClose,
  onSelectPhoto,
}: PhotoLightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && photo) {
        const currentIndex = allPhotos.findIndex((p) => p.id === photo.id);
        const nextPhoto = allPhotos[(currentIndex + 1) % allPhotos.length];
        onSelectPhoto(nextPhoto);
      } else if (e.key === 'ArrowLeft' && photo) {
        const currentIndex = allPhotos.findIndex((p) => p.id === photo.id);
        const prevPhoto = allPhotos[(currentIndex - 1 + allPhotos.length) % allPhotos.length];
        onSelectPhoto(prevPhoto);
      }
    };

    if (photo) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [photo, allPhotos, onClose, onSelectPhoto]);

  if (!photo) return null;

  const currentIndex = allPhotos.findIndex((p) => p.id === photo.id);
  const handlePrev = () => {
    const prevPhoto = allPhotos[(currentIndex - 1 + allPhotos.length) % allPhotos.length];
    onSelectPhoto(prevPhoto);
  };
  const handleNext = () => {
    const nextPhoto = allPhotos[(currentIndex + 1) % allPhotos.length];
    onSelectPhoto(nextPhoto);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[96vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Minimal Bar */}
        <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            {currentIndex + 1} / {allPhotos.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Display */}
        <div className="relative flex-1 bg-slate-950 flex items-center justify-center min-h-[350px] max-h-[75vh] overflow-hidden p-2 sm:p-4">
          <img
            src={photo.url}
            alt="Profile photo preview"
            referrerPolicy="no-referrer"
            className="max-h-[72vh] max-w-full w-auto object-contain rounded-lg shadow-2xl"
          />

          {/* Prev */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-sky-600 text-white border border-slate-700/80 transition-all cursor-pointer backdrop-blur-sm"
            title="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-sky-600 text-white border border-slate-700/80 transition-all cursor-pointer backdrop-blur-sm"
            title="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Thumbnail Strip */}
        <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-center gap-3">
          {allPhotos.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectPhoto(p)}
              className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                p.id === photo.id
                  ? 'border-sky-500 ring-2 ring-sky-500/30 scale-105'
                  : 'border-slate-800 opacity-50 hover:opacity-100'
              }`}
            >
              <img
                src={p.url}
                alt="Thumbnail"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
