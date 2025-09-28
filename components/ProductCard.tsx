import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

export default function ProductCard({
  product,
  isFavorite,
  onFavoriteToggle,
}: ProductCardProps) {
  return (
    <div
      className={`w-60  p-4 rounded-2xl border transition-all duration-300
                  ${
                    isFavorite
                      ? "bg-yellow-50 border-yellow-200"
                      : "bg-white border-gray-200"
                  }
                  hover:shadow-2xl hover:-translate-y-1 flex flex-col items-center`}
    >
      <Link href={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-70 h-70 object-contain mb-3 transition-transform duration-300 hover:scale-105"
        />
      </Link>

      <h4 className="text-center font-medium text-gray-800 mb-1">
        {product.title}
      </h4>
      <p className="font-bold text-lg text-gray-900 mb-2">${product.price}</p>

      <button
        onClick={onFavoriteToggle}
        className={`px-4 py-1 rounded-lg font-semibold transition-all duration-300
                    ${
                      isFavorite
                        ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                        : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                    }`}
      >
        {isFavorite ? "Unfavorite" : "Favorite"}
      </button>
    </div>
  );
}
