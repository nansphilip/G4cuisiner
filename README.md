# G4cuisiner

G4cuisiner is G4 School student project.

## Project installation (local)

- Make sure you already had installed:

  - Git
  - Node JS
  - PNPM
  - MySQL

- Install project dependencies

  ```bash
  pnpm install
  ```

- Creates a database user and a password

  ```sql
  CREATE USER 'g4cuisiner-user'@'localhost' IDENTIFIED BY 'g4cuisiner-password';
  ```

  - Allows user to connect to database

  ```sql
  GRANT ALL PRIVILEGES ON *.* TO 'g4cuisiner-user'@'localhost';
  ```

- Add an `.env` file at the root of the project, with the following variables

  - Database connection ([Prisma Docs](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-mysql))

  ```js
  DATABASE_URL=mysql://g4cuisiner-user:g4cuisiner-password@localhost:3306/g4cuisiner-db
  ```

  - Session secret ([Better Auth Docs](https://www.better-auth.com/docs/installation))

  ```js
  BETTER_AUTH_SECRET=session-encryption-key
  BETTER_AUTH_URL=http://localhost:3000
  ```

- Generate the Prisma client

  ```bash
  pnpx prisma generate
  ```

- Run Prisma database migrations

  ```bash
  pnpx prisma migrate dev --name initial-migration
  ```

- Insert fixtures provided in `/primsa/sql/fixtures.sql`

- Run server project

   ```bash
   pnpm run dev
   ```

- (optional)

    Clear your `localhost:3000` browser cookies is you have an error