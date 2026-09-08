import { BilingualText } from '../types/index';

export interface CurriculumTopic {
  id: string; // 'u1_t1'
  unitNumber: number; // 1
  topicNumber: string; // '1.1'
  title: BilingualText;
  shortTitle: BilingualText;
}

export interface CurriculumUnit {
  unitNumber: number;
  id: string; // 'unit_1'
  title: BilingualText;
  shortTitle: BilingualText;
  icon: string;
  color: string;
  softBgDark: string;
  softBgLight: string;
  topics: CurriculumTopic[];
}

export const MASTER_CURRICULUM: CurriculumUnit[] = [
  // =========================================================================
  // UNIT 1: पुस्तकालय, समाज एवं कानून (Library, Information and Society) - 5 TOPICS
  // =========================================================================
  {
    unitNumber: 1,
    id: 'unit_1',
    title: {
      hi: 'यूनिट 1: पुस्तकालय, समाज एवं कानून',
      en: 'Unit 1: Library, Information and Society',
    },
    shortTitle: { hi: 'यूनिट 1: LIS व समाज', en: 'Unit 1: Society & Laws' },
    icon: 'book',
    color: '#0070F3',
    softBgDark: 'rgba(0, 112, 243, 0.15)',
    softBgLight: '#EFF6FF',
    topics: [
      {
        id: 'u1_t1',
        unitNumber: 1,
        topicNumber: '1.1',
        title: {
          hi: '1.1 पुस्तकालयों के प्रकार (सार्वजनिक, शैक्षणिक, विशिष्ट, राष्ट्रीय) एवं समाज में भूमिका',
          en: '1.1 Types of Libraries (Public, Academic, Special, National) & Role in Society',
        },
        shortTitle: { hi: '1.1 पुस्तकालयों के प्रकार', en: '1.1 Library Types' },
      },
      {
        id: 'u1_t2',
        unitNumber: 1,
        topicNumber: '1.2',
        title: {
          hi: '1.2 डॉ. एस.आर. रंगनाथन एवं पुस्तकालय विज्ञान के 5 सूत्र व उनके व्यावहारिक निहितार्थ',
          en: '1.2 Dr. S.R. Ranganathan & Five Laws of Library Science with Implications',
        },
        shortTitle: { hi: '1.2 रंगनाथन के 5 सूत्र', en: '1.2 Five Laws' },
      },
      {
        id: 'u1_t3',
        unitNumber: 1,
        topicNumber: '1.3',
        title: {
          hi: '1.3 भारत में 19 राज्य पुस्तकालय अधिनियम एवं डिलीवरी ऑफ बुक्स एक्ट 1954/1956',
          en: '1.3 Library Legislation in India (19 States) & Delivery of Books Act 1954/1956',
        },
        shortTitle: { hi: '1.3 पुस्तकालय विधान व एक्ट', en: '1.3 Legislation & Act' },
      },
      {
        id: 'u1_t4',
        unitNumber: 1,
        topicNumber: '1.4',
        title: {
          hi: '1.4 राष्ट्रीय एवं अंतरराष्ट्रीय पुस्तकालय संघ: ILA, IASLIC, IFLA, ALA, UNESCO, FID',
          en: '1.4 Library Associations: ILA, IASLIC, IFLA, ALA, UNESCO, FID',
        },
        shortTitle: { hi: '1.4 पुस्तकालय संघ (ILA/IFLA)', en: '1.4 Associations' },
      },
      {
        id: 'u1_t5',
        unitNumber: 1,
        topicNumber: '1.5',
        title: {
          hi: '1.5 आरआरआरएलएफ (RRRLF) एवं भारत का राष्ट्रीय पुस्तकालय (कोलकाता)',
          en: '1.5 RRRLF (Raja Rammohun Roy Library Foundation) & National Library of India',
        },
        shortTitle: { hi: '1.5 RRRLF व राष्ट्रीय पुस्तकालय', en: '1.5 RRRLF & NL' },
      },
    ],
  },

  // =========================================================================
  // UNIT 2: ज्ञान संगठन, वर्गीकरण एवं सूचीकरण (Classification & Cataloguing) - 7 TOPICS
  // =========================================================================
  {
    unitNumber: 2,
    id: 'unit_2',
    title: {
      hi: 'यूनिट 2: ज्ञान संगठन, वर्गीकरण एवं सूचीकरण',
      en: 'Unit 2: Knowledge Organization, Classification & Cataloguing',
    },
    shortTitle: { hi: 'यूनिट 2: वर्गीकरण व सूचीकरण', en: 'Unit 2: Classification' },
    icon: 'folder',
    color: '#10B981',
    softBgDark: 'rgba(16, 185, 129, 0.15)',
    softBgLight: '#ECFDF5',
    topics: [
      {
        id: 'u2_t1',
        unitNumber: 2,
        topicNumber: '2.1',
        title: {
          hi: '2.1 ज्ञान जगत की संरचना एवं विषय निर्माण की विधियां',
          en: '2.1 Universe of Knowledge & Modes of Formation of Subjects',
        },
        shortTitle: { hi: '2.1 विषय निर्माण विधियां', en: '2.1 Universe of Knowledge' },
      },
      {
        id: 'u2_t2',
        unitNumber: 2,
        topicNumber: '2.2',
        title: {
          hi: '2.2 डेवी दशमलव वर्गीकरण (DDC 19वां व 23वां संस्करण) - 10 मुख्य वर्ग, सारणियां व अनुसूचियां',
          en: '2.2 Dewey Decimal Classification (DDC 19th & 23rd Ed) - 10 Main Classes, Tables & Schedules',
        },
        shortTitle: { hi: '2.2 DDC वर्गीकरण', en: '2.2 DDC Scheme' },
      },
      {
        id: 'u2_t3',
        unitNumber: 2,
        topicNumber: '2.3',
        title: {
          hi: '2.3 कोलन वर्गीकरण (CC 6th Ed) एवं PMEST श्रेणियां, योजक चिह्न व राउंड्स/लेवल्स',
          en: '2.3 Colon Classification (CC 6th Ed) & PMEST Categories, Connecting Symbols',
        },
        shortTitle: { hi: '2.3 कोलन वर्गीकरण (CC)', en: '2.3 Colon Classification' },
      },
      {
        id: 'u2_t4',
        unitNumber: 2,
        topicNumber: '2.4',
        title: {
          hi: '2.4 यूनिवर्सल दशमलव वर्गीकरण (UDC) एवं अंकन सिद्धांत (शुद्ध व मिश्रित अंकन)',
          en: '2.4 Universal Decimal Classification (UDC) & Notation Principles',
        },
        shortTitle: { hi: '2.4 UDC व अंकन सिद्धांत', en: '2.4 UDC & Notation' },
      },
      {
        id: 'u2_t5',
        unitNumber: 2,
        topicNumber: '2.5',
        title: {
          hi: '2.5 सूचीकरण संहिताएं: AACR-2 बनाम CCC (Classified Catalogue Code)',
          en: '2.5 Cataloguing Codes: AACR-2 vs CCC (Classified Catalogue Code)',
        },
        shortTitle: { hi: '2.5 AACR-2 बनाम CCC', en: '2.5 AACR-2 vs CCC' },
      },
      {
        id: 'u2_t6',
        unitNumber: 2,
        topicNumber: '2.6',
        title: {
          hi: '2.6 बिबलियोग्राफिक प्रारूप एवं मानक: MARC-21, CCF, Dublin Core, RDA',
          en: '2.6 Metadata & Standards: MARC-21, CCF, Dublin Core, RDA',
        },
        shortTitle: { hi: '2.6 MARC-21 व Dublin Core', en: '2.6 Metadata Standards' },
      },
      {
        id: 'u2_t7',
        unitNumber: 2,
        topicNumber: '2.7',
        title: {
          hi: '2.7 विषय अनुक्रमणिका एवं श्रृंखला प्रक्रिया: Chain Procedure, Sears List (SLSH), PRECIS, POPSI',
          en: '2.7 Subject Cataloguing & Indexing: Chain Procedure, Sears List (SLSH), PRECIS, POPSI',
        },
        shortTitle: { hi: '2.7 विषय अनुक्रमणिका', en: '2.7 Subject Indexing' },
      },
    ],
  },

  // =========================================================================
  // UNIT 3: सूचना स्रोत एवं संदर्भ सेवाएं (Information Sources & Services) - 5 TOPICS
  // =========================================================================
  {
    unitNumber: 3,
    id: 'unit_3',
    title: {
      hi: 'यूनिट 3: सूचना स्रोत एवं संदर्भ सेवाएं',
      en: 'Unit 3: Information Sources & Services',
    },
    shortTitle: { hi: 'यूनिट 3: सूचना स्रोत व सेवा', en: 'Unit 3: Sources & Ref' },
    icon: 'search',
    color: '#8B5CF6',
    softBgDark: 'rgba(139, 92, 246, 0.15)',
    softBgLight: '#F5F3FF',
    topics: [
      {
        id: 'u3_t1',
        unitNumber: 3,
        topicNumber: '3.1',
        title: {
          hi: '3.1 सूचना स्रोतों का त्रिवर्गीकरण: प्राथमिक, द्वितीयक एवं तृतीयक स्रोत',
          en: '3.1 Classification of Information Sources: Primary, Secondary & Tertiary',
        },
        shortTitle: { hi: '3.1 प्राथमिक, द्वितीयक स्रोत', en: '3.1 Source Types' },
      },
      {
        id: 'u3_t2',
        unitNumber: 3,
        topicNumber: '3.2',
        title: {
          hi: '3.2 संदर्भ ग्रंथ एवं उनके प्रकार: विश्वकोश, शब्दकोश, ईयरबुक, पंचांग, ग्रंथसूची',
          en: '3.2 Reference Sources: Dictionaries, Encyclopedias, Yearbooks, Almanacs, Bibliographies',
        },
        shortTitle: { hi: '3.2 संदर्भ ग्रंथ व प्रकार', en: '3.2 Reference Books' },
      },
      {
        id: 'u3_t3',
        unitNumber: 3,
        topicNumber: '3.3',
        title: {
          hi: '3.3 संदर्भ सेवाएं: तैयार संदर्भ सेवा (Ready Reference) बनाम दीर्घकालीन संदर्भ सेवा (Long Range)',
          en: '3.3 Reference Services: Ready Reference vs Long Range Reference',
        },
        shortTitle: { hi: '3.3 तैयार व दीर्घ संदर्भ सेवा', en: '3.3 Reference Services' },
      },
      {
        id: 'u3_t4',
        unitNumber: 3,
        topicNumber: '3.4',
        title: {
          hi: '3.4 सामयिक अभिज्ञता सेवा (CAS) एवं चयनात्मक सूचना प्रसार (SDI - Luhn 1958)',
          en: '3.4 Alerting Services: CAS (Current Awareness) & SDI (Selective Dissemination - Luhn 1958)',
        },
        shortTitle: { hi: '3.4 CAS एवं SDI सेवा', en: '3.4 CAS & SDI' },
      },
      {
        id: 'u3_t5',
        unitNumber: 3,
        topicNumber: '3.5',
        title: {
          hi: '3.5 पुस्तकालय नेटवर्क एवं संसाधन सहभागिता: INFLIBNET, DELNET, NDLI, Shodhganga, OCLC',
          en: '3.5 Library Networks & Consortia: INFLIBNET, DELNET, NDLI, Shodhganga, OCLC',
        },
        shortTitle: { hi: '3.5 INFLIBNET व नेटवर्क', en: '3.5 Networks & Consortia' },
      },
    ],
  },

  // =========================================================================
  // UNIT 4: पुस्तकालय प्रबंधन, परिसंचरण एवं संरक्षण (Library Management & Preservation) - 7 TOPICS
  // =========================================================================
  {
    unitNumber: 4,
    id: 'unit_4',
    title: {
      hi: 'यूनिट 4: पुस्तकालय प्रबंधन, परिसंचरण एवं संरक्षण',
      en: 'Unit 4: Library Management & Preservation',
    },
    shortTitle: { hi: 'यूनिट 4: पुस्तकालय प्रबंधन', en: 'Unit 4: Management' },
    icon: 'briefcase',
    color: '#06B6D4',
    softBgDark: 'rgba(6, 182, 212, 0.15)',
    softBgLight: '#ECFEFF',
    topics: [
      {
        id: 'u4_t1',
        unitNumber: 4,
        topicNumber: '4.1',
        title: {
          hi: '4.1 प्रबंधन के सिद्धांत व कार्य: POSDCORB (Gulick & Urwick), हेनरी फेयोल के 14 सिद्धांत',
          en: '4.1 Principles of Management: POSDCORB (Gulick & Urwick), Henry Fayol 14 Principles',
        },
        shortTitle: { hi: '4.1 प्रबंधन सिद्धांत व POSDCORB', en: '4.1 POSDCORB' },
      },
      {
        id: 'u4_t2',
        unitNumber: 4,
        topicNumber: '4.2',
        title: {
          hi: '4.2 पुस्तक चयन के क्लासिक सिद्धांत: मेल्विल डेवी, ड्रूरी (Drury), रंगनाथन',
          en: '4.2 Classic Book Selection Principles: Melvil Dewey, Drury, Ranganathan',
        },
        shortTitle: { hi: '4.2 पुस्तक चयन सिद्धांत', en: '4.2 Book Selection' },
      },
      {
        id: 'u4_t3',
        unitNumber: 4,
        topicNumber: '4.3',
        title: {
          hi: '4.3 पुस्तकालय अर्जन, परिग्रहण एवं तकनीकी प्रक्रिया दिनचर्या',
          en: '4.3 Technical Operations: Acquisition, Accessioning & Cataloguing Routines',
        },
        shortTitle: { hi: '4.3 अर्जन व परिग्रहण (Accession)', en: '4.3 Technical Ops' },
      },
      {
        id: 'u4_t4',
        unitNumber: 4,
        topicNumber: '4.4',
        title: {
          hi: '4.4 निर्गम-आगम प्रणालियां: ब्राउन प्रणाली (1895) एवं नेवार्क प्रणाली (1900)',
          en: '4.4 Circulation Systems: Browne System (1895) & Newark System (1900)',
        },
        shortTitle: { hi: '4.4 ब्राउन व नेवार्क प्रणाली', en: '4.4 Circulation Systems' },
      },
      {
        id: 'u4_t5',
        unitNumber: 4,
        topicNumber: '4.5',
        title: {
          hi: '4.5 संग्रह सत्यापन (Stock Verification), वार्षिक प्रतिवेदन एवं अनुपयोगी पुस्तकों की छंटाई (Weeding)',
          en: '4.5 Stock Verification, Annual Report & Weeding Out Policies',
        },
        shortTitle: { hi: '4.5 भौतिक सत्यापन व वीपिंग', en: '4.5 Stock Verification' },
      },
      {
        id: 'u4_t6',
        unitNumber: 4,
        topicNumber: '4.6',
        title: {
          hi: '4.6 पुस्तकालय वित्त एवं बजट निर्माण: Zero-Based Budgeting (ZBB - Peter Pyhrr 1970), PPBS, Line Item',
          en: '4.6 Financial Management & Budgeting: Zero-Based Budgeting (ZBB - Peter Pyhrr 1970), PPBS, Line Item',
        },
        shortTitle: { hi: '4.6 ZBB व बजट निर्माण', en: '4.6 Budgeting & ZBB' },
      },
      {
        id: 'u4_t7',
        unitNumber: 4,
        topicNumber: '4.7',
        title: {
          hi: '4.7 पुस्तकालय सामग्री का संरक्षण, परिरक्षण एवं जिल्दसाजी (Binding)',
          en: '4.7 Preservation, Conservation & Binding of Library Materials',
        },
        shortTitle: { hi: '4.7 संरक्षण व जिल्दसाजी', en: '4.7 Preservation' },
      },
    ],
  },

  // =========================================================================
  // UNIT 5: पुस्तकालय स्वचालन एवं सूचना प्रौद्योगिकी (Library Automation & ICT) - 5 TOPICS
  // =========================================================================
  {
    unitNumber: 5,
    id: 'unit_5',
    title: {
      hi: 'यूनिट 5: पुस्तकालय स्वचालन एवं सूचना प्रौद्योगिकी',
      en: 'Unit 5: Library Automation & ICT',
    },
    shortTitle: { hi: 'यूनिट 5: स्वचालन व ICT', en: 'Unit 5: Automation & ICT' },
    icon: 'hardware-chip',
    color: '#EC4899',
    softBgDark: 'rgba(236, 72, 153, 0.15)',
    softBgLight: '#FDF2F8',
    topics: [
      {
        id: 'u5_t1',
        unitNumber: 5,
        topicNumber: '5.1',
        title: {
          hi: '5.1 कंप्यूटर के आधारभूत तत्व, पीढ़ियां, हार्डवेयर, सॉफ्टवेयर एवं ऑपरेटिंग सिस्टम',
          en: '5.1 Basics of ICT, Computer Generations, Hardware, Software & Operating Systems',
        },
        shortTitle: { hi: '5.1 कंप्यूटर आधारभूत तत्व', en: '5.1 ICT Basics' },
      },
      {
        id: 'u5_t2',
        unitNumber: 5,
        topicNumber: '5.2',
        title: {
          hi: '5.2 एकीकृत पुस्तकालय प्रणाली (ILS): कोहा (Koha - Open Source, Perl, 1999) एवं मुख्य मॉड्यूल्स',
          en: '5.2 Integrated Library Systems (ILS): Koha (Open Source, Perl, 1999) & Core Modules',
        },
        shortTitle: { hi: '5.2 कोहा (Koha) ILS', en: '5.2 Koha ILS' },
      },
      {
        id: 'u5_t3',
        unitNumber: 5,
        topicNumber: '5.3',
        title: {
          hi: '5.3 भारतीय ILS: सोल 3.0 (SOUL 3.0 - INFLIBNET) एवं ई-ग्रंथालय 4.0 (e-Granthalaya - NIC)',
          en: '5.3 Indian ILS: SOUL 3.0 (INFLIBNET) & e-Granthalaya 4.0 (NIC for Schools)',
        },
        shortTitle: { hi: '5.3 SOUL 3.0 व ई-ग्रंथालय', en: '5.3 Indian ILS' },
      },
      {
        id: 'u5_t4',
        unitNumber: 5,
        topicNumber: '5.4',
        title: {
          hi: '5.4 पहचान तकनीकें: बारकोड (Barcode), आरएफआईडी (RFID) एवं क्यूआर कोड (QR Code)',
          en: '5.4 Identification Technologies: Barcode, RFID (Radio Frequency Identification) & QR Code',
        },
        shortTitle: { hi: '5.4 RFID व बारकोड', en: '5.4 RFID & Barcode' },
      },
      {
        id: 'u5_t5',
        unitNumber: 5,
        topicNumber: '5.5',
        title: {
          hi: '5.5 ओपैक (OPAC) एवं वेब-ओपैक (Web-OPAC), खोज तकनीकें व बूलियन ऑपरेटर्स (AND, OR, NOT)',
          en: '5.5 OPAC & Web-OPAC, Search Techniques (Boolean Operators: AND, OR, NOT)',
        },
        shortTitle: { hi: '5.5 OPAC व बूलियन सर्च', en: '5.5 OPAC & Search' },
      },
    ],
  },
];

// Helper to look up topic by ID
export const getCurriculumTopicById = (topicId?: string): CurriculumTopic | undefined => {
  if (!topicId) return undefined;
  for (const unit of MASTER_CURRICULUM) {
    const found = unit.topics.find((t) => t.id === topicId);
    if (found) return found;
  }
  return undefined;
};

// Helper to look up unit by number
export const getCurriculumUnitByNumber = (unitNum?: number): CurriculumUnit | undefined => {
  if (!unitNum) return undefined;
  return MASTER_CURRICULUM.find((u) => u.unitNumber === unitNum);
};

// Flattened list of all 29 master topics
export const ALL_MASTER_TOPICS: CurriculumTopic[] = MASTER_CURRICULUM.flatMap((u) => u.topics);

// Aliases for backwards compatibility
export const ALL_29_TOPICS = ALL_MASTER_TOPICS;
export const ALL_25_TOPICS = ALL_MASTER_TOPICS;
