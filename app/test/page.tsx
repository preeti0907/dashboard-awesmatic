
'use client'
// app/products/page.tsx
import { supabase } from '@/lib/supabaseClient';

export default async function ProductsPage({ searchParams }: { searchParams: { page?: string, q?: string } }) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const searchQuery = searchParams?.q ? searchParams.q : '';
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  
  const { data: products, error, count } = await supabase
    .from('products')
    .select('*', { count: 'exact' })
    .ilike('product_name', `%${searchQuery}%`)  
    .or(`brand_id.ilike.%${searchQuery}%`)    
    .range(start, end);

  if (error) {
    return <p>Error loading products: {error.message}</p>;
  }

  const totalPages = Math.ceil((count ?? 0) / pageSize);


  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        {/* Search Input */}
        <form action="" method="GET" className="mb-4">
          <input
            type="text"
            name="q"
            defaultValue={searchQuery}
            placeholder="Search products..."
            className="p-2 border border-gray-300"
          />
          <button type="submit" className="ml-2 p-2 bg-blue-500 text-white">
            Search
          </button>
        </form>

        {/* Products List */}
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.product_name} - {product.brand_name}</li>
          ))}
        </ul>
      </main>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button disabled={page <= 1} onClick={() => navigateToPage(page - 1, searchQuery)}>
          Previous
        </button>
        <p>Page {page} of {totalPages}</p>
        <button disabled={page >= totalPages} onClick={() => navigateToPage(page + 1, searchQuery)}>
          Next
        </button>
      </div>
    </>
  );
}

// Helper function to navigate between pages
function navigateToPage(page: number, query: string) {
  window.location.href = `?page=${page}&q=${query}`;
}
