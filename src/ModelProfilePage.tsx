import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Phone, Check, X } from 'lucide-react';
import Layout from './components/Layout';
import girlsData from './data/girls.json';

interface Service {
  name: string;
  available: boolean;
}

interface ModelProfile {
  id: number;
  name: string;
  nationality: string;
  age?: number;
  height?: number;
  weight?: number;
  bust?: string;
  dressSize?: number;
  figure?: string;
  hair?: string;
  skin?: string;
  tattoos?: string;
  pubes?: string;
  requirements?: string;
  image: string;
  images?: string[];
  profileLink: string;
  isNew: boolean;
  filming: boolean;
  cim: boolean;
  dfk: boolean;
  workingTime?: string;
  schedule?: string;
  isAvailableNow?: boolean;
  nextAvailable?: string;
  services?: Service[];
  bio?: string;
}

const ModelProfilePage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [model, setModel] = useState<ModelProfile | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Fetch model from JSON based on URL parameter
    const allGirls = [
      ...girlsData.models,
      ...(girlsData.rosterToday || []),
      ...(girlsData.rosterTomorrow || []),
    ];
    const found = allGirls.find(
      (g) => g.name.toLowerCase() === name?.toLowerCase()
    );
    setModel(found || null);
  }, [name]);

  if (!model) {
    return (
      <Layout>
        <div className="text-center py-20 text-[#bfa663] font-serif text-xl">
          Girl not found 😢
        </div>
      </Layout>
    );
  }

  // Handle images array - use images if available, otherwise use single image
  const imageArray = model.images && model.images.length > 0 ? model.images : [model.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === imageArray.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? imageArray.length - 1 : prev - 1
    );
  };

  // Default services if not in JSON
  const defaultServices: Service[] = [
    { name: "BBBJ", available: true },
    { name: "CIM", available: model.cim },
    { name: "DFK", available: model.dfk },
    { name: "69", available: true },
    { name: "Rimming", available: false },
    { name: "Filming", available: model.filming },
    { name: "CBJ", available: true },
    { name: "Massage", available: true },
    { name: "GFE", available: true },
    { name: "PSE", available: false },
    { name: "Double", available: true },
    { name: "Shower Together", available: true },
  ];

  const services = model.services || defaultServices;

  return (
    <Layout>
      <section className="relative bg-gradient-to-b from-transparent via-[#0b0b0b]/90 to-transparent">
        {/* Baroque wallpaper pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-soft-light"
          style={{
            backgroundImage: 'url("/ornament-bg.png")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column - Image Carousel */}
            <div className="space-y-6">
              {/* Main Image Carousel */}
              <div className="relative aspect-[3/4] bg-[#0b0b0b] border border-[#bfa663]/40 overflow-hidden shadow-[0_0_40px_rgba(191,166,99,0.15)]">
                <img
                  src={imageArray[currentImageIndex]}
                  alt={`${model.name} - Photo ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Corner ornaments */}
                <img
                  src="/corner-ornament.svg"
                  alt=""
                  className="absolute top-0 left-0 w-10 opacity-20"
                />
                <img
                  src="/corner-ornament.svg"
                  alt=""
                  className="absolute bottom-0 right-0 w-10 rotate-180 opacity-20"
                />
                
                {/* NEW Badge - Baroque style */}
                {model.isNew && (
                  <span className="absolute top-4 right-4 bg-[#8b0000] text-[#e8d6a8] text-xs px-4 py-1.5 border border-[#bfa663]/40 font-serif tracking-widest shadow-lg">
                    NEW
                  </span>
                )}

                {/* Navigation Arrows - Baroque style */}
                {imageArray.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-0 top-1/2 -translate-y-1/2 px-3 py-2 text-[#e8d6a8] bg-[#1a1813]/60 border border-[#bfa663]/20 hover:bg-[#1a1813]/80 hover:border-[#bfa663]/50 transition-all duration-300"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-0 top-1/2 -translate-y-1/2 px-3 py-2 text-[#e8d6a8] bg-[#1a1813]/60 border border-[#bfa663]/20 hover:bg-[#1a1813]/80 hover:border-[#bfa663]/50 transition-all duration-300"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Dots Navigation - Baroque style */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {imageArray.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 transition-all border border-[#bfa663]/40 ${
                        index === currentImageIndex
                          ? 'bg-[#bfa663] w-8'
                          : 'bg-[#bfa663]/30 w-2 hover:bg-[#bfa663]/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Strip - Baroque style */}
              {imageArray.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {imageArray.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-24 overflow-hidden transition-all border ${
                        index === currentImageIndex
                          ? 'border-[#bfa663] opacity-100 shadow-[0_0_12px_rgba(191,166,99,0.4)]'
                          : 'border-[#bfa663]/30 opacity-60 hover:opacity-100 hover:border-[#bfa663]/60'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Rates - Clean, no wrapper */}
              <div className="flex justify-evenly text-center font-serif border-t border-b border-[#bfa663]/20 py-4">
                <div className="px-4">
                  <p className="text-lg uppercase tracking-widest text-[#bfa663]/80 mb-2">30 Min</p>
                  <p className="text-3xl font-bold text-[#e8d6a8]">$180</p>
                </div>
                <div className="px-4">
                  <p className="text-lg uppercase tracking-widest text-[#bfa663]/80 mb-2">45 Min</p>
                  <p className="text-3xl font-bold text-[#e8d6a8]">$250</p>
                </div>
                <div className="px-4">
                  <p className="text-lg uppercase tracking-widest text-[#bfa663]/80 mb-2">60 Min</p>
                  <p className="text-3xl font-bold text-[#e8d6a8]">$320</p>
                </div>
              </div>
            </div>

            {/* Right Column - Info */}
            <div className="space-y-6">
              
              {/* Name + Working Hours - Just text, no box */}
<div className="text-center lg:text-left">
  <div className="flex flex-row justify-center lg:flex-row items-baseline lg:gap-4">
    <h1 className="px-5 text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e8d6a8] to-[#bfa663]">
      {model.name}
    </h1>
    <p className="px-5 text-3xl font-serif text-[#bfa663]/80 uppercase tracking-widest">
      {model.schedule || model.workingTime || "Check availability"}
    </p>
  </div>



  {model.isAvailableNow ? (
<span className="pt-5 inline-flex items-center gap-2 text-2xl font-serif uppercase tracking-widest text-[#b8ffb8] font-semibold animate-pulse" style={{
  textShadow: '0 0 10px rgba(184, 255, 184, 0.8), 0 0 20px rgba(184, 255, 184, 0.4)'
}}>

  Available Now
</span>
) : model.nextAvailable ? (
<span className="pt-5 inline-flex items-center gap-2 text-2xl text-[#e8d6a8] font-serif uppercase tracking-widest animate-pulse" style={{
  textShadow: '0 0 10px rgba(232, 214, 168, 0.8), 0 0 20px rgba(232, 214, 168, 0.4)'
}}>
  <span className="inline-block w-2 h-2 bg-[#e8d6a8] rounded-full animate-pulse"></span>
  Next Available: {model.nextAvailable || "TBA"}
</span>
) : null}

<style>{`
  @keyframes pulseGold {
    0%, 100% {
      opacity: 0.85;
      box-shadow: 0 0 5px rgba(191,166,99,0.3);
    }
    50% {
      opacity: 1;
      box-shadow: 0 0 15px rgba(191,166,99,0.6);
    }
  }
`}</style>



</div>

              {/* Bio - Just text, no box */}
              {model.bio && (
                <p className="text-[#d8cfa5]/90 font-light leading-relaxed text-base text-center lg:text-left">
                  {model.bio}
                </p>
              )}

              {/* Book Now Button - Standalone */}
              
                <a href="tel:+61417888123"
                className="block text-center px-6 py-3 font-serif text-xl tracking-wide border border-[#bfa663]/50 bg-[#14120f]/60 text-[#e8d6a8] hover:shadow-[0_0_12px_rgba(191,166,99,0.6)] transition-all duration-500"
              >
                <Phone className="inline-block w-4 h-4 mr-2" />
                Book Now
              </a>

              {/* Details List - Two columns, very readable */}
              <div className="bg-[#0b0b0b]/20 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {model.nationality && (
                    <div className="flex justify-between items-center py-2 border-b border-[#bfa663]/20">
                      <span className="text-lg uppercase tracking-widest text-[#bfa663] font-serif">Nationality</span>
                      <span className="text-lg font-serif font-bold text-[#e8d6a8]">{model.nationality}</span>
                    </div>
                  )}
                  {model.age && (
                    <div className="flex justify-between items-center py-2 border-b border-[#bfa663]/20">
                      <span className="text-lg uppercase tracking-widest text-[#bfa663] font-serif">Age</span>
                      <span className="text-lg font-serif font-bold text-[#e8d6a8]">{model.age}</span>
                    </div>
                  )}
                  {model.height && (
                    <div className="flex justify-between items-center py-2 border-b border-[#bfa663]/20">
                      <span className="text-lg uppercase tracking-widest text-[#bfa663] font-serif">Height</span>
                      <span className="text-lg font-serif font-bold text-[#e8d6a8]">{model.height} cm</span>
                    </div>
                  )}
                  {model.weight && (
                    <div className="flex justify-between items-center py-2 border-b border-[#bfa663]/20">
                      <span className="text-lg uppercase tracking-widest text-[#bfa663] font-serif">Weight</span>
                      <span className="text-lg font-serif font-bold text-[#e8d6a8]">{model.weight} kg</span>
                    </div>
                  )}
                  {model.bust && (
                    <div className="flex justify-between items-center py-2 border-b border-[#bfa663]/20">
                      <span className="text-lg uppercase tracking-widest text-[#bfa663] font-serif">Bust</span>
                      <span className="text-lg font-serif font-bold text-[#e8d6a8]">{model.bust}</span>
                    </div>
                  )}
                  {model.dressSize && (
                    <div className="flex justify-between items-center py-2 border-b border-[#bfa663]/20">
                      <span className="text-lg uppercase tracking-widest text-[#bfa663] font-serif">Dress Size</span>
                      <span className="text-lg font-serif font-bold text-[#e8d6a8]">{model.dressSize}</span>
                    </div>
                  )}
                  {model.figure && (
                    <div className="flex justify-between items-center py-2 border-b border-[#bfa663]/20">
                      <span className="text-lg uppercase tracking-widest text-[#bfa663] font-serif">Figure</span>
                      <span className="text-lg font-serif font-bold text-[#e8d6a8]">{model.figure}</span>
                    </div>
                  )}
                  {model.hair && (
                    <div className="flex justify-between items-center py-2 border-b border-[#bfa663]/20">
                      <span className="text-lg uppercase tracking-widest text-[#bfa663] font-serif">Hair</span>
                      <span className="text-lg font-serif font-bold text-[#e8d6a8]">{model.hair}</span>
                    </div>
                  )}
                  {model.skin && (
                    <div className="flex justify-between items-center py-2 border-b border-[#bfa663]/20">
                      <span className="text-lg uppercase tracking-widest text-[#bfa663] font-serif">Skin</span>
                      <span className="text-lg font-serif font-bold text-[#e8d6a8]">{model.skin}</span>
                    </div>
                  )}
                  {model.tattoos && (
                    <div className="flex justify-between items-center py-2 border-b border-[#bfa663]/20">
                      <span className="text-lg uppercase tracking-widest text-[#bfa663] font-serif">Tattoos</span>
                      <span className="text-lg font-serif font-bold text-[#e8d6a8]">{model.tattoos}</span>
                    </div>
                  )}
                  {model.pubes && (
                    <div className="flex justify-between items-center py-2 border-b border-[#bfa663]/20">
                      <span className="text-lg uppercase tracking-widest text-[#bfa663] font-serif">Pubes</span>
                      <span className="text-lg font-serif font-bold text-[#e8d6a8]">{model.pubes}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Requirements - Important info */}
              {model.requirements && (
                <div className="border-l-2 border-[#8b0000] bg-[#1a0f0f]/60 pl-4 py-3">
                  <p className="text-xs uppercase tracking-widest text-[#bfa663]/80 mb-1">Requirements</p>
                  <p className="text-sm text-[#e8d6a8]">{model.requirements}</p>
                </div>
              )}

              {/* Available Services - Baroque style */}
              <div className="relative bg-[#14120f]/70 border border-[#bfa663]/30 p-6 shadow-[0_0_30px_rgba(191,166,99,0.12)]">
                <img
                  src="/corner-ornament.svg"
                  alt=""
                  className="absolute bottom-0 left-0 w-8 opacity-20 rotate-180"
                />
                <h2 className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e8d6a8] to-[#bfa663] mb-4 tracking-wide">
                  Available Services
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {services.map((service) => (
                    <div
                      key={service.name}
                      className={`flex items-center gap-2 p-3 border transition-all ${
                        service.available
                          ? 'bg-[#0f1b0f]/60 border-[#90ff90]/40 text-[#b8ffb8]'
                          : 'bg-[#0b0b0b]/40 border-[#bfa663]/20 text-[#a4976c]/60'
                      }`}
                    >
                      {service.available ? (
                        <Check className="w-4 h-4 text-[#90ff90] flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-[#a4976c]/60 flex-shrink-0" />
                      )}
                      <span className={`text-lg font-serif uppercase tracking-wider ${
                        service.available ? '' : 'line-through'
                      }`}>
                        {service.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Sticky Mobile CTA - Baroque style */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-[#0b0b0b] border-t border-[#bfa663]/40 shadow-[0_-4px_20px_rgba(191,166,99,0.2)] z-50">
            
              <a href="tel:+61417888123"
              className="w-full flex items-center justify-center gap-3 bg-[#14120f]/80 hover:bg-[#1a1813] border border-[#bfa663]/50 text-[#e8d6a8] font-serif font-bold py-4 px-6 tracking-wide transition-all duration-300 hover:shadow-[0_0_12px_rgba(191,166,99,0.6)]"
            >
              <Phone className="w-5 h-5" />
              Book Now
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ModelProfilePage;