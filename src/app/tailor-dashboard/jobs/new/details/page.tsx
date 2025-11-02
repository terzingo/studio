'use client';

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Camera, CheckCircle, CircleDot, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function JobDetailsPage() {
    const router = useRouter();
    const [imageTaken, setImageTaken] = useState(false);
    const beforeImage = PlaceHolderImages.find(p => p.id === 'product-13');

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
             <div className="mx-auto grid w-full max-w-4xl gap-4">
                <div className="flex items-center gap-4">
                     <Button variant="outline" size="icon" asChild>
                        <Link href="/tailor-dashboard/jobs/new/verify">
                            <ArrowRight className="h-4 w-4 scale-x-[-1]" />
                            <span className="sr-only">Geri</span>
                        </Link>
                    </Button>
                    <h1 className="text-xl sm:text-2xl font-semibold">Tadilat Detayları (3/4)</h1>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tadilat Öncesi Fotoğraf</CardTitle>
                            <CardDescription>Ürünün mevcut halini müşteriye göstermek için fotoğrafını çekin.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="w-full aspect-square border-2 border-dashed rounded-md flex items-center justify-center relative overflow-hidden">
                                {imageTaken && beforeImage ? (
                                    <Image src={beforeImage.imageUrl} alt="Tadilat Öncesi" fill className="object-cover" data-ai-hint={beforeImage.imageHint} />
                                ) : (
                                    <p className="text-muted-foreground">Henüz fotoğraf çekilmedi</p>
                                )}
                            </div>
                             <Button className="w-full" onClick={() => setImageTaken(true)}>
                                <Camera className="mr-2 h-4 w-4"/> 
                                {imageTaken ? "Tekrar Çek" : "Fotoğraf Çek"}
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Müşteri Talepleri</CardTitle>
                            <CardDescription>Müşterinin üründe yapılmasını istediği değişiklikleri detaylı olarak yazın.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="notes">Tadilat Notları</Label>
                                <Textarea id="notes" placeholder="Örn: Paça boyu 3cm kısaltılacak, belden 2cm daraltılacak..." rows={6}/>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="price">Tadilat Ücreti</Label>
                                <Input id="price" placeholder="Ücret (Eğer TerzinGo kapsamındaysa 'Ücretsiz')" defaultValue="Ücretsiz (TerzinGo)"/>
                            </div>
                            
                            <Alert>
                                <CircleDot className="h-4 w-4" />
                                <AlertTitle>Önemli Hatırlatma</AlertTitle>
                                <AlertDescription>
                                   Girilen bilgiler ve fotoğraf, onay için müşteriye SMS/e-posta ile gönderilecektir. Tadilata başlamak için müşteri onayı gereklidir.
                                </AlertDescription>
                            </Alert>

                            <Button className="w-full" onClick={() => router.push('/tailor-dashboard/jobs/new/approval-sent')} size="lg" disabled={!imageTaken}>
                                Müşteri Onayına Gönder <Send className="ml-2 h-4 w-4"/>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
}
