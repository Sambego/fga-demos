"use client";
import Accounts from "@/components/accounts";
import { BadgeEuro, Baby, PiggyBank } from "lucide-react";
import { getCurrentUser, getUsers, User } from "@/data/user";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getBankAccounts } from "@/app/actions";
import { BankAccount } from "@/data/bank-accounts";
import BankAccountComponent from "@/components/bank-account";
import { Switch } from "@/components/ui/switch";
import ModelPreview from "@/components/model-preview";

const modelPreview = `model
  schema 1.1
  type user
    relations
      define guardian: [user with date_based_grant]
  type account
    relations
      define owner: [user]
      define viewer: owner or guardian from owner
      
      define can_transfer: owner
      define can_view: viewer
  
  condition date_based_grant(current_date: timestamp, birth_date: timestamp, grant_duration: duration) {
     current_date < birth_date + grant_duration
  }`;

export default function Home() {
  const [currentUser, setCurrentUser] = useState<string>(getCurrentUser().id);
  const [users] = useState<User[]>(getUsers());
  const [bankAccounts, setBankAccounts] = useState<Array<BankAccount>>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [yearSwitchState, setYearSwitchState] = useState<boolean>(false);

  useEffect(() => {
    getBankAccounts(currentUser, year).then((accounts) => {
      setBankAccounts(accounts);
    });
  }, []);

  useEffect(() => {
    getBankAccounts(currentUser, year).then((accounts) => {
      setBankAccounts(accounts);
    });
  }, [currentUser]);

  useEffect(() => {
    setYear(
      yearSwitchState ? new Date().getFullYear() + 18 : new Date().getFullYear()
    );
  }, [yearSwitchState]);

  useEffect(() => {
    getBankAccounts(currentUser, year).then((accounts) => {
      setBankAccounts(accounts);
    });
  }, [year]);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-items-end items-end mb-4">
        <div className="flex items-center">
          <PiggyBank className="inline-block mr-2" />
          <p className="text-xl font-bold tracking-wide">FGA Bank</p>
        </div>
        <div className="ml-auto">
          <Accounts
            users={users}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            showChild={true}
          />
        </div>
      </div>
      <div className="border rounded-lg my-4">
        <div className=" my-4 p-4">
          <h2 className="scroll-m-20 border-b pb-2 text-lg font-semibold tracking-tight transition-colors mb-4 mt-0">
            <BadgeEuro className="inline w-6" /> Accounts
          </h2>
          <div className="flex place-content-between gap-4">
            {bankAccounts
              ?.filter((account) => account.owner === currentUser)
              ?.map((account) => (
                <BankAccountComponent account={account} key={account.id} />
              ))}
          </div>
          {bankAccounts?.filter((account) => account.owner !== currentUser)
            .length > 0 && (
            <>
              <h2 className="mt-10 scroll-m-20 border-b pb-2 text-lg font-semibold tracking-tight transition-colors mb-4 mt-3">
                <Baby className="inline w-6" /> Child Accounts
              </h2>
              <div className="flex place-content-between gap-4">
                {bankAccounts
                  ?.filter((account) => account.owner !== currentUser)
                  ?.map((account) => (
                    <BankAccountComponent account={account} key={account.id} />
                  ))}
              </div>
            </>
          )}
        </div>
        <footer className="p-4 bg-gray-100 rounded-b-lg">
          <p className="text-sm mb-2">
            Parents have an overview of their child's account until they turn 18
            years old. <strong>Jane is a child of Sam</strong>.
          </p>

          <Card>
            <CardContent className="px-4 py-2">
              <div className="flex place-content-between items-baseline">
                <p className="text-sm text-muted-foreground">
                  Change the year.
                </p>

                <div>
                  <span className="text-sm text-muted-foreground mr-2">
                    {new Date().getFullYear()}
                  </span>
                  <Switch
                    checked={yearSwitchState}
                    onCheckedChange={setYearSwitchState}
                  />
                  <span className="text-sm text-muted-foreground ml-2">
                    {new Date().getFullYear() + 18}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </footer>
      </div>
      <ModelPreview model={modelPreview} />
    </div>
  );
}
