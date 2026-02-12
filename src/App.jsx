import { LanguageProvider } from './context/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { Markets } from './components/Markets';
import { ServicesSection } from './components/ServicesSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import './App.css';

export default function App() {
  return (
    <LanguageProvider>
      <ErrorBoundary>
        <Header />
        <main>
          <Hero />
          <Intro />
          <Markets />
          <ServicesSection />
          <Contact />
        </main>
        <Footer />
        <FloatingActions />
      </ErrorBoundary>
    </LanguageProvider>
  );
}
