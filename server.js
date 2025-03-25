import http from "node:http";
import url from "node:url";
import cors from "cors";

const products = [
  {
    "name": "ASHION Men's Varsity Jacket - Stylish, Comfortable, Durable with Free Necklace",
    "category": "Clothing",
    "price": 119,
    "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/65/8041191/1.jpg?5821",
    "id": 1
  },
  {
    "name": "Long Lace-Up Canvas Casual Shoes - Black/White",
    "category": "Footwear", 
    "price": 118,
    "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/57/8002911/1.jpg?6198",
    "id": 2
  },
  {
    "name": "Skeleton Dial Leather Quartz Wrist Watch - Brown/Gold",
    "category": "Accessory",
    "price": 37,
    "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/23/966346/1.jpg?3849",
    "id": 3
  },
  {
    "name": "Itel IT2165 - 1.8\" - Dual SIM - 32MB - 1000 mAh - Black +12 Month Warranty",
    "category": "Electronics",
    "price": 99,
    "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/93/0927972/1.jpg?1354",
    "id": 4
  },
  {
    "name": "Fragrance World Bad Lad Eau De Parfum Spray - 50ml - Black",
    "category": "Beauty",
    "price": 55,
    "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/15/802674/1.jpg?7656",
    "id": 5
  },
  {
    "name": "Nexon 32\" - Digital Satellite TV - USB - HDMI - Black.",
    "category": "Electronics",
    "price": 1250,
    "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/77/3401682/1.jpg?5666",
    "id": 6
  },
  {
    "name": "3 In 1 Multi Functional Backpack With USB Slot - Black",
    "category": "Accessory",
    "price": 79.99,
    "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/25/070892/1.jpg?1217",
    "id": 7
  },
  {
    "name": "Starlink Mini Kit - High Speed Internet Network - White",
    "category": "Electronics",
    "price": 3700,
    "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/88/7353482/1.jpg?0662",
    "id": 8
  },
  {
    "name": "AILYONS HD-198A-J Electric Dry Iron Box - 1000W - White & Blue",
    "category": "Appliances",
    "price": 85,
    "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/66/1112781/1.jpg?6697",
    "id": 9
  },
  {
    "name": "Catpapa 0-3Years Kid Boy Clothing Cactus Print Short Sleeves T-shirt with Shorts 2PCS",
    "category": "Clothing",
    "price": 106,
    "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/55/1985772/1.jpg?5095",
    "id": 10
  },
  {
    "name": "ASHION ASHION Martin Boots: Sleek, Durable, Stylish â Black",
    "category": "Footwear",
    "price": 163,
    "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/98/6818581/1.jpg?6270",
    "id": 11
  },
  {
    "name": "Evivi Perfumed Premium Rice - 5Kg",
    "category": "Grocery",
    "price": 129.98,
    "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/88/9815872/1.jpg?2624",
    "id": 12
  },
  {
    "name": "Westpool WP-708A Twin Tub Top Load Washing Machine - 7Kg - White",
    "category": "Electronics",
    "price": 1920,
    "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/30/7056121/2.jpg?6817",
    "id": 13
  },
  {
    "name": "Silver Crest Powerful Professional Heavy Duty Commercial Electric Blender",
    "category": "Home Applainces",
    "price": 245,
    "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/16/9424211/1.jpg?6831",
    "id": 14
  },
  {
    "name": "2.4G Rechargeable Ultra-thin Wireless Mouse - Black",
    "category": "Electronics",
    "price": 42,
    "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/62/011683/1.jpg?9374",
    "id": 15
  },
  {
    "name": "Samsung S24 Ultra Galaxy AI 256GB ROM + 12GB RAM - 50MP Rear/12MP Front - 5000MAH - Titanium Black +24 Months Warranty",
    "category": "Phones",
    "price": 19031,
    "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/37/3239112/1.jpg?7064",
    "id": 16
  },
  {
    "name": "Apple iPhone 11 - 6.1 - 128GB HDD - 4GB RAM - 12MP Rear/12MP Front - 3110 mAh - Sea Blue",
    "category": "IPhones",
    "price": 5549,
    "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/85/521924/1.jpg?8989",
    "id": 17
  },
  {
    "name": "K9 Double Wireless Phone Microphone / Lavalier for Android Type C and Iphone - Black",
    "category": "Musical Instruments",
    "price": 209,
    "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/36/5984931/1.jpg?7405",
    "id": 18
  },
  {
    "name": "15.6\" Laptop J4125 8GB+256GB SSD Student Portable Computer",
    "category": "Computing",
    "price": 3200,
    "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/39/6216352/1.jpg?1293",
    "id": 19
  },
  {
    "name": "Striped Short Sleeve Polo T-Shirt Set - 4 Pieces - Multicolour",
    "category": "Clothing",
    "price": 376.98,
    "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/89/252335/1.jpg?8777",
    "id": 20
  },
  {
    "name": "Nexon Energy Saving 1.5 HP - Split Air Conditioner - White",
    "category": "Electronics",
    "price": 3649,
    "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/52/1946362/1.jpg?5525",
    "id": 21
  }
  ,
    {
      "name": "Elbee Automatic Voltage Stabilizer – TAG3",
      "category": "Electronics",
      "price": 1622,
      "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/45/1648371/1.jpg?7867",
      "id": 22
    },
    {
      "name": "12 Cubes Plastic Wardrobe - Black/White", 
      "category": "Accessory",
      "price": 584.98,
      "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/54/61742/1.jpg?3351",
      "id": 23
    },
    {
      "name": "3Pcs Foldable Clothing Storage Bag - Black",
      "category": "Clothing", 
      "price": 149,
      "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/88/2900182/1.jpg?1806",
      "id": 24
    },
    {
      "name": "Wireless Keyboard & Mouse Combo - Black + Free BT Headphone",
      "category": "Computing",
      "price": 155,
      "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/24/613781/1.jpg?5064",
      "id": 25
    },
    {
      "name": "L88 TWS Bluetooth Air Pod Headphones - White",
      "category": "Electronics",
      "price": 153.4,
      "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/20/7465482/1.jpg?8985",
      "id": 26
    },
    {
      "name": "4G LTE Wifi 150Mbps Portable Mobile MiFi With SIM Card Slot - 2100mAh - White",
      "category": "Computing", 
      "price": 219,
      "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/23/833095/1.jpg?8436",
      "id": 27
    },
    {
      "name": "Neck Headphones - Black",
      "category": "Electronics",
      "price": 84.55,
      "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/32/7075651/1.jpg?9394",
      "id": 28
    },
    {
      "name": "Magnetic Wireless Power Bank Charger - White",
      "category": "Accessory",
      "price": 178.6,
      "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/88/1878761/1.jpg?3111",
      "id": 29
    },
    {
      "name": "5 in 2 Wireless USB Type C Hub Port Expansion Computer Multiple",
      "category": "Computing",
      "price": 105,
      "image": "https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/06/6532861/1.jpg?2503",
      "id": 30
    }
];
const cart = [];
const orders = [];

const corsMiddleware = cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE"],
});

const server = http.createServer((req, res) => {
  corsMiddleware(req, res, () => {
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