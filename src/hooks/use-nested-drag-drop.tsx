import { useState, useCallback } from "react"
import { initialItems } from "../data/inital-items"
import { findItemAndParent, removeItem, isDescendant } from "../utils/item-helpers"
import type { Item } from "../types/item"

export const useNestedDragDrop = () => {
  const [items, setItems] = useState<Item[]>(initialItems)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(initialItems.map((item) => item.id)))
  const toggleExpand = useCallback((id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }, [])

  const moveItem = useCallback((draggedId: string, targetId: string, dropPosition: "before" | "after" | "child") => {
    setItems((prevItems) => {
      const draggedItemInfo = findItemAndParent(prevItems, draggedId)
      const targetItemInfo = findItemAndParent(prevItems, targetId)

      if (!draggedItemInfo || !targetItemInfo) {
        console.warn("Dragged or target item not found.")
        return prevItems
      }

      const { item: draggedItem } = draggedItemInfo
      const { item: targetItem } = targetItemInfo

      if (isDescendant(draggedItem, targetItem)) {
        console.warn("Cannot move an item into its own descendant.")
        return prevItems
      }

      let newItems = JSON.parse(JSON.stringify(prevItems)) as Item[]

      newItems = removeItem(newItems, draggedId)

      const updatedTargetItemInfo = findItemAndParent(newItems, targetId)
      if (!updatedTargetItemInfo) {
        console.error("Target item disappeared after removal. This should not happen.")
        return prevItems
      }
      const { item: updatedTargetItem, parent: updatedTargetParent, index: updatedTargetIndex } = updatedTargetItemInfo

      if (dropPosition === "child") {
        if (updatedTargetItem) {
          updatedTargetItem.children.push(draggedItem)
          setExpandedItems((prev) => new Set(prev).add(updatedTargetItem.id))
        }
      } else {
        const parentList = updatedTargetParent ? updatedTargetParent.children : newItems
        const insertIdx = dropPosition === "before" ? updatedTargetIndex : updatedTargetIndex + 1
        parentList.splice(insertIdx, 0, draggedItem)
      }

      return newItems
    })
  }, [])

  return {
    items,
    expandedItems,
    moveItem,
    toggleExpand,
  }
}
