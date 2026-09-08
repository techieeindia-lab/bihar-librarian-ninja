import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://croywgkjthofkeoqqesb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_eyhwyliV7Fltcxes7qfyfg_YVdLBZoA';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const MASTER_UNITS = [
  {
    id: 'unit_1',
    unit_number: 1,
    title_hi: 'यूनिट 1: पुस्तकालय, समाज एवं कानून',
    title_en: 'Unit 1: Library, Information and Society',
    short_desc_hi: 'पुस्तकालयों के प्रकार, रंगनाथन के 5 सूत्र, 19 राज्य अधिनियम, पुस्तकालय संघ एवं RRRLF',
    short_desc_en: 'Types of Libraries, Five Laws, 19 State Library Acts, Library Associations & RRRLF',
    icon_name: 'book',
    display_order: 1,
  },
  {
    id: 'unit_2',
    unit_number: 2,
    title_hi: 'यूनिट 2: ज्ञान संगठन, वर्गीकरण एवं सूचीकरण',
    title_en: 'Unit 2: Classification & Cataloguing',
    short_desc_hi: 'ज्ञान जगत, DDC (19वां/23वां), कोलन (CC-PMEST), UDC, AACR-2, CCC, MARC-21 एवं विषय सूचीकरण',
    short_desc_en: 'Universe of Knowledge, DDC, Colon Classification, UDC, AACR-2, CCC, MARC-21 & Indexing',
    icon_name: 'folder',
    display_order: 2,
  },
  {
    id: 'unit_3',
    unit_number: 3,
    title_hi: 'यूनिट 3: सूचना स्रोत एवं संदर्भ सेवाएं',
    title_en: 'Unit 3: Information Sources & Services',
    short_desc_hi: 'प्राथमिक/द्वितीयक/तृतीयक स्रोत, संदर्भ ग्रंथ, तैयार/दीर्घ संदर्भ, CAS/SDI एवं पुस्तकालय नेटवर्क',
    short_desc_en: 'Primary/Secondary/Tertiary Sources, Reference Books, Ready/Long Reference, CAS/SDI & Consortia',
    icon_name: 'search',
    display_order: 3,
  },
  {
    id: 'unit_4',
    unit_number: 4,
    title_hi: 'यूनिट 4: पुस्तकालय प्रबंधन, परिसंचरण एवं संरक्षण',
    title_en: 'Unit 4: Library Management & Preservation',
    short_desc_hi: 'POSDCORB, फेयोल के 14 सिद्धांत, पुस्तक चयन, ब्राउन/नेवार्क, ZBB बजट एवं संरक्षण',
    short_desc_en: 'POSDCORB, 14 Principles, Book Selection, Browne/Newark, Stock Verification, ZBB & Preservation',
    icon_name: 'briefcase',
    display_order: 4,
  },
  {
    id: 'unit_5',
    unit_number: 5,
    title_hi: 'यूनिट 5: पुस्तकालय स्वचालन एवं सूचना प्रौद्योगिकी',
    title_en: 'Unit 5: Library Automation & ICT',
    short_desc_hi: 'कंप्यूटर फंडामेंटल, कोहा (Koha), SOUL 3.0, e-ग्रंथालय 4.0, बारकोड/RFID एवं OPAC',
    short_desc_en: 'ICT Basics, Koha, SOUL 3.0, e-Granthalaya 4.0, Barcode/RFID & OPAC',
    icon_name: 'hardware-chip',
    display_order: 5,
  },
];

