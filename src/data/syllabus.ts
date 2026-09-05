export const SYLLABUS_DATA = {
  examName: {
    hi: 'बिहार विद्यालय पुस्तकालयाध्यक्ष पात्रता एवं भर्ती परीक्षा',
    en: 'Bihar School Librarian Eligibility & Recruitment Exam'
  },
  conductingBodies: [
    {
      name: { hi: 'बिहार विद्यालय परीक्षा समिति (BSEB)', en: 'Bihar School Examination Board (BSEB)' },
      role: { hi: 'पात्रता परीक्षा (School Librarian Eligibility Test - LET)', en: 'Eligibility Test (LET / BSLET)' },
      website: 'https://biharboardonline.bihar.gov.in'
    },
    {
      name: { hi: 'बिहार लोक सेवा आयोग (BPSC)', en: 'Bihar Public Service Commission (BPSC)' },
      role: { hi: 'अध्यापक / पुस्तकालयाध्यक्ष अंतिम नियुक्ति परीक्षा', en: 'Final Teacher / Librarian Recruitment Exam' },
      website: 'https://bpsc.bih.nic.in'
    }
  ],
  eligibility: {
    education: {
      hi: 'किसी मान्यता प्राप्त विश्वविद्यालय से न्यूनतम 45% अंकों के साथ स्नातक (Graduation) तथा पुस्तकालय एवं सूचना विज्ञान में स्नातक (B.Lib.Sc / B.Lib.I.Sc) या डिप्लोमा। (आरक्षित श्रेणी को 5% की छूट)',
      en: 'Graduation with min 45% marks from a recognized university along with B.Lib.Sc / B.Lib.I.Sc (Bachelor of Library & Information Science) or equivalent Diploma. (5% relaxation for reserved categories).'
    },
    ageLimit: {
      hi: 'न्यूनतम आयु: 21 वर्ष | अधिकतम: सामान्य पुरुष 37 वर्ष, महिला/BC/EBC 40 वर्ष, SC/ST 42 वर्ष।',
      en: 'Minimum Age: 21 Years | Maximum: Gen Male 37 yrs, Female/BC/EBC 40 yrs, SC/ST 42 yrs.'
    },
    domicile: {
      hi: 'उम्मीदवार को भारत का नागरिक एवं बिहार का स्थायी निवासी (Domicile of Bihar) होना आवश्यक है।',
      en: 'Candidate must be a citizen of India and permanent domicile of Bihar.'
    }
  },
  examPattern: {
    mode: { hi: 'वस्तुनिष्ठ बहुविकल्पीय प्रश्न (OMR / CBT)', en: 'Objective Multiple Choice (OMR / CBT)' },
    totalQuestions: '100 प्रश्न (Questions)',
    totalMarks: '100 अंक (Marks)',
    duration: '120 मिनट (2 घंटे)',
    negativeMarking: { hi: 'सामान्यतः कोई नकारात्मक अंकन नहीं', en: 'Generally No Negative Marking' },
    sections: [
      {
        title: { hi: 'खंड ' + 'क: पुस्तकालय एवं सूचना विज्ञान (कोर विषय)', en: 'Section A: Library & Information Science (Core Subject)' },
        questions: '60 - 70 प्रश्न',
        weightage: '60 - 70%',
        topics: [
          { hi: 'पुस्तकालय विज्ञान के आधार एवं पांच नियम', en: 'Foundations of LIS & Five Laws' },
          { hi: 'पुस्तकालय वर्गीकरण (DDC, CC, UDC)', en: 'Library Classification (DDC, CC, UDC)' },
          { hi: 'सूचीकरण कोड (AACR-2, CCC, MARC-21, ISBN, ISSN)', en: 'Cataloguing Codes (AACR-2, CCC, MARC-21, ISBN)' },
          { hi: 'संदर्भ एवं सूचना स्रोत (प्राथमिक, द्वितीयक, तृतीयक स्रोत, CAS/SDI)', en: 'Reference & Information Sources (Primary, Secondary, CAS/SDI)' },
          { hi: 'पुस्तकालय स्वचालन (Koha, SOUL 3.0, DSpace, RFID, OPAC)', en: 'Library Automation (Koha, SOUL 3.0, DSpace, RFID, OPAC)' },
          { hi: 'पुस्तकालय प्रशासन एवं परिसंचरण प्रणालियां (Browne, Newark)', en: 'Library Management & Circulation (Browne, Newark)' }
        ]
      },
      {
        title: { hi: 'खंड ख: बिहार सामान्य ज्ञान एवं समसामयिकी', en: 'Section B: Bihar Special GK & Current Affairs' },
        questions: '15 - 20 प्रश्न',
        weightage: '15 - 20%',
        topics: [
          { hi: 'बिहार की ऐतिहासिक पुस्तकालय धरोहर (नालंदा, विक्रमशिला, खुदा बख्श)', en: 'Historic Library Heritage of Bihar (Nalanda, Vikramshila, Khuda Bakhsh)' },
          { hi: 'बिहार का इतिहास, 1857 की क्रांति एवं वीर कुंवर सिंह', en: 'History of Bihar, 1857 Revolt & Veer Kunwar Singh' },
          { hi: 'बिहार का भूगोल, नदियां, जनगणना एवं आर्थिक सर्वेक्षण', en: 'Geography, Rivers, Census & Economy of Bihar' },
          { hi: 'राष्ट्रीय एवं बिहार राज्य करंट अफेयर्स', en: 'National & Bihar State Current Affairs' }
        ]
      },
      {
        title: { hi: 'खंड ग: शिक्षण कला एवं तार्किक क्षमता', en: 'Section C: Art of Teaching & Reasoning' },
        questions: '15 - 20 प्रश्न',
        weightage: '15 - 20%',
        topics: [
          { hi: 'शिक्षण पद्धति, बाल मनोविज्ञान एवं NEP 2020', en: 'Teaching Methodology, Child Psychology & NEP 2020' },
          { hi: 'विद्यालय में पठन संस्कृति एवं सूचना साक्षरता', en: 'School Reading Culture & Information Literacy' },
          { hi: 'सामान्य मानसिक योग्यता एवं तार्किक क्षमता (Reasoning)', en: 'General Mental Ability & Logical Reasoning' }
        ]
      }
    ]
  }
};
