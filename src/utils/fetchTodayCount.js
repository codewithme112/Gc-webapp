import { GOOGLE_SCRIPT_URL } from "../config.js";

export async function fetchTodayCount() {
  try {
    const res = await fetch(`${GOOGLE_SCRIPT_URL}?action=todayCount`);

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    if (typeof data.todayCount === "number") {
      return data.todayCount;
    }

    if (Array.isArray(data.entries)) {
      return data.entries.length;
    }

    if (Array.isArray(data)) {
      return data.length;
    }

    return 0;
  } catch (e) {
    console.error("Failed to fetch today's count:", e);
    return 0;
  }
}
