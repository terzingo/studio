'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Briefcase, CheckCircle2, Sparkles, ArrowRight, Star, Users, TrendingUp, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { FindTailorForm } from '@/components/find-tailor-form';
import { getTailors, getProducts } from '@/lib/data';
import { TailorCard } from '@/components/tailor-card';
import { ProductCard } from '@/components/product-card';

// Simple, clear and recognizable clothing icons
const TshirtIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="currentColor" className={className}>
        <path d="M160 50l-10-10a25 25 0 0 0-40-15h-20a25 25 0 0 0-40 15l-10 10-20-5v30l20 5v100h100V80l20-5V45z"/>
        <path d="M100 20a20 20 0 0 1 18 12h-36a20 20 0 0 1 18-12z" opacity="0.2" fill="white"/>
    </svg>
);

const PantsIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="currentColor" className={className}>
        <path d="M60 20h80v20H60z" opacity="0.7"/>
        <path d="M60 40L70 90l-15 90h35V95a5 5 0 0 1 10 0v85h35l-15-90 10-50z"/>
        <path d="M100 40v55" stroke="white" strokeWidth="2" fill="none" opacity="0.3"/>
    </svg>
);

const SkirtIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="currentColor" className={className}>
        <path d="M60 40h80v15H60z" opacity="0.7"/>
        <path d="M60 55L40 160h120L140 55z"/>
        <path d="M100 55v105" stroke="white" strokeWidth="2" fill="none" opacity="0.2"/>
    </svg>
);

const DressIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="currentColor" className={className}>
        <path d="M60 30h80v55H60z"/>
        <path d="M60 30a20 20 0 0 0-20 0L35 50v20h10v-5h15zM140 30a20 20 0 0 1 20 0l5 20v20h-10v-5h-15z" opacity="0.7"/>
        <path d="M45 85L25 170h150L155 85H45z"/>
        <path d="M100 25a18 18 0 0 1 15 10h-30a18 18 0 0 1 15-10z" opacity="0.2" fill="white"/>
    </svg>
);

const JacketIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="currentColor" className={className}>
    <path d="M40 30l20 10v130H40zM160 30l-20 10v130h20z" opacity="0.8"/>
    <path d="M60 40h80v130H60z"/>
    <path d="M60 40L90 70 60 80zM140 40L110 70 140 80z" fill="white" opacity="0.15"/>
    <path d="M100 40v130" stroke="white" strokeWidth="3" opacity="0.1" />
  </svg>
);
const CoatIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="currentColor" className={className}>
    <path d="M35 35l20 10v135H35zM165 35l-20 10v135h20z" opacity="0.8"/>
    <path d="M55 45h90v135H55z"/>
    <path d="M55 45L95 80 55 95zM145 45L105 80 145 95z" fill="white" opacity="0.15"/>
    <path d="M90 45v135" stroke="white" strokeWidth="2" opacity="0.1" />
    <path d="M110 45v135" stroke="white" strokeWidth="2" opacity="0.1" />
    <rect x="55" y="100" width="90" height="10" fill="white" opacity="0.2" />
  </svg>
);
const ShortsIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="currentColor" className={className}>
        <path d="M50 40h100v15H50z" opacity="0.7"/>
        <path d="M50 55l15 65h30V80a5 5 0 0 1 10 0v40h30l15-65z"/>
  </svg>
);


const iconData = [
  { Icon: TshirtIcon, color: 'from-sky-400 via-blue-500 to-blue-600', shadow: 'shadow-blue-500/60', name: 'Tişört' },
  { Icon: PantsIcon, color: 'from-indigo-500 via-purple-600 to-purple-700', shadow: 'shadow-purple-500/60', name: 'Pantolon' },
  { Icon: ShortsIcon, color: 'from-amber-400 via-orange-500 to-orange-600', shadow: 'shadow-orange-500/60', name: 'Şort' },
  { Icon: SkirtIcon, color: 'from-emerald-400 via-green-500 to-green-600', shadow: 'shadow-green-500/60', name: 'Etek' },
  { Icon: DressIcon, color: 'from-pink-400 via-rose-500 to-rose-600', shadow: 'shadow-pink-500/60', name: 'Elbise' },
  { Icon: JacketIcon, color: 'from-violet-500 via-purple-600 to-indigo-600', shadow: 'shadow-violet-500/60', name: 'Ceket' },
  { Icon: CoatIcon, color: 'from-red-500 via-rose-600 to-pink-600', shadow: 'shadow-red-500/60', name: 'Mont' },
];

const AnimatedIconCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % iconData.length);
    }, 2800);
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
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.3, 0.15],
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
          initial={{ opacity: 0, scale: 0.6, rotateY: -90 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotateY: 0,
            transition: { 
              duration: 0.7,
              ease: [0.34, 1.56, 0.64, 1]
            } 
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.6, 
            rotateY: 90,
            transition: { duration: 0.5 } 
          }}
          className="relative flex flex-col items-center z-10"
        >
          {/* Icon container with pulsing glow */}
          <motion.div
            animate={{
              boxShadow: [
                `0 10px 40px rgba(99, 102, 241, 0.3)`,
                `0 20px 60px rgba(99, 102, 241, 0.6)`,
                `0 10px 40px rgba(99, 102, 241, 0.3)`
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`relative bg-gradient-to-br ${currentIcon.color} p-14 rounded-3xl ${currentIcon.shadow} shadow-2xl`}
          >
            <currentIcon.Icon className="w-44 h-44 text-white drop-shadow-2xl" />
            
            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white rounded-full"
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 0 
                }}
                animate={{
                  x: [0, (Math.random() - 0.5) * 120],
                  y: [0, (Math.random() - 0.5) * 120],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.25,
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
            transition={{ delay: 0.3 }}
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
        animate={{ opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute right-4 md:right-8"
      >
        <div className={`bg-gradient-to-br ${nextIcon.color} p-5 rounded-2xl shadow-lg`}>
          <nextIcon.Icon className="w-16 h-16 text-white opacity-80" />
        </div>
      </motion.div>

      {/* Decorative orbiting circles */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 opacity-10"
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2.5 h-2.5 bg-primary rounded-full"
            style={{
              top: `${50 + 42 * Math.sin((i * Math.PI * 2) / 6)}%`,
              left: `${50 + 42 * Math.cos((i * Math.PI * 2) / 6)}%`,
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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Clean & Impactful */}
      <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden">
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

        <div className="container relative px-4 md:px-6 max-w-7xl mx-auto py-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center space-y-10"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 text-primary font-semibold text-sm w-fit backdrop-blur-sm"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>İade Derdine Son!</span>
              </motion.div>

              <div className="space-y-8">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tight leading-[1.1]">
                  Beden Uymazsa,{' '}
                  <span className="relative inline-block mt-2">
                    <span className="relative z-10 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      İade Değil Tadilat
                    </span>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-primary/40 via-purple-600/40 to-pink-600/40 origin-left rounded-full"
                    />
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl">
                  Online alışverişten aldığınız kıyafetleri size en yakın <span className="font-bold text-primary">TerziGo</span> noktasında <span className="font-semibold text-foreground">ücretsiz tadilat</span> yaptırın.
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

              {/* Trust indicators - Fixed with proper spacing */}
              <div className="flex flex-wrap gap-6 pt-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-2 text-sm bg-background/80 backdrop-blur-sm px-3 py-2 rounded-full"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground font-medium">100% Ücretsiz</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-2 text-sm bg-background/80 backdrop-blur-sm px-3 py-2 rounded-full"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground font-medium">500+ Terzi Noktası</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-2 text-sm bg-background/80 backdrop-blur-sm px-3 py-2 rounded-full"
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
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-headline bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Noktalarımızdaki Ürünler
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Özenle seçilmiş ikinci el ve özel tasarım ürünler
            </p>
          </motion.div>

          {/* Products carousel within container with proper spacing */}
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]">
            <div className="flex w-max animate-scroll mb-6">
              {[...topRowProducts, ...topRowProducts, ...topRowProducts].map((product, index) => (
                <div key={`top-${product.id}-${index}`} className="w-[300px] flex-shrink-0 px-3">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <div className="flex w-max animate-scroll-reverse">
              {[...bottomRowProducts, ...bottomRowProducts, ...bottomRowProducts].map((product, index) => (
                <div key={`bottom-${product.id}-${index}`} className="w-[300px] flex-shrink-0 px-3">
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
              Öne Çıkan TerziGo Noktaları
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

      {/* CTA Section for Tailors */}
      <section className="w-full py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <h3 className="font-semibold text-primary">Terzilik mi yapıyorsunuz?</h3>
              <h2 className="text-4xl md:text-5xl font-bold font-headline">
                Atölyenizi <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">Geleceğe</span> Taşıyın
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Geleneksel, zahmetli ve belirsiz kazançlı iş modelini geride bırakın. Terzin<span className="font-bold text-primary">Go</span> ile dijitalleşin, kurumsal bir kimlik kazanın ve gelirinizi garanti altına alın.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 text-left">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                        <Users className="h-6 w-6"/>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Yeni Müşteri Akışı</h3>
                        <p className="text-muted-foreground mt-1">Platformumuz üzerinden bölgenizdeki binlerce e-ticaret müşterisine ulaşın.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                        <TrendingUp className="h-6 w-6"/>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Düzenli Gelir</h3>
                        <p className="text-muted-foreground mt-1">E-ticaret firmalarıyla yaptığımız anlaşmalarla atölyenize düzenli bir iş akışı sağlayın.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                        <ShieldCheck className="h-6 w-6"/>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Kurumsal Kimlik</h3>
                        <p className="text-muted-foreground mt-1">TerzinGo'nun kurumsal gücüyle mahallenizin en güvenilir ve en çok tercih edilen terzisi olun.</p>
                    </div>
                </div>
            </div>

            <div className="pt-8">
              <Button size="lg" asChild className="font-bold text-lg h-14 shadow-lg group">
                <Link href="/tailor-login">
                  <Sparkles className="mr-2 w-5 h-5" />
                  <span>TerzinGo Noktası Olun</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
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
                İade maliyetlerinizi <span className="font-bold text-primary">%75'e kadar azaltın</span>, müşteri memnuniyetini artırın. Bugün TerziGo ekosisteminin parçası olun.
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
                  Detaylı Bilgi Al
                </Link>
              </Button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">%75</div>
                <div className="text-sm text-muted-foreground">Maliyet Azalması</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">2-5</div>
                <div className="text-sm text-muted-foreground">Gün Teslimat</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Terzi Noktası</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
