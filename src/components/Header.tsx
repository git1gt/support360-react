import React, { useState, useEffect, useCallback } from 'react';
import Button from './Button';
import { Phone } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  
  const MOBILE_BREAKPOINT = 1300;

  // Обработчики событий
  const handleScroll = useCallback(() => setIsScrolled(window.scrollY > 10), []);
  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth > MOBILE_BREAKPOINT) setIsMobileMenuOpen(false);
  }, []);

  // Эффекты
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setWindowWidth(window.innerWidth);
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll, handleResize]);

  // Функции действий
  const scrollToContact = useCallback(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), []);
  const openLogin = useCallback(() => window.open('https://support360.ru/login', '_blank'), []);
  const refreshPage = useCallback(() => { window.location.reload(); window.scrollTo(0, 0); }, []);

  // Определение типа экрана
  const isMobileView = windowWidth <= MOBILE_BREAKPOINT;

  // Навигационные элементы
  const navItems = [
    { href: "#use-cases", label: "Применение" },
    { href: "#features", label: "Возможности" },
    { href: "#workflow", label: "Как работает" },
    { href: "#statistics", label: "Результаты" },
    { href: "#service-history", label: "История" },
    { href: "#ai-section", label: "Умный помощник"},
    { href: "#faq", label: "Вопросы" }
  ];

  // Адаптивные стили
  const getAdaptiveClasses = () => {
    if (windowWidth > 1400) return { spacing: 'mx-3', textSize: 'text-sm' };
    if (windowWidth > 1300) return { spacing: 'mx-2', textSize: 'text-sm' };
    if (windowWidth > 1200) return { spacing: 'mx-1', textSize: 'text-xs' };
    return { spacing: 'mx-0.5', textSize: 'text-xs' };
  };

  const { spacing, textSize } = getAdaptiveClasses();

  // Иконка меню
  const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
         stroke={isScrolled ? "#000000" : "#ffffff"} strokeWidth="2" 
         strokeLinecap="round" strokeLinejoin="round">
      {isOpen ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </>
      )}
    </svg>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Логотип */}
        <button onClick={refreshPage} className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0" aria-label="На главную">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" 
                 strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
              <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
              <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
              <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
              <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
            </svg>
          </div>
          <span className={`font-bold text-xl ${isScrolled ? 'text-primary' : 'text-white'} whitespace-nowrap`}>
            Support360
          </span>
        </button>
        
        {/* Десктопное меню */}
        {!isMobileView && (
          <>
            <nav className="hidden md:flex items-center flex-shrink-0  whitespace-nowrap">
              {navItems.map((item) => (
                <a key={item.href} href={item.href}
                   className={`${textSize} font-medium hover:text-primary transition-colors ${spacing} ${isScrolled ? 'text-gray-800' : 'text-white'} whitespace-nowrap`}>
                  {item.label}
                </a>
              ))}
            </nav>
            
            <div className="whitespace-nowrap hidden md:flex items-center mx-2 flex-shrink-0">
              <a href="tel:+73833838286" className="podmena_support360">
              </a>
            </div>
            
            <div className="hidden md:flex items-center space-x-2 ml-2 mr-2 flex-shrink-0">
              <Button onClick={openLogin}
                      className={`text-sm px-2.5 py-2 ${isScrolled 
                        ? '!bg-transparent !text-primary border-2 border-primary hover:!bg-primary/10' 
                        : '!bg-white/10 !text-white border-2 border-white/30 hover:!bg-white/20 backdrop-blur-sm'}`}>
                Вход/Регистрация
              </Button>
              <Button onClick={scrollToContact}
                      className={`text-sm px-3 py-2 ${isScrolled 
                        ? '!bg-primary !text-white hover:!bg-primary-dark' 
                        : '!bg-primary !text-white hover:!bg-primary-dark'}`}>
                Оставить заявку
              </Button>
            </div>
          </>
        )}

        {/* Кнопка меню */}
        {isMobileView && (
          <button className="text-2xl z-50 flex-shrink-0"
                  onClick={() => setIsMobileMenuOpen(prev => !prev)}
                  aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
                  aria-expanded={isMobileMenuOpen}>
            <MenuIcon isOpen={isMobileMenuOpen} />
          </button>
        )}
      </div>
      
      {/* Мобильное меню */}
      {isMobileView && isMobileMenuOpen && (
        <div className="bg-white shadow-lg absolute w-full top-full left-0">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}
                 className="font-medium py-2 hover:text-primary border-b border-gray-100"
                 onClick={() => setIsMobileMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            
            <div className="pt-4 space-y-3">
              <div className="flex items-start justify-center">
                <Phone className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0"/>
                <a href="tel:+73833838286" 
                   className="podmena_support360 text-lg hover:underline w-full"
                   onClick={() => setIsMobileMenuOpen(false)}>
                  +7 (383) 383-82-86
                </a>
              </div>

              <Button onClick={() => { openLogin(); setIsMobileMenuOpen(false); }} 
                      className="!bg-transparent !text-primary border-2 border-primary hover:!bg-primary/10 w-full">
                Вход/Регистрация
              </Button>
              <Button onClick={() => { scrollToContact(); setIsMobileMenuOpen(false); }} 
                      className="w-full">
                Оставить заявку
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;