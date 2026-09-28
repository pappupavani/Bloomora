import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, MessageCircle, Heart, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { siteConfig } from '../config/siteConfig';

export const Navbar: React.FC = () => {
  const { 
    itemCount, 
    setIsCartOpen, 
    activePage, 
    setActivePage, 
    searchQuery, 
    setSearchQuery,
    setSelectedCategory 
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  const navLinks: { id: 'home' | 'shop' | 'custom' | 'about' | 'contact'; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop Bouquets' },
    { id: 'custom', label: 'Custom Orders' },
    { id: 'about', label: 'Our Story' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: 'home' | 'shop' | 'custom' | 'about' | 'contact') => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActivePage('shop');
      setSelectedCategory('all');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EFE7DE] transition-all">
      {/* Announcement Bar */}
      {!announcementDismissed && (
        <div className="bg-[#5B2E35] text-[#FAF8F5] text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 relative tracking-wide">
          <span className="truncate">{siteConfig.announcementText}</span>
          <button
            onClick={() => setAnnouncementDismissed(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-1"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Wordmark / Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-full bg-[#F3D5D8] flex items-center justify-center text-[#934454] shadow-sm group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5 fill-[#934454]" />
              </div>
              <div>
                <span className="font-serif text-2xl font-semibold tracking-tight text-[#3A2428] block leading-none">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#8C7A75] font-medium block mt-1">
                  Artisan Crochet & Wool
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#5E514D]">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`transition-colors py-1 relative hover:text-[#934454] ${
                    isActive ? 'text-[#934454] font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#934454] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Search, WhatsApp & Cart) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Input toggle */}
            <div className="relative">
              {showSearchInput ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search roses, tulips, keychains..."
                    autoFocus
                    className="w-48 sm:w-64 py-1.5 pl-8 pr-8 text-xs rounded-full border border-[#DBCDC5] bg-white text-[#2C2725] focus:outline-none focus:border-[#934454]"
                  />
                  <Search className="w-3.5 h-3.5 absolute left-2.5 text-[#8C7A75]" />
                  <button
                    type="button"
                    onClick={() => {
                      setShowSearchInput(false);
                      setSearchQuery('');
                    }}
                    className="absolute right-2.5 text-[#8C7A75] hover:text-[#2C2725]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2 text-[#5E514D] hover:text-[#934454] hover:bg-[#F4ECE6] rounded-full transition-colors"
                  title="Search items"
                  aria-label="Search items"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Direct WhatsApp Quick Chat */}
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                `Hello ${siteConfig.name}! I'm interested in ordering handmade crochet flowers.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2E6B47] bg-[#E7F3EC] hover:bg-[#D7EBDD] rounded-full transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-[#3A2428] hover:text-[#934454] bg-[#F7EFE9] hover:bg-[#F3E3D9] rounded-full transition-colors flex items-center justify-center focus:outline-none"
              aria-label={`View cart with ${itemCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#A83244] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#5E514D] hover:text-[#934454] rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#EFE7DE] py-4 px-2 space-y-2 bg-[#FAF8F5]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activePage === link.id
                    ? 'bg-[#F4E3E5] text-[#934454] font-semibold'
                    : 'text-[#4A3E3B] hover:bg-[#F5EFEB]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[#EFE7DE] flex items-center justify-between px-3 text-xs text-[#7B6E6A]">
              <span>Need custom assistance?</span>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2E6B47] font-semibold flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Chat WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
