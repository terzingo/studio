'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { LayoutDashboard, Briefcase, DollarSign, Package, Search, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function TailorLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const pathname = usePathname();
    
    const navItems = [
        { href: '/tailor-dashboard', label: 'Panel', icon: LayoutDashboard },
        { href: '/tailor-dashboard/jobs', label: 'İşler', icon: Briefcase },
        { href: '/tailor-dashboard/products', label: 'Ürünler', icon: Package },
        { href: '/tailor-dashboard/customers', label: 'Müşteriler', icon: Users },
        { href: '/tailor-dashboard/earnings', label: 'Kazançlar', icon: DollarSign },
    ];

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
        <div className="border-b p-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
                <span className="font-headline text-lg">Terzin<span className="text-primary">Go</span></span>
            </Link>
        </div>
        <nav className="flex flex-col gap-1 p-2">
            {navItems.map(item => (
                 <Button 
                    key={item.href}
                    variant={pathname === item.href ? "secondary" : "ghost"} 
                    className="justify-start gap-2 text-base font-normal" 
                    asChild
                 >
                    <Link href={item.href}>
                        <item.icon className="h-5 w-5"/>
                        <span>{item.label}</span>
                    </Link>
                </Button>
            ))}
        </nav>
        <div className="mt-auto p-4">
            <Card>
                <CardHeader className="p-2 pt-0 md:p-4">
                    <CardTitle>Terfi Edin!</CardTitle>
                    <CardDescription>
                        Premium'a geçerek daha fazla müşteriye ulaşın ve komisyon oranını düşürün.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                    <Button size="sm" className="w-full">Yükselt</Button>
                </CardContent>
            </Card>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
           <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="İş veya müşteri ara..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/tailor/100/100" alt="Atölye Yılmaz"/>
                    <AvatarFallback>AY</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Atölye Yılmaz</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Ayarlar</DropdownMenuItem>
              <DropdownMenuItem>Destek</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Çıkış Yap</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {children}
      </div>
    </div>
  )
}
