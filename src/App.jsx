import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Orders from './components/Orders';
import { Toaster } from 'react-hot-toast';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCart();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/products', {
        params: { name: searchTerm },
      });
      setProducts(response.data);
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second delay
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const addProduct = async (product) => {
    try {
      const response = await axios.post('http://localhost:3000/products', product);
      setProducts([...products, response.data]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post('http://localhost:3000/cart', { productId, quantity: 1 });
      fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('http://localhost:3000/cart');
      fetchCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const placeOrder = async () => {
    try {
      await axios.post('http://localhost:3000/orders');
      fetchCart();
      fetchOrders();
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-rose-700 to-amber-400 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your Browser Does Not Support Background Video.
        </video>
        <div className="relative z-20">
          <header className="transparent p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">E-Commerce</h1>
              <div className="w-64">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full p-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>
            </div>
          </header>

          <div className="container mx-auto flex items-center justify-between px-4 py-20">
            <div className="max-w-lg">
              <span className="bg-rose-800 text-sm px-4 py-1 rounded-full mb-4 inline-block">Special Offers</span>
              <h2 className="text-5xl font-bold mb-6 leading-tight">Discover Amazing Products at <span className="text-teal-300">Unbeatable Prices</span></h2>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">Shop the latest trends and get exclusive deals today. Join thousands of satisfied customers and transform your shopping experience.</p>
              <div className="space-x-4 flex items-center">
                <button 
                  onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-rose-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 flex items-center"
                >
                  Shop Now
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-700 transition duration-300">
                  View Deals
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3" id="products-section">
            <ProductList products={products} addToCart={addToCart} loading={loading} />
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-rose-700">Add New Product</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target;
                  addProduct({
                    name: form.name.value,
                    category: form.category.value,
                    price: parseFloat(form.price.value),
                    image: form.image.value,
                  });
                  form.reset();
                }}
                className="space-y-4"
              >
                <input
                  name="name"
                  placeholder="Product Name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-700"
                />
                <input
                  name="category"
                  placeholder="Category"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-700"
                />
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-700"
                />
                <input
                  name="image"
                  placeholder="Image URL"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-700"
                />
                <button
                  type="submit"
                  className="w-full bg-rose-700 text-white p-3 rounded-lg hover:bg-rose-700 transition duration-300"
                >
                  Add Product
                </button>
              </form>
            </div>
          </div>

          <aside className="lg:col-span-1 sticky top-4 h-fit">
            <Cart cart={cart} products={products} clearCart={clearCart} placeOrder={placeOrder} />
            <Orders orders={orders} products={products} />
          </aside>
        </div>
      </main>
      <Toaster />
    </div>
  );
}

export default App;