import { useState, ChangeEvent } from 'react';
import { X, Upload, Check, RotateCcw, Image, User, ShieldCheck } from 'lucide-react';
import { ProfilePhoto } from '../types';

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar: string;
  onUpdateAvatar: (url: string) => void;
  photos: ProfilePhoto[];
  onUpdatePhotos: (photos: ProfilePhoto[]) => void;
  onResetPhotos: () => void;
}

export default function PhotoManagerModal({
  isOpen,
  onClose,
  currentAvatar,
  onUpdateAvatar,
  photos,
  onUpdatePhotos,
  onResetPhotos,
}: PhotoManagerModalProps) {
  const [activeTab, setActiveTab] = useState<'avatar' | 'upload'>('avatar');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>, photoIndex?: number) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (photoIndex !== undefined) {
      // Replace single photo
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          const newPhotos = [...photos];
          newPhotos[photoIndex] = {
            ...newPhotos[photoIndex],
            url: result,
          };
          onUpdatePhotos(newPhotos);
          setStatusMessage(`Photo #${photoIndex + 1} updated successfully with original file!`);
          setTimeout(() => setStatusMessage(null), 3000);
        }
      };
      reader.readAsDataURL(file);
    } else {
      // Multiple files uploaded
      const updatedPhotos = [...photos];
      const fileList: File[] = (Array.from(files) as File[]).slice(0, 4);

      fileList.forEach((file: File, idx: number) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          if (result && updatedPhotos[idx]) {
            updatedPhotos[idx] = {
              ...updatedPhotos[idx],
              url: result,
            };
            if (idx === fileList.length - 1) {
              onUpdatePhotos(updatedPhotos);
              setStatusMessage(`${fileList.length} original photos loaded with untouched pixels!`);
              setTimeout(() => setStatusMessage(null), 3500);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onUpdateAvatar(result);
        setStatusMessage('Profile picture updated with your original photo!');
        setTimeout(() => setStatusMessage(null), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Image className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base">Photo &amp; Profile Picture Settings</h3>
              <p className="text-slate-400 text-xs">Manage original photos without any AI alterations</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-6">
          <button
            type="button"
            onClick={() => setActiveTab('avatar')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'avatar'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Select Profile Picture</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'upload'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Original Files</span>
          </button>
        </div>

        {/* Status alert */}
        {statusMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'avatar' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                Choose an authentic original image to display as your main profile picture, or upload a new original file directly from your device:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {/* Default CV Photo Option */}
                <div
                  onClick={() => onUpdateAvatar('/images/paras-original-avatar.jpg')}
                  className={`p-2 rounded-xl border-2 cursor-pointer transition-all bg-slate-950 flex flex-col items-center ${
                    currentAvatar.includes('paras-original-avatar')
                      ? 'border-sky-500 ring-2 ring-sky-500/30'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-slate-800">
                    <img
                      src="/images/paras-original-avatar.jpg"
                      alt="Verified CV Photo"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-white">Original CV Photo</span>
                  {currentAvatar.includes('paras-original-avatar') && (
                    <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-sky-400 font-medium">
                      <Check className="w-3 h-3" /> Active Profile
                    </span>
                  )}
                </div>

                {/* Gallery Photos as Options */}
                {photos.map((p, idx) => {
                  const isSelected = currentAvatar === p.url;
                  return (
                    <div
                      key={p.id}
                      onClick={() => onUpdateAvatar(p.url)}
                      className={`p-2 rounded-xl border-2 cursor-pointer transition-all bg-slate-950 flex flex-col items-center ${
                        isSelected
                          ? 'border-sky-500 ring-2 ring-sky-500/30'
                          : 'border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-slate-800">
                        <img
                          src={p.url}
                          alt={`Photo ${idx + 1}`}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-white">Gallery Photo #{idx + 1}</span>
                      {isSelected && (
                        <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-sky-400 font-medium">
                          <Check className="w-3 h-3" /> Active Profile
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Upload Custom Avatar Button */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <label className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5 text-sky-400" />
                  <span>Upload New Profile Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-500/20 text-xs text-sky-300">
                <strong>100% Original Quality Guarantee:</strong> Uploading your photos here preserves your raw images without any AI facial recreation or compression.
              </div>

              {/* Bulk upload trigger */}
              <div className="p-6 border-2 border-dashed border-slate-700 hover:border-sky-500 rounded-xl text-center bg-slate-950/60 transition-colors">
                <Upload className="w-8 h-8 text-sky-400 mx-auto mb-2" />
                <p className="text-xs font-medium text-white">Select up to 4 original photos from your device</p>
                <p className="text-[11px] text-slate-400 mt-1">Supports JPG, PNG, WEBP (original resolution)</p>
                <label className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold cursor-pointer transition-colors">
                  <span>Browse Device Files</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e)}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Individual slots */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Or Replace Individual Photo Slots
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {photos.map((p, idx) => (
                    <div key={p.id} className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-center">
                      <div className="aspect-[4/5] rounded-lg overflow-hidden mb-2 bg-slate-800">
                        <img src={p.url} alt={`Slot ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                      <label className="w-full py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-sky-400 font-medium block cursor-pointer transition-colors">
                        <span>Replace #{idx + 1}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, idx)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onResetPhotos();
              setStatusMessage('Reset to original photos!');
              setTimeout(() => setStatusMessage(null), 3000);
            }}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
