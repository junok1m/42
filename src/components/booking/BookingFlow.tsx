import { useState } from "react";
import { Calendar, Clock } from "lucide-react";

interface BookingFlowProps {
  provider: any;
  onBack: () => void;
}

function BookingFlow({ provider, onBack }: BookingFlowProps) {
  const [selectedDate, setSelectedDate] = useState("2026-07-23");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState<30 | 45 | 60>(60);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [notes, setNotes] = useState("");

  const durations = [30, 45, 60] as const;
  const availableTimes = ["13:00", "14:00", "15:30", "17:00", "19:30", "21:00"];

  const handleConfirm = () => {
    if (!selectedTime || !clientName || !clientPhone) {
      alert("Please fill in time, name, and phone number.");
      return;
    }
    const isConfirmed = window.confirm(
        `⚠️ Important Reminder\n\n` +
        `You are about to pay a $50 non-refundable deposit.\n\n` +
        `If you cancel within 12 hours of the booking time, the deposit will NOT be refunded.\n\n` +
        `Do you want to proceed?`
      );
    
      if (!isConfirmed) return;

    alert(`Deposit Paid - Booking Confirmed!\n${provider?.name} | ${selectedDate} ${selectedTime} (${selectedDuration}min)`);
  };

  return (
    <div className="h-full overflow-auto p-5 sm:p-6 text-[#e8d6a8]">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="mb-8 text-center border-b border-[#bfa663]/20 pb-6">
          <h2 className="text-3xl font-serif text-[#ead9aa]">
            Book with {provider?.name}
          </h2>
          <p className="text-[#d8cfa5] mt-1">Deposit $50 to secure</p>
        </div>

        {/* Warning */}
        <div className="mb-8 p-4 bg-[#1a0f0f] border border-[#8b2424]/60 text-sm text-[#f0a0a0]">
          <p className="font-medium">※ Important</p>
          <p>Bookings are non-refundable if canceled within 12 hours of the scheduled time.</p>
        </div>

        {/* Date */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5" />
            <h3 className="font-medium">Select Date</h3>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-[#1a1610] border border-[#bfa663]/30 p-4 text-white"
          />
        </div>

        {/* Time Slots */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5" />
            <h3 className="font-medium">Available Times</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-3.5 text-sm border border-[#bfa663]/30 hover:border-[#d4af37] transition-all ${
                  selectedTime === time 
                    ? "bg-[#d4af37] text-black" 
                    : "bg-[#1a1610] hover:bg-[#2a2212]"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="mb-8">
          <h3 className="font-medium mb-3">Session Duration</h3>
          <div className="grid grid-cols-3 gap-2">
            {durations.map((dur) => (
              <button
                key={dur}
                onClick={() => setSelectedDuration(dur)}
                className={`py-3.5 text-sm border border-[#bfa663]/30 hover:border-[#d4af37] transition-all ${
                  selectedDuration === dur 
                    ? "bg-[#d4af37] text-black" 
                    : "bg-[#1a1610]"
                }`}
              >
                {dur} min
              </button>
            ))}
          </div>
        </div>

        {/* Client Info */}
        <div className="space-y-6 mb-10">
          <div>
            <label className="block text-sm mb-2">Name</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-[#1a1610] border border-[#bfa663]/30 p-4"
              placeholder="Full name"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Phone Number</label>
            <input
              type="tel"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full bg-[#1a1610] border border-[#bfa663]/30 p-4"
              placeholder="0412 345 678"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Special Request</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#1a1610] border border-[#bfa663]/30 p-4 h-28 resize-y"
              placeholder="Any special requests..."
            />
          </div>
        </div>

        {/* Summary & Confirm */}
        <div className="pt-6 border-t border-[#bfa663]/30">
          <div className="space-y-4 mb-8 text-sm">
            <div className="flex justify-between">
              <span className="text-[#d8cfa5]">Session</span>
              <span>{selectedDuration} minutes</span>
            </div>
            {selectedTime && (
              <div className="flex justify-between">
                <span className="text-[#d8cfa5]">Date & Time</span>
                <span>{selectedDate} {selectedTime}</span>
              </div>
            )}
            <div className="flex justify-between pt-4 border-t border-[#bfa663]/20">
              <span className="text-[#d8cfa5]">Deposit</span>
              <span className="text-3xl font-serif text-[#ead9aa]">$50</span>
            </div>
          </div>
          {/* Privacy Notice */}
<div className="mt-4 p-4 bg-[#1a0f0f] border border-[#bfa663]/20 text-xs text-[#d8cfa5]/70">
  <p className="font-medium text-[#ead9aa] mb-2">Privacy &amp; Confidentiality</p>
  <ul className="space-y-1 list-disc list-inside text-[13px]">
    <li>All bookings and communications are strictly confidential</li>
    <li>We do not share your personal information with third parties</li>
    <li>Your card details are processed securely by Stripe and never stored by us</li>
    <li>Session details are kept private between you and the provider</li>
  </ul>
</div>
{/* Payment Disclaimer */}
<div className="mt-6 p-4 bg-[#1a0f0f] border border-[#bfa663]/20 text-xs text-[#d8cfa5]/70 rounded-none">
  <p className="mb-2 font-medium text-[#ead9aa]">Payment Information</p>
  <ul className="space-y-1 list-disc list-inside">
    <li>Payment processed securely via <strong>Stripe</strong></li>
    <li>Statement will show as "STRIPE" or " discreet payment" (no brothel name)</li>
    <li>We do not store your card details</li>
    <li>$50 deposit is non-refundable if canceled within 12 hours</li>
    <li>Remaining balance payable on arrival</li>
  </ul>
</div>

          <button
            onClick={handleConfirm}
            disabled={!selectedTime || !clientName || !clientPhone}
            className="w-full py-4 bg-[#d4af37] hover:bg-[#e8c14a] text-black font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Pay $50 Deposit & Confirm Booking
          </button>
        </div>

        <button 
          onClick={onBack}
          className="mt-10 text-[#d8cfa5] hover:text-white text-sm block mx-auto"
        >
          ← Back to Profile
        </button>
      </div>
    </div>
  );
}

export default BookingFlow;