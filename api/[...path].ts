import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const path = Array.isArray(req.query.path)
      ? req.query.path.join("/")
      : req.query.path;

    if (!path) {
      return res.status(400).json({
        error: "Missing API path",
      });
    }

    const query = new URLSearchParams();

    for (const [key, value] of Object.entries(req.query)) {
      if (key === "path" || value === undefined) continue;

      if (Array.isArray(value)) {
        value.forEach((item) => query.append(key, item));
      } else {
        query.append(key, value);
      }
    }

    const queryString = query.toString();

    const targetUrl =
      `https://42g.au/api/${path}` +
      (queryString ? `?${queryString}` : "");

    const upstream = await fetch(targetUrl, {
      method: req.method,
      headers: {
        accept: req.headers.accept ?? "application/json",
        "content-type":
          req.headers["content-type"] ?? "application/json",
      },
      body:
        req.method === "GET" || req.method === "HEAD"
          ? undefined
          : JSON.stringify(req.body),
      redirect: "follow",
    });

    const body = await upstream.arrayBuffer();

    res.status(upstream.status);

    const contentType = upstream.headers.get("content-type");

    if (contentType) {
      res.setHeader("content-type", contentType);
    }

    return res.send(Buffer.from(body));
  } catch (error) {
    console.error("API proxy failed:", error);

    return res.status(500).json({
      error: "API proxy failed",
      message: error instanceof Error ? error.message : String(error),
    });
  }
}