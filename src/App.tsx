import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TouchBackend } from "react-dnd-touch-backend"
import { isMobile } from "react-device-detect"
import { NestedDragDropList } from "./features/nested-list/NestedDragDropList"

const backend = isMobile ? TouchBackend : HTML5Backend

export default function App() {
  return (
    <DndProvider backend={backend}>
      <div className="flex min-h-screen items-start justify-center bg-gray-50 p-10">
        <NestedDragDropList />
      </div>
    </DndProvider>
  )
}
