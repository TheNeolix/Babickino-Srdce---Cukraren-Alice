/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Instagram,
  Facebook,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Star,
  Video
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---

interface Pastry {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: 'Klasické' | 'Špeciality' | 'Sezónne';
}

// --- Data ---

const PASTRIES: Pastry[] = [
  {
    id: '1',
    name: 'Svadobná Torta',
    description: 'Svadobná torta s krémom ktorá prezentuje spoločný život sobášených.',
    price: 'od 20,50€',
    image: 'https://scontent-prg1-1.xx.fbcdn.net/v/t39.30808-6/482080022_650995494104988_271444781167093092_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_ohc=h09D8I8piMIQ7kNvwHbO__a&_nc_oc=AdpVFdwbCYiCzttdWr1IGUZXyHF_wed0n5UNWVOrvC0CxCiJ2IErKTeZObufvTnKyS8&_nc_zt=23&_nc_ht=scontent-prg1-1.xx&_nc_gid=TmOb5tuB_ayYhpp0w6Y9sg&_nc_ss=7a3a8&oh=00_Af0UekTtS2QPflLk2HDDcWY2fZvksnyk_wWuxlkZcDUSVw&oe=69D94544',
    category: 'Špeciality',
  },
  {
    id: '2',
    name: 'Šmolkovia',
    description: 'Krémová Torta pre deti s postavičkami šmolkov.',
    price: 'od 20,50€',
    image: 'https://scontent-prg1-1.xx.fbcdn.net/v/t39.30808-6/481044554_648236101047594_8541495884518209700_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=oBYViPiY0qcQ7kNvwH9hmST&_nc_oc=Ado1xv5PoQuyvqZbunwQneluRYpX1mUfldBDb2FBwJM5Zo-11xg02RJd0f5G_br5Qtk&_nc_zt=23&_nc_ht=scontent-prg1-1.xx&_nc_gid=hfG2tDN8TkjdFAEFHE_4-Q&_nc_ss=7a3a8&oh=00_Af2uOD0WMDpmy6y8if4O1fwuJb1lsULlSvTTBLYgW97ilA&oe=69D94F82',
    category: 'Špeciality',
  },
  {
    id: '3',
    name: 'Veľkonočná Torta s jedlými ozdobnými vajíčkami',
    description: 'Chutná krémova torta s čokoládovými ozdobami vajíčkami.',
    price: 'od 20,50€',
    image: 'https://scontent-prg1-1.xx.fbcdn.net/v/t39.30808-6/480706532_644908784713659_7151034556819043990_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_ohc=sqTmxz8A6LIQ7kNvwHK0V-5&_nc_oc=AdoW7x1QAYZgwtTMJmlZ6M9ljaOSiYwwqEoCrCOaenT2G05WwDGbLs0UfFVHX6MR5V8&_nc_zt=23&_nc_ht=scontent-prg1-1.xx&_nc_gid=tXPLJw7Y515ZTiFY8XOznA&_nc_ss=7a3a8&oh=00_Af1Qp6WnCIwsl17OT8HJmYhF2DZzSXUcRBC9wdccBz-dKQ&oe=69D93D5C',
    category: 'Sezónne',
  },
  {
    id: '4',
    name: 'Čokoládoví a Vanilkoví Zajačikovia',
    description: 'Chutní čokoládoví a vanilkoví zajačikovia s jedlou farbou.',
    price: 'od 20,50€',
    image: 'https://scontent-prg1-1.xx.fbcdn.net/v/t39.30808-6/481772040_644908564713681_3623153258457295634_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_ohc=hTx-Qn7dbb8Q7kNvwEFsFpe&_nc_oc=Adpb2I4Ka9d82iHD16uFWwQtbYqdo4jzyv8zljExq3kZezAJkCpL59P8icSyrQl7sYs&_nc_zt=23&_nc_ht=scontent-prg1-1.xx&_nc_gid=EgDg5IiTt5xZOZvthXRnyA&_nc_ss=7a3a8&oh=00_Af07DOA2J6valD9TLSXnT0Nq_qCpVu7ilTorvB28d3zWjQ&oe=69D942B1',
    category: 'Sezónne',
  },
  {
    id: '5',
    name: 'Veterník',
    description: 'Klasický veterník s karamelovou polevou',
    price: 'od 2,50€',
    image: 'https://scontent-prg1-1.xx.fbcdn.net/v/t39.30808-6/470226954_1146178556839347_6659198097090391206_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_ohc=RbOmIWjugFUQ7kNvwEcU35A&_nc_oc=AdpD88sF3z60N8KfUXPm3UONNFGV7esLrYKrx87Q5Yal281gWAWAXI04BTWbFx-5vE0&_nc_zt=23&_nc_ht=scontent-prg1-1.xx&_nc_gid=rpAjJLA2ZGrzYLGuHQ8nZw&_nc_ss=7a3a8&oh=00_Af2Pl6-GQNR1ZBGI4si1NXl2FQDdEKR7Pgq3OsJ1EaoB9g&oe=69D92179',
    category: 'Klasické',
  },
  {
    id: '6',
    name: 'Šamróla',
    description: 'Klasická šamróla s krémom',
    price: 'od 2,50€',
    image: 'https://scontent-prg1-1.xx.fbcdn.net/v/t39.30808-6/470214877_1146172970173239_1761596405564836081_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=F9TybiMjwyUQ7kNvwFs_DoN&_nc_oc=AdppsBUecTgmugcySIpk3yj0xF3qjICOtxB26OM2dSmEOGXh-ZMzU0gOi8FLIpQEzP0&_nc_zt=23&_nc_ht=scontent-prg1-1.xx&_nc_gid=qOv7I3jKss0k6KsttkeFdQ&_nc_ss=7a3a8&oh=00_Af2ATZ5o6YAokHk0SCFukgsVr90WCFUD7p1AvNbaWcuegg&oe=69D94A0E',
    category: 'Klasické',
  },
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // §1 keyboard-nav: close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // §5 horizontal-scroll: prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Domov', href: '#' },
    { name: 'Menu', href: '#menu' },
    { name: 'Náš príbeh', href: '#about' },
    { name: 'Kontakt', href: '#contact' },
  ];

  return (
    <nav
      id="navbar"
      role="navigation"
      aria-label="Main navigation"
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between",
        isScrolled ? "bg-white md:bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
      )}
    >
      <div className="flex items-center gap-2">
        <img src={`${import.meta.env.BASE_URL}images/logo.jpg`} alt="Babičkino srdce logo" className="w-10 h-10 rounded-full object-cover" />
        <span className={cn(
          "text-2xl font-serif font-bold tracking-tight",
          isScrolled ? "text-chocolate" : "text-white"
        )}>
          Babičkino srdce
        </span>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={cn(
              "text-sm font-medium uppercase tracking-widest hover:text-gold transition-colors cursor-pointer",
              isScrolled ? "text-chocolate" : "text-white"
            )}
          >
            {link.name}
          </a>
        ))}
        {/* §1 aria-labels: aria-label for icon-only button */}
        <button
          aria-label="Shopping bag"
          className={cn(
            "p-2 rounded-full transition-colors cursor-pointer",
            isScrolled ? "bg-chocolate text-white hover:bg-gold" : "bg-white/20 text-white hover:bg-white/40"
          )}
        >
          <ShoppingBag size={20} aria-hidden="true" />
        </button>
      </div>

      {/* Mobile Toggle — §1 aria-labels */}
      <button
        className="md:hidden cursor-pointer"
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
      >
        <MenuIcon size={28} className={isScrolled ? "text-chocolate" : "text-white"} aria-hidden="true" />
      </button>

      {/* Mobile Menu — §9 modal-escape: Escape key closes, role="dialog" for a11y */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 59 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Slide-in panel */}
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#000000', zIndex: 60 }}
              className="flex flex-col p-8"
            >
              <div className="flex justify-end">
                {/* §1 aria-labels: aria-label for icon-only button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white cursor-pointer p-2"
                  aria-label="Close navigation menu"
                >
                  <X size={32} aria-hidden="true" />
                </button>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 gap-8" role="list">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    role="listitem"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-serif text-white hover:text-gold transition-colors cursor-pointer"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    /* §5 viewport-units: min-h-dvh instead of h-screen for mobile */
    <section id="hero" className="relative min-h-dvh overflow-hidden flex items-center justify-center">
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/30 z-10" />
        {/* §3 image-optimization: hero video, autoplay muted for LCP */}
        <video
          src={`${import.meta.env.BASE_URL}images/248474-hero.mp4`}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Čokoláda sa leje na tortu"
        />
      </motion.div>

      <div className="relative z-20 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ opacity }}
        >
          {/* §1 heading-hierarchy: h1 first, subheading as <p> */}
          <p className="text-gold text-xl uppercase tracking-[0.3em] font-medium mb-4">Vyrobené s láskou</p>
          <h1 className="text-5xl md:text-8xl text-white font-serif font-bold mb-8 leading-tight">
            Umenie <br /> <span className="italic">Cukrárne Alice</span>
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a
              href="#menu"
              className="bg-gold text-white px-10 py-4 rounded-full font-medium uppercase tracking-widest hover:bg-white hover:text-chocolate transition-all duration-300 shadow-xl cursor-pointer"
            >
              Objavte našu ponuku
            </a>
            <a
              href="#contact"
              className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full font-medium uppercase tracking-widest hover:bg-white/20 transition-all duration-300 cursor-pointer"
            >
              Objednajte si teraz
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        aria-hidden="true"
      >
        <div className="w-px h-20 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<'Všetky' | 'Klasické' | 'Špeciality' | 'Sezónne'>('Všetky');

  const filteredPastries = activeCategory === 'Všetky'
    ? PASTRIES
    : PASTRIES.filter(p => p.category === activeCategory);

  const categories = ['Všetky', 'Klasické', 'Špeciality', 'Sezónne'];

  return (
    <section id="menu" className="py-24 px-6 bg-white" aria-labelledby="menu-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold uppercase tracking-widest font-medium mb-2">Nasa kolekcia</p>
          <h2 id="menu-heading" className="text-4xl md:text-5xl font-serif font-bold text-chocolate">Denné ponuky</h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-6" aria-hidden="true" />
        </div>

        {/* §1 aria-labels: filter group with accessible role */}
        <div className="flex flex-wrap justify-center gap-4 mb-12" role="group" aria-label="Filter pastries by category">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              aria-pressed={activeCategory === cat}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border cursor-pointer",
                activeCategory === cat
                  ? "bg-chocolate text-white border-chocolate"
                  : "bg-transparent text-chocolate border-chocolate/20 hover:border-chocolate"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredPastries.map((pastry) => (
              <motion.article
                key={pastry.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                {/* §3 image-dimension: aspect-ratio for CLS prevention */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6 shadow-lg">
                  {/* §3 lazy-load-below-fold: lazy load non-hero images */}
                  <img
                    src={pastry.image}
                    alt={pastry.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    width={800}
                    height={1000}
                  />
                  <div className="absolute inset-0 bg-chocolate/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      className="bg-white text-chocolate px-6 py-3 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl cursor-pointer"
                      aria-label={`Pridať ${pastry.name} do košíka`}
                    >
                      Pridať do košíka
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif font-bold text-chocolate group-hover:text-gold transition-colors">
                    {pastry.name}
                  </h3>
                  <span className="text-gold font-medium" aria-label={`Cena: ${pastry.price}`}>{pastry.price}</span>
                </div>
                <p className="text-chocolate/60 text-sm leading-relaxed">
                  {pastry.description}
                </p>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 bg-cream/30 overflow-hidden" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl" aria-hidden="true" />
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
            {/* §1 alt-text: descriptive alt text */}
            <img
              src="https://scontent-prg1-1.xx.fbcdn.net/v/t39.30808-6/468309190_1132962204827649_4979488151307763702_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=2a1932&_nc_ohc=Hyzinub9SZsQ7kNvwHmXoqh&_nc_oc=AdpiuZBE51VEycE6PherXvc_s0KhNM-j91O6Qcxz5dX4BvTBoJhxkeVUgV6gKJIwpbI&_nc_zt=23&_nc_ht=scontent-prg1-1.xx&_nc_gid=kUg3getYtjsEkbjVItEY5Q&_nc_ss=7a3a8&oh=00_Af0aIF73kGKFfxYsr69Yo6h3jX2Tit6M3qlIUGxhJIWb1Q&oe=69D9473F"
              alt="Kolekcia toriet od Cukraren Alice"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
              width={1000}
              height={667}
            />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl hidden md:block">
            <p className="text-chocolate font-serif italic text-xl mb-2">"Pečenie je jazyk lásky."</p>
            <p className="text-gold font-medium uppercase tracking-widest text-xs">— Cukraren Alice</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <p className="text-gold uppercase tracking-widest font-medium mb-2">Náš príbeh</p>
          <h2 id="about-heading" className="text-4xl md:text-5xl font-serif font-bold text-chocolate mb-8">Srdce za metličkou</h2>
          <div className="space-y-6 text-chocolate/80 leading-relaxed text-lg">
            <p>
              Cukráreň Alice, založená v samotnom srdci Vrakuňe, vznikla z jednoduchého sna: priniesť autentickú a estetickú chuť cukrárenských výrobkov našej miestnej komunite.
            </p>
            <p>
              Naša zakladateľka, šéfkuchárka Iveta, strávila roky zdokonaľovaním svojho remesla. Tu pochopila, že tajomstvo dokonalého zákusku nespočíva len v masle – je to trpezlivosť, načasovanie a vášeň vložená do každého jedného záhybu.
            </p>
            <p>
              Dnes v tejto tradícii pokračujeme. Používame výhradne organické suroviny od lokálnych dodávateľov a tradičné techniky, aby sme vytvorili dobroty, ktoré sú rovnako krásne, ako je chutné.
            </p>
          </div>
          <button className="mt-10 flex items-center gap-2 text-chocolate font-bold uppercase tracking-widest hover:text-gold transition-colors group cursor-pointer">
            Viac o našom procese
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // §8 submit-feedback: simulate submission with loading state
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-chocolate text-white" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-gold uppercase tracking-widest font-medium mb-2">Kontaktujte Nás</p>
            <h2 id="contact-heading" className="text-4xl md:text-5xl font-serif font-bold mb-8 text-white">Navštívte našu predajňu</h2>

            <address className="space-y-8 mt-12 not-italic">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-full text-gold" aria-hidden="true">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold mb-1">Naša adresa</h3>
                  {/* §6 contrast-readability: improved from text-white/60 to text-white/70 for better contrast */}
                  <p className="text-white/70">Bieloruská ulica 1<br />Bratislava, Slovakia 82106</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-full text-gold" aria-hidden="true">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold mb-1">Zavolajte Nám</h3>
                  <a href="tel:+33123456789" className="text-white/70 hover:text-gold transition-colors cursor-pointer">+421 911 060 414</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-full text-gold" aria-hidden="true">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold mb-1">Email</h3>
                  <a href="mailto:alice.gastro.sro@gmail.com" className="text-white/70 hover:text-gold transition-colors cursor-pointer">alice.gastro.sro@gmail.com</a>
                </div>
              </div>
            </address>

            {/* §1 aria-labels: aria-label for social links */}
            <div className="flex gap-4 mt-12">
              <a href="#" aria-label="Sledujte nás na Instagrame" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold transition-colors cursor-pointer">
                <Instagram size={20} aria-hidden="true" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100075836292623" aria-label="Sledujte nás na Facebooku" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold transition-colors cursor-pointer">
                <Facebook size={20} aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <h3 className="text-chocolate font-serif text-2xl font-bold mb-6">Poslať Správu</h3>
            {/* §8 form-labels: proper label-input association with htmlFor + id */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-chocolate/60 text-xs uppercase tracking-widest font-bold">Meno</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Meno"
                    autoComplete="name"
                    className="w-full bg-warm-gray border-none rounded-xl px-4 py-3 text-chocolate focus:ring-2 focus:ring-gold transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-chocolate/60 text-xs uppercase tracking-widest font-bold">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="Váš Email"
                    autoComplete="email"
                    className="w-full bg-warm-gray border-none rounded-xl px-4 py-3 text-chocolate focus:ring-2 focus:ring-gold transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-subject" className="text-chocolate/60 text-xs uppercase tracking-widest font-bold">Subjekt</label>
                <select
                  id="contact-subject"
                  className="w-full bg-warm-gray border-none rounded-xl px-4 py-3 text-chocolate focus:ring-2 focus:ring-gold transition-all cursor-pointer"
                >
                  <option>Všeobecné otázky</option>
                  <option>Špeciálna objednávka</option>
                  <option>Občerstvenie na akcie</option>
                  <option>Spätná väzba</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-chocolate/60 text-xs uppercase tracking-widest font-bold">Správa</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  placeholder="Ako vám môžem pomôcť?"
                  className="w-full bg-warm-gray border-none rounded-xl px-4 py-3 text-chocolate focus:ring-2 focus:ring-gold transition-all resize-none"
                />
              </div>
              {/* §8 loading-buttons: disabled + spinner during submission; §8 submit-feedback: success state */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full font-bold py-4 rounded-xl uppercase tracking-widest transition-all duration-300 shadow-lg cursor-pointer",
                  isSubmitted
                    ? "bg-green-600 text-white"
                    : "bg-gold text-white hover:bg-chocolate",
                  isSubmitting && "opacity-70 cursor-wait"
                )}
              >
                {isSubmitting ? 'Posielam...' : isSubmitted ? '✓ Správa odoslaná!' : 'Poslať správu'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white py-12 px-6 border-t border-chocolate/5" role="contentinfo">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <img src={`${import.meta.env.BASE_URL}images/logo.jpg`} alt="Babičkino srdce logo" className="w-8 h-8 rounded-full object-cover" />
          <span className="text-xl font-serif font-bold text-chocolate">Babičkino srdce</span>
        </div>

        {/* §6 contrast-readability: improved from text-chocolate/40 to text-chocolate/60 for WCAG AA */}
        <p className="text-chocolate/60 text-sm">
          © {new Date().getFullYear()} Babičkino srdce. Všetky práva vyhradené.
        </p>

        <div className="flex gap-8">
          <a href="#" className="text-chocolate/60 hover:text-gold text-sm transition-colors cursor-pointer">Zásady ochrany osobných údajov</a>
          <a href="#" className="text-chocolate/60 hover:text-gold text-sm transition-colors cursor-pointer">Podmienky služby</a>
          <a href="#" className="text-chocolate/60 hover:text-gold text-sm transition-colors cursor-pointer">Design & realizácia: Neolix Studio</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-gold selection:text-white">
      {/* §1 skip-links: skip to main content for keyboard users */}
      <a href="#hero" className="skip-link">
        Prejsť na hlavný obsah
      </a>
      <Navbar />
      <main>
        <Hero />
        <MenuSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
