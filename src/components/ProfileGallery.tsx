import { Maximize2 } from 'lucide-react';
import { profileData } from '../data/cvData';
import { ProfilePhoto } from '../types';

interface ProfileGalleryProps {
  onSelectPhoto: (photo: ProfilePhoto) => void;
  photos?: ProfilePhoto[];
}

export default function ProfileGallery({ onSelectPhoto, photos = profileData.photos }: ProfileGalleryProps) {
  return (
    <section className="py-12 sm:py-16 bg-slate-950/60 border-t border-slate-800/80" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pure Visual Grid with Zero Text */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => onSelectPhoto(photo)}
              className="group relative aspect-[3/4] sm:aspect-[4/5] bg-slate-900 border border-slate-800/90 rounded-2xl overflow-hidden cursor-pointer hover:border-sky-500/60 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-1"
            >
              <img
                src={photo.url}
                alt="Profile photo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Hover highlight overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Expand Icon on Hover */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="w-9 h-9 rounded-xl bg-slate-900/80 backdrop-blur-md text-sky-400 border border-slate-700/80 flex items-center justify-center shadow-lg">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
