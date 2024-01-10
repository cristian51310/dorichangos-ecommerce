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
              <div className="relative h-24 aspect-square rounded-md overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className=" bg-cover rounded-md"
                />
              </div>
              <div className="grid gap-3">
                <p className="font-bold text-xl">{product.name}</p>
                <p>{product.size}</p>
              </div>
            </TableCell>
            <TableCell>
              {formatPrice(product.price)}
            </TableCell>
            <TableCell>
              {product.quantity}
            </TableCell>
            <TableCell>
              ${(product.price * product.quantity).toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}