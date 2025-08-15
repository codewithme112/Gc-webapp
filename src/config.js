const GAS_BASE_URL = "https://script.google.com/macros/s/AKfycbyXx8XuwuLRaSA0yO2TZxyOnSuK5P8loxv6EhYVvXMn8lk0Uj64hezgx-2CVcyUmWzacA/exec";

export const ENTRIES_URL = `${GAS_BASE_URL}`;       // Use ?type=today or ?search=xxx when fetching
export const SAVE_URL = `${GAS_BASE_URL}`;          // POST to GAS directly
export const TODAY_COUNT_URL = `${GAS_BASE_URL}`;   // Use ?action=todayCount when fetching
