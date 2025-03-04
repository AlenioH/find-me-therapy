import sgMail from '@sendgrid/mail';
import { env } from '$env/dynamic/private'; // Loads from .env

sgMail.setApiKey(env.SENDGRID_API_KEY);

export async function sendEmail( to, subject, text, html ) {
  const msg = {
    to,
    from: 'alena.hasslacher@gmail.com', // Must be verified in SendGrid
    subject,
    text,
    html
  };

  console.log();
  try {
    await sgMail.send(msg);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error('❌ SendGrid Error:', error.response?.body || error);
  }
}
