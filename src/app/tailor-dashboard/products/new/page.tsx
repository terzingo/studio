'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRight, Package, Save } from 'lucide-react';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/tailor-dashboard/products/new/success');
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <form
        onSubmit={handleSubmit}
        className="mx-auto grid w-full max-w-4xl flex-1 auto-rows-max gap-4"
      >
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link href="/tailor-dashboard/products">
              <ArrowRight className="h-4 w-4 scale-x-[-1]" />
              <span className="sr-only">Geri</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Yeni Ürün Ekle
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm" asChild>
                <Link href="/tailor-dashboard/products">Vazgeç</Link>
            </Button>
            <Button size="sm" type="submit"><Save className="mr-2 h-4 w-4" /> Ürünü Kaydet</Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Ürün Detayları</CardTitle>
                <CardDescription>
                  Ürününüzün adı, açıklaması ve diğer önemli bilgilerini girin.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Ürün Adı</Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      defaultValue="Vintage Deri Ceket"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Açıklama</Label>
                    <Textarea
                      id="description"
                      defaultValue="1980'lerden kalma, mükemmel kondisyonda, zamansız bir parça. Hakiki deriden üretilmiştir."
                      className="min-h-32"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Detaylı Ölçüler</CardTitle>
                     <CardDescription>
                        *Ölçüler, ürün düz bir zemine serilerek alınmalıdır.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="shoulder">Omuz (cm)</Label>
                            <Input id="shoulder" type="text" defaultValue="48 cm"/>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="bust">Göğüs (cm)</Label>
                            <Input id="bust" type="text" defaultValue="112 cm"/>
                        </div>
                         <div className="grid gap-3">
                            <Label htmlFor="sleeve">Kol Boyu (cm)</Label>
                            <Input id="sleeve" type="text" defaultValue="65 cm"/>
                        </div>
                         <div className="grid gap-3">
                            <Label htmlFor="waist">Bel (cm)</Label>
                            <Input id="waist" type="text" defaultValue="" placeholder="Opsiyonel"/>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="hip">Kalça (cm)</Label>
                            <Input id="hip" type="text" defaultValue="" placeholder="Opsiyonel"/>
                        </div>
                         <div className="grid gap-3">
                            <Label htmlFor="length">Boy (cm)</Label>
                            <Input id="length" type="text" defaultValue="70 cm"/>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Ürün Durumu ve Kategorisi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="condition">Durum</Label>
                    <Select>
                      <SelectTrigger id="condition" aria-label="Durum Seç">
                        <SelectValue placeholder="Durum Seç" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new-like">Yeni gibi</SelectItem>
                        <SelectItem value="lightly-used">Az kullanılmış</SelectItem>
                        <SelectItem value="good-condition">İyi durumda</SelectItem>
                        <SelectItem value="altered">Tadilat görmüş</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="category">Kategori</Label>
                    <Select>
                      <SelectTrigger id="category" aria-label="Kategori Seç">
                        <SelectValue placeholder="Kategori Seç" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="second-hand">İkinci El</SelectItem>
                        <SelectItem value="custom-design">Özel Tasarım</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Diğer Özellikler</CardTitle>
                </CardHeader>
                 <CardContent>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="brand">Marka</Label>
                            <Input id="brand" placeholder="Bilinmiyorsa 'Vintage' yazın" defaultValue="Vintage"/>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="fabric">Kumaş Türü</Label>
                            <Input id="fabric" placeholder="Örn: Hakiki Deri" defaultValue="Hakiki Deri"/>
                        </div>
                    </div>
                 </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Fiyatlandırma</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="grid gap-3">
                    <Label htmlFor="price">Fiyat (TL)</Label>
                    <Input id="price" type="number" placeholder="0.00" defaultValue="850"/>
                </div>
              </CardContent>
            </Card>
             <Card x-chunk="dashboard-07-chunk-5">
              <CardHeader>
                <CardTitle>Ürün Görseli</CardTitle>
                <CardDescription>
                  Ürününüz için bir ana görsel yükleyin.
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <Input id="picture" type="file" />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm" asChild>
            <Link href="/tailor-dashboard/products">Vazgeç</Link>
          </Button>
          <Button size="sm" type="submit"><Save className="mr-2 h-4 w-4" /> Ürünü Kaydet</Button>
        </div>
      </form>
    </main>
  );
}
