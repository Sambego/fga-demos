import { BankAccount } from "@/data/bank-accounts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function BankAccountComponent({
  account,
}: {
  account: BankAccount;
}) {
  return (
    <Card className="w-2/4">
      <CardHeader>
        <CardTitle className="tracking-tight">{account.name}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {account.iban}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl">
          {new Intl.NumberFormat("nl-BE", {
            style: "currency",
            currency: "EUR",
          }).format(account.value)}
        </p>
      </CardContent>
    </Card>
  );
}
