const CONTACT_TO_EMAIL = 'ujjwalmishracse27@gmail.com';
const RESEND_API_URL = 'https://api.resend.com/emails';

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  },
  body: JSON.stringify(body)
});

const escapeHtml = (value) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const normalizePayload = (payload) => ({
  name: String(payload.name ?? '').trim(),
  phone: String(payload.phone ?? '').trim(),
  email: String(payload.email ?? '').trim(),
  message: String(payload.message ?? '').trim()
});

const validatePayload = ({ name, phone, email, message }) => {
  const errors = {};

  if (!name) errors.name = 'Name is required';
  if (!email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Invalid email format';
  }
  if (!message) errors.message = 'Message is required';
  if (phone && !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(phone)) {
    errors.phone = 'Invalid phone number format';
  }

  return errors;
};

const buildEmailHtml = ({ name, phone, email, message }) => `
  <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
    <h2 style="margin: 0 0 16px;">New portfolio contact message</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
    <p><strong>Message:</strong></p>
    <div style="white-space: pre-wrap; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb;">${escapeHtml(message)}</div>
  </div>
`;

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return json(200, { ok: true });
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { ok: false, message: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return json(500, {
      ok: false,
      message: 'Email service is not configured'
    });
  }

  let payload;
  try {
    payload = normalizePayload(JSON.parse(event.body || '{}'));
  } catch {
    return json(400, { ok: false, message: 'Invalid JSON payload' });
  }

  const errors = validatePayload(payload);
  if (Object.keys(errors).length > 0) {
    return json(400, { ok: false, message: 'Validation failed', errors });
  }

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromEmail,
      to: CONTACT_TO_EMAIL,
      reply_to: payload.email,
      subject: `Portfolio message from ${payload.name}`,
      html: buildEmailHtml(payload)
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Resend email failed:', response.status, errorText);
    return json(502, {
      ok: false,
      message: 'Could not send email'
    });
  }

  return json(200, {
    ok: true,
    message: 'Message sent successfully'
  });
};
