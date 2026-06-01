import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './common/Button';

export default function Footer() {
  const links = [
    ['About Us', '/about'],
    ['Our Mission', '/our-mission'],
    ['Membership', '/membership'],
    ['Root Search', '/root-search'],
    ['Publication', '/publication'],
    ['Contact', '/contact']
  ];

  return (
    <footer className="bg-darker text-light">
      <div className="container-pad py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr_0.8fr_1fr]">
          <div>
            <p className="font-display text-3xl font-bold">Girmitiya Foundation</p>
            <p className="mt-4 max-w-sm leading-7 text-light/72">
              A community-first foundation preserving Girmitiya heritage while supporting education, dignity, livelihoods, and cultural reconnection.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Linkedin].map((Icon, index) => (
                <a key={index} href="#" aria-label="Social profile" className="grid h-10 w-10 place-items-center rounded-full bg-light/8 text-primary transition hover:bg-gold hover:text-ink">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold text-light">Explore</h3>
            <div className="mt-5 grid gap-3">
              {links.map(([label, path]) => (
                <Link key={path} to={path} className="text-light/72 transition hover:text-gold">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold text-light">Contact</h3>
            <div className="mt-5 grid gap-4 text-sm text-light/72">
              <span className="flex gap-3"><MapPin size={18} className="text-primary" /> New Delhi, India</span>
              <span className="flex gap-3"><Phone size={18} className="text-primary" /> +91 98765 43210</span>
              <span className="flex gap-3"><Mail size={18} className="text-primary" /> contact@girmitiyafoundation.org</span>
            </div>
          </div>
          <div className="rounded-3xl bg-light/8 p-6">
            <h3 className="font-display text-2xl font-bold">Stand with the story.</h3>
            <p className="mt-3 text-sm leading-6 text-light/72">Join, volunteer, donate, or help a family reconnect with their roots.</p>
            <Button to="/contact" className="mt-5" icon={Send}>Start a Conversation</Button>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-light/55">
          © {new Date().getFullYear()} Girmitiya Foundation. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
