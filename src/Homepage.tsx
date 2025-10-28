import { useState } from 'react';
import Layout from './components/Layout';
import AgeVerificationModal from './components/AgeVerificationModal';
import BannerCarousel from './components/BannerCarousel';
import Roster from './components/Roster';
import OurGirls from './components/OurGirls';

// Import data from JSON
import girlsData from './data/girls.json';
import bannersData from './data/banners.json';

const Homepage = () => {
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  // Age Verification Handlers
  const handleAgree = () => {
    setIsAgeVerified(true);
  };

  const handleDisagree = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <>
      {/* Age Verification Modal */}
      {!isAgeVerified && (
        <AgeVerificationModal
          onAgree={handleAgree}
          onDisagree={handleDisagree}
        />
      )}

      {/* Main Content */}
      <Layout>
        {/* Banner Carousel */}
        <BannerCarousel newsItems={bannersData.banners} />

        {/* Roster Section */}
        <Roster
          rosterToday={girlsData.rosterToday}
          rosterTomorrow={girlsData.rosterTomorrow}
        />

        {/* Our Girls Carousel */}
        <OurGirls models={girlsData.models} />
      </Layout>
    </>
  );
};

export default Homepage;