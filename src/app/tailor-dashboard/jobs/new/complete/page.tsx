'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Camera, Check, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CompleteJobPage() {
    const router = useRouter();
    const [imageUploaded, setImageUploaded] = useState(false);
    const beforeImage = PlaceHolderImages.find(p => p.id === 'portfolio-2');
    const afterImage = PlaceHolderImages.find(p => p.id === 'product-13');

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
             <div className="mx-auto grid w-full max-w-4xl gap-4">
                <div className="flex items-center gap-4">
                     <Button variant="outline" size="icon" asChild>
                        <Link href="/tailor-dashboard/jobs/new/details">
                            <ArrowRight className="h-4 w-4 scale-x-[-1]" />
                            <span className="sr-only">Geri</span>
                        </Link>
                    </Button>
                    <h1 className="text-xl sm:text-2xl font-semibold">İşi Tamamla (4/4)</h1>
                </div>
                
                 <Card>
                    <CardHeader>
                        <CardTitle>Tadilat Sonrası Fotoğraf</CardTitle>
                        <CardDescription>Tadilatı tamamlanmış ürünün son halinin fotoğrafını yükleyin. Bu fotoğraf, işin tamamlandığına dair kanıt olarak müşteriye gönderilecektir.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {beforeImage && (
                                    <div>
                                        <h4 className="text-center font-medium mb-2 text-muted-foreground">Önce</h4>
                                        <Image src={beforeImage.imageUrl} alt="Tadilat öncesi" width={400} height={500} className="rounded-lg object-cover" data-ai-hint={beforeImage.imageHint} />
                                    </div>
                                )}
                                <div>
                                    <h4 className="text-center font-medium mb-2 text-muted-foreground">Sonra</h4>
                                    {imageUploaded && afterImage ? (
                                        <Image src={afterImage.imageUrl} alt="Tadilat sonrası" width={400} height={500} className="rounded-lg object-cover" data-ai-hint={afterImage.imageHint}/>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full aspect-[4/5] border-2 border-dashed rounded-lg text-center p-4">
                                            <p className="text-muted-foreground mb-2">Tamamlanmış ürünün fotoğrafını yükleyin.</p>
                                            <Button variant="outline" onClick={() => setImageUploaded(true)}>
                                                <Camera className="mr-2 h-4 w-4"/> Fotoğraf Yükle
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        <div className="flex justify-end gap-2 mt-4">
                             <Button variant="ghost" onClick={() => router.push('/tailor-dashboard/jobs')}>
                                Sonra Bitir
                            </Button>
                            <Button onClick={() => router.push('/tailor-dashboard/jobs/new/success')} size="lg" disabled={!imageUploaded}>
                                <Check className="mr-2 h-4 w-4" /> İşi Tamamla ve Müşteriye Gönder
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
