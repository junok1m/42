export default {
    async fetch(request: Request) {
      try {
        const url = new URL(request.url);
        const path = url.searchParams.get("path");
  
        if (!path) {
          return Response.json(
            { error: "Missing path parameter" },
            { status: 400 }
          );
        }
  
        url.searchParams.delete("path");
  
        const cleanPath = path.replace(/^\/+/, "");
        const queryString = url.searchParams.toString();
  
        const targetUrl =
          `https://42g.au/api/${cleanPath}` +
          (queryString ? `?${queryString}` : "");
  
        const response = await fetch(targetUrl, {
          method: request.method,
          headers: {
            accept:
              request.headers.get("accept") ??
              "application/json",
            "content-type":
              request.headers.get("content-type") ??
              "application/json",
          },
          body:
            request.method === "GET" ||
            request.method === "HEAD"
              ? undefined
              : request.body,
        });
  
        return new Response(response.body, {
          status: response.status,
          headers: {
            "content-type":
              response.headers.get("content-type") ??
              "application/json",
          },
        });
      } catch (error) {
        return Response.json(
          {
            error: "Proxy failed",
            message:
              error instanceof Error
                ? error.message
                : String(error),
          },
          { status: 500 }
        );
      }
    },
  };