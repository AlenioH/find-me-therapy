export async function resendVerificationEmail(email) {
  try {
    const response = await fetch('/api/resend-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      return { message: data.message, error: null };
    } else {
      return { message: null, error: data.error || 'Fehler beim Senden der E-Mail.' };
    }
  } catch (error) {
    return { message: null, error: 'Ein unerwarteter Fehler ist aufgetreten.' };
  }
}
