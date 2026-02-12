import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import AboutUs from '@/components/layout/AboutUs';
import VideoExperience from '@/components/layout/VideoExperience';
import ProductGallery from '@/components/layout/ProductGallery';
import Testimonials from '@/components/layout/Testimonials';
import FAQ from '@/components/layout/FAQ';
import ContactLocation from '@/components/layout/ContactLocation';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import Announcement from '@/components/ui/Announcement';

export default function Home() {
  return (
    <main className="min-h-screen bg-black transition-colors duration-500">
      <Header />
      <Hero />
      <AboutUs />
      <VideoExperience />
      <ProductGallery />
      <Testimonials />
      <FAQ />
      <ContactLocation />

      <Footer />
      <WhatsAppButton />
      <Announcement />
    </main>
  );
}
