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
import Image from 'next/image';

const iconData = [
  { imageUrl: 'https://i.imgur.com/9JG7ahh.png', color: 'from-sky-400 via-blue-500 to-blue-600', shadow: 'shadow-blue-500/60', name: 'Tişört' },
  { imageUrl: 'https://i.imgur.com/SDCDaz3.png', color: 'from-indigo-500 via-purple-600 to-purple-700', shadow: 'shadow-purple-500/60', name: 'Pantolon' },
  { imageUrl: 'https://i.imgur.com/b5zLAVT.png', color: 'from-amber-400 via-orange-500 to-orange-600', shadow: 'shadow-orange-500/60', name: 'Şort' },
  { imageUrl: 'https://i.imgur.com/XqGUUTJ.png', color: 'from-emerald-400 via-green-500 to-green-600', shadow: 'shadow-green-500/60', name: 'Etek' },
  { imageUrl: 'https://i.imgur.com/zlYJusR.png', color: 'from-pink-400 via-rose-500 to-rose-600', shadow: 'shadow-pink-500/60', name: 'Elbise' },
  { imageUrl: 'https://i.imgur.com/CU706ua.png', color: 'from-violet-500 via-purple-600 to-indigo-600', shadow: 'shadow-violet-500/60', name: 'Ceket' },
  { imageUrl: 'https://i.imgur.com/hQCCybD.png', color: 'from-red-500 via-rose-600 to-pink-600', shadow: 'shadow-red-500/60', name: 'Mont' },
  { imageUrl: 'https://i.imgur.com/PBBVxZJ.png', color: 'from-cyan-400 via-sky-500 to-sky-600', shadow: 'shadow-cyan-500/60', name: 'Gömlek' },
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
            className={`relative bg-gradient-to-br ${currentIcon.color} p-4 rounded-3xl ${currentIcon.shadow} shadow-2xl flex items-center justify-center aspect-square w-64 h-64`}
          >
             <Image
              src={currentIcon.imageUrl}
              alt={currentIcon.name}
              width={200}
              height={200}
              className="drop-shadow-2xl object-contain"
            />
            
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
        </motion.div>
      </AnimatePresence>
      
        <div className="absolute -bottom-8 -right-8 z-20">
            <Image
              src="https://i.imgur.com/00ihVfJ.png"
              alt="Ücretsiz Tadilat Sticker"
              width={160}
              height={160}
              className="transform rotate-[-6deg] animate-pulse-border rounded-2xl border-4 border-primary p-1 bg-background"
            />
        </div>


      {/* Preview of next icon */}
      <motion.div
        animate={{ opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute right-4 md:right-8"
      >
        <div className={`bg-gradient-to-br ${nextIcon.color} p-3 rounded-2xl shadow-lg flex items-center justify-center aspect-square w-24 h-24`}>
          <Image
            src={nextIcon.imageUrl}
            alt={nextIcon.name}
            width={70}
            height={70}
            className="opacity-80 object-contain"
          />
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
                  Aklında Değil,{' '}
                  <span className="relative inline-block mt-2">
                    <span className="relative z-10 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Üstünde Kalsın!
                    </span>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-primary/40 via-purple-600/40 to-pink-600/40 origin-left rounded-full"
                    />
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl hidden md:block">
                  İade değil, tadilat yapın. Online alışverişten aldığınız kıyafetleri size en yakın <span className="font-bold text-foreground">Terzin</span><span className="font-bold text-primary">Go</span> noktasında <span className="font-semibold text-foreground">ücretsiz tadilat</span> yaptırın.
                </p>
              </div>

              <div className="hidden md:flex flex-col sm:flex-row gap-4">
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
              <div className="hidden md:flex flex-wrap gap-6 pt-4">
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
                Geleneksel, zahmetli ve belirsiz kazançlı iş modelini geride bırakın. <span className="font-bold text-foreground">Terzin</span><span className="font-bold text-primary">Go</span> ile dijitalleşin, kurumsal bir kimlik kazanın ve gelirinizi garanti altına alın.
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
                İade maliyetlerinizi <span className="font-bold text-primary">%75'e kadar azaltın</span>, müşteri memnuniyetini artırın. Bugün <span className="font-bold text-foreground">Terzin</span><span className="font-bold text-primary">Go</span> ekosisteminin parçası olun.
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
