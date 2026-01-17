import React from 'react';
import { MapPin, Phone, Clock, Briefcase, Navigation } from 'lucide-react';
import Layout from './components/Layout';

const ContactPage: React.FC = () => {
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.7366208057856!2d151.1233667!3d-33.819109299999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a59bd179ab0d%3A0x626e444e472f57b7!2s42%20Buffalo%20Rd%2C%20Gladesville%20NSW%202111!5e0!3m2!1sen!2sau!4v1768173307743!5m2!1sen!2sau"
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
                  href="https://www.google.com/maps/dir//42+Buffalo+Rd+Gladesville+NSW+2111/@-33.8191093,151.1233667,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x6b12a59bd179ab0d:0x626e444e472f57b7"
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

            </div>

            {/* Right Column - Contact Info */}
            <div className="space-y-12">
              
              {/* Contact Info */}
              <div className="p-3">
                <h2 className="text-4xl font-serif font-bold text-transparent bg-clip-text 
                  bg-gradient-to-r from-[#e8d6a8] to-[#bfa663] mb-8 tracking-wide uppercase">
                  Contact Us
                </h2>
                
                <div className="space-y-8">
                  {/* Phone */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Phone className="w-6 h-6 text-[#bfa663]" />
                      <h3 className="text-xl font-serif font-semibold text-[#e8d6a8] uppercase tracking-widest">Phone</h3>
                    </div>
                    <a 
                      href="tel:+61498100011"
                      className="block text-[#d8cfa5]/90 text-2xl font-serif font-bold hover:text-[#e8d6a8] transition-colors"
                    >
                      0498 100 011
                    </a>
                  </div>

                  {/* Address */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin className="w-6 h-6 text-[#bfa663]" />
                      <h3 className="text-xl font-serif font-semibold text-[#e8d6a8] uppercase tracking-widest">Address</h3>
                    </div>
                    <p className="text-[#d8cfa5]/90 text-xl font-serif leading-relaxed">
                      42 Buffalo Road<br />
                      Gladesville, NSW 2111
                    </p>
                  </div>

                  {/* Hours */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="w-6 h-6 text-[#bfa663]" />
                      <h3 className="text-xl font-serif font-semibold text-[#e8d6a8] uppercase tracking-widest">Opening Hours</h3>
                    </div>
                    <p className="text-[#d8cfa5]/90 text-xl font-serif leading-relaxed">
                      Open 7 Days a Week<br />
                      10:00 AM - 3:00 AM
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        



          {/* Employment CTA - ONLY BOX */}
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

export default ContactPage;