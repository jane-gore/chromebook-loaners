// functions/api.js
export async function onRequestPost(context) {
  const { request, env } = context;
  const { key, encryptedData } = await request.json();

  if (!key || !encryptedData) {
    return new Response(JSON.stringify({ error: "Missing key or data" }), { status: 400 });
  }

  await env.APP_DATA.put(key, JSON.stringify(encryptedData));
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const key = url.searchParams.get("key");

  if (!key) {
    return new Response(JSON.stringify({ error: "Missing key parameter" }), { status: 400 });
  }

  const encryptedData = await env.APP_DATA.get(key);
  return new Response(encryptedData || JSON.stringify(null), { status: 200 });
}