"use client"
import { Category } from "@prisma/client"
import Dropdown from "../categories-dropdown"

export default function Navbar({ categories }: { categories: Category[] }) {
  return (
    <div className="transition items-center justify-between w-full bg-pink-600 h-16 px-6 md:px-12">
      <div className="w-full mx-auto relative flex items-center justify-between">
        <Dropdown
          categories={categories}
        />
      </div>
    </div>
  )
}