import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Banner from './sections/Banner';
import FeaturesSection from './sections/FeaturesSection';
import StatisticsSection from './sections/StatisticsSection';
import ServiceHistorySection from './sections/ServiceHistorySection';
import WorkflowSection from './sections/WorkflowSection';
import UseCasesSection from './sections/UseCasesSection';
import AI_Section from './sections/AI_Section';
import SupportSection from './sections/SupportSection';
import FAQSection from './sections/FAQSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import ScrollToTop from './components/ScrollToTop';
import CookieWidget from './components/CookieWidget';
import SEOHead from './components/SEOHead';

function App() {
  useEffect(() => {
    document.title = "Support360 — Поддержка начинается с первого сообщения";
  }, []);

  return (
    <HelmetProvider>
      <div className="font-sans">
        <SEOHead />
        <Header />
        <Banner />
        <UseCasesSection />
        <FeaturesSection />
        <WorkflowSection />
        <StatisticsSection />
        <ServiceHistorySection />
        <AI_Section />
        <SupportSection />
        <FAQSection />
        <ContactSection />
        <Footer />
        <ScrollToTop />
        <CookieWidget />
      </div>
    </HelmetProvider>
  );
}

export default App;