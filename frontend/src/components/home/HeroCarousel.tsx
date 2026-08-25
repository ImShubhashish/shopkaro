import React from 'react';
import { Carousel, Tag, Button } from 'antd';
import { Sparkles, ArrowRight, Zap, Gift, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import electronicsBanner from '../../assets/banners/electronics.png';
import fashionBanner from '../../assets/banners/fashion.png';
import appliancesBanner from '../../assets/banners/appliances.png';
import heroBanner from '../../assets/banners/hero.png';

interface CarouselSlide {
  id: string;
  badgeText: string;
  badgeIcon: React.ReactNode;
  badgeColor: string;
  title: string;
  highlightTitle?: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  bgGradient: string;
  imageOverlay?: string;
}

export const HeroCarousel: React.FC = () => {
  const slides: CarouselSlide[] = [
    {
      id: 'slide-1',
      badgeText: 'Festive Special Offer',
      badgeIcon: <Sparkles className="w-3.5 h-3.5 text-indigo-300" />,
      badgeColor: 'bg-indigo-500/20 border-indigo-400/30 text-indigo-200',
      title: 'Upgrade Your Lifestyle with ShopKaro',
      description: 'Discover top-tier electronics, fashion, and accessories with free express shipping across India.',
      buttonText: 'Shop Catalog Now',
      buttonLink: '/products',
      bgGradient: 'from-indigo-950 via-indigo-900 to-slate-950',
      imageOverlay: heroBanner,
    },
    {
      id: 'slide-2',
      badgeText: 'Tech Bonanza • Up to 45% OFF',
      badgeIcon: <Zap className="w-3.5 h-3.5 text-amber-400" />,
      badgeColor: 'bg-cyan-500/20 border-cyan-400/30 text-cyan-200',
      title: 'Next-Gen Audio & Smart Devices',
      description: 'Immerse yourself in premium noise-canceling sound & ultra-fast 5G flagship smartphones.',
      buttonText: 'Explore Tech Deals',
      buttonLink: '/products?category=electronics',
      bgGradient: 'from-slate-950 via-purple-950 to-slate-900',
      imageOverlay: electronicsBanner,
    },
    {
      id: 'slide-3',
      badgeText: 'A Season to Shine • Festive Wardrobe',
      badgeIcon: <Gift className="w-3.5 h-3.5 text-rose-400" />,
      badgeColor: 'bg-rose-500/20 border-rose-400/30 text-rose-200',
      title: 'Elegance Redefined for Celebrations',
      description: 'Exclusive ethnic & modern party wear crafted by top designers with festive discounts.',
      buttonText: 'Shop Festive Wear',
      buttonLink: '/products?category=fashion',
      bgGradient: 'from-rose-950 via-red-950 to-slate-950',
      imageOverlay: fashionBanner,
    },
    {
      id: 'slide-4',
      badgeText: 'Smart Home Sale • Buy 1 Get 1',
      badgeIcon: <Flame className="w-3.5 h-3.5 text-emerald-400" />,
      badgeColor: 'bg-emerald-500/20 border-emerald-400/30 text-emerald-200',
      title: 'Transform Your Living Space',
      description: 'Upgrade to 4K OLED Smart TVs, espresso machines, and smart home appliances today.',
      buttonText: 'Explore Appliances',
      buttonLink: '/products?category=home',
      bgGradient: 'from-emerald-950 via-slate-900 to-slate-950',
      imageOverlay: appliancesBanner,
    },
  ];

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
      <Carousel autoplay autoplaySpeed={4500} effect="fade" dotPosition="bottom">
        {slides.map((slide) => (
          <div key={slide.id}>
            <div className={`relative h-[420px] md:h-[460px] bg-gradient-to-r ${slide.bgGradient} text-white p-8 md:p-12 flex items-center justify-between overflow-hidden`}>
              
              {/* Left Content Column */}
              <div className="relative z-20 max-w-xl space-y-5">
                <Tag className={`${slide.badgeColor} border px-3.5 py-1 text-xs md:text-sm rounded-full inline-flex items-center gap-1.5 font-medium`}>
                  {slide.badgeIcon}
                  <span>{slide.badgeText}</span>
                </Tag>

                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  {slide.title}
                </h1>

                <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg">
                  {slide.description}
                </p>

                <div className="pt-2">
                  <Link to={slide.buttonLink}>
                    <Button 
                      type="primary" 
                      size="large" 
                      shape="round" 
                      className="bg-indigo-600 hover:bg-indigo-500 h-12 px-7 font-semibold text-sm md:text-base flex items-center gap-2 shadow-lg shadow-indigo-600/30"
                    >
                      <span>{slide.buttonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Hero Image Overlay */}
              {slide.imageOverlay && (
                <div className="hidden lg:block relative z-10 w-72 h-72 xl:w-80 xl:h-80 shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src={slide.imageOverlay} 
                    alt={slide.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                </div>
              )}

              {/* Subtle Ambient Glowing Background Blobs */}
              <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute left-1/3 -top-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
