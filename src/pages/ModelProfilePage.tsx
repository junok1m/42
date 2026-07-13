// src/pages/ModelProfilePage.tsx

import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Layout from "../components/Layout";
import ModelProfileContent from "../components/profile/ModelProfileContent";

interface ProfileLocationState {
  workingTime?: string;
}

function ModelProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const state = location.state as ProfileLocationState | null;
  const workingTime = state?.workingTime;

  const handleBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
      return;
    }

    navigate({
      pathname: "/",
      hash: "#roster",
    });
  };

  return (
    <Layout>
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-6">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 border border-[#bfa663]/40 bg-[#14120f]/60 px-3 py-2 font-serif text-xl text-[#e8d6a8] transition-all hover:border-[#bfa663]/60 hover:bg-[#1a1813]/70"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("common.back")}
        </button>
      </div>

      <ModelProfileContent
        workingTime={workingTime}
        variant="page"
      />
    </Layout>
  );
}

export default ModelProfilePage;