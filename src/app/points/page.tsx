'use client';

import { useState, useMemo } from 'react';
import { getTailors, allLocationsData } from '@/lib/data';
import { TailorCard } from '@/components/tailor-card';
import { Input } from '@/components/ui/input';
import { Search, MapPin } from 'lucide-react';
import type { Tailor } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type City = keyof typeof allLocationsData;
type District = keyof (typeof allLocationsData)[City]['districts'];

export default function PointsPage() {
  const allTailors = getTailors();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);

  const tailorsToDisplay = useMemo(() => {
    const filteredTailors = allTailors.filter((tailor) => {
      const searchMatch =
        tailor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tailor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tailor.location.toLowerCase().includes(searchTerm.toLowerCase());

      const locationParts = tailor.location.split(',').map(p => p.trim());
      const tailorCity = locationParts[0];
      const tailorDistrict = locationParts.length > 1 ? locationParts[1] : '';
      const tailorNeighborhood = locationParts.length > 2 ? locationParts[2] : '';

      const cityMatch = !selectedCity || tailorCity === selectedCity;
      const districtMatch = !selectedDistrict || tailorDistrict === selectedDistrict;
      const neighborhoodMatch = !selectedNeighborhood || tailorNeighborhood === selectedNeighborhood;

      return searchMatch && cityMatch && districtMatch && neighborhoodMatch;
    });

    if (filteredTailors.length > 0) {
      return filteredTailors;
    }
    
    // If no results, show 3 random tailors
    return [...allTailors].sort(() => 0.5 - Math.random()).slice(0, 3);

  }, [searchTerm, selectedCity, selectedDistrict, selectedNeighborhood, allTailors]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Terzin<span className="text-primary">Go</span> Noktaları</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Size en yakın Terzin<span className="text-primary">Go</span> noktasını bulun, tadilat ve diğer hizmetlerden yararlanın.
        </p>
      </div>

       <Card className="max-w-5xl mx-auto mb-12 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl md:text-3xl font-bold font-headline">
              <MapPin className="h-8 w-8 text-primary"/>
              Nokta Bul
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div className="grid gap-1.5 col-span-1 lg:col-span-2">
                    <label className="font-semibold text-sm">Metin ile Ara</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Nokta adı, uzmanlık..."
                            className="w-full pl-10 h-12 text-base"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                 <div className="grid gap-1.5">
                    <label className="font-semibold text-sm">İl</label>
                    <Select
                        onValueChange={(value: City) => {
                            setSelectedCity(value);
                            setSelectedDistrict(null);
                            setSelectedNeighborhood(null);
                        }}
                        value={selectedCity || ''}
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
                        onValueChange={(value: District) => {
                            setSelectedDistrict(value);
                            setSelectedNeighborhood(null);
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
            </div>
          </CardContent>
       </Card>
      
        <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-center">
                Size En Yakın Terzin<span className="text-primary">Go</span> Noktaları
            </h2>
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tailorsToDisplay.map((tailor) => (
          <TailorCard key={tailor.id} tailor={tailor} />
        ))}
      </div>
    </div>
  );
}
