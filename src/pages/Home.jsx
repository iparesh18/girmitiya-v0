import HeroSection from '../components/home/HeroSection';
import GlobalPresenceSection from '../components/home/GlobalPresenceSection';
// Masonry gallery removed per request
import { images, heroImage } from '../data/siteData';
import {
  AboutPreview,
  BlogPreview,
  FlowingMenuShowcase,
  GalleryPartnersCta,
  RootReconnect,
  Testimonials,
  WorkAreas
} from '../components/home/HomeSections';
import StatsCounter from '../components/StatsCounter';

export default function Home() {
  // masonryItems removed

  return (
    <div className="bg-white">
      <HeroSection />
      {/* Masonry gallery removed */}
      <AboutPreview />
      <section className="pb-20">
        <div className="container-pad">
          <StatsCounter />
        </div>
      </section>
      <WorkAreas />
      <GlobalPresenceSection />
      <RootReconnect />
      <Testimonials />
      <FlowingMenuShowcase />
      <BlogPreview />
      <GalleryPartnersCta />
    </div>
  );
}
