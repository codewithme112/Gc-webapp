export async function fetchTodayCount() {
  try {
    const res = await fetch('https://script.google.com/macros/s/AKfycbybZns1p4daGCK4yh1DiQa60lj_6e7GBL3DWzFktqb7g7mcdevYZjJvA2W9UbDq7IhU6A/exec?type=today');
    const data = await res.json();

    // data is an array of today's entries
    return Array.isArray(data) ? data.length : 0;
  } catch (e) {
    console.error('Failed to fetch today\'s count:', e);
    return 0;
  }
}
