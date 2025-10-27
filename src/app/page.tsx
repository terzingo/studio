import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getTailors } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle, MapPin, Package, Scissors } from 'lucide-react';
import Link from 'next/link';
import { FindTailorForm } from '@/components/find-tailor-form';

export default function Home() {
  const tailors = getTailors();
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-1');

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[80vh] md:h-screen flex items-center justify-center text-center text-white">
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
              <Link href="/points">Terzin<span className="text-primary">Go</span> Noktalarını Gör</Link>
            </Button>
          </div>
        </div>
      </section>

      <FindTailorForm />
      
      <section id="how-it-works" className="w-full py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">3 Adımda İadeye Son</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Kıyafetleriniz tam üstünüze göre olsun, iadelerle hiç uğraşmayın.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                <Package className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-headline">1. Terzi Kodunu Al</h3>
              <p className="mt-2 text-muted-foreground">
                Anlaşmalı sitelerden yaptığınız alışveriş sonrası size özel Terzi Kodunuz SMS ve e-posta ile size ulaşır.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-headline">2. Terzin<span className="text-primary">Go</span>'ya Git</h3>
              <p className="mt-2 text-muted-foreground">
                Ürününüz ve Terzi Kodunuz ile size en yakın Terzin<span className="text-primary">Go</span> noktasına giderek ölçülerinizi verin.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-headline">3. Keyfini Çıkar</h3>
              <p className="mt-2 text-muted-foreground">
                Tadilatı tamamlanan, üzerinize tam oturan kıyafetinizin keyfini çıkarın. İadeye gerek kalmadı!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Ücretsiz Tadilat Hizmetleri</h2>
              <p className="text-muted-foreground md:text-lg">
                Terzi Kodunuz ile aşağıdaki temel tadilat hizmetlerinden tamamen ücretsiz yararlanırsınız. Diğer tüm hizmetlerde ise anında 120 TL indirim kazanırsınız.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Scissors className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Paça Tadilatı</span>
                </li>
                <li className="flex items-center gap-3">
                  <Scissors className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Pens Tadilatı</span>
                </li>
                <li className="flex items-center gap-3">
                  <Scissors className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Bel Tadilatı</span>
                </li>
                <li className="flex items-center gap-3">
                  <Scissors className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Kısaltma İşlemleri</span>
                </li>
              </ul>
              <Button asChild className="mt-4">
                <Link href="/points">Tüm Hizmetleri Gör</Link>
              </Button>
            </div>
            <div>
              <Image 
                src="https://images.unsplash.com/photo-1599749144723-3a6a992e6224?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx0YWlsb3IlMjBtZWFzdXJpbmd8ZW58MHx8fHwxNzYxNjEzMjM5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Tadilat hizmeti"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
                data-ai-hint="tailor measuring"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="for-business" className="w-full py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">E-Ticaret Siteniz İçin Çözüm Ortağı</h2>
            <p className="mt-4 text-muted-foreground md:text-lg max-w-3xl mx-auto">
              İade oranlarınızı düşürün, müşteri memnuniyetini artırın ve operasyonel yükünüzü hafifletin. Terzin<span className="text-primary">Go</span> ile işinizi büyütün.
            </p>
            <div className="mt-8">
              <Button size="lg" variant="default">
                İşletmeler İçin
              </Button>
            </div>
        </div>
      </section>

    </div>
  );
}
