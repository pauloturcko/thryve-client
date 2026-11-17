"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useScroll, useTransform } from "motion/react";
import { YMark } from "@/components/Atoms/YMark";
import { Section } from "../Section";
import { Container, TextLink } from "../styles";
import { reveal } from "../useReveal";
import * as S from "./styles";

export const Manifesto = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <Section
      id="manifesto"
      tone="dark"
      grain
      labelledBy="manifesto-title"
    >
      <S.Watermark
        aria-hidden="true"
        style={{ y: drift }}
      >
        <S.WatermarkMark {...reveal()}>
          <YMark variant="outline" />
        </S.WatermarkMark>
      </S.Watermark>
      <Container>
        <S.Page ref={pageRef}>
          <S.Statement
            id="manifesto-title"
            {...reveal(1)}
          >
            <em>Prosperar</em> vai além de acumular dinheiro.
            <sup>
              <a
                href="#manifesto-nota"
                aria-label="Ver nota sobre a inspiração do manifesto"
              >
                1
              </a>
            </sup>
          </S.Statement>

          <S.Columns>
            <S.Lede {...reveal(0)}>
              É ter clareza sobre o presente, coragem para definir objetivos e
              disciplina para construir o futuro.
            </S.Lede>
            <S.Body {...reveal(1)}>
              <p>
                Acreditamos que grandes transformações começam com pequenas
                decisões. Que o progresso merece ser reconhecido. E que
                compreender a própria realidade financeira é um passo importante
                para conquistar liberdade.
              </p>
              <p>
                A Thryve nasceu para transformar números em consciência,
                objetivos em direção e progresso em motivação.
              </p>
            </S.Body>
            <S.Entry {...reveal(2)}>
              <S.EntryHead>
                <dfn>thryve</dfn>
                <span>/θraɪv/</span>
              </S.EntryHead>
              <p>
                Estilização do verbo inglês <i lang="en">thrive</i>.
              </p>
              <ol>
                <li>Prosperar.</li>
                <li>Florescer.</li>
                <li>Desenvolver-se plenamente.</li>
              </ol>
            </S.Entry>
          </S.Columns>

          <S.Closing {...reveal(0)}>
            <S.ClosingMark>
              <YMark />
            </S.ClosingMark>
            <p>
              <span>Porque dinheiro é parte da vida.</span>
              <strong>Não a vida inteira.</strong>
            </p>
          </S.Closing>

          <S.Colophon {...reveal(0)}>
            <S.Footnote id="manifesto-nota">
              <sup>1</sup>A filosofia da Thryve foi inspirada por reflexões
              presentes em <cite>Pense e Enriqueça</cite> e{" "}
              <cite>Mais Esperto que o Diabo</cite>, de Napoleon Hill.
            </S.Footnote>
            <TextLink
              as={Link}
              href="/login"
            >
              Criar conta ou entrar
              <ArrowRight
                aria-hidden="true"
                strokeWidth={1.75}
              />
            </TextLink>
          </S.Colophon>
        </S.Page>
      </Container>
    </Section>
  );
};
