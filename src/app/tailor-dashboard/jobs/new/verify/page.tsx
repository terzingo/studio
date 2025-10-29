'use client';

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, CheckCircle, Package, User, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VerifyJobPage() {
    const router = useRouter();
    const product = PlaceHolderImages.find(p => p.id === 'product-13');

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid w-full max-w-4xl gap-4">
                 <div className="flex items-center gap-4">
                     <Button variant="outline" size="icon" asChild>
                        <Link href="/tailor-dashboard/jobs/new">
                            <ArrowRight className="h-4 w-4 scale-x-[-1]" />
                            <span className="sr-only">Geri</span>
                        </Link>
                    </Button>
                    <h1 className="text-xl sm:text-2xl font-semibold">Bilgileri Doğrula (2/4)</h1>
                </div>

                <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Kod Doğrulandı!</AlertTitle>
                    <AlertDescription>
                        Lütfen müşteri tarafından getirilen fiziksel ürün ile aşağıdaki bilgilerin eşleştiğini kontrol edin.
                    </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Package className="h-5 w-5 text-primary"/> Ürün Bilgileri</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             {product && <Image src={product.imageUrl} alt="Ürün" width={400} height={400} className="rounded-md object-cover w-full aspect-square" data-ai-hint={product.imageHint} />}
                            <div>
                                <p className="font-semibold">Özel Dikim Blazer</p>
                                <p className="text-sm text-muted-foreground">SKU: PROD-002</p>
                                <p className="text-sm text-muted-foreground">Renk: Lacivert | Beden: 48</p>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-primary"/> Müşteri Bilgileri</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-semibold">Ahmet Çelik</p>
                                <p className="text-sm text-muted-foreground">ahmet.celik@ornek.com</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary"/> Fatura/Sipariş Bilgileri</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm"><strong>Sipariş No:</strong> ECOM-2024-9876</p>
                                <p className="text-sm"><strong>Satın Alma Tarihi:</strong> 02.08.2024</p>
                                <p className="text-sm"><strong>Mağaza:</strong> Bilindik Marka</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                 <div className="flex justify-end">
                    <Button onClick={() => router.push('/tailor-dashboard/jobs/new/details')}>
                        Bilgiler Doğru, Devam Et <ArrowRight className="ml-2 h-4 w-4"/>
                    </Button>
                </div>
            </div>
        </main>
    )
}
