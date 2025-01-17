"use server";
import "server-only";
import { BankAccount, bankAccounts } from "../data/bank-accounts";
import {
  getFgaRolesForFile,
  getFgaFilesForUser,
  addFgaRoleForFile,
  removeFgaRoleForFile,
  checkFgaUserPermissionsForFile,
  getFgaBankAccountsForUser,
  getFgaHealthRecordssForUser,
} from "../lib/openfga";
import { files, File } from "@/data/files";
import { healthRecords } from "@/data/health-records";

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
  return await checkFgaUserPermissionsForFile(file, user, permissions);
}

export async function getBankAccounts(
  user: string,
  year: number
): Promise<BankAccount[]> {
  const assignedBankAccounts = await getFgaBankAccountsForUser(user, year);
  return bankAccounts.filter((account) =>
    assignedBankAccounts.includes(account.id)
  );
}

export async function getHealthReports(user: string, doctor: boolean) {
  const assignedHealthRecords = await getFgaHealthRecordssForUser(user, doctor);
  return healthRecords.filter((record) =>
    assignedHealthRecords.includes(record.id)
  );
}
