import ProductCard from "../components/ProductCard";
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
    <div>
      <h1>Favorites</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          favorites.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={true}
              onFavoriteToggle={() => removeFavorite(product.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
