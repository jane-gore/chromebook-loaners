export async function onRequest(context) {
  try {
    const { request, env } = context;

    if (!env.APP_DATA) {
      return new Response(
        JSON.stringify({
          error: "APP_DATA binding not found"
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        kv_available: true
      }),
      {
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err.toString(),
        stack: err.stack
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
