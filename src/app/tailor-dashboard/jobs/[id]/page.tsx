'use client'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Check, CircleDot, Mail, Truck, Upload, Scissors, Hammer } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { allJobs } from "../page"

const mockJobDetails: { [key: string]: { id: string; item: string; customer: string; customerId: string; status: string; dateReceived: string; productImageId: string; beforeImageId: string; afterImageId: null | string; timeline: { status: string; date: string; completed: boolean; }[]; notesFromCustomer: string; notesToCustomer: string; price: string; } } = {
    'TAD004': {
        id: 'TAD004',
        item: 'Takım Elbise Paça',
        customer: 'Ahmet Çelik',
        customerId: 'CUST002',
        status: 'Beklemede',
        dateReceived: '04.08.2024 11:20',
        productImageId: 'product-13',
        beforeImageId: 'portfolio-2',
        afterImageId: null,
        timeline: [
            { status: 'Tadilat Talebi Alındı', date: '04.08.2024 11:20', completed: true },
            { status: 'Müşteri Onayı Bekleniyor', date: 'Bugün', completed: false },
        ],
        notesFromCustomer: "Paça boyu 2 cm kısaltılacak. Duble paça olmasın.",
        notesToCustomer: "",
        price: '150 TL'
    },
    'TAD005': {
        id: 'TAD005',
        item: 'Abiye Daraltma',
        customer: 'Zeynep Sancak',
        customerId: 'CUST003',
        status: 'İşleme Alındı',
        dateReceived: '03.08.2024 16:00',
        productImageId: 'product-2',
        beforeImageId: 'portfolio-3',
        afterImageId: null,
        timeline: [
            { status: 'Tadilat Talebi Alındı', date: '03.08.2024 16:00', completed: true },
            { status: 'Müşteri Onayladı', date: '03.08.2024 18:30', completed: true },
            { status: 'İşleme Alındı', date: '04.08.2024 09:00', completed: true },
            { status: 'Tadilat Sürüyor', date: 'Bugün', completed: false },
        ],
        notesFromCustomer: "Bel ve yanlardan toplam 4 cm daraltılacak. Etek boyu aynı kalacak.",
        notesToCustomer: "Daraltma işlemi sonrası prova için bekliyoruz.",
        price: '450 TL'
    },
    'TAD006': {
        id: 'TAD006',
        item: 'Gömlek Kol Boyu',
        customer: 'Murat Varlı',
        customerId: 'CUST004',
        status: 'Tamamlandı',
        dateReceived: '01.08.2024 10:00',
        productImageId: 'product-4',
        beforeImageId: 'portfolio-6',
        afterImageId: 'product-4',
        timeline: [
            { status: 'Tadilat Talebi Alındı', date: '01.08.2024 10:00', completed: true },
            { status: 'İşleme Alındı', date: '01.08.2024 10:30', completed: true },
            { status: 'Tadilat Tamamlandı', date: '01.08.2024 15:00', completed: true },
            { status: 'Müşteriye Teslime Hazır', date: '01.08.2024 15:05', completed: true },
        ],
        notesFromCustomer: "Manşetler dahil kol boyu 1.5 cm kısaltılacak.",
        notesToCustomer: "İşlem tamamlandı, atölyemizden teslim alabilirsiniz.",
        price: '120 TL'
    }
};

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'Beklemede': return <Badge variant="destructive">{status}</Badge>
        case 'İşleme Alındı': return <Badge>{status}</Badge>
        case 'Tamamlandı':
        case 'Teslime Hazır':
            return <Badge className="bg-green-500">{status}</Badge>
        default: return <Badge variant="outline">{status}</Badge>
    }
}

