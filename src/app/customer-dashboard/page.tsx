'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Box, Edit, Settings, User } from "lucide-react"
import Link from "next/link"

const alterations = [
  { id: 'TAD001', item: 'Kot Pantolon', status: 'Terzide', date: '25.07.2024', tailor: 'Atölye Yılmaz' },
  { id: 'TAD002', item: 'Yazlık Elbise', status: 'Tamamlandı', date: '18.07.2024', tailor: 'Pratik Terzi Fatma' },
  { id: 'TAD003', item: 'Gömlek', status: 'Teslim Alındı', date: '12.07.2024', tailor: 'Gömlek Atölyesi' },
]

const orders = [
  { id: 'SIP001', item: 'Vintage Deri Ceket', price: '850 TL', date: '22.07.2024', tailor: 'Deri Atölyesi Özen' },
  { id: 'SIP002', item: 'Pamuklu Yazlık Elbise', price: '450 TL', date: '15.07.2024', tailor: 'Pratik Terzi Fatma' },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Terzide':
      return <Badge variant="secondary">Terzide</Badge>
    case 'Tamamlandı':
      return <Badge>Teslime Hazır</Badge>
    case 'Teslim Alındı':
      return <Badge variant="outline">Teslim Alındı</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function CustomerDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold font-headline">Müşteri Paneli</h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Ayşe K.</span>
                    <Avatar>
                        <AvatarImage src="https://picsum.photos/seed/customer/100/100" alt="Ayşe K." />
                        <AvatarFallback>AK</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Aktif Tadilat Takibi</CardTitle>
                <CardDescription>Mevcut tadilatlarınızın durumunu anlık olarak takip edin.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                    {alterations.filter(a => a.status === 'Terzide' || a.status === 'Tamamlandı').map(alt => (
                        <Link key={alt.id} href={`/customer-dashboard/alterations/${alt.id}`} className="block transition-transform hover:scale-[1.02]">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-4">
                                    <Box className="h-8 w-8 text-primary"/>
                                    <div>
                                        <p className="font-semibold">{alt.item} - {alt.tailor}</p>
                                        <p className="text-sm text-muted-foreground">Tadilat Kodu: {alt.id}</p>
                                    </div>
                                </div>
                                {getStatusBadge(alt.status)}
                            </div>
                        </Link>
                    ))}
                    {alterations.filter(a => a.status === 'Terzide' || a.status === 'Tamamlandı').length === 0 && (
                        <p className="text-muted-foreground text-center py-4">Şu anda aktif bir tadilatınız bulunmuyor.</p>
                    )}
                </div>
              </CardContent>
            </Card>

             <Tabs defaultValue="history">
                <TabsList className="mb-4">
                    <TabsTrigger value="history">Tadilat Geçmişi</TabsTrigger>
                    <TabsTrigger value="orders">Mağaza Siparişlerim</TabsTrigger>
                </TabsList>
                <TabsContent value="history">
                     <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tadilat Kodu</TableHead>
                                    <TableHead>Ürün</TableHead>
                                    <TableHead>Durum</TableHead>
                                    <TableHead>Terzi</TableHead>
                                    <TableHead className="text-right">Tarih</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {alterations.map(alt => (
                                     <TableRow key={alt.id} asChild>
                                        <Link href={`/customer-dashboard/alterations/${alt.id}`} className="cursor-pointer">
                                            <TableCell className="font-medium">
                                                <span className="hover:underline text-primary">
                                                    {alt.id}
                                                </span>
                                            </TableCell>
                                            <TableCell>{alt.item}</TableCell>
                                            <TableCell>{getStatusBadge(alt.status)}</TableCell>
                                            <TableCell>{alt.tailor}</TableCell>
                                            <TableCell className="text-right">{alt.date}</TableCell>
                                        </Link>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>
                <TabsContent value="orders">
                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Sipariş No</TableHead>
                                    <TableHead>Ürün</TableHead>
                                    <TableHead>Tutar</TableHead>
                                    <TableHead>Satıcı</TableHead>
                                    <TableHead className="text-right">Tarih</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map(order => (
                                     <TableRow key={order.id} asChild>
                                        <Link href={`/customer-dashboard/orders/${order.id}`} className="cursor-pointer">
                                            <TableCell className="font-medium">
                                                <span className="hover:underline text-primary">
                                                    {order.id}
                                                </span>
                                            </TableCell>
                                            <TableCell>{order.item}</TableCell>
                                            <TableCell>{order.price}</TableCell>
                                            <TableCell>{order.tailor}</TableCell>
                                            <TableCell className="text-right">{order.date}</TableCell>
                                        </Link>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
             <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Profilim</CardTitle>
                    <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4"/>
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                         <Avatar className="h-20 w-20">
                            <AvatarImage src="https://picsum.photos/seed/customer/100/100" alt="Ayşe K." />
                            <AvatarFallback>AK</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-lg font-semibold">Ayşe Kaya</p>
                            <p className="text-sm text-muted-foreground">ayse.kaya@ornek.com</p>
                        </div>
                    </div>
                    <Separator />
                     <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Vücut Ölçülerim</h4>
                        <div className="text-sm text-muted-foreground grid grid-cols-2 gap-2">
                           <p><strong>Omuz:</strong> 42 cm</p>
                           <p><strong>Göğüs:</strong> 95 cm</p>
                           <p><strong>Bel:</strong> 75 cm</p>
                           <p><strong>Kalça:</strong> 102 cm</p>
                           <p><strong>Bacak Boyu:</strong> 98 cm</p>
                        </div>
                        <Button variant="link" className="p-0 h-auto">Ölçüleri Güncelle</Button>
                    </div>
                     <Separator />
                     <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Hesap Ayarları</h4>
                        <div className="flex flex-col space-y-1">
                            <Button variant="ghost" className="justify-start">
                               <User className="mr-2 h-4 w-4" /> Profil Bilgileri
                            </Button>
                             <Button variant="ghost" className="justify-start">
                               <Settings className="mr-2 h-4 w-4" /> Şifre Değiştir
                            </Button>
                             <Button variant="destructive" className="justify-start">
                                Hesabı Kapat
                            </Button>
                        </div>
                    </div>

                </CardContent>
             </Card>
          </div>

        </div>
      </main>
    </div>
  )
}
