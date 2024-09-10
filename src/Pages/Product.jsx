import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LottieAnim from "../Component/LottieAnim";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [visibleProductsCount, setVisibleProductsCount] = useState(8);

  useEffect(() => {
    // using axios method
    const productApiFunc = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        setProducts(res.data.products);
        setLoading(false);
        const categories = Array.from(
          new Set(res.data.products.map((product) => product.category))
        );
        setUniqueCategories(categories);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    productApiFunc();
  }, []);

  const filterProducts = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const visibleProducts = filteredProducts.slice(0, visibleProductsCount);

  return (
    <>
      <div className="container py-20">
        <h1 className="text-4xl lg:text-6xl font-bold mb-16 text-center relative before:w-24 before:h-1 before:absolute before:bg-primary before:-bottom-3 before:left-1/2 before:-translate-x-1/2 before:rounded-lg">
          Products
        </h1>
        <div className="mb-6 text-end">
          <span>Filter: </span>
          <select
            className="w-40 text-secondary rounded p-1 capitalize"
            onChange={(e) => filterProducts(e.target.value)}
            value={selectedCategory}>
            <option value="">All</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <LottieAnim />
          ) : (
            <>
              {visibleProducts.map((product) => (
                <div
                  className={`bg-white text-secondary rounded-lg overflow-hidden px-4 py-6 flex flex-col gap-6 relative z-0 group border`}
                  key={product.id}>
                  <>
                    <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-lg m-1 flex gap-2 items-center z-10">
                      <svg
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                      <span>{product.rating}</span>
                    </div>
                    <figure className="overflow-hidden">
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="max-w-full h-40 rounded object-cover object-center mx-auto transition-all duration-300 group-hover:scale-90"
                        />
                      </Link>
                    </figure>
                    <div className="flex flex-col gap-2">
                      <div className="px-2 py-1 bg-secondary opacity-90 text-white self-start capitalize rounded-lg">
                        {product.category}
                      </div>
                      <h5 className="text-xl font-semibold text-primary">
                        <Link to={`/product/${product.id}`}>
                          {product.title}
                        </Link>
                      </h5>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <p className="font-bold text-2xl">${product.price}</p>
                      <div className="flex gap-2">
                        <button className="btn">Add to cart</button>
                        <button className="btn primary">
                          <Link to={`/product/${product.id}`}>Buy now</Link>
                        </button>
                      </div>
                    </div>
                  </>
                </div>
              ))}
            </>
          )}

          {/* erorr */}
          {error && <p className="text-danger">Error: {error}</p>}
        </div>

        {filteredProducts.length > visibleProductsCount && (
          <div className="flex justify-center mt-6">
            <button
              className="btn primary"
              onClick={() => setVisibleProductsCount(visibleProductsCount + 8)}>
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