export default function TailorJobDetailPage() {
    const params = useParams();
    const jobId = typeof params.id === 'string' ? params.id : '';
    
    // Combine data from the list and the mock details
    const jobData = allJobs.find(j => j.id === jobId);
    const jobDetail = mockJobDetails[jobId as keyof typeof mockJobDetails];

    const job = jobData ? { ...jobData, ...jobDetail } : undefined;

    if (!job) {
        notFound();
    }

    const beforeImage = job.beforeImageId ? PlaceHolderImages.find(img => img.id === job.beforeImageId) : null;
    const afterImage = job.afterImageId ? PlaceHolderImages.find(img => img.id === job.afterImageId) : null;
    
    const canCompleteJob = job.status === 'İşleme Alındı' || job.status === 'Tamamlandı';

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-3xl font-headline">İş Detayı: #{job.id}</CardTitle>
                            <CardDescription>
                                Müşteri: 
                                <Link href={`/tailor-dashboard/customers`} className="text-primary hover:underline ml-1">{job.customer}</Link>
                                | Talep Tarihi: {job.dateReceived || job.date}
                            </CardDescription>
                        </div>
                        {getStatusBadge(job.status)}
                    </div>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <h3 className="font-semibold text-lg mb-4">İş Zaman Tüneli</h3>
                            {(job.timeline || []).map((event, index) => (
                                 <div key={index} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${event.completed ? 'bg-primary text-primary-foreground' : 'border bg-muted'}`}>
                                            {event.completed ? <Check className="h-5 w-5" /> : <CircleDot className="h-5 w-5" />}
                                        </div>
                                        {index < job.timeline.length - 1 && <div className="w-px flex-1 bg-border" />}
                                    </div>
                                    <div className="pb-8">
                                        <p className="font-semibold">{event.status}</p>
                                        <p className="text-sm text-muted-foreground">{event.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                         <Separator />
                        <div>
                            <h3 className="font-semibold text-lg mb-4">Öncesi & Sonrası</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {beforeImage && (
                                    <div>
                                        <h4 className="text-center font-medium mb-2">Müşterinin Gönderdiği</h4>
                                        <Image src={beforeImage.imageUrl} alt="Tadilat öncesi" width={400} height={500} className="rounded-lg object-cover" data-ai-hint={beforeImage.imageHint}/>
                                    </div>
                                )}
                                <div>
                                    <h4 className="text-center font-medium mb-2">Tamamlanmış Hali</h4>
                                    {afterImage ? (
                                        <Image src={afterImage.imageUrl} alt="Tadilat sonrası" width={400} height={500} className="rounded-lg object-cover" data-ai-hint={afterImage.imageHint} />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full aspect-square border-2 border-dashed rounded-lg text-center p-4">
                                            <p className="text-muted-foreground mb-2">İş tamamlandığında fotoğraf burada görünecek.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">İşlem ve Ücret</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-semibold">{job.item}</p>
                                <p className="text-3xl font-bold mt-2">{job.price}</p>
                                 <div className="flex flex-col gap-2 mt-4">
                                    {canCompleteJob ? (
                                        <Button asChild className="w-full">
                                            <Link href={`/tailor-dashboard/jobs/complete?jobId=${job.id}`}>
                                                <Hammer className="mr-2 h-4 w-4"/> İşi Tamamla
                                            </Link>
                                        </Button>
                                    ) : (
                                         <Button className="w-full" disabled>İşi Onayla</Button>
                                    )}
                                    <Button variant="destructive" className="w-full">İptal Et</Button>
                                 </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle className="text-lg">Müşteri Notları</CardTitle></CardHeader>
                            <CardContent><p className="text-sm text-muted-foreground">{job.notesFromCustomer}</p></CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle className="text-lg">Müşteriye Mesaj</CardTitle></CardHeader>
                            <CardContent className="space-y-2">
                                 <p className="text-sm text-muted-foreground">{job.notesToCustomer || "Müşteriye henüz bir not göndermediniz."}</p>
                                 <Button className="w-full"><Mail className="mr-2 h-4 w-4" />Mesaj Gönder</Button>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}

    