import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CustomOrdersPage } from './pages/CustomOrdersPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { Toast } from './components/Toast';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from './config/siteConfig';

const MainLayout: React.FC = () => {
  const { activePage } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2C2725] font-sans selection:bg-[#F3D5D8] selection:text-[#5E2B38]">
      {/* Navbar with Announcement Bar */}
      <Navbar />

      {/* Main Page Area */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'shop' && <ShopPage />}
        {activePage === 'custom' && <CustomOrdersPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Overlays & Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <OrderSuccessModal />
      <Toast />

      {/* Floating WhatsApp Action Button */}
      <a
        href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
          `Hi ${siteConfig.name}! I have a question about your handmade flowers.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 left-6 z-40 p-3.5 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6 fill-white text-transparent" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-out pl-0 group-hover:pl-2 text-xs font-semibold">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainLayout />
    </CartProvider>
  );
}
