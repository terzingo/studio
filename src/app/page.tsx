'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Briefcase, CheckCircle2, Sparkles, ArrowRight, Star } from 'lucide-react';
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
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute inset-0 bg-gradient-to-br ${currentIcon.color} rounded-full blur-3xl opacity-30`}
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
                `0 0 20px rgba(99, 102, 241, 0.3)`,
                `0 0 60px rgba(99, 102, 241, 0.8)`,
                `0 0 20px rgba(99, 102, 241, 0.3)`
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`relative bg-gradient-to-br ${currentIcon.color} p-12 rounded-3xl ${currentIcon.shadow} shadow-2xl`}
          >
            <currentIcon.Icon className="w-48 h-48 text-white drop-shadow-2xl" />
            
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
                      className="absolute bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-primary/20 to-purple-600/20 -z-0 origin-left"
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

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 pt-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-muted-foreground font-medium">100% Ücretsiz</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-muted-foreground font-medium">500+ Terzi Noktası</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
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

      {/* Featured Products Section */}
      <section id="featured-products" className="w-full py-20 md:py-28 animated-gradient-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-transparent" />

        <div className="container relative mx-auto px-4 md:px-6 max-w-6xl">
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
        </div>

        <div className="relative mt-8 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
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