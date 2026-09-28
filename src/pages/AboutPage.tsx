import React from 'react';
import { Sparkles, Heart, ArrowRight, CheckCircle2, Flower2, Scissors, Shield } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { useCart } from '../context/CartContext';
import { HERO_IMAGE, PRODUCTS } from '../data/products';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#934454]">
          Our Craft & Heart
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B1F22] leading-tight">
          Handmade Blooms Crafted to Keep <span className="italic font-normal text-[#8F3B4B]">Your Memories Alive</span>
        </h1>
        <p className="text-sm sm:text-base text-[#6E5E59] leading-relaxed max-w-2xl mx-auto">
          Welcome to {siteConfig.name}. We are an independent handmade studio dedicated to spinning soft woolen threads into eternal botanical art.
        </p>
      </section>

      {/* Main Narrative Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-6 relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#F9F4F0]">
            <img
              src={HERO_IMAGE}
              alt="Artisan crafting crochet flowers"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden sm:block bg-white p-5 rounded-2xl border border-[#EDE1D6] shadow-lg max-w-xs text-xs text-[#5C4F4B]">
            <p className="font-serif text-sm font-bold text-[#2C2725] mb-1">Mindfully Handcrafted</p>
            <p>Every single bouquet requires between 4 to 12 hours of focused, rhythmic crochet needlework.</p>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8F3B4B]">
            How It Began
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1F22]">
            Why Replace Fresh Flowers With Yarn?
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-[#665753] leading-relaxed">
            <p>
              Fresh bouquets are mesmerizing, but watching their petals wilt and discard into the trash just days after a meaningful anniversary, graduation, or birthday always broke our hearts.
            </p>
            <p>
              In our small home craft space, we began experimenting with traditional Japanese amigurumi and French floral micro-crochet techniques. Using premium combed milk-cotton yarn and flexible floral wire, we sculpted roses with natural curl, cheerful daisies with sunny centers, and velvety tulips that never droop.
            </p>
            <p>
              What started as birthday gifts for family quickly blossomed into {siteConfig.name} — a small business committed to creating heartfelt, sustainable keepsakes that remain bright on your desk year after year.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Pillars of Artisan Quality */}
      <section className="bg-[#FAF5F0] py-14 px-6 sm:px-12 rounded-3xl border border-[#EDE1D6]">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#934454] block mb-2">
            Artisan Integrity
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1F22]">
            Our Making Philosophy
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-[#EDE1D6] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F7E6E9] text-[#8F3B4B] flex items-center justify-center">
              <Flower2 className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#2D2224]">Pure Milk-Cotton Yarn</h4>
            <p className="text-xs text-[#70605C] leading-relaxed">
              We exclusively use soft, multi-ply cotton threads that do not pill or shed. They are smooth, vibrant, and completely hypoallergenic for asthma or allergy sufferers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EDE1D6] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F7E6E9] text-[#8F3B4B] flex items-center justify-center">
              <Scissors className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#2D2224]">True One-Stitch Craft</h4>
            <p className="text-xs text-[#70605C] leading-relaxed">
              No glue-gun shortcuts or mass-manufactured shortcuts. Each petal and leaf is individually hooked and assembled with reinforced wire stems for flexible styling.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EDE1D6] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F7E6E9] text-[#8F3B4B] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#2D2224]">Gifting-Ready Presentation</h4>
            <p className="text-xs text-[#70605C] leading-relaxed">
              Every creation arrives wrapped in frosted artisanal paper, tied with satin or velvet ribbon, and accompanied by a thick blank or hand-lettered gift card.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Gallery Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1F22]">
            Glimpses From the Studio
          </h3>
          <p className="text-xs text-[#7A6A66] mt-1">
            Where yarn skeins transform into enduring botanical stories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {PRODUCTS.slice(0, 4).map((p, idx) => (
            <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-[#F5ECE5] border border-[#EAE0D7]">
              <img
                src={p.image}
                alt={p.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="text-center bg-[#FAF3F0] p-10 rounded-3xl border border-[#EADCD4] space-y-4 max-w-3xl mx-auto">
        <h3 className="font-serif text-2xl font-bold text-[#2C2725]">
          Ready to Bring Home Everlasting Joy?
        </h3>
        <p className="text-xs sm:text-sm text-[#70605C] max-w-md mx-auto">
          Browse our ready-to-ship arrangements or tell us your vision for a custom floral commission.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="py-3 px-6 rounded-full bg-[#8F3B4B] text-white text-xs font-semibold hover:bg-[#792F3D] transition-colors"
          >
            Explore Catalog
          </button>
          <button
            type="button"
            onClick={() => {
              setActivePage('custom');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="py-3 px-6 rounded-full border border-[#934454] bg-white text-[#8F3B4B] text-xs font-semibold hover:bg-[#FDF7F8] transition-colors"
          >
            Request Custom Piece
          </button>
        </div>
      </section>
    </div>
  );
};
