export type CreateBankAccountParams = {
  name: string;
  accountType: number;
  balance: number;
};

export type BankAccount = {
  id: number;
  userId: number;
  name: string;
  accountType: number;
  balance: string;
};

export type LoadAllBankAccountsResponse = {
  bankAccounts: BankAccount[];
};

export type UpdateBankAccountParams = Partial<CreateBankAccountParams> & {
  id: number;
};
