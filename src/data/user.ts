export type User = {
  id: string;
  name: string;
  email: string;
};

export const users: User[] = [
  {
    id: "1",
    name: "Sam",
    email: "sam@openfga.dev",
  },
  {
    id: "2",
    name: "Chiara",
    email: "Chiara@openfga.dev",
  },
  {
    id: "3",
    name: "Ada",
    email: "ada@openfga.dev",
  },
];

export function getUsers(): Array<User> {
  return users;
}

export function getCurrentUser(): User {
  return users[0];
}
