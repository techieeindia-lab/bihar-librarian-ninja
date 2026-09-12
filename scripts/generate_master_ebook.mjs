import * as fs from 'fs';
import * as path from 'path';
import ts from 'typescript';

function evaluateTsFile(filePath, exportName) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const cleaned = fileContent.replace(/import\s+[^;]+;/g, '');
  const result = ts.transpileModule(cleaned, {
    compilerOptions: { module: ts.ModuleKind.CommonJS }
  });
  const module = { exports: {} };
  const fn = new Function('module', 'exports', result.outputText);
  fn(module, module.exports);
  return module.exports[exportName];
}

console.log('Loading content data for Master E-Book...');
const studyUnits = evaluateTsFile('src/data/studyNotes.ts', 'STUDY_UNITS');
const oneLiners = evaluateTsFile('src/data/oneLiners.ts', 'ONE_LINERS');
const glossaryItems = evaluateTsFile('src/data/glossary.ts', 'GLOSSARY_ITEMS');
const questions = evaluateTsFile('src/data/questions.ts', 'QUESTIONS');

console.log(`Loaded:
- ${studyUnits.length} Study Units (${studyUnits.reduce((acc, u) => acc + u.topics.length, 0)} Topics)
- ${oneLiners.length} One-Liners
- ${glossaryItems.length} Glossary Terms
- ${questions.length} MCQs Pool`);

function markdownToHtml(md) {
  if (!md) return '';
  let html = md;
  // Headers
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  // Bold & Italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Bullet lists
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  // Tables
  html = html.replace(/\|(.+)\|/g, (match) => {
    const cells = match.split('|').filter((c, i, arr) => i > 0 && i < arr.length - 1);
    if (cells.some(c => c.trim().startsWith('---'))) return '';
    const isHeader = false;
    const renderedCells = cells.map(c => `<td>${c.trim()}</td>`).join('');
    return `<tr>${renderedCells}</tr>`;
  });
  // Paragraphs
  html = html.split('\n\n').map(p => {
    p = p.trim();
    if (!p) return '';
    if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<table') || p.startsWith('<tr')) return p;
    return `<p>${p}</p>`;
  }).join('\n');

  return html;
}

