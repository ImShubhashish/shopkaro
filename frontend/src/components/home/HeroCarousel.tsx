import React, { useRef, useState } from 'react';
import { Carousel, Tag, Button } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Gift, 
  Flame, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Tag as TagIcon,
  Percent,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import electronicsBanner from '../../assets/banners/electronics.png';
import fashionBanner from '../../assets/banners/fashion.png';
import appliancesBanner from '../../assets/banners/appliances.png';
import heroBanner from '../../assets/banners/hero.png';

interface CarouselSlide {
  id: string;
  badgeText: string;
  badgeIcon: React.ReactNode;
  badgeBg: string;
  badgeBorder: string;
  badgeTextColor: string;
  subTitle: string;
  title: string;
  highlightText?: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  bgGradient: string;
  accentGlow: string;
  imageOverlay?: string;
  floatingDealText: string;
  floatingDealBadge: string;
  features: Array<{ icon: React.ReactNode; text: string }>;
}

export const HeroCarousel: React.FC = () => {
  const carouselRef = useRef<CarouselRef>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: CarouselSlide[] = [
    {
      id: 'slide-1',
      badgeText: 'FESTIVE SPECIAL OFFER',
      badgeIcon: <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />,
      badgeBg: 'bg-gradient-to-r from-amber-500/20 to-indigo-500/20',
      badgeBorder: 'border-amber-400/30',
      badgeTextColor: 'text-amber-200',
      subTitle: 'BIG FESTIVE SALE IS LIVE',
      title: 'Upgrade Your Lifestyle with',
      highlightText: 'ShopKaro Prime',
      description: 'Discover top-tier electronics, fashion, and accessories with free express shipping & extra instant bank discounts across India.',
      buttonText: 'Shop Catalog Now',
      buttonLink: '/products',
      secondaryBtnText: 'View Flash Deals',
      secondaryBtnLink: '/products?category=electronics',
      bgGradient: 'from-slate-950 via-indigo-950 to-slate-900',
      accentGlow: 'from-indigo-600/30 via-purple-600/20 to-transparent',
      imageOverlay: heroBanner,
      floatingDealText: 'Extra ₹500 OFF with HDFC & SBI Cards',
      floatingDealBadge: 'UP TO 60% OFF',
      features: [
        { icon: <Truck className="w-3.5 h-3.5 text-indigo-400" />, text: 'Free Express Shipping' },
        { icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />, text: '100% Genuine Products' },
        { icon: <Clock className="w-3.5 h-3.5 text-amber-400" />, text: 'Easy 7-Day Returns' },
      ],
    },
    {
      id: 'slide-2',
      badgeText: 'LIMITED TIME TECH DEAL',
      badgeIcon: <Zap className="w-3.5 h-3.5 text-cyan-300 animate-bounce" />,
      badgeBg: 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20',
      badgeBorder: 'border-cyan-400/30',
      badgeTextColor: 'text-cyan-200',
      subTitle: 'NEXT-GEN AUDIO & SMARTPHONES',
      title: 'Immerse in Crystal Clear',
      highlightText: 'Sound & Speed',
      description: 'Upgrade to active noise-canceling headphones & ultra-fast 5G smartphones with no-cost EMI starting @ ₹999/mo.',
      buttonText: 'Explore Tech Deals',
      buttonLink: '/products?category=electronics',
      secondaryBtnText: 'Compare Devices',
      secondaryBtnLink: '/products?category=electronics',
      bgGradient: 'from-slate-950 via-cyan-950 to-slate-900',
      accentGlow: 'from-cyan-600/30 via-blue-600/20 to-transparent',
      imageOverlay: electronicsBanner,
      floatingDealText: 'Flat 45% OFF on Flagship Audio',
      floatingDealBadge: 'NO COST EMI',
      features: [
        { icon: <Zap className="w-3.5 h-3.5 text-cyan-400" />, text: 'Instant Bank Cashback' },
        { icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />, text: '1 Year Brand Warranty' },
        { icon: <Star className="w-3.5 h-3.5 text-amber-400" />, text: 'Top Rated Electronics' },
      ],
    },
    {
      id: 'slide-3',
      badgeText: 'FESTIVE WARDROBE SALE',
      badgeIcon: <Gift className="w-3.5 h-3.5 text-rose-300" />,
      badgeBg: 'bg-gradient-to-r from-rose-500/20 to-pink-500/20',
      badgeBorder: 'border-rose-400/30',
      badgeTextColor: 'text-rose-200',
      subTitle: 'NEW SEASON ARRIVALS',
      title: 'Elegance Redefined for Every',
      highlightText: 'Celebration',
      description: 'Exclusive ethnic & modern fashion curated by top designers. Get complimentary gift wrapping & festive combo pricing.',
      buttonText: 'Shop Festive Wear',
      buttonLink: '/products?category=fashion',
      secondaryBtnText: 'View Style Guide',
      secondaryBtnLink: '/products?category=fashion',
      bgGradient: 'from-slate-950 via-rose-950 to-slate-900',
      accentGlow: 'from-rose-600/30 via-pink-600/20 to-transparent',
      imageOverlay: fashionBanner,
      floatingDealText: 'Buy 2 Get 1 FREE on Select Apparel',
      floatingDealBadge: 'BUY 2 GET 1',
      features: [
        { icon: <TagIcon className="w-3.5 h-3.5 text-rose-400" />, text: 'Exclusive Designer Wear' },
        { icon: <Gift className="w-3.5 h-3.5 text-pink-400" />, text: 'Free Gift Packaging' },
        { icon: <Percent className="w-3.5 h-3.5 text-amber-400" />, text: 'Min. 30% OFF Everything' },
      ],
    },
    {
      id: 'slide-4',
      badgeText: 'SMART HOME MAKEOVER',
      badgeIcon: <Flame className="w-3.5 h-3.5 text-emerald-300" />,
      badgeBg: 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20',
      badgeBorder: 'border-emerald-400/30',
      badgeTextColor: 'text-emerald-200',
      subTitle: 'MODERN LIVING SOLUTIONS',
      title: 'Transform Your Home into a',
      highlightText: 'Smart Haven',
      description: '4K OLED Smart TVs, espresso machines, and AI home appliances. Complete home setups with complimentary installation.',
      buttonText: 'Explore Appliances',
      buttonLink: '/products?category=home',
      secondaryBtnText: 'Smart Home Combos',
      secondaryBtnLink: '/products?category=home',
      bgGradient: 'from-slate-950 via-emerald-950 to-slate-900',
      accentGlow: 'from-emerald-600/30 via-teal-600/20 to-transparent',
      imageOverlay: appliancesBanner,
      floatingDealText: 'Free On-Site Installation Included',
      floatingDealBadge: 'SAVE BIG',
      features: [
        { icon: <Truck className="w-3.5 h-3.5 text-emerald-400" />, text: 'Free Doorstep Demo' },
        { icon: <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />, text: 'Up to 3 Years Warranty' },
        { icon: <Clock className="w-3.5 h-3.5 text-amber-400" />, text: 'Express Delivery in 24h' },
      ],
    },
  ];

  return (
    <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950">
      <Carousel 
        ref={carouselRef}
        autoplay 
        autoplaySpeed={5000} 
        effect="fade"
        dots={false}
        beforeChange={(_, next) => setCurrentSlide(next)}
      >
        {slides.map((slide) => (
          <div key={slide.id}>
            <div className={`relative min-h-[440px] md:min-h-[480px] bg-gradient-to-r ${slide.bgGradient} text-white px-6 py-8 md:px-12 md:py-10 flex items-center justify-between overflow-hidden`}>
              
              {/* Radial Accent Glow */}
              <div className={`absolute -top-32 -right-32 w-[500px] h-[500px] bg-gradient-to-br ${slide.accentGlow} rounded-full blur-3xl pointer-events-none`} />
              <div className="absolute left-1/4 -bottom-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Grid Background Pattern */}
              <div 
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Left Content Column */}
              <div className="relative z-20 max-w-2xl space-y-4 md:space-y-5">
                
                {/* Subtitle & Badge */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <Tag className={`${slide.badgeBg} ${slide.badgeBorder} ${slide.badgeTextColor} border px-3.5 py-1 text-xs md:text-sm rounded-full inline-flex items-center gap-1.5 font-semibold tracking-wide uppercase shadow-sm`}>
                    {slide.badgeIcon}
                    <span>{slide.badgeText}</span>
                  </Tag>
                  <span className="hidden sm:inline-block text-xs font-semibold text-slate-400 tracking-wider uppercase">
                    • {slide.subTitle}
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                  {slide.title}{' '}
                  {slide.highlightText && (
                    <span className="bg-gradient-to-r from-indigo-300 via-sky-200 to-amber-200 bg-clip-text text-transparent">
                      {slide.highlightText}
                    </span>
                  )}
                </h1>

                {/* Description */}
                <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl font-normal">
                  {slide.description}
                </p>

                {/* E-Commerce Trust Badges */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300 pt-1">
                  {slide.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                      {feat.icon}
                      <span>{feat.text}</span>
                    </div>
                  ))}
                </div>

                {/* Call to Action Buttons */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <Link to={slide.buttonLink}>
                    <Button 
                      type="primary" 
                      size="large" 
                      shape="round" 
                      className="bg-indigo-600 hover:bg-indigo-500 text-white h-12 px-7 font-bold text-sm md:text-base flex items-center gap-2.5 shadow-xl shadow-indigo-600/30 hover:scale-[1.02] transition-transform"
                    >
                      <span>{slide.buttonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>

                  {slide.secondaryBtnText && slide.secondaryBtnLink && (
                    <Link to={slide.secondaryBtnLink}>
                      <Button 
                        size="large" 
                        shape="round" 
                        className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40 h-12 px-6 font-semibold text-sm md:text-base backdrop-blur-md transition-all"
                      >
                        {slide.secondaryBtnText}
                      </Button>
                    </Link>
                  )}
                </div>

              </div>

              {/* Right Hero Image Overlay Showcase */}
              {slide.imageOverlay && (
                <div className="hidden lg:block relative z-10 shrink-0 ml-6">
                  
                  {/* Outer Floating Glow Frame */}
                  <div className="relative w-80 h-80 xl:w-96 xl:h-96 rounded-3xl p-2 bg-gradient-to-br from-white/20 via-white/5 to-transparent border border-white/20 shadow-2xl backdrop-blur-md transform hover:scale-[1.02] transition-transform duration-500">
                    
                    {/* Floating Offer Ribbon Badge */}
                    <div className="absolute -top-3 -right-3 z-30 bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg border border-amber-300/40 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                      {slide.floatingDealBadge}
                    </div>

                    <div className="w-full h-full rounded-2xl overflow-hidden relative">
                      <img 
                        src={slide.imageOverlay} 
                        alt={slide.title} 
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    </div>

                    {/* Bottom Floating Glass Card */}
                    <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-900/85 backdrop-blur-md p-3 rounded-xl border border-white/15 flex items-center gap-2.5 shadow-xl">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0">
                        <TagIcon className="w-4 h-4 text-indigo-300" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-semibold text-white truncate">{slide.floatingDealText}</p>
                        <p className="text-[10px] text-indigo-300 font-medium truncate">Limited time festival discount</p>
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        ))}
      </Carousel>

      {/* Navigation Arrows (Visible on Desktop / Hover) */}
      <button 
        onClick={() => carouselRef.current?.prev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 shadow-lg hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={() => carouselRef.current?.next()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 shadow-lg hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Custom Bottom Indicators Bar */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 bg-slate-950/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => carouselRef.current?.goTo(idx)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === idx 
                ? 'w-8 h-2.5 bg-indigo-500 shadow-md shadow-indigo-500/50' 
                : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
        <span className="ml-1 text-[11px] font-mono font-medium text-slate-400">
          0{currentSlide + 1} / 0{slides.length}
        </span>
      </div>

    </div>
  );
};

export default HeroCarousel;

