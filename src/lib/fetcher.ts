export const fetchWithAuth = async <T = any>(
  url: string,
  options: RequestInit = {},
  onInvalidSession: () => Promise<void>
): Promise<T | null> => {
  try {
    const res = await fetch(url, {
      ...options,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    
    if (res.status === 401 || res.status === 403) {
      await onInvalidSession();
      return null;
    }

    const data = await res.json();

    if (!res.ok) {
      throw {
        status: res.status,
        error: data?.error || "UNKNOWN_ERROR",
      };
    }

    return data;
  } catch (err) {
    console.error("fetchWithAuth error:", err);
    throw err;
  }
};