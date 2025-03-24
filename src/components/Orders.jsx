import React from 'react';

const Orders = ({ orders, products }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-teal-700">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order.orderId} className="border-b py-2 last:border-b-0">
            <p className="font-semibold text-gray-800">Order #{order.orderId}</p>
            {order.items.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              return (
                <div key={item.productId} className="flex items-center text-sm text-gray-600">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-12 h-12 object-contain rounded mr-2"
                  />
                  <p>
                    {product?.name} - {item.quantity} x GHS {item.price.toFixed(2)} = GHS {(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              );
            })}
            <p className="font-bold text-teal-600 mt-2">Total: GHS {order.total.toFixed(2)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;