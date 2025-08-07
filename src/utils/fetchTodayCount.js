export async function fetchTodayCount() {
  try {
    const res = await fetch('https://script.google.com/macros/s/AKfycbzTVbKkNudqmXgPJaBM-olgZw-s8cr9N6H09G2IEQPG5aZLbfzrfbJKK0squ-UPegCbyA/exec?type=today');
    const data = await res.json();

    // data is an array of today's entries
    return Array.isArray(data) ? data.length : 0;
  } catch (e) {
    console.error('Failed to fetch today\'s count:', e);
    return 0;
  }
}
