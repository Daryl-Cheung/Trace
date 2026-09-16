const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://trace-dc-90ac.vercel.app";

export async function apiFetch(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };

  const authToken =
    token || (typeof window !== "undefined" ? localStorage.getItem("token") : null);
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || data.message || "Request failed");
  }

  return data;
}
