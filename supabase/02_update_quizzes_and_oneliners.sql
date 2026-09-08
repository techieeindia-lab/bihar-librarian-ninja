-- ====================================================================
-- MIGRATION: ADD QUIZZES & ONE_LINERS AND UPDATE ALL STUDY CONTENT
-- Paste into Supabase SQL Editor:
-- https://supabase.com/dashboard/project/croywgkjthofkeoqqesb/sql/new
-- ====================================================================

-- 1. Create quizzes table
CREATE TABLE IF NOT EXISTS public.quizzes (
  id TEXT PRIMARY KEY,
  title_hi TEXT NOT NULL,
  title_en TEXT NOT NULL,
  subtitle_hi TEXT NOT NULL,
  subtitle_en TEXT NOT NULL,
  category TEXT NOT NULL,
  question_count INTEGER NOT NULL,
  question_ids JSONB DEFAULT '[]'::jsonb,
  duration_minutes INTEGER DEFAULT 5,
  reward_xp INTEGER NOT NULL DEFAULT 50,
  badge_hi TEXT,
  badge_en TEXT,
  difficulty TEXT DEFAULT 'medium',
  color TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create one_liners table
CREATE TABLE IF NOT EXISTS public.one_liners (
  id TEXT PRIMARY KEY,
  category_hi TEXT NOT NULL,
  category_en TEXT NOT NULL,
  category_key TEXT NOT NULL,
  topic_hi TEXT NOT NULL,
  topic_en TEXT NOT NULL,
  statement_hi TEXT NOT NULL,
  statement_en TEXT NOT NULL,
  tag TEXT,
  is_important BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Grants & Privileges
GRANT ALL ON public.quizzes TO postgres, anon, authenticated, service_role;
GRANT ALL ON public.one_liners TO postgres, anon, authenticated, service_role;

-- 4. Enable RLS
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.one_liners ENABLE ROW LEVEL SECURITY;

-- 5. Public Access Policies
DROP POLICY IF EXISTS "Allow public read on quizzes" ON public.quizzes;
CREATE POLICY "Allow public read on quizzes" ON public.quizzes FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert on quizzes" ON public.quizzes;
CREATE POLICY "Allow public insert on quizzes" ON public.quizzes FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on one_liners" ON public.one_liners;
CREATE POLICY "Allow public read on one_liners" ON public.one_liners FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert on one_liners" ON public.one_liners;
CREATE POLICY "Allow public insert on one_liners" ON public.one_liners FOR ALL USING (true) WITH CHECK (true);

-- 6. Insert All Seed Rows
INSERT INTO public.study_units (id, unit_number, title_hi, title_en, short_desc_hi, short_desc_en, icon_name, display_order)
VALUES ('unit_1', 1, 'यूनिट 1: पुस्तकालय विज्ञान के आधार एवं रंगनाथन के 5 नियम', 'Unit 1: Foundations of Library Science & 5 Laws', 'पुस्तकालय विज्ञान के जनक, 5 सूत्र, पुस्तकालय अधिनियम, ILA, IFLA एवं RRRLF', 'Father of LIS, 5 Laws, Library Legislation, ILA, IFLA & RRRLF', 'book', 1)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  short_desc_hi = EXCLUDED.short_desc_hi,
  short_desc_en = EXCLUDED.short_desc_en,
  icon_name = EXCLUDED.icon_name,
  display_order = EXCLUDED.display_order;

INSERT INTO public.study_topics (id, unit_id, topic_order, title_hi, title_en, content_hi, content_en, key_points)
VALUES ('t_laws', 'unit_1', 1, 'डॉ. एस.आर. रंगनाथन एवं पुस्तकालय विज्ञान के पांच सूत्र', 'Dr. S.R. Ranganathan & The Five Laws of Library Science', 'डॉ. शियाली रामामृत रंगनाथन (12 अगस्त 1892 - 27 सितंबर 1972) को भारत में "पुस्तकालय विज्ञान का जनक" (Father of Library Science in India) कहा जाता है। 12 अगस्त को प्रतिवर्ष भारत में "राष्ट्रीय पुस्तकालय दिवस" (National Librarians Day) मनाया जाता है।

1. प्रथम सूत्र: पुस्तकें उपयोग के लिए हैं (Books are for use)
- निहितार्थ: पुस्तकालय का स्थान शहर के केंद्र में होना चाहिए। पुस्तकालय खुलने का समय सुविधाजनक हो। मुक्त प्रवेश प्रणाली (Open Access System) को अपनाना।

2. द्वितीय सूत्र: प्रत्येक पाठक को उसकी पुस्तक मिले (Every reader his/her book)
- निहितार्थ: पुस्तकालय सभी वर्गों (दृष्टिबाधित, ग्रामीण, बाल, वृद्ध) के लिए सुलभ हो। राज्य का कर्तव्य है कि वह अनिवार्य पुस्तकालय कानून बनाए।

3. तृतीय सूत्र: प्रत्येक पुस्तक को उसका पाठक मिले (Every book its reader)
- निहितार्थ: खुली प्रवेश प्रणाली, पुस्तकों का आकर्षक प्रदर्शन (Display of new arrivals), सुव्यवस्थित सूचीकरण (Classified Catalogue) एवं विषय विश्लेषणात्मक प्रविष्टियां।

4. चतुर्थ सूत्र: पाठक का समय बचाएं (Save the time of the reader)
- निहितार्थ: त्वरित निर्गम-आगम प्रणाली (Browne/Newark/RFID), कुशल संदर्भ सेवा (Reference Service), पुस्तकालय स्वचालन एवं कंप्यूटरीकृत OPAC।

5. पंचम सूत्र: पुस्तकालय एक वर्धनशील संस्था है (Library is a growing organism)
- निहितार्थ: संग्रह, पाठक एवं भवन में निरंतर जैविक वृद्धि। अनुपयोगी एवं जीर्ण-शीर्ण पुस्तकों की छंटाई (Weeding Out) इसी नियम के अंतर्गत आती है।', 'Dr. Shiyali Ramamrita Ranganathan (12 August 1892 - 27 September 1972) is universally acknowledged as the Father of Library Science in India. August 12 is celebrated annually as National Librarians Day.

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
VALUES ('unit_2', 2, 'यूनिट 2: वर्गीकरण एवं सूचीकरण (DDC, CC, AACR-2, ISBN)', 'Unit 2: Classification & Cataloguing (DDC, CC, AACR-2, ISBN)', 'डेवी दशमलव वर्गीकरण, कोलन वर्गीकरण, PMEST, सूचीकरण कोड, ISBN एवं MARC', 'Dewey Decimal Classification, Colon Classification, PMEST, Cataloguing, ISBN & MARC', 'folder', 2)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  short_desc_hi = EXCLUDED.short_desc_hi,
  short_desc_en = EXCLUDED.short_desc_en,
  icon_name = EXCLUDED.icon_name,
  display_order = EXCLUDED.display_order;

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
- 19वां संस्करण (1979): 3 खंडों में (सर्वाधिक परीक्षाओं में पूछा जाता है - Tables, Schedules, Index)
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
  icon_name = EXCLUDED.icon_name,
  display_order = EXCLUDED.display_order;

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
VALUES ('unit_4', 4, 'यूनिट 4: बिहार विशेष सामान्य ज्ञान एवं पुस्तकालय धरोहर', 'Unit 4: Bihar Special GK & Library Heritage', 'प्राचीन नालंदा "धर्मगंज", खुदा बख्श लाइब्रेरी, बिहार पुस्तकालय अधिनियम 2008, 1857 क्रांति', 'Ancient Nalanda Dharmaganja, Khuda Bakhsh Library, Bihar Library Act 2008, 1857 Revolt', 'library', 4)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  short_desc_hi = EXCLUDED.short_desc_hi,
  short_desc_en = EXCLUDED.short_desc_en,
  icon_name = EXCLUDED.icon_name,
  display_order = EXCLUDED.display_order;

INSERT INTO public.study_topics (id, unit_id, topic_order, title_hi, title_en, content_hi, content_en, key_points)
VALUES ('t_bihar_lib', 'unit_4', 1, 'बिहार के ऐतिहासिक पुस्तकालय एवं धर्मगंज (नालंदा)', 'Historic Libraries of Bihar & Nalanda Dharmaganja', '1. प्राचीन नालंदा विश्वविद्यालय पुस्तकालय "धर्मगंज":
- नालंदा विश्वविद्यालय (5वीं शताब्दी गुप्त काल में स्थापित) का पुस्तकालय संपूर्ण विश्व में विख्यात था।
- इस पुस्तकालय परिसर को "धर्मगंज" (सत्य का पर्वत) कहा जाता था।
- इसमें तीन विशाल बहुमंजिला भवन थे:
  1. रत्नसागर (Ratnasagara)
  2. रत्नोदधि (Ratnodadhi) - नौ मंजिला मुख्य भवन
  3. रत्नरंजक (Ratnaranjaka)
- 1193 ईस्वी में आक्रांता बख्तियार खिलजी ने इसे आग के हवाले कर दिया।

2. खुदा बख्श ओरिएंटल पब्लिक लाइब्रेरी (पटना):
- स्थापना: खान बहादुर खुदा बख्श द्वारा 29 अक्टूबर 1891 को जनता के लिए खोला गया।
- गंगा तट, अशोक राजपथ, पटना में स्थित।
- इसमें अरबी, फारसी, उर्दू, तुर्की और पश्तो की दुर्लभतम पांडुलिपियां संग्रहित हैं।
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

INSERT INTO public.study_units (id, unit_number, title_hi, title_en, short_desc_hi, short_desc_en, icon_name, display_order)
VALUES ('unit_5', 5, 'यूनिट 5: सूचना स्रोत एवं संदर्भ सेवाएं (CAS, SDI)', 'Unit 5: Information Sources & Reference Services', 'प्राथमिक, द्वितीयक, तृतीयक स्रोत, सामयिक अभिज्ञता सेवा (CAS), SDI एवं संदर्भ ग्रंथ', 'Primary, Secondary, Tertiary sources, CAS, SDI & Reference Books', 'search', 5)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  short_desc_hi = EXCLUDED.short_desc_hi,
  short_desc_en = EXCLUDED.short_desc_en,
  icon_name = EXCLUDED.icon_name,
  display_order = EXCLUDED.display_order;

INSERT INTO public.study_topics (id, unit_id, topic_order, title_hi, title_en, content_hi, content_en, key_points)
VALUES ('t_sources_ref', 'unit_5', 1, 'सूचना स्रोतों का वर्गीकरण एवं संदर्भ सेवाएं (CAS व SDI)', 'Information Sources Classification & Reference Services', '1. सूचना स्रोतों का त्रिवर्गीकरण (Hanson & Denis Grogan):
- प्राथमिक स्रोत (Primary Sources): मूल विचार, मौलिक शोध परिणाम। उदाहरण: शोध पत्रिकाएं (Journals), शोध प्रबंध (Theses/Dissertations), सम्मेलन कार्यवाही (Conference Proceedings), पेटेंट (Patents), मानक (Standards)।
- द्वितीयक स्रोत (Secondary Sources): प्राथमिक स्रोतों का संकलन, विश्लेषण या सूचकांक। उदाहरण: पाठ्यपुस्तकें (Textbooks), ग्रंथसूचियां (Bibliographies), समीक्षाएं (Reviews), अनुक्रमणिकाएं (Indexes) व सार (Abstracts)।
- तृतीयक स्रोत (Tertiary Sources): प्राथमिक व द्वितीयक स्रोतों का पता लगाने वाली मार्गदर्शिकाएं। उदाहरण: निर्देशिकाएं (Directories), पंचांग (Almanacs), वर्षगांठ (Yearbooks), ग्रंथसूचियों की ग्रंथसूची।

2. संदर्भ सेवाएं (Reference Services):
- डॉ. एस.आर. रंगनाथन ने संदर्भ सेवा को "पाठक और पुस्तक के बीच व्यक्तिगत संबंध स्थापित करने वाली प्रक्रिया" कहा।
- तैयार संदर्भ सेवा (Ready Reference Service): जो उत्तर 5 से 30 मिनट में संदर्भ ग्रंथों (शब्दकोश, इनसाइक्लोपीडिया, निर्देशिका) से तुरंत दिया जाए।
- दीर्घकालीन संदर्भ सेवा (Long Range Reference Service): जिसमें कई स्रोतों, पत्रिकाओं व अनुक्रमणिकाओं की गहन खोज आवश्यक हो।

3. सामयिक अभिज्ञता सेवा (CAS) एवं चयनात्मक प्रसार (SDI):
- CAS (Current Awareness Service): उपयोगकर्ताओं को उनके क्षेत्र में नवीनतम साहित्य व शोध से लगातार सूचित रखने वाली सामान्य सेवा (जैसे नई आगमन सूची, सामयिक पत्रिकाओं की विषय सूची)।
- SDI (Selective Dissemination of Information): हैंस पीटर लूहान (H.P. Luhn, IBM) द्वारा 1958 में विकसित। इसमें व्यक्तिगत उपयोगकर्ता प्रोफाइल (User Interest Profile) को दस्तावेज प्रोफाइल से कंप्यूटर द्वारा मिलान करके विशिष्ट सूचना भेजी जाती है।', '1. Classification of Information Sources (Hanson & Denis Grogan):
- Primary Sources: First-hand original research and records. E.g., Research Journals, Theses/Dissertations, Conference Proceedings, Patents, Standards.
- Secondary Sources: Organized and compiled from primary literature. E.g., Textbooks, Bibliographies, Reviews, Indexes, Abstracting Journals.
- Tertiary Sources: Guides to primary and secondary resources. E.g., Directories, Almanacs, Yearbooks, Bibliographies of Bibliographies.

2. Reference Services:
- Dr. S.R. Ranganathan defined reference service as "personal assistance brought to each reader in helping them find the information needed."
- Ready Reference Service: Fact-finding queries answered in 5-30 minutes using reference tools like dictionaries, encyclopedias, and yearbooks.
- Long Range Reference Service: Extensive scholarly research involving deep retrospective literature search across databases.

3. CAS & SDI:
- CAS (Current Awareness Service): Broadcasts new literature to broad user groups (e.g. Current Contents, New Arrivals bulletin).
- SDI (Selective Dissemination of Information): Conceived by H.P. Luhn (IBM) in 1958. Matches personalized user interest profiles against document profiles.', '[{"hi":"SDI के जनक: एच.पी. लूहान (H.P. Luhn) - 1958","en":"SDI Pioneer: H.P. Luhn (IBM) - 1958"},{"hi":"पेटेंट एवं शोध प्रबंध: प्राथमिक स्रोत","en":"Patents & Theses: Primary Sources"},{"hi":"निर्देशिकाएं एवं ईयरबुक: तृतीयक स्रोत","en":"Directories & Yearbooks: Tertiary Sources"}]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  content_hi = EXCLUDED.content_hi,
  content_en = EXCLUDED.content_en,
  key_points = EXCLUDED.key_points;

INSERT INTO public.study_units (id, unit_number, title_hi, title_en, short_desc_hi, short_desc_en, icon_name, display_order)
VALUES ('unit_6', 6, 'यूनिट 6: पुस्तकालय प्रबंधन, परिसंचरण व बजट (ZBB, POSDCORB)', 'Unit 6: Library Management, Circulation & Budgeting', 'POSDCORB, पुस्तक चयन सिद्धांत, ब्राउन/नेवार्क प्रणाली, स्टॉक सत्यापन एवं ZBB', 'POSDCORB, Book Selection, Browne/Newark Circulation, Stock Verification & ZBB', 'briefcase', 6)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  short_desc_hi = EXCLUDED.short_desc_hi,
  short_desc_en = EXCLUDED.short_desc_en,
  icon_name = EXCLUDED.icon_name,
  display_order = EXCLUDED.display_order;

INSERT INTO public.study_topics (id, unit_id, topic_order, title_hi, title_en, content_hi, content_en, key_points)
VALUES ('t_mgmt_ops', 'unit_6', 1, 'पुस्तकालय प्रबंधन सिद्धांत, पुस्तक चयन एवं परिसंचरण प्रणालियां', 'Management Principles, Book Selection & Circulation Systems', '1. प्रबंधन के सिद्धांत:
- POSDCORB: लूथर गुलिक एवं लिंडाल उर्विक (1937) द्वारा प्रशासनिक प्रबंधन के सात प्रमुख कार्य: Planning, Organizing, Staffing, Directing, Coordinating, Reporting, Budgeting.
- हेनरी फेयोल (Henri Fayol): आधुनिक प्रशासनिक प्रबंधन के 14 सिद्धांत (कार्य विभाजन, अधिकार एवं उत्तरदायित्व, अनुशासन, आदेश की एकता, निर्देश की एकता आदि)।

2. पुस्तक चयन के शास्त्रीय सिद्धांत:
- मेलविल डेवी (1876): "The best reading for the largest number at the least cost" (न्यूनतम लागत पर अधिकतम पाठकों के लिए सर्वोत्तम पठन सामग्री)।
- एफ.के.डब्ल्यू. ड्रूरी (1930): "To provide the right book to the right reader at the right time" (उचित समय पर उचित पाठक को उचित पुस्तक प्रदान करना)।
- डॉ. एस.आर. रंगनाथन (1952): पुस्तक चयन पुस्तकालय विज्ञान के 5 सूत्रों की आवश्यकताओं को पूरा करने हेतु होना चाहिए।

3. परिसंचरण प्रणालियां (Circulation Systems):
- ब्राउन प्रणाली (Browne System): नीना ई. ब्राउन (1895, अमेरिका) द्वारा विकसित। इसमें पाठक टिकट (पॉकेट) और पुस्तक कार्ड का उपयोग होता है, कोई बही-खाता या रजिस्टर नहीं।
- नेवार्क प्रणाली (Newark System): जॉन कॉटन डाना (1900, नेवार्क, यूएसए) द्वारा विकसित। इसमें तिथि पर्ची (Date Slip) और उधारकर्ता कार्ड पर तिथि अंकित की जाती है।

4. पुस्तकालय बजट निर्माण विधियां:
- शून्य आधारित बजट (ZBB - Zero-Based Budgeting): पीटर प्यर (1970) द्वारा विकसित। इसमें हर वित्तीय वर्ष शून्य आधार से शुरू होता है और प्रत्येक मद का नए सिरे से औचित्य साबित करना अनिवार्य है।
- PPBS (Planning Programming Budgeting System): अमेरिकी रक्षा विभाग द्वारा 1960 के दशक में विकसित योजना-कार्यक्रम-बजट प्रणाली।', '1. Principles of Management:
- POSDCORB: Formulated by Luther Gulick and Lyndall Urwick in 1937 covering Planning, Organizing, Staffing, Directing, Coordinating, Reporting, Budgeting.
- Henri Fayol: Defined 14 universal principles of management (Division of work, Unity of command, Unity of direction, etc.).

2. Classic Book Selection Principles:
- Melvil Dewey (1876): "The best reading for the largest number at the least cost."
- F.K.W. Drury (1930): "To provide the right book to the right reader at the right time."
- Dr. S.R. Ranganathan (1952): Book selection rooted in the fulfillment of the Five Laws of Library Science.

3. Circulation Systems:
- Browne Issue System: Devised by Nina E. Browne in 1895 using reader pockets and book cards without manual ledger registers.
- Newark Charging System: Developed by John Cotton Dana in 1900 with reader cards and date slips.

4. Library Budgeting Techniques:
- Zero-Based Budgeting (ZBB): Pioneered by Peter Pyhrr in 1970, justifying all expenditures from scratch.
- PPBS (Planning Programming Budgeting System): Developed in the US defense sector during the 1960s.', '[{"hi":"POSDCORB सूत्र: लूथर गुलिक एवं लिंडाल उर्विक (1937)","en":"POSDCORB: Luther Gulick & Lyndall Urwick (1937)"},{"hi":"ब्राउन प्रणाली: नीना ई. ब्राउन (1895)","en":"Browne System: Nina E. Browne (1895)"},{"hi":"शून्य आधारित बजट (ZBB): पीटर प्यर (1970)","en":"Zero-Based Budgeting: Peter Pyhrr (1970)"}]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  content_hi = EXCLUDED.content_hi,
  content_en = EXCLUDED.content_en,
  key_points = EXCLUDED.key_points;

INSERT INTO public.study_units (id, unit_number, title_hi, title_en, short_desc_hi, short_desc_en, icon_name, display_order)
VALUES ('unit_7', 7, 'यूनिट 7: शिक्षण अभिरुचि, पठन संस्कृति एवं NEP 2020', 'Unit 7: Teaching Aptitude, Reading Culture & NEP 2020', 'सूचना साक्षरता (पॉल ज़ुरकोव्स्की), बाल पठन संस्कृति, NEP 2020 एवं समावेशी पुस्तकालय', 'Information Literacy (Zurkowski), Student Reading Culture, NEP 2020 & Inclusive Library', 'school', 7)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  short_desc_hi = EXCLUDED.short_desc_hi,
  short_desc_en = EXCLUDED.short_desc_en,
  icon_name = EXCLUDED.icon_name,
  display_order = EXCLUDED.display_order;

INSERT INTO public.study_topics (id, unit_id, topic_order, title_hi, title_en, content_hi, content_en, key_points)
VALUES ('t_teach_apt', 'unit_7', 1, 'विद्यालय में पठन संस्कृति, सूचना साक्षरता एवं राष्ट्रीय शिक्षा नीति', 'School Reading Culture, Information Literacy & NEP 2020', '1. विद्यालय पुस्तकालय एवं पठन संस्कृति विकास:
- राष्ट्रीय शिक्षा नीति (NEP 2020) विद्यालय पुस्तकालयों को रटने की व्यवस्था से हटाकर रचनात्मकता, आलोचनात्मक सोच और खोजपूर्ण अध्ययन का केंद्र बनाती है।
- विद्यालय लाइब्रेरियन को पुस्तक क्लब (Book Clubs), कहानी वाचन सत्र (Storytelling), और पुस्तक समीक्षा प्रतियोगिताओं के माध्यम से विद्यार्थियों को आकर्षित करना चाहिए।
- खुली शेल्फ व्यवस्था (Open Shelf Access) बाल पाठकों में पुस्तकों के प्रति स्वाभाविक आकर्षण पैदा करती है।

2. सूचना साक्षरता (Information Literacy):
- सर्वप्रथम प्रयोग: पॉल ज़ुरकोव्स्की (Paul Zurkowski) ने 1974 में "सूचना साक्षरता" शब्द दिया।
- इसका अर्थ है: जब सूचना की आवश्यकता हो उसे पहचानना, विश्वसनीय स्रोतों से खोजना, उसका समालोचनात्मक मूल्यांकन करना और नैतिक रूप से उपयोग करना।
- डिजिटल युग में फेक न्यूज़ (Fake News) से बचाव और प्रामाणिक ई-संसाधनों की पहचान हेतु छात्रों को प्रशिक्षित करना स्कूल लाइब्रेरियन का दायित्व है।

3. समावेशी शिक्षा एवं विशेष आवश्यकता वाले विद्यार्थी:
- दृष्टिबाधित विद्यार्थियों हेतु ब्रेल पुस्तकें, ऑडियो बुक्स (Talking Books) और स्क्रीन रीडर सॉफ्टवेयर (JAWS/NVDA) की व्यवस्था।
- दिव्यांग विद्यार्थियों के लिए सुगम्य पुस्तकालय भवन (Ramp, ब्रेल साइनेज, व्हीलचेयर फ्रेंडली स्टैक)।', '1. School Libraries & Nurturing Reading Culture:
- National Education Policy (NEP 2020) positions school libraries as vibrant community hubs fostering creativity, discovery, and joyful literacy.
- Librarians cultivate reading through student book clubs, literary fairs, storytelling hours, and open stack browsing.

2. Information Literacy:
- Coined by Paul Zurkowski in 1974.
- Entails recognizing when information is needed, locating reliable databases, evaluating validity, and using knowledge ethically.
- Crucial for digital safety, verifying sources against disinformation, and promoting digital citizenship.

3. Inclusive Education in Libraries:
- Accommodations for students with disabilities: Braille collections, audiobooks, NVDA/JAWS screen readers, and barrier-free wheelchair ramps.', '[{"hi":"सूचना साक्षरता शब्द के प्रवर्तक: पॉल ज़ुरकोव्स्की (1974)","en":"Information Literacy Coined by: Paul Zurkowski (1974)"},{"hi":"NEP 2020: विद्यालय पुस्तकालय को जीवंत शिक्षण केंद्र बनाना","en":"NEP 2020: School libraries as joyful learning hubs"},{"hi":"दृष्टिबाधित पाठक: ब्रेल एवं ऑडियो बुक्स (स्क्रीन रीडर)","en":"Visually impaired users: Braille & Screen Readers (NVDA)"}]'::jsonb)
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
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_2', 'संस्थापक एवं वर्ष', 'Founders & Years', 'DDC (Dewey Decimal Classification) के जनक एवं प्रथम वर्ष?', 'Founder & 1st Edition year of DDC?', 'मेलविल डेवी (Melvil Dewey) - 1876', 'Melvil Dewey - 1876', 'प्रथम संस्करण में मात्र 44 पृष्ठ थे', 'First edition had only 44 pages', 2)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_3', 'संस्थापक एवं वर्ष', 'Founders & Years', 'कोलन वर्गीकरण (Colon Classification - CC) का प्रथम संस्करण कब आया?', 'When was the 1st edition of Colon Classification published?', 'वर्ष 1933 (डॉ. एस.आर. रंगनाथन द्वारा)', 'Year 1933 (by Dr. S.R. Ranganathan)', 'प्रणाली: Analytico-Synthetic (विश्लेषणात्मक-संश्लेषणात्मक)', 'System: Analytico-Synthetic', 3)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_4', 'संस्थापक एवं वर्ष', 'Founders & Years', 'पुस्तकालय विज्ञान के 5 सूत्रों का प्रतिपादन कब और कहां हुआ?', 'When and where were the 5 Laws of Library Science formulated?', 'प्रतिपादन: 1928 (मीनाक्षी कॉलेज)
पुस्तक प्रकाशन: 1931 (MALA द्वारा)', 'Formulated: 1928 (Meenakshi College)
Published: 1931 (by MALA)', 'पुस्तक की प्रस्तावना: पी.एस. शिवस्वामी अय्यर', 'Foreword by Sir P.S. Sivaswamy Aiyer', 4)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_5', 'वर्गीकरण पद्धतियां', 'Classification Schemes', 'DDC में 000, 300, 500 एवं 900 मुख्य वर्ग क्या दर्शाते हैं?', 'What do DDC classes 000, 300, 500 & 900 represent?', '000: कंप्यूटर/सामान्य
300: समाज विज्ञान (Social Science)
500: शुद्ध विज्ञान (Pure Science)
900: इतिहास एवं भूगोल (History/Geography)', '000: Computer Science & Generalities
300: Social Sciences
500: Pure Sciences
900: History & Geography', NULL, NULL, 5)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_6', 'वर्गीकरण पद्धतियां', 'Classification Schemes', 'DDC के 19वें संस्करण (1979) में कुल कितने खंड हैं?', 'How many volumes in DDC 19th Edition (1979)?', '3 खंड (Vol 1: Tables, Vol 2: Schedules, Vol 3: Relative Index)', '3 Volumes (Tables, Schedules, Relative Index)', 'संपादक: बेंजामिन ए. कस्टर (Benjamin A. Custer)', 'Editor: Benjamin A. Custer', 6)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_7', 'वर्गीकरण पद्धतियां', 'Classification Schemes', 'कोलन वर्गीकरण में PMEST के योजक चिह्न (Connecting Symbols)?', 'Connecting Symbols for PMEST in Colon Classification?', 'P (कॉमा ,)
M (सेमीकोलन ;)
E (कोलन :)
S (डॉट .)
T (सिंगल इनवर्टेड कॉमा '')', 'P (Comma ,)
M (Semicolon ;)
E (Colon :)
S (Dot .)
T (Single Inverted Comma '')', 'Time का योजक चिह्न 1963 से लागू हुआ', 'Time symbol changed to single quote in 1963', 7)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_8', 'वर्गीकरण पद्धतियां', 'Classification Schemes', 'UDC (Universal Decimal Classification) के जनक कौन हैं?', 'Who developed UDC (Universal Decimal Classification)?', 'पॉल ऑटलेट (Paul Otlet) एवं हेनरी ला फोंटेन (Henri La Fontaine) - 1905', 'Paul Otlet & Henri La Fontaine (1905)', 'यह DDC के 5वें संस्करण पर आधारित थी', 'Based on the 5th edition of DDC', 8)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_9', 'सूचीकरण एवं मानक', 'Cataloguing & Standards', 'AACR-2 किस वर्ष प्रकाशित हुआ और इसका आधुनिक रूप क्या है?', 'When was AACR-2 published and what is its modern successor?', 'AACR-2: 1978 (संपादक: माइकल गोरमैन)
उत्तराधिकारी: RDA (Resource Description & Access - 2010)', 'AACR-2: 1978 (Ed: Michael Gorman)
Successor: RDA (2010)', NULL, NULL, 9)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_10', 'सूचीकरण एवं मानक', 'Cataloguing & Standards', 'ISBN एवं ISSN में कुल कितने अंक होते हैं?', 'How many digits are in ISBN and ISSN?', 'ISBN: 13 अंक (1 जनवरी 2007 से पूर्व 10 अंक थे)
ISSN: 8 अंक (पत्र-पत्रिकाओं / सीरियल्स हेतु)', 'ISBN: 13 digits (was 10 digits before 2007)
ISSN: 8 digits (for serials/periodicals)', NULL, NULL, 10)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_11', 'सूचीकरण एवं मानक', 'Cataloguing & Standards', 'Classified Catalogue Code (CCC) किसके द्वारा बनाया गया?', 'Who formulated the Classified Catalogue Code (CCC)?', 'डॉ. एस.आर. रंगनाथन (1934)', 'Dr. S.R. Ranganathan (1934)', 'भारत का पहला वर्गीकृत कैटलॉग कोड', 'India''s first classified cataloguing code', 11)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_12', 'सूचीकरण एवं मानक', 'Cataloguing & Standards', 'MARC 21 का विकास किसने किया था?', 'Who developed MARC 21 standard?', 'हेनरीट अवराम (Henriette Avram) - लाइब्रेरी ऑफ कांग्रेस (LC)', 'Henriette Avram - Library of Congress (LC)', NULL, NULL, 12)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_13', 'पुस्तकालय संघ एवं कानून', 'Associations & Legislation', 'ILA एवं IFLA की स्थापना किस वर्ष हुई थी?', 'In which years were ILA and IFLA founded?', 'IFLA: 1927 (मुख्यालय: द हेग, नीदरलैंड्स)
ILA: 1933 (मुख्यालय: नई दिल्ली, भारत)', 'IFLA: 1927 (HQ: The Hague, Netherlands)
ILA: 1933 (HQ: New Delhi, India)', NULL, NULL, 13)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_14', 'पुस्तकालय संघ एवं कानून', 'Associations & Legislation', 'भारत में प्रथम पुस्तकालय अधिनियम किस राज्य में लागू हुआ?', 'Which state enacted the 1st Library Act in India?', 'मद्रास (तमिलनाडु) - वर्ष 1948', 'Madras (Tamil Nadu) - Year 1948', 'अब तक कुल 19 राज्यों में पुस्तकालय कानून लागू हैं', '19 Indian states have enacted public library acts to date', 14)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_15', 'पुस्तकालय संघ एवं कानून', 'Associations & Legislation', 'RRRLF की स्थापना कब हुई और इसका मुख्यालय कहां है?', 'When was RRRLF established and where is its HQ?', 'स्थापना: मई 1972
मुख्यालय: साल्ट लेक, कोलकाता', 'Est: May 1972
HQ: Salt Lake, Kolkata', 'सार्वजनिक पुस्तकालयों को अनुदान एवं वित्तीय सहायता देती है', 'Provides financial assistance to public libraries', 15)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_16', 'पुस्तकालय संघ एवं कानून', 'Associations & Legislation', 'पुस्तकालय उपकर (Cess) लगाने वाले 5 प्रमुख राज्य कौन से हैं?', 'Which 5 states levy Library Cess in India?', '1. तमिलनाडु (मद्रास)
2. आंध्र प्रदेश
3. कर्नाटक
4. केरल
5. हरियाणा', '1. Tamil Nadu
2. Andhra Pradesh
3. Karnataka
4. Kerala
5. Haryana', NULL, NULL, 16)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_17', 'बिहार पुस्तकालय धरोहर', 'Bihar Library Heritage', 'प्राचीन नालंदा विश्वविद्यालय के पुस्तकालय के 3 भवनों के नाम?', 'Names of the 3 library buildings of ancient Nalanda University?', '1. रत्नसागर (Ratnasagara)
2. रत्नोदधि (Ratnodadhi - 9 मंजिला मुख्य भवन)
3. रत्नरंजक (Ratnaranjaka)
सम्पूर्ण परिसर का नाम: धर्मगंज', '1. Ratnasagara
2. Ratnodadhi (9-storey central building)
3. Ratnaranjaka
Campus name: Dharmaganja', NULL, NULL, 17)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_18', 'बिहार पुस्तकालय धरोहर', 'Bihar Library Heritage', 'खुदा बख्श ओरिएंटल लाइब्रेरी (पटना) कब खुली और इसे राष्ट्रीय दर्जा कब मिला?', 'When was Khuda Bakhsh Library opened and declared National Importance?', 'स्थापना: 29 अक्टूबर 1891 (खान बहादुर खुदा बख्श)
राष्ट्रीय दर्जा: 1969 (संसद के अधिनियम द्वारा)', 'Opened: 29 October 1891 (by Khuda Bakhsh)
National Status: 1969 (by Act of Parliament)', NULL, NULL, 18)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_19', 'बिहार पुस्तकालय धरोहर', 'Bihar Library Heritage', 'बिहार की स्टेट सेंट्रल लाइब्रेरी (State Central Library) कौन सी है?', 'Which is the State Central Library of Bihar?', 'श्रीमती राधिका सिन्हा संस्थान एवं सिन्हा लाइब्रेरी, पटना (स्थापना: 1924, डॉ. सच्चिदानंद सिन्हा)', 'Sinha Library, Patna (Founded in 1924 by Dr. Sachchidananda Sinha)', NULL, NULL, 19)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_20', 'बिहार पुस्तकालय धरोहर', 'Bihar Library Heritage', 'बिहार राज्य पुस्तकालय अधिनियम किस वर्ष पारित हुआ?', 'When was the Bihar State Public Library Act passed?', 'वर्ष 2008 ("बिहार राज्य पुस्तकालय एवं सूचना केंद्र अधिनियम 2008")', 'Year 2008 (Bihar State Public Library & Information Centre Act 2008)', NULL, NULL, 20)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_21', 'सॉफ्टवेयर एवं तकनीक', 'Software & Technology', 'Koha और SOUL क्या हैं और कब बने?', 'What are Koha and SOUL and when were they created?', 'Koha: प्रथम ओपन-सोर्स ILS (1999, न्यूजीलैंड, Perl भाषा)
SOUL: INFLIBNET द्वारा भारतीय विश्वविद्यालयों हेतु (SOUL 3.0: 2021)', 'Koha: 1st Open-Source ILS (1999, New Zealand, in Perl)
SOUL: Developed by INFLIBNET for India (SOUL 3.0 in 2021)', NULL, NULL, 21)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_22', 'सॉफ्टवेयर एवं तकनीक', 'Software & Technology', 'ई-ग्रंथालय (e-Granthalaya) का विकास किसने किया है?', 'Who developed e-Granthalaya software?', 'राष्ट्रीय सूचना विज्ञान केंद्र (NIC), भारत सरकार', 'National Informatics Centre (NIC), Govt. of India', 'स्कूल व सरकारी पुस्तकालयों हेतु क्लाउड-आधारित प्लेटफॉर्म', 'Cloud platform designed for school & govt libraries', 22)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_23', 'सॉफ्टवेयर एवं तकनीक', 'Software & Technology', 'RFID का पूरा नाम और इसके मुख्य घटक क्या हैं?', 'Full form of RFID and its primary components?', 'Radio Frequency Identification
घटक: RFID Tag (चिप + एंटीना), Reader/Scanner एवं सॉफ्टवेयर', 'Radio Frequency Identification
Components: RFID Tag (chip + antenna), Reader & Software', NULL, NULL, 23)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_24', 'सॉफ्टवेयर एवं तकनीक', 'Software & Technology', 'DSpace एवं Greenstone क्या हैं?', 'What are DSpace and Greenstone?', 'ओपन-सोर्स डिजिटल लाइब्रेरी एवं संस्थागत रिपॉजिटरी सॉफ्टवेयर', 'Open-source Digital Library & Institutional Repository platforms', NULL, NULL, 24)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_25', 'संदर्भ एवं प्रबंधन', 'Reference & Management', 'SDI (Selective Dissemination of Information) की अवधारणा किसने दी?', 'Who originated the concept of SDI?', 'एच.पी. लूहान (H.P. Luhn, IBM) - वर्ष 1958', 'Hans Peter Luhn (IBM) - Year 1958', NULL, NULL, 25)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_26', 'संदर्भ एवं प्रबंधन', 'Reference & Management', 'POSDCORB सूत्र किसने और कब दिया?', 'Who formulated POSDCORB and when?', 'लूथर गुलिक एवं लिंडाल उर्विक (1937)
Planning, Organizing, Staffing, Directing, Coordinating, Reporting, Budgeting', 'Luther Gulick and Lyndall Urwick (1937)
Planning, Organizing, Staffing, Directing, Coordinating, Reporting, Budgeting', NULL, NULL, 26)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_27', 'संदर्भ एवं प्रबंधन', 'Reference & Management', 'ब्राउन एवं नेवार्क परिसंचरण प्रणालियां कब बनीं?', 'When were Browne and Newark Issue Systems developed?', 'ब्राउन प्रणाली: नीना ई. ब्राउन - 1895
नेवार्क प्रणाली: जॉन कॉटन डाना - 1900', 'Browne System: Nina E. Browne - 1895
Newark System: John Cotton Dana - 1900', NULL, NULL, 27)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_28', 'संदर्भ एवं प्रबंधन', 'Reference & Management', 'शून्य आधारित बजट (ZBB) का जनक किसे माना जाता है?', 'Who is considered the Father of Zero-Based Budgeting (ZBB)?', 'पीटर प्यर (Peter Phyrr) - वर्ष 1970', 'Peter Pyhrr - Year 1970', NULL, NULL, 28)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_29', 'संदर्भ एवं प्रबंधन', 'Reference & Management', 'सूचना स्रोतों को प्राथमिक, द्वितीयक व तृतीयक में किसने बांटा?', 'Who classified information sources into Primary, Secondary & Tertiary?', 'सी.डब्ल्यू. हैनसन (1971) एवं डेनिस ग्रोगन (1982)', 'C.W. Hanson (1971) & Denis Grogan (1982)', NULL, NULL, 29)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_30', 'संदर्भ एवं प्रबंधन', 'Reference & Management', 'पुस्तक चयन का सिद्धांत "Right book to right reader at right time" किसने दिया?', 'Who gave "Right book to right reader at right time" principle?', 'एफ.के.डब्ल्यू. ड्रूरी (F.K.W. Drury) - वर्ष 1930', 'F.K.W. Drury - Year 1930', NULL, NULL, 30)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_31', 'शिक्षण एवं साक्षरता', 'Teaching & Literacy', '"सूचना साक्षरता" (Information Literacy) शब्द किसने गढ़ा?', 'Who coined the term "Information Literacy"?', 'पॉल ज़ुरकोव्स्की (Paul Zurkowski) - वर्ष 1974', 'Paul Zurkowski - Year 1974', NULL, NULL, 31)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.flashcards (id, category_hi, category_en, front_hi, front_en, back_hi, back_en, subtext_hi, subtext_en, display_order)
VALUES ('fc_32', 'शिक्षण एवं साक्षरता', 'Teaching & Literacy', 'NEP 2020 में विद्यालय पुस्तकालय की क्या भूमिका निर्धारित की गई है?', 'What is the role of school libraries in NEP 2020?', 'रटने की बजाय रचनात्मकता, आनंददायी पठन संस्कृति एवं डिजिटल सूचना साक्षरता का केंद्र', 'Active learning hubs fostering critical thinking, joyful reading, and digital literacy', NULL, NULL, 32)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  front_hi = EXCLUDED.front_hi,
  front_en = EXCLUDED.front_en,
  back_hi = EXCLUDED.back_hi,
  back_en = EXCLUDED.back_en,
  subtext_hi = EXCLUDED.subtext_hi,
  subtext_en = EXCLUDED.subtext_en,
  display_order = EXCLUDED.display_order;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_lis_1', 'lis_foundations', 'पुस्तकालय विज्ञान के पांच सूत्रों (Five Laws of Library Science) का प्रतिपादन डॉ. एस. आर. रंगनाथन ने किस वर्ष किया था?', 'In which year did Dr. S. R. Ranganathan formulate the Five Laws of Library Science?', '1924', '1924', '1928', '1928', '1931', '1931', '1933', '1933', 'B', 'डॉ. रंगनाथन ने 1928 में मीनाक्षी कॉलेज, अन्नामलाई नगर में इन पांच सूत्रों का पहली बार प्रतिपादन किया था। यह पुस्तक के रूप में 1931 में मद्रास लाइब्रेरी एसोसिएशन (MALA) द्वारा प्रकाशित हुआ।', 'Dr. S.R. Ranganathan formulated the Five Laws in 1928 at Meenakshi College, Annamalai Nagar. They were published as a book in 1931 by Madras Library Association (MALA).', 'easy', NULL, 'KVS / Bihar Librarian')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_lis_2', 'lis_foundations', '"पुस्तकालय एक वर्धनशील संस्था है" (Library is a growing organism) यह पुस्तकालय विज्ञान का कौन सा सूत्र है?', '"Library is a growing organism" represents which Law of Library Science?', 'प्रथम सूत्र', 'First Law', 'तृतीय सूत्र', 'Third Law', 'चतुर्थ सूत्र', 'Fourth Law', 'पंचम सूत्र', 'Fifth Law', 'D', 'पंचम सूत्र कहता है कि पुस्तकालय एक वर्धनशील संस्था है। इसके अनुसार पाठकों, पुस्तकों, कर्मचारियों एवं भवन में निरंतर जैविक वृद्धि होती रहती है। वीपिंग (Weeding out) भी इसी सूत्र से संबंधित है।', 'The Fifth Law states that the Library is a growing organism. It deals with growth in collection, staff, readers, and space, as well as weeding out of obsolete materials.', 'easy', NULL, 'DSSSB / BSLET')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_lis_3', 'lis_foundations', 'भारत में प्रथम पुस्तकालय अधिनियम (Library Legislation) किस राज्य में पारित किया गया था?', 'In which state was the first Public Library Act passed in India?', 'मद्रास (तमिलनाडु) - 1948', 'Madras (Tamil Nadu) - 1948', 'आंध्र प्रदेश - 1960', 'Andhra Pradesh - 1960', 'कर्नाटक - 1965', 'Karnataka - 1965', 'महाराष्ट्र - 1967', 'Maharashtra - 1967', 'A', 'भारत में स्वतंत्रता के बाद पहला सार्वजनिक पुस्तकालय अधिनियम मद्रास (अब तमिलनाडु) में 1948 में पारित हुआ था। वर्तमान में भारत के 19 राज्यों में पुस्तकालय अधिनियम लागू हैं।', 'The Madras Public Library Act was the first library legislation passed in independent India in 1948. Currently, 19 states in India have enacted public library acts.', 'medium', NULL, 'RSMSSB / Bihar School Lib')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_lis_4', 'lis_foundations', 'राजा राममोहन राय पुस्तकालय प्रतिष्ठान (RRRLF) की स्थापना किस वर्ष हुई थी और इसका मुख्यालय कहाँ है?', 'In which year was the Raja Rammohun Roy Library Foundation (RRRLF) established, and where is its headquarter?', '1972, कोलकाता', '1972, Kolkata', '1954, नई दिल्ली', '1954, New Delhi', '1982, पटना', '1982, Patna', '1965, मुंबई', '1965, Mumbai', 'A', 'RRRLF की स्थापना मई 1972 में राजा राममोहन राय की 200वीं जयंती के अवसर पर संस्कृति मंत्रालय, भारत सरकार द्वारा कोलकाता में की गई थी। यह भारत में सार्वजनिक पुस्तकालयों के विकास हेतु सर्वोच्च संस्था है।', 'RRRLF was established in May 1972 in Kolkata by the Ministry of Culture on the bicentenary of Raja Rammohun Roy. It promotes public library development across India.', 'medium', NULL, 'BPSC / KVS')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_lis_5', 'lis_foundations', 'भारतीय पुस्तकालय संघ (ILA - Indian Library Association) की स्थापना किस वर्ष हुई थी?', 'When was the Indian Library Association (ILA) founded?', '1920', '1920', '1933', '1933', '1945', '1945', '1951', '1951', 'B', 'ILA की स्थापना 13 सितंबर 1933 को कलकत्ता (कोलकाता) में ऑल इंडिया लाइब्रेरी कॉन्फ्रेंस के दौरान हुई थी। डॉ. एम.ओ. थॉमस इसके प्रथम अध्यक्ष और के.एम. असदुल्लाह प्रथम सचिव थे।', 'ILA was founded on September 13, 1933, during the All India Library Conference in Calcutta. Dr. M.O. Thomas was the first President and K.M. Asadullah was the first Secretary.', 'medium', NULL, 'DSSSB / UGC NET')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_cat_1', 'classification_cataloguing', 'डेवी दशमलव वर्गीकरण (DDC) का प्रथम संस्करण किस वर्ष प्रकाशित हुआ था?', 'In which year was the first edition of the Dewey Decimal Classification (DDC) published?', '1876', '1876', '1885', '1885', '1891', '1891', '1900', '1900', 'A', 'मेलविल डेवी (Melvil Dewey) ने 1876 में DDC का प्रथम संस्करण मात्र 44 पृष्ठों में गुमनाम रूप से प्रकाशित किया था। इसका शीर्षक "A Classification and Subject Index for Cataloguing and Arranging the Books and Pamphlets of a Library" था।', 'Melvil Dewey published the 1st edition of DDC anonymously in 1876 with only 44 pages. It revolutionized classification through decimal notation.', 'easy', NULL, 'Bihar Librarian / KVS')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_cat_2', 'classification_cataloguing', 'कोलन वर्गीकरण (Colon Classification - CC) में मूलभूत श्रेणियों (PMEST) में "M" का क्या अर्थ है?', 'In Colon Classification (CC), what does "M" stand for in the fundamental categories (PMEST)?', 'Method (विधि)', 'Method', 'Matter (पदार्थ)', 'Matter', 'Management (प्रबंधन)', 'Management', 'Mechanism (यांत्रिकी)', 'Mechanism', 'B', 'रंगनाथन ने ज्ञान को 5 मूलभूत श्रेणियों (PMEST) में विभाजित किया: P=Personality (व्यक्तित्व, योजक चिह्न ,), M=Matter (पदार्थ, योजक चिह्न ;), E=Energy (ऊर्जा, योजक चिह्न :), S=Space (स्थान, योजक चिह्न .), T=Time (काल, योजक चिह्न '')।', 'Ranganathan classified all attributes into PMEST: P=Personality (,), M=Matter (;), E=Energy (:), S=Space (.), T=Time (''). M stands for Matter.', 'medium', NULL, 'BSLET / UGC NET')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_cat_3', 'classification_cataloguing', 'AACR-2 (Anglo-American Cataloguing Rules, 2nd ed.) किस वर्ष प्रकाशित हुआ था?', 'In which year was AACR-2 published?', '1967', '1967', '1978', '1978', '1988', '1988', '1998', '1998', 'B', 'AACR-1 1967 में तथा AACR-2 1978 में प्रकाशित हुआ। इसका संपादन माइकल गोरमैन (Michael Gorman) और पॉल डब्ल्यू. विंकलर ने किया था। 1988 में इसका संशोधित संस्करण (AACR-2R) आया।', 'AACR-1 was published in 1967 and AACR-2 in 1978, edited by Michael Gorman and Paul W. Winkler. AACR-2 Revised came in 1988.', 'medium', NULL, 'NVS / Bihar Librarian')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_cat_4', 'classification_cataloguing', 'DDC के 19वें संस्करण (19th Edition) में कुल कितने खंड (Volumes) हैं?', 'How many volumes are there in the 19th edition of DDC?', '2 खंड', '2 Volumes', '3 खंड', '3 Volumes', '4 खंड', '4 Volumes', '5 खंड', '5 Volumes', 'B', 'DDC 19वां संस्करण (1979) 3 खंडों में प्रकाशित हुआ: खंड 1 - Introduction/Tables, खंड 2 - Schedules, खंड 3 - Relative Index। (नोट: 20वें, 21वें, 22वें व 23वें संस्करण में 4 खंड हैं)।', 'DDC 19th edition (1979) was published in 3 volumes: Vol 1 Tables, Vol 2 Schedules, Vol 3 Relative Index. (20th-23rd editions have 4 volumes).', 'hard', NULL, 'RSMSSB / BPSC')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_cat_5', 'classification_cataloguing', 'अंतर्राष्ट्रीय मानक पुस्तक संख्या (ISBN) 1 जनवरी 2007 से कितने अंकों की हो गई है?', 'Since January 1, 2007, how many digits does an ISBN (International Standard Book Number) consist of?', '10 अंक', '10 digits', '12 अंक', '12 digits', '13 अंक', '13 digits', '15 अंक', '15 digits', 'C', '1 जनवरी 2007 से ISBN 10 अंकों से बढ़कर 13 अंकों का हो गया है। इसमें 5 भाग होते हैं: GS1 उपसर्ग (978 या 979), देश/भाषा पहचानकर्ता, प्रकाशक कोड, शीर्षक पहचानकर्ता, और चेक अंक।', 'Since Jan 1, 2007, ISBN has 13 digits across 5 elements: GS1 prefix (978/979), Registration group, Registrant, Publication, and Check digit.', 'easy', NULL, 'BSEB LET / KVS')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_ref_1', 'reference_sources', 'सूचना के प्राथमिक स्रोत (Primary Sources) के अंतर्गत क्या आता है?', 'Which of the following is considered a Primary Source of information?', 'शोध पत्रिका (Research Periodical/Article)', 'Research Periodical / Article', 'पाठ्यपुस्तक (Textbook)', 'Textbook', 'विश्वकोश (Encyclopedia)', 'Encyclopedia', 'ग्रंथसूची (Bibliography)', 'Bibliography', 'A', 'शोध पत्रिकाएँ, शोध प्रबंध (Theses), पेटेंट, मानक और सम्मेलन कार्यवाही प्राथमिक स्रोत हैं। पाठ्यपुस्तक और विश्वकोश द्वितीयक स्रोत हैं, जबकि ग्रंथसूची तृतीयक स्रोत है।', 'Research periodicals, theses, patents, conference papers, and standards contain original findings and are primary sources. Encyclopedias and textbooks are secondary.', 'easy', NULL, 'DSSSB / BSLET')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_ref_2', 'reference_sources', 'SDI (Selective Dissemination of Information - चयनात्मक सूचना प्रसार) की अवधारणा का विकास किसने किया था?', 'Who developed the concept of Selective Dissemination of Information (SDI)?', 'एच. पी. लुहान (H. P. Luhn) - 1958', 'H. P. Luhn - 1958', 'एस. आर. रंगनाथन', 'S. R. Ranganathan', 'डेरेक ऑस्टिन (Derek Austin)', 'Derek Austin', 'यूजीन गारफ़ील्ड (Eugene Garfield)', 'Eugene Garfield', 'A', 'SDI सेवा की अवधारणा आईबीएम (IBM) के वैज्ञानिक हैंस पीटर लुहान (H.P. Luhn) द्वारा 1958 में दी गई थी। इसमें उपयोगकर्ता प्रोफ़ाइल (User Profile) और दस्तावेज़ प्रोफ़ाइल (Document Profile) का मिलान किया जाता है।', 'Hans Peter Luhn of IBM developed the concept of SDI in 1958. It matches user interest profiles with incoming document profiles to deliver targeted alerts.', 'medium', NULL, 'KVS / BPSC')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_ref_3', 'reference_sources', '"इनसाइक्लोपीडिया ब्रिटैनिका" (Encyclopaedia Britannica) का प्रथम संस्करण किस वर्ष प्रकाशित हुआ था?', 'In which year was the first edition of Encyclopaedia Britannica published?', '1768 - 1771', '1768 - 1771', '1801 - 1805', '1801 - 1805', '1850', '1850', '1911', '1911', 'A', 'इनसाइक्लोपीडिया ब्रिटैनिका का प्रथम संस्करण 1768 से 1771 के मध्य एडिनबर्ग (स्कॉटलैंड) से 3 खंडों में प्रकाशित हुआ था। 2012 के बाद इसका मुद्रित संस्करण बंद कर इसे पूर्णतः डिजिटल कर दिया गया।', 'Encyclopaedia Britannica 1st edition was published between 1768 and 1771 in Edinburgh, Scotland in 3 volumes. The print edition ceased in 2012 in favor of digital.', 'medium', NULL, 'UGC NET / Bihar School')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_ict_1', 'automation_ict', '"कोहा" (Koha) क्या है?', 'What is "Koha" in library science?', 'एक ओपन-सोर्स इंटीग्रेटेड लाइब्रेरी मैनेजमेंट सिस्टम (ILS)', 'An Open-Source Integrated Library Management System (ILS)', 'एक डिजिटल लाइब्रेरी रिपॉजिटरी सॉफ्टवेयर', 'A Digital Library Repository Software', 'एक व्यावसायिक ई-बुक रीडर', 'A Commercial E-book Reader', 'पुस्तकालय सांख्यिकी डेटाबेस', 'A Library Statistics Database', 'A', 'कोहा दुनिया का पहला ओपन-सोर्स एकीकृत पुस्तकालय प्रबंधन प्रणाली (ILS) है, जिसे 1999 में न्यूजीलैंड के कातिपो कम्युनिकेशंस द्वारा होरोव्हेनुआ लाइब्रेरी ट्रस्ट के लिए विकसित किया गया था।', 'Koha is the worlds first open-source Integrated Library System (ILS), developed in 1999 in New Zealand by Katipo Communications for the Horowhenua Library Trust.', 'easy', NULL, 'Bihar School Lib / DSSSB')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_ict_2', 'automation_ict', 'SOUL (Software for University Libraries) सॉफ्टवेयर किसके द्वारा विकसित किया गया है?', 'SOUL software was developed by which organization in India?', 'INFLIBNET (सूचना एवं पुस्तकालय नेटवर्क केंद्र)', 'INFLIBNET Centre', 'DELNET (विकासशील पुस्तकालय नेटवर्क)', 'DELNET', 'NISCAIR / CSIR', 'NISCAIR / CSIR', 'NIC (राष्ट्रीय सूचना विज्ञान केंद्र)', 'NIC', 'A', 'SOUL सॉफ्टवेयर INFLIBNET केंद्र (अहमदाबाद/गांधीनगर) द्वारा विशेष रूप से भारतीय विश्वविद्यालयों एवं महाविद्यालय पुस्तकालयों के स्वचालन हेतु तैयार किया गया है। इसका नवीनतम संस्करण SOUL 3.0 है।', 'SOUL was developed by the INFLIBNET Centre (Gandhinagar) for automating university and college libraries in India. The current version is SOUL 3.0.', 'easy', NULL, 'BPSC / KVS')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_ict_3', 'automation_ict', 'संस्थागत रिपॉजिटरी (Institutional Repository) और डिजिटल लाइब्रेरी बनाने हेतु सर्वाधिक प्रयुक्त ओपन सोर्स सॉफ्टवेयर कौन सा है?', 'Which open-source software is widely used to create Institutional Repositories and Digital Libraries?', 'DSpace', 'DSpace', 'Koha', 'Koha', 'SOUL', 'SOUL', 'LibSys', 'LibSys', 'A', 'DSpace और EPrints डिजिटल रिपॉजिटरी के प्रमुख सॉफ्टवेयर हैं। DSpace को एमआईटी (MIT) और एचपी लैब्स (HP Labs) द्वारा 2002 में विकसित किया गया था।', 'DSpace is the most popular open-source software for institutional repositories, originally created in 2002 by MIT Libraries and Hewlett-Packard (HP).', 'medium', NULL, 'DSSSB / UGC NET')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_ict_4', 'automation_ict', 'RFID (Radio Frequency Identification) का पुस्तकालयों में मुख्य उपयोग क्या है?', 'What is the primary application of RFID technology in modern libraries?', 'पुस्तकों के परिसंचरण (Issue/Return) एवं सुरक्षा प्रबंधन में', 'Automated book circulation (Issue/Return) & anti-theft security', 'किताबों की छपाई के लिए', 'For printing books', 'इंटरनेट की गति बढ़ाने के लिए', 'For boosting Wi-Fi speeds', 'पुस्तकालय बजट बनाने में', 'For calculating library budget', 'A', 'RFID तकनीक रेडियो तरंगों के माध्यम से बिना स्पर्श किए एक साथ कई किताबों को इश्यू/रिटर्न (सेल्फ-चेकआउट कियोस्क), स्टॉक वेरिफिकेशन तथा चोरी से सुरक्षा (गेट सेंसर) में सक्षम बनाती है।', 'RFID uses radio waves for contactless multi-item check-in/out, shelf inventory, and anti-theft gates at library exits.', 'easy', NULL, 'Bihar Librarian / NVS')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_mgmt_1', 'management', 'ब्राउने और नेवार्क प्रणाली (Browne & Newark Charging Systems) पुस्तकालय के किस विभाग से संबंधित हैं?', 'The Browne and Newark charging systems are associated with which library department?', 'परिसंचरण विभाग (Circulation / Issue-Return)', 'Circulation Department', 'अधिग्रहण विभाग (Acquisition)', 'Acquisition Department', 'संदर्भ विभाग (Reference)', 'Reference Department', 'तकनीकी विभाग (Cataloguing)', 'Technical Department', 'A', 'नीना ई. ब्राउने द्वारा 1895 में ब्राउने चार्जिंग प्रणाली तथा फ्रैंक पी. हिल द्वारा 1900 में नेवार्क प्रणाली का आविष्कार पुस्तकों के निर्गम एवं आगम (Issue-Return) के लिए किया गया था।', 'The Browne system (Nina E. Browne, 1895) and Newark system (Frank P. Hill, 1900) are circulation/lending transaction systems for tracking borrowed books.', 'medium', NULL, 'KVS / Bihar School Lib')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_mgmt_2', 'management', 'पुस्तकालय बजट की किस विधि में पिछले वर्ष के व्यय को आधार न मानकर प्रत्येक वर्ष नए सिरे से शून्य से शुरुआत की जाती है?', 'Which library budgeting method starts from scratch each year without using previous years expenditure as a base?', 'शून्य आधारित बजट (Zero-Based Budgeting - ZBB)', 'Zero-Based Budgeting (ZBB)', 'ऐतिहासिक बजट (Historical Budget)', 'Historical Budget', 'प्रदर्शन बजट (Performance Budget)', 'Performance Budget', 'सूत्र बजट (Formula Budget)', 'Formula Budget', 'A', 'शून्य आधारित बजट (ZBB) का विकास पीटर ए. पायर (Peter A. Phyrr) ने 1970 में किया था। इसमें प्रत्येक व्यय को हर वर्ष नए सिरे से औचित्य साबित करना पड़ता है।', 'Zero-Based Budgeting (ZBB), originated by Peter A. Phyrr in 1970, requires every department to justify each rupee of expenditure afresh from zero base.', 'medium', NULL, 'RSMSSB / BPSC')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_bihar_1', 'bihar_gk', 'प्राचीन नालंदा विश्वविद्यालय के पुस्तकालय का क्या नाम था, जिसमें तीन विशाल भवन - रत्नसागर, रत्नोदधि एवं रत्नरंजक शामिल थे?', 'What was the name of the ancient Nalanda University library which comprised three grand buildings - Ratnasagara, Ratnodadhi, and Ratnaranjaka?', 'धर्मगंज (Dharmaganja)', 'Dharmaganja', 'ज्ञानकोश', 'Gyaankosh', 'विद्यासागर', 'Vidyasagar', 'भारती भवन', 'Bharati Bhavan', 'A', 'प्राचीन नालंदा विश्वविद्यालय के भव्य पुस्तकालय परिसर को "धर्मगंज" (धर्म का पर्वत) कहा जाता था। इसमें नौ मंजिला "रत्नोदधि" मुख्य भवन था। 1193 में बख्तियार खिलजी ने इसे नष्ट कर दिया था।', 'The great library complex of ancient Nalanda University was called "Dharmaganja" (Mountain of Truth), housing Ratnasagara, Ratnodadhi (9-storey building), and Ratnaranjaka.', 'easy', NULL, 'Bihar Special / BPSC')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_bihar_2', 'bihar_gk', 'पटना में स्थित प्रसिद्ध "खुदा बख्श ओरिएंटल पब्लिक लाइब्रेरी" को राष्ट्रीय महत्व का संस्थान किस वर्ष घोषित किया गया था?', 'In which year was the famous Khuda Bakhsh Oriental Public Library in Patna declared an Institution of National Importance by an Act of Parliament?', '1969', '1969', '1891', '1891', '1947', '1947', '1985', '1985', 'A', 'खुदा बख्श ओरिएंटल पब्लिक लाइब्रेरी को 1891 में आम जनता के लिए खोला गया था। संसद के अधिनियम 1969 द्वारा इसे राष्ट्रीय महत्व का संस्थान (Institution of National Importance) घोषित किया गया।', 'Opened to the public in 1891 by Khan Bahadur Khuda Bakhsh, it was recognized as an Institution of National Importance by an Act of Parliament in 1969.', 'medium', NULL, 'BPSC / Bihar Librarian')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_bihar_3', 'bihar_gk', 'बिहार राज्य में "बिहार राज्य पुस्तकालय अधिनियम" (Bihar State Public Library Act) किस वर्ष पारित किया गया था?', 'In which year was the Bihar State Public Library Act enacted?', '2008', '2008', '1989', '1989', '2015', '2015', '2001', '2001', 'A', 'बिहार सरकार द्वारा "बिहार राज्य पुस्तकालय एवं सूचना केंद्र अधिनियम" वर्ष 2008 में पारित किया गया था।', 'The Bihar State Public Library and Information Centre Act was enacted in the year 2008.', 'medium', NULL, 'Bihar Librarian Special')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_bihar_4', 'bihar_gk', 'बिहार में 1857 के प्रथम स्वतंत्रता संग्राम का नेतृत्व किसने किया था?', 'Who led the First War of Indian Independence of 1857 in Bihar?', 'बाबू वीर कुंवर सिंह', 'Babu Veer Kunwar Singh', 'पीर अली खान', 'Pir Ali Khan', 'अमर सिंह', 'Amar Singh', 'उपरोक्त सभी (विभिन्न चरणों में)', 'All of the above (in respective phases)', 'D', 'जगदीशपुर (आरा) के 80 वर्षीय जमींदार बाबू वीर कुंवर सिंह ने बिहार में 1857 की क्रांति का मुख्य नेतृत्व किया। पटना में पुस्तक विक्रेता पीर अली ने जुलाई 1857 में विद्रोह का बिगुल फूंका था, और कुंवर सिंह के भाई अमर सिंह ने बाद में मोर्चा संभाला।', 'Babu Veer Kunwar Singh was the supreme commander of the 1857 revolt in Bihar from Jagdishpur. Pir Ali led the revolt in Patna, and Kunwar Singhs brother Amar Singh continued the struggle.', 'easy', NULL, 'BPSC General Studies')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_teach_1', 'teaching_aptitude', 'एक विद्यालय पुस्तकालयाध्यक्ष का विद्यार्थियों में पठन संस्कृति (Reading Culture) विकसित करने हेतु सबसे प्रभावी कदम क्या है?', 'What is the most effective step a school librarian can take to develop reading culture among students?', 'विद्यार्थियों की रुचि अनुसार पुस्तक क्लब, कहानी वाचन एवं बुक फेयर का आयोजन करना', 'Organizing book clubs, storytelling sessions & book fairs based on student interests', 'किताबें न पढ़ने पर दंड देना', 'Punishing students who do not borrow books', 'अलमारियों में किताबें बंद करके ताला लगाना', 'Keeping books locked in glass cupboards', 'केवल पाठ्यक्रम की पाठ्यपुस्तकें रखना', 'Only stocking textbook curriculum materials', 'A', 'राष्ट्रीय शिक्षा नीति (NEP 2020) के अनुसार विद्यालय पुस्तकालयों को जीवंत शिक्षण केंद्र बनाना चाहिए। बुक क्लब, पठन प्रतियोगिताएं और ओपन एक्सेस प्रणाली छात्रों को आकर्षित करती है।', 'As highlighted in NEP 2020, school libraries should foster joyful learning through student book clubs, literary activities, and open stack browsing.', 'easy', NULL, 'BSLET / STET')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_teach_2', 'teaching_aptitude', 'सूचना साक्षरता (Information Literacy) से क्या तात्पर्य है?', 'What is meant by "Information Literacy"?', 'सूचना की आवश्यकता को पहचानना, उसे खोजना, मूल्यांकन करना और प्रभावी ढंग से उपयोग करना', 'The ability to recognize when information is needed, locate, evaluate, and use it effectively', 'केवल कंप्यूटर चालू और बंद करना सीखना', 'Learning how to power on and off a PC', 'पुस्तकालय की सभी किताबों को रटना', 'Memorizing the catalogue of the library', 'बिना जांचे इंटरनेट सामग्री पर विश्वास करना', 'Believing all internet content uncritically', 'A', 'पॉल ज़ुरकोव्स्की (Paul Zurkowski) ने 1974 में "सूचना साक्षरता" शब्द गढ़ा था। यह 21वीं सदी के विद्यार्थियों और शिक्षकों के लिए एक अनिवार्य योग्यता है।', 'Paul Zurkowski coined "Information Literacy" in 1974. It refers to the skill of identifying information needs, finding reliable data, and evaluating sources critically.', 'easy', NULL, 'BSEB LET / KVS')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_ref_1', 'reference_sources', 'सामयिक अभिज्ञता सेवा (CAS - Current Awareness Service) और चयनात्मक सूचना प्रसार (SDI) में मुख्य अंतर क्या है?', 'What is the key difference between CAS and SDI?', 'CAS सामान्य पाठकों के समूह हेतु होती है जबकि SDI व्यक्तिगत उपयोगकर्ता रुचि प्रोफाइल पर आधारित होती है', 'CAS is for general groups while SDI is customized to individual user interest profiles', 'CAS केवल ऑनलाइन दी जाती है, SDI केवल मुद्रित', 'CAS is strictly online, SDI is strictly print', 'दोनों में कोई अंतर नहीं है', 'There is no difference between them', 'SDI केवल सार्वजनिक पुस्तकालयों में दी जाती है', 'SDI is only offered in public libraries', 'A', 'CAS (Current Awareness Service) व्यापक पाठकों को नवीनतम साहित्य से अवगत कराने की सामान्य सेवा है, जबकि SDI (Selective Dissemination of Information - H.P. Luhn द्वारा 1958) व्यक्तिगत उपयोगकर्ता प्रोफाइल और दस्तावेज प्रोफाइल के मिलान पर आधारित विशिष्ट सेवा है।', 'CAS is a generalized alert service for user groups, while SDI (formulated by H.P. Luhn in 1958) is tailored to specific individual researcher profiles.', 'medium', NULL, 'UGC NET / BPSC')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_ref_2', 'reference_sources', 'इनसाइक्लोपीडिया ब्रिटानिका (Encyclopaedia Britannica) का प्रथम संस्करण किस वर्ष प्रकाशित हुआ था?', 'In which year was the first edition of Encyclopaedia Britannica published?', '1768', '1768', '1876', '1876', '1911', '1911', '1801', '1801', 'A', 'इनसाइक्लोपीडिया ब्रिटानिका का प्रथम संस्करण 1768 में एडिनबर्ग (स्कॉटलैंड) में प्रकाशित हुआ था। वर्ष 2012 में इसका मुद्रित संस्करण स्थायी रूप से बंद कर केवल डिजिटल रूप में उपलब्ध कराया गया।', 'The 1st edition of Encyclopaedia Britannica appeared in 1768 in Edinburgh, Scotland. In 2012, its print edition was discontinued in favor of digital access.', 'medium', NULL, 'DSSSB / KVS')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_ref_3', 'reference_sources', 'शोध प्रबंध (Theses), अप्रकाशित रिपोर्ट एवं शोध पत्र किस प्रकार के सूचना स्रोत हैं?', 'Theses, unpublished reports, and primary research articles are what type of information sources?', 'प्राथमिक स्रोत (Primary Sources)', 'Primary Sources', 'द्वितीयक स्रोत (Secondary Sources)', 'Secondary Sources', 'तृतीयक स्रोत (Tertiary Sources)', 'Tertiary Sources', 'अमान्य स्रोत (Invalid Sources)', 'Non-authoritative Sources', 'A', 'प्राथमिक स्रोत (Primary Sources) वे मूल दस्तावेज होते हैं जिनमें नए विचारों, सिद्धांतों या शोध निष्कर्षों का सर्वप्रथम अभिलेखन होता है। शोध पत्र, पेटेंट, मानक और शोध प्रबंध प्राथमिक स्रोत हैं।', 'Primary sources represent original research, discoveries, and uninterpreted first-hand accounts, such as patents, standards, dissertations, and research papers.', 'easy', NULL, 'Bihar Librarian / NVS')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_mgmt_1', 'management', 'प्रबंधन के 7 कार्यों का प्रसिद्ध सूत्र "POSDCORB" किसके द्वारा प्रतिपादित किया गया था?', 'Who coined the famous management acronym "POSDCORB"?', 'लूथर गुलिक एवं लिंडाल उर्विक', 'Luther Gulick and Lyndall Urwick', 'हेनरी फेयोल', 'Henri Fayol', 'एफ.डब्ल्यू. टेलर', 'F.W. Taylor', 'मेलविल डेवी', 'Melvil Dewey', 'A', 'लूथर गुलिक और लिंडाल उर्विक ने 1937 में POSDCORB सूत्र दिया: Planning, Organizing, Staffing, Directing, Coordinating, Reporting, Budgeting.', 'Luther Gulick and Lyndall Urwick coined POSDCORB in 1937 to describe the core administrative functions of management.', 'easy', NULL, 'BPSC / DSSSB')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_mgmt_2', 'management', '"उचित समय पर उचित पाठक को उचित पुस्तक प्रदान करना" (To provide the right book to the right reader at the right time) यह पुस्तक चयन सिद्धांत किसने दिया?', 'Who gave the book selection principle: "To provide the right book to the right reader at the right time"?', 'एफ.के.डब्ल्यू. ड्रूरी (F.K.W. Drury - 1930)', 'F.K.W. Drury (1930)', 'मेलविल डेवी (1876)', 'Melvil Dewey (1876)', 'डॉ. एस.आर. रंगनाथन (1952)', 'Dr. S.R. Ranganathan (1952)', 'सी.ए. कटर (1876)', 'C.A. Cutter (1876)', 'A', 'एफ.के.डब्ल्यू. ड्रूरी ने 1930 में अपनी पुस्तक "Book Selection" में यह प्रसिद्ध सिद्धांत दिया था। मेलविल डेवी का सिद्धांत था: "कम से कम लागत में अधिकतम पाठकों को सर्वोत्तम पुस्तक"।', 'F.K.W. Drury formulated this classic principle in his 1930 work "Book Selection". Melvil Deweys motto was "The best reading for the largest number at the least cost".', 'medium', NULL, 'KVS / UGC NET')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_mgmt_3', 'management', 'पुस्तकालय परिसंचरण (Circulation) की "ब्राउन प्रणाली" (Browne System) का विकास किसने और कब किया?', 'Who developed the "Browne Issue System" of library circulation and when?', 'नीना ई. ब्राउन (1895)', 'Nina E. Browne (1895)', 'जॉन कॉटन डाना (1900)', 'John Cotton Dana (1900)', 'जे.डी. ब्राउन (1906)', 'J.D. Brown (1906)', 'मेलविल डेवी (1885)', 'Melvil Dewey (1885)', 'A', 'नीना ई. ब्राउन (बोस्टन, यूएसए) ने 1895 में ब्राउन इशू सिस्टम तैयार किया। इसमें रीडर टिकट (पॉकेट) और बुक कार्ड का उपयोग होता है, जिसमें किसी रजिस्टर में प्रविष्टि की आवश्यकता नहीं होती।', 'Nina E. Browne invented the Browne System in 1895 using borrower pockets and book cards, eliminating tedious manual register entries.', 'medium', NULL, 'BSLET / RSMSSB')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.questions (id, category, question_hi, question_en, option_a_hi, option_a_en, option_b_hi, option_b_en, option_c_hi, option_c_en, option_d_hi, option_d_en, correct_answer, explanation_hi, explanation_en, difficulty, year, source_exam)
