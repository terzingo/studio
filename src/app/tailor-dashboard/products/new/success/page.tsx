'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function NewProductSuccessPage() {
    return (
        <main className="grid flex-1 items-center justify-center gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Card className="w-full max-w-md">
                <CardContent className="flex flex-col items-center justify-center text-center p-8">
                    <CheckCircle className="h-20 w-20 text-green-500 mb-6" />
                    <h1 className="text-2xl font-bold mb-2">Ürün Başarıyla Eklendi!</h1>
                    <p className="text-muted-foreground mb-6">
                        "Vintage Deri Ceket" adlı ürününüz mağazanızda listelenmeye başladı.
                    </p>
                    <div className="flex w-full gap-2">
                         <Button variant="outline" className="w-full" asChild>
                            <Link href="/products/prod-1">
                                Ürünü Görüntüle
                            </Link>
                        </Button>
                        <Button className="w-full" asChild>
                            <Link href="/tailor-dashboard/products">
                                Ürünler Listesine Dön
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
