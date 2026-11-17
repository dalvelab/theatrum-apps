/**
 * Server-side fetch to Strapi with the app's API token.
 *
 * Corporate collections are closed for the Strapi Public role, so every
 * request from this app must carry `STRAPI_API_TOKEN`. Never import this
 * from client code: the token must stay on the server.
 */
export function strapiFetch(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  const token = process.env.STRAPI_API_TOKEN;

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(`${process.env.DB_HOST}${path}`, { ...init, headers });
}
