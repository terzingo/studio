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
};
