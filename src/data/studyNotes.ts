import { StudyUnit } from '../types';

export const STUDY_UNITS: StudyUnit[] = [
  {
    id: 'unit_1',
    unitNumber: 1,
    title: {
      hi: 'यूनिट 1: पुस्तकालय विज्ञान के आधार एवं रंगनाथन के 5 नियम',
      en: 'Unit 1: Foundations of Library Science & 5 Laws'
    },
    shortDesc: {
      hi: 'पुस्तकालय विज्ञान के जनक, 5 सूत्र, पुस्तकालय अधिनियम, ILA, IFLA एवं RRRLF',
      en: 'Father of LIS, 5 Laws, Library Legislation, ILA, IFLA & RRRLF'
    },
    iconName: 'book',
    topics: [
      {
        id: 't_laws',
        title: {
          hi: 'डॉ. एस.आर. रंगनाथन एवं पुस्तकालय विज्ञान के पांच सूत्र',
          en: 'Dr. S.R. Ranganathan & The Five Laws of Library Science'
        },
        content: {
          hi: `डॉ. शियाली रामामृत रंगनाथन (12 अगस्त 1892 - 27 सितंबर 1972) को भारत में "पुस्तकालय विज्ञान का जनक" (Father of Library Science in India) कहा जाता है। 12 अगस्त को प्रतिवर्ष भारत में "राष्ट्रीय पुस्तकालय दिवस" (National Librarians Day) मनाया जाता है।

1. प्रथम सूत्र: पुस्तकें उपयोग के लिए हैं (Books are for use)
- निहितार्थ: पुस्तकालय का स्थान शहर के केंद्र में होना चाहिए। पुस्तकालय खुलने का समय सुविधाजनक हो। मुक्त प्रवेश प्रणाली (Open Access System) को अपनाना।

2. द्वितीय सूत्र: प्रत्येक पाठक को उसकी पुस्तक मिले (Every reader his/her book)
- निहितार्थ: पुस्तकालय सभी वर्गों (दृष्टिबाधित, ग्रामीण, बाल, वृद्ध) के लिए सुलभ हो। राज्य का कर्तव्य है कि वह पुस्तकालय कानून बनाए।

3. तृतीय सूत्र: प्रत्येक पुस्तक को उसका पाठक मिले (Every book its reader)
- निहितार्थ: खुली प्रवेश प्रणाली, पुस्तकों का आकर्षक प्रदर्शन (Display of new arrivals), सुव्यवस्थित सूचीकरण (Classified Catalogue)।

4. चतुर्थ सूत्र: पाठक का समय बचाएं (Save the time of the reader)
- निहितार्थ: त्वरित निर्गम-आगम प्रणाली (Browne/Newark), कुशल संदर्भ सेवा (Reference Service), पुस्तकालय स्वचालन एवं कंप्यूटरीकरण।

5. पंचम सूत्र: पुस्तकालय एक वर्धनशील संस्था है (Library is a growing organism)
- निहितार्थ: संग्रह, पाठक एवं भवन में निरंतर जैविक वृद्धि। अनुपयोगी एवं पुरानी पुस्तकों की छंटाई (Weeding Out) इसी नियम के अंतर्गत आती है।`,
          en: `Dr. Shiyali Ramamrita Ranganathan (12 August 1892 - 27 September 1972) is universally acknowledged as the Father of Library Science in India. August 12 is celebrated annually as National Librarians Day.

1. First Law: Books are for use
- Open access system, central location of library, convenient library hours, comfortable furniture.

2. Second Law: Every reader his/her book
- Democratization of library access for all demographics (children, visually impaired, rural citizens), mandatory library legislation by states.

3. Third Law: Every book its reader
- Open shelves, dynamic display of new books, analytical cataloguing entries to bring hidden books into active circulation.

4. Fourth Law: Save the time of the reader
- Fast circulation systems (Browne/Newark/RFID), automated OPAC searching, well-trained reference librarians.

5. Fifth Law: Library is a growing organism
- Biological growth in book collection, staff, and users. Weeding out obsolete materials to maintain collection freshness.`
        },
        keyPoints: [
          { hi: 'सूत्रों का प्रतिपादन: 1928 (मीनाक्षी कॉलेज, अन्नामलाई नगर)', en: 'Formulation of Laws: 1928 (Meenakshi College)' },
          { hi: 'पुस्तक प्रकाशन: 1931 (मद्रास लाइब्रेरी एसोसिएशन द्वारा)', en: 'Book Published: 1931 (by Madras Library Association)' },
          { hi: 'राष्ट्रीय लाइब्रेरियन दिवस: 12 अगस्त (रंगनाथन जयंती)', en: 'National Librarians Day: August 12' }
        ]
      },
      {
        id: 't_legislation',
        title: {
          hi: 'भारत में पुस्तकालय विधान (Library Legislation in India)',
          en: 'Public Library Legislation in India'
        },
        content: {
          hi: `भारत में अब तक 19 राज्यों में सार्वजनिक पुस्तकालय अधिनियम पारित किए जा चुके हैं:

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
मद्रास, आंध्र प्रदेश, कर्नाटक, केरल और हरियाणा में गृह कर या संपत्ति कर पर पुस्तकालय उपकर (Cess) लिया जाता है। महाराष्ट्र और पश्चिम बंगाल में कोई उपकर नहीं है, राज्य सरकार बजट अनुदान देती है।`,
          en: `To date, 19 Indian states have enacted public library legislation:
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
Levied in Tamil Nadu, Andhra Pradesh, Karnataka, Kerala, and Haryana. Maharashtra and West Bengal finance libraries through annual state budgetary allocations.`
        },
        keyPoints: [
          { hi: 'पहला राज्य: मद्रास (तमिलनाडु) 1948', en: 'First state: Madras (Tamil Nadu) 1948' },
          { hi: 'बिहार पुस्तकालय अधिनियम: 2008', en: 'Bihar Library Act: 2008' },
          { hi: 'कुल अधिनियमित राज्य: 19', en: 'Total States with legislation: 19' }
        ]
      }
    ]
  },
  {
    id: 'unit_2',
    unitNumber: 2,
    title: {
      hi: 'यूनिट 2: वर्गीकरण एवं सूचीकरण (DDC, CC, AACR-2)',
      en: 'Unit 2: Classification & Cataloguing (DDC, CC, AACR-2)'
    },
    shortDesc: {
      hi: 'डेवी दशमलव वर्गीकरण, कोलन वर्गीकरण, PMEST, सूचीकरण कोड, ISBN एवं MARC',
      en: 'Dewey Decimal Classification, Colon Classification, PMEST, Cataloguing, ISBN & MARC'
    },
    iconName: 'folder',
    topics: [
      {
        id: 't_ddc',
        title: {
          hi: 'डेवी दशमलव वर्गीकरण (DDC - Dewey Decimal Classification)',
          en: 'Dewey Decimal Classification (DDC)'
        },
        content: {
          hi: `DDC का आविष्कार मेलविल डेवी ने 1876 में एमहर्स्ट कॉलेज (अमेरिका) में किया था। यह विश्व में सबसे अधिक उपयोग की जाने वाली वर्गीकरण पद्धति है।

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
- 23वां संस्करण (2011): 4 खंडों में (वर्तमान मुद्रित संस्करण)`,
          en: `Melvil Dewey formulated DDC in 1876 at Amherst College, USA. It is the most widely adopted library classification system globally.

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
- 23rd Edition (2011): 4 Volumes (Standard latest print edition)`
        },
        keyPoints: [
          { hi: 'प्रवर्तक: मेलविल डेवी (1876)', en: 'Founder: Melvil Dewey (1876)' },
          { hi: '10 मुख्य वर्ग: 000 से 900', en: '10 Main Classes: 000 to 900' },
          { hi: '19वां संस्करण: 3 खंड (Tables, Schedules, Index)', en: '19th edition: 3 Volumes' }
        ]
      },
      {
        id: 't_cc',
        title: {
          hi: 'कोलन वर्गीकरण (Colon Classification - CC) एवं PMEST',
          en: 'Colon Classification (CC) & PMEST'
        },
        content: {
          hi: `कोलन वर्गीकरण (CC) का निर्माण डॉ. एस.आर. रंगनाथन द्वारा 1933 में किया गया। यह एक विश्लेषणात्मक-संश्लेषणात्मक (Analytico-Synthetic) वर्गीकरण प्रणाली है।

मूलभूत श्रेणियां (PMEST) एवं योजक चिह्न (Connecting Symbols):
1. P - Personality (व्यक्तित्व) -> योजक चिह्न: कॉमा ( , )
2. M - Matter (पदार्थ) -> योजक चिह्न: सेमीकोलन ( ; )
3. E - Energy (ऊर्जा / क्रिया) -> योजक चिह्न: कोलन ( : )
4. S - Space (स्थान) -> योजक चिह्न: डॉट ( . )
5. T - Time (काल / समय) -> योजक चिह्न: सिंगल इनवर्टेड कॉमा ( ' ) (छठे संस्करण के पुनर्मुद्रण 1963 से)

संस्करण:
- 1st Edition: 1933
- 6th Edition: 1960 (सबसे लोकप्रिय)
- 7th Edition: 1987 (एम.ए. गोपीनाथ द्वारा संपादित)`,
          en: `Colon Classification (CC) was conceived by Dr. S.R. Ranganathan in 1933. It is the premier example of an Analytico-Synthetic classification scheme.

Fundamental Categories (PMEST) & Connecting Symbols:
1. P - Personality -> Connecting symbol: Comma ( , )
2. M - Matter -> Connecting symbol: Semicolon ( ; )
3. E - Energy -> Connecting symbol: Colon ( : )
4. S - Space -> Connecting symbol: Dot ( . )
5. T - Time -> Connecting symbol: Single inverted comma ( ' ) (Changed from dot to inverted comma in 1963 reprint)

Editions:
- 1st Edition: 1933
- 6th Edition: 1960 (Most widely taught & practiced)
- 7th Edition: 1987 (Edited by M.A. Gopinath)`
        },
        keyPoints: [
          { hi: 'CC प्रथम संस्करण: 1933', en: 'CC First edition: 1933' },
          { hi: 'PMEST के योजक चिह्न: , ; : . \'', en: 'PMEST Connecting Symbols: , ; : . \'' },
          { hi: 'प्रणाली प्रकार: विश्लेषणात्मक-संश्लेषणात्मक', en: 'System Type: Analytico-Synthetic' }
        ]
      }
    ]
  },
  {
    id: 'unit_3',
    unitNumber: 3,
    title: {
      hi: 'यूनिट 3: पुस्तकालय स्वचालन, कोहा, SOUL एवं ICT',
      en: 'Unit 3: Library Automation, Koha, SOUL & ICT'
    },
    shortDesc: {
      hi: 'ओपन सोर्स ILS, कोहा, इनफ्लिबनेट सोल, DSpace, बारकोड, RFID एवं OPAC',
      en: 'Open Source ILS, Koha, INFLIBNET SOUL, DSpace, Barcode, RFID & OPAC'
    },
    iconName: 'cpu',
    topics: [
      {
        id: 't_koha_soul',
        title: {
          hi: 'कोहा (Koha) एवं SOUL 3.0 पुस्तकालय सॉफ्टवेयर',
          en: 'Koha & SOUL 3.0 Integrated Library Systems'
        },
        content: {
          hi: `1. कोहा (Koha):
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
- राष्ट्रीय सूचना विज्ञान केंद्र (NIC), भारत सरकार द्वारा विशेष रूप से सरकारी एवं केंद्रीय विद्यालय/नवोदय विद्यालयों के पुस्तकालयों हेतु विकसित क्लाउड सॉफ्टवेयर।`,
          en: `1. Koha:
- The worlds pioneering open-source Integrated Library System (ILS).
- Developed in 1999 in New Zealand by Katipo Communications for Horowhenua Library Trust.
- Written in Perl; supports full MARC 21, Z39.50, web-based OPAC, and multi-branch management without license costs.

2. SOUL 3.0:
- Developed by INFLIBNET Centre (autonomous IUC under UGC).
- Versions: SOUL 1.0 (2000), SOUL 2.0 (2009), SOUL 3.0 (February 2021).
- Six Core Modules: Acquisition, Catalogue, Circulation, Serial Control, OPAC, and Administration.

3. e-Granthalaya:
- Cloud-based library management platform developed by National Informatics Centre (NIC), Ministry of Electronics & IT, Government of India for government and public school libraries.`
        },
        keyPoints: [
          { hi: 'कोहा: प्रथम ओपन सोर्स ILS (1999, न्यूजीलैंड)', en: 'Koha: First Open Source ILS (1999, New Zealand)' },
          { hi: 'SOUL 3.0: INFLIBNET द्वारा 2021 में जारी', en: 'SOUL 3.0: Released by INFLIBNET in 2021' },
          { hi: 'ई-ग्रंथालय: NIC द्वारा स्कूलों एवं सरकारी पुस्तकालयों हेतु', en: 'e-Granthalaya: By NIC for school libraries' }
        ]
      }
    ]
  },
  {
    id: 'unit_4',
    unitNumber: 4,
    title: {
      hi: 'यूनिट 4: बिहार विशेष सामान्य ज्ञान एवं पुस्तकालय धरोहर',
      en: 'Unit 4: Bihar Special GK & Library Heritage'
    },
    shortDesc: {
      hi: 'प्राचीन नालंदा "धर्मगंज", खुदा बख्श लाइब्रेरी, बिहार पुस्तकालय अधिनियम 2008, 1857 क्रांति',
      en: 'Ancient Nalanda Dharmaganja, Khuda Bakhsh Library, Bihar Library Act 2008, 1857 Revolt'
    },
    iconName: 'landmark',
    topics: [
      {
        id: 't_bihar_lib',
        title: {
          hi: 'बिहार के ऐतिहासिक पुस्तकालय एवं धर्मगंज (नालंदा)',
          en: 'Historic Libraries of Bihar & Nalanda Dharmaganja'
        },
        content: {
          hi: `1. प्राचीन नालंदा विश्वविद्यालय पुस्तकालय "धर्मगंज":
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
- वर्तमान में यह बिहार की "राज्य केंद्रीय पुस्तकालय" (State Central Library) के रूप में कार्यरत है।`,
          en: `1. Ancient Nalanda University Library "Dharmaganja":
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
- Officially functions as the State Central Library of Bihar.`
        },
        keyPoints: [
          { hi: 'नालंदा पुस्तकालय: धर्मगंज (रत्नसागर, रत्नोदधि, रत्नरंजक)', en: 'Nalanda library: Dharmaganja (9-storey Ratnodadhi)' },
          { hi: 'खुदा बख्श लाइब्रेरी: 1891 स्थापित, 1969 राष्ट्रीय महत्व', en: 'Khuda Bakhsh: Est. 1891, National Importance 1969' },
          { hi: 'सिन्हा लाइब्रेरी पटना: बिहार की स्टेट सेंट्रल लाइब्रेरी', en: 'Sinha Library Patna: State Central Library of Bihar' }
        ]
      }
    ]
  }
];