VALUES ('q_mgmt_4', 'management', 'शून्य आधारित बजट (ZBB - Zero-Based Budgeting) की मुख्य विशेषता क्या है?', 'What is the key characteristic of Zero-Based Budgeting (ZBB)?', 'प्रत्येक वित्तीय वर्ष में सभी खर्चों का नए सिरे से शून्य आधार पर औचित्य सिद्ध करना अनिवार्य होता है', 'Every proposed expenditure must be justified afresh from a zero base each year', 'पिछले वर्ष के बजट में केवल 10% की वृद्धि करना', 'Adding an arbitrary 10% increment to previous years budget', 'पुस्तकालय हेतु शून्य बजट आवंटित करना', 'Allocating zero funds to libraries', 'केवल कर्मचारियों के वेतन का प्रावधान करना', 'Only budgeting for staff salaries', 'A', 'पीटर प्यर (Peter Phyrr) ने 1970 में टेक्सास इंस्ट्रूमेंट्स में ZBB विकसित किया। इसमें पिछले साल के खर्चों को आधार नहीं माना जाता, बल्कि हर मद का शून्य से औचित्य साबित करना पड़ता है।', 'Peter Pyhrr pioneered Zero-Based Budgeting in 1970. Unlike incremental budgeting, it starts from a clean slate without carrying forward historical precedents.', 'easy', NULL, 'BPSC / KVS')
ON CONFLICT (id) DO UPDATE SET
  question_hi = EXCLUDED.question_hi,
  question_en = EXCLUDED.question_en,
  option_a_hi = EXCLUDED.option_a_hi,
  option_a_en = EXCLUDED.option_a_en,
  option_b_hi = EXCLUDED.option_b_hi,
  option_b_en = EXCLUDED.option_b_en,
  option_c_hi = EXCLUDED.option_c_hi,
  option_c_en = EXCLUDED.option_c_en,
  option_d_hi = EXCLUDED.option_d_hi,
  option_d_en = EXCLUDED.option_d_en,
  correct_answer = EXCLUDED.correct_answer,
  explanation_hi = EXCLUDED.explanation_hi,
  explanation_en = EXCLUDED.explanation_en,
  difficulty = EXCLUDED.difficulty,
  year = EXCLUDED.year,
  source_exam = EXCLUDED.source_exam;

INSERT INTO public.quizzes (id, title_hi, title_en, subtitle_hi, subtitle_en, category, question_count, question_ids, duration_minutes, reward_xp, badge_hi, badge_en, difficulty, color, icon, display_order)
VALUES ('quiz_daily', 'दैनिक चैलेंज क्विज़ - आज का अभ्यास', 'Today''s Daily Challenge Quiz', '10 चुनिंदा उच्च-अंक प्रश्न • तुरंत व्याख्या • +50 XP बोनस', '10 High-yield curated questions • Instant solutions • +50 XP', 'daily', 10, '["q_lis_1","q_lis_2","q_lis_3","q_cat_1","q_cat_2","q_cat_5","q_auto_1","q_auto_2","q_bihar_1","q_ref_1"]'::jsonb, 5, 50, 'डेली स्ट्रीक 🔥', 'Daily Streak 🔥', 'medium', '#EA580C', 'flame', 1)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  subtitle_hi = EXCLUDED.subtitle_hi,
  subtitle_en = EXCLUDED.subtitle_en,
  category = EXCLUDED.category,
  question_count = EXCLUDED.question_count,
  question_ids = EXCLUDED.question_ids,
  duration_minutes = EXCLUDED.duration_minutes,
  reward_xp = EXCLUDED.reward_xp,
  badge_hi = EXCLUDED.badge_hi,
  badge_en = EXCLUDED.badge_en,
  difficulty = EXCLUDED.difficulty,
  color = EXCLUDED.color,
  icon = EXCLUDED.icon,
  display_order = EXCLUDED.display_order;

