import { useMemo, useState } from "react";
import { getProducts } from "../api/productApi";
import ProductFilters from "../components/product/ProductFilters";
import ProductGrid from "../components/product/ProductGrid";
import Loader from "../components/common/Loader";
import { useCart } from "../hooks/useCart";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";

export default function ProductListing() {
  const { addToCart } = useCart();
  const { data: products, loading, error } = useFetch(getProducts);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const debouncedSearch = useDebounce(search, 250);

  const filteredProducts = useMemo(() => {
    return (products || []).filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());
      const numericMin = Number(minPrice || 0);
      const matchesPrice = Number(product.price || 0) >= numericMin;
      return matchesSearch && matchesPrice;
    });
  }, [products, debouncedSearch, minPrice]);

  return (
    // 1. OUTER CONTAINER: यहाँ हमने w-full दिया है ताकि बैकग्राउंड पूरी स्क्रीन पर फैले
    <div className="w-full min-h-screen" style={{ backgroundColor: "#FBF7F2" }}>
      
      {/* 2. INNER CONTAINER: यहाँ max-w-7xl है ताकि कंटेंट बीच में रहे */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        
        {/* Heading ko thoda bada aur sundar kar diya gaya hai */}
        <h1 className="text-4xl font-serif font-bold text-[#2b1a12] mb-8">
          Products
        </h1>
        
        <ProductFilters
          search={search}
          minPrice={minPrice}
          onSearchChange={(e) => setSearch(e.target.value)}
          onMinPriceChange={(e) => setMinPrice(e.target.value)}
        />
        
        {loading && <Loader />}
        
        {error && (
          <p className="error text-sm text-red-500 text-center py-6">
            {error}
          </p>
        )}
        
        {!loading && (
          <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
        )}
        
      </section>
    </div>
  );
}