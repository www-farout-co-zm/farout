import { NextResponse } from 'next/server';
import { products } from '@/app/data/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const limit = parseInt(searchParams.get('limit') || '5');

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const results = products
    .filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query) ||
      product.brand?.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    )
    .slice(0, limit);

  return NextResponse.json({ results });
}
