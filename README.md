# Concurrent Workers

This is an example client-worker project where the client can create workers with a predefined concurrency, submit jobs and then run workers. This project aims to demonstrate the concept, therefore the jobs are just timeouts and involve no business logic.

## Tech Stack

The project is a monolithic Next.js application:

- React frontend
- tRPC backend
- Prisma ORM
- PostgreSQL database
- Deployed on Vercel

## Local Development

You will need a `.env` file for the database credentials.

```
Clone the repo
git clone https://github.com/kerem-kaynak/concurrent-workers

Install dependencies
npm install

Build project
npm run build

Run project locally
npm run dev

Reset & seed the database
npx prisma migrate reset
```

## Live Demo (currently down)

There's a live demo of the project [here](https://concurrent-workers.vercel.app). Note that the project has no authentication / user sessions, therefore your changes are visible to all other viewers of the project :)
