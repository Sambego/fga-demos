import { users } from "@/data/user";
import {
  FileText,
  FileImage,
  FileChartColumn,
  Folder,
  MoreHorizontal,
  Share,
  Trash2,
  Check,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { checkUserPermissionsForFile, getRolesForFile } from "@/app/actions";
import RoleSelect from "./permission-select";
import { useEffect, useState } from "react";
import { File } from "@/data/files";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

export type RolesState = "none" | "fetched" | "stale";
export type PermissionsState = "none" | "fetched" | "stale";
export type DialogState = "open" | "closed";
export default function FileComponeny({
  file,
  currentUser,
}: {
  file: File;
  currentUser: string;
}) {
  const [rolesState, setRolesState] = useState<RolesState>("none");
  const [roles, setRoles] = useState<any>({});
  const [permissionsState, setPermissionsState] =
    useState<PermissionsState>("none");
  const [permissions, setPermissions] = useState<any>({});
  const [dialogState, setDialogState] = useState<DialogState>("closed");

  useEffect(() => {
    if (
      rolesState === "stale" ||
      permissionsState === "stale" ||
      rolesState === "none" ||
      permissionsState === "none"
    ) {
      handleFetchRolesForFile();
      handleFetchPermissionsForFile();
    }
  }, [rolesState, permissionsState]);

  useEffect(() => {
    handleFetchRolesForFile();
    handleFetchPermissionsForFile();
  }, [currentUser]);

  const getUserRoleForFile = (user: string) => {
    switch (true) {
      case roles?.owner?.findIndex((u) => u.id === user) >= 0:
        return "owner";
      case roles?.editor?.findIndex((u) => u.id === user) >= 0:
        return "editor";
      case roles?.viewer?.findIndex((u) => u.id === user) >= 0:
        return "viewer";
      default:
        return "none";
    }
  };

  const renderTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <FileImage />;
      case "slides":
        return <FileChartColumn />;
      case "folder":
        return <Folder />;
      default:
        return <FileText />;
    }
  };

  const handleFetchRolesForFile = async () => {
    const roles = await getRolesForFile(file.id);
    setRoles(roles);
    setRolesState("fetched");
  };
  const handleFetchPermissionsForFile = async () => {
    const permissions = await checkUserPermissionsForFile(
      file.id,
      currentUser,
      ["can_delete", "can_share", "can_edit"]
    );
    setPermissions(permissions);
    setPermissionsState("fetched");
  };

  const handleRoleChange = () => {
    setRolesState("stale");
    setPermissionsState("stale");
  };

  return (
    <>
      <TableRow
        key={file.id}
        onPointerEnter={() => {
          handleFetchRolesForFile();
          handleFetchPermissionsForFile();
        }}
      >
        <TableCell>{renderTypeIcon(file.type)}</TableCell>
        <TableCell>{file.name}</TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator className="border-b-[1px]" />
              <DropdownMenuItem
                onClick={() => setDialogState("open")}
                disabled={!permissions?.can_share}
              >
                <Share /> Share file
              </DropdownMenuItem>
              <DropdownMenuSeparator className="border-b-[1px]" />
              <DropdownMenuItem disabled={!permissions?.can_edit}>
                <Edit /> Edit file
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-700"
                disabled={!permissions?.can_delete}
              >
                <Trash2 /> Delete file
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <Dialog
        open={dialogState === "open"}
        onOpenChange={(open) => setDialogState(open ? "open" : "closed")}
      >
        <DialogContent className="w-[300px]">
          <DialogHeader>
            <DialogTitle>Share "{file.name}"</DialogTitle>
            <DialogDescription>
              You can share this file with other users in your organization.
            </DialogDescription>
          </DialogHeader>
          <div className="grid">
            {users.map((user) => (
              <div
                className="flex items-center justify-between space-x-4 py-1"
                key={user.id}
              >
                <div className="text-sm font-medium leading-none">
                  {user.name}
                </div>
                <RoleSelect
                  disabled={currentUser === user.id}
                  value={getUserRoleForFile(user.id)}
                  file={file.id}
                  user={user.id}
                  onChange={handleRoleChange}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setDialogState("closed")}>
              <Check className="inline h-4" />
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
