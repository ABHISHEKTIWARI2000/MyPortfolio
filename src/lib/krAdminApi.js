const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/kr-admin`;

export async function callKrAdmin(password, action, payload = {}) {
  let response;
  try {
    response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, action, ...payload }),
    });
  } catch {
    throw new Error('Network error. Check your connection and try again.');
  }

  const result = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(result?.error || `Request failed (${response.status})`);
  }
  return result;
}
