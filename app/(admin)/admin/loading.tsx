import Loader from "@/components/loader/loader"

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-100px)]">
      <Loader />
    </div>
  )
}