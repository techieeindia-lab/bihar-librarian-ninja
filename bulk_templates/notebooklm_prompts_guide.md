# 📚 NotebookLM Prompt & Generation Guide (25 Master Topics)

This guide provides ready-to-copy prompts to generate **Topic-Wise Flashcards** and **Topic-Wise One-Liners** using Google NotebookLM.

Both Flashcards and One-Liners are strictly organized across the **5 Core Units × 5 Topics = 25 Master Topics Matrix**.

---

## 🗺️ Master Curriculum Reference (25 Topics)

| Unit | Topic ID | Unit Number | Topic Title (Hindi & English) |
| :--- | :--- | :---: | :--- |
| **यूनिट 1** | `u1_t1` | 1 | 1.1 पुस्तकालयों की अवधारणा, प्रकार एवं समाज में भूमिका (Concept & Role in Society) |
| | `u1_t2` | 1 | 1.2 भारत में पुस्तकालय विकास, आंदोलन एवं प्रमुख समितियां (Library Movement & Committees) |
| | `u1_t3` | 1 | 1.3 पुस्तकालय संघ एवं संगठन: ILA, IASLIC, IFLA, UNESCO व RRRLF (Associations & RRRLF) |
| | `u1_t4` | 1 | 1.4 डॉ. एस.आर. रंगनाथन एवं पुस्तकालय विज्ञान के 5 सूत्र (Five Laws of Library Science) |
| | `u1_t5` | 1 | 1.5 पुस्तकालय विधान, 19 राज्य अधिनियम व बिहार धरोहर (Library Acts & Bihar Heritage) |
| **यूनिट 2** | `u2_t1` | 2 | 2.1 ज्ञान जगत की संरचना एवं विषय निर्माण की विधियां (Universe of Knowledge & Subject Formation) |
| | `u2_t2` | 2 | 2.2 ग्रंथ वर्गीकरण के सिद्धांत एवं DDC (Dewey Decimal Classification) |
| | `u2_t3` | 2 | 2.3 कोलन वर्गीकरण (Colon Classification - CC) एवं UDC (CC & UDC) |
| | `u2_t4` | 2 | 2.4 पुस्तकालय सूचीकरण: CCC एवं AACR-2 (Cataloguing Codes: CCC & AACR-2) |
| | `u2_t5` | 2 | 2.5 मानकीकरण, विषय अनुक्रमणीकरण व MARC-21 / RDA (MARC-21, RDA & Indexing) |
| **यूनिट 3** | `u3_t1` | 3 | 3.1 सूचना स्रोतों की श्रेणियां: प्राथमिक, द्वितीयक एवं तृतीयक (Primary, Secondary & Tertiary) |
| | `u3_t2` | 3 | 3.2 संदर्भ ग्रंथ: विश्वकोश, शब्दकोश, ईयरबुक व डायरेक्ट्री (Reference Books & Tools) |
| | `u3_t3` | 3 | 3.3 संदर्भ सेवा एवं सूचना सेवाएं: CAS, SDI व अनुवाद (Reference Services, CAS & SDI) |
| | `u3_t4` | 3 | 3.4 सूचना साक्षरता, प्रयोक्ता अध्ययन एवं ग्रंथसूची नियंत्रण (Information Literacy & UBC) |
| | `u3_t5` | 3 | 3.5 सूचना प्रणालियां एवं कंसोर्सिया: INFLIBNET, DELNET, NISCAIR (Networks & Consortia) |
| **यूनिट 4** | `u4_t1` | 4 | 4.1 प्रबंधन के सिद्धांत, POSDCORB एवं वैज्ञानिक प्रबंधन (Management Principles & POSDCORB) |
| | `u4_t2` | 4 | 4.2 अर्जन अनुभाग: पुस्तक चयन, आदेश एवं प्राप्ति प्रक्रिया (Acquisition & Book Selection) |
| | `u4_t3` | 4 | 4.3 परिसंचरण अनुभाग: ब्राउन एवं नेवार्क निर्गम प्रणालियां (Circulation & Issue Systems) |
| | `u4_t4` | 4 | 4.4 वित्तीय प्रबंधन एवं बजट निर्माण विधियां: ZBB, PPBS (Financial Management & Budgeting) |
| | `u4_t5` | 4 | 4.5 अनुरक्षण, भौतिक सत्यापन, वीडिंग एवं जिल्दसाजी (Maintenance, Stock Verification & Binding) |
| **यूनिट 5** | `u5_t1` | 5 | 5.1 पुस्तकालय स्वचालन: ILMS सॉफ्टवेयर (Koha, SOUL 3.0, e-Granthalaya) (Automation & ILMS) |
| | `u5_t2` | 5 | 5.2 बारकोड, RFID तकनीक एवं सुरक्षा प्रणालियां (Barcode & RFID Technology) |
| | `u5_t3` | 5 | 5.3 डिजिटल पुस्तकालय, संस्थागत रिपॉजिटरी एवं DSpace (Digital Libraries & DSpace) |
| | `u5_t4` | 5 | 5.4 इंटरनेट, खोज तकनीकें, बूलियन ऑपरेटर्स एवं OPAC/Web-OPAC (Internet, Search & OPAC) |
| | `u5_t5` | 5 | 5.5 राष्ट्रीय शिक्षा नीति (NEP 2020) एवं विद्यालय पुस्तकालय शिक्षाशास्त्र (NEP 2020 & Pedagogy) |

---

## 📖 1. Prompt for Generating Study Notes (स्टडी नोट्स प्रॉम्प्ट)

Copy and paste this prompt into NotebookLM whenever you want to generate comprehensive study notes for a specific topic:

```markdown
You are a Senior Library and Information Science faculty member and syllabus expert preparing comprehensive, high-yield study material for Bihar Librarian Recruitment candidates.
Based on the attached book/syllabus sources, generate in-depth, structured, bilingual Study Notes for:

TOPIC ID: [e.g., u1_t1]
UNIT ID: [e.g., unit_1]
TOPIC ORDER: [e.g., 1]
TOPIC TITLE HINDI: [e.g., 1.1 पुस्तकालयों की अवधारणा, प्रकार एवं समाज में भूमिका]
TOPIC TITLE ENGLISH: [e.g., 1.1 Concept, Types of Libraries & Role in Society]

Format your output STRICTLY as a JSON array matching this exact schema:

[
  {
    "id": "u1_t1",
    "unit_id": "unit_1",
    "topic_order": 1,
    "title_hi": "1.1 पुस्तकालयों की अवधारणा, प्रकार एवं समाज में भूमिका",
    "title_en": "1.1 Concept, Types of Libraries & Role in Society",
    "content_hi": "[Detailed, authoritative, highly structured study text in Hindi with clean numbered headings, bullet points, standard definitions, acts, committees, and years]",
    "content_en": "[Detailed, authoritative study text in English covering the exact same concepts, definitions, and facts]",
    "key_points": [
      {
        "hi": "[हाई-यील्ड मुख्य परीक्षा बिंदु 1]",
        "en": "[High-Yield Core Exam Fact 1]"
      },
      {
        "hi": "[हाई-यील्ड मुख्य परीक्षा बिंदु 2]",
        "en": "[High-Yield Core Exam Fact 2]"
      },
      {
        "hi": "[हाई-यील्ड मुख्य परीक्षा बिंदु 3]",
        "en": "[High-Yield Core Exam Fact 3]"
      }
    ]
  }
]

RULES:
1. Provide rich, exhaustive content (at least 400-600 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.
2. Ensure accurate bilingual terminology in both Hindi and English.
3. Return ONLY valid JSON without markdown wrapping outside the array.
(नोट: ऐप अब Markdown सिंटैक्स को अपने आप पहचानकर सुंदर हेडिंग्स और बोल्ड टेक्स्ट में स्टाइल करता है।)
```

---

## 🗂️ 2. Prompt for Generating Flashcards (फ्लैशकार्ड्स प्रॉम्प्ट)

Copy and paste this prompt into NotebookLM whenever you want to generate flashcards for a specific topic:

