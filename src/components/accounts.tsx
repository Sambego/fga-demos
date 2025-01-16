"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/data/user";
import { User as UserIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function Accounts({
  users,
  currentUser,
  setCurrentUser,
}: {
  users: Array<User>;
  currentUser: string;
  setCurrentUser: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Select value={currentUser} onValueChange={setCurrentUser}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Account">
          {users.find((user) => user.id === currentUser)?.name}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {users.map((user) => (
          <SelectItem value={user.id} key={user.id}>
            <div className="flex space-x-4">
              <div>
                <UserIcon className="inline h-12" />
              </div>
              <div>
                {user.name}
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
