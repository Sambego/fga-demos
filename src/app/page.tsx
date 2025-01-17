"use client";
import Accounts from "@/components/accounts";
import { getCurrentUser, getUsers } from "@/data/user";
import Drive from "@/components/drive";
import { getFiles } from "./actions";
import { Suspense, useEffect, useState } from "react";
import { User } from "@/data/user";
import { File } from "@/data/files";
import { CircleOff, HardDrive } from "lucide-react";
import ModelPreview from "@/components/model-preview";

const modelPreview = `model
  schema 1.1
    type user
    type file
      relations
        define owner: [user]
        define editor: [user] or owner
        define viewer: [user] or editor
      
        define can_delete: owner
        define can_share: editor
        define can_edit: editor
        define can_view: viewer`;

export const dynamic = "force-dynamic";
export default function Home() {
  const [currentUser, setCurrentUser] = useState<string>(getCurrentUser().id);
  const [users] = useState<User[]>(getUsers());
  const [files, setFiles] = useState<Array<File>>([]);

  useEffect(() => {
    getFiles(currentUser).then((files) => {
      setFiles(files);
    });
  }, []);

  useEffect(() => {
    getFiles(currentUser).then((files) => {
      setFiles(files);
    });
  }, [currentUser]);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-items-end items-end mb-4">
        <div className="flex items-center">
          <HardDrive className="inline-block mr-2" />
          <p className="text-xl font-bold tracking-wide">FGA Drive</p>
        </div>
        <div className="ml-auto">
          <Accounts
            users={users}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </div>
      </div>
      <div className="border rounded-lg">
        {files.length ? (
          <Drive files={files} currentUser={currentUser} />
        ) : (
          <p className="px-4 py-4 text-center ">
            <CircleOff className="inline w-4 mr-2 align-text-bottom" />
            No files for user
          </p>
        )}
      </div>
      <ModelPreview model={modelPreview} />
    </div>
  );
}
