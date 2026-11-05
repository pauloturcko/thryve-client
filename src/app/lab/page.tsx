"use client";

/*
 * Laboratório visual do novo layout (branch feat/new-layout).
 * Usa SOMENTE dados de exemplo gravados no cache do React Query, sem chamar a API,
 * para revisar os componentes sem login. Remover antes de ir para produção.
 */

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { styled, useTheme } from "styled-components";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { AppDock } from "@/components/Organisms/AppDock";
import { DashboardPage } from "@/components/Pages/Dashboard";
import { GooeyNav } from "@/components/Molecules/GooeyNav";
import { SpecularButton } from "@/components/Atoms/SpecularButton";
import { FormInput } from "@/components/Atoms/FormInput";
import { Logo } from "@/components/Atoms/Logo";
import { useThemeMode } from "@/contexts/ThemeModeContext";
import { RubberSegment } from "@/components/Atoms/RubberSegment";
import { isPalette } from "@/styles/theme";
import { currentMonth, shiftMonth } from "@/utils/date";
import type { Expense } from "@/services/expense-service";
import type { Income } from "@/services/income-service";

const month = currentMonth();
const previousMonth = shiftMonth(month, -1);
const day = (d: number, m = month) => `${m}-${String(Math.min(d, new Date().getDate())).padStart(2, "0")}`;

const category = (id: number, name: string, color: string, type: number) => ({
  id,
  userId: 1,
  name,
  icon: "tag",
  color,
  type,
});

const expense = (
  id: number,
  description: string,
  amount: number,
  date: string,
  cat: ReturnType<typeof category>,
  status = 1,
  dueDate: string | null = null
): Expense => ({
  id,
  userId: 1,
  expenseKind: 1,
  description,
  amount: amount.toFixed(2),
  date,
  dueDate,
  status,
  categoryId: cat.id,
  bankAccountId: 1,
  paymentMethodId: null,
  cardId: null,
  notes: null,
  installmentGroupId: null,
  installmentNumber: null,
  installmentTotal: null,
  category: cat,
  bankAccount: null,
  paymentMethod: null,
  card: null,
});

const income = (id: number, source: string, amount: number, date: string): Income => ({
  id,
  userId: 1,
  incomeKind: 0,
  amount: amount.toFixed(2),
  date,
  status: 1,
  categoryId: 1,
  bankAccountId: 1,
  source,
  notes: null,
  linkedTransactionId: null,
  category: category(1, "Salário", "#3ddc97", 0),
  bankAccount: null,
});

const moradia = category(2, "Moradia", "#6a00f4", 1);
const mercado = category(3, "Mercado", "#ffd6a5", 1);
const transporte = category(4, "Transporte", "#5cc8ff", 1);
const lazer = category(5, "Lazer", "#ff5c7a", 1);
const saude = category(6, "Saúde", "#3ddc97", 1);
const assinaturas = category(7, "Assinaturas", "#ffb547", 1);

const sampleExpenses: Expense[] = [
  expense(1, "Aluguel", 2400, day(2), moradia),
  expense(2, "Mercado do mês", 860, day(4), mercado),
  expense(3, "Combustível", 320, day(6), transporte),
  expense(4, "Cinema e jantar", 210, day(8), lazer),
  expense(5, "Farmácia", 96, day(9), saude),
  expense(6, "Feira", 140, day(11), mercado),
  expense(7, "Streaming", 55, day(12), assinaturas),
  expense(8, "Conta de luz", 230, day(13), moradia, 0, `${month}-20`),
  expense(9, "Internet", 120, day(14), moradia, 0, `${month}-22`),
  expense(10, "Academia", 129, day(15), saude, 0, `${month}-25`),
];

const sampleIncomes: Income[] = [
  income(1, "Salário", 7800, day(1)),
  income(2, "Freela de design", 1450, day(10)),
];

const previousExpenses = [expense(20, "Mês anterior", 4100, day(5, previousMonth), moradia)];
const previousIncomes = [income(20, "Mês anterior", 8200, day(1, previousMonth))];

const statusOptions = [
  { value: "", label: "Todos" },
  { value: "0", label: "Pendente" },
  { value: "1", label: "Pago" },
];

const kindOptions = [
  { value: "0", label: "Fixo" },
  { value: "1", label: "Variável" },
];

const sections = [
  { label: "Categorias" },
  { label: "Contas" },
  { label: "Cartões" },
  { label: "Formas de pagamento" },
  { label: "Metas" },
  { label: "Perfil" },
];

