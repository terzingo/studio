'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Briefcase, DollarSign, File, ListFilter, MoreHorizontal, Package, Search, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const customers = [
    {
        id: 'CUST001',
        name: 'Ayşe Kaya',
        avatar: 'https://picsum.photos/seed/customer/100/100',
        email: 'ayse.kaya@ornek.com',
        totalJobs: 5,
        totalSpent: '1250 TL',
        since: '15.05.2024'
    },
    {
        id: 'CUST002',
        name: 'Ahmet Çelik',
        avatar: 'https://picsum.photos/seed/customer2/100/100',
        email: 'ahmet.celik@ornek.com',
        totalJobs: 2,
        totalSpent: '300 TL',
        since: '22.06.2024'
    },
    {
        id: 'CUST003',
        name: 'Zeynep Sancak',
        avatar: 'https://picsum.photos/seed/customer3/100/100',
        email: 'zeynep.sancak@ornek.com',
        totalJobs: 8,
        totalSpent: '2100 TL',
        since: '10.01.2024'
    },
];

export default function TailorCustomersPage() {
    const router = useRouter();

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Card>
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                         <CardTitle className="text-2xl font-bold">Müşteriler</CardTitle>
                         <CardDescription>Müşteri listenizi ve işlem geçmişlerini görüntüleyin.</CardDescription>
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
                                <DropdownMenuItem>En Yeni</DropdownMenuItem>
                                <DropdownMenuItem>En Çok İşlem</DropdownMenuItem>
                                <DropdownMenuItem>En Yüksek Harcama</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button asChild size="sm" variant="outline" className="h-7 gap-1">
                           <Link href="/tailor-dashboard/customers">
                             <File className="h-3.5 w-3.5" />
                             <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Dışa Aktar</span>
                           </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Müşteri</TableHead>
                                <TableHead>Toplam İş</TableHead>
                                <TableHead>Toplam Harcama</TableHead>
                                <TableHead>Müşteri Tarihi</TableHead>
                                <TableHead><span className="sr-only">Eylemler</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map(customer => (
                                <TableRow key={customer.id}>
                                    <TableCell>
                                        <Link href={`/tailor-dashboard/customers`} className="block w-full h-full">
                                            <div className="flex items-center gap-4">
                                                <Avatar className="hidden h-9 w-9 sm:flex">
                                                    <AvatarImage src={customer.avatar} alt={customer.name} />
                                                    <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="grid gap-1">
                                                    <p className="text-sm font-medium leading-none">{customer.name}</p>
                                                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/tailor-dashboard/customers`} className="block w-full h-full">
                                            {customer.totalJobs}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/tailor-dashboard/customers`} className="block w-full h-full">
                                            {customer.totalSpent}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/tailor-dashboard/customers`} className="block w-full h-full">
                                            {customer.since}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Menüyü aç</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Detayları Gör</DropdownMenuItem>
                                                <DropdownMenuItem>Mesaj Gönder</DropdownMenuItem>
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
