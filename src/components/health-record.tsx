import { HealthRecord } from "@/data/health-records";
import { TableCell, TableRow } from "@/components/ui/table";
import { Bone, ClipboardPlus, Edit, FlaskConical } from "lucide-react";
import { Button } from "./ui/button";
export default function HealthRecordComponent({
  record,
}: {
  record: HealthRecord;
}) {
  const renderTypeIcon = (type: string) => {
    switch (type) {
      case "xray":
        return <Bone />;
      case "lab":
        return <FlaskConical />;
      default:
        return <ClipboardPlus />;
    }
  };
  return (
    <TableRow>
      <TableCell>{renderTypeIcon(record.type)}</TableCell>
      <TableCell>{record.name}</TableCell>
      <TableCell>{record.patient}</TableCell>
    </TableRow>
  );
}
