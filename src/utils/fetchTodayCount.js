export async function fetchTodayCount() {
  try {
    const res = await fetch('https://script.google.com/macros/s/AKfycbzY3jaVoo3iYG-HAw10Zm4KNvn9Y3YgGzvGwCftm7zsZIXaHwN5w8Irl_lYVcQ3jpGIjQ/exec');
    const data = await res.json();
    return Array.isArray(data) ? data.length : 0;
  } catch (e) {
    return 0;
  }
}