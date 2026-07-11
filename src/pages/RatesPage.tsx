import React from 'react';
import { Clock, Info } from 'lucide-react';
import Layout from '../components/Layout';

const RatesPage: React.FC = () => {
  return (
    <Layout>
      <section className="relative bg-gradient-to-b from-transparent via-[#0b0b0b]/90 to-transparent">
        <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e8d6a8] to-[#bfa663] tracking-wide">
              Rates & Services
            </h1>
          </div>

          {/* Important Information */}
          <div className="my-20 bg-[#0b0b0b]/20 border border-[#bfa663]/30 p-6">
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-[#bfa663] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e8d6a8] to-[#bfa663] mb-4 tracking-wide uppercase">
                  Pricing Information
                </h3>
                <p className="text-2xl text-[#d8cfa5]/90 font-serif leading-relaxed mb-3">
                  Prices vary depending on the lady and services provided. Some ladies may charge different 
                  rates from the table below.
                </p>
                <p className="text-[#e8d6a8] font-serif leading-relaxed">
                  For accurate pricing, please enquire directly with our friendly staff when you call.
                </p>
              </div>
            </div>
          </div>

          {/* Western Rates */}
<div className="my-20">
  <h2 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e8d6a8] to-[#bfa663] mb-8 tracking-wide uppercase">
    Western Ladies
  </h2>
  
  <div className="bg-[#14120f]/70 border border-[#bfa663]/30 shadow-[0_0_30px_rgba(191,166,99,0.12)]">
    {/* Table Header */}
    <div className="grid grid-cols-3 border-b border-[#bfa663]/40">
      <div className="flex items-center justify-center gap-3 p-3 border-r border-[#bfa663]/20">
        <Clock className="w-6 h-6 text-[#bfa663]" />
        <h3 className="text-xl font-serif font-bold text-[#e8d6a8] uppercase tracking-widest">30 Min</h3>
      </div>
      <div className="flex items-center justify-center gap-3 p-3 border-r border-[#bfa663]/20">
        <Clock className="w-6 h-6 text-[#bfa663]" />
        <h3 className="text-xl font-serif font-bold text-[#e8d6a8] uppercase tracking-widest">45 Min</h3>
      </div>
      <div className="flex items-center justify-center gap-3 p-3 relative">
        <Clock className="w-6 h-6 text-[#e8d6a8]" />
        <h3 className="text-xl font-serif font-bold text-[#e8d6a8] uppercase tracking-widest">60 Min</h3>
        <span className="absolute -top-2 right-4 bg-[#8b0000] text-[#e8d6a8] px-3 py-0.5 text-sm border border-[#bfa663]/40 font-serif tracking-widest uppercase">
          Popular
        </span>
      </div>
    </div>
    
    {/* Table Body */}
    <div className="grid grid-cols-3">
      <div className="text-center p-8 border-r border-[#bfa663]/20">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl text-[#bfa663]/80 font-serif">$</span>
          <span className="text-5xl font-serif font-bold text-[#e8d6a8]">160</span>
          <span className="text-2xl text-[#bfa663]/60 font-serif">-200</span>
        </div>
      </div>
      <div className="text-center p-8 border-r border-[#bfa663]/20">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl text-[#bfa663]/80 font-serif">$</span>
          <span className="text-5xl font-serif font-bold text-[#e8d6a8]">220</span>
          <span className="text-2xl text-[#bfa663]/60 font-serif">-300</span>
        </div>
      </div>
      <div className="text-center p-8 bg-[#14120f]/50">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl text-[#e8d6a8]/80 font-serif">$</span>
          <span className="text-5xl font-serif font-bold text-[#e8d6a8]">270</span>
          <span className="text-2xl text-[#bfa663]/80 font-serif">-500</span>
        </div>
      </div>
    </div>
  </div>
</div>

          {/* Asian Rates */}
<div className="mb-20">
  <h2 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e8d6a8] to-[#bfa663] mb-8 tracking-wide uppercase">
    Asian Ladies
  </h2>
  
  <div className="bg-[#14120f]/70 border border-[#bfa663]/30 shadow-[0_0_30px_rgba(191,166,99,0.12)]">
    {/* Table Header */}
    <div className="grid grid-cols-3 border-b border-[#bfa663]/40">
      <div className="flex items-center justify-center gap-3 p-3 border-r border-[#bfa663]/20">
        <Clock className="w-6 h-6 text-[#bfa663]" />
        <h3 className="text-xl font-serif font-bold text-[#e8d6a8] uppercase tracking-widest">30 Min</h3>
      </div>
      <div className="flex items-center justify-center gap-3 p-3 border-r border-[#bfa663]/20">
        <Clock className="w-6 h-6 text-[#bfa663]" />
        <h3 className="text-xl font-serif font-bold text-[#e8d6a8] uppercase tracking-widest">45 Min</h3>
      </div>
      <div className="flex items-center justify-center gap-3 p-3 relative">
        <Clock className="w-6 h-6 text-[#e8d6a8]" />
        <h3 className="text-xl font-serif font-bold text-[#e8d6a8] uppercase tracking-widest">60 Min</h3>
        <span className="absolute -top-2 right-4 bg-[#8b0000] text-[#e8d6a8] px-3 py-0.5 text-sm border border-[#bfa663]/40 font-serif tracking-widest uppercase">
          Popular
        </span>
      </div>
    </div>
    
    {/* Table Body */}
    <div className="grid grid-cols-3">
      <div className="text-center p-8 border-r border-[#bfa663]/20">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl text-[#bfa663]/80 font-serif">$</span>
          <span className="text-5xl font-serif font-bold text-[#e8d6a8]">170</span>
          <span className="text-2xl text-[#bfa663]/60 font-serif">-250</span>
        </div>
      </div>
      <div className="text-center p-8 border-r border-[#bfa663]/20">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl text-[#bfa663]/80 font-serif">$</span>
          <span className="text-5xl font-serif font-bold text-[#e8d6a8]">220</span>
          <span className="text-2xl text-[#bfa663]/60 font-serif">-270</span>
        </div>
      </div>
      <div className="text-center p-8 bg-[#14120f]/50">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl text-[#e8d6a8]/80 font-serif">$</span>
          <span className="text-5xl font-serif font-bold text-[#e8d6a8]">270</span>
          <span className="text-2xl text-[#bfa663]/80 font-serif">-350</span>
        </div>
      </div>
    </div>
  </div>
</div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#bfa663]/40 to-transparent mb-12"></div>

          {/* Legal Disclaimer */}
          <div className="bg-[#0b0b0b]/20 p-3">
            <h3 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e8d6a8] to-[#bfa663] mb-6 tracking-wide uppercase">
              Service Information
            </h3>
            <div className="space-y-4 text-[#d8cfa5]/90">
              <p className="font-serif leading-relaxed">
                All sexual services are provided directly by independent service providers.
              </p>
              <p className="font-serif leading-relaxed">
                As a legal establishment, we provide rooms to service providers who operate independently.
              </p>
              <p className="font-serif leading-relaxed">
                We recommend discussing your desired services and pricing directly with your chosen provider.
              </p>
              <p className="font-serif leading-relaxed">
                The rates listed are general guides only. Individual providers set their own rates.
              </p>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default RatesPage;