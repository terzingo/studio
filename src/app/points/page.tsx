'use client';

import { useState } from 'react';
import { getTailors } from '@/lib/data';
import { TailorCard } from '@/components/tailor-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function PointsPage() {
  const allTailors = getTailors();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTailors = allTailors.filter(
    (tailor) =>
      tailor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tailor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tailor.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Terzin<span className="text-primary">Go</span> Noktaları</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Size en yakın Terzin<span className="text-primary">Go</span> noktasını bulun, tadilat ve diğer hizmetlerden yararlanın.
        </p>
      </div>

      <div className="mb-8 max-w-lg mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Nokta adı, uzmanlık alanı veya şehir arayın..."
            className="w-full pl-10 h-12 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredTailors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredTailors.map((tailor) => (
            <TailorCard key={tailor.id} tailor={tailor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">Aradığınız kriterlere uygun Terzin<span className="text-primary">Go</span> noktası bulunamadı.</p>
        </div>
      )}
    </div>
  );
}
