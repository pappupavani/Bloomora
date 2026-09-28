import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, MessageCircle, CreditCard, Sparkles, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { siteConfig } from '../config/siteConfig';
import { CheckoutFormData } from '../types';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    total,
    clearCart,
    setCompletedOrder,
    setActivePage
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping'>('cart');
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    giftNote: '',
    paymentMethod: 'whatsapp',
  });
  const [formError, setFormError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const freeShippingThreshold = siteConfig.shippingThreshold;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = () => {
    const itemsList = items
      .map(
        (it) =>
          `• ${it.name} (${it.selectedColor.name}) x${it.quantity} - ${siteConfig.currency}${it.price * it.quantity}${
            it.customNote ? `\n   Note: "${it.customNote}"` : ''
          }`
      )
      .join('\n');

    const msg = `🌸 *New Order from ${siteConfig.name} Website!*

*Items:*
${itemsList}

*Subtotal:* ${siteConfig.currency}${subtotal.toFixed(2)}
*Shipping:* ${shippingFee === 0 ? 'FREE' : `${siteConfig.currency}${shippingFee.toFixed(2)}`}
*Total Amount:* ${siteConfig.currency}${total.toFixed(2)}

*Customer Details:*
• Name: ${formData.fullName || 'Not provided yet'}
• Phone: ${formData.phone || 'Not provided'}
• Address: ${formData.address || 'To be confirmed'}, ${formData.city || ''}
${formData.giftNote ? `• Gift Card Note: "${formData.giftNote}"\n` : ''}
*Payment Preference:* ${formData.paymentMethod === 'whatsapp' ? 'Direct via WhatsApp' : formData.paymentMethod.toUpperCase()}

Please let me know how to proceed with payment and delivery! Thank you!`;

    return encodeURIComponent(msg);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setFormError('Please enter your full name and phone number for delivery.');
      return;
    }

    setFormError(null);
    const orderId = `WB-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderInfo = {
      orderId,
      items: [...items],
      subtotal,
      shipping: shippingFee,
      total,
      customerName: formData.fullName,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city}`,
      paymentMethod: formData.paymentMethod,
      giftNote: formData.giftNote,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    if (formData.paymentMethod === 'whatsapp') {
      const waUrl = `https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=${generateWhatsAppMessage()}`;
      window.open(waUrl, '_blank');
    }

    setCompletedOrder(orderInfo);
    clearCart();
    setIsCartOpen(false);
    setCheckoutStep('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#EFE5DB]">
          
          {/* Header */}
          <div className="p-5 border-b border-[#EFE5DB] flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8F3B4B]" />
              <h2 className="font-serif text-lg font-semibold text-[#2D2224]">
                {checkoutStep === 'cart' ? 'Your Shopping Basket' : 'Checkout & Delivery'}
              </h2>
              <span className="text-xs bg-[#F4E3E5] text-[#8F3B4B] font-bold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-[#7B6E6A] hover:text-[#2C2725] hover:bg-[#EFE6DC] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && checkoutStep === 'cart' && (
            <div className="px-5 py-3 bg-[#FCF9F6] border-b border-[#EFE5DB] text-xs">
              <div className="flex items-center justify-between font-medium text-[#5E514D] mb-1.5">
                {amountNeededForFreeShipping > 0 ? (
                  <span>
                    Add <strong className="text-[#8F3B4B]">{siteConfig.currency}{amountNeededForFreeShipping.toFixed(2)}</strong> more for <strong>Free Shipping</strong>!
                  </span>
                ) : (
                  <span className="text-[#2E6B47] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Congratulations! You unlocked Free Shipping!
                  </span>
                )}
              </div>
              <div className="w-full bg-[#EAE0D7] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#8F3B4B] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F6EFEB] flex items-center justify-center text-[#8C7A75]">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#2C2725]">Your basket is empty</h3>
                <p className="text-xs text-[#7A6A66] max-w-xs leading-relaxed">
                  Explore our handcrafted everlasting roses, tulips, and custom bouquets created with woolen warmth.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    setActivePage('shop');
                  }}
                  className="mt-2 py-2.5 px-6 rounded-full bg-[#8F3B4B] text-white text-xs font-semibold hover:bg-[#792F3D] transition-colors"
                >
                  Explore Bouquets
                </button>
              </div>
            ) : checkoutStep === 'cart' ? (
              /* Items List */
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl border border-[#EDE2D7] bg-[#FCFBF9] flex gap-3.5 items-start"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#EAE0D7]"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-sm font-semibold text-[#2D2224] truncate">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#9C8F8A] hover:text-[#A83244] p-1 transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className="w-3 h-3 rounded-full border border-black/10 inline-block"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span className="text-xs text-[#7A6A66]">{item.selectedColor.name}</span>
                      </div>

                      {item.customNote && (
                        <p className="text-[11px] text-[#8F3B4B] italic mt-1 bg-[#FAF2F4] px-2 py-0.5 rounded-md truncate">
                          Note: "{item.customNote}"
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#D9CBC1] rounded-lg bg-white px-1 py-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#564946] hover:bg-[#F6EFEB] rounded"
                          >
                            -
                          </button>
                          <span className="w-7 text-center text-xs font-semibold tabular-nums text-[#2C2725]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#564946] hover:bg-[#F6EFEB] rounded"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-serif text-sm font-bold text-[#2C2725] tabular-nums">
                          {siteConfig.currency}{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Shipping & Payment Form */
              <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="bg-[#FAF5F0] p-3 rounded-2xl border border-[#EFE4DA] text-xs text-[#6B5A56] flex items-center justify-between">
                  <span>Ordered Items: {items.length} items</span>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="text-[#8F3B4B] font-semibold hover:underline"
                  >
                    Edit Basket
                  </button>
                </div>

                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#4A3E3B] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Eleanor Hughes"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CBC1] bg-white focus:outline-none focus:border-[#934454]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A3E3B] mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full text-xs p-2.5 rounded-xl border border-[#D9CBC1] bg-white focus:outline-none focus:border-[#934454]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4A3E3B] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="eleanor@example.com"
                      className="w-full text-xs p-2.5 rounded-xl border border-[#D9CBC1] bg-white focus:outline-none focus:border-[#934454]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3E3B] mb-1">
                    Delivery Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House / Apt number, street name"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CBC1] bg-white focus:outline-none focus:border-[#934454]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A3E3B] mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Portland"
                      className="w-full text-xs p-2.5 rounded-xl border border-[#D9CBC1] bg-white focus:outline-none focus:border-[#934454]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4A3E3B] mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="97201"
                      className="w-full text-xs p-2.5 rounded-xl border border-[#D9CBC1] bg-white focus:outline-none focus:border-[#934454]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3E3B] mb-1">
                    Free Handwritten Gift Card Note
                  </label>
                  <textarea
                    rows={2}
                    name="giftNote"
                    value={formData.giftNote}
                    onChange={handleInputChange}
                    placeholder="Message to write inside the gift envelope..."
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D9CBC1] bg-white focus:outline-none focus:border-[#934454]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3E3B] mb-2">
                    Preferred Ordering & Payment Option
                  </label>
                  <div className="space-y-2">
                    <label
                      className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'whatsapp'
                          ? 'border-[#2E6B47] bg-[#F2F9F5] ring-1 ring-[#2E6B47]'
                          : 'border-[#E2D5CC] bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="whatsapp"
                        checked={formData.paymentMethod === 'whatsapp'}
                        onChange={handleInputChange}
                        className="mt-1 text-[#2E6B47] focus:ring-[#2E6B47]"
                      />
                      <div className="text-xs">
                        <span className="font-semibold text-[#1F5435] flex items-center gap-1.5">
                          <MessageCircle className="w-3.5 h-3.5" /> Order via WhatsApp Direct (Recommended)
                        </span>
                        <p className="text-[#55695D] mt-0.5 text-[11px]">
                          Instantly send your order details directly to our artisan on WhatsApp for quick confirmation and custom touches.
                        </p>
                      </div>
                    </label>

                    <label
                      className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'card'
                          ? 'border-[#8F3B4B] bg-[#FDF6F7] ring-1 ring-[#8F3B4B]'
                          : 'border-[#E2D5CC] bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="mt-1 text-[#8F3B4B] focus:ring-[#8F3B4B]"
                      />
                      <div className="text-xs">
                        <span className="font-semibold text-[#3D2529] flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5" /> Credit / Debit Card Checkout
                        </span>
                        <p className="text-[#7A6A66] mt-0.5 text-[11px]">
                          Safe and secure simulated checkout with instant confirmation receipt.
                        </p>
                      </div>
                    </label>

                    <label
                      className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'cod'
                          ? 'border-[#8F3B4B] bg-[#FDF6F7] ring-1 ring-[#8F3B4B]'
                          : 'border-[#E2D5CC] bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="mt-1 text-[#8F3B4B] focus:ring-[#8F3B4B]"
                      />
                      <div className="text-xs">
                        <span className="font-semibold text-[#3D2529]">
                          Cash on Delivery / Bank Transfer
                        </span>
                        <p className="text-[#7A6A66] mt-0.5 text-[11px]">
                          Pay upon delivery or via direct artisan bank transfer after confirmation.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Footer with Totals and Action Buttons */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#EFE5DB] bg-[#FAF8F5] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6B5A56]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#2C2725] tabular-nums">
                    {siteConfig.currency}{subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[#6B5A56]">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-[#2C2725] tabular-nums">
                    {shippingFee === 0 ? (
                      <span className="text-[#2E6B47]">FREE</span>
                    ) : (
                      `${siteConfig.currency}${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-serif font-bold text-[#2C2725] pt-1 border-t border-[#EAE0D7]">
                  <span>Total</span>
                  <span className="text-base text-[#8F3B4B] tabular-nums">
                    {siteConfig.currency}{total.toFixed(2)}
                  </span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('shipping')}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#8F3B4B] hover:bg-[#792F3D] text-white text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Delivery & Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=${generateWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-2xl bg-[#E8F5ED] hover:bg-[#D4EBDD] text-[#1D6039] text-xs font-semibold transition-all flex items-center justify-center gap-2 border border-[#C5E3D0]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Quick Order on WhatsApp</span>
                  </a>
                </div>
              ) : (
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="py-3 px-4 rounded-2xl border border-[#D9CBC1] text-xs font-semibold text-[#5A4549] hover:bg-white"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    className={`flex-1 py-3 px-4 rounded-2xl text-white text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2 ${
                      formData.paymentMethod === 'whatsapp'
                        ? 'bg-[#2E6B47] hover:bg-[#235537]'
                        : 'bg-[#8F3B4B] hover:bg-[#792F3D]'
                    }`}
                  >
                    {formData.paymentMethod === 'whatsapp' ? (
                      <>
                        <MessageCircle className="w-4 h-4" />
                        <span>Send Order via WhatsApp ({siteConfig.currency}{total.toFixed(2)})</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Place Order ({siteConfig.currency}{total.toFixed(2)})</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
