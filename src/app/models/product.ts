export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ProductCategory;
  images: string[];
  creationAt?: string;
  updatedAt?: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  image: string;
  slug: string;
}
