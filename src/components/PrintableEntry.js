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
    <div
      className="print-container"
      style={{
        fontFamily: 'Arial',
        padding: '10px 20px',
        maxWidth: '780px',
        margin: 'auto',
        fontSize: '12.5px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '1050px', // for A4
        justifyContent: 'space-between'
      }}
    >
      <div>
        <h2 style={{ textAlign: 'center', fontSize: '16px', margin: '6px 0' }}>
          🔧 जनरल चेकअप फॉर्म
        </h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '10px', marginBottom: '6px' }}>
          <p><strong>वाहन नंबर:</strong> {entry.registration}</p>
          <p><strong>किलोमीटर:</strong> {entry.kilometers}</p>
          <p><strong>मॉडल नंबर:</strong> {entry.model}</p>
          <p><strong>📅 तारीख:</strong> {formatDate(entry.date)}</p>
          <p><strong>⏰ समय:</strong> {formatTime(entry.time)}</p>
        </div>

        <p style={{ margin: '4px 0 8px' }}>🔖 <strong>मैकेनिक:</strong> Islam Kham</p>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            pageBreakInside: 'avoid',
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>क्रम संख्या</th>
              <th style={thStyle}>जांच बिंदु</th>
              <th style={thStyle}>स्थिति</th>
              <th style={thStyle}>टिप्पणी</th>
            </tr>
          </thead>
          <tbody>
            {entry.items.map((item, index) => (
              <tr key={index}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{checklistLabels[index]}</td>
                <td style={tdStyle}>{item.status}</td>
                <td style={tdStyle}>{item.remark}</td>
              </tr>
            ))}

            {entry.otherIssue && entry.otherIssue.trim() !== '' && (
              <tr>
                <td style={tdStyle}>23</td>
                <td style={tdStyle}>अन्य समस्या</td>
                <td style={tdStyle}>❌</td>
                <td style={tdStyle}>{entry.otherIssue}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginTop: '10px'
        }}
      >
        <div style={{ fontWeight: 'bold' }}>Ranveer Singh Rathore</div>

        <div style={{ textAlign: 'center' }}>
          <img
            src="/Images/sign.png"
            alt="Signature"
            style={{
              width: '120px',
              objectFit: 'contain',
              marginTop: '2px',
            }}
          />
          <div
            style={{
              borderTop: '1px solid black',
              width: '120px',
              margin: '4px auto 2px auto',
            }}
          ></div>
          <div style={{ fontSize: '11px' }}>हस्ताक्षर (Signature)</div>
        </div>
      </div>
    </div>
  );
};

const thStyle = {
  border: '1px solid #000',
  padding: '4px',
  fontSize: '12px',
  textAlign: 'center'
};

const tdStyle = {
  border: '1px solid #000',
  padding: '3px',
  fontSize: '12px',
  textAlign: 'center'
};

export default PrintableEntry;