const MASTER_TOPIC_TITLES = [
  // Unit 1
  {
    id: 'u1_t1',
    title_hi: '1.1 पुस्तकालयों के प्रकार (सार्वजनिक, शैक्षणिक, विशिष्ट, राष्ट्रीय) एवं समाज में भूमिका',
    title_en: '1.1 Types of Libraries (Public, Academic, Special, National) & Role in Society',
  },
  {
    id: 'u1_t2',
    title_hi: '1.2 डॉ. एस.आर. रंगनाथन एवं पुस्तकालय विज्ञान के 5 सूत्र व उनके व्यावहारिक निहितार्थ',
    title_en: '1.2 Dr. S.R. Ranganathan & Five Laws of Library Science with Implications',
  },
  {
    id: 'u1_t3',
    title_hi: '1.3 भारत में 19 राज्य पुस्तकालय अधिनियम एवं डिलीवरी ऑफ बुक्स एक्ट 1954/1956',
    title_en: '1.3 Library Legislation in India (19 States) & Delivery of Books Act 1954/1956',
  },
  {
    id: 'u1_t4',
    title_hi: '1.4 राष्ट्रीय एवं अंतरराष्ट्रीय पुस्तकालय संघ: ILA, IASLIC, IFLA, ALA, UNESCO, FID',
    title_en: '1.4 Library Associations: ILA, IASLIC, IFLA, ALA, UNESCO, FID',
  },
  {
    id: 'u1_t5',
    title_hi: '1.5 आरआरआरएलएफ (RRRLF) एवं भारत का राष्ट्रीय पुस्तकालय',
    title_en: '1.5 RRRLF (Raja Rammohun Roy Library Foundation) & National Library of India',
  },
  // Unit 2
  {
    id: 'u2_t1',
    title_hi: '2.1 ज्ञान जगत की संरचना एवं विषय निर्माण की विधियां',
    title_en: '2.1 Universe of Knowledge & Modes of Formation of Subjects',
  },
  {
    id: 'u2_t2',
    title_hi: '2.2 डेवी दशमलव वर्गीकरण (DDC 19वां व 23वां संस्करण) - 10 मुख्य वर्ग, सारणियां व अनुसूचियां',
    title_en: '2.2 Dewey Decimal Classification (DDC 19th & 23rd Ed) - 10 Main Classes, Tables & Schedules',
  },
  {
    id: 'u2_t3',
    title_hi: '2.3 कोलन वर्गीकरण (CC 6th Ed) एवं PMEST श्रेणियां, योजक चिह्न',
    title_en: '2.3 Colon Classification (CC 6th Ed) & PMEST Categories, Connecting Symbols',
  },
  {
    id: 'u2_t4',
    title_hi: '2.4 यूनिवर्सल दशमलव वर्गीकरण (UDC) एवं अंकन सिद्धांत',
    title_en: '2.4 Universal Decimal Classification (UDC) & Notation Principles',
  },
  {
    id: 'u2_t5',
    title_hi: '2.5 सूचीकरण संहिताएं: AACR-2 बनाम CCC (Classified Catalogue Code)',
    title_en: '2.5 Cataloguing Codes: AACR-2 vs CCC (Classified Catalogue Code)',
  },
  {
    id: 'u2_t6',
    title_hi: '2.6 बिबलियोग्राफिक प्रारूप एवं मानक: MARC-21, CCF, Dublin Core, RDA',
    title_en: '2.6 Metadata & Standards: MARC-21, CCF, Dublin Core, RDA',
  },
  {
    id: 'u2_t7',
    title_hi: '2.7 विषय अनुक्रमणिका एवं श्रृंखला प्रक्रिया: Chain Procedure, Sears List (SLSH), PRECIS, POPSI',
    title_en: '2.7 Subject Cataloguing & Indexing: Chain Procedure, Sears List (SLSH), PRECIS, POPSI',
  },
  // Unit 3
  {
    id: 'u3_t1',
    title_hi: '3.1 सूचना स्रोतों का त्रिवर्गीकरण: प्राथमिक, द्वितीयक एवं तृतीयक',
    title_en: '3.1 Classification of Information Sources: Primary, Secondary & Tertiary',
  },
  {
    id: 'u3_t2',
    title_hi: '3.2 संदर्भ ग्रंथ एवं उनके प्रकार: शब्दकोश, विश्वकोश, ईयरबुक, पंचांग, ग्रंथसूची',
    title_en: '3.2 Reference Sources: Dictionaries, Encyclopedias, Yearbooks, Almanacs, Bibliographies',
  },
  {
    id: 'u3_t3',
    title_hi: '3.3 संदर्भ सेवाएं: तैयार संदर्भ सेवा बनाम दीर्घकालीन संदर्भ सेवा',
    title_en: '3.3 Reference Services: Ready Reference vs Long Range Reference',
  },
  {
    id: 'u3_t4',
    title_hi: '3.4 सामयिक अभिज्ञता सेवा (CAS) एवं चयनात्मक सूचना प्रसार (SDI - Luhn 1958)',
    title_en: '3.4 Alerting Services: CAS (Current Awareness) & SDI (Selective Dissemination of Information - Luhn 1958)',
  },
  {
    id: 'u3_t5',
    title_hi: '3.5 पुस्तकालय नेटवर्क एवं संसाधन सहभागिता: INFLIBNET, DELNET, NDLI, Shodhganga, OCLC',
    title_en: '3.5 Library Networks & Consortia: INFLIBNET, DELNET, NDLI, Shodhganga, OCLC',
  },
  // Unit 4
  {
    id: 'u4_t1',
    title_hi: '4.1 प्रबंधन के सिद्धांत व कार्य: POSDCORB (Gulick & Urwick), हेनरी फेयोल 14 सिद्धांत',
    title_en: '4.1 Principles of Management: POSDCORB (Gulick & Urwick), Henry Fayol 14 Principles',
  },
  {
    id: 'u4_t2',
    title_hi: '4.2 पुस्तक चयन के सिद्धांत: मेल्विल डेवी, ड्रूरी, रंगनाथन',
    title_en: '4.2 Classic Book Selection Principles: Melvil Dewey, Drury, Ranganathan',
  },
  {
    id: 'u4_t3',
    title_hi: '4.3 पुस्तकालय अर्जन, परिग्रहण व तकनीकी प्रक्रिया',
    title_en: '4.3 Technical Operations: Acquisition, Accessioning & Cataloguing Routines',
  },
  {
    id: 'u4_t4',
    title_hi: '4.4 निर्गम-आगम प्रणालियां: ब्राउन (1895) व नेवार्क (1900)',
    title_en: '4.4 Circulation Systems: Browne System (1895) & Newark System (1900)',
  },
  {
    id: 'u4_t5',
    title_hi: '4.5 संग्रह सत्यापन एवं अनुपयोगी पुस्तकों की छंटाई (Weeding Out)',
    title_en: '4.5 Stock Verification, Annual Report & Weeding Out Policies',
  },
  {
    id: 'u4_t6',
    title_hi: '4.6 पुस्तकालय वित्त एवं बजट निर्माण: Zero-Based Budgeting (ZBB - Peter Pyhrr 1970), PPBS, Line Item',
    title_en: '4.6 Financial Management & Budgeting: Zero-Based Budgeting (ZBB - Peter Pyhrr 1970), PPBS, Line Item',
  },
  {
    id: 'u4_t7',
    title_hi: '4.7 पुस्तकालय सामग्री का संरक्षण एवं जिल्दसाजी',
    title_en: '4.7 Preservation, Conservation & Binding of Library Materials',
  },
  // Unit 5
  {
    id: 'u5_t1',
    title_hi: '5.1 कंप्यूटर के आधारभूत तत्व, पीढ़ियां, हार्डवेयर, सॉफ्टवेयर एवं ऑपरेटिंग सिस्टम',
    title_en: '5.1 Basics of ICT, Computer Generations, Hardware, Software & Operating Systems',
  },
  {
    id: 'u5_t2',
    title_hi: '5.2 एकीकृत पुस्तकालय प्रणाली (ILS): कोहा (Koha - Open Source, Perl, 1999) एवं मुख्य मॉड्यूल्स',
    title_en: '5.2 Integrated Library Systems (ILS): Koha (Open Source, Perl, 1999) & Core Modules',
  },
  {
    id: 'u5_t3',
    title_hi: '5.3 भारतीय ILS: SOUL 3.0 (INFLIBNET) एवं ई-ग्रंथालय 4.0 (NIC for Schools)',
    title_en: '5.3 Indian ILS: SOUL 3.0 (INFLIBNET) & e-Granthalaya 4.0 (NIC for Schools)',
  },
  {
    id: 'u5_t4',
    title_hi: '5.4 पहचान तकनीकें: बारकोड, RFID (Radio Frequency Identification) एवं QR कोड',
    title_en: '5.4 Identification Technologies: Barcode, RFID (Radio Frequency Identification) & QR Code',
  },
  {
    id: 'u5_t5',
    title_hi: '5.5 ओपैक एवं बूलियन खोज: OPAC, Web-OPAC (Boolean Operators: AND, OR, NOT)',
    title_en: '5.5 OPAC & Web-OPAC, Search Techniques (Boolean Operators: AND, OR, NOT)',
  },
];

