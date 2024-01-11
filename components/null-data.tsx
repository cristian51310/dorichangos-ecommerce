export default function NullData({ title, children }: { title: string, children?: React.ReactNode }) {
  return (
    <div className="w-full h-[50vh] px-6 md:px-12 flex flex-col items-center justify-center ">
      <h1 className="text-xl md:text-3xl font-semibold text-center">{title}</h1>
      <div className="mt-6 flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  )
}