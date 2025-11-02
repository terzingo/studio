import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Zap, DollarSign, Heart, Scissors, Users } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

export default function ForBusinessPage() {
  const ecommerceImage = PlaceHolderImages.find(img => img.id === 'for-business-ecommerce');
  const tailorImage = PlaceHolderImages.find(img => img.id === 'for-business-tailor');

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">İşinizi Terzin<span className="text-primary">Go</span> ile Büyütün</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          E-ticaret iade oranlarınızı düşürün, müşteri memnuniyetini artırın veya atölyenize yeni müşteriler kazandırın. Çözüm ortağımız olun.
        </p>
      </div>

      {/* E-Ticaret İşletmeleri İçin */}
      <section id="for-ecommerce" className="w-full py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">E-Ticaret Markaları İçin</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Yüksek iade oranları kârlılığınızı mı düşürüyor? Müşteri memnuniyetini artırırken operasyonel yükünüzü hafifletin.
            </p>
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                  <DollarSign className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">İade Oranlarını Düşürün</h3>
                  <p className="text-muted-foreground mt-1">Ücretsiz tadilat hizmeti ile "beden uymadı" iadelerine son verin. Satışlarınız net kâr'a dönüşsün.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Müşteri Sadakati Yaratın</h3>
                  <p className="text-muted-foreground mt-1">Müşterilerinize sunduğunuz bu benzersiz katma değer ile rakiplerinizden ayrışın ve marka sadakati oluşturun.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Operasyonel Yükü Azaltın</h3>
                  <p className="text-muted-foreground mt-1">İade kargo, ürün kontrolü ve yeniden stoklama gibi süreçlerden kurtulun. Kaynaklarınızı büyümeye odaklayın.</p>
                </div>
              </div>
            </div>
             <div className="mt-10">
                <Button size="lg">Hemen Başvurun</Button>
            </div>
          </div>
          <div className="order-1 md:order-2">
            {ecommerceImage && (
                <Image
                    src={ecommerceImage.imageUrl}
                    alt={ecommerceImage.description}
                    width={600}
                    height={600}
                    className="rounded-lg shadow-xl"
                    data-ai-hint={ecommerceImage.imageHint}
                />
            )}
          </div>
        </div>
      </section>

      {/* Terziler İçin */}
      <section id="for-tailors" className="w-full py-16 mt-16 border-t">
         <div className="grid md:grid-cols-2 gap-12 items-center">
           <div>
            {tailorImage && (
                <Image
                    src={tailorImage.imageUrl}
                    alt={tailorImage.description}
                    width={600}
                    height={600}
                    className="rounded-lg shadow-xl"
                    data-ai-hint={tailorImage.imageHint}
                />
            )}
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Terziler ve Atölyeler İçin</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              İşletmenizi dijital dünyaya taşıyın, gelirinizi artırın ve mahallenizin en çok tercih edilen terzisi olun.
            </p>
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Yeni Müşteriler Kazanın</h3>
                  <p className="text-muted-foreground mt-1">Platformumuz üzerinden bölgenizdeki binlerce e-ticaret müşterisine ulaşın ve atölyenize düzenli bir iş akışı sağlayın.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                  <Scissors className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Ek Gelir Modelleri</h3>
                  <p className="text-muted-foreground mt-1">Ücretsiz tadilatların yanı sıra, müşterilere sunacağınız diğer hizmetler ve ikinci el ürün satışı gibi fırsatlarla gelirinizi çeşitlendirin.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                   <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Kolay Yönetim Paneli</h3>
                  <p className="text-muted-foreground mt-1">Size özel panel üzerinden gelen işleri, müşteri bilgilerini ve ödemelerinizi kolayca takip edin. Teknolojiyi işinizin bir parçası yapın.</p>
                </div>
              </div>
            </div>
             <div className="mt-10">
                <Button size="lg" asChild>
                    <Link href="/tailor-login" className="group">Terzin<span className="text-primary-foreground group-hover:text-black transition-colors">Go</span> Noktası Olun</Link>
                </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

    