async function updateDatabase() {
  console.log('--- 1. Updating study_units in Supabase ---');
  for (const unit of MASTER_UNITS) {
    const { error } = await supabase
      .from('study_units')
      .upsert(unit, { onConflict: 'id' });
    if (error) console.error(`Error updating unit ${unit.id}:`, error.message);
    else console.log(`✓ Updated Unit: ${unit.id} -> ${unit.title_en}`);
  }

  console.log('\n--- 2. Updating study_topics titles in Supabase ---');
  for (const topic of MASTER_TOPIC_TITLES) {
    const { error } = await supabase
      .from('study_topics')
      .update({
        title_hi: topic.title_hi,
        title_en: topic.title_en,
      })
      .eq('id', topic.id);
    if (error) console.error(`Error updating topic ${topic.id}:`, error.message);
    else console.log(`✓ Updated Topic Title: ${topic.id} -> ${topic.title_en}`);
  }

  console.log('\n--- 3. Updating Unit Mega Test Quizzes in Supabase ---');
  const unitQuizzes = [
    {
      id: 'quiz_unit_1',
      title_hi: 'यूनिट 1 मेगा टेस्ट: पुस्तकालय, समाज एवं कानून',
      title_en: 'Unit 1 Mega Test: Library, Information and Society',
      subtitle_hi: 'पुस्तकालयों के प्रकार, रंगनाथन के 5 सूत्र, 19 राज्य अधिनियम, पुस्तकालय संघ एवं RRRLF',
      subtitle_en: 'Types of Libraries, Five Laws, 19 State Acts, Associations & RRRLF • +40 XP',
      category: 'unit_1',
    },
    {
      id: 'quiz_unit_2',
      title_hi: 'यूनिट 2 मेगा टेस्ट: ज्ञान संगठन, वर्गीकरण एवं सूचीकरण',
      title_en: 'Unit 2 Mega Test: Classification & Cataloguing',
      subtitle_hi: 'ज्ञान जगत, DDC, कोलन (CC), UDC, AACR-2, CCC, MARC-21 एवं विषय सूचीकरण',
      subtitle_en: 'Universe of Knowledge, DDC, Colon, UDC, AACR-2, CCC & Indexing • +40 XP',
      category: 'unit_2',
    },
    {
      id: 'quiz_unit_3',
      title_hi: 'यूनिट 3 मेगा टेस्ट: सूचना स्रोत एवं संदर्भ सेवाएं',
      title_en: 'Unit 3 Mega Test: Information Sources & Services',
      subtitle_hi: 'प्राथमिक/द्वितीयक/तृतीयक स्रोत, संदर्भ ग्रंथ, तैयार/दीर्घ संदर्भ, CAS/SDI एवं नेटवर्क',
      subtitle_en: 'Information Sources, Reference Books, Ready/Long Reference, CAS/SDI & Networks • +40 XP',
      category: 'unit_3',
    },
    {
      id: 'quiz_unit_4',
      title_hi: 'यूनिट 4 मेगा टेस्ट: पुस्तकालय प्रबंधन, परिसंचरण एवं संरक्षण',
      title_en: 'Unit 4 Mega Test: Library Management & Preservation',
      subtitle_hi: 'POSDCORB, पुस्तक चयन, अर्जन/परिग्रहण, ब्राउन/नेवार्क, ZBB बजट एवं संरक्षण',
      subtitle_en: 'POSDCORB, Book Selection, Browne/Newark, Stock Audit, ZBB & Preservation • +40 XP',
      category: 'unit_4',
    },
    {
      id: 'quiz_unit_5',
      title_hi: 'यूनिट 5 मेगा टेस्ट: पुस्तकालय स्वचालन एवं सूचना प्रौद्योगिकी',
      title_en: 'Unit 5 Mega Test: Library Automation & ICT',
      subtitle_hi: 'कंप्यूटर फंडामेंटल, कोहा (Koha), SOUL 3.0, e-ग्रंथालय 4.0, बारकोड/RFID एवं OPAC',
      subtitle_en: 'ICT Basics, Koha, SOUL 3.0, e-Granthalaya 4.0, Barcode/RFID & OPAC • +40 XP',
      category: 'unit_5',
    },
  ];

  for (const q of unitQuizzes) {
    const { error } = await supabase
      .from('quizzes')
      .update({
        title_hi: q.title_hi,
        title_en: q.title_en,
        subtitle_hi: q.subtitle_hi,
        subtitle_en: q.subtitle_en,
        category: q.category,
      })
      .eq('id', q.id);
    if (error) console.error(`Error updating quiz ${q.id}:`, error.message);
    else console.log(`✓ Updated Quiz: ${q.id} -> ${q.title_en}`);
  }

  console.log('\n--- 4. Updating Legacy Flashcard Categories in Supabase ---');
  // Re-categorize any legacy "Bihar Library Heritage" or "Founders & Years" flashcards
  const { error: fcErr1 } = await supabase
    .from('flashcards')
    .update({
      category_en: 'Topic 1.3: Library Acts & Bihar Legislation',
      category_hi: 'टॉपिक 1.3: पुस्तकालय अधिनियम व बिहार विधान',
    })
    .eq('category_en', 'Bihar Library Heritage');
  if (fcErr1) console.error('Error updating fc1:', fcErr1.message);
  else console.log('✓ Updated Bihar Library Heritage flashcards to Topic 1.3');

  const { error: fcErr2 } = await supabase
    .from('flashcards')
    .update({
      category_en: 'Topic 1.2: Five Laws of LIS',
      category_hi: 'टॉपिक 1.2: रंगनाथन के 5 सूत्र',
    })
    .eq('category_en', 'Founders & Years');
  if (fcErr2) console.error('Error updating fc2:', fcErr2.message);
  else console.log('✓ Updated Founders & Years flashcards to Topic 1.2');

  const { error: fcErr3 } = await supabase
    .from('flashcards')
    .update({
      category_en: 'Topic 4.1: Principles of Management',
      category_hi: 'टॉपिक 4.1: प्रबंधन के सिद्धांत',
    })
    .eq('category_en', 'Reference & Management');
  if (fcErr3) console.error('Error updating fc3:', fcErr3.message);
  else console.log('✓ Updated Reference & Management flashcards to Topic 4.1');

  const { error: fcErr4 } = await supabase
    .from('flashcards')
    .update({
      category_en: 'Topic 5.2: Koha ILS & Open Source',
      category_hi: 'टॉपिक 5.2: कोहा ILS व ओपन सोर्स',
    })
    .eq('category_en', 'Software & Technology');
  if (fcErr4) console.error('Error updating fc4:', fcErr4.message);
  else console.log('✓ Updated Software & Technology flashcards to Topic 5.2');

  const { error: fcErr5 } = await supabase
    .from('flashcards')
    .update({
      category_en: 'Topic 1.1: Academic & School Libraries',
      category_hi: 'टॉपिक 1.1: शैक्षणिक व विद्यालय पुस्तकालय',
    })
    .eq('category_en', 'Teaching & Literacy');
  if (fcErr5) console.error('Error updating fc5:', fcErr5.message);
  else console.log('✓ Updated Teaching & Literacy flashcards to Topic 1.1');

  console.log('\n--- 5. Updating Legacy One-Liner Categories in Supabase ---');
  // Re-categorize legacy one-liners so none have bihar_special or lis_foundations
  const { error: olErr1 } = await supabase
    .from('one_liners')
    .update({
      category_key: 'u1_t3',
      category_hi: 'यूनिट 1: पुस्तकालय, समाज एवं कानून',
      category_en: 'Unit 1: Society & Laws',
      topic_hi: 'बिहार पुस्तकालय अधिनियम 2008',
      topic_en: 'Bihar Library Act 2008',
    })
    .eq('category_key', 'bihar_special');
  if (olErr1) console.error('Error updating ol1:', olErr1.message);
  else console.log('✓ Updated bihar_special one-liners to Unit 1 (u1_t3)');

  const { error: olErr2 } = await supabase
    .from('one_liners')
    .update({
      category_key: 'u1_t1',
      category_hi: 'यूनिट 1: पुस्तकालय, समाज एवं कानून',
      category_en: 'Unit 1: Society & Laws',
    })
    .eq('category_key', 'lis_foundations');
  if (olErr2) console.error('Error updating ol2:', olErr2.message);
  else console.log('✓ Updated lis_foundations one-liners to Unit 1 (u1_t1)');

  const { error: olErr3 } = await supabase
    .from('one_liners')
    .update({
      category_key: 'u2_t2',
      category_hi: 'यूनिट 2: ज्ञान संगठन, वर्गीकरण व सूचीकरण',
      category_en: 'Unit 2: Classification & Cataloguing',
    })
    .eq('category_key', 'classification_cataloguing');
  if (olErr3) console.error('Error updating ol3:', olErr3.message);
  else console.log('✓ Updated classification_cataloguing one-liners to Unit 2 (u2_t2)');

  const { error: olErr4 } = await supabase
    .from('one_liners')
    .update({
      category_key: 'u3_t1',
      category_hi: 'यूनिट 3: सूचना स्रोत एवं संदर्भ सेवाएं',
      category_en: 'Unit 3: Information Sources & Services',
    })
    .eq('category_key', 'reference_sources');
  if (olErr4) console.error('Error updating ol4:', olErr4.message);
  else console.log('✓ Updated reference_sources one-liners to Unit 3 (u3_t1)');

  const { error: olErr5 } = await supabase
    .from('one_liners')
    .update({
      category_key: 'u4_t1',
      category_hi: 'यूनिट 4: पुस्तकालय प्रबंधन, परिसंचरण एवं संरक्षण',
      category_en: 'Unit 4: Library Management & Preservation',
    })
    .eq('category_key', 'library_management');
  if (olErr5) console.error('Error updating ol5:', olErr5.message);
  else console.log('✓ Updated library_management one-liners to Unit 4 (u4_t1)');

  const { error: olErr6 } = await supabase
    .from('one_liners')
    .update({
      category_key: 'u5_t1',
      category_hi: 'यूनिट 5: पुस्तकालय स्वचालन एवं सूचना प्रौद्योगिकी',
      category_en: 'Unit 5: Library Automation & ICT',
    })
    .eq('category_key', 'automation_ict');
  if (olErr6) console.error('Error updating ol6:', olErr6.message);
  else console.log('✓ Updated automation_ict one-liners to Unit 5 (u5_t1)');

  const { error: olErr7 } = await supabase
    .from('one_liners')
    .update({
      category_key: 'u1_t1',
      category_hi: 'यूनिट 1: पुस्तकालय, समाज एवं कानून',
      category_en: 'Unit 1: Society & Laws',
    })
    .eq('category_key', 'teaching_aptitude');
  if (olErr7) console.error('Error updating ol7:', olErr7.message);
  else console.log('✓ Updated teaching_aptitude one-liners to Unit 1 (u1_t1)');

  console.log('\n=========================================');
  console.log('ALL SUPABASE CONTENT ALIGNED TO MASTER SYLLABUS!');
  console.log('=========================================');
}

updateDatabase().catch(console.error);
