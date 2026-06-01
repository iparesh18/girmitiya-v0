import { Link } from 'react-router-dom';
import { ArrowRight, Check, HandHeart, Sprout } from 'lucide-react';
import ActivityCard from '../ActivityCard';
import BlogCard from '../BlogCard';
import StatsCounter from '../StatsCounter';
import TestimonialSlider from '../TestimonialSlider';
import AnimatedContainer from '../common/AnimatedContainer';
import Button from '../common/Button';
import Card from '../common/Card';
import FlowingMenu from '../common/FlowingMenu';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import PartnerMarquee from './PartnerMarquee';
import { activities, blogs, images, values, workAreas } from '../../data/siteData';

export function AboutPreview() {
  return (
    <section className="py-20">
      <div className="container-pad grid items-center gap-10 lg:grid-cols-2">
        <AnimatedContainer>
          <img src={images.about} alt="Community members" loading="lazy" className="aspect-[4/3] rounded-[2rem] object-cover shadow-premium" />
        </AnimatedContainer>
        <AnimatedContainer delay={0.1}>
          <SectionHeading
            align="left"
            eyebrow="About Girmitiya Foundation"
            title="A trust-centered movement for memory, dignity, and development."
            titleStyle={{ fontFamily: '"Bebas Neue", sans-serif' }}
            text="We preserve shared heritage, empower communities, and strengthen belonging." 
          />
          <div className="mt-6 grid gap-4">
            <div className="grid gap-3 rounded-2xl border border-primary/10 bg-white/70 p-4 shadow-[0_16px_40px_rgba(95,59,36,0.08)]">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Our journey</p>
              <div className="grid gap-3 sm:grid-cols-4">
                {[
                  ['2013', 'Foundation started'],
                  ['2017', 'Global chapters'],
                  ['2020', 'Digital archive'],
                  ['2025', 'Worldwide community']
                ].map(([year, label]) => (
                  <div key={year} className="rounded-2xl border border-primary/10 bg-light/80 p-3 text-center">
                    <p className="font-display text-lg font-bold text-primary">{year}</p>
                    <p className="mt-1 text-xs font-semibold text-earth/70">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Button to="/about" className="mt-7" icon={ArrowRight}>Learn More About Us</Button>
        </AnimatedContainer>
      </div>
    </section>
  );
}

export function MissionVision() {
  return (
    <section className="pattern-band py-20">
      <div className="container-pad">
        <SectionHeading eyebrow="Mission & Vision" title="Carrying the past with responsibility, building the future with care." />
        <div className="grid gap-6 md:grid-cols-2">
          {[
            ['Our Mission', 'To empower communities through heritage preservation, social development, inclusive education, and practical support systems.'],
            ['Our Vision', 'A confident Girmitiya community that knows its roots, protects its dignity, and creates opportunity for every generation.']
          ].map(([title, text]) => (
            <Card key={title}>
              <Sprout className="text-primary" size={34} />
              <Reveal as="h3" className="mt-5 font-display text-3xl font-bold text-primary">
                {title}
              </Reveal>
              <p className="mt-4 leading-8 text-earth/80">{text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WorkAreas() {
  return (
    <section className="py-20">
      <div className="container-pad">
        <SectionHeading eyebrow="What We Do" title="Programs shaped around real community needs." text="Practical programs rooted in cultural belonging." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {workAreas.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} to={item.path}>
                <Card className="h-full bg-white/90 p-6 text-earth shadow-[0_18px_40px_rgba(95,59,36,0.12)]">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon />
                  </div>
                  <Reveal as="h3" className="mt-4 font-display text-xl font-bold text-primary">
                    {item.title}
                  </Reveal>
                  <p className="mt-2 text-sm leading-6 text-earth/80">{item.text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Explore More <ArrowRight size={14} />
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function RootReconnect() {
  return (
    <section className="py-20">
      <div className="container-pad overflow-hidden rounded-[2.2rem] bg-primary text-light shadow-premium">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="p-8 sm:p-12">
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-saffron">Our Stories</span>
            <Reveal as="h2" className="mt-4 font-display text-4xl font-bold sm:text-5xl">
              Find names, places, stories, and the quiet threads between them.
            </Reveal>
            <p className="mt-5 leading-8 text-light/80">Every family has a journey. Discover the connections.</p>
            <Button to="/root-search" className="mt-8 bg-saffron" icon={ArrowRight}>Start Exploring</Button>
          </div>
          <img src={images.roots} alt="Old records and heritage" loading="lazy" className="h-full min-h-80 w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

export function FeaturedActivities() {
  return (
    <section className="py-20">
      <div className="container-pad">
        <SectionHeading eyebrow="Featured Activities" title="Action that feels human, grounded, and measurable." />
        <div className="grid gap-6 lg:grid-cols-3">
          {activities.map((item) => <ActivityCard key={item.title} item={item} />)}
        </div>
      </div>
    </section>
  );
}

export function ProgramHighlights() {
  const items = [
    ['Women Empowerment', images.women, '/woman-empowerment', 'Confidence circles, financial literacy, livelihood support, and leadership workshops for women.'],
    ['Skill Development', images.skill, '/skill-development', 'Digital basics, career readiness, enterprise mentoring, and community training labs.'],
    ['Child Welfare', images.child, '/child-welfare', 'Education support, safe spaces, nutrition awareness, and creative learning opportunities.']
  ];
  return (
    <section className="pattern-band py-20">
      <div className="container-pad">
        <SectionHeading eyebrow="Program Highlights" title="Development programs with warmth and structure." />
        <div className="grid gap-6 lg:grid-cols-3">
          {items.map(([title, image, path, text]) => (
            <Card key={title} className="overflow-hidden p-0">
              <img src={image} alt={title} loading="lazy" className="h-64 w-full object-cover" />
              <div className="p-6">
                <Reveal as="h3" className="font-display text-2xl font-bold text-primary">
                  {title}
                </Reveal>
                <p className="mt-3 leading-7 text-earth/80">{text}</p>
                <Button to={path} variant="ghost" className="mt-5">View Program</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container-pad">
        <SectionHeading eyebrow="Community Voices" title="Community stories carry the heart of the foundation." text="" />
        <TestimonialSlider />
      </div>
    </section>
  );
}

export function BlogPreview() {
  return (
    <section className="py-20">
      <div className="container-pad">
        <SectionHeading eyebrow="Ideas & Reflections" title="Ideas, field notes, and heritage reflections." text="" />
        <div className="grid gap-6 lg:grid-cols-3">
          {blogs.slice(0, 3).map((post) => <BlogCard key={post.title} post={post} />)}
        </div>
      </div>
    </section>
  );
}

export function FlowingMenuShowcase() {
  const items = [
    { link: '/publication', text: 'Archives', image: images.publication },
    { link: '/root-search', text: 'Root Search', image: images.roots },
    { link: '/woman-empowerment', text: 'Women Empowerment', image: images.women },
    { link: '/skill-development', text: 'Skill Development', image: images.skill },
    { link: '/child-welfare', text: 'Child Welfare', image: images.child }
  ];

  return (
    <section className="py-20">
      <div className="container-pad">
        <SectionHeading
          eyebrow="Heritage Pathways"
          title="Explore the living map of programs and archives."
          text=""
        />
        <div className="relative h-[420px] overflow-hidden rounded-[2rem] border border-primary/20 shadow-premium">
          <FlowingMenu
            items={items}
            speed={18}
            textColor="#fff7e6"
            bgColor="#1a130f"
            marqueeBgColor="#f8ead0"
            marqueeTextColor="#5f3b24"
            borderColor="rgba(255,247,230,0.2)"
          />
        </div>
      </div>
    </section>
  );
}

export function GalleryPartnersCta() {
  return (
    <>
      <section className="py-20">
        <div className="container-pad">
          <SectionHeading eyebrow="Moments That Matter" title="Moments from the field and the community." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[images.about, images.women, images.skill, images.child].map((image, index) => (
              <img key={image} src={image} alt={`Foundation gallery ${index + 1}`} loading="lazy" className="h-72 w-full rounded-[1.5rem] object-cover shadow-premium transition duration-700 hover:scale-[1.03]" />
            ))}
          </div>
        </div>
      </section>
      <section className="pb-20">
        <div className="container-pad">
          <div className="rounded-[2rem] border border-primary/15 bg-white/85 p-8 shadow-[0_20px_45px_rgba(95,59,36,0.12)]">
            <p className="text-center text-sm font-bold uppercase tracking-[0.24em] text-primary">Our Partners</p>
            <div className="mt-7">
              <PartnerMarquee />
            </div>
          </div>
        </div>
      </section>
      <section className="pb-20">
        <div className="container-pad">
          <div className="rounded-[2.2rem] bg-gradient-to-r from-maroon to-earth p-8 text-light shadow-premium sm:p-12 lg:flex lg:items-center lg:justify-between">
            <div>
              <HandHeart className="text-saffron" size={42} />
              <Reveal as="h2" className="mt-4 font-display text-4xl font-bold">
                Your support can turn memory into momentum.
              </Reveal>
              <p className="mt-3 max-w-2xl leading-8 text-light/76">Donate, volunteer, sponsor a program, or help a family begin the root search journey.</p>
            </div>
            <Button to="/contact"  className="mt-7 lg:mt-0 bg-saffron">Donate Now</Button>
          </div>
        </div>
      </section>
    </>
  );
}
