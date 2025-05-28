## Keeping the relevant auto generated content of the md file as is.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

The Mongo DB server used in this application has access to all the ipv4 addresses for 1 week starting 28th May, so you should be able to run this code in local.

Features implemented in this app:
    1. Register/ Login functionality. We have custom routes for both.
    2. Authentication is taken care of by Next JS library.
    3. Once logged in user can see the dashboard which displays the TODO tasks in a tabular format.
    4. The Add button opens a popup to add a new task
    5. User won't be able to set the status as completed when creating a new task.
    6. The Edit button in the table allows to edit the particular TODO, user can now update the status to complete.
    7. The delete button deletes the task.
    8. Note: User has to manually log out from then portal.( The session doesn't expire automatically.)
    9. Already registerd users: sarthak/sarthak1, sarthak1/sarthak2

Bonus features implemented:
    1. User is able to mark the task as complete.
    2. Application is deployed on vercel. URL: "https://nextjs-assignment-mocha.vercel.app/" (It'll be accessible for 1 week starting 28th May).