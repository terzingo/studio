
'use client';

import { getTailors } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MapPin } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useMemo } from 'react';

// Simple hashing function to get a consistent position for each tailor
const simpleHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};


export default function MapPage() {
  const tailors = getTailors();
  const mapImage = PlaceHolderImages.find(img => img.id === 'map-background');

  // Memoize positions so they don't change on re-render
  const tailorPositions = useMemo(() => {
    return tailors.map(tailor => {
      const hash = simpleHash(tailor.id);
      return {
        ...tailor,
        top: `${(hash % 80) + 10}%`, // Avoid edges
        left: `${(hash % 90) + 5}%`,
      };
    });
  }, [tailors]);


  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          Terzin<span className="text-primary">Go</span> Haritası
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Tüm Terzin<span className="text-primary">Go</span> noktalarını harita üzerinde keşfedin. Size en yakın olanı bulun!
        </p>
      </div>

      <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border shadow-lg">
        <TooltipProvider>
            {mapImage && (
                 <Image
                    src={mapImage.imageUrl}
                    alt="Şehir Haritası"
                    fill
                    className="object-cover"
                    data-ai-hint={mapImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-white/30 dark:bg-black/30" />

            {tailorPositions.map((tailor) => (
                <Tooltip key={tailor.id}>
                    <TooltipTrigger asChild>
                    <Link
                        href={`/points/${tailor.id}`}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125"
                        style={{ top: tailor.top, left: tailor.left }}
                        aria-label={tailor.name}
                    >
                        <MapPin className="h-8 w-8 text-primary fill-primary/50 stroke-[1.5]" />
                    </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                    <p className="font-semibold">{tailor.name}</p>
                    <p className="text-sm text-muted-foreground">{tailor.location}</p>
                    </TooltipContent>
              </Tooltip>
            ))}
        </TooltipProvider>
      </div>
    </div>
  );
}

    
