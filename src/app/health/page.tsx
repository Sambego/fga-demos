"use client";
import Accounts from "@/components/accounts";
import { getCurrentUser, getUsers } from "@/data/user";
import { useEffect, useState } from "react";
import { User } from "@/data/user";
import { CircleOff, HeartPulse } from "lucide-react";
import HealthRecords from "@/components/health-records";
import { HealthRecord } from "@/data/health-records";
import { getHealthReports } from "../actions";
import ModelPreview from "@/components/model-preview";

const modelPreview = `model
  schema 1.1
  type jurisdiction
    relations
      define doctor: [doctor]
  type doctor
  type patient
    relations
      define guardian: [patient]
  type record
    relations
      define jurisdiction: [jurisdiction]
      define owner: [patient]
      define viewer: owner or guardian from owner or doctor
      define doctor: [doctor] or doctor from jurisdiction
      define can_view: viewer
      define can_edit: doctor`;

export const dynamic = "force-dynamic";
export default function Health() {
  const [currentUser, setCurrentUser] = useState<User>(getCurrentUser());
  const [users] = useState<User[]>(getUsers());
  const [healthRecords, setHealthRecords] = useState<Array<HealthRecord>>([]);
  const handleSetCurrentUser = (user: string) => {
    setCurrentUser(users.find((u) => u.id === user));
  };
  useEffect(() => {
    getHealthReports(currentUser.id, !!currentUser?.doctor).then((records) => {
      setHealthRecords(records);
    });
  }, []);

  useEffect(() => {
    getHealthReports(currentUser.id, !!currentUser?.doctor).then((records) => {
      setHealthRecords(records);
    });
  }, [currentUser]);
  return (
    <div className="w-full">
      <div className="flex flex-row justify-items-end items-end mb-4">
        <div className="flex items-center">
          <HeartPulse className="inline-block mr-2" />
          <p className="text-xl font-bold tracking-wide">FGA Health</p>
        </div>
        <div className="ml-auto">
          <Accounts
            users={users}
            currentUser={currentUser.id}
            setCurrentUser={handleSetCurrentUser}
            showDoctor={true}
            showChild={true}
          />
        </div>
      </div>
      <div className="border rounded-lg">
        {healthRecords.length ? (
          <HealthRecords records={healthRecords} />
        ) : (
          <p className="px-4 py-4 text-center ">
            <CircleOff className="inline w-4 mr-2 align-text-bottom" />
            No Records for user
          </p>
        )}

        <footer className="p-4 bg-gray-100 rounded-b-lg">
          <p className="text-sm mb-2">
            Doctors can view all their patients&#39; records.{" "}
            <strong>Sam is doctor</strong>.
          </p>
          <p className="text-sm mb-2">
            Parents can view records belonging to their children.{" "}
            <strong>Chiara is a parent of Jane</strong>.
          </p>
        </footer>
      </div>
      <ModelPreview model={modelPreview} />
    </div>
  );
}
