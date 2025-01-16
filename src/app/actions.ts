"use server";
import "server-only";
import { BankAccount, bankAccounts } from "../data/bank-accounts";
import {
  getFgaRolesForFile,
  getFgaFilesForUser,
  addFgaRoleForFile,
  removeFgaRoleForFile,
  checkFgaUserPermissionsForFile,
} from "../lib/openfga";
import { files, File } from "@/data/files";

export async function getFiles(user: string): Promise<Array<File>> {
  const assignedFiles = await getFgaFilesForUser(user);
  return files.filter((file) => assignedFiles.includes(file.id));
}

export async function addRoleForFile(file: string, user: string, role: string) {
  return addFgaRoleForFile(file, user, role);
}

export async function removeRoleForFile(
  file: string,
  user: string,
  role: string
) {
  return removeFgaRoleForFile(file, user, role);
}

export async function getRolesForFile(file: string) {
  return getFgaRolesForFile(file);
}

export async function checkUserPermissionsForFile(
  file: string,
  user: string,
  permissions: Array<string>
) {
  const foo = await checkFgaUserPermissionsForFile(file, user, permissions);
  console.log("batchchek", foo);
  return foo;
}

export async function getBankAccounts(user: string): Promise<BankAccount[]> {
  return bankAccounts.filter((bc) => bc.owner === user);
}
