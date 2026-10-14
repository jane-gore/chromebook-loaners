export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === "POST") {
    const { key, encryptedData } = await request.json();

    await env.APP_DATA.put(
      key,
      JSON.stringify(encryptedData)
    );

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  if (request.method === "GET") {
    const url = new URL(request.url);
    const key = url.searchParams.get("key");

    const encryptedData =
      await env.APP_DATA.get(key);

    return new Response(
      encryptedData || "null",
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  return new Response("Method Not Allowed", {
    status: 405
  });
}
