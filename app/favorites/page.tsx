"use client";

import ProductCard from "../../components/ProductCard";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function Favorites() {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const favs = localStorage.getItem("favorites");
    setFavorites(favs ? JSON.parse(favs) : []);
  }, []);

  const removeFavorite = (id: number) => {
    const updated = favorites.filter((item: Product) => item.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-8 drop-shadow-lg text-center">
        ★ Favorites
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600 text-lg">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-center">
          {favorites.map((product: Product) => (
            <div key={product.id} className="flex justify-center">
              <ProductCard
                product={product}
                isFavorite={true}
                onFavoriteToggle={() => removeFavorite(product.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
