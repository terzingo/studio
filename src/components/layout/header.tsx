import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LogIn } from 'lucide-react';

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="TerzinGo Anasayfa">
      <Image src="/logo.png" alt="TerzinGo Logo" width={40} height={40} className="rounded-md" />
      <span className="text-xl font-bold font-headline text-foreground hidden sm:inline-block">
        Terzin<span className="text-primary">Go</span>
      </span>
    </Link>
  );
}

const navLinks = [
  { href: '/#how-it-works', label: 'Nasıl Çalışır?' },
  { href: '/points', label: 'TerzinGo Noktaları' },
  { href: '/about', label: 'Hakkımızda' },
  { href: '#for-business', label: 'İşletmeler İçin' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost">Müşteri Girişi</Button>
            <Button>
              <LogIn className="mr-2 h-4 w-4" />
              Terzi Girişi
            </Button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menüyü aç</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full">
                <div className="mb-8">
                  <Logo />
                </div>
                <nav className="flex flex-col space-y-4 text-lg">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col space-y-2">
                   <Button variant="ghost">Müşteri Girişi</Button>
                   <Button>Terzi Girişi</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
