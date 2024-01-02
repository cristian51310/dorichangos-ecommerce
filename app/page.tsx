import BannerMuseo from "@/components/landing/bannerMuseo";
import Title from "@/components/landing/title";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center mb-24">
      <Title />
      <BannerMuseo />
    </div>
  );
}