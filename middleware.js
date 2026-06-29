export default function middleware(request) {
  const username = process.env.SITE_USERNAME || "charlie";
  const password = process.env.SITE_PASSWORD;

  if (!password) {
    return new Response("Missing SITE_PASSWORD environment variable", {
      status: 500,
    });
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    const encoded = authHeader.split(" ")[1] || "";
    const decoded = atob(encoded);
    const [user, pass] = decoded.split(":");

    if (user === username && pass === password) {
      return;
    }
  }

  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Protected Site"',
    },
  });
}

export const config = {
  matcher: "/(.*)",
};