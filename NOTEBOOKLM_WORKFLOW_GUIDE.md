# 📚 NotebookLM से Study Notes (Topic 1.1) जनरेट एवं डेटाबेस में सेव करने की गाइड

यह गाइड कल के काम के लिए स्टेप-बाय-स्टेप निर्देश प्रदान करती है ताकि आप Google NotebookLM से तैयार स्टडी नोट्स को 1 क्लिक में अपने Supabase डेटाबेस और मोबाइल ऐप में ला सकें।

---

## 📋 STEP 1: NotebookLM में प्रॉम्प्ट (Prompt) देना

NotebookLM में अपनी पुस्तकें/सिलेबस (NIOS, IGNOU या रेफरेंस बुक्स) सोर्स के रूप में अपलोड करने के बाद, चैट बॉक्स में यह प्रॉम्प्ट कॉपी-पेस्ट करें:

```markdown
You are a Senior Library and Information Science faculty member and syllabus expert preparing comprehensive, high-yield study material for Bihar Librarian Recruitment candidates.
Based on the attached book/syllabus sources, generate in-depth, structured, bilingual Study Notes for:

TOPIC ID: u1_t1
UNIT ID: unit_1
TOPIC ORDER: 1
TOPIC TITLE HINDI: 1.1 पुस्तकालयों की अवधारणा, प्रकार एवं समाज में भूमिका
TOPIC TITLE ENGLISH: 1.1 Concept, Types of Libraries & Role in Society

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
        "hi": "यूनेस्को पब्लिक लाइब्रेरी मेनिफेस्टो: 1949 (संशोधित 1972 व 1994)",
        "en": "UNESCO Public Library Manifesto: 1949 (revised 1972 & 1994)"
      },
      {
        "hi": "सार्वजनिक पुस्तकालय: जनता का विश्वविद्यालय (People's University)",
        "en": "Public Library: Often termed People's University"
      },
      {
        "hi": "भारत का राष्ट्रीय पुस्तकालय: कोलकाता (बेलवेडियर एस्टेट)",
        "en": "National Library of India: Kolkata (Belvedere Estate)"
      }
    ]
  }
]

RULES:
1. Provide rich, exhaustive content (at least 400-600 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.
2. Ensure accurate bilingual terminology in both Hindi and English.
3. Return ONLY valid JSON without markdown wrapping outside the array.
(नोट: अब ऐप में Markdown का ऑटो-फॉर्मैटर लगा है, इसलिए ### हेडिंग्स और **बोल्ड** टेक्स्ट अपने आप ऐप में सुंदर बैनर और बोल्ड स्टाइल में दिखेंगे, कोई कच्चा # या * स्क्रीन पर नहीं दिखेगा!)
```

---

## 📂 STEP 2: आउटपुट को फ़ाइल में सेव करना

NotebookLM से जो JSON आउटपुट मिलेगा, उसे कॉपी करें और इस फ़ाइल में पेस्ट कर दें:

📍 **फ़ाइल पाथ:**  
`bulk_templates/notebooklm_studynotes_template.json`

*(फ़ाइल में पहले से मौजूद पुराने टेक्स्ट को हटाकर यह नया JSON पेस्ट करें और `Ctrl + S` दबाकर सेव कर लें).*

---

## ⚡ STEP 3: डेटाबेस (Supabase) में डेटा भेजना

VS Code / Terminal में बस यह **एक कमांड** रन करें:

```bash
node scripts/import_content.mjs bulk_templates/notebooklm_studynotes_template.json study_topics
```

### यह कमांड क्या करेगी:
1. फ़ाइल के JSON डेटा को वैलिडेट करेगी।
2. सीधे लाइव Supabase डेटाबेस के `study_topics` टेबल में जाकर `u1_t1` (Topic 1.1) को अपडेट कर देगी।
3. टर्मिनल में आपको यह सफलता संदेश दिखेगी:
   ```
   ✓ Inserted batch 1 - 1 of 1
   🎉 Successfully imported 1 rows into "study_topics"!
   👉 Open the app and tap "Sync From Cloud DB" in Settings to instantly see your new content.
   ```

---

## 📱 STEP 4: मोबाइल ऐप में नया डेटा देखना

1. मोबाइल में **Bihar Librarian Ninja** ऐप खोलें।
2. नीचे फुटर में **"More" (अन्य)** टैब पर जाएं।
3. **"Sync From Cloud DB"** (क्लाउड से सिंक करें) बटन दबाएं।
4. अब नीचे बीच में उभरे हुए **"Notes" (नोट्स)** बटन पर टैप करें और **Unit 1 -> Topic 1.1** खोलें।
5. आपका नया नोट्स तुरंत मोबाइल ऐप में दिखने लगेगा!

