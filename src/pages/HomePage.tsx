import Layout from "../components/Layout";
import NewsStrip from "../components/NewsStrip";
import Roster from "../components/Roster";
import { useHomeData } from "../hooks/useHomeData";

const HomePage = () => {
  const {
    loading,
    apiError,
    news,
    rosterToday,
    rosterTomorrow,
  } = useHomeData();

  return (
    <Layout>
      {apiError && (
        <div className="mx-6 mt-6 border border-red-500/40 bg-red-900/20 p-3 text-sm text-red-300">
          API error: {apiError}
        </div>
      )}

      <NewsStrip items={news} />

      <Roster
        rosterToday={rosterToday}
        rosterTomorrow={rosterTomorrow}
        loading={loading}
      />
    </Layout>
  );
};

export default HomePage;