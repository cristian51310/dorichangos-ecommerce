import getCategories from "@/actions/getCategories";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Footer from "@/components/footer/footer";
import NavbarDesktop from "@/components/navbar/desktop/navbar-desktop";
import NavbarMobile from "@/components/navbar/mobile/navbar-mobile";
import CartProvider from "@/providers/cart-provider";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  const categories = await getCategories()

  return (
    <CartProvider>
      <NavbarDesktop
        user={user}
        categories={categories}
        className="hidden md:block"
      />
      <NavbarMobile
        user={user}
        categories={categories}
        className="md:hidden"
      />
      <div className="flex flex-col">
        <div className="flex-1 space-y-5 p-8 px-6 md:px-40 pt-6">
          {children}
        </div>
      </div>
      <Footer />
    </CartProvider>
  )
}