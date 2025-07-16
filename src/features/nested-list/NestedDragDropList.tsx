import type React from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TouchBackend } from "react-dnd-touch-backend"
import { isMobile } from "react-device-detect"
import { ListItem } from "./ListItem"
import { useNestedDragDrop } from "../../hooks/use-nested-drag-drop"
import type { Item } from "../../types/item"

const backend = isMobile ? TouchBackend : HTML5Backend

export const NestedDragDropList: React.FC = () => {
  const { items, expandedItems, moveItem, toggleExpand } = useNestedDragDrop()

  const renderItems = (itemsToRender: Item[], path: number[] = [], level = 1) => {
    return itemsToRender.map((item, index) => {
      const currentPath = [...path, index + 1]
      const isExpanded = expandedItems.has(item.id)
      return (
        <ListItem
          key={item.id}
          item={item}
          moveItem={moveItem}
          wbsPath={currentPath}
          isExpanded={isExpanded}
          toggleExpand={toggleExpand}
          renderChildren={renderItems}
          level={level}
        />
      )
    })
  }

  return (
    <DndProvider backend={backend}>
      <div className="w-full max-w-3xl rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-2xl font-semibold text-gray-800">Nested Drag-and-Drop List</h1>
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="w-[15%] px-5 py-3 text-left text-sm font-semibold text-gray-600">WBS</th>
                <th className="w-[75%] px-5 py-3 text-left text-sm font-semibold text-gray-600">Activity Name</th>
                <th className="w-[10%] px-5 py-3 text-center text-sm font-semibold text-gray-600"></th>
              </tr>
            </thead>
            <tbody>{renderItems(items)}</tbody>
          </table>
        </div>
        <div className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Current Data Structure</h2>
          <pre className="overflow-auto rounded-md border border-gray-300 bg-white p-4 text-sm text-gray-700">
            {JSON.stringify(items, null, 2)}
          </pre>
        </div>
      </div>
    </DndProvider>
  )
}
