import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { NewsItem } from '../types/index.ts';

interface BannerCarouselProps {
  newsItems: NewsItem[];
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ newsItems }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, newsItems.length]);

  const handleNavigation = (direction: 'next' | 'prev') => {
    setIsAutoPlaying(false);
    if (direction === 'next') {
      setCurrentSlide((prev) => (prev + 1) % newsItems.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > swipeThreshold) {
      handleNavigation(diff > 0 ? 'next' : 'prev');
    }
  };

  return (
    <section className="relative w-full bg-gray-100">
      <div className="relative w-full aspect-[3/2] overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {newsItems.map((item) => (
            <div key={item.id} className="w-full flex-shrink-0 relative">
              <a href={item.link} className="block h-full">
              <img
  src={`${import.meta.env.BASE_URL}${item.image}`}
  alt={item.title}
  className="w-full h-full object-cover object-center"
/>
                {item.title && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                    <div className="p-8 text-white">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                        {item.title}
                      </h2>
                    </div>
                  </div>
                )}
              </a>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => handleNavigation('prev')}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleNavigation('next')}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {newsItems.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerCarousel;