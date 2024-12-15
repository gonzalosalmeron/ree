## 📋 Table of Contents

- [What is REE?](#-what-is-ree-visit-here)
- [Project Structure](#-project-structure)
- [Using the App](#-using-the-app)
- [Platforms](#-platforms)
- [Technologies Used](#-technologies-used)

## 👀 What is REE? [Visit here](https://ree.gonzalosalmeron.es)

REE is a web application designed to provide an interactive dashboard showcasing real-time and historical energy data, focusing on CO2 emissions and electricity generation.

Users can register with an email and password to access the platform. Once logged in, they can explore detailed visualizations of energy-related metrics, including charts, tables, and structured data representations.

The application is optimized for performance, ensuring data loads efficiently on demand. This project is designed for testing and demostration purposes, providing insights into the energy sector without relying on location-based services.

## 📂 Project Structure

Linters like ESLint and Prettier have been implemented.

Although it was not a requirement, implementing linters like ESLint and Prettier is essential. They ensure code quality and consistency, identifying errors and style issues in real-time.

```text
ree/
├── .vscode/
├── cypress/             <- unit tests
├── prisma/              <- db connection
├── public
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── libs/            <- includes utils for the app
│   └── middleware.ts
├── tests/ <- e2e tests
├── package.json
└── README.md
└── ...
```

## 🎮 Using the App

Clone the project:

```
git clone https://github.com/gonzalosalmeron/ree.git
```

Install dependencies:

```
npm i
```

Duplicate the .env.example file and fill it with your data.

Predefined commands:

```
- npm run dev            <- start the development server
- npm run build          <- compile the project
- npm run start          <- start the server with the build data
- npm run lint           <- run the linter with the predefined config
- npm run cypress:open   <- open Cypress visually
- npm run test:e2e       <- open Playwright visually
```

Test user

```
email: => prueba@prueba.com
password: => 1234
```

## 📱 Platforms

Desktop and mobile, with a responsive design that ensures seamless usability across various screen sizes.

## 🤖 Technologies Used

<a href="https://nextjs.org/">
    <img src="https://upload.wikimedia.org/wikipedia/commons/archive/8/8e/20230404233502%21Nextjs-logo.svg" width="120" height="100" style="object-fit: contain">
</a>
<a href="https://react.dev/">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGmKtrnxElpqw3AExKXPWWBulcwjlvDJa1Q&s" width="100" height="100" style="object-fit: cover">
</a>
<a href="https://tailwindcss.com/">
    <img src="https://www.solucionex.com/sites/default/files/posts/imagen/tailwindcss-1633184775.jpeg" width="200" height="100" style="object-fit: cover">
</a>
<a href="https://www.cypress.io/">
    <img src="https://www.cypress.io/_astro/navbar-brand.D87396b0.svg" width="140" height="100" style="object-fit: contain">
</a>
<a href="https://playwright.dev/">
    <img src="https://playwright.dev/img/playwright-logo.svg" width="100" height="100" style="object-fit: contain">
</a>
<a href="https://www.prisma.io/">
    <img src="https://prismalens.vercel.app/header/logo-white.svg" width="140" height="100" style="object-fit: contain">
</a>
<a href="https://zod.dev/">
    <img src="https://zod.dev/logo.svg" width="100" height="100" style="object-fit: contain">
</a>
<a href="https://authjs.dev/">
    <img src="https://authjs.dev/img/etc/logo-sm.webp" width="100" height="100" style="object-fit: contain">
</a>
<a href="https://supabase.com/">
    <img src="https://supabase.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsupabase-logo-wordmark--dark.b36ebb5f.png&w=256&q=75" width="200" height="90" style="object-fit: contain">
</a>
