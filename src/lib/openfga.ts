import {
  ClientBatchCheckRequest,
  ClientCheckRequest,
  OpenFgaClient,
} from "@openfga/sdk";

export const openFga: OpenFgaClient = new OpenFgaClient({
  apiUrl: process.env.FGA_API_URL,
  storeId: process.env.FGA_DRIVE_STORE,
  authorizationModelId: process.env.FGA_DRIVE_MODEL,
});

export async function getFgaFilesForUser(user: string) {
  const files = await openFga.listObjects({
    user: `user:${user}`,
    relation: "viewer",
    type: "file",
  });
  return files?.objects?.map((file) => file.replace("file:", ""));
}

export function getFgaRolesForFile(file: string) {
  const promises = [
    openFga.listUsers({
      object: {
        type: "file",
        id: file,
      },
      user_filters: [
        {
          type: "user",
        },
      ],
      relation: "owner",
    }),
    openFga.listUsers({
      object: {
        type: "file",
        id: file,
      },
      user_filters: [
        {
          type: "user",
        },
      ],
      relation: "editor",
    }),
    openFga.listUsers({
      object: {
        type: "file",
        id: file,
      },
      user_filters: [
        {
          type: "user",
        },
      ],
      relation: "viewer",
    }),
  ];

  return Promise.all(promises).then((promises) => ({
    owner: promises[0]?.users?.map((u) => u.object),
    editor: promises[1]?.users?.map((u) => u.object),
    viewer: promises[2]?.users?.map((u) => u.object),
  }));
}

export function addFgaRoleForFile(file: string, user: string, role: string) {
  return openFga.writeTuples(
    [{ user: `user:${user}`, relation: role, object: `file:${file}` }],
    {
      storeId: process.env.FGA_DRIVE_STORE,
      authorizationModelId: process.env.FGA_DRIVE_MODEL,
    }
  );
}

export function removeFgaRoleForFile(file: string, user: string, role: string) {
  return openFga.deleteTuples(
    [{ user: `user:${user}`, relation: role, object: `file:${file}` }],
    {
      storeId: process.env.FGA_DRIVE_STORE,
      authorizationModelId: process.env.FGA_DRIVE_MODEL,
    }
  );
}

export async function checkFgaUserPermissionsForFile(
  file: string,
  user: string,
  permissions: Array<string>
) {
  const checkResults = await openFga.batchCheck(
    permissions.map(
      (permission: string): ClientCheckRequest => ({
        user: `user:${user}`,
        relation: permission,
        object: `file:${file}`,
      })
    ) as ClientBatchCheckRequest
  );
  return checkResults.responses.reduce(
    (p, checkResult, i) => ({ ...p, [permissions[i]]: checkResult.allowed }),
    {}
  );
}
