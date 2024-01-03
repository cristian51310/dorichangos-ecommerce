import AddCategoryForm from "./add-form"

export default async function AddProductsPage() {
  return (
    <div className="md:mx-20 lg:mx-28 xl:mx-32">
      <h1 className="text-xl font-bold mb-7">Agregar Promocional</h1>

      <AddCategoryForm />
    </div>
  )
}