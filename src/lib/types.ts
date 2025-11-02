export type Tailor = {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  imageId: string;
  portfolioImageIds: string[];
  bio: string;
  services: {
    name: string;
    price: string;
  }[];
  customerReviews: {
    id: string;
    name: string;
    rating: number;
    comment: string;
    date: string;
  }[];
};

export type Product = {
  id: string;
  name: string;
  price: number;
  category: 'İkinci El' | 'Özel Tasarım';
  imageId: string;
  tailorId: string;
  description: string;
  brand: string;
  condition: 'Yeni gibi' | 'Az kullanılmış' | 'İyi durumda' | 'Tadilat görmüş';
  fabric: string;
  measurements: {
    shoulder?: string;
    bust?: string;
    waist?: string;
    hip?: string;
    sleeve?: string;
    length?: string;
  };
};
