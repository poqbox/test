## Tech stack
- bcrypt
- jwt
- express
- mongoose

## Setup
1. Open a terminal of your choice, such as Git Bash, and navigate to the project's directory.
2. Install the project's dependencies by running `npm install`.
3. Create a `.env` file in the project's directory. Inside this file, create the .env variables listed in the following [section](#.env-variables).
4. Start a local instance by running `npx nodemon`.

## .env variables
`MONGO_URI`: A connection string to a MongoDB server/cluster\
`JWT_SECRET`: A string of characters that should not be shared

## How to use (with a local instance)
If using a local instance, use a URL's hostname of `localhost:3000` followed by one of the paths listed below.

### Paths
<details>
  <summary><code>`/api/signup`</code></summary>

  ---
  #### `POST` Creates a new user.
  - Request body
    > Accepts `{username, email, password}`
  - *Returns*
    > A web token
  ---
</details>
<details>
  <summary><code>`/api/signup`</code></summary>

  ---
  #### `POST` Signs in to a user account.
  - Request body
    > Accepts a valid `{email, password}`
  - *Returns*
    > A web token
  ---
</details>
<details>
  <summary><code>`/api/users`</code></summary>

  ---
  #### `GET` Gets a list of all user data.
  - *Returns*
    > A list of all user data
  ---
</details>
<details>
  <summary><code>`/api/users/:id`</code></summary>

  ---
  #### `GET` Gets the user data with the provided id if it matches the user id of the provided web token.
  - Route Parameters
    > `id`: An id that matches the id of the provided web token
  - Headers
    > `Authorization`: A web token
  - *Returns*
    > The user data with the provided id
  ---
</details>
