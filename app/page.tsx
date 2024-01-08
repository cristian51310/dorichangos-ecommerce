import BannerMuseo from "@/components/landing/bannerMuseo";
import Title from "@/components/landing/title";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative flex flex-col items-center">
      <Title />

      <h3 className="text-xl lg:text-2xl xl:text-3xl text-pink-700 max-w-2xl md:px-0 px-8">
        Inserte una frase aqui que haga que la gente quiera comprar, puede ser algun eslogan o algo asi
      </h3>

      <BannerMuseo />
    </div>
  );
}