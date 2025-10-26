import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TailorCard } from '@/components/tailor-card';
import { getTailors } from '@/lib/data';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { DraftingCompass, Scissors, UserCheck } from 'lucide-react';
import { IdealTailorForm } from '@/components/ideal-tailor-form';

export default function Home() {
  const tailors = getTailors();
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-1');

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
            Hayalinizdeki Kıyafete TerzinGo ile Ulaşın
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Stil sahibi dokunuşlar, usta ellerde hayat buluyor. Size en uygun terziyi keşfedin, tarzınızı yeniden yaratın.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="font-bold">
              <a href="#ideal-terzi">İdeal Terzini Bul</a>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-bold">
              <a href="/tailors">Tüm Terzileri Gör</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="ideal-terzi" className="w-full py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Yapay Zeka Destekli Terzi Önerisi</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Sadece birkaç soruya cevap verin, yapay zekamız stilinize, ihtiyaçlarınıza ve konumunuza en uygun terziyi sizin için bulsun.
            </p>
          </div>
          <div className="mt-12 max-w-2xl mx-auto">
            <IdealTailorForm />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Nasıl Çalışır?</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Üç basit adımda mükemmel terzi deneyimine ulaşın.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                <DraftingCompass className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-headline">1. İhtiyacını Anlat</h3>
              <p className="mt-2 text-muted-foreground">
                Ne tür bir hizmete ihtiyacınız olduğunu ve stil tercihlerinizi belirtin.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                <Scissors className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-headline">2. Terzini Seç</h3>
              <p className="mt-2 text-muted-foreground">
                Size özel önerilen veya yakınınızdaki terzilerin profillerini inceleyerek seçiminizi yapın.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                <UserCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-headline">3. Tadını Çıkar</h3>
              <p className="mt-2 text-muted-foreground">
                Randevunuzu oluşturun ve hayalinizdeki kıyafete kavuşmanın keyfini yaşayın.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="featured-tailors" className="w-full py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Öne Çıkan Terziler</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Kullanıcılarımız tarafından en çok tercih edilen popüler terzilerimiz.
            </p>
          </div>
          <div className="mt-12">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {tailors.slice(0, 5).map((tailor) => (
                  <CarouselItem key={tailor.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <TailorCard tailor={tailor} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
}
