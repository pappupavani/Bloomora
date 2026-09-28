import React, { useState } from 'react';
import { MessageCircle, Instagram, Mail, Clock, MapPin, Send, CheckCircle2, ChevronDown } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const FAQS = [
  {
    q: 'How long do custom bouquet orders take to create?',
    a: 'Each handmade bouquet is crocheted with care. Typical custom orders require 3–7 business days of crafting time before shipment. If you have an urgent anniversary or celebration deadline, contact us directly via WhatsApp and we will do our best to accommodate rush requests!',
  },
  {
    q: 'How do I care for and clean my crochet flowers?',
    a: 'Crochet flowers are wonderfully low maintenance! To keep them fresh, simply brush them very gently with a clean, soft cosmetic blush brush once a month to remove dust, or use a hair dryer on the cool/low setting from a 30cm distance. Avoid water and prolonged direct high-noon sunlight to maintain vibrant yarn colors.',
  },
  {
    q: 'Do you include a handwritten message card?',
    a: 'Yes, absolutely! Every single order includes a complimentary thick linen card and envelope. You can write your gift message during checkout or inside the custom bouquet order form, and our artisan will hand-letter it with calligraphy pen.',
  },
  {
    q: 'Can the stems be bent to fit my existing vase?',
    a: 'Yes! Every stem is wrapped around a flexible floral wire core. You can easily bend, trim, or spread the branches to match any ceramic jar, glass bud vase, or table centerpiece.',
  },
];

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#934454]">
          Get in Touch
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1F22]">
          We'd Love to Hear From You
        </h1>
        <p className="text-xs sm:text-sm text-[#70605C] leading-relaxed">
          Have a question about an order, want to collaborate on wedding florals, or just want to chat about yarn crafts? We’re always here for you.
        </p>
      </div>

      {/* 3 Channels Quick Bar (WhatsApp, Instagram, Email) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* WhatsApp Card */}
        <a
          href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-3xl bg-white border border-[#E7E2DC] shadow-xs hover:border-[#2E6B47] hover:shadow-md transition-all flex flex-col justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F5ED] text-[#2E6B47] flex items-center justify-center group-hover:scale-105 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#2D2224]">WhatsApp Direct</h3>
              <p className="text-xs text-[#7A6A66]">Instant chat with artisan</p>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-[#F2ECE6] flex items-center justify-between text-xs font-semibold text-[#2E6B47]">
            <span>{siteConfig.whatsappDisplay}</span>
            <span>Chat Now →</span>
          </div>
        </a>

        {/* Instagram Card */}
        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-3xl bg-white border border-[#E7E2DC] shadow-xs hover:border-[#8F3B4B] hover:shadow-md transition-all flex flex-col justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FCEEF1] text-[#8F3B4B] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#2D2224]">Instagram DM</h3>
              <p className="text-xs text-[#7A6A66]">Inspiration & stories</p>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-[#F2ECE6] flex items-center justify-between text-xs font-semibold text-[#8F3B4B]">
            <span>{siteConfig.instagramHandle}</span>
            <span>Follow →</span>
          </div>
        </a>

        {/* Email Card */}
        <a
          href={`mailto:${siteConfig.email}`}
          className="p-6 rounded-3xl bg-white border border-[#E7E2DC] shadow-xs hover:border-[#7A6A66] hover:shadow-md transition-all flex flex-col justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F6EFEB] text-[#5A4D4A] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#2D2224]">Email Support</h3>
              <p className="text-xs text-[#7A6A66]">Wholesale & inquiries</p>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-[#F2ECE6] flex items-center justify-between text-xs font-semibold text-[#5A4D4A]">
            <span>{siteConfig.email}</span>
            <span>Send Email →</span>
          </div>
        </a>
      </div>

      {/* Split Section: Contact Form + Studio Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
        {/* Form Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#EDE1D6] shadow-xs">
          <h2 className="font-serif text-2xl font-bold text-[#2D2224] mb-2">
            Send Us a Message
          </h2>
          <p className="text-xs text-[#7A6A66] mb-6">
            Fill in your thoughts and questions below. We reply to all inquiries within 24 hours.
          </p>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-[#EBF6EE] border border-[#C5E3D0] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#D7EBDD] text-[#2E6B47] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1D6039]">Message Received!</h3>
              <p className="text-xs text-[#2E6B47]">
                Thank you for reaching out to {siteConfig.name}. Our artisan will get back to you shortly at your email.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-semibold text-[#1D6039] underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E3B] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Chen"
                    className="w-full text-xs p-3 rounded-xl border border-[#D9CBC1] bg-[#FAF8F5] focus:outline-none focus:border-[#934454]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3E3B] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="maya@example.com"
                    className="w-full text-xs p-3 rounded-xl border border-[#D9CBC1] bg-[#FAF8F5] focus:outline-none focus:border-[#934454]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E3B] mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g., Custom Wedding Bouquet Inquiry / Gift Advice"
                  className="w-full text-xs p-3 rounded-xl border border-[#D9CBC1] bg-[#FAF8F5] focus:outline-none focus:border-[#934454]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E3B] mb-1">
                  Your Message *
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what blooms you have in mind or any questions about our crochet creations..."
                  className="w-full text-xs p-3 rounded-xl border border-[#D9CBC1] bg-[#FAF8F5] focus:outline-none focus:border-[#934454]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#8F3B4B] hover:bg-[#792F3D] text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Info Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF5F0] border border-[#EDE1D6] space-y-5">
            <h3 className="font-serif text-xl font-bold text-[#2D2224]">
              Studio Details
            </h3>

            <div className="space-y-4 text-xs text-[#6B5A56]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#E2D5CB] flex items-center justify-center text-[#8F3B4B] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2C2725]">Studio & Support Hours</h4>
                  <p className="mt-0.5">{siteConfig.hours}</p>
                  <p className="text-[11px] text-[#8C7A75] mt-0.5">Online orders accepted 24/7</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#E2D5CB] flex items-center justify-center text-[#8F3B4B] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2C2725]">Physical Workshop</h4>
                  <p className="mt-0.5">{siteConfig.address}</p>
                  <p className="text-[11px] text-[#8C7A75] mt-0.5">Visits by appointment only for custom wedding consultations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ Accordion */}
          <div className="p-6 rounded-3xl bg-white border border-[#EDE1D6] shadow-xs space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#2D2224] mb-3">
              Common Questions
            </h3>

            <div className="space-y-2">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-[#EFE7DE] rounded-2xl overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full text-left p-3.5 text-xs font-semibold text-[#3D2F2C] flex items-center justify-between hover:bg-[#FAF8F5] transition-colors"
                    >
                      <span className="pr-2">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#8C7A75] transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-3.5 pb-3.5 text-xs text-[#70605C] leading-relaxed border-t border-[#F5EFEB] pt-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
