import React from 'react';

interface AgeVerificationModalProps {
  onAgree: () => void;
  onDisagree: () => void;
}

const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({ onAgree, onDisagree }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>
      
      {/* Modal Content */}
      <div className="relative z-10 bg-gradient-to-b from-[#0e0e0e] to-[#0b0b0b] border border-[#bfa663]/40 shadow-[0_0_50px_rgba(191,166,99,0.3)] max-w-md w-full mx-4 p-8">
        
        {/* Corner ornaments */}
        <img
          src={`${import.meta.env.BASE_URL}corner-ornament.svg`}
          alt=""
          className="absolute top-0 left-0 w-8 opacity-20"
        />
        <img
          src={`${import.meta.env.BASE_URL}corner-ornament.svg`}
          alt=""
          className="absolute bottom-0 right-0 w-8 rotate-180 opacity-20"
        />

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#e8d6a8] to-[#bfa663] mb-6">
          Age Verification
        </h2>

        {/* Message */}
        <div className="text-[#d8cfa5] text-center space-y-4 mb-8 font-light">
          <p className="text-base md:text-lg leading-relaxed">
            You must be 18 years or older to enter this establishment.
          </p>
          <p className="text-sm text-[#bfa663]/60">
            By entering, you confirm you meet the legal age requirement and accept our terms of service.
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#bfa663]/40"></div>
          <div className="mx-4 w-1 h-1 bg-[#bfa663]/40 rotate-45"></div>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#bfa663]/40"></div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onAgree}
            className="flex-1 bg-[#14120f]/80 border border-[#bfa663]/50 text-[#e8d6a8] font-serif font-semibold py-3 px-6 hover:bg-[#1a1813] hover:shadow-[0_0_15px_rgba(191,166,99,0.4)] transition-all duration-300 tracking-wide"
          >
            Enter
          </button>
          <button
            onClick={onDisagree}
            className="flex-1 bg-[#0b0b0b] border border-[#bfa663]/20 text-[#bfa663]/60 font-serif font-semibold py-3 px-6 hover:border-[#bfa663]/40 hover:text-[#bfa663] transition-all duration-300 tracking-wide"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeVerificationModal;