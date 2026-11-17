import { CSSProperties, RefObject, useLayoutEffect } from "react";

// Props para um bloco que entra com fade ao aparecer na tela. A ordem atrasa a
// entrada em passos de 90ms para escalonar elementos vizinhos.
export const reveal = (order = 0) => ({
  "data-reveal": "",
  style: { "--reveal-order": order } as CSSProperties,
});

const SELECTOR = "[data-reveal]";

const isOnScreen = (element: Element) => {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
};

// Sem JavaScript ou com movimento reduzido nada fica escondido: o estado
// inicial só é aplicado depois que o observer está pronto.
export const useReveal = (rootRef: RefObject<HTMLElement | null>) => {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;

    const intersection = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.inview = "";
          intersection.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    const track = (target: HTMLElement) => {
      if (target.dataset.inview !== undefined) return;
      if (isOnScreen(target)) target.dataset.inview = "";
      else intersection.observe(target);
    };

    root.querySelectorAll<HTMLElement>(SELECTOR).forEach(track);

    // Blocos montados depois (conteúdo condicional, Fast Refresh) também entram.
    const mutations = new MutationObserver((records) => {
      records.forEach((record) =>
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(SELECTOR)) track(node);
          node.querySelectorAll<HTMLElement>(SELECTOR).forEach(track);
        })
      );
    });
    mutations.observe(root, { childList: true, subtree: true });

    root.dataset.motion = "";
    // Arma as transições só depois de um quadro pintado, para que os blocos
    // fora da tela já comecem escondidos em vez de desaparecerem com fade.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        root.dataset.motionArmed = "";
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      intersection.disconnect();
      mutations.disconnect();
      delete root.dataset.motion;
      delete root.dataset.motionArmed;
    };
  }, [rootRef]);
};
