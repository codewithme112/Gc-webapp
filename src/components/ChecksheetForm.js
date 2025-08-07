import React, { useState, useEffect } from 'react';
import { fetchTodayCount } from '../utils/fetchTodayCount';

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
  "रेट्रो जांचें"
];

const ChecksheetForm = () => {
  const [formData, setFormData] = useState({
    registration: '',
    kilometers: '',
    model: '',
    date: '',
    time: '',
    otherIssue: '',
    items: checklistLabels.map(() => ({ status: 'हाँ', remark: 'ठीक है' }))
  });

  const [todayCount, setTodayCount] = useState(0);

  useEffect(() => {
    const now = new Date();
    setFormData((prev) => ({
      ...prev,
      date: now.toLocaleDateString('hi-IN'),
      time: now.toLocaleTimeString('hi-IN'),
    }));

    fetchTodayCount().then(setTodayCount);
  }, []);

  const handleChange = (index, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index].status = value;
    updatedItems[index].remark = value === 'नहीं' ? '' : 'ठीक है';
    setFormData({ ...formData, items: updatedItems });
  };

  const handleRemarkChange = (index, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index].remark = value;
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzTVbKkNudqmXgPJaBM-olgZw-s8cr9N6H09G2IEQPG5aZLbfzrfbJKK0squ-UPegCbyA/exec', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('✅ सेव हो गया!');
        setFormData({
          registration: '',
          kilometers: '',
          model: '',
          date: formData.date,
          time: formData.time,
          otherIssue: '',
          items: checklistLabels.map(() => ({ status: 'हाँ', remark: 'ठीक है' }))
        });
        setTodayCount(todayCount + 1);
      } else {
        alert('❌ कुछ गलत हो गया!');
      }
    } catch (err) {
      console.error(err);
      alert('❌ नेटवर्क समस्या! कृपया दोबारा प्रयास करें।');
    }
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center' }}>🔧 जनरल चेकअप फॉर्म</h2>
      <p>आज की कुल एंट्री: <strong>{todayCount}</strong></p>

      <form onSubmit={handleSubmit}>
        <label>वाहन नंबर:</label>
        <input
          style={{ backgroundColor: '#E3E7FF' }}
          value={formData.registration}
          onChange={(e) => {
            const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            setFormData({ ...formData, registration: val });
          }}
          required
        />

        <label>किलोमीटर:</label>
        <input
          style={{ backgroundColor: '#E3E7FF' }}
          value={formData.kilometers}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '').slice(0, 8);
            setFormData({ ...formData, kilometers: val });
          }}
          required
        />

        <label>मॉडल नंबर:</label>
        <input
          style={{ backgroundColor: '#E3E7FF' }}
          value={formData.model}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '').slice(0, 4);
            setFormData({ ...formData, model: val });
          }}
          required
        />

        <p style={{ fontWeight: 'bold', border: '1px solid white' }}>
          📅 तारीख: {formData.date} | ⏰ समय: {formData.time}
        </p>

        {checklistLabels.map((label, index) => (
          <div
            key={index}
            style={{
              marginTop: '10px',
              backgroundColor: '#E3E7FF',
              padding: '4px',
              margin: '3px',
              borderRadius: '3px',
              fontWeight: 'bold',
            }}
          >
            <label>{index + 1}. {label}</label><br />
            <select
              style={{ backgroundColor: '#7187F0', color: 'white' }}
              value={formData.items[index].status}
              onChange={(e) => handleChange(index, e.target.value)}
            >
              <option value="हाँ">✅</option>
              <option value="नहीं">❌</option>
            </select>
            {formData.items[index].status === 'नहीं' && (
              <input
                style={{ backgroundColor: '#E3E7FF', border: '1px solid black' }}
                type="text"
                placeholder="टिप्पणी दर्ज करें"
                value={formData.items[index].remark}
                onChange={(e) => handleRemarkChange(index, e.target.value)}
                required
              />
            )}
          </div>
        ))}

        <label style={{ fontWeight: 'bold' }}>🛠️ अन्य समस्या (अगर कोई हो):</label>
        <textarea
          value={formData.otherIssue || ''}
          onChange={(e) => setFormData({ ...formData, otherIssue: e.target.value })}
          placeholder="यहाँ कोई और दिक्कत लिखें..."
          rows={3}
          style={{ width: '100%', marginBottom: '0rem', backgroundColor: '#E3E7FF' }}
        ></textarea>

        <p>🔖 एडवाइजर: <strong>Ranveer Singh Rathore</strong></p>

        <button type="submit" style={{ marginRight: '10px' }}>✅ सबमिट करें</button>
      </form>
    </div>
  );
};

export default ChecksheetForm;
