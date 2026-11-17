/**
 * Returns a same-origin path from `callbackUrl`, or "/" if it is missing
 * or points elsewhere. Only relative paths are accepted ("/archive"), so the
 * login page can't be used as an open redirect ("//evil.com", "https://…").
 */
export function safeCallbackUrl(value: unknown): string {
  const url = Array.isArray(value) ? value[0] : value;

  if (typeof url !== "string" || !url.startsWith("/") || url.startsWith("//")) {
    return "/";
  }

  // "/\evil.com" is treated by browsers as "//evil.com".
  if (url.includes("\\")) {
    return "/";
  }

  return url;
}
