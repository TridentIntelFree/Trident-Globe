// ═══════════════════════════════════════════════════════════════════════════════
// WORLDVIEW — Cloudflare Worker Proxy for Grok API
// ═══════════════════════════════════════════════════════════════════════════════
//
// This worker sits between your GitHub Pages site and the xAI Grok API.
// Your API key (GROKGLOBE) is stored as a Cloudflare Worker secret —
// it never touches the browser.
//
// SETUP:
// 1. Create a Cloudflare account (free) at https://dash.cloudflare.com
// 2. Go to Workers & Pages → Create Worker
// 3. Paste this code and deploy
// 4. Go to Worker Settings → Variables → add secret:
//    Name: GROKGLOBE
//    Value: your xAI API key (xai-…)
// 5. Copy your worker URL (e.g. https://worldview-grok.your-subdomain.workers.dev)
// 6. Paste that URL into WorldView’s ⚙ Settings → Worker URL
//
// ═══════════════════════════════════════════════════════════════════════════════

export default {
async fetch(request, env) {

```
// ── CORS headers (allow your GitHub Pages site) ──
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',  // Lock this down to your GitHub Pages URL in production
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

// Handle preflight
if (request.method === 'OPTIONS') {
  return new Response(null, { status: 204, headers: corsHeaders });
}

// Only allow POST
if (request.method !== 'POST') {
  return new Response(JSON.stringify({ error: { message: 'Method not allowed' } }), {
    status: 405,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// Check that the secret exists
if (!env.GROKGLOBE) {
  return new Response(JSON.stringify({ error: { message: 'GROKGLOBE secret not configured on worker' } }), {
    status: 500,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

try {
  // Read the request body from the frontend
  const body = await request.json();

  // Forward to xAI Grok API with the secret key
  const grokResponse = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.GROKGLOBE}`,
    },
    body: JSON.stringify(body),
  });

  const data = await grokResponse.json();

  return new Response(JSON.stringify(data), {
    status: grokResponse.status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

} catch (err) {
  return new Response(JSON.stringify({ error: { message: err.message || 'Worker error' } }), {
    status: 500,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
```

},
};
