import type React from "react"
import { useRef } from "react"
import { useDrag, useDrop, type DropTargetMonitor } from "react-dnd"
import { cn } from "../../utils/cn"
import { ExpandToggle } from "../../components/ExpandToggle"
import { MessageIcon } from "../../components/MessageIcon"
import type { Item } from "../../types/item"

export const ItemType = "ITEM"

interface ListItemProps {
  item: Item
  moveItem: (draggedId: string, targetId: string, dropPosition: "before" | "after" | "child") => void
  wbsPath: number[]
  isExpanded: boolean
  toggleExpand: (id: string) => void
  renderChildren: (itemsToRender: Item[], path: number[], level: number) => React.ReactNode
  level: number
}

export const ListItem: React.FC<ListItemProps> = ({
  item,
  moveItem,
  wbsPath,
  isExpanded,
  toggleExpand,
  renderChildren,
  level,
}) => {
  const ref = useRef<HTMLTableRowElement>(null)
  const wbs = wbsPath.join(".")

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: item.id, type: ItemType },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemType,
    drop: (draggedItem: { id: string }, monitor) => {
      if (!ref.current) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0

      
      if (hoverClientY < hoverMiddleY * 0.3) {
        moveItem(draggedItem.id, item.id, "before")
      } else if (hoverClientY > hoverMiddleY * 1.7) {
        moveItem(draggedItem.id, item.id, "after")
      } else {
        moveItem(draggedItem.id, item.id, "child")
      }
    },
    canDrop: (draggedItem: { id: string }) => draggedItem.id !== item.id,
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  drag(drop(ref))

  const isParent = item.children && item.children.length > 0
  const isTopLevel = wbsPath.length === 1

  return (
    <>
      <tr
        ref={ref}
        className={cn(
          "group cursor-grab border-b border-gray-200 bg-white transition-all duration-200 ease-in-out last:border-b-0 hover:bg-gray-50",
          isDragging && "opacity-40 shadow-md",
          isOver && canDrop && "bg-blue-50",
        )}
      >
        <td className="px-5 py-3 align-middle text-gray-600">
          <span className={cn("font-medium", isTopLevel && "font-semibold text-gray-700")}>{wbs}</span>
        </td>
        <td
          className="flex items-center gap-2 py-3 align-middle text-gray-700"
          style={{ paddingLeft: `${(level - 1) * 30 + 20}px` }}
        >
          {isParent && <ExpandToggle isExpanded={isExpanded} onClick={() => toggleExpand(item.id)} />}
          <span className={cn("text-base", isTopLevel && "font-semibold")}>{item.label}</span>
        </td>
        <td className="px-5 py-3 text-center align-middle">
          <MessageIcon />
        </td>
      </tr>
      {isExpanded && item.children.length > 0 && renderChildren(item.children, wbsPath, level + 1)}
    </>
  )
}
