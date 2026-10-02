/** Apply the same browser protections to SSR preview and Vercel responses. */
const HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  // Start hydration requires inline bootstrap scripts. No eval, objects, or foreign forms.
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://grok.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://grok.com https://og.grok.me; connect-src 'self' https://grok.com; frame-src https://grok.com; frame-ancestors 'self' https://grok.com https://*.grok.com; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests",
};
export default async function securityMiddleware(
  _event: unknown,
  next: () => unknown | Promise<unknown>,
) {
  const response = await next();
  if (!(response instanceof Response)) return response;
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(HEADERS)) headers.set(name, value);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
