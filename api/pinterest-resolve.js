const SOURCE = 'https://pin.it/44q5RBLH4';
function isAllowed(url) {
  return url.protocol === 'https:' &&
    (url.hostname === 'pin.it' || url.hostname === 'www.pin.it' || url.hostname === 'pinterest.com' || url.hostname.endsWith('.pinterest.com'));
}
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  res.setHeader('Cache-Control', 'no-store');
  let current = SOURCE;
  try {
    for (let step = 0; step < 7; step++) {
      const url = new URL(current);
      if (!isAllowed(url)) return res.status(422).json({ error: 'Redirect leaves Pinterest' });
      const response = await fetch(current, {
        method: 'GET',
        redirect: 'manual',
        signal: AbortSignal.timeout(8000),
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; KhanyiInMotion/1.0)', 'Accept': 'text/html,*/*' }
      });
      const location = response.headers.get('location');
      if (location && response.status >= 300 && response.status < 400) {
        const next = new URL(location, current);
        if (!isAllowed(next)) return res.status(422).json({ error: 'Redirect outside Pinterest' });
        current = next.href;
        continue;
      }
      const landing = new URL(current);
      const path = landing.pathname.split('/').filter(Boolean);
      const type = landing.hostname.endsWith('pinterest.com') && path.length === 1 ? 'profile' :
                   landing.hostname.endsWith('pinterest.com') && path.length > 1 && path[0] === 'pin' ? 'pin' :
                   landing.hostname.endsWith('pinterest.com') && path.length >= 2 ? 'board_or_page' : 'unresolved';
      return res.status(200).json({ type, url: landing.origin + landing.pathname, upstream_status: response.status });
    }
    return res.status(422).json({ error: 'Too many redirects' });
  } catch (error) {
    return res.status(502).json({ error: 'Unable to resolve Pinterest sharing link', detail: String(error && error.message || error) });
  }
}