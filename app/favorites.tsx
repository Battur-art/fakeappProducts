import ProductCard from "../components/ProductCard";
// @ts-ignore
import { useEffect, useState } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = localStorage.getItem("favorites");
    setFavorites(favs ? JSON.parse(favs) : []);
  }, []);

  const removeFavorite = (id: number) => {
    const updated = favorites.filter((item: any) => item.id !== id);
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
          favorites.map((product: any) => (
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
