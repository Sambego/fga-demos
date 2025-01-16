export type BankAccount = {
  id: string;
  name: string;
  iban: string;
  value: number;
  owner: string;
};

export const bankAccounts: BankAccount[] = [
  {
    id: "1",
    name: "Checking account",
    iban: "BE37 0000 0000 0000",
    value: 16123.89,
    owner: "1",
  },
  {
    id: "2",
    name: "Savings account",
    iban: "BE37 0000 1111 0000",
    value: 280020.0,
    owner: "1",
  },
  {
    id: "3",
    name: "Checking account",
    iban: "BE37 1111 0000 0000",
    value: 137.98,
    owner: "2",
  },
  {
    id: "4",
    name: "Savings account",
    iban: "BE37 1111 1111 0000",
    value: 40102.13,
    owner: "2",
  },
  {
    id: "5",
    name: "Savings account",
    iban: "BE37 2222 0000 0000",
    value: 1102.16,
    owner: "3",
  },
];
