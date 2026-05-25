import React, { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link } from 'react-router-dom';
import i18n from "i18next";
import { useTranslation } from "react-i18next";


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n: i18nInstance } = useTranslation();

  const setLang = (lng: "en" | "zh-CN") => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <div className="min-h-screen relative bg-[#0b0b0b] text-[#e8d6a8] font-sans overflow-x-hidden">
      {/* --- BACKGROUND --- */}
      <div className="fixed inset-0 -z-10">
        {/* Velvet base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e] via-[#121212] to-[#0b0b0b]" />

        {/* Fine static grain (like aged wallpaper) */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-soft-light"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 200\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            backgroundSize: "200px 200px",
          }}
        />

        {/* Candle shimmer overlay */}
        <div className="absolute inset-0 pointer-events-none animate-[candle_8s_ease-in-out_infinite] bg-radial from-[#c7a95a]/10 via-transparent to-transparent" />
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-black/70 border-b border-[#c3a45c]/30">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-3xl tracking-widest text-transparent bg-clip-text 
                 bg-gradient-to-r from-[#d8bf7a] to-[#b5934b] drop-shadow-[0_1px_6px_rgba(255,215,140,0.2)]
                 hover:brightness-125 transition duration-500"
          >
            42G.au
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-10 text-[#d4c48e]/90 font-light tracking-wide">
            {[
              ["menu.rateService", "/rates"],
              ["menu.roster", "/#roster"],
              ["menu.contact", "/contact"],
            ].map(([labelKey, href]) => (
              <Link
                key={href}
                to={href}
                className="relative group font-serif hover:text-[#f3e4b0] transition-all duration-500"
              >
                {t(labelKey)}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c3a45c] group-hover:w-full transition-all duration-700 ease-in-out"></span>
              </Link>
            ))}
          </div>

          {/* Right side: Book Now + Menu */}
          <div className="flex items-center space-x-4">
            {/* Book Now always visible */}
            <Link
              to="tel:+61498100011"
              className="relative px-5 py-2 border border-[#b5934b]/70 text-[#d6c59b]
                   font-semibold tracking-wide hover:bg-[#b5934b]/10 hover:shadow-[inset_0_0_10px_rgba(181,147,75,0.4)]
                   transition-all duration-500 flex items-center gap-2 font-serif text-lg md:text-base"
            >
              <Phone className="w-4 h-4" />
              {t("common.bookNow")}
            </Link>
            {/* Language toggle (desktop + mobile) */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-1 text-xs border font-serif tracking-widest ${i18nInstance.language === "en" ? "border-[#d8bf7a]" : "border-[#b5934b]/40"
                  } text-[#d6c59b] hover:text-[#f3e4b0] transition-colors`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("zh-CN")}
                className={`px-2 py-1 text-xs border font-serif tracking-widest ${i18nInstance.language === "zh-CN" ? "border-[#d8bf7a]" : "border-[#b5934b]/40"
                  } text-[#d6c59b] hover:text-[#f3e4b0] transition-colors`}
              >
                中文
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[#d6c59b] hover:text-[#f3e4b0] transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown (no book now inside anymore) */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/90 border-t border-[#c3a45c]/30">

            {/* 🌍 Language toggle (ABOVE links) */}
            <div className="flex gap-2 px-10 pt-4 pb-2">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-2 text-sm border font-serif ${i18nInstance.language === "en"
                    ? "border-[#d8bf7a]"
                    : "border-[#b5934b]/30"
                  }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("zh-CN")}
                className={`px-3 py-2 text-sm border font-serif ${i18nInstance.language === "zh-CN"
                    ? "border-[#d8bf7a]"
                    : "border-[#b5934b]/30"
                  }`}
              >
                中文
              </button>
            </div>

            {/* 🔗 Navigation links */}
            <div className="text-2xl px-10 py-4 space-y-4 font-light text-[#e7d9b2] font-serif">
              {[
                ["menu.rateService", "/rates"],
                ["menu.roster", "/#roster"],
                ["menu.contact", "/contact"],
              ].map(([labelKey, href]) => (
                <Link
                  key={href}
                  to={href}
                  className="block py-2 border-b border-[#b5934b]/10 hover:text-[#f3e4b0]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(labelKey)}
                </Link>
              ))}

            </div>

          </div>
        )}

      </nav>


      {/* --- MAIN CONTENT --- */}
      <main className="pt-20 font-sans leading-relaxed tracking-wide text-[#e9dcb5]">
        {children}
      </main>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 mt-24 bg-gradient-to-b from-[#0d0d0d] to-black border-t border-[#b5934b]/30 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-[#d8bf7a] mb-3 tracking-wide uppercase text-base md:text-sm font-serif">Quick Links</h3>
            <ul className="space-y-3 text-[#a79b7a] font-sans text-md">
              {[
                { key: "menu.homepage", path: "/" },
                { key: "menu.rateService", path: "/rates" },
                { key: "menu.roster", path: "/#roster" },
                { key: "menu.contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-base hover:text-[#f3e4b0] transition-colors duration-500">
                    {t(link.key)}
                  </Link>
                </li>
              ))}

            </ul>
          </div>
          <div>
            <div className="text-[#a79b7a] space-y-2 font-sans text-base">
              <p className="block text-sm">Open daily 10 am until late</p>
              <br></br>
              <a
                href="https://www.google.com/maps/dir//42+Buffalo+Road,+Gladesville+NSW/@-33.8175629,151.128669,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x6b12a59bd179ab0d:0x626e444e472f57b7!2m2!1d151.1233667!2d-33.8191093?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[#f3e4b0] transition-colors duration-500"
              >
                42 Buffalo Road, Gladesville 2111
              </a>
              <a
                href="tel:+61498100011"
                className="block font-sans text-[#f3e4b0]"
                style={{ animation: "phoneGlow 3.6s ease-in-out infinite" }}
              >
                0498 100 011
              </a>


            </div>
          </div>
        </div>
        
      </footer>

      {/* Candlelight keyframes */}
      <style>{`
        @keyframes candle {
          0%, 100% { opacity: 0.08; transform: scale(1); }
          50% { opacity: 0.18; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default Layout;
