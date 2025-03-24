import React from 'react';
import toast from 'react-hot-toast';
import { ShimmerThumbnail } from 'react-shimmer-effects';

const ProductList = ({ products, addToCart, loading }) => {
  const handleAddToCart = (productId, productName) => {
    addToCart(productId);
    toast.success(`${productName} added to cart`, {
      duration: 3000,
      position: 'top-center',
      style: {
        background: '#0d9488',
        color: '#ffffff',
      },
    });
  };

  const [loadingStates, setLoadingStates] = React.useState({});

  const handleButtonClick = async (productId, productName) => {
    setLoadingStates(prev => ({ ...prev, [productId]: true }));
    await new Promise(resolve => setTimeout(resolve, 500));
    handleAddToCart(productId, productName);
    setLoadingStates(prev => ({ ...prev, [productId]: false }));
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <h2 className="text-3xl font-bold mb-8 text-teal-700 text-center">
        Our Featured Products
      </h2>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <ShimmerThumbnail key={index} height={350} width={300} rounded />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-lg mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-60 object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                  {product.category}
                </span>
              </div>
              <p className="text-xl font-bold text-teal-600 mb-3">
                GHS {product.price.toFixed(2)}
              </p>
              <button
                onClick={() => handleButtonClick(product.id, product.name)}
                disabled={loadingStates[product.id]}
                className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transform hover:scale-[1.02] transition-all duration-300 font-semibold"
              >
                {loadingStates[product.id] ? (
                  <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                ) : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;