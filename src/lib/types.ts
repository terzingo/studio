import type { PlaceHolderImages } from './placeholder-images';

export type Tailor = {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  imageId: (typeof PlaceHolderImages)[number]['id'];
  portfolioImageIds: (typeof PlaceHolderImages)[number]['id'][];
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
