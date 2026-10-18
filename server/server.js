import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import { randomUUID, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";
import initialFoods from "../src/data/foodData.js";

const app = express();
const port = Number(process.env.PORT) || 4000;
const serverDir = path.dirname(fileURLToPath(import.meta.url));
const ordersFile = path.join(serverDir, "orders.json");
const foodsFile = path.join(serverDir, "foods.json");
const usersFile = path.join(serverDir, "users.json");
const scrypt = promisify(scryptCallback);
const jwtSecret = process.env.JWT_SECRET || "foodie-demo-secret-change-before-deploy";
let foods = [...initialFoods];

try { foods = JSON.parse(await readFile(foodsFile, "utf8")); }
catch (error) { if (error.code !== "ENOENT") throw error; }

const configuredOrigins = (process.env.FRONTEND_ORIGIN || "").split(",").map((origin) => origin.trim()).filter(Boolean);
app.use(cors({
  origin(origin, callback) {
    // Allow Vite on localhost or 127.0.0.1 during local development. For a
    // deployed app, set FRONTEND_ORIGIN to the exact frontend origin(s).
    const localDevOrigin = /^http:\/\/(localhost|127\.0\.0\.1|\[::1\]):\d+$/.test(origin || "");
    if (!origin || localDevOrigin || configuredOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("This website origin is not allowed by the API."));
  },
}));
app.use(express.json());

async function readOrders() {
  try { return JSON.parse(await readFile(ordersFile, "utf8")); }
  catch (error) { if (error.code === "ENOENT") return []; throw error; }
}

async function readUsers() {
  try { return JSON.parse(await readFile(usersFile, "utf8")); }
  catch (error) { if (error.code === "ENOENT") return []; throw error; }
}

async function hashPassword(password, salt = randomUUID()) {
  const key = await scrypt(password, salt, 64);
  return `${salt}:${key.toString("hex")}`;
}

async function passwordMatches(password, savedHash) {
  const [salt, expectedHex] = savedHash.split(":");
  const expected = Buffer.from(expectedHex, "hex");
  const actual = await scrypt(password, salt, expected.length);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function authenticate(req, res, next) {
  const token = req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Please log in to continue." });
  try { req.user = jwt.verify(token, jwtSecret); next(); }
  catch { return res.status(401).json({ message: "Your session expired. Please log in again." }); }
}

app.post("/api/auth/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body ?? {};
    const normalizedEmail = String(email || "").trim().toLowerCase();
    if (!name?.trim()) return res.status(400).json({ message: "Please enter your name." });
    if (!/^[^\s@]+@gmail\.com$/.test(normalizedEmail)) return res.status(400).json({ message: "Please sign up with a Gmail address ending in @gmail.com." });
    if (typeof password !== "string" || password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters." });
    const users = await readUsers();
    if (users.some((user) => user.email === normalizedEmail)) return res.status(409).json({ message: "An account already exists for this Gmail address. Please log in instead." });

    const user = { id: randomUUID(), name: name.trim(), email: normalizedEmail, passwordHash: await hashPassword(password) };
    users.push(user);
    await writeFile(usersFile, `${JSON.stringify(users, null, 2)}\n`, "utf8");
    const publicUser = { id: user.id, name: user.name, email: user.email };
    const token = jwt.sign(publicUser, jwtSecret, { expiresIn: "2h" });
    return res.status(201).json({ token, user: publicUser });
  } catch (error) { return next(error); }
});

app.post("/api/auth/login", async (req, res, next) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const password = req.body?.password;
    if (!/^[^\s@]+@gmail\.com$/.test(email)) return res.status(400).json({ message: "Please log in with your Gmail address." });
    const user = (await readUsers()).find((entry) => entry.email === email);
    if (!user || typeof password !== "string" || !(await passwordMatches(password, user.passwordHash))) {
      return res.status(401).json({ message: "Gmail address or password is incorrect. If you are new, create an account first." });
    }
    const publicUser = { id: user.id, name: user.name, email: user.email };
    const token = jwt.sign(publicUser, jwtSecret, { expiresIn: "2h" });
    return res.json({ token, user: publicUser });
  } catch (error) { return next(error); }
});

