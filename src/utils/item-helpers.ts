import type { Item } from "../types/item"

interface ItemInfo {
  item: Item
  parent: Item | null
  index: number
}

export function findItemAndParent(items: Item[], itemId: string, parent: Item | null = null): ItemInfo | null {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.id === itemId) {
      return { item, parent, index: i }
    }
    if (item.children && item.children.length > 0) {
      const foundInChild = findItemAndParent(item.children, itemId, item)
      if (foundInChild) {
        return foundInChild
      }
    }
  }
  return null
}

export function removeItem(items: Item[], itemId: string): Item[] {
  const newItems = items.filter((item) => item.id !== itemId)

  for (const item of newItems) {
    if (item.children && item.children.length > 0) {
      item.children = removeItem(item.children, itemId)
    }
  }
  return newItems
}

export function isDescendant(draggedItem: Item, targetItem: Item): boolean {
  if (!draggedItem.children || draggedItem.children.length === 0) {
    return false
  }

  for (const child of draggedItem.children) {
    if (child.id === targetItem.id) {
      return true
    }
    if (isDescendant(child, targetItem)) {
      return true
    }
  }
  return false
}
