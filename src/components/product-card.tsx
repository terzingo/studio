import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product, Tailor } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getTailorById } from '@/lib/data';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = PlaceHolderImages.find(img => img.id === product.imageId);
  const tailor = getTailorById(product.tailorId);

  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-xl duration-300 group">
      <CardContent className="p-0">
        <Link href="#">
            <div className="relative h-64 w-full">
                {image && (
                    <Image
                        src={image.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={image.imageHint}
                    />
                )}
                <Badge className="absolute top-2 right-2" variant={product.category === 'İkinci El' ? 'secondary' : 'default'}>{product.category}</Badge>
            </div>
        </Link>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <h3 className="font-headline font-bold text-lg">
            <Link href="#" className="hover:text-primary transition-colors">
                {product.name}
            </Link>
        </h3>
        {tailor && (
            <p className="text-sm text-muted-foreground mt-1">
                Satıcı: <Link href={`/points/${tailor.id}`} className="hover:underline">{tailor.name}</Link>
            </p>
        )}
        <p className="font-semibold text-lg mt-2 text-primary">{product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</p>
      </CardFooter>
    </Card>
  );
}
