export const apiBase =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3001"
    : "https://api.anayak.com.np";
