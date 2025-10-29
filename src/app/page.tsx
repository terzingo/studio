'use client';
import React from 'react';
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay"

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Briefcase, Store, Users } from 'lucide-react';
import Link from 'next/link';
import { FindTailorForm } from '@/components/find-tailor-form';
import { getTailors, getProducts } from '@/lib/data';
import { TailorCard } from '@/components/tailor-card';
import { ProductCard } from '@/components/product-card';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

export default function Home() {
  const featuredTailors = getTailors().slice(0, 3);
  const products = getProducts();
  const topRowProducts = products.slice(0, Math.ceil(products.length / 2));
  const bottomRowProducts = products.slice(Math.ceil(products.length / 2));
  
  const heroImages = PlaceHolderImages.filter(img => ['hero-1', 'hero-2', 'hero-3', 'hero-4'].includes(img.id));
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <div className="flex flex-col min-h-screen">
       <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
        <Carousel
          plugins={[plugin.current]}
          className="absolute inset-0 w-full h-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="h-full">
            {heroImages.map((heroImage, index) => (
              <CarouselItem key={heroImage.id} className="h-full">
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={heroImage.imageHint}
                  priority={index === 0}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 p-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
            İnternetten Aldığınız Kıyafetler Üstünüze Olmuyor mu?
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            Terzin<span className="text-primary">Go</span> ile iade derdine son! Anlaşmalı e-ticaret sitelerinden aldığınız ürünleri, size en yakın Terzin<span className="text-primary">Go</span> noktasında ücretsiz olarak tadilat yaptırın.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="font-bold">
              <a href="/#how-it-works">Nasıl Çalışır?</a>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-bold">
              <Link href="/points">Tüm Noktaları Gör</Link>
            </Button>
          </div>
        </div>
      </section>

      <FindTailorForm />

      <section id="featured-products" className="w-full py-16 md:py-24 animated-gradient-background">
        <div className="container mx-auto px-4 md:px-6">
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
        <div className="container mx-auto px-4 md:px-6">
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
        <div className="container mx-auto px-4 md:px-6 text-center">
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

      <section id="how-it-works" className="w-full py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Terzin<span className="text-primary">Go</span> Ekosistemi</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Alışveriş deneyimini herkes için kusursuz hale getiriyoruz: Müşteriler, E-ticaret Markaları ve Terziler.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-headline">Müşteriler İçin</h3>
              <p className="mt-2 text-muted-foreground">
                Beden uyumsuzluğuna ve iade süreçlerine son. Satın aldığınız ürünler ücretsiz tadilatla tam üstünüze göre olsun.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                <Briefcase className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-headline">E-Ticaret İçin</h3>
              <p className="mt-2 text-muted-foreground">
                Yüksek iade oranlarını düşürün, operasyonel maliyetleri azaltın ve müşteri memnuniyetini zirveye taşıyın.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                <Store className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-headline">Terziler İçin</h3>
              <p className="mt-2 text-muted-foreground">
                Dijital ekonomiye dahil olun, yeni müşteriler kazanın ve gelirinizi artırın. Atölyeniz mahallenin gözdesi olsun.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

    
