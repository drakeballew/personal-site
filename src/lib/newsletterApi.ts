// src/lib/newsletterApi.ts
export async function subscribeToNewsletter(email: string) {
  const response = await fetch('https://api.your-esp.com/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ESP_API_KEY}`,
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('Failed to subscribe to newsletter');
  }

  return response.json();
}