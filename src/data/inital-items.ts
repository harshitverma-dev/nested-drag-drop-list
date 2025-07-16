import type { Item } from "../types/item"

export const initialItems: Item[] = [
  {
    id: "1",
    label: "Item 1",
    children: [
      {
        id: "1.1",
        label: "Item 1.1",
        children: [],
      },
      {
        id: "1.2",
        label: "Item 1.2",
        children: [],
      },
      {
        id: "1.3",
        label: "Item 1.3",
        children: [],
      },
    ],
  },
  {
    id: "2",
    label: "Item 2",
    children: [
      {
        id: "2.1",
        label: "Item 2.1",
        children: [],
      },
      {
        id: "2.2",
        label: "Item 2.2",
        children: [],
      },
    ],
  },
  {
    id: "3",
    label: "Item 3",
    children: [
      {
        id: "3.1",
        label: "Item 3.1",
        children: [],
      },
    ],
  },
]
