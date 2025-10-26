import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Scissors } from 'lucide-react';

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="TerzinGo Anasayfa">
      <div className="bg-primary text-primary-foreground p-2 rounded-md">
        <Scissors className="h-6 w-6" />
      </div>
      <span className="text-xl font-bold font-headline text-foreground hidden sm:inline-block">
        TerzinGo
      </span>
    </Link>
  );
}

const navLinks = [
  { href: '/tailors', label: 'Terzi Bul' },
  { href: '/#how-it-works', label: 'Nasıl Çalışır?' },
  { href: '/#services', label: 'Hizmetler' },
  { href: '/#about', label: 'Hakkımızda' },
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
            <Button variant="ghost">Giriş Yap</Button>
            <Button>Kayıt Ol</Button>
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
                   <Button variant="ghost">Giriş Yap</Button>
                   <Button>Kayıt Ol</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
