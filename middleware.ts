/* ============================================================
   ZUGANGSSCHUTZ — brandbook.bridgemaker.com
   Vercel Routing Middleware (läuft vor dem Cache, auf jedem
   Request, auch auf den *.vercel.app-Domains und Previews).

   Login mit Google, nur für Konten von bridgemaker.com
   (Wunsch Nils, 08.10.: Passwort gestrichen). Ablauf:
   /auth/login → Google (hd=bridgemaker.com) → /auth/callback
   tauscht den Code serverseitig gegen das ID-Token, prüft
   Aussteller, Client, Ablauf, verifizierte Mail UND die Domain
   (hd-Claim + Mail-Endung — der hd-Parameter im Link allein
   ist nur ein Hinweis an Google, kein Schutz). Erst dann setzt
   die Middleware ein HMAC-signiertes Session-Cookie (30 Tage).
   /auth/logout löscht es.

   Konfiguration nur über Vercel-Umgebungsvariablen, nie im Repo:
   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET (OAuth-Client vom Typ
   „Webanwendung", Zielgruppe „Intern", Redirect-URI
   <origin>/auth/callback) und AUTH_SECRET (Zufallswert, signiert
   die Cookies; neu setzen = alle abmelden). Fehlt eine davon,
   bleibt alles zu — sicher geschlossen statt offen. Der Login
   funktioniert nur auf Origins, deren Callback im Google-Client
   eingetragen ist (brandbook.bridgemaker.com).

   Die Login-Seite ist der einzige öffentliche Teil: kein
   Google-Fonts-Aufruf (DSGVO), kein tokens.css (läge sonst vor
   dem Schutz offen). Inter kommt aus /assets/fonts/ — der
   Matcher nimmt genau diesen Ordner vom Schutz aus (Fonts sind
   OFL-lizenziert, nichts Vertrauliches). Wortmarke inline als
   SVG — nie als getippter Text.

   Der Wortmarken-SVG-Block wird maschinell aus
   assets/logos/wordmark-black.svg eingespleißt (Marker unten).
   ============================================================ */

export const config = { matcher: '/((?!assets/fonts/).*)' };

const DOMAIN = 'bridgemaker.com';
const SESSION = 'bb_session';
const STATE = 'bb_oauth';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 Tage
const STATE_AGE = 60 * 10; // 10 Minuten für den Weg über Google

const WORDMARK = `<svg class="wordmark" role="img" aria-label="Bridgemaker" width="386" height="48" viewBox="0 0 386 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_936_89)">
<path d="M12.2987 1.27783C19.1584 1.27783 23.2271 5.36728 23.2271 11.0414C23.2724 12.7448 22.7843 14.4191 21.8329 15.8241C20.8815 17.2291 19.5156 18.2927 17.931 18.8625C19.805 19.3567 21.4585 20.4799 22.6218 22.0488C23.7851 23.6177 24.3897 25.5397 24.3367 27.5015C24.3367 33.329 19.8981 37.5207 13.2402 37.5207H0V1.27783H12.2987ZM11.458 16.6133C14.9887 16.6133 17.1072 14.5686 17.1072 11.5526C17.1072 8.53662 14.9887 6.49189 11.3067 6.49189H5.9602V16.6133H11.458ZM12.1137 32.3066C15.7453 32.3066 18.1159 30.313 18.1159 27.0925C18.1159 23.8721 16.048 21.7762 12.3155 21.7762H5.9602V32.2981L12.1137 32.3066Z" fill="black"></path>
<path d="M42.9233 18.5047C42.2892 18.4049 41.6485 18.3536 41.0067 18.3514C36.4672 18.3514 34.3992 21.0095 34.3992 25.6613V37.5207H28.5146V12.6262H34.2142V16.6134C35.3743 13.9041 38.098 12.3535 41.3261 12.3535C41.8509 12.3551 42.3744 12.4064 42.8897 12.5069L42.9233 18.5047Z" fill="black"></path>
<path d="M49.2872 0C50.3039 0 51.2789 0.409317 51.9978 1.13789C52.7167 1.86647 53.1206 2.85462 53.1206 3.88498C53.1156 4.6461 52.8886 5.38874 52.4683 6.01948C52.0479 6.65023 51.4529 7.14095 50.7581 7.42988C50.0633 7.71882 49.2997 7.79308 48.5634 7.64335C47.827 7.49361 47.1508 7.12657 46.6198 6.58837C46.0887 6.05016 45.7266 5.36484 45.5788 4.61858C45.4311 3.87231 45.5043 3.09843 45.7894 2.39427C46.0745 1.6901 46.5587 1.08709 47.1811 0.661078C47.8035 0.235063 48.5362 0.00505745 49.2872 0ZM46.4122 37.4867V12.6262H52.2127V37.5208L46.4122 37.4867Z" fill="black"></path>
<path d="M81.0552 32.9713C81.0555 34.4914 81.1397 36.0103 81.3073 37.5208H75.7086C75.5559 36.454 75.4716 35.3783 75.4564 34.3004C74.697 35.5296 73.629 36.5323 72.3617 37.2059C71.0944 37.8795 69.6732 38.1999 68.2437 38.1342C61.1822 38.1342 56.4746 32.5112 56.4746 24.9968C56.4746 17.8403 61.2663 11.9617 68.1764 11.9617C72.4637 11.9617 74.6326 13.9553 75.3892 15.54V0.51123H81.0888L81.0552 32.9713ZM68.8994 32.9202C72.7327 32.9202 75.406 29.6997 75.406 24.9457C75.406 20.1917 72.7832 17.2269 68.9498 17.2269C65.1165 17.2269 62.2919 20.2429 62.2919 24.9968C62.2919 29.7508 64.9147 32.9202 68.8994 32.9202Z" fill="black"></path>
<path d="M137.336 30.4153C136.025 34.7603 132.15 38.2875 126.24 38.2875C119.59 38.2875 113.689 33.3801 113.689 24.9456C113.689 17.0734 119.439 11.8594 125.635 11.8594C133.2 11.8594 137.639 16.9201 137.639 24.7923C137.656 25.4264 137.605 26.0606 137.488 26.6837H119.54C119.584 28.4478 120.317 30.1222 121.578 31.3393C122.838 32.5564 124.524 33.2168 126.265 33.1757C129.796 33.1757 131.62 31.2843 132.427 28.8306L137.336 30.4153ZM131.738 22.3386C131.637 19.4249 129.729 16.8178 125.693 16.8178C124.185 16.7831 122.722 17.3365 121.605 18.3639C120.488 19.3913 119.803 20.8141 119.691 22.3386H131.738Z" fill="black"></path>
<path d="M141.826 37.5209V12.6263H147.424V15.7956C148.837 13.2397 151.913 11.9106 154.688 11.9106C157.916 11.9106 160.74 13.3931 162.052 16.3068C163.968 13.0352 166.843 11.9106 170.021 11.9106C174.46 11.9106 178.696 14.7733 178.696 21.3675V37.555H173.047V22.3388C173.047 19.425 171.585 17.2269 168.306 17.2269C165.229 17.2269 163.212 19.6806 163.212 22.7477V37.5209H157.462V22.3388C157.462 19.4761 156.049 17.2269 152.72 17.2269C149.593 17.2269 147.626 19.5784 147.626 22.7477V37.5209H141.826Z" fill="black"></path>
<path d="M194.383 38.1854C187.17 38.1854 182.53 32.409 182.53 24.9458C182.53 17.7381 187.221 11.9106 194.299 11.9106C198.637 11.9106 200.856 14.211 201.512 15.8979V12.6263H207.211V32.9714C207.211 35.0161 207.413 37.0097 207.463 37.5209H201.865C201.686 36.3369 201.602 35.1403 201.613 33.9426C200.941 35.2819 199.9 36.3953 198.617 37.1482C197.334 37.9011 195.864 38.2614 194.383 38.1854ZM195.039 33.0736C198.872 33.0736 201.545 29.7509 201.545 24.9458C201.545 20.1407 198.922 17.0736 195.039 17.0736C191.155 17.0736 188.381 20.1407 188.381 24.9458C188.381 29.7509 190.953 33.0736 195.039 33.0736Z" fill="black"></path>
<path d="M226.159 23.1468L236.449 37.5111H229.287L222.074 27.3385L219.047 30.559V37.5111H213.213V0.501465H219.014V22.6527L228.446 12.5824H236.213L226.159 23.1468Z" fill="black"></path>
<path d="M259.853 30.4055C258.541 34.7506 254.657 38.2777 248.756 38.2777C242.098 38.2777 236.197 33.3704 236.197 24.9359C236.197 17.0637 241.947 11.8496 248.151 11.8496C255.717 11.8496 260.155 16.9103 260.155 24.7825C260.172 25.4167 260.122 26.0508 260.004 26.6739H242.048C242.092 28.438 242.825 30.1124 244.085 31.3295C245.346 32.5466 247.032 33.2071 248.773 33.1659C252.304 33.1659 254.119 31.2745 254.926 28.8208L259.853 30.4055ZM254.254 22.3288C254.153 19.4151 252.236 16.8081 248.201 16.8081C246.693 16.7733 245.23 17.3268 244.113 18.3541C242.996 19.3815 242.311 20.8043 242.199 22.3288H254.254Z" fill="black"></path>
<path d="M278.717 18.495C278.083 18.3951 277.442 18.3439 276.8 18.3416C272.261 18.3416 270.193 20.9998 270.193 25.6515V37.511H264.308V12.6164H270.008V16.6036C271.168 13.8943 273.891 12.3438 277.12 12.3438C277.644 12.3453 278.168 12.3966 278.683 12.4971L278.717 18.495Z" fill="black"></path>
<path d="M290.553 27.0829V21.9199H386V27.0829H290.553Z" fill="black"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M91.0952 38.3081L85.7257 39.8858C86.8116 44.4356 91.1716 47.9999 97.2461 47.9999C106.493 47.9999 109.856 41.8146 109.856 35.1692V12.6261H104.207V15.7954C103.147 13.7507 100.777 12.166 96.9435 12.166C90.1847 12.166 85.5947 17.6357 85.5947 24.281C85.5947 31.2842 90.3864 36.396 96.9435 36.396C100.525 36.396 102.996 34.7091 104.055 32.7666V35.3737C104.055 40.4344 101.735 42.8369 97.0948 42.8369C95.5907 42.8918 94.1216 42.3696 92.9808 41.3746C92.0541 40.5663 91.3996 39.4943 91.0952 38.3081ZM97.9018 17.2778C101.533 17.2778 104.207 20.0212 104.207 24.281C104.207 28.575 101.735 31.3353 97.9018 31.3353C94.0684 31.3353 91.4961 28.5238 91.4961 24.281C91.4961 20.0382 94.2702 17.2778 97.9018 17.2778Z" fill="black"></path>
</g>
<defs>
<clipPath id="clip0_936_89">
<rect width="386" height="48" fill="white"></rect>
</clipPath>
</defs>
</svg>`;

/* ---------- Signierte Cookies (HMAC-SHA-256) ---------- */

const enc = new TextEncoder();

function b64url(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromB64url(s: string): Uint8Array {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (s.length % 4)) % 4));
  return Uint8Array.from(bin, c => c.charCodeAt(0));
}

function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

async function sign(data: object, secret: string): Promise<string> {
  const body = b64url(enc.encode(JSON.stringify(data)));
  const sig = await crypto.subtle.sign('HMAC', await hmacKey(secret), enc.encode(body));
  return `${body}.${b64url(new Uint8Array(sig))}`;
}

// Liefert den Inhalt nur bei gültiger Signatur und nicht abgelaufenem x (ms).
async function unsign(value: string | null, secret: string): Promise<Record<string, any> | null> {
  if (!value) return null;
  const [body, sig] = value.split('.');
  if (!body || !sig) return null;
  try {
    const ok = await crypto.subtle.verify('HMAC', await hmacKey(secret), fromB64url(sig), enc.encode(body));
    if (!ok) return null;
    const data = JSON.parse(new TextDecoder().decode(fromB64url(body)));
    return typeof data.x === 'number' && data.x > Date.now() ? data : null;
  } catch {
    return null;
  }
}

function readCookie(request: Request, name: string): string | null {
  const cookies = request.headers.get('cookie') ?? '';
  const match = cookies.match(new RegExp(`(?:^|;\\s*)${name}=([A-Za-z0-9_.-]+)`));
  return match ? match[1] : null;
}

// Nur Pfade auf derselben Seite — kein offener Redirect über ?next=.
function safeNext(next: string | null): string {
  if (!next || !next.startsWith('/') || next.startsWith('//') || next.startsWith('/\\') || next.startsWith('/auth/')) return '/';
  return next;
}

/* ---------- Login-Seite ---------- */

// Googles „G" nach den Sign-in-Branding-Richtlinien: immer vierfarbig,
// nie umgefärbt — fremde Marke, keine Ausnahme von der Icon-Regel
// (eigene Icons bleiben einfarbig). Button = Googles dunkle Variante
// in Bridgemaker-Form (Charcoal-Pill), Label in Googles Wortlaut.
const GOOGLE_G = `<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`;

type Zustand = 'login' | 'domain' | 'abgelaufen' | 'abgebrochen' | 'fehler' | 'setup';

const MELDUNG: Record<Zustand, string> = {
  login: '',
  domain: 'Dieses Konto gehört nicht zu bridgemaker.com. Melde dich mit deinem Bridgemaker-Konto an.',
  abgelaufen: 'Die Anmeldung ist abgelaufen. Starte sie bitte neu.',
  abgebrochen: 'Die Anmeldung wurde abgebrochen.',
  fehler: 'Google hat die Anmeldung nicht bestätigt. Versuch es noch einmal.',
  setup: 'Der Login ist noch nicht eingerichtet.',
};

