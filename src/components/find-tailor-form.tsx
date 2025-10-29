'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Map, Users } from 'lucide-react';
import { getTailors } from '@/lib/data';
import { TailorCard } from './tailor-card';

const locationData = {
  İstanbul: {
    Beşiktaş: ['Levent', 'Etiler', 'Bebek'],
    Kadıköy: ['Moda', 'Göztepe', 'Bostancı'],
    Şişli: ['Nişantaşı', 'Mecidiyeköy', 'Harbiye'],
  },
  Ankara: {
    Çankaya: ['Kızılay', 'Tunalı Hilmi', 'Balgat'],
    Yenimahalle: ['Batıkent', 'Demetevler', 'Şentepe'],
    Keçiören: ['Etlik', 'Aktepe', 'Sanatoryum'],
  },
  İzmir: {
    Konak: ['Alsancak', 'Göztepe', 'Hatay'],
    Bornova: ['Küçükpark', 'Evka 3', 'Özkanlar'],
    Karşıyaka: ['Bostanlı', 'Mavişehir', 'Alaybey'],
  },
};

type City = keyof typeof locationData;
type District = keyof (typeof locationData)[City];

export function FindTailorForm() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null
  );
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(
    null
  );
  const [showResults, setShowResults] = useState(false);
  const allTailors = getTailors();

  const handleSearch = () => {
    if (selectedCity && selectedDistrict && selectedNeighborhood) {
      setShowResults(true);
    }
  };

  const filteredTailors = showResults
    ? allTailors.filter(
        (t) =>
          t.location.includes(selectedCity || '') &&
          t.location.includes(selectedDistrict || '')
      ).slice(0,3) // Show first 3 as examples
    : [];

  return (
    <section id="find-tailor" className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-4xl mx-auto shadow-2xl -mt-48 relative z-20">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold font-headline text-center">
              Terzin<span className="text-primary">Go</span> Noktasını Bulun
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="grid gap-1.5">
                <label className="font-semibold text-sm">İl</label>
                <Select
                  onValueChange={(value: City) => {
                    setSelectedCity(value);
                    setSelectedDistrict(null);
                    setSelectedNeighborhood(null);
                    setShowResults(false);
                  }}
                >
                  <SelectTrigger className="w-full h-12 text-base">
                    <SelectValue placeholder="İl Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(locationData).map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <label className="font-semibold text-sm">İlçe</label>
                <Select
                  disabled={!selectedCity}
                  onValueChange={(value: any) => {
                    setSelectedDistrict(value);
                    setSelectedNeighborhood(null);
                    setShowResults(false);
                  }}
                  value={selectedDistrict || ''}
                >
                  <SelectTrigger className="w-full h-12 text-base">
                    <SelectValue placeholder="İlçe Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCity &&
                      Object.keys(locationData[selectedCity]).map((dist) => (
                        <SelectItem key={dist} value={dist}>
                          {dist}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <label className="font-semibold text-sm">Mahalle</label>
                <Select
                  disabled={!selectedDistrict}
                  onValueChange={(value) => {
                    setSelectedNeighborhood(value);
                    setShowResults(false);
                  }}
                  value={selectedNeighborhood || ''}
                >
                  <SelectTrigger className="w-full h-12 text-base">
                    <SelectValue placeholder="Mahalle Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCity &&
                      selectedDistrict &&
                      locationData[selectedCity][selectedDistrict].map(
                        (neighborhood) => (
                          <SelectItem key={neighborhood} value={neighborhood}>
                            {neighborhood}
                          </SelectItem>
                        )
                      )}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSearch} className="h-12 text-base w-full">
                <Users className="mr-2" />
                Terzi Bul
              </Button>
            </div>
            <div className='text-center my-4'>
                <Button variant="link" className='text-base'>
                    <Map className="mr-2" />
                    veya Haritadan Bul
                </Button>
            </div>

            {showResults && (
              <div className="mt-8">
                <h3 className="text-xl font-bold font-headline text-center mb-6">Arama Sonuçları</h3>
                {filteredTailors.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTailors.map((tailor) => (
                      <TailorCard key={tailor.id} tailor={tailor} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">
                    Bu bölgede henüz Terzin<span className="text-primary">Go</span> noktası bulunmuyor.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
