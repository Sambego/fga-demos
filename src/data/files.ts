export type File = {
  id: string;
  name: string;
  type: "doc" | "image" | "slides" | "folder";
};

export const files: File[] = [
  {
    id: "1",
    name: "Strategy",
    type: "doc",
  },
  {
    id: "2",
    name: "Statistics",
    type: "slides",
  },
  {
    id: "3",
    name: "Logo",
    type: "image",
  },
  {
    id: "4",
    name: "Documentation",
    type: "folder",
  },
  {
    id: "5",
    name: "Blog posts",
    type: "folder",
  },
];
