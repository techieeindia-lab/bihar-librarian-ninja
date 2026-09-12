import { BilingualText } from '../types';

export interface GlossaryItem {
  id: string;
  term: string; // e.g. "SOUL", "1933", "DDC", "RRRLF", "1876"
  type: 'acronym' | 'year' | 'act' | 'concept';
  category: 'classification' | 'cataloguing' | 'automation' | 'institutions' | 'management' | 'legislation' | 'bihar';
  expansion?: BilingualText; // e.g. { hi: "सॉफ्टवेयर फॉर यूनिवर्सिटी लाइब्रेरीज़", en: "Software for University Libraries" }
  year?: string;
  founderOrBody?: BilingualText;
  description: BilingualText;
  keyExamFact: BilingualText;
}

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  // -------------------------------------------------------------
  // ACRONYMS & FULL FORMS
  // -------------------------------------------------------------
  {
    id: 'glo_ddc',
    term: 'DDC',
    type: 'acronym',
    category: 'classification',
    expansion: {
      hi: 'डेवी डेसीमल क्लासिफिकेशन',
      en: 'Dewey Decimal Classification',
    },
    year: '1876',
    founderOrBody: { hi: 'मेलविल डेवी (Melvil Dewey)', en: 'Melvil Dewey' },
    description: {
      hi: 'विश्व की सर्वाधिक प्रयुक्त दशमलव वर्गीकरण पद्धति, जिसमें ज्ञान जगत को 10 मुख्य वर्गों (000-990) में बांटा गया है।',
      en: 'The most widely used decimal classification system dividing knowledge into 10 main classes (000-990).',
    },
    keyExamFact: {
      hi: 'प्रथम संस्करण 1876 में 44 पृष्ठों में गुमनाम (Anonymous) प्रकाशित हुआ था। वर्तमान में 23वां संस्करण (2011) 4 खंडों में उपलब्ध है।',
      en: '1st edition published in 1876 anonymously (44 pages). 23rd edition (2011) comprises 4 volumes.',
    },
  },
  {
    id: 'glo_cc',
    term: 'CC',
    type: 'acronym',
    category: 'classification',
    expansion: {
      hi: 'कोलोन क्लासिफिकेशन (द्विबिंदु वर्गीकरण)',
      en: 'Colon Classification',
    },
    year: '1933',
    founderOrBody: { hi: 'डॉ. एस.आर. रंगनाथन (Dr. S.R. Ranganathan)', en: 'Dr. S.R. Ranganathan' },
    description: {
      hi: 'भारत की प्रथम पूर्णतः पक्षात्मक (Freely Faceted) वर्गीकरण पद्धति, जिसमें PMEST सूत्र व योजक चिह्न (:) का प्रयोग होता है।',
      en: 'India’s first faceted classification scheme based on Dr. Ranganathan’s PMEST fundamental categories.',
    },
    keyExamFact: {
      hi: 'कुल 7 संस्करण प्रकाशित हुए (1933 से 1987)। 6वां संशोधित संस्करण (1963) भारतीय पुस्तकालयों में सर्वाधिक मान्य है।',
      en: '7 editions published (1933 to 1987). 6th reprint edition (1963) is the most popular in Indian exams.',
    },
  },
  {
    id: 'glo_udc',
    term: 'UDC',
    type: 'acronym',
    category: 'classification',
    expansion: {
      hi: 'यूनिवर्सल डेसीमल क्लासिफिकेशन',
      en: 'Universal Decimal Classification',
    },
    year: '1905',
    founderOrBody: { hi: 'पॉल ऑटलेट एवं हेनरी ला फोंटेन (Paul Otlet & Henri La Fontaine)', en: 'Paul Otlet & Henri La Fontaine' },
    description: {
      hi: 'DDC के 5वें संस्करण पर आधारित लगभग-पक्षात्मक अंतरराष्ट्रीय वर्गीकरण पद्धति।',
      en: 'An international almost-faceted classification system based on the 5th edition of DDC.',
    },
    keyExamFact: {
      hi: 'FID द्वारा विकसित। इसमें सहायक तालिकाओं (Auxiliary Tables) व गणितीय संकेतों का व्यापक प्रयोग होता है।',
      en: 'Developed under FID sponsorship. Uses common & special auxiliary tables with complex signs.',
    },
  },
  {
    id: 'glo_soul',
    term: 'SOUL',
    type: 'acronym',
    category: 'automation',
    expansion: {
      hi: 'सॉफ्टवेयर फॉर यूनिवर्सिटी लाइब्रेरीज़',
      en: 'Software for University Libraries',
    },
    year: '2000',
    founderOrBody: { hi: 'INFLIBNET केंद्र (गांधीनगर)', en: 'INFLIBNET Centre (Gandhinagar)' },
    description: {
      hi: 'भारतीय कॉलेज एवं विश्वविद्यालय पुस्तकालयों के स्वचालन हेतु INFLIBNET द्वारा विकसित विशेष एकीकृत सॉफ्टवेयर (ILMS)।',
      en: 'State-of-the-art integrated library management software designed by INFLIBNET for Indian universities & colleges.',
    },
    keyExamFact: {
      hi: 'SOUL 1.0 (2000), SOUL 2.0 (2009) तथा नवीनतम संस्करण SOUL 3.0 फरवरी 2021 में जारी हुआ। यह क्लाइंट-सर्वर आर्किटेक्चर पर कार्य करता है।',
      en: 'SOUL 1.0 (2000), SOUL 2.0 (2009), and latest SOUL 3.0 released in Feb 2021 with multi-lingual support.',
    },
  },
  {
    id: 'glo_koha',
    term: 'Koha',
    type: 'acronym',
    category: 'automation',
    expansion: {
      hi: 'कोहा (ओपन-सोर्स इंटीग्रेटेड लाइब्रेरी सिस्टम)',
      en: 'Koha (Gift / Donation in Māori)',
    },
    year: '1999',
    founderOrBody: { hi: 'कटिपो कम्युनिकेशंस, न्यूजीलैंड (Katipo Communications, NZ)', en: 'Katipo Communications (Horowhenua Library Trust, NZ)' },
    description: {
      hi: 'विश्व का प्रथम एवं सर्वाधिक लोकप्रिय मुफ्त एवं ओपन-सोर्स एकीकृत पुस्तकालय प्रबंधन सॉफ्टवेयर (ILS)।',
      en: 'The world’s first and most popular free open-source integrated library system (ILS/ILMS).',
    },
    keyExamFact: {
      hi: 'यह लिनक्स (Linux OS), अपाचे, मारियाडीबी/MySQL और पर्ल (Perl) भाषा पर आधारित है और MARC21 व Z39.50 का पूर्ण समर्थन करता है।',
      en: 'Built on LAMP stack (Linux, Apache, MariaDB, Perl) with native MARC21 & Z39.50 protocol compliance.',
    },
  },
  {
    id: 'glo_aacr2',
    term: 'AACR-2',
    type: 'acronym',
    category: 'cataloguing',
    expansion: {
      hi: 'एंग्लो-अमेरिकन कैटलॉगिंग रूल्स (द्वितीय संस्करण)',
      en: 'Anglo-American Cataloguing Rules (2nd Edition)',
    },
    year: '1978',
    founderOrBody: { hi: 'माइकल गोरमैन व पॉल विंकलर (Michael Gorman & Paul W. Winkler)', en: 'Michael Gorman & Paul W. Winkler (ALA, LC, LA, CLA)' },
    description: {
      hi: 'पुस्तकालय सूचीकरण हेतु अंतरराष्ट्रीय मानक संहिता जो पुस्तकों तथा गैर-पुस्तक सामग्रियों को समान संरचना में कोडित करती है।',
      en: 'Standard international cataloguing code providing rules for bibliographical description in 2 parts.',
    },
    keyExamFact: {
      hi: 'AACR-2 में कुल 2 भाग हैं: भाग 1 (विवरण - ISBD आधारित) और भाग 2 (शीर्षक व पहुंच बिंदु)। 1988 में AACR-2R संशोधित रूप में आया।',
      en: 'Contains Part I (Description based on ISBD) and Part II (Headings, Uniform Titles & References).',
    },
  },
  {
    id: 'glo_ccc',
    term: 'CCC',
    type: 'acronym',
    category: 'cataloguing',
    expansion: {
      hi: 'क्लासीफाइड कैटलॉग कोड',
      en: 'Classified Catalogue Code',
    },
    year: '1934',
    founderOrBody: { hi: 'डॉ. एस.आर. रंगनाथन (Dr. S.R. Ranganathan)', en: 'Dr. S.R. Ranganathan' },
    description: {
      hi: 'भारत का एकमात्र संपूर्ण वर्गीकृत सूचीकरण कोड जो रंगनाथन के सिद्धांतों एवं उपसूत्रों (Canons) पर आधारित है।',
      en: 'India’s pioneering classified catalogue code formulated by Dr. Ranganathan.',
    },
    keyExamFact: {
      hi: 'CCC की मुख्य प्रविष्टि (Main Entry) में 6 अनुच्छेद होते हैं: 1. लीडिंग 2. हेडिंग 3. टाइटल 4. नोट 5. एक्सेशन नंबर 6. ट्रेसिंग।',
      en: 'CCC Main Entry has 6 sections: Leading, Heading, Title, Note, Accession Number, and Tracing Section.',
    },
  },
  {
    id: 'glo_marc21',
    term: 'MARC 21',
    type: 'acronym',
    category: 'automation',
    expansion: {
      hi: 'मशीन-रीडेबल कैटलॉगिंग (21वीं सदी)',
      en: 'Machine-Readable Cataloging (21st Century)',
    },
    year: '1999',
    founderOrBody: { hi: 'लाइब्रेरी ऑफ कांग्रेस (Library of Congress)', en: 'Library of Congress & National Library of Canada' },
    description: {
      hi: 'कम्प्यूटरीकृत ग्रंथसूची रिकॉर्ड के आदान-प्रदान का वैश्विक मानक डेटा प्रारूप।',
      en: 'Harmonized USMARC and CAN/MARC format for exchanging computerized bibliographic data.',
    },
    keyExamFact: {
      hi: 'टैग 100 = मुख्य लेखक (Main Author), टैग 245 = शीर्षक (Title & Statement of Responsibility), टैग 260 = प्रकाशन विवरण।',
      en: 'Tag 100: Main Entry-Personal Name, Tag 245: Title Statement, Tag 260: Publication, Tag 650: Subject.',
    },
  },
  {
    id: 'glo_ccf',
    term: 'CCF',
    type: 'acronym',
    category: 'automation',
    expansion: {
      hi: 'कॉमन कम्युनिकेशन फॉर्मेट',
      en: 'Common Communication Format',
    },
    year: '1984',
    founderOrBody: { hi: 'यूनेस्को (UNESCO)', en: 'UNESCO' },
    description: {
      hi: 'विभिन्न पुस्तकालय स्वचालन प्रणालियों एवं सूचना केंद्रों के बीच ग्रंथसूची रिकॉर्ड आदान-प्रदान करने हेतु यूनेस्को द्वारा तैयार मानक प्रारूप।',
      en: 'Standard format developed by UNESCO to facilitate exchange of bibliographic records between diverse systems.',
    },
    keyExamFact: {
      hi: 'CCF/B (ग्रंथसूची रिकॉर्ड) तथा CCF/F (तथ्यात्मक रिकॉर्ड) इसके दो मुख्य संस्करण हैं। यह ISO 2709 मानक पर आधारित है।',
      en: 'Based on ISO 2709 structure, split into CCF/B (Bibliographic) and CCF/F (Factual).',
    },
  },
  {
    id: 'glo_opac',
    term: 'OPAC',
    type: 'acronym',
    category: 'automation',
    expansion: {
      hi: 'ऑनलाइन पब्लिक एक्सेस कैटलॉग',
      en: 'Online Public Access Catalog',
    },
    year: '1980s',
    founderOrBody: { hi: 'आधुनिक पुस्तकालय स्वचालन प्रणाली', en: 'Library Automation Systems' },
    description: {
      hi: 'पुस्तकालय संग्रह का ऑनलाइन डिजिटल कैटलॉग जिसे पाठक लेखक, शीर्षक, विषय या कीवर्ड से कंप्यूटर पर खोज सकते हैं।',
      en: 'Digital computerized catalogue of library holdings accessible to users via terminals and internet (Web-OPAC).',
    },
    keyExamFact: {
      hi: 'वेब-ओपैक (Web-OPAC) इंटरनेट ब्राउज़र के माध्यम से किसी भी स्थान से 24x7 पुस्तकालय सूची की खोज की सुविधा देता है।',
      en: 'Web-OPAC enables users to search library collections remotely from anywhere using a standard web browser.',
    },
  },
  {
    id: 'glo_rfid',
    term: 'RFID',
    type: 'acronym',
    category: 'automation',
    expansion: {
      hi: 'रेडियो फ्रीक्वेंसी आइडेंटिफिकेशन',
      en: 'Radio Frequency Identification',
    },
    year: '1990s',
    founderOrBody: { hi: 'पुस्तकालय सुरक्षा एवं स्वचालन तकनीक', en: 'Modern Library Circulation Tech' },
    description: {
      hi: 'रेडियो तरंगों पर आधारित संपर्क-रहित (Contactless) पहचान एवं सुरक्षा प्रणाली जो पुस्तकों के त्वरित निर्गम/आगम व चोरी रोकने में प्रयुक्त होती है।',
      en: 'Contactless data capturing technology using microchips and radio waves for circulation and anti-theft security.',
    },
    keyExamFact: {
      hi: 'पुस्तकालयों में सामान्यतः 13.56 MHz (High Frequency - HF) रेडियो फ्रीक्वेंसी टैग का उपयोग किया जाता है।',
      en: 'Libraries standardly operate on 13.56 MHz (High Frequency - HF) smart tags conforming to ISO 15693.',
    },
  },
  {
    id: 'glo_z3950',
    term: 'Z39.50',
    type: 'acronym',
    category: 'automation',
    expansion: {
      hi: 'ANSI/NISO Z39.50 इनफॉर्मेशन रिट्रीवल प्रोटोकॉल',
      en: 'Information Retrieval Application Protocol',
    },
    year: '1988',
    founderOrBody: { hi: 'NISO (USA) / ISO 23950', en: 'NISO (National Information Standards Organization)' },
    description: {
      hi: 'क्लाइंट-सर्वर आधारित अंतरराष्ट्रीय मानक संचार प्रोटोकॉल जो एक ही इंटरफेस से कई दूरस्थ डेटाबेस व कैटलॉग खोजने में सक्षम बनाता है।',
      en: 'International standard client-server protocol for searching and retrieving information across disparate remote databases.',
    },
    keyExamFact: {
      hi: 'Koha और SOUL में अन्य पुस्तकालयों (जैसे Library of Congress) से सीधे MARC21 रिकॉर्ड डाउनलोड करने में Z39.50 का उपयोग होता है।',
      en: 'Widely used in Koha/SOUL for copy-cataloguing and federated cross-catalogue searches.',
    },
  },
  {
    id: 'glo_ifla',
    term: 'IFLA',
    type: 'acronym',
    category: 'institutions',
    expansion: {
      hi: 'इंटरनेशनल फेडरेशन ऑफ लाइब्रेरी एसोसिएशन एंड इंस्टीट्यूशन्स',
      en: 'International Federation of Library Associations and Institutions',
    },
    year: '1927',
    founderOrBody: { hi: 'एडिनबर्ग (स्कॉटलैंड) में स्थापना', en: 'Founded in Edinburgh, Scotland' },
    description: {
      hi: 'विश्वभर के पुस्तकालयों एवं सूचना पेशेवरों का सर्वोच्च अंतरराष्ट्रीय गैर-सरकारी महासंघ।',
      en: 'The leading international body representing the interests of library and information services and users.',
    },
    keyExamFact: {
      hi: 'मुख्यालय: द हेग (The Hague, नीदरलैंड्स)। यूनेस्को के साथ मिलकर 1949 व 1994 में "पब्लिक लाइब्रेरी मेनिफेस्टो" जारी किया।',
      en: 'Headquarters: The Hague, Netherlands. Published Public Library Manifesto with UNESCO (1949, 1994).',
    },
  },
  {
    id: 'glo_rrrlf',
    term: 'RRRLF',
    type: 'acronym',
    category: 'institutions',
    expansion: {
      hi: 'राजा राममोहन राय पुस्तकालय प्रतिष्ठान',
      en: 'Raja Rammohun Roy Library Foundation',
    },
    year: '1972',
    founderOrBody: { hi: 'संस्कृति मंत्रालय, भारत सरकार', en: 'Ministry of Culture, Govt. of India' },
    description: {
      hi: 'भारत में सार्वजनिक पुस्तकालय आंदोलन का समर्थन करने तथा वित्तीय सहायता व पुस्तकें प्रदान करने वाली केंद्रीय नोडल संस्था।',
      en: 'Central nodal agency supporting public library movement and financial grants across India.',
    },
    keyExamFact: {
      hi: 'मुख्यालय: साल्ट लेक, कोलकाता। राजा राममोहन राय की 200वीं जयंती (द्विशताब्दी वर्ष) के उपलक्ष्य में मई 1972 में स्थापित हुआ।',
      en: 'Headquarters: Salt Lake, Kolkata. Established in May 1972 on Raja Rammohun Roy’s bicentenary.',
    },
  },
  {
    id: 'glo_delnet',
    term: 'DELNET',
    type: 'acronym',
    category: 'institutions',
    expansion: {
      hi: 'डेवलपिंग लाइब्रेरी नेटवर्क (मूलतः दिल्ली लाइब्रेरी नेटवर्क)',
      en: 'Developing Library Network (originally Delhi Library Network)',
    },
    year: '1988',
    founderOrBody: { hi: 'NISSAT एवं IIC (इंडिया इंटरनेशनल सेंटर)', en: 'NISSAT & India International Centre (IIC)' },
    description: {
      hi: 'भारत का प्रमुख संसाधन सहभागिता (Resource Sharing) नेटवर्क जो अंतर-पुस्तकालय ऋण (ILL) व यूनियन कैटलॉग प्रदान करता है।',
      en: 'Major Indian resource sharing network providing union catalogues and Inter-Library Loan (ILL).',
    },
    keyExamFact: {
      hi: '1988 में दिल्ली में NISSAT के सहयोग से स्थापित हुआ। बाद में 2000 में इसका नाम "डेवलपिंग लाइब्रेरी नेटवर्क" कर दिया गया।',
      en: 'Founded in 1988 with NISSAT support; renamed Developing Library Network in 2000 as it expanded nationally.',
    },
  },
  {
    id: 'glo_inflibnet',
    term: 'INFLIBNET',
    type: 'acronym',
    category: 'institutions',
    expansion: {
      hi: 'इन्फॉर्मेशन एंड लाइब्रेरी नेटवर्क सेंटर',
      en: 'Information and Library Network Centre',
    },
    year: '1991',
    founderOrBody: { hi: 'विश्वविद्यालय अनुदान आयोग (UGC)', en: 'University Grants Commission (UGC)' },
    description: {
      hi: 'भारतीय विश्वविद्यालयों व उच्च शिक्षा संस्थानों के पुस्तकालयों को जोड़ने वाला स्वायत्त अंतर-विश्वविद्यालय केंद्र (IUC)।',
      en: 'Autonomous Inter-University Centre (IUC) of UGC connecting university libraries and academic digital consortia.',
    },
    keyExamFact: {
      hi: 'मुख्यालय: इन्फोसिटी, गांधीनगर (गुजरात)। शोधगंगा (Shodhganga - भारतीय शोध प्रबंध रिपोजिटरी) का संचालन यही करता है।',
      en: 'Headquarters: Infocity, Gandhinagar, Gujarat. Manages Shodhganga, Shodhgangotri, and e-ShodhSindhu.',
    },
  },
  {
    id: 'glo_posdcorb',
    term: 'POSDCORB',
    type: 'acronym',
    category: 'management',
    expansion: {
      hi: 'प्लानिंग, ऑर्गेनाइजिंग, स्टाफिंग, डायरेक्टिंग, कोऑर्डिनेटिंग, रिपोर्टिंग, बजटिंग',
      en: 'Planning, Organizing, Staffing, Directing, Coordinating, Reporting, Budgeting',
    },
    year: '1937',
    founderOrBody: { hi: 'लूथर गुलिक एवं लिंडाल उर्विक (Luther Gulick & Lyndall Urwick)', en: 'Luther Gulick & Lyndall Urwick' },
    description: {
      hi: 'प्रबंधन के 7 मूलभूत प्रशासनिक कार्यों को संक्षेप में व्यक्त करने वाला सार्वभौमिक सूत्र।',
      en: 'Classic 7-element acronym summarizing the essential administrative functions of management.',
    },
    keyExamFact: {
      hi: '1937 के शोध पत्र "पेपर्स ऑन द साइंस ऑफ एडमिनिस्ट्रेशन" में पहली बार प्रस्तुत किया गया। पुस्तकालय प्रशासन का मुख्य आधार है।',
      en: 'Published in 1937 in "Papers on the Science of Administration". Core question in almost every LIS exam.',
    },
  },
  {
    id: 'glo_zbb',
    term: 'ZBB',
    type: 'acronym',
    category: 'management',
    expansion: {
      hi: 'जीरो बेस्ड बजटिंग (शून्य आधारित बजट प्रणाली)',
      en: 'Zero-Based Budgeting',
    },
    year: '1970',
    founderOrBody: { hi: 'पीटर पायर (Peter Pyhrr)', en: 'Peter Pyhrr (Texas Instruments)' },
    description: {
      hi: 'बजट निर्माण की वह आधुनिक पद्धति जिसमें प्रत्येक वित्तीय वर्ष में पिछले खर्चों को भूलकर शून्य से शुरुआत की जाती है।',
      en: 'Budgeting technique where all expenses must be justified from zero for each new period, ignoring historical baselines.',
    },
    keyExamFact: {
      hi: '1970 में पीटर पायर ने विकसित किया। 1973 में जॉर्जिया के गवर्नर जिमी कार्टर ने इसे सरकारी प्रशासन में लागू किया।',
      en: 'Developed by Peter Pyhrr in 1970; popularized by US President Jimmy Carter in government budgeting.',
    },
  },
  {
    id: 'glo_ppbs',
    term: 'PPBS',
    type: 'acronym',
    category: 'management',
    expansion: {
      hi: 'प्लानिंग प्रोग्रामिंग बजटिंग सिस्टम',
      en: 'Planning Programming Budgeting System',
    },
    year: '1961',
    founderOrBody: { hi: 'रैंड कॉर्पोरेशन / रॉबर्ट मैकनामारा (RAND Corp / Robert McNamara)', en: 'RAND Corporation & Robert McNamara' },
    description: {
      hi: 'पुस्तकालय नियोजन एवं कार्यक्रमों के दीर्घकालिक लक्ष्यों व परिणामों को बजट आवंटन से जोड़ने वाली प्रणाली।',
      en: 'Budgeting method linking long-term operational planning with systematic resource allocation and program outputs.',
    },
    keyExamFact: {
      hi: '1961 में अमेरिकी रक्षा विभाग में रॉबर्ट मैकनामारा द्वारा शुरू किया गया।',
      en: 'Introduced in 1961 by US Secretary of Defense Robert McNamara.',
    },
  },
  {
    id: 'glo_isbn',
    term: 'ISBN',
    type: 'acronym',
    category: 'institutions',
    expansion: {
      hi: 'इंटरनेशनल स्टैंडर्ड बुक नंबर',
      en: 'International Standard Book Number',
    },
    year: '1970',
    founderOrBody: { hi: 'डेविड व्हिटेकर (David Whitaker - Father of ISBN) / ISO 2108', en: 'David Whitaker / ISO 2108' },
    description: {
      hi: 'प्रत्येक प्रकाशित पुस्तक को अंतरराष्ट्रीय स्तर पर विशिष्ट रूप से पहचानने हेतु जारी किया जाने वाला संख्यात्मक कोड।',
      en: '13-digit machine-readable international standard commercial identifier for books.',
    },
    keyExamFact: {
      hi: '1 जनवरी 2007 से ISBN 10 अंकों से बदलकर 13 अंकों (EAN-13 उपसर्ग 978/979) का हो गया। भारत में RRRLF (नई दिल्ली) इसे जारी करता है।',
      en: 'Expanded from 10 to 13 digits on Jan 1, 2007. In India, Raja Rammohun Roy National Agency (New Delhi) assigns ISBN.',
    },
  },
  {
    id: 'glo_issn',
    term: 'ISSN',
    type: 'acronym',
    category: 'institutions',
    expansion: {
      hi: 'इंटरनेशनल स्टैंडर्ड सीरियल नंबर',
      en: 'International Standard Serial Number',
    },
    year: '1975',
    founderOrBody: { hi: 'ISO 3297 / यूनेस्को', en: 'ISO 3297 / UNESCO' },
    description: {
      hi: 'पत्रिकाओं, शोध जर्नल्स एवं आवधिक प्रकाशनों (Serials/Periodicals) की अंतरराष्ट्रीय 8-अंकीय विशिष्ट पहचान संख्या।',
      en: '8-digit unique code used to identify print or electronic serial publications (journals, magazines).',
    },
    keyExamFact: {
      hi: 'ISSN कुल 8 अंकों का होता है जो 4-4 अंकों के दो समूहों में हाइफ़न (-) द्वारा विभाजित रहता है। भारत में NIScPR (नई दिल्ली) इसे जारी करता है।',
      en: 'Consists of 8 digits in two groups of 4 separated by a hyphen. In India, CSIR-NIScPR assigns ISSN.',
    },
  },
  {
    id: 'glo_sdi',
    term: 'SDI',
    type: 'acronym',
    category: 'automation',
    expansion: {
      hi: 'सिलेक्टिव डिसेमिनेशन ऑफ इनफॉर्मेशन (चयनात्मक सूचना प्रसार)',
      en: 'Selective Dissemination of Information',
    },
    year: '1958',
    founderOrBody: { hi: 'हंस पीटर लूहान (Hans Peter Luhn, IBM)', en: 'Hans Peter Luhn (IBM)' },
    description: {
      hi: 'उपयोगकर्ता की विशिष्ट रुचि प्रोफाइल (User Profile) से नए प्रलेखों (Document Profile) का कम्प्यूटरीकृत मिलान कर सूचना उपलब्ध कराने वाली वैयक्तिक संदर्भ सेवा।',
      en: 'Personalized current awareness service matching newly received documents against individual user interest profiles.',
    },
    keyExamFact: {
      hi: 'SDI सेवा के 6 मुख्य चरण हैं: यूजर प्रोफाइल, डॉक्यूमेंट प्रोफाइल, मैचिंग, नोटिफिकेशन, फीडबैक और प्रोफाइल संशोधन।',
      en: 'Comprises 6 steps: User Profile, Document Profile, Matching, Notification, Feedback & Modification.',
    },
  },
  {
    id: 'glo_kwic',
    term: 'KWIC',
    type: 'acronym',
    category: 'cataloguing',
    expansion: {
      hi: 'कीवर्ड इन कॉन्टेक्स्ट',
      en: 'Keyword in Context',
    },
    year: '1958',
    founderOrBody: { hi: 'एच.पी. लूहान (H.P. Luhn)', en: 'H.P. Luhn' },
    description: {
      hi: 'शीर्षक के महत्वपूर्ण कीवर्ड्स को केंद्र (Center) में रखकर वर्णानुक्रम में व्यवस्थित करने वाली स्वचालित प्राकृतिक भाषा अनुक्रमणिका (Indexing) पद्धति।',
      en: 'Natural language permuted index where keyword appears in the center surrounded by context.',
    },
    keyExamFact: {
      hi: 'यह कंप्यूटर जनित चक्रीय अनुक्रमणिका (Permuted Index) है। इसके विपरीत KWOC में कीवर्ड शीर्षक से बाहर (Out of Context) लिखा जाता है।',
      en: 'Rotated permuted index. Contrasts with KWOC (Keyword Out of Context) where keyword is printed on a separate line.',
    },
  },

  // -------------------------------------------------------------
  // MILESTONE YEARS (कालक्रम व ऐतिहासिक वर्ष)
  // -------------------------------------------------------------
  {
    id: 'yr_1876',
    term: '1876',
    type: 'year',
    category: 'classification',
    expansion: {
      hi: 'DDC प्रथम संस्करण एवं ALA की स्थापना',
      en: 'DDC 1st Edition Published & ALA Founded',
    },
    year: '1876',
    founderOrBody: { hi: 'मेलविल डेवी (Melvil Dewey)', en: 'Melvil Dewey' },
    description: {
      hi: 'आधुनिक पुस्तकालय विज्ञान का सबसे क्रांतिकारी वर्ष, जिसमें DDC का प्रथम संस्करण (44 पृष्ठ) आया और अमेरिकी पुस्तकालय संघ (ALA) बना।',
      en: 'Landmark year: Melvil Dewey published DDC 1st edition (44 pages) and American Library Association (ALA) was founded.',
    },
    keyExamFact: {
      hi: '1876 में ही अमेरिकन लाइब्रेरी जर्नल का प्रकाशन शुरू हुआ और सी.ए. कटर के "रूल्स फॉर ए डिक्शनरी कैटलॉग" (RDC) प्रकाशित हुए।',
      en: 'Also marked publication of C.A. Cutter’s Rules for a Dictionary Catalog and launch of American Library Journal.',
    },
  },
  {
    id: 'yr_1895',
    term: '1895',
    type: 'year',
    category: 'management',
    expansion: {
      hi: 'FID की स्थापना एवं ब्राउन निर्गम प्रणाली',
      en: 'FID Established & Browne Circulation System',
    },
    year: '1895',
    founderOrBody: { hi: 'पॉल ऑटलेट, हेनरी ला फोंटेन, नीना ई. ब्राउन', en: 'Paul Otlet, Henri La Fontaine, Nina E. Browne' },
    description: {
      hi: 'ब्रसेल्स में अंतरराष्ट्रीय प्रलेखन महासंघ (FID - मूलतः IIB) की स्थापना हुई तथा नीना ब्राउन द्वारा प्रसिद्ध ब्राउन चार्जिंग प्रणाली विकसित की गई।',
      en: 'International Institute of Bibliography (IIB/FID) founded in Brussels; Nina E. Browne created the Browne charging system.',
    },
    keyExamFact: {
      hi: 'ब्राउन प्रणाली में पुस्तक पत्रक (Book Card), पाठक की पॉकेट (Reader Pocket) और दिनांक पर्ची (Date Slip) का प्रयोग होता है।',
      en: 'Browne system relies on Book Pocket, Book Card and Date Slip without written registers.',
    },
  },
  {
    id: 'yr_1900',
    term: '1900',
    type: 'year',
    category: 'management',
    expansion: {
      hi: 'नेवार्क निर्गम प्रणाली (Newark Charging System)',
      en: 'Newark Charging System Introduced',
    },
    year: '1900',
    founderOrBody: { hi: 'जॉन कॉटन डाना (John Cotton Dana)', en: 'John Cotton Dana (Newark Public Library, USA)' },
    description: {
      hi: 'पुस्तकालयों में पुस्तकों के निर्गम/आगम हेतु जॉन कॉटन डाना द्वारा नेवार्क पब्लिक लाइब्रेरी में विकसित की गई प्रणाली।',
      en: 'Widely used ledger-free circulation method created at Newark Public Library, New Jersey.',
    },
    keyExamFact: {
      hi: 'नेवार्क प्रणाली ब्राउन की तुलना में अधिक सुरक्षित है क्योंकि इसमें पाठक के पहचान पत्र पर तारीख अंकित की जाती है।',
      en: 'More secure than Browne system because transactions are stamped directly on borrower card and book card.',
    },
  },
  {
    id: 'yr_1910',
    term: '1910',
    type: 'year',
    category: 'institutions',
    expansion: {
      hi: 'भारत में बड़ौदा पुस्तकालय आंदोलन',
      en: 'Baroda Library Movement in India',
    },
    year: '1910',
    founderOrBody: { hi: 'महाराजा सयाजीराव गायकवाड़ तृतीय एवं डब्ल्यू.ए. बोर्डन', en: 'Maharaja Sayajirao Gaekwad III & W.A. Borden' },
    description: {
      hi: 'भारत में आधुनिक निःशुल्क सार्वजनिक पुस्तकालय नेटवर्क और पुस्तकालय शिक्षा की ऐतिहासिक शुरुआत।',
      en: 'Pioneering public library movement in India led by Maharaja of Baroda with American expert W.A. Borden.',
    },
    keyExamFact: {
      hi: '1911 में बड़ौदा में भारत का पहला पुस्तकालय प्रशिक्षण स्कूल (Library Training School) खोला गया।',
      en: 'India’s first formal library training class was instituted at Central Library Baroda in 1911.',
    },
  },
  {
    id: 'yr_1928',
    term: '1928',
    type: 'year',
    category: 'classification',
    expansion: {
      hi: 'पुस्तकालय विज्ञान के 5 सूत्रों का प्रतिपादन',
      en: 'Five Laws of Library Science Formulated',
    },
    year: '1928',
    founderOrBody: { hi: 'डॉ. एस.आर. रंगनाथन (Dr. S.R. Ranganathan)', en: 'Dr. S.R. Ranganathan' },
    description: {
      hi: 'मीनाक्षी कॉलेज, अन्नामलाईनगर में प्रांतीय शैक्षिक सम्मेलन में रंगनाथन ने पुस्तकालय विज्ञान के 5 मूलभूत सूत्रों का सर्वप्रथम वाचन किया।',
      en: 'Dr. Ranganathan first enunciated the Five Laws of Library Science at Meenakshi College, Annamalainagar.',
    },
    keyExamFact: {
      hi: 'प्रतिपादन 1928 में हुआ, जबकि पुस्तक रूप में इसका प्रथम प्रकाशन 1931 में मद्रास लाइब्रेरी एसोसिएशन (MALA) द्वारा किया गया।',
      en: 'Formulated in 1928; formally published in book form in 1931 by Madras Library Association.',
    },
  },
  {
    id: 'yr_1931',
    term: '1931',
    type: 'year',
    category: 'classification',
    expansion: {
      hi: 'द फाइव लॉज़ ऑफ लाइब्रेरी साइंस पुस्तक प्रकाशन',
      en: 'Publication of "The Five Laws of Library Science"',
    },
    year: '1931',
    founderOrBody: { hi: 'डॉ. एस.आर. रंगनाथन / MALA', en: 'Dr. S.R. Ranganathan / MALA' },
    description: {
      hi: 'पुस्तकालय विज्ञान के दर्शन की अमर पुस्तक का प्रकाशन। प्रस्तावना पी.एस. शिवस्वामी अय्यर ने तथा भूमिका डब्ल्यू.सी.बी. सेयर्स ने लिखी थी।',
      en: 'Classic book published. Foreword by Sir P.S. Sivaswami Aiyer and Introduction by W.C. Berwick Sayers.',
    },
    keyExamFact: {
      hi: '1. पुस्तकें उपयोग के लिए हैं, 2. प्रत्येक पाठक को उसकी पुस्तक, 3. प्रत्येक पुस्तक को उसका पाठक, 4. पाठक का समय बचाएं, 5. पुस्तकालय वर्धनशील संस्था है।',
      en: '1. Books are for use, 2. Every reader his book, 3. Every book its reader, 4. Save reader time, 5. Library is a growing organism.',
    },
  },
  {
    id: 'yr_1933',
    term: '1933',
    type: 'year',
    category: 'classification',
    expansion: {
      hi: 'कोलोन क्लासिफिकेशन (CC) प्रथम संस्करण एवं ILA की स्थापना',
      en: 'Colon Classification (1st Ed) & ILA Founded',
    },
    year: '1933',
    founderOrBody: { hi: 'डॉ. एस.आर. रंगनाथन / भारतीय पुस्तकालय संघ (ILA)', en: 'Dr. S.R. Ranganathan / Indian Library Association' },
    description: {
      hi: 'रंगनाथन की प्रसिद्ध पक्षात्मक वर्गीकरण पद्धति CC प्रकाशित हुई और कलकत्ता में 13 सितंबर 1933 को भारतीय पुस्तकालय संघ (ILA) की स्थापना हुई।',
      en: 'Dual milestone: Dr. Ranganathan published Colon Classification 1st edition; Indian Library Association (ILA) was founded on Sep 13 in Calcutta.',
    },
    keyExamFact: {
      hi: 'ILA के प्रथम अध्यक्ष एम.ओ. थॉमस (M.O. Thomas) और प्रथम मानद सचिव के.एम. असदुल्लाह (K.M. Asadullah) थे।',
      en: 'ILA’s first President was Dr. M.O. Thomas and first Secretary was Khan Bahadur K.M. Asadullah.',
    },
  },
  {
    id: 'yr_1948',
    term: '1948',
    type: 'year',
    category: 'legislation',
    expansion: {
      hi: 'मद्रास सार्वजनिक पुस्तकालय अधिनियम (भारत का प्रथम)',
      en: 'Madras Public Libraries Act (1st in India)',
    },
    year: '1948',
    founderOrBody: { hi: 'मद्रास विधानसभा / डॉ. रंगनाथन के प्रयास', en: 'Madras Legislative Assembly & Dr. Ranganathan' },
    description: {
      hi: 'स्वतंत्र भारत में पारित होने वाला सर्वप्रथम सार्वजनिक पुस्तकालय अधिनियम। इसने पुस्तकालय उपकर (Cess) का प्रावधान किया।',
      en: 'First public library legislation enacted in independent India, introducing library cess on property tax.',
    },
    keyExamFact: {
      hi: 'इस अधिनियम में संपत्ति कर पर 6 पैसे प्रति रुपया पुस्तकालय उपकर लगाने का प्रावधान था।',
      en: 'Provided for library cess at the rate of 6 paise per rupee on property/house tax.',
    },
  },
  {
    id: 'yr_1954',
    term: '1954',
    type: 'year',
    category: 'legislation',
    expansion: {
      hi: 'डिलिवरी ऑफ बुक्स एंड न्यूजपेपर्स एक्ट (DBNA)',
      en: 'Delivery of Books Act Enacted',
    },
    year: '1954',
    founderOrBody: { hi: 'भारतीय संसद (Parliament of India)', en: 'Parliament of India' },
    description: {
      hi: 'भारतीय प्रकाशकों द्वारा देश के 4 डिपाजिटरी पुस्तकालयों को प्रत्येक नई पुस्तक की एक प्रति 30 दिनों के भीतर निःशुल्क भेजना अनिवार्य किया गया।',
      en: 'Mandated Indian publishers to deliver 1 copy of every published book free to 4 national depository libraries within 30 days.',
    },
    keyExamFact: {
      hi: '4 डिपाजिटरी पुस्तकालय: 1. राष्ट्रीय पुस्तकालय कोलकाता, 2. कॉनेमारा पब्लिक लाइब्रेरी चेन्नई, 3. एशियाटिक सोसाइटी मुंबई, 4. दिल्ली पब्लिक लाइब्रेरी।',
      en: '1956 संशोधन में समाचार पत्र जोड़े गए। 4 डिपाजिटरी: National Library Kolkata, Connemara Chennai, Asiatic Society Mumbai, Delhi Public Library.',
    },
  },
  {
    id: 'yr_1972',
    term: '1972',
    type: 'year',
    category: 'institutions',
    expansion: {
      hi: 'RRRLF की स्थापना एवं यूनेस्को अंतरराष्ट्रीय पुस्तक वर्ष',
      en: 'RRRLF Established & UNESCO International Book Year',
    },
    year: '1972',
    founderOrBody: { hi: 'संस्कृति मंत्रालय, भारत सरकार / यूनेस्को', en: 'Ministry of Culture / UNESCO' },
    description: {
      hi: 'कोलकाता में राजा राममोहन राय पुस्तकालय प्रतिष्ठान की स्थापना हुई और यूनेस्को ने 1972 को अंतरराष्ट्रीय पुस्तक वर्ष घोषित किया।',
      en: 'RRRLF established to fund public libraries; UNESCO declared 1972 as International Book Year ("Books for All").',
    },
    keyExamFact: {
      hi: 'RRRLF का मुख्य उद्देश्य भारत में सार्वजनिक पुस्तकालय प्रणाली का प्रसार और ग्रामीण पुस्तकालयों को अनुदान देना है।',
      en: 'RRRLF acts as the central nodal funding agency for building public and rural library networks across Indian states.',
    },
  },
  {
    id: 'yr_1988',
    term: '1988',
    type: 'year',
    category: 'institutions',
    expansion: {
      hi: 'DELNET की स्थापना एवं AACR-2R संशोधन',
      en: 'DELNET Founded & AACR-2 Revised Published',
    },
    year: '1988',
    founderOrBody: { hi: 'NISSAT, IIC एवं माइकल गोरमैन', en: 'NISSAT, IIC & Joint Steering Committee' },
    description: {
      hi: 'दिल्ली में DELNET नेटवर्क की नींव रखी गई तथा सूचीकरण के मानक कोड AACR-2 का प्रथम विस्तृत संशोधित संस्करण (AACR-2R) प्रकाशित हुआ।',
      en: 'DELNET was established with NISSAT support; AACR-2 revised (AACR-2R) was published.',
    },
    keyExamFact: {
      hi: '1988 में ही मणिपुर में सार्वजनिक पुस्तकालय अधिनियम पारित हुआ था।',
      en: 'Also marked the enactment of the Manipur Public Libraries Act in 1988.',
    },
  },
  {
    id: 'yr_1991',
    term: '1991',
    type: 'year',
    category: 'automation',
    expansion: {
      hi: 'INFLIBNET केंद्र की स्थापना',
      en: 'INFLIBNET Established by UGC',
    },
    year: '1991',
    founderOrBody: { hi: 'विश्वविद्यालय अनुदान आयोग (UGC)', en: 'University Grants Commission (UGC)' },
    description: {
      hi: 'मार्च 1991 में आईयूसीएए (IUCAA) के तहत एक राष्ट्रीय परियोजना के रूप में शुरू हुआ, जो बाद में 1996 में स्वायत्त अंतर-विश्वविद्यालय केंद्र बना।',
      en: 'Initiated in March 1991 as a project under IUCAA; became an autonomous Inter-University Centre of UGC in 1996.',
    },
    keyExamFact: {
      hi: 'गांधीनगर स्थित यह केंद्र उच्च शिक्षा के लिए SOUL सॉफ्टवेयर, शोधगंगा, शोधगंगोत्री व ई-शोधसिंधु जैसी प्रमुख सेवाएं प्रदान करता है।',
      en: 'Provides national infrastructure including SOUL software, Shodhganga ETD repository, and e-ShodhSindhu consortium.',
    },
  },
  {
    id: 'yr_1999',
    term: '1999',
    type: 'year',
    category: 'automation',
    expansion: {
      hi: 'Koha ओपन-सोर्स सॉफ्टवेयर एवं MARC 21 का प्रादुर्भाव',
      en: 'Koha Open-Source ILS Released & MARC 21 Formed',
    },
    year: '1999',
    founderOrBody: { hi: 'कटिपो कम्युनिकेशंस एवं लाइब्रेरी ऑफ कांग्रेस', en: 'Katipo Communications & Library of Congress' },
    description: {
      hi: 'पुस्तकालय स्वचालन में ऐतिहासिक क्रांति: विश्व का प्रथम मुक्त स्रोत सॉफ्टवेयर Koha जारी हुआ और USMARC तथा CAN/MARC मिलकर MARC 21 बने।',
      en: 'Historic year in automation: Koha first deployed in New Zealand; USMARC and CAN/MARC merged into MARC 21.',
    },
    keyExamFact: {
      hi: 'Koha जीपीएल (GPL) लाइसेंस के तहत पूर्णतः निःशुल्क उपलब्ध है और आज लाखों पुस्तकालयों में प्रयुक्त होता है।',
      en: 'Koha is licensed under GNU GPL; MARC 21 became the definitive global standard for machine bibliographic data.',
    },
  },
  {
    id: 'yr_2000',
    term: '2000',
    type: 'year',
    category: 'automation',
    expansion: {
      hi: 'SOUL सॉफ्टवेयर 1.0 एवं भारत का IT Act 2000',
      en: 'SOUL 1.0 Released & IT Act 2000 Enacted',
    },
    year: '2000',
    founderOrBody: { hi: 'INFLIBNET एवं भारत सरकार', en: 'INFLIBNET & Govt of India' },
    description: {
      hi: 'INFLIBNET ने भारतीय पुस्तकालयों हेतु SOUL 1.0 का विमोचन किया। भारत में सूचना प्रौद्योगिकी अधिनियम (IT Act 2000) 17 अक्टूबर 2000 को लागू हुआ।',
      en: 'INFLIBNET released SOUL 1.0; Information Technology Act 2000 came into effect on Oct 17, 2000.',
    },
    keyExamFact: {
      hi: 'SOUL का विमोचन फरवरी 2000 में CALIBER सम्मेलन के दौरान किया गया था।',
      en: 'SOUL 1.0 was formally unveiled during CALIBER 2000 conference in Chennai.',
    },
  },
  {
    id: 'yr_2008',
    term: '2008',
    type: 'year',
    category: 'bihar',
    expansion: {
      hi: 'बिहार सार्वजनिक पुस्तकालय एवं सूचना केंद्र अधिनियम 2008',
      en: 'Bihar Public Library and Information Centre Act 2008',
    },
    year: '2008',
    founderOrBody: { hi: 'बिहार विधानमंडल (Bihar State Legislature)', en: 'Govt. of Bihar' },
    description: {
      hi: 'बिहार राज्य में सार्वजनिक पुस्तकालय व्यवस्था के विकास, संवर्धन एवं संचालन हेतु पारित ऐतिहासिक राज्य अधिनियम।',
      en: 'Landmark state legislation governing public library networks, infrastructure and appointments in Bihar.',
    },
    keyExamFact: {
      hi: 'बिहार पुस्तकालय अधिनियम में कोई पुस्तकालय उपकर (No Library Cess) नहीं है। इसका संपूर्ण वित्तपोषण राज्य सरकार के बजट से होता है।',
      en: 'Bihar Public Library Act is notable for having NO library cess; funding is directly budgeted by the state government.',
    },
  },
  {
    id: 'yr_2020',
    term: '2020',
    type: 'year',
    category: 'legislation',
    expansion: {
      hi: 'राष्ट्रीय शिक्षा नीति 2020 (NEP 2020)',
      en: 'National Education Policy 2020',
    },
    year: '2020',
    founderOrBody: { hi: 'डॉ. के. कस्तूरीरंगन समिति / भारत सरकार', en: 'Dr. K. Kasturirangan Committee' },
    description: {
      hi: 'भारत की नई शिक्षा नीति जिसने 10+2 ढांचे को बदलकर 5+3+3+4 स्कूली संरचना लागू की तथा विद्यालय पुस्तकालयों व डिजिटल वाचनालयों के सुदृढ़ीकरण पर विशेष बल दिया।',
      en: 'New educational framework replacing 10+2 with 5+3+3+4, prioritizing school libraries and digital reading infrastructure.',
    },
    keyExamFact: {
      hi: 'NEP 2020 के तहत प्रत्येक माध्यमिक एवं उच्च माध्यमिक विद्यालय में सुसज्जित पुस्तकालय और पूर्णकालिक प्रशिक्षित लाइब्रेरियन की नियुक्ति अनिवार्य की गई है।',
      en: 'Mandates modern physical & digital school libraries with dedicated librarian posts across secondary schools.',
    },
  },
];
