import React from 'react';
import { MapPin, Phone, Clock, Briefcase, Navigation, Train, Plane } from 'lucide-react';
import Layout from './components/Layout';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* Left Column - Map & Transport */}
          <div className="space-y-12">
            
            {/* Map */}
            <div>              
              {/* Google Map Embed */}
              <div className="aspect-square overflow-hidden mb-6 shadow-2xl border-2 border-amber-400/30">
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
                  bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800
                  hover:from-blue-500 hover:to-blue-700
                  text-white font-serif font-bold py-4 px-6 
                  transition-all duration-300
                  border-2 border-blue-400/50
                  shadow-xl shadow-blue-900/50
                  hover:shadow-2xl hover:-translate-y-0.5"
              >
                <Navigation className="w-5 h-5" />
                Get Directions
              </a>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>

            {/* How to Find Us */}
            <div>
              <h3 className="text-2xl font-serif font-bold text-transparent bg-clip-text 
                bg-gradient-to-r from-amber-200 to-amber-400 mb-6 tracking-wide">
                How to Find Us
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Train className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-serif font-semibold text-amber-200 mb-1">By Train</h4>
                    <p className="text-slate-300 text-sm font-serif">
                      Near Sydenham Station on the T3 Bankstown Line.<br />
                      10 minutes from Sydney CBD.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Plane className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-serif font-semibold text-amber-200 mb-1">From Airport</h4>
                    <p className="text-slate-300 text-sm font-serif">
                      Only 5 minutes drive from Sydney International Airport.<br />
                      Convenient for interstate visitors.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <div>
                    <h4 className="font-serif font-semibold text-amber-200 mb-1">By Car</h4>
                    <p className="text-slate-300 text-sm font-serif">
                      Free private parking available on-site.<br />
                      Easy access from M5 and Princes Highway.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Contact Info + Stats */}
          <div className="space-y-12">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-transparent bg-clip-text 
                bg-gradient-to-r from-amber-200 to-amber-400 mb-8 tracking-wide">
                Contact Us
              </h2>
              
              <div className="space-y-8">
                {/* Phone */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="w-6 h-6 text-amber-400" />
                    <h3 className="text-lg font-serif font-semibold text-amber-200">Phone</h3>
                  </div>
                  <a 
                    href="tel:+61417888123"
                    className="block w-full 
                      bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800
                      hover:from-amber-500 hover:to-amber-700
                      text-amber-50 font-serif font-bold py-4 px-6 
                      transition-all duration-300
                      text-center text-xl tracking-wide
                      border-2 border-amber-400/50
                      shadow-xl shadow-amber-900/50
                      hover:shadow-2xl hover:-translate-y-0.5"
                  >
                    0417 888 123
                  </a>
                </div>

                {/* Address */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-6 h-6 text-amber-400" />
                    <h3 className="text-lg font-serif font-semibold text-amber-200">Address</h3>
                  </div>
                  <p className="text-slate-300 text-lg font-serif">
                    Near Sydenham Station<br />
                    Marrickville, NSW 2204
                  </p>
                </div>

                {/* Hours */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-6 h-6 text-amber-400" />
                    <h3 className="text-lg font-serif font-semibold text-amber-200">Opening Hours</h3>
                  </div>
                  <p className="text-slate-300 text-lg font-serif">
                    Open 7 Days a Week<br />
                    9:00 AM - 2:00 AM
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>


          </div>

        </div>

        {/* Why Choose Us */}
        <div className="mb-24">
          <h2 className="text-3xl font-serif font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-amber-200 to-amber-400 mb-12 text-center tracking-wide">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <svg className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <div>
                <h4 className="font-serif font-semibold text-amber-200 mb-1">Private Parking</h4>
                <p className="text-slate-300 text-sm font-serif">Discreet and secure parking available</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <div>
                <h4 className="font-serif font-semibold text-amber-200 mb-1">Shower Facilities</h4>
                <p className="text-slate-300 text-sm font-serif">Clean, modern bathrooms with towels provided</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <div>
                <h4 className="font-serif font-semibold text-amber-200 mb-1">Clean & Professional</h4>
                <p className="text-slate-300 text-sm font-serif">Sanitized rooms after every visit</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <div>
                <h4 className="font-serif font-semibold text-amber-200 mb-1">No Booking Fee</h4>
                <p className="text-slate-300 text-sm font-serif">Transparent pricing, no hidden charges</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <div>
                <h4 className="font-serif font-semibold text-amber-200 mb-1">Diverse Selection</h4>
                <p className="text-slate-300 text-sm font-serif">The right lady for every gentleman</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <div>
                <h4 className="font-serif font-semibold text-amber-200 mb-1">Affordable Rates</h4>
                <p className="text-slate-300 text-sm font-serif">Premium service without the premium price</p>
              </div>
            </div>
          </div>
        </div>


        {/* Employment CTA */}
        <div className="border-t border-b border-amber-400/30 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Briefcase className="w-8 h-8 text-amber-400 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-serif font-bold text-transparent bg-clip-text 
                  bg-gradient-to-r from-amber-200 to-amber-400 tracking-wide">
                  Join Our Team
                </h2>
                <p className="text-slate-300 font-serif">Earn top rates in a safe, professional environment</p>
              </div>
            </div>
            <a
              href="/employment"
              className="flex-shrink-0 
                bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800
                hover:from-amber-500 hover:to-amber-700
                text-amber-50 font-serif font-bold py-4 px-8 
                transition-all duration-300
                border-2 border-amber-400/50
                shadow-xl shadow-amber-900/50
                hover:shadow-2xl hover:-translate-y-0.5"
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
    </Layout>
  );
};

export default AboutPage;