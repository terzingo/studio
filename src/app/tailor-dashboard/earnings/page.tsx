'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, CreditCard, DollarSign, File } from "lucide-react";
import Link from "next/link";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

const earningsData = [
    { name: 'Nisan', 'Brüt': 4200, 'Net': 3696, 'Komisyon': 504 },
    { name: 'Mayıs', 'Brüt': 5100, 'Net': 4488, 'Komisyon': 612 },
    { name: 'Haziran', 'Brüt': 6800, 'Net': 5984, 'Komisyon': 816 },
    { name: 'Temmuz', 'Brüt': 8900, 'Net': 7832, 'Komisyon': 1068 },
    { name: 'Ağustos', 'Brüt': 7200, 'Net': 6336, 'Komisyon': 864 },
];

const payouts = [
    { id: 'PAYOUT001', date: '05.08.2024', amount: '6336.00 TL', status: 'Tamamlandı' },
    { id: 'PAYOUT002', date: '05.07.2024', amount: '7832.00 TL', status: 'Tamamlandı' },
    { id: 'PAYOUT003', date: '05.06.2024', amount: '5984.00 TL', status: 'Tamamlandı' },
]

export default function TailorEarningsPage() {
    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Toplam Net Kazanç</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">28,336.00 TL</div>
                        <p className="text-xs text-muted-foreground">Tüm zamanların toplam net geliri</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Bu Ayki Kazanç (Net)</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+6,336.00 TL</div>
                        <p className="text-xs text-muted-foreground">Geçen aydan +%15.2</p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <Card className="xl:col-span-2">
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Kazanç Özeti</CardTitle>
                            <CardDescription>Aylık brüt, net kazanç ve komisyon dökümü.</CardDescription>
                        </div>
                        <Button asChild size="sm" className="ml-auto gap-1">
                            <Link href="/tailor-dashboard/earnings">Rapor <ArrowUpRight className="h-4 w-4" /></Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                            <LineChart data={earningsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Brüt" stroke="hsl(var(--primary))" strokeWidth={2} />
                                <Line type="monotone" dataKey="Net" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                                <Line type="monotone" dataKey="Komisyon" stroke="hsl(var(--destructive))" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Ödeme Geçmişi</CardTitle>
                        <CardDescription>Banka hesabınıza yapılan ödemeler.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tarih</TableHead>
                                    <TableHead>Tutar</TableHead>
                                    <TableHead>Durum</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payouts.map(payout => (
                                    <TableRow key={payout.id}>
                                        <TableCell>{payout.date}</TableCell>
                                        <TableCell>{payout.amount}</TableCell>
                                        <TableCell>
                                            <Badge className="bg-green-500 hover:bg-green-600">{payout.status}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         <Button asChild size="sm" variant="outline" className="mt-4 w-full">
                           <Link href="/tailor-dashboard/earnings">
                             <File className="h-3.5 w-3.5 mr-2" />
                             Tümünü Dışa Aktar
                           </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