const SeedCache = () => {
  const queryClient = useQueryClient();
  const [seeded] = useState(() => {
    queryClient.setQueryDefaults(["Expenses-LoadAll"], { staleTime: Infinity });
    queryClient.setQueryDefaults(["Incomes-LoadAll"], { staleTime: Infinity });
    queryClient.setQueryData(["Expenses-LoadAll", { month }], sampleExpenses);
    queryClient.setQueryData(["Incomes-LoadAll", { month }], sampleIncomes);
    queryClient.setQueryData(["Expenses-LoadAll", { month: previousMonth }], previousExpenses);
    queryClient.setQueryData(["Incomes-LoadAll", { month: previousMonth }], previousIncomes);
    return true;
  });
  return seeded ? <DashboardPage /> : null;
};

const swatchTokens = [
  "primary",
  "primaryText",
  "accent",
  "background",
  "surface",
  "surfaceElevated",
  "success",
  "danger",
  "warning",
  "info",
] as const;

export default function LabPage() {
  const theme = useTheme();
  const { palette, setPalette } = useThemeMode();
  const [section, setSection] = useState(0);
  const [status, setStatus] = useState("");
  const [kind, setKind] = useState("1");

  return (
    <Page>
      <Top>
        <Logo.FullLogo
          imgSize={40}
          fontSize="1.05rem"
        />
        <TopActions>
          <RubberSegment
            aria-label="Paleta"
            size="sm"
            value={palette}
            onChange={(next) => {
              if (isPalette(next)) setPalette(next);
            }}
            items={[
              { value: "ultraviolet", label: "UltraViolet + Apricot" },
              { value: "emerald", label: "Emerald + Champagne" },
              { value: "whaiGreen", label: "Verde Whai + Lilás" },
            ]}
          />
          <Badge>Laboratório · dados de exemplo</Badge>
        </TopActions>
      </Top>

      <SeedCache />

      <Block>
        <h2>Paleta</h2>
        <Swatches>
          {swatchTokens.map((token) => (
            <li key={token}>
              <i style={{ background: theme.colors[token] }} />
              <span>{token}</span>
              <code>{theme.colors[token]}</code>
            </li>
          ))}
        </Swatches>
      </Block>

      <Block>
        <h2>Menu de configurações (GooeyNav)</h2>
        <GooeyNav
          items={sections}
          activeIndex={section}
          onChange={(index) => setSection(index)}
        />
      </Block>

      <Block>
        <h2>Controles</h2>
        <Row>
          <FormInput.Segment
            label="Status"
            size="sm"
            options={statusOptions}
            value={status}
            onChange={setStatus}
          />
          <FormInput.Radio
            label="Tipo"
            options={kindOptions}
            value={kind}
            onChange={setKind}
          />
        </Row>
        <Row>
          <SpecularButton size="sm">
            <HugeiconsIcon icon={Add01Icon} /> Novo gasto
          </SpecularButton>
          <SpecularButton>Entrar</SpecularButton>
          <SpecularButton variant="glass">Cancelar</SpecularButton>
        </Row>
        <Row>
          <FormInput.Text
            label="Descrição"
            placeholder="Ex.: Mercado do mês"
          />
          <FormInput.Select
            label="Categoria"
            options={[
              { value: "", label: "Selecione" },
              { value: "1", label: "Moradia" },
            ]}
          />
        </Row>
      </Block>

      <AppDock />
    </Page>
  );
}

const Page = styled.main`
  min-height: 100dvh;
  max-width: 1440px;
  margin: 0 auto;
  padding: 1.5rem 2rem 9rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  background:
    radial-gradient(60rem 30rem at 15% -10%, rgba(${({ theme }) => theme.colors.glowRgb}, 0.16), transparent 70%),
    ${({ theme }) => theme.colors.background};

  @media (max-width: 768px) {
    padding: 1rem 1rem 8rem;
  }
`;

const Top = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

const TopActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
`;

const Badge = styled.span`
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accentText};
  background: ${({ theme }) => theme.colors.accentSoft};
`;

const Block = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1.25rem 2rem;

  > * {
    max-width: 22rem;
  }
`;

const Swatches = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
  gap: 0.75rem;

  li {
    display: grid;
    grid-template-columns: 2.25rem 1fr;
    grid-template-rows: auto auto;
    column-gap: 0.6rem;
    align-items: center;
  }

  i {
    grid-row: span 2;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 0.6rem;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border};
  }

  span {
    font-size: 0.8rem;
    font-weight: 600;
  }

  code {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
