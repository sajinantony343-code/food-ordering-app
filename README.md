# Foodie ordering app

## Run the frontend and backend in two terminals

Install dependencies once from the `my-react-app` folder:

```powershell
npm install
npm --prefix server install
```

Terminal 1 — backend API:

```powershell
cd food\my-react-app
npm --prefix server run dev
```

Terminal 2 — React frontend:

```powershell
cd food\my-react-app
npm run dev
```

Open the Vite URL shown in Terminal 2 (usually `http://localhost:5173`). The API runs at `http://localhost:4000`; check `http://localhost:4000/api/health` to confirm it is running. Menu data comes from `GET /api/foods`. Checkout creates an order with `POST /api/orders`; saved orders are written to `server/orders.json`.

The frontend uses Axios. Set `VITE_API_URL` in a `.env` file if the API is hosted at a different URL.

## Experiments 2–4

- Redux Toolkit stores foods, cart items, and auth state. Cart middleware syncs items to `localStorage` and logs cart actions. Cart subtotal, 5% tax, delivery, and total are derived selectors.
- Food CRUD is available at `/admin/foods` after login. The API supports `GET /api/foods` and authenticated `POST`, `PUT`, and `DELETE` routes. Changes are saved in `server/foods.json`.
- Login and Gmail-only sign-up are available at `/login` and `/signup`. Each Gmail address may register once; the server rejects duplicates and stores salted password hashes in `server/users.json`. The API returns a two-hour JWT; Axios attaches it to requests and handles expired-token responses. The signed-in session bar has **View token** and **Copy token** controls. Cart, checkout, food management, and order creation require login.
- For deployment, set a private `JWT_SECRET`. The local default signing key is only for coursework demonstrations.

## Testing (Experiment 1)

Run the Jest and React Testing Library component suite with:

```powershell
npm test
```

The tests cover food details, food-list empty/rendered states, category and text filtering, add-to-cart, and remove-from-cart interactions.

## Production deployment (Experiment 3)

Build locally with `npm run build`; the production site is generated in `dist/`. Deploy the **frontend** to GitHub Pages, Netlify, or Vercel. The Express backend must also be deployed to a server that supports Node.js and persistent storage; set `VITE_API_URL` to that public API's `/api` base URL and configure the backend's `FRONTEND_ORIGIN` and `JWT_SECRET` for the deployed site. The default `localhost` API URL only works for local demos.

- **GitHub Pages:** push this project to a GitHub repository on `main` or `master`; enable GitHub Actions as the Pages source. The workflow at `.github/workflows/deploy-github-pages.yml` builds and deploys on each push. Add a repository variable named `VITE_API_URL` before deploying. Vite derives the repository base path automatically for Pages.
- **Netlify:** import the repository in Netlify. It reads `netlify.toml` (`npm run build:netlify`, publish directory `dist`) and includes the SPA route fallback. Add `VITE_API_URL` in the site's environment variables.
- **Vercel:** import the repository in Vercel. It reads `vercel.json` and uses `npm run build:vercel`; add `VITE_API_URL` in Project Settings → Environment Variables.

The client includes a basic installable PWA shell and offline navigation fallback. The service worker intentionally skips API requests so it does not cache authentication or order responses.
