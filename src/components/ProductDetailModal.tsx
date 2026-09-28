import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, ArrowRight, Heart, ShieldCheck, Sparkles, Truck, Check } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { siteConfig } from '../config/siteConfig';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProductForDetail, 
    setSelectedProductForDetail, 
    addToCart, 
    quickBuy 
  } = useCart();

  if (!selectedProductForDetail) return null;

  const product = selectedProductForDetail;
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [customNote, setCustomNote] = useState<string>('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Sync state when product changes
  useEffect(() => {
    setActiveImage(product.image);
    setSelectedColor(product.colors[0]);
    setQuantity(1);
    setCustomNote('');
  }, [product]);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isFeatured)
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity, customNote.trim() || undefined);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleBuyNow = () => {
    quickBuy(product, selectedColor, quantity, customNote.trim() || undefined);
    setSelectedProductForDetail(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-[#EBE1D8] flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForDetail(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#5E514D] hover:text-[#2C2725] shadow-sm transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto p-5 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            
            {/* Left: Gallery Column */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[4/3] sm:aspect-square rounded-2xl bg-[#F6F0EA] overflow-hidden border border-[#EAE0D7]">
                <img
                  src={activeImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
                {product.isBestseller && (
                  <span className="absolute top-3 left-3 bg-[#FAF8F5]/95 text-[#882F40] text-xs font-semibold px-3 py-1 rounded-full border border-[#EAD5D8]">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.additionalImages && product.additionalImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {product.additionalImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImage === img ? 'border-[#934454] ring-2 ring-[#934454]/20' : 'border-[#EAE0D7] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Artisan Highlights Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#6B5A56]">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF6F2] border border-[#EFE5DC]">
                  <Sparkles className="w-4 h-4 text-[#934454] shrink-0" />
                  <span>100% Woolen Stitchwork</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF6F2] border border-[#EFE5DC]">
                  <Truck className="w-4 h-4 text-[#356E4A] shrink-0" />
                  <span>Free Box & Gift Card</span>
                </div>
              </div>
            </div>

            {/* Right: Contiguous Purchase Module */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Category & Ratings */}
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#934454] font-semibold">
                    {product.category.replace('-', ' ')}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#6B5A56]">
                    <div className="flex text-[#E8A598]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#E8A598]" />
                      ))}
                    </div>
                    <span className="font-semibold text-[#2C2725]">{product.rating}</span>
                    <span>({product.reviewCount} customer reviews)</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2224] mt-2">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="font-serif text-3xl font-bold text-[#2C2725] tabular-nums">
                    {siteConfig.currency}{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#9C8F8A] line-through tabular-nums">
                      {siteConfig.currency}{product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs font-medium text-[#2E6B47] bg-[#E7F3EC] px-2.5 py-0.5 rounded-full">
                    Everlasting Bloom Guarantee
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-[#5B4E4A] mt-4 leading-relaxed">
                  {product.fullDescription}
                </p>

                {/* Dimensions & Material Specs */}
                <div className="mt-4 p-3.5 rounded-2xl bg-[#FBF7F3] border border-[#EFE6DC] text-xs text-[#645551] space-y-1.5">
                  {product.dimensions && (
                    <p><span className="font-semibold text-[#3D2F2C]">Dimensions:</span> {product.dimensions}</p>
                  )}
                  {product.yarnMaterial && (
                    <p><span className="font-semibold text-[#3D2F2C]">Material:</span> {product.yarnMaterial}</p>
                  )}
                  <p><span className="font-semibold text-[#3D2F2C]">Care:</span> Gently brush off dust with soft makeup brush. Keep away from water.</p>
                </div>

                {/* Color Selection */}
                <div className="mt-5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6A66] mb-2">
                    Selected Color: <span className="text-[#3A2A27]">{selectedColor.name}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => {
                      const isSelected = selectedColor.name === color.name;
                      return (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                            isSelected
                              ? 'border-[#934454] bg-[#FDF6F7] text-[#8F3B4B] shadow-xs ring-1 ring-[#934454]'
                              : 'border-[#E0D4CB] bg-white text-[#564946] hover:border-[#B5A59B]'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span>{color.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity and Custom Note */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Quantity Stepper */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6A66] mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center border border-[#D9CBC1] rounded-2xl bg-white p-1">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-semibold hover:bg-[#F6EFEB] text-[#4A3E3B]"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-semibold text-sm text-[#2C2725] tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-semibold hover:bg-[#F6EFEB] text-[#4A3E3B]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Custom Note input */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6A66] mb-2">
                      Gift Note / Ribbon Request (Optional)
                    </label>
                    <input
                      type="text"
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      placeholder="e.g., Happy 21st Birthday Sarah! / Pink ribbon please"
                      className="w-full text-xs py-2 px-3 rounded-2xl border border-[#D9CBC1] bg-white focus:outline-none focus:border-[#934454] placeholder:text-[#9C8F8A]"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-5 border-t border-[#F0E6DE] flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-5 rounded-2xl border border-[#934454] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    addedAnimation 
                      ? 'bg-[#E7F3EC] border-[#3D7856] text-[#2E6B47]' 
                      : 'bg-[#FDF7F8] hover:bg-[#FBECEF] text-[#8F3B4B]'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Your Basket!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart ({siteConfig.currency}{product.price * quantity})</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex-1 py-3.5 px-5 rounded-2xl bg-[#8F3B4B] hover:bg-[#792F3D] text-white text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Buy Now Directly</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Related Products Section inside modal */}
          {relatedProducts.length > 0 && (
            <div className="mt-10 pt-8 border-t border-[#F0E6DE]">
              <h3 className="font-serif text-lg font-semibold text-[#2D2224] mb-4">
                You Might Also Adore
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => setSelectedProductForDetail(rel)}
                    className="p-3 rounded-2xl border border-[#EFE6DC] bg-[#FAF8F5] hover:bg-white hover:shadow-sm transition-all cursor-pointer flex items-center gap-3"
                  >
                    <img
                      src={rel.image}
                      alt={rel.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#2C2725] truncate">{rel.name}</p>
                      <p className="text-xs text-[#8F3B4B] font-bold mt-0.5 tabular-nums">
                        {siteConfig.currency}{rel.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