const htmlContent = `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <title>बिहार पुस्तकालयाध्यक्ष परीक्षा 2026 - सम्पूर्ण मास्टर ई-बुक</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@400;600;700;800&family=Inter:wght@400;600;700;800&display=swap');

    @page {
      size: A4;
      margin: 16mm 14mm 16mm 14mm;
      @bottom-right {
        content: counter(page);
      }
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Mukta', 'Inter', sans-serif;
      color: #1E293B;
      background-color: #FFFFFF;
      font-size: 11.5pt;
      line-height: 1.55;
    }

    /* Print Styles */
    @media print {
      body {
        background-color: #FFFFFF;
      }
      .page-break {
        page-break-before: always;
      }
      .no-break {
        page-break-inside: avoid;
      }
      .hide-print {
        display: none !important;
      }
    }

    /* Screen Guide Bar */
    .top-action-bar {
      background: #1E3A8A;
      color: #FFFFFF;
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.15);
    }
    .print-btn {
      background: #F59E0B;
      color: #0F172A;
      font-weight: 800;
      padding: 8px 18px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-size: 14px;
    }

    /* Container */
    .book-container {
      max-width: 850px;
      margin: 0 auto;
      padding: 20px;
    }

    /* COVER PAGE */
    .cover-page {
      min-height: 980px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      padding: 60px 30px;
      border: 8px double #1E3A8A;
      border-radius: 12px;
      background: linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%);
      margin-bottom: 40px;
      page-break-after: always;
    }
    .cover-badge {
      display: inline-block;
      background: #1E3A8A;
      color: #FFFFFF;
      padding: 8px 24px;
      font-weight: 800;
      border-radius: 30px;
      font-size: 13pt;
      letter-spacing: 0.5px;
    }
    .cover-title {
      font-size: 32pt;
      font-weight: 900;
      color: #1E3A8A;
      line-height: 1.25;
      margin: 20px 0 10px;
    }
    .cover-subtitle {
      font-size: 16pt;
      font-weight: 700;
      color: #D97706;
      margin-bottom: 25px;
    }
    .cover-feature-box {
      background: #FFFFFF;
      border: 2px solid #BFDBFE;
      border-radius: 10px;
      padding: 25px 35px;
      text-align: left;
      width: 100%;
      max-width: 600px;
      box-shadow: 0 4px 15px rgba(30, 58, 138, 0.08);
    }
    .feature-item {
      font-size: 13pt;
      font-weight: 700;
      margin-bottom: 12px;
      color: #0F172A;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .cover-footer {
      font-size: 11pt;
      color: #64748B;
      font-weight: 600;
      line-height: 1.5;
    }

    /* TABLE OF CONTENTS */
    .toc-page {
      page-break-after: always;
      padding: 30px 10px;
    }
    .section-heading {
      font-size: 22pt;
      font-weight: 800;
      color: #1E3A8A;
      border-bottom: 3px solid #F59E0B;
      padding-bottom: 6px;
      margin: 30px 0 18px;
    }
    .toc-list {
      list-style: none;
      margin-top: 15px;
    }
    .toc-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px dotted #CBD5E1;
      font-size: 12pt;
      font-weight: 600;
    }

    /* CONTENT CHAPTERS */
    .unit-header {
      background: #1E3A8A;
      color: #FFFFFF;
      padding: 16px 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      page-break-before: always;
    }
    .unit-title {
      font-size: 18pt;
      font-weight: 800;
    }
    .unit-desc {
      font-size: 11pt;
      color: #E2E8F0;
      margin-top: 4px;
    }
    .topic-card {
      margin-bottom: 25px;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 18px 22px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .topic-title {
      font-size: 14pt;
      font-weight: 800;
      color: #0F172A;
      margin-bottom: 12px;
      padding-bottom: 4px;
      border-bottom: 2px solid #E2E8F0;
    }
    .topic-content h3 {
      font-size: 12pt;
      font-weight: 700;
      color: #1E3A8A;
      margin: 14px 0 6px;
    }
    .topic-content h4 {
      font-size: 11pt;
      font-weight: 700;
      color: #B45309;
      margin: 10px 0 4px;
    }
    .topic-content p {
      margin-bottom: 10px;
      text-align: justify;
    }
    .topic-content ul {
      margin-left: 20px;
      margin-bottom: 12px;
    }
    .topic-content li {
      margin-bottom: 4px;
    }

    /* ONE-LINER SECTION */
    .oneliner-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
      margin-top: 15px;
    }
    .oneliner-row {
      background: #F8FAFC;
      border-left: 4px solid #F59E0B;
      padding: 10px 14px;
      border-radius: 0 6px 6px 0;
      page-break-inside: avoid;
    }
    .oneliner-tag {
      font-size: 9pt;
      font-weight: 800;
      color: #B45309;
      text-transform: uppercase;
    }
    .oneliner-statement {
      font-size: 11pt;
      font-weight: 600;
      color: #1E293B;
      margin-top: 3px;
    }

    /* GLOSSARY TABLE */
    .glossary-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }
    .glossary-table th, .glossary-table td {
      border: 1px solid #CBD5E1;
      padding: 8px 12px;
      text-align: left;
      font-size: 10.5pt;
    }
    .glossary-table th {
      background: #1E3A8A;
      color: #FFFFFF;
      font-weight: 700;
    }
    .glossary-table tr:nth-child(even) {
      background: #F8FAFC;
    }
    .glossary-term {
      font-weight: 800;
      color: #1E3A8A;
      font-size: 11pt;
    }
    .glossary-fact {
      color: #92400E;
      font-weight: 600;
      font-size: 10pt;
    }

    /* PRACTICE MCQS */
    .mcq-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 16px;
      page-break-inside: avoid;
    }
    .mcq-qnum {
      font-weight: 800;
      color: #1E3A8A;
      margin-bottom: 6px;
      font-size: 11pt;
    }
    .mcq-options {
      margin: 8px 0;
      padding-left: 10px;
    }
    .mcq-opt {
      font-size: 10.5pt;
      margin-bottom: 3px;
    }
    .mcq-answer {
      background: #ECFDF5;
      border-left: 4px solid #10B981;
      padding: 6px 12px;
      border-radius: 4px;
      margin-top: 8px;
      font-size: 10pt;
      color: #065F46;
    }
  </style>
</head>
<body>

  <!-- Screen View Print Button -->
  <div class="top-action-bar hide-print">
    <div>
      <strong>📚 बिहार पुस्तकालयाध्यक्ष परीक्षा 2026: सम्पूर्ण मास्टर ई-बुक</strong>
      <span style="opacity: 0.8; margin-left: 10px; font-size: 12px;">(Print-Ready A4 PDF Format)</span>
    </div>
    <button class="print-btn" onclick="window.print()">🖨️ Save as PDF (Print)</button>
  </div>

  <div class="book-container">

    <!-- COVER PAGE -->
    <div class="cover-page">
      <div>
        <div class="cover-badge">BSEB LET & BPSC परीक्षा 2026</div>
        <div class="cover-title">बिहार विद्यालय पुस्तकालयाध्यक्ष<br>मास्टर ई-बुक गाइड</div>
        <div class="cover-subtitle">संपूर्ण 5 यूनिट्स • 725+ वन-लाइनर • शब्दावली • 250+ मॉडल प्रश्न</div>
      </div>

      <div class="cover-feature-box">
        <div class="feature-item">✔️ नवीनतम 5 यूनिट्स आधिकारिक पाठ्यक्रम (29 सम्पूर्ण टॉपिक्स)</div>
        <div class="feature-item">✔️ 725+ हाई-यील्ड अचूक वन-लाइनर तथ्य व महत्वपूर्ण वर्ष</div>
        <div class="feature-item">✔️ LIS शब्दावली एवं फुल फॉर्म डिक्शनरी (SOUL, DDC, 1933)</div>
        <div class="feature-item">✔️ 250+ परीक्षा-उपयोगी बहुविकल्पीय प्रश्न (विस्तृत व्याख्या सहित)</div>
        <div class="feature-item">✔️ डॉ. रंगनाथन के 5 सूत्र, वर्गीकरण, सूचीकरण व स्वचालन</div>
      </div>

      <div class="cover-footer">
        <strong>तैयारकर्ता: Bihar Librarian Ninja Exam Prep Team</strong><br>
        100% सटीक एवं नवीनतम परीक्षा पैटर्न पर आधारित अध्ययन सामग्री
      </div>
    </div>

    <!-- TABLE OF CONTENTS -->
    <div class="toc-page">
      <div class="section-heading">📑 विषय सूची (TABLE OF CONTENTS)</div>
      <ul class="toc-list">
        <li class="toc-item"><span>भाग 1: सम्पूर्ण 5 यूनिट्स विस्तृत थ्योरी नोट्स (29 टॉपिक्स)</span> <span>यूनिट 1 - 5</span></li>
        <li class="toc-item"><span>• यूनिट 1: पुस्तकालय, समाज एवं कानून</span> <span>अध्याय 1.1 - 1.5</span></li>
        <li class="toc-item"><span>• यूनिट 2: पुस्तकालय वर्गीकरण एवं सूचीकरण</span> <span>अध्याय 2.1 - 2.7</span></li>
        <li class="toc-item"><span>• यूनिट 3: सूचना स्रोत एवं संदर्भ सेवाएं</span> <span>अध्याय 3.1 - 3.5</span></li>
        <li class="toc-item"><span>• यूनिट 4: पुस्तकालय प्रबंधन एवं प्रशासन</span> <span>अध्याय 4.1 - 4.7</span></li>
        <li class="toc-item"><span>• यूनिट 5: सूचना प्रौद्योगिकी एवं पुस्तकालय स्वचालन</span> <span>अध्याय 5.1 - 5.5</span></li>
        <li class="toc-item"><span>भाग 2: 725+ हाई-यील्ड अचूक वन-लाइनर तथ्य</span> <span>रिवीजन कैप्सूल</span></li>
        <li class="toc-item"><span>भाग 3: LIS शब्दावली एवं महत्वपूर्ण ऐतिहासिक वर्ष डिक्शनरी</span> <span>फुल फॉर्म व टाइमलाइन</span></li>
        <li class="toc-item"><span>भाग 4: 250+ अति-महत्वपूर्ण मॉडल प्रश्न बैंक (विस्तृत व्याख्या सहित)</span> <span>CBT मॉडल पेपर</span></li>
      </ul>
    </div>

    <!-- PART 1: THEORY NOTES -->
    <div class="section-heading page-break">📖 भाग 1: सम्पूर्ण 5 यूनिट्स विस्तृत थ्योरी नोट्स</div>
    ${studyUnits.map(unit => `
      <div class="unit-header">
        <div class="unit-title">${unit.title.hi}</div>
        <div class="unit-desc">${unit.shortDesc.hi}</div>
      </div>

      ${unit.topics.map(topic => `
        <div class="topic-card no-break">
          <div class="topic-title">${topic.title.hi}</div>
          <div class="topic-content">
            ${markdownToHtml(topic.content.hi)}
          </div>
        </div>
      `).join('')}
    `).join('')}

    <!-- PART 2: ONE-LINERS -->
    <div class="section-heading page-break">💡 भाग 2: 725+ हाई-यील्ड अचूक वन-लाइनर तथ्य</div>
    <p style="margin-bottom: 15px; font-weight: 600; color: #64748B;">परीक्षा हॉल में जाने से पहले अंतिम समय में त्वरित रिवीजन के लिए संकलित 725+ अति-महत्वपूर्ण तथ्य:</p>
    <div class="oneliner-grid">
      ${oneLiners.map((item, idx) => `
        <div class="oneliner-row">
          <div class="oneliner-tag">#${idx + 1} • ${item.topic.hi}</div>
          <div class="oneliner-statement">${item.statement.hi}</div>
        </div>
      `).join('')}
    </div>

    <!-- PART 3: GLOSSARY -->
    <div class="section-heading page-break">🔤 भाग 3: LIS शब्दावली एवं महत्वपूर्ण ऐतिहासिक वर्ष डिक्शनरी</div>
    <table class="glossary-table">
      <thead>
        <tr>
          <th style="width: 25%;">पद / वर्ष (Term/Year)</th>
          <th style="width: 40%;">फुल फॉर्म एवं विवरण (Expansion & Description)</th>
          <th style="width: 35%;">परीक्षा मुख्य तथ्य (Exam Hit Fact)</th>
        </tr>
      </thead>
      <tbody>
        ${glossaryItems.map(item => `
          <tr>
            <td>
              <span class="glossary-term">${item.term}</span>
              ${item.year ? `<br><small style="color: #B45309; font-weight: 700;">वर्ष: ${item.year}</small>` : ''}
            </td>
            <td>
              ${item.expansion ? `<strong>${item.expansion.hi || item.expansion.en}</strong><br>` : ''}
              ${item.description.hi}
            </td>
            <td class="glossary-fact">
              💡 ${item.keyExamFact.hi}
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- PART 4: MODEL QUESTIONS -->
    <div class="section-heading page-break">🎯 भाग 4: 250+ अति-महत्वपूर्ण मॉडल प्रश्न बैंक</div>
    <p style="margin-bottom: 15px; font-weight: 600; color: #64748B;">नवीनतम BSEB LET एवं BPSC परीक्षा पैटर्न पर आधारित महत्वपूर्ण प्रश्न मय व्याख्या:</p>
    <div>
      ${questions.slice(0, 250).map((q, idx) => `
        <div class="mcq-card no-break">
          <div class="mcq-qnum">प्रश्न ${idx + 1}: ${q.question.hi}</div>
          <div class="mcq-options">
            <div class="mcq-opt"><strong>(A)</strong> ${q.options.A.hi}</div>
            <div class="mcq-opt"><strong>(B)</strong> ${q.options.B.hi}</div>
            <div class="mcq-opt"><strong>(C)</strong> ${q.options.C.hi}</div>
            <div class="mcq-opt"><strong>(D)</strong> ${q.options.D.hi}</div>
          </div>
          <div class="mcq-answer">
            <strong>✓ सही उत्तर: (${q.correctAnswer}) ${q.options[q.correctAnswer]?.hi || ''}</strong><br>
            <span style="font-size: 9.5pt; color: #1E293B;">💡 <strong>व्याख्या:</strong> ${q.explanation.hi}</span>
          </div>
        </div>
      `).join('')}
    </div>

  </div>
</body>
</html>
`;

const outputPath = 'BIHAR_LIBRARIAN_MASTER_EBOOK.html';
fs.writeFileSync(outputPath, htmlContent, 'utf8');
console.log(`✅ Master E-Book HTML successfully generated at: ${outputPath}`);
console.log(`File size: ${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB`);
