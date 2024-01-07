import {
  IoAppsOutline,
  IoBarChartOutline,
  IoCalculatorOutline,
  IoCalendarOutline,
  IoHeartOutline,
  IoMusicalNoteSharp,
  IoNotificationsOutline,
  IoPizzaOutline,
  IoReceiptOutline
} from "react-icons/io5"

export interface AdminLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  pathname: string
  href: string
  children: React.ReactNode
}


export const adminLinks = [
  {
    href: "/admin",
    icon: IoBarChartOutline,
    label: "Resumen"
  },
  {
    href: "/admin/products",
    icon: IoPizzaOutline,
    label: "Productos"
  },
  {
    href: "/admin/categories",
    icon: IoAppsOutline,
    label: "Categorias"
  },
  {
    href: "/admin/orders",
    icon: IoReceiptOutline,
    label: "Ordenes"
  },
  {
    href: "/admin/banners",
    icon: IoHeartOutline,
    label: "Promocionales"
  },
  {
    href: "/admin/museum",
    icon: IoMusicalNoteSharp,
    label: "Museo"
  },
  {
    href: "/admin/reservations",
    icon: IoCalendarOutline,
    label: "Reservas"
  },
  {
    href: "/admin/notifications",
    icon: IoNotificationsOutline,
    label: "Notificaciones"
  },
  {
    href: "/manager",
    icon: IoCalculatorOutline,
    label: "Administrador de mesas"
  }
]
