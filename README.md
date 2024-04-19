# Ecommerce Store
  
## Getting Started

Run the project using the following steps:

- Copy file with environment variables and fill necessary one

```sh
cp .env.sample .env.local
```

- Visit [Stripe Website](https://dashboard.stripe.com/webhooks/create?endpoint_location=local) and generate `STRIPE_WEBHOOK_SECRET`:
  
```sh
stripe listen --forward-to localhost:3000/webhooks/stripe
```

- Install all dependencies

```sh
pnpm i
```

- Start the server

```sh
pnpm run dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- Start the server for Email development

```sh
pnpm run email:dev
```

- Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.
  
- Start stripe webhook listener

```sh
pnpm run webhook:dev
```

## Technologies Used

- **React.js:** A popular JavaScript library for building user interfaces.
- **TypeScript:** A typed superset of JavaScript that enhances code maintainability and scalability.
- **Next.js:** A React framework that enables server-side rendering, static site generation, and other optimizations for efficient web development.
- **TailwindCSS:** A utility-first CSS framework that simplifies styling by offering a wide range of pre-defined utility classes.
- **Stripe:** A payment processing platform that enables businesses to accept payments online securely and easily manage transactions and subscriptions.
