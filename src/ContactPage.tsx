import React, { useState } from 'react';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';
import Layout from './components/Layout';

type ColorScheme = 'default' | 'goldNoir' | 'burgundyVelvet' | 'darkRose' | 'midnightGold';

const ContactPage: React.FC = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('default');

  const schemes = {
    default: {
      bg: 'bg-gray-50',
      card: 'bg-white shadow-xl',
      text: 'text-gray-900',
      subtext: 'text-gray-700',
      phone: 'bg-pink-600 hover:bg-pink-700',
      phoneIcon: 'bg-pink-100 text-pink-600',
      addressIcon: 'bg-blue-100 text-blue-600',
      emailIcon: 'bg-purple-100 text-purple-600',
      clockIcon: 'bg-green-100 text-green-600',
      banner: 'bg-pink-50 border-pink-200 text-gray-700',
    },
    goldNoir: {
      bg: 'bg-gradient-to-br from-black via-zinc-900 to-black',
      card: 'bg-gradient-to-br from-zinc-900 to-black shadow-2xl shadow-amber-900/20 border border-amber-900/20',
      text: 'text-amber-100',
      subtext: 'text-amber-200/80',
      phone: 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 shadow-lg shadow-amber-900/50',
      phoneIcon: 'bg-amber-900/30 text-amber-400 border border-amber-800/30',
      addressIcon: 'bg-amber-900/30 text-amber-400 border border-amber-800/30',
      emailIcon: 'bg-amber-900/30 text-amber-400 border border-amber-800/30',
      clockIcon: 'bg-amber-900/30 text-amber-400 border border-amber-800/30',
      banner: 'bg-gradient-to-r from-amber-950/50 to-amber-900/30 border-amber-800/40 text-amber-100',
    },
    burgundyVelvet: {
      bg: 'bg-gradient-to-br from-neutral-950 via-red-950 to-neutral-950',
      card: 'bg-gradient-to-br from-red-950/40 via-neutral-900 to-red-950/40 shadow-2xl shadow-red-950/50 border border-red-900/30',
      text: 'text-rose-100',
      subtext: 'text-rose-200/80',
      phone: 'bg-gradient-to-r from-rose-700 to-red-700 hover:from-rose-600 hover:to-red-600 shadow-lg shadow-rose-900/50',
      phoneIcon: 'bg-red-950/50 text-rose-400 border border-red-900/40',
      addressIcon: 'bg-red-950/50 text-rose-400 border border-red-900/40',
      emailIcon: 'bg-red-950/50 text-rose-400 border border-red-900/40',
      clockIcon: 'bg-red-950/50 text-rose-400 border border-red-900/40',
      banner: 'bg-gradient-to-r from-red-950/40 to-rose-950/40 border-rose-900/40 text-rose-100',
    },
    darkRose: {
      bg: 'bg-gradient-to-br from-gray-950 via-rose-950 to-gray-950',
      card: 'bg-gradient-to-br from-gray-900 to-rose-950/50 shadow-2xl shadow-rose-950/60 border border-rose-900/30',
      text: 'text-rose-50',
      subtext: 'text-rose-100/80',
      phone: 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-lg shadow-rose-900/50',
      phoneIcon: 'bg-rose-950/60 text-rose-300 border border-rose-800/40',
      addressIcon: 'bg-rose-950/60 text-rose-300 border border-rose-800/40',
      emailIcon: 'bg-rose-950/60 text-rose-300 border border-rose-800/40',
      clockIcon: 'bg-rose-950/60 text-rose-300 border border-rose-800/40',
      banner: 'bg-gradient-to-r from-rose-950/40 to-pink-950/40 border-rose-800/40 text-rose-50',
    },
    midnightGold: {
      bg: 'bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950',
      card: 'bg-gradient-to-br from-slate-900 to-indigo-950/60 shadow-2xl shadow-indigo-950/60 border border-amber-900/20',
      text: 'text-amber-50',
      subtext: 'text-amber-100/80',
      phone: 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 shadow-lg shadow-amber-900/50',
      phoneIcon: 'bg-indigo-950/60 text-amber-400 border border-amber-900/30',
      addressIcon: 'bg-indigo-950/60 text-amber-400 border border-amber-900/30',
      emailIcon: 'bg-indigo-950/60 text-amber-400 border border-amber-900/30',
      clockIcon: 'bg-indigo-950/60 text-amber-400 border border-amber-900/30',
      banner: 'bg-gradient-to-r from-indigo-950/50 to-slate-900/50 border-amber-900/30 text-amber-50',
    },
  };

  const current = schemes[colorScheme];

  return (
    <Layout>
      <div className={`min-h-screen ${current.bg} py-12`}>
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Color Scheme Switcher */}
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setColorScheme('default')}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                colorScheme === 'default'
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              Default
            </button>
            <button
              onClick={() => setColorScheme('goldNoir')}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                colorScheme === 'goldNoir'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-900/50'
                  : 'bg-gradient-to-r from-zinc-900 to-black text-amber-400 hover:from-zinc-800 hover:to-zinc-900 shadow border border-amber-900/30'
              }`}
            >
              Gold Noir
            </button>
            <button
              onClick={() => setColorScheme('burgundyVelvet')}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                colorScheme === 'burgundyVelvet'
                  ? 'bg-gradient-to-r from-rose-700 to-red-700 text-white shadow-lg shadow-rose-900/50'
                  : 'bg-gradient-to-r from-red-950 to-neutral-900 text-rose-300 hover:from-red-900 hover:to-neutral-800 shadow border border-red-900/40'
              }`}
            >
              Burgundy Velvet
            </button>
            <button
              onClick={() => setColorScheme('darkRose')}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                colorScheme === 'darkRose'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-900/50'
                  : 'bg-gradient-to-r from-gray-900 to-rose-950 text-rose-200 hover:from-gray-800 hover:to-rose-900 shadow border border-rose-900/40'
              }`}
            >
              Dark Rose
            </button>
            <button
              onClick={() => setColorScheme('midnightGold')}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                colorScheme === 'midnightGold'
                  ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-lg shadow-amber-900/50'
                  : 'bg-gradient-to-r from-slate-900 to-indigo-950 text-amber-300 hover:from-slate-800 hover:to-indigo-900 shadow border border-amber-900/30'
              }`}
            >
              Midnight Gold
            </button>
          </div>

          <h1 className={`text-4xl font-bold ${current.text} mb-8 text-center tracking-wide`}>
            Contact Us
          </h1>

          {/* Contact Card */}
          <div className={`${current.card} rounded-2xl p-8 mb-8`}>
            
            {/* Phone */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className={`${current.phoneIcon} p-3 rounded-full`}>
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className={`text-lg font-semibold ${current.text}`}>Phone</h3>
              </div>
              <a 
                href="tel:+61417888123"
              >
                0417 888 123
              </a>
            </div>

            {/* Address */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className={`${current.addressIcon} p-3 rounded-full`}>
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className={`text-lg font-semibold ${current.text}`}>Address</h3>
              </div>
              <p className={`text-lg ${current.subtext} leading-relaxed`}>
                Near Sydenham Station<br />
                Marrickville, NSW 2204
              </p>
            </div>

            {/* Email */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className={`${current.emailIcon} p-3 rounded-full`}>
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className={`text-lg font-semibold ${current.text}`}>Email</h3>
              </div>
              <a 
                href="mailto:info@n5m.au"
                className={`text-lg ${current.subtext} hover:opacity-80 font-medium transition-opacity`}
              >
                info@n5m.au
              </a>
            </div>

            {/* Hours */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`${current.clockIcon} p-3 rounded-full`}>
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className={`text-lg font-semibold ${current.text}`}>Opening Hours</h3>
              </div>
              <p className={`text-lg ${current.subtext} leading-relaxed`}>
                Open 7 Days a Week<br />
                9:00 AM - 2:00 AM
              </p>
            </div>
          </div>

          {/* Quick Info */}
          <div className={`${current.banner} rounded-2xl p-6 border text-center`}>
            <p className="leading-relaxed">
              <span className="font-semibold">Call us anytime</span> for bookings, enquiries, or to discuss your preferences with our friendly staff.
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;