'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Briefcase, CheckCircle2, Sparkles, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';
import { FindTailorForm } from '@/components/find-tailor-form';
import { getTailors, getProducts } from '@/lib/data';
import { TailorCard } from '@/components/tailor-card';
import { ProductCard } from '@/components/product-card';

// Ultra realistic clothing icons that look like actual garments
const TshirtIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M30 20 L25 15 L10 20 L10 35 L18 35 L18 90 L82 90 L82 35 L90 35 L90 20 L75 15 L70 20 C70 20 65 12 50 12 C35 12 30 20 30 20 Z" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.9"/>
    <ellipse cx="50" cy="35" rx="20" ry="5" fill="currentColor" opacity="0.3"/>
  </svg>
);

const PantsIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M25 15 L30 85 L42 85 L46 45 L54 45 L58 85 L70 85 L75 15 L60 15 L60 35 L40 35 L40 15 Z" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.9"/>
    <rect x="35" y="12" width="30" height="6" rx="2" fill="currentColor" opacity="0.5"/>
  </svg>
);

const ShortsIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M25 20 L30 55 L42 55 L46 35 L54 35 L58 55 L70 55 L75 20 L60 20 L60 30 L40 30 L40 20 Z" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.9"/>
    <rect x="35" y="17" width="30" height="5" rx="2" fill="currentColor" opacity="0.5"/>
    <line x1="46" y1="35" x2="46" y2="55" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    <line x1="54" y1="35" x2="54" y2="55" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
  </svg>
);

const SkirtIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M35 20 L30 60 L20 75 L80 75 L70 60 L65 20 Z" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.9"/>
    <rect x="32" y="17" width="36" height="5" rx="2" fill="currentColor" opacity="0.5"/>
    <path d="M40 25 L35 70 M50 25 L50 70 M60 25 L65 70" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
  </svg>
);

const DressIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M35 15 L30 25 L25 25 L25 35 L28 40 L28 88 L72 88 L72 40 L75 35 L75 25 L70 25 L65 15 C65 15 60 10 50 10 C40 10 35 15 35 15 Z" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.9"/>
    <path d="M30 42 L70 42" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    <path d="M32 55 L68 55" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
    <ellipse cx="50" cy="25" rx="15" ry="4" fill="currentColor" opacity="0.3"/>
  </svg>
);

const JacketIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M30 18 L25 15 L12 22 L12 35 L18 35 L18 88 L45 88 L45 35 L55 35 L55 88 L82 88 L82 35 L88 35 L88 22 L75 15 L70 18 C70 18 65 12 50 12 C35 12 30 18 30 18 Z" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.9"/>
    <circle cx="30" cy="45" r="3" fill="white" opacity="0.7"/>
    <circle cx="30" cy="58" r="3" fill="white" opacity="0.7"/>
    <circle cx="30" cy="71" r="3" fill="white" opacity="0.7"/>
    <path d="M45 38 L45 85 M55 38 L55 85" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
    <rect x="18" y="45" width="10" height="15" rx="2" fill="currentColor" opacity="0.4"/>
  </svg>
);

const CoatIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M28 16 L22 12 L8 20 L8 33 L16 33 L16 92 L43 92 L43 35 L57 35 L57 92 L84 92 L84 33 L92 33 L92 20 L78 12 L72 16 C72 16 66 8 50 8 C34 8 28 16 28 16 Z" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.9"/>
    <rect x="16" y="48" width="12" height="18" rx="2" fill="currentColor" opacity="0.5"/>
    <rect x="72" y="48" width="12" height="18" rx="2" fill="currentColor" opacity="0.5"/>
    <circle cx="25" cy="45" r="2.5" fill="white" opacity="0.8"/>
    <circle cx="25" cy="58" r="2.5" fill="white" opacity="0.8"/>
    <circle cx="25" cy="71" r="2.5" fill="white" opacity="0.8"/>
    <path d="M43 38 L43 88 M57 38 L57 88" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
  </svg>
);

