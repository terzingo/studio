'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Briefcase, Store, Users, TrendingDown, Clock, Award, CheckCircle2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { FindTailorForm } from '@/components/find-tailor-form';
import { getTailors, getProducts } from '@/lib/data';
import { TailorCard } from '@/components/tailor-card';
import { ProductCard } from '@/components/product-card';

// Enhanced Custom SVG Icons for clothing items
const ShirtIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
  </svg>
);

const PantsIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2v20m-4-20v20M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
  </svg>
);

const ShortsIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 4h12l2 8v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6l2-8z"/>
    <path d="M12 4v16"/>
  </svg>
);

const SkirtIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 12l2 8h12l2-8H4z"/>
    <path d="M8 4h8l-1 8H9L8 4z"/>
  </svg>
);

const DressIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 4L8 2v2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2V4l-4 2z"/>
        <path d="M12 4v2"/>
        <path d="M6 12h12"/>
    </svg>
);

const CoatIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
        <path d="M12 4v16"/>
        <path d="M8 12h8"/>
    </svg>
);


const clothingIcons = [
    { component: ShirtIcon, color: "text-blue-400" },
    { component: PantsIcon, color: "text-green-400" },
    { component: DressIcon, color: "text-pink-400" },
    { component: SkirtIcon, color: "text-purple-400" },
    { component: CoatIcon, color: "text-orange-400" },
    { component: ShortsIcon, color: "text-teal-400" },
];


export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % clothingIcons.length);
        }, 4000); // Change icon every 4 seconds

        return () => clearInterval(interval);
    }, []);

    const CurrentIcon = clothingIcons[currentIndex].component;
    const currentColor = clothingIcons[currentIndex].color;

    const allTailors = getTailors();
    const allProducts = getProducts();

    return (
        <>
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 animated-gradient-background">
                <div className="container max-w-6xl mx-auto px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-16 items-center">
                        <div className="space-y-6 text-center lg:text-left">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter font-headline">
                            İnternetten Aldığınız Kıyafetler Üstünüze Olmuyor mu?
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
                            Terzin<span className="text-primary">Go</span> ile e-ticaretten aldığınız ürünleri mahallenizdeki terzide ücretsiz olarak tam bedeninize göre ayarlatın. İadeye son, mükemmel uyuma merhaba!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Button size="lg" asChild>
                                <Link href="/how-it-works">Nasıl Çalışır?</Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                <Link href="/points">Tüm Noktaları Gör</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="relative flex items-center justify-center min-h-[300px] md:min-h-[400px]">
                             <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                                    exit={{ opacity: 0, x: -100, transition: { duration: 0.8, ease: "easeInOut" } }}
                                    className="absolute"
                                >
                                     <motion.div
                                        animate={{ filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'] }}
                                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2.5, ease: "circInOut" }}
                                    >
                                        <CurrentIcon className={`w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl ${currentColor}`} />
                                     </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>
            
            <FindTailorForm />

            {/* How it works cards */}
             <section id="how-it-works-cards" className="w-full py-16 md:py-24 bg-muted/40">
                <div className="container max-w-6xl mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-headline">
                        Terzin<span className="text-primary">Go</span> Ekosistemi
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Alışveriş deneyimini herkes için daha akıllı, daha sürdürülebilir ve daha kârlı hale getiriyoruz.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Link href="/how-it-works#for-customers" className="group">
                             <div className="bg-card p-8 rounded-lg shadow-lg h-full text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                                <Users className="h-16 w-16 text-primary mx-auto mb-6" />
                                <h3 className="text-2xl font-bold font-headline mb-4">Müşteriler İçin</h3>
                                <p className="text-muted-foreground mb-4">Satın aldığınız ürünler bedeninize tam uysun. İade süreçleriyle uğraşmadan, ücretsiz tadilat konforunu yaşayın.</p>
                                <span className="font-semibold text-primary group-hover:underline">Daha Fazla Bilgi &rarr;</span>
                            </div>
                        </Link>
                         <Link href="/how-it-works#for-ecommerce" className="group">
                            <div className="bg-card p-8 rounded-lg shadow-lg h-full text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                                <Briefcase className="h-16 w-16 text-primary mx-auto mb-6" />
                                <h3 className="text-2xl font-bold font-headline mb-4">E-Ticaret İçin</h3>
                                <p className="text-muted-foreground mb-4">İade oranlarınızı düşürün, müşteri memnuniyetini ve kârlılığı artırın. Sürdürülebilir bir iş modeli oluşturun.</p>
                                <span className="font-semibold text-primary group-hover:underline">İşletmenizi Büyütün &rarr;</span>
                            </div>
                        </Link>
                         <Link href="/how-it-works#for-tailors" className="group">
                            <div className="bg-card p-8 rounded-lg shadow-lg h-full text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                                <Store className="h-16 w-16 text-primary mx-auto mb-6" />
                                <h3 className="text-2xl font-bold font-headline mb-4">Terziler İçin</h3>
                                <p className="text-muted-foreground mb-4">Dijital ekonomiye katılın, atölyenize düzenli iş akışı sağlayın ve gelirinizi artırarak işinizi geleceğe taşıyın.</p>
                                <span className="font-semibold text-primary group-hover:underline">Terzin<span className="text-primary">Go</span> Noktası Olun &rarr;</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Tailors Section */}
            <section className="w-full py-16 md:py-24">
                <div className="container max-w-6xl mx-auto px-4 md:px-6">
                    <div className="flex justify-between items-center mb-8">
                         <h2 className="text-3xl md:text-4xl font-bold font-headline">Öne Çıkan Terzin<span className="text-primary">Go</span> Noktaları</h2>
                        <Button variant="link" asChild>
                            <Link href="/points">Tümünü Gör &rarr;</Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {allTailors.slice(0, 4).map(tailor => (
                            <TailorCard key={tailor.id} tailor={tailor} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="w-full py-16 md:py-24 bg-muted/40">
                <div className="container max-w-6xl mx-auto px-4 md:px-6">
                     <div className="flex justify-between items-center mb-8">
                         <h2 className="text-3xl md:text-4xl font-bold font-headline">Atölyeden Ürünler</h2>
                        <Button variant="link" asChild>
                            <Link href="#">Tümünü Gör &rarr;</Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                         {allProducts.slice(0, 10).map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
