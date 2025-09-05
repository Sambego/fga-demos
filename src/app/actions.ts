"use server";
import "server-only";
import { BankAccount, bankAccounts } from "../data/bank-accounts";
import { FGAClientParams } from "@auth0/ai";
import {
  getFgaRolesForFile,
  getFgaFilesForUser,
  addFgaRoleForFile,
  removeFgaRoleForFile,
  checkFgaUserPermissionsForFile,
  getFgaBankAccountsForUser,
  getFgaHealthRecordssForUser,
  openFga,
} from "../lib/openfga";
import { files, File } from "@/data/files";
import { healthRecords } from "@/data/health-records";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { FGARetriever } from "@auth0/ai-langchain/RAG";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RetrievalChain } from "./langchain";
import { readDocuments } from "./read-documents";

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

export async function getFgaModel(modelFileName: string): Promise<string> {
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    
    const modelPath = path.join(process.cwd(), "openfga", modelFileName);
    const modelContent = await fs.readFile(modelPath, "utf-8");
    
    return modelContent;
  } catch (error) {
    console.error(`Error reading FGA model file ${modelFileName}:`, error);
    // Return a fallback model if file can't be read
    return `model
  schema 1.1

type user

# Error loading model file: ${modelFileName}`;
  }
}

export async function getRagModel(): Promise<string> {
  return getFgaModel("rag.model.fga");
}

export async function getDriveModel(): Promise<string> {
  return getFgaModel("drive.model.fga");
}

export async function getBankModel(): Promise<string> {
  return getFgaModel("bank.model.fga");
}

export async function getHealthModel(): Promise<string> {
  return getFgaModel("health.model.fga");
}

export async function getHealthReports(user: string, doctor: boolean) {
  const assignedHealthRecords = await getFgaHealthRecordssForUser(user, doctor);
  return healthRecords.filter((record) =>
    assignedHealthRecords.includes(record.id)
  );
}

export async function queryDocumentsWithFGA(
  userId: string,
  query: string
): Promise<string> {
  try {
    // 1. Read and load documents from the assets folder
    const documents = await readDocuments();
    
    console.log(JSON.stringify(documents));
    // 2. Create an in-memory vector store from the documents for OpenAI models.
    const vectorStore = await MemoryVectorStore.fromDocuments(
      documents,
      new OpenAIEmbeddings({ model: "text-embedding-3-small", apiKey: process.env.OPENAI_API_KEY })
    );
    
    // 3. Create a retrieval chain with root prompt and OpenAI model configuration
    const retrievalChain = await RetrievalChain.create({
      // 4. Chain the retriever with the FGARetriever to check the permissions.
      retriever: FGARetriever.create({
        retriever: vectorStore.asRetriever(),
        // FGA tuple to query for the user's permissions
        buildQuery: (doc) => ({
          user: `user:${userId}`,
          object: `doc:${doc.metadata.id}`,
          relation: "viewer",
        }),
      }, {
          apiUrl: process.env.FGA_API_URL,
          storeId: process.env.FGA_RAG_STORE,
          credentials : { method: "none", config : { apiTokenIssuer: "", clientId: "", clientSecret: "", apiAudience: "" }  }
      }),
    });
    
    // 5. Query the retrieval chain with the provided prompt
    const answer = await retrievalChain.query(query);
    
    return answer;
  } catch (error) {
    console.error("Error querying documents with FGA:", error);
    throw new Error("Failed to query documents with authorization");
  }
}
