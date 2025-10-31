import React, { useState } from "react";

const servicesList = [
  "Shower",
  "CBJ",
  "BBBJ",
  "CIM",
  "DFK",
  "69",
  "GFE",
  "PSE",
  "Rimming",
  "Filming",
  "Massage",
  "MMF threesome (2 men 1 girl)",
  "MFF threesome (2 girls 1 man)",
  "Outcall",
];

const ModelFormPage: React.FC = () => {
  // Basic info
  const [name, setName] = useState("");
  const [country, setCountry] = useState("Chinese");
  const [isPublic, setIsPublic] = useState(false);

  // Rates
  const [rate30House, setRate30House] = useState("");
  const [rate30Provider, setRate30Provider] = useState("");
  const [rate30Agent, setRate30Agent] = useState("");
  const [rate30Total, setRate30Total] = useState("");
  const [rate45House, setRate45House] = useState("");
  const [rate45Provider, setRate45Provider] = useState("");
  const [rate45Agent, setRate45Agent] = useState("");
  const [rate45Total, setRate45Total] = useState("");
  const [rate60House, setRate60House] = useState("");
  const [rate60Provider, setRate60Provider] = useState("");
  const [rate60Agent, setRate60Agent] = useState("");
  const [rate60Total, setRate60Total] = useState("");

  // Details
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [cup, setCup] = useState("");
  const [dressSize, setDressSize] = useState("");
  const [figure, setFigure] = useState("");
  const [hair, setHair] = useState("");
  const [skin, setSkin] = useState("");
  const [tattoo, setTattoo] = useState("");
  const [pubes, setPubes] = useState("");

  // Requirements
  const [requirements, setRequirements] = useState("");

  // Services
  const [services, setServices] = useState<Record<string, boolean>>(
    Object.fromEntries(servicesList.map((s) => [s, false]))
  );

  const toggleService = (serviceName: string) =>
    setServices((prev) => ({ ...prev, [serviceName]: !prev[serviceName] }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      country,
      public: isPublic,
      rates: {
        "30min": {
          house: rate30House,
          provider: rate30Provider,
          agent: rate30Agent,
          total: rate30Total,
        },
        "45min": {
          house: rate45House,
          provider: rate45Provider,
          agent: rate45Agent,
          total: rate45Total,
        },
        "60min": {
          house: rate60House,
          provider: rate60Provider,
          agent: rate60Agent,
          total: rate60Total,
        },
      },
      details: {
        height,
        weight,
        cup,
        dressSize,
        figure,
        hair,
        skin,
        tattoo,
        pubes,
      },
      requirements,
      services: Object.keys(services).filter((s) => services[s]),
    };
    console.log("FORM SUBMIT ->", payload);
  };

  return (
    <div className="min-h-screen flex justify-center px-4 py-8 font-[Inter] text-[16px] text-black bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl p-6 md:p-10 space-y-10"
      >
        <header className="text-center">
          <h1 className="text-black font-sans text-[20px] font-medium">New Model Form</h1>
          <p className="text-gray-600 text-[16px] font-sans">
            Internal use only. Do not show or send.
          </p>
        </header>

        {/* BASIC INFO */}
        <section>
          <h2 className="text-[20px] font-medium mb-3 text-black">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-gray-700">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-400 px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="border border-gray-400 px-3 py-2 w-full"
              >
                <option>Chinese</option>
                <option>Korean</option>
                <option>Japanese</option>
              </select>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <input
                id="public"
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="h-4 w-4"
              />
              <label htmlFor="public">Public</label>
            </div>
          </div>
        </section>
{/* MEDIA */}
<section>
  <h2 className="text-black text-[20px] font-medium mb-3">Photos</h2>

  <div className="border border-gray-400 p-4 flex flex-col items-center justify-center text-gray-600 text-[16px] space-y-3">
    <div className="flex flex-col items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 16v-8m0 0l-3 3m3-3l3 3m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p>Drag & drop files here, or click to browse</p>
    </div>

    <div className="text-sm text-gray-500">(JPG, PNG up to 10 MB each)</div>

    <div className="mt-4 grid grid-cols-3 gap-2 w-full">
      {/* Mock thumbnails */}
      <div className="aspect-square border border-gray-300 flex items-center justify-center text-gray-400">
        Preview 1
      </div>
      <div className="aspect-square border border-gray-300 flex items-center justify-center text-gray-400">
        Preview 2
      </div>
      <div className="aspect-square border border-gray-300 flex items-center justify-center text-gray-400">
        Preview 3
      </div>
    </div>
  </div>
</section>

        {/* RATES */}
        <section>
          <h2 className="text-black text-[20px] font-medium mb-3">Rates</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-left text-[16px]">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="p-2">Duration</th>
                  <th className="p-2">House Fee</th>
                  <th className="p-2">Provider Fee</th>
                  <th className="p-2">Agent Fee</th>
                  <th className="p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["30 mins", rate30House, setRate30House, rate30Provider, setRate30Provider, rate30Agent, setRate30Agent, rate30Total, setRate30Total],
                  ["45 mins", rate45House, setRate45House, rate45Provider, setRate45Provider, rate45Agent, setRate45Agent, rate45Total, setRate45Total],
                  ["60 mins", rate60House, setRate60House, rate60Provider, setRate60Provider, rate60Agent, setRate60Agent, rate60Total, setRate60Total],
                ].map(([label, house, setHouse, provider, setProvider, agent, setAgent, total, setTotal]) => (
                  <tr key={label as string} className="border-b border-gray-300">
                    <td className="p-2">{label}</td>
                    <td className="p-2">
                      <input
                        value={house as string}
                        onChange={(e) => (setHouse as any)(e.target.value)}
                        className="border border-gray-400 px-2 py-1 w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        value={provider as string}
                        onChange={(e) => (setProvider as any)(e.target.value)}
                        className="border border-gray-400 px-2 py-1 w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        value={agent as string}
                        onChange={(e) => (setAgent as any)(e.target.value)}
                        className="border border-gray-400 px-2 py-1 w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        value={total as string}
                        onChange={(e) => (setTotal as any)(e.target.value)}
                        className="border border-gray-400 px-2 py-1 w-full"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* PHYSICAL DETAILS */}
        <section>
          <h2 className="text-black text-[20px] font-medium mb-3">Physical Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ["Height", height, setHeight],
              ["Weight", weight, setWeight],
              ["Cup", cup, setCup],
              ["Dress Size", dressSize, setDressSize],
              ["Figure", figure, setFigure],
              ["Hair", hair, setHair],
              ["Skin", skin, setSkin],
              ["Tattoo", tattoo, setTattoo],
              ["Pubes", pubes, setPubes],
            ].map(([label, val, setVal]) => (
              <div key={label as string}>
                <label className="block mb-1 text-gray-700">{label}</label>
                <input
                  value={val as string}
                  onChange={(e) => (setVal as any)(e.target.value)}
                  className="border border-gray-400 px-3 py-2 w-full"
                />
              </div>
            ))}
          </div>
        </section>

        {/* REQUIREMENTS */}
        <section>
          <h2 className="text-black text-[20px] font-medium mb-3">Requirements</h2>
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="border border-gray-400 px-3 py-2 w-full min-h-[80px]"
          />
        </section>

        {/* SERVICES */}
        <section>
          <h2 className="text-black text-[20px] font-medium mb-3">Services Available</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {servicesList.map((service) => (
              <label key={service} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={services[service]}
                  onChange={() => toggleService(service)}
                  className="h-4 w-4 font-[Inter]"
                />
                <span>{service}</span>
              </label>
            ))}
          </div>
        </section>

        {/* SUBMIT */}
        <footer className="pt-6 border-t border-gray-300 flex justify-end">
          <button
            type="submit"
            className="bg-black text-white px-5 py-2 text-[16px]"
          >
            Save Model
          </button>
        </footer>
      </form>
    </div>
  );
};

export default ModelFormPage;
