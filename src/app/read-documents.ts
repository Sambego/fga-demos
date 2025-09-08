import fs from "node:fs/promises";
import path from "node:path";
import { Document } from "@langchain/core/documents";

async function readDoc(filePath: string) {
  return await fs.readFile(filePath, "utf-8");
}

/* Reads documents from the docs folder and converts them to langChain Documents */
export async function readDocuments() {
  // Use path.join to ensure proper path resolution from project root
  const folderPath = path.join(process.cwd(), "docs");
  
  try {
    const files = await fs.readdir(folderPath);
    const documents: Document[] = [];

    for (const file of files) {
      // Skip non-markdown files
      if (!file.endsWith('.md')) {
        continue;
      }
      
      const filePath = path.join(folderPath, file);
      documents.push(
        new Document({
          pageContent: await readDoc(filePath),
          metadata: { id: file.slice(0, file.lastIndexOf(".")) },
        })
      );
    }

    return documents;
  } catch (error) {
    console.error(`Error reading documents from ${folderPath}:`, error);
    throw new Error(`Failed to read documents from ${folderPath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
