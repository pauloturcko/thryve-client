"use client";

import * as S from "./styles";
import Cookies from "js-cookie";
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
import { useThemeMode } from "@/contexts/ThemeModeContext";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";

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
  const { mode, toggleMode } = useThemeMode();
  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    if (isActive) {
      login.mutate(
        {
          email: data.email,
          password: data.senha,
        },
        {
          onSuccess: (response) => {
            Cookies.set("whaidata.token", response.data.token, {
              expires: 1 / 24,
            });
            router.replace("/dashboard");
          },
        }
      );
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

  const form = (
    <S.CardBody>
      <S.Brand>
        <Logo.FullLogo
          imgSize={36}
          fontSize="0.95rem"
        />
      </S.Brand>
      <S.Heading>
        <h1>{isActive ? "Bem-vindo de volta" : "Crie sua conta"}</h1>
        <p>
          {isActive
            ? "Entre para ver como está o seu mês."
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
        {!isActive ? (
          <FormInput.Text
            label="Nome"
            placeholder="Como podemos te chamar?"
            autoComplete="name"
            {...register("nome")}
          />
        ) : null}
        <FormInput.Text
          label="Email"
          placeholder="voce@email.com"
          type="email"
          autoComplete="email"
          {...register("email")}
        />
        <FormInput.Text
          label="Senha"
          placeholder="Sua senha"
          type="password"
          autoComplete={isActive ? "current-password" : "new-password"}
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
        <S.ThemeButton
          type="button"
          aria-label={mode === "dark" ? "Usar tema claro" : "Usar tema escuro"}
          onClick={toggleMode}
        >
          <HugeiconsIcon icon={mode === "dark" ? Sun03Icon : Moon02Icon} />
        </S.ThemeButton>
      </S.Strip>
    </S.Container>
  );
};