function loginPage(zustand: Zustand, status: number, next = '/'): Response {
  const meldung = MELDUNG[zustand];
  const html = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Bridgemaker Brandbook</title>
<style>
  @font-face { font-family: 'Inter'; font-style: normal; font-weight: 400; font-display: swap;
    src: url('/assets/fonts/Inter-400-latin.woff2') format('woff2'); }
  @font-face { font-family: 'Inter'; font-style: normal; font-weight: 500; font-display: swap;
    src: url('/assets/fonts/Inter-500-latin.woff2') format('woff2'); }
  @font-face { font-family: 'Inter'; font-style: normal; font-weight: 600; font-display: swap;
    src: url('/assets/fonts/Inter-600-latin.woff2') format('woff2'); }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: #F5F4F1; color: #1C1C1E; padding: 16px;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  .card {
    background: #fff; border-radius: 20px; padding: 48px 40px; max-width: 400px; width: 100%;
    box-shadow: inset 0 0 0 1px rgba(28,28,30,0.06), 0 1px 2px rgba(28,28,30,0.03),
                0 10px 24px -18px rgba(28,28,30,0.10);
  }
  .wordmark { height: 20px; width: auto; display: block; margin-bottom: 32px; }
  h1 { font-size: 24px; font-weight: 600; letter-spacing: -0.01em; margin-bottom: 8px; text-wrap: balance; }
  p, .fehler { text-wrap: pretty; }
  p { font-size: 15px; color: #55524C; margin-bottom: 32px; line-height: 1.5; }
  .button {
    display: flex; align-items: center; justify-content: center; gap: 12px;
    width: 100%; padding: 13px 24px; font-size: 15px; font-weight: 500;
    text-decoration: none; border-radius: 999px;
    background: #1C1C1E; color: #F5F4F1; transition: background 240ms ease-out;
  }
  .button:hover { background: #4A3268; }
  .button svg { width: 18px; height: 18px; flex: none; }
  .fehler { color: #B84A6F; font-size: 13px; line-height: 1.5; margin: -16px 0 24px; }
</style>
</head>
<body>
<main class="card">
  ${WORDMARK}
  <h1>Brandbook</h1>
  <p>Melde dich mit deinem Bridgemaker-Konto&nbsp;an.</p>
  ${meldung ? `<div class="fehler">${meldung}</div>` : ''}
  ${zustand === 'setup' ? '' : `<a class="button" href="/auth/login?next=${encodeURIComponent(next)}">${GOOGLE_G}Über Google anmelden</a>`}
</main>
</body>
</html>`;
  return new Response(html, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

/* ---------- Google OAuth ---------- */

function cookieHeader(name: string, value: string, maxAge: number, path = '/'): string {
  return `${name}=${value}; Path=${path}; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
}

// ID-Token kommt direkt vom Google-Token-Endpunkt (TLS, mit Client-Secret)
// — OIDC Core 3.1.3.7 erlaubt dann den Verzicht auf die Signaturprüfung.
function readIdToken(idToken: string): Record<string, any> | null {
  try {
    return JSON.parse(new TextDecoder().decode(fromB64url(idToken.split('.')[1])));
  } catch {
    return null;
  }
}

function isBridgemaker(claims: Record<string, any>, clientId: string): boolean {
  const email = String(claims.email ?? '').toLowerCase();
  return (
    (claims.iss === 'https://accounts.google.com' || claims.iss === 'accounts.google.com') &&
    claims.aud === clientId &&
    typeof claims.exp === 'number' && claims.exp * 1000 > Date.now() &&
    claims.email_verified === true &&
    claims.hd === DOMAIN &&
    email.endsWith('@' + DOMAIN)
  );
}

export default async function middleware(request: Request) {
  const url = new URL(request.url);

  if (url.pathname === '/auth/logout') {
    return new Response(null, {
      status: 303,
      headers: { Location: '/', 'Set-Cookie': cookieHeader(SESSION, '', 0), 'Cache-Control': 'no-store' },
    });
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const secret = process.env.AUTH_SECRET;
  if (!clientId || !clientSecret || !secret) return loginPage('setup', 503);

  const redirectUri = `${url.origin}/auth/callback`;

  if (url.pathname === '/auth/login') {
    const state = b64url(crypto.getRandomValues(new Uint8Array(16)));
    const next = safeNext(url.searchParams.get('next'));
    const stateCookie = await sign({ s: state, n: next, x: Date.now() + STATE_AGE * 1000 }, secret);
    const google = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    google.search = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email',
      hd: DOMAIN,
      prompt: 'select_account',
      state,
    }).toString();
    return new Response(null, {
      status: 302,
      headers: {
        Location: google.toString(),
        'Set-Cookie': cookieHeader(STATE, stateCookie, STATE_AGE, '/auth/callback'),
        'Cache-Control': 'no-store',
      },
    });
  }

  if (url.pathname === '/auth/callback') {
    const stored = await unsign(readCookie(request, STATE), secret);
    if (!stored || stored.s !== url.searchParams.get('state')) return loginPage('abgelaufen', 400);
    const next = safeNext(stored.n);

    const code = url.searchParams.get('code');
    if (!code) return loginPage('abgebrochen', 401, next);

    let claims: Record<string, any> | null = null;
    try {
      const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }),
      });
      if (res.ok) {
        const json = await res.json();
        if (typeof json.id_token === 'string') claims = readIdToken(json.id_token);
      }
    } catch {
      /* Netzwerkfehler → unten als „fehler" behandelt */
    }
    if (!claims) return loginPage('fehler', 502, next);
    if (!isBridgemaker(claims, clientId)) return loginPage('domain', 403, next);

    const session = await sign({ e: String(claims.email).toLowerCase(), x: Date.now() + MAX_AGE * 1000 }, secret);
    const headers = new Headers({ Location: next, 'Cache-Control': 'no-store' });
    headers.append('Set-Cookie', cookieHeader(SESSION, session, MAX_AGE));
    headers.append('Set-Cookie', cookieHeader(STATE, '', 0, '/auth/callback'));
    return new Response(null, { status: 303, headers });
  }

  const session = await unsign(readCookie(request, SESSION), secret);
  if (session && String(session.e).endsWith('@' + DOMAIN)) return; // durchlassen — Antwort liefert das statische Deploy

  return loginPage('login', 401, url.pathname + url.search);
}
