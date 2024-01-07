import getCategories from "@/actions/getCategories";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Footer from "@/components/footer/footer";
import NavbarDesktop from "@/components/navbar/desktop/navbar-desktop";
import NavbarMobile from "@/components/navbar/mobile/navbar-mobile";
import CartProvider from "@/providers/cart-provider";
import HeaderMuseum from "@/components/navbar/desktop/header-museum";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  const categories = await getCategories()

  return (
    <CartProvider>
      <HeaderMuseum />
      <NavbarDesktop
        user={user}
        categories={categories}
        className="hidden md:block sticky top-0 z-50"
      />
      <NavbarMobile
        user={user}
        categories={categories}
        className="md:hidden"
      />
      {children}
      <Footer />
    </CartProvider>
  )
}