import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { removeRoleForFile, addRoleForFile } from "@/app/actions";
import { RolesState } from "./file";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
export default function RoleSelect({
  value,
  file,
  user,
  onChange,
  disabled = false,
}: {
  value: string;
  file: string;
  user: string;
  disabled?: boolean;
  onChange: () => void;
}) {
  const [role, setRole] = useState<string>(value);
  const previousRoleRef = useRef<string>(value);

  useEffect(() => {
    if (previousRoleRef.current !== role) {
      if (previousRoleRef.current !== "none") {
        removeRoleForFile(file, user, previousRoleRef.current);
      }

      if (role !== "none") {
        previousRoleRef.current = role;
        addRoleForFile(file, user, role);
      }

      onChange();
    }
  }, [role]);

  const renderPermissionName = (permission: string) => {
    switch (permission) {
      case "owner":
        return "Owner";
      case "editor":
        return "Editor";
      case "viewer":
        return "Viewer";
      default:
        return "Not shared";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button
          variant="outline"
          className={`w-1/2 text-lef ${
            disabled &&
            " text-gray-400 border-gray-200 bg-gray-100 hover:text-gray-400 hover:border-gray-200 hover:bg-gray-100 cursor-not-allowed"
          }`}
        >
          {renderPermissionName(role)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={role} onValueChange={setRole}>
          <DropdownMenuRadioItem value="none">
            <div>
              <p className="font-bold text-sm">Not shared</p>
              <p className="text-xs text-muted-foreground">
                <strong>Don't share</strong> this file
              </p>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuSeparator />
          <DropdownMenuRadioItem className="text-left" value="viewer">
            <div>
              <p className="font-bold text-sm">Viewer</p>
              <p className="text-xs text-muted-foreground">
                Can <strong>view</strong> the content of this file
              </p>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="text-left" value="editor">
            <div>
              <p className="font-bold text-sm">Editor</p>
              <p className="text-xs text-muted-foreground">
                Can <strong>view</strong>, <strong>edit</strong>, and{" "}
                <strong>share</strong> this file
              </p>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="text-left" value="owner">
            <div>
              <p className="font-bold text-sm">Owner</p>
              <p className="text-xs text-muted-foreground">
                Can <strong>view</strong>, <strong>edit</strong>,{" "}
                <strong>share</strong> and <strong>delete</strong> this file
              </p>
            </div>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
