import React from 'react';
import { MapPin, Phone, Clock, Briefcase, Navigation, Train, Plane } from 'lucide-react';
import Layout from './components/Layout';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <section className="relative bg-gradient-to-b from-transparent via-[#0b0b0b]/90 to-transparent">
        <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            
            {/* Left Column - Map & Transport */}
            <div className="space-y-12">
              
              {/* Map */}
              <div>              
                {/* Google Map Embed */}
                <div className="aspect-square overflow-hidden mb-6 border border-[#bfa663]/40 shadow-[0_0_40px_rgba(191,166,99,0.15)]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.5147!2d151.1537!3d-33.9156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDU0JzU2LjIiUyAxNTHCsDA5JzEzLjMiRQ!5e0!3m2!1sen!2sau!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="No.5 Marrickville Location"
                  />
                </div>

                {/* Get Directions Button */}
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Sydenham+Station+Marrickville+NSW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full 
                    bg-[#14120f]/80 hover:bg-[#1a1813]
                    border border-[#bfa663]/50 hover:border-[#bfa663]
                    text-[#e8d6a8] font-serif font-bold py-4 px-6 
                    transition-all duration-300
                    shadow-[0_0_20px_rgba(191,166,99,0.15)]
                    hover:shadow-[0_0_30px_rgba(191,166,99,0.3)]
                    uppercase tracking-widest"
                >
                  <Navigation className="w-5 h-5" />
                  Get Directions
                </a>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#bfa663]/40 to-transparent"></div>

              {/* How to Find Us */}
              <div>
                <h3 className="text-3xl font-serif font-bold text-transparent bg-clip-text 
                  bg-gradient-to-r from-[#e8d6a8] to-[#bfa663] mb-8 tracking-wide uppercase">
                  How to Find Us
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 bg-[#0b0b0b]/20 border-l-2 border-[#bfa663] p-4">
                    <Train className="w-6 h-6 text-[#bfa663] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-serif font-semibold text-[#e8d6a8] mb-2 text-xl uppercase tracking-widest">By Train</h4>
                      <p className="text-[#d8cfa5]/90 font-serif leading-relaxed">
                        Near Sydenham Station on the T3 Bankstown Line.<br />
                        10 minutes from Sydney CBD.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-[#0b0b0b]/20 border-l-2 border-[#bfa663] p-4">
                    <Plane className="w-6 h-6 text-[#bfa663] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-serif font-semibold text-[#e8d6a8] mb-2 text-xl uppercase tracking-widest">From Airport</h4>
                      <p className="text-[#d8cfa5]/90 font-serif leading-relaxed">
                        Only 5 minutes drive from Sydney International Airport.<br />
                        Convenient for interstate visitors.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-[#0b0b0b]/20 border-l-2 border-[#bfa663] p-4">
                    <svg className="w-6 h-6 text-[#bfa663] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <div>
                      <h4 className="font-serif font-semibold text-[#e8d6a8] mb-2 text-xl uppercase tracking-widest">By Car</h4>
                      <p className="text-[#d8cfa5]/90 font-serif leading-relaxed">
                        Free private parking available on-site.<br />
                        Easy access from M5 and Princes Highway.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column - Contact Info */}
            <div className="space-y-12">
              
              {/* Contact Info */}
              <div>
                <h2 className="text-4xl font-serif font-bold text-transparent bg-clip-text 
                  bg-gradient-to-r from-[#e8d6a8] to-[#bfa663] mb-8 tracking-wide uppercase">
                  Contact Us
                </h2>
                
                <div className="space-y-8">
                  {/* Phone */}
                  <div className="bg-[#14120f]/70 border border-[#bfa663]/30 p-6 shadow-[0_0_30px_rgba(191,166,99,0.12)]">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#bfa663]/20">
                      <Phone className="w-6 h-6 text-[#bfa663]" />
                      <h3 className="text-xl font-serif font-semibold text-[#e8d6a8] uppercase tracking-widest">Phone</h3>
                    </div>
                    <a 
                      href="tel:+61417888123"
                      className="block w-full text-center
                        bg-[#14120f]/80 hover:bg-[#1a1813]
                        border border-[#bfa663]/50 hover:border-[#bfa663]
                        text-[#e8d6a8] font-serif font-bold py-4 px-6 
                        transition-all duration-300
                        text-2xl tracking-wide
                        shadow-[0_0_20px_rgba(191,166,99,0.15)]
                        hover:shadow-[0_0_30px_rgba(191,166,99,0.3)]"
                    >
                      0417 888 123
                    </a>
                  </div>

                  {/* Address */}
                  <div className="bg-[#14120f]/70 border border-[#bfa663]/30 p-6 shadow-[0_0_30px_rgba(191,166,99,0.12)]">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#bfa663]/20">
                      <MapPin className="w-6 h-6 text-[#bfa663]" />
                      <h3 className="text-xl font-serif font-semibold text-[#e8d6a8] uppercase tracking-widest">Address</h3>
                    </div>
                    <p className="text-[#d8cfa5]/90 text-xl font-serif leading-relaxed">
                      Near Sydenham Station<br />
                      Marrickville, NSW 2204
                    </p>
                  </div>

                  {/* Hours */}
                  <div className="bg-[#14120f]/70 border border-[#bfa663]/30 p-6 shadow-[0_0_30px_rgba(191,166,99,0.12)]">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#bfa663]/20">
                      <Clock className="w-6 h-6 text-[#bfa663]" />
                      <h3 className="text-xl font-serif font-semibold text-[#e8d6a8] uppercase tracking-widest">Opening Hours</h3>
                    </div>
                    <p className="text-[#d8cfa5]/90 text-xl font-serif leading-relaxed">
                      Open 7 Days a Week<br />
                      9:00 AM - 2:00 AM
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#bfa663]/40 to-transparent mb-16"></div>

          {/* Why Choose Us */}
          <div className="mb-24">
            <h2 className="text-4xl font-serif font-bold text-transparent bg-clip-text 
              bg-gradient-to-r from-[#e8d6a8] to-[#bfa663] mb-12 text-center tracking-wide uppercase">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#14120f]/70 border border-[#bfa663]/30 p-6 shadow-[0_0_30px_rgba(191,166,99,0.12)] hover:border-[#bfa663]/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-[#bfa663] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <h4 className="font-serif font-semibold text-[#e8d6a8] mb-2 text-xl uppercase tracking-widest">Private Parking</h4>
                    <p className="text-[#d8cfa5]/90 font-serif leading-relaxed">Discreet and secure parking available</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#14120f]/70 border border-[#bfa663]/30 p-6 shadow-[0_0_30px_rgba(191,166,99,0.12)] hover:border-[#bfa663]/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-[#bfa663] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <h4 className="font-serif font-semibold text-[#e8d6a8] mb-2 text-xl uppercase tracking-widest">Shower Facilities</h4>
                    <p className="text-[#d8cfa5]/90 font-serif leading-relaxed">Clean, modern bathrooms with towels provided</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#14120f]/70 border border-[#bfa663]/30 p-6 shadow-[0_0_30px_rgba(191,166,99,0.12)] hover:border-[#bfa663]/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-[#bfa663] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <h4 className="font-serif font-semibold text-[#e8d6a8] mb-2 text-xl uppercase tracking-widest">Clean & Professional</h4>
                    <p className="text-[#d8cfa5]/90 font-serif leading-relaxed">Sanitized rooms after every visit</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#14120f]/70 border border-[#bfa663]/30 p-6 shadow-[0_0_30px_rgba(191,166,99,0.12)] hover:border-[#bfa663]/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-[#bfa663] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <h4 className="font-serif font-semibold text-[#e8d6a8] mb-2 text-xl uppercase tracking-widest">No Booking Fee</h4>
                    <p className="text-[#d8cfa5]/90 font-serif leading-relaxed">Transparent pricing, no hidden charges</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#14120f]/70 border border-[#bfa663]/30 p-6 shadow-[0_0_30px_rgba(191,166,99,0.12)] hover:border-[#bfa663]/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-[#bfa663] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <h4 className="font-serif font-semibold text-[#e8d6a8] mb-2 text-xl uppercase tracking-widest">Diverse Selection</h4>
                    <p className="text-[#d8cfa5]/90 font-serif leading-relaxed">The right lady for every gentleman</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#14120f]/70 border border-[#bfa663]/30 p-6 shadow-[0_0_30px_rgba(191,166,99,0.12)] hover:border-[#bfa663]/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-[#bfa663] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <h4 className="font-serif font-semibold text-[#e8d6a8] mb-2 text-xl uppercase tracking-widest">Affordable Rates</h4>
                    <p className="text-[#d8cfa5]/90 font-serif leading-relaxed">Premium service without the premium price</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#bfa663]/40 to-transparent mb-12"></div>

          {/* Employment CTA */}
          <div className="bg-[#14120f]/70 border border-[#bfa663]/30 p-8 shadow-[0_0_40px_rgba(191,166,99,0.15)]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Briefcase className="w-8 h-8 text-[#bfa663] flex-shrink-0" />
                <div>
                  <h2 className="text-3xl font-serif font-bold text-transparent bg-clip-text 
                    bg-gradient-to-r from-[#e8d6a8] to-[#bfa663] tracking-wide uppercase">
                    Join Our Team
                  </h2>
                  <p className="text-[#d8cfa5]/90 font-serif text-xl">Earn top rates in a safe, professional environment</p>
                </div>
              </div>
              <a
                href="/employment"
                className="flex-shrink-0 
                  bg-[#14120f]/80 hover:bg-[#1a1813]
                  border border-[#bfa663]/50 hover:border-[#bfa663]
                  text-[#e8d6a8] font-serif font-bold py-4 px-8 
                  transition-all duration-300
                  shadow-[0_0_20px_rgba(191,166,99,0.15)]
                  hover:shadow-[0_0_30px_rgba(191,166,99,0.3)]
                  uppercase tracking-widest"
              >
                View Opportunities
              </a>
            </div>
          </div>

          {/* SEO Hidden Text */}
          <div className="sr-only">
            <p>
              N5M is Sydney's premier brothel without the exorbitant fees. We offer Sophisticated Elegance 
              at the most affordable price without any compromise in quality and service. N5M is located near 
              Sydenham train station, 10 minutes from Sydney CBD and 5 minutes from Sydney International airport. 
              With a huge number of ladies associated with us, we have the right lady for every gentleman.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;