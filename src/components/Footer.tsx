import React from 'react';
import { Sparkles, MessageCircle, Instagram, Mail, Heart, Clock, MapPin } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { setActivePage, setSelectedCategory } = useCart();

  const handlePage = (page: 'home' | 'shop' | 'custom' | 'about' | 'contact') => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategory = (category: any) => {
    setSelectedCategory(category);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF5F0] border-t border-[#EDE1D6] mt-20 pt-16 pb-12 text-[#5A4D4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#EAE0D6]">
          
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#F3D5D8] flex items-center justify-center text-[#934454]">
                <Sparkles className="w-4 h-4 fill-[#934454]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#3A2428]">
                {siteConfig.name}
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-[#70605C] leading-relaxed max-w-sm">
              Artisan crochet flowers and handmade woolen treasures crafted petal-by-petal. Designed to bring everlasting beauty, warmth, and gentle memories to life’s cherished moments.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-[#E2D5CB] flex items-center justify-center text-[#2E6B47] hover:bg-[#E7F3EC] transition-colors"
                title="WhatsApp Direct"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-[#E2D5CB] flex items-center justify-center text-[#8F3B4B] hover:bg-[#FCEEF1] transition-colors"
                title="Instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="w-9 h-9 rounded-full bg-white border border-[#E2D5CB] flex items-center justify-center text-[#5A4D4A] hover:bg-white transition-colors"
                title="Email Us"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Explore Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3D2F2C]">
              Discover
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handlePage('home')}
                  className="hover:text-[#934454] transition-colors text-left"
                >
                  Home Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePage('shop')}
                  className="hover:text-[#934454] transition-colors text-left"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePage('custom')}
                  className="hover:text-[#934454] transition-colors text-left"
                >
                  Custom Bouquet Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePage('about')}
                  className="hover:text-[#934454] transition-colors text-left"
                >
                  Our Handcraft Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePage('contact')}
                  className="hover:text-[#934454] transition-colors text-left"
                >
                  Contact & Studio Hours
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3D2F2C]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleCategory('flower-bouquets')}
                  className="hover:text-[#934454] transition-colors text-left"
                >
                  Flower Bouquets
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('single-flowers')}
                  className="hover:text-[#934454] transition-colors text-left"
                >
                  Single Flower Stems
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('keychains')}
                  className="hover:text-[#934454] transition-colors text-left"
                >
                  Flower Keychains
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('custom-gifts')}
                  className="hover:text-[#934454] transition-colors text-left"
                >
                  Keepsake Gift Boxes
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Hours & Gifting Note */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3D2F2C]">
              Artisan Studio
            </h4>
            <div className="space-y-2 text-xs text-[#70605C]">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#8F3B4B] shrink-0 mt-0.5" />
                <span>{siteConfig.hours}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#8F3B4B] shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </div>
              <p className="pt-2 text-[11px] text-[#8C7A75]">
                Custom wedding & anniversary bookings recommended 2 weeks in advance.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7A75] gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Handcrafted with love.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Everlasting Yarn Blooms</span>
            <span aria-hidden="true">·</span>
            <span>Made to Cherish</span>
            <span aria-hidden="true">·</span>
            <span>Worldwide Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