```markdown
You are a Library and Information Science exam expert for Bihar Librarian Recruitment.
Based on the attached sources, generate 5 to 10 high-yield Revision Flashcards for:

TOPIC ID: [e.g., u1_t4]
UNIT NUMBER: [e.g., 1]
TOPIC TITLE: [e.g., 1.4 डॉ. एस.आर. रंगनाथन एवं पुस्तकालय विज्ञान के 5 सूत्र]

Format your output STRICTLY as a JSON array matching this exact schema:

[
  {
    "id": "fc_[topic_id]_[number]",
    "unit_number": [1-5],
    "topic_id": "[uX_tY]",
    "category_hi": "टॉपिक [X.Y]: [Topic Title Hindi]",
    "category_en": "Topic [X.Y]: [Topic Title English]",
    "front_hi": "[Hindi Question/Prompt - e.g. पुस्तकालय विज्ञान के 5 सूत्रों का प्रतिपादन कब हुआ?]",
    "front_en": "[English Question/Prompt - e.g. When were the 5 Laws formulated?]",
    "back_hi": "[Crisp, accurate Hindi Answer - e.g. 1928 (मीनाक्षी कॉलेज, अन्नामलाई नगर)]",
    "back_en": "[Crisp, accurate English Answer - e.g. 1928 (Meenakshi College, Annamalainagar)]",
    "subtext_hi": "[Optional short exam tip or context in Hindi]",
    "subtext_en": "[Optional short exam tip or context in English]"
  }
]

RULES:
1. Ensure both front and back have accurate Hindi and English translations.
2. Focus on dates, names, founders, edition years, and key principles.
3. Return ONLY valid JSON.
```

---

## 📌 2. Prompt for Generating One-Liners (वन-लाइनर्स प्रॉम्प्ट)

Copy and paste this prompt into NotebookLM whenever you want to generate one-liners for a specific topic:

```markdown
You are a Library and Information Science exam specialist preparing content for Bihar Librarian candidates.
Based on the attached sources, generate 8 to 15 High-Yield One-Liner Exam Facts for:

TOPIC ID: [e.g., u2_t2]
UNIT NUMBER: [e.g., 2]
TOPIC TITLE: [e.g., 2.2 ग्रंथ वर्गीकरण के सिद्धांत एवं DDC]

Format your output STRICTLY as a JSON array matching this exact schema:

[
  {
    "id": "ol_[topic_id]_[number]",
    "unit_number": [1-5],
    "topic_id": "[uX_tY]",
    "category_hi": "यूनिट [X]: [Unit Title Hindi]",
    "category_en": "Unit [X]: [Unit Title English]",
    "category_key": "[uX_tY]",
    "topic_hi": "टॉपिक [X.Y]: [Subtopic Name Hindi]",
    "topic_en": "Topic [X.Y]: [Subtopic Name English]",
    "statement_hi": "[Accurate Hindi single-sentence exam fact without fluff]",
    "statement_en": "[Accurate English single-sentence exam fact]",
    "tag": "[e.g. 100% Exam Point / BPSC PYQ / High Yield / Core Concept]",
    "is_important": [true or false]
  }
]

RULES:
1. Focus on standard definitions, formulas, edition years, volume counts, and direct exam points.
2. Set is_important: true for the top repeated questions.
3. Provide authentic bilingual content in Hindi and English.
4. Return ONLY valid JSON.
```

---

---

## 🎯 4. Prompt for Generating 10-MCQ Topic Sets (10 प्रश्नों का बहुविकल्पीय सेट प्रॉम्प्ट)

Copy and paste this prompt into NotebookLM, Gemini, or ChatGPT whenever you want to generate a new 10-MCQ set (Set 2, Set 3, Set 4, etc.) for any of the 29 topics:

