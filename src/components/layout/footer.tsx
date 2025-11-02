import Link from 'next/link';
import { Twitter, Instagram, Facebook } from 'lucide-react';

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="TerzinGo Anasayfa">
      <span className="text-xl font-bold font-headline text-foreground">
        Terzin<span className="text-primary">Go</span>
      </span>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground text-sm">
              E-ticarette iade oranlarını düşüren yenilikçi çözüm.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase font-headline">Keşfet</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/points" className="text-sm text-muted-foreground hover:text-primary">Terzin<span className="text-primary">Go</span> Noktaları</Link></li>
              <li><Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-primary">Nasıl Çalışır?</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">Hakkımızda</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase font-headline">İş Ortaklığı</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/how-it-works#for-ecommerce" className="text-sm text-muted-foreground hover:text-primary">E-Ticaret Çözümleri</Link></li>
              <li><Link href="/how-it-works#for-tailors" className="text-sm text-muted-foreground hover:text-primary">Terzin<span className="text-primary">Go</span> Noktası Ol</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase font-headline">Yasal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Gizlilik Politikası</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Kullanım Koşulları</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Terzin<span className="text-primary">Go</span>. Tüm hakları saklıdır.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

    