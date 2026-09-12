# 📚 PYQ Book Extraction & Ingestion Guide (विगत वर्ष हल प्रश्न-पत्र)

यह संपूर्ण गाइड आपकी पुस्तक के **50 हल प्रश्न-पत्रों (कुल 4,323 प्रश्न)** को व्यवस्थित रूप से एक्सट्रैक्ट करके **Bihar Librarian Ninja** मोबाइल ऐप में लाइव CBT टेस्ट बनाने के लिए तैयार की गई है।

---

## 🎯 प्राथमिकता रणनीति (3-चरण कार्ययोजना)

4,323 प्रश्नों की इस विशाल पुस्तक को एक साथ करने के बजाय, **उच्चतम अंक व सबसे लोकप्रिय परीक्षाओं** के अनुसार 3 चरणों में करें:

### 🥇 Phase 1: Core Librarian Exams (सर्वोच्च प्राथमिकता • 9 पेपर्स • ~970 प्रश्न)
इन परीक्षाओं के प्रश्न बिहार लाइब्रेरियन परीक्षा में सबसे ज़्यादा बार रिपीट होते हैं:
1. **KVS (केन्द्रीय विद्यालय)**:
   - KVS भाग-II (दिसम्बर 2018) — 100 प्रश्न
   - KVS भाग-II (सितम्बर 2015) — 100 प्रश्न
   - KVS भाग-II (सितम्बर 2013) — 100 प्रश्न
2. **NVS (नवोदय विद्यालय)**:
   - NVS पुस्तकालय विज्ञान (3 अक्टूबर 2019) — 100 प्रश्न
   - NVS लाइब्रेरियन (दिसम्बर 2016) — 70 प्रश्न
3. **DSSSB (दिल्ली अधीनस्थ)**:
   - DSSSB लाइब्रेरियन (1 सितम्बर 2019) — 100 प्रश्न
   - DSSSB लाइब्रेरियन (2014) — 100 प्रश्न
4. **RSMSSB / RPSC (राजस्थान)**:
   - RSMSSB लाइब्रेरियन ग्रेड-III (2020) — 100 प्रश्न
   - RSMSSB (29 दिसम्बर 2019) — 100 प्रश्न

### 🥈 Phase 2: UGC-NET Curated Papers (द्वितीय प्राथमिकता • 27 सेट्स)
- UGC-NET (2012 से 2020) — 1925 प्रश्न। इसे 50-50 प्रश्नों के मास्टर टेस्ट पेपर्स में 2-3 सेट्स प्रति सप्ताह के रूप में जोड़ें।

### 🥉 Phase 3: State PSC & Technical Exams (तृतीय प्राथमिकता)
- ISRO (4 पेपर्स - 240 प्रश्न)
- MPPSC (200 प्रश्न)
- UKSSSC (200 प्रश्न)
- RPSC ग्रेड I व II (400 प्रश्न)
- CGPSC व Haryana (238 प्रश्न)

---

## 🛠️ स्टेप-बाय-स्टेप एक्सट्रैक्शन प्रक्रिया

