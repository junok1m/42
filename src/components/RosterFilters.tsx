import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, X } from "lucide-react";

interface RosterFiltersProps {
  allNationalities: string[];
  selectedNationalities: string[];
  selectedServices: string[];
  isDropdownOpen: boolean;
  isServicesDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  setIsServicesDropdownOpen: (open: boolean) => void;
  toggleNationality: (nationality: string) => void;
  toggleService: (service: string) => void;
  setSelectedNationalities: (n: string[]) => void;
  setSelectedServices: (s: string[]) => void;
}

const RosterFilters: React.FC<RosterFiltersProps> = ({
  allNationalities,
  selectedNationalities,
  selectedServices,
  isDropdownOpen,
  isServicesDropdownOpen,
  setIsDropdownOpen,
  setIsServicesDropdownOpen,
  toggleNationality,
  toggleService,
  setSelectedNationalities,
  setSelectedServices,
}) => {
  const nationalityBtn = useRef<HTMLButtonElement>(null);
  const serviceBtn = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const [servicesPos, setServicesPos] = useState({ top: 0, left: 0, width: 0 });

  // compute positions
  useEffect(() => {
    const updatePos = () => {
      if (isDropdownOpen && nationalityBtn.current) {
        const rect = nationalityBtn.current.getBoundingClientRect();
        setDropdownPos({ top: rect.bottom + 6, left: rect.left, width: rect.width });
      }
      if (isServicesDropdownOpen && serviceBtn.current) {
        const rect = serviceBtn.current.getBoundingClientRect();
        setServicesPos({ top: rect.bottom + 6, left: rect.left, width: rect.width });
      }
    };
    updatePos();
    window.addEventListener("scroll", updatePos, true);
    window.addEventListener("resize", updatePos);
    return () => {
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
    };
  }, [isDropdownOpen, isServicesDropdownOpen]);

  // close when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !nationalityBtn.current?.contains(e.target as Node)
      ) setIsDropdownOpen(false);
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target as Node) &&
        !serviceBtn.current?.contains(e.target as Node)
      ) setIsServicesDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [setIsDropdownOpen, setIsServicesDropdownOpen]);

  return (
    <div className="space-y-4 mb-12">
      {(selectedNationalities.length > 0 || selectedServices.length > 0) && (
        <div className="flex justify-center flex-wrap gap-2">
          {[...selectedNationalities, ...selectedServices].map((item) => (
            <span key={item}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-[#1a1610] border border-[#bfa663]/40 text-[#e8d6a8] rounded">
              {item.toUpperCase()}
              <button
                onClick={() =>
                  selectedNationalities.includes(item)
                    ? toggleNationality(item)
                    : toggleService(item)
                }
                className="hover:text-[#bfa663]">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* side-by-side dropdowns */}
      <div className="flex justify-center gap-3 w-full max-w-[400px] mx-auto px-3">
  <div className="relative flex-1 min-w-0">
    <button
      ref={nationalityBtn}
      onClick={() => {
        setIsDropdownOpen(!isDropdownOpen);
        setIsServicesDropdownOpen(false);
      }}
      className="flex items-center justify-between gap-2 px-3 py-1.5 border border-[#bfa663]/40 text-[#e8d6a8] bg-[#14120f]/60 hover:bg-[#1a1813]/70 transition-all text-sm font-sans w-full truncate"
    >
      <span className="truncate">
        {selectedNationalities.length === 0
          ? "All Nationalities"
          : `${selectedNationalities.length} selected`}
      </span>
      <ChevronDown
        className={`w-4 h-4 transition-transform ${
          isDropdownOpen ? "rotate-180" : ""
        }`}
      />
    </button>

          {isDropdownOpen &&
            createPortal(
              <div
                ref={dropdownRef}
                className="fixed bg-[#14120f] border border-[#bfa663]/40 rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.6)] overflow-hidden"
                style={{
                  top: dropdownPos.top,
                  left: dropdownPos.left,
                  width: dropdownPos.width,
                  zIndex: 2147483647,
                }}
              >
                <div className="border-b border-[#bfa663]/20">
                  <button
                    onClick={() => setSelectedNationalities([])}
                    className="block w-full text-left px-4 py-2 text-sm text-[#bfa663] hover:bg-[#1f1a12]/70 font-sans"
                  >
                    Clear All
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {allNationalities.map((n) => (
                    <label key={n}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#1f1a12]/70 cursor-pointer font-sans text-[#e8d6a8]">
                      <input
                        type="checkbox"
                        checked={selectedNationalities.includes(n)}
                        onChange={() => toggleNationality(n)}
                        className="accent-[#bfa663] w-4 h-4"
                      />
                      {n}
                    </label>
                  ))}
                </div>
              </div>,
              document.body
            )}
        </div>

        {/* Services */}
        <div className="relative flex-1 min-w-0">
    <button
      ref={serviceBtn}
      onClick={() => {
        setIsServicesDropdownOpen(!isServicesDropdownOpen);
        setIsDropdownOpen(false);
      }}
      className="flex items-center justify-between gap-2 px-3 py-1.5 border border-[#bfa663]/40 text-[#e8d6a8] bg-[#14120f]/60 hover:bg-[#1a1813]/70 transition-all text-sm font-sans w-full truncate"
    >
      <span className="truncate">
        {selectedServices.length === 0
          ? "All Services"
          : `${selectedServices.length} selected`}
      </span>
      <ChevronDown
        className={`w-4 h-4 transition-transform ${
          isServicesDropdownOpen ? "rotate-180" : ""
        }`}
      />
    </button>
  

          {isServicesDropdownOpen &&
            createPortal(
              <div
                ref={servicesRef}
                className="fixed bg-[#14120f] border border-[#bfa663]/40 rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.6)] overflow-hidden"
                style={{
                  top: servicesPos.top,
                  left: servicesPos.left,
                  width: servicesPos.width,
                  zIndex: 2147483647,
                }}
              >
                <div className="border-b border-[#bfa663]/20">
                  <button
                    onClick={() => setSelectedServices([])}
                    className="block w-full text-left px-4 py-2 text-sm text-[#bfa663] hover:bg-[#1f1a12]/70 font-sans"
                  >
                    Clear All
                  </button>
                </div>
                <div className="font-sans text-[#e8d6a8]">
                  {[
                    { key: "cim", label: "CIM" },
                    { key: "dfk", label: "DFK" },
                    { key: "filming", label: "Filming" },
                  ].map((s) => (
                    <label key={s.key}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#1f1a12]/70 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(s.key)}
                        onChange={() => toggleService(s.key)}
                        className="accent-[#bfa663] w-4 h-4"
                      />
                      {s.label}
                    </label>
                  ))}
                </div>
              </div>,
              document.body
            )}
        </div>
      </div>
    </div>
  );
};

export default RosterFilters;