INSERT INTO public.quizzes (id, title_hi, title_en, subtitle_hi, subtitle_en, category, question_count, question_ids, duration_minutes, reward_xp, badge_hi, badge_en, difficulty, color, icon, display_order)
VALUES ('quiz_unit_1', 'यूनिट 1: रंगनाथन के 5 सूत्र एवं पुस्तकालय अधिनियम', 'Unit 1: 5 Laws & Library Legislation Quiz', '5 सूत्र, 19 राज्य कानून, सेस प्रावधान, ILA, IFLA एवं RRRLF', '5 Laws, 19 State Acts, Library Cess, ILA, IFLA & RRRLF', 'foundations', 8, '["q_lis_1","q_lis_2","q_lis_3","q_lis_4","q_lis_5","q_lis_6","q_lis_7","q_lis_8"]'::jsonb, 6, 40, 'कोर थ्योरी', 'Core Theory', 'easy', '#0070F3', 'book', 2)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  subtitle_hi = EXCLUDED.subtitle_hi,
  subtitle_en = EXCLUDED.subtitle_en,
  category = EXCLUDED.category,
  question_count = EXCLUDED.question_count,
  question_ids = EXCLUDED.question_ids,
  duration_minutes = EXCLUDED.duration_minutes,
  reward_xp = EXCLUDED.reward_xp,
  badge_hi = EXCLUDED.badge_hi,
  badge_en = EXCLUDED.badge_en,
  difficulty = EXCLUDED.difficulty,
  color = EXCLUDED.color,
  icon = EXCLUDED.icon,
  display_order = EXCLUDED.display_order;

INSERT INTO public.quizzes (id, title_hi, title_en, subtitle_hi, subtitle_en, category, question_count, question_ids, duration_minutes, reward_xp, badge_hi, badge_en, difficulty, color, icon, display_order)
VALUES ('quiz_unit_2', 'यूनिट 2: DDC, CC वर्गीकरण एवं कैटलॉगिंग कोड्स', 'Unit 2: DDC, CC Classification & Cataloguing', 'डेवी दशमलव 10 वर्ग, PMEST योजक चिह्न, AACR-2 व ISBN', 'Dewey 10 classes, PMEST symbols, AACR-2 & ISBN digits', 'classification', 6, '["q_cat_1","q_cat_2","q_cat_3","q_cat_4","q_cat_5","q_cat_6"]'::jsonb, 5, 40, 'वर्गीकरण स्पेशल', 'Classification', 'medium', '#10B981', 'folder', 3)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  subtitle_hi = EXCLUDED.subtitle_hi,
  subtitle_en = EXCLUDED.subtitle_en,
  category = EXCLUDED.category,
  question_count = EXCLUDED.question_count,
  question_ids = EXCLUDED.question_ids,
  duration_minutes = EXCLUDED.duration_minutes,
  reward_xp = EXCLUDED.reward_xp,
  badge_hi = EXCLUDED.badge_hi,
  badge_en = EXCLUDED.badge_en,
  difficulty = EXCLUDED.difficulty,
  color = EXCLUDED.color,
  icon = EXCLUDED.icon,
  display_order = EXCLUDED.display_order;

