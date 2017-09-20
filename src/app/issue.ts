import { Image } from './image';

export class Issue {
  id: number;
  title: string;
  description: string;
  seriesNumber: number;
  publicationDate: string;
  publisherId: number;
  publisher: string;
  creators: string[];
  stock: string[];
  thumbnail: Image;
  images: Image[];
}
