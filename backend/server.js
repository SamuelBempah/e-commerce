import http from "node:http";
import url from "node:url";
import cors from "cors";

const products = [];
const cart = [];
const orders = [];

// Simple CORS middleware
const corsMiddleware = cors({
  origin: "http://localhost:5173", // Allow Vite's default port
  methods: ["GET", "POST", "DELETE"],
});

const server = http.createServer((req, res) => {
  corsMiddleware(req, res, () => { // Apply CORS middleware
    res.setHeader("Content-Type", "application/json");
    if (req.url.startsWith("/products") && req.method === "GET") {
      const parsedURL = url.parse(req.url, true);
      const query = parsedURL.query;

      let filteredProducts = [...products];
      if (query.name) {
        filteredProducts = filteredProducts.filter((p) =>
          p.name.toLowerCase().includes(query.name.toLowerCase())
        );
      }
      if (query.category) {
        filteredProducts = filteredProducts.filter((p) =>
          p.category.toLowerCase().includes(query.category.toLowerCase())
        );
      }
      res.writeHead(200);
      res.end(JSON.stringify(filteredProducts));
    } else if (req.url === "/products" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        const newProduct = JSON.parse(body);
        newProduct.id = products.length + 1;
        products.push(newProduct);
        res.writeHead(201);
        res.end(JSON.stringify(newProduct));
      });
    } else if (req.url === "/cart" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        const item = JSON.parse(body);
        const product = products.find((p) => p.id === item.productId);

        if (!product) {
          res.writeHead(404);
          res.end(JSON.stringify({ message: "Product Not Found" }));
          return;
        }

        const cartItem = cart.find((c) => c.productId === item.productId);
        if (cartItem) {
          cartItem.quantity += item.quantity;
        } else {
          cart.push({ productId: item.productId, quantity: item.quantity });
        }
        res.writeHead(201);
        res.end(JSON.stringify(cart));
      });
    } else if (req.url === "/cart" && req.method === "GET") {
      res.writeHead(200);
      res.end(JSON.stringify(cart));
    } else if (req.url === "/cart" && req.method === "DELETE") {
      cart.length = 0;
      res.writeHead(200);
      res.end(JSON.stringify({ message: "cart cleared" }));
    } else if (req.url === "/orders" && req.method === "POST") {
      if (cart.length === 0) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: "Cart is Empty" }));
        return;
      }
      const orderItems = cart.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        };
      });

      const total = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const order = { orderId: orders.length + 1, items: orderItems, total };
      orders.push(order);
      cart.length = 0;
      res.writeHead(201);
      res.end(JSON.stringify(order));
    } else if (req.url === "/orders" && req.method === "GET") {
      res.writeHead(200);
      res.end(JSON.stringify(orders));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ message: "Route Not Found" }));
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`App running on port ${PORT}`));