import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HealthRecord } from "@/data/health-records";
import HealthRecordComponent from "./health-record";
export default function HealthRecords({
  records,
}: {
  records: Array<HealthRecord>;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Patient</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((record) => (
          <HealthRecordComponent record={record} key={record.id} />
        ))}
      </TableBody>
    </Table>
  );
}
