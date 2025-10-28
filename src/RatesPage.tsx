import React from 'react';
import { Clock, DollarSign, Info } from 'lucide-react';
import Layout from './components/Layout';

const RatesPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4">
          
          <h1 className="text-4xl font-serif font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-amber-200 to-amber-400 mb-2 text-center tracking-wide">
            Rates & Services
          </h1>
          <p className="text-slate-300 font-serif text-center mb-12">Sophisticated elegance at affordable prices</p>
{/* Important Information */}
<div className="mb-12">
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-serif font-bold text-transparent bg-clip-text 
                  bg-gradient-to-r from-amber-200 to-amber-400 mb-3 tracking-wide">
                  Pricing Information
                </h3>
                <p className="text-slate-300 font-serif leading-relaxed mb-3">
                  Prices vary depending on the lady and services provided. Some ladies may charge different 
                  rates from the table above.
                </p>
                <p className="text-slate-300 font-serif leading-relaxed font-medium">
                  For accurate pricing, please enquire directly with our friendly staff when you call.
                </p>
              </div>
            </div>
          </div>
          {/* Western Rates */}
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-transparent bg-clip-text 
              bg-gradient-to-r from-amber-200 to-amber-400 mb-6 tracking-wide">
              Western Ladies
            </h2>
            <div className="grid grid-cols-3 gap-3 md:gap-6">
              <div className="bg-slate-900/80 backdrop-blur-sm border-2 border-amber-400/30 p-3 md:p-6 shadow-2xl 
                hover:border-amber-400/50 transition-all duration-300">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                  <Clock className="w-4 h-4 md:w-6 md:h-6 text-amber-400" />
                  <h3 className="text-sm md:text-xl font-serif font-bold text-amber-200">30 Min</h3>
                </div>
                <div className="flex items-baseline gap-1 md:gap-2">
                  <DollarSign className="w-3 h-3 md:w-5 md:h-5 text-slate-400" />
                  <span className="text-xl md:text-3xl font-serif font-bold text-amber-400">160</span>
                  <span className="text-xs md:text-base text-slate-400 font-serif">-200</span>
                </div>
              </div>
              <div className="bg-slate-900/80 backdrop-blur-sm border-2 border-amber-400/30 p-3 md:p-6 shadow-2xl 
                hover:border-amber-400/50 transition-all duration-300">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                  <Clock className="w-4 h-4 md:w-6 md:h-6 text-amber-400" />
                  <h3 className="text-sm md:text-xl font-serif font-bold text-amber-200">45 Min</h3>
                </div>
                <div className="flex items-baseline gap-1 md:gap-2">
                  <DollarSign className="w-3 h-3 md:w-5 md:h-5 text-slate-400" />
                  <span className="text-xl md:text-3xl font-serif font-bold text-amber-400">220</span>
                  <span className="text-xs md:text-base text-slate-400 font-serif">-300</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-600/20 via-amber-700/20 to-amber-800/20 
                backdrop-blur-sm border-2 border-amber-400/60 p-3 md:p-6 shadow-2xl 
                hover:border-amber-400 transition-all duration-300 relative">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                  <Clock className="w-4 h-4 md:w-6 md:h-6 text-amber-300" />
                  <h3 className="text-sm md:text-xl font-serif font-bold text-amber-100">60 Min</h3>
                </div>
                <div className="flex items-baseline gap-1 md:gap-2">
                  <DollarSign className="w-3 h-3 md:w-5 md:h-5 text-amber-300" />
                  <span className="text-xl md:text-3xl font-serif font-bold text-amber-300">270</span>
                  <span className="text-xs md:text-base text-amber-200 font-serif">-500</span>
                </div>
                <span className="inline-block mt-1 md:mt-2 text-[10px] md:text-xs bg-amber-600 text-amber-50 px-2 md:px-3 py-0.5 md:py-1 font-serif font-semibold">
                  Popular
                </span>
              </div>
            </div>
          </div>

       

          {/* Asian Rates */}
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-transparent bg-clip-text 
              bg-gradient-to-r from-amber-200 to-amber-400 mb-6 tracking-wide">
              Asian Ladies
            </h2>
            <div className="grid grid-cols-3 gap-3 md:gap-6">
              <div className="bg-slate-900/80 backdrop-blur-sm border-2 border-amber-400/30 p-3 md:p-6 shadow-2xl 
                hover:border-amber-400/50 transition-all duration-300">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                  <Clock className="w-4 h-4 md:w-6 md:h-6 text-amber-400" />
                  <h3 className="text-sm md:text-xl font-serif font-bold text-amber-200">30 Min</h3>
                </div>
                <div className="flex items-baseline gap-1 md:gap-2">
                  <DollarSign className="w-3 h-3 md:w-5 md:h-5 text-slate-400" />
                  <span className="text-xl md:text-3xl font-serif font-bold text-amber-400">170</span>
                  <span className="text-xs md:text-base text-slate-400 font-serif">-250</span>
                </div>
              </div>
              <div className="bg-slate-900/80 backdrop-blur-sm border-2 border-amber-400/30 p-3 md:p-6 shadow-2xl 
                hover:border-amber-400/50 transition-all duration-300">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                  <Clock className="w-4 h-4 md:w-6 md:h-6 text-amber-400" />
                  <h3 className="text-sm md:text-xl font-serif font-bold text-amber-200">45 Min</h3>
                </div>
                <div className="flex items-baseline gap-1 md:gap-2">
                  <DollarSign className="w-3 h-3 md:w-5 md:h-5 text-slate-400" />
                  <span className="text-xl md:text-3xl font-serif font-bold text-amber-400">220</span>
                  <span className="text-xs md:text-base text-slate-400 font-serif">-270</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-600/20 via-amber-700/20 to-amber-800/20 
                backdrop-blur-sm border-2 border-amber-400/60 p-3 md:p-6 shadow-2xl 
                hover:border-amber-400 transition-all duration-300 relative">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                  <Clock className="w-4 h-4 md:w-6 md:h-6 text-amber-300" />
                  <h3 className="text-sm md:text-xl font-serif font-bold text-amber-100">60 Min</h3>
                </div>
                <div className="flex items-baseline gap-1 md:gap-2">
                  <DollarSign className="w-3 h-3 md:w-5 md:h-5 text-amber-300" />
                  <span className="text-xl md:text-3xl font-serif font-bold text-amber-300">270</span>
                  <span className="text-xs md:text-base text-amber-200 font-serif">-350</span>
                </div>
                <span className="inline-block mt-1 md:mt-2 text-[10px] md:text-xs bg-amber-600 text-amber-50 px-2 md:px-3 py-0.5 md:py-1 font-serif font-semibold">
                  Popular
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mb-12"></div>


          {/* Legal Disclaimer */}
          <div>
            <h3 className="text-lg font-serif font-bold text-transparent bg-clip-text 
              bg-gradient-to-r from-amber-200 to-amber-400 mb-6 tracking-wide">
              Service Information
            </h3>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-amber-400 font-bold flex-shrink-0">•</span>
                <span className="font-serif">All sexual services are provided directly by independent service providers.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 font-bold flex-shrink-0">•</span>
                <span className="font-serif">
                  As a legal establishment, we provide rooms to service providers who operate independently.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 font-bold flex-shrink-0">•</span>
                <span className="font-serif">
                  We recommend discussing your desired services and pricing directly with your chosen provider.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 font-bold flex-shrink-0">•</span>
                <span className="font-serif">
                  The rates listed are general guides only. Individual providers set their own rates.
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default RatesPage;