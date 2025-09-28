"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
    const favs = localStorage.getItem("favorites");
    setFavorites(favs ? JSON.parse(favs) : []);
  }, []);

  const toggleFavorite = (product: Product) => {
    let favArr: Product[] = favorites.slice();
    const exists = favArr.some((item: Product) => item.id === product.id);
    if (exists) {
      favArr = favArr.filter((item: Product) => item.id !== product.id);
    } else {
      favArr.push(product);
    }
    setFavorites(favArr);
    localStorage.setItem("favorites", JSON.stringify(favArr));
  };

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100">
      {/* Products Grid */}
      <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 px-8 place-items-center items-center justify-center">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-1 flex flex-col"
          >
            <ProductCard
              product={product}
              isFavorite={favorites.some((item: Product) => item.id === product.id)}
              onFavoriteToggle={() => toggleFavorite(product)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
