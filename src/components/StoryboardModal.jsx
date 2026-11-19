import React from 'react';
import { X, Check, ExternalLink, Image as ImageIcon, Clock, Layers } from 'lucide-react';
import { STORYBOARD_STAGES } from './HeroVideoScroll';

export default function StoryboardModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#121417] border border-white/15 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 md:px-8 border-b border-white/10 flex items-center justify-between bg-[#16191d]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#c5a880]/15 text-[#c5a880]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-lg md:text-xl font-bold text-white tracking-wide">
                Client Storyboard Specification
              </h3>
              <p className="text-xs text-[#d8d2c4]/70 font-mono">
                Exact second-by-second timeline mapping & room state synchronization
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8">
          {/* Storyboard Screenshot Comparison */}
          <div className="rounded-2xl border border-white/10 overflow-hidden bg-black/40 p-4">
            <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#c5a880]">
              <span className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                <span>PROVIDED STORYBOARD SPECIFICATION REFERENCE</span>
              </span>
              <span className="text-white/40">Source: Uploaded Brief</span>
            </div>
            <img 
              src="/storyboard_guide.png" 
              alt="Storyboard Specification" 
              className="w-full rounded-xl border border-white/10 shadow-lg object-contain max-h-64 mx-auto"
            />
          </div>

          {/* Interactive Specification Table */}
          <div>
            <h4 className="text-sm font-mono uppercase tracking-[0.2em] text-[#c5a880] mb-4">
              Integrated Animation Map
            </h4>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-white/[0.04] text-white/70 border-b border-white/10 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Time</th>
                    <th className="py-3 px-4">Room State</th>
                    <th className="py-3 px-4">Small Label</th>
                    <th className="py-3 px-4">Headline</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-white/90">
                  {STORYBOARD_STAGES.map((s) => (
                    <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#c5a880] whitespace-nowrap">
                        {s.timeRange}
                      </td>
                      <td className="py-3.5 px-4 font-sans text-xs text-[#d8d2c4] max-w-xs">
                        {s.roomState}
                      </td>
                      <td className="py-3.5 px-4 text-emerald-400 font-semibold whitespace-nowrap">
                        {s.smallLabel || <span className="text-white/40 italic">none (interlude)</span>}
                      </td>
                      <td className="py-3.5 px-4 font-serif text-sm font-semibold tracking-wider text-white whitespace-nowrap">
                        {s.headline || <span className="text-white/40 italic font-mono text-xs">none</span>}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px]">
                          <Check className="w-3 h-3" /> Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Features note */}
          <div className="p-4 rounded-xl glass-panel border border-white/10 text-xs text-[#d8d2c4] flex items-start gap-3 font-sans">
            <Clock className="w-4 h-4 text-[#c5a880] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-mono uppercase tracking-wider block mb-1">
                Scroll-Driven Frame Interpolation
              </strong>
              The Hero video scrolls dynamically through all 5 phases with sub-millisecond precision. You can also click any milestone card on the HUD to immediately jump the camera and text to that phase.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-8 border-t border-white/10 bg-[#16191d] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#f5f2eb] text-[#0c0e10] text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#c5a880] transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}

