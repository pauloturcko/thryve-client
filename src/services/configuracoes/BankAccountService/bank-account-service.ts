import { http } from "@/http/http";
import { todayISO } from "@/utils/date";
import {
  CreateBankAccountParams,
  BankAccount,
  LoadAllBankAccountsResponse,
  UpdateBankAccountParams,
} from "./types";

export const createBankAccountService = {
  createBankAccount: ({
    name,
    accountType,
    balance,
  }: CreateBankAccountParams) =>
    // balanceDate: o saldo informado vale a partir de hoje na data local de quem cadastra. A API roda em UTC e,
    // sem isso, uma conta cadastrada à noite ficava com a data do dia seguinte e ignorava os gastos do dia.
    http.post("/bank-accounts/register", {
      name,
      accountType,
      balance,
      balanceDate: todayISO(),
    }),
};

export const loadBankAccountsService = {
  loadAll: async (): Promise<BankAccount[]> => {
    const response = await http.get<LoadAllBankAccountsResponse>(
      "/bank-accounts/user-bank-accounts"
    );
    return response.data.bankAccounts;
  },
};

export const deleteBankAccountService = {
  deleteBankAccount: ({ id }: { id: number }) =>
    http.delete("/bank-accounts/delete", { data: { id } }),
};

export const updateBankAccountService = {
  updateBankAccount: ({ id, ...fields }: UpdateBankAccountParams) =>
    http.patch("/bank-accounts/update", { id, ...fields }),
};
