const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function login(email, password) {
  const res = await fetch(`${BACKEND_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function register(email, password) {
  const res = await fetch(`${BACKEND_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function getDogFacts() {
  const res = await fetch(`${BACKEND_URL}/dog-facts`);
  return res.json();
}