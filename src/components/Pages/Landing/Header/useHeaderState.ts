import { useEffect, useState } from "react";
import { Tone } from "../theme";

type HeaderState = {
  tone: Tone;
  activeId: string;
  scrolled: boolean;
};

const INITIAL_STATE: HeaderState = {
  tone: "dark",
  activeId: "",
  scrolled: false,
};

// Lê qual seção está passando sob a linha do header. Seções aninhadas (como
// um painel escuro dentro de uma seção clara) vencem por virem depois no DOM.
export const useHeaderState = (probeY = 36) => {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      let tone: Tone = "dark";
      let activeId = "";
      document.querySelectorAll<HTMLElement>("[data-tone]").forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.top > probeY || rect.bottom <= probeY) return;
        tone = node.dataset.tone === "light" ? "light" : "dark";
        if (node.id) activeId = node.id;
      });
      const scrolled = window.scrollY > 12;

      setState((previous) =>
        previous.tone === tone &&
        previous.activeId === activeId &&
        previous.scrolled === scrolled
          ? previous
          : { tone, activeId, scrolled }
      );
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [probeY]);

  return state;
};
