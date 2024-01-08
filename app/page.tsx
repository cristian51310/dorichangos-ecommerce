import BannerMuseo from "@/components/landing/bannerMuseo";
import Title from "@/components/landing/title";
import Image from "next/image";
import LandingBackground from "@/components/landing/background";
import LandingButton from "@/components/landing/landing-button";
import "../components/landing/bento-image.css";

const images = [
  "/images/landing/1.jpg",
  "/images/landing/3.jpg",
  "/images/landing/4.jpg",
  "/images/landing/5.jpg",
  "/images/landing/6.jpg",
  "/images/landing/8.jpg",
  "/images/landing/10.jpg",
  "/images/landing/11.jpg",
  "/images/landing/12.jpg",
]

export default function LandingPage() {
  return (
    <>
      <LandingBackground />

      <div className="min-h-screen flex flex-col items-center">
        <Title />

        <h3 className="text-xl lg:text-2xl xl:text-3xl text-pink-700 max-w-3xl md:px-0 px-6 mb-14">
          Inserte una frase aqui que haga que la gente quiera comprar, puede ser algun eslogan
        </h3>

        <LandingButton />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl mt-12 mb-20 md:px-0 px-6">
          {images.map((image, index) => (
            <Image
              id="bento-image"
              key={index}
              src={image}
              width={300}
              height={300}
              alt="Imagen 1"
              className="rounded-xl bg-cover aspect-square"
            />
          ))}
        </div>

        <BannerMuseo />
      </div>
    </>

  );
}