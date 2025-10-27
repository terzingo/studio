import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin } from 'lucide-react';
import type { Tailor } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface TailorCardProps {
  tailor: Tailor;
}

export function TailorCard({ tailor }: TailorCardProps) {
  const image = PlaceHolderImages.find(img => img.id === tailor.imageId);

  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-xl duration-300 group">
        <CardHeader className="p-0">
            {image && (
                <div className="relative h-56 w-full">
                    <Image
                        src={image.imageUrl}
                        alt={tailor.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={image.imageHint}
                    />
                </div>
            )}
        </CardHeader>
        <CardContent className="p-4">
            <CardTitle className="text-xl font-headline font-bold">
                <Link href={`/points/${tailor.id}`} className="hover:text-primary transition-colors">
                    {tailor.name}
                </Link>
            </CardTitle>
            <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{tailor.location}</span>
            </div>
            <div className="flex items-center mt-2">
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.round(tailor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                        />
                    ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">({tailor.reviews} yorum)</span>
            </div>
             <div className="mt-3 flex flex-wrap gap-2">
                {tailor.services.slice(0, 2).map((service) => (
                    <Badge key={service.name} variant="outline">{service.name}</Badge>
                ))}
                {tailor.services.length > 2 && <Badge variant="outline">...</Badge>}
            </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
            <Button asChild className="w-full">
                <Link href={`/points/${tailor.id}`}>Noktayı Görüntüle</Link>
            </Button>
        </CardFooter>
    </Card>
  );
}