const iconData = [
  { Icon: TshirtIcon, color: 'from-sky-400 via-blue-500 to-indigo-500', shadow: 'shadow-blue-500/60', name: 'Tişört' },
  { Icon: PantsIcon, color: 'from-indigo-400 via-purple-500 to-pink-500', shadow: 'shadow-purple-500/60', name: 'Pantolon' },
  { Icon: ShortsIcon, color: 'from-amber-400 via-orange-500 to-red-500', shadow: 'shadow-orange-500/60', name: 'Şort' },
  { Icon: SkirtIcon, color: 'from-emerald-400 via-green-500 to-teal-500', shadow: 'shadow-green-500/60', name: 'Etek' },
  { Icon: DressIcon, color: 'from-pink-400 via-rose-500 to-red-500', shadow: 'shadow-pink-500/60', name: 'Elbise' },
  { Icon: JacketIcon, color: 'from-violet-400 via-purple-500 to-fuchsia-500', shadow: 'shadow-violet-500/60', name: 'Ceket' },
  { Icon: CoatIcon, color: 'from-red-400 via-rose-500 to-pink-500', shadow: 'shadow-red-500/60', name: 'Mont' },
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
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute inset-0 bg-gradient-to-br ${currentIcon.color} rounded-full blur-3xl`}
      />

      {/* Main icon display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotateY: 0,
            transition: { 
              duration: 0.8,
              ease: [0.34, 1.56, 0.64, 1]
            } 
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.5, 
            rotateY: 90,
            transition: { duration: 0.6 } 
          }}
          className="relative flex flex-col items-center z-10"
        >
          {/* Icon container with pulsing glow */}
          <motion.div
            animate={{
              boxShadow: [
                `0 0 30px rgba(99, 102, 241, 0.4)`,
                `0 0 60px rgba(99, 102, 241, 0.7)`,
                `0 0 30px rgba(99, 102, 241, 0.4)`
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`relative bg-gradient-to-br ${currentIcon.color} p-16 rounded-3xl ${currentIcon.shadow} shadow-2xl`}
          >
            <currentIcon.Icon className="w-40 h-40 text-white drop-shadow-2xl" />
            
            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 0 
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                style={{
                  left: '50%',
                  top: '50%',
                }}
              />
            ))}
          </motion.div>
          
          {/* Label with slide-in animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center"
          >
            <span className={`text-3xl font-bold bg-gradient-to-r ${currentIcon.color} bg-clip-text text-transparent drop-shadow-lg`}>
              {currentIcon.name}
            </span>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Preview of next icon */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.3, x: 0 }}
        className="absolute right-0 opacity-30"
      >
        <div className={`bg-gradient-to-br ${nextIcon.color} p-6 rounded-2xl`}>
          <nextIcon.Icon className="w-20 h-20 text-white" />
        </div>
      </motion.div>

      {/* Decorative orbiting circles */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 opacity-10"
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
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section - Clean & Impactful */}
        <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10" />
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
                backgroundSize: '200% 200%',
              }}
            />
          </div>

          {/* Floating geometric shapes */}
          <motion.div style={{ y: y1, opacity }} className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <motion.div style={{ y: y2, opacity }} className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

          <div className="container relative px-4 md:px-6 max-w-7xl mx-auto py-12">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 text-primary font-semibold text-sm w-fit backdrop-blur-sm"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>İade Derdine Son!</span>
                </motion.div>

                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tight leading-[1.1]">
                    Beden Uymazsa,{' '}
                    <span className="relative inline-block">
                      <span className="relative z-10 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        İade Değil Tadilat
                      </span>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="absolute -bottom-1 left-0 right-0 h-3 bg-gradient-to-r from-primary/30 via-purple-600/30 to-pink-600/30 -z-0 origin-left rounded-full blur-sm"
                      />
                    </span>
                  </h1>

                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl">
                    Online alışverişten aldığınız kıyafetleri size en yakın <span className="font-bold text-primary">Terzi<span className="text-primary">Go</span></span> noktasında <span className="font-semibold text-foreground">ücretsiz tadilat</span> yaptırın.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="font-bold text-lg h-14 shadow-lg hover:shadow-xl transition-all group">
                    <Link href="/how-it-works">
                      <span>Nasıl Çalışır?</span>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="font-bold text-lg h-14 border-2 hover:bg-primary/5">
                    <Link href="/for-business">
                      <Briefcase className="mr-2 w-5 h-5" />
                      İşletmeler İçin
                    </Link>
                  </Button>
                </div>

                {/* Trust indicators - Fixed position */}
                <div className="flex flex-wrap gap-6 pt-2 pb-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground font-medium">100% Ücretsiz</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground font-medium">500+ Terzi Noktası</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground font-medium">2-5 Gün Teslimat</span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center justify-center"
              >
                <AnimatedIconCarousel />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Find Tailor Form */}
        <FindTailorForm />

        {/* Featured Products Section - Container constrained */}
        <section id="featured-products" className="w-full py-20 md:py-28 bg-gradient-to-br from-primary/5 via-purple-500/5 to-transparent relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-headline bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Noktalarımızdaki Ürünler
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Özenle seçilmiş ikinci el ve özel tasarım ürünler
              </p>
            </motion.div>

            {/* Products carousel within container */}
            <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
              <div className="flex w-max animate-scroll">
                {[...topRowProducts, ...topRowProducts].map((product, index) => (
                  <div key={`top-${product.id}-${index}`} className="w-[280px] flex-shrink-0 p-2">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              <div className="flex w-max animate-scroll-reverse mt-4">
                {[...bottomRowProducts, ...bottomRowProducts].map((product, index) => (
                  <div key={`bottom-${product.id}-${index}`} className="w-[280px] flex-shrink-0 p-2">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Tailors Section */}
        <section id="featured-points" className="w-full py-20 md:py-28 bg-gradient-to-br from-background to-primary/5">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
                <Star className="w-4 h-4 fill-current" />
                <span>En Popüler Noktalar</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-headline">
                Öne Çıkan Terzin<span className="text-primary">Go</span> Noktaları
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Müşterilerimizin en çok tercih ettiği profesyonel terziler
              </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTailors.map((tailor, index) => (
                <motion.div
                  key={tailor.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <TailorCard tailor={tailor} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button asChild size="lg" className="font-bold text-lg h-14">
                <Link href="/points">
                  Tüm Noktaları Keşfet
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* CTA Section for Businesses */}
        <section className="relative w-full py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10" />
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)',
              backgroundSize: '200% 200%',
            }}
          />

          <div className="container relative mx-auto px-4 md:px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold font-headline bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  E-Ticaret Firması mısınız?
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  İade maliyetlerinizi <span className="font-bold text-primary">%75'e kadar azaltın</span>, müşteri memnuniyetini artırın. Bugün Terzin<span className="text-primary">Go</span> ekosisteminin parçası olun.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" asChild className="font-bold text-lg h-14 shadow-lg group">
                  <Link href="/for-business">
                    <Briefcase className="mr-2 w-5 h-5" />
                    <span>İşbirliği Yap</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" asChild variant="outline" className="font-bold text-lg h-14 border-2">
                   <Link href="/how-it-works">
                    Daha Fazla Bilgi
                   </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
