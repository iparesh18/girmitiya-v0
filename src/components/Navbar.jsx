import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { navItems } from '../data/siteData';
import Button from './common/Button';

function NavItem({ item, mobile = false, onNavigate }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const active = pathname === item.path || item.children?.some((child) => pathname === child.path.split('#')[0]);

  if (!item.children) {
    return (
      <NavLink
        to={item.path}
        onClick={onNavigate}
        className={({ isActive }) =>
          `group relative px-2 py-2 text-sm font-semibold transition ${isActive ? 'text-primary' : 'text-earth hover:text-primary'}`
        }
      >
        {item.label}
        <span className="absolute bottom-0 left-2 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-8 group-focus-visible:w-8" />
      </NavLink>
    );
  }

  return (
    <div
      className={mobile ? 'w-full' : 'relative'}
      onMouseEnter={() => !mobile && setOpen(true)}
      onMouseLeave={() => !mobile && setOpen(false)}
    >
      <Link
        to={item.path}
        onClick={(event) => {
          if (mobile) {
            event.preventDefault();
            setOpen((value) => !value);
          }
        }}
        className={`flex items-center gap-1 px-2 py-2 text-sm font-semibold transition ${
          active ? 'text-primary' : 'text-earth hover:text-primary'
        }`}
      >
        {item.label}
        <ChevronDown size={15} className={`transition ${open ? 'rotate-180' : ''}`} />
      </Link>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className={
              mobile
                ? 'ml-3 border-l border-primary/20 pl-3'
                : 'absolute left-0 top-full z-30 min-w-56 rounded-2xl border border-primary/15 bg-white/95 p-2 shadow-premium backdrop-blur'
            }
          >
            {item.children.map((child) => (
              <NavLink
                key={child.path}
                to={child.path}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive ? 'bg-primary/10 text-primary' : 'text-earth hover:bg-primary/5 hover:text-primary'
                  }`
                }
              >
                {child.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-light focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary">
        Skip to main content
      </a>
      <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 shadow-premium">
        <Link to="/" className="flex items-center gap-3" aria-label="Girmitiya Foundation home">
          <img
            src="/girmititya.png"
            alt="Girmitiya Foundation"
            className="h-14 w-auto max-w-[190px] object-contain"
          />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </div>

        <div className="hidden lg:block">
          <Button to="/membership" icon={Heart}>Join Us</Button>
        </div>

        <button
          className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary lg:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass mx-auto mt-3 max-w-7xl rounded-3xl p-4 shadow-premium lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavItem key={item.label} item={item} mobile onNavigate={() => setMobileOpen(false)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
