# Authentication demo

This project contains a simple React login and registration flow backed by JSON Server.

## Run locally

Start the API and frontend in separate terminals:

```sh
npm run server
npm run dev
```

The API is available at `http://localhost:3001`. Set `VITE_AUTH_API_URL` to override
the API base URL.

This is a local demo, not production authentication. JSON Server stores passwords
in plain text and the browser session is not a secure credential or token.
