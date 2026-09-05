import { MockTest } from '../types';
import { QUESTIONS } from './questions';

export const MOCK_TESTS: MockTest[] = [
  {
    id: 'test_full_1',
    title: {
      hi: 'बिहार विद्यालय पुस्तकालयाध्यक्ष फुल मॉक टेस्ट - 01',
      en: 'Bihar School Librarian Full Mock Test - 01'
    },
    subtitle: {
      hi: 'नवीनतम BPSC एवं BSEB पात्रता परीक्षा पैटर्न पर आधारित',
      en: 'Based on Latest BPSC & BSEB Eligibility Exam Pattern'
    },
    durationMinutes: 60,
    totalMarks: 100,
    passMarks: 45,
    questionCount: QUESTIONS.length,
    questionIds: QUESTIONS.map(q => q.id),
    type: 'full_length',
    badge: {
      hi: 'सर्वाधिक लोकप्रिय',
      en: 'Most Popular'
    }
  },
  {
    id: 'test_sec_foundations',
    title: {
      hi: 'यूनिट 1: पुस्तकालय विज्ञान के आधार एवं 5 नियम',
      en: 'Unit 1: Foundations of LIS & 5 Laws'
    },
    subtitle: {
      hi: 'रंगनाथन के नियम, पुस्तकालय अधिनियम एवं संघ (ILA, RRRLF)',
      en: 'Ranganathans Laws, Library Legislation & Associations'
    },
    durationMinutes: 15,
    totalMarks: 25,
    passMarks: 12,
    questionCount: QUESTIONS.filter(q => q.category === 'lis_foundations').length,
    questionIds: QUESTIONS.filter(q => q.category === 'lis_foundations').map(q => q.id),
    type: 'sectional',
    badge: {
      hi: 'कोर सिलेबस',
      en: 'Core Syllabus'
    }
  },
  {
    id: 'test_sec_classification',
    title: {
      hi: 'यूनिट 2: वर्गीकरण एवं सूचीकरण (DDC, CC, AACR-2)',
      en: 'Unit 2: Classification & Cataloguing (DDC, CC, AACR-2)'
    },
    subtitle: {
      hi: 'डेवी दशमलव, कोलन, ISBN एवं कैटलॉगिंग कोड',
      en: 'Dewey Decimal, Colon, ISBN & Cataloguing Codes'
    },
    durationMinutes: 15,
    totalMarks: 25,
    passMarks: 12,
    questionCount: QUESTIONS.filter(q => q.category === 'classification_cataloguing').length,
    questionIds: QUESTIONS.filter(q => q.category === 'classification_cataloguing').map(q => q.id),
    type: 'sectional',
    badge: {
      hi: 'अति महत्वपूर्ण',
      en: 'High Yield'
    }
  },
  {
    id: 'test_sec_automation',
    title: {
      hi: 'यूनिट 3: पुस्तकालय स्वचालन, कोहा एवं ICT',
      en: 'Unit 3: Library Automation, Koha & ICT'
    },
    subtitle: {
      hi: 'Koha, SOUL 3.0, DSpace, RFID एवं डिजिटल लाइब्रेरी',
      en: 'Koha, SOUL 3.0, DSpace, RFID & Digital Libraries'
    },
    durationMinutes: 15,
    totalMarks: 20,
    passMarks: 10,
    questionCount: QUESTIONS.filter(q => q.category === 'automation_ict').length,
    questionIds: QUESTIONS.filter(q => q.category === 'automation_ict').map(q => q.id),
    type: 'sectional'
  },
  {
    id: 'test_sec_bihar',
    title: {
      hi: 'यूनिट 4: बिहार विशेष सामान्य ज्ञान एवं धरोहर',
      en: 'Unit 4: Bihar Special GK & Heritage'
    },
    subtitle: {
      hi: 'नालंदा-विक्रमशिला, खुदा बख्श लाइब्रेरी, इतिहास एवं 1857 क्रांति',
      en: 'Nalanda-Vikramshila, Khuda Bakhsh, History & 1857 Revolt'
    },
    durationMinutes: 15,
    totalMarks: 20,
    passMarks: 10,
    questionCount: QUESTIONS.filter(q => q.category === 'bihar_gk').length,
    questionIds: QUESTIONS.filter(q => q.category === 'bihar_gk').map(q => q.id),
    type: 'sectional',
    badge: {
      hi: 'बिहार स्पेशल',
      en: 'Bihar Special'
    }
  },
  {
    id: 'test_sec_teaching',
    title: {
      hi: 'यूनिट 5: शिक्षण कला एवं सूचना साक्षरता',
      en: 'Unit 5: Art of Teaching & Information Literacy'
    },
    subtitle: {
      hi: 'NEP 2020, पठन संस्कृति, बाल मनोविज्ञान एवं विद्यालय पुस्तकालय',
      en: 'NEP 2020, Reading Culture, Child Psychology & School Lib'
    },
    durationMinutes: 10,
    totalMarks: 15,
    passMarks: 8,
    questionCount: QUESTIONS.filter(q => q.category === 'teaching_aptitude').length,
    questionIds: QUESTIONS.filter(q => q.category === 'teaching_aptitude').map(q => q.id),
    type: 'sectional'
  }
];
