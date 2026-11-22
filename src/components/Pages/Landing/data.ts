import { Category } from "@/services/configuracoes/CategoryService/types";
import { BalancePoint } from "@/components/Pages/Dashboard/useDashboardData";

export const demoMonth = {
  label: "Novembro",
  incomes: 9840,
  expenses: 6312.45,
  balance: 3527.55,
  pending: 1284.9,
  pendingCount: 3,
  savingsRate: 0.36,
  incomesChange: 4,
  expensesChange: -7,
  incomeCount: 2,
  expenseCount: 23,
};

export const demoBalanceSeries: BalancePoint[] = [
  -120, -340, -515, -690, 7510, 7180, 6920, 6410, 6205, 4055, 3870, 3640, 3430,
  3275, 4780, 4540, 4315, 4130, 3990, 3860, 3735, 3690, 3610, 3527.55,
].map((balance, index) => ({ day: index + 1, balance }));

export const demoSlices = [
  {
    id: "moradia",
    name: "Moradia",
    total: 2150,
    share: 0.34,
    color: "#6366f1",
  },
  {
    id: "mercado",
    name: "Mercado",
    total: 1420.3,
    share: 0.225,
    color: "#14b8a6",
  },
  {
    id: "transporte",
    name: "Transporte",
    total: 868.15,
    share: 0.138,
    color: "#0ea5e9",
  },
  { id: "outras", name: "Outras", total: 1874, share: 0.297, color: "" },
];

export const demoUpcoming = [
  {
    id: 1,
    day: "26",
    month: "11",
    description: "Fatura do cartão",
    category: "Contas",
    amount: 842.3,
  },
  {
    id: 2,
    day: "28",
    month: "11",
    description: "Seguro do carro",
    category: "Carro",
    amount: 322.7,
  },
  {
    id: 3,
    day: "30",
    month: "11",
    description: "Internet",
    category: "Internet",
    amount: 119.9,
  },
];

const category = (
  id: number,
  name: string,
  icon: string,
  color: string,
  type = 0
): Category => ({ id, userId: 0, name, icon, color, type });

export const demoCategoryList = {
  expenses: [
    category(1, "Moradia", "house", "#6366f1"),
    category(2, "Mercado", "shopping-cart", "#14b8a6"),
    category(3, "Transporte", "bus", "#0ea5e9"),
    category(4, "Saúde", "heart-pulse", "#ef4444"),
    category(5, "Educação", "graduation-cap", "#8b5cf6"),
  ],
  total: 9,
};

const incomeCategory = category(10, "Salário", "briefcase", "#3b82f6", 1);
const extraCategory = category(11, "Renda extra", "coins", "#eab308", 1);
const [housing, groceries, , , education] = demoCategoryList.expenses;
const shopping = category(6, "Compras", "shirt", "#ec4899");
const home = category(7, "Casa", "wrench", "#f97316");

export type DemoTransaction = {
  id: number;
  title: string;
  details: string[];
  category: Category;
  amount: number;
  variant: "income" | "expense";
  paid: boolean;
};

export const demoTransactions: DemoTransaction[] = [
  {
    id: 1,
    title: "Salário",
    details: ["05/11/2026", "Conta corrente", "Fixa"],
    category: incomeCategory,
    amount: 8200,
    variant: "income",
    paid: true,
  },
  {
    id: 2,
    title: "Aluguel",
    details: ["10/11/2026", "Moradia", "Pix", "Fixo"],
    category: housing,
    amount: 2150,
    variant: "expense",
    paid: true,
  },
  {
    id: 3,
    title: "Mercado do mês",
    details: ["12/11/2026", "Mercado", "Débito"],
    category: groceries,
    amount: 642.18,
    variant: "expense",
    paid: true,
  },
  {
    id: 4,
    title: "Projeto freelance",
    details: ["15/11/2026", "Conta corrente"],
    category: extraCategory,
    amount: 1640,
    variant: "income",
    paid: false,
  },
];

export const demoInstallments: DemoTransaction[] = [
  {
    id: 1,
    title: "Notebook",
    details: ["08/11/2026", "Compras", "Parcela 5/10"],
    category: shopping,
    amount: 459.9,
    variant: "expense",
    paid: true,
  },
  {
    id: 2,
    title: "Geladeira",
    details: ["14/11/2026", "Casa", "Parcela 2/12"],
    category: home,
    amount: 324.75,
    variant: "expense",
    paid: false,
  },
  {
    id: 3,
    title: "Curso de inglês",
    details: ["20/11/2026", "Educação", "Parcela 3/6"],
    category: education,
    amount: 189,
    variant: "expense",
    paid: false,
  },
];

export const demoAccount = {
  name: "Conta corrente",
  type: "Conta Corrente",
  balance: 8420.15,
};

export const demoCard = {
  name: "Cartão principal",
  lastFourDigits: "4021",
  type: "Crédito",
  expiry: "08/29",
  limit: 6000,
};

export type DemoGoal = {
  id: number;
  name: string;
  targetAmount: number;
  savedAmount: number;
  priority: number;
  status: number;
  deadline: string;
  notes: string;
};

export const demoGoals: DemoGoal[] = [
  {
    id: 1,
    name: "Reserva de emergência",
    targetAmount: 18000,
    savedAmount: 12600,
    priority: 2,
    status: 0,
    deadline: "2027-05-31",
    notes: "Seis meses de custos essenciais.",
  },
  {
    id: 2,
    name: "Viagem de férias",
    targetAmount: 9000,
    savedAmount: 3150,
    priority: 1,
    status: 0,
    deadline: "2027-12-15",
    notes: "Passagens e hospedagem para duas pessoas.",
  },
  {
    id: 3,
    name: "Carro próprio",
    targetAmount: 45000,
    savedAmount: 14400,
    priority: 1,
    status: 0,
    deadline: "2028-08-01",
    notes: "Entrada de um seminovo.",
  },
];
