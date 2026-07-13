import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface LocationState {
  backgroundLocation?: unknown;
}

const ScrollManager = () => {
  const location = useLocation();
  const { pathname, hash } = location;

  const state = location.state as LocationState | null;
  const isModalNavigation = Boolean(state?.backgroundLocation);

  useEffect(() => {
    if (isModalNavigation) return;

    if (hash) {
      requestAnimationFrame(() => {
        const el = document.querySelector(hash);

        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });

      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [pathname, hash, isModalNavigation]);

  return null;
};

export default ScrollManager;