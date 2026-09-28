import React from 'react';
import { ArrowRight, Sparkles, Heart, Star, ShieldCheck, Instagram, MessageCircle, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { siteConfig } from '../config/siteConfig';
import { HERO_IMAGE, PRODUCTS, REVIEWS, WHY_CHOOSE_US } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const { setActivePage, setSelectedCategory } = useCart();

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* 1. Large Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Copy Column (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4E3E5] border border-[#E9CFD4] text-[#8F3B4B] text-xs font-semibold tracking-wide shadow-xs">
                <Sparkles className="w-3.5 h-3.5 fill-[#8F3B4B]" />
                <span>Handcrafted with Delicate Woolen Threads</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2B1F22] leading-[1.15]">
                Handmade Flowers That <span className="italic font-normal text-[#934454]">Last Forever</span>
              </h1>

              <p className="text-base sm:text-lg text-[#665753] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {siteConfig.subheading} Each petal is gently crocheted stitch by stitch, creating an everlasting bloom you can cherish for decades.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setActivePage('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-[#8F3B4B] hover:bg-[#792F3D] text-white text-sm font-semibold shadow-lg shadow-[#8F3B4B]/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActivePage('custom');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-full border border-[#D9CBC1] hover:border-[#8F3B4B] bg-white hover:bg-[#FDF7F8] text-[#4A3E3B] hover:text-[#8F3B4B] text-sm font-semibold transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs"
                >
                  <Gift className="w-4 h-4 text-[#8F3B4B]" />
                  <span>Custom Order</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-[#EDE1D6] grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#2D2224] block">100%</span>
                  <span className="text-xs text-[#7A6A66]">Hand-crocheted</span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#2D2224] block">0%</span>
                  <span className="text-xs text-[#7A6A66]">Wilting or fading</span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#2D2224] block">4.9★</span>
                  <span className="text-xs text-[#7A6A66]">Gifting satisfaction</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Column (5 cols on lg) */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] lg:aspect-[4/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#F9F4F0] group">
                <img
                  src={HERO_IMAGE}
                  alt="Handmade crochet flower bouquet"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Floating Gentle Badge */}
                <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#EDE1D6] shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F7E6E9] flex items-center justify-center text-[#8F3B4B] shrink-0">
                    <Heart className="w-5 h-5 fill-[#8F3B4B]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2C2725]">Eternal Keepsake Bouquet</p>
                    <p className="text-[11px] text-[#7A6A66]">Soft milk-cotton yarn & linen ribbon</p>
                  </div>
                </div>
              </div>

              {/* Decorative Subtle Background Glow */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#F8DFE3]/50 rounded-full blur-3xl -z-10 pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-[#E7F3EC]/50 rounded-full blur-3xl -z-10 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#934454] block mb-2">
              Curated Favourites
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2B1F22]">
              Handpicked Blooms & Gifts
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-4 sm:mt-0 text-xs sm:text-sm font-semibold text-[#8F3B4B] hover:text-[#702C39] flex items-center gap-1.5 transition-colors group"
          >
            <span>Explore All Creations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Why Choose Handmade? Section */}
      <section className="bg-[#FAF4EE] py-16 sm:py-20 border-y border-[#EDE1D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#934454] block mb-2">
              The Artisan Difference
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1F22]">
              Why Choose Wool & Bloom?
            </h2>
            <p className="text-xs sm:text-sm text-[#70605C] mt-3">
              Each stem is a celebration of human patience, tactile textures, and lasting beauty that fresh florals cannot match.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-[#EDE1D6] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-serif font-bold text-[#8F3B4B] block mb-3">
                    0{idx + 1}.
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-[#2D2224] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#70605C] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Custom Bouquet Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#F7E7EA] via-[#FAF3F0] to-[#E8F3EC] rounded-3xl p-8 sm:p-12 border border-[#E8D8D3] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8F3B4B]">
              Bespoke Floral Commission
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C2725]">
              Dreaming of a Personalized Bouquet?
            </h2>
            <p className="text-xs sm:text-sm text-[#665753] leading-relaxed">
              Choose your favorite flower stems, color palette, luxury ribbon, and personalized card message. We tailor every single stitch to celebrate your milestone.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setActivePage('custom');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="py-3.5 px-8 rounded-full bg-[#8F3B4B] hover:bg-[#792F3D] text-white text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95 shrink-0 flex items-center gap-2"
          >
            <span>Design Custom Bouquet</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. Customer Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#934454] block mb-2">
            Stories From Gift Givers
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#2B1F22]">
            Cherished by Happy Hearts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white p-5 rounded-3xl border border-[#EDE1D6] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex text-[#E8A598] mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#E8A598]" />
                  ))}
                </div>
                <p className="text-xs text-[#5C4F4B] leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F2ECE6]">
                <p className="text-xs font-bold text-[#2C2725]">{review.author}</p>
                <div className="flex items-center justify-between text-[11px] text-[#8C7A75] mt-0.5">
                  <span className="truncate max-w-[120px]">{review.productName}</span>
                  <span>{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Instagram & Social Media Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8F3B4B] mb-2">
            <Instagram className="w-4 h-4" />
            <span>{siteConfig.instagramHandle}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1F22]">
            Follow Our Yarn Journey
          </h2>
          <p className="text-xs text-[#7A6A66] mt-1">
            Tag us in your keepsake moments with #WoolAndBloom to be featured!
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {PRODUCTS.slice(0, 6).map((item, idx) => (
            <a
              key={idx}
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#F5ECE5] border border-[#EDE1D6]"
            >
              <img
                src={item.image}
                alt="Instagram post"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#8F3B4B]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Instagram className="w-6 h-6" />
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
