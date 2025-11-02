'use client';

import { useState, useEffect } from 'react';
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
import { getTailors, allLocationsData } from '@/lib/data';
import { TailorCard } from './tailor-card';
import Link from 'next/link';
import type { Tailor } from '@/lib/types';


type City = keyof typeof allLocationsData;
type District = keyof (typeof allLocationsData)[City]['districts'];

export function FindTailorForm() {
    // Mock user's location for demonstration purposes
    const MOCK_USER_CITY: City = 'İstanbul';
    const MOCK_USER_DISTRICT: District = 'Kadıköy';
    const MOCK_USER_NEIGHBORHOOD = 'Moda';

    const [selectedCity, setSelectedCity] = useState<City | null>(MOCK_USER_CITY);
    const [selectedDistrict, setSelectedDistrict] = useState<District | null>(MOCK_USER_DISTRICT);
    const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(MOCK_USER_NEIGHBORHOOD);
    
    const [showResults, setShowResults] = useState(false);
    const [isChangingLocation, setIsChangingLocation] = useState(false);
    const [randomTailors, setRandomTailors] = useState<Tailor[]>([]);
    
    const allTailors = getTailors();

    // Function to shuffle an array and take the first N elements
    const getRandomItems = (arr: Tailor[], n: number) => {
        return [...arr].sort(() => 0.5 - Math.random()).slice(0, n);
    };

    const handleSearch = () => {
        setRandomTailors(getRandomItems(allTailors, 3));
        setShowResults(true);
    };
    
    const handleLocationChangeClick = () => {
        setIsChangingLocation(true);
        setSelectedCity(null);
        setSelectedDistrict(null);
        setSelectedNeighborhood(null);
        setShowResults(false);
    }

  return (
    <section id="find-tailor" className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-4xl mx-auto shadow-2xl -mt-32 relative z-20">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold font-headline text-center">
              Terzin<span className="text-primary">Go</span> Noktasını Bulun
            </CardTitle>
          </CardHeader>
          <CardContent>
            { !isChangingLocation ? (
                 <div className="text-center">
                    <p className="text-lg">
                        Mevcut konumunuz: <span className="font-bold">{MOCK_USER_NEIGHBORHOOD}, {MOCK_USER_DISTRICT}, {MOCK_USER_CITY}</span>
                        <Button variant="link" onClick={handleLocationChangeClick}>(Değiştir)</Button>
                    </p>
                    <Button onClick={handleSearch} className="h-12 text-base w-full max-w-sm mx-auto mt-4">
                        <Users className="mr-2" />
                        Yakınımdaki Terzileri Bul
                    </Button>
                </div>
            ) : (
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
                        {Object.entries(allLocationsData).map(([city, data]) => (
                        <SelectItem key={city} value={city}>
                           {city} <span className="ml-2 text-primary">({data.count})</span>
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
                        Object.entries(allLocationsData[selectedCity].districts).map(([dist, data]) => (
                            <SelectItem key={dist} value={dist}>
                                {dist} <span className="ml-2 text-primary">({data.count})</span>
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
                        allLocationsData[selectedCity].districts[selectedDistrict as District].neighborhoods.map(
                            (neighborhood) => (
                            <SelectItem key={neighborhood} value={neighborhood}>
                                {neighborhood}
                            </SelectItem>
                            )
                        )}
                    </SelectContent>
                    </Select>
                </div>
                <Button onClick={handleSearch} className="h-12 text-base w-full" disabled={!selectedCity || !selectedDistrict || !selectedNeighborhood}>
                    <Users className="mr-2" />
                    Terzi Bul
                </Button>
                </div>
            )}
            <div className='text-center my-4'>
                <Button variant="link" asChild className='text-base'>
                    <Link href="/map">
                        <Map className="mr-2" />
                        veya Haritadan Bul
                    </Link>
                </Button>
            </div>

            {showResults && (
              <div className="mt-8">
                <h3 className="text-xl font-bold font-headline text-center mb-6">Arama Sonuçları</h3>
                {randomTailors.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {randomTailors.map((tailor) => (
                      <TailorCard key={tailor.id} tailor={tailor} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">
                    Bu bölgede henüz Terzin<span className="text-primary">Go</span> noktası bulunmuyor.
                  </p>
                )}
                 <div className="text-center mt-8">
                    <Button variant="outline" onClick={handleSearch}>Farklı Terziler Göster</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
