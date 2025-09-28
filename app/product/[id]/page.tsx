"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "../../../components/ProductCard";
// @ts-ignore

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message));
  }, [id]);

  useEffect(() => {
    if (product) {
      const favs = localStorage.getItem("favorites");
      const favArr = favs ? JSON.parse(favs) : [];
      setIsFavorite(favArr.some((item: any) => item.id === product.id));
    }
  }, [product]);

  const toggleFavorite = () => {
    const favs = localStorage.getItem("favorites");
    let favArr = favs ? JSON.parse(favs) : [];
    if (isFavorite) {
      favArr = favArr.filter((item: any) => item.id !== product.id);
    } else {
      favArr.push(product);
    }
    localStorage.setItem("favorites", JSON.stringify(favArr));
    setIsFavorite(!isFavorite);
  };

  if (!product) return <div>Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 text-xl py-10">{error}</div>
    );

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100">
      <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full max-h-96 object-contain mb-6 rounded-lg transition-transform duration-300 hover:scale-105"
        />

        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          {product.title}
        </h2>
        <p className="text-gray-700 mb-4 text-center">{product.description}</p>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          ${product.price}
        </h3>

        <button
          onClick={toggleFavorite}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-300
                ${
                  isFavorite
                    ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                    : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                }`}
        >
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>
      </div>
    </div>
  );
}
