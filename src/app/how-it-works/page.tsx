import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Briefcase, MapPin, Scissors, ShoppingCart, Star, Store, Ticket, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const StepCard = ({ icon, step, title, description }: { icon: React.ReactNode, step: string, title: string, description: string }) => (
    <div className="relative flex items-start gap-6">
        <div className="relative z-10 flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary border-2 border-primary/20">
                {icon}
            </div>
            <div className="absolute top-full mt-2 w-px flex-1 bg-border h-full" />
        </div>
        <div className="pt-2">
            <p className="font-semibold text-primary">{step}</p>
            <h3 className="font-bold text-xl mt-1">{title}</h3>
            <p className="mt-2 text-muted-foreground">{description}</p>
        </div>
    </div>
);

const Section = ({ id, title, subtitle, imageUrl, imageHint, children, reverse = false }: { id: string, title: string, subtitle: string, imageUrl?: string, imageHint?: string, children: React.ReactNode, reverse?: boolean }) => (
    <section id={id} className="w-full py-16 md:py-24 border-b last-of-type:border-none">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">{title}</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">{subtitle}</p>
            </div>
            <div className={`grid md:grid-cols-2 gap-12 items-center ${reverse ? 'md:grid-flow-col-dense' : ''}`}>
                <div className={`space-y-12 ${reverse ? 'md:col-start-1' : ''}`}>
                    {children}
                </div>
                {imageUrl && (
                    <div className="flex items-center justify-center">
                        <Image
                            src={imageUrl}
                            alt={title}
                            width={500}
                            height={500}
                            className="rounded-lg shadow-xl"
                            data-ai-hint={imageHint}
                        />
                    </div>
                )}
            </div>
        </div>
    </section>
);

export default function HowItWorksPage() {
    const customerImage = PlaceHolderImages.find(img => img.id === 'hero-1');
    const ecommerceImage = PlaceHolderImages.find(img => img.id === 'for-business-ecommerce');
    const tailorImage = PlaceHolderImages.find(img => img.id === 'for-business-tailor');

    return (
        <div>
            <div className="text-center py-16 md:py-24 bg-primary/5">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline">
                        Terzin<span className="text-primary">Go</span> Nasıl Çalışır?
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        Alışveriş deneyimini herkes için daha akıllı, daha sürdürülebilir ve daha kârlı hale getiren ekosistemimizi keşfedin.
                    </p>
                </div>
            </div>

            <Section
                id="for-customers"
                title={<>Müşteriler İçin: <span className="text-primary">Kusursuz Alışveriş</span></>}
                subtitle="Beden uyumsuzluğuna ve iade süreçlerine son verin. Satın aldığınız ürünler ücretsiz tadilatla tam üstünüze göre olsun."
                imageUrl={customerImage?.imageUrl}
                imageHint={customerImage?.imageHint}
            >
                <StepCard
                    icon={<ShoppingCart size={32} />}
                    step="Adım 1"
                    title="Alışveriş Yap"
                    description="Anlaşmalı e-ticaret markalarından beğendiğiniz ürünü satın alın."
                />
                <StepCard
                    icon={<Ticket size={32} />}
                    step="Adım 2"
                    title="Tadilat Kodu Al"
                    description="Siparişinizle birlikte size özel, tek kullanımlık TerzinGo tadilat kodunuzu alın."
                />
                <StepCard
                    icon={<MapPin size={32} />}
                    step="Adım 3"
                    title="Terziyi Bul"
                    description="Size en yakın TerzinGo noktasını haritadan veya listeden bularak ürününüzü teslim edin."
                />
                <StepCard
                    icon={<Scissors size={32} />}
                    step="Adım 4"
                    title="Kusursuz Sonuç"
                    description="Terziniz, ürününüzü tam bedeninize göre ücretsiz olarak ayarlasın ve mükemmel uyumun keyfini çıkarın."
                />
            </Section>

            <Section
                id="for-ecommerce"
                title={<>E-Ticaret İçin: <span className="text-primary">Kârlı Büyüme</span></>}
                subtitle="Yüksek iade oranlarını düşürün, operasyonel maliyetleri azaltın ve müşteri memnuniyetini zirveye taşıyarak marka sadakati yaratın."
                imageUrl={ecommerceImage?.imageUrl}
                imageHint={ecommerceImage?.imageHint}
                reverse
            >
                <StepCard
                    icon={<Briefcase size={32} />}
                    step="Adım 1"
                    title="Entegre Olun"
                    description="TerzinGo sistemini platformunuza kolayca entegre edin ve müşterilerinize tadilat seçeneği sunun."
                />
                <StepCard
                    icon={<ArrowRight size={32} className='rotate-90'/>}
                    step="Adım 2"
                    title="İadeleri Yönlendirin"
                    description="Beden uyumsuzluğu nedeniyle iade talebi oluşturan müşterilerinizi, ücretsiz tadilat için TerzinGo noktalarına yönlendirin."
                />
                <StepCard
                    icon={<Star size={32} />}
                    step="Adım 3"
                    title="Sadakat Kazanın"
                    description="Müşterilerinize sunduğunuz bu benzersiz katma değer ile rakiplerinizden ayrışın ve satışlarınızı net kâra dönüştürün."
                />
                 <div className="pl-24 pt-4">
                    <Button asChild size="lg">
                        <Link href="/for-business">Daha Fazla Bilgi Al & Başvur</Link>
                    </Button>
                </div>
            </Section>

            <Section
                id="for-tailors"
                title={<>Terziler İçin: <span className="text-primary">Dijital Atölye</span></>}
                subtitle="Atölyenizi dijital ekonomiye taşıyın, yeni müşteriler ve ek gelir fırsatları ile işinizi büyütün."
                imageUrl={tailorImage?.imageUrl}
                imageHint={tailorImage?.imageHint}
            >
                <StepCard
                    icon={<Users size={32} />}
                    step="Adım 1"
                    title="Platforma Katılın"
                    description="TerzinGo iş ortağı olun ve atölyenizi binlerce potansiyel müşterinin görebileceği haritamıza ekleyin."
                />
                <StepCard
                    icon={<Store size={32} />}
                    step="Adım 2"
                    title="Yeni İşler Alın"
                    description="E-ticaret müşterilerinden gelen düzenli tadilat işleri ile gelirinizi ve iş hacminizi artırın."
                />
                <StepCard
                    icon={<Scissors size={32} />}
                    step="Adım 3"
                    title="Hizmetlerinizi Genişletin"
                    description="Tadilatların yanı sıra, atölyenizde sunduğunuz özel dikim ve ikinci el ürün satışı gibi hizmetlerle ek gelir elde edin."
                />
                <div className="pl-24 pt-4">
                    <Button asChild size="lg">
                        <Link href="/tailor-login">TerzinGo Noktası Olun</Link>
                    </Button>
                </div>
            </Section>
        </div>
    );
}
