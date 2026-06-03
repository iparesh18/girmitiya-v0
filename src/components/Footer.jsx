import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const NOISE_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`;

const MARQUEE_ITEMS = [
  'Preserve the Past',
  'Honor the Journey',
  'Reconnect the Roots',
  'Girmitiya Heritage',
  'Dignity & Culture',
  'Community First',
  'Voices of Indenture',
  'Living Traditions',
];

const SOCIAL_LINKS = [
  { Icon: Facebook, label: 'Facebook' },
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Linkedin, label: 'LinkedIn' },
];

const NAV = {
  explore: [
    ['About Us', '/about'],
    ['Our Mission', '/our-mission'],
    ['Our Team', '/our-team'],
    ['Blog', '/blog'],
    ['Activity', '/activity'],
  ],
  programs: [
    ['Women Empowerment', '/woman-empowerment'],
    ['Skill Development', '/skill-development'],
    ['Child Welfare', '/child-welfare'],
  ],
  join: [
    ['Membership', '/membership'],
    ['Root Search', '/root-search'],
    ['Publication', '/publication'],
    ['Contact Us', '/contact'],
  ],
};

function NavColumn({ heading, links }) {
  return (
    <div>
      <h3 className="font-display text-base tracking-[0.18em] text-light/30 mb-6">{heading}</h3>
      <nav className="grid gap-3.5">
        {links.map(([label, path]) => (
          <Link
            key={path}
            to={path}
            className="group flex items-center gap-2.5 text-sm text-light/60 transition-colors duration-200 hover:text-gold"
          >
            <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-5" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-darker text-light overflow-hidden">

      {/* Noise overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: NOISE_BG,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px 300px',
          opacity: 0.04,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Marquee strip */}
      <div className="relative z-10 overflow-hidden border-b border-white/8 bg-primary/15 py-3">
        <div
          className="flex whitespace-nowrap will-change-transform"
          style={{ animation: 'marquee 32s linear infinite' }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex shrink-0 items-center gap-5 px-6 font-display text-sm tracking-[0.2em] text-gold/70"
            >
              {item}
              <span className="text-primary/80">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Giant brand type */}
      <div className="relative z-10 container-pad pt-10 pb-6 select-none">
        <h2
          className="font-display leading-[0.85] tracking-tight whitespace-normal sm:whitespace-nowrap"
          style={{ fontSize: 'clamp(2rem, 6.8vw, 7rem)' }}
        >
          <span className="text-light">GIRMITIYA </span>
          <span
            style={{
              WebkitTextStroke: '1.5px rgba(184,138,45,0.35)',
              color: 'transparent',
            }}
          >
            FOUNDATION
          </span>
        </h2>
      </div>

      {/* Divider */}
      <div className="relative z-10 container-pad">
        <div className="h-px bg-gradient-to-r from-white/0 via-white/12 to-white/0" />
      </div>

      {/* Main grid */}
      <div className="relative z-10 container-pad py-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr]">

          {/* Brand & quote */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-serif italic text-xl leading-relaxed text-gold/85">
              "Preserving memory.<br />Restoring dignity.<br />Reconnecting roots."
            </p>
            <p className="mt-5 max-w-[26ch] text-sm leading-7 text-light/45">
              A community-first foundation preserving Girmitiya heritage while supporting education, livelihoods, and cultural reconnection across generations.
            </p>
            <div className="mt-7 flex gap-3">
              {SOCIAL_LINKS.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-light/45 transition-all duration-300 hover:scale-110 hover:border-gold/60 hover:text-gold"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <NavColumn heading="EXPLORE" links={NAV.explore} />
          <NavColumn heading="PROGRAMS" links={NAV.programs} />
          <NavColumn heading="JOIN US" links={NAV.join} />

          {/* Contact */}
          <div>
            <h3 className="font-display text-base tracking-[0.18em] text-light/30 mb-6">CONTACT</h3>
            <div className="grid gap-4 text-sm text-light/55">
              <a
                href="mailto:contact@girmitiyafoundation.org"
                className="flex gap-3 leading-snug transition-colors hover:text-gold"
              >
                <Mail size={15} className="mt-0.5 shrink-0 text-primary" />
                contact@girmitiyafoundation.org
              </a>
              <a
                href="tel:+919876543210"
                className="flex gap-3 transition-colors hover:text-gold"
              >
                <Phone size={15} className="mt-0.5 shrink-0 text-primary" />
                +91 98765 43210
              </a>
              <span className="flex gap-3 text-light/45">
                <MapPin size={15} className="mt-0.5 shrink-0 text-primary" />
                New Delhi, India
              </span>
            </div>

            <Link
              to="/contact"
              className="group mt-7 inline-flex items-center gap-2 rounded-full border border-gold/35 px-5 py-2.5 text-xs tracking-[0.16em] text-gold transition-all duration-300 hover:bg-gold hover:text-ink hover:border-gold"
            >
              START A CONVERSATION
              <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/8">
        <div className="container-pad flex flex-col gap-2 py-6 text-xs text-light/30 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Girmitiya Foundation. All rights reserved.</span>
          <span className="text-light/18 tracking-wide">Preserving heritage · Empowering communities · Reconnecting roots</span>
        </div>
      </div>

    </footer>
  );
}
