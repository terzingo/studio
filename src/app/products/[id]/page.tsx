'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, Share2, ChevronLeft, ChevronRight, Package, Truck, Shield, Ruler, MapPin, Clock, Tag, Shirt, Barbell, ScissorsIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { getProductById, getTailorById } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = typeof params.id === 'string' ? params.id : '';
  const product = getProductById(productId);
  const tailor = product ? getTailorById(product.tailorId) : undefined;
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product || !tailor) {
    // In a real app, you'd want to show a proper not found page.
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl text-center">
            <h1 className="text-2xl font-bold">Ürün Bulunamadı</h1>
            <p className="text-muted-foreground">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
            <Button asChild className="mt-4">
                <Link href="/">Anasayfaya Dön</Link>
            </Button>
        </div>
    );
  }

  // Example: Using the main imageId for the main picture, and portfolio images for thumbnails
  const mainImage = PlaceHolderImages.find(img => img.id === product.imageId);
  const thumbnailImages = [
    PlaceHolderImages.find(img => img.id === 'portfolio-4'), // Jacket detail
    PlaceHolderImages.find(img => img.id === 'portfolio-7'), // Stitching detail
    PlaceHolderImages.find(img => img.id === 'portfolio-5'), // Different angle
  ].filter(Boolean) as typeof PlaceHolderImages;

  const allImages = mainImage ? [mainImage, ...thumbnailImages] : thumbnailImages;
  const selectedImage = allImages[selectedImageIndex];

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
  };
  
  const measurementIcons: { [key: string]: React.ReactNode } = {
    shoulder: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M14.5 16.5c1.5-1.1 2.5-3 2.5-5V3.5c0-.8-.7-1.5-1.5-1.5h-7c-.8 0-1.5.7-1.5 1.5V11c0 2.2 1.1 4.1 2.8 5.2"/></svg>,
    bust: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M5.5 21a2.5 2.5 0 0 1-2-4.4l4.4-4.4 2.1 2.1-4.4 4.4a2.5 2.5 0 0 1-2.1 2.3Z"/><path d="m13 2-3 3 2.1 2.1 3-3Z"/><path d="M8.4 6.6 2 13l-1.4-1.4c-1-1-1.6-2.4-1.6-3.8 0-2.2 1-5 4-5.8"/><path d="M13 2l3.4 3.4c1 1 1.6 2.4 1.6 3.8 0 2.2-1 5-4 5.8l-1.4-1.4-7.6-7.6Z"/></svg>,
    waist: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m10 16 4-4-4-4"/></svg>,
    sleeve: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15.5 6.5l-3-3-3 3"/><path d="M12.5 3.5v13"/><path d="M10.5 14.5h-5c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h14c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5h-5"/></svg>,
    length: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="12" x2="12" y1="5" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/points" className="hover:text-foreground transition-colors">Noktalar</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0.5, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-[3/4] bg-muted rounded-2xl overflow-hidden shadow-lg"
            >
              {selectedImage ? (
                 <Image src={selectedImage.imageUrl} alt={selectedImage.description} fill className="object-cover" data-ai-hint={selectedImage.imageHint} />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                    <span className="text-6xl">🧥</span>
                </div>
              )}
            </motion.div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-muted-foreground/20'
                  }`}
                >
                  {image ? (
                     <Image src={image.imageUrl} alt={image.description} width={200} height={200} className="object-cover w-full h-full" data-ai-hint={image.imageHint} />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                        <span className="text-2xl">🧥</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start">
                  <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                  <Badge variant="outline" className="text-base">{product.condition}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-headline">{product.name}</h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(4) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`}/>
                  ))}
                </div>
                <span className="font-semibold">4.8</span>
                <span className="text-muted-foreground">(127 değerlendirme)</span>
              </div>
            </div>

            <div className="text-4xl font-bold text-primary py-4 border-y">{formatCurrency(product.price)}</div>

            <div className='space-y-4'>
                <h3 className="text-lg font-semibold">Ürün Özellikleri</h3>
                 <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2"><Tag className="w-4 h-4 text-muted-foreground" /> <span>Marka: <span className="font-medium">{product.brand}</span></span></div>
                    <div className="flex items-center gap-2"><Shirt className="w-4 h-4 text-muted-foreground" /> <span>Kumaş: <span className="font-medium">{product.fabric}</span></span></div>
                 </div>
            </div>
            
             <Card>
                <CardHeader className='pb-2'>
                    <h3 className="text-lg font-semibold">Detaylı Ölçüler</h3>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        {Object.entries(product.measurements).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-2">
                                {measurementIcons[key] || <Barbell className="w-4 h-4 text-muted-foreground" />}
                                <span className='capitalize'>{key.replace('shoulder', 'Omuz').replace('bust', 'Göğüs').replace('waist', 'Bel').replace('sleeve', 'Kol').replace('length', 'Boy')}: <span className="font-medium">{value}</span></span>
                            </div>
                        ))}
                    </div>
                    <p className='text-xs text-muted-foreground mt-4'>*Ölçüler, ürün düz bir zemine serilerek alınmıştır. ±1 cm farklılık gösterebilir.</p>
                </CardContent>
            </Card>


            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <ScissorsIcon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                    <h3 className="font-bold mb-1">Uygun Fiyatlı Tadilat İmkanı</h3>
                    <p className="text-sm text-muted-foreground">
                        Bu ürün bedeninize tam uymadı mı? Sorun değil! Terzin<span className="text-primary">Go</span> noktasında uzman terzilerimize uygun fiyata tadilat yaptırabilirsiniz.
                    </p>
                    <Link href={`/points/${tailor.id}`} className="text-sm text-primary hover:underline mt-1 inline-block">
                        Satıcıya Danış →
                    </Link>
                    </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3 pt-4">
              <Button size="lg" className="flex-1 h-14 text-lg font-bold">
                Satın Al
              </Button>
               <Button size="icon" variant="outline" className="h-14 w-14">
                  <Heart className="w-6 h-6" />
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14">
                           {PlaceHolderImages.find(i => i.id === tailor.imageId) && <AvatarImage src={PlaceHolderImages.find(i => i.id === tailor.imageId)?.imageUrl} alt={tailor.name} />}
                            <AvatarFallback>{tailor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm text-muted-foreground">Satıcı</p>
                            <h4 className="font-semibold text-lg">{tailor.name}</h4>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex gap-2">
                    <Button variant="outline" asChild className="w-full">
                        <Link href={`/points/${tailor.id}`}>Satıcı Profilini Gör</Link>
                    </Button>
                     <Button variant="secondary" className="w-full">Satıcıya Mesaj Gönder</Button>
                </CardContent>
            </Card>

          </div>
        </div>

        {/* Description Section */}
        <div className="mt-16 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-4 font-headline">Ürün Açıklaması</h2>
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>

      </div>
    </div>
  );
}
