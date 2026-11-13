import { RefObject, useLayoutEffect } from "react";
import { PREVIEW_WIDTH } from "../DashboardPreview/styles";

const COMPACT_QUERY = "(max-width: 720px)";
const COMPACT_SCALE = 0.5;
// Permite ampliar um pouco a janela de 1180px para ela ocupar a largura do
// header (1240px) nas telas largas.
const MAX_SCALE = 1.1;

// Ajusta a escala da prévia à largura da coluna. Fica em JS porque converter
// largura em número só com CSS (tan/atan2 com unidades de container) não é
// confiável em todos os navegadores: em alguns a prévia saía invertida.
export const usePreviewScale = (frameRef: RefObject<HTMLElement | null>) => {
  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;

    const compact = window.matchMedia(COMPACT_QUERY);
    const update = () => {
      const scale = compact.matches
        ? COMPACT_SCALE
        : Math.min(MAX_SCALE, frame.clientWidth / PREVIEW_WIDTH);
      frame.style.setProperty("--scale", scale.toFixed(4));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    compact.addEventListener("change", update);

    return () => {
      observer.disconnect();
      compact.removeEventListener("change", update);
    };
  }, [frameRef]);
};
