"use client";

import { ReactNode } from "react";
import { Mic, RotateCcw } from "lucide-react";
import { YMark } from "@/components/Atoms/YMark";
import { BallSlot } from "./BallSlot";
import { useVoiceDemo, VoicePhase } from "./useVoiceDemo";
import * as S from "./styles";

const SENTENCE = "Hoje gastei 27 reais no mercado.";

const STEPS: { phase: VoicePhase; title: string; text: string }[] = [
  {
    phase: "listening",
    title: "Fala",
    text: "Você toca na esfera e diz o que gastou, do jeito que falaria com alguém.",
  },
  {
    phase: "transcribing",
    title: "Transcrição",
    text: "A frase vira texto.",
  },
  {
    phase: "parsing",
    title: "Dados identificados",
    text: "Valor, descrição e tipo da transação são extraídos da frase.",
  },
  {
    phase: "review",
    title: "Registro pendente de revisão",
    text: "O pré-cadastro entra na sua conta. Se faltar informação ou houver ambiguidade, ele espera a sua revisão.",
  },
];

const ORDER: VoicePhase[] = [
  "idle",
  "listening",
  "transcribing",
  "parsing",
  "review",
];

const FIELDS = [
  { label: "Valor", value: "R$ 27,00" },
  { label: "Descrição", value: "Mercado" },
  { label: "Tipo", value: "Despesa" },
  { label: "Data", value: "Hoje" },
];

const ANNOUNCEMENTS: Record<VoicePhase, string> = {
  idle: "",
  listening: "Demonstração iniciada. Ouvindo.",
  transcribing: `Transcrição: ${SENTENCE}`,
  parsing:
    "Dados identificados: valor de 27 reais, descrição mercado, tipo despesa, data de hoje.",
  review:
    "Registro criado e pendente de revisão. Falta informar a conta usada no pagamento.",
};

const stepState = (step: VoicePhase, current: VoicePhase) => {
  const position = ORDER.indexOf(current) - ORDER.indexOf(step);
  if (position < 0) return "upcoming";
  if (position === 0 && current !== "review") return "active";
  return "done";
};

type VoiceDemoProps = {
  intro: ReactNode;
};

export const VoiceDemo = ({ intro }: VoiceDemoProps) => {
  const { phase, run, running, play } = useVoiceDemo();
  const reached = (target: VoicePhase) =>
    ORDER.indexOf(phase) >= ORDER.indexOf(target);

  return (
    <S.Layout>
      <S.Story>
        <S.Intro>{intro}</S.Intro>
        <S.Steps>
          {STEPS.map((step, index) => {
            const state = stepState(step.phase, phase);
            return (
              <S.Step
                key={step.phase}
                data-state={state}
                aria-current={state === "active" ? "step" : undefined}
              >
                <S.StepNumber>{index + 1}</S.StepNumber>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </div>
              </S.Step>
            );
          })}
        </S.Steps>
        <S.Controls>
          <S.PlayButton
            type="button"
            onClick={play}
            aria-disabled={running}
          >
            {phase === "review" ? (
              <RotateCcw
                size={16}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            ) : (
              <Mic
                size={16}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            )}
            {phase === "review"
              ? "Repetir demonstração"
              : "Simular registro por voz"}
          </S.PlayButton>
          <S.Disclaimer>
            Demonstração com dados fictícios. Nenhum áudio é captado.
          </S.Disclaimer>
        </S.Controls>
        <S.VisuallyHidden
          role="status"
          aria-live="polite"
        >
          {ANNOUNCEMENTS[phase]}
        </S.VisuallyHidden>
      </S.Story>

      <S.PhoneColumn>
        <S.Phone aria-hidden="true">
          <S.Screen data-phase={phase}>
            <S.Island />
            <S.StatusBar>
              <span>9:41</span>
              <S.StatusIcons>
                <i />
                <i />
                <i />
              </S.StatusIcons>
            </S.StatusBar>
            <S.ScreenHeader>
              <YMark />
              <span>Registro por voz</span>
            </S.ScreenHeader>
            {/* Atalho para toque e mouse; pelo teclado, o botão ao lado faz o mesmo. */}
            <S.BallTouch onClick={play}>
              <BallSlot phase={phase} />
            </S.BallTouch>
            <S.Caption>
              {phase === "idle" && "Toque na esfera e diga o que gastou."}
              {phase === "listening" && (
                <S.Listening>
                  Ouvindo
                  <i />
                  <i />
                  <i />
                </S.Listening>
              )}
              {reached("transcribing") && (
                <S.Transcript key={run}>
                  {SENTENCE.split(" ").map((word, index) => (
                    <span
                      key={`${word}-${index}`}
                      style={{ ["--word" as string]: index }}
                    >
                      {word}{" "}
                    </span>
                  ))}
                </S.Transcript>
              )}
            </S.Caption>
            <S.ResultArea>
              <S.ResultPlaceholder
                data-visible={reached("parsing") ? undefined : ""}
              >
                O pré-cadastro aparece aqui, pronto para a sua revisão.
              </S.ResultPlaceholder>
              <S.Result data-visible={reached("parsing") ? "" : undefined}>
                <S.ResultHeader>
                  <span>Pré-cadastro</span>
                  <S.Pending data-visible={reached("review") ? "" : undefined}>
                    Pendente de revisão
                  </S.Pending>
                </S.ResultHeader>
                <S.Fields>
                  {FIELDS.map((field, index) => (
                    <div
                      key={field.label}
                      style={{ ["--field" as string]: index }}
                    >
                      <dt>{field.label}</dt>
                      <dd>{field.value}</dd>
                    </div>
                  ))}
                </S.Fields>
                <S.ReviewNote data-visible={reached("review") ? "" : undefined}>
                  Falta informar a conta usada no pagamento.
                </S.ReviewNote>
              </S.Result>
            </S.ResultArea>
          </S.Screen>
        </S.Phone>
      </S.PhoneColumn>
    </S.Layout>
  );
};
