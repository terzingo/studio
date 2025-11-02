'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, Share2, ChevronLeft, ChevronRight, Package, Truck, Shield, Ruler, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Bu dosya: src/app/products/[id]/page.tsx olarak kaydedilmeli
// Şu an örnek ürün gösteriyoruz, gerçek uygulamada params'dan id alınacak

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Örnek ürün verisi - gerçek uygulamada API'den gelecek
  const product = {
    id: 'example-1',
    name: 'Tarçın Oversize Crop Ceket',
    price: 899.90,
    originalPrice: 1299.90,
    discount: 31,
    rating: 4.8,
    reviewCount: 127,
    brand: 'TerziGo Collection',
    category: 'Kadın Ceket',
    stock: 15,
    colors: ['Tarçın', 'Siyah', 'Bej'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/placeholder-product-1.jpg',
      '/placeholder-product-2.jpg',
      '/placeholder-product-3.jpg',
      '/placeholder-product-4.jpg',
    ],
    description: `Şık ve rahat tasarımıyla öne çıkan oversize crop ceket, gardırobunuzun vazgeçilmezi olacak. 
    Premium kumaş kalitesi ve özenli dikişleriyle uzun süre kullanım sunar.`,
    features: [
      'Oversize kesim',
      'Crop boy',
      'Düğme detaylı',
      'İki adet cep',
      'Yumuşak dokulu kumaş',
      'Mevsimlik kullanım',
    ],
    measurements: {
      'XS': { bust: '86-90', waist: '66-70', hips: '90-94' },
      'S': { bust: '90-94', waist: '70-74', hips: '94-98' },
      'M': { bust: '94-98', waist: '74-78', hips: '98-102' },
      'L': { bust: '98-102', waist: '78-82', hips: '102-106' },
      'XL': { bust: '102-106', waist: '82-86', hips: '106-110' },
    },
    careInstructions: [
      '30 derecede yıkanabilir',
      'Ağartıcı kullanmayın',
      'Düşük ısıda ütülenebilir',
      'Kuru temizleme yapılabilir',
    ],
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);
  };


  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products" className="hover:text-foreground transition-colors">Ürünler</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-[3/4] bg-muted rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-purple-500/10">
                <span className="text-6xl">👗</span>
              </div>
              
              {/* Discount Badge */}
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  %{product.discount} İNDİRİM
                </div>
              )}

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={() => setSelectedImage(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setSelectedImage(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-muted-foreground/20'
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                    <span className="text-2xl">👗</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Title */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
              <h1 className="text-3xl md:text-4xl font-bold font-headline">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviewCount} değerlendirme)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 py-4 border-y">
              <div className="text-4xl font-bold text-primary">{formatCurrency(product.price)}</div>
              {product.originalPrice > product.price && (
                <div className="text-xl text-muted-foreground line-through pb-1">{formatCurrency(product.originalPrice)}</div>
              )}
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm font-semibold mb-3">Renk Seçenekleri</label>
              <div className="flex gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 border-2 border-muted-foreground/20 rounded-lg hover:border-primary transition-colors"
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold">Beden Seçin</label>
                <button className="text-sm text-primary hover:underline flex items-center gap-1">
                  <Ruler className="w-4 h-4" />
                  Beden Tablosu
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border-2 rounded-lg font-semibold transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted-foreground/20 hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* TerziGo Feature Highlight */}
            <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Ruler className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Ücretsiz Tadilat Garantisi</h3>
                  <p className="text-sm text-muted-foreground">
                    Beden uymazsa iade etmeyin! Size en yakın Terzi<span className="text-primary">Go</span> noktasında ücretsiz tadilat yaptırın.
                  </p>
                  <Link href="/how-it-works" className="text-sm text-primary hover:underline mt-1 inline-block">
                    Nasıl çalışır? →
                  </Link>
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold mb-3">Adet</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border-2 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 hover:bg-muted transition-colors"
                  >
                    -
                  </button>
                  <div className="w-16 h-12 flex items-center justify-center font-semibold border-x-2">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-12 h-12 hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stock} adet stokta
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button size="lg" className="flex-1 h-14 text-lg font-bold">
                Sepete Ekle
              </Button>
              <Button size="lg" variant="outline" className="flex-1 h-14 text-lg font-bold">
                Hemen Al
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Ücretsiz Kargo</div>
                  <div className="text-xs text-muted-foreground">500 TL üzeri</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Hızlı Teslimat</div>
                  <div className="text-xs text-muted-foreground">2-5 iş günü</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Güvenli Alışveriş</div>
                  <div className="text-xs text-muted-foreground">SSL sertifikalı</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Terzi Noktaları</div>
                  <div className="text-xs text-muted-foreground">500+ lokasyon</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="border-b">
            <div className="flex gap-8">
              <button className="pb-4 border-b-2 border-primary font-semibold">
                Ürün Açıklaması
              </button>
              <button className="pb-4 border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors">
                Beden Tablosu
              </button>
              <button className="pb-4 border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors">
                Bakım Talimatları
              </button>
              <button className="pb-4 border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors">
                Değerlendirmeler ({product.reviewCount})
              </button>
            </div>
          </div>

          <div className="py-8 grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Ürün Detayları</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>
              <h4 className="font-semibold mb-3">Özellikler:</h4>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Beden Ölçüleri (cm)</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted">
                      <th className="px-4 py-3 text-left text-sm font-semibold">Beden</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Göğüs</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Bel</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Kalça</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(product.measurements).map(([size, measurements]) => (
                      <tr key={size} className="border-t">
                        <td className="px-4 py-3 font-semibold">{size}</td>
                        <td className="px-4 py-3 text-muted-foreground">{measurements.bust}</td>
                        <td className="px-4 py-3 text-muted-foreground">{measurements.waist}</td>
                        <td className="px-4 py-3 text-muted-foreground">{measurements.hips}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  💡 Beden Seçiminde Emin Değil misiniz?
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Sorun değil! Ürününüz size ulaştıktan sonra en yakın Terzi<span className="text-primary">Go</span> noktasında ücretsiz tadilat yaptırabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold font-headline">Benzer Ürünler</h2>
            <Link href="/products" className="text-primary hover:underline flex items-center gap-1">
              Tümünü Gör
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-gradient-to-br from-muted to-muted-foreground/10 rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="text-4xl">👗</span>
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  Örnek Ürün {i}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">{formatCurrency(599.90)}</span>
                  <span className="text-sm text-muted-foreground line-through">{formatCurrency(799.90)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
