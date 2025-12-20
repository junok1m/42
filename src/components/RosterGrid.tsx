import type { RosterModel } from "../types/index.ts";
import { Link } from 'react-router-dom';


interface RosterGridProps {
  models: RosterModel[];
}

const RosterGrid: React.FC<RosterGridProps> = ({ models }) => {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-8">
      {models.map((model) => (
        <Link
          key={model.id}
          to={model.profileLink}
          className="group block relative transition-transform duration-500 hover:-translate-y-1"
        >
          {/* NEW badge */}
          {model.isNew && (
            <span className="absolute top-3 right-3 bg-gradient-to-br from-[#b64a4a] to-[#802020] text-amber-50 text-[10px] px-2 py-0.5 font-semibold tracking-wide shadow-lg z-20">
              NEW
            </span>
          )}

{/* Image without frame */}
<div className="relative w-full aspect-[3/4] overflow-hidden border border-[#bfa663]/30">
  <img
    src={model.image}
    alt={model.name}
    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
  />
</div>


{/* Text info */}
<div className="pl-4 mt-3">
  <h3 className="font-serif text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#e3d19b] to-[#bfa663] mb-1">
    {model.name} · <span className="text-[16px] uppercase tracking-[0.15em] text-[#d2b97b]/80">{model.nationality}</span>
  </h3>

  <p className="text-lg text-[#c9c2a2] font-sans flex items-center mb-1">
    <span className="w-2 h-2 bg-[#d2b97b] rounded-full mr-2 shadow-[0_0_6px_#bfa663]"></span>
    {model.workingTime}
  </p>

</div>        </Link>
      ))}
    </div>
  );
};

export default RosterGrid;
