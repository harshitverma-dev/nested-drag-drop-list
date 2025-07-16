import type React from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

interface ExpandToggleProps {
  isExpanded: boolean
  onClick: () => void
}

export const ExpandToggle: React.FC<ExpandToggleProps> = ({ isExpanded, onClick }) => {
  return (
    <span
      className="flex h-6 w-6 cursor-pointer items-center justify-center text-gray-500 hover:text-gray-700"
      onClick={onClick}
    >
      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
    </span>
  )
}
