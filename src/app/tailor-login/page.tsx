'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Key } from 'lucide-react';
import Link from 'next/link';

export default function TailorLoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // No validation, just redirect to the dashboard
    router.push('/tailor-dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
            <Link href="/" aria-label="Anasayfa">
              <h1 className="text-4xl font-bold font-headline tracking-tight text-gray-900 dark:text-gray-100">
                Terzin<span className="text-primary">Go</span>
              </h1>
            </Link>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 font-headline">
            Terzi İş Ortağı Paneli
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            İşletmenizi yönetmek için giriş yapın.
          </p>
        </div>
        <Card>
          <form onSubmit={handleLogin}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Giriş Yap</CardTitle>
              <CardDescription>
                Örnek panele erişmek için aşağıdaki bilgileri kullanın.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" type="submit">
                Giriş Yap
              </Button>
               <p className="text-xs text-center text-muted-foreground">
                Henüz Terzin<span className="text-primary">Go</span> noktası değil misiniz? <Link href="/for-business" className="underline hover:text-primary">Hemen başvurun</Link>.
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
