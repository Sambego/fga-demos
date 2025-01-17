export type User = {
  id: string;
  name: string;
  email: string;
  child?: boolean;
  doctor?: boolean;
};

export const users: User[] = [
  {
    id: "sam",
    name: "Sam",
    email: "sam@example.com",
    doctor: true,
  },
  {
    id: "chiara",
    name: "Chiara",
    email: "chiara@example.com",
  },
  {
    id: "jane",
    name: "Jane",
    email: "jane.doe@example.com",
    child: true,
  },
];

export function getUsers(): Array<User> {
  return users;
}

export function getCurrentUser(): User {
  return users[0];
}
