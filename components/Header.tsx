const Header = () => {
  return (
    <header className="w-full flex flex-col items-center justify-center py-10 bg-black">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg px-6 py-3 rounded-2xl text-center">
        Fake Store Products
      </h1>
      <a
        href="/favorites"
        className="mt-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-semibold shadow-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 transform hover:-translate-y-1 text-center"
      >
        ★ Go to Favorites
      </a>
    </header>
  );
};

export default Header;
