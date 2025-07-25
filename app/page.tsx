import { ProductCard } from '@/app/components/products/ProductCard';
import LogoAnimation from '@/components/ui/LogoAnimation';
import { products } from '@/app/data/products';

export default function Home() {
  const deckProducts = products.filter(product => product.category === 'Decks');
  const accessoryProducts = products.filter(product => product.category === 'Accessories');

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12">
      <div className="w-full flex justify-center mb-8">
        <div className="relative w-48 h-48">
          <LogoAnimation />
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-12 text-center">FAR-OUT DECKS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {deckProducts.map(product => (
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

      {/* Accessories Section */}
      <h1 className="text-4xl font-bold mt-12 mb-12 text-center">FAR-OUT ACCESSORIES</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {accessoryProducts.map(product => (
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

      {/* Footer Section */}
      <footer className="w-full py-12 bg-white flex flex-col items-center text-center">
        <p className="text-lg mb-4">Thank you for shopping With</p>
        <div className="relative w-32 h-32 mb-6">
          <LogoAnimation />
        </div>
        <div className="flex flex-col items-center space-y-2">
          <a href="https://www.youtube.com/channel/Far-OutSkateboards-it1iy" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-black">
            <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.543 6.498c-.244-.972-.997-1.72-1.969-1.964C18.507 4 12 4 12 4s-6.507 0-7.574.534c-.972.244-1.72 1-1.964 1.964C2 9.493 2 12 2 12s0 2.507.534 3.574c.244.972 1 1.72 1.964 1.964C5.493 18 12 18 12 18s6.507 0 7.574-.534c.972-.244 1.72-1 1.964-1.964C22 14.507 22 12 22 12s0-2.507-.534-3.574zM10 15.5l6-3.5-6-3.5v7z"/>
            </svg>
            <span>@Far-OutSkateboards-it1iy</span>
          </a>
          <a href="https://www.instagram.com/far_out_skateboards" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-black">
            <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.5 2.5h9c2.481 0 4.5 2.019 4.5 4.5v9c0 2.481-2.019 4.5-4.5 4.5h-9c-2.481 0-4.5-2.019-4.5-4.5v-9c0-2.481 2.019-4.5 4.5-4.5zm0 1h9c1.93 0 3.5 1.57 3.5 3.5v9c0 1.93-1.57 3.5-3.5 3.5h-9c-1.93 0-3.5-1.57-3.5-3.5v-9c0-1.93 1.57-3.5 3.5-3.5z"/>
              <path d="M12 8c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 7c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z"/>
              <circle cx="18.5" cy="5.5" r="1.5"/>
            </svg>
            <span>@far_out_skateboards</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
