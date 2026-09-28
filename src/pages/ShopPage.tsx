import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory } from '../types';

export const ShopPage: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useCart();

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'name'>('featured');
  const [selectedColorFilter, setSelectedColorFilter] = useState<string>('all');

  // Collect unique colors across catalog
  const allColors = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => p.colors.forEach((c) => set.add(c.name)));
    return Array.from(set);
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription.toLowerCase().includes(query) || product.fullDescription.toLowerCase().includes(query);
        const matchesTag = product.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesTag) return false;
      }
      // Color filter
      if (selectedColorFilter !== 'all') {
        const hasColor = product.colors.some((c) => c.name.toLowerCase().includes(selectedColorFilter.toLowerCase()));
        if (!hasColor) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, selectedColorFilter, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedColorFilter('all');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#934454]">
          Artisan Catalog
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1F22]">
          Our Handmade Collection
        </h1>
        <p className="text-xs sm:text-sm text-[#70605C] leading-relaxed">
          From lush multi-stem bouquets to whimsical flower keychains, find the perfect everlasting woolen gift for your loved ones.
        </p>
      </div>

      {/* Category Tabs & Interactive Controls */}
      <div className="space-y-4">
        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as ProductCategory)}
                className={`py-2 px-4 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#8F3B4B] text-white shadow-sm'
                    : 'bg-white hover:bg-[#F6EFEB] text-[#5C4F4B] border border-[#E8DDD4]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Filter Bar (Search, Color Filter, Sorting) */}
        <div className="p-4 rounded-3xl bg-white border border-[#EDE2D7] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search flowers, roses, charms..."
              className="w-full text-xs py-2 pl-9 pr-8 rounded-2xl border border-[#D9CBC1] bg-[#FAF8F5] text-[#2C2725] focus:outline-none focus:border-[#934454]"
            />
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A75]" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7A75] hover:text-[#2C2725]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Color & Sort Selectors */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Color Filter */}
            <div className="flex items-center gap-1.5 text-xs text-[#6B5A56]">
              <span className="hidden sm:inline font-medium">Color:</span>
              <select
                value={selectedColorFilter}
                onChange={(e) => setSelectedColorFilter(e.target.value)}
                className="text-xs py-1.5 px-2.5 rounded-xl border border-[#D9CBC1] bg-[#FAF8F5] text-[#2C2725] focus:outline-none"
              >
                <option value="all">All Colors</option>
                {allColors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs text-[#6B5A56]">
              <span className="hidden sm:inline font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs py-1.5 px-2.5 rounded-xl border border-[#D9CBC1] bg-[#FAF8F5] text-[#2C2725] focus:outline-none"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Metadata & Reset Tag */}
        <div className="flex items-center justify-between text-xs text-[#7A6A66] px-1">
          <span>
            Showing <strong className="text-[#2C2725]">{filteredProducts.length}</strong> handcrafted items
            {selectedCategory !== 'all' && ` in "${CATEGORIES.find((c) => c.id === selectedCategory)?.label}"`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          {(selectedCategory !== 'all' || searchQuery || selectedColorFilter !== 'all') && (
            <button
              onClick={resetFilters}
              className="text-[#8F3B4B] hover:underline font-semibold flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white rounded-3xl border border-[#EDE2D7] p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FAF5F0] flex items-center justify-center text-[#8C7A75] mx-auto">
            <Search className="w-7 h-7 stroke-1" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#2C2725]">No creations found</h3>
          <p className="text-xs text-[#7A6A66] max-w-sm mx-auto">
            We couldn’t find any blooms matching your current search or filters. Try adjusting your search term or color filter.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="py-2.5 px-6 rounded-full bg-[#8F3B4B] text-white text-xs font-semibold hover:bg-[#792F3D] transition-colors"
          >
            Show All Products
          </button>
        </div>
      )}
    </div>
  );
};
