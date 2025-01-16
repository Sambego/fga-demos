"use client";
import Accounts from "@/components/accounts";
import { BadgeEuro, Baby } from "lucide-react";
import { users } from "@/data/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { getBankAccounts } from "@/app/actions";

export default function Home() {
  const [currentUser, setCurrentUser] = useState(users[0]?.id);
  return (
    <div className="w-[440px]">
      <div className="flex flex-row justify-items-end items-end">
        <div className="ml-auto">
          <Accounts
            currentAccount={currentUser}
            setCurrentAccount={setCurrentUser}
            accounts={users}
          />
        </div>
      </div>
      <div className="border rounded-lg my-4 p-4">
        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-lg font-semibold tracking-tight transition-colors mb-4 mt-0">
          <BadgeEuro className="inline w-6" /> Accounts
        </h2>
        <div className="flex place-content-between gap-4">
          {getBankAccounts(currentUser)?.map((bc) => (
            <Card className="w-2/4">
              <CardHeader>
                <CardTitle className="tracking-tight">{bc.name}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  {bc.iban}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl">
                  {new Intl.NumberFormat("nl-BE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(bc.value)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-lg font-semibold tracking-tight transition-colors mb-4 mt-3">
          <Baby className="inline w-6" /> Child Accounts
        </h2>
        <div className="flex place-content-between gap-4">
          <Card className="w-2/4">
            <CardHeader>
              <CardTitle className="tracking-tight">
                Ada
                <span className="text-sm font-normal"> - Savings account</span>
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                BE37 2222 4444 8888
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl">€1.984,89</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
