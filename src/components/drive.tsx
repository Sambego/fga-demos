"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { File } from "@/data/files";
import FileComponent from "@/components/file";

export default function Drive({
  files,
  currentUser,
}: {
  files: File[];
  currentUser: string;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>File</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => (
          <FileComponent file={file} key={file.id} currentUser={currentUser} />
        ))}
      </TableBody>
    </Table>
  );
}
