# 📚 Master 29 Topics NotebookLM Prompts (Bihar Librarian Ninja)
> **निर्देश:** नीचे दिए गए 29 टॉपिक्स में से जिस टॉपिक के स्टडी नोट्स बनाने हैं, बस उस टॉपिक के प्रॉम्प्ट को कॉपी करें और Google NotebookLM में पेस्ट करें।  
> जो JSON आउटपुट मिले, उसे `bulk_templates/notebooklm_studynotes_template.json` में पेस्ट करें और यह कमांड चलाएं:  
> `node scripts/import_content.mjs bulk_templates/notebooklm_studynotes_template.json study_topics`  
> काम पूरा होने के बाद आप इस फाइल को आसानी से डिलीट कर सकते हैं।

---

## Quick Navigation: All 29 Master Topics
- **Unit 1 (5 Topics):**
  - [1.1 Types of Libraries & Role in Society](#topic-11-types-of-libraries--role-in-society) (`u1_t1`)
  - [1.2 Dr. S.R. Ranganathan & Five Laws with Implications](#topic-12-dr-sr-ranganathan--five-laws-of-library-science) (`u1_t2`)
  - [1.3 Library Legislation in India (19 States) & Delivery of Books Act](#topic-13-library-legislation-in-india-19-states--delivery-of-books-act) (`u1_t3`)
  - [1.4 Library Associations: ILA, IASLIC, IFLA, ALA, UNESCO, FID](#topic-14-library-associations-ila-iaslic-ifla-ala-unesco-fid) (`u1_t4`)
  - [1.5 RRRLF & National Library of India](#topic-15-rrrlf--national-library-of-india) (`u1_t5`)
- **Unit 2 (7 Topics):**
  - [2.1 Universe of Knowledge & Modes of Formation of Subjects](#topic-21-universe-of-knowledge--modes-of-formation-of-subjects) (`u2_t1`)
  - [2.2 Dewey Decimal Classification (DDC 19th & 23rd Ed)](#topic-22-dewey-decimal-classification-ddc-19th--23rd-ed) (`u2_t2`)
  - [2.3 Colon Classification (CC 6th Ed) & PMEST Categories](#topic-23-colon-classification-cc-6th-ed--pmest-categories) (`u2_t3`)
  - [2.4 Universal Decimal Classification (UDC) & Notation Principles](#topic-24-universal-decimal-classification-udc--notation-principles) (`u2_t4`)
  - [2.5 Cataloguing Codes: AACR-2 vs CCC](#topic-25-cataloguing-codes-aacr-2-vs-ccc) (`u2_t5`)
  - [2.6 Metadata & Standards: MARC-21, CCF, Dublin Core, RDA](#topic-26-metadata--standards-marc-21-ccf-dublin-core-rda) (`u2_t6`)
  - [2.7 Subject Cataloguing & Indexing: Chain Procedure, Sears List, PRECIS, POPSI](#topic-27-subject-cataloguing--indexing-chain-procedure-sears-list-precis-popsi) (`u2_t7`)
- **Unit 3 (5 Topics):**
  - [3.1 Classification of Information Sources: Primary, Secondary & Tertiary](#topic-31-classification-of-information-sources-primary-secondary--tertiary) (`u3_t1`)
  - [3.2 Reference Sources: Dictionaries, Encyclopedias, Yearbooks, Almanacs, Bibliographies](#topic-32-reference-sources-dictionaries-encyclopedias-yearbooks-almanacs-bibliographies) (`u3_t2`)
  - [3.3 Reference Services: Ready Reference vs Long Range Reference](#topic-33-reference-services-ready-reference-vs-long-range-reference) (`u3_t3`)
  - [3.4 Alerting Services: CAS & SDI (Luhn 1958)](#topic-34-alerting-services-cas--sdi-luhn-1958) (`u3_t4`)
  - [3.5 Library Networks & Consortia: INFLIBNET, DELNET, NDLI, Shodhganga, OCLC](#topic-35-library-networks--consortia-inflibnet-delnet-ndli-shodhganga-oclc) (`u3_t5`)
- **Unit 4 (7 Topics):**
  - [4.1 Principles of Management: POSDCORB (Gulick & Urwick), Henry Fayol 14 Principles](#topic-41-principles-of-management-posdcorb--henry-fayol-14-principles) (`u4_t1`)
  - [4.2 Classic Book Selection Principles: Melvil Dewey, Drury, Ranganathan](#topic-42-classic-book-selection-principles-melvil-dewey-drury-ranganathan) (`u4_t2`)
  - [4.3 Technical Operations: Acquisition, Accessioning & Cataloguing Routines](#topic-43-technical-operations-acquisition-accessioning--cataloguing-routines) (`u4_t3`)
  - [4.4 Circulation Systems: Browne System (1895) & Newark System (1900)](#topic-44-circulation-systems-browne-system-1895--newark-system-1900) (`u4_t4`)
  - [4.5 Stock Verification, Annual Report & Weeding Out Policies](#topic-45-stock-verification-annual-report--weeding-out-policies) (`u4_t5`)
  - [4.6 Financial Management & Budgeting: Zero-Based Budgeting (ZBB), PPBS, Line Item](#topic-46-financial-management--budgeting-zero-based-budgeting-zbb-ppbs) (`u4_t6`)
  - [4.7 Preservation, Conservation & Binding of Library Materials](#topic-47-preservation-conservation--binding-of-library-materials) (`u4_t7`)
- **Unit 5 (5 Topics):**
  - [5.1 Basics of ICT, Computer Generations, Hardware, Software & Operating Systems](#topic-51-basics-of-ict-computer-generations-hardware-software--os) (`u5_t1`)
  - [5.2 Integrated Library Systems (ILS): Koha (Open Source, Perl, 1999) & Core Modules](#topic-52-integrated-library-systems-ils-koha--core-modules) (`u5_t2`)
  - [5.3 Indian ILS: SOUL 3.0 (INFLIBNET) & e-Granthalaya 4.0 (NIC for Schools)](#topic-53-indian-ils-soul-30-inflibnet--e-granthalaya-40-nic) (`u5_t3`)
  - [5.4 Identification Technologies: Barcode, RFID & QR Code](#topic-54-identification-technologies-barcode-rfid--qr-code) (`u5_t4`)
  - [5.5 OPAC & Web-OPAC, Search Techniques (Boolean Operators: AND, OR, NOT)](#topic-55-opac--web-opac-search-techniques-boolean-operators) (`u5_t5`)

---

# =========================================================================
# UNIT 1: पुस्तकालय, समाज एवं कानून (Library, Information and Society)
# =========================================================================

### Topic 1.1: Types of Libraries & Role in Society
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 1.1: Types of Libraries (Public, Academic, Special, National) & Role in Society (पुस्तकालयों के प्रकार एवं समाज में भूमिका)

Requirements:
1. Cover thoroughly:
   - UNESCO Public Library Manifesto (1949, 1972, 1994) & "People's University"
   - Academic Libraries: School (Mudaliar Commission 1952), College, University (Radhakrishnan Commission 1948)
   - Special Libraries: Characteristics, CAS & SDI priority, DRDO/ISRO/ICMR/BARC
   - National Library: Characteristics, Legal Depository duties, National Library of India Kolkata (Belvedere)
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u1_t1",
  "unit_id": "unit_1",
  "topic_order": 1,
  "title_hi": "1.1 पुस्तकालयों के प्रकार (सार्वजनिक, शैक्षणिक, विशिष्ट, राष्ट्रीय) एवं समाज में भूमिका",
  "title_en": "1.1 Types of Libraries (Public, Academic, Special, National) & Role in Society",
  "content_hi": "### पुस्तकालयों के प्रकार एवं समाज में भूमिका\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Types of Libraries & Role in Society\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }
  ]
}
```

---

### Topic 1.2: Dr. S.R. Ranganathan & Five Laws of Library Science
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 1.2: Dr. S.R. Ranganathan & Five Laws of Library Science with Implications (रंगनाथन के 5 सूत्र एवं उनके व्यावहारिक निहितार्थ)

Requirements:
1. Cover thoroughly:
   - Biography of Dr. S.R. Ranganathan (1892-1972), Padmashri (1957), National Research Professor (1965), 12 August National Librarians Day
   - Formulation of Five Laws at Meenakshi College (1928), Book published by MALA (1931), Foreword by P.S. Sivaswamy Aiyer, Intro by W.C. Berwick Sayers
   - First Law: Books are for use (Open access, location, hours, furniture)
   - Second Law: Every reader his/her book (Library legislation, services to blind/prisoners/rural)
   - Third Law: Every book its reader (Open access, cataloguing, book exhibition, new arrivals)
   - Fourth Law: Save the time of the reader (Classification, issue systems Browne/Newark, stack guides)
   - Fifth Law: The library is a growing organism (Child growth vs adult growth, weeding out, building planning)
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u1_t2",
  "unit_id": "unit_1",
  "topic_order": 2,
  "title_hi": "1.2 डॉ. एस.आर. रंगनाथन एवं पुस्तकालय विज्ञान के 5 सूत्र व उनके व्यावहारिक निहितार्थ",
  "title_en": "1.2 Dr. S.R. Ranganathan & Five Laws of Library Science with Implications",
  "content_hi": "### डॉ. एस.आर. रंगनाथन एवं पुस्तकालय विज्ञान के 5 सूत्र\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Dr. S.R. Ranganathan & Five Laws of Library Science\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }
  ]
}
```

---

### Topic 1.3: Library Legislation in India (19 States) & Delivery of Books Act
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 1.3: Library Legislation in India (19 States) & Delivery of Books Act 1954/1956 (भारत में 19 पुस्तकालय अधिनियम एवं डिलीवरी ऑफ बुक्स एक्ट)

Requirements:
1. Cover thoroughly:
   - Need, purpose and components of Public Library Legislation
   - Chronological list of all 19 States with enacted Public Library Acts (Madras 1948 to Telangana 2015)
   - Bihar State Public Library & Information Centre Act 2008 in detail
   - States levying Library Cess (Tamil Nadu, Andhra Pradesh, Karnataka, Kerala, Haryana) vs States without cess
   - Delivery of Books (Public Libraries) Act 1954, 1956 Amendment (incorporating newspapers)
   - 4 Depository Libraries: National Library Kolkata, Connemara Chennai, Asiatic Society Mumbai, Delhi Public Library Delhi
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u1_t3",
  "unit_id": "unit_1",
  "topic_order": 3,
  "title_hi": "1.3 भारत में 19 राज्य पुस्तकालय अधिनियम एवं डिलीवरी ऑफ बुक्स एक्ट 1954/1956",
  "title_en": "1.3 Library Legislation in India (19 States) & Delivery of Books Act 1954/1956",
  "content_hi": "### भारत में 19 पुस्तकालय अधिनियम एवं डिलीवरी ऑफ बुक्स एक्ट\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Library Legislation in India & Delivery of Books Act\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }
  ]
},
RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

### Topic 1.4: Library Associations: ILA, IASLIC, IFLA, ALA, UNESCO, FID
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 1.4: Library Associations: ILA, IASLIC, IFLA, ALA, UNESCO, FID (राष्ट्रीय एवं अंतरराष्ट्रीय पुस्तकालय संघ)

Requirements:
1. Cover thoroughly:
   - ILA (13 Sept 1933, Kolkata, M.O. Thomas, K.M. Asadullah, Delhi HQ, JILA)
   - IASLIC (3 Sept 1955, Kolkata, S.L. Hora, Special libraries focus)
   - IFLA (30 Sept 1927, Edinburgh, The Hague Netherlands HQ, Core programmes)
   - ALA (6 Oct 1876, Philadelphia, Chicago HQ, Melvil Dewey, Justin Winsor)
   - UNESCO (1945, Paris, Public Library Manifesto 1949/1994, Delhi Public Library pilot 1951)
   - FID (1895, Brussels, Paul Otlet, Henri La Fontaine, UDC development, dissolved 2002)
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u1_t4",
  "unit_id": "unit_1",
  "topic_order": 4,
  "title_hi": "1.4 राष्ट्रीय एवं अंतरराष्ट्रीय पुस्तकालय संघ: ILA, IASLIC, IFLA, ALA, UNESCO, FID",
  "title_en": "1.4 Library Associations: ILA, IASLIC, IFLA, ALA, UNESCO, FID",
  "content_hi": "### राष्ट्रीय एवं अंतरराष्ट्रीय पुस्तकालय संघ\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### National and International Library Associations\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }, e.t.c
  ]
}

RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

### Topic 1.5: RRRLF & National Library of India
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 1.5: RRRLF (Raja Rammohun Roy Library Foundation) & National Library of India (आरआरआरएलएफ एवं भारत का राष्ट्रीय पुस्तकालय)

Requirements:
1. Cover thoroughly:
   - RRRLF: Est May 1972, Salt Lake Kolkata, Ministry of Culture, Grants to public libraries, matching/non-matching assistance, ISBN agency
   - National Library of India: History from Calcutta Public Library (1836), Imperial Library Act (1902, Lord Curzon), Metcalfe Hall opening (1903), John Macfarlane
   - Imperial Library (Change of Name) Act 1948, Formal opening on 1 Feb 1953 at Belvedere Estate Alipore Kolkata by Maulana Abul Kalam Azad
   - B.S. Kesavan (1st Indian Librarian, Father of INB)
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u1_t5",
  "unit_id": "unit_1",
  "topic_order": 5,
  "title_hi": "1.5 आरआरआरएलएफ (RRRLF) एवं भारत का राष्ट्रीय पुस्तकालय (कोलकाता)",
  "title_en": "1.5 RRRLF (Raja Rammohun Roy Library Foundation) & National Library of India",
  "content_hi": "### आरआरआरएलएफ एवं भारत का राष्ट्रीय पुस्तकालय\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### RRRLF & National Library of India\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }, e.t.c
  ]
}

RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

# =========================================================================
# UNIT 2: ज्ञान संगठन, वर्गीकरण एवं सूचीकरण (Classification & Cataloguing)
# =========================================================================

### Topic 2.1: Universe of Knowledge & Modes of Formation of Subjects
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 2.1: Universe of Knowledge & Modes of Formation of Subjects (ज्ञान जगत की संरचना एवं विषय निर्माण की विधियां)

Requirements:
1. Cover thoroughly:
   - Nature & Structure of Universe of Knowledge (Multidimensional, dynamic, infinite, continuum)
   - Subject categories: Basic Subject, Compound Subject, Complex Subject
   - Modes of Subject Formation formulated by Dr. S.R. Ranganathan:
     - Loose Assemblage (Phase Relations)
     - Lamination (Layering of facets)
     - Fission (Cleavage) & Dissection
     - Denudation (Progressive stripping)
     - Agglomeration / Partial Comprehension
     - Fusion (e.g., Biochemistry, Geophysics, Biotechnology)
     - Distillation & Clustering
     -e.t.c
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u2_t1",
  "unit_id": "unit_2",
  "topic_order": 1,
  "title_hi": "2.1 ज्ञान जगत की संरचना एवं विषय निर्माण की विधियां",
  "title_en": "2.1 Universe of Knowledge & Modes of Formation of Subjects",
  "content_hi": "### ज्ञान जगत की संरचना एवं विषय निर्माण की विधियां\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Universe of Knowledge & Modes of Formation of Subjects\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }, e.t.c
  ]
}

RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.


```

---

### Topic 2.2: Dewey Decimal Classification (DDC 19th & 23rd Ed)
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 2.2: Dewey Decimal Classification (DDC 19th & 23rd Ed) - 10 Main Classes, Tables & Schedules (डेवी दशमलव वर्गीकरण)

Requirements:
1. Cover thoroughly:
   - Melvil Dewey (1851-1931), 1st edition 1876 (44 pages, anonymous), pure notation (0-9, decimal point after 3 digits)
   - 10 Main Classes (000 to 900) detailed breakdown
   - DDC 19th edition (1979, Benjamin Custer, 3 volumes, 7 auxiliary tables: T1 Standard Subdivisions to T7 Persons)
   - DDC 23rd edition (2011, Joan Mitchell, 4 volumes, 6 auxiliary tables - T7 dropped)
   - Relative Index, Phoenix Schedules, OCLC ownership since 1988
   - e.t.c
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u2_t2",
  "unit_id": "unit_2",
  "topic_order": 2,
  "title_hi": "2.2 डेवी दशमलव वर्गीकरण (DDC 19वां व 23वां संस्करण) - 10 मुख्य वर्ग, सारणियां व अनुसूचियां",
  "title_en": "2.2 Dewey Decimal Classification (DDC 19th & 23rd Ed) - 10 Main Classes, Tables & Schedules",
  "content_hi": "### डेवी दशमलव वर्गीकरण (DDC)\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Dewey Decimal Classification (DDC)\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }, e.t.c
  ]
}

RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

### Topic 2.3: Colon Classification (CC 6th Ed) & PMEST Categories
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 2.3: Colon Classification (CC 6th Ed) & PMEST Categories, Connecting Symbols (कोलन वर्गीकरण, PMEST एवं योजक चिह्न)

Requirements:
1. Cover thoroughly:
   - Dr. S.R. Ranganathan, Analytico-Synthetic classification, 1st ed 1933, 6th ed 1960, 6th Revised ed 1963, 7th ed 1987 (M.A. Gopinath)
   - Highly mixed notation (Roman capitals, smalls, Indo-Arabic numerals, Greek letters, punctuation)
   - 5 Fundamental Categories (PMEST) & connecting symbols: Personality (,), Matter (;), Energy (:), Space (.), Time (‘ inverted comma)
   - Rounds and Levels of facets
   - Main Classes (A Natural Sciences, B Mathematics, Z Generalia, 1 Universe of Knowledge, Δ Delta Spiritual Experience)
   - e.t.c
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u2_t3",
  "unit_id": "unit_2",
  "topic_order": 3,
  "title_hi": "2.3 कोलन वर्गीकरण (CC 6th Ed) एवं PMEST श्रेणियां, योजक चिह्न व राउंड्स/लेवल्स",
  "title_en": "2.3 Colon Classification (CC 6th Ed) & PMEST Categories, Connecting Symbols",
  "content_hi": "### कोलन वर्गीकरण (CC 6th Ed) एवं PMEST श्रेणियां\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Colon Classification (CC 6th Ed) & PMEST Categories\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }, e.t.c
  ]
}

RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

### Topic 2.4: Universal Decimal Classification (UDC) & Notation Principles
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 2.4: Universal Decimal Classification (UDC) & Notation Principles (यूनिवर्सल दशमलव वर्गीकरण एवं अंकन)

Requirements:
1. Cover thoroughly:
   - UDC Pioneers: Paul Otlet and Henri La Fontaine (1895, Brussels, IIB/FID)
   - Relationship with DDC, 1st ed 1905 (Manuel du Répertoire Bibliographique Universel), UDC Consortium (The Hague)
   - Common Auxiliaries and Special Auxiliaries with mathematical/punctuation signs (+, /, :, =, "", ())
   - Notation Principles: Pure Notation vs Mixed Notation, Hospitality in Array and Chain, Mnemonics (Seminal, Systematic, Alphabetical)
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u2_t4",
  "unit_id": "unit_2",
  "topic_order": 4,
  "title_hi": "2.4 यूनिवर्सल दशमलव वर्गीकरण (UDC) एवं अंकन सिद्धांत (शुद्ध व मिश्रित अंकन)",
  "title_en": "2.4 Universal Decimal Classification (UDC) & Notation Principles",
  "content_hi": "### यूनिवर्सल दशमलव वर्गीकरण (UDC) एवं अंकन सिद्धांत\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Universal Decimal Classification (UDC) & Notation Principles\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }
  ]
}

RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

### Topic 2.5: Cataloguing Codes: AACR-2 vs CCC
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 2.5: Cataloguing Codes: AACR-2 vs CCC (Classified Catalogue Code) (सूचीकरण संहिताएं: AACR-2 एवं CCC)

Requirements:
1. Cover thoroughly:
   - Standard Catalogue Card dimensions: 12.5 cm × 7.5 cm (5 inch × 3 inch)
   - Classified Catalogue Code (CCC): Dr. S.R. Ranganathan (1934), 5th ed 1964 (with A. Neelameghan), Classified Part vs Alphabetical Part
   - 6 Sections of Main Entry in CCC: Leading, Heading, Title, Note, Accession Number, Tracing (on reverse)
   - AACR-2 (1978, AACR-2R 1988), 8 description areas based on ISBD, Levels of Description, Headings and Uniform Titles
   - Comparative evaluation: AACR-2 (Dictionary Catalog) vs CCC (Classified Catalog)
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u2_t5",
  "unit_id": "unit_2",
  "topic_order": 5,
  "title_hi": "2.5 सूचीकरण संहिताएं: AACR-2 बनाम CCC (Classified Catalogue Code)",
  "title_en": "2.5 Cataloguing Codes: AACR-2 vs CCC (Classified Catalogue Code)",
  "content_hi": "### सूचीकरण संहिताएं: AACR-2 बनाम CCC\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Cataloguing Codes: AACR-2 vs CCC\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }
  ]
}

RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

### Topic 2.6: Metadata & Standards: MARC-21, CCF, Dublin Core, RDA
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 2.6: Metadata & Standards: MARC-21, CCF, Dublin Core, RDA (बिबलियोग्राफिक प्रारूप: मार्क-21, डबलिन कोर, RDA)

Requirements:
1. Cover thoroughly:
   - MARC History: Henriette Avram (Library of Congress), MARC-21 (1999 merger of USMARC & CAN/MARC)
   - Essential MARC Tags: 020 (ISBN), 022 (ISSN), 082 (DDC Call No), 100 (Personal Author), 245 (Title), 250 (Edition), 260/264 (Publication/Imprint), 300 (Collation), 650 (Subject)
   - CCF (Common Communication Format, UNESCO 1984)
   - Dublin Core Metadata Initiative (1995, Dublin Ohio): 15 core elements
   - RDA (Resource Description and Access, 2010): Successor to AACR-2, based on FRBR (Work, Expression, Manifestation, Item - WEMI)
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u2_t6",
  "unit_id": "unit_2",
  "topic_order": 6,
  "title_hi": "2.6 बिबलियोग्राफिक प्रारूप एवं मानक: MARC-21, CCF, Dublin Core, RDA",
  "title_en": "2.6 Metadata & Standards: MARC-21, CCF, Dublin Core, RDA",
  "content_hi": "### बिबलियोग्राफिक प्रारूप एवं मानक: MARC-21, Dublin Core, RDA\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Metadata & Standards: MARC-21, CCF, Dublin Core, RDA\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }
  ]
}

RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

### Topic 2.7: Subject Cataloguing & Indexing: Chain Procedure, Sears List, PRECIS, POPSI
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 2.7: Subject Cataloguing & Indexing: Chain Procedure, Sears List (SLSH), PRECIS, POPSI (विषय अनुक्रमणिका एवं श्रृंखला प्रक्रिया)

Requirements:
1. Cover thoroughly:
   - Chain Procedure: Formulated by Dr. S.R. Ranganathan in 1938 ("Theory of Library Catalogue"), Steps and Links (False Link, Unsought Link, Sought Link)
   - Sears List of Subject Headings (SLSH): Minnie Earl Sears (1923) for small/medium libraries
   - PRECIS (Preserved Context Indexing System): Derek Austin (1974) for BNB, Role Operators (0 to 6)
   - POPSI (Postulate-based Permuted Subject Indexing): Ganesh Bhattacharyya (1979, DRTC Bangalore), derived from Ranganathan's postulates
   - Pre-coordinate vs Post-coordinate indexing (Uniterm by Mortimer Taube)
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u2_t7",
  "unit_id": "unit_2",
  "topic_order": 7,
  "title_hi": "2.7 विषय अनुक्रमणिका एवं श्रृंखला प्रक्रिया: Chain Procedure, Sears List (SLSH), PRECIS, POPSI",
  "title_en": "2.7 Subject Cataloguing & Indexing: Chain Procedure, Sears List (SLSH), PRECIS, POPSI",
  "content_hi": "### विषय अनुक्रमणिका एवं श्रृंखला प्रक्रिया\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Subject Cataloguing & Indexing (Chain, PRECIS, POPSI)\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }
  ]
}

RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

# =========================================================================
# UNIT 3: सूचना स्रोत एवं संदर्भ सेवाएं (Information Sources & Services)
# =========================================================================

### Topic 3.1: Classification of Information Sources: Primary, Secondary & Tertiary
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 3.1: Classification of Information Sources: Primary, Secondary & Tertiary (सूचना स्रोतों का त्रिवर्गीकरण: प्राथमिक, द्वितीयक, तृतीयक)

Requirements:
1. Cover thoroughly:
   - Concept & Need of Information Sources
   - Categorization by Denis Grogan and C.W. Hanson
   - Primary Sources: Definition, characteristics, examples (Research periodicals, Ph.D. theses, patents, standards, conference proceedings, technical reports)
   - Secondary Sources: Definition, examples (Indexing journals, abstracting periodicals like Chemical Abstracts, encyclopedias, dictionaries, bibliographies, monographs)
   - Tertiary Sources: Definition, examples (Bibliography of bibliographies, directories, guides to literature like Winchell/Walford, yearbooks of international bodies)
   - e.t.c
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u3_t1",
  "unit_id": "unit_3",
  "topic_order": 1,
  "title_hi": "3.1 सूचना स्रोतों का त्रिवर्गीकरण: प्राथमिक, द्वितीयक एवं तृतीयक स्रोत",
  "title_en": "3.1 Classification of Information Sources: Primary, Secondary & Tertiary",
  "content_hi": "### सूचना स्रोतों का त्रिवर्गीकरण: प्राथमिक, द्वितीयक एवं तृतीयक स्रोत\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Classification of Information Sources: Primary, Secondary & Tertiary\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }, e.t.c
  ]
}

RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

### Topic 3.2: Reference Sources: Dictionaries, Encyclopedias, Yearbooks, Almanacs, Bibliographies
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 3.2: Reference Sources: Dictionaries, Encyclopedias, Yearbooks, Almanacs, Bibliographies (संदर्भ ग्रंथ एवं उनके प्रकार)

Requirements:
1. Cover thoroughly:
   - Encyclopedias: General vs Subject; Encyclopaedia Britannica (1768-1771 Edinburgh, 15th ed Propaedia/Micropaedia/Macropaedia, digital transition in 2012)
   - Dictionaries: General, etymological, bilingual, multilingual (OED, Webster)
   - Yearbooks & Almanacs: Statesman's Yearbook, India: A Reference Annual, Whitaker's Almanac, World Almanac
   - Geographical Sources: Gazetteers (geographical dictionary), Atlases, Maps, Guidebooks
   - Bibliographies: National, Trade, Subject, Universal; Indian National Bibliography (INB 1957, CRL Kolkata, B.S. Kesavan)
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u3_t2",
  "unit_id": "unit_3",
  "topic_order": 2,
  "title_hi": "3.2 संदर्भ ग्रंथ एवं उनके प्रकार: विश्वकोश, शब्दकोश, ईयरबुक, पंचांग, ग्रंथसूची",
  "title_en": "3.2 Reference Sources: Dictionaries, Encyclopedias, Yearbooks, Almanacs, Bibliographies",
  "content_hi": "### संदर्भ ग्रंथ एवं उनके प्रकार\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Reference Sources: Encyclopedias, Dictionaries, Yearbooks & Gazetteers\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }, etc
  ]
}
RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

### Topic 3.3: Reference Services: Ready Reference vs Long Range Reference
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 3.3: Reference Services: Ready Reference vs Long Range Reference (तैयार संदर्भ सेवा एवं दीर्घकालीन संदर्भ सेवा)

Requirements:
1. Cover thoroughly:
   - History & Definition: Samuel Green (1876), Dr. S.R. Ranganathan ("Personal service to each reader...")
   - Ready Reference Service: Concept, short duration (1-15 minutes), direct factual answers, standard reference tools used
   - Long Range Reference Service: Concept, prolonged duration (hours to weeks), deep literature searches, primary sources, inter-library loans
   - Reference Librarian: Duties, essential qualities, user interview technique
   - Digital/Virtual Reference Services: Chat reference, Ask-a-Librarian, email reference
   - etc
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u3_t3",
  "unit_id": "unit_3",
  "topic_order": 3,
  "title_hi": "3.3 संदर्भ सेवाएं: तैयार संदर्भ सेवा (Ready Reference) बनाम दीर्घकालीन संदर्भ सेवा (Long Range)",
  "title_en": "3.3 Reference Services: Ready Reference vs Long Range Reference",
  "content_hi": "### तैयार संदर्भ सेवा बनाम दीर्घकालीन संदर्भ सेवा\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Reference Services: Ready Reference vs Long Range Reference\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }, etc
  ]
}

RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

### Topic 3.4: Alerting Services: CAS & SDI (Luhn 1958)
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 3.4: Alerting Services: CAS (Current Awareness) & SDI (Selective Dissemination of Information - Luhn 1958) (सामयिक अभिज्ञता सेवा एवं चयनात्मक सूचना प्रसार)

Requirements:
1. Cover thoroughly:
   - Need for Alerting Services in Information Explosion
   - Current Awareness Service (CAS): Concept, group-oriented broad awareness, formats (Current Contents / TOC, New Additions list, Newspaper Clipping service, research bulletins)
   - Selective Dissemination of Information (SDI): Hans Peter Luhn (IBM, 1958), personalized automated service
   - 6 Operational Components of SDI: User Profile, Document Profile, Matching Mechanism, Notification, Feedback Loop, Profile Readjustment/Modification
   - Differences between CAS and SDI
   - etc
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u3_t4",
  "unit_id": "unit_3",
  "topic_order": 4,
  "title_hi": "3.4 सामयिक अभिज्ञता सेवा (CAS) एवं चयनात्मक सूचना प्रसार (SDI - Luhn 1958)",
  "title_en": "3.4 Alerting Services: CAS (Current Awareness) & SDI (Selective Dissemination - Luhn 1958)",
  "content_hi": "### सामयिक अभिज्ञता सेवा (CAS) एवं चयनात्मक सूचना प्रसार (SDI)\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Alerting Services: CAS & SDI (Selective Dissemination of Information)\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }, etc
  ]
}

RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

### Topic 3.5: Library Networks & Consortia: INFLIBNET, DELNET, NDLI, Shodhganga, OCLC
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 3.5: Library Networks & Consortia: INFLIBNET, DELNET, NDLI, Shodhganga, OCLC (पुस्तकालय नेटवर्क एवं संसाधन सहभागिता)

Requirements:
1. Cover thoroughly:
   - Concept of Resource Sharing, Library Networks & Consortia
   - INFLIBNET: Est March 1991, Gandhinagar (Gujarat), UGC Inter-University Centre, Shodhganga (Indian ETD repository), Shodhgangotri, e-ShodhSindhu consortium
   - DELNET (Developing Library Network): Est 1988, JNU New Delhi, Inter-Library Loan (ILL) & Union Catalogues
   - NDLI (National Digital Library of India): Ministry of Education, IIT Kharagpur
   - OCLC (Online Computer Library Center): Est 1967, Fred Kilgour, Ohio, WorldCat union catalogue
   - etc
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u3_t5",
  "unit_id": "unit_3",
  "topic_order": 5,
  "title_hi": "3.5 पुस्तकालय नेटवर्क एवं संसाधन सहभागिता: INFLIBNET, DELNET, NDLI, Shodhganga, OCLC",
  "title_en": "3.5 Library Networks & Consortia: INFLIBNET, DELNET, NDLI, Shodhganga, OCLC",
  "content_hi": "### पुस्तकालय नेटवर्क एवं संसाधन सहभागिता\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Library Networks & Consortia: INFLIBNET, DELNET, NDLI, Shodhganga, OCLC\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }, etc
  ]
}

RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

# =========================================================================
# UNIT 4: पुस्तकालय प्रबंधन, परिसंचरण एवं संरक्षण (Library Management & Preservation)
# =========================================================================

### Topic 4.1: Principles of Management: POSDCORB & Henry Fayol 14 Principles
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 4.1: Principles of Management: POSDCORB (Gulick & Urwick), Henry Fayol 14 Principles (प्रबंधन के सिद्धांत व कार्य)

Requirements:
1. Cover thoroughly:
   - Definitions & scope of Library Management
   - POSDCORB formula: Luther Gulick & Lyndall Urwick (1937) - Planning, Organizing, Staffing, Directing, Coordinating, Reporting, Budgeting
   - Henri Fayol's 14 Principles of Administrative Management (Division of Work, Authority, Discipline, Unity of Command, Unity of Direction, Subordination of interest, Remuneration, Centralization, Scalar Chain, Order, Equity, Stability of tenure, Initiative, Esprit de Corps)
   - F.W. Taylor's Scientific Management (Time and motion study, piece rate, standardization)
   - Application in school and academic library administration
   - etc
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u4_t1",
  "unit_id": "unit_4",
  "topic_order": 1,
  "title_hi": "4.1 प्रबंधन के सिद्धांत व कार्य: POSDCORB (Gulick & Urwick), हेनरी फेयोल के 14 सिद्धांत",
  "title_en": "4.1 Principles of Management: POSDCORB (Gulick & Urwick), Henry Fayol 14 Principles",
  "content_hi": "### प्रबंधन के सिद्धांत व कार्य (POSDCORB व शास्त्रीय सिद्धांत)\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Principles of Management: POSDCORB & Henri Fayol\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }, etc
  ]
}

RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

### Topic 4.2: Classic Book Selection Principles: Melvil Dewey, Drury, Ranganathan
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 4.2: Classic Book Selection Principles: Melvil Dewey, Drury, Ranganathan (पुस्तक चयन के सिद्धांत)

Requirements:
1. Cover thoroughly:
   - Melvil Dewey's maxim (1876): "The best reading for the largest number at the least cost"
   - Francis K.W. Drury's principle (1930): "To provide the right book to the right reader at the right time"
   - L.R. McColvin's Demand and Supply Theory (1925)
   - Dr. S.R. Ranganathan's Postulates on Book Selection (1952, "Library Book Selection") based on the Five Laws
   - Book Selection Tools: Bibliographies, publishers' catalogues, book reviews, trade lists
   - Book Selection Committee role in schools & colleges
   - etc
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u4_t2",
  "unit_id": "unit_4",
  "topic_order": 2,
  "title_hi": "4.2 पुस्तक चयन के क्लासिक सिद्धांत: मेल्विल डेवी, ड्रूरी (Drury), रंगनाथन",
  "title_en": "4.2 Classic Book Selection Principles: Melvil Dewey, Drury, Ranganathan",
  "content_hi": "### पुस्तक चयन के क्लासिक सिद्धांत\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Classic Book Selection Principles: Dewey, Drury, Ranganathan\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }, etc
  ]
}

RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

### Topic 4.3: Technical Operations: Acquisition, Accessioning & Cataloguing Routines
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 4.3: Technical Operations: Acquisition, Accessioning & Cataloguing Routines (पुस्तकालय अर्जन, परिग्रहण व तकनीकी प्रक्रिया)

Requirements:
1. Cover thoroughly:
   - Acquisition section workflow: Selection, duplicate checking, purchase orders, accessioning, invoice processing
   - Accession Register: Legal permanent status, standard dimensions (16 × 13 inches), 14 to 15 standard columns explained in sequence
   - Technical processing: Classification, Cataloguing, Call Number components (Class Number + Book Number + Collection Number)
   - Physical preparation: Stamping, pasting date slips, book pockets, spine labels, barcode/RFID tag insertion
   - etc

2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u4_t3",
  "unit_id": "unit_4",
  "topic_order": 3,
  "title_hi": "4.3 पुस्तकालय अर्जन, परिग्रहण एवं तकनीकी प्रक्रिया दिनचर्या",
  "title_en": "4.3 Technical Operations: Acquisition, Accessioning & Cataloguing Routines",
  "content_hi": "### पुस्तकालय अर्जन, परिग्रहण एवं तकनीकी प्रक्रिया दिनचर्या\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Technical Operations: Acquisition, Accessioning & Cataloguing Routines\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }, etc
  ]
}

RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

### Topic 4.4: Circulation Systems: Browne System (1895) & Newark System (1900)
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 4.4: Circulation Systems: Browne System (1895) & Newark System (1900) (निर्गम-आगम प्रणालियां: ब्राउन व नेवार्क)

Requirements:
1. Cover thoroughly:
   - Purpose & essential requirements of library circulation/charging systems
   - Browne Charging System: Nina E. Browne (1895, Boston Library Bureau), Components (Reader pocket ticket, Book card, Date slip), Charging & Discharging procedure, merits & demerits
   - Newark Charging System: John Cotton Dana (1900, Newark Public Library NJ), Components (Borrower's identification card, Book card, Date slip), Date stamping procedure, comprehensive borrowing history record
   - Comparison: Browne vs Newark Systems
   - Evolution into modern automated Barcode and RFID self-kiosks
   - etc
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u4_t4",
  "unit_id": "unit_4",
  "topic_order": 4,
  "title_hi": "4.4 निर्गम-आगम प्रणालियां: ब्राउन प्रणाली (1895) एवं नेवार्क प्रणाली (1900)",
  "title_en": "4.4 Circulation Systems: Browne System (1895) & Newark System (1900)",
  "content_hi": "### निर्गम-आगम प्रणालियां: ब्राउन व नेवार्क\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Circulation Systems: Browne System & Newark System\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }, etc
  ]
}

RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

### Topic 4.5: Stock Verification, Annual Report & Weeding Out Policies
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 4.5: Stock Verification, Annual Report & Weeding Out Policies (संग्रह सत्यापन एवं अनुपयोगी पुस्तकों की छंटाई)

Requirements:
1. Cover thoroughly:
   - Stock Verification (Physical Verification): Objectives, frequency, audit requirements
   - Methods of Stock Verification: Accession register ledger method, Shelf List method (most professional/scientific), Numerical counting, Barcode/RFID scanner sweeps
   - Government of India Benchmarks: GFR 2017 (General Financial Rules - Rule 215) loss allowance of 5 books per 1000 issued/consulted volumes
   - Weeding Out (Weeding Policy): Execution of Ranganathan's 5th Law ("Library is a growing organism"), MUSTIE criteria, disposal procedures
   - Annual Report: Structure, contents, presentation to authorities
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u4_t5",
  "unit_id": "unit_4",
  "topic_order": 5,
  "title_hi": "4.5 संग्रह सत्यापन (Stock Verification), वार्षिक प्रतिवेदन एवं अनुपयोगी पुस्तकों की छंटाई (Weeding)",
  "title_en": "4.5 Stock Verification, Annual Report & Weeding Out Policies",
  "content_hi": "### संग्रह सत्यापन, वार्षिक प्रतिवेदन एवं वीडिंग नीतियां\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Stock Verification, Annual Report & Weeding Out Policies\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }, etc
  ]
}

RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

### Topic 4.6: Financial Management & Budgeting: Zero-Based Budgeting (ZBB), PPBS
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 4.6: Financial Management & Budgeting: Zero-Based Budgeting (ZBB - Peter Pyhrr 1970), PPBS, Line Item (पुस्तकालय वित्त एवं बजट निर्माण)

Requirements:
1. Cover thoroughly:
   - Sources of Library Finance: Government grants, library cess, endowment, user fines, gift funds
   - Types of Library Budgeting:
     - Line-Item / Incremental Budgeting (Traditional percentage increment)
     - Zero-Based Budgeting (ZBB): Peter Pyhrr (1970, Texas Instruments), Decision Packages, Zero-base justification, advantages
     - Planning Programming Budgeting System (PPBS): Robert McNamara (1960s US DoD), Cost-Benefit Analysis
     - Performance Budgeting: Linking outcome to inputs
   - Standards for Library Expenditure: Ranganathan Norms (50% Staff, 40% Books/Journals, 10% Maintenance), Radhakrishnan Commission (6.5% of university budget)
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u4_t6",
  "unit_id": "unit_4",
  "topic_order": 6,
  "title_hi": "4.6 पुस्तकालय वित्त एवं बजट निर्माण: Zero-Based Budgeting (ZBB - Peter Pyhrr 1970), PPBS, Line Item",
  "title_en": "4.6 Financial Management & Budgeting: Zero-Based Budgeting (ZBB - Peter Pyhrr 1970), PPBS, Line Item",
  "content_hi": "### पुस्तकालय वित्त एवं बजट निर्माण विधियां\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Financial Management & Budgeting: ZBB, PPBS, Line Item\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }, etc
  ]
}

RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

### Topic 4.7: Preservation, Conservation & Binding of Library Materials
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 4.7: Preservation, Conservation & Binding of Library Materials (पुस्तकालय सामग्री का संरक्षण एवं जिल्दसाजी)

Requirements:
1. Cover thoroughly:
   - Concepts: Preventive Preservation (Environmental control) vs Curative Conservation (Repair, deacidification)
   - Environmental standards: Temperature (20°-24°C), Relative Humidity (45-55%), UV ray prevention
   - Biological agents of deterioration: Silverfish, termites, booklice, mold/fungus; Chemical treatments, Thymol fumigation chamber
   - Book Binding: Purpose and types (Leather, Half-leather, Cloth, Buckram, Paper binding)
   - Stages of Book Binding: Collation (first step), Sewing, Gluing & Rounding/Backing, Boarding/Covering, Lettering/Finishing
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u4_t7",
  "unit_id": "unit_4",
  "topic_order": 7,
  "title_hi": "4.7 पुस्तकालय सामग्री का संरक्षण, परिरक्षण एवं जिल्दसाजी (Binding)",
  "title_en": "4.7 Preservation, Conservation & Binding of Library Materials",
  "content_hi": "### पुस्तकालय सामग्री का संरक्षण, परिरक्षण एवं जिल्दसाजी\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Preservation, Conservation & Binding of Library Materials\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }, etc
  ]
}

RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

# =========================================================================
# UNIT 5: पुस्तकालय स्वचालन एवं सूचना प्रौद्योगिकी (Library Automation & ICT)
# =========================================================================

### Topic 5.1: Basics of ICT, Computer Generations, Hardware, Software & OS
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 5.1: Basics of ICT, Computer Generations, Hardware, Software & Operating Systems (कंप्यूटर के आधारभूत तत्व)

Requirements:
1. Cover thoroughly:
   - Computer definition, block diagram (Input, CPU, ALU, CU, Output, Storage)
   - 5 Generations of Computers:
     - 1st Gen (1940-56): Vacuum Tubes, Machine Language, ENIAC/UNIVAC
     - 2nd Gen (1956-63): Transistors (William Shockley), Assembly, early FORTRAN/COBOL
     - 3rd Gen (1964-71): Integrated Circuits (IC - Jack Kilby)
     - 4th Gen (1971-Present): Microprocessors (VLSI), Personal Computers
     - 5th Gen (Present-Future): ULSI, Artificial Intelligence (AI), Natural Language Processing
   - Memory hierarchy: RAM (Volatile), ROM (Non-volatile BIOS), Secondary storage (HDD, SSD, Cloud)
   - Software classification: System Software (OS like Linux/Windows) vs Application Software; Linux (Ubuntu) as the server foundation for Koha & DSpace
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u5_t1",
  "unit_id": "unit_5",
  "topic_order": 1,
  "title_hi": "5.1 कंप्यूटर के आधारभूत तत्व, पीढ़ियां, हार्डवेयर, सॉफ्टवेयर एवं ऑपरेटिंग सिस्टम",
  "title_en": "5.1 Basics of ICT, Computer Generations, Hardware, Software & Operating Systems",
  "content_hi": "### कंप्यूटर के आधारभूत तत्व, पीढ़ियां एवं ऑपरेटिंग सिस्टम\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Basics of ICT, Computer Generations, Hardware & OS\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }, etc
  ]
}

RULES:

Provide rich, exhaustive content (at least 600-800 words per language) covering standard classifications, historical development, key committees, and exam-oriented definitions.

Ensure accurate bilingual terminology in both Hindi and English.

Return ONLY valid JSON without markdown wrapping outside the array.
```

---

### Topic 5.2: Integrated Library Systems (ILS): Koha & Core Modules
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 5.2: Integrated Library Systems (ILS): Koha (Open Source, Perl, 1999) & Core Modules (कोहा सॉफ्टवेयर एवं मॉड्यूल्स)

Requirements:
1. Cover thoroughly:
   - What is an ILS (Integrated Library System)?
   - Koha History: 1999, Horowhenua Library Trust (New Zealand), Katipo Communications, released Jan 2000 under GNU GPL
   - Technical Architecture: Written in Perl, runs on Linux (Debian/Ubuntu), MySQL / MariaDB database, Apache server
   - Standards: MARC-21, UNIMARC, Z39.50, SIP2 (RFID integration), OAI-PMH
   - Core Modules: Circulation, Cataloging, Acquisition, Serials (Kardex), Patrons, OPAC, Reports (Custom SQL)
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u5_t2",
  "unit_id": "unit_5",
  "topic_order": 2,
  "title_hi": "5.2 एकीकृत पुस्तकालय प्रणाली (ILS): कोहा (Koha - Open Source, Perl, 1999) एवं मुख्य मॉड्यूल्स",
  "title_en": "5.2 Integrated Library Systems (ILS): Koha (Open Source, Perl, 1999) & Core Modules",
  "content_hi": "### कोहा (Koha) एकीकृत पुस्तकालय प्रबंधन प्रणाली\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Koha Integrated Library System (ILS) & Core Modules\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }
  ]
}
```

---

### Topic 5.3: Indian ILS: SOUL 3.0 (INFLIBNET) & e-Granthalaya 4.0 (NIC for Schools)
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 5.3: Indian ILS: SOUL 3.0 (INFLIBNET) & e-Granthalaya 4.0 (NIC for Schools) (सोल 3.0 एवं ई-ग्रंथालय 4.0)

Requirements:
1. Cover thoroughly:
   - SOUL (Software for University Libraries): Developed by INFLIBNET Centre (Gandhinagar), Version chronology (1.0 in 2000, 2.0 in 2009, 3.0 in Feb 2021), Web-based architecture, multi-language Unicode, MARC-21, NCIP/SIP2 RFID support, Modules (Acquisition, Cataloguing, Circulation, Serial Control, OPAC, Admin)
   - e-Granthalaya (NIC): Developed by National Informatics Centre (NIC, Ministry of Electronics & IT, Govt of India), Versions (1.0 in 2003, 2.0 in 2005, 3.0 in 2007, 4.0 in 2015)
   - e-Granthalaya 4.0 Cloud edition: Hosted on National Cloud (MeghRaj), zero installation SaaS model, tailored for KVS, NVS, State School libraries, and government department libraries
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u5_t3",
  "unit_id": "unit_5",
  "topic_order": 3,
  "title_hi": "5.3 भारतीय ILS: सोल 3.0 (SOUL 3.0 - INFLIBNET) एवं ई-ग्रंथालय 4.0 (e-Granthalaya - NIC)",
  "title_en": "5.3 Indian ILS: SOUL 3.0 (INFLIBNET) & e-Granthalaya 4.0 (NIC for Schools)",
  "content_hi": "### भारतीय ILS: SOUL 3.0 एवं ई-ग्रंथालय 4.0\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Indian ILS: SOUL 3.0 & e-Granthalaya 4.0\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }
  ]
}
```

---

### Topic 5.4: Identification Technologies: Barcode, RFID & QR Code
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 5.4: Identification Technologies: Barcode, RFID (Radio Frequency Identification) & QR Code (बारकोड एवं आरएफआईडी तकनीक)

Requirements:
1. Cover thoroughly:
   - Barcode Technology: Norman Joseph Woodland & Bernard Silver (1952), 1D optical representation of data (black & white bars), optical line-of-sight required, used for Accession number and Patron card
   - RFID (Radio Frequency Identification): Radio electromagnetic waves, non-line-of-sight contactless reading
   - Components of Library RFID: Tags (microchip + antenna), Reader (Staff station, self-kiosk), EAS Security Gates (Anti-theft alarm), Handheld reader for stock verification
   - Advantages: Bulk checkout/checkin, speed, security against unauthorized removal
   - QR Code (Quick Response): 2D matrix barcode (Denso Wave Japan, 1994), large data storage capacity, smartphone access
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u5_t4",
  "unit_id": "unit_5",
  "topic_order": 4,
  "title_hi": "5.4 पहचान तकनीकें: बारकोड (Barcode), आरएफआईडी (RFID) एवं क्यूआर कोड (QR Code)",
  "title_en": "5.4 Identification Technologies: Barcode, RFID (Radio Frequency Identification) & QR Code",
  "content_hi": "### पहचान तकनीकें: बारकोड, RFID एवं क्यूआर कोड\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### Identification Technologies: Barcode, RFID & QR Code\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }
  ]
}
```

---

### Topic 5.5: OPAC & Web-OPAC, Search Techniques (Boolean Operators)
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate in-depth, exam-oriented study notes for:
Topic 5.5: OPAC & Web-OPAC, Search Techniques (Boolean Operators: AND, OR, NOT) (ओपैक एवं बूलियन खोज)

Requirements:
1. Cover thoroughly:
   - OPAC (Online Public Access Catalogue): Definition, comparison with traditional physical card catalogue, search points (Author, Title, Subject, Call Number, Publisher, ISBN)
   - Web-OPAC: 24×7 universal browser accessibility, real-time circulation status, book renewals and hold reservations
   - Boolean Logic & Operators: George Boole (1847)
     - AND (Logical Product): Restricts and narrows down search results
     - OR (Logical Sum): Expands and broadens search results (vital for synonyms)
     - NOT (Logical Difference): Excludes unwanted terms
   - Additional Search Techniques: Truncation wildcard (*, ?), Phrase Searching with quotes ("..."), Proximity operators (NEAR, ADJ, WITH)
2. Format content with clean markdown (use ### and #### headings, numbered items 1. **Item:** Detail, or bullets * **Item:** Detail). Do NOT use Markdown tables (| col | col |); format comparisons and lists as numbered items for mobile screen readability.
3. Output MUST be ONLY valid JSON matching this exact structure:

{
  "id": "u5_t5",
  "unit_id": "unit_5",
  "topic_order": 5,
  "title_hi": "5.5 ओपैक (OPAC) एवं वेब-ओपैक (Web-OPAC), खोज तकनीकें व बूलियन ऑपरेटर्स (AND, OR, NOT)",
  "title_en": "5.5 OPAC & Web-OPAC, Search Techniques (Boolean Operators: AND, OR, NOT)",
  "content_hi": "### ओपैक (OPAC), वेब-ओपैक एवं बूलियन खोज तकनीकें\n\n(विस्तृत प्रामाणिक हिंदी नोट्स यहाँ)",
  "content_en": "### OPAC, Web-OPAC & Boolean Search Techniques\n\n(Detailed authentic English notes here)",
  "key_points": [
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 1", "en": "Key exam fact 1" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 2", "en": "Key exam fact 2" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 3", "en": "Key exam fact 3" },
    { "hi": "परीक्षा उपयोगी मुख्य तथ्य 4", "en": "Key exam fact 4" }
  ]
}
```
