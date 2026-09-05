import { Flashcard } from '../types';

export const FLASHCARDS: Flashcard[] = [
  {
    id: 'fc_1',
    category: { hi: 'संस्थापक एवं वर्ष', en: 'Founders & Years' },
    front: { hi: 'भारत में पुस्तकालय विज्ञान के जनक कौन हैं?', en: 'Who is the Father of Library Science in India?' },
    back: { hi: 'डॉ. एस.आर. रंगनाथन (S.R. Ranganathan, 1892-1972)', en: 'Dr. S.R. Ranganathan (1892-1972)' },
    subtext: { hi: '12 अगस्त को राष्ट्रीय लाइब्रेरियन दिवस मनाया जाता है', en: 'National Librarians Day celebrated on August 12' }
  },
  {
    id: 'fc_2',
    category: { hi: 'वर्गीकरण पद्धतियां', en: 'Classification Schemes' },
    front: { hi: 'DDC (Dewey Decimal Classification) के जनक एवं प्रथम वर्ष?', en: 'Founder & 1st Edition year of DDC?' },
    back: { hi: 'मेलविल डेवी (Melvil Dewey) - 1876', en: 'Melvil Dewey - 1876' },
    subtext: { hi: 'प्रथम संस्करण में 44 पृष्ठ थे', en: 'First edition had only 44 pages' }
  },
  {
    id: 'fc_3',
    category: { hi: 'वर्गीकरण पद्धतियां', en: 'Classification Schemes' },
    front: { hi: 'कोलन वर्गीकरण (Colon Classification - CC) का प्रथम संस्करण कब आया?', en: 'When was the 1st edition of Colon Classification published?' },
    back: { hi: 'वर्ष 1933 (डॉ. एस.आर. रंगनाथन द्वारा)', en: 'Year 1933 (by Dr. S.R. Ranganathan)' },
    subtext: { hi: 'प्रणाली: Analytico-Synthetic (विश्लेषणात्मक-संश्लेषणात्मक)', en: 'System: Analytico-Synthetic' }
  },
  {
    id: 'fc_4',
    category: { hi: 'DDC 10 मुख्य वर्ग', en: 'DDC 10 Main Classes' },
    front: { hi: 'DDC में 000, 300, 500 एवं 900 मुख्य वर्ग क्या दर्शाते हैं?', en: 'What do DDC classes 000, 300, 500 & 900 represent?' },
    back: {
      hi: '000: कंप्यूटर/सामान्य\n300: समाज विज्ञान (Social Science)\n500: प्राकृतिक विज्ञान (Pure Science)\n900: इतिहास एवं भूगोल (History/Geography)',
      en: '000: Computer Science & Generalities\n300: Social Sciences\n500: Pure Sciences\n900: History & Geography'
    }
  },
  {
    id: 'fc_5',
    category: { hi: 'पुस्तकालय संघ एवं कानून', en: 'Associations & Legislation' },
    front: { hi: 'ILA एवं IFLA की स्थापना किस वर्ष हुई थी?', en: 'In which years were ILA and IFLA founded?' },
    back: {
      hi: 'IFLA: 1927 (मुख्यालय: द हेग, नीदरलैंड्स)\nILA: 1933 (मुख्यालय: नई दिल्ली, भारत)',
      en: 'IFLA: 1927 (HQ: The Hague, Netherlands)\nILA: 1933 (HQ: New Delhi, India)'
    }
  },
  {
    id: 'fc_6',
    category: { hi: 'बिहार पुस्तकालय धरोहर', en: 'Bihar Library Heritage' },
    front: { hi: 'प्राचीन नालंदा विश्वविद्यालय के पुस्तकालय के 3 भवनों के नाम?', en: 'Names of the 3 library buildings of ancient Nalanda University?' },
    back: {
      hi: '1. रत्नसागर (Ratnasagara)\n2. रत्नोदधि (Ratnodadhi - 9 मंजिला मुख्य भवन)\n3. रत्नरंजक (Ratnaranjaka)\nसम्पूर्ण परिसर का नाम: धर्मगंज',
      en: '1. Ratnasagara\n2. Ratnodadhi (9-storey central building)\n3. Ratnaranjaka\nCampus name: Dharmaganja'
    }
  },
  {
    id: 'fc_7',
    category: { hi: 'सॉफ्टवेयर एवं तकनीक', en: 'Software & Technology' },
    front: { hi: 'Koha और SOUL क्या हैं और कब बने?', en: 'What are Koha and SOUL and when were they created?' },
    back: {
      hi: 'Koha: प्रथम ओपन-सोर्स ILS (1999, न्यूजीलैंड)\nSOUL: INFLIBNET द्वारा भारतीय विश्वविद्यालयों हेतु (नवीनतम SOUL 3.0: 2021)',
      en: 'Koha: 1st Open-Source ILS (1999, New Zealand)\nSOUL: Developed by INFLIBNET for India (SOUL 3.0 in 2021)'
    }
  },
  {
    id: 'fc_8',
    category: { hi: 'अंतर्राष्ट्रीय मानक', en: 'International Standards' },
    front: { hi: 'ISBN एवं ISSN में कुल कितने अंक होते हैं?', en: 'How many digits are in ISBN and ISSN?' },
    back: {
      hi: 'ISBN: 13 अंक (1 जनवरी 2007 से पूर्व 10 अंक थे)\nISSN: 8 अंक (पत्र-पत्रिकाओं / सीरियल्स हेतु)',
      en: 'ISBN: 13 digits (was 10 digits before 2007)\nISSN: 8 digits (for serials/periodicals)'
    }
  }
];
