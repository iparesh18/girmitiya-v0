import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { pageMotion } from './animations/variants';
import About from './pages/About';
import Activity from './pages/Activity';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Membership from './pages/Membership';
import Mission from './pages/Mission';
import NotFound from './pages/NotFound';
import ProgramPage from './pages/ProgramPage';
import Publication from './pages/Publication';
import RootSearch from './pages/RootSearch';
import Team from './pages/Team';

function Page({ children }) {
  return (
    <motion.div {...pageMotion}>
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<MainLayout />}>
            <Route index element={<Page><Home /></Page>} />
            <Route path="/about" element={<Page><About /></Page>} />
            <Route path="/our-team" element={<Page><Team /></Page>} />
            <Route path="/our-mission" element={<Page><Mission /></Page>} />
            <Route path="/membership" element={<Page><Membership /></Page>} />
            <Route path="/blog" element={<Page><Blog /></Page>} />
            <Route path="/activity" element={<Page><Activity /></Page>} />
            <Route path="/woman-empowerment" element={<Page><ProgramPage type="women" /></Page>} />
            <Route path="/skill-development" element={<Page><ProgramPage type="skill" /></Page>} />
            <Route path="/child-welfare" element={<Page><ProgramPage type="child" /></Page>} />
            <Route path="/publication" element={<Page><Publication /></Page>} />
            <Route path="/root-search" element={<Page><RootSearch /></Page>} />
            <Route path="/contact" element={<Page><Contact /></Page>} />
            <Route path="*" element={<Page><NotFound /></Page>} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}
