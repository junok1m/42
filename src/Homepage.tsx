import Layout from './components/Layout';
import BannerCarousel from './components/BannerCarousel';
import Roster from './components/Roster';
import OurGirls from './components/OurGirls';

// Import data from JSON
import girlsData from './data/girls.json';
import bannersData from './data/banners.json';

const Homepage = () => {
  return (
    <>

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