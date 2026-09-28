import React from 'react';
import { CheckCircle2, MessageCircle, ArrowRight, Heart, Sparkles, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { siteConfig } from '../config/siteConfig';

export const OrderSuccessModal: React.FC = () => {
  const { completedOrder, setCompletedOrder, setActivePage } = useCart();

  if (!completedOrder) return null;

  const handleClose = () => {
    setCompletedOrder(null);
    setActivePage('shop');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-[#EAE0D7] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#7B6E6A] hover:bg-[#F5EFEB] transition-colors"
          aria-label="Close confirmation"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#EBF6EE] text-[#2E6B47] flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          
          <h2 className="font-serif text-2xl font-bold text-[#2D2224]">
            Thank You for Your Order!
          </h2>
          
          <p className="text-xs sm:text-sm text-[#665753] max-w-md mx-auto leading-relaxed">
            Your handmade creation is now in our artisan queue. We craft every petal with love and patient care.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="mt-6 p-4 rounded-2xl bg-[#FCFAF7] border border-[#EFE5DB] text-xs space-y-2.5">
          <div className="flex justify-between items-center pb-2 border-b border-[#EAE0D7]">
            <span className="text-[#8C7A75]">Order Reference:</span>
            <span className="font-mono font-bold text-[#2C2725]">{completedOrder.orderId}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#8C7A75]">Recipient:</span>
            <span className="font-semibold text-[#2C2725]">{completedOrder.customerName}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#8C7A75]">Delivery To:</span>
            <span className="font-medium text-[#2C2725] truncate max-w-[200px]">{completedOrder.address}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#8C7A75]">Payment Status:</span>
            <span className="text-[#2E6B47] font-semibold bg-[#E7F3EC] px-2 py-0.5 rounded-full">
              {completedOrder.paymentMethod === 'whatsapp' ? 'WhatsApp Order Sent' : 'Order Confirmed'}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-[#EAE0D7] font-serif text-sm font-bold text-[#2C2725]">
            <span>Total Paid/Due:</span>
            <span className="text-[#8F3B4B] tabular-nums">{siteConfig.currency}{completedOrder.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-2.5">
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              `Hi ${siteConfig.name}! I just placed order ${completedOrder.orderId}. Can I get updates on the handmade progress?`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-2xl bg-[#2E6B47] hover:bg-[#235537] text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat with Artisan on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={handleClose}
            className="w-full py-3 px-4 rounded-2xl border border-[#D9CBC1] text-xs sm:text-sm font-semibold text-[#5A4549] hover:bg-[#FDFBF9] transition-all flex items-center justify-center gap-1.5"
          >
            <span>Continue Browsing Creations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
