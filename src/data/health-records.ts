export type HealthRecord = {
  id: string;
  name: string;
  type: "xray" | "lab" | "report";
  patient: string;
};

export const healthRecords: HealthRecord[] = [
  {
    id: "1",
    name: "Wrist scan",
    type: "xray",
    patient: "Chiara",
  },
  {
    id: "2",
    name: "Blood test",
    type: "lab",
    patient: "Chiara",
  },
  {
    id: "3",
    name: "Echo",
    type: "xray",
    patient: "Chiara",
  },
  {
    id: "4",
    name: "Polio Vaccination",
    type: "report",
    patient: "Jane",
  },
  {
    id: "5",
    name: "Measles Vaccination",
    type: "report",
    patient: "Jane",
  },
  {
    id: "6",
    name: "Foot scan",
    type: "xray",
    patient: "John",
  },
  {
    id: "7",
    name: "Covid Vaccination",
    type: "report",
    patient: "John",
  },
];