### स्टेप 1: Google AI Studio खोलें
1. [aistudio.google.com](https://aistudio.google.com) पर जाएं (Google अकाउंट से लॉगिन करें, 100% निःशुल्क है)।
2. ऊपर दाईं ओर **Create New Prompt** चुनें।
3. Model में **Gemini 2.5 Flash** चुनें (इसकी कॉन्टेक्स्ट विंडो 10 लाख टोकन की है और यह हिंदी विज़न में विश्व में सर्वश्रेष्ठ है)।
4. **+ (Attach)** बटन दबाकर अपनी PDF बुक में से उस परीक्षा के पेजों का बैच अपलोड करें (जैसे NVS 2019 के 10-12 पेज)।

---

### स्टेप 2: मास्टर एक्सट्रैक्शन प्रॉम्प्ट (AI Studio में पेस्ट करें)

```markdown
You are an authoritative Senior Faculty in Library & Information Science and expert exam digitizer.
Analyze the attached scanned/printed pages of the Previous Year Question (PYQ) book for:

EXAM NAME: नवोदय विद्यालय संगठन पुस्तकालय विज्ञान लाइब्रेरियन (NVS 2019)
EXAM YEAR: 2019
EXAM DATE: 03 October 2019
TOTAL QUESTIONS: 100

TASK:
Extract EVERY single Multiple Choice Question (MCQ) from the pages in sequential order without omitting any question.

STRICT FORMATTING AND BILINGUAL RULES:
1. BILINGUAL CONTENT:
   - Preserve the exact authentic Hindi text from the book for "question_hi", options A-D, and detailed explanation ("explanation_hi").
   - Automatically translate the question, all 4 options, and explanation into high-quality, professional Library & Information Science English ("question_en", options A-D en, "explanation_en").
2. CORRECT ANSWER:
   - "correct_answer" must be strictly one character: "A", "B", "C", or "D".
3. ACCURACY:
   - Capture all committee names, acts, years, classification notations (DDC, CC, UDC), and cataloguing codes (AACR-2, CCC) with zero spelling errors.
4. CATEGORY:
   - Categorize each question into one of: "lis_foundations", "classification_cataloguing", "reference_sources", "automation_ict", "management", "bihar_gk", "teaching_aptitude".

OUTPUT FORMAT:
Return ONLY a valid JSON object matching this exact schema:

{
  "exam_name": "NVS Librarian 2019",
  "year": "2019",
  "exam_tag": "NVS",
  "quiz_id": "quiz_pyq_nvs_2019",
  "title_hi": "NVS लाइब्रेरियन 2019 मूल हल प्रश्न-पत्र",
  "title_en": "NVS Librarian 2019 Authentic Solved Paper",
  "subtitle_hi": "3 अक्टूबर 2019 परीक्षा • 100 प्रश्न • संपूर्ण हिंदी व अंग्रेज़ी व्याख्या",
  "subtitle_en": "03 Oct 2019 Official Exam • 100 Questions with bilingual solutions",
  "duration_minutes": 120,
  "category": "foundations",
  "color": "#0070F3",
  "questions": [
    {
      "id": "q_nvs_2019_1",
      "category": "lis_foundations",
      "question_hi": "[पुस्तक से मूल हिंदी प्रश्न]",
      "question_en": "[Professional English translation]",
      "option_a_hi": "[विकल्प A हिंदी]",
      "option_a_en": "[Option A English]",
      "option_b_hi": "[विकल्प B हिंदी]",
      "option_b_en": "[Option B English]",
      "option_c_hi": "[विकल्प C हिंदी]",
      "option_c_en": "[Option C English]",
      "option_d_hi": "[विकल्प D हिंदी]",
      "option_d_en": "[Option D English]",
      "correct_answer": "A",
      "explanation_hi": "[पुस्तक से विस्तृत हिंदी व्याख्या/हल]",
      "explanation_en": "[Detailed English explanation of the solution]",
      "difficulty": "medium",
      "year": "2019",
      "source_exam": "NVS Librarian 03 Oct 2019"
    }
  ]
}
```

> 💡 **टिप:** यदि एक परीक्षा में 100 प्रश्न हैं, तो आप AI Studio में 50-50 प्रश्नों के दो बैच (उदा. पेज़ 1-7 और फिर पेज़ 8-15) में भी निकाल सकते हैं।

---

### स्टेप 3: JSON फ़ाइल को सेव करना
AI Studio से प्राप्त JSON को कॉपी करें और अपने प्रोजेक्ट में इस नाम से सेव करें:
📍 `bulk_templates/pyq_nvs_2019.json` (या संबंधित परीक्षा का नाम).

---

### स्टेप 4: 1-क्लिक इम्पोर्ट कमांड रन करना
टर्मिनल / VS Code में केवल यह कमांड चलाएं:

```powershell
node scripts/import_pyq_exam.mjs bulk_templates/pyq_nvs_2019.json
```

#### यह कमांड स्वचालित रूप से क्या-क्या करती है:
1. **Option A Bias Detection & Shuffle**: यदि AI ने गलती से अधिकांश सही उत्तर A पर रख दिए हैं, तो यह स्क्रिप्ट अपने आप सभी ऑप्शन्स को A, B, C, D पर संतुलित (shuffle) कर देती है।
2. **Supabase Database**: सीधे क्लाउड डेटाबेस के `questions` और `quizzes` में नया पेपर डाल देती है।
3. **Local Offline Sync**: आपके ऐप की लोकल फ़ाइलों `src/data/questions.ts` और `src/data/quizzes.ts` को 1 सेकंड में अपडेट कर देती है ताकि बिना इंटरनेट के भी सभी प्रश्न काम करें।
4. **App Ready**: ऐप खोलते ही छात्र इस पेपर का पूरा 120 मिनट का CBT टेस्ट दे सकते हैं!