INSERT INTO public.quizzes (id, title_hi, title_en, subtitle_hi, subtitle_en, category, question_count, question_ids, duration_minutes, reward_xp, badge_hi, badge_en, difficulty, color, icon, display_order)
VALUES ('quiz_unit_3', 'यूनिट 3: कोहा, SOUL 3.0 एवं पुस्तकालय स्वचालन', 'Unit 3: Koha, SOUL 3.0 & ICT Automation', 'ओपन-सोर्स ILS, INFLIBNET SOUL, बारकोड, RFID व OPAC', 'Open source ILS, INFLIBNET SOUL, Barcode, RFID & OPAC', 'automation', 5, '["q_auto_1","q_auto_2","q_auto_3","q_auto_4","q_auto_5"]'::jsonb, 4, 35, 'ICT & सॉफ्टवेयर', 'ICT & Software', 'medium', '#8B5CF6', 'cpu', 4)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  subtitle_hi = EXCLUDED.subtitle_hi,
  subtitle_en = EXCLUDED.subtitle_en,
  category = EXCLUDED.category,
  question_count = EXCLUDED.question_count,
  question_ids = EXCLUDED.question_ids,
  duration_minutes = EXCLUDED.duration_minutes,
  reward_xp = EXCLUDED.reward_xp,
  badge_hi = EXCLUDED.badge_hi,
  badge_en = EXCLUDED.badge_en,
  difficulty = EXCLUDED.difficulty,
  color = EXCLUDED.color,
  icon = EXCLUDED.icon,
  display_order = EXCLUDED.display_order;

INSERT INTO public.quizzes (id, title_hi, title_en, subtitle_hi, subtitle_en, category, question_count, question_ids, duration_minutes, reward_xp, badge_hi, badge_en, difficulty, color, icon, display_order)
VALUES ('quiz_unit_4', 'यूनिट 4: बिहार विशेष एवं ऐतिहासिक पुस्तकालय धरोहर', 'Unit 4: Bihar Heritage & State Libraries', 'नालंदा धर्मगंज, खुदा बख्श 1891, बिहार एक्ट 2008 व 1857 क्रांति', 'Nalanda Dharmaganja, Khuda Bakhsh 1891, Bihar Act 2008 & 1857', 'bihar_gk', 4, '["q_bihar_1","q_bihar_2","q_bihar_3","q_bihar_4"]'::jsonb, 4, 30, 'बिहार विशेष', 'Bihar Special', 'easy', '#F59E0B', 'library', 5)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  subtitle_hi = EXCLUDED.subtitle_hi,
  subtitle_en = EXCLUDED.subtitle_en,
  category = EXCLUDED.category,
  question_count = EXCLUDED.question_count,
  question_ids = EXCLUDED.question_ids,
  duration_minutes = EXCLUDED.duration_minutes,
  reward_xp = EXCLUDED.reward_xp,
  badge_hi = EXCLUDED.badge_hi,
  badge_en = EXCLUDED.badge_en,
  difficulty = EXCLUDED.difficulty,
  color = EXCLUDED.color,
  icon = EXCLUDED.icon,
  display_order = EXCLUDED.display_order;

INSERT INTO public.quizzes (id, title_hi, title_en, subtitle_hi, subtitle_en, category, question_count, question_ids, duration_minutes, reward_xp, badge_hi, badge_en, difficulty, color, icon, display_order)
VALUES ('quiz_unit_5', 'यूनिट 5: संदर्भ सेवाएं एवं सूचना स्रोत', 'Unit 5: Reference Services & Information Sources', 'CAS, SDI, प्राथमिक/द्वितीयक स्रोत, ब्रिटानिका व निर्देशिकाएं', 'CAS, SDI, Primary/Secondary Sources, Britannica & Directories', 'reference', 3, '["q_ref_1","q_ref_2","q_ref_3"]'::jsonb, 3, 30, 'संदर्भ स्रोत', 'Reference', 'medium', '#06B6D4', 'search', 6)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  subtitle_hi = EXCLUDED.subtitle_hi,
  subtitle_en = EXCLUDED.subtitle_en,
  category = EXCLUDED.category,
  question_count = EXCLUDED.question_count,
  question_ids = EXCLUDED.question_ids,
  duration_minutes = EXCLUDED.duration_minutes,
  reward_xp = EXCLUDED.reward_xp,
  badge_hi = EXCLUDED.badge_hi,
  badge_en = EXCLUDED.badge_en,
  difficulty = EXCLUDED.difficulty,
  color = EXCLUDED.color,
  icon = EXCLUDED.icon,
  display_order = EXCLUDED.display_order;

INSERT INTO public.quizzes (id, title_hi, title_en, subtitle_hi, subtitle_en, category, question_count, question_ids, duration_minutes, reward_xp, badge_hi, badge_en, difficulty, color, icon, display_order)
VALUES ('quiz_unit_6', 'यूनिट 6: पुस्तकालय प्रबंधन व संचालन', 'Unit 6: Library Management & Operations', 'POSDCORB, पुस्तक चयन (ड्रूरी/डेवी), ब्राउन/नेवार्क, ZBB बजट', 'POSDCORB, Book Selection, Browne/Newark, Zero-Based Budget', 'management', 4, '["q_mgmt_1","q_mgmt_2","q_mgmt_3","q_mgmt_4"]'::jsonb, 4, 35, 'प्रबंधन', 'Management', 'medium', '#EC4899', 'briefcase', 7)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  subtitle_hi = EXCLUDED.subtitle_hi,
  subtitle_en = EXCLUDED.subtitle_en,
  category = EXCLUDED.category,
  question_count = EXCLUDED.question_count,
  question_ids = EXCLUDED.question_ids,
  duration_minutes = EXCLUDED.duration_minutes,
  reward_xp = EXCLUDED.reward_xp,
  badge_hi = EXCLUDED.badge_hi,
  badge_en = EXCLUDED.badge_en,
  difficulty = EXCLUDED.difficulty,
  color = EXCLUDED.color,
  icon = EXCLUDED.icon,
  display_order = EXCLUDED.display_order;

INSERT INTO public.quizzes (id, title_hi, title_en, subtitle_hi, subtitle_en, category, question_count, question_ids, duration_minutes, reward_xp, badge_hi, badge_en, difficulty, color, icon, display_order)
VALUES ('quiz_unit_7', 'यूनिट 7: शिक्षण अभिरुचि एवं पठन संस्कृति', 'Unit 7: Teaching Aptitude & Reading Culture', 'सूचना साक्षरता (पॉल ज़ुरकोव्स्की), NEP 2020, बुक क्लब व शिक्षाशास्त्र', 'Information Literacy, NEP 2020, Book clubs & Pedagogy', 'teaching', 2, '["q_teach_1","q_teach_2"]'::jsonb, 3, 25, 'शिक्षण कला', 'Teaching Art', 'easy', '#14B8A6', 'school', 8)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  subtitle_hi = EXCLUDED.subtitle_hi,
  subtitle_en = EXCLUDED.subtitle_en,
  category = EXCLUDED.category,
  question_count = EXCLUDED.question_count,
  question_ids = EXCLUDED.question_ids,
  duration_minutes = EXCLUDED.duration_minutes,
  reward_xp = EXCLUDED.reward_xp,
  badge_hi = EXCLUDED.badge_hi,
  badge_en = EXCLUDED.badge_en,
  difficulty = EXCLUDED.difficulty,
  color = EXCLUDED.color,
  icon = EXCLUDED.icon,
  display_order = EXCLUDED.display_order;

