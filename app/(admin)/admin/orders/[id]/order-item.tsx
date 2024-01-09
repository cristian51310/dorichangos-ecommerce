import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatPrice } from "@/lib/formatPrice";
import { CartProductType } from "@prisma/client";
import Image from "next/image";

interface OrderItemProps {
  products: CartProductType[]
}

export default function OrderItems({ products }: OrderItemProps) {
  return (
    <Table>
      <TableCaption>Lista de productos que estan en esta orden.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Producto</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="flex items-center gap-4">
              <div className="relative w-20 aspect-square rounded-md">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain rounded-md"
                />
              </div>
              {product.name}
            </TableCell>
            <TableCell>
              aqui va el precio
            </TableCell>
            <TableCell>
              {product.quantity}
            </TableCell>
            <TableCell>
              aqui va el precio por la cantidad
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}