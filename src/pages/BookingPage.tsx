import React, { useState } from "react";

const providersList = ["A", "B", "C", "D"];

const timeSlots = [
  "10:00am",
  "10:30am",
  "11:00am",
  "11:30am",
  "12:00pm",
  "1:00pm",
  "3:00pm",
  "4:00pm",
];

const standardDurations = [
  { label: "30 mins", value: "30" },
  { label: "45 mins", value: "45" },
  { label: "60 mins", value: "60" },
];

const specialDurations = [
  { label: "90 mins", value: "90", price: "$xxx" },
  { label: "120 mins", value: "120", price: "$xxx" },
  { label: "150 mins", value: "150", price: "$xxx" },
  { label: "180 mins", value: "180", price: "$xxx" },
];

const BookingPage: React.FC = () => {
  // Customer Info (P.1)
  const [customerName, setCustomerName] = useState("");
  const [nationality, setNationality] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [wechat, setWechat] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // Scheduling
  const [bookingDate, setBookingDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [timeSlot, setTimeSlot] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");

  // Duration (P.2)
  const [duration, setDuration] = useState("");

  // Tracking
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      customer: {
        name: customerName,
        nationality,
        contact: {
          mobile: mobileNo,
          wechat,
          whatsapp,
        },
      },
      booking: {
        date: bookingDate,
        time: timeSlot,
        provider: selectedProvider,
        duration,
      },
      tracking: {
        totalBookings,
        totalAmount,
      },
    };
    console.log("BOOKING SUBMIT ->", payload);
  };

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      // Reset form
      setCustomerName("");
      setNationality("");
      setMobileNo("");
      setWechat("");
      setWhatsapp("");
      setTimeSlot("");
      setSelectedProvider("");
      setDuration("");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}/${month}`;
  };

  return (
    <div className="min-h-screen flex justify-center px-4 py-8 font-[Inter] text-[16px] text-black bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl p-6 md:p-10 space-y-10"
      >
        <header className="text-center">
          <h1 className="text-black font-sans text-[20px] font-medium">
            New Customer Booking
          </h1>
          <p className="text-gray-600 text-[16px] font-sans">
            Internal use only. Read roster page before booking.
          </p>
        </header>

        {/* PAGE 1: CUSTOMER INFORMATION */}
        <section>
          <h2 className="font-sans text-[20px] font-medium mb-3 text-black">
            Customer Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-700">Name</label>
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="border border-gray-400 px-3 py-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Nationality</label>
              <input
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="border border-gray-400 px-3 py-2 w-full"
              />
            </div>
          </div>

          <h3 className="font-sans text-[18px] font-medium mt-6 mb-3 text-black">
            Contact Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-gray-700">Mobile No.</label>
              <input
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                className="border border-gray-400 px-3 py-2 w-full"
                type="tel"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">WeChat</label>
              <input
                value={wechat}
                onChange={(e) => setWechat(e.target.value)}
                className="border border-gray-400 px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">WhatsApp</label>
              <input
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="border border-gray-400 px-3 py-2 w-full"
              />
            </div>
          </div>
          <p className="font-sans text-md text-gray-500 mt-2">
            Can add any boxes later as needed
          </p>
        </section>

        {/* SCHEDULING & PROVIDER SELECTION */}
        <section>
          <h2 className="font-sans text-[20px] font-medium mb-3 text-black">
            Schedule & Provider
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-gray-700">
                Date (Auto-corrects to current date)
              </label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="border border-gray-400 px-3 py-2 w-full"
                required
              />
              <p className="font-sans text-md text-gray-500 mt-1">
                Format: {formatDate(bookingDate)}
              </p>
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Time Slot</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="border border-gray-400 px-3 py-2 w-full"
                required
              >
                <option value="">Select time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Provider</label>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="border border-gray-400 px-3 py-2 w-full"
                required
              >
                <option value="">Select provider</option>
                {providersList.map((provider) => (
                  <option key={provider} value={provider}>
                    Provider {provider}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* PAGE 2: DURATION & SPECIAL OPTIONS */}
        <section>
          <h2 className="font-sans text-[20px] font-medium mb-3 text-black">
            Duration
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-sans text-[18px] font-medium mb-2 text-black">
                Standard Durations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {standardDurations.map((d) => (
                  <label
                    key={d.value}
                    className={`border-2 p-4 cursor-pointer transition-all ${
                      duration === d.value
                        ? "border-black bg-gray-100"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="duration"
                      value={d.value}
                      checked={duration === d.value}
                      onChange={(e) => setDuration(e.target.value)}
                      className="mr-2"
                    />
                    <span className="font-sans font-medium">{d.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-sans text-[18px] font-medium mb-2 text-black">
                Special Options
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specialDurations.map((d) => (
                  <label
                    key={d.value}
                    className={`border-2 p-4 cursor-pointer transition-all ${
                      duration === d.value
                        ? "border-black bg-gray-100"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="duration"
                      value={d.value}
                      checked={duration === d.value}
                      onChange={(e) => setDuration(e.target.value)}
                      className="mr-2"
                    />
                    <span className="font-sans font-medium">
                      {d.label} - {d.price}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BOOKING TRACKING */}
        <section>
          <h2 className="font-sans text-[20px] font-medium mb-3 text-black">
            Booking Summary (Review Only)
          </h2>
          <div className="border border-gray-300 p-4 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">
                  Total Booking Number
                </label>
                <input
                  type="number"
                  value={totalBookings}
                  onChange={(e) => setTotalBookings(Number(e.target.value))}
                  className="border border-gray-400 px-3 py-2 w-full bg-white"
                  readOnly
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700 font-medium">
                  Total Amount Working from Booking
                </label>
                <input
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(Number(e.target.value))}
                  className="border border-gray-400 px-3 py-2 w-full bg-white"
                  readOnly
                />
              </div>
            </div>
            <p className="font-sans text-md text-gray-500 mt-2 italic">
              Auto-calculated fields for review purposes
            </p>
          </div>
        </section>

        {/* ACTION BUTTONS */}
        <footer className="pt-6 border-t border-gray-300 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="border-2 border-gray-400 text-black px-5 py-2 text-[16px] hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-black text-white px-5 py-2 text-[16px] hover:bg-gray-800"
          >
            Add Booking
          </button>
        </footer>
      </form>
    </div>
  );
};

export default BookingPage;