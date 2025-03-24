import React from 'react';
import toast from 'react-hot-toast';

const Cart = ({ cart, products, clearCart, placeOrder }) => {
  const getTotal = () => {
    return cart.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + (product?.price * item.quantity || 0);
    }, 0);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared', {
      duration: 3000,
      position: 'top-center',
      style: { background: '#0d9488', color: '#ffffff' },
    });
  };

  const handlePlaceOrder = () => {
    placeOrder();
    toast.success('Order placed successfully', {
      duration: 3000,
      position: 'top-center',
      style: { background: '#0d9488', color: '#ffffff' },
    });
  };

  const [loadingStates, setLoadingStates] = React.useState({
    clearCart: false,
    placeOrder: false,
  });

  const handleButtonClick = async (action) => {
    setLoadingStates(prev => ({ ...prev, [action]: true }));
    await new Promise(resolve => setTimeout(resolve, 500));
    if (action === 'clearCart') {
      handleClearCart();
    } else {
      handlePlaceOrder();
    }
    setLoadingStates(prev => ({ ...prev, [action]: false }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4 text-teal-700">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return (
              <div key={item.productId} className="border-b py-2 flex items-center">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-16 h-16 object-contain rounded mr-2"
                />
                <div>
                  <p className="text-gray-800">{product?.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} x GHS {product?.price.toFixed(2)} = GHS {(product?.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
          <p className="font-bold text-lg mt-4">Total: GHS {getTotal().toFixed(2)}</p>
          <div className="mt-4 space-y-2">
            <button
              onClick={() => handleButtonClick('clearCart')}
              disabled={loadingStates.clearCart}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              {loadingStates.clearCart ? (
                <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : 'Clear Cart'}
            </button>
            <button
              onClick={() => handleButtonClick('placeOrder')}
              disabled={loadingStates.placeOrder}
              className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-300"
            >
              {loadingStates.placeOrder ? (
                <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : 'Place Order'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;