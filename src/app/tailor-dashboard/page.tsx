'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LayoutDashboard, Briefcase, DollarSign, ExternalLink, FileText, Banknote, MoreHorizontal, Package, PackageCheck, Percent, Search, Mail, Settings, Truck, Upload, Users, CircleCheck } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useRouter } from "next/navigation"

const recentJobs = [
  { id: 'TAD004', customer: 'Ahmet Ç.', item: 'Takım Elbise Paça', status: 'Beklemede', date: '2 saat önce' },
  { id: 'TAD005', customer: 'Zeynep S.', item: 'Abiye Daraltma', status: 'İşleme Alındı', date: 'Dün' },
  { id: 'TAD006', customer: 'Murat V.', item: 'Gömlek Kol Boyu', status: 'Tamamlandı', date: '01.08.2024' },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Beklemede': return <Badge variant="secondary">Beklemede</Badge>
    case 'İşleme Alındı': return <Badge>İşleme Alındı</Badge>
    case 'Tamamlandı': return <Badge className="bg-green-500 hover:bg-green-600">Tamamlandı</Badge>
    default: return <Badge variant="outline">{status}</Badge>
  }
}

const chartData = [
  { month: "Nisan", total: Math.floor(Math.random() * 5000) + 2000 },
  { month: "Mayıs", total: Math.floor(Math.random() * 5000) + 2000 },
  { month: "Haziran", total: Math.floor(Math.random() * 5000) + 2000 },
  { month: "Temmuz", total: Math.floor(Math.random() * 5000) + 4000 },
  { month: "Ağustos", total: Math.floor(Math.random() * 5000) + 3000 },
  { month: "Eylül", total: Math.floor(Math.random() * 5000) + 1000 },
]

export default function TailorDashboardPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
        <div className="border-b p-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
                <span className="font-headline text-lg">Terzin<span className="text-primary">Go</span></span>
            </Link>
        </div>
        <nav className="flex flex-col gap-1 p-2">
            <Button variant="ghost" className="justify-start gap-2 text-base font-normal bg-muted" asChild>
                <Link href="/tailor-dashboard">
                    <LayoutDashboard className="h-5 w-5"/>
                    <span>Panel</span>
                </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2 text-base font-normal" asChild>
                <Link href="/tailor-dashboard/jobs">
                    <Briefcase className="h-5 w-5"/>
                    <span>İşler</span>
                </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2 text-base font-normal" asChild>
                <Link href="/tailor-dashboard/products">
                    <Package className="h-5 w-5"/>
                    <span>Ürünler</span>
                </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2 text-base font-normal" asChild>
                <Link href="/tailor-dashboard/customers">
                    <Users className="h-5 w-5"/>
                    <span>Müşteriler</span>
                </Link>
            </Button>
             <Button variant="ghost" className="justify-start gap-2 text-base font-normal" asChild>
                <Link href="/tailor-dashboard/earnings">
                    <DollarSign className="h-5 w-5"/>
                    <span>Kazançlar</span>
                </Link>
            </Button>
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
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                    <Card className="hover:bg-muted/50 transition-colors">
                        <Link href="/tailor-dashboard/earnings">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Toplam Kazanç</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">15,231.89 TL</div>
                                <p className="text-xs text-muted-foreground">Geçen aydan +%20.1</p>
                            </CardContent>
                        </Link>
                    </Card>
                     <Card className="hover:bg-muted/50 transition-colors">
                         <Link href="/tailor-dashboard/jobs">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Bekleyen İşler</CardTitle>
                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+12</div>
                                <p className="text-xs text-muted-foreground">Yeni tadilat talebi</p>
                            </CardContent>
                        </Link>
                    </Card>
                    <Card className="hover:bg-muted/50 transition-colors">
                        <Link href="/tailor-dashboard/jobs">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Tamamlanan İşler (Ay)</CardTitle>
                                <PackageCheck className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">238</div>
                                <p className="text-xs text-muted-foreground">Toplamda 1543 iş tamamlandı</p>
                            </CardContent>
                        </Link>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">TerzinGo Komisyonu</CardTitle>
                            <Percent className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">%12</div>
                            <p className="text-xs text-muted-foreground">Premium ile %8'e düşür</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <Card className="md:col-span-2">
                        <CardHeader className="flex items-center justify-between">
                            <CardTitle>Aylık Kazanç Grafiği</CardTitle>
                             <Button variant="link" asChild>
                                <Link href="/tailor-dashboard/earnings">Tümünü Gör <ExternalLink className="h-4 w-4 ml-2"/></Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <ResponsiveContainer width="100%" height={350}>
                                <RechartsBarChart data={chartData}>
                                    <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value} TL`} />
                                    <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex items-center justify-between">
                            <CardTitle>Son İşlemler</CardTitle>
                             <Button variant="link" asChild>
                                <Link href="/tailor-dashboard/jobs">Tümünü Gör <ExternalLink className="h-4 w-4 ml-2"/></Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Müşteri</TableHead>
                                        <TableHead>Ürün</TableHead>
                                        <TableHead>Durum</TableHead>
                                        <TableHead className="text-right">Tarih</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentJobs.map(job => (
                                        <TableRow key={job.id} onClick={() => router.push(`/tailor-dashboard/jobs/${job.id}`)} className="cursor-pointer">
                                            <TableCell>
                                                <div className="font-medium">{job.customer}</div>
                                                <div className="text-xs text-muted-foreground">{job.id}</div>
                                            </TableCell>
                                            <TableCell>{job.item}</TableCell>
                                            <TableCell>{getStatusBadge(job.status)}</TableCell>
                                            <TableCell className="text-right">{job.date}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
      </div>
    </div>
  )
}
