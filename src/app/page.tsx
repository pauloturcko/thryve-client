import type { Metadata } from "next";
import { LandingPage } from "@/components/Pages/Landing";

const title = "Thryve · Gestão financeira pessoal";
const description =
  "Organize receitas, despesas, contas, cartões e parcelas, acompanhe sua evolução e veja seus objetivos virarem conquistas. Mais que dinheiro, uma mentalidade de crescimento.";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "pt_BR",
    siteName: "Thryve",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const introScript = `(function(){var d=document.documentElement;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.dataset.intro="pending";setTimeout(function(){d.dataset.intro="ready"},2500)})();`;

export default function Home() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: introScript }} />
      <LandingPage />
    </>
  );
}
