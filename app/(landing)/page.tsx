import Image from "next/image";
import Background from "./_components/background";
import BannerMuseo from "./_components/bannerMuseo";
import "./_components/bento-image.css";
import Button from "./_components/button";

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
      <Background />

      <div className="min-h-screen flex flex-col items-center">
        <h1 className="text-5xl lg:text-7xl xl:text-9xl font-black text-center md:my-12 my-8 md:mb-8 text-almond-800">
          Dorichangos
        </h1>

        <h3 className="text-xl lg:text-2xl xl:text-3xl text-almond-600 max-w-3xl md:px-0 px-6 mb-14">
          Inserte una frase aqui que haga que la gente quiera comprar, puede ser algun eslogan
        </h3>

        <Button />

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