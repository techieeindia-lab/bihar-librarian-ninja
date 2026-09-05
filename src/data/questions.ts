import { Question } from '../types';

export const QUESTIONS: Question[] = [
  // SECTION 1: FOUNDATIONS OF LIBRARY SCIENCE
  {
    id: 'q_lis_1',
    category: 'lis_foundations',
    question: {
      hi: 'पुस्तकालय विज्ञान के पांच सूत्रों (Five Laws of Library Science) का प्रतिपादन डॉ. एस. आर. रंगनाथन ने किस वर्ष किया था?',
      en: 'In which year did Dr. S. R. Ranganathan formulate the Five Laws of Library Science?'
    },
    options: {
      A: { hi: '1924', en: '1924' },
      B: { hi: '1928', en: '1928' },
      C: { hi: '1931', en: '1931' },
      D: { hi: '1933', en: '1933' }
    },
    correctAnswer: 'B',
    explanation: {
      hi: 'डॉ. रंगनाथन ने 1928 में मीनाक्षी कॉलेज, अन्नामलाई नगर में इन पांच सूत्रों का पहली बार प्रतिपादन किया था। यह पुस्तक के रूप में 1931 में मद्रास लाइब्रेरी एसोसिएशन (MALA) द्वारा प्रकाशित हुआ।',
      en: 'Dr. S.R. Ranganathan formulated the Five Laws in 1928 at Meenakshi College, Annamalai Nagar. They were published as a book in 1931 by Madras Library Association (MALA).'
    },
    difficulty: 'easy',
    sourceExam: 'KVS / Bihar Librarian'
  },
  {
    id: 'q_lis_2',
    category: 'lis_foundations',
    question: {
      hi: '"पुस्तकालय एक वर्धनशील संस्था है" (Library is a growing organism) यह पुस्तकालय विज्ञान का कौन सा सूत्र है?',
      en: '"Library is a growing organism" represents which Law of Library Science?'
    },
    options: {
      A: { hi: 'प्रथम सूत्र', en: 'First Law' },
      B: { hi: 'तृतीय सूत्र', en: 'Third Law' },
      C: { hi: 'चतुर्थ सूत्र', en: 'Fourth Law' },
      D: { hi: 'पंचम सूत्र', en: 'Fifth Law' }
    },
    correctAnswer: 'D',
    explanation: {
      hi: 'पंचम सूत्र कहता है कि पुस्तकालय एक वर्धनशील संस्था है। इसके अनुसार पाठकों, पुस्तकों, कर्मचारियों एवं भवन में निरंतर जैविक वृद्धि होती रहती है। वीपिंग (Weeding out) भी इसी सूत्र से संबंधित है।',
      en: 'The Fifth Law states that the Library is a growing organism. It deals with growth in collection, staff, readers, and space, as well as weeding out of obsolete materials.'
    },
    difficulty: 'easy',
    sourceExam: 'DSSSB / BSLET'
  },
  {
    id: 'q_lis_3',
    category: 'lis_foundations',
    question: {
      hi: 'भारत में प्रथम पुस्तकालय अधिनियम (Library Legislation) किस राज्य में पारित किया गया था?',
      en: 'In which state was the first Public Library Act passed in India?'
    },
    options: {
      A: { hi: 'मद्रास (तमिलनाडु) - 1948', en: 'Madras (Tamil Nadu) - 1948' },
      B: { hi: 'आंध्र प्रदेश - 1960', en: 'Andhra Pradesh - 1960' },
      C: { hi: 'कर्नाटक - 1965', en: 'Karnataka - 1965' },
      D: { hi: 'महाराष्ट्र - 1967', en: 'Maharashtra - 1967' }
    },
    correctAnswer: 'A',
    explanation: {
      hi: 'भारत में स्वतंत्रता के बाद पहला सार्वजनिक पुस्तकालय अधिनियम मद्रास (अब तमिलनाडु) में 1948 में पारित हुआ था। वर्तमान में भारत के 19 राज्यों में पुस्तकालय अधिनियम लागू हैं।',
      en: 'The Madras Public Library Act was the first library legislation passed in independent India in 1948. Currently, 19 states in India have enacted public library acts.'
    },
    difficulty: 'medium',
    sourceExam: 'RSMSSB / Bihar School Lib'
  },
  {
    id: 'q_lis_4',
    category: 'lis_foundations',
    question: {
      hi: 'राजा राममोहन राय पुस्तकालय प्रतिष्ठान (RRRLF) की स्थापना किस वर्ष हुई थी और इसका मुख्यालय कहाँ है?',
      en: 'In which year was the Raja Rammohun Roy Library Foundation (RRRLF) established, and where is its headquarter?'
    },
    options: {
      A: { hi: '1972, कोलकाता', en: '1972, Kolkata' },
      B: { hi: '1954, नई दिल्ली', en: '1954, New Delhi' },
      C: { hi: '1982, पटना', en: '1982, Patna' },
      D: { hi: '1965, मुंबई', en: '1965, Mumbai' }
    },
    correctAnswer: 'A',
    explanation: {
      hi: 'RRRLF की स्थापना मई 1972 में राजा राममोहन राय की 200वीं जयंती के अवसर पर संस्कृति मंत्रालय, भारत सरकार द्वारा कोलकाता में की गई थी। यह भारत में सार्वजनिक पुस्तकालयों के विकास हेतु सर्वोच्च संस्था है।',
      en: 'RRRLF was established in May 1972 in Kolkata by the Ministry of Culture on the bicentenary of Raja Rammohun Roy. It promotes public library development across India.'
    },
    difficulty: 'medium',
    sourceExam: 'BPSC / KVS'
  },
  {
    id: 'q_lis_5',
    category: 'lis_foundations',
    question: {
      hi: 'भारतीय पुस्तकालय संघ (ILA - Indian Library Association) की स्थापना किस वर्ष हुई थी?',
      en: 'When was the Indian Library Association (ILA) founded?'
    },
    options: {
      A: { hi: '1920', en: '1920' },
      B: { hi: '1933', en: '1933' },
      C: { hi: '1945', en: '1945' },
      D: { hi: '1951', en: '1951' }
    },
    correctAnswer: 'B',
    explanation: {
      hi: 'ILA की स्थापना 13 सितंबर 1933 को कलकत्ता (कोलकाता) में ऑल इंडिया लाइब्रेरी कॉन्फ्रेंस के दौरान हुई थी। डॉ. एम.ओ. थॉमस इसके प्रथम अध्यक्ष और के.एम. असदुल्लाह प्रथम सचिव थे।',
      en: 'ILA was founded on September 13, 1933, during the All India Library Conference in Calcutta. Dr. M.O. Thomas was the first President and K.M. Asadullah was the first Secretary.'
    },
    difficulty: 'medium',
    sourceExam: 'DSSSB / UGC NET'
  },

  // SECTION 2: CLASSIFICATION & CATALOGUING
  {
    id: 'q_cat_1',
    category: 'classification_cataloguing',
    question: {
      hi: 'डेवी दशमलव वर्गीकरण (DDC) का प्रथम संस्करण किस वर्ष प्रकाशित हुआ था?',
      en: 'In which year was the first edition of the Dewey Decimal Classification (DDC) published?'
    },
    options: {
      A: { hi: '1876', en: '1876' },
      B: { hi: '1885', en: '1885' },
      C: { hi: '1891', en: '1891' },
      D: { hi: '1900', en: '1900' }
    },
    correctAnswer: 'A',
    explanation: {
      hi: 'मेलविल डेवी (Melvil Dewey) ने 1876 में DDC का प्रथम संस्करण मात्र 44 पृष्ठों में गुमनाम रूप से प्रकाशित किया था। इसका शीर्षक "A Classification and Subject Index for Cataloguing and Arranging the Books and Pamphlets of a Library" था।',
      en: 'Melvil Dewey published the 1st edition of DDC anonymously in 1876 with only 44 pages. It revolutionized classification through decimal notation.'
    },
    difficulty: 'easy',
    sourceExam: 'Bihar Librarian / KVS'
  },
  {
    id: 'q_cat_2',
    category: 'classification_cataloguing',
    question: {
      hi: 'कोलन वर्गीकरण (Colon Classification - CC) में मूलभूत श्रेणियों (PMEST) में "M" का क्या अर्थ है?',
      en: 'In Colon Classification (CC), what does "M" stand for in the fundamental categories (PMEST)?'
    },
    options: {
      A: { hi: 'Method (विधि)', en: 'Method' },
      B: { hi: 'Matter (पदार्थ)', en: 'Matter' },
      C: { hi: 'Management (प्रबंधन)', en: 'Management' },
      D: { hi: 'Mechanism (यांत्रिकी)', en: 'Mechanism' }
    },
    correctAnswer: 'B',
    explanation: {
      hi: 'रंगनाथन ने ज्ञान को 5 मूलभूत श्रेणियों (PMEST) में विभाजित किया: P=Personality (व्यक्तित्व, योजक चिह्न ,), M=Matter (पदार्थ, योजक चिह्न ;), E=Energy (ऊर्जा, योजक चिह्न :), S=Space (स्थान, योजक चिह्न .), T=Time (काल, योजक चिह्न \')।',
      en: 'Ranganathan classified all attributes into PMEST: P=Personality (,), M=Matter (;), E=Energy (:), S=Space (.), T=Time (\'). M stands for Matter.'
    },
    difficulty: 'medium',
    sourceExam: 'BSLET / UGC NET'
  },
  {
    id: 'q_cat_3',
    category: 'classification_cataloguing',
    question: {
      hi: 'AACR-2 (Anglo-American Cataloguing Rules, 2nd ed.) किस वर्ष प्रकाशित हुआ था?',
      en: 'In which year was AACR-2 published?'
    },
    options: {
      A: { hi: '1967', en: '1967' },
      B: { hi: '1978', en: '1978' },
      C: { hi: '1988', en: '1988' },
      D: { hi: '1998', en: '1998' }
    },
    correctAnswer: 'B',
    explanation: {
      hi: 'AACR-1 1967 में तथा AACR-2 1978 में प्रकाशित हुआ। इसका संपादन माइकल गोरमैन (Michael Gorman) और पॉल डब्ल्यू. विंकलर ने किया था। 1988 में इसका संशोधित संस्करण (AACR-2R) आया।',
      en: 'AACR-1 was published in 1967 and AACR-2 in 1978, edited by Michael Gorman and Paul W. Winkler. AACR-2 Revised came in 1988.'
    },
    difficulty: 'medium',
    sourceExam: 'NVS / Bihar Librarian'
  },
  {
    id: 'q_cat_4',
    category: 'classification_cataloguing',
    question: {
      hi: 'DDC के 19वें संस्करण (19th Edition) में कुल कितने खंड (Volumes) हैं?',
      en: 'How many volumes are there in the 19th edition of DDC?'
    },
    options: {
      A: { hi: '2 खंड', en: '2 Volumes' },
      B: { hi: '3 खंड', en: '3 Volumes' },
      C: { hi: '4 खंड', en: '4 Volumes' },
      D: { hi: '5 खंड', en: '5 Volumes' }
    },
    correctAnswer: 'B',
    explanation: {
      hi: 'DDC 19वां संस्करण (1979) 3 खंडों में प्रकाशित हुआ: खंड 1 - Introduction/Tables, खंड 2 - Schedules, खंड 3 - Relative Index। (नोट: 20वें, 21वें, 22वें व 23वें संस्करण में 4 खंड हैं)।',
      en: 'DDC 19th edition (1979) was published in 3 volumes: Vol 1 Tables, Vol 2 Schedules, Vol 3 Relative Index. (20th-23rd editions have 4 volumes).'
    },
    difficulty: 'hard',
    sourceExam: 'RSMSSB / BPSC'
  },
  {
    id: 'q_cat_5',
    category: 'classification_cataloguing',
    question: {
      hi: 'अंतर्राष्ट्रीय मानक पुस्तक संख्या (ISBN) 1 जनवरी 2007 से कितने अंकों की हो गई है?',
      en: 'Since January 1, 2007, how many digits does an ISBN (International Standard Book Number) consist of?'
    },
    options: {
      A: { hi: '10 अंक', en: '10 digits' },
      B: { hi: '12 अंक', en: '12 digits' },
      C: { hi: '13 अंक', en: '13 digits' },
      D: { hi: '15 अंक', en: '15 digits' }
    },
    correctAnswer: 'C',
    explanation: {
      hi: '1 जनवरी 2007 से ISBN 10 अंकों से बढ़कर 13 अंकों का हो गया है। इसमें 5 भाग होते हैं: GS1 उपसर्ग (978 या 979), देश/भाषा पहचानकर्ता, प्रकाशक कोड, शीर्षक पहचानकर्ता, और चेक अंक।',
      en: 'Since Jan 1, 2007, ISBN has 13 digits across 5 elements: GS1 prefix (978/979), Registration group, Registrant, Publication, and Check digit.'
    },
    difficulty: 'easy',
    sourceExam: 'BSEB LET / KVS'
  },

  // SECTION 3: REFERENCE SOURCES & INFORMATION SERVICES
  {
    id: 'q_ref_1',
    category: 'reference_sources',
    question: {
      hi: 'सूचना के प्राथमिक स्रोत (Primary Sources) के अंतर्गत क्या आता है?',
      en: 'Which of the following is considered a Primary Source of information?'
    },
    options: {
      A: { hi: 'शोध पत्रिका (Research Periodical/Article)', en: 'Research Periodical / Article' },
      B: { hi: 'पाठ्यपुस्तक (Textbook)', en: 'Textbook' },
      C: { hi: 'विश्वकोश (Encyclopedia)', en: 'Encyclopedia' },
      D: { hi: 'ग्रंथसूची (Bibliography)', en: 'Bibliography' }
    },
    correctAnswer: 'A',
    explanation: {
      hi: 'शोध पत्रिकाएँ, शोध प्रबंध (Theses), पेटेंट, मानक और सम्मेलन कार्यवाही प्राथमिक स्रोत हैं। पाठ्यपुस्तक और विश्वकोश द्वितीयक स्रोत हैं, जबकि ग्रंथसूची तृतीयक स्रोत है।',
      en: 'Research periodicals, theses, patents, conference papers, and standards contain original findings and are primary sources. Encyclopedias and textbooks are secondary.'
    },
    difficulty: 'easy',
    sourceExam: 'DSSSB / BSLET'
  },
  {
    id: 'q_ref_2',
    category: 'reference_sources',
    question: {
      hi: 'SDI (Selective Dissemination of Information - चयनात्मक सूचना प्रसार) की अवधारणा का विकास किसने किया था?',
      en: 'Who developed the concept of Selective Dissemination of Information (SDI)?'
    },
    options: {
      A: { hi: 'एच. पी. लुहान (H. P. Luhn) - 1958', en: 'H. P. Luhn - 1958' },
      B: { hi: 'एस. आर. रंगनाथन', en: 'S. R. Ranganathan' },
      C: { hi: 'डेरेक ऑस्टिन (Derek Austin)', en: 'Derek Austin' },
      D: { hi: 'यूजीन गारफ़ील्ड (Eugene Garfield)', en: 'Eugene Garfield' }
    },
    correctAnswer: 'A',
    explanation: {
      hi: 'SDI सेवा की अवधारणा आईबीएम (IBM) के वैज्ञानिक हैंस पीटर लुहान (H.P. Luhn) द्वारा 1958 में दी गई थी। इसमें उपयोगकर्ता प्रोफ़ाइल (User Profile) और दस्तावेज़ प्रोफ़ाइल (Document Profile) का मिलान किया जाता है।',
      en: 'Hans Peter Luhn of IBM developed the concept of SDI in 1958. It matches user interest profiles with incoming document profiles to deliver targeted alerts.'
    },
    difficulty: 'medium',
    sourceExam: 'KVS / BPSC'
  },
  {
    id: 'q_ref_3',
    category: 'reference_sources',
    question: {
      hi: '"इनसाइक्लोपीडिया ब्रिटैनिका" (Encyclopaedia Britannica) का प्रथम संस्करण किस वर्ष प्रकाशित हुआ था?',
      en: 'In which year was the first edition of Encyclopaedia Britannica published?'
    },
    options: {
      A: { hi: '1768 - 1771', en: '1768 - 1771' },
      B: { hi: '1801 - 1805', en: '1801 - 1805' },
      C: { hi: '1850', en: '1850' },
      D: { hi: '1911', en: '1911' }
    },
    correctAnswer: 'A',
    explanation: {
      hi: 'इनसाइक्लोपीडिया ब्रिटैनिका का प्रथम संस्करण 1768 से 1771 के मध्य एडिनबर्ग (स्कॉटलैंड) से 3 खंडों में प्रकाशित हुआ था। 2012 के बाद इसका मुद्रित संस्करण बंद कर इसे पूर्णतः डिजिटल कर दिया गया।',
      en: 'Encyclopaedia Britannica 1st edition was published between 1768 and 1771 in Edinburgh, Scotland in 3 volumes. The print edition ceased in 2012 in favor of digital.'
    },
    difficulty: 'medium',
    sourceExam: 'UGC NET / Bihar School'
  },

  // SECTION 4: LIBRARY AUTOMATION & ICT
  {
    id: 'q_ict_1',
    category: 'automation_ict',
    question: {
      hi: '"कोहा" (Koha) क्या है?',
      en: 'What is "Koha" in library science?'
    },
    options: {
      A: { hi: 'एक ओपन-सोर्स इंटीग्रेटेड लाइब्रेरी मैनेजमेंट सिस्टम (ILS)', en: 'An Open-Source Integrated Library Management System (ILS)' },
      B: { hi: 'एक डिजिटल लाइब्रेरी रिपॉजिटरी सॉफ्टवेयर', en: 'A Digital Library Repository Software' },
      C: { hi: 'एक व्यावसायिक ई-बुक रीडर', en: 'A Commercial E-book Reader' },
      D: { hi: 'पुस्तकालय सांख्यिकी डेटाबेस', en: 'A Library Statistics Database' },
    },
    correctAnswer: 'A',
    explanation: {
      hi: 'कोहा दुनिया का पहला ओपन-सोर्स एकीकृत पुस्तकालय प्रबंधन प्रणाली (ILS) है, जिसे 1999 में न्यूजीलैंड के कातिपो कम्युनिकेशंस द्वारा होरोव्हेनुआ लाइब्रेरी ट्रस्ट के लिए विकसित किया गया था।',
      en: 'Koha is the worlds first open-source Integrated Library System (ILS), developed in 1999 in New Zealand by Katipo Communications for the Horowhenua Library Trust.'
    },
    difficulty: 'easy',
    sourceExam: 'Bihar School Lib / DSSSB'
  },
  {
    id: 'q_ict_2',
    category: 'automation_ict',
    question: {
      hi: 'SOUL (Software for University Libraries) सॉफ्टवेयर किसके द्वारा विकसित किया गया है?',
      en: 'SOUL software was developed by which organization in India?'
    },
    options: {
      A: { hi: 'INFLIBNET (सूचना एवं पुस्तकालय नेटवर्क केंद्र)', en: 'INFLIBNET Centre' },
      B: { hi: 'DELNET (विकासशील पुस्तकालय नेटवर्क)', en: 'DELNET' },
      C: { hi: 'NISCAIR / CSIR', en: 'NISCAIR / CSIR' },
      D: { hi: 'NIC (राष्ट्रीय सूचना विज्ञान केंद्र)', en: 'NIC' }
    },
    correctAnswer: 'A',
    explanation: {
      hi: 'SOUL सॉफ्टवेयर INFLIBNET केंद्र (अहमदाबाद/गांधीनगर) द्वारा विशेष रूप से भारतीय विश्वविद्यालयों एवं महाविद्यालय पुस्तकालयों के स्वचालन हेतु तैयार किया गया है। इसका नवीनतम संस्करण SOUL 3.0 है।',
      en: 'SOUL was developed by the INFLIBNET Centre (Gandhinagar) for automating university and college libraries in India. The current version is SOUL 3.0.'
    },
    difficulty: 'easy',
    sourceExam: 'BPSC / KVS'
  },
  {
    id: 'q_ict_3',
    category: 'automation_ict',
    question: {
      hi: 'संस्थागत रिपॉजिटरी (Institutional Repository) और डिजिटल लाइब्रेरी बनाने हेतु सर्वाधिक प्रयुक्त ओपन सोर्स सॉफ्टवेयर कौन सा है?',
      en: 'Which open-source software is widely used to create Institutional Repositories and Digital Libraries?'
    },
    options: {
      A: { hi: 'DSpace', en: 'DSpace' },
      B: { hi: 'Koha', en: 'Koha' },
      C: { hi: 'SOUL', en: 'SOUL' },
      D: { hi: 'LibSys', en: 'LibSys' }
    },
    correctAnswer: 'A',
    explanation: {
      hi: 'DSpace और EPrints डिजिटल रिपॉजिटरी के प्रमुख सॉफ्टवेयर हैं। DSpace को एमआईटी (MIT) और एचपी लैब्स (HP Labs) द्वारा 2002 में विकसित किया गया था।',
      en: 'DSpace is the most popular open-source software for institutional repositories, originally created in 2002 by MIT Libraries and Hewlett-Packard (HP).'
    },
    difficulty: 'medium',
    sourceExam: 'DSSSB / UGC NET'
  },
  {
    id: 'q_ict_4',
    category: 'automation_ict',
    question: {
      hi: 'RFID (Radio Frequency Identification) का पुस्तकालयों में मुख्य उपयोग क्या है?',
      en: 'What is the primary application of RFID technology in modern libraries?'
    },
    options: {
      A: { hi: 'पुस्तकों के परिसंचरण (Issue/Return) एवं सुरक्षा प्रबंधन में', en: 'Automated book circulation (Issue/Return) & anti-theft security' },
      B: { hi: 'किताबों की छपाई के लिए', en: 'For printing books' },
      C: { hi: 'इंटरनेट की गति बढ़ाने के लिए', en: 'For boosting Wi-Fi speeds' },
      D: { hi: 'पुस्तकालय बजट बनाने में', en: 'For calculating library budget' }
    },
    correctAnswer: 'A',
    explanation: {
      hi: 'RFID तकनीक रेडियो तरंगों के माध्यम से बिना स्पर्श किए एक साथ कई किताबों को इश्यू/रिटर्न (सेल्फ-चेकआउट कियोस्क), स्टॉक वेरिफिकेशन तथा चोरी से सुरक्षा (गेट सेंसर) में सक्षम बनाती है।',
      en: 'RFID uses radio waves for contactless multi-item check-in/out, shelf inventory, and anti-theft gates at library exits.'
    },
    difficulty: 'easy',
    sourceExam: 'Bihar Librarian / NVS'
  },

  // SECTION 5: LIBRARY MANAGEMENT
  {
    id: 'q_mgmt_1',
    category: 'management',
    question: {
      hi: 'ब्राउने और नेवार्क प्रणाली (Browne & Newark Charging Systems) पुस्तकालय के किस विभाग से संबंधित हैं?',
      en: 'The Browne and Newark charging systems are associated with which library department?'
    },
    options: {
      A: { hi: 'परिसंचरण विभाग (Circulation / Issue-Return)', en: 'Circulation Department' },
      B: { hi: 'अधिग्रहण विभाग (Acquisition)', en: 'Acquisition Department' },
      C: { hi: 'संदर्भ विभाग (Reference)', en: 'Reference Department' },
      D: { hi: 'तकनीकी विभाग (Cataloguing)', en: 'Technical Department' }
    },
    correctAnswer: 'A',
    explanation: {
      hi: 'नीना ई. ब्राउने द्वारा 1895 में ब्राउने चार्जिंग प्रणाली तथा फ्रैंक पी. हिल द्वारा 1900 में नेवार्क प्रणाली का आविष्कार पुस्तकों के निर्गम एवं आगम (Issue-Return) के लिए किया गया था।',
      en: 'The Browne system (Nina E. Browne, 1895) and Newark system (Frank P. Hill, 1900) are circulation/lending transaction systems for tracking borrowed books.'
    },
    difficulty: 'medium',
    sourceExam: 'KVS / Bihar School Lib'
  },
  {
    id: 'q_mgmt_2',
    category: 'management',
    question: {
      hi: 'पुस्तकालय बजट की किस विधि में पिछले वर्ष के व्यय को आधार न मानकर प्रत्येक वर्ष नए सिरे से शून्य से शुरुआत की जाती है?',
      en: 'Which library budgeting method starts from scratch each year without using previous years expenditure as a base?'
    },
    options: {
      A: { hi: 'शून्य आधारित बजट (Zero-Based Budgeting - ZBB)', en: 'Zero-Based Budgeting (ZBB)' },
      B: { hi: 'ऐतिहासिक बजट (Historical Budget)', en: 'Historical Budget' },
      C: { hi: 'प्रदर्शन बजट (Performance Budget)', en: 'Performance Budget' },
      D: { hi: 'सूत्र बजट (Formula Budget)', en: 'Formula Budget' }
    },
    correctAnswer: 'A',
    explanation: {
      hi: 'शून्य आधारित बजट (ZBB) का विकास पीटर ए. पायर (Peter A. Phyrr) ने 1970 में किया था। इसमें प्रत्येक व्यय को हर वर्ष नए सिरे से औचित्य साबित करना पड़ता है।',
      en: 'Zero-Based Budgeting (ZBB), originated by Peter A. Phyrr in 1970, requires every department to justify each rupee of expenditure afresh from zero base.'
    },
    difficulty: 'medium',
    sourceExam: 'RSMSSB / BPSC'
  },

  // SECTION 6: BIHAR SPECIAL GK
  {
    id: 'q_bihar_1',
    category: 'bihar_gk',
    question: {
      hi: 'प्राचीन नालंदा विश्वविद्यालय के पुस्तकालय का क्या नाम था, जिसमें तीन विशाल भवन - रत्नसागर, रत्नोदधि एवं रत्नरंजक शामिल थे?',
      en: 'What was the name of the ancient Nalanda University library which comprised three grand buildings - Ratnasagara, Ratnodadhi, and Ratnaranjaka?'
    },
    options: {
      A: { hi: 'धर्मगंज (Dharmaganja)', en: 'Dharmaganja' },
      B: { hi: 'ज्ञानकोश', en: 'Gyaankosh' },
      C: { hi: 'विद्यासागर', en: 'Vidyasagar' },
      D: { hi: 'भारती भवन', en: 'Bharati Bhavan' }
    },
    correctAnswer: 'A',
    explanation: {
      hi: 'प्राचीन नालंदा विश्वविद्यालय के भव्य पुस्तकालय परिसर को "धर्मगंज" (धर्म का पर्वत) कहा जाता था। इसमें नौ मंजिला "रत्नोदधि" मुख्य भवन था। 1193 में बख्तियार खिलजी ने इसे नष्ट कर दिया था।',
      en: 'The great library complex of ancient Nalanda University was called "Dharmaganja" (Mountain of Truth), housing Ratnasagara, Ratnodadhi (9-storey building), and Ratnaranjaka.'
    },
    difficulty: 'easy',
    sourceExam: 'Bihar Special / BPSC'
  },
  {
    id: 'q_bihar_2',
    category: 'bihar_gk',
    question: {
      hi: 'पटना में स्थित प्रसिद्ध "खुदा बख्श ओरिएंटल पब्लिक लाइब्रेरी" को राष्ट्रीय महत्व का संस्थान किस वर्ष घोषित किया गया था?',
      en: 'In which year was the famous Khuda Bakhsh Oriental Public Library in Patna declared an Institution of National Importance by an Act of Parliament?'
    },
    options: {
      A: { hi: '1969', en: '1969' },
      B: { hi: '1891', en: '1891' },
      C: { hi: '1947', en: '1947' },
      D: { hi: '1985', en: '1985' }
    },
    correctAnswer: 'A',
    explanation: {
      hi: 'खुदा बख्श ओरिएंटल पब्लिक लाइब्रेरी को 1891 में आम जनता के लिए खोला गया था। संसद के अधिनियम 1969 द्वारा इसे राष्ट्रीय महत्व का संस्थान (Institution of National Importance) घोषित किया गया।',
      en: 'Opened to the public in 1891 by Khan Bahadur Khuda Bakhsh, it was recognized as an Institution of National Importance by an Act of Parliament in 1969.'
    },
    difficulty: 'medium',
    sourceExam: 'BPSC / Bihar Librarian'
  },
  {
    id: 'q_bihar_3',
    category: 'bihar_gk',
    question: {
      hi: 'बिहार राज्य में "बिहार राज्य पुस्तकालय अधिनियम" (Bihar State Public Library Act) किस वर्ष पारित किया गया था?',
      en: 'In which year was the Bihar State Public Library Act enacted?'
    },
    options: {
      A: { hi: '2008', en: '2008' },
      B: { hi: '1989', en: '1989' },
      C: { hi: '2015', en: '2015' },
      D: { hi: '2001', en: '2001' }
    },
    correctAnswer: 'A',
    explanation: {
      hi: 'बिहार सरकार द्वारा "बिहार राज्य पुस्तकालय एवं सूचना केंद्र अधिनियम" वर्ष 2008 में पारित किया गया था।',
      en: 'The Bihar State Public Library and Information Centre Act was enacted in the year 2008.'
    },
    difficulty: 'medium',
    sourceExam: 'Bihar Librarian Special'
  },
  {
    id: 'q_bihar_4',
    category: 'bihar_gk',
    question: {
      hi: 'बिहार में 1857 के प्रथम स्वतंत्रता संग्राम का नेतृत्व किसने किया था?',
      en: 'Who led the First War of Indian Independence of 1857 in Bihar?'
    },
    options: {
      A: { hi: 'बाबू वीर कुंवर सिंह', en: 'Babu Veer Kunwar Singh' },
      B: { hi: 'पीर अली खान', en: 'Pir Ali Khan' },
      C: { hi: 'अमर सिंह', en: 'Amar Singh' },
      D: { hi: 'उपरोक्त सभी (विभिन्न चरणों में)', en: 'All of the above (in respective phases)' }
    },
    correctAnswer: 'D',
    explanation: {
      hi: 'जगदीशपुर (आरा) के 80 वर्षीय जमींदार बाबू वीर कुंवर सिंह ने बिहार में 1857 की क्रांति का मुख्य नेतृत्व किया। पटना में पुस्तक विक्रेता पीर अली ने जुलाई 1857 में विद्रोह का बिगुल फूंका था, और कुंवर सिंह के भाई अमर सिंह ने बाद में मोर्चा संभाला।',
      en: 'Babu Veer Kunwar Singh was the supreme commander of the 1857 revolt in Bihar from Jagdishpur. Pir Ali led the revolt in Patna, and Kunwar Singhs brother Amar Singh continued the struggle.'
    },
    difficulty: 'easy',
    sourceExam: 'BPSC General Studies'
  },

  // SECTION 7: TEACHING METHODOLOGY / ART OF TEACHING
  {
    id: 'q_teach_1',
    category: 'teaching_aptitude',
    question: {
      hi: 'एक विद्यालय पुस्तकालयाध्यक्ष का विद्यार्थियों में पठन संस्कृति (Reading Culture) विकसित करने हेतु सबसे प्रभावी कदम क्या है?',
      en: 'What is the most effective step a school librarian can take to develop reading culture among students?'
    },
    options: {
      A: { hi: 'विद्यार्थियों की रुचि अनुसार पुस्तक क्लब, कहानी वाचन एवं बुक फेयर का आयोजन करना', en: 'Organizing book clubs, storytelling sessions & book fairs based on student interests' },
      B: { hi: 'किताबें न पढ़ने पर दंड देना', en: 'Punishing students who do not borrow books' },
      C: { hi: 'अलमारियों में किताबें बंद करके ताला लगाना', en: 'Keeping books locked in glass cupboards' },
      D: { hi: 'केवल पाठ्यक्रम की पाठ्यपुस्तकें रखना', en: 'Only stocking textbook curriculum materials' }
    },
    correctAnswer: 'A',
    explanation: {
      hi: 'राष्ट्रीय शिक्षा नीति (NEP 2020) के अनुसार विद्यालय पुस्तकालयों को जीवंत शिक्षण केंद्र बनाना चाहिए। बुक क्लब, पठन प्रतियोगिताएं और ओपन एक्सेस प्रणाली छात्रों को आकर्षित करती है।',
      en: 'As highlighted in NEP 2020, school libraries should foster joyful learning through student book clubs, literary activities, and open stack browsing.'
    },
    difficulty: 'easy',
    sourceExam: 'BSLET / STET'
  },
  {
    id: 'q_teach_2',
    category: 'teaching_aptitude',
    question: {
      hi: 'सूचना साक्षरता (Information Literacy) से क्या तात्पर्य है?',
      en: 'What is meant by "Information Literacy"?'
    },
    options: {
      A: { hi: 'सूचना की आवश्यकता को पहचानना, उसे खोजना, मूल्यांकन करना और प्रभावी ढंग से उपयोग करना', en: 'The ability to recognize when information is needed, locate, evaluate, and use it effectively' },
      B: { hi: 'केवल कंप्यूटर चालू और बंद करना सीखना', en: 'Learning how to power on and off a PC' },
      C: { hi: 'पुस्तकालय की सभी किताबों को रटना', en: 'Memorizing the catalogue of the library' },
      D: { hi: 'बिना जांचे इंटरनेट सामग्री पर विश्वास करना', en: 'Believing all internet content uncritically' }
    },
    correctAnswer: 'A',
    explanation: {
      hi: 'पॉल ज़ुरकोव्स्की (Paul Zurkowski) ने 1974 में "सूचना साक्षरता" शब्द गढ़ा था। यह 21वीं सदी के विद्यार्थियों और शिक्षकों के लिए एक अनिवार्य योग्यता है।',
      en: 'Paul Zurkowski coined "Information Literacy" in 1974. It refers to the skill of identifying information needs, finding reliable data, and evaluating sources critically.'
    },
    difficulty: 'easy',
    sourceExam: 'BSEB LET / KVS'
  }
];
