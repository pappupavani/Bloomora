import React from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles, Check } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-none">
      <div className="bg-[#2D2224] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#4A383B] text-xs font-medium max-w-sm">
        <div className="w-6 h-6 rounded-full bg-[#8F3B4B] flex items-center justify-center text-white shrink-0">
          <Check className="w-3.5 h-3.5" />
        </div>
        <span className="leading-snug">{toastMessage}</span>
      </div>
    </div>
  );
};
