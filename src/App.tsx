import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Features from './pages/Features';
import Franchise from './pages/Franchise';
import VerifyCertificate from './pages/VerifyCertificate';
import Branches from './pages/Branches';
import Contact from './pages/Contact';
import ApplyNow from './pages/ApplyNow';
import Login from './pages/Login';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/features" element={<Features />} />
                <Route path="/franchise" element={<Franchise />} />
                <Route path="/verify" element={<VerifyCertificate />} />
                <Route path="/branches" element={<Branches />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/apply" element={<ApplyNow />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/testimonials" element={<Testimonials />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
