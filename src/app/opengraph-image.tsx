import { ImageResponse } from "next/og";
import {
  WORDMARK_PATH,
  WORDMARK_VIEW_BOX,
  Y_PATH,
} from "@/components/Atoms/Logo";

export const alt = "Thryve · Seu dinheiro em ordem. Sua vida em movimento.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background:
          "radial-gradient(900px 500px at 10% -10%, rgba(248,250,252,0.12), transparent 70%), #0B0D10",
        color: "#F8FAFC",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          fontSize: 22,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#B4BBC5",
        }}
      >
        <svg
          width="28"
          height="38"
          viewBox="1021 246 244 327"
        >
          <path
            d={Y_PATH}
            fill="#F8FAFC"
          />
        </svg>
        Gestão financeira pessoal
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 84, letterSpacing: -3, lineHeight: 1 }}>
          Seu dinheiro em ordem.
        </span>
        <span
          style={{
            fontSize: 84,
            letterSpacing: -3,
            lineHeight: 1,
            color: "#717B89",
          }}
        >
          Sua vida em movimento.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingTop: 28,
          borderTop: "1px solid #3D444D",
          fontSize: 24,
          color: "#B4BBC5",
        }}
      >
        <svg
          width="150"
          height="50"
          viewBox={WORDMARK_VIEW_BOX}
        >
          <path
            d={WORDMARK_PATH}
            fill="#F8FAFC"
            fillRule="evenodd"
          />
        </svg>
        <span>More than money. A mindset for growth.</span>
      </div>
    </div>,
    size
  );
}