app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "food-ordering-api" }));
app.get("/api/foods", (_req, res) => res.json(foods));

app.post("/api/foods", authenticate, async (req, res, next) => {
  try {
    const { name, category, price, rating, image, description } = req.body ?? {};
    if (!name?.trim() || !category?.trim() || !Number.isFinite(Number(price)) || Number(price) <= 0) {
      return res.status(400).json({ message: "Name, category, and a price above zero are required." });
    }
    const food = { id: Date.now(), name: name.trim(), category: category.trim(), price: Number(price), rating: Number(rating) || 4.5, image: image?.trim() || "https://placehold.co/600x400?text=Food", description: description?.trim() || "Freshly prepared and full of flavour." };
    foods.push(food);
    await writeFile(foodsFile, `${JSON.stringify(foods, null, 2)}\n`, "utf8");
    return res.status(201).json(food);
  } catch (error) { return next(error); }
});

app.put("/api/foods/:id", authenticate, async (req, res, next) => {
  try {
    const index = foods.findIndex((food) => food.id === Number(req.params.id));
    if (index < 0) return res.status(404).json({ message: "Food item not found." });
    const { name, category, price, rating, image, description } = req.body ?? {};
    if (!name?.trim() || !category?.trim() || !Number.isFinite(Number(price)) || Number(price) <= 0) {
      return res.status(400).json({ message: "Name, category, and a price above zero are required." });
    }
    foods[index] = { ...foods[index], name: name.trim(), category: category.trim(), price: Number(price), rating: Number(rating) || foods[index].rating, image: image?.trim() || foods[index].image, description: description?.trim() || "Freshly prepared and full of flavour." };
    await writeFile(foodsFile, `${JSON.stringify(foods, null, 2)}\n`, "utf8");
    return res.json(foods[index]);
  } catch (error) { return next(error); }
});

app.delete("/api/foods/:id", authenticate, async (req, res, next) => {
  try {
    const remaining = foods.filter((food) => food.id !== Number(req.params.id));
    if (remaining.length === foods.length) return res.status(404).json({ message: "Food item not found." });
    foods = remaining;
    await writeFile(foodsFile, `${JSON.stringify(foods, null, 2)}\n`, "utf8");
    return res.status(204).end();
  } catch (error) { return next(error); }
});

app.post("/api/orders", authenticate, async (req, res, next) => {
  try {
    const { customer, items } = req.body ?? {};
    const required = ["name", "phone", "address", "city", "pincode", "payment"];
    if (!customer || required.some((field) => !String(customer[field] ?? "").trim())) {
      return res.status(400).json({ message: "Please provide all delivery and payment details." });
    }
    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: "Your cart is empty." });
    const orderItems = items.map(({ foodId, quantity }) => {
      const food = foods.find((entry) => entry.id === Number(foodId));
      const count = Number(quantity);
      if (!food || !Number.isInteger(count) || count < 1 || count > 50) return null;
      return { foodId: food.id, name: food.name, price: food.price, quantity: count };
    });
    if (orderItems.some((item) => item === null)) return res.status(400).json({ message: "One or more cart items are invalid." });
    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.05);
    const deliveryFee = subtotal >= 499 ? 0 : 49;
    const order = { id: randomUUID(), userId: req.user.id, customer: Object.fromEntries(required.map((field) => [field, String(customer[field]).trim()])), items: orderItems, subtotal, tax, deliveryFee, total: subtotal + tax + deliveryFee, createdAt: new Date().toISOString() };
    const orders = await readOrders();
    orders.push(order);
    await writeFile(ordersFile, `${JSON.stringify(orders, null, 2)}\n`, "utf8");
    return res.status(201).json(order);
  } catch (error) { return next(error); }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "The server could not complete your request." });
});

app.listen(port, () => console.log(`Food API listening at http://localhost:${port}`));
