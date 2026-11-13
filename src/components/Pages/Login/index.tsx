"use client";

import * as S from "./styles";
import Cookies from "js-cookie";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useToastContext } from "@/contexts/ToastContext";
import { FormInput } from "@/components/Atoms/FormInput";
import { SpecularButton } from "@/components/Atoms/SpecularButton";
import { RubberSegment } from "@/components/Atoms/RubberSegment";
import { Logo } from "@/components/Atoms/Logo";
import { MagicBento } from "@/components/Organisms/MagicBento";
import { AUTH_COOKIE } from "@/constants/storage-keys";

// Cadastro fechado ao público por enquanto: as contas são criadas direto na
// API. A API também recusa o cadastro, então isto aqui é só a interface.
const SIGNUP_ENABLED = process.env.NEXT_PUBLIC_SIGNUP_ENABLED === "true";

type LoginFormData = {
  nome: string;
  email: string;
  senha: string;
};

export const LoginPage = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(true);
  const { dispatchToast } = useToastContext();
  const { register, handleSubmit, reset, clearErrors } =
    useForm<LoginFormData>();
  const { createAccount, login } = useAuth();
  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    if (isActive) {
      login.mutate(
        {
          email: data.email,
          password: data.senha,
        },
        {
          onSuccess: (response) => {
            Cookies.set(AUTH_COOKIE, response.data.token, {
              expires: 1 / 24,
            });
            router.replace("/dashboard");
          },
        }
      );
      return;
    }

    if (!SIGNUP_ENABLED) {
      dispatchToast({
        type: "info",
        message: "A criação de contas está desativada no momento.",
      });
      return;
    }

    createAccount.mutate(
      {
        name: data.nome,
        email: data.email,
        password: data.senha,
      },
      {
        onSuccess: () => {
          setIsActive(true);
          reset();
        },
      }
    );
  };

  const switchMode = (mode: string) => {
    setIsActive(mode === "login");
    clearErrors();
    reset();
  };

  const signupLocked = !isActive && !SIGNUP_ENABLED;

  const form = (
    <S.CardBody>
      <S.Brand>
        <Logo height={48} />
      </S.Brand>
      <S.Heading>
        <h1>{isActive ? "Bem-vindo de volta" : "Crie sua conta"}</h1>
        <p>
          {isActive
            ? "Entre para ver como está o seu mês."
            : signupLocked
              ? "Por enquanto, o acesso é liberado apenas por convite."
              : "Leva menos de um minuto para começar."}
        </p>
      </S.Heading>
      <RubberSegment
        aria-label="Entrar ou criar conta"
        fullWidth
        size="lg"
        value={isActive ? "login" : "signup"}
        onChange={switchMode}
        items={[
          { value: "login", label: "Entrar" },
          { value: "signup", label: "Criar conta" },
        ]}
      />
      <S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
        {signupLocked ? (
          <S.Notice role="status">
            <Lock
              aria-hidden="true"
              size={16}
              strokeWidth={1.75}
            />
            A criação de contas está desativada momentaneamente, por segurança.
          </S.Notice>
        ) : null}
        {!isActive ? (
          <FormInput.Text
            label="Nome"
            placeholder="Como podemos te chamar?"
            autoComplete="name"
            disabled={signupLocked}
            {...register("nome")}
          />
        ) : null}
        <FormInput.Text
          label="Email"
          placeholder="voce@email.com"
          type="email"
          autoComplete="email"
          disabled={signupLocked}
          {...register("email")}
        />
        <FormInput.Text
          label="Senha"
          placeholder="Sua senha"
          type="password"
          autoComplete={isActive ? "current-password" : "new-password"}
          disabled={signupLocked}
          {...register("senha")}
        />
        {isActive ? (
          <S.ResetPassword
            type="button"
            onClick={() =>
              dispatchToast({
                type: "info",
                message: "Em breve",
              })
            }
          >
            Esqueceu sua senha?
          </S.ResetPassword>
        ) : null}
        <S.ButtonWrapper>
          <SpecularButton
            type="submit"
            size="lg"
            fullWidth
          >
            {isActive ? "Entrar" : "Criar conta"}
          </SpecularButton>
        </S.ButtonWrapper>
      </S.FormWrapper>
    </S.CardBody>
  );

  return (
    <S.Container>
      <S.Backdrop aria-hidden="true" />
      <S.CardSlot>
        <MagicBento
          columns={1}
          rowHeight={420}
          radius={28}
          spotlightRadius={360}
          clickEffect={false}
          intro={false}
          items={[{ id: "login", content: form }]}
        />
      </S.CardSlot>
      <S.Strip>
        <S.StripDot aria-hidden="true" />
        <span>Suas finanças em um só lugar</span>
      </S.Strip>
    </S.Container>
  );
};
