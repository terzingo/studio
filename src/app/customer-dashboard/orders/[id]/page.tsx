
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CreditCard, Home, Package, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";


// Mock data - in a real app this would come from a database
const mockOrderDetails = {
    'SIP001': {
        id: 'SIP001',
        item: 'Vintage Deri Ceket',
        price: '850 TL',
        date: '22.07.2024',
        tailor: 'Deri Atölyesi Özen',
        tailorId: 'mustafa-ozen',
        productImageId: 'product-1',
        status: 'Teslim Edildi',
        shippingAddress: 'Örnek Mah. Test Sk. No:12 D:5, Kadıköy/İstanbul',
        paymentMethod: '**** **** **** 1234'
    },
    'SIP002': {
        id: 'SIP002',
        item: 'Pamuklu Yazlık Elbise',
        price: '450 TL',
        date: '15.07.2024',
        tailor: 'Pratik Terzi Fatma',
        tailorId: 'fatma-demir',
        productImageId: 'product-3',
        status: 'Teslim Edildi',
        shippingAddress: 'Örnek Mah. Test Sk. No:12 D:5, Kadıköy/İstanbul',
        paymentMethod: '**** **** **** 5678'
    }
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
    const order = mockOrderDetails[params.id as keyof typeof mockOrderDetails];

    if (!order) {
        notFound();
    }

    const productImage = PlaceHolderImages.find(img => img.id === order.productImageId);

    return (
        <div className="container mx-auto max-w-5xl px-4 py-8">
            <Button variant="ghost" asChild className="mb-4">
                <Link href="/customer-dashboard"> &larr; Panele Geri Dön</Link>
            </Button>
            <Card>
                <CardHeader>
                     <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-3xl font-headline">Sipariş Detayı: #{order.id}</CardTitle>
                            <CardDescription>
                                Sipariş Tarihi: {order.date}
                            </CardDescription>
                        </div>
                        <Badge variant="outline">{order.status}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-4">
                                {productImage && (
                                    <Image src={productImage.imageUrl} alt={order.item} width={80} height={80} className="rounded-lg object-cover" data-ai-hint={productImage.imageHint} />
                                )}
                                <div>
                                    <h3 className="font-semibold text-lg">{order.item}</h3>
                                    <p className="text-muted-foreground text-sm">Satıcı: 
                                        <Link href={`/points/${order.tailorId}`} className="text-primary hover:underline ml-1">{order.tailor}</Link>
                                    </p>
                                    <p className="font-bold text-lg mt-1">{order.price}</p>
                                </div>
                            </CardHeader>
                            <CardContent className="flex justify-end gap-2">
                                <Button variant="outline">
                                    <Star className="mr-2 h-4 w-4" /> Satıcıyı Değerlendir
                                </Button>
                                <Button>
                                    <Package className="mr-2 h-4 w-4" /> Tekrar Satın Al
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="md:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2"><Home className="h-5 w-5"/> Teslimat Adresi</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Ayşe Kaya</p>
                                <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>
                            </CardContent>
                        </Card>
                        <Card>
                             <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2"><CreditCard className="h-5 w-5"/> Ödeme Bilgileri</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Kredi Kartı</p>
                                <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                            </CardContent>
                        </Card>
                         <Card>
                             <CardHeader>
                                <CardTitle className="text-lg">Sipariş Özeti</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Ara Toplam</span>
                                    <span>{order.price}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Kargo</span>
                                    <span>Ücretsiz</span>
                                </div>
                                <Separator className="my-2"/>
                                <div className="flex justify-between font-bold text-base">
                                    <span>Toplam</span>
                                    <span>{order.price}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
