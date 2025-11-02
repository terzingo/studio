'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const products = [
    {id: "PROD-001", name: "Vintage Deri Ceket", stock: 1, price: 850, category: "İkinci El", imageId: "product-1"},
    {id: "PROD-002", name: "Özel Dikim Blazer", stock: 3, price: 1300, category: "Özel Tasarım", imageId: "product-13"},
    {id: "PROD-003", name: "Pamuklu Yazlık Elbise", stock: 0, price: 450, category: "İkinci El", imageId: "product-3"},
    {id: "PROD-004", name: "İtalyan Kesim Gömlek", stock: 10, price: 1800, category: "Özel Tasarım", imageId: "product-4"},
];

export default function TailorProductsPage() {
    const router = useRouter();

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Card>
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                         <CardTitle className="text-2xl font-bold">Ürünler</CardTitle>
                         <CardDescription>Mağazanızdaki ikinci el ve özel tasarım ürünleri yönetin.</CardDescription>
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
                                <DropdownMenuLabel>Kategoriye Göre</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>İkinci El</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Özel Tasarım</DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button asChild size="sm" variant="outline" className="h-7 gap-1">
                           <Link href="/tailor-dashboard/products">
                             <File className="h-3.5 w-3.5" />
                             <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Dışa Aktar</span>
                           </Link>
                        </Button>
                        <Button asChild size="sm" className="h-7 gap-1">
                            <Link href="/tailor-dashboard/products/new">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Yeni Ürün Ekle</span>
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell"><span className="sr-only">Resim</span></TableHead>
                                <TableHead>Ad</TableHead>
                                <TableHead>Stok</TableHead>
                                <TableHead>Fiyat</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead><span className="sr-only">Eylemler</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map(product => {
                                const image = PlaceHolderImages.find(img => img.id === product.imageId);
                                const productUrl = `/products/${product.id.replace('PROD', 'prod')}`;
                                return (
                                    <TableRow key={product.id}>
                                        <TableCell className="hidden sm:table-cell">
                                            <Link href={productUrl} className="block w-full h-full">
                                                {image && <Image src={image.imageUrl} alt={product.name} width={64} height={64} className="aspect-square rounded-md object-cover" data-ai-hint={image.imageHint} />}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <Link href={productUrl} className="block w-full h-full hover:underline">
                                                {product.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={productUrl} className="block w-full h-full">
                                            {product.stock > 0 
                                                ? <Badge variant="outline">{product.stock} Adet</Badge>
                                                : <Badge variant="destructive">Tükendi</Badge>
                                            }
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={productUrl} className="block w-full h-full">
                                                {product.price} TL
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={productUrl} className="block w-full h-full">
                                            <Badge variant={product.category === 'İkinci El' ? 'secondary' : 'default'}>{product.category}</Badge>
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
                                                    <DropdownMenuItem>Düzenle</DropdownMenuItem>
                                                    <DropdownMenuItem>Kopyala</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600">Sil</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </main>
    )
}
