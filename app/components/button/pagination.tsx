import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import type React from "react"

export function Pagination(): React.JSX.Element {
  return (
    <div className="join mx-auto">
      <button type="button" className="join-item btn btn-disabled">
        <ChevronLeftIcon className="size-4" />
      </button>
      <button type="button" className="join-item btn">
        1
      </button>
      <button type="button" className="join-item btn btn-disabled">
        <ChevronRightIcon className="size-4" />
      </button>
    </div>
  )
}
