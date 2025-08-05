import React from 'react';

const formatDate = (rawDate) => {
  const d = new Date(rawDate);
  if (isNaN(d)) return '—';
  return d.toLocaleDateString('hi-IN');
};

const formatTime = (rawTime) => {
  const t = new Date(rawTime);
  if (isNaN(t)) return '—';
  return t.toLocaleTimeString('hi-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const PrintableEntry = ({ entry, checklistLabels }) => {
  return (
    <div style={{ fontFamily: 'Arial', padding: 20, maxWidth: 700 }}>
      <h2 style={{ textAlign: 'center' }}>🔧 जनरल चेकअप फॉर्म</h2>
      <p><strong>वाहन नंबर:</strong> {entry.registration}</p>
      <p><strong>किलोमीटर:</strong> {entry.kilometers}</p>
      <p><strong>मॉडल नंबर:</strong> {entry.model}</p>
      <p>📅 तारीख: {formatDate(entry.date)} | ⏰ समय: {formatTime(entry.time)}</p>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #000' }}>क्रम n</th>
            <th style={{ border: '1px solid #000' }}>जांच बिंदु</th>
            <th style={{ border: '1px solid #000' }}>स्थिति</th>
            <th style={{ border: '1px solid #000' }}>टिप्पणी</th>
          </tr>
        </thead>
        <tbody>
          {entry.items.map((item, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #000' }}>{index + 1}</td>
              <td style={{ border: '1px solid #000' }}>{checklistLabels[index]}</td>
              <td style={{ border: '1px solid #000' }}>{item.status}</td>
              <td style={{ border: '1px solid #000' }}>{item.remark}</td>
            </tr>
          ))}

          {entry.otherIssue && entry.otherIssue.trim() !== '' && (
            <tr>
              <td style={{ border: '1px solid #000' }}>23</td>
              <td style={{ border: '1px solid #000' }}>अन्य समस्या</td>
              <td style={{ border: '1px solid #000' }}>❌</td>
              <td style={{ border: '1px solid #000' }}>{entry.otherIssue}</td>
            </tr>
          )}
        </tbody>
      </table>

      <p style={{ marginTop: '1rem' }}>🔖 <strong>एडवाइजर:</strong> Ranveer Singh Rathore</p>
    </div>
  );
};

export default PrintableEntry;
