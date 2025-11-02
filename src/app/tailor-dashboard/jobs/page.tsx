'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const allJobs = [
    { id: 'TAD004', customer: 'Ahmet Çelik', item: 'Takım Elbise Paça', status: 'Beklemede', date: '04.08.2024' },
    { id: 'TAD005', customer: 'Zeynep Sancak', item: 'Abiye Daraltma', status: 'İşleme Alındı', date: '03.08.2024' },
    { id: 'TAD006', customer: 'Murat Varlı', item: 'Gömlek Kol Boyu', status: 'Tamamlandı', date: '01.08.2024' },
    { id: 'TAD001', customer: 'Ayşe Kaya', item: 'Kot Pantolon', status: 'Teslim Edildi', date: '25.07.2024' },
    { id: 'TAD002', customer: 'Can Yılmaz', item: 'Yazlık Elbise', status: 'Teslim Edildi', date: '18.07.2024' },
    { id: 'TAD003', customer: 'Selin Doğan', item: 'Gömlek', status: 'İptal Edildi', date: '12.07.2024' },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Beklemede': return <Badge variant="secondary">Beklemede</Badge>
    case 'İşleme Alındı': return <Badge>İşleme Alındı</Badge>
    case 'Tamamlandı': return <Badge className="bg-yellow-500">Müşteri Bekleniyor</Badge>
    case 'Teslim Edildi': return <Badge className="bg-green-500">Teslim Edildi</Badge>
    case 'İptal Edildi': return <Badge variant="destructive">İptal Edildi</Badge>
    default: return <Badge variant="outline">{status}</Badge>
  }
}

export default function TailorJobsPage() {
    const router = useRouter();

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
             <Card>
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle className="text-2xl font-bold">İşler</CardTitle>
                        <CardDescription>Atölyenize gelen tüm tadilat işlerini yönetin.</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-7 gap-1">
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filtrele</span>
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Duruma Göre</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Beklemede</DropdownMenuItem>
                                <DropdownMenuItem>İşleme Alındı</DropdownMenuItem>
                                <DropdownMenuItem>Tamamlandı</DropdownMenuItem>
                                 <DropdownMenuItem>Teslim Edildi</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                         <Button asChild size="sm" variant="outline" className="h-7 gap-1">
                            <Link href="/tailor-dashboard/jobs">
                                <File className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Dışa Aktar</span>
                            </Link>
                        </Button>
                        <Button asChild size="sm" className="h-7 gap-1">
                            <Link href="/tailor-dashboard/jobs/new">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Yeni İş Ekle</span>
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>İş Kodu</TableHead>
                                <TableHead>Müşteri</TableHead>
                                <TableHead>Ürün</TableHead>
                                <TableHead>Durum</TableHead>
                                <TableHead>Tarih</TableHead>
                                <TableHead><span className="sr-only">Eylemler</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allJobs.map(job => (
                                <TableRow key={job.id}>
                                    <TableCell className="font-medium">
                                        <Link href={`/tailor-dashboard/jobs/${job.id}`} className="hover:underline text-primary">
                                            {job.id}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{job.customer}</TableCell>
                                    <TableCell>{job.item}</TableCell>
                                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                                    <TableCell>{job.date}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Menüyü aç</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => router.push(`/tailor-dashboard/jobs/${job.id}`)}>Detayları Gör</DropdownMenuItem>
                                                <DropdownMenuItem>Durumu Güncelle</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">İşi İptal Et</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
             </Card>
        </main>
    )
}
