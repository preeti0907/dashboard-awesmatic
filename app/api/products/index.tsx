import { supabase } from '@/lib/supabaseClient';
import React from 'react';

export async function getProducts(page: number, searchQuery: string, pageSize: number, start: number, end: number) {
  try {
    // First query: Fetch brands matching the search query
    const { data: brands, error: brandError } = await supabase
      .from('brands')
      .select('id')
      .ilike('name', `%${searchQuery}%`);

    if (brandError) {
      console.error('Error fetching brands:', brandError);
      return { products: [], count: 0 };
    }

    // Extract brand IDs
    const brandIds = brands?.map((brand) => brand.id) || [];

    // Second query: Fetch products matching the product_name or brand_id
    const { data: products, error, count } = await supabase
      .from('products')
      .select(`
        id,
        product_name,
        brand: brands (id, name),
        selling_price,
        mrp,
        apin
      `, { count: 'exact' })
      .ilike('product_name', `%${searchQuery}%`)
      .or(brandIds.length > 0 ? `brand_id.in.(${brandIds.join(',')})` : '') // Check if there are brand IDs to filter
      .range(start, end);

    if (error) {
      console.error('Error fetching products:', error);
      return { products: [], count: 0 };
    }

    return { products: products, count };

  } catch (error) {
    console.error('Error:', error);
    return { products: [], count: 0 };
  }
}
