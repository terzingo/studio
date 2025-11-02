import { getTailorById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MapPin, Phone, MessageSquare, User, PackageCheck } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function TailorProfilePage({ params }: { params: { id: string } }) {
  const tailor = getTailorById(params.id);

  if (!tailor) {
    notFound();
  }

  const mainImage = PlaceHolderImages.find(img => img.id === tailor.imageId);
  const portfolioImages = tailor.portfolioImageIds.map(id => PlaceHolderImages.find(img => img.id === id)).filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader className="items-center text-center">
              <Avatar className="w-28 h-28 mb-4 border-4 border-primary/20">
                {mainImage && <AvatarImage src={mainImage.imageUrl} alt={tailor.name} />}
                <AvatarFallback>{tailor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl font-headline">{tailor.name}</CardTitle>
              <p className="text-muted-foreground">{tailor.specialty}</p>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{tailor.location}</span>
              </div>
              <div className="flex items-center mt-2">
                  <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                          <Star
                              key={i}
                              className={`h-5 w-5 ${i < Math.round(tailor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted'}`}
                          />
                      ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">{tailor.rating.toFixed(1)} ({tailor.reviews} yorum)</span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button size="lg" className="w-full">
                <Phone className="mr-2 h-4 w-4" />
                Ara
              </Button>
              <Button size="lg" variant="secondary" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Mesaj Gönder
              </Button>
              <div className="mt-4 space-y-2 text-center">
                <Image 
                    src="https://i.imgur.com/agBAbIM.png" 
                    alt="Harita konumu" 
                    width={500} 
                    height={300} 
                    className="rounded-md w-full aspect-video object-cover"
                />
                <Button variant="link">Haritayı Büyüt</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-bold font-headline">Terzin<span className="text-primary">Go</span> Noktası Hakkında</h2>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{tailor.bio}</p>
                </CardContent>
            </Card>

            <Tabs defaultValue="services" className="w-full mt-8">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="services">Hizmetler</TabsTrigger>
                    <TabsTrigger value="portfolio">Portföy</TabsTrigger>
                    <TabsTrigger value="reviews">Yorumlar</TabsTrigger>
                </TabsList>
                <TabsContent value="services" className="mt-4">
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm text-muted-foreground mb-6">* ile işaretli hizmetler, Terzin<span className="text-primary">Go</span> kodu ile ücretsizdir.</p>
                            <ul className="space-y-4">
                                {tailor.services.map((service) => (
                                    <li key={service.name} className="flex justify-between items-center border-b pb-3">
                                        <span className="font-medium text-foreground">{service.name}</span>
                                        <div className='flex flex-col items-end'>
                                          <Badge variant={service.note ? "default" : "secondary"}>{service.price}</Badge>
                                          {service.note && <span className="text-xs text-primary font-semibold mt-1 animate-pulse-text">{service.note}</span>}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="portfolio" className="mt-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {portfolioImages.map((image) => (
                           image && <div key={image.id} className="relative aspect-[3/4] overflow-hidden rounded-lg group">
                                <Image
                                    src={image.imageUrl}
                                    alt={image.description}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    data-ai-hint={image.imageHint}
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                                  <p className="text-white text-sm">{image.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="reviews" className="mt-4">
                    <div className="space-y-6">
                        {tailor.customerReviews.map((review) => (
                            <Card key={review.id}>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                      <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                          <AvatarFallback><User /></AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <p className="font-semibold">{review.name}</p>
                                          <p className="text-xs text-muted-foreground">{review.date}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-0.5">
                                          {[...Array(5)].map((_, i) => (
                                              <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted'}`} />
                                          ))}
                                      </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm">{review.comment}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
      </div>
    </div>
  );
}
