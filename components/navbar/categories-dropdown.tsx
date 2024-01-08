"use client"

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { AlignLeft, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dropdown({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [dropdown, setDropdown] = useState(false)

  const submitHandle = (category: Category) => {
    router.push(`/home/categories/${category.name}`);
    setDropdown(false);
  };

  const handleDropdown = () => setDropdown(!dropdown);

  return (
    <div
      className="relative h-12 mt-4 w-full md:w-[270px]"
      onClick={handleDropdown}
    >
      <AlignLeft size={20} className="absolute top-4 left-4" />

      <button className={cn(
        `h-full w-full flex justify-between items-center pl-12 pt-1 hover:bg-gray-100 text-base font-semibold border-pink-700 border-b-gray-100 select-none rounded-t-xl border border-b-0`,
        !dropdown ? "bg-white border" : "bg-neutral-100"
      )}>
        Categorias
      </button>

      <ChevronUp
        size={20}
        className={cn(
          "absolute right-2 top-4 cursor-pointer transition-transform duration-300",
          dropdown ? "rotate-0" : "rotate-180"
        )}
        onClick={handleDropdown}
      />

      {dropdown ? (
        <div className="w-full md:w-[270px] bg-neutral-100 border border-pink-700 border-t-0 absolute z-30 rounded-b-xl shadow-sm">
          {categories && categories.map((category) => (
            <div
              key={category.id}
              className={"flex items-center cursor-pointer hover:bg-neutral-200 last:rounded-b-xl"}
              onClick={() => submitHandle(category)}
            >
              <Image
                src={category.image}
                alt={category.name}
                width={32}
                height={32}
                className="rounded-full object-cover ml-3 w-8 h-8"
              />
              <h3 className="m-3 cursor-pointer">{category.name}</h3>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}