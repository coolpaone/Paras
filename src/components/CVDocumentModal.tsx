import { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Download, ExternalLink, ShieldCheck, Printer } from 'lucide-react';
import { profileData } from '../data/cvData';

interface CVDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVDocumentModal({ isOpen, onClose }: CVDocumentModalProps) {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
      setZoomLevel(1);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.6));
  const handleResetZoom = () => setZoomLevel(1);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Paras Nepali - CV Document</title>
            <style>
              body { margin: 0; display: flex; justify-content: center; align-items: center; background: #fff; }
              img { max-width: 100%; height: auto; }
            </style>
          </head>
          <body>
            <img src="${profileData.fullCvImageUrl}" onload="window.print();window.close()" />
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <span>Paras Nepali — Verified CV Document</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Verified Candidate
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">Security Guard • Sonapur, UAE / Gorkha, Nepal</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.6}
                className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono text-slate-400 px-2 select-none">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2.5}
                className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 ml-1"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Print CV Document"
            >
              <Printer className="w-4 h-4" />
            </button>

            <a
              href={profileData.fullCvImageUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Open full image in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors ml-1"
              id="close-cv-modal-btn"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Viewing Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-slate-950/90 subtle-grid min-h-[400px]">
          <div
            className="transition-transform duration-200 ease-out origin-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <div className="relative rounded-lg shadow-2xl overflow-hidden border border-slate-700 bg-white max-w-xl mx-auto">
              <img
                src={profileData.fullCvImageUrl}
                alt="Paras Nepali CV Document"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain max-h-[72vh]"
              />
            </div>
          </div>
        </div>

        {/* Footer info strip */}
        <div className="px-5 py-2.5 bg-slate-950 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <span>Source: Scanned authentic CV credentials for Paras Nepali</span>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${profileData.email}?subject=Invitation%20for%20Interview%20-%20Paras%20Nepali`}
              className="text-sky-400 hover:underline font-medium"
            >
              Email Candidate ({profileData.email})
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
