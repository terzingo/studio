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
import { User, Key, Mail, CircleCheck } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function ApplicationForm() {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    toast({
      title: 'Başvurunuz Alındı!',
      description: 'Gerekli incelemeler yapıldıktan sonra en kısa sürede size geri dönüş yapılacaktır.',
      duration: 5000,
    });
  };

  if (formSubmitted) {
     return (
        <Alert variant="default" className="border-green-500 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-200 h-full flex flex-col justify-center items-center text-center p-8">
            <CircleCheck className="h-16 w-16 !text-green-500 mb-4" />
            <AlertTitle className="text-2xl font-bold">Başvurunuz başarıyla alındı!</AlertTitle>
            <AlertDescription className="text-base mt-2">
              Ekibimiz başvurunuzu en kısa sürede inceleyip size geri dönüş yapacaktır. Anlayışınız için teşekkür ederiz.
            </AlertDescription>
          </Alert>
     )
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">İşletme Bilgileri</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="businessName">İşletme Adı</Label>
                <Input id="businessName" placeholder="Örn: Atölye Yılmaz" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="taxId">Vergi Numarası / T.C. Kimlik No</Label>
                <Input id="taxId" placeholder="11 haneli numara" required />
            </div>
            </div>
            <div className="space-y-2">
            <Label htmlFor="address">İşletme Adresi</Label>
            <Textarea id="address" placeholder="Açık adresinizi yazın" required />
            </div>
        </div>

        <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">Yasal Belgeler</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="taxCertificate">Vergi Levhası</Label>
                <Input id="taxCertificate" type="file" required className="pt-2"/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="businessLicense">İşyeri Açma ve Çalışma Ruhsatı</Label>
                <Input id="businessLicense" type="file" className="pt-2"/>
            </div>
            </div>
        </div>

        <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">Atölye Görselleri</h3>
            <div className="space-y-2">
            <Label htmlFor="shopImages">İşyerinizden Fotoğraflar (En az 3 adet)</Label>
            <Input id="shopImages" type="file" multiple required className="pt-2"/>
            <p className="text-sm text-muted-foreground">Atölyenizin dış cephesini, iç mekanını ve çalışma alanınızı gösteren fotoğraflar yükleyin.</p>
            </div>
        </div>

        <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">Banka Hesap Bilgileri</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="iban">IBAN</Label>
                <Input id="iban" placeholder="TR..." required />
                </div>
                <div className="space-y-2">
                <Label htmlFor="accountHolder">Hesap Sahibi Adı Soyadı</Label>
                <Input id="accountHolder" placeholder="Hesap sahibiyle aynı olmalıdır" required />
                </div>
            </div>
        </div>

        <div className="flex justify-end">
            <Button type="submit">
            <Mail className="mr-2 h-4 w-4"/>
            Başvuruyu Gönder
            </Button>
        </div>
    </form>
  );
}

function LoginForm() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/tailor-dashboard');
  };

  return (
      <form onSubmit={handleLogin}>
        <CardHeader className="space-y-1 px-0">
          <CardTitle className="text-2xl">Giriş Yap</CardTitle>
          <CardDescription>
            İşletmenizi yönetmek için panele giriş yapın.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-0">
          <div className="space-y-2">
            <Label htmlFor="username">Kullanıcı Adı</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="username" placeholder="ornek_terzi" defaultValue="ornek_terzi" required className="pl-10" />
              </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Şifre</Label>
            <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="password" type="password" required defaultValue="sifre123" className="pl-10" />
            </div>
          </div>
        </CardContent>
        <CardContent className="px-0">
            <Button className="w-full" type="submit">Giriş Yap</Button>
        </CardContent>
      </form>
  )
}


export default function TailorLoginPage() {

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="text-center mb-8">
          <Link href="/" aria-label="Anasayfa">
            <h1 className="text-4xl font-bold font-headline tracking-tight text-gray-900 dark:text-gray-100">
              Terzin<span className="text-primary">Go</span>
            </h1>
          </Link>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 font-headline">
            İş Ortağı Platformu
          </h2>
      </div>
      
      <Tabs defaultValue="login" className="w-full max-w-2xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Giriş Yap</TabsTrigger>
          <TabsTrigger value="register">İş Ortağı Ol</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardContent className="pt-6">
              <LoginForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-headline">Terzin<span className="text-primary">Go</span> İş Ortağı Olun</CardTitle>
                <CardDescription>İşletmenizi dijital dünyaya taşıyın, binlerce yeni müşteriye ulaşın!</CardDescription>
            </CardHeader>
            <CardContent>
                <ApplicationForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
