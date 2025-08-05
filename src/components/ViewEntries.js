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

const ViewEntries = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbzY3jaVoo3iYG-HAw10Zm4KNvn9Y3YgGzvGwCftm7zsZIXaHwN5w8Irl_lYVcQ3jpGIjQ/exec')
      .then((res) => res.json())
      .then((data) => setEntries(data))
      .catch((err) => console.error(err));
  }, []);

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

  const renderSummary = (items, otherIssue) => {
    const notOk = items
      .map((item, i) =>
        item.status === 'नहीं' ? `${i + 1}. ${item.label || checklistLabels[i]} — ${item.remark}` : null
      )
      .filter(Boolean);

    if (otherIssue && otherIssue.trim() !== '') {
      notOk.push(`23. अन्य समस्या — ${otherIssue}`);
    }

    if (notOk.length === 0) {
      return <span style={{ color: 'green' }}>✅ All OK</span>;
    }

    return (
      <div style={{ color: 'red' }}>
        {notOk.map((item, i) => (
          <div key={i}>❌ {item}</div>
        ))}
        <div>✅ Other All OK</div>
      </div>
    );
  };

  const handlePrint = (entry) => {
    const printWindow = window.open('', '', 'width=800,height=700');
    printWindow.document.write(`
      <html>
        <head>
          <title>Checksheet Print</title>
        </head>
        <body>
          <div id="print-root"></div>
        </body>
      </html>
    `);
    printWindow.document.close();

    setTimeout(() => {
      const root = printWindow.document.getElementById('print-root');
      const container = document.createElement('div');
      printWindow.document.body.appendChild(container);

      import('react-dom/server').then((ReactDOMServer) => {
        const html = ReactDOMServer.renderToStaticMarkup(
          <PrintableEntry entry={entry} checklistLabels={checklistLabels} />
        );
        container.innerHTML = html;
        printWindow.print();
        printWindow.close();
      });
    }, 300);
  };

  return (
    <div className="entries-card-list">
      <h2 style={{ textAlign: 'center' }}>📋 सभी चेकशीट एंट्री</h2>
      <div className="card-grid">
        {[...entries].reverse().map((entry, index) => (
          <div className="entry-card" key={index}>
            <div className="card-row"><strong>#{index + 1}</strong></div>
            <div className="card-row"><strong>वाहन नंबर:</strong> {entry.registration}</div>
            <div className="card-row"><strong>KM:</strong> {entry.kilometers}</div>
            <div className="card-row"><strong>मॉडल:</strong> {entry.model}</div>
            <div className="card-row"><strong>तारीख:</strong> {formatDate(entry.date)}</div>
            <div className="card-row"><strong>समय:</strong> {formatTime(entry.time)}</div>
            <div className="card-row"><strong>स्थिति:</strong> {renderSummary(entry.items, entry.otherIssue)}</div>

            <div className="card-row">
              <strong>अन्य समस्या:</strong>{' '}
              {entry.otherIssue && entry.otherIssue.trim() !== ''
                ? entry.otherIssue
                : '✅ कोई अतिरिक्त समस्या नहीं'}
            </div>

            <button
              onClick={() => handlePrint(entry)}
              style={{
                marginTop: '10px',
                padding: '6px 10px',
                backgroundColor: '276CF5',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              🖨️ प्रिंट
            </button>
            <button
              onClick={() => {
                const reportWindow = window.open('', '', 'width=800,height=700');
                reportWindow.document.write(`
                  <html>
                    <head>
                      <title>Checksheet Report</title>
                    </head>
                    <body>
                      <div id="report-root"></div>
                    </body>
                  </html>
                `);
                reportWindow.document.close();
                setTimeout(() => {
                  import('react-dom/server').then((ReactDOMServer) => {
                    const html = ReactDOMServer.renderToStaticMarkup(
                      <PrintableEntry entry={entry} checklistLabels={checklistLabels} />
                    );
                    reportWindow.document.getElementById('report-root').innerHTML = html;
                  });
                }, 300);
              }}
              style={{
                marginTop: '10px',
                marginLeft: '10px',
                padding: '6px 10px',
                backgroundColor: '276CF5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              📄 View Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewEntries;
