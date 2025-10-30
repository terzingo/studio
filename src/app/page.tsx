'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Briefcase, Store, Users } from 'lucide-react';
import Link from 'next/link';
import { FindTailorForm } from '@/components/find-tailor-form';
import { getTailors, getProducts } from '@/lib/data';
import { TailorCard } from '@/components/tailor-card';
import { ProductCard } from '@/components/product-card';

// Custom SVG Icons for clothing items
const ShirtIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
  </svg>
);

const PantsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20m-4-20v20M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
  </svg>
);

const SkirtIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16l-3-12H7L4 22zM4 8h16a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2z"/>
    </svg>
);

const DressIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4l3.5 4-3.5 4-3.5-4L12 4zM4 12h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8z"/>
    </svg>
);


const CoatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 2L12 6 8 2" />
      <path d="M12 6V22" />
      <path d="M8 22H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" />
      <path d="M16 22h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2" />
    </svg>
);


const iconComponents = [
  ShirtIcon,
  PantsIcon,
  SkirtIcon,
  DressIcon,
  CoatIcon,
];

const iconColors = [
  'text-primary',
  'text-red-400',
  'text-green-400',
  'text-yellow-400',
  'text-blue-400',
  'text-purple-400',
];


const AnimatedIcon = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % iconComponents.length);
    }, 3000); // Change icon every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const Icon = iconComponents[index];
  const colorClass = iconColors[index % iconColors.length];

  return (
     <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
        <AnimatePresence>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, x: -50, scale: 0.8, transition: { duration: 0.5 } }}
            whileHover={{ scale: 1.1 }}
            className="absolute"
          >
             <motion.div
              animate={{
                filter: ['brightness(100%)', 'brightness(150%)', 'brightness(100%)'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
                delay: 0.5,
              }}
            >
              <Icon className={`w-32 h-32 md:w-48 md:h-48 ${colorClass}`} strokeWidth={0.5} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
  )
}

export default function Home() {
  const featuredTailors = getTailors().slice(0, 3);
  const products = getProducts();
  const topRowProducts = products.slice(0, Math.ceil(products.length / 2));
  const bottomRowProducts = products.slice(Math.ceil(products.length / 2));
  
  return (
    <div className="flex flex-col min-h-screen">
       <section className="w-full py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">
                  İnternetten Aldığınız Kıyafetler Üstünüze Olmuyor mu?
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-lg">
                  Terzin<span className="text-primary">Go</span> ile iade derdine son! Anlaşmalı e-ticaret sitelerinden aldığınız ürünleri, size en yakın Terzin<span className="text-primary">Go</span> noktasında ücretsiz olarak tadilat yaptırın.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                 <Button asChild size="lg" className="font-bold">
                    <Link href="/how-it-works">Nasıl Çalışır?</Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary" className="font-bold">
                    <Link href="/points">Tüm Noktaları Gör</Link>
                  </Button>
              </div>
            </div>
             <div className="flex items-center justify-center">
              <AnimatedIcon />
            </div>
          </div>
        </div>
      </section>

      <FindTailorForm />

      <section id="featured-products" className="w-full py-16 md:py-24 animated-gradient-background">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Noktalarımızdaki Ürünler</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
             Terzin<span className="text-primary">Go</span> noktalarındaki özenle seçilmiş ikinci el ve özel tasarım ürünlere göz atın.
            </p>
          </div>
        </div>
        <div className="relative mt-12 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-scroll">
                {[...topRowProducts, ...topRowProducts].map((product, index) => (
                    <div key={`top-${product.id}-${index}`} className="w-[280px] flex-shrink-0 p-2">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
             <div className="flex w-max animate-scroll-reverse">
                {[...bottomRowProducts, ...bottomRowProducts].map((product, index) => (
                     <div key={`bottom-${product.id}-${index}`} className="w-[280px] flex-shrink-0 p-2">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
      </section>

      <section id="featured-points" className="w-full py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Öne Çıkan Terzin<span className="text-primary">Go</span> Noktaları</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
             Müşterilerimiz tarafından en çok tercih edilen ve en yüksek puan alan noktalarımız.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTailors.map(tailor => (
              <TailorCard key={tailor.id} tailor={tailor} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/points">Tüm Noktaları Keşfet</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section id="for-business" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Çözüm Ortağımız Olun</h2>
            <p className="mt-4 text-muted-foreground md:text-lg max-w-3xl mx-auto">
              İade oranlarınızı düşürün, müşteri memnuniyetini artırın veya atölyenize yeni müşteriler kazandırın. Terzin<span className="text-primary">Go</span> ile işinizi büyütün.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/for-business">İşletmeler ve Terziler İçin</Link>
              </Button>
            </div>
        </div>
      </section>

      <section id="how-it-works-cards" className="w-full py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Terzin<span className="text-primary">Go</span> Ekosistemi</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Alışveriş deneyimini herkes için kusursuz hale getiriyoruz: Müşteriler, E-ticaret Markaları ve Terziler.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Link href="/how-it-works#for-customers" className="block">
              <div className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 h-full">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">Müşteriler İçin</h3>
                <p className="mt-2 text-muted-foreground">
                  Beden uyumsuzluğuna ve iade süreçlerine son. Satın aldığınız ürünler ücretsiz tadilatla tam üstünüze göre olsun.
                </p>
              </div>
            </Link>
            <Link href="/how-it-works#for-ecommerce" className="block">
              <div className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 h-full">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                  <Briefcase className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">E-Ticaret İçin</h3>
                <p className="mt-2 text-muted-foreground">
                  Yüksek iade oranlarını düşürün, operasyonel maliyetleri azaltın ve müşteri memnuniyetini zirveye taşıyın.
                </p>
              </div>
            </Link>
            <Link href="/how-it-works#for-tailors" className="block">
              <div className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 h-full">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                  <Store className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">Terziler İçin</h3>
                <p className="mt-2 text-muted-foreground">
                  Dijital ekonomiye dahil olun, yeni müşteriler kazanın ve gelirinizi artırın. Atölyeniz mahallenin gözdesi olsun.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
