# ⚡ Master 29 Topics NotebookLM One-Liner Prompts (Bihar Librarian Ninja)
> **निर्देश (Instructions):**
> 1. नीचे दी गई सूची में से जिस टॉपिक के **वन-लाइनर (1-Liner Rapid Revision Facts)** बनाने हैं, उस टॉपिक के प्रॉम्प्ट को कॉपी करें।
> 2. इसे अपने **Google NotebookLM** (जहाँ आपकी LIS पुस्तकें/सोर्स जुड़े हैं) में पेस्ट करें।
> 3. प्राप्त JSON आउटपुट को कॉपी करके [`bulk_templates/notebooklm_oneliners_template.json`](file:///d:/playstore/dev/bihar-librarian-ninja/bulk_templates/notebooklm_oneliners_template.json) में पेस्ट करें।
> 4. (वैकल्पिक / फॉर्मेट जांच हेतु) टर्मिनल में यह कमांड चलाएं:
>    `node scripts/fix_oneliners_json.mjs`
> 5. डेटाबेस (Supabase) में अपलोड करने के लिए यह कमांड चलाएं:
>    `node scripts/import_content.mjs bulk_templates/notebooklm_oneliners_template.json one_liners`
> 6. ऐप खोलें और **Settings -> "Sync From Cloud DB"** पर टैप करें। आपके नए वन-लाइनर तुरंत ऐप में लाइव हो जाएंगे!

---

## 📌 Quick Navigation: All 29 Topics (5 Units)

- **Unit 1: पुस्तकालय, समाज एवं कानून (5 Topics)**
  - [Topic 1.1: Types of Libraries & Role in Society](#topic-11-types-of-libraries--role-in-society) (`u1_t1`)
  - [Topic 1.2: Dr. S.R. Ranganathan & Five Laws with Implications](#topic-12-dr-sr-ranganathan--five-laws-with-implications) (`u1_t2`)
  - [Topic 1.3: Library Legislation in India (19 States) & Delivery of Books Act](#topic-13-library-legislation-in-india-19-states--delivery-of-books-act) (`u1_t3`)
  - [Topic 1.4: Library Associations: ILA, IASLIC, IFLA, ALA, UNESCO, FID](#topic-14-library-associations-ila-iaslic-ifla-ala-unesco-fid) (`u1_t4`)
  - [Topic 1.5: RRRLF & National Library of India (Kolkata)](#topic-15-rrrlf--national-library-of-india-kolkata) (`u1_t5`)

- **Unit 2: ज्ञान संगठन, वर्गीकरण एवं सूचीकरण (7 Topics)**
  - [Topic 2.1: Universe of Knowledge & Modes of Formation of Subjects](#topic-21-universe-of-knowledge--modes-of-formation-of-subjects) (`u2_t1`)
  - [Topic 2.2: Dewey Decimal Classification (DDC 19th & 23rd Ed)](#topic-22-dewey-decimal-classification-ddc-19th--23rd-ed) (`u2_t2`)
  - [Topic 2.3: Colon Classification (CC 6th Ed) & PMEST Categories](#topic-23-colon-classification-cc-6th-ed--pmest-categories) (`u2_t3`)
  - [Topic 2.4: Universal Decimal Classification (UDC) & Notation Principles](#topic-24-universal-decimal-classification-udc--notation-principles) (`u2_t4`)
  - [Topic 2.5: Cataloguing Codes: AACR-2 vs CCC](#topic-25-cataloguing-codes-aacr-2-vs-ccc) (`u2_t5`)
  - [Topic 2.6: Metadata & Standards: MARC-21, CCF, Dublin Core, RDA](#topic-26-metadata--standards-marc-21-ccf-dublin-core-rda) (`u2_t6`)
  - [Topic 2.7: Subject Cataloguing & Indexing: Chain Procedure, Sears List, PRECIS, POPSI](#topic-27-subject-cataloguing--indexing-chain-procedure-sears-list-precis-popsi) (`u2_t7`)

- **Unit 3: सूचना स्रोत एवं संदर्भ सेवाएं (5 Topics)**
  - [Topic 3.1: Classification of Information Sources: Primary, Secondary & Tertiary](#topic-31-classification-of-information-sources-primary-secondary--tertiary) (`u3_t1`)
  - [Topic 3.2: Reference Sources: Dictionaries, Encyclopedias, Yearbooks, Almanacs, Bibliographies](#topic-32-reference-sources-dictionaries-encyclopedias-yearbooks-almanacs-bibliographies) (`u3_t2`)
  - [Topic 3.3: Reference Services: Ready Reference vs Long Range Reference](#topic-33-reference-services-ready-reference-vs-long-range-reference) (`u3_t3`)
  - [Topic 3.4: Alerting Services: CAS & SDI (Luhn 1958)](#topic-34-alerting-services-cas--sdi-luhn-1958) (`u3_t4`)
  - [Topic 3.5: Library Networks & Consortia: INFLIBNET, DELNET, NDLI, Shodhganga, OCLC](#topic-35-library-networks--consortia-inflibnet-delnet-ndli-shodhganga-oclc) (`u3_t5`)

- **Unit 4: पुस्तकालय प्रबंधन, परिसंचरण एवं संरक्षण (7 Topics)**
  - [Topic 4.1: Principles of Management: POSDCORB (Gulick & Urwick), Henry Fayol 14 Principles](#topic-41-principles-of-management-posdcorb--henry-fayol-14-principles) (`u4_t1`)
  - [Topic 4.2: Classic Book Selection Principles: Melvil Dewey, Drury, Ranganathan](#topic-42-classic-book-selection-principles-melvil-dewey-drury-ranganathan) (`u4_t2`)
  - [Topic 4.3: Technical Operations: Acquisition, Accessioning & Cataloguing Routines](#topic-43-technical-operations-acquisition-accessioning--cataloguing-routines) (`u4_t3`)
  - [Topic 4.4: Circulation Systems: Browne System (1895) & Newark System (1900)](#topic-44-circulation-systems-browne-system-1895--newark-system-1900) (`u4_t4`)
  - [Topic 4.5: Stock Verification, Annual Report & Weeding Out Policies](#topic-45-stock-verification-annual-report--weeding-out-policies) (`u4_t5`)
  - [Topic 4.6: Financial Management & Budgeting: Zero-Based Budgeting (ZBB), PPBS, Line Item](#topic-46-financial-management--budgeting-zero-based-budgeting-zbb-ppbs) (`u4_t6`)
  - [Topic 4.7: Preservation, Conservation & Binding of Library Materials](#topic-47-preservation-conservation--binding-of-library-materials) (`u4_t7`)

- **Unit 5: पुस्तकालय स्वचालन एवं सूचना प्रौद्योगिकी (5 Topics)**
  - [Topic 5.1: Basics of ICT, Computer Generations, Hardware, Software & Operating Systems](#topic-51-basics-of-ict-computer-generations-hardware-software--operating-systems) (`u5_t1`)
  - [Topic 5.2: Integrated Library Systems (ILS): Koha (Open Source, Perl, 1999) & Core Modules](#topic-52-integrated-library-systems-ils-koha--core-modules) (`u5_t2`)
  - [Topic 5.3: Indian ILS: SOUL 3.0 (INFLIBNET) & e-Granthalaya 4.0 (NIC for Schools)](#topic-53-indian-ils-soul-30-inflibnet--e-granthalaya-40-nic-for-schools) (`u5_t3`)
  - [Topic 5.4: Identification Technologies: Barcode, RFID & QR Code](#topic-54-identification-technologies-barcode-rfid--qr-code) (`u5_t4`)
  - [Topic 5.5: OPAC & Web-OPAC, Search Techniques (Boolean Operators: AND, OR, NOT)](#topic-55-opac--web-opac-search-techniques-boolean-operators-and-or-not) (`u5_t5`)

---

# =========================================================================
# UNIT 1: पुस्तकालय, समाज एवं कानून (Library, Information and Society)
# =========================================================================

### Topic 1.1: Types of Libraries & Role in Society
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 1.1: Types of Libraries (Public, Academic, Special, National) & Role in Society (पुस्तकालयों के प्रकार एवं समाज में भूमिका)

Requirements:
1. Cover key historical facts, commissions, definitions, and distinctions:
   - UNESCO Public Library Manifesto (1949, revised 1972, 1994 with IFLA) designates the public library as the "People's University".
   - Mudaliar Commission (Secondary Education Commission 1952-53) termed the school library the "Heart of the School".
   - Radhakrishnan Commission (University Education Commission 1948-49) called the university library the "Heart of Academic Life / University".
   - Kothari Commission (1964-66) recommended spending 6.5% to 10% of educational budget on libraries.
   - Special Libraries: cater to specialized parent organizations (DRDO, ISRO, ICMR, BARC, CSIR) with prime focus on CAS & SDI.
   - National Library: Legal depository library under Delivery of Books Act; repository of national intellectual heritage (Belvedere, Kolkata).
   - Public libraries are financed primarily through library cess and public tax funds.
2. Output MUST be ONLY a valid JSON array of objects. Do not wrap in markdown text before/after.
3. Follow this EXACT JSON schema:

[
  {
    "id": "ol_u1_t1_1",
    "category_hi": "यूनिट 1: पुस्तकालय, समाज एवं कानून",
    "category_en": "Unit 1: Library, Information and Society",
    "category_key": "u1_t1",
    "topic_hi": "1.1 सार्वजनिक पुस्तकालय की परिभाषा",
    "topic_en": "1.1 Public Library Definition",
    "statement_hi": "यूनेस्को सार्वजनिक पुस्तकालय घोषणापत्र (1949/1994) के अनुसार सार्वजनिक पुस्तकालय 'जनता का विश्वविद्यालय' (People's University) है।",
    "statement_en": "According to the UNESCO Public Library Manifesto (1949/1994), the public library is designated as the 'People's University'.",
    "tag": "UNESCO Core",
    "is_important": true,
    "display_order": 1
  }
]
```

---

### Topic 1.2: Dr. S.R. Ranganathan & Five Laws with Implications
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 1.2: Dr. S.R. Ranganathan & Five Laws of Library Science with Implications (रंगनाथन के 5 सूत्र एवं उनके व्यावहारिक निहितार्थ)

Requirements:
1. Cover key dates, institutions, personalities, and law implications:
   - Dr. S.R. Ranganathan (12 August 1892 – 27 September 1972) is the Father of Library Science in India; 12 August is celebrated as National Librarians Day.
   - Conferred Padmashri in 1957; appointed National Research Professor in Library Science in 1965 by Govt of India.
   - Five Laws enunciated at Meenakshi College, Annamalainagar in 1928; published as a book in 1931 by Madras Library Association (MALA).
   - Foreword written by Sir P.S. Sivaswamy Aiyer; Introduction written by W.C. Berwick Sayers (Ranganathan's teacher).
   - First Law ("Books are for use"): Open access system, library location, library working hours, comfortable furniture.
   - Second Law ("Every reader his/her book"): Mandatory library legislation, state's duty, books for blind, prisoners, rural masses.
   - Third Law ("Every book its reader"): Open shelf access, classified arrangement, book exhibitions, shelf-guides, new arrival display.
   - Fourth Law ("Save the time of the reader"): Open access, rapid charging systems (Browne/Newark), library classification and cataloguing, stack guides.
   - Fifth Law ("The library is a growing organism"): Child growth (vital growth) vs Adult growth (replacement growth), weeding out of worn books, flexible modular library building.
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u1_t2" and IDs: "ol_u1_t2_1" to "ol_u1_t2_12".
```

---

### Topic 1.3: Library Legislation in India (19 States) & Delivery of Books Act
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 1.3: Library Legislation in India (19 States) & Delivery of Books Act (भारत में 19 राज्य पुस्तकालय अधिनियम एवं डिलीवरी ऑफ बुक्स एक्ट)

Requirements:
1. Cover statutory milestones, years, cess rates, and Bihar specific facts:
   - Total 19 Indian states have enacted Public Libraries Acts till date.
   - First state to enact library legislation: Madras Public Libraries Act (1948) with provision of library cess on property tax.
   - Second state: Andhra Pradesh (1960); Third state: Karnataka/Mysore (1965); Fourth: Maharashtra (1967 - operates without library cess).
   - Bihar State Public Library and Information Centre Act was enacted in 2008 (16th state in India).
   - Latest state (19th): Arunachal Pradesh Public Libraries Act (2009).
   - States with Library Cess: Tamil Nadu, Andhra Pradesh, Karnataka, Kerala, Goa, Haryana. States without cess: Maharashtra, West Bengal, Bihar, Gujarat, Odisha.
   - Model Public Libraries Bill drafted by Dr. S.R. Ranganathan in 1930 for the All Asia Educational Conference (Banaras).
   - Delivery of Books (Public Libraries) Act was enacted in 1954; amended in 1956 to include newspapers and periodicals.
   - Under the Act, publishers must deliver 1 free copy within 30 days to 4 Depository Libraries: National Library Kolkata, Connemara Public Library Chennai, Asiatic Society Library Mumbai, Delhi Public Library.
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u1_t3" and IDs: "ol_u1_t3_1" to "ol_u1_t3_12".
```

---

### Topic 1.4: Library Associations: ILA, IASLIC, IFLA, ALA, UNESCO, FID
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 1.4: National & International Library Associations: ILA, IASLIC, IFLA, ALA, UNESCO, FID (प्रमुख राष्ट्रीय एवं अंतरराष्ट्रीय पुस्तकालय संघ)

Requirements:
1. Cover foundation years, headquarters, key founders, official journals, and conferences:
   - ILA (Indian Library Association): Founded on 13 September 1933 at the First All India Library Conference in Calcutta; 1st President M.O. Thomas, 1st Secretary K.M. Asadullah; publishes JILA (Journal of Indian Library Association).
   - IASLIC (Indian Association of Special Libraries and Information Centres): Established 3 September 1955 in Calcutta; 1st President Dr. S.L. Hora; publishes IASLIC Bulletin.
   - ALA (American Library Association): World's oldest and largest library association, founded on 6 October 1876 in Philadelphia by Melvil Dewey; headquarters in Chicago; publishes 'American Libraries'.
   - IFLA (International Federation of Library Associations and Institutions): Founded on 30 September 1927 in Edinburgh (Scotland); headquarters at The Hague (Netherlands); organizes annual WLIC.
   - UNESCO: Founded 16 November 1945, headquarters in Paris; published Public Library Manifesto (1949/1994) and established Delhi Public Library project (1951).
   - FID (International Federation for Information and Documentation): Founded 12 September 1895 in Brussels by Paul Otlet and Henri La Fontaine as IIB (International Institute of Bibliography); created UDC; dissolved in 2002.
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u1_t4" and IDs: "ol_u1_t4_1" to "ol_u1_t4_12".
```

---

### Topic 1.5: RRRLF & National Library of India (Kolkata)
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 1.5: RRRLF & National Library of India (Kolkata) (आरआरआरएलएफ एवं भारत का राष्ट्रीय पुस्तकालय)

Requirements:
1. Cover foundation dates, legislative acts, grants, publications, and key librarians:
   - RRRLF (Raja Rammohun Roy Library Foundation): Established on 20 May 1972 at Salt Lake, Kolkata, by the Ministry of Culture to mark the bicentenary of Raja Rammohun Roy's birth.
   - RRRLF is the nodal agency for promoting public library systems in India, providing matching (50:50 or 60:40) and non-matching (100%) financial assistance.
   - RRRLF served as the National Agency for ISBN in India until 2011 (now directly under Ministry of Education, New Delhi).
   - National Library of India originated from Calcutta Public Library (established 1836 at Esplanade).
   - Imperial Library was formed in 1891 by amalgamating Calcutta Public Library with secretariat libraries through Lord Curzon's initiative (Imperial Library Act 1902).
   - John Macfarlane was the first librarian of the Imperial Library (1901); Harinath De was the first Indian librarian (1907).
   - Changed to "National Library of India" by the Imperial Library (Change of Name) Act, 1948; shifted to Belvedere Estate (Alipore, Kolkata).
   - Formally opened to the public on 1 February 1953 by Education Minister Maulana Abul Kalam Azad.
   - B.S. Kesavan was the first Librarian of Independent India's National Library and is known as the "Father of the Indian National Bibliography (INB)" (first published 1957).
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u1_t5" and IDs: "ol_u1_t5_1" to "ol_u1_t5_12".
```

---

# =========================================================================
# UNIT 2: ज्ञान संगठन, वर्गीकरण एवं सूचीकरण (Classification & Cataloguing)
# =========================================================================

### Topic 2.1: Universe of Knowledge & Modes of Formation of Subjects
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 2.1: Universe of Knowledge & Modes of Formation of Subjects (ज्ञान जगत की संरचना एवं विषय निर्माण की विधियां)

Requirements:
1. Cover characteristics, dimensions, and Dr. Ranganathan's modes of formation of subjects:
   - Universe of Knowledge is dynamic, infinite, multi-dimensional, and continuously expanding in all directions.
   - Dr. S.R. Ranganathan classified subjects into 3 primary categories: Basic Subject, Compound Subject, and Complex Subject.
   - Modes of Formation of Subjects introduced by Ranganathan in 1950 (4 modes) and expanded to 12 modes in 1973 with A. Neelameghan.
   - Fission (विखंडन): Breaking of a subject into smaller parts; includes Dissection (horizontal division, e.g., Asia into India, China) and Denudation (vertical tapering, e.g., Philosophy -> Logic -> Inductive Logic).
   - Lamination (स्तरीकरण): Layering of one or more isolates over a basic subject (e.g., Anatomy of Human Body, Treatment of Rice Disease).
   - Loose Assemblage (शिथिल समुच्चय): Complex subjects formed by bringing two independent subjects into phase relation (e.g., Mathematics for Engineers, Psychology influenced by Religion).
   - Fusion (विलयन): Two or more subjects fusing irrevocably to form a new discipline (e.g., Biochemistry, Geopolitics, Biophysics).
   - Distillation (आसवन): An isolate idea distilling from various host subjects to form an independent primary basic subject (e.g., Management Science, Research Methodology).
   - Agglomeration / Partial Comprehension: Collecting related subjects together without structural bonding (e.g., Social Sciences, Biological Sciences).
   - Cluster (गुच्छ): Grouping subjects around a nodal entity or phenomenon (e.g., Oceanography, Indology, Gandhiana).
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u2_t1" and IDs: "ol_u2_t1_1" to "ol_u2_t1_12".
```

---

### Topic 2.2: Dewey Decimal Classification (DDC 19th & 23rd Ed)
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 2.2: Dewey Decimal Classification (DDC 19th & 23rd Ed) (डेवी दशमलव वर्गीकरण - 10 मुख्य वर्ग, सारणियां व अनुसूचियां)

Requirements:
1. Cover invention, structural rules, editions, tables, and Phoenix schedules:
   - DDC was devised by Melvil Dewey in 1876; 1st edition published anonymously with 44 pages titled "A Classification and Subject Index for Cataloguing and Arranging the Books and Pamphlets of a Library".
   - DDC uses Pure Decimal Notation consisting exclusively of Indo-Arabic numerals (0 to 9) with a minimum class number length of 3 digits.
   - A decimal point (.) is introduced strictly after the third digit (e.g., 025.43).
   - 10 Main Classes (First Summary): 000 Computer science & Generalities, 100 Philosophy & Psychology, 200 Religion, 300 Social sciences, 400 Language, 500 Science, 600 Technology, 700 Arts & Recreation, 800 Literature, 900 History & Geography.
   - 19th Edition: Published in 1979 in 3 volumes, edited by Benjamin A. Custer; contains 7 Auxiliary Tables (Table 1: Standard Subdivisions, Table 2: Geographic Areas, Table 3: Individual Literatures, Table 4: Individual Languages, Table 5: Racial/Ethnic/National Groups, Table 6: Languages, Table 7: Persons).
   - 23rd Edition: Published in 2011 in 4 volumes, edited by Joan S. Mitchell; contains 6 Tables (Table 7 deleted and merged into Table 1 & 2).
   - Phoenix Schedules (पुनर्जन्म अनुसूची): Completely revised schedules introduced in DDC where old meanings are wiped clean (e.g., 780 Music in 20th Ed, 301-307 Sociology in 19th Ed).
   - WebDewey: Electronic online version of DDC launched in 2000 (earlier Electronic Dewey 1993, Dewey for Windows 1996) maintained by OCLC.
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u2_t2" and IDs: "ol_u2_t2_1" to "ol_u2_t2_12".
```

---

### Topic 2.3: Colon Classification (CC 6th Ed) & PMEST Categories
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 2.3: Colon Classification (CC 6th Ed) & PMEST Categories (कोलन वर्गीकरण एवं PMEST श्रेणियां, योजक चिह्न व राउंड्स/लेवल्स)

Requirements:
1. Cover edition chronology, facet formula, connecting symbols, and rounds/levels:
   - Colon Classification (CC) was formulated by Dr. S.R. Ranganathan in 1933 (1st ed published by Madras Library Association); 6th reprinted edition (1963) is the most popular in Indian exams.
   - CC is an Analytico-Synthetic Classification scheme using a highly Mixed Notation (74 digits in 6th ed, including Roman capitals, Roman small, Greek letters, Indo-Arabic numerals, and punctuation symbols).
   - Five Fundamental Categories (PMEST) postulation: Personality [P], Matter [M], Energy [E], Space [S], Time [T].
   - Connecting Symbols in CC 6th Ed: Personality is comma (,), Matter is semicolon (;), Energy is colon (:), Space is dot (.), Time is single inverted comma (') [Note: Time was dot (.) prior to 1963 reprint].
   - Decreasing order of concreteness: P -> M -> E -> S -> T (Personality is most concrete, Time is most abstract).
   - Rounds (आवर्तन): Energy facet [E] can manifest multiple times, ending a round and initiating subsequent rounds ([2P], [2M], [2E]). Space [S] and Time [T] appear only in the final round.
   - Levels (स्तर): Manifestation of Personality or Matter multiple times within the same round ([P1], [P2], [M1], [M2]).
   - Anteriorising Common Isolates (ACI - पूर्ववर्ती सामान्य एकल): Can be attached to a class number without any connecting symbol (e.g., 'a' for bibliography, 'k' for cyclopaedia, 'm' for periodical).
   - Posteriorising Common Isolates (PCI): Attached using appropriate connecting symbols.
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u2_t3" and IDs: "ol_u2_t3_1" to "ol_u2_t3_12".
```

---

### Topic 2.4: Universal Decimal Classification (UDC) & Notation Principles
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 2.4: Universal Decimal Classification (UDC) & Notation Principles (यूनिवर्सल दशमलव वर्गीकरण एवं अंकन सिद्धांत)

Requirements:
1. Cover origins, founders, editions, auxiliary signs, and notation theory:
   - UDC was devised by two Belgian lawyers and bibliographers, Paul Otlet and Henri La Fontaine, in 1895; 1st edition published in French (1905) titled 'Manuel du Répertoire Bibliographique Universel'.
   - Based on the 5th edition of Dewey Decimal Classification (DDC 1894), but transformed into an analytico-synthetic faceted scheme.
   - UDC Consortium (UDCC) was established in 1992 at The Hague (Netherlands) to own, maintain, and publish UDC after FID.
   - Class 4 (Philology/Linguistics) in UDC was vacated in 1964 and merged with Class 8 (Language & Literature). Class 4 is currently vacant.
   - Common Auxiliaries of Relation & Aggregation: Coordination / Addition (+), Consecutive extension / span (/), Simple relation (:), Sub-grouping brackets [ ], Order-fixing / irreversibility (::).
   - Common Auxiliaries of Identification: Language (=...), Form (0...), Place (1/9), Human ancestry & race (=...), Time "...".
   - Pure Notation uses only one kind of symbols (e.g., DDC uses only Indo-Arabic numerals); Mixed Notation uses two or more kinds of symbols (e.g., CC, UDC, LC).
   - Qualities of a Good Notation: Hospitality (in array and chain), Expressiveness, Brevity, Flexibility, Mnemonics.
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u2_t4" and IDs: "ol_u2_t4_1" to "ol_u2_t4_12".
```

---

### Topic 2.5: Cataloguing Codes: AACR-2 vs CCC
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 2.5: Cataloguing Codes: AACR-2 vs CCC (सूचीकरण संहिताएं: AACR-2 बनाम CCC)

Requirements:
1. Cover edition history, authors, structural sections, dimensions, and entry types:
   - Classified Catalogue Code (CCC) was formulated by Dr. S.R. Ranganathan in 1934; 5th edition published in 1964 with A. Neelameghan.
   - AACR-2 (Anglo-American Cataloguing Rules, 2nd Ed) was published in 1978, edited by Michael Gorman and Paul Winkler; based on ISBD principles.
   - Standard catalogue card dimensions in both CCC and AACR-2 are 12.5 cm × 7.5 cm (5 inches × 3 inches).
   - CCC Main Entry consists of 6 distinct sections: 1. Leading Section (Class number & Book number in pencil), 2. Heading Section, 3. Title Section, 4. Note Section, 5. Accession Number (bottom left, no period), 6. Tracing (on the reverse of the card).
   - In CCC, Call Number is always written in pencil in the Leading Section because it is subject to change.
   - AACR-2 Main Entry is structured into 8 areas following ISBD(G): Title and statement of responsibility, Edition, Material specific details, Publication & distribution, Physical description, Series, Note, Standard number (ISBN).
   - In AACR-2, if a book has up to 3 authors, the main entry is made under the first named author; if more than 3 authors, main entry is under Title (with added entry under first author).
   - In CCC, if a work has 1 or 2 authors, both are entered; if 3 or more authors, entry is under first author followed by 'and others' (एवं अन्य).
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u2_t5" and IDs: "ol_u2_t5_1" to "ol_u2_t5_12".
```

---

### Topic 2.6: Metadata & Standards: MARC-21, CCF, Dublin Core, RDA
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 2.6: Metadata & Standards: MARC-21, CCF, Dublin Core, RDA (बिबलियोग्राफिक प्रारूप एवं मानक)

Requirements:
1. Cover tags, fields, founding years, organizations, and conceptual models:
   - MARC (Machine-Readable Cataloging) was initiated by Henriette Avram at the Library of Congress in 1965-1966.
   - MARC-21 was harmonized in 1999 by merging USMARC and CAN/MARC (Canadian MARC).
   - Core MARC-21 Tags: 020 (ISBN), 022 (ISSN), 041 (Language), 082 (DDC Number), 100 (Main Entry - Personal Author), 110 (Corporate Author), 245 (Title & Statement of Responsibility), 250 (Edition), 260/264 (Publication/Imprint), 300 (Physical Description), 490 (Series), 500 (General Note), 650 (Subject Added Entry - Topical), 700 (Added Entry - Personal Name), 856 (Electronic Location/URL).
   - CCF (Common Communication Format) was developed by UNESCO in 1984 to bridge the gap between libraries and information centers.
   - Dublin Core Metadata Element Set (DCMES) was developed in 1995 at a workshop in Dublin, Ohio (sponsored by OCLC and NCSA); formalized under ISO 15836.
   - Dublin Core comprises exactly 15 core elements: Title, Creator, Subject, Description, Publisher, Contributor, Date, Type, Format, Identifier, Source, Language, Relation, Coverage, Rights.
   - RDA (Resource Description and Access) released in 2010 to replace AACR-2, built on the FRBR (Functional Requirements for Bibliographic Records) conceptual framework.
   - FRBR Group 1 Entities (WEMI): Work (intellectual creation), Expression (realization), Manifestation (physical embodiment), Item (single exemplar).
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u2_t6" and IDs: "ol_u2_t6_1" to "ol_u2_t6_12".
```

---

### Topic 2.7: Subject Cataloguing & Indexing: Chain Procedure, Sears List, PRECIS, POPSI
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 2.7: Subject Cataloguing & Indexing: Chain Procedure, Sears List, PRECIS, POPSI (विषय अनुक्रमणिका एवं श्रृंखला प्रक्रिया)

Requirements:
1. Cover inventors, publications, steps, operators, and indexing concepts:
   - Chain Procedure (श्रृंखला प्रक्रिया) was devised by Dr. S.R. Ranganathan in 1938 in his book 'Theory of Library Catalogue'.
   - Chain Procedure derives subject headings mechanically by analyzing the digits of a class number (Classified catalogue tracing).
   - 4 Types of Links in Chain Procedure: 1. False Link (मिथ्या कड़ी - ends with a connecting symbol or non-semantic digit), 2. Unsought Link (अनिष्ट कड़ी - too broad or unlikely to be searched by reader), 3. Sought Link (इष्ट कड़ी - genuine subject heading), 4. Missing Link (विलुप्त कड़ी - unexpressed link in classification schedule).
   - Sears List of Subject Headings (SLSH) was first created by Minnie Earl Sears in 1923 for small and medium-sized libraries; uses LC subject headings principles.
   - Library of Congress Subject Headings (LCSH) was published in 1898 for large research libraries.
   - PRECIS (Preserved Context Index Indexing System) was invented by Derek Austin in 1974 for the British National Bibliography (BNB) to replace Chain Procedure.
   - PRECIS uses primary role operators (0 to 6) and secondary role operators (f, g, p, q, r, s, t, u) with a three-part display format: Lead, Qualifier, Display.
   - COMPACS (Computer Aided Subject System) replaced PRECIS in BNB in 1996.
   - POPSI (Postulate-based Permuted Subject Indexing) was developed by Ganesh Bhattacharyya in 1979 at DRTC, Bangalore, based on Ranganathan's general theory of subject headings.
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u2_t7" and IDs: "ol_u2_t7_1" to "ol_u2_t7_12".
```

---

# =========================================================================
# UNIT 3: सूचना स्रोत एवं संदर्भ सेवाएं (Information Sources & Services)
# =========================================================================

### Topic 3.1: Classification of Information Sources: Primary, Secondary & Tertiary
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 3.1: Classification of Information Sources: Primary, Secondary & Tertiary (सूचना स्रोतों का त्रिवर्गीकरण: प्राथमिक, द्वितीयक एवं तृतीयक स्रोत)

Requirements:
1. Cover taxonomies of Grogan, Hanson, and Ranganathan, and exact source examples:
   - Denis Grogan categorized documentary information sources into 3 classes: Primary, Secondary, and Tertiary sources.
   - C.W. Hanson (1971) classified documentary sources into 2 broad divisions: Primary and Secondary sources (merging tertiary with secondary).
   - Dr. S.R. Ranganathan categorized documents by physical/intellectual characteristics into: Conventional, Neo-conventional, Non-conventional, and Meta-documents.
   - Primary Sources contain original research and uninterpreted first-hand discoveries: Research periodicals/journals, Patents, Standards, Theses/Dissertations, Conference proceedings, Trade literature, Research monographs.
   - Secondary Sources index, condense, or repackage primary literature: Dictionaries, Encyclopedias, Bibliographies, Abstracting & Indexing journals, Review journals, Treatises, Textbooks.
   - Tertiary Sources serve as "Guide to the Guide": Bibliography of Bibliographies, Directory of Directories, Guides to literature, List of research in progress, Yearbooks and Almanacs.
   - Non-documentary sources are divided into Formal (research organizations, universities, government bodies) and Informal (human experts, invisible colleges, peer discussions).
   - Meta-documents (Ranganathan): Records where instrumental data is directly inscribed without human intervention (e.g., seismograph, satellite sensor telemetry).
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u3_t1" and IDs: "ol_u3_t1_1" to "ol_u3_t1_12".
```

---

### Topic 3.2: Reference Sources: Dictionaries, Encyclopedias, Yearbooks, Almanacs, Bibliographies
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 3.2: Reference Sources: Dictionaries, Encyclopedias, Yearbooks, Almanacs, Bibliographies (संदर्भ ग्रंथ एवं उनके प्रकार)

Requirements:
1. Cover classic reference works, publication years, founders, and structural divisions:
   - Encyclopaedia Britannica first published in 1768-1771 in Edinburgh (Scotland) in 3 volumes by Colin Macfarquhar and Andrew Bell.
   - 15th Edition of Encyclopaedia Britannica (1974) introduced a revolutionary 3-part tripartite structure: Propaedia (1 volume outline of knowledge), Micropaedia (ready reference/index), and Macropaedia (in-depth knowledge treatises). Ceased print in 2012.
   - Encyclopedia Americana was the first major multi-volume American encyclopedia, published in 1829 by Francis Lieber.
   - Dictionaries are classified into General language, Subject/Specialized, Etymological, Bilingual, and Multilingual dictionaries.
   - Yearbooks (वार्षिकी) record events, statistics, and developments of a single preceding year: 'Europa World Year Book' (London), 'Statesman's Yearbook', 'India: A Reference Annual' (Govt of India Publications Division).
   - Almanacs (पंचांग) provide astronomical data, calendars, and miscellaneous statistical records: 'Whitaker's Almanack' (1868, UK), 'World Almanac and Book of Facts' (1868, USA).
   - Gazetteers are geographical dictionaries providing location coordinates, history, population, and topography of places (e.g., 'Imperial Gazetteer of India').
   - INB (Indian National Bibliography) was first published in 1957 by Central Reference Library (CRL), Kolkata; B.S. Kesavan was its founding editor; classified by DDC and Colon Classification numbers.
   - BNB (British National Bibliography) began publication in 1950, founded by A.J. Wells.
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u3_t2" and IDs: "ol_u3_t2_1" to "ol_u3_t2_12".
```

---

### Topic 3.3: Reference Services: Ready Reference vs Long Range Reference
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 3.3: Reference Services: Ready Reference vs Long Range Reference (तैयार संदर्भ सेवा बनाम दीर्घकालीन संदर्भ सेवा)

Requirements:
1. Cover definitions, theories, duration, and Dr. Ranganathan's concepts:
   - Dr. S.R. Ranganathan defined Reference Service as "Personal assistance to each reader in helping him to find the documents which are most suited to his interest".
   - Ranganathan divided reference service into two broad categories: Ready Reference Service (RRS) and Long Range Reference Service (LRRS).
   - Ready Reference Service (अल्पकालीन संदर्भ सेवा): Fact-finding queries answered in a very short duration (5 to 30 minutes) using standard reference sources like dictionaries, yearbooks, directories, and almanacs.
   - Long Range Reference Service (दीर्घकालीन संदर्भ सेवा): Complex, multi-disciplinary research queries that take hours, days, or weeks; searches primary research papers, bibliographies, and distant libraries.
   - James I. Wyer (1930) classified reference service into three distinct theories: 1. Conservative (Minimum / Restricted help), 2. Moderate (Middling / Balanced instruction), 3. Liberal (Maximum / Full answer provision).
   - Samuel Rothstein (1961) expanded reference service theories into: Minimum, Middling, and Maximum reference service.
   - In Ready Reference, the librarian provides the actual answer; in Long Range Reference, the librarian guides the search path or compiles bibliographies.
   - Digital / Virtual Reference Services use Ask-A-Librarian, chat bots, e-mail reference, and Web forms.
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u3_t3" and IDs: "ol_u3_t3_1" to "ol_u3_t3_12".
```

---

### Topic 3.4: Alerting Services: CAS & SDI (Luhn 1958)
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 3.4: Alerting Services: CAS (Current Awareness) & SDI (Selective Dissemination of Information) (सामयिक अभिज्ञता सेवा एवं SDI)

Requirements:
1. Cover definitions, inventors, components of SDI, and differences:
   - CAS (Current Awareness Service - सामयिक अभिज्ञता सेवा): A generalized alerting service designed to keep users up-to-date with newly published literature in their broad discipline.
   - Common forms of CAS: Current Contents / Table of Contents (TOC) service, Accession lists / New Additions list, Forthcoming conferences list, Newspaper clipping service.
   - SDI (Selective Dissemination of Information - चयनात्मक सूचना प्रसार): A personalized, computer-aided automated alerting service matching individual research interests with newly acquired documents.
   - SDI concept was invented by Hans Peter Luhn of IBM in 1958 in his paper "A Business Intelligence System".
   - 6 Essential Components / Steps of an SDI System: 1. User Profile (user research keywords/codes), 2. Document Profile (bibliographic metadata of new items), 3. Matching Mechanism (computer algorithm matching profiles), 4. Notification (sending matched citations to user), 5. Feedback Loop (user response on relevance), 6. Profile Readjustment / Modification.
   - Primary difference: CAS is general and service-oriented for a broad user group; SDI is personalized and tailored to an individual researcher.
   - Feedback loop is the most vital characteristic of SDI that makes it a self-correcting dynamic service.
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u3_t4" and IDs: "ol_u3_t4_1" to "ol_u3_t4_12".
```

---

### Topic 3.5: Library Networks & Consortia: INFLIBNET, DELNET, NDLI, Shodhganga, OCLC
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 3.5: Library Networks & Consortia: INFLIBNET, DELNET, NDLI, Shodhganga, OCLC (पुस्तकालय नेटवर्क एवं संसाधन सहभागिता)

Requirements:
1. Cover founding dates, headquarters, parent bodies, projects, and portals:
   - INFLIBNET (Information and Library Network Centre): Initiated by UGC in 1991 under IUCAA Pune; became an autonomous Inter-University Centre of UGC in June 1996; headquarters at Infocity, Gandhinagar (Gujarat).
   - INFLIBNET major national projects: Shodhganga (Indian electronic theses repository), Shodhgangotri (synopses/research in progress), e-ShodhSindhu (e-resource consortium for universities), IRINS, Vidwan database, INFED.
   - DELNET (Developing Library Network): Established in 1988 with NISSAT support; registered as a society in 1992 in New Delhi; specializes in Inter-Library Loan (ILL) and Document Delivery Service (DDS).
   - NDLI (National Digital Library of India): Developed by IIT Kharagpur under the Ministry of Education (National Mission on Education through ICT - NMEICT); provides open single-window digital access to millions of learning resources.
   - OCLC (Online Computer Library Center): Founded on 5 July 1967 by Fred Kilgour as Ohio College Library Center; headquarters in Dublin, Ohio; creator of WorldCat (world's largest bibliographic union catalog).
   - ERNET (Education and Research Network): First computer network established in India in 1986 with UNDP assistance for academic and research institutions.
   - UGC-INFONET: Digital consortium project launched by UGC and INFLIBNET in 2004 for electronic journal subscription sharing.
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u3_t5" and IDs: "ol_u3_t5_1" to "ol_u3_t5_12".
```

---

# =========================================================================
# UNIT 4: पुस्तकालय प्रबंधन, परिसंचरण एवं संरक्षण (Library Management & Preservation)
# =========================================================================

### Topic 4.1: Principles of Management: POSDCORB (Gulick & Urwick), Henry Fayol 14 Principles
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 4.1: Principles of Management: POSDCORB, Henry Fayol 14 Principles, Scientific Management (प्रबंधन के सिद्धांत व कार्य)

Requirements:
1. Cover management acronyms, theorists, publication dates, and classical principles:
   - POSDCORB acronym was coined in 1937 by Luther Gulick and Lyndall Urwick in 'Papers on the Science of Administration'.
   - POSDCORB stands for: Planning (P), Organizing (O), Staffing (S), Directing (D), Coordinating (CO), Reporting (R), Budgeting (B).
   - Henri Fayol (1841-1925) is known as the "Father of Classical / Administrative Management Theory"; published 'Administration Industrielle et Générale' in 1916.
   - Fayol formulated 14 Principles of Management: Division of Work, Authority & Responsibility, Discipline, Unity of Command, Unity of Direction, Subordination of Individual Interest, Remuneration, Centralization, Scalar Chain, Order, Equity, Stability of Tenure, Initiative, Esprit de Corps.
   - Unity of Command dictates that an employee should receive orders from one and only one superior.
   - Scalar Chain is the formal line of authority from top management to lowest ranks; 'Gang Plank' was introduced by Fayol as a bypass bridge for horizontal crisis communication.
   - F.W. Taylor (Frederick Winslow Taylor, 1856-1915) is known as the "Father of Scientific Management"; published 'The Principles of Scientific Management' in 1911; introduced Time and Motion Study.
   - Max Weber formulated the Theory of Bureaucracy (hierarchical authority, written rules, impersonal relationships).
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u4_t1" and IDs: "ol_u4_t1_1" to "ol_u4_t1_12".
```

---

### Topic 4.2: Classic Book Selection Principles: Melvil Dewey, Drury, Ranganathan
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 4.2: Classic Book Selection Principles: Melvil Dewey, Drury, Ranganathan (पुस्तक चयन के क्लासिक सिद्धांत)

Requirements:
1. Cover core maxims, publication years, theorists, and demand vs quality debates:
   - Melvil Dewey (1876): "The best reading for the largest number at the least cost" (न्यूनतम लागत पर अधिकतम पाठकों के लिए सर्वोत्तम पठन सामग्री).
   - Francis K.W. Drury (1930): "To provide the right book to the right reader at the right time" (उचित पाठक को उचित समय पर उचित पुस्तक प्रदान करना) in his book 'Book Selection'.
   - Dr. S.R. Ranganathan (1952): Formulated book selection principles based on the Five Laws of Library Science in his work 'Library Book Selection'.
   - Ranganathan's First Three Laws justify book selection: 1st Law demands selecting books for maximum active usage; 2nd Law demands catering to every varied reader profile; 3rd Law demands selecting books that will find an audience.
   - L.R. McColvin (1925): Formulated the "Theory of Book Selection for Public Libraries" based on Demand and Supply principles.
   - Charles Ammi Cutter (1901): Advocated providing the books that people desire to read rather than what librarians believe they ought to read.
   - Book Selection Tools include: National bibliographies (INB, BNB), Trade bibliographies (Books in Print), Publisher catalogues, Book reviews in periodicals.
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u4_t2" and IDs: "ol_u4_t2_1" to "ol_u4_t2_12".
```

---

### Topic 4.3: Technical Operations: Acquisition, Accessioning & Cataloguing Routines
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 4.3: Technical Operations: Acquisition, Accessioning & Cataloguing Routines (पुस्तकालय अर्जन, परिग्रहण एवं तकनीकी प्रक्रिया दिनचर्या)

Requirements:
1. Cover workflows, accession register columns, ordering procedures, and physical processing:
   - Acquisition Section is responsible for three primary functions: Selection, Ordering, and Accessioning of documents.
   - Accession Register (परिग्रहण पंजी) is the permanent legal inventory record of all books acquired in a library; each book receives a unique sequential Accession Number.
   - Standard Indian Accession Register typically contains 14 or 16 columns: 1. Date, 2. Accession Number, 3. Author, 4. Title, 5. Edition, 6. Place & Publisher, 7. Year, 8. Pages, 9. Size, 10. Binding, 11. Source/Vendor, 12. Cost/Price, 13. Call Number, 14. Bill Number & Date, 15. Withdrawal Date & Remarks.
   - Accession Number is permanent and never re-allotted to another book even after the original book is lost, weeded out, or withdrawn.
   - Secret Page (गुप्त पृष्ठ): A pre-determined internal page number (e.g., page 51, 101) where the library ownership rubber stamp and accession number are secretly stamped to verify stolen/tampered books.
   - Physical Processing routines include: Stamping (Property stamp, Date stamp), Pasting Book Pocket, Pasting Date Slip, inserting Book Card, affixing Spine Label (Call number label).
   - Call Number consists of three distinct parts: Class Number + Book Number + Collection Number.
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u4_t3" and IDs: "ol_u4_t3_1" to "ol_u4_t3_12".
```

---

### Topic 4.4: Circulation Systems: Browne System (1895) & Newark System (1900)
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 4.4: Circulation Systems: Browne System (1895) & Newark System (1900) (निर्गम-आगम प्रणालियां: ब्राउन एवं नेवार्क प्रणाली)

Requirements:
1. Cover inventors, years, mechanisms, equipment, and structural differences:
   - Browne Charging System was devised in 1895 by Nina E. Browne, Librarian of the Boston Medical Library (USA).
   - Browne System uses 3 primary components: Reader's Pocket / Ticket (एक जेबनुमा पाठक टिकट), Book Card (पुस्तक कार्ड), and Date Slip (दिनांक पर्ची).
   - In Browne System, the book card is inserted inside the reader's pocket ticket and filed by due date; neither the reader nor the librarian signs anywhere.
   - Browne System is exceptionally fast at charging, but provides no permanent historical record of who borrowed what book after it is returned.
   - Newark Charging System was devised in 1900 by John Cotton Dana at Newark Public Library, New Jersey (USA).
   - Newark System uses: Borrower's Card (उधारकर्ता कार्ड), Book Card (with borrower's signature/stamp), Book Pocket, and Date Slip.
   - In Newark System, the borrower's card number and return date are written/stamped on the book card, and the borrower signs the book card, providing a permanent audit record.
   - Comparison: Browne is pocket-based and signature-less; Newark is card-based and retains a permanent lending record.
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u4_t4" and IDs: "ol_u4_t4_1" to "ol_u4_t4_12".
```

---

### Topic 4.5: Stock Verification, Annual Report & Weeding Out Policies
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 4.5: Stock Verification, Annual Report & Weeding Out Policies (संग्रह सत्यापन, वार्षिक प्रतिवेदन एवं अनुपयोगी पुस्तकों की छंटाई)

Requirements:
1. Cover verification methods, GFR 2017 rules, permissible loss limits, and weeding criteria:
   - Stock Verification (भौतिक संग्रह सत्यापन): The physical auditing of all documents in the library to ascertain missing books, damaged items, and shelf discrepancies.
   - Common methods of stock verification: Accession Register method (slow, damages register), Shelf List Card method (fast and safe), Numerical Counting method, Separate Slip method, and modern RFID Handheld Wand method.
   - General Financial Rules (GFR 2017) Rule 215: Physical verification of library books should be done every year in libraries having up to 20,000 volumes.
   - GFR 2017 Rule 215: For libraries having 20,000 to 50,000 volumes, physical verification should be done at least once in 3 years. For libraries exceeding 50,000 volumes, sample verification of at least 10% is permissible every year (complete in 5 years).
   - GFR 2017 Rule 215 permissible loss limit: Loss of 5 volumes per 1,000 volumes issued/consulted in a year is considered reasonable and should be written off without holding staff responsible, provided there is no dishonesty or negligence.
   - Weeding Out (अनुपयोगी पुस्तकों की छंटाई): Permanent withdrawal of outdated, mutilated, and unread books to make space, directly fulfilling Dr. Ranganathan's Fifth Law ("Library is a growing organism").
   - CREW method (Continuous Re-evaluation, Conditioning and Weeding) and MUSTIE criteria: Misleading, Ugly, Superseded, Trivial, Irrelevant, Elsewhere available.
   - Annual Report (वार्षिक प्रतिवेदन): Consists of two sections: Descriptive/Administrative part (achievements, policy changes) and Statistical part (circulation numbers, additions, finance).
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u4_t5" and IDs: "ol_u4_t5_1" to "ol_u4_t5_12".
```

---

### Topic 4.6: Financial Management & Budgeting: Zero-Based Budgeting (ZBB), PPBS, Line Item
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 4.6: Financial Management & Budgeting: ZBB, PPBS, Line Item Budget (पुस्तकालय वित्त एवं बजट निर्माण तकनीकें)

Requirements:
1. Cover budgeting types, theorists, founding years, and per capita allocation norms:
   - Line-Item Budget / Incremental Budget (मदवार बजट): Most traditional and widely used method where budget headings are based on historical expenditure plus a fixed percentage increment for inflation.
   - Zero-Based Budgeting (ZBB - शून्य आधारित बजट): Devised in 1970 by Peter Pyhrr at Texas Instruments (USA); every program and expenditure must be justified from ground zero (base zero) every year.
   - In ZBB, previous year's budget is completely ignored, and activities are evaluated as discrete "Decision Packages".
   - PPBS (Planning Programming Budgeting System): Developed in 1961 by David Novick at RAND Corporation and implemented in the US Department of Defense under Robert McNamara.
   - Performance Budgeting (निष्पादन बजट): Introduced following the recommendations of the First Hoover Commission (USA, 1949); measures expenditure by physical outputs and measurable achievements rather than objects of expense.
   - Formula Budgeting: Financial allocation calculated automatically via mathematical formulas (e.g., funding per student, per faculty).
   - Dr. S.R. Ranganathan recommended spending 50% of library recurring budget on Staff and 40% on Books & Periodicals (remaining 10% on contingencies).
   - Kothari Commission (1964-66) recommended allocating Rs. 25 per student and Rs. 300 per teacher, or 6.5% to 10% of university educational budget for libraries.
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u4_t6" and IDs: "ol_u4_t6_1" to "ol_u4_t6_12".
```

---

### Topic 4.7: Preservation, Conservation & Binding of Library Materials
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 4.7: Preservation, Conservation & Binding of Library Materials (पुस्तकालय सामग्री का संरक्षण, परिरक्षण एवं जिल्दसाजी)

Requirements:
1. Cover biological/chemical threats, environmental standards, deacidification processes, and binding types:
   - Preservation (परिरक्षण) is the broader preventive strategy encompassing managerial and environmental control; Conservation (संरक्षण) involves direct physical treatment of damaged items.
   - Major biological enemies (कीट व जैविक शत्रु) of library materials: Silverfish (लेपिस्मा), Termites / White ants (दीमक), Booklice, Bookworms, Cockroaches, and Fungi / Mildew (फफूंद).
   - Environmental standards: Ideal temperature for book stacks is 20°C to 22°C (68°F–72°F) and Relative Humidity (RH) between 45% and 55%.
   - High humidity (>65%) promotes fungal growth and mold; low humidity (<40%) causes paper embrittlement and desiccation.
   - Foxing (फॉक्सिंग): Rusty brownish/yellowish speckled spots appearing on old book paper caused by iron oxidation and fungus.
   - Chemical deacidification (विअम्लीकरण): Paper made from wood pulp contains acid (lignin) that causes brittleness; deacidification neutralizes acid using alkaline agents (e.g., Barrow's two-stage process, Wei T'o non-aqueous process, DEZ - Diethylzinc gas process).
   - Major binding styles: Full leather, Half leather (corners and spine leather, sides cloth/paper), Full cloth, Half cloth, Paperback / Board binding.
   - Collation (सत्यापन): Checking the sequence of pages, plates, and gatherings before sewing to ensure no pages are missing or misplaced.
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u4_t7" and IDs: "ol_u4_t7_1" to "ol_u4_t7_12".
```

---

# =========================================================================
# UNIT 5: पुस्तकालय स्वचालन एवं सूचना प्रौद्योगिकी (Library Automation & ICT)
# =========================================================================

### Topic 5.1: Basics of ICT, Computer Generations, Hardware, Software & Operating Systems
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 5.1: Basics of ICT, Computer Generations, Hardware, Software & Operating Systems (कंप्यूटर के आधारभूत तत्व, पीढ़ियां, हार्डवेयर, सॉफ्टवेयर एवं ओएस)

Requirements:
1. Cover computer generations, memory hierarchy, system software vs application software, and OS history:
   - 1st Generation (1940-1956): Used Vacuum Tubes; machine language; huge size and heat (e.g., ENIAC, EDVAC, UNIVAC-I).
   - 2nd Generation (1956-1963): Used Transistors (invented 1947 by Bardeen, Brattain, Shockley); assembly language & early Fortran/COBOL.
   - 3rd Generation (1964-1971): Used Integrated Circuits (IC - invented 1958 by Jack Kilby); high-level languages; multi-programming (e.g., IBM 360).
   - 4th Generation (1971-Present): Used VLSI (Very Large Scale Integration) microprocessors (Intel 4004 in 1971); personal computers.
   - 5th Generation: ULSI (Ultra Large Scale Integration), Artificial Intelligence (AI), parallel processing, and quantum computing.
   - Primary Memory: RAM (Random Access Memory - volatile, temporary read/write) and ROM (Read Only Memory - non-volatile, permanent firmware/BIOS).
   - Secondary Storage: Magnetic disks (HDD), Solid State Drives (SSD - flash memory, faster), Optical disks (CD-ROM 700 MB, DVD 4.7 GB, Blu-ray 25/50 GB).
   - System Software controls hardware: Operating Systems, Device Drivers, Compilers, Interpreters.
   - Unix operating system was created in 1969 at AT&T Bell Labs by Ken Thompson, Dennis Ritchie, and Brian Kernighan.
   - Linux kernel was created in 1991 by Linus Torvalds as open-source free software under GNU General Public License (GPL).
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u5_t1" and IDs: "ol_u5_t1_1" to "ol_u5_t1_12".
```

---

### Topic 5.2: Integrated Library Systems (ILS): Koha (Open Source, Perl, 1999) & Core Modules
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 5.2: Integrated Library Systems (ILS): Koha (Open Source, Perl, 1999) & Core Modules (कोहा ओपन सोर्स ILS एवं इसके मुख्य मॉड्यूल्स)

Requirements:
1. Cover origins, programming language, database, release year, licensing, and functional modules:
   - Koha is the world's first open-source Integrated Library System (ILS), developed in 1999 by Katipo Communications for the Horowhenua Library Trust in New Zealand; first live release on 1 January 2000.
   - "Koha" is a Māori word meaning "gift" or "donation".
   - Koha is licensed under GNU General Public License (GPL v3 or later), making it completely free to download, use, and modify.
   - Technology Stack: Written in Perl language; runs on Linux (Debian / Ubuntu recommended); uses MySQL or MariaDB database; Apache web server.
   - Full bibliographic support for international standards: MARC-21 and UNIMARC, Z39.50 and SRU/SRW protocols, and SIP2 for RFID integration.
   - Uses Zebra indexing engine or Elasticsearch for blazing-fast full-text bibliographic searching.
   - Core Modules of Koha: 1. Acquisition, 2. Cataloguing, 3. Circulation, 4. Patron Management, 5. Serials Control, 6. OPAC, 7. Reports & Statistics, 8. Koha Administration.
   - Web-based dual interface: Staff Client interface (for librarians) and OPAC interface (for patrons).
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u5_t2" and IDs: "ol_u5_t2_1" to "ol_u5_t2_12".
```

---

### Topic 5.3: Indian ILS: SOUL 3.0 (INFLIBNET) & e-Granthalaya 4.0 (NIC for Schools)
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 5.3: Indian ILS: SOUL 3.0 (INFLIBNET) & e-Granthalaya 4.0 (NIC for Schools) (सोल 3.0 एवं ई-ग्रंथालय 4.0)

Requirements:
1. Cover developers, version history, release years, cloud architecture, and school library focus:
   - SOUL (Software for University Libraries) is an indigenous state-of-the-art library automation software developed by INFLIBNET Centre, Gandhinagar (Gujarat).
   - Version Chronology of SOUL: SOUL 1.0 released in February 2000; SOUL 2.0 released in January 2009; latest web-based cloud-ready version SOUL 3.0 released in February 2021.
   - SOUL 3.0 features: Compliant with MARC-21, Unicode (supports all major Indian languages), NCIP 2.0 / SIP-2 protocol for RFID, web-based OPAC, and RESTful APIs.
   - e-Granthalaya is a digital platform for library automation and networking developed by National Informatics Centre (NIC), Ministry of Electronics & IT, Government of India.
   - Version Chronology of e-Granthalaya: Version 1.0 (2003), Version 2.0 (2005), Version 3.0 (2007 on client-server LAN), and Version 4.0 (2015).
   - e-Granthalaya 4.0 is a Cloud-ready Software as a Service (SaaS) application hosted centrally on the NIC National Cloud (MeghRaj).
   - e-Granthalaya 4.0 requires zero local software installation; libraries need only an internet browser to manage complete automation.
   - Widely adopted across government school libraries in India, including Kendriya Vidyalaya Sangathan (KVS), Navodaya Vidyalaya Samiti (NVS), and State government school networks.
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u5_t3" and IDs: "ol_u5_t3_1" to "ol_u5_t3_12".
```

---

### Topic 5.4: Identification Technologies: Barcode, RFID & QR Code
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 5.4: Identification Technologies: Barcode, RFID & QR Code (पहचान तकनीकें: बारकोड, आरएफआईडी एवं क्यूआर कोड)

Requirements:
1. Cover inventors, dates, frequency standards, components, and comparative differences:
   - Barcode technology was invented between 1948 and 1952 by Norman Joseph Woodland and Bernard Silver (US Patent 1952), inspired by Morse code dots and dashes.
   - First commercial barcode scan: 26 June 1974 at a supermarket in Troy, Ohio, on a pack of Wrigley's Juicy Fruit chewing gum.
   - Barcode is a 1D (One-Dimensional) optical representation that strictly requires a direct, unobstructed optical line-of-sight between scanner and code.
   - Code 39 (Code 3 of 9) is an alphanumeric symbology most commonly used in libraries for book accession numbers and patron identity cards.
   - RFID (Radio Frequency Identification) operates via radio electromagnetic waves enabling contactless and non-line-of-sight communication.
   - Library RFID operates on the High Frequency (HF) band at 13.56 MHz, governed by international standards ISO 15693 and ISO 18000-3.
   - 5 Core Components of Library RFID: RFID Tag (transponder with microchip & antenna), Staff Workstation Reader, EAS Security Gates, Handheld Inventory Wand, and Self-Service Kiosks / Smart Book Drop.
   - EAS (Electronic Article Surveillance) bit within the RFID tag acts as an anti-theft security trigger; deactivated upon legitimate issue, reactivated upon return.
   - RFID Handheld Inventory Wand enables stock verification of hundreds of books per minute directly from shelf spines without pulling them out.
   - QR Code (Quick Response Code) was invented in 1994 by Masahiro Hara at Denso Wave (Japan); a 2D matrix barcode with 3 position detection patterns ('eyes').
   - QR Code features high data storage (up to 7,089 numbers / 4,296 alphanumeric characters) and Reed-Solomon error correction (recovers up to 30% damaged symbol).
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u5_t4" and IDs: "ol_u5_t4_1" to "ol_u5_t4_12".
```

---

### Topic 5.5: OPAC & Web-OPAC, Search Techniques (Boolean Operators: AND, OR, NOT)
```text
Act as a Senior Library Science Professor & Subject Matter Expert for Bihar School Librarian Examination (BSEB LET & BPSC).
Generate 10 to 12 high-yield, exam-oriented, punchy ONE-LINER FACTS for:
Topic 5.5: OPAC & Web-OPAC, Search Techniques (Boolean Operators: AND, OR, NOT) (ओपैक, वेब-ओपैक एवं बूलियन खोज तकनीकें)

Requirements:
1. Cover definitions, George Boole, Boolean operators impact on retrieval, truncation, wildcards, and phrase searching:
   - OPAC (Online Public Access Catalogue) is the digital catalog interface of an ILS enabling real-time discovery and live circulation status checking.
   - Web-OPAC provides 24×7 universal browser access via the internet with zero client installation, supporting remote renewals, reservations, and reading histories.
   - Web-OPAC supports Z39.50 and SRU/SRW protocols for federated cross-catalog searching across multiple university libraries.
   - Boolean Logic was formulated in 1847 by British mathematician George Boole in 'The Mathematical Analysis of Logic', based on Set Theory and Venn diagrams.
   - AND Operator (Logical Product / Intersection): Narrows and restricts search results, retrieving only records that contain all specified search terms concurrently (e.g., 'Library AND Automation').
   - OR Operator (Logical Sum / Union): Expands and broadens search results, indispensable for synonyms and alternate spellings (e.g., 'Cataloguing OR Cataloging').
   - NOT / AND NOT Operator (Logical Difference / Exclusion): Narrows results by excluding records containing the unwanted term (e.g., 'Classification NOT Colon').
   - Truncation (Right Truncation with asterisk * or $): Searches all word derivatives from a root stem (e.g., 'Librar*' retrieves Library, Libraries, Librarian, Librarianship).
   - Wildcards (Single character substitution with ? or #): Replaces a variable letter within a word (e.g., 'Wom?n' retrieves Woman and Women; 'Colo?r' retrieves Color and Colour).
   - Phrase Searching (enclosed in double quotation marks "..."): Enforces exact word sequence adjacency (e.g., '"Digital Library"').
   - Proximity Operators: NEAR (within specified word distance in any order) and ADJ / WITH (adjacent within same sentence).
2. Output MUST be ONLY a valid JSON array of objects.
3. Use category_key: "u5_t5" and IDs: "ol_u5_t5_1" to "ol_u5_t5_12".
```