---

## 🗺️ सभी 29 टॉपिक्स के IDs (रेफरेंस के लिए)

भविष्य के टॉपिक्स के लिए आप [bulk_templates/all_29_notebooklm_prompts.md](bulk_templates/all_29_notebooklm_prompts.md) से सीधे तैयार प्रॉम्प्ट कॉपी कर सकते हैं:

| यूनिट | टॉपिक ID | यूनिट ID | टॉपिक का नाम |
| :--- | :--- | :--- | :--- |
| **यूनिट 1** | `u1_t1` | `unit_1` | 1.1 Types of Libraries & Role in Society |
| | `u1_t2` | `unit_1` | 1.2 Dr. S.R. Ranganathan & Five Laws with Implications |
| | `u1_t3` | `unit_1` | 1.3 Library Legislation in India (19 States) & Delivery of Books Act |
| | `u1_t4` | `unit_1` | 1.4 Library Associations: ILA, IASLIC, IFLA, ALA, UNESCO, FID |
| | `u1_t5` | `unit_1` | 1.5 RRRLF & National Library of India |
| **यूनिट 2** | `u2_t1` | `unit_2` | 2.1 Universe of Knowledge & Modes of Subject Formation |
| | `u2_t2` | `unit_2` | 2.2 Dewey Decimal Classification (DDC 19th & 23rd Ed) |
| | `u2_t3` | `unit_2` | 2.3 Colon Classification (CC 6th Ed) & PMEST Categories |
| | `u2_t4` | `unit_2` | 2.4 Universal Decimal Classification (UDC) & Notation Principles |
| | `u2_t5` | `unit_2` | 2.5 Cataloguing Codes: AACR-2 vs CCC |
| | `u2_t6` | `unit_2` | 2.6 Metadata & Standards: MARC-21, CCF, Dublin Core, RDA |
| | `u2_t7` | `unit_2` | 2.7 Subject Cataloguing & Indexing: Chain Procedure, Sears, PRECIS, POPSI |
| **यूनिट 3** | `u3_t1` | `unit_3` | 3.1 Classification of Information Sources: Primary, Secondary, Tertiary |
| | `u3_t2` | `unit_3` | 3.2 Reference Sources: Dictionaries, Encyclopedias, Yearbooks, Bibliographies |
| | `u3_t3` | `unit_3` | 3.3 Reference Services: Ready Reference vs Long Range Reference |
| | `u3_t4` | `unit_3` | 3.4 Alerting Services: CAS & SDI (Luhn 1958) |
| | `u3_t5` | `unit_3` | 3.5 Library Networks & Consortia: INFLIBNET, DELNET, NDLI, Shodhganga, OCLC |
| **यूनिट 4** | `u4_t1` | `unit_4` | 4.1 Principles of Management: POSDCORB, Henry Fayol 14 Principles |
| | `u4_t2` | `unit_4` | 4.2 Classic Book Selection Principles: Melvil Dewey, Drury, Ranganathan |
| | `u4_t3` | `unit_4` | 4.3 Technical Operations: Acquisition, Accessioning & Cataloguing Routines |
| | `u4_t4` | `unit_4` | 4.4 Circulation Systems: Browne System (1895) & Newark System (1900) |
| | `u4_t5` | `unit_4` | 4.5 Stock Verification, Annual Report & Weeding Out Policies |
| | `u4_t6` | `unit_4` | 4.6 Financial Management & Budgeting: Zero-Based Budgeting (ZBB), PPBS |
| | `u4_t7` | `unit_4` | 4.7 Preservation, Conservation & Binding of Library Materials |
| **यूनिट 5** | `u5_t1` | `unit_5` | 5.1 Basics of ICT, Computer Generations, Hardware, Software & OS |
| | `u5_t2` | `unit_5` | 5.2 Integrated Library Systems (ILS): Koha & Core Modules |
| | `u5_t3` | `unit_5` | 5.3 Indian ILS: SOUL 3.0 (INFLIBNET) & e-Granthalaya 4.0 (NIC for Schools) |
| | `u5_t4` | `unit_5` | 5.4 Identification Technologies: Barcode, RFID & QR Code |
| | `u5_t5` | `unit_5` | 5.5 OPAC & Web-OPAC, Search Techniques (Boolean Operators) |

---

## 💡 सहायता या शंका होने पर
अगर JSON फॉर्मेटिंग में कोई एरर आए, तो बस टर्मिनल में प्रॉम्प्ट या एरर दिखाएं, हम तुरंत उसे ठीक कर देंगे!

