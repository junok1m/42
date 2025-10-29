import React, { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <a
      href="/"
      className="font-serif text-3xl tracking-widest text-transparent bg-clip-text 
                 bg-gradient-to-r from-[#d8bf7a] to-[#b5934b] drop-shadow-[0_1px_6px_rgba(255,215,140,0.2)]
                 hover:brightness-125 transition duration-500"
    >
      Opulence
    </a>

    {/* Desktop menu */}
    <div className="hidden md:flex items-center space-x-10 text-[#d4c48e]/90 font-light tracking-wide">
      {[
        ["About Us", "/about"],
        ["Rate & Service", "/rates"],
        ["Roster", "/#roster"],
        ["Contact", "/contact"],
      ].map(([label, href]) => (
        <a
          key={label}
          href={href}
          className="relative group font-serif hover:text-[#f3e4b0] transition-all duration-500"
        >
          {label}
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c3a45c] group-hover:w-full transition-all duration-700 ease-in-out"></span>
        </a>
      ))}
    </div>

    {/* Right side: Book Now + Menu */}
    <div className="flex items-center space-x-4">
      {/* Book Now always visible */}
      <a
        href="tel:+61417888123"
        className="relative px-5 py-2 border border-[#b5934b]/70 text-[#d6c59b]
                   font-semibold tracking-wide hover:bg-[#b5934b]/10 hover:shadow-[inset_0_0_10px_rgba(181,147,75,0.4)]
                   transition-all duration-500 flex items-center gap-2 font-serif text-sm md:text-base"
      >
        <Phone className="w-4 h-4" />
        Book Now
      </a>

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
      <div className="px-4 py-4 space-y-4 font-light text-[#e7d9b2] font-serif">
        {[
          ["About Us", "/about"],
          ["Rate & Service", "/rates"],
          ["Roster", "/#roster"],
          ["Contact", "/contact"],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="block py-2 border-b border-[#b5934b]/10 hover:text-[#f3e4b0]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {label}
          </a>
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
    <ul className="space-y-3 text-[#a79b7a] font-sans">
      {[
        { name: "Homepage", path: "/" },
        { name: "Rate & Service", path: "/rates" },
        { name: "Roster", path: "/roster" },
        { name: "Contact", path: "/contact" }
      ].map((link) => (
        <li key={link.name}>
          <a href={link.path} className="text-base hover:text-[#f3e4b0] transition-colors duration-500">
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
  <div>
    <div className="text-[#a79b7a] space-y-2 font-sans text-base">
      <p className="block">Open daily 10 am until late</p>
      <p className="block">5 Gerald Street, Marrickville 2204</p>
    </div>
  </div>
</div>
  <div className="text-center text-[#72694f] text-sm mt-12 border-t border-[#b5934b]/10 pt-6 font-sans">
    © 2025 The Rotisserie. All rights reserved.
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
