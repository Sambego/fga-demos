"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/data/user";
import { Baby, BriefcaseMedical, User as UserIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function Accounts({
  users,
  currentUser,
  setCurrentUser,
  showChild,
  showDoctor,
}: {
  users: Array<User>;
  currentUser: string;
  setCurrentUser: Dispatch<SetStateAction<string>> | ((user: string) => void);
  showChild?: boolean;
  showDoctor?: boolean;
}) {
  const renderIcon = (user, small = false) => {
    if (showChild && user.child) {
      return <Baby className={`inline ${small ? "h-5 mr-2" : "h-12"}`} />;
    }

    if (showDoctor && user.doctor) {
      return (
        <BriefcaseMedical className={`inline ${small ? "h-5 mr-2" : "h-12"}`} />
      );
    }

    return <UserIcon className={`inline ${small ? "h-5 mr-2" : "h-12"}`} />;
  };
  return (
    <Select value={currentUser} onValueChange={setCurrentUser}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Account">
          <div className="flext items-center">
            {renderIcon(
              users.find((user) => user.id === currentUser),
              true
            )}
            {users.find((user) => user.id === currentUser)?.name}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {users.map((user) => (
          <SelectItem value={user.id} key={user.id}>
            <div className="flex space-x-4">
              <div>{renderIcon(user)}</div>
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
