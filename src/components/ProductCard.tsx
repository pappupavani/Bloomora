import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Star, Heart } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useCart } from '../context/CartContext';
import { siteConfig } from '../config/siteConfig';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, quickBuy, setSelectedProductForDetail } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [imageError, setImageError] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // Only open details if not clicking button or swatch
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    setSelectedProductForDetail(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-3xl border border-[#EDE4DC] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-[#EDE4DC]/50 hover:-translate-y-1 cursor-pointer"
    >
      {/* Product Image Area with 4:3 Aspect Ratio */}
      <div className="relative aspect-[4/3] bg-[#F7F2ED] overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5ECE5] text-[#8C7A75] p-4 text-center">
            <span className="font-serif text-lg text-[#934454]">Wool & Bloom</span>
            <span className="text-xs mt-1">{product.name}</span>
          </div>
        )}

        {/* Bestseller / Featured Tag */}
        {product.isBestseller && (
          <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#823243] text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-[#E9D5D8] shadow-xs">
            Bestseller
          </div>
        )}

        {/* Quick View Overlay Pill on hover */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 pointer-events-none">
          <span className="bg-white/95 text-[#2C2725] text-xs font-medium py-1.5 px-3.5 rounded-full shadow-md backdrop-blur-xs transform translate-y-2 group-hover:translate-y-0 transition-transform">
            View Details
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and Reviews */}
          <div className="flex items-center gap-1.5 text-xs text-[#8C7A75] mb-1.5">
            <div className="flex items-center text-[#E8A598]">
              <Star className="w-3.5 h-3.5 fill-[#E8A598]" />
            </div>
            <span className="font-semibold text-[#4A3E3B]">{product.rating.toFixed(1)}</span>
            <span aria-hidden="true">·</span>
            <span>{product.reviewCount} reviews</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-lg font-semibold text-[#2D2224] leading-snug line-clamp-1 group-hover:text-[#934454] transition-colors">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#70625E] mt-1.5 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Color Swatches */}
          <div className="mt-3.5 pt-3 border-t border-[#F2ECE6]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#8C7A75] uppercase tracking-wider font-medium">
                Color: <span className="text-[#3A2A27] font-semibold">{selectedColor.name}</span>
              </span>
              <div className="flex items-center gap-1.5">
                {product.colors.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedColor(color);
                      }}
                      title={color.name}
                      aria-label={`Select color ${color.name}`}
                      style={{ backgroundColor: color.hex }}
                      className={`w-4 h-4 rounded-full border transition-transform ${
                        isSelected 
                          ? 'ring-2 ring-[#934454] ring-offset-1 scale-110 border-white' 
                          : 'border-[#D9CFC7] hover:scale-110'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Action Buttons */}
        <div className="mt-4 pt-3 border-t border-[#F2ECE6]">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl font-bold text-[#2C2725] tabular-nums">
                {siteConfig.currency}{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#A89A95] line-through tabular-nums">
                  {siteConfig.currency}{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#3D7856] font-medium bg-[#EBF6EE] px-2 py-0.5 rounded-full">
              In Stock
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, selectedColor, 1);
              }}
              className="py-2.5 px-3 rounded-xl border border-[#DCCEC6] hover:border-[#934454] bg-[#FDFBF9] hover:bg-[#FDF6F7] text-xs font-semibold text-[#5A4549] transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                quickBuy(product, selectedColor, 1);
              }}
              className="py-2.5 px-3 rounded-xl bg-[#8F3B4B] hover:bg-[#792F3D] text-white text-xs font-semibold transition-all flex items-center justify-center gap-1 shadow-sm hover:shadow active:scale-95"
            >
              <span>Buy Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
