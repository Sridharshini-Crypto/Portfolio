import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// In-memory rate limiting map: IP -> array of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Filter timestamps within current window
  const activeTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, activeTimestamps);
    return true;
  }

  activeTimestamps.push(now);
  rateLimitMap.set(ip, activeTimestamps);
  return false;
}

export async function POST(request: Request) {
  try {
    // 1. IP extraction for rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = (forwardedFor ? forwardedFor.split(',')[0].trim() : realIp) || '127.0.0.1';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many submissions from this connection. Please wait a few minutes before trying again.',
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message, honeypot } = body;

    // 2. Server-side Spam Protection: Honeypot check
    if (honeypot && honeypot.trim().length > 0) {
      // Silently accept spam bot submissions without dispatching emails
      return NextResponse.json({ success: true, message: 'Message received.' });
    }

    // 3. Strict Input Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid name (2 to 100 characters).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 150) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10 || message.length > 3000) {
      return NextResponse.json(
        { success: false, error: 'Please provide a message between 10 and 3,000 characters.' },
        { status: 400 }
      );
    }

    const cleanSubject = subject && typeof subject === 'string' && subject.trim().length > 0
      ? subject.trim().slice(0, 150)
      : 'New Portfolio Inquiry from ' + name.trim();

    // 4. Real Email Dispatch via Resend
    const resendApiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || 'ssridharshiniofficial@gmail.com';

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      const sendResult = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'Portfolio Contact <onboarding@resend.dev>',
        to: recipientEmail,
        replyTo: email.trim(),
        subject: `[Portfolio Inquiry] ${cleanSubject}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E8EDF2; border-radius: 8px; background-color: #FFFFFF;">
            <div style="background-color: #071B33; color: #FFFFFF; padding: 16px; border-radius: 6px 6px 0 0; margin: -24px -24px 20px -24px;">
              <h2 style="margin: 0; font-size: 18px; letter-spacing: 0.5px;">THE TECHNICAL EXPLORATION // CONTACT INQUIRY</h2>
            </div>
            <p style="font-size: 14px; color: #536B82; margin-bottom: 20px;">
              You have received a new contact message from your portfolio website:
            </p>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
              <tr>
                <td style="padding: 8px 0; color: #7E93A7; width: 100px;"><strong>Sender:</strong></td>
                <td style="padding: 8px 0; color: #0F1F30;">${name.trim()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #7E93A7;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #245C9A;"><a href="mailto:${email.trim()}" style="color: #245C9A; text-decoration: none;">${email.trim()}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #7E93A7;"><strong>Subject:</strong></td>
                <td style="padding: 8px 0; color: #0F1F30;">${cleanSubject}</td>
              </tr>
            </table>
            <div style="background-color: #F7F8FA; border: 1px solid #D2DCE6; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
              <div style="font-size: 12px; color: #7E93A7; text-transform: uppercase; margin-bottom: 8px;">Message Content:</div>
              <p style="margin: 0; font-size: 14px; color: #0F1F30; white-space: pre-wrap; line-height: 1.6;">${message.trim()}</p>
            </div>
            <div style="font-size: 12px; color: #7E93A7; border-top: 1px solid #E8EDF2; padding-top: 12px;">
              Dispatched securely from Sridharshini S Portfolio Contact API.
            </div>
          </div>
        `,
      });

      if (sendResult.error) {
        console.error('Resend API dispatch error:', sendResult.error);
        return NextResponse.json(
          {
            success: false,
            error: 'Email dispatch provider encountered an issue. You can also contact directly via email or WhatsApp.',
          },
          { status: 502 }
        );
      }
    } else {
      // In local development mode without RESEND_API_KEY, log transmission payload
      console.log('--- [PORTFOLIO CONTACT DISPATCH] ---');
      console.log('To:', recipientEmail);
      console.log('From:', `${name} <${email}>`);
      console.log('Subject:', cleanSubject);
      console.log('Message:', message);
      console.log('------------------------------------');
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out! Your message has been transmitted to Sridharshini.',
    });
  } catch (error) {
    console.error('Contact route error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected server error occurred while processing your message.' },
      { status: 500 }
    );
  }
}
