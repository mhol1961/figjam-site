// Cloudflare Worker for figjam-site.
// Handles POST /api/contact — accepts the contact form payload, validates it,
// and sends a branded HTML email via Resend. All other requests fall through
// to the static-assets layer (./out), which is configured in wrangler.jsonc.

interface Env {
  RESEND_API_KEY: string;
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

interface ContactPayload {
  name?: string;
  phone?: string;
  email?: string;
  eventDate?: string;
  eventType?: string;
  guestCount?: number;
  boardSize?: string;
  message?: string;
  botcheck?: string;
  idempotencyId?: string;
}

const RECIPIENT = 'izzy57@myyahoo.com';
const CC = 'mhollandanalyst@gmail.com';
const FROM = 'Fig Jam Charcuterie <onboarding@resend.dev>';
const RESEND_ENDPOINT = 'https://api.resend.com/emails';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname !== '/api/contact') {
      return env.ASSETS.fetch(request);
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204 });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ success: false, message: 'Method not allowed' }, 405);
    }

    let payload: ContactPayload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ success: false, message: 'Invalid JSON' }, 400);
    }

    if (payload.botcheck && payload.botcheck.length > 0) {
      return jsonResponse({ success: true }, 200);
    }

    const name = sanitize(payload.name);
    const phone = sanitize(payload.phone);
    const email = sanitize(payload.email);
    const eventDate = sanitize(payload.eventDate);
    const eventType = sanitize(payload.eventType);
    const boardSize = sanitize(payload.boardSize);
    const message = sanitize(payload.message);
    const guestCount = Number(payload.guestCount) || 0;
    const idempotencyId = sanitize(payload.idempotencyId) || crypto.randomUUID();

    if (!name || !phone || !email || !eventDate || !eventType || !boardSize || guestCount <= 0) {
      return jsonResponse(
        { success: false, message: 'Missing one or more required fields.' },
        400
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ success: false, message: 'Invalid email address.' }, 400);
    }

    const subject = `New Fig Jam inquiry: ${name} — ${eventType} on ${formatDate(eventDate)}`;
    const html = renderEmail({
      name,
      phone,
      email,
      eventDate,
      eventType,
      guestCount,
      boardSize,
      message,
      idempotencyId,
    });
    const text = renderPlainText({
      name,
      phone,
      email,
      eventDate,
      eventType,
      guestCount,
      boardSize,
      message,
      idempotencyId,
    });

    try {
      const resendRes = await fetch(RESEND_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM,
          to: [RECIPIENT],
          cc: [CC],
          reply_to: [email],
          subject,
          html,
          text,
        }),
      });

      if (!resendRes.ok) {
        const errorBody = await resendRes.text();
        console.error('Resend API error', resendRes.status, errorBody);
        return jsonResponse(
          { success: false, message: 'Email service rejected the request.' },
          502
        );
      }

      return jsonResponse({ success: true }, 200);
    } catch (err) {
      console.error('Worker fetch error sending to Resend:', err);
      return jsonResponse(
        { success: false, message: 'Could not reach email service.' },
        502
      );
    }
  },
};

function jsonResponse(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function sanitize(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, 2000);
}

function formatDate(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

interface EmailData {
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  eventType: string;
  guestCount: number;
  boardSize: string;
  message: string;
  idempotencyId: string;
}

function renderEmail(d: EmailData): string {
  const e = escapeHtml;
  const messageBlock = d.message
    ? `
              <tr><td style="padding-top:24px"><div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C4953A;font-weight:600;margin-bottom:8px">Message from ${e(d.name)}</div><div style="font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.6;color:#2C2C2C;background:#FDF6EC;border-left:3px solid #C4953A;padding:16px 20px">${e(d.message)}</div></td></tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>New Fig Jam Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#FDF6EC;font-family:Georgia,'Times New Roman',serif">
  <div style="display:none;max-height:0;overflow:hidden;color:transparent">New inquiry from ${e(d.name)} — ${e(d.eventType)} on ${e(formatDate(d.eventDate))} for ${d.guestCount} guests</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FDF6EC">
    <tr>
      <td align="center" style="padding:32px 16px">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#FEFBF4;border-radius:4px;overflow:hidden;box-shadow:0 4px 16px rgba(43,28,33,0.08)">
          <tr>
            <td style="background:#6B1D2A;padding:36px 40px 32px 40px;text-align:center;border-bottom:3px solid #C4953A">
              <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C4953A;margin-bottom:8px">Fig Jam Charcuterie</div>
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:28px;color:#FDF6EC;font-style:italic;letter-spacing:0.5px">New Event Inquiry</div>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px 8px 40px">
              <p style="margin:0 0 16px 0;font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.5;color:#2C2C2C">Hi Liz,</p>
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.5;color:#2C2C2C">You have a new inquiry from <strong style="color:#6B1D2A">${e(d.name)}</strong>. Details below — hit Reply on this email to respond directly to them.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 8px 40px">
              <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C4953A;font-weight:600;margin-bottom:12px">Event Details</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:Georgia,'Times New Roman',serif">
                <tr><td style="padding:8px 0;border-bottom:1px solid #EFE6D8;color:#6B6560;font-size:14px;width:40%">Event Type</td><td style="padding:8px 0;border-bottom:1px solid #EFE6D8;color:#2C2C2C;font-size:16px;font-weight:600">${e(d.eventType)}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #EFE6D8;color:#6B6560;font-size:14px">Event Date</td><td style="padding:8px 0;border-bottom:1px solid #EFE6D8;color:#2C2C2C;font-size:16px;font-weight:600">${e(formatDate(d.eventDate))}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #EFE6D8;color:#6B6560;font-size:14px">Guest Count</td><td style="padding:8px 0;border-bottom:1px solid #EFE6D8;color:#2C2C2C;font-size:16px;font-weight:600">${d.guestCount}</td></tr>
                <tr><td style="padding:8px 0;color:#6B6560;font-size:14px">Board Size</td><td style="padding:8px 0;color:#2C2C2C;font-size:16px;font-weight:600">${e(d.boardSize)}</td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 8px 40px">
              <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C4953A;font-weight:600;margin-bottom:12px">Contact</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:Georgia,'Times New Roman',serif">
                <tr><td style="padding:8px 0;border-bottom:1px solid #EFE6D8;color:#6B6560;font-size:14px;width:40%">Name</td><td style="padding:8px 0;border-bottom:1px solid #EFE6D8;color:#2C2C2C;font-size:16px;font-weight:600">${e(d.name)}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #EFE6D8;color:#6B6560;font-size:14px">Phone</td><td style="padding:8px 0;border-bottom:1px solid #EFE6D8;color:#2C2C2C;font-size:16px;font-weight:600"><a href="tel:${e(d.phone.replace(/[^\d+]/g, ''))}" style="color:#6B1D2A;text-decoration:none">${e(d.phone)}</a></td></tr>
                <tr><td style="padding:8px 0;color:#6B6560;font-size:14px">Email</td><td style="padding:8px 0;color:#2C2C2C;font-size:16px;font-weight:600"><a href="mailto:${e(d.email)}" style="color:#6B1D2A;text-decoration:none">${e(d.email)}</a></td></tr>
              </table>
            </td>
          </tr>${messageBlock}
          <tr>
            <td style="padding:32px 40px" align="center">
              <a href="mailto:${e(d.email)}?subject=Re%3A%20Your%20Fig%20Jam%20inquiry" style="display:inline-block;background:#C4953A;color:#FEFBF4;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:2px">Reply to ${e(d.name.split(' ')[0])}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px 32px 40px;border-top:1px solid #EFE6D8;text-align:center">
              <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;color:#9C958A;line-height:1.6">Submitted via figjamcharcuteriellc.com contact form<br>Inquiry ID · ${e(d.idempotencyId.slice(0, 8))}</div>
            </td>
          </tr>
        </table>
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;color:#9C958A;margin-top:16px">Fig Jam Charcuterie LLC · Sarasota, FL · 941-914-0007</div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function renderPlainText(d: EmailData): string {
  const lines = [
    'Fig Jam Charcuterie — New Event Inquiry',
    '',
    `Hi Liz, you have a new inquiry from ${d.name}.`,
    'Reply directly to this email to respond to them.',
    '',
    '— Event Details —',
    `Event Type:  ${d.eventType}`,
    `Event Date:  ${formatDate(d.eventDate)}`,
    `Guest Count: ${d.guestCount}`,
    `Board Size:  ${d.boardSize}`,
    '',
    '— Contact —',
    `Name:  ${d.name}`,
    `Phone: ${d.phone}`,
    `Email: ${d.email}`,
  ];
  if (d.message) {
    lines.push('', `— Message from ${d.name} —`, d.message);
  }
  lines.push(
    '',
    '—',
    `Submitted via figjamcharcuteriellc.com contact form`,
    `Inquiry ID · ${d.idempotencyId.slice(0, 8)}`
  );
  return lines.join('\n');
}
