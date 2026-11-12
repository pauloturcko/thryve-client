import { useExpensesList } from "@/hooks/useExpense";
import { useIncomesList } from "@/hooks/useIncome";
import { TransactionStatus } from "@/constants/enums/transaction-status-enum";
import { currentMonth, shiftMonth } from "@/utils/date";
import { sumAmounts } from "@/utils/parse";

export type BalancePoint = { day: number; balance: number };

export type CategorySlice = {
  id: number | "other";
  name: string;
  color: string;
  total: number;
  share: number;
};

const MAX_SLICES = 4;

const daysInMonth = (month: string) => {
  const [year, monthNumber] = month.split("-").map(Number);
  return new Date(year, monthNumber, 0).getDate();
};

const dayOf = (isoDate: string) => Number(isoDate.slice(8, 10));

const percentChange = (current: number, previous: number) =>
  previous > 0 ? Math.round(((current - previous) / previous) * 100) : null;

export const useDashboardData = () => {
  const month = currentMonth();
  const previousMonth = shiftMonth(month, -1);

  const expensesQuery = useExpensesList({ month });
  const incomesQuery = useIncomesList({ month });
  const previousExpensesQuery = useExpensesList({ month: previousMonth });
  const previousIncomesQuery = useIncomesList({ month: previousMonth });

  const expenses = expensesQuery.data ?? [];
  const incomes = incomesQuery.data ?? [];

  const totalExpenses = sumAmounts(expenses);
  const totalIncomes = sumAmounts(incomes);
  const balance = totalIncomes - totalExpenses;
  const savingsRate =
    totalIncomes > 0 ? Math.max(0, balance / totalIncomes) : 0;

  const pendingExpenses = expenses
    .filter((expense) => expense.status === TransactionStatus.Pendente)
    .sort((a, b) => (a.dueDate ?? a.date).localeCompare(b.dueDate ?? b.date));
  const pendingTotal = sumAmounts(pendingExpenses);

  const today = new Date().getDate();
  const lastDay = daysInMonth(month);
  const visibleDays = Math.min(today, lastDay);
  const dailyNet = new Array(lastDay + 1).fill(0);
  incomes.forEach(
    (income) => (dailyNet[dayOf(income.date)] += Number(income.amount))
  );
  expenses.forEach(
    (expense) => (dailyNet[dayOf(expense.date)] -= Number(expense.amount))
  );

  const balanceSeries: BalancePoint[] = [];
  let running = 0;
  for (let day = 1; day <= visibleDays; day++) {
    running += dailyNet[day];
    balanceSeries.push({ day, balance: running });
  }

  const byCategory = new Map<number, CategorySlice>();
  expenses.forEach((expense) => {
    const slice = byCategory.get(expense.categoryId) ?? {
      id: expense.categoryId,
      name: expense.category.name,
      color: expense.category.color,
      total: 0,
      share: 0,
    };
    slice.total += Number(expense.amount);
    byCategory.set(expense.categoryId, slice);
  });
  const sorted = [...byCategory.values()].sort((a, b) => b.total - a.total);
  // Com mais categorias que o limite, uma das vagas vira "Outras"
  const visibleCount = sorted.length > MAX_SLICES ? MAX_SLICES - 1 : MAX_SLICES;
  const top = sorted.slice(0, visibleCount);
  const rest = sorted
    .slice(visibleCount)
    .reduce((sum, slice) => sum + slice.total, 0);
  const slices: CategorySlice[] = [
    ...top,
    ...(rest > 0
      ? [
          {
            id: "other" as const,
            name: "Outras",
            color: "",
            total: rest,
            share: 0,
          },
        ]
      : []),
  ].map((slice) => ({
    ...slice,
    share: totalExpenses > 0 ? slice.total / totalExpenses : 0,
  }));

  return {
    month,
    isLoading: expensesQuery.isLoading || incomesQuery.isLoading,
    totals: {
      incomes: totalIncomes,
      expenses: totalExpenses,
      balance,
      pending: pendingTotal,
      pendingCount: pendingExpenses.length,
      savingsRate,
    },
    changes: {
      incomes: percentChange(
        totalIncomes,
        sumAmounts(previousIncomesQuery.data ?? [])
      ),
      expenses: percentChange(
        totalExpenses,
        sumAmounts(previousExpensesQuery.data ?? [])
      ),
    },
    counts: { incomes: incomes.length, expenses: expenses.length },
    balanceSeries,
    slices,
    upcoming: pendingExpenses.slice(0, 3),
  };
};
