-- ==========================================================
-- Bihar Librarian Ninja - Complete Supabase Database Schema & Seed
-- Run this script in the Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New Query -> Paste & Click Run
-- ==========================================================

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS public.study_units (
  id TEXT PRIMARY KEY,
  unit_number INTEGER NOT NULL,
  title_hi TEXT NOT NULL,
  title_en TEXT NOT NULL,
  short_desc_hi TEXT NOT NULL,
  short_desc_en TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.study_topics (
  id TEXT PRIMARY KEY,
  unit_id TEXT NOT NULL REFERENCES public.study_units(id) ON DELETE CASCADE,
  topic_order INTEGER DEFAULT 1,
  title_hi TEXT NOT NULL,
  title_en TEXT NOT NULL,
  content_hi TEXT NOT NULL,
  content_en TEXT NOT NULL,
  key_points JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.flashcards (
  id TEXT PRIMARY KEY,
  category_hi TEXT NOT NULL,
  category_en TEXT NOT NULL,
  front_hi TEXT NOT NULL,
  front_en TEXT NOT NULL,
  back_hi TEXT NOT NULL,
  back_en TEXT NOT NULL,
  subtext_hi TEXT,
  subtext_en TEXT,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.questions (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  question_hi TEXT NOT NULL,
  question_en TEXT NOT NULL,
  option_a_hi TEXT NOT NULL,
  option_a_en TEXT NOT NULL,
  option_b_hi TEXT NOT NULL,
  option_b_en TEXT NOT NULL,
  option_c_hi TEXT NOT NULL,
  option_c_en TEXT NOT NULL,
  option_d_hi TEXT NOT NULL,
  option_d_en TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  explanation_hi TEXT,
  explanation_en TEXT,
  difficulty TEXT DEFAULT 'medium',
  year TEXT,
  source_exam TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.mock_tests (
  id TEXT PRIMARY KEY,
  title_hi TEXT NOT NULL,
  title_en TEXT NOT NULL,
  subtitle_hi TEXT NOT NULL,
  subtitle_en TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  total_marks INTEGER NOT NULL DEFAULT 100,
  pass_marks INTEGER NOT NULL DEFAULT 45,
  question_count INTEGER NOT NULL DEFAULT 50,
  question_ids JSONB DEFAULT '[]'::jsonb,
  test_type TEXT NOT NULL DEFAULT 'full_length',
  badge_hi TEXT,
  badge_en TEXT,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.study_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_tests ENABLE ROW LEVEL SECURITY;

-- 3. Public Read Policies (Allows your mobile app users to read all study content)
DROP POLICY IF EXISTS "Allow public read access on study_units" ON public.study_units;
CREATE POLICY "Allow public read access on study_units" ON public.study_units FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on study_topics" ON public.study_topics;
CREATE POLICY "Allow public read access on study_topics" ON public.study_topics FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on flashcards" ON public.flashcards;
CREATE POLICY "Allow public read access on flashcards" ON public.flashcards FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on questions" ON public.questions;
CREATE POLICY "Allow public read access on questions" ON public.questions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on mock_tests" ON public.mock_tests;
CREATE POLICY "Allow public read access on mock_tests" ON public.mock_tests FOR SELECT USING (true);

-- 4. Clear old data before re-inserting
DELETE FROM public.study_topics;
DELETE FROM public.study_units;
DELETE FROM public.flashcards;
DELETE FROM public.questions;
DELETE FROM public.mock_tests;

-- 5. Seed Initial Data
INSERT INTO public.study_units (id, unit_number, title_hi, title_en, short_desc_hi, short_desc_en, icon_name, display_order)
VALUES ('unit_1', 1, 'यूनिट 1: पुस्तकालय विज्ञान के आधार एवं रंगनाथन के 5 नियम', 'Unit 1: Foundations of Library Science & 5 Laws', 'पुस्तकालय विज्ञान के जनक, 5 सूत्र, पुस्तकालय अधिनियम, ILA, IFLA एवं RRRLF', 'Father of LIS, 5 Laws, Library Legislation, ILA, IFLA & RRRLF', 'book', 1)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  short_desc_hi = EXCLUDED.short_desc_hi,
  short_desc_en = EXCLUDED.short_desc_en,
  icon_name = EXCLUDED.icon_name;

INSERT INTO public.study_topics (id, unit_id, topic_order, title_hi, title_en, content_hi, content_en, key_points)
VALUES ('t_laws', 'unit_1', 1, 'डॉ. एस.आर. रंगनाथन एवं पुस्तकालय विज्ञान के पांच सूत्र', 'Dr. S.R. Ranganathan & The Five Laws of Library Science', 'डॉ. शियाली रामामृत रंगनाथन (12 अगस्त 1892 - 27 सितंबर 1972) को भारत में "पुस्तकालय विज्ञान का जनक" (Father of Library Science in India) कहा जाता है। 12 अगस्त को प्रतिवर्ष भारत में "राष्ट्रीय पुस्तकालय दिवस" (National Librarians Day) मनाया जाता है।

1. प्रथम सूत्र: पुस्तकें उपयोग के लिए हैं (Books are for use)
- निहितार्थ: पुस्तकालय का स्थान शहर के केंद्र में होना चाहिए। पुस्तकालय खुलने का समय सुविधाजनक हो। मुक्त प्रवेश प्रणाली (Open Access System) को अपनाना।

2. द्वितीय सूत्र: प्रत्येक पाठक को उसकी पुस्तक मिले (Every reader his/her book)
- निहितार्थ: पुस्तकालय सभी वर्गों (दृष्टिबाधित, ग्रामीण, बाल, वृद्ध) के लिए सुलभ हो। राज्य का कर्तव्य है कि वह पुस्तकालय कानून बनाए।

3. तृतीय सूत्र: प्रत्येक पुस्तक को उसका पाठक मिले (Every book its reader)
- निहितार्थ: खुली प्रवेश प्रणाली, पुस्तकों का आकर्षक प्रदर्शन (Display of new arrivals), सुव्यवस्थित सूचीकरण (Classified Catalogue)।

4. चतुर्थ सूत्र: पाठक का समय बचाएं (Save the time of the reader)
- निहितार्थ: त्वरित निर्गम-आगम प्रणाली (Browne/Newark), कुशल संदर्भ सेवा (Reference Service), पुस्तकालय स्वचालन एवं कंप्यूटरीकरण।

5. पंचम सूत्र: पुस्तकालय एक वर्धनशील संस्था है (Library is a growing organism)
- निहितार्थ: संग्रह, पाठक एवं भवन में निरंतर जैविक वृद्धि। अनुपयोगी एवं पुरानी पुस्तकों की छंटाई (Weeding Out) इसी नियम के अंतर्गत आती है।', 'Dr. Shiyali Ramamrita Ranganathan (12 August 1892 - 27 September 1972) is universally acknowledged as the Father of Library Science in India. August 12 is celebrated annually as National Librarians Day.

1. First Law: Books are for use
- Open access system, central location of library, convenient library hours, comfortable furniture.

2. Second Law: Every reader his/her book
- Democratization of library access for all demographics (children, visually impaired, rural citizens), mandatory library legislation by states.

3. Third Law: Every book its reader
- Open shelves, dynamic display of new books, analytical cataloguing entries to bring hidden books into active circulation.

4. Fourth Law: Save the time of the reader
- Fast circulation systems (Browne/Newark/RFID), automated OPAC searching, well-trained reference librarians.

5. Fifth Law: Library is a growing organism
- Biological growth in book collection, staff, and users. Weeding out obsolete materials to maintain collection freshness.', '[{"hi":"सूत्रों का प्रतिपादन: 1928 (मीनाक्षी कॉलेज, अन्नामलाई नगर)","en":"Formulation of Laws: 1928 (Meenakshi College)"},{"hi":"पुस्तक प्रकाशन: 1931 (मद्रास लाइब्रेरी एसोसिएशन द्वारा)","en":"Book Published: 1931 (by Madras Library Association)"},{"hi":"राष्ट्रीय लाइब्रेरियन दिवस: 12 अगस्त (रंगनाथन जयंती)","en":"National Librarians Day: August 12"}]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  content_hi = EXCLUDED.content_hi,
  content_en = EXCLUDED.content_en,
  key_points = EXCLUDED.key_points;

INSERT INTO public.study_topics (id, unit_id, topic_order, title_hi, title_en, content_hi, content_en, key_points)
VALUES ('t_legislation', 'unit_1', 2, 'भारत में पुस्तकालय विधान (Library Legislation in India)', 'Public Library Legislation in India', 'भारत में अब तक 19 राज्यों में सार्वजनिक पुस्तकालय अधिनियम पारित किए जा चुके हैं:

1. मद्रास (तमिलनाडु) - 1948 (प्रथम राज्य)
2. आंध्र प्रदेश - 1960
3. कर्नाटक (मैसूर) - 1965
4. महाराष्ट्र - 1967
5. पश्चिम बंगाल - 1979
6. मणिपुर - 1988
7. केरल - 1989
8. हरियाणा - 1989
9. मिजोरम - 1993
10. गोवा - 1993
11. गुजरात - 2001
12. ओडिशा - 2001
13. उत्तराखंड - 2005
14. राजस्थान - 2006
15. उत्तर प्रदेश - 2006
16. बिहार - 2008 ("बिहार राज्य पुस्तकालय एवं सूचना केंद्र अधिनियम 2008")
17. छत्तीसगढ़ - 2008
18. अरुणाचल प्रदेश - 2009
19. तेलंगाना - 2015

उपकर (Library Cess):
मद्रास, आंध्र प्रदेश, कर्नाटक, केरल और हरियाणा में गृह कर या संपत्ति कर पर पुस्तकालय उपकर (Cess) लिया जाता है। महाराष्ट्र और पश्चिम बंगाल में कोई उपकर नहीं है, राज्य सरकार बजट अनुदान देती है।', 'To date, 19 Indian states have enacted public library legislation:
1. Madras (Tamil Nadu) - 1948 (First in India)
2. Andhra Pradesh - 1960
3. Karnataka - 1965
4. Maharashtra - 1967
5. West Bengal - 1979
6. Manipur - 1988
7. Kerala - 1989
8. Haryana - 1989
9. Mizoram - 1993
10. Goa - 1993
11. Gujarat - 2001
12. Odisha - 2001
13. Uttarakhand - 2005
14. Rajasthan - 2006
15. Uttar Pradesh - 2006
16. Bihar - 2008 (Bihar State Public Library & Information Centre Act 2008)
17. Chhattisgarh - 2008
18. Arunachal Pradesh - 2009
19. Telangana - 2015

Library Cess:
Levied in Tamil Nadu, Andhra Pradesh, Karnataka, Kerala, and Haryana. Maharashtra and West Bengal finance libraries through annual state budgetary allocations.', '[{"hi":"पहला राज्य: मद्रास (तमिलनाडु) 1948","en":"First state: Madras (Tamil Nadu) 1948"},{"hi":"बिहार पुस्तकालय अधिनियम: 2008","en":"Bihar Library Act: 2008"},{"hi":"कुल अधिनियमित राज्य: 19","en":"Total States with legislation: 19"}]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  content_hi = EXCLUDED.content_hi,
  content_en = EXCLUDED.content_en,
  key_points = EXCLUDED.key_points;

INSERT INTO public.study_units (id, unit_number, title_hi, title_en, short_desc_hi, short_desc_en, icon_name, display_order)
VALUES ('unit_2', 2, 'यूनिट 2: वर्गीकरण एवं सूचीकरण (DDC, CC, AACR-2)', 'Unit 2: Classification & Cataloguing (DDC, CC, AACR-2)', 'डेवी दशमलव वर्गीकरण, कोलन वर्गीकरण, PMEST, सूचीकरण कोड, ISBN एवं MARC', 'Dewey Decimal Classification, Colon Classification, PMEST, Cataloguing, ISBN & MARC', 'folder', 2)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  short_desc_hi = EXCLUDED.short_desc_hi,
  short_desc_en = EXCLUDED.short_desc_en,
  icon_name = EXCLUDED.icon_name;

INSERT INTO public.study_topics (id, unit_id, topic_order, title_hi, title_en, content_hi, content_en, key_points)
VALUES ('t_ddc', 'unit_2', 1, 'डेवी दशमलव वर्गीकरण (DDC - Dewey Decimal Classification)', 'Dewey Decimal Classification (DDC)', 'DDC का आविष्कार मेलविल डेवी ने 1876 में एमहर्स्ट कॉलेज (अमेरिका) में किया था। यह विश्व में सबसे अधिक उपयोग की जाने वाली वर्गीकरण पद्धति है।

DDC के 10 मुख्य वर्ग (Main Classes):
* 000 - सामान्य ज्ञान एवं कंप्यूटर विज्ञान (Generalities / Computer Science)
* 100 - दर्शनशास्त्र एवं मनोविज्ञान (Philosophy & Psychology)
* 200 - धर्म (Religion)
* 300 - समाज विज्ञान (Social Sciences)
* 400 - भाषा विज्ञान (Language)
* 500 - प्राकृतिक विज्ञान एवं गणित (Pure Sciences / Mathematics)
* 600 - प्रौद्योगिकी एवं अनुप्रयुक्त विज्ञान (Technology / Applied Sciences)
* 700 - कला एवं मनोरंजन (The Arts / Recreation)
* 800 - साहित्य (Literature)
* 900 - इतिहास, भूगोल एवं जीवनी (History, Geography & Biography)

प्रमुख संस्करण:
- 19वां संस्करण (1979): 3 खंडों में (सर्वाधिक परीक्षाओं में पूछा जाता है)
- 23वां संस्करण (2011): 4 खंडों में (वर्तमान मुद्रित संस्करण)', 'Melvil Dewey formulated DDC in 1876 at Amherst College, USA. It is the most widely adopted library classification system globally.

The 10 Main Classes of DDC:
* 000 - Computer Science, Information & Generalities
* 100 - Philosophy & Psychology
* 200 - Religion
* 300 - Social Sciences
* 400 - Language
* 500 - Pure Sciences (Physics, Chemistry, Math, Biology)
* 600 - Technology (Applied Sciences, Medicine, Engineering)
* 700 - Arts & Recreation
* 800 - Literature
* 900 - History, Geography & Biography

Key Editions:
- 19th Edition (1979): 3 Volumes (Frequently examined in Bihar/KVS exams)
- 23rd Edition (2011): 4 Volumes (Standard latest print edition)', '[{"hi":"प्रवर्तक: मेलविल डेवी (1876)","en":"Founder: Melvil Dewey (1876)"},{"hi":"10 मुख्य वर्ग: 000 से 900","en":"10 Main Classes: 000 to 900"},{"hi":"19वां संस्करण: 3 खंड (Tables, Schedules, Index)","en":"19th edition: 3 Volumes"}]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  content_hi = EXCLUDED.content_hi,
  content_en = EXCLUDED.content_en,
  key_points = EXCLUDED.key_points;

INSERT INTO public.study_topics (id, unit_id, topic_order, title_hi, title_en, content_hi, content_en, key_points)
VALUES ('t_cc', 'unit_2', 2, 'कोलन वर्गीकरण (Colon Classification - CC) एवं PMEST', 'Colon Classification (CC) & PMEST', 'कोलन वर्गीकरण (CC) का निर्माण डॉ. एस.आर. रंगनाथन द्वारा 1933 में किया गया। यह एक विश्लेषणात्मक-संश्लेषणात्मक (Analytico-Synthetic) वर्गीकरण प्रणाली है।

मूलभूत श्रेणियां (PMEST) एवं योजक चिह्न (Connecting Symbols):
1. P - Personality (व्यक्तित्व) -> योजक चिह्न: कॉमा ( , )
2. M - Matter (पदार्थ) -> योजक चिह्न: सेमीकोलन ( ; )
3. E - Energy (ऊर्जा / क्रिया) -> योजक चिह्न: कोलन ( : )
4. S - Space (स्थान) -> योजक चिह्न: डॉट ( . )
5. T - Time (काल / समय) -> योजक चिह्न: सिंगल इनवर्टेड कॉमा ( '' ) (छठे संस्करण के पुनर्मुद्रण 1963 से)

संस्करण:
- 1st Edition: 1933
- 6th Edition: 1960 (सबसे लोकप्रिय)
- 7th Edition: 1987 (एम.ए. गोपीनाथ द्वारा संपादित)', 'Colon Classification (CC) was conceived by Dr. S.R. Ranganathan in 1933. It is the premier example of an Analytico-Synthetic classification scheme.

Fundamental Categories (PMEST) & Connecting Symbols:
1. P - Personality -> Connecting symbol: Comma ( , )
2. M - Matter -> Connecting symbol: Semicolon ( ; )
3. E - Energy -> Connecting symbol: Colon ( : )
4. S - Space -> Connecting symbol: Dot ( . )
5. T - Time -> Connecting symbol: Single inverted comma ( '' ) (Changed from dot to inverted comma in 1963 reprint)

Editions:
- 1st Edition: 1933
- 6th Edition: 1960 (Most widely taught & practiced)
- 7th Edition: 1987 (Edited by M.A. Gopinath)', '[{"hi":"CC प्रथम संस्करण: 1933","en":"CC First edition: 1933"},{"hi":"PMEST के योजक चिह्न: , ; : . ''","en":"PMEST Connecting Symbols: , ; : . ''"},{"hi":"प्रणाली प्रकार: विश्लेषणात्मक-संश्लेषणात्मक","en":"System Type: Analytico-Synthetic"}]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  content_hi = EXCLUDED.content_hi,
  content_en = EXCLUDED.content_en,
  key_points = EXCLUDED.key_points;

INSERT INTO public.study_units (id, unit_number, title_hi, title_en, short_desc_hi, short_desc_en, icon_name, display_order)
VALUES ('unit_3', 3, 'यूनिट 3: पुस्तकालय स्वचालन, कोहा, SOUL एवं ICT', 'Unit 3: Library Automation, Koha, SOUL & ICT', 'ओपन सोर्स ILS, कोहा, इनफ्लिबनेट सोल, DSpace, बारकोड, RFID एवं OPAC', 'Open Source ILS, Koha, INFLIBNET SOUL, DSpace, Barcode, RFID & OPAC', 'cpu', 3)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  short_desc_hi = EXCLUDED.short_desc_hi,
  short_desc_en = EXCLUDED.short_desc_en,
  icon_name = EXCLUDED.icon_name;

INSERT INTO public.study_topics (id, unit_id, topic_order, title_hi, title_en, content_hi, content_en, key_points)
VALUES ('t_koha_soul', 'unit_3', 1, 'कोहा (Koha) एवं SOUL 3.0 पुस्तकालय सॉफ्टवेयर', 'Koha & SOUL 3.0 Integrated Library Systems', '1. कोहा (Koha):
- विश्व का प्रथम ओपन-सोर्स एकीकृत पुस्तकालय प्रबंधन प्रणाली (ILS)।
- विकास: 1999 में न्यूजीलैंड के हॉरोव्हेनुआ लाइब्रेरी ट्रस्ट के लिए कातिपो कम्युनिकेशंस द्वारा।
- भाषा: पर्ल (Perl) प्रोग्रामिंग भाषा में लिखा गया है।
- विशेषताएं: वेब आधारित OPAC, MARC 21 और Z39.50 सपोर्ट, मल्टीलिंगुअल, कोई लाइसेंस शुल्क नहीं।

2. SOUL (Software for University Libraries):
- विकास: INFLIBNET केंद्र (विश्वविद्यालय अनुदान आयोग - UGC के तहत स्वायत्त अंतर-विश्वविद्यालय केंद्र)।
- संस्करण:
  * SOUL 1.0 - 2000
  * SOUL 2.0 - 2009
  * SOUL 3.0 - फरवरी 2021 में जारी (नवीनतम क्लाउड आधारित)
- मुख्य मॉड्यूल: अधिग्रहण (Acquisition), कैटलॉगिंग (Cataloguing), परिसंचरण (Circulation), धारावाहिक नियंत्रण (Serial Control), OPAC, और प्रशासन (Administration)।

3. ई-ग्रंथालय (e-Granthalaya):
- राष्ट्रीय सूचना विज्ञान केंद्र (NIC), भारत सरकार द्वारा विशेष रूप से सरकारी एवं केंद्रीय विद्यालय/नवोदय विद्यालयों के पुस्तकालयों हेतु विकसित क्लाउड सॉफ्टवेयर।', '1. Koha:
- The worlds pioneering open-source Integrated Library System (ILS).
- Developed in 1999 in New Zealand by Katipo Communications for Horowhenua Library Trust.
- Written in Perl; supports full MARC 21, Z39.50, web-based OPAC, and multi-branch management without license costs.

2. SOUL 3.0:
- Developed by INFLIBNET Centre (autonomous IUC under UGC).
- Versions: SOUL 1.0 (2000), SOUL 2.0 (2009), SOUL 3.0 (February 2021).
- Six Core Modules: Acquisition, Catalogue, Circulation, Serial Control, OPAC, and Administration.

3. e-Granthalaya:
- Cloud-based library management platform developed by National Informatics Centre (NIC), Ministry of Electronics & IT, Government of India for government and public school libraries.', '[{"hi":"कोहा: प्रथम ओपन सोर्स ILS (1999, न्यूजीलैंड)","en":"Koha: First Open Source ILS (1999, New Zealand)"},{"hi":"SOUL 3.0: INFLIBNET द्वारा 2021 में जारी","en":"SOUL 3.0: Released by INFLIBNET in 2021"},{"hi":"ई-ग्रंथालय: NIC द्वारा स्कूलों एवं सरकारी पुस्तकालयों हेतु","en":"e-Granthalaya: By NIC for school libraries"}]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  content_hi = EXCLUDED.content_hi,
  content_en = EXCLUDED.content_en,
  key_points = EXCLUDED.key_points;

INSERT INTO public.study_units (id, unit_number, title_hi, title_en, short_desc_hi, short_desc_en, icon_name, display_order)
VALUES ('unit_4', 4, 'यूनिट 4: बिहार विशेष सामान्य ज्ञान एवं पुस्तकालय धरोहर', 'Unit 4: Bihar Special GK & Library Heritage', 'प्राचीन नालंदा "धर्मगंज", खुदा बख्श लाइब्रेरी, बिहार पुस्तकालय अधिनियम 2008, 1857 क्रांति', 'Ancient Nalanda Dharmaganja, Khuda Bakhsh Library, Bihar Library Act 2008, 1857 Revolt', 'landmark', 4)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  short_desc_hi = EXCLUDED.short_desc_hi,
  short_desc_en = EXCLUDED.short_desc_en,
  icon_name = EXCLUDED.icon_name;

INSERT INTO public.study_topics (id, unit_id, topic_order, title_hi, title_en, content_hi, content_en, key_points)
VALUES ('t_bihar_lib', 'unit_4', 1, 'बिहार के ऐतिहासिक पुस्तकालय एवं धर्मगंज (नालंदा)', 'Historic Libraries of Bihar & Nalanda Dharmaganja', '1. प्राचीन नालंदा विश्वविद्यालय पुस्तकालय "धर्मगंज":
- नालंदा विश्वविद्यालय (5वीं शताब्दी गुप्त काल में स्थापित) का पुस्तकालय संपूर्ण विश्व में विख्यात था।
- इस पुस्तकालय परिसर को "धर्मगंज" (सत्य का पर्वत) कहा जाता था।
- इसमें तीन विशाल बहुमंजिला भवन थे:
  1. रत्नसागर (Ratnasagara)
  2. रत्नोदधि (Ratnodadhi) - नौ मंजिला मुख्य भवन
  3. रत्नरंजक (Ratnaranjaka)
- 1193 ईस्वी में आक्रांता बख्तियार खिलजी ने इसे आग के हवाले कर दिया, जिससे महीनों तक ज्ञान की अमूल्य पांडुलिपियां जलती रहीं।

2. खुदा बख्श ओरिएंटल पब्लिक लाइब्रेरी (पटना):
- स्थापना: खान बहादुर खुदा बख्श द्वारा 29 अक्टूबर 1891 को जनता के लिए खोला गया।
- यह गंगा तट, अशोक राजपथ, पटना में स्थित है।
- इसमें अरबी, फारसी, उर्दू, तुर्की और पश्तो की दुर्लभतम पांडुलिपियां (जैसे राजपूत और मुगल कालीन दुर्लभ चित्र एवं पाडुलिपियां) संग्रहित हैं।
- संसद के एक अधिनियम द्वारा 1969 में इसे "राष्ट्रीय महत्व का संस्थान" घोषित किया गया।

3. सिन्हा लाइब्रेरी (स्टेट सेंट्रल लाइब्रेरी, बिहार):
- डॉ. सच्चिदानंद सिन्हा (संविधान सभा के प्रथम अस्थायी अध्यक्ष) द्वारा अपनी पत्नी राधिका सिन्हा की स्मृति में 1924 में स्थापित।
- वर्तमान में यह बिहार की "राज्य केंद्रीय पुस्तकालय" (State Central Library) के रूप में कार्यरत है।', '1. Ancient Nalanda University Library "Dharmaganja":
- Founded in the 5th century during the Gupta Empire, Nalandas library was globally celebrated.
- The library campus was named "Dharmaganja" (Mountain of Truth).
- Comprised three grand multistory monuments:
  1. Ratnasagara (Ocean of Jewels)
  2. Ratnodadhi (Sea of Jewels) - 9-storey main library
  3. Ratnaranjaka (Jewel Adorned)
- Destroyed in 1193 CE by Bakhtiyar Khilji.

2. Khuda Bakhsh Oriental Public Library (Patna):
- Opened to the public on 29 October 1891 by Khan Bahadur Khuda Bakhsh.
- Located on Ashok Rajpath, Patna along the holy Ganga.
- World renowned for priceless Arabic, Persian, Urdu, Turkish, and Pashto manuscripts.
- Declared an Institution of National Importance by an Act of Parliament in 1969.

3. Sinha Library (State Central Library, Bihar):
- Established in 1924 by Dr. Sachchidananda Sinha in memory of his wife Radhika Sinha.
- Officially functions as the State Central Library of Bihar.', '[{"hi":"नालंदा पुस्तकालय: धर्मगंज (रत्नसागर, रत्नोदधि, रत्नरंजक)","en":"Nalanda library: Dharmaganja (9-storey Ratnodadhi)"},{"hi":"खुदा बख्श लाइब्रेरी: 1891 स्थापित, 1969 राष्ट्रीय महत्व","en":"Khuda Bakhsh: Est. 1891, National Importance 1969"},{"hi":"सिन्हा लाइब्रेरी पटना: बिहार की स्टेट सेंट्रल लाइब्रेरी","en":"Sinha Library Patna: State Central Library of Bihar"}]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  content_hi = EXCLUDED.content_hi,
  content_en = EXCLUDED.content_en,
  key_points = EXCLUDED.key_points;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_1', 'संस्थापक एवं वर्ष', 'Founders & Years', 'भारत में पुस्तकालय विज्ञान के जनक कौन हैं?', 'Who is the Father of Library Science in India?', 'डॉ. एस.आर. रंगनाथन (S.R. Ranganathan, 1892-1972)', 'Dr. S.R. Ranganathan (1892-1972)', '12 अगस्त को राष्ट्रीय लाइब्रेरियन दिवस मनाया जाता है', 'National Librarians Day celebrated on August 12', 1)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_2', 'वर्गीकरण पद्धतियां', 'Classification Schemes', 'DDC (Dewey Decimal Classification) के जनक एवं प्रथम वर्ष?', 'Founder & 1st Edition year of DDC?', 'मेलविल डेवी (Melvil Dewey) - 1876', 'Melvil Dewey - 1876', 'प्रथम संस्करण में 44 पृष्ठ थे', 'First edition had only 44 pages', 2)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_3', 'वर्गीकरण पद्धतियां', 'Classification Schemes', 'कोलन वर्गीकरण (Colon Classification - CC) का प्रथम संस्करण कब आया?', 'When was the 1st edition of Colon Classification published?', 'वर्ष 1933 (डॉ. एस.आर. रंगनाथन द्वारा)', 'Year 1933 (by Dr. S.R. Ranganathan)', 'प्रणाली: Analytico-Synthetic (विश्लेषणात्मक-संश्लेषणात्मक)', 'System: Analytico-Synthetic', 3)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_4', 'DDC 10 मुख्य वर्ग', 'DDC 10 Main Classes', 'DDC में 000, 300, 500 एवं 900 मुख्य वर्ग क्या दर्शाते हैं?', 'What do DDC classes 000, 300, 500 & 900 represent?', '000: कंप्यूटर/सामान्य
300: समाज विज्ञान (Social Science)
500: प्राकृतिक विज्ञान (Pure Science)
900: इतिहास एवं भूगोल (History/Geography)', '000: Computer Science & Generalities
300: Social Sciences
500: Pure Sciences
900: History & Geography', NULL, NULL, 4)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_5', 'पुस्तकालय संघ एवं कानून', 'Associations & Legislation', 'ILA एवं IFLA की स्थापना किस वर्ष हुई थी?', 'In which years were ILA and IFLA founded?', 'IFLA: 1927 (मुख्यालय: द हेग, नीदरलैंड्स)
ILA: 1933 (मुख्यालय: नई दिल्ली, भारत)', 'IFLA: 1927 (HQ: The Hague, Netherlands)
ILA: 1933 (HQ: New Delhi, India)', NULL, NULL, 5)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_6', 'बिहार पुस्तकालय धरोहर', 'Bihar Library Heritage', 'प्राचीन नालंदा विश्वविद्यालय के पुस्तकालय के 3 भवनों के नाम?', 'Names of the 3 library buildings of ancient Nalanda University?', '1. रत्नसागर (Ratnasagara)
2. रत्नोदधि (Ratnodadhi - 9 मंजिला मुख्य भवन)
3. रत्नरंजक (Ratnaranjaka)
सम्पूर्ण परिसर का नाम: धर्मगंज', '1. Ratnasagara
2. Ratnodadhi (9-storey central building)
3. Ratnaranjaka
Campus name: Dharmaganja', NULL, NULL, 6)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_7', 'सॉफ्टवेयर एवं तकनीक', 'Software & Technology', 'Koha और SOUL क्या हैं और कब बने?', 'What are Koha and SOUL and when were they created?', 'Koha: प्रथम ओपन-सोर्स ILS (1999, न्यूजीलैंड)
SOUL: INFLIBNET द्वारा भारतीय विश्वविद्यालयों हेतु (नवीनतम SOUL 3.0: 2021)', 'Koha: 1st Open-Source ILS (1999, New Zealand)
SOUL: Developed by INFLIBNET for India (SOUL 3.0 in 2021)', NULL, NULL, 7)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_8', 'अंतर्राष्ट्रीय मानक', 'International Standards', 'ISBN एवं ISSN में कुल कितने अंक होते हैं?', 'How many digits are in ISBN and ISSN?', 'ISBN: 13 अंक (1 जनवरी 2007 से पूर्व 10 अंक थे)
ISSN: 8 अंक (पत्र-पत्रिकाओं / सीरियल्स हेतु)', 'ISBN: 13 digits (was 10 digits before 2007)
ISSN: 8 digits (for serials/periodicals)', NULL, NULL, 8)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_lis_1', 'lis_foundations', 'पुस्तकालय विज्ञान के पांच सूत्रों (Five Laws of Library Science) का प्रतिपादन डॉ. एस. आर. रंगनाथन ने किस वर्ष किया था?', 'In which year did Dr. S. R. Ranganathan formulate the Five Laws of Library Science?', '1924', '1924', '1928', '1928', '1931', '1931', '1933', '1933', 'B', 'डॉ. रंगनाथन ने 1928 में मीनाक्षी कॉलेज, अन्नामलाई नगर में इन पांच सूत्रों का पहली बार प्रतिपादन किया था। यह पुस्तक के रूप में 1931 में मद्रास लाइब्रेरी एसोसिएशन (MALA) द्वारा प्रकाशित हुआ।', 'Dr. S.R. Ranganathan formulated the Five Laws in 1928 at Meenakshi College, Annamalai Nagar. They were published as a book in 1931 by Madras Library Association (MALA).', 'easy', NULL, 'KVS / Bihar Librarian')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_lis_2', 'lis_foundations', '"पुस्तकालय एक वर्धनशील संस्था है" (Library is a growing organism) यह पुस्तकालय विज्ञान का कौन सा सूत्र है?', '"Library is a growing organism" represents which Law of Library Science?', 'प्रथम सूत्र', 'First Law', 'तृतीय सूत्र', 'Third Law', 'चतुर्थ सूत्र', 'Fourth Law', 'पंचम सूत्र', 'Fifth Law', 'D', 'पंचम सूत्र कहता है कि पुस्तकालय एक वर्धनशील संस्था है। इसके अनुसार पाठकों, पुस्तकों, कर्मचारियों एवं भवन में निरंतर जैविक वृद्धि होती रहती है। वीपिंग (Weeding out) भी इसी सूत्र से संबंधित है।', 'The Fifth Law states that the Library is a growing organism. It deals with growth in collection, staff, readers, and space, as well as weeding out of obsolete materials.', 'easy', NULL, 'DSSSB / BSLET')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_lis_3', 'lis_foundations', 'भारत में प्रथम पुस्तकालय अधिनियम (Library Legislation) किस राज्य में पारित किया गया था?', 'In which state was the first Public Library Act passed in India?', 'मद्रास (तमिलनाडु) - 1948', 'Madras (Tamil Nadu) - 1948', 'आंध्र प्रदेश - 1960', 'Andhra Pradesh - 1960', 'कर्नाटक - 1965', 'Karnataka - 1965', 'महाराष्ट्र - 1967', 'Maharashtra - 1967', 'A', 'भारत में स्वतंत्रता के बाद पहला सार्वजनिक पुस्तकालय अधिनियम मद्रास (अब तमिलनाडु) में 1948 में पारित हुआ था। वर्तमान में भारत के 19 राज्यों में पुस्तकालय अधिनियम लागू हैं।', 'The Madras Public Library Act was the first library legislation passed in independent India in 1948. Currently, 19 states in India have enacted public library acts.', 'medium', NULL, 'RSMSSB / Bihar School Lib')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_lis_4', 'lis_foundations', 'राजा राममोहन राय पुस्तकालय प्रतिष्ठान (RRRLF) की स्थापना किस वर्ष हुई थी और इसका मुख्यालय कहाँ है?', 'In which year was the Raja Rammohun Roy Library Foundation (RRRLF) established, and where is its headquarter?', '1972, कोलकाता', '1972, Kolkata', '1954, नई दिल्ली', '1954, New Delhi', '1982, पटना', '1982, Patna', '1965, मुंबई', '1965, Mumbai', 'A', 'RRRLF की स्थापना मई 1972 में राजा राममोहन राय की 200वीं जयंती के अवसर पर संस्कृति मंत्रालय, भारत सरकार द्वारा कोलकाता में की गई थी। यह भारत में सार्वजनिक पुस्तकालयों के विकास हेतु सर्वोच्च संस्था है।', 'RRRLF was established in May 1972 in Kolkata by the Ministry of Culture on the bicentenary of Raja Rammohun Roy. It promotes public library development across India.', 'medium', NULL, 'BPSC / KVS')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_lis_5', 'lis_foundations', 'भारतीय पुस्तकालय संघ (ILA - Indian Library Association) की स्थापना किस वर्ष हुई थी?', 'When was the Indian Library Association (ILA) founded?', '1920', '1920', '1933', '1933', '1945', '1945', '1951', '1951', 'B', 'ILA की स्थापना 13 सितंबर 1933 को कलकत्ता (कोलकाता) में ऑल इंडिया लाइब्रेरी कॉन्फ्रेंस के दौरान हुई थी। डॉ. एम.ओ. थॉमस इसके प्रथम अध्यक्ष और के.एम. असदुल्लाह प्रथम सचिव थे।', 'ILA was founded on September 13, 1933, during the All India Library Conference in Calcutta. Dr. M.O. Thomas was the first President and K.M. Asadullah was the first Secretary.', 'medium', NULL, 'DSSSB / UGC NET')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_cat_1', 'classification_cataloguing', 'डेवी दशमलव वर्गीकरण (DDC) का प्रथम संस्करण किस वर्ष प्रकाशित हुआ था?', 'In which year was the first edition of the Dewey Decimal Classification (DDC) published?', '1876', '1876', '1885', '1885', '1891', '1891', '1900', '1900', 'A', 'मेलविल डेवी (Melvil Dewey) ने 1876 में DDC का प्रथम संस्करण मात्र 44 पृष्ठों में गुमनाम रूप से प्रकाशित किया था। इसका शीर्षक "A Classification and Subject Index for Cataloguing and Arranging the Books and Pamphlets of a Library" था।', 'Melvil Dewey published the 1st edition of DDC anonymously in 1876 with only 44 pages. It revolutionized classification through decimal notation.', 'easy', NULL, 'Bihar Librarian / KVS')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_cat_2', 'classification_cataloguing', 'कोलन वर्गीकरण (Colon Classification - CC) में मूलभूत श्रेणियों (PMEST) में "M" का क्या अर्थ है?', 'In Colon Classification (CC), what does "M" stand for in the fundamental categories (PMEST)?', 'Method (विधि)', 'Method', 'Matter (पदार्थ)', 'Matter', 'Management (प्रबंधन)', 'Management', 'Mechanism (यांत्रिकी)', 'Mechanism', 'B', 'रंगनाथन ने ज्ञान को 5 मूलभूत श्रेणियों (PMEST) में विभाजित किया: P=Personality (व्यक्तित्व, योजक चिह्न ,), M=Matter (पदार्थ, योजक चिह्न ;), E=Energy (ऊर्जा, योजक चिह्न :), S=Space (स्थान, योजक चिह्न .), T=Time (काल, योजक चिह्न '')।', 'Ranganathan classified all attributes into PMEST: P=Personality (,), M=Matter (;), E=Energy (:), S=Space (.), T=Time (''). M stands for Matter.', 'medium', NULL, 'BSLET / UGC NET')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_cat_3', 'classification_cataloguing', 'AACR-2 (Anglo-American Cataloguing Rules, 2nd ed.) किस वर्ष प्रकाशित हुआ था?', 'In which year was AACR-2 published?', '1967', '1967', '1978', '1978', '1988', '1988', '1998', '1998', 'B', 'AACR-1 1967 में तथा AACR-2 1978 में प्रकाशित हुआ। इसका संपादन माइकल गोरमैन (Michael Gorman) और पॉल डब्ल्यू. विंकलर ने किया था। 1988 में इसका संशोधित संस्करण (AACR-2R) आया।', 'AACR-1 was published in 1967 and AACR-2 in 1978, edited by Michael Gorman and Paul W. Winkler. AACR-2 Revised came in 1988.', 'medium', NULL, 'NVS / Bihar Librarian')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_cat_4', 'classification_cataloguing', 'DDC के 19वें संस्करण (19th Edition) में कुल कितने खंड (Volumes) हैं?', 'How many volumes are there in the 19th edition of DDC?', '2 खंड', '2 Volumes', '3 खंड', '3 Volumes', '4 खंड', '4 Volumes', '5 खंड', '5 Volumes', 'B', 'DDC 19वां संस्करण (1979) 3 खंडों में प्रकाशित हुआ: खंड 1 - Introduction/Tables, खंड 2 - Schedules, खंड 3 - Relative Index। (नोट: 20वें, 21वें, 22वें व 23वें संस्करण में 4 खंड हैं)।', 'DDC 19th edition (1979) was published in 3 volumes: Vol 1 Tables, Vol 2 Schedules, Vol 3 Relative Index. (20th-23rd editions have 4 volumes).', 'hard', NULL, 'RSMSSB / BPSC')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_cat_5', 'classification_cataloguing', 'अंतर्राष्ट्रीय मानक पुस्तक संख्या (ISBN) 1 जनवरी 2007 से कितने अंकों की हो गई है?', 'Since January 1, 2007, how many digits does an ISBN (International Standard Book Number) consist of?', '10 अंक', '10 digits', '12 अंक', '12 digits', '13 अंक', '13 digits', '15 अंक', '15 digits', 'C', '1 जनवरी 2007 से ISBN 10 अंकों से बढ़कर 13 अंकों का हो गया है। इसमें 5 भाग होते हैं: GS1 उपसर्ग (978 या 979), देश/भाषा पहचानकर्ता, प्रकाशक कोड, शीर्षक पहचानकर्ता, और चेक अंक।', 'Since Jan 1, 2007, ISBN has 13 digits across 5 elements: GS1 prefix (978/979), Registration group, Registrant, Publication, and Check digit.', 'easy', NULL, 'BSEB LET / KVS')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_ref_1', 'reference_sources', 'सूचना के प्राथमिक स्रोत (Primary Sources) के अंतर्गत क्या आता है?', 'Which of the following is considered a Primary Source of information?', 'शोध पत्रिका (Research Periodical/Article)', 'Research Periodical / Article', 'पाठ्यपुस्तक (Textbook)', 'Textbook', 'विश्वकोश (Encyclopedia)', 'Encyclopedia', 'ग्रंथसूची (Bibliography)', 'Bibliography', 'A', 'शोध पत्रिकाएँ, शोध प्रबंध (Theses), पेटेंट, मानक और सम्मेलन कार्यवाही प्राथमिक स्रोत हैं। पाठ्यपुस्तक और विश्वकोश द्वितीयक स्रोत हैं, जबकि ग्रंथसूची तृतीयक स्रोत है।', 'Research periodicals, theses, patents, conference papers, and standards contain original findings and are primary sources. Encyclopedias and textbooks are secondary.', 'easy', NULL, 'DSSSB / BSLET')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_ref_2', 'reference_sources', 'SDI (Selective Dissemination of Information - चयनात्मक सूचना प्रसार) की अवधारणा का विकास किसने किया था?', 'Who developed the concept of Selective Dissemination of Information (SDI)?', 'एच. पी. लुहान (H. P. Luhn) - 1958', 'H. P. Luhn - 1958', 'एस. आर. रंगनाथन', 'S. R. Ranganathan', 'डेरेक ऑस्टिन (Derek Austin)', 'Derek Austin', 'यूजीन गारफ़ील्ड (Eugene Garfield)', 'Eugene Garfield', 'A', 'SDI सेवा की अवधारणा आईबीएम (IBM) के वैज्ञानिक हैंस पीटर लुहान (H.P. Luhn) द्वारा 1958 में दी गई थी। इसमें उपयोगकर्ता प्रोफ़ाइल (User Profile) और दस्तावेज़ प्रोफ़ाइल (Document Profile) का मिलान किया जाता है।', 'Hans Peter Luhn of IBM developed the concept of SDI in 1958. It matches user interest profiles with incoming document profiles to deliver targeted alerts.', 'medium', NULL, 'KVS / BPSC')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_ref_3', 'reference_sources', '"इनसाइक्लोपीडिया ब्रिटैनिका" (Encyclopaedia Britannica) का प्रथम संस्करण किस वर्ष प्रकाशित हुआ था?', 'In which year was the first edition of Encyclopaedia Britannica published?', '1768 - 1771', '1768 - 1771', '1801 - 1805', '1801 - 1805', '1850', '1850', '1911', '1911', 'A', 'इनसाइक्लोपीडिया ब्रिटैनिका का प्रथम संस्करण 1768 से 1771 के मध्य एडिनबर्ग (स्कॉटलैंड) से 3 खंडों में प्रकाशित हुआ था। 2012 के बाद इसका मुद्रित संस्करण बंद कर इसे पूर्णतः डिजिटल कर दिया गया।', 'Encyclopaedia Britannica 1st edition was published between 1768 and 1771 in Edinburgh, Scotland in 3 volumes. The print edition ceased in 2012 in favor of digital.', 'medium', NULL, 'UGC NET / Bihar School')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_ict_1', 'automation_ict', '"कोहा" (Koha) क्या है?', 'What is "Koha" in library science?', 'एक ओपन-सोर्स इंटीग्रेटेड लाइब्रेरी मैनेजमेंट सिस्टम (ILS)', 'An Open-Source Integrated Library Management System (ILS)', 'एक डिजिटल लाइब्रेरी रिपॉजिटरी सॉफ्टवेयर', 'A Digital Library Repository Software', 'एक व्यावसायिक ई-बुक रीडर', 'A Commercial E-book Reader', 'पुस्तकालय सांख्यिकी डेटाबेस', 'A Library Statistics Database', 'A', 'कोहा दुनिया का पहला ओपन-सोर्स एकीकृत पुस्तकालय प्रबंधन प्रणाली (ILS) है, जिसे 1999 में न्यूजीलैंड के कातिपो कम्युनिकेशंस द्वारा होरोव्हेनुआ लाइब्रेरी ट्रस्ट के लिए विकसित किया गया था।', 'Koha is the worlds first open-source Integrated Library System (ILS), developed in 1999 in New Zealand by Katipo Communications for the Horowhenua Library Trust.', 'easy', NULL, 'Bihar School Lib / DSSSB')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_ict_2', 'automation_ict', 'SOUL (Software for University Libraries) सॉफ्टवेयर किसके द्वारा विकसित किया गया है?', 'SOUL software was developed by which organization in India?', 'INFLIBNET (सूचना एवं पुस्तकालय नेटवर्क केंद्र)', 'INFLIBNET Centre', 'DELNET (विकासशील पुस्तकालय नेटवर्क)', 'DELNET', 'NISCAIR / CSIR', 'NISCAIR / CSIR', 'NIC (राष्ट्रीय सूचना विज्ञान केंद्र)', 'NIC', 'A', 'SOUL सॉफ्टवेयर INFLIBNET केंद्र (अहमदाबाद/गांधीनगर) द्वारा विशेष रूप से भारतीय विश्वविद्यालयों एवं महाविद्यालय पुस्तकालयों के स्वचालन हेतु तैयार किया गया है। इसका नवीनतम संस्करण SOUL 3.0 है।', 'SOUL was developed by the INFLIBNET Centre (Gandhinagar) for automating university and college libraries in India. The current version is SOUL 3.0.', 'easy', NULL, 'BPSC / KVS')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_ict_3', 'automation_ict', 'संस्थागत रिपॉजिटरी (Institutional Repository) और डिजिटल लाइब्रेरी बनाने हेतु सर्वाधिक प्रयुक्त ओपन सोर्स सॉफ्टवेयर कौन सा है?', 'Which open-source software is widely used to create Institutional Repositories and Digital Libraries?', 'DSpace', 'DSpace', 'Koha', 'Koha', 'SOUL', 'SOUL', 'LibSys', 'LibSys', 'A', 'DSpace और EPrints डिजिटल रिपॉजिटरी के प्रमुख सॉफ्टवेयर हैं। DSpace को एमआईटी (MIT) और एचपी लैब्स (HP Labs) द्वारा 2002 में विकसित किया गया था।', 'DSpace is the most popular open-source software for institutional repositories, originally created in 2002 by MIT Libraries and Hewlett-Packard (HP).', 'medium', NULL, 'DSSSB / UGC NET')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_ict_4', 'automation_ict', 'RFID (Radio Frequency Identification) का पुस्तकालयों में मुख्य उपयोग क्या है?', 'What is the primary application of RFID technology in modern libraries?', 'पुस्तकों के परिसंचरण (Issue/Return) एवं सुरक्षा प्रबंधन में', 'Automated book circulation (Issue/Return) & anti-theft security', 'किताबों की छपाई के लिए', 'For printing books', 'इंटरनेट की गति बढ़ाने के लिए', 'For boosting Wi-Fi speeds', 'पुस्तकालय बजट बनाने में', 'For calculating library budget', 'A', 'RFID तकनीक रेडियो तरंगों के माध्यम से बिना स्पर्श किए एक साथ कई किताबों को इश्यू/रिटर्न (सेल्फ-चेकआउट कियोस्क), स्टॉक वेरिफिकेशन तथा चोरी से सुरक्षा (गेट सेंसर) में सक्षम बनाती है।', 'RFID uses radio waves for contactless multi-item check-in/out, shelf inventory, and anti-theft gates at library exits.', 'easy', NULL, 'Bihar Librarian / NVS')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_mgmt_1', 'management', 'ब्राउने और नेवार्क प्रणाली (Browne & Newark Charging Systems) पुस्तकालय के किस विभाग से संबंधित हैं?', 'The Browne and Newark charging systems are associated with which library department?', 'परिसंचरण विभाग (Circulation / Issue-Return)', 'Circulation Department', 'अधिग्रहण विभाग (Acquisition)', 'Acquisition Department', 'संदर्भ विभाग (Reference)', 'Reference Department', 'तकनीकी विभाग (Cataloguing)', 'Technical Department', 'A', 'नीना ई. ब्राउने द्वारा 1895 में ब्राउने चार्जिंग प्रणाली तथा फ्रैंक पी. हिल द्वारा 1900 में नेवार्क प्रणाली का आविष्कार पुस्तकों के निर्गम एवं आगम (Issue-Return) के लिए किया गया था।', 'The Browne system (Nina E. Browne, 1895) and Newark system (Frank P. Hill, 1900) are circulation/lending transaction systems for tracking borrowed books.', 'medium', NULL, 'KVS / Bihar School Lib')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_mgmt_2', 'management', 'पुस्तकालय बजट की किस विधि में पिछले वर्ष के व्यय को आधार न मानकर प्रत्येक वर्ष नए सिरे से शून्य से शुरुआत की जाती है?', 'Which library budgeting method starts from scratch each year without using previous years expenditure as a base?', 'शून्य आधारित बजट (Zero-Based Budgeting - ZBB)', 'Zero-Based Budgeting (ZBB)', 'ऐतिहासिक बजट (Historical Budget)', 'Historical Budget', 'प्रदर्शन बजट (Performance Budget)', 'Performance Budget', 'सूत्र बजट (Formula Budget)', 'Formula Budget', 'A', 'शून्य आधारित बजट (ZBB) का विकास पीटर ए. पायर (Peter A. Phyrr) ने 1970 में किया था। इसमें प्रत्येक व्यय को हर वर्ष नए सिरे से औचित्य साबित करना पड़ता है।', 'Zero-Based Budgeting (ZBB), originated by Peter A. Phyrr in 1970, requires every department to justify each rupee of expenditure afresh from zero base.', 'medium', NULL, 'RSMSSB / BPSC')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_bihar_1', 'bihar_gk', 'प्राचीन नालंदा विश्वविद्यालय के पुस्तकालय का क्या नाम था, जिसमें तीन विशाल भवन - रत्नसागर, रत्नोदधि एवं रत्नरंजक शामिल थे?', 'What was the name of the ancient Nalanda University library which comprised three grand buildings - Ratnasagara, Ratnodadhi, and Ratnaranjaka?', 'धर्मगंज (Dharmaganja)', 'Dharmaganja', 'ज्ञानकोश', 'Gyaankosh', 'विद्यासागर', 'Vidyasagar', 'भारती भवन', 'Bharati Bhavan', 'A', 'प्राचीन नालंदा विश्वविद्यालय के भव्य पुस्तकालय परिसर को "धर्मगंज" (धर्म का पर्वत) कहा जाता था। इसमें नौ मंजिला "रत्नोदधि" मुख्य भवन था। 1193 में बख्तियार खिलजी ने इसे नष्ट कर दिया था।', 'The great library complex of ancient Nalanda University was called "Dharmaganja" (Mountain of Truth), housing Ratnasagara, Ratnodadhi (9-storey building), and Ratnaranjaka.', 'easy', NULL, 'Bihar Special / BPSC')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_bihar_2', 'bihar_gk', 'पटना में स्थित प्रसिद्ध "खुदा बख्श ओरिएंटल पब्लिक लाइब्रेरी" को राष्ट्रीय महत्व का संस्थान किस वर्ष घोषित किया गया था?', 'In which year was the famous Khuda Bakhsh Oriental Public Library in Patna declared an Institution of National Importance by an Act of Parliament?', '1969', '1969', '1891', '1891', '1947', '1947', '1985', '1985', 'A', 'खुदा बख्श ओरिएंटल पब्लिक लाइब्रेरी को 1891 में आम जनता के लिए खोला गया था। संसद के अधिनियम 1969 द्वारा इसे राष्ट्रीय महत्व का संस्थान (Institution of National Importance) घोषित किया गया।', 'Opened to the public in 1891 by Khan Bahadur Khuda Bakhsh, it was recognized as an Institution of National Importance by an Act of Parliament in 1969.', 'medium', NULL, 'BPSC / Bihar Librarian')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_bihar_3', 'bihar_gk', 'बिहार राज्य में "बिहार राज्य पुस्तकालय अधिनियम" (Bihar State Public Library Act) किस वर्ष पारित किया गया था?', 'In which year was the Bihar State Public Library Act enacted?', '2008', '2008', '1989', '1989', '2015', '2015', '2001', '2001', 'A', 'बिहार सरकार द्वारा "बिहार राज्य पुस्तकालय एवं सूचना केंद्र अधिनियम" वर्ष 2008 में पारित किया गया था।', 'The Bihar State Public Library and Information Centre Act was enacted in the year 2008.', 'medium', NULL, 'Bihar Librarian Special')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_bihar_4', 'bihar_gk', 'बिहार में 1857 के प्रथम स्वतंत्रता संग्राम का नेतृत्व किसने किया था?', 'Who led the First War of Indian Independence of 1857 in Bihar?', 'बाबू वीर कुंवर सिंह', 'Babu Veer Kunwar Singh', 'पीर अली खान', 'Pir Ali Khan', 'अमर सिंह', 'Amar Singh', 'उपरोक्त सभी (विभिन्न चरणों में)', 'All of the above (in respective phases)', 'D', 'जगदीशपुर (आरा) के 80 वर्षीय जमींदार बाबू वीर कुंवर सिंह ने बिहार में 1857 की क्रांति का मुख्य नेतृत्व किया। पटना में पुस्तक विक्रेता पीर अली ने जुलाई 1857 में विद्रोह का बिगुल फूंका था, और कुंवर सिंह के भाई अमर सिंह ने बाद में मोर्चा संभाला।', 'Babu Veer Kunwar Singh was the supreme commander of the 1857 revolt in Bihar from Jagdishpur. Pir Ali led the revolt in Patna, and Kunwar Singhs brother Amar Singh continued the struggle.', 'easy', NULL, 'BPSC General Studies')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_teach_1', 'teaching_aptitude', 'एक विद्यालय पुस्तकालयाध्यक्ष का विद्यार्थियों में पठन संस्कृति (Reading Culture) विकसित करने हेतु सबसे प्रभावी कदम क्या है?', 'What is the most effective step a school librarian can take to develop reading culture among students?', 'विद्यार्थियों की रुचि अनुसार पुस्तक क्लब, कहानी वाचन एवं बुक फेयर का आयोजन करना', 'Organizing book clubs, storytelling sessions & book fairs based on student interests', 'किताबें न पढ़ने पर दंड देना', 'Punishing students who do not borrow books', 'अलमारियों में किताबें बंद करके ताला लगाना', 'Keeping books locked in glass cupboards', 'केवल पाठ्यक्रम की पाठ्यपुस्तकें रखना', 'Only stocking textbook curriculum materials', 'A', 'राष्ट्रीय शिक्षा नीति (NEP 2020) के अनुसार विद्यालय पुस्तकालयों को जीवंत शिक्षण केंद्र बनाना चाहिए। बुक क्लब, पठन प्रतियोगिताएं और ओपन एक्सेस प्रणाली छात्रों को आकर्षित करती है।', 'As highlighted in NEP 2020, school libraries should foster joyful learning through student book clubs, literary activities, and open stack browsing.', 'easy', NULL, 'BSLET / STET')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_teach_2', 'teaching_aptitude', 'सूचना साक्षरता (Information Literacy) से क्या तात्पर्य है?', 'What is meant by "Information Literacy"?', 'सूचना की आवश्यकता को पहचानना, उसे खोजना, मूल्यांकन करना और प्रभावी ढंग से उपयोग करना', 'The ability to recognize when information is needed, locate, evaluate, and use it effectively', 'केवल कंप्यूटर चालू और बंद करना सीखना', 'Learning how to power on and off a PC', 'पुस्तकालय की सभी किताबों को रटना', 'Memorizing the catalogue of the library', 'बिना जांचे इंटरनेट सामग्री पर विश्वास करना', 'Believing all internet content uncritically', 'A', 'पॉल ज़ुरकोव्स्की (Paul Zurkowski) ने 1974 में "सूचना साक्षरता" शब्द गढ़ा था। यह 21वीं सदी के विद्यार्थियों और शिक्षकों के लिए एक अनिवार्य योग्यता है।', 'Paul Zurkowski coined "Information Literacy" in 1974. It refers to the skill of identifying information needs, finding reliable data, and evaluating sources critically.', 'easy', NULL, 'BSEB LET / KVS')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en;

INSERT INTO public.mock_tests (id, title_hi, title_en, subtitle_hi, subtitle_en, duration_minutes, total_marks, pass_marks, question_count, question_ids, test_type, badge_hi, badge_en, display_order)
VALUES ('test_full_1', 'बिहार विद्यालय पुस्तकालयाध्यक्ष फुल मॉक टेस्ट - 01', 'Bihar School Librarian Full Mock Test - 01', 'नवीनतम BPSC एवं BSEB पात्रता परीक्षा पैटर्न पर आधारित', 'Based on Latest BPSC & BSEB Eligibility Exam Pattern', 60, 100, 45, 25, '["q_lis_1","q_lis_2","q_lis_3","q_lis_4","q_lis_5","q_cat_1","q_cat_2","q_cat_3","q_cat_4","q_cat_5","q_ref_1","q_ref_2","q_ref_3","q_ict_1","q_ict_2","q_ict_3","q_ict_4","q_mgmt_1","q_mgmt_2","q_bihar_1","q_bihar_2","q_bihar_3","q_bihar_4","q_teach_1","q_teach_2"]'::jsonb, 'full_length', 'सर्वाधिक लोकप्रिय', 'Most Popular', 1)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  subtitle_hi = EXCLUDED.subtitle_hi,
  subtitle_en = EXCLUDED.subtitle_en;

INSERT INTO public.mock_tests (id, title_hi, title_en, subtitle_hi, subtitle_en, duration_minutes, total_marks, pass_marks, question_count, question_ids, test_type, badge_hi, badge_en, display_order)
VALUES ('test_sec_foundations', 'यूनिट 1: पुस्तकालय विज्ञान के आधार एवं 5 नियम', 'Unit 1: Foundations of LIS & 5 Laws', 'रंगनाथन के नियम, पुस्तकालय अधिनियम एवं संघ (ILA, RRRLF)', 'Ranganathans Laws, Library Legislation & Associations', 15, 25, 12, 5, '["q_lis_1","q_lis_2","q_lis_3","q_lis_4","q_lis_5"]'::jsonb, 'sectional', 'कोर सिलेबस', 'Core Syllabus', 2)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  subtitle_hi = EXCLUDED.subtitle_hi,
  subtitle_en = EXCLUDED.subtitle_en;

INSERT INTO public.mock_tests (id, title_hi, title_en, subtitle_hi, subtitle_en, duration_minutes, total_marks, pass_marks, question_count, question_ids, test_type, badge_hi, badge_en, display_order)
VALUES ('test_sec_classification', 'यूनिट 2: वर्गीकरण एवं सूचीकरण (DDC, CC, AACR-2)', 'Unit 2: Classification & Cataloguing (DDC, CC, AACR-2)', 'डेवी दशमलव, कोलन, ISBN एवं कैटलॉगिंग कोड', 'Dewey Decimal, Colon, ISBN & Cataloguing Codes', 15, 25, 12, 5, '["q_cat_1","q_cat_2","q_cat_3","q_cat_4","q_cat_5"]'::jsonb, 'sectional', 'अति महत्वपूर्ण', 'High Yield', 3)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  subtitle_hi = EXCLUDED.subtitle_hi,
  subtitle_en = EXCLUDED.subtitle_en;

INSERT INTO public.mock_tests (id, title_hi, title_en, subtitle_hi, subtitle_en, duration_minutes, total_marks, pass_marks, question_count, question_ids, test_type, badge_hi, badge_en, display_order)
VALUES ('test_sec_automation', 'यूनिट 3: पुस्तकालय स्वचालन, कोहा एवं ICT', 'Unit 3: Library Automation, Koha & ICT', 'Koha, SOUL 3.0, DSpace, RFID एवं डिजिटल लाइब्रेरी', 'Koha, SOUL 3.0, DSpace, RFID & Digital Libraries', 15, 20, 10, 4, '["q_ict_1","q_ict_2","q_ict_3","q_ict_4"]'::jsonb, 'sectional', NULL, NULL, 4)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  subtitle_hi = EXCLUDED.subtitle_hi,
  subtitle_en = EXCLUDED.subtitle_en;

INSERT INTO public.mock_tests (id, title_hi, title_en, subtitle_hi, subtitle_en, duration_minutes, total_marks, pass_marks, question_count, question_ids, test_type, badge_hi, badge_en, display_order)
VALUES ('test_sec_bihar', 'यूनिट 4: बिहार विशेष सामान्य ज्ञान एवं धरोहर', 'Unit 4: Bihar Special GK & Heritage', 'नालंदा-विक्रमशिला, खुदा बख्श लाइब्रेरी, इतिहास एवं 1857 क्रांति', 'Nalanda-Vikramshila, Khuda Bakhsh, History & 1857 Revolt', 15, 20, 10, 4, '["q_bihar_1","q_bihar_2","q_bihar_3","q_bihar_4"]'::jsonb, 'sectional', 'बिहार स्पेशल', 'Bihar Special', 5)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  subtitle_hi = EXCLUDED.subtitle_hi,
  subtitle_en = EXCLUDED.subtitle_en;

INSERT INTO public.mock_tests (id, title_hi, title_en, subtitle_hi, subtitle_en, duration_minutes, total_marks, pass_marks, question_count, question_ids, test_type, badge_hi, badge_en, display_order)
VALUES ('test_sec_teaching', 'यूनिट 5: शिक्षण कला एवं सूचना साक्षरता', 'Unit 5: Art of Teaching & Information Literacy', 'NEP 2020, पठन संस्कृति, बाल मनोविज्ञान एवं विद्यालय पुस्तकालय', 'NEP 2020, Reading Culture, Child Psychology & School Lib', 10, 15, 8, 2, '["q_teach_1","q_teach_2"]'::jsonb, 'sectional', NULL, NULL, 6)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  subtitle_hi = EXCLUDED.subtitle_hi,
  subtitle_en = EXCLUDED.subtitle_en;

