'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Briefcase, Store, Users, TrendingDown, Clock, Award, CheckCircle2, Sparkles, ArrowRight, Package, Truck, Scissors, MapPin, BarChart3, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { FindTailorForm } from '@/components/find-tailor-form';
import { getTailors, getProducts } from '@/lib/data';
import { TailorCard } from '@/components/tailor-card';
import { ProductCard } from '@/components/product-card';

// Realistic SVG clothing icons
const TshirtIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 12 L16 8 L8 12 L8 22 L12 22 L12 56 L52 56 L52 22 L56 22 L56 12 L48 8 L44 12" />
    <path d="M20 12 C20 8 24 6 32 6 C40 6 44 8 44 12" />
    <line x1="32" y1="22" x2="32" y2="45" />
  </svg>
);

const PantsIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 8 L18 56 L26 56 L30 30 L34 30 L38 56 L46 56 L50 8 Z" />
    <line x1="14" y1="8" x2="50" y2="8" />
    <path d="M22 8 L24 28 M42 8 L40 28" strokeDasharray="2 2" />
  </svg>
);

const ShortsIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 12 L18 38 L26 38 L30 22 L34 22 L38 38 L46 38 L50 12 Z" />
    <line x1="14" y1="12" x2="50" y2="12" />
    <path d="M22 12 L24 28 M42 12 L40 28" strokeDasharray="2 2" />
  </svg>
);

const SkirtIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="20" y1="12" x2="44" y2="12" />
    <path d="M20 12 L14 48 L50 48 L44 12" />
    <path d="M26 12 L24 48 M32 12 L32 48 M38 12 L40 48" strokeOpacity="0.3" />
  </svg>
);

const DressIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M24 8 L20 14 L16 14 L16 24 L20 24 L20 58 L44 58 L44 24 L48 24 L48 14 L44 14 L40 8" />
    <path d="M24 8 C24 6 26 4 32 4 C38 4 40 6 40 8" />
    <path d="M20 28 L44 28" strokeOpacity="0.3" />
  </svg>
);

const JacketIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 10 L16 8 L8 12 L8 20 L12 20 L12 56 L28 56 L28 20 L36 20 L36 56 L52 56 L52 20 L56 20 L56 12 L48 8 L44 10" />
    <path d="M20 10 C20 6 24 4 32 4 C40 4 44 6 44 10" />
    <line x1="28" y1="25" x2="28" y2="50" />
    <line x1="36" y1="25" x2="36" y2="50" />
    <circle cx="24" cy="30" r="1.5" />
    <circle cx="24" cy="38" r="1.5" />
  </svg>
);

const CoatIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 8 L14 6 L6 10 L6 18 L10 18 L10 60 L26 60 L26 20 L38 20 L38 60 L54 60 L54 18 L58 18 L58 10 L50 6 L46 8" />
    <path d="M18 8 C18 4 22 2 32 2 C42 2 46 4 46 8" />
    <line x1="26" y1="25" x2="26" y2="55" />
    <line x1="38" y1="25" x2="38" y2="55" />
    <rect x="10" y="28" width="16" height="6" rx="1" strokeOpacity="0.5" />
  </svg>
);

const iconData = [
  { Icon: TshirtIcon, color: 'from-blue-500 via-cyan-400 to-blue-600', shadow: 'shadow-blue-500/50', name: 'Tişört' },
  { Icon: PantsIcon, color: 'from-purple-500 via-pink-400 to-purple-600', shadow: 'shadow-purple-500/50', name: 'Pantolon' },
  { Icon: ShortsIcon, color: 'from-orange-500 via-amber-400 to-orange-600', shadow: 'shadow-orange-500/50', name: 'Şort' },
  { Icon: SkirtIcon, color: 'from-green-500 via-emerald-400 to-green-600', shadow: 'shadow-green-500/50', name: 'Etek' },
  { Icon: DressIcon, color: 'from-pink-500 via-rose-400 to-pink-600', shadow: 'shadow-pink-500/50', name: 'Elbise' },
  { Icon: JacketIcon, color: 'from-indigo-500 via-violet-400 to-indigo-600', shadow: 'shadow-indigo-500/50', name: 'Ceket' },
  { Icon: CoatIcon, color: 'from-red-500 via-orange-400 to-red-600', shadow: 'shadow-red-500/50', name: 'Mont' },
];

const AnimatedIconCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % iconData.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const currentIcon = iconData[index];
  const nextIndex = (index + 1) % iconData.length;
  const nextIcon = iconData[nextIndex];

  return (
    <div className="relative w-full h-[450px] flex items-center justify-center">
      {/* Background glow effect */}
      <motion.div
        key={`${index}-glow`}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2.5,
          ease: "easeInOut"
        }}
        className={`absolute inset-0 bg-gradient-to-br ${currentIcon.color} rounded-full blur-3xl`}
      />

      {/* Main icon display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100, scale: 0.7 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            scale: 1, 
            transition: { 
              duration: 0.6,
              ease: [0.34, 1.56, 0.64, 1]
            } 
          }}
          exit={{ 
            opacity: 0, 
            x: -100,
            scale: 0.7,
            transition: { duration: 0.4 } 
          }}
          className="relative flex flex-col items-center z-10"
        >
          {/* Icon container with pulsing glow */}
          <motion.div
             animate={{
                filter: [
                  "brightness(100%)",
                  "brightness(150%)",
                  "brightness(100%)",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            className={`relative bg-card/40 p-12 rounded-3xl backdrop-blur-sm border border-white/10 ${currentIcon.shadow} shadow-2xl`}
          >
            <currentIcon.Icon className="w-48 h-48 text-white drop-shadow-2xl" />
          </motion.div>
          
          {/* Label with slide-in animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 }}}
            className="mt-8 text-center"
          >
            <span className={`text-3xl font-bold bg-gradient-to-r ${currentIcon.color} bg-clip-text text-transparent drop-shadow-lg`}>
              {currentIcon.name}
            </span>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Decorative orbiting circles */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 opacity-20"
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-primary rounded-full"
            style={{
              top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
              left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

const CounterStat = ({ end, label, suffix = '', prefix = '' }: { end: number; label: string; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = end / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [end, isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      viewport={{ once: true }}
      className="text-center relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
      <div className="relative bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 hover:border-primary/40 transition-all duration-300">
        <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
          {prefix}{count}{suffix}
        </div>
        <div className="mt-3 text-muted-foreground font-medium text-lg">{label}</div>
      </div>
    </motion.div>
  );
};

const HowItWorksStep = ({ number, title, description, icon: Icon, delay }: { number: number; title: string; description: string; icon: any; delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-full blur-xl opacity-50" />
          <div className="relative w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
            <Icon className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg font-bold text-primary">
            {number}
          </div>
        </motion.div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
      {number < 4 && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
          viewport={{ once: true }}
          className="hidden lg:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-primary to-transparent origin-left"
        />
      )}
    </motion.div>
  );
};

const ComparisonTable = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl border-2 border-red-500/30 bg-red-500/5 p-8"
      >
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Eski Yöntem
        </div>
        <h3 className="text-2xl font-bold mb-6 text-red-600">İade Maliyetleri</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-red-600 text-sm">✗</span>
            </div>
            <div>
              <p className="font-semibold">Kargo Maliyeti</p>
              <p className="text-sm text-muted-foreground">Çift yönlü nakliye gideri</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-red-600 text-sm">✗</span>
            </div>
            <div>
              <p className="font-semibold">İşlem Maliyeti</p>
              <p className="text-sm text-muted-foreground">Depo, personel, yeniden paketleme</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-red-600 text-sm">✗</span>
            </div>
            <div>
              <p className="font-semibold">Değer Kaybı</p>
              <p className="text-sm text-muted-foreground">Hasar, etiket kayıpları</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-red-600 text-sm">✗</span>
            </div>
            <div>
              <p className="font-semibold">Müşteri Kaybı</p>
              <p className="text-sm text-muted-foreground">Kötü deneyim, sadakatsizlik</p>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-red-500/30">
          <p className="text-3xl font-bold text-red-600">~₺400-600</p>
          <p className="text-sm text-muted-foreground">Ürün başına ortalama</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl border-2 border-green-500/30 bg-green-500/5 p-8"
      >
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
          <Sparkles className="w-4 h-4" />
          Terzin<span className="text-primary-foreground group-hover:text-black">Go</span>
        </div>
        <h3 className="text-2xl font-bold mb-6 text-green-600">Tadilat Çözümü</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="font-semibold">Tek Seferlik Teslimat</p>
              <p className="text-sm text-muted-foreground">Sadece terzi noktasına</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="font-semibold">Profesyonel Tadilat</p>
              <p className="text-sm text-muted-foreground">Ürün tam bedene uygun</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="font-semibold">Sıfır Değer Kaybı</p>
              <p className="text-sm text-muted-foreground">Ürün satıldı kalır</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="font-semibold">Müşteri Memnuniyeti</p>
              <p className="text-sm text-muted-foreground">Sadık müşteri kazanımı</p>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-green-500/30">
          <p className="text-3xl font-bold text-green-600">~₺100-150</p>
          <p className="text-sm text-muted-foreground">Ürün başına ortalama</p>
        </div>
      </motion.div>
    </div>
  );
};

export default function Home() {
  const featuredTailors = getTailors().slice(0, 3);
  const products = getProducts();
  const topRowProducts = products.slice(0, Math.ceil(products.length / 2));
  const bottomRowProducts = products.slice(Math.ceil(products.length / 2));
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Ultra Premium */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 animated-gradient-background" />

        {/* Floating geometric shapes */}
        <motion.div style={{ y: y1, opacity }} className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <motion.div style={{ y: y2, opacity }} className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="container relative px-4 md:px-6 max-w-6xl mx-auto py-20">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card/40 border border-white/20 text-foreground/80 font-semibold text-sm w-fit backdrop-blur-sm"
              >
                <Sparkles className="w-5 h-5 text-primary" />
                <span>890 Milyar ₺'lik Soruna Akıllı Çözüm</span>
              </motion.div>

              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight leading-tight">
                  İnternetten Aldığınız{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Kıyafetler
                    </span>
                  </span>{' '}
                  Üstünüze Olmuyor mu?
                </h1>
                <p className="max-w-xl text-muted-foreground md:text-xl">
                  Artık iade etmekle uğraşmayın! Terzin<span className="text-primary">Go</span> ile anlaşmalı e-ticaret sitelerinden aldığınız ürünleri, size en yakın terzide
                  <span className="font-bold text-foreground"> ücretsiz </span>
                  olarak bedeninize göre ayarlatın.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <Button asChild size="lg" className="text-lg h-14 px-10 shadow-lg shadow-primary/30">
                  <Link href="/how-it-works">
                    Nasıl Çalışır?
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="link" className="text-lg h-14 px-10 text-muted-foreground">
                  <Link href="/points">Tüm Noktaları Gör</Link>
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex items-center justify-center h-full"
            >
              <AnimatedIconCarousel />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Find Tailor Section */}
      <FindTailorForm />

      {/* Stats Section */}
      <section className="w-full py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-headline">Rakamlarla Biz</h2>
            <p className="mt-6 text-xl text-muted-foreground">
              Sektörün en büyük sorununa çözüm getirirken yarattığımız etki.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CounterStat end={35} suffix="%" label="İade Oranlarında Düşüş" />
            <CounterStat end={850} prefix="+" label="Mutlu Müşteri" />
            <CounterStat end={75} prefix="+" label="Aktif TerzinGo Noktası" />
          </div>
        </div>
      </section>

       {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-16 md:py-24 animated-gradient-background">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
           <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-headline">Müşteriler İçin Sistem Nasıl Çalışır?</h2>
            <p className="mt-6 text-xl text-muted-foreground">
              Sadece 4 basit adımda, online alışveriş deneyiminizi mükemmelleştirin.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
             <HowItWorksStep number={1} title="Alışveriş Yap" description="Anlaşmalı e-ticaret markalarından beğendiğiniz ürünü satın alın." icon={Package} delay={0.1} />
            <HowItWorksStep number={2} title="Terziye Git" description="Ürününüz ve size özel tadilat kodunuzla en yakın TerzinGo noktasına gidin." icon={Truck} delay={0.2} />
            <HowItWorksStep number={3} title="Tadilat Yaptır" description="Terziniz, ürününüzü tam bedeninize göre ücretsiz olarak ayarlasın." icon={Scissors} delay={0.3} />
            <HowItWorksStep number={4} title="Keyfini Çıkar" description="Mükemmel uyumun ve zahmetsiz alışverişin keyfini çıkarın!" icon={Sparkles} delay={0.4} />
          </div>
        </div>
      </section>

      {/* Featured Tailors Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Öne Çıkan Terzin<span className="text-primary">Go</span> Noktaları</h2>
              <p className="mt-2 text-lg text-muted-foreground">Müşterilerimiz tarafından en çok tercih edilen terziler.</p>
            </div>
            <Button variant="outline" asChild>
                <Link href="/points">
                    Tümünü Gör <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTailors.map((tailor) => (
              <TailorCard key={tailor.id} tailor={tailor} />
            ))}
          </div>
        </div>
      </section>

       {/* Comparison Section */}
      <section className="w-full py-16 md:py-24 bg-muted/40">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
           <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-headline">Maliyetleri Karşılaştırın</h2>
            <p className="mt-6 text-xl text-muted-foreground">
              İade süreçlerinin markanıza olan gerçek maliyetini görün ve Terzin<span className="text-primary">Go</span>'nun nasıl tasarruf sağladığını keşfedin.
            </p>
          </div>
          <ComparisonTable />
        </div>
      </section>

       {/* For Business Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold font-headline">İşinizi Bizimle Büyütün</h2>
                <p className="text-xl text-muted-foreground">
                    Terzin<span className="text-primary">Go</span> ekosistemine katılarak iade oranlarınızı düşürün, müşteri sadakatini artırın veya atölyenize yeni müşteriler kazanın.
                </p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.div whileHover={{ scale: 1.05 }} className="w-full">
                        <Link href="/for-business" className="block p-6 rounded-lg border bg-card hover:bg-card/80 h-full">
                            <Zap className="w-8 h-8 text-primary mb-3"/>
                            <h3 className="text-xl font-bold">E-ticaret Markaları</h3>
                            <p className="text-muted-foreground mt-2">İade oranlarınızı düşürün, kârlılığınızı artırın.</p>
                        </Link>
                    </motion.div>
                     <motion.div whileHover={{ scale: 1.05 }} className="w-full">
                        <Link href="/for-business#for-tailors" className="block p-6 rounded-lg border bg-card hover:bg-card/80 h-full">
                            <Store className="w-8 h-8 text-primary mb-3"/>
                            <h3 className="text-xl font-bold">Terziler ve Atölyeler</h3>
                            <p className="text-muted-foreground mt-2">İşletmenizi dijitalleştirin, gelirinizi artırın.</p>
                        </Link>
                    </motion.div>
                </div>
            </div>
             <div className="hidden md:block">
                 <motion.div 
                    whileHover={{ scale: 1.02, rotate: -1 }}
                    className="relative p-8 bg-card border rounded-xl shadow-2xl"
                 >
                    <BarChart3 className="w-16 h-16 text-primary absolute -top-8 -left-8" />
                    <Shield className="w-12 h-12 text-green-500 absolute -bottom-6 -right-6" />
                    <h4 className="text-2xl font-bold mb-4">Veriye Dayalı Büyüme</h4>
                    <p className="text-muted-foreground mb-6">İş ortaklarımıza sunduğumuz analiz ve raporlama araçlarıyla, müşteri davranışlarını anlayın ve işinizi veriye dayalı kararlarla büyütün. Hangi ürünlerin en çok tadilat gerektirdiğini, hangi bölgelerde potansiyel olduğunu keşfedin.</p>
                    <Button variant="outline">Raporları Keşfet</Button>
                 </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Product Scroll Section */}
      <section className="w-full py-16 md:py-24 overflow-hidden bg-primary/5">
         <div className="container mx-auto px-4 md:px-6 max-w-6xl text-center">
             <h2 className="text-3xl md:text-4xl font-bold font-headline">Terzin<span className="text-primary">Go</span> Mağaza</h2>
             <p className="mt-2 text-lg text-muted-foreground">Terzin<span className="text-primary">Go</span> noktalarında satışa sunulan özel tasarım ve ikinci el ürünleri keşfedin.</p>
        </div>
        <div className="mt-12 relative w-full flex flex-col gap-4">
          <div className="flex w-max animate-scroll">
            {[...topRowProducts, ...topRowProducts].map((product, i) => (
              <div key={`top-${i}`} className="w-64 px-2">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="flex w-max animate-scroll-reverse">
             {[...bottomRowProducts, ...bottomRowProducts].map((product, i) => (
              <div key={`bottom-${i}`} className="w-64 px-2">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
        </div>
      </section>
    </div>
  );
}