INSERT INTO public.quizzes (id, title_hi, title_en, subtitle_hi, subtitle_en, category, question_count, question_ids, duration_minutes, reward_xp, badge_hi, badge_en, difficulty, color, icon, display_order)
VALUES ('quiz_rapid_fire', 'रैपिड फायर स्पीड क्विज़ (Rapid Fire Run)', 'Rapid Fire 15-Question Speed Run', '15 मिश्रित प्रश्न • 5 मिनट टाइमर • अपनी गति एवं सटीकता जांचें', '15 Mixed syllabus questions • 5-min timer • Speed test', 'rapid_fire', 15, '["q_lis_1","q_lis_2","q_lis_3","q_lis_4","q_lis_6","q_cat_1","q_cat_2","q_cat_3","q_cat_5","q_auto_1","q_auto_2","q_bihar_1","q_bihar_2","q_ref_1","q_mgmt_1"]'::jsonb, 5, 60, 'स्पीड रन ⚡', 'Speed Run ⚡', 'hard', '#D946EF', 'speedometer', 9)
ON CONFLICT (id) DO UPDATE SET
  title_hi = EXCLUDED.title_hi,
  title_en = EXCLUDED.title_en,
  subtitle_hi = EXCLUDED.subtitle_hi,
  subtitle_en = EXCLUDED.subtitle_en,
  category = EXCLUDED.category,
  question_count = EXCLUDED.question_count,
  question_ids = EXCLUDED.question_ids,
  duration_minutes = EXCLUDED.duration_minutes,
  reward_xp = EXCLUDED.reward_xp,
  badge_hi = EXCLUDED.badge_hi,
  badge_en = EXCLUDED.badge_en,
  difficulty = EXCLUDED.difficulty,
  color = EXCLUDED.color,
  icon = EXCLUDED.icon,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_1', 'पुस्तकालय विज्ञान के आधार', 'LIS Foundations', 'lis_foundations', 'भारत में पुस्तकालय विज्ञान के जनक', 'Father of LIS in India', 'डॉ. एस.आर. रंगनाथन (1892-1972) को भारत में पुस्तकालय विज्ञान का जनक कहा जाता है। प्रतिवर्ष 12 अगस्त को राष्ट्रीय लाइब्रेरियन दिवस मनाया जाता है।', 'Dr. S.R. Ranganathan (1892-1972) is known as the Father of Library Science in India. National Librarians Day is celebrated on August 12.', 'BPSC PYQ', TRUE, 1)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_2', 'पुस्तकालय विज्ञान के आधार', 'LIS Foundations', 'lis_foundations', 'पुस्तकालय विज्ञान के 5 सूत्र', 'Five Laws Formulation', 'पांच सूत्रों का प्रतिपादन 1928 में मीनाक्षी कॉलेज (अन्नामलाई नगर) में हुआ और पुस्तक 1931 में मद्रास लाइब्रेरी एसोसिएशन द्वारा प्रकाशित हुई।', 'The Five Laws were formulated in 1928 at Meenakshi College and published as a book in 1931 by Madras Library Association.', '100% Exam Point', TRUE, 2)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_3', 'पुस्तकालय विज्ञान के आधार', 'LIS Foundations', 'lis_foundations', 'प्रथम सूत्र का निहितार्थ', 'First Law Implication', '"पुस्तकें उपयोग के लिए हैं" (Books are for use) - यह सूत्र खुली प्रवेश प्रणाली (Open Access) एवं पुस्तकालय के केंद्रीय स्थान पर बल देता है।', '"Books are for use" emphasizes the Open Access system, central location, and convenient library working hours.', 'Core Concept', FALSE, 3)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_4', 'पुस्तकालय विज्ञान के आधार', 'LIS Foundations', 'lis_foundations', 'द्वितीय सूत्र एवं राज्य का कर्तव्य', 'Second Law & State Duty', '"प्रत्येक पाठक को उसकी पुस्तक मिले" - यह सूत्र अनिवार्य पुस्तकालय विधान (Library Legislation) एवं सभी वर्गों के लिए सेवा पर बल देता है।', '"Every reader his/her book" stresses state responsibility for enacting library legislation and serving all citizen groups.', 'High Yield', FALSE, 4)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_5', 'पुस्तकालय विज्ञान के आधार', 'LIS Foundations', 'lis_foundations', 'तृतीय सूत्र एवं पुस्तक प्रदर्शन', 'Third Law & Book Display', '"प्रत्येक पुस्तक को उसका पाठक मिले" - यह सूत्र नवीन पुस्तकों के आकर्षक प्रदर्शन, ओपन शेल्फ एवं संदर्भ सेवा का समर्थन करता है।', '"Every book its reader" advocates attractive display of newly added books, open shelves, and subject analytics.', 'Exam Note', FALSE, 5)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_6', 'पुस्तकालय विज्ञान के आधार', 'LIS Foundations', 'lis_foundations', 'चतुर्थ सूत्र एवं समय बचत', 'Fourth Law & Time Saving', '"पाठक का समय बचाएं" - यह सूत्र वैज्ञानिक वर्गीकरण, कैटलॉगिंग, त्वरित निर्गम-आगम (Issue-Return) एवं कंप्यूटरीकरण से संबंधित है।', '"Save the time of the reader" relates to scientific classification, cataloguing, fast issue-return, and library automation.', 'Repeated', FALSE, 6)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_7', 'पुस्तकालय विज्ञान के आधार', 'LIS Foundations', 'lis_foundations', 'पंचम सूत्र एवं वीपिंग आउट', 'Fifth Law & Weeding Out', '"पुस्तकालय एक वर्धनशील संस्था है" - अनुपयोगी एवं जीर्ण-शीर्ण पुस्तकों की छंटाई (Weeding Out) इसी सूत्र का प्रत्यक्ष अंग है।', '"Library is a growing organism" encompasses collection growth, space expansion, and weeding out of obsolete books.', 'BPSC PYQ', TRUE, 7)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_8', 'पुस्तकालय विज्ञान के आधार', 'LIS Foundations', 'lis_foundations', 'भारत का प्रथम पुस्तकालय अधिनियम', 'First Library Act in India', 'भारत में प्रथम सार्वजनिक पुस्तकालय अधिनियम मद्रास (तमिलनाडु) में वर्ष 1948 में पारित किया गया था।', 'The first Public Library Act in India was enacted in Madras (Tamil Nadu) in the year 1948.', '100% Exam Point', TRUE, 8)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_9', 'पुस्तकालय विज्ञान के आधार', 'LIS Foundations', 'lis_foundations', 'पुस्तकालय उपकर लगाने वाले राज्य', 'Library Cess States', 'तमिलनाडु, आंध्र प्रदेश, कर्नाटक, केरल और हरियाणा राज्यों में पुस्तकालय उपकर (Cess) का कानूनी प्रावधान है।', 'Library Cess is statutorily levied in Tamil Nadu, Andhra Pradesh, Karnataka, Kerala, and Haryana.', 'High Yield', FALSE, 9)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_10', 'पुस्तकालय विज्ञान के आधार', 'LIS Foundations', 'lis_foundations', 'RRRLF की स्थापना एवं मुख्यालय', 'RRRLF Establishment', 'राजा राममोहन राय पुस्तकालय प्रतिष्ठान (RRRLF) की स्थापना मई 1972 में हुई। इसका मुख्यालय साल्ट लेक, कोलकाता में स्थित है।', 'Raja Rammohun Roy Library Foundation (RRRLF) was established in May 1972 with headquarters in Salt Lake, Kolkata.', 'BPSC PYQ', TRUE, 10)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_11', 'पुस्तकालय विज्ञान के आधार', 'LIS Foundations', 'lis_foundations', 'ILA एवं IFLA स्थापना वर्ष', 'ILA & IFLA Years', 'IFLA की स्थापना 1927 (द हेग, नीदरलैंड्स) एवं ILA (भारतीय पुस्तकालय संघ) की स्थापना 13 सितंबर 1933 (नई दिल्ली) में हुई थी।', 'IFLA was founded in 1927 (The Hague, Netherlands) and ILA (Indian Library Association) on 13 September 1933 (New Delhi).', 'Must Read', FALSE, 11)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_12', 'वर्गीकरण एवं सूचीकरण', 'Classification & Cataloguing', 'classification_cataloguing', 'DDC के प्रवर्तक एवं प्रथम वर्ष', 'DDC Founder & Year', 'डेवी दशमलव वर्गीकरण (DDC) का आविष्कार मेलविल डेवी द्वारा 1876 में किया गया था। प्रथम संस्करण में केवल 44 पृष्ठ थे।', 'Dewey Decimal Classification (DDC) was created by Melvil Dewey in 1876. The first edition had only 44 pages.', '100% Exam Point', TRUE, 12)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_13', 'वर्गीकरण एवं सूचीकरण', 'Classification & Cataloguing', 'classification_cataloguing', 'DDC के 10 मुख्य वर्ग', 'DDC 10 Main Classes', '000-कंप्यूटर/सामान्य, 100-दर्शन, 200-धर्म, 300-समाज विज्ञान, 400-भाषा, 500-शुद्ध विज्ञान, 600-प्रौद्योगिकी, 700-कला, 800-साहित्य, 900-इतिहास व भूगोल।', '000-Generalities, 100-Philosophy, 200-Religion, 300-Social Sci, 400-Language, 500-Pure Sci, 600-Tech, 700-Arts, 800-Literature, 900-History/Geo.', 'Repeated', TRUE, 13)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_14', 'वर्गीकरण एवं सूचीकरण', 'Classification & Cataloguing', 'classification_cataloguing', 'कोलन वर्गीकरण (CC) एवं संस्करण', 'Colon Classification Edition', 'CC का निर्माण डॉ. रंगनाथन द्वारा 1933 में किया गया। इसका 6वां संस्करण 1960 में तथा 7वां संस्करण 1987 (एम.ए. गोपीनाथ द्वारा) आया।', 'CC was developed by Dr. Ranganathan in 1933. The 6th edition appeared in 1960 and the 7th edition in 1987 (edited by M.A. Gopinath).', 'BPSC PYQ', FALSE, 14)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_15', 'वर्गीकरण एवं सूचीकरण', 'Classification & Cataloguing', 'classification_cataloguing', 'PMEST के योजक चिह्न', 'PMEST Connecting Symbols', 'Personality ( , ), Matter ( ; ), Energy ( : ), Space ( . ), Time ( '' )। टाइम हेतु सिंगल इनवर्टेड कॉमा 1963 से लागू हुआ।', 'Personality ( , ), Matter ( ; ), Energy ( : ), Space ( . ), Time ( '' ). Single quote for Time was introduced in 1963 reprint.', 'High Yield', TRUE, 15)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_16', 'वर्गीकरण एवं सूचीकरण', 'Classification & Cataloguing', 'classification_cataloguing', 'CCC (Classified Catalogue Code)', 'CCC Origin', 'CCC का प्रथम संस्करण डॉ. एस.आर. रंगनाथन द्वारा 1934 में तैयार किया गया था। यह भारत का पहला वर्गीकृत सूचीकरण कोड था।', 'Classified Catalogue Code (CCC) 1st edition was published by Dr. S.R. Ranganathan in 1934, India’s first classified catalogue code.', 'Exam Special', FALSE, 16)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_17', 'वर्गीकरण एवं सूचीकरण', 'Classification & Cataloguing', 'classification_cataloguing', 'AACR-2 एवं RDA', 'AACR-2 & RDA', 'AACR-2 वर्ष 1978 में प्रकाशित हुआ (संशोधित 1988 व 1998)। AACR-2 का आधुनिक उत्तराधिकारी RDA (Resource Description and Access - 2010) है।', 'AACR-2 was published in 1978 (revised 1988, 1998). RDA (Resource Description and Access, 2010) is the modern successor to AACR-2.', 'Core Concept', FALSE, 17)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_18', 'वर्गीकरण एवं सूचीकरण', 'Classification & Cataloguing', 'classification_cataloguing', 'ISBN एवं ISSN के कुल अंक', 'ISBN & ISSN Digits', 'ISBN में कुल 13 अंक होते हैं (1 जनवरी 2007 से पूर्व 10 अंक थे)। ISSN में कुल 8 अंक होते हैं जो पत्र-पत्रिकाओं हेतु प्रयुक्त होते हैं।', 'ISBN consists of 13 digits (10 digits prior to Jan 1, 2007). ISSN consists of 8 digits used for serials and periodicals.', '100% Exam Point', TRUE, 18)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_19', 'वर्गीकरण एवं सूचीकरण', 'Classification & Cataloguing', 'classification_cataloguing', 'भारत में ISBN जारीकर्ता एजेंसी', 'ISBN Agency India', 'भारत में राजा राममोहन राय राष्ट्रीय ISBN एजेंसी (नई दिल्ली, शिक्षा मंत्रालय के अधीन) ISBN संख्या आवंटित करती है।', 'In India, the Raja Rammohun Roy National Agency for ISBN (New Delhi, Ministry of Education) assigns ISBN numbers.', 'BPSC PYQ', FALSE, 19)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_20', 'वर्गीकरण एवं सूचीकरण', 'Classification & Cataloguing', 'classification_cataloguing', 'MARC 21 मानक', 'MARC 21 Standard', 'MARC (Machine Readable Cataloging) का विकास हेनरीट अवराम द्वारा लाइब्रेरी ऑफ कांग्रेस (LC) में 1960 के दशक में किया गया था।', 'MARC was developed by Henriette Avram at the Library of Congress (LC) in the 1960s for machine-readable cataloguing.', 'High Yield', FALSE, 20)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_21', 'पुस्तकालय स्वचालन व तकनीक', 'Automation & ICT', 'automation_ict', 'कोहा (Koha) का उद्भव', 'Koha Origin', 'कोहा विश्व का प्रथम ओपन-सोर्स ILS है, जिसे 1999 में न्यूजीलैंड के हॉरोव्हेनुआ ट्रस्ट हेतु कातिपो कम्युनिकेशंस द्वारा पर्ल भाषा में बनाया गया।', 'Koha is the worlds first open-source ILS, developed in 1999 in New Zealand by Katipo Communications using Perl.', '100% Exam Point', TRUE, 21)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_22', 'पुस्तकालय स्वचालन व तकनीक', 'Automation & ICT', 'automation_ict', 'SOUL सॉफ्टवेयर एवं INFLIBNET', 'SOUL by INFLIBNET', 'SOUL सॉफ्टवेयर का विकास INFLIBNET गांधीनगर द्वारा किया गया है। नवीनतम क्लाउड संस्करण SOUL 3.0 फरवरी 2021 में जारी हुआ।', 'SOUL was developed by INFLIBNET Centre, Gandhinagar. The latest cloud-ready SOUL 3.0 was released in February 2021.', 'BPSC PYQ', TRUE, 22)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_23', 'पुस्तकालय स्वचालन व तकनीक', 'Automation & ICT', 'automation_ict', 'ई-ग्रंथालय (e-Granthalaya)', 'e-Granthalaya Platform', 'ई-ग्रंथालय राष्ट्रीय सूचना विज्ञान केंद्र (NIC), भारत सरकार द्वारा सरकारी एवं विद्यालय पुस्तकालयों हेतु विकसित क्लाउड सॉफ्टवेयर है।', 'e-Granthalaya is a cloud-based library automation platform developed by National Informatics Centre (NIC) for schools.', 'High Yield', FALSE, 23)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_24', 'पुस्तकालय स्वचालन व तकनीक', 'Automation & ICT', 'automation_ict', 'RFID तकनीक एवं लाभ', 'RFID Technology', 'RFID (Radio Frequency Identification) तकनीक में माइक्रोचिप और एंटीना का उपयोग होता है, जिससे बिना लाइन ऑफ साइट तीव्र स्टॉक सत्यापन होता है।', 'RFID uses microchip and antenna for automated circulation, anti-theft security, and high-speed inventory verification.', 'Core Concept', FALSE, 24)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_25', 'पुस्तकालय स्वचालन व तकनीक', 'Automation & ICT', 'automation_ict', 'OPAC एवं Web-OPAC', 'OPAC Definition', 'OPAC का पूर्ण रूप "Online Public Access Catalogue" है। जब यह इंटरनेट ब्राउज़र के माध्यम से उपलब्ध होता है तो Web-OPAC कहलाता है।', 'OPAC stands for Online Public Access Catalogue. When accessible globally over internet browsers, it is termed Web-OPAC.', 'Exam Note', FALSE, 25)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_26', 'पुस्तकालय स्वचालन व तकनीक', 'Automation & ICT', 'automation_ict', 'डिजिटल रिपॉजिटरी सॉफ्टवेयर', 'Digital Repositories', 'DSpace (MIT व HP द्वारा 2002) एवं Greenstone (GSDL, न्यूजीलैंड) संस्थागत डिजिटल रिपॉजिटरी और ई-लाइब्रेरी बनाने के प्रमुख सॉफ्टवेयर हैं।', 'DSpace (MIT & HP, 2002) and Greenstone (GSDL, New Zealand) are leading open-source digital repository platforms.', 'High Yield', FALSE, 26)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_27', 'पुस्तकालय स्वचालन व तकनीक', 'Automation & ICT', 'automation_ict', 'Z39.50 प्रोटोकॉल', 'Z39.50 Protocol', 'Z39.50 एक अंतर्राष्ट्रीय क्लाइंट-सर्वर संचार मानक है जिसका उपयोग विभिन्न पुस्तकालयों के कैटलॉग डेटाबेस खोजने व कॉपी करने हेतु होता है।', 'Z39.50 is an international client-server protocol used for searching and retrieving bibliographic records across heterogeneous catalogues.', 'Repeated', FALSE, 27)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_28', 'बिहार विशेष एवं पुस्तकालय धरोहर', 'Bihar Special & Heritage', 'bihar_special', 'नालंदा विश्वविद्यालय का पुस्तकालय परिसर', 'Nalanda Dharmaganja', 'प्राचीन नालंदा विश्वविद्यालय के विशाल पुस्तकालय परिसर का नाम "धर्मगंज" (सत्य का पर्वत) था।', 'The legendary library campus of ancient Nalanda University was known as "Dharmaganja" (Mountain of Truth).', '100% Exam Point', TRUE, 28)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_29', 'बिहार विशेष एवं पुस्तकालय धरोहर', 'Bihar Special & Heritage', 'bihar_special', 'धर्मगंज के तीन भव्य भवन', 'Three Buildings of Dharmaganja', 'धर्मगंज में 3 मुख्य भवन थे: रत्नसागर, रत्नोदधि (9 मंजिला मुख्य भवन), और रत्नरंजक। 1193 ई. में बख्तियार खिलजी ने इसे नष्ट किया था।', 'Dharmaganja comprised 3 buildings: Ratnasagara, Ratnodadhi (9-storey central building), and Ratnaranjaka. Destroyed in 1193 CE by Khilji.', 'BPSC PYQ', TRUE, 29)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_30', 'बिहार विशेष एवं पुस्तकालय धरोहर', 'Bihar Special & Heritage', 'bihar_special', 'खुदा बख्श ओरिएंटल पब्लिक लाइब्रेरी', 'Khuda Bakhsh Library', 'पटना में स्थित खुदा बख्श लाइब्रेरी 29 अक्टूबर 1891 को खुली। 1969 में संसद के अधिनियम द्वारा इसे "राष्ट्रीय महत्व का संस्थान" घोषित किया गया।', 'Khuda Bakhsh Library Patna was opened on Oct 29, 1891 and declared an "Institution of National Importance" by Parliament in 1969.', '100% Exam Point', TRUE, 30)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_31', 'बिहार विशेष एवं पुस्तकालय धरोहर', 'Bihar Special & Heritage', 'bihar_special', 'सिन्हा लाइब्रेरी (स्टेट सेंट्रल लाइब्रेरी)', 'Sinha Library Patna', 'सिन्हा लाइब्रेरी की स्थापना 1924 में डॉ. सच्चिदानंद सिन्हा द्वारा की गई। यह वर्तमान में बिहार राज्य की "स्टेट सेंट्रल लाइब्रेरी" है।', 'Sinha Library was founded in 1924 by Dr. Sachchidananda Sinha and officially serves as the State Central Library of Bihar.', 'BPSC PYQ', TRUE, 31)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_32', 'बिहार विशेष एवं पुस्तकालय धरोहर', 'Bihar Special & Heritage', 'bihar_special', 'बिहार राज्य पुस्तकालय अधिनियम', 'Bihar Library Act', '"बिहार राज्य सार्वजनिक पुस्तकालय एवं सूचना केंद्र अधिनियम" वर्ष 2008 में बिहार विधानसभा द्वारा पारित किया गया था।', 'The "Bihar State Public Library and Information Centre Act" was enacted by the Bihar Legislative Assembly in 2008.', '100% Exam Point', TRUE, 32)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_33', 'बिहार विशेष एवं पुस्तकालय धरोहर', 'Bihar Special & Heritage', 'bihar_special', 'विक्रमशिला विश्वविद्यालय पुस्तकालय', 'Vikramashila Library', 'भागलपुर के अंतीचक में स्थित विक्रमशिला विश्वविद्यालय की स्थापना पाल वंशीय शासक धर्मपाल ने 8वीं शताब्दी में की थी।', 'Vikramashila University library at Antichak, Bhagalpur was established in the 8th century by Pala ruler Dharmapala.', 'Bihar GK', FALSE, 33)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_34', 'बिहार विशेष एवं पुस्तकालय धरोहर', 'Bihar Special & Heritage', 'bihar_special', '1857 क्रांति में बिहार के नायक', '1857 Revolt Bihar Hero', '1857 के प्रथम स्वतंत्रता संग्राम में बिहार का नेतृत्व जगदीशपुर (भोजपुर) के वीर कुंवर सिंह ने 80 वर्ष की आयु में किया था।', 'Veer Kunwar Singh of Jagdishpur (Bhojpur) led the 1857 First War of Independence in Bihar at the age of 80.', 'High Yield', FALSE, 34)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_35', 'संदर्भ सेवाएं व सूचना स्रोत', 'Reference & Information', 'reference_sources', 'सूचना स्रोतों के तीन स्तर', 'Three Tiers of Sources', 'सी.डब्ल्यू. हैनसन और डेनिस ग्रोगन ने स्रोतों को तीन श्रेणियों में बांटा: प्राथमिक (शोध पत्र), द्वितीयक (पाठ्यपुस्तकें, ग्रंथसूची), तृतीयक (निर्देशिकाएं, वर्षगांठ)।', 'Hanson and Grogan categorized sources into: Primary (theses, research papers), Secondary (textbooks, bibliographies), Tertiary (directories, yearbooks).', 'Core Concept', TRUE, 35)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_36', 'संदर्भ सेवाएं व सूचना स्रोत', 'Reference & Information', 'reference_sources', 'CAS एवं SDI में अंतर', 'CAS vs SDI', 'CAS (Current Awareness Service) सभी सामान्य उपयोगकर्ताओं हेतु होती है, जबकि SDI (Selective Dissemination of Information) व्यक्तिगत रुचि प्रोफाइल पर आधारित होती है।', 'CAS is a generalized current notification service, whereas SDI is personalized dissemination matched against user interest profiles.', 'BPSC PYQ', TRUE, 36)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_37', 'संदर्भ सेवाएं व सूचना स्रोत', 'Reference & Information', 'reference_sources', 'SDI के जनक', 'Father of SDI', 'चयनात्मक सूचना प्रसार (SDI) प्रणाली की अवधारणा 1958 में हैंस पीटर लूहान (H.P. Luhn, IBM) द्वारा प्रतिपादित की गई थी।', 'The concept of Selective Dissemination of Information (SDI) was pioneered in 1958 by Hans Peter Luhn of IBM.', 'Repeated', FALSE, 37)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_38', 'संदर्भ सेवाएं व सूचना स्रोत', 'Reference & Information', 'reference_sources', 'तत्काल बनाम दीर्घकालीन संदर्भ सेवा', 'Ready vs Long-Range Reference', 'रंगनाथन के अनुसार, जो संदर्भ सेवा 5-30 मिनट में संदर्भ पुस्तकों से दी जाए वह "Ready Reference", और जो विस्तृत खोज मांगे वह "Long Range Reference" है।', 'Per Ranganathan, answers provided within 5-30 minutes are "Ready Reference", while extended multi-source inquiries are "Long Range Reference".', 'High Yield', FALSE, 38)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_39', 'संदर्भ सेवाएं व सूचना स्रोत', 'Reference & Information', 'reference_sources', 'इनसाइक्लोपीडिया ब्रिटानिका', 'Encyclopaedia Britannica', 'इनसाइक्लोपीडिया ब्रिटानिका का प्रथम संस्करण 1768 में एडिनबर्ग (स्कॉटलैंड) में प्रकाशित हुआ था। 2012 से इसका मुद्रित प्रकाशन बंद हो गया।', 'The first edition of Encyclopaedia Britannica was published in 1768 in Edinburgh, Scotland. Print editions ceased in 2012.', 'Exam Note', FALSE, 39)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_40', 'संदर्भ सेवाएं व सूचना स्रोत', 'Reference & Information', 'reference_sources', 'राष्ट्रीय ग्रंथसूची (INB)', 'Indian National Bibliography', 'इंडियन नेशनल बिबलियोग्राफी (INB) का प्रकाशन केंद्रीय संदर्भ पुस्तकालय (CRL), कोलकाता द्वारा 1957 से किया जा रहा है।', 'Indian National Bibliography (INB) has been published by Central Reference Library (CRL), Kolkata since 1957 under Delivery of Books Act.', 'BPSC PYQ', TRUE, 40)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_41', 'प्रबंधन व तकनीक', 'Management & Technical', 'library_management', 'POSDCORB सूत्र के प्रतिपादक', 'POSDCORB Formula', 'प्रबंधन के सात कार्यों का सूत्र POSDCORB (Planning, Organizing, Staffing, Directing, Coordinating, Reporting, Budgeting) लूथर गुलिक व उर्विक ने दिया।', 'POSDCORB (Planning, Organizing, Staffing, Directing, Coordinating, Reporting, Budgeting) was coined by Luther Gulick and Lyndall Urwick.', '100% Exam Point', TRUE, 41)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_42', 'प्रबंधन व तकनीक', 'Management & Technical', 'library_management', 'प्रबंधन के 14 सिद्धांत', '14 Principles of Management', 'प्रशासनिक प्रबंधन के 14 मूलभूत सिद्धांतों का प्रतिपादन फ्रांसीसी खनन इंजीनियर हेनरी फेयोल (Henri Fayol) ने किया था।', 'The 14 fundamental principles of administrative management were established by French engineer Henri Fayol.', 'Repeated', FALSE, 42)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_43', 'प्रबंधन व तकनीक', 'Management & Technical', 'library_management', 'पुस्तक चयन के नियम', 'Book Selection Principles', 'मेलविल डेवी: "कम से कम लागत में सर्वोत्तम पाठक हेतु सर्वोत्तम पुस्तक"। ड्रूरी (1930): "उचित समय पर उचित पाठक को उचित पुस्तक प्रदान करना"।', 'Melvil Dewey: "Best reading for largest number at least cost". Drury (1930): "To provide the right book to the right reader at the right time".', 'BPSC PYQ', TRUE, 43)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_44', 'प्रबंधन व तकनीक', 'Management & Technical', 'library_management', 'ब्राउन परिसंचरण प्रणाली', 'Browne Issue System', 'ब्राउन इशू प्रणाली का आविष्कार नीना ई. ब्राउन (बोस्टन) द्वारा 1895 में किया गया था। इसमें रीडर टिकट एवं बुक पॉकेट का प्रयोग होता है।', 'Browne Issue System was devised by Nina E. Browne in 1895 using reader tickets and book pockets without ledger entries.', 'High Yield', TRUE, 44)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_45', 'प्रबंधन व तकनीक', 'Management & Technical', 'library_management', 'नेवार्क परिसंचरण प्रणाली', 'Newark Issue System', 'नेवार्क चार्जिंग सिस्टम का विकास जॉन कॉटन डाना (नेवार्क पब्लिक लाइब्रेरी, यूएसए) द्वारा 1900 में किया गया था।', 'Newark Charging System was developed by John Cotton Dana at Newark Public Library, USA in 1900.', 'Exam Special', FALSE, 45)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_46', 'प्रबंधन व तकनीक', 'Management & Technical', 'library_management', 'शून्य आधारित बजट (ZBB)', 'Zero-Based Budgeting', 'जीरो-बेस्ड बजटिंग (ZBB) तकनीक का प्रतिपादन पीटर प्यर (Peter Phyrr) ने 1970 में किया। इसमें प्रत्येक वित्तीय वर्ष नए सिरे से शून्य से शुरू होता है।', 'Zero-Based Budgeting (ZBB) was developed by Peter Pyhrr in 1970, requiring every expense to be justified afresh from a zero base.', 'BPSC PYQ', TRUE, 46)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_47', 'प्रबंधन व तकनीक', 'Management & Technical', 'library_management', 'स्टॉक सत्यापन नियम (GFR 2017)', 'Stock Verification Rules', 'सामान्य वित्तीय नियम (GFR) के अनुसार, 20,000 तक की पुस्तकों वाले पुस्तकालय में प्रतिवर्ष 100% भौतिक सत्यापन होना चाहिए। प्रति 1000 निर्गमित पर 5 पुस्तकों का नुकसान स्वीकार्य है।', 'Per GFR 2017, libraries with up to 20,000 volumes require annual 100% verification. Loss of 5 volumes per 1,000 issued/consulted is deemed permissible.', 'Must Read', FALSE, 47)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_48', 'शिक्षण अभिरुचि व शिक्षाशास्त्र', 'Teaching Aptitude', 'teaching_aptitude', 'सूचना साक्षरता शब्द के जनक', 'Information Literacy Origin', '"सूचना साक्षरता" (Information Literacy) शब्द का सर्वप्रथम प्रयोग 1974 में पॉल ज़ुरकोव्स्की (Paul Zurkowski) ने किया था।', 'The term "Information Literacy" was first introduced in 1974 by Paul Zurkowski, President of the Information Industry Association.', '100% Exam Point', TRUE, 48)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_49', 'शिक्षण अभिरुचि व शिक्षाशास्त्र', 'Teaching Aptitude', 'teaching_aptitude', 'NEP 2020 एवं स्कूल लाइब्रेरी', 'NEP 2020 Library Role', 'राष्ट्रीय शिक्षा नीति 2020 विद्यालय पुस्तकालयों को रटने के स्थान पर महत्वपूर्ण सोच, डिजिटल साक्षरता और आनंददायी पठन संस्कृति का केंद्र मानती है।', 'NEP 2020 envisions school libraries as active community learning hubs fostering critical inquiry, joyful reading, and digital literacy.', 'High Yield', TRUE, 49)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

