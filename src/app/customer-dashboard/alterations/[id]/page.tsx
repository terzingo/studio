

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle, Circle, Scissors, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data - in a real app this would come from a database
const mockAlterationDetails = {
    'TAD001': {
        id: 'TAD001',
        item: 'Kot Pantolon',
        tailor: 'Atölye Yılmaz',
        tailorId: 'ahmet-yilmaz',
        status: 'Terzide',
        productImageId: 'product-5',
        beforeImageId: 'portfolio-7',
        afterImageId: 'product-5',
        timeline: [
            { status: 'Teslim Alındı', date: '24.07.2024 14:30', completed: true },
            { status: 'Tadilat Başladı', date: '25.07.2024 10:00', completed: true },
            { status: 'Tadilat Sürüyor', date: 'Bugün', completed: false },
            { status: 'Teslime Hazır', date: null, completed: false },
        ],
        notes: "Paça boyu 3 cm kısaltılacak ve belden 2 cm daraltılacak."
    },
    'TAD002': {
        id: 'TAD002',
        item: 'Yazlık Elbise',
        tailor: 'Pratik Terzi Fatma',
        tailorId: 'fatma-demir',
        status: 'Tamamlandı',
        productImageId: 'product-3',
        beforeImageId: 'portfolio-8',
        afterImageId: 'product-3',
        timeline: [
            { status: 'Teslim Alındı', date: '16.07.2024 11:00', completed: true },
            { status: 'Tadilat Başladı', date: '17.07.2024 09:15', completed: true },
            { status: 'Tamamlandı', date: '18.07.2024 17:00', completed: true },
            { status: 'Teslime Hazır', date: '18.07.2024 17:05', completed: true },
        ],
        notes: "Elbise boyu 5cm kısaltıldı ve yanlardan pens atıldı."
    },
    'TAD003': {
        id: 'TAD003',
        item: 'Gömlek',
        tailor: 'Gömlek Atölyesi',
        tailorId: 'kenan-erkin',
        status: 'Teslim Alındı',
        productImageId: 'product-4',
        beforeImageId: 'portfolio-6',
        afterImageId: 'product-4',
        timeline: [
            { status: 'Teslim Alındı', date: '10.07.2024 16:00', completed: true },
            { status: 'Tadilat Başladı', date: '11.07.2024 11:30', completed: true },
            { status: 'Tamamlandı', date: '12.07.2024 14:00', completed: true },
            { status: 'Müşteriye Teslim Edildi', date: '12.07.2024 18:00', completed: true },
        ],
        notes: "Kol boyu 2cm kısaltıldı."
    }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Terzide':
    case 'Tadilat Sürüyor':
      return <Badge variant="secondary">{status}</Badge>
    case 'Tamamlandı':
    case 'Teslime Hazır':
      return <Badge>{status}</Badge>
    case 'Teslim Alındı':
    case 'Müşteriye Teslim Edildi':
      return <Badge variant="outline">{status}</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const TimelineIcon = ({ status, completed }: { status: string; completed: boolean }) => {
    const iconProps = {
        className: `h-5 w-5 ${completed ? 'text-primary' : 'text-muted-foreground'}`
    };

    if (status.includes('Hazır') || status.includes('Tamamlandı') || status.includes('Edildi')) return <CheckCircle {...iconProps} />;
    if (status.includes('Tadilat')) return <Scissors {...iconProps} />;
    if (status.includes('Teslim')) return <Truck {...iconProps} />;
    return <Circle {...iconProps} />;
};


export default function AlterationDetailPage({ params }: { params: { id: string } }) {
    const alteration = mockAlterationDetails[params.id as keyof typeof mockAlterationDetails];

    if (!alteration) {
        notFound();
    }

    const productImage = PlaceHolderImages.find(img => img.id === alteration.productImageId);
    const beforeImage = PlaceHolderImages.find(img => img.id === alteration.beforeImageId);
    const afterImage = PlaceHolderImages.find(img => img.id === alteration.afterImageId);
    
    return (
        <div className="container mx-auto max-w-5xl px-4 py-8">
             <Button variant="ghost" asChild className="mb-4">
                <Link href="/customer-dashboard"> &larr; Panele Geri Dön</Link>
            </Button>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-3xl font-headline">Tadilat Detayı: {alteration.id}</CardTitle>
                            <CardDescription>
                                Ürün: {alteration.item} | Terzi: 
                                <Link href={`/points/${alteration.tailorId}`} className="text-primary hover:underline ml-1">{alteration.tailor}</Link>
                            </CardDescription>
                        </div>
                        {getStatusBadge(alteration.status)}
                    </div>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <h3 className="font-semibold text-lg mb-4">Tadilat Süreci</h3>
                        <div className="relative pl-6">
                            {/* Timeline line */}
                            <div className="absolute left-[31px] top-2 h-[calc(100%-1rem)] w-0.5 bg-border -translate-x-1/2" />
                            
                            {alteration.timeline.map((event, index) => (
                                <div key={index} className="relative flex items-start gap-6 pb-8">
                                    <div className="relative z-10">
                                        <div className="h-10 w-10 flex items-center justify-center bg-background rounded-full border-2 border-primary/50">
                                            <TimelineIcon status={event.status} completed={event.completed} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className={`font-semibold ${event.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                                            {event.status}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{event.date || 'Bekleniyor'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                         <Separator className="my-6" />

                        <div>
                            <h3 className="font-semibold text-lg mb-4">Öncesi & Sonrası</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {beforeImage && (
                                     <div>
                                        <h4 className="text-center font-medium mb-2">Önce</h4>
                                        <Image src={beforeImage.imageUrl} alt="Tadilat öncesi" width={400} height={500} className="rounded-lg object-cover" data-ai-hint={beforeImage.imageHint}/>
                                     </div>
                                )}
                               {afterImage && (
                                     <div>
                                        <h4 className="text-center font-medium mb-2">Sonra</h4>
                                        <Image src={afterImage.imageUrl} alt="Tadilat sonrası" width={400} height={500} className="rounded-lg object-cover" data-ai-hint={afterImage.imageHint} />
                                     </div>
                                )}
                            </div>
                        </div>

                    </div>
                    <div className="md:col-span-1 space-y-6">
                        <Card>
                             <CardHeader>
                                <CardTitle className="text-lg">Ürün Bilgisi</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {productImage && (
                                    <Image src={productImage.imageUrl} alt={alteration.item} width={300} height={300} className="rounded-lg object-cover w-full mb-4" data-ai-hint={productImage.imageHint} />
                                )}
                                <p className="font-semibold">{alteration.item}</p>
                                <p className="text-sm text-muted-foreground">Tadilat Notları: {alteration.notes}</p>
                            </CardContent>
                        </Card>
                        <Card>
                             <CardHeader>
                                <CardTitle className="text-lg">Terzi Bilgisi</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-semibold">{alteration.tailor}</p>
                                <Button variant="link" asChild className="p-0 h-auto">
                                    <Link href={`/points/${alteration.tailorId}`}>Mağazayı Görüntüle</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
