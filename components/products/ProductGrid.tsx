import { ProductCard } from './ProductCard';
import { Product } from '@/app/data/products';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

export function ProductGrid({ products, title }: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      {title && (
        <h2 className="text-3xl font-bold mb-12 text-center uppercase tracking-tight">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <div key={product.id} className="flex flex-col items-center text-center">
            <ProductCard product={product} />
            <p className="mt-2 font-semibold text-lg">{product.name}</p>
            {product.status && (
              <p className={`text-sm font-medium ${product.status === 'Out of Stock' ? 'text-red-500' : 'text-orange-500'}`}>
                {product.status}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
