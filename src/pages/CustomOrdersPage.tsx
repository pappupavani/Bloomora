import React, { useState } from 'react';
import { Sparkles, MessageCircle, Calendar, Heart, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { siteConfig } from '../config/siteConfig';
import { HERO_IMAGE } from '../data/products';

const FLOWER_TYPES = [
  { id: 'roses', label: 'Crochet Roses', desc: 'Sculpted romantic bloom' },
  { id: 'tulips', label: 'Fluffy Tulips', desc: 'Whimsical spring favorite' },
  { id: 'sunflowers', label: 'Golden Sunflowers', desc: 'Radiant cheerful energy' },
  { id: 'daisies', label: 'White Daisies', desc: 'Delicate sunny yellow eye' },
  { id: 'orchids', label: 'Bell Orchids', desc: 'Dangling fairy-like blossoms' },
  { id: 'carnations', label: 'Ruffled Carnations', desc: 'Rich textural frills' },
  { id: 'lavender', label: 'Lavender Sprigs', desc: 'Soft fragrant aesthetic' },
  { id: 'eucalyptus', label: 'Eucalyptus Leaves', desc: 'Sage botanical foliage' },
];

const COLOR_PALETTES = [
  { id: 'blush-cream', label: 'Blush Pink & Ivory Cream', colors: ['#E8A598', '#FDFBF7', '#8FA382'] },
  { id: 'lavender-mist', label: 'Lavender Twilight', colors: ['#B8A8D8', '#EBDFF2', '#A8C9B9'] },
  { id: 'meadow-sun', label: 'Sunny Meadow', colors: ['#F7D674', '#F4B6C2', '#8FA382'] },
  { id: 'autumn-spice', label: 'Warm Autumn Terracotta', colors: ['#D08C51', '#F6BD60', '#6B5A56'] },
  { id: 'custom-mix', label: 'Surprise Artisan Mix', colors: ['#E8A598', '#B8A8D8', '#F7D674'] },
];

const STEM_OPTIONS = [
  { count: 3, label: '3 Stems (Petite)', price: 28 },
  { count: 5, label: '5 Stems (Medium)', price: 42 },
  { count: 7, label: '7 Stems (Classic Grand)', price: 58 },
  { count: 10, label: '10 Stems (Deluxe)', price: 78 },
  { count: 15, label: '15 Stems (Statement Keepsake)', price: 110 },
];

const RIBBON_OPTIONS = [
  'Organic Cream Linen',
  'Dusty Rose Satin',
  'Sage Velvet Ribbon',
  'Lavender Organza',
  'Natural Golden Twine',
];

export const CustomOrdersPage: React.FC = () => {
  const { addToCart, setIsCartOpen } = useCart();

  const [selectedPalette, setSelectedPalette] = useState(COLOR_PALETTES[0].label);
  const [selectedStemOption, setSelectedStemOption] = useState(STEM_OPTIONS[2]);
  const [selectedFlowers, setSelectedFlowers] = useState<string[]>(['roses', 'tulips', 'daisies', 'eucalyptus']);
  const [selectedRibbon, setSelectedRibbon] = useState(RIBBON_OPTIONS[0]);
  const [personalizedMessage, setPersonalizedMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const toggleFlower = (id: string) => {
    setSelectedFlowers((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((f) => f !== id) : prev) : [...prev, id]
    );
  };

  const generateCustomWhatsAppMessage = () => {
    const selectedFlowerNames = selectedFlowers
      .map((f) => FLOWER_TYPES.find((item) => item.id === f)?.label)
      .filter(Boolean)
      .join(', ');

    const msg = `🌸 *New Custom Bouquet Request - ${siteConfig.name}*

*Bouquet Specifications:*
• Stems: ${selectedStemOption.label} (${siteConfig.currency}${selectedStemOption.price})
• Color Palette: ${selectedPalette}
• Flower Varieties: ${selectedFlowerNames}
• Ribbon: ${selectedRibbon}
• Preferred Delivery Date: ${deliveryDate || 'Flexible'}
${personalizedMessage ? `• Gift Card Note: "${personalizedMessage}"\n` : ''}
${additionalRequirements ? `• Special Requests: "${additionalRequirements}"\n` : ''}
*Customer Contact:*
• Name: ${customerName || 'To be shared'}
• Phone: ${customerPhone || 'To be shared'}

Please let me know your availability for this custom piece! Thank you!`;

    return encodeURIComponent(msg);
  };

  const handleAddCustomToCart = () => {
    const selectedFlowerNames = selectedFlowers
      .map((f) => FLOWER_TYPES.find((item) => item.id === f)?.label)
      .filter(Boolean)
      .join(', ');

    const customProduct = {
      id: `custom-bouquet-${Date.now()}`,
      name: `Custom Bouquet (${selectedStemOption.count} Stems)`,
      category: 'custom-gifts' as const,
      price: selectedStemOption.price,
      shortDescription: `${selectedPalette} • ${selectedFlowerNames}`,
      fullDescription: `Bespoke custom order: ${selectedStemOption.count} stems in ${selectedPalette}. Flowers: ${selectedFlowerNames}. Ribbon: ${selectedRibbon}.`,
      image: HERO_IMAGE,
      colors: [{ name: selectedPalette, hex: '#E8A598' }],
      tags: ['Custom Order', 'Bespoke'],
      rating: 5.0,
      reviewCount: 1,
    };

    addToCart(
      customProduct,
      customProduct.colors[0],
      1,
      personalizedMessage || additionalRequirements || undefined,
      {
        flowerTypes: selectedFlowers,
        stemCount: selectedStemOption.count,
        ribbonColor: selectedRibbon,
        deliveryDate,
        recipientName: customerName,
      }
    );

    setIsCartOpen(true);
  };

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const waUrl = `https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=${generateCustomWhatsAppMessage()}`;
    window.open(waUrl, '_blank');
    setSubmittedSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#934454]">
          Bespoke Atelier
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1F22]">
          Design Your Custom Bouquet
        </h1>
        <p className="text-xs sm:text-sm text-[#70605C] leading-relaxed">
          Create a truly unique, everlasting woolen arrangement tailored to your color scheme, favorite flowers, and heartfelt milestone.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Form: Customization Steps (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Step 1: Bouquet Palette */}
          <div className="p-6 rounded-3xl bg-white border border-[#EDE1D6] shadow-xs space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#3D2F2C]">
              1. Select Color Palette
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {COLOR_PALETTES.map((pal) => {
                const isSelected = selectedPalette === pal.label;
                return (
                  <button
                    key={pal.id}
                    type="button"
                    onClick={() => setSelectedPalette(pal.label)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#934454] bg-[#FDF6F7] ring-1 ring-[#934454]'
                        : 'border-[#EAE0D7] bg-[#FAF8F5] hover:bg-white'
                    }`}
                  >
                    <span className="text-xs font-semibold text-[#2C2725]">{pal.label}</span>
                    <div className="flex items-center gap-1">
                      {pal.colors.map((c, i) => (
                        <span
                          key={i}
                          className="w-3 h-3 rounded-full border border-black/10"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Number of Flowers */}
          <div className="p-6 rounded-3xl bg-white border border-[#EDE1D6] shadow-xs space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#3D2F2C]">
              2. Number of Flowers (Stem Count)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {STEM_OPTIONS.map((opt) => {
                const isSelected = selectedStemOption.count === opt.count;
                return (
                  <button
                    key={opt.count}
                    type="button"
                    onClick={() => setSelectedStemOption(opt)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#934454] bg-[#FDF6F7] ring-1 ring-[#934454]'
                        : 'border-[#EAE0D7] bg-[#FAF8F5] hover:bg-white'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-semibold text-[#2C2725] block">{opt.label}</span>
                    </div>
                    <span className="font-serif text-sm font-bold text-[#8F3B4B] tabular-nums">
                      {siteConfig.currency}{opt.price}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Flower Types */}
          <div className="p-6 rounded-3xl bg-white border border-[#EDE1D6] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#3D2F2C]">
                3. Choose Flower Types
              </h3>
              <span className="text-xs text-[#8C7A75]">Pick 1 or more varieties</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {FLOWER_TYPES.map((flower) => {
                const isPicked = selectedFlowers.includes(flower.id);
                return (
                  <button
                    key={flower.id}
                    type="button"
                    onClick={() => toggleFlower(flower.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                      isPicked
                        ? 'border-[#934454] bg-[#FDF6F7] text-[#8F3B4B]'
                        : 'border-[#EAE0D7] bg-[#FAF8F5] hover:bg-white text-[#564946]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs ${
                        isPicked ? 'bg-[#934454]' : 'border border-[#D9CBC1] bg-white'
                      }`}
                    >
                      {isPicked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold">{flower.label}</p>
                      <p className="text-[11px] text-[#8C7A75]">{flower.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Ribbon Color */}
          <div className="p-6 rounded-3xl bg-white border border-[#EDE1D6] shadow-xs space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#3D2F2C]">
              4. Ribbon Color & Texture
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {RIBBON_OPTIONS.map((ribbon) => {
                const isSelected = selectedRibbon === ribbon;
                return (
                  <button
                    key={ribbon}
                    type="button"
                    onClick={() => setSelectedRibbon(ribbon)}
                    className={`py-2 px-3.5 rounded-full text-xs font-medium border transition-all ${
                      isSelected
                        ? 'border-[#934454] bg-[#934454] text-white shadow-xs'
                        : 'border-[#D9CBC1] bg-white text-[#564946] hover:bg-[#F6EFEB]'
                    }`}
                  >
                    {ribbon}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 5 & 6: Message, Date & Notes */}
          <div className="p-6 rounded-3xl bg-white border border-[#EDE1D6] shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#3D2F2C]">
              5. Delivery & Personalization
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A3E3B] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Clara Sterling"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#D9CBC1] bg-[#FAF8F5] focus:outline-none focus:border-[#934454]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E3B] mb-1">
                  WhatsApp / Phone Number
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#D9CBC1] bg-[#FAF8F5] focus:outline-none focus:border-[#934454]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A3E3B] mb-1">
                Preferred Delivery / Event Date
              </label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#D9CBC1] bg-[#FAF8F5] focus:outline-none focus:border-[#934454]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A3E3B] mb-1">
                Personalized Handwritten Gift Card Message
              </label>
              <textarea
                rows={2}
                value={personalizedMessage}
                onChange={(e) => setPersonalizedMessage(e.target.value)}
                placeholder="Write your heartfelt note for the recipient..."
                className="w-full text-xs p-2.5 rounded-xl border border-[#D9CBC1] bg-[#FAF8F5] focus:outline-none focus:border-[#934454]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A3E3B] mb-1">
                Additional Requirements / Specific Preferences
              </label>
              <textarea
                rows={2}
                value={additionalRequirements}
                onChange={(e) => setAdditionalRequirements(e.target.value)}
                placeholder="e.g., extra eucalyptus foliage, wrapped with frosted craft paper, baby shower theme"
                className="w-full text-xs p-2.5 rounded-xl border border-[#D9CBC1] bg-[#FAF8F5] focus:outline-none focus:border-[#934454]"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Summary & Submission (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-[#EDE1D6] shadow-lg space-y-5">
              
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#F6F0EA] border border-[#EAE0D7] relative">
                <img
                  src={HERO_IMAGE}
                  alt="Custom bouquet preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#8F3B4B] text-[11px] font-bold px-2.5 py-1 rounded-full border border-[#E8D0D5]">
                  Bespoke Commission
                </span>
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-[#2D2224]">
                  Custom Keepsake Summary
                </h3>
                <p className="text-xs text-[#7A6A66] mt-0.5">
                  Hand-crocheted to your exact design
                </p>
              </div>

              {/* Breakdown */}
              <div className="text-xs space-y-2.5 pt-3 border-t border-[#F0E6DE]">
                <div className="flex justify-between">
                  <span className="text-[#8C7A75]">Stem Selection:</span>
                  <span className="font-semibold text-[#2C2725]">{selectedStemOption.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7A75]">Palette:</span>
                  <span className="font-semibold text-[#2C2725]">{selectedPalette}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7A75]">Flowers:</span>
                  <span className="font-semibold text-[#2C2725] truncate max-w-[200px]">
                    {selectedFlowers.map((f) => FLOWER_TYPES.find((i) => i.id === f)?.label).join(', ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7A75]">Ribbon:</span>
                  <span className="font-semibold text-[#2C2725]">{selectedRibbon}</span>
                </div>
                {deliveryDate && (
                  <div className="flex justify-between">
                    <span className="text-[#8C7A75]">Delivery Target:</span>
                    <span className="font-semibold text-[#2C2725]">{deliveryDate}</span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="pt-4 border-t border-[#F0E6DE] flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#8C7A75] block">Estimated Total</span>
                  <span className="font-serif text-2xl font-bold text-[#8F3B4B] tabular-nums">
                    {siteConfig.currency}{selectedStemOption.price}.00
                  </span>
                </div>
                <span className="text-[11px] text-[#2E6B47] font-semibold bg-[#E7F3EC] px-2.5 py-1 rounded-full">
                  Free Gift Wrap Included
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleSubmitWhatsApp}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#2E6B47] hover:bg-[#245738] text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Submit Custom Order via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddCustomToCart}
                  className="w-full py-3 px-4 rounded-2xl border border-[#934454] bg-[#FDF6F7] hover:bg-[#F9ECEF] text-[#8F3B4B] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Custom Bouquet to Cart</span>
                </button>
              </div>

              {submittedSuccess && (
                <div className="p-3 bg-[#EBF6EE] border border-[#C5E3D0] rounded-xl text-xs text-[#1D6039] text-center font-medium">
                  WhatsApp window opened with your custom order details! We will confirm your commission shortly.
                </div>
              )}
            </div>

            {/* Artisan Guarantee */}
            <div className="p-5 rounded-3xl bg-[#FAF6F2] border border-[#EFE5DB] text-xs text-[#6B5A56] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#3A2428]">
                <Sparkles className="w-4 h-4 text-[#8F3B4B]" />
                <span>Our Bespoke Guarantee</span>
              </div>
              <p className="leading-relaxed text-[#70605C]">
                Before packaging, we will send high-resolution photos of your completed bouquet to ensure you fall in love with every stitch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