```markdown
You are a Senior Library & Information Science exam specialist preparing high-yield question papers for Bihar Librarian Recruitment (BPSC / KVS / NVS / DSSSB / UGC NET).
Based on the attached materials, generate a structured, bilingual 10-Question MCQ Practice Set for:

TOPIC ID: [e.g., u2_t2]
UNIT NUMBER: [e.g., 2]
SET NUMBER: [e.g., 2]
SET FOCUS: [Set 1: Core Definitions & Recall / Set 2: Technical Canons & Rules / Set 3: Exam PYQs]
TOPIC TITLE: [e.g., 2.2 ग्रंथ वर्गीकरण के सिद्धांत एवं DDC]
CATEGORY: [e.g., classification_cataloguing]

Format your output STRICTLY as a valid JSON object matching this exact schema:

{
  "quizzes": [
    {
      "id": "quiz_[topic_id]_s[set_number]",
      "topic_id": "[uX_tY]",
      "unit_number": [1-5],
      "set_number": [set_number],
      "set_name_hi": "सेट [set_number] ([संक्षिप्त विषय])",
      "set_name_en": "Set [set_number] ([Short Topic])",
      "title_hi": "टॉपिक [X.Y] (सेट [set_number]): [Topic Title Hindi]",
      "title_en": "Topic [X.Y] (Set [set_number]): [Topic Title English]",
      "subtitle_hi": "[मुख्य 3-4 अवधारणाएं या परीक्षा बिंदु]",
      "subtitle_en": "[Core 3-4 concepts or exam targets]",
      "category": "[classification / foundations / reference / management / automation]",
      "question_count": 10,
      "question_ids": [
        "q_[topic_id]_s[set_number]_1",
        "q_[topic_id]_s[set_number]_2",
        "q_[topic_id]_s[set_number]_3",
        "q_[topic_id]_s[set_number]_4",
        "q_[topic_id]_s[set_number]_5",
        "q_[topic_id]_s[set_number]_6",
        "q_[topic_id]_s[set_number]_7",
        "q_[topic_id]_s[set_number]_8",
        "q_[topic_id]_s[set_number]_9",
        "q_[topic_id]_s[set_number]_10"
      ],
      "duration_minutes": 8,
      "reward_xp": 50,
      "badge_hi": "यूनिट [X.Y] • सेट [set_number]",
      "badge_en": "Unit [X.Y] • Set [set_number]",
      "difficulty": "medium",
      "color": "#06B6D4",
      "icon": "book"
    }
  ],
  "questions": [
    {
      "id": "q_[topic_id]_s[set_number]_1",
      "category": "[category_key]",
      "topic_id": "[uX_tY]",
      "unit_number": [1-5],
      "question_hi": "[स्पष्ट, सटीक एवं प्रामाणिक हिंदी प्रश्न]",
      "question_en": "[Clear, authentic English question]",
      "option_a_hi": "[सही विकल्प A हिंदी]",
      "option_a_en": "[Correct Option A English]",
      "option_b_hi": "[विकल्प B हिंदी]",
      "option_b_en": "[Option B English]",
      "option_c_hi": "[विकल्प C हिंदी]",
      "option_c_en": "[Option C English]",
      "option_d_hi": "[विकल्प D हिंदी]",
      "option_d_en": "[Option D English]",
      "correct_answer": "A",
      "explanation_hi": "[विस्तृत प्रामाणिक व्याख्या, वर्ष, समिति, नियम या रंगनाथन के सूत्र का उल्लेख]",
      "explanation_en": "[Detailed authoritative explanation citing acts, years, or canon rules]",
      "difficulty": "medium",
      "year": "2023",
      "source_exam": "BPSC / KVS Librarian"
    }
  ]
}

RULES:
1. Provide exactly 10 questions numbered 1 to 10.
2. All 4 options (A, B, C, D) and explanations must be provided in both Hindi and English.
3. Keep the content 100% exam-accurate for BPSC Teacher Librarian, KVS, and NVS exams.
4. Return ONLY valid JSON without markdown wrapping outside the object.
```

---

## 🚀 How to Save the Data into Supabase

### 📥 1. For MCQs & Quizzes (Adding Sets):
Save the generated JSON to a file (e.g. `bulk_templates/my_new_set.json`), then run:
```bash
node scripts/add_topic_set.mjs bulk_templates/my_new_set.json
```
This single command will:
- Upsert all 10 questions into Supabase.
- Upsert the new Quiz Set into Supabase.
- Synchronize local offline JavaScript bundles (`src/data/questions.ts` and `src/data/quizzes.ts`).

### 📥 2. For Flashcards & One-Liners:
1. Paste JSON into `bulk_templates/notebooklm_flashcards_template.json` or `bulk_templates/notebooklm_oneliners_template.json`.
2. Push to Supabase via:
   ```bash
   node scripts/seed_remote_db.mjs
   ```
3. Sync local offline files:
   ```bash
   node scripts/export_all_to_local.mjs
   ```

### 📱 3. In-App Live Sync:
Open the app &rarr; Go to **More / Settings** &rarr; Tap **"Sync From Cloud DB"**.
All new sets and questions will instantly appear on the Quiz screen!
