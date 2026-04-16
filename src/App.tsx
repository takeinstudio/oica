import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Features from './pages/Features';
import Franchise from './pages/Franchise';
import VerifyCertificate from './pages/VerifyCertificate';
import Branches from './pages/Branches';
import Contact from './pages/Contact';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BranchDashboard from './pages/BranchDashboard';
import BranchDetail from './pages/BranchDetail';
import Preloader from './components/Preloader';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Results from './pages/Results';
import Career from './pages/Career';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem('oica_preloaded');
    if (!hasLoadedBefore) {
      setShowPreloader(true);
      sessionStorage.setItem('oica_preloaded', 'true');
    }
  }, []);

  return (
    <Router>
      <Toaster position="top-center" richColors />
      <ScrollToTop />
      {showPreloader && <Preloader />}
      <Routes>
        <Route path="/login/:role" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/branch" element={<BranchDashboard />} />
        <Route path="/branch/:id" element={<BranchDetail />} />
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
                <Route path="/results" element={<Results />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/career" element={<Career />} />
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
