import LaptopScroll from "@/components/LaptopScroll";
import ContentSection from "@/components/ContentSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <LaptopScroll />
      <ContentSection />
      <Footer />
    </main>
  );
}