INSERT INTO public.one_liners (id, category_hi, category_en, category_key, topic_hi, topic_en, statement_hi, statement_en, tag, is_important, display_order)
VALUES ('ol_50', 'शिक्षण अभिरुचि व शिक्षाशास्त्र', 'Teaching Aptitude', 'teaching_aptitude', 'ब्लूम टैक्सोनॉमी (संज्ञानात्मक क्षेत्र)', 'Blooms Taxonomy', 'बेंजामिन ब्लूम (1956) के संज्ञानात्मक पदानुक्रम के 6 स्तर हैं: ज्ञान (Knowledge), समझ (Comprehension), अनुप्रयोग (Application), विश्लेषण, संश्लेषण एवं मूल्यांकन।', 'Benjamin Blooms 6 cognitive levels (1956) are: Knowledge, Comprehension, Application, Analysis, Synthesis, and Evaluation.', 'Repeated', FALSE, 50)
ON CONFLICT (id) DO UPDATE SET
  category_hi = EXCLUDED.category_hi,
  category_en = EXCLUDED.category_en,
  category_key = EXCLUDED.category_key,
  topic_hi = EXCLUDED.topic_hi,
  topic_en = EXCLUDED.topic_en,
  statement_hi = EXCLUDED.statement_hi,
  statement_en = EXCLUDED.statement_en,
  tag = EXCLUDED.tag,
  is_important = EXCLUDED.is_important,
  display_order = EXCLUDED.display_order;

