import { notFound } from 'next/navigation';
import { products } from '@/app/data/products';
import { ProductPageContent } from './ProductPageContent';

export default function Page({ params }: { params: { id: string } }) {
  // Find the product by ID
  const product = products.find((p) => p.id.toString() === params.id);
  
  if (!product) {
    notFound();
  }

  // Get related products (exclude current product)
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <ProductPageContent 
      product={product} 
      relatedProducts={relatedProducts} 
    />
  );
}

// Generate static paths for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export const dynamicParams = false; // Return 404 for not found products
