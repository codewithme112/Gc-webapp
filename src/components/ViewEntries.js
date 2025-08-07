import React, { useEffect, useState } from 'react';
import PrintableEntry from './PrintableEntry';

const checklistLabels = [
  "सर्विस हिस्ट्री देखें और ग्राहक को सुझाव दें",
  "गियर ऑयल स्तर जांचें",
  "इंजन ऑयल स्तर जांचें",
  "डिफरेंशियल ऑयल स्तर जांचें",
  "कूलेंट स्तर जांचें",
  "ब्रेक सेटिंग और ब्रेक लाइनर जांचें",
  "क्लच सेटिंग और क्लच पार्ट्स जांचें",
  "व्हील अलाइनमेंट के लिए सुझाव दें",
  "लैपटॉप जांच के लिए सुझाव दिया गया",
  "सभी एयर होसेस जांचें",
  "फ्यूल पाइप जांचें",
  "कूलंट पाइप जांचें",
  "एयर फिल्टर की स्थिति और इंडिकेटर जांचें",
  "इंजन माउंटिंग जांचें",
  "टैंक कैप और डीजल टैंक कैप जांचें",
  "स्टेरिंग ऑयल स्तर और लीक जांचें",
  "बैटरी वाटर, बल्ब, फ्यूज जांचें",
  "वाइपर ब्लेड जांचें",
  "यूरिया लेवल जांचें",
  "फैन बेल्ट जांचें",
  "एसी गैस रिफिलिंग",
  "रेट्रो जांचें",
  "अन्य समस्या"
];

const FINAL_URL = 'https://script.google.com/macros/s/AKfycbzTVbKkNudqmXgPJaBM-olgZw-s8cr9N6H09G2IEQPG5aZLbfzrfbJKK0squ-UPegCbyA/exec';

const formatDate = (rawDate) => {
  const d = new Date(rawDate);
  if (isNaN(d)) return rawDate;
  return d.toLocaleDateString('hi-IN');
};

const formatTime = (rawTime) => {
  const t = new Date(rawTime);
  if (isNaN(t)) return rawTime;
  return t.toLocaleTimeString('hi-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const ViewEntries = () => {
  const [entries, setEntries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);

  const fetchEntries = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error('❌ Error fetching entries:', err);
      alert('नेटवर्क समस्या! कृपया दोबारा प्रयास करें।');
    }
  };

  useEffect(() => {
    fetchEntries(`${FINAL_URL}?type=today`);
  }, []);

  const handleSearch = () => {
    if (searchText.trim()) {
      fetchEntries(`${FINAL_URL}?search=${searchText.trim()}`);
    } else if (selectedDate) {
      handleDateFilter();
    } else {
      fetchEntries(`${FINAL_URL}?type=today`);
    }
  };

  const handleDateFilter = () => {
    if (selectedDate) {
      const [yyyy, mm, dd] = selectedDate.split('-');
      const formatted = `${dd}-${mm}-${yyyy}`;
      fetchEntries(`${FINAL_URL}?date=${formatted}`);
    } else {
      fetchEntries(`${FINAL_URL}?type=today`);
    }
  };

  const renderSummary = (items, otherIssue) => {
    const notOk = items
      .map((item, i) =>
        item.status === 'नहीं'
          ? `${i + 1}. ${checklistLabels[i]} — ${item.remark}`
          : null
      )
      .filter(Boolean);

    if (otherIssue && otherIssue.trim()) {
      notOk.push(`23. अन्य समस्या — ${otherIssue}`);
    }

    if (notOk.length === 0) return <span style={{ color: 'green' }}>✅ All OK</span>;

    return (
      <div style={{ color: 'red' }}>
        {notOk.map((item, i) => <div key={i}>❌ {item}</div>)}
        <div>✅ Other All OK</div>
      </div>
    );
  };

  return (
    <div className="entries-card-list">
      <h2 style={{ textAlign: 'center' }}>📋 सभी चेकशीट एंट्री</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="वाहन नंबर खोजें..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button onClick={handleSearch}>🔍 खोजें</button>
      </div>

      <div className="card-grid">
        {[...entries].reverse().map((entry, index) => (
          <div className="entry-card" key={index}>
            <div className="card-row"><strong>#{index + 1}</strong></div>
            <div className="card-row"><strong>वाहन नंबर:</strong> {entry.registration}</div>
            <div className="card-row"><strong>KM:</strong> {entry.kilometers}</div>
            <div className="card-row"><strong>मॉडल:</strong> {entry.model}</div>
            <div className="card-row"><strong>📅 तारीख:</strong> {formatDate(entry.date)}</div>
            <div className="card-row"><strong>⏰ समय:</strong> {formatTime(entry.time)}</div>
            <div className="card-row"><strong>स्थिति:</strong> {renderSummary(entry.items, entry.otherIssue)}</div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '10px' }}>
              {/* <button onClick={() => window.print()}>🖨️ प्रिंट</button> */}
              <button onClick={() => setSelectedEntry(entry)}>📄 View Report</button>
            </div>
          </div>
        ))}
      </div>

     {selectedEntry && (
  <div className="overlay">
    <div className="modal print-area">
      <button onClick={() => setSelectedEntry(null)}>❌ बंद करें</button>
      <PrintableEntry entry={selectedEntry} checklistLabels={checklistLabels} />
      <button onClick={() => window.print()}>🖨️ प्रिंट</button>
    </div>
  </div>
)}

    </div>
  );
};

export default ViewEntries;
