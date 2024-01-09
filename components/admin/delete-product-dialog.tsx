import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TrashIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { toast } from "sonner"

interface Props {
  id: string,
}

export default function DeleteProductDialog({ id }: Props) {
  const router = useRouter()

  const handleDelete = useCallback(async (id: string) => {
    toast.info("Borrando producto...")
    axios.post(`/api/products/delete`, { id })
      .then(() => {
        toast.success("Producto Borrado")
        router.refresh()
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }, [router])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <TrashIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Eliminar Producto</DialogTitle>
          <DialogDescription>
            ¿Estas seguro que deseas eliminar el producto?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            variant="destructive"
            onClick={() => handleDelete(id)}
          >
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}