// src/api/api.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://localhost:7176/gateway";

export async function apiRequest(endpoint, method = "GET", data = null) {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    const isJson = response.headers.get("content-type")?.includes("application/json");

    if (!response.ok) {
      const errorBody = isJson ? await response.json() : await response.text();
      const errorMessage =
        typeof errorBody === "string" ? errorBody : errorBody.message || "API Error";

      const error = new Error(errorMessage);
      error.status = response.status;
      error.body = errorBody;
      throw error;
    }

    return isJson ? response.json() : {};
  } catch (err) {
    if (err instanceof TypeError) {
      // Network errors, timeouts, CORS, etc.
      throw new Error("Network error or server not reachable");
    }
    throw err;
  }
}
