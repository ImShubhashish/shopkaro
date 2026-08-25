import React from 'react';
import { Carousel } from 'antd';
import yogabarBanner from '../../assets/promos/yogabar.png';
import pampersBanner from '../../assets/promos/pampers.png';
import rakhiBanner from '../../assets/promos/rakhi.png';
import vivoBanner from '../../assets/promos/vivo.png';
import boatBanner from '../../assets/promos/boat.png';

interface CardCarouselProps {
  slides: {
    id: string;
    image: string;
    title: string;
  }[];
  autoplaySpeed?: number;
}

const CarouselCard: React.FC<CardCarouselProps> = ({ slides, autoplaySpeed = 3500 }) => (
  <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200/80 hover:shadow-xl transition-shadow bg-white h-[200px] sm:h-[220px] md:h-[240px] relative group">
    <Carousel autoplay autoplaySpeed={autoplaySpeed} effect="fade" dotPosition="bottom">
      {slides.map((slide) => (
        <div key={slide.id}>
          <div className="relative h-[200px] sm:h-[220px] md:h-[240px] w-full overflow-hidden">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-2.5 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
              AD
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  </div>
);

export const PromoBannerSection: React.FC = () => {
  // Card 1: Nutrition & Fitness Offers
  const card1Slides = [
    { id: 'c1-1', image: yogabarBanner, title: 'YogaBar Protein Deals' },
    { id: 'c1-2', image: boatBanner, title: 'Audio Offers' },
  ];

  // Card 2: Family & Baby Care Offers
  const card2Slides = [
    { id: 'c2-1', image: pampersBanner, title: 'Pampers Diapers Sale' },
    { id: 'c2-2', image: rakhiBanner, title: 'Rakhi Specials Beauty' },
  ];

  // Card 3: Tech & Smartphone Launches
  const card3Slides = [
    { id: 'c3-1', image: vivoBanner, title: 'Vivo T5 5G Launch' },
    { id: 'c3-2', image: boatBanner, title: 'boAt Audio Up to 70% Off' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch py-2">
      {/* Card 1 Carousel */}
      <CarouselCard slides={card1Slides} autoplaySpeed={3200} />

      {/* Card 2 Carousel */}
      <CarouselCard slides={card2Slides} autoplaySpeed={4000} />

      {/* Card 3 Carousel */}
      <CarouselCard slides={card3Slides} autoplaySpeed={3600} />
    </div>
  );
};

export default PromoBannerSection;
