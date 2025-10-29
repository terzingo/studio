'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, QrCode } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewJobPage() {
    const router = useRouter();
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleNext = () => {
        if (code.trim().toUpperCase() === 'TZN12345') {
            router.push('/tailor-dashboard/jobs/new/verify');
        } else {
            setError('Geçersiz veya bulunamayan kod. Lütfen tekrar deneyin.');
        }
    };

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid w-full max-w-2xl gap-4">
                <div className="flex items-center gap-4">
                     <Button variant="outline" size="icon" asChild>
                        <Link href="/tailor-dashboard/jobs">
                            <ArrowRight className="h-4 w-4 scale-x-[-1]" />
                            <span className="sr-only">Geri</span>
                        </Link>
                    </Button>
                    <h1 className="text-xl sm:text-2xl font-semibold">Yeni Tadilat İşi Ekle (1/4)</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Müşteri Tadilat Kodu</CardTitle>
                        <CardDescription>
                            Müşterinin e-ticaret sitesinden aldığı veya mobil uygulamasında görünen TerzinGo tadilat kodunu girin.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="alteration-code">Tadilat Kodu</Label>
                            <div className="flex gap-2">
                                <Input 
                                    id="alteration-code" 
                                    placeholder="Örn: TZN12345" 
                                    value={code}
                                    onChange={(e) => {
                                        setCode(e.target.value)
                                        setError('')
                                    }}
                                    className="text-lg h-12"
                                />
                                <Button variant="outline" size="icon" className="h-12 w-12">
                                    <QrCode className="h-6 w-6"/>
                                </Button>
                            </div>
                            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={handleNext} disabled={!code}>
                                Devam Et <ArrowRight className="ml-2 h-4 w-4"/>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
