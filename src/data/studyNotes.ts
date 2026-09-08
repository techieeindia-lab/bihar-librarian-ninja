import { StudyUnit } from '../types/index';

export const STUDY_UNITS: StudyUnit[] = [
  // =========================================================================
  // UNIT 1: पुस्तकालय, समाज एवं कानून (Library, Information and Society) - 5 Topics
  // =========================================================================
  {
    id: 'unit_1',
    unitNumber: 1,
    title: {
      hi: 'यूनिट 1: पुस्तकालय, समाज एवं कानून',
      en: 'Unit 1: Library, Information and Society',
    },
    shortDesc: {
      hi: 'पुस्तकालयों के प्रकार, रंगनाथन के 5 सूत्र, 19 राज्य अधिनियम, ILA/IFLA व RRRLF',
      en: 'Types of Libraries, Five Laws, 19 State Acts, ILA/IFLA & RRRLF',
    },
    iconName: 'book',
    topics: [
      {
        id: 'u1_t1',
        title: {
          hi: '1.1 पुस्तकालयों के प्रकार (सार्वजनिक, शैक्षणिक, विशिष्ट, राष्ट्रीय) एवं समाज में भूमिका',
          en: '1.1 Types of Libraries (Public, Academic, Special, National) & Role in Society',
        },
        content: {
          hi: `### पुस्तकालयों की अवधारणा एवं सामाजिक महत्व
पुस्तकालय मानव जाति के संचित ज्ञान का वह भंडार है जो समाज के बौद्धिक, सांस्कृतिक एवं आर्थिक उत्थान में केंद्रीय भूमिका निभाता है। यूनेस्को घोषणापत्र के अनुसार, सार्वजनिक पुस्तकालय "जीवंत ज्ञान का केंद्र" और "जनता का विश्वविद्यालय" (People's University) है।

#### 1. सार्वजनिक पुस्तकालय (Public Libraries)
- **परिभाषा:** जाति, धर्म, लिंग अथवा आर्थिक स्थिति के भेदभाव के बिना समाज के प्रत्येक नागरिक के लिए निःशुल्क या न्यूनतम शुल्क पर सुलभ।
- **उद्देश्य:** अनौपचारिक एवं आजीवन शिक्षा (Lifelong Learning) को बढ़ावा देना, नागरिक चेतना जगाना और स्वस्थ मनोरंजन प्रदान करना।
- **वित्तपोषण:** राज्य सरकार, स्थानीय निकाय, पुस्तकालय उपकर (Library Cess) और राजा राममोहन राय लाइब्रेरी फाउंडेशन (RRRLF)।

#### 2. शैक्षणिक पुस्तकालय (Academic Libraries)
- **विद्यालय पुस्तकालय (School):** पठन आदतों का निर्माण, बाल मनोविज्ञान आधारित संदर्भ सेवा। (मुदालियर आयोग 1952-53 ने विद्यालय पुस्तकालय को विद्यालय का हृदय कहा था)।
- **महाविद्यालय पुस्तकालय (College):** स्नातक एवं स्नातकोत्तर स्तर पर पाठ्यक्रम आधारित अध्ययन सामग्री।
- **विश्वविद्यालय पुस्तकालय (University):** उच्च शोध, शोधगंगा, शोधसिंधु और गहन संदर्भ सेवा। (राधाकृष्णन आयोग 1948 ने पुस्तकालय को विश्वविद्यालय की आत्मा बताया)।

#### 3. विशिष्ट पुस्तकालय (Special Libraries)
- किसी विशिष्ट विषय (जैसे विज्ञान, चिकित्सा, विधि, कृषि) अथवा विशिष्ट संगठन (ISRO, DRDO, ICMR, IARI) के शोधकर्ताओं व वैज्ञानिकों को सेवाएं प्रदान करते हैं।
- यहाँ पत्रिकाओं, तकनीकी प्रतिवेदनों, डेटाबेस एवं पेटेंट्स को प्राथमिकता दी जाती है।
- सामयिक अभिज्ञता सेवा (CAS) एवं चयनात्मक सूचना प्रसार (SDI) यहाँ की रीढ़ हैं।

#### 4. राष्ट्रीय पुस्तकालय (National Library)
- राष्ट्र के समग्र बौद्धिक उत्पादन एवं धरोहर का संरक्षणकर्ता।
- Delivery of Books and Newspapers Act 1954/1956 के अंतर्गत देश में प्रकाशित प्रत्येक ग्रंथ की एक अनिवार्य प्रति प्राप्त करने का अधिकार।
- भारत का राष्ट्रीय पुस्तकालय: कोलकाता (बेलवेडियर एस्टेट)।`,
          en: `### Concept and Social Importance of Libraries
A library is the repository of human wisdom and accumulated knowledge that plays a pivotal role in societal enlightenment. UNESCO designates the Public Library as the "People's University" and a living force for education, culture, and information.

#### 1. Public Libraries
- **Definition:** Accessible to all citizens without distinction of age, race, gender, religion, or social status.
- **Mission:** Lifelong informal education, civic awareness, democratic empowerment, and cultural preservation.
- **Financing:** State government grants, local taxes, library cess, and RRRLF assistance.

#### 2. Academic Libraries
- **School Libraries:** Nurture early reading habits. (Mudaliar Commission 1952-53 termed it the "heart of the school").
- **College Libraries:** Support undergraduate and postgraduate curriculum-driven learning.
- **University Libraries:** Advanced research support, scholarly journals, theses, and reference. (Radhakrishnan Commission 1948 described it as the "hub of academic life").

#### 3. Special Libraries
- Serve specialized clienteles in dedicated domains (e.g., DRDO, ISRO, ICMR, BARC).
- Prioritize micro-documents, patents, technical reports, CAS, and SDI services.

#### 4. National Library
- The apex depository institution conserving the nation's published intellectual heritage under the Delivery of Books Act.
- National Library of India: Kolkata (Belvedere House).`,
        },
        keyPoints: [
          {
            hi: 'सार्वजनिक पुस्तकालय को यूनेस्को घोषणापत्र में "जनता का विश्वविद्यालय" (People’s University) कहा गया है।',
            en: 'UNESCO Manifesto designates the Public Library as the "People\'s University".',
          },
          {
            hi: 'मुदालियर आयोग (1952-53) ने विद्यालय पुस्तकालय को विद्यालय का हृदय कहा था।',
            en: 'Mudaliar Commission (1952-53) called the school library the heart of the school.',
          },
          {
            hi: 'राधाकृष्णन आयोग (1948-49) ने विश्वविद्यालय पुस्तकालय को विश्वविद्यालय की आत्मा/हृदय कहा।',
            en: 'Radhakrishnan Commission (1948) termed the university library the heart of academic life.',
          },
          {
            hi: 'विशिष्ट पुस्तकालयों का मुख्य कार्य गहन शोधकर्ताओं को CAS एवं SDI सेवाएं देना है।',
            en: 'Special libraries focus primarily on delivering micro-documents via CAS and SDI services.',
          },
        ],
      },
      {
        id: 'u1_t2',
        title: {
          hi: '1.2 डॉ. एस.आर. रंगनाथन एवं पुस्तकालय विज्ञान के 5 सूत्र व उनके व्यावहारिक निहितार्थ',
          en: '1.2 Dr. S.R. Ranganathan & Five Laws of Library Science with Implications',
        },
        content: {
          hi: `### डॉ. एस.आर. रंगनाथन का जीवन परिचय एवं 5 सूत्र
डॉ. शियाली रामामृत रंगनाथन (12 अगस्त 1892 – 27 सितंबर 1972) को **भारत में पुस्तकालय विज्ञान का जनक** (Father of Library Science in India) कहा जाता है। भारत सरकार ने उन्हें 1957 में **पद्मश्री** और 1965 में **राष्ट्रीय शोध प्राध्यापक (National Research Professor)** से सम्मानित किया।

#### पांच सूत्रों का उद्भव:
- **प्रतिपादन:** 1928 में मीनाक्षी कॉलेज, अन्नामलाई नगर में।
- **पुस्तक रूप में प्रकाशन:** 1931 में मद्रास लाइब्रेरी एसोसिएशन (MALA) द्वारा प्रकाशित।
- **भूमिका/प्रस्तावना:** पी.एस. शिवस्वामी अय्यर द्वारा प्रस्तावना एवं डब्ल्यू.सी. बेरविक सेयर्स द्वारा भूमिका लिखी गई।

#### 1. प्रथम सूत्र: पुस्तकें उपयोग के लिए हैं (Books are for use)
- **निहितार्थ:** पुस्तकालय का स्थान शहर के केंद्र में होना चाहिए, कार्य के घंटे लंबे व सुविधाजनक हों, फर्नीचर सुलभ व आरामदायक हो, खुली प्रवेश प्रणाली (Open Access System) अपनाई जाए।

#### 2. द्वितीय सूत्र: प्रत्येक पाठक को उसकी पुस्तक मिले (Every reader his/her book)
- **निहितार्थ:** अनिवार्य पुस्तकालय विधान (Library Legislation), लोकतांत्रिक समानता, अंधों व दिव्यांगों के लिए ब्रेल/ऑडियो पुस्तकें, जेल व अस्पताल पुस्तकालय।

#### 3. तृतीय सूत्र: प्रत्येक पुस्तक को उसका पाठक मिले (Every book its reader)
- **निहितार्थ:** मुक्त प्रवेश प्रणाली, खुली शेल्फ व्यवस्था, विषय सूचीकरण, पुस्तक प्रदर्शन (Book Exhibition), नवीन आगमन सूची (New Arrivals List)।

#### 4. चतुर्थ सूत्र: पाठक का समय बचाएं (Save the time of the reader)
- **निहितार्थ:** वैज्ञानिक वर्गीकरण एवं सूचीकरण, निर्गम-आगम की त्वरित प्रणालियां (Browne/Newark/RFID), संदर्भ सेवा, अलमारियों पर स्पष्ट मार्गदर्शक पट्टियां (Shelf Guides)।

#### 5. पंचम सूत्र: पुस्तकालय एक वर्धनशील संस्था है (Library is a growing organism)
- **निहितार्थ:** पुस्तकों, पाठकों एवं कर्मचारियों में जैविक वृद्धि। भविष्य की आवश्यकताओं के अनुसार भवन विस्तार की योजना, पुराने एवं अप्रासंगिक ग्रंथों की छंटाई (Weeding Out) एवं नवीनतम स्वचालन तकनीक को अपनाना।`,
          en: `### Dr. S.R. Ranganathan & The Five Laws of Library Science
Dr. Shiyali Ramamrita Ranganathan (12 August 1892 – 27 September 1972) is universally revered as the **Father of Library Science in India**. Awarded Padma Shri in 1957 and National Research Professor in 1965.

#### Formulation of the Five Laws:
- **Formulated:** 1928 at Meenakshi College, Annamalainagar.
- **Published:** 1931 by Madras Library Association (MALA).
- **Foreword:** Sir P.S. Sivaswamy Aiyer; **Introduction:** W.C. Berwick Sayers.

#### 1. First Law: Books are for use
- Focuses on open access, central and accessible library location, user-friendly working hours, comfortable furniture, and cooperative staff attitude.

#### 2. Second Law: Every reader his/her book
- Focuses on universal library legislation, democracy in knowledge access, services for children, visually impaired (Braille), prisoners, and rural readers.

#### 3. Third Law: Every book its reader
- Emphasizes open shelf arrangement, classified cataloguing, promotional book exhibitions, cross-references, and new arrival display.

#### 4. Fourth Law: Save the time of the reader
- Demands efficient classification, standardized cataloguing, rapid issue-return circulation systems (Browne, Newark, Barcode/RFID), stack guides, and ready reference.

#### 5. Fifth Law: The library is a growing organism
- Treats the library as a biological organism exhibiting child growth and adult growth. Demands modular architectural expansion, collection weeding out, staff expansion, and technological modernization.`,
        },
        keyPoints: [
          {
            hi: 'डॉ. रंगनाथन के जन्मदिवस (12 अगस्त) को प्रतिवर्ष भारत में "राष्ट्रीय लाइब्रेरियन दिवस" मनाया जाता है।',
            en: 'August 12 (Dr. Ranganathan\'s birthday) is celebrated annually as National Librarians Day in India.',
          },
          {
            hi: 'पांच सूत्रों का प्रतिपादन 1928 में हुआ और पुस्तक 1931 में मद्रास लाइब्रेरी एसोसिएशन द्वारा प्रकाशित हुई।',
            en: 'The Five Laws were formulated in 1928 and published as a book in 1931 by MALA.',
          },
          {
            hi: 'पुस्तकालय विधान (Library Legislation) द्वितीय सूत्र "प्रत्येक पाठक को उसकी पुस्तक" से जुड़ा है।',
            en: 'Library Legislation is primarily an outcome and obligation of the Second Law.',
          },
          {
            hi: 'अनुपयोगी पुस्तकों की छंटाई (Weeding Out) पंचम सूत्र "वर्धनशील संस्था" का अनिवार्य अंग है।',
            en: 'Weeding out of obsolete material is a direct biological requirement of the Fifth Law.',
          },
        ],
      },
      {
        id: 'u1_t3',
        title: {
          hi: '1.3 भारत में 19 राज्य पुस्तकालय अधिनियम एवं डिलीवरी ऑफ बुक्स एक्ट 1954/1956',
          en: '1.3 Library Legislation in India (19 States) & Delivery of Books Act 1954/1956',
        },
        content: {
          hi: `### भारत में पुस्तकालय विधान एवं 19 राज्य अधिनियम
पुस्तकालय अधिनियम सार्वजनिक पुस्तकालयों के सुव्यवस्थित संचालन, स्थायी वित्तीय व्यवस्था एवं कानूनी अधिकार सुनिश्चित करता है। भारत में अब तक **कुल 19 राज्यों** में सार्वजनिक पुस्तकालय अधिनियम पारित हो चुके हैं।

#### 19 राज्यों के अधिनियमों का कालानुक्रम:
1. **मद्रास (तमिलनाडु) - 1948** (भारत का प्रथम अधिनियम, डॉ. रंगनाथन के सहयोग से)
2. **आंध्र प्रदेश - 1960**
3. **कर्नाटक (मैसूर) - 1965**
4. **महाराष्ट्र - 1967**
5. **पश्चिम बंगाल - 1979**
6. **आंध्र प्रदेश (संशोधित) / मणिपुर - 1988**
7. **केरल - 1989**
8. **हरियाणा - 1989**
9. **मिजोरम - 1993**
10. **गोवा - 1993**
11. **गुजरात - 2001**
12. **ओडिशा - 2001**
13. **उत्तराखंड (उत्तरांचल) - 2005**
14. **राजस्थान - 2006**
15. **उत्तर प्रदेश - 2006**
16. **बिहार - 2008** (बिहार राज्य पुस्तकालय एवं सूचना सेवा अधिनियम 2008)
17. **छत्तीसगढ़ - 2008**
18. **अरुणाचल प्रदेश - 2009**
19. **तेलंगाना - 2015** (आंध्र प्रदेश अधिनियम 1960 को अंगीकार किया)

#### पुस्तकालय उपकर (Library Cess) लगाने वाले 5 प्रमुख राज्य:
- तमिलनाडु (मद्रास), आंध्र प्रदेश, कर्नाटक, केरल, हरियाणा।
- **ध्यान दें:** बिहार, पश्चिम बंगाल, महाराष्ट्र आदि राज्यों में उपकर (Cess) नहीं है, यहाँ सरकारी बजट अनुदान से वित्तपोषण होता है।

#### डिलीवरी ऑफ बुक्स (पब्लिक लाइब्रेरीज) एक्ट:
- **वर्ष 1954** में पारित हुआ; **1956 में समाचार पत्रों (Newspapers)** को भी शामिल करने हेतु संशोधन किया गया।
- इसके तहत देश के प्रत्येक प्रकाशक को प्रकाशन के **30 दिनों के भीतर निःशुल्क** देश के 4 डिपाजिटरी पुस्तकालयों को एक-एक प्रति भेजनी होती है:
  1. राष्ट्रीय पुस्तकालय, कोलकाता (National Library of India, Kolkata)
  2. कॉनेमारा पब्लिक लाइब्रेरी, चेन्नई (Connemara Public Library, Chennai)
  3. द एशियाटिक सोसाइटी लाइब्रेरी, मुंबई (Asiatic Society, Mumbai)
  4. दिल्ली पब्लिक लाइब्रेरी, दिल्ली (Delhi Public Library, Delhi)`,
          en: `### Library Legislation in India & Delivery of Books Act
Library legislation provides statutory backing, democratic accessibility, permanent structure, and financial sustainability for public libraries. To date, **19 Indian States** have enacted Public Library Acts.

#### Chronology of 19 State Library Acts:
1. **Madras (Tamil Nadu) - 1948** (First state act, drafted with Dr. Ranganathan)
2. **Andhra Pradesh - 1960**
3. **Karnataka (Mysore) - 1965**
4. **Maharashtra - 1967**
5. **West Bengal - 1979**
6. **Manipur - 1988**
7. **Kerala - 1989**
8. **Haryana - 1989**
9. **Mizoram - 1993**
10. **Goa - 1993**
11. **Gujarat - 2001**
12. **Odisha - 2001**
13. **Uttarakhand - 2005**
14. **Rajasthan - 2006**
15. **Uttar Pradesh - 2006**
16. **Bihar - 2008** (Bihar State Public Library Act, 2008)
17. **Chhattisgarh - 2008**
18. **Arunachal Pradesh - 2009**
19. **Telangana - 2015** (Adopted AP Act 1960)

#### States Levying Library Cess:
- Tamil Nadu, Andhra Pradesh, Karnataka, Kerala, and Haryana.
- States like Bihar, Maharashtra, and West Bengal do not levy cess; they fund libraries through state budget allocations.

#### Delivery of Books and Newspapers Act (1954 / Amendment 1956):
- Requires publishers in India to deliver 1 copy of every published book/periodical within **30 days** at their own expense to 4 designated Depository Libraries:
  1. National Library of India, Kolkata
  2. Connemara Public Library, Chennai
  3. Asiatic Society Library (Central Library), Mumbai
  4. Delhi Public Library, Delhi`,
        },
        keyPoints: [
          {
            hi: 'भारत का प्रथम पुस्तकालय अधिनियम मद्रास (तमिलनाडु) में 1948 में पारित हुआ।',
            en: 'First Public Library Act in India was enacted in Madras (Tamil Nadu) in 1948.',
          },
          {
            hi: 'बिहार में राज्य पुस्तकालय अधिनियम वर्ष 2008 में पारित हुआ था।',
            en: 'Bihar State Public Library Act was enacted in the year 2008.',
          },
          {
            hi: 'डिलीवरी ऑफ बुक्स एक्ट 1954 में पारित हुआ और 1956 में समाचार पत्र शामिल किए गए।',
            en: 'Delivery of Books Act was enacted in 1954 and amended in 1956 to include newspapers.',
          },
          {
            hi: 'भारत में कुल 4 डिपाजिटरी पुस्तकालय हैं: कोलकाता, चेन्नई, मुंबई, दिल्ली।',
            en: 'India has 4 legal depository libraries: Kolkata, Chennai, Mumbai, and Delhi.',
          },
        ],
      },
      {
        id: 'u1_t4',
        title: {
          hi: '1.4 राष्ट्रीय एवं अंतरराष्ट्रीय पुस्तकालय संघ: ILA, IASLIC, IFLA, ALA, UNESCO, FID',
          en: '1.4 Library Associations: ILA, IASLIC, IFLA, ALA, UNESCO, FID',
        },
        content: {
          hi: `### राष्ट्रीय एवं अंतरराष्ट्रीय पुस्तकालय संघ (Library Associations)
पुस्तकालय संघ पुस्तकालयाध्यक्षों के व्यावसायिक विकास, पुस्तकालय मानकों के निर्धारण एवं ज्ञान प्रसार में वैश्विक भूमिका निभाते हैं।

#### 1. ILA (Indian Library Association)
- **स्थापना:** 13 सितंबर 1933 (प्रथम अखिल भारतीय पुस्तकालय सम्मेलन, कोलकाता)।
- **प्रथम अध्यक्ष:** एम.ओ. थॉमस (M.O. Thomas); **प्रथम सचिव:** के.एम. असदुल्लाह (खान बहादुर असदुल्लाह)।
- **मुख्यालय:** नई दिल्ली (A/40-41, फ्लैट नं. 201, अंसल बिल्डिंग, मुखर्जी नगर)।
- **प्रमुख प्रकाशन:** ILA Bulletin (JILA - Journal of Indian Library Association).

#### 2. IASLIC (Indian Association of Special Libraries and Information Centres)
- **स्थापना:** 3 सितंबर 1955 को कोलकाता में।
- **प्रथम अध्यक्ष:** डॉ. एस.एल. होरा (S.L. Hora); **प्रथम सचिव:** जे. साहा (J. Saha)।
- **मुख्यालय:** कांकुरगाछी, कोलकाता।
- **विशेषता:** विशिष्ट पुस्तकालयों एवं सूचना केंद्रों के विकास हेतु समर्पित।

#### 3. IFLA (International Federation of Library Associations and Institutions)
- **स्थापना:** 30 सितंबर 1927 को एडिनबर्ग (स्कॉटलैंड) में।
- **मुख्यालय:** द हेग (The Hague), नीदरलैंड्स।
- **महत्व:** पुस्तकालय विज्ञान का सबसे बड़ा वैश्विक गैर-सरकारी महासंघ।

#### 4. ALA (American Library Association)
- **स्थापना:** 6 अक्टूबर 1876 को फिलाडेल्फिया में (विश्व का सबसे पुराना एवं सबसे बड़ा पुस्तकालय संघ)।
- **संस्थापक सदस्य:** मेल्विल डेवी (Melvil Dewey - प्रथम सचिव), जस्टिन विंसर (प्रथम अध्यक्ष)।
- **मुख्यालय:** शिकागो, इलिनोइस, यूएसए।

#### 5. UNESCO (United Nations Educational, Scientific and Cultural Organization)
- **स्थापना:** 16 नवंबर 1945 (मुख्यालय: पेरिस, फ्रांस)।
- **LIS योगदान:** UNESCO Public Library Manifesto (1949, 1972, 1994 संशोधित), UNISIST कार्यक्रम, दिल्ली पब्लिक लाइब्रेरी (1951) पायलट प्रोजेक्ट।

#### 6. FID (International Federation for Information and Documentation)
- **स्थापना:** 12 सितंबर 1895 को ब्रुसेल्स में हेनरी ला फोंटेन एवं पॉल ऑटलेट द्वारा (IIB के रूप में)।
- **UDC का जनक:** Universal Decimal Classification का विकास इसी संस्था द्वारा किया गया।
- **स्थिति:** 2002 में इसे आधिकारिक रूप से विघटित (Dissolved) कर दिया गया।`,
          en: `### National & International Library Associations
Library associations champion professional ethics, standardization, continuing education, and global resource sharing.

#### 1. ILA (Indian Library Association)
- **Established:** 13 September 1933 at 1st All India Library Conference, Kolkata.
- **First President:** Dr. M.O. Thomas; **First Secretary:** K.M. Asadullah.
- **HQ:** New Delhi.
- **Publication:** Journal of Indian Library Association (JILA).

#### 2. IASLIC (Indian Association of Special Libraries and Information Centres)
- **Established:** 3 September 1955 in Kolkata.
- **First President:** Dr. S.L. Hora; **HQ:** Kolkata.
- **Mission:** Promotes special library operations and documentation techniques.

#### 3. IFLA (International Federation of Library Associations and Institutions)
- **Established:** 30 September 1927 in Edinburgh, Scotland.
- **HQ:** The Hague, Netherlands.
- **Mission:** Global voice of the library and information profession.

#### 4. ALA (American Library Association)
- **Established:** 6 October 1876 in Philadelphia.
- **Founders:** Melvil Dewey (first secretary) and Justin Winsor (first president).
- **HQ:** Chicago, Illinois. World's oldest and largest national library association.

#### 5. UNESCO
- **Founded:** 16 November 1945; **HQ:** Paris, France.
- **LIS Milestones:** Public Library Manifesto (1949/1994), Delhi Public Library Pilot Project (1951), UNISIST.

#### 6. FID (Federation Internationale d'Information et de Documentation)
- **Founded:** 1895 by Paul Otlet and Henri La Fontaine as IIB.
- **Major Achievement:** Creation and propagation of Universal Decimal Classification (UDC). Dissolved in 2002.`,
        },
        keyPoints: [
          {
            hi: 'ALA (1876) विश्व का सबसे पहला व सबसे बड़ा पुस्तकालय संघ है, जिसके सह-संस्थापक मेल्विल डेवी थे।',
            en: 'ALA (1876) is the world\'s oldest and largest library association, co-founded by Melvil Dewey.',
          },
          {
            hi: 'ILA की स्थापना 13 सितंबर 1933 को कोलकाता में हुई थी, जिसका वर्तमान मुख्यालय नई दिल्ली है।',
            en: 'ILA was founded on 13 September 1933 in Kolkata; its current HQ is in New Delhi.',
          },
          {
            hi: 'IFLA का स्थायी मुख्यालय द हेग (नीदरलैंड्स) में स्थित है।',
            en: 'IFLA\'s permanent headquarters is located in The Hague, Netherlands.',
          },
          {
            hi: 'FID की स्थापना 1895 में पॉल ऑटलेट व हेनरी ला फोंटेन द्वारा ब्रुसेल्स में की गई थी।',
            en: 'FID was founded in 1895 in Brussels by Paul Otlet and Henri La Fontaine.',
          },
        ],
      },
      {
        id: 'u1_t5',
        title: {
          hi: '1.5 आरआरआरएलएफ (RRRLF) एवं भारत का राष्ट्रीय पुस्तकालय (कोलकाता)',
          en: '1.5 RRRLF (Raja Rammohun Roy Library Foundation) & National Library of India',
        },
        content: {
          hi: `### आरआरआरएलएफ एवं भारत का राष्ट्रीय पुस्तकालय

#### 1. राजा राममोहन राय लाइब्रेरी फाउंडेशन (RRRLF)
- **स्थापना:** मई 1972 में संस्कृति मंत्रालय (Ministry of Culture), भारत सरकार द्वारा।
- **उद्देश्य:** राजा राममोहन राय की द्विशताब्दी जयंती के उपलक्ष्य में देश भर में सार्वजनिक पुस्तकालय आंदोलन को वित्तीय एवं तकनीकी सहायता प्रदान करना।
- **मुख्यालय:** साल्ट लेक, कोलकाता।
- **कार्यान्वयन:** भारत के राज्यों व केंद्र शासित प्रदेशों में State Library Planning Committee (SLPC) के माध्यम से ग्रंथ अनुदान, कंप्यूटर सहायता व भवन निर्माण अनुदान देती है।
- **CIP एवं ISBN:** भारत में पुस्तकों के लिए ISBN जारी करने की राष्ट्रीय एजेंसी RRRLF की ही एक शाखा के रूप में कार्य करती रही है (नई दिल्ली में)।

#### 2. भारत का राष्ट्रीय पुस्तकालय (National Library of India)
- **इतिहास एवं विकासक्रम:**
  - **1836:** कलकत्ता पब्लिक लाइब्रेरी (Calcutta Public Library) की स्थापना।
  - **1891:** इंपीरियल लाइब्रेरी एक्ट पारित।
  - **1902:** लॉर्ड कर्जन ने कलकत्ता पब्लिक लाइब्रेरी एवं इंपीरियल लाइब्रेरी को मिलाकर एक किया।
  - **30 जनवरी 1903:** इंपीरियल लाइब्रेरी को मेटकॉफ हॉल में जनता के लिए खोला गया (प्रथम लाइब्रेरियन: जॉन मैकफार्लेन)।
  - **1948:** स्वतंत्र भारत में इंपीरियल लाइब्रेरी (चेंज ऑफ नेम) एक्ट 1948 पारित हुआ और इसे "नेशनल लाइब्रेरी ऑफ इंडिया" नाम दिया गया।
  - **1 फरवरी 1953:** तत्कालीन शिक्षा मंत्री मौलाना अबुल कलाम आज़ाद द्वारा बेलवेडियर एस्टेट, अलीपुर (कोलकाता) में इसे राष्ट्र को समर्पित किया गया।
- **प्रथम भारतीय लाइब्रेरियन:** **बी.एस. केसवन (B.S. Kesavan)** - जिन्हें भारतीय राष्ट्रीय ग्रंथसूची (INB - Indian National Bibliography) का जनक भी कहा जाता है।`,
          en: `### RRRLF & The National Library of India

#### 1. Raja Rammohun Roy Library Foundation (RRRLF)
- **Established:** May 1972 by Ministry of Culture, Govt of India, commemorating Raja Rammohun Roy's bicentenary.
- **HQ:** Salt Lake City, Kolkata.
- **Mission:** Apex autonomous body promoting the public library movement across India via matching and non-matching grants to state libraries.
- **ISBN Agency:** Designated national agency for assigning ISBNs in India.

#### 2. National Library of India (Kolkata)
- **Historical Milestones:**
  - **1836:** Calcutta Public Library established.
  - **1891:** Imperial Library formed by amalgamating secretariat libraries.
  - **1902:** Lord Curzon passed the Imperial Library Act merging Calcutta Public Library and Imperial Library.
  - **30 Jan 1903:** Opened to public at Metcalfe Hall (First Librarian: John Macfarlane).
  - **1948:** Imperial Library (Change of Name) Act declared it the National Library of India.
  - **1 Feb 1953:** Formally opened to the nation at Belvedere Estate, Alipore, Kolkata by Maulana Abul Kalam Azad.
- **First Indian National Librarian:** **B.S. Kesavan**, pioneer and father of the Indian National Bibliography (INB).`,
        },
        keyPoints: [
          {
            hi: 'RRRLF की स्थापना मई 1972 में कोलकाता में संस्कृति मंत्रालय के तहत की गई थी।',
            en: 'RRRLF was established in May 1972 in Kolkata under the Ministry of Culture.',
          },
          {
            hi: 'भारत का राष्ट्रीय पुस्तकालय कोलकाता के बेलवेडियर हाउस (अलीपुर) में स्थित है।',
            en: 'The National Library of India is located at Belvedere Estate, Alipore, Kolkata.',
          },
          {
            hi: 'राष्ट्रीय पुस्तकालय के प्रथम भारतीय लाइब्रेरियन बी.एस. केसवन (1948) थे।',
            en: 'B.S. Kesavan was the first Indian Librarian of the National Library in 1948.',
          },
          {
            hi: '1 फरवरी 1953 को मौलाना अबुल कलाम आज़ाद ने इसे जनता को समर्पित किया।',
            en: 'On February 1, 1953, Maulana Abul Kalam Azad formally opened it to the public.',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // UNIT 2: ज्ञान संगठन, वर्गीकरण एवं सूचीकरण (Classification & Cataloguing) - 7 Topics
  // =========================================================================
  {
    id: 'unit_2',
    unitNumber: 2,
    title: {
      hi: 'यूनिट 2: ज्ञान संगठन, वर्गीकरण एवं सूचीकरण',
      en: 'Unit 2: Knowledge Organization, Classification & Cataloguing',
    },
    shortDesc: {
      hi: 'विषय निर्माण विधियां, DDC, CC, UDC, AACR-2, CCC, MARC-21, Dublin Core व PRECIS',
      en: 'Modes of Subject Formation, DDC, CC, UDC, AACR-2, CCC, MARC-21, Dublin Core & PRECIS',
    },
    iconName: 'folder',
    topics: [
      {
        id: 'u2_t1',
        title: {
          hi: '2.1 ज्ञान जगत की संरचना एवं विषय निर्माण की विधियां',
          en: '2.1 Universe of Knowledge & Modes of Formation of Subjects',
        },
        content: {
          hi: `### ज्ञान जगत की संरचना एवं विषय निर्माण की विधियां
ज्ञान जगत (Universe of Knowledge) निरंतर गतिशील, बहुआयामी एवं वर्धनशील है। डॉ. एस.आर. रंगनाथन ने विषयों के निर्माण की प्रक्रियाओं को वैज्ञानिक रूप से वर्गीकृत किया था।

#### विषय के बुनियादी प्रकार (Types of Subjects):
1. **मौलिक विषय (Basic Subject):** स्वतंत्र विषय जिसमें कोई एकल (Isolate) नहीं होता (उदा. गणित, भौतिकी, इतिहास)।
2. **संयुक्त विषय (Compound Subject):** मौलिक विषय + एक या अधिक एकल विचार (उदा. भारत का इतिहास = इतिहास [BS] + भारत [Space Isolate])।
3. **मिश्रित/जटिल विषय (Complex Subject):** दो या अधिक मौलिक या संयुक्त विषयों का पारस्परिक संबंध (उदा. डॉक्टरों के लिए सांख्यिकी, मनोविज्ञान और शिक्षा का तुलनात्मक अध्ययन)।

#### विषय निर्माण की प्रमुख विधियां (Modes of Formation of Subjects):
- **1. शिथिलीकरण (Loose Assemblage):** दो या अधिक स्वतंत्र विषयों के बीच संबंध स्थापित होना (दशा संबंध - Phase Relation)।
- **2. परतबंदी / संस्तरण (Lamination):** किसी मूल विषय पर एक के बाद एक कई एकलों की परत चढ़ना (उदा. कृषि में चावल की खेती)।
- **3. विखंडन (Fission):** किसी एक बड़े विषय का आंतरिक रूप से छोटे स्वतंत्र उप-विषयों में टूटना या विभाजित होना।
- **4. अनाच्छादन (Denudation):** किसी वर्ग का क्रमिक संकुचन होकर अत्यंत सूक्ष्म विशिष्ट विषय बनना (एकल का विस्तार कम, गहनता अधिक)।
- **5. विच्छेदन (Dissection):** समान स्तर के वर्गों का अलग-अलग फांकों में कटना।
- **6. संकुलन (Agglomeration):** कई निकट विषयों को मिलाकर एक वृहत समूह बनाना (उदा. सामाजिक विज्ञान = समाजशास्त्र + अर्थशास्त्र + राजनीति विज्ञान)।
- **7. विलयन (Fusion):** दो स्वतंत्र विषयों का इस प्रकार मिलना कि एक नया तीसरा विषय बन जाए (उदा. बायोकेमिस्ट्री, जियोफिजिक्स)।`,
          en: `### Structure of Knowledge & Modes of Formation of Subjects
The Universe of Knowledge is multidimensional, infinite, dynamic, and continuously evolving. Dr. S.R. Ranganathan formulated scientific principles governing how new subjects emerge.

#### Types of Subjects:
1. **Basic Subject:** A primary discipline without isolate attachments (e.g., Mathematics, Physics, History).
2. **Compound Subject:** A Basic Subject combined with one or more Isolates (e.g., History of India = History [BS] + India [Space]).
3. **Complex Subject:** Interaction between two or more subjects via Phase Relations (e.g., Statistics for Doctors, Comparison of Physics and Chemistry).

#### Modes of Formation of Subjects:
- **1. Loose Assemblage:** Assembly of two or more independent subjects via phase relation.
- **2. Lamination:** Layering of isolates over a basic subject facet by facet.
- **3. Fission:** Cleavage of a basic discipline into autonomous entities.
- **4. Denudation:** Progressive diminution of extension to reveal an intensely specific isolate.
- **5. Dissection:** Slicing a field into co-ordinate, mutually exclusive isolates.
- **6. Agglomeration (Partial Comprehension):** Grouping allied subjects into umbrella fields (e.g., Social Sciences).
- **7. Fusion:** Merger of two distinct disciplines to birth a totally new synthesized discipline (e.g., Biochemistry, Geophysics).`,
        },
        keyPoints: [
          {
            hi: 'डॉ. रंगनाथन ने विषयों को तीन श्रेणियों में बांटा: Basic, Compound और Complex Subjects.',
            en: 'Dr. Ranganathan classified subjects into Basic, Compound, and Complex types.',
          },
          {
            hi: 'बायोकेमिस्ट्री (Biochemistry) एवं जियोफिजिक्स (Geophysics) विलयन (Fusion) विधि के उदाहरण हैं।',
            en: 'Biochemistry and Geophysics are prime examples of the Fusion mode.',
          },
          {
            hi: 'दशा संबंध (Phase Relation) शिथिलीकरण (Loose Assemblage) के अंतर्गत आता है।',
            en: 'Phase Relations operate primarily under the Loose Assemblage mode.',
          },
        ],
      },
      {
        id: 'u2_t2',
        title: {
          hi: '2.2 डेवी दशमलव वर्गीकरण (DDC 19वां व 23वां संस्करण) - 10 मुख्य वर्ग, सारणियां व अनुसूचियां',
          en: '2.2 Dewey Decimal Classification (DDC 19th & 23rd Ed) - 10 Main Classes, Tables & Schedules',
        },
        content: {
          hi: `### डेवी दशमलव वर्गीकरण (DDC - Dewey Decimal Classification)
- **आविष्कारक:** मेल्विल डेवी (Melvil Dewey, 1851-1931 - आधुनिक पुस्तकालय वर्गीकरण के जनक)।
- **प्रथम संस्करण:** 1876 में 44 पृष्ठों में गुमनाम रूप से प्रकाशित (शीर्षक: "A Classification and Subject Index...")।
- **स्वामित्व:** 1988 से OCLC (Online Computer Library Center) के पास।
- **अंकन पद्धति:** शुद्ध अंकन (Pure Notation) - केवल इंडो-अरेबिक अंकों (0-9) और न्यूनतम 3 अंकों के बाद दशमलव (.) का प्रयोग।

#### 10 मुख्य वर्ग (10 Main Classes):
- **000:** कंप्यूटर विज्ञान, सूचना एवं सामान्य कार्य (Computer Science, Information & General Works)
- **100:** दर्शनशास्त्र एवं मनोविज्ञान (Philosophy & Psychology)
- **200:** धर्म (Religion)
- **300:** सामाजिक विज्ञान (Social Sciences)
- **400:** भाषा (Language / Linguistics)
- **500:** प्राकृतिक विज्ञान एवं गणित (Science & Mathematics)
- **600:** प्रौद्योगिकी एवं व्यावहारिक विज्ञान (Technology / Applied Sciences)
- **700:** कला एवं मनोरंजन (The Arts & Recreation)
- **800:** साहित्य (Literature)
- **900:** इतिहास एवं भूगोल (History & Geography)

#### DDC 19वां संस्करण (1979) - सबसे लोकप्रिय:
- संपादक: बेंजामिन ए. कस्टर (Benjamin A. Custer)।
- 3 खंड (Volumes): Vol 1 (Tables), Vol 2 (Schedules), Vol 3 (Relative Index)।
- इसमें **7 सहायक सारणियां (Tables)** थीं:
  - Table 1: Standard Subdivisions
  - Table 2: Geographic Areas
  - Table 3: Subdivisions for Individual Literatures
  - Table 4: Subdivisions for Individual Languages
  - Table 5: Racial, Ethnic, National Groups
  - Table 6: Languages
  - Table 7: Persons

#### DDC 23वां संस्करण (2011):
- संपादक: जोन एस. मिशेल (Joan S. Mitchell)।
- 4 खंडों में प्रकाशित; इसमें **6 सारणियां (Tables)** हैं (Table 7 को हटा दिया गया)।`,
          en: `### Dewey Decimal Classification (DDC)
- **Founder:** Melvil Dewey (1851-1931).
- **First Edition:** Published anonymously in 1876 (44 pages).
- **Current Owner:** OCLC since 1988.
- **Notation:** Pure notation using Indo-Arabic numerals (0-9), min 3 digits, followed by decimal point.

#### 10 Main Classes:
- 000: Computer science, information & general works
- 100: Philosophy & psychology
- 200: Religion
- 300: Social sciences
- 400: Language
- 500: Science & mathematics
- 600: Technology
- 700: Arts & recreation
- 800: Literature
- 900: History & geography

#### DDC 19th Edition (1979):
- Editor: Benjamin A. Custer. 3 Volumes. Contains **7 auxiliary tables**.

#### DDC 23rd Edition (2011):
- Editor: Joan S. Mitchell. 4 Volumes. Contains **6 auxiliary tables** (Table 7 Persons was dropped).`,
        },
        keyPoints: [
          {
            hi: 'DDC का प्रथम संस्करण 1876 में 44 पृष्ठों में प्रकाशित हुआ था।',
            en: 'The 1st edition of DDC was published in 1876 containing 44 pages.',
          },
          {
            hi: 'DDC में शुद्ध अंकन (Pure Notation - केवल 0 से 9 अंक) का प्रयोग होता है।',
            en: 'DDC employs pure notation using Indo-Arabic numerals 0-9.',
          },
          {
            hi: 'DDC 19वें संस्करण में 7 सारणियां (Tables) थीं, जबकि 23वें संस्करण में 6 सारणियां हैं।',
            en: 'DDC 19th ed had 7 auxiliary tables; DDC 23rd ed has 6 tables (Table 7 removed).',
          },
        ],
      },
      {
        id: 'u2_t3',
        title: {
          hi: '2.3 कोलन वर्गीकरण (CC 6th Ed) एवं PMEST श्रेणियां, योजक चिह्न व राउंड्स/लेवल्स',
          en: '2.3 Colon Classification (CC 6th Ed) & PMEST Categories, Connecting Symbols',
        },
        content: {
          hi: `### कोलन वर्गीकरण (Colon Classification - CC)
- **आविष्कारक:** डॉ. एस.आर. रंगनाथन (प्रथम संस्करण: 1933, MALA द्वारा)।
- **प्रकृति:** विश्लेषणात्मक-संश्लेषणात्मक (Analytico-Synthetic) वर्गीकरण प्रणाली।
- **अंकन:** अत्यधिक मिश्रित अंकन (Highly Mixed Notation) - रोमन बड़े/छोटे अक्षर, इंडो-अरेबिक अंक, ग्रीक अक्षर एवं विराम चिह्न।

#### 5 मौलिक श्रेणियां (PMEST) एवं योजक चिह्न (Connecting Symbols):
डॉ. रंगनाथन ने 1944 में "Library Classification: Fundamentals and Procedure" में PMEST की संकल्पना दी:
1. **[P] Personality (व्यक्तित्व):** सर्वाधिक मूर्त (Most Concrete), सबसे कठिन पहचान। योजक चिह्न: **अल्पविराम ( , )**
2. **[M] Matter (पदार्थ):** सामग्री या गुणधर्म। योजक चिह्न: **अर्धविराम ( ; )**
3. **[E] Energy (ऊर्जा):** क्रिया, समस्या या प्रक्रिया। योजक चिह्न: **कोलन ( : )**
4. **[S] Space (स्थान):** भौगोलिक क्षेत्र या देश। योजक चिह्न: **डॉट ( . )**
5. **[T] Time (काल):** समय, शताब्दी या वर्ष। योजक चिह्न: **उल्टा उद्धरण चिह्न / इन्वर्टेड कॉमा ( ‘ )** *(CC 6वें पुनरीक्षित संस्करण 1963 से)*

#### कोलन वर्गीकरण के 7 संस्करण:
- 1st Ed (1933), 2nd Ed (1939), 3rd Ed (1950)
- 4th Ed (1952 - PMEST योजक चिह्नों की आधिकारिक शुरुआत)
- 5th Ed (1957)
- 6th Ed (1960) एवं **6th Revised Edition (1963)** - परीक्षा में सबसे महत्वपूर्ण
- 7th Ed (1987) - एम.ए. गोपीनाथ द्वारा संपादित।`,
          en: `### Colon Classification (CC)
- **Creator:** Dr. S.R. Ranganathan (1st Ed: 1933).
- **Nature:** Almost freely Analytico-Synthetic classification scheme.
- **Notation:** Highly mixed notation (Roman alphabets, Arabic numerals, Greek letters, punctuation).

#### The 5 Fundamental Categories (PMEST) & Connecting Symbols:
1. **[P] Personality:** Connecting symbol: **Comma ( , )**
2. **[M] Matter:** Connecting symbol: **Semicolon ( ; )**
3. **[E] Energy:** Connecting symbol: **Colon ( : )**
4. **[S] Space:** Connecting symbol: **Dot ( . )**
5. **[T] Time:** Connecting symbol: **Inverted comma / single quote ( ‘ )** *(since 1963 reprint)*

#### Editions:
- 1st (1933), 2nd (1939), 3rd (1950), 4th (1952), 5th (1957), 6th (1960), **6th Revised (1963)**, 7th (1987 edited by M.A. Gopinath).`,
        },
        keyPoints: [
          {
            hi: 'PMEST में Time का योजक चिह्न सिंगल इन्वर्टेड कॉमा ( ‘ ) है, जिसे 1963 में अपनाया गया।',
            en: 'The connecting symbol for Time in CC is the single inverted comma ( ‘ ) introduced in 1963.',
          },
          {
            hi: 'Matter का योजक चिह्न सेमीकोलन ( ; ) और Energy का कोलन ( : ) है।',
            en: 'Matter uses semicolon ( ; ) and Energy uses colon ( : ) in CC.',
          },
          {
            hi: 'कोलन वर्गीकरण पूर्णतः विश्लेषणात्मक-संश्लेषणात्मक (Analytico-Synthetic) प्रणाली है।',
            en: 'Colon Classification is an Analytico-Synthetic classification scheme.',
          },
        ],
      },
      {
        id: 'u2_t4',
        title: {
          hi: '2.4 यूनिवर्सल दशमलव वर्गीकरण (UDC) एवं अंकन सिद्धांत (शुद्ध व मिश्रित अंकन)',
          en: '2.4 Universal Decimal Classification (UDC) & Notation Principles',
        },
        content: {
          hi: `### यूनिवर्सल दशमलव वर्गीकरण (UDC) एवं अंकन सिद्धांत

#### 1. यूनिवर्सल दशमलव वर्गीकरण (UDC):
- **आविष्कारक:** पॉल ऑटलेट (Paul Otlet) एवं हेनरी ला फोंटेन (Henri La Fontaine)।
- **आधार:** मेल्विल डेवी के DDC पर आधारित, जिसे अंतरराष्ट्रीय प्रलेखन संस्थान (IIB / FID) द्वारा 1895 से विकसित किया गया।
- **प्रथम संस्करण:** 1905 में फ्रांसीसी भाषा में "Manuel du Répertoire Bibliographique Universel" नाम से प्रकाशित।
- **प्रबंधन:** UDC Consortium (द हेग, नीदरलैंड्स) द्वारा।
- **अंकन:** मिश्रित अंकन (Mixed Notation) - अरबी अंकों के साथ विशिष्ट गणितीय एवं विराम चिह्नों (जैसे +, /, :, =, "", ()) का प्रयोग।

#### 2. अंकन के सिद्धांत (Notation Principles):
- **अंकन की परिभाषा:** वर्गीकरण में पदों या वर्गों को प्रदर्शित करने वाले प्रतीकों की प्रणाली को अंकन (Notation) कहते हैं।
- **शुद्ध अंकन (Pure Notation):** केवल एक ही प्रकार के प्रतीकों का प्रयोग (उदा. DDC में केवल अरबी अंक 0-9; राडिकल लाइब्रेरी में केवल अक्षर)।
- **मिश्रित अंकन (Mixed Notation):** दो या अधिक प्रकार के प्रतीकों का मिश्रण (उदा. CC, UDC, LCC)।
- **अनुकूलतम अंकन के गुण:** संक्षिप्तता (Brevity), सरलता (Simplicity), स्मृति-सहायकता (Mnemonics) और आतिथ्य सत्कार (Hospitality - नए विषयों को बिना क्रम तोड़े स्थान देना)।`,
          en: `### Universal Decimal Classification (UDC) & Notation Principles

#### 1. Universal Decimal Classification (UDC):
- **Pioneers:** Paul Otlet & Henri La Fontaine (1895, Brussels).
- **Foundation:** Derived from Melvil Dewey's DDC for comprehensive universal bibliographic control.
- **First Edition:** 1905 in French ("Manuel du Répertoire Bibliographique Universel").
- **Current Custodian:** UDC Consortium (The Hague).
- **Notation:** Richly mixed notation incorporating punctuation and auxiliary relation symbols (+, :, /, =, etc.).

#### 2. Notation Principles:
- **Pure Notation:** Employs a single type of symbols (e.g., DDC uses only Arabic digits 0-9).
- **Mixed Notation:** Employs multiple symbol families (e.g., CC, UDC, LC Classification).
- **Qualities:** Hospitality in array and chain, brevity, simplicity, expressive mnemonics.`,
        },
        keyPoints: [
          {
            hi: 'UDC का विकास 1895 में पॉल ऑटलेट और हेनरी ला फोंटेन द्वारा DDC के आधार पर किया गया था।',
            en: 'UDC was developed by Paul Otlet and Henri La Fontaine in 1895 based on DDC.',
          },
          {
            hi: 'UDC का प्रथम संस्करण 1905 में फ्रांसीसी भाषा में प्रकाशित हुआ था।',
            en: 'The 1st edition of UDC appeared in 1905 in French.',
          },
          {
            hi: 'DDC में शुद्ध अंकन (Pure) जबकि UDC और CC में मिश्रित अंकन (Mixed) होता है।',
            en: 'DDC uses pure notation, whereas UDC and CC use mixed notation.',
          },
        ],
      },
      {
        id: 'u2_t5',
        title: {
          hi: '2.5 सूचीकरण संहिताएं: AACR-2 बनाम CCC (Classified Catalogue Code)',
          en: '2.5 Cataloguing Codes: AACR-2 vs CCC (Classified Catalogue Code)',
        },
        content: {
          hi: `### सूचीकरण संहिताएं: AACR-2 बनाम CCC

#### 1. Classified Catalogue Code (CCC):
- **प्रणेता:** डॉ. एस.आर. रंगनाथन (प्रथम संस्करण: 1934, MALA)।
- **संस्करण:** कुल 5 संस्करण (5वां संस्करण 1964 में ए. नीलामघन के सहयोग से)।
- **संरचना:** वर्गीकृत सूची (Classified Catalogue) दो भागों में होती है:
  1. **वर्गीकृत भाग (Classified Part):** क्रमांक (Class Numbers) द्वारा व्यवस्थित मुख्य प्रविष्टि (Main Entry) और Cross Reference Entry (CRE)।
  2. **वर्णानुक्रम भाग (Alphabetical Part):** लेखक, शीर्षक, श्रृंखला और Class Index Entry (CIE)।
- **मुख्य प्रविष्टि के 6 अनुच्छेद (Sections):**
  1. लीडिंग सेक्शन (Leading Section - कॉल नंबर पेंसिल से)
  2. हेडिंग सेक्शन (Heading Section - लेखक का नाम)
  3. टाइटल सेक्शन (Title Section - शीर्षक व संस्करण)
  4. नोट सेक्शन (Note Section)
  5. एक्सेशन नंबर सेक्शन (Accession Number Section - सबसे निचली रेखा पर बाएँ)
  6. ट्रेसिंग सेक्शन (Tracing Section - कार्ड के पिछले भाग पर)।

#### 2. Anglo-American Cataloguing Rules (AACR-2):
- **प्रकाशन:** 1978 में ALA, British Library, Library of Congress व Canadian Library Association द्वारा।
- **AACR-2R:** 1988 में पुनरीक्षित (Revised) संस्करण।
- **मानक आकार:** सूची पत्रक (Catalogue Card) का मानक आकार **12.5 सेमी × 7.5 सेमी** (या **5 इंच × 3 इंच**) होता है।
- **मुख्य प्रविष्टि के 8 क्षेत्र (Areas - ISBD आधारित):** शीर्षक व उत्तरदायित्व, संस्करण, प्रकाशन/वितरण, भौतिक विवरण, श्रृंखला, नोट, मानक संख्या (ISBN/ISSN)।`,
          en: `### Cataloguing Codes: AACR-2 vs CCC

#### 1. Classified Catalogue Code (CCC):
- **Author:** Dr. S.R. Ranganathan (1st Ed: 1934, 5th Ed: 1964).
- **Two Bipartite Sections:** Classified part (numeric order) and Alphabetical index part.
- **6 Sections of Main Entry:** Leading Section, Heading Section, Title Section, Note Section, Accession Number Section, Tracing (on the reverse).

#### 2. AACR-2 (Anglo-American Cataloguing Rules 2nd Ed):
- **Published:** 1978; AACR-2R published in 1988.
- **Standard Card Dimensions:** 12.5 cm × 7.5 cm (5 inches × 3 inches).
- **Structure:** Based on ISBD (International Standard Bibliographic Description) across 8 description areas.`,
        },
        keyPoints: [
          {
            hi: 'सूची पत्रक (Catalogue Card) का मानक आकार 12.5 × 7.5 सेमी (5 × 3 इंच) होता है।',
            en: 'Standard library catalogue card dimensions are 12.5 × 7.5 cm (5 × 3 inches).',
          },
          {
            hi: 'CCC में मुख्य प्रविष्टि (Main Entry) के 6 अनुच्छेद (Sections) होते हैं।',
            en: 'In Ranganathan\'s CCC, the Main Entry consists of 6 distinct sections.',
          },
          {
            hi: 'AACR-2 वर्ष 1978 में और AACR-2R वर्ष 1988 में प्रकाशित हुआ था।',
            en: 'AACR-2 was released in 1978 and AACR-2R was released in 1988.',
          },
        ],
      },
      {
        id: 'u2_t6',
        title: {
          hi: '2.6 बिबलियोग्राफिक प्रारूप एवं मानक: MARC-21, CCF, Dublin Core, RDA',
          en: '2.6 Metadata & Standards: MARC-21, CCF, Dublin Core, RDA',
        },
        content: {
          hi: `### बिबलियोग्राफिक प्रारूप एवं मेटाडेटा मानक (Metadata & Standards)

#### 1. MARC (Machine-Readable Cataloging) एवं MARC-21:
- **विकास:** हेनरीट अव्राम (Henriette Avram) के नेतृत्व में 1960 के दशक में लाइब्रेरी ऑफ कांग्रेस (LC) द्वारा।
- **MARC-21:** 1999 में USMARC एवं CAN/MARC के विलय से बना सार्वभौमिक मानक।
- **प्रमुख टैग्स (Tags):**
  - **020:** ISBN
  - **022:** ISSN
  - **082:** DDC कॉल नंबर
  - **100:** मुख्य प्रविष्टि - व्यक्तिगत लेखक (Personal Author)
  - **245:** शीर्षक एवं उत्तरदायित्व कथन (Title & Statement of Responsibility)
  - **250:** संस्करण (Edition)
  - **260 / 264:** प्रकाशन विवरण (Publication details - स्थान, प्रकाशक, वर्ष)
  - **300:** भौतिक विवरण (Physical Description - पृष्ठ, आकार)
  - **650:** विषय शीर्षक (Subject Added Entry)

#### 2. CCF (Common Communication Format):
- **विकास:** यूनेस्को (UNESCO) द्वारा 1984 में विभिन्न ग्रंथसूची डेटाबेस में आदान-प्रदान हेतु।

#### 3. Dublin Core Metadata Initiative (DCMI):
- **उद्भव:** 1995 में डबलिन, ओहियो (USA) में आयोजित कार्यशाला में।
- **तत्व (Elements):** इसमें कुल **15 मूल मेटाडेटा तत्व** हैं: Title, Creator, Subject, Description, Publisher, Contributor, Date, Type, Format, Identifier, Source, Language, Relation, Coverage, Rights.

#### 4. RDA (Resource Description and Access):
- AACR-2 का आधुनिक डिजिटल उत्तराधिकारी, जिसे 2010 में जारी किया गया। यह FRBR (Functional Requirements for Bibliographic Records) मॉडल पर आधारित है।`,
          en: `### Bibliographic Formats & Metadata Standards

#### 1. MARC-21 (Machine-Readable Cataloging):
- Developed originally by Henriette Avram at Library of Congress. MARC-21 formed in 1999.
- **Key Tags:** 020 (ISBN), 100 (Author), 245 (Title), 250 (Edition), 260/264 (Imprint), 300 (Collation), 650 (Topical Subject).

#### 2. CCF (Common Communication Format):
- Formulated by UNESCO in 1984 to bridge varied bibliographic systems.

#### 3. Dublin Core (DCMI):
- Established in 1995 in Dublin, Ohio.
- Comprises **15 core metadata elements** (Title, Creator, Subject, Description, Publisher, Date, Format, Identifier, etc.).

#### 4. RDA (Resource Description and Access):
- Modern successor to AACR-2 launched in 2010, based on IFLA's FRBR conceptual framework.`,
        },
        keyPoints: [
          {
            hi: 'डबलिन कोर (Dublin Core) में कुल 15 मूल मेटाडेटा तत्व (Elements) होते हैं।',
            en: 'Dublin Core metadata standard comprises exactly 15 core elements.',
          },
          {
            hi: 'MARC-21 में टैग 100 व्यक्तिगत लेखक और टैग 245 पुस्तक शीर्षक के लिए होता है।',
            en: 'In MARC-21, tag 100 denotes Personal Author and tag 245 denotes Title.',
          },
          {
            hi: 'RDA को AACR-2 के स्थान पर 2010 में लागू किया गया, जो FRBR पर आधारित है।',
            en: 'RDA was released in 2010 replacing AACR-2, based on the FRBR framework.',
          },
        ],
      },
      {
        id: 'u2_t7',
        title: {
          hi: '2.7 विषय अनुक्रमणिका एवं श्रृंखला प्रक्रिया: Chain Procedure, Sears List (SLSH), PRECIS, POPSI',
          en: '2.7 Subject Cataloguing & Indexing: Chain Procedure, Sears List (SLSH), PRECIS, POPSI',
        },
        content: {
          hi: `### विषय अनुक्रमणिका एवं श्रृंखला प्रक्रिया (Subject Indexing & Chain Procedure)

#### 1. श्रृंखला प्रक्रिया (Chain Procedure / Chain Indexing):
- **आविष्कारक:** डॉ. एस.आर. रंगनाथन द्वारा 1938 में "Theory of Library Catalogue" पुस्तक में।
- **कार्यप्रणाली:** क्लास नंबर (Class Number) के प्रत्येक अंक की कड़ी दर कड़ी (कैनन) जांच कर विषय शीर्षक (Subject Headings) तैयार करना।
- **कड़ियों के प्रकार:** झूठी कड़ी (False Link), अपूर्ण कड़ी (Illegitimate Link), अनुपयुक्त कड़ी (Unsought Link), उपयुक्त कड़ी (Sought Link - केवल इसी से शीर्षक बनता है)।

#### 2. सीयर्स लिस्ट ऑफ सब्जेक्ट हेडिंग्स (SLSH):
- **निर्माता:** मिन्नी अर्ल सीयर्स (Minnie Earl Sears) द्वारा 1923 में छोटे एवं मध्यम पुस्तकालयों हेतु।
- **LCSH:** Library of Congress Subject Headings बड़े शोध पुस्तकालयों हेतु प्रयुक्त होती है।

#### 3. PRECIS (Preserved Context Indexing System):
- **आविष्कारक:** डेरेक ऑस्टिन (Derek Austin) द्वारा 1974 में ब्रिटिश नेशनल बिबलियोग्राफी (BNB) के लिए विकसित।
- **विशेषता:** पूर्व-समन्वित (Pre-coordinate) अनुक्रमणिका प्रणाली जिसमें संदर्भ ऑपरेटरों (Role Operators 0 to 6) का प्रयोग होता है।

#### 4. POPSI (Postulate-based Permuted Subject Indexing):
- **आविष्कारक:** गणेश भट्टाचार्य (G. Bhattacharyya) द्वारा 1979 में DRTC बैंगलोर में विकसित।
- **आधार:** रंगनाथन के गहन वर्गीकरण और PMEST सिद्धांतों पर आधारित।`,
          en: `### Subject Indexing & Chain Procedure

#### 1. Chain Procedure:
- Formulated by Dr. S.R. Ranganathan in 1938 in "Theory of Library Catalogue".
- Derives class index entries systematically by unraveling the chain of digits in a class number (False Link, Unsought Link, Sought Link).

#### 2. Sears List of Subject Headings (SLSH):
- Devised by Minnie Earl Sears in 1923 for small and medium-sized libraries.

#### 3. PRECIS (Preserved Context Indexing System):
- Developed by Derek Austin in 1974 for the British National Bibliography (BNB). Employs role operators.

#### 4. POPSI (Postulate-based Permuted Subject Indexing):
- Formulated by Ganesh Bhattacharyya at DRTC Bangalore in 1979, grounded in Ranganathan's postulational approach.`,
        },
        keyPoints: [
          {
            hi: 'श्रृंखला प्रक्रिया (Chain Indexing) का आविष्कार डॉ. रंगनाथन ने 1938 में किया था।',
            en: 'Chain Indexing was formulated by Dr. S.R. Ranganathan in 1938.',
          },
          {
            hi: 'PRECIS प्रणाली का विकास डेरेक ऑस्टिन ने 1974 में BNB के लिए किया था।',
            en: 'PRECIS was developed by Derek Austin in 1974 for BNB.',
          },
          {
            hi: 'POPSI का विकास गणेश भट्टाचार्य (G. Bhattacharyya) ने DRTC में 1979 में किया था।',
            en: 'POPSI was formulated by Ganesh Bhattacharyya at DRTC in 1979.',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // UNIT 3: सूचना स्रोत एवं संदर्भ सेवाएं (Information Sources & Services) - 5 Topics
  // =========================================================================
  {
    id: 'unit_3',
    unitNumber: 3,
    title: {
      hi: 'यूनिट 3: सूचना स्रोत एवं संदर्भ सेवाएं',
      en: 'Unit 3: Information Sources & Services',
    },
    shortDesc: {
      hi: 'प्राथमिक, द्वितीयक, तृतीयक स्रोत, संदर्भ ग्रंथ, CAS/SDI, INFLIBNET व DELNET',
      en: 'Primary, Secondary, Tertiary Sources, Reference Tools, CAS/SDI, INFLIBNET & DELNET',
    },
    iconName: 'search',
    topics: [
      {
        id: 'u3_t1',
        title: {
          hi: '3.1 सूचना स्रोतों का त्रिवर्गीकरण: प्राथमिक, द्वितीयक एवं तृतीयक स्रोत',
          en: '3.1 Classification of Information Sources: Primary, Secondary & Tertiary',
        },
        content: {
          hi: `### सूचना स्रोतों का वर्गीकरण
सूचना स्रोत वे माध्यम हैं जिनसे पाठक अपनी जिज्ञासाओं का समाधान एवं शोध हेतु प्रामाणिक तथ्य प्राप्त करते हैं। डेनिस ग्रोगन (Denis Grogan) एवं सी.डब्ल्यू. हैनसन (C.W. Hanson) ने इनका वैज्ञानिक वर्गीकरण प्रस्तुत किया:

#### 1. प्राथमिक स्रोत (Primary Sources):
- मौलिक अनुसंधान, नवीन खोज और प्रथम बार प्रकाशित अप्रकाशित मूल सामग्री।
- **उदाहरण:** शोध पत्रिकाएं (Periodicals/Journals), शोध प्रबंध एवं लघु शोध (Theses & Dissertations), सम्मेलन कार्यवाहियां (Conference Proceedings), पेटेंट्स (Patents), मानक (Standards), प्रयोगशाला डायरियां, व्यापार साहित्य (Trade Literature)।

#### 2. द्वितीयक स्रोत (Secondary Sources):
- प्राथमिक स्रोतों के आधार पर तैयार की गई सामग्री, जो सूचना को सुलभ एवं सुगम बनाती है।
- **उदाहरण:** अनुक्रमणिका (Indexes), सार पत्रिकाएं (Abstracts - जैसे Chemical Abstracts), विश्वकोश (Encyclopedias), शब्दकोश (Dictionaries), समीक्षा ग्रंथ (State-of-the-art reports), पाठ्यपुस्तकें (Textbooks), ग्रंथसूचियां (Bibliographies)।

#### 3. तृतीयक स्रोत (Tertiary Sources):
- प्राथमिक एवं द्वितीयक स्रोतों तक पहुंचने के लिए मार्गदर्शक की भूमिका निभाने वाले स्रोत।
- **उदाहरण:** स्रोतों की ग्रंथसूची (Bibliography of Bibliographies), निर्देशिकाएं (Directories), शोध निर्देशिकाएं (Directories of Research), संदर्भ स्रोतों के मार्गदर्शक (Guides to Reference Books - जैसे Winchell / Walford)।`,
          en: `### Classification of Information Sources
Scholars like Denis Grogan and C.W. Hanson categorized documentary sources into three primary tiers:

#### 1. Primary Sources
- Original, unfiltered intellectual discoveries published for the first time.
- **Examples:** Research journals, Ph.D. theses, dissertations, patents, standards, conference proceedings, project reports.

#### 2. Secondary Sources
- Processed, synthesized, and organized directly from primary literature.
- **Examples:** Indexing and abstracting journals, encyclopedias, dictionaries, yearbooks, textbooks, monographs.

#### 3. Tertiary Sources
- High-level roadmaps pointing towards primary and secondary sources.
- **Examples:** Guides to reference literature (e.g., Walford, Winchell), Bibliography of bibliographies, directories, yearbooks of international organizations.`,
        },
        keyPoints: [
          {
            hi: 'पेटेंट (Patents), शोध प्रबंध (Theses) एवं मानक (Standards) प्राथमिक सूचना स्रोत हैं।',
            en: 'Patents, dissertations, and standards are classical Primary Sources.',
          },
          {
            hi: 'विश्वकोश (Encyclopedia) और सार पत्रिकाएं (Abstracts) द्वितीयक सूचना स्रोत हैं।',
            en: 'Encyclopedias and abstracting journals are Secondary Sources.',
          },
          {
            hi: 'ग्रंथसूचियों की ग्रंथसूची (Bibliography of Bibliographies) तृतीयक स्रोत का उदाहरण है।',
            en: 'Bibliography of Bibliographies is a recognized Tertiary Source.',
          },
        ],
      },
      {
        id: 'u3_t2',
        title: {
          hi: '3.2 संदर्भ ग्रंथ एवं उनके प्रकार: विश्वकोश, शब्दकोश, ईयरबुक, पंचांग, ग्रंथसूची',
          en: '3.2 Reference Sources: Dictionaries, Encyclopedias, Yearbooks, Almanacs, Bibliographies',
        },
        content: {
          hi: `### संदर्भ ग्रंथ एवं उनके प्रकार (Reference Sources)
संदर्भ ग्रंथ वे ग्रंथ हैं जिनका अध्ययन आदि से अंत तक नहीं किया जाता, बल्कि विशिष्ट तथ्यों, प्रश्नों एवं शंकाओं के त्वरित निवारण हेतु उनका परामर्श लिया जाता है।

#### 1. विश्वकोश (Encyclopedias):
- **Encyclopaedia Britannica:** प्रथम प्रकाशन 1768-1771 में एडिनबर्ग (स्कॉटलैंड) में हुआ। 15वां संस्करण (1974) तीन भागों में विभाजित हुआ:
  - *Propaedia* (ज्ञान की रूपरेखा - 1 खंड)
  - *Micropaedia* (त्वरित संदर्भ - 12 खंड)
  - *Macropaedia* (गहन ज्ञान - 17 खंड)।
  - 2012 से इसका मुद्रित संस्करण बंद होकर पूर्णतः डिजिटल हो गया।
- **Encyclopedia Americana:** प्रथम अमेरिकी सामान्य विश्वकोश (1829)।

#### 2. शब्दकोश (Dictionaries):
- शब्दों की वर्तनी, उच्चारण, अर्थ, व्युत्पत्ति एवं विलोम/समानार्थी शब्द। (उदा. Oxford English Dictionary - OED, Webster's Dictionary)।

#### 3. ईयरबुक एवं वार्षिकियां (Yearbooks & Annuals):
- किसी एक वर्ष की सामाजिक, राजनीतिक, खेल एवं वैज्ञानिक घटनाओं का संक्षिप्त वार्षिक विवरण (उदा. Statesman's Yearbook, India: A Reference Annual)।

#### 4. पंचांग / अल्मनाक (Almanacs):
- खगोलीय घटनाएं, सूर्योदय-सूर्यास्त, तिथियां, आंकड़े एवं ऐतिहासिक तथ्य (उदा. Whitaker's Almanac, World Almanac)।

#### 5. भौगोलिक स्रोत (Geographical Sources):
- **गज़ेटियर (Gazetteer):** भौगोलिक नामों का शब्दकोश।
- **एटलस एवं मानचित्र (Atlas & Maps):** पृथ्वी के भौतिक, राजनीतिक मानचित्र।
- **ग्लोब एवं यात्रा मार्गदर्शिकाएं (Guidebooks).**

#### 6. ग्रंथसूची (Bibliography):
- पुस्तकों एवं प्रलेखों की सुव्यवस्थित सूची।
- **INB (Indian National Bibliography):** 1957 में सेंट्रल रेफरेंस लाइब्रेरी, कोलकाता द्वारा बी.एस. केसवन के संपादन में आरंभ हुई।`,
          en: `### Reference Tools: Encyclopedias, Dictionaries, Yearbooks & Gazetters

#### 1. Encyclopedias
- **Encyclopaedia Britannica:** First published in Edinburgh (1768-1771). 15th edition featured Propaedia (Outline), Micropaedia (Ready Ref), and Macropaedia (In-depth Knowledge). Print ceased in 2012.

#### 2. Dictionaries & Yearbooks
- Dictionaries define linguistic, etymological, and orthographic details.
- Yearbooks (e.g., Statesman's Yearbook, India Reference Annual) chronicle year-round global and national developments.

#### 3. Almanacs & Gazetteers
- **Gazetteer:** A geographical dictionary providing descriptive, historical, and statistical data of places.
- **Almanac:** Calendars, astronomical data, and astronomical ephemerides (Whitaker's).

#### 4. Bibliographies & INB
- Indian National Bibliography (INB) launched in 1957 under B.S. Kesavan at CRL, Kolkata.`,
        },
        keyPoints: [
          {
            hi: 'गज़ेटियर (Gazetteer) भौगोलिक नामों का शब्दकोश (Geographical Dictionary) कहलाता है।',
            en: 'A Gazetteer is technically a dictionary of geographical place names.',
          },
          {
            hi: 'इंसाइक्लोपीडिया ब्रिटानिका का 15वां संस्करण Propaedia, Micropaedia व Macropaedia में बंटा था।',
            en: 'Encyclopaedia Britannica 15th ed was divided into Propaedia, Micropaedia, and Macropaedia.',
          },
          {
            hi: 'INB (Indian National Bibliography) का प्रथम प्रकाशन 1957 में बी.एस. केसवन द्वारा किया गया।',
            en: 'INB was first published in 1957 under the editorship of B.S. Kesavan.',
          },
        ],
      },
      {
        id: 'u3_t3',
        title: {
          hi: '3.3 संदर्भ सेवाएं: तैयार संदर्भ सेवा (Ready Reference) बनाम दीर्घकालीन संदर्भ सेवा (Long Range)',
          en: '3.3 Reference Services: Ready Reference vs Long Range Reference',
        },
        content: {
          hi: `### संदर्भ सेवा: अवधारणा एवं वर्गीकरण
डॉ. रंगनाथन के अनुसार, संदर्भ सेवा "व्यक्तिगत रूप से पाठक और पुस्तक के मध्य सही संपर्क स्थापित करने की कला है" (Personal service to each reader in helping them find the right document).

#### संदर्भ सेवा के दो मुख्य प्रकार (रंगनाथन के अनुसार):

#### 1. तैयार संदर्भ सेवा (Ready Reference Service):
- **समय सीमा:** कुछ ही मिनटों (1 से 15 मिनट) में प्रदान की जाती है।
- **प्रकृति:** सरल, तथ्यात्मक एवं संक्षिप्त उत्तर (Fact-finding questions)।
- **उपकरण:** मानक संदर्भ ग्रंथों जैसे शब्दकोश, विश्वकोश, ईयरबुक, पंचांग, निर्देशिका एवं रेलवे समय सारणी से सीधे उत्तर दिए जाते हैं।
- **उदाहरण:** "बिहार की साक्षरता दर क्या है?", "यूनेस्को का मुख्यालय कहाँ है?", "गांधीजी का जन्म कब हुआ?"।

#### 2. दीर्घकालीन संदर्भ सेवा (Long Range Reference Service):
- **समय सीमा:** आधा घंटा, कई दिन, सप्ताह या महीने तक का समय लग सकता है।
- **प्रकृति:** गहन शोध, जटिल प्रश्न, तुलनात्मक अध्ययन एवं साहित्य खोज (Literature Search)।
- **उपकरण:** प्राथमिक स्रोत, शोध पत्रिकाएं, डेटाबेस, पुस्तकालय नेटवर्क एवं अंतर-पुस्तकालय ऋण (ILL)।
- **विशेषता:** इसमें सूचना सीधे किसी एक पुस्तक से नहीं मिलती, बल्कि विभिन्न स्रोतों का विश्लेषण एवं संकलन करना पड़ता है।`,
          en: `### Reference Services: Ready Reference vs Long Range Reference
Samuel Green (1876) originated the concept of reference assistance. Dr. Ranganathan defined reference service as "the personal service given to a reader in establishing contact between the right reader and the right book".

#### Two Classical Categories:
1. **Ready Reference Service:**
   - Answered in a very short duration (1 to 15 minutes).
   - Resolves factual, pinpointed queries using standard reference tools (dictionaries, almanacs, yearbooks).
   - Example: "Who is the Governor of Bihar?", "What is the capital of Australia?".

2. **Long Range Reference Service:**
   - May take hours, days, or even weeks.
   - Geared towards specialized researchers, academic investigations, and literature searches.
   - Involves consulting primary journals, bibliographic databases, indexing tools, and inter-library loan networks.`,
        },
        keyPoints: [
          {
            hi: 'तैयार संदर्भ सेवा (Ready Reference) का उत्तर 15 मिनट के भीतर सामान्य संदर्भ ग्रंथों से दिया जाता है।',
            en: 'Ready reference queries are typically solved within 15 minutes via standard reference tools.',
          },
          {
            hi: 'दीर्घकालीन संदर्भ सेवा (Long Range) शोधकर्ताओं एवं गहन विषय अध्ययन के लिए दी जाती है।',
            en: 'Long range reference service caters to deep literature and scholarly research needs.',
          },
          {
            hi: 'पुस्तकालय में व्यक्तिगत संदर्भ सेवा की शुरुआत सैमुअल ग्रीन (Samuel Green) ने 1876 में की थी।',
            en: 'Samuel Green pioneered personal reference service in libraries in 1876.',
          },
        ],
      },
      {
        id: 'u3_t4',
        title: {
          hi: '3.4 सामयिक अभिज्ञता सेवा (CAS) एवं चयनात्मक सूचना प्रसार (SDI - Luhn 1958)',
          en: '3.4 Alerting Services: CAS (Current Awareness) & SDI (Selective Dissemination - Luhn 1958)',
        },
        content: {
          hi: `### सामयिक अभिज्ञता सेवा (CAS) एवं चयनात्मक सूचना प्रसार (SDI)
सूचना विस्फोट के इस युग में वैज्ञानिकों एवं शोधकर्ताओं को उनके क्षेत्र के नवीनतम शोध से अद्यतन रखने हेतु अलर्टिंग सेवाएं दी जाती हैं।

#### 1. सामयिक अभिज्ञता सेवा (Current Awareness Service - CAS):
- **उद्देश्य:** प्रयोक्ताओं को उनके विषय क्षेत्र में हो रहे नवीनतम विकास एवं प्रकाशित साहित्य से निरंतर अवगत कराना।
- **प्रकृति:** व्यापक (Broad) एवं सामान्य समूह-उन्मुख सेवा।
- **प्रकार:**
  - नवीन आगमन सूची (List of New Additions)
  - पत्रिकाओं की विषय-सूची सेवा (Current Contents / TOC)
  - समाचार पत्र कतरन सेवा (Newspaper Clipping Service)
  - शोध-सार बुलेटिन (Abstracting Bulletin)।

#### 2. चयनात्मक सूचना प्रसार (SDI - Selective Dissemination of Information):
- **आविष्कारक:** एच.पी. लून (Hans Peter Luhn - IBM) द्वारा **1958** में विकसित।
- **प्रकृति:** वैयक्तिकृत एवं विशिष्ट (Highly Personalized) कम्प्यूटरीकृत सूचना सेवा।
- **कार्यप्रणाली के 6 मुख्य घटक (Components):**
  1. **प्रयोक्ता प्रोफाइल (User Profile):** शोधकर्ता की रुचियों व शोध क्षेत्र के कीवर्ड्स का संग्रह।
  2. **दस्तावेज़ प्रोफाइल (Document Profile):** नवीनतम प्रलेखों के सार व कीवर्ड्स।
  3. **मिलान प्रक्रिया (Matching):** कंप्यूटर सॉफ्टवेयर द्वारा प्रयोक्ता प्रोफाइल और दस्तावेज़ प्रोफाइल की तुलना।
  4. **अधिसूचना (Notification):** मिलान होने पर संबंधित शोधकर्ता को ईमेल/अलर्ट भेजना।
  5. **प्रतिपुष्टि (Feedback):** प्रयोक्ता से प्रतिक्रिया प्राप्त करना कि भेजी गई सूचना प्रासंगिक थी या नहीं।
  6. **प्रोफाइल संशोधन (Profile Modification):** फीडबैक के आधार पर कीवर्ड्स में सुधार करना।`,
          en: `### Alerting Services: CAS & SDI (Selective Dissemination of Information)

#### 1. Current Awareness Service (CAS)
- Informs users about current literature without targeting individual profiles.
- Formats: Table of Contents (TOC), routing of periodicals, list of latest acquisitions, press clipping services.

#### 2. Selective Dissemination of Information (SDI)
- Formulated by **H.P. Luhn (IBM) in 1958**.
- Highly customized automated current awareness tailored directly to individual researcher profiles.
- **6 Essential Steps:**
  1. User Profile Creation
  2. Document Profile Creation
  3. Matching Mechanism
  4. Notification Delivery
  5. Feedback Loop
  6. Profile Modification / Readjustment.`,
        },
        keyPoints: [
          {
            hi: 'SDI सेवा की अवधारणा का विकास एच.पी. लून (H.P. Luhn) द्वारा 1958 में IBM में किया गया था।',
            en: 'The concept of SDI was developed by H.P. Luhn at IBM in 1958.',
          },
          {
            hi: 'SDI के प्रमुख चरण: यूजर प्रोफाइल, डॉक्यूमेंट प्रोफाइल, मैचिंग, नोटिफिकेशन व फीडबैक।',
            en: 'SDI comprises: User profile, document profile, matching, notification, and feedback.',
          },
          {
            hi: 'CAS व्यापक समूह सेवा है जबकि SDI व्यक्तिगत शोधकर्ता उन्मुख सेवा है।',
            en: 'CAS is group-oriented, whereas SDI is personalized for individual researchers.',
          },
        ],
      },
      {
        id: 'u3_t5',
        title: {
          hi: '3.5 पुस्तकालय नेटवर्क एवं संसाधन सहभागिता: INFLIBNET, DELNET, NDLI, Shodhganga, OCLC',
          en: '3.5 Library Networks & Consortia: INFLIBNET, DELNET, NDLI, Shodhganga, OCLC',
        },
        content: {
          hi: `### पुस्तकालय नेटवर्क एवं संसाधन सहभागिता (Networks & Consortia)
संसाधनों की बढ़ती लागत एवं सीमित बजट के कारण पुस्तकालयों का आपसी सहयोग (Resource Sharing) अपरिहार्य हो गया है।

#### 1. INFLIBNET (Information and Library Network Centre):
- **स्थापना:** मार्च 1991 में UGC द्वारा एक अंतर-विश्वविद्यालय केंद्र (IUC) के रूप में।
- **मुख्यालय:** इन्फोसिटी, गांधीनगर, गुजरात।
- **प्रमुख परियोजनाएं:**
  - **शोधगंगा (Shodhganga):** भारतीय विश्वविद्यालयों के इलेक्ट्रॉनिक शोध प्रबंधों (ETDs) का राष्ट्रीय भंडार।
  - **शोधगंगोत्री (Shodhgangotri):** शोध की रूपरेखा (Synopsis / Research in Progress) का भंडार।
  - **e-ShodhSindhu:** उच्च शिक्षण संस्थानों हेतु ई-पत्रिकाओं का राष्ट्रीय कंसोर्टियम।
  - **SOUL Software:** पुस्तकालय स्वचालन हेतु सॉफ्टवेयर।
  - **IRINS:** भारतीय वैज्ञानिकों का विद्वान डेटाबेस।

#### 2. DELNET (Developing Library Network):
- **स्थापना:** 1988 में NISSAT के सहयोग से दिल्ली में (प्रारंभ में Delhi Library Network)।
- **मुख्यालय:** JNU कैंपस, नई दिल्ली।
- **महत्व:** भारत का सबसे बड़ा पुस्तकालय संसाधन सहभागिता एवं अंतर-पुस्तकालय ऋण (ILL) नेटवर्क।

#### 3. NDLI (National Digital Library of India):
- **विकास:** शिक्षा मंत्रालय, भारत सरकार द्वारा IIT खड़गपुर के नेतृत्व में विकसित।
- **उद्देश्य:** सभी स्तरों के भारतीय छात्रों को करोड़ों ई-बुक्स, ऑडियो-विजुअल व्याख्यान निःशुल्क उपलब्ध कराना।

#### 4. OCLC (Online Computer Library Center):
- **स्थापना:** 1967 में फ्रेड किलगोर (Fred Kilgour) द्वारा ओहियो में।
- **WorldCat:** विश्व का सबसे बड़ा यूनियन कैटलॉग, जिसमें अरबों ग्रंथसूची रिकॉर्ड्स हैं।`,
          en: `### Library Networks, Consortia & Resource Sharing

#### 1. INFLIBNET Centre
- Autonomous Inter-University Centre (IUC) of UGC founded in March 1991.
- **HQ:** Infocity, Gandhinagar, Gujarat.
- Flagship projects: **Shodhganga** (Indian ETD repository), **Shodhgangotri** (Synopses), **e-ShodhSindhu** (Higher ed consortium), SOUL ILS.

#### 2. DELNET (Developing Library Network)
- Founded in 1988 with NISSAT support; HQ at JNU Campus, New Delhi.
- Renowned for inter-library loan (ILL) and union catalogue services across South Asia.

#### 3. NDLI (National Digital Library of India)
- Initiated by the Ministry of Education; built and maintained by IIT Kharagpur.
- Mega national repository of digital educational resources.

#### 4. OCLC (Online Computer Library Center)
- Founded in 1967 by Fred Kilgour in Ohio. Hosts **WorldCat**, the world's largest union catalogue.`,
        },
        keyPoints: [
          {
            hi: 'INFLIBNET का मुख्यालय गांधीनगर (गुजरात) में है और यह UGC का स्वायत्त केंद्र है।',
            en: 'INFLIBNET is an autonomous Inter-University Centre of UGC based in Gandhinagar, Gujarat.',
          },
          {
            hi: 'शोधगंगा (Shodhganga) भारतीय विश्वविद्यालयों के शोध प्रबंधों (Theses) का डिजिटल भंडार है।',
            en: 'Shodhganga is the national repository of electronic theses and dissertations in India.',
          },
          {
            hi: 'DELNET की स्थापना 1988 में नई दिल्ली में संसाधन सहभागिता हेतु हुई थी।',
            en: 'DELNET was established in 1988 in New Delhi for library resource sharing.',
          },
          {
            hi: 'विश्व का सबसे बड़ा ऑनलाइन यूनियन कैटलॉग WorldCat (OCLC) है।',
            en: 'WorldCat (OCLC) is the world\'s largest online bibliographic union catalogue.',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // UNIT 4: पुस्तकालय प्रबंधन, परिसंचरण एवं संरक्षण (Library Management & Preservation) - 7 Topics
  // =========================================================================
  {
    id: 'unit_4',
    unitNumber: 4,
    title: {
      hi: 'यूनिट 4: पुस्तकालय प्रबंधन, परिसंचरण एवं संरक्षण',
      en: 'Unit 4: Library Management & Preservation',
    },
    shortDesc: {
      hi: 'POSDCORB, पुस्तक चयन, अर्जन, ब्राउन/नेवार्क प्रणाली, सत्यापन, ZBB व जिल्दसाजी',
      en: 'POSDCORB, Book Selection, Acquisition, Browne/Newark, Stock Verification, ZBB & Binding',
    },
    iconName: 'briefcase',
    topics: [
      {
        id: 'u4_t1',
        title: {
          hi: '4.1 प्रबंधन के सिद्धांत व कार्य: POSDCORB (Gulick & Urwick), हेनरी फेयोल के 14 सिद्धांत',
          en: '4.1 Principles of Management: POSDCORB (Gulick & Urwick), Henry Fayol 14 Principles',
        },
        content: {
          hi: `### प्रबंधन के सिद्धांत एवं कार्य (POSDCORB व शास्त्रीय सिद्धांत)
पुस्तकालय प्रबंधन पुस्तकालय के भौतिक, वित्तीय एवं मानव संसाधनों का अनुकूलतम नियोजन एवं संचालन है।

#### 1. POSDCORB का सूत्र:
लूथर गुलिक (Luther Gulick) एवं लिंडल उर्विक (Lyndall Urwick) ने 1937 में प्रबंधन के 7 बुनियादी कार्यों का सूत्र प्रस्तुत किया:
- **P - Planning (नियोजन):** लक्ष्यों एवं कार्यप्रणाली की पूर्व रूपरेखा तैयार करना।
- **O - Organizing (संगठन):** संरचना का निर्माण एवं दायित्वों का विभाजन।
- **S - Staffing (कर्मचारी प्रबंधन):** भर्ती, प्रशिक्षण व पदस्थापना।
- **D - Directing (निर्देशन):** निर्णय लेना एवं कर्मचारियों को मार्गदर्शित करना।
- **CO - Coordinating (समन्वय):** विभिन्न विभागों के मध्य तालमेल।
- **R - Reporting (प्रतिवेदन):** कार्यों की प्रगति की रिपोर्ट उच्चाधिकारियों को देना।
- **B - Budgeting (बजट निर्माण):** वित्तीय योजना, आय-व्यय का हिसाब व नियंत्रण।

#### 2. हेनरी फेयोल के 14 सिद्धांत (Classical Management):
हेनरी फेयोल (आधुनिक प्रबंधन के जनक) ने 14 सिद्धांतों का प्रतिपादन किया:
1. कार्य का विभाजन (Division of Work)
2. अधिकार एवं उत्तरदायित्व (Authority & Responsibility)
3. अनुशासन (Discipline)
4. आदेश की एकता (Unity of Command)
5. निर्देश की एकता (Unity of Direction)
6. सामान्य हित को व्यक्तिगत हित पर वरीयता
7. कर्मचारियों का पारिश्रमिक
8. केंद्रीयकरण (Centralization)
9. सोपान श्रृंखला (Scalar Chain)
10. व्यवस्था (Order)
11. समता/न्याय (Equity)
12. कर्मचारियों के कार्यकाल में स्थिरता
13. पहल शक्ति (Initiative)
14. सहयोग की भावना (Esprit de Corps - Team Spirit)।

#### 3. वैज्ञानिक प्रबंधन (Scientific Management):
- जनक: **एफ.डब्ल्यू. टेलर (F.W. Taylor)** - समय अध्ययन (Time Study), गति अध्ययन (Motion Study) एवं कार्यकुशलता पर बल।`,
          en: `### Principles of Management: POSDCORB & Classical Theories

#### 1. POSDCORB Formula
Formulated in 1937 by **Luther Gulick and Lyndall Urwick**:
- **P** - Planning
- **O** - Organizing
- **S** - Staffing
- **D** - Directing
- **CO** - Coordinating
- **R** - Reporting
- **B** - Budgeting

#### 2. Henri Fayol's 14 Principles of Management
Often considered the Father of Modern Operational Management, Fayol enumerated: Division of work, Authority, Discipline, Unity of command, Unity of direction, Subordination of individual interests, Remuneration, Centralization, Scalar chain, Order, Equity, Stability of tenure, Initiative, Esprit de corps.

#### 3. Scientific Management
Father: **F.W. Taylor**, pioneer of time and motion studies, standardized work routines, and piece-rate incentives.`,
        },
        keyPoints: [
          {
            hi: 'POSDCORB सूत्र लूथर गुलिक एवं लिंडल उर्विक द्वारा 1937 में प्रतिपादित किया गया था।',
            en: 'The acronym POSDCORB was coined by Luther Gulick and Lyndall Urwick in 1937.',
          },
          {
            hi: 'हेनरी फेयोल ने प्रबंधन के 14 सिद्धांतों का प्रतिपादन किया था।',
            en: 'Henri Fayol formulated the classical 14 principles of general management.',
          },
          {
            hi: 'एफ.डब्ल्यू. टेलर को वैज्ञानिक प्रबंधन (Scientific Management) का जनक माना जाता है।',
            en: 'F.W. Taylor is revered as the Father of Scientific Management.',
          },
        ],
      },
      {
        id: 'u4_t2',
        title: {
          hi: '4.2 पुस्तक चयन के क्लासिक सिद्धांत: मेल्विल डेवी, ड्रूरी (Drury), रंगनाथन',
          en: '4.2 Classic Book Selection Principles: Melvil Dewey, Drury, Ranganathan',
        },
        content: {
          hi: `### पुस्तक चयन के क्लासिक सिद्धांत (Book Selection Principles)
पुस्तकालय के सीमित बजट में पाठकों की अधिकतम संतुष्टि हेतु सर्वश्रेष्ठ पुस्तकों के चयन के ऐतिहासिक सिद्धांत:

#### 1. मेल्विल डेवी का सिद्धांत (1876):
- **सूत्र:** *"The best reading for the largest number at the least cost"* (न्यूनतम लागत पर अधिकतम पाठकों के लिए सर्वोत्तम पठन सामग्री)।
- **अर्थ:** सीमित वित्तीय संसाधनों में गुणवत्ता और व्यापक जनउपयोगिता के संतुलन पर बल।

#### 2. फ्रांसिस ड्रूरी (F.K.W. Drury) का सिद्धांत (1930):
- **सूत्र:** *"To provide the right book to the right reader at the right time"* (सही पाठक को सही समय पर सही पुस्तक उपलब्ध कराना)।
- **अर्थ:** ड्रूरी ने अपनी पुस्तक "Book Selection" में मांग (Demand) और उपयोगिता को सर्वोच्च प्राथमिकता दी।

#### 3. डॉ. एस.आर. रंगनाथन का सिद्धांत (1952):
- **पुस्तक:** "Library Book Selection" (1952)।
- **सिद्धांत:** रंगनाथन ने पुस्तक चयन को अपने **पांच सूत्रों (Five Laws of Library Science)** के आधार पर परिभाषित किया:
  - *प्रथम सूत्र:* केवल संग्रह सजाने के लिए नहीं, बल्कि वास्तविक उपयोग के लिए पुस्तकें चुनें।
  - *द्वितीय सूत्र:* प्रत्येक पाठक वर्ग (बालक, वृद्ध, शोधार्थी) की विशिष्ट मांग अनुसार चयन।
  - *तृतीय सूत्र:* अप्रचलित या अनुपयोगी पुस्तकें न खरीदी जाएं ताकि प्रत्येक पुस्तक को पाठक मिल सके।
  - *चतुर्थ सूत्र:* चयन एवं आदेश प्रक्रिया इतनी त्वरित हो कि पाठक का समय बचे।
  - *पंचम सूत्र:* भावी विकास को ध्यान में रखकर चयन।

#### 4. एल.आर. मैकॉल्विन (L.R. McColvin) का मांग एवं आपूर्ति सिद्धांत (1925):
- मैकॉल्विन के अनुसार पुस्तक चयन केवल मांग (Demand) पर आधारित होना चाहिए।`,
          en: `### Classic Book Selection Principles

#### 1. Melvil Dewey's Maxim (1876):
- *"The best reading for the largest number at the least cost."*
- Stresses economy, wide accessibility, and highest literary/informational quality.

#### 2. F.K.W. Drury's Principle (1930):
- *"To provide the right book to the right reader at the right time."*
- Centered on the reader profile, immediacy of need, and subject alignment.

#### 3. Dr. S.R. Ranganathan's Postulates (1952):
- Grounded book selection strictly on the **Five Laws of Library Science** in his work "Library Book Selection".

#### 4. L.R. McColvin's Theory of Book Selection (1925):
- Known as the **Demand and Supply Theory**—advocates that books should be acquired strictly to satisfy genuine reading demands.`,
        },
        keyPoints: [
          {
            hi: 'मेल्विल डेवी का सिद्धांत: "न्यूनतम लागत पर अधिकतम पाठकों के लिए सर्वोत्तम पठन सामग्री"।',
            en: 'Dewey\'s principle: "The best reading for the largest number at the least cost".',
          },
          {
            hi: 'ड्रूरी (Drury) का सिद्धांत: "सही पाठक को सही समय पर सही पुस्तक उपलब्ध कराना"।',
            en: 'Drury\'s maxim: "To provide the right book to the right reader at the right time".',
          },
          {
            hi: 'एल.आर. मैकॉल्विन (1925) ने पुस्तक चयन का "मांग एवं आपूर्ति सिद्धांत" दिया था।',
            en: 'L.R. McColvin propounded the Demand and Supply Theory of book selection in 1925.',
          },
        ],
      },
      {
        id: 'u4_t3',
        title: {
          hi: '4.3 पुस्तकालय अर्जन, परिग्रहण एवं तकनीकी प्रक्रिया दिनचर्या',
          en: '4.3 Technical Operations: Acquisition, Accessioning & Cataloguing Routines',
        },
        content: {
          hi: `### पुस्तकालय अर्जन एवं परिग्रहण प्रक्रिया (Acquisition & Accessioning)
पुस्तकालय में सामग्री प्राप्त होने से लेकर पाठक के हाथों में पहुँचने तक की तकनीकी दिनचर्या:

#### 1. अर्जन अनुभाग (Acquisition Section):
- **कार्य:** पुस्तकों का चयन, डुप्लिकेशन जांच (Checking duplication in catalogue), विक्रेताओं को क्रय आदेश (Purchase Order) जारी करना, चालान मिलान एवं बिल भुगतान हेतु संस्तुति।

#### 2. परिग्रहण रजिस्टर (Accession Register):
- **महत्व:** पुस्तकालय का स्थायी कानूनी अभिलेख (Permanent Legal Record)।
- **मानक आकार:** 16 इंच × 13 इंच।
- **मानक स्तंभ (Columns):** पारंपरिक परिग्रहण रजिस्टर में **कुल 14 से 15 कॉलम** होते हैं:
  1. Date (दिनांक)
  2. Accession Number (परिग्रहण संख्या - प्रत्येक पुस्तक की विशिष्ट पहचान)
  3. Author (लेखक)
  4. Title (शीर्षक)
  5. Edition (संस्करण)
  6. Place & Publisher (स्थान व प्रकाशक)
  7. Year of Publication (प्रकाशन वर्ष)
  8. Pages (पृष्ठ संख्या)
  9. Size (आकार)
  10. Binding (जिल्द का प्रकार)
  11. Source / Vendor (प्राप्ति स्रोत)
  12. Bill No. & Date (बिल संख्या व तारीख)
  13. Cost / Price (मूल्य)
  14. Class No. / Book No. (वर्गांक व ग्रंथांक)
  15. Remarks (टिप्पणी - खोने या वीडिंग की स्थिति)।

#### 3. तकनीकी प्रक्रिया (Technical Processing):
- **वर्गीकरण (Classification):** विषय अनुसार क्लास नंबर देना।
- **सूचीकरण (Cataloguing):** कार्ड या OPAC प्रविष्टि बनाना।
- **तैयारी:** बारकोड/RFID चिप चिपकाना, पॉकेट, बुक कार्ड व डेट स्लिप लगाना।`,
          en: `### Technical Operations: Acquisition & Accessioning Routines

#### 1. Acquisition Section Workflows
- Verification against existing stock to eliminate unwanted duplicates.
- Generating purchase orders, vendor tracking, physical inspection upon receipt, invoice processing.

#### 2. Accession Register
- The permanent legal and financial inventory of all library holdings.
- Standard physical dimensions: 16 × 13 inches.
- Features **14 to 15 standardized columns**: Date, Accession Number, Author, Title, Edition, Publisher, Year, Pages, Size, Binding, Source, Invoice No. & Date, Cost, Call Number, Remarks.

#### 3. Technical Processing
- Assignment of Call Number (Class Number + Book Number + Collection Number).
- Cataloguing entries in AACR-2/CCC/MARC format.
- Stamping ownership seals, pasting date-slips, inserting book pockets and RFID tags.`,
        },
        keyPoints: [
          {
            hi: 'परिग्रहण रजिस्टर (Accession Register) पुस्तकालय का स्थायी कानूनी अभिलेख होता है।',
            en: 'The Accession Register is the permanent legal inventory record of the library.',
          },
          {
            hi: 'पारंपरिक परिग्रहण रजिस्टर में सामान्यतः 14 से 15 मानक स्तंभ (Columns) होते हैं।',
            en: 'A standard physical Accession Register comprises 14 to 15 standardized columns.',
          },
          {
            hi: 'कॉल नंबर (Call Number) = Class Number + Book Number + Collection Number.',
            en: 'Call Number consists of Class Number + Book Number + Collection Number.',
          },
        ],
      },
      {
        id: 'u4_t4',
        title: {
          hi: '4.4 निर्गम-आगम प्रणालियां: ब्राउन प्रणाली (1895) एवं नेवार्क प्रणाली (1900)',
          en: '4.4 Circulation Systems: Browne System (1895) & Newark System (1900)',
        },
        content: {
          hi: `### निर्गम-आगम प्रणालियां (Circulation / Charging & Discharging Systems)
पुस्तकों को पाठकों को जारी करने (Issue/Charging) एवं वापस जमा करने (Return/Discharging) की दो सबसे ऐतिहासिक व लोकप्रिय प्रणालियां:

#### 1. ब्राउन चार्जिंग प्रणाली (Browne Issue System):
- **आविष्कारक:** नीना ई. ब्राउन (Nina E. Browne) द्वारा **1895** में (बोस्टन लाइब्रेरी ब्यूरो)।
- **प्रयुक्त सामग्री:**
  - **रीडर टिकट (Reader's Ticket):** जेब/लिफाफे के आकार का पॉकेट (Pocket shaped)।
  - **बुक कार्ड (Book Card):** पुस्तक के साथ रहने वाला कार्ड।
  - **डेट स्लिप (Date Slip):** पुस्तक पर चिपकाई गई देय-तिथि पर्ची।
- **विशेषता:** इसमें पाठक या लाइब्रेरियन को कोई हस्ताक्षर या प्रविष्टि नहीं करनी पड़ती। बुक कार्ड को पाठक के टिकट पॉकेट में डालकर ट्रे में देय तिथि अनुसार रख दिया जाता है। अत्यंत तेज व सरल प्रणाली।

#### 2. नेवार्क चार्जिंग प्रणाली (Newark Issue System):
- **आविष्कारक:** जॉन कॉटन डाना (John Cotton Dana) द्वारा **1900** में नेवार्क पब्लिक लाइब्रेरी (न्यू जर्सी, यूएसए) में।
- **प्रयुक्त सामग्री:**
  - पुस्तक कार्ड (Book Card), पाठक कार्ड (Borrower's Card - पाठक अपने पास रखता है), डेट स्लिप।
- **विशेषता:** इसमें पाठक के कार्ड और बुक कार्ड दोनों पर देय तिथि एवं पाठक संख्या की मुहर (Stamping) लगाई जाती है। इसमें पूर्ण लिखित रिकॉर्ड सुरक्षित रहता है, जिससे यह पता लगाया जा सकता है कि किसी पाठक ने कौन-सी पुस्तकें पढ़ी हैं और कोई पुस्तक कब-कब जारी हुई।

#### आधुनिक विकास:
- आज बारकोड (Barcode) एवं RFID ऑटोमेशन कियोस्क के माध्यम से सेल्फ चेक-इन / चेक-आउट किया जाता है।`,
          en: `### Circulation Systems: Browne vs Newark Issue Systems

#### 1. Browne Charging System (1895)
- Designed by **Nina E. Browne** (Librarian of Boston Library Bureau).
- Utilizes reader pockets (envelope-type ticket) and book cards.
- **Process:** The book card is slipped directly inside the borrower's pocket ticket and filed chronologically by due date in circulation trays. No signatures or date stamping required on cards—extremely fast.

#### 2. Newark Charging System (1900)
- Introduced by **John Cotton Dana** at Newark Public Library (New Jersey).
- Utilizes a Borrower's Identification Card, a Book Card, and a Date Slip.
- **Process:** Both the borrower card and book card are stamped with date and borrower ID. Offers robust historical records of book circulation and patron reading habits.`,
        },
        keyPoints: [
          {
            hi: 'ब्राउन प्रणाली का आविष्कार नीना ई. ब्राउन द्वारा 1895 में किया गया था।',
            en: 'The Browne Circulation System was invented by Nina E. Browne in 1895.',
          },
          {
            hi: 'नेवार्क प्रणाली का आविष्कार जॉन कॉटन डाना द्वारा 1900 में किया गया था।',
            en: 'The Newark Circulation System was created by John Cotton Dana in 1900.',
          },
          {
            hi: 'ब्राउन प्रणाली में पाठक टिकट पॉकेट के आकार (Pocket-shaped) का होता है।',
            en: 'In Browne system, the reader ticket is fashioned as a pocket-shaped pouch.',
          },
        ],
      },
      {
        id: 'u4_t5',
        title: {
          hi: '4.5 संग्रह सत्यापन (Stock Verification), वार्षिक प्रतिवेदन एवं अनुपयोगी पुस्तकों की छंटाई (Weeding)',
          en: '4.5 Stock Verification, Annual Report & Weeding Out Policies',
        },
        content: {
          hi: `### संग्रह सत्यापन, वीपिंग एवं वार्षिक प्रतिवेदन

#### 1. संग्रह सत्यापन (Stock Verification / Physical Verification):
- **उद्देश्य:** पुस्तकालय के पंजीकृत संग्रह की भौतिक उपलब्धता की जांच करना, खोई हुई पुस्तकों की पहचान करना एवं कैटलॉग को अद्यतन करना।
- **प्रमुख विधियां:**
  1. परिग्रहण रजिस्टर द्वारा मिलान (Accession Register Method - समय लेने वाली)।
  2. शेल्फ सूची द्वारा मिलान (Shelf List Method - सबसे वैज्ञानिक एवं सुरक्षित विधि)।
  3. संख्यात्मक पर्चियों या अलग रजिस्टर द्वारा।
  4. बारकोड स्कैनर / RFID हैंडहेल्ड रीडर द्वारा (आधुनिक त्वरित विधि)।
- **भारत सरकार का मानक (GFR 2017 - General Financial Rules):**
  - प्रति वर्ष प्रति 1000 जारी/परामर्शित पुस्तकों पर **5 पुस्तकों का नुकसान (Loss of 5 books per 1000 issues)** सामान्य माना जाता है और इसे लाइब्रेरियन की लापरवाही नहीं माना जाएगा।

#### 2. अनुपयोगी पुस्तकों की छंटाई (Weeding Out):
- पंचम सूत्र ("पुस्तकालय एक वर्धनशील संस्था है") के अनुसार फटी-पुरानी, अप्रचलित एवं अप्रासंगिक पुस्तकों को संग्रह से हटाना अनिवार्य है।
- **CREW Method:** Continuous Re-evaluation and Weeding (MUSTIE criteria - Misleading, Ugly, Superseded, Trivial, Irrelevant, Elsewhere obtainable).

#### 3. वार्षिक प्रतिवेदन (Annual Report):
- पुस्तकालय के वर्ष भर की गतिविधियों, बजट, नए संग्रह, सदस्यों एवं भावी योजनाओं का आधिकारिक दस्तावेज।`,
          en: `### Stock Verification, Weeding Out & Annual Reports

#### 1. Stock Verification
- Periodic physical audit of all physical books against official shelf list and accession catalog.
- **Methods:** Shelf list method (most professional), Accession register ledger audit, Barcode/RFID scanner sweep.
- **Government of India Benchmark (GFR 2017 Rule 215):**
  - Loss of up to **5 volumes per 1,000 volumes issued/consulted in a year** is considered reasonable and write-off permissible without holding staff negligent.

#### 2. Weeding Out Policies
- Removal of worn out, obsolete, and non-consulted volumes to conserve physical shelf space.
- Guided by Ranganathan's Fifth Law and the **MUSTIE formula** (Misleading, Ugly, Superseded, Trivial, Irrelevant, Elsewhere available).

#### 3. Annual Report
- The comprehensive annual record demonstrating accountability, achievements, footfall, and future development projections.`,
        },
        keyPoints: [
          {
            hi: 'शेल्फ सूची विधि (Shelf List Method) संग्रह सत्यापन की सबसे वैज्ञानिक एवं लोकप्रिय विधि है।',
            en: 'The Shelf List Method is recognized as the most efficient stock verification approach.',
          },
          {
            hi: 'GFR 2017 के अनुसार प्रति 1000 जारी पुस्तकों पर 5 पुस्तकों का नुकसान स्वीकार्य माना जाता है।',
            en: 'According to GFR 2017, a loss of up to 5 books per 1,000 issues is deemed acceptable.',
          },
          {
            hi: 'पुस्तकों की छंटाई (Weeding Out) डॉ. रंगनाथन के पंचम सूत्र का सीधा क्रियान्वयन है।',
            en: 'Weeding out materials directly executes Ranganathan\'s Fifth Law.',
          },
        ],
      },
      {
        id: 'u4_t6',
        title: {
          hi: '4.6 पुस्तकालय वित्त एवं बजट निर्माण: Zero-Based Budgeting (ZBB - Peter Pyhrr 1970), PPBS, Line Item',
          en: '4.6 Financial Management & Budgeting: Zero-Based Budgeting (ZBB - Peter Pyhrr 1970), PPBS, Line Item',
        },
        content: {
          hi: `### पुस्तकालय वित्त एवं बजट निर्माण विधियां (Library Budgeting)
बजट किसी निश्चित समयावधि (सामान्यतः एक वित्तीय वर्ष) के लिए पुस्तकालय के अनुमानित आय एवं व्यय का वित्तीय विवरण है।

#### बजट निर्माण की प्रमुख विधियां (Types of Budgeting):

#### 1. लाइन-आइटम / वृद्धिशील बजट (Line Item / Incremental Budgeting):
- सबसे पुरानी एवं सबसे आम विधि। इसमें पिछले वर्ष के बजट को आधार मानकर प्रत्येक मद (जैसे पुस्तकें, पत्रिकाएं, वेतन) में 5-10% की सामान्य वृद्धि कर दी जाती है।

#### 2. शून्य-आधारित बजट (ZBB - Zero-Based Budgeting):
- **आविष्कारक:** पीटर पायर (Peter A. Pyhrr) द्वारा **1970** में (टेक्सास इंस्ट्रूमेंट्स में)।
- **सिद्धांत:** इसमें पिछले वर्ष के खर्चों को शून्य मानकर शुरुआत की जाती है। प्रत्येक गतिविधि एवं मद के लिए नए सिरे से औचित्य (Justification) सिद्ध करना पड़ता है।
- **प्रमुख घटक:** निर्णय पैकेज (Decision Packages) तैयार करना एवं प्राथमिकता तय करना।

#### 3. कार्यक्रम एवं नियोजन बजट (PPBS - Planning Programming Budgeting System):
- **विकास:** 1960 के दशक में रॉबर्ट मैकनामरा (अमेरिकी रक्षा विभाग) द्वारा।
- इसमें दीर्घकालीन योजना (Planning), कार्यक्रम (Programming) और लागत-लाभ विश्लेषण पर बल दिया जाता है।

#### 4. निष्पादन बजट (Performance Budgeting):
- कार्यों के परिणामों एवं निष्पादन (Outcomes) को वित्तीय आवंटन से जोड़ना।

#### पुस्तकालय बजट आवंटन के मानक:
- रंगनाथन के अनुसार: 50% कर्मचारियों के वेतन पर, 40% अध्ययन सामग्री (पुस्तकों/पत्रिकाओं) पर, 10% अन्य विविध मदों पर।
- विश्वविद्यालय शिक्षा आयोग (राधाकृष्णन आयोग): प्रति छात्र ₹40 का वार्षिक प्रावधान या कुल संस्थागत बजट का 6.5% पुस्तकालय को आवंटित हो।`,
          en: `### Library Financial Management & Budgeting Techniques

#### 1. Line-Item (Incremental) Budgeting
- The traditional and simplest method. Uses historical expenditures and increments each line item by a set percentage (5-10%).

#### 2. Zero-Based Budgeting (ZBB)
- Introduced by **Peter A. Pyhrr in 1970** at Texas Instruments.
- Begins from a clean slate ("zero base"). Every single proposal must justify its existence afresh via Decision Packages.

#### 3. Planning Programming Budgeting System (PPBS)
- Championed by Robert McNamara in the 1960s at the US Department of Defense. Emphasizes cost-benefit analysis and long-range program goals.

#### 4. Allocation Norms
- Dr. Ranganathan: 50% staff salaries, 40% reading resources, 10% administrative maintenance.
- Radhakrishnan Commission (1948): Recommends 6.5% of the university's total operational budget for the library.`,
        },
        keyPoints: [
          {
            hi: 'शून्य आधारित बजट (ZBB) का विकास पीटर पायर (Peter Pyhrr) ने 1970 में किया था।',
            en: 'Zero-Based Budgeting (ZBB) was developed by Peter Pyhrr in 1970.',
          },
          {
            hi: 'ZBB में पिछले वित्तीय वर्ष को नजरअंदाज कर शून्य से निर्णय पैकेज बनाए जाते हैं।',
            en: 'ZBB disregards historical spending and justifies every item afresh using decision packages.',
          },
          {
            hi: 'राधाकृष्णन आयोग (1948) ने संस्थान के कुल बजट का 6.5% पुस्तकालय हेतु अनुशंसित किया।',
            en: 'The Radhakrishnan Commission (1948) recommended allocating 6.5% of institutional budget to libraries.',
          },
        ],
      },
      {
        id: 'u4_t7',
        title: {
          hi: '4.7 पुस्तकालय सामग्री का संरक्षण, परिरक्षण एवं जिल्दसाजी (Binding)',
          en: '4.7 Preservation, Conservation & Binding of Library Materials',
        },
        content: {
          hi: `### पुस्तकालय सामग्री का संरक्षण एवं जिल्दसाजी (Preservation & Binding)
पुस्तकालय सामग्री को भौतिक क्षरण, कीटों, पर्यावरणीय दुष्प्रभावों एवं समय की मार से सुरक्षित रखने की तकनीकें:

#### 1. परिरक्षण एवं संरक्षण (Preservation vs Conservation):
- **Preventive Preservation (निवारक संरक्षण):** तापमान नियंत्रण (20°-24°C), सापेक्ष आर्द्रता (45-55%), धूल नियंत्रण एवं नियमित स्वच्छता।
- **Curative Conservation (उपचारात्मक संरक्षण):** क्षतिग्रस्त प्रलेखों की मरम्मत, डी-एसिडिफिकेशन (De-acidification) और रासायनिक उपचार।

#### 2. विनाशकारी कारक एवं नियंत्रण:
- **जैविक कारक:** दीमक (Termites), सिल्वरफिश (Silverfish), बुकवर्म एवं फफूंद (Fungus)। इनके नियंत्रण हेतु नैफ्थलीन गोलियां, थाइमॉल धूमन (Thymol fumigation) व कीटनाशक छिड़काव।
- **भौतिक कारक:** सूर्य का पराबैंगनी (UV) प्रकाश (कागज़ को पीला व भंगुर बनाता है), नमी एवं धूल।

#### 3. जिल्दसाजी के चरण (Stages of Book Binding):
जिल्दसाजी पुस्तक के पृष्ठों को सुरक्षित रखने एवं दीर्घायु प्रदान करने की कला है:
1. **कोलेशन (Collation):** पृष्ठों का क्रमवार मिलान एवं अपूर्णता की जांच।
2. **सिलाई (Sewing):** पृष्ठों को आपस में धागे से सिलना।
3. **ग्लूइंग एवं राउंडिंग/बैकिंग (Gluing & Rounding/Backing):** रीढ़ (Spine) को आकार देना।
4. **कवर लगाना (Boarding/Covering):** कार्डबोर्ड एवं लेदर/कपड़ा चढ़ाना।
5. **अक्षर अंकन (Lettering / Gold Tooling):** पुस्तक की रीढ़ पर शीर्षक, लेखक एवं कॉल नंबर अंकित करना।`,
          en: `### Preservation, Conservation & Book Binding

#### 1. Preventive vs Curative Conservation
- **Environmental Controls:** Ideal storage temperature 20°–24°C; relative humidity between 45% and 55%.
- **Chemical Threats:** Acid deterioration in wood-pulp paper resolved via deacidification.

#### 2. Biological Deterioration
- Silverfish, termites, book lice, cockroaches, and mold spores.
- Managed through thymol fumigation chambers, naphthalene blocks, and controlled ventilation.

#### 3. Stages of Book Binding
1. **Collation:** Ensuring pages are unbroken and in sequential pagination.
2. **Sewing:** Fastening folds using linen thread.
3. **Rounding and Backing:** Forming a convex spine to withstand stress.
4. **Boarding / Casing:** Fitting boards with cloth, buckram, or leather.
5. **Finishing / Lettering:** Stamping author, title, and call number on the spine.`,
        },
        keyPoints: [
          {
            hi: 'पुस्तकालय के लिए आदर्श तापमान 20°-24°C एवं सापेक्ष आर्द्रता 45-55% मानी जाती है।',
            en: 'Ideal library storage condition is 20°–24°C temperature with 45–55% relative humidity.',
          },
          {
            hi: 'जिल्दसाजी का प्रथम चरण कोलेशन (Collation - पृष्ठों का क्रम मिलान) होता है।',
            en: 'The very first step in bookbinding is Collation (checking page order).',
          },
          {
            hi: 'कीटों से बचाव हेतु थाइमॉल धूमन (Thymol Fumigation) का प्रयोग किया जाता है।',
            en: 'Thymol fumigation is commonly employed to eliminate fungus and insect infestations.',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // UNIT 5: पुस्तकालय स्वचालन एवं सूचना प्रौद्योगिकी (Library Automation & ICT) - 5 Topics
  // =========================================================================
  {
    id: 'unit_5',
    unitNumber: 5,
    title: {
      hi: 'यूनिट 5: पुस्तकालय स्वचालन एवं सूचना प्रौद्योगिकी',
      en: 'Unit 5: Library Automation & ICT',
    },
    shortDesc: {
      hi: 'कंप्यूटर मूल तत्व, कोहा (Koha), SOUL 3.0, ई-ग्रंथालय, RFID, बारकोड, OPAC व बूलियन खोज',
      en: 'ICT Basics, Koha ILS, SOUL 3.0, e-Granthalaya, RFID, Barcode, OPAC & Boolean Search',
    },
    iconName: 'hardware-chip',
    topics: [
      {
        id: 'u5_t1',
        title: {
          hi: '5.1 कंप्यूटर के आधारभूत तत्व, पीढ़ियां, हार्डवेयर, सॉफ्टवेयर एवं ऑपरेटिंग सिस्टम',
          en: '5.1 Basics of ICT, Computer Generations, Hardware, Software & Operating Systems',
        },
        content: {
          hi: `### कंप्यूटर के आधारभूत तत्व एवं पीढ़ियां
पुस्तकालय स्वचालन (Library Automation) के लिए सूचना एवं संचार प्रौद्योगिकी (ICT) की आधारभूत समझ अनिवार्य है।

#### कंप्यूटर की 5 पीढ़ियां (5 Generations of Computers):
1. **प्रथम पीढ़ी (1940-1956):** मुख्य घटक: **वैक्यूम ट्यूब (Vacuum Tubes)**। भाषा: मशीन भाषा। (उदा. ENIAC, UNIVAC)।
2. **द्वितीय पीढ़ी (1956-1963):** मुख्य घटक: **ट्रांजिस्टर (Transistors)** - आविष्कारक: विलियम शॉकले। भाषा: असेंबली भाषा एवं प्रारंभिक उच्च स्तरीय भाषा (FORTRAN, COBOL)।
3. **तृतीय पीढ़ी (1964-1971):** मुख्य घटक: **इंटीग्रेटेड सर्किट (IC Chips)** - आविष्कारक: जैक किल्बी।
4. **चतुर्थ पीढ़ी (1971-वर्तमान):** मुख्य घटक: **माइक्रोप्रोसेसर / VLSI (Very Large Scale Integration)**। पर्सनल कंप्यूटर (PC) का युग।
5. **पंचम पीढ़ी (वर्तमान एवं भावी):** मुख्य घटक: **ULSI एवं कृत्रिम बुद्धिमत्ता (Artificial Intelligence - AI)**, क्वांटम कंप्यूटिंग।

#### सॉफ्टवेयर एवं ऑपरेटिंग सिस्टम:
- **सिस्टम सॉफ्टवेयर:** ऑपरेटिंग सिस्टम (OS - जैसे Windows, Linux, Ubuntu, macOS)।
- **ओपन सोर्स ओएस:** Linux (लिनक्स) - पुस्तकालय सर्वरों (जैसे Koha, DSpace) के लिए सबसे सुरक्षित व लोकप्रिय।
- **मेमोरी श्रेणियां:**
  - **RAM (Random Access Memory):** प्राथमिक, वोलेटाइल (अस्थायी) मेमोरी।
  - **ROM (Read Only Memory):** गैर-वोलेटाइल, स्थायी (BIOS बूटिंग)।
  - **द्वितीयक मेमोरी:** HDD, SSD, पेन ड्राइव, क्लाउड स्टोरेज।`,
          en: `### Basics of ICT, Hardware, Software & Computer Generations

#### Five Generations of Computers:
1. **1st Gen (1940-56):** Vacuum Tubes; Machine language (ENIAC, UNIVAC).
2. **2nd Gen (1956-63):** Transistors (Shockley, Bardeen, Brattain); Assembly and early Fortran/COBOL.
3. **3rd Gen (1964-71):** Integrated Circuits (IC chips - Jack Kilby); Multi-programming OS.
4. **4th Gen (1971-Present):** Microprocessors (VLSI/LSI); Personal Computers and networking.
5. **5th Gen (Present & Future):** Artificial Intelligence, Ultra Large Scale Integration (ULSI), Natural Language Processing.

#### Software & Operating Systems
- **System Software:** Windows, Linux, Unix, macOS. Linux is the universal operating platform for Koha and DSpace.
- **Memory Types:** RAM (Volatile, working memory), ROM (Non-volatile, firm BIOS storage), Secondary drives (SSD, Cloud).`,
        },
        keyPoints: [
          {
            hi: 'प्रथम पीढ़ी में वैक्यूम ट्यूब, द्वितीय में ट्रांजिस्टर और तृतीय में IC चिप का प्रयोग हुआ।',
            en: '1st gen used Vacuum Tubes, 2nd gen Transistors, and 3rd gen Integrated Circuits (ICs).',
          },
          {
            hi: 'Koha और DSpace जैसे पुस्तकालय सॉफ्टवेयर मुख्य रूप से Linux (Ubuntu) पर चलते हैं।',
            en: 'Koha and DSpace library systems run primarily on the Linux (Ubuntu) platform.',
          },
          {
            hi: 'RAM एक अस्थायी (Volatile) मेमोरी है जबकि ROM स्थायी (Non-volatile) मेमोरी है।',
            en: 'RAM is volatile working memory, whereas ROM is permanent non-volatile firmware.',
          },
        ],
      },
      {
        id: 'u5_t2',
        title: {
          hi: '5.2 एकीकृत पुस्तकालय प्रणाली (ILS): कोहा (Koha - Open Source, Perl, 1999) एवं मुख्य मॉड्यूल्स',
          en: '5.2 Integrated Library Systems (ILS): Koha (Open Source, Perl, 1999) & Core Modules',
        },
        content: {
          hi: `### कोहा (Koha) एकीकृत पुस्तकालय प्रबंधन प्रणाली
कोहा विश्व का पहला पूर्णतः **ओपन सोर्स (Open Source ILS)** पुस्तकालय स्वचालन सॉफ्टवेयर है।

#### कोहा का संक्षिप्त इतिहास:
- **विकास:** वर्ष **1999** में हॉरोव्हेनुआ लाइब्रेरी ट्रस्ट (Horowhenua Library Trust), न्यूजीलैंड के लिए कैटिपो कम्युनिकेशंस (Katipo Communications) द्वारा विकसित।
- **रिलीज:** जनवरी **2000** में इसे आम जनता हेतु ओपन सोर्स के रूप में जारी किया गया।
- **प्रोग्रामिंग भाषा:** **Perl** भाषा में लिखित।
- **डेटाबेस:** MySQL / MariaDB.
- **लाइसेंस:** GNU General Public License (GPL) - पूर्णतः निःशुल्क।
- **मानक समर्थन:** MARC-21, UNIMARC, Z39.50, SIP2 (RFID हेतु), OAI-PMH.

#### कोहा के मुख्य मॉड्यूल्स (Core Modules):
1. **परिसंचरण (Circulation):** निर्गम-आगम, नवीनीकरण, जुर्माना गणना एवं होल्ड/रिजर्वेशन।
2. **सूचीकरण (Cataloging):** MARC-21 आधारित बिबलियोग्राफिक डेटा एंट्री एवं Z39.50 सर्वर से त्वरित कैटलॉगिंग।
3. **अधिग्रहण (Acquisition):** बजट आवंटन, वेंडर प्रबंधन, क्रय आदेश एवं चालान प्रोसेसिंग।
4. **सामयिक प्रकाशन (Serials Control):** पत्रिकाओं की सदस्यता, अंक प्राप्ति (Kardex सिस्टम) एवं दावा प्रबंधन।
5. **संरक्षक / प्रयोक्ता (Patrons):** सदस्यों का पंजीकरण एवं श्रेणी निर्धारण।
6. **ओपैक (OPAC):** वेब-आधारित सार्वजनिक खोज कैटलॉग।
7. **रिपोर्ट्स (Reports):** एसक्यूएल (SQL) आधारित अनुकूलित सांख्यिकीय प्रतिवेदन।`,
          en: `### Koha Integrated Library System (ILS)
Koha is universally acclaimed as the first full-featured open-source Integrated Library System (ILS).

#### History & Architecture
- **Origin:** Commissioned in 1999 by Horowhenua Library Trust in New Zealand; developed by Katipo Communications.
- **First Release:** January 2000 under the GNU General Public License (GPL).
- **Core Technology:** Written in **Perl**, runs on Linux with MySQL/MariaDB database.
- **Standards Supported:** MARC-21, UNIMARC, Z39.50, SIP2, OAI-PMH.

#### Core Modules of Koha
1. Circulation (Checkout, Checkin, Renew, Fine, Reserve)
2. Cataloging (MARC-21 and Z39.50 catalog harvesting)
3. Acquisition (Vendor orders, invoices, ledger tracking)
4. Serials Management (Kardex subscription schedules, issues)
5. Patrons (User profiles and privilege categories)
6. OPAC (Web-accessible user public catalogue)
7. Reports (Custom SQL reporting tools).`,
        },
        keyPoints: [
          {
            hi: 'कोहा (Koha) का विकास 1999 में न्यूजीलैंड में हुआ था और यह पर्ल (Perl) भाषा में लिखित है।',
            en: 'Koha was developed in 1999 in New Zealand and is coded in the Perl language.',
          },
          {
            hi: 'कोहा विश्व का प्रथम ओपन सोर्स ILS है जो GNU GPL लाइसेंस के तहत निःशुल्क है।',
            en: 'Koha is the world\'s first open-source ILS distributed free under the GNU GPL license.',
          },
          {
            hi: 'कोहा में RFID एकीकरण हेतु SIP2 प्रोटोकॉल और डेटा आदान-प्रदान हेतु Z39.50 का प्रयोग होता है।',
            en: 'Koha leverages SIP2 protocol for RFID systems and Z39.50 for record harvesting.',
          },
        ],
      },
      {
        id: 'u5_t3',
        title: {
          hi: '5.3 भारतीय ILS: सोल 3.0 (SOUL 3.0 - INFLIBNET) एवं ई-ग्रंथालय 4.0 (e-Granthalaya - NIC)',
          en: '5.3 Indian ILS: SOUL 3.0 (INFLIBNET) & e-Granthalaya 4.0 (NIC for Schools)',
        },
        content: {
          hi: `### भारतीय पुस्तकालय स्वचालन सॉफ्टवेयर: SOUL 3.0 एवं e-Granthalaya

#### 1. SOUL 3.0 (Software for University Libraries):
- **विकासकर्ता:** इन्फ्लिबनेट केंद्र (INFLIBNET Centre, गांधीनगर - UGC का अंतर-विश्वविद्यालय केंद्र)।
- **संस्करण क्रम:**
  - SOUL 1.0 (वर्ष 2000 में जारी)
  - SOUL 2.0 (वर्ष 2009 में जारी)
  - **SOUL 3.0 (फरवरी 2021 में जारी - नवीनतम संस्करण)**।
- **डेटाबेस:** MS-SQL Server / MySQL.
- **विशेषताएं:** MARC-21, Unicode (भारतीय भाषाओं हेतु), RFID एकीकरण, वेब-ओपैक एवं NCIP प्रोटोकॉल का पूर्ण समर्थन।
- **मॉड्यूल्स:** Acquisition, Cataloguing, Circulation, Serial Control, OPAC, Administration.

#### 2. ई-ग्रंथालय 4.0 (e-Granthalaya 4.0):
- **विकासकर्ता:** राष्ट्रीय सूचना विज्ञान केंद्र (NIC - National Informatics Centre), इलेक्ट्रॉनिकी एवं आईटी मंत्रालय, भारत सरकार।
- **संस्करण क्रम:** 1.0 (2003), 2.0 (2005), 3.0 (2007), **4.0 (2015 - क्लाउड रेडी संस्करण)**।
- **क्लाउड आर्किटेक्चर:** ई-ग्रंथालय 4.0 नेशनल क्लाउड (MeghRaj) पर होस्टेड एक एंटरप्राइज क्लाउड सॉफ्टवेयर है।
- **उपयोगिता:** केंद्रीय विद्यालय (KVS), नवोदय विद्यालय (NVS), बिहार राज्य विद्यालय पुस्तकालयों एवं सरकारी विभागों में बड़े पैमाने पर प्रयुक्त।
- **लागत:** भारत सरकार के संस्थानों एवं विद्यालयों को निःशुल्क उपलब्ध।`,
          en: `### Indian Library Systems: SOUL 3.0 & e-Granthalaya 4.0

#### 1. SOUL 3.0 (Software for University Libraries)
- Developed by **INFLIBNET Centre, Gandhinagar** (UGC Inter-University Centre).
- Evolution: SOUL 1.0 (2000), SOUL 2.0 (2009), **SOUL 3.0 (February 2021)**.
- Tailored specifically for Indian colleges and universities with multi-language Unicode and MARC-21 support.

#### 2. e-Granthalaya 4.0
- Developed by **National Informatics Centre (NIC)**, Ministry of Electronics & IT, Government of India.
- Version 4.0 (2015) is a cloud-native SaaS application hosted on the National Cloud (**MeghRaj**).
- Widely adopted across government school libraries (KVS, NVS, State School libraries). Provided free to government educational institutions.`,
        },
        keyPoints: [
          {
            hi: 'SOUL सॉफ्टवेयर का विकास INFLIBNET द्वारा किया गया, जिसका नवीनतम संस्करण SOUL 3.0 (2021) है।',
            en: 'SOUL software was engineered by INFLIBNET; its latest release is SOUL 3.0 (2021).',
          },
          {
            hi: 'ई-ग्रंथालय (e-Granthalaya) NIC द्वारा विकसित क्लाउड-आधारित सॉफ्टवेयर है।',
            en: 'e-Granthalaya is a cloud-ready software developed by NIC (Govt of India).',
          },
          {
            hi: 'विद्यालय पुस्तकालयों (KVS/NVS/सरकारी स्कूल) में ई-ग्रंथालय का व्यापक प्रयोग होता है।',
            en: 'e-Granthalaya 4.0 is the prominent platform across Indian school library networks.',
          },
        ],
      },
      {
        id: 'u5_t4',
        title: {
          hi: '5.4 पहचान तकनीकें: बारकोड (Barcode), आरएफआईडी (RFID) एवं क्यूआर कोड (QR Code)',
          en: '5.4 Identification Technologies: Barcode, RFID (Radio Frequency Identification) & QR Code',
        },
        content: {
          hi: `### पहचान तकनीकें: बारकोड, RFID एवं क्यूआर कोड

#### 1. बारकोड तकनीक (Barcode Technology):
- **आविष्कारक:** नॉर्मन जोसेफ वुडलैंड एवं बर्नार्ड सिल्वर (1952)।
- **प्रकृति:** समानांतर काली और सफेद पट्टियों (Lines & Spaces) की 1D (One Dimensional) ऑप्टिकल श्रृंखला।
- **पुस्तकालय उपयोग:** परिग्रहण संख्या (Accession Number) एवं पाठक आईडी कार्ड को तेजी से स्कैन करने हेतु।
- **सीमा:** इसे पढ़ने के लिए स्कैनर का लाइन-ऑफ-साइट (Line of sight) में होना आवश्यक है; एक समय में केवल एक ही बारकोड पढ़ा जा सकता है।

#### 2. आरएफआईडी तकनीक (RFID - Radio Frequency Identification):
- **प्रकृति:** रेडियो तरंगों पर आधारित संपर्क-रहित (Non-line-of-sight) डिजिटल तकनीक।
- **घटक (Components):**
  1. **RFID टैग (Tag):** पुस्तक पर चिपकाया जाने वाला माइक्रोचिप + एंटेना।
  2. **रीडर / स्कैनर (Reader):** रेडियो तरंगों से टैग का डेटा पढ़ने वाला उपकरण।
  3. **एंटीना (Antenna):** सिग्नल ट्रांसमिशन।
  4. **सर्वर / ILS सॉफ्टवेयर:** डेटाबेस से संपर्क।
- **पुस्तकालय में लाभ:**
  - एक साथ कई पुस्तकों की त्वरित स्कैनिंग (Bulk reading)।
  - सेल्फ चेक-आउट एवं चेक-इन कियोस्क।
  - सुरक्षा गेट (Security Gates / EAS) - अनधिकृत पुस्तक ले जाने पर अलार्म बजना।
  - हैंडहेल्ड रीडर द्वारा अत्यंत त्वरित संग्रह सत्यापन (Stock Verification)।

#### 3. क्यूआर कोड (QR Code - Quick Response):
- **आविष्कारक:** डेंसो वेव (जापान - 1994)।
- **प्रकृति:** 2D (Two Dimensional) मैट्रिक्स बारकोड, जो बारकोड की तुलना में सैकड़ों गुना अधिक डेटा (टेक्स्ट, यूआरएल) संग्रहीत कर सकता है।`,
          en: `### Identification Technologies: Barcode, RFID & QR Code

#### 1. Barcode Technology
- 1D optical representation of data via parallel dark and light bars.
- Requires optical line-of-sight laser scanning; processes one item at a time. Used for Accession number and patron ID scanning.

#### 2. RFID (Radio Frequency Identification)
- Wireless, contactless communication using electromagnetic radio waves.
- **Components:** Microchip Tag with antenna, Reader, Antenna, Middleware linking to ILS.
- **Advantages in Libraries:** Instant bulk charging/discharging, automated patron self-kiosks, theft security gates (EAS), rapid inventory sweeps without pulling books off shelves.

#### 3. QR Code (Quick Response)
- 2D matrix barcode invented in 1994 by Denso Wave; stores extensive alphanumeric information and URLs readable by smartphones.`,
        },
        keyPoints: [
          {
            hi: 'RFID तकनीक रेडियो तरंगों (Radio waves) पर कार्य करती है और इसमें लाइन-ऑफ-साइट की आवश्यकता नहीं होती।',
            en: 'RFID functions via radio frequency signals and requires no direct line-of-sight.',
          },
          {
            hi: 'RFID के सुरक्षा गेट (Security Gates) चोरी रोकथाम (Theft detection / EAS) का कार्य करते हैं।',
            en: 'RFID security gates provide Electronic Article Surveillance (EAS) against unauthorized removal.',
          },
          {
            hi: 'बारकोड 1D (एक-आयामी) होता है जबकि QR कोड 2D (द्वि-आयामी) मैट्रिक्स कोड होता है।',
            en: 'Barcodes are 1D optical strips, whereas QR Codes are 2D matrix symbologies.',
          },
        ],
      },
      {
        id: 'u5_t5',
        title: {
          hi: '5.5 ओपैक (OPAC) एवं वेब-ओपैक (Web-OPAC), खोज तकनीकें व बूलियन ऑपरेटर्स (AND, OR, NOT)',
          en: '5.5 OPAC & Web-OPAC, Search Techniques (Boolean Operators: AND, OR, NOT)',
        },
        content: {
          hi: `### ओपैक (OPAC), वेब-ओपैक एवं बूलियन खोज तकनीकें

#### 1. OPAC (Online Public Access Catalogue):
- पारंपरिक कार्ड कैटलॉग का आधुनिक कम्प्यूटरीकृत रूप।
- पाठक शीर्षक, लेखक, विषय, कॉल नंबर, प्रकाशक या कीवर्ड द्वारा कुछ ही सेकंडों में पुस्तक की उपलब्धता एवं शेल्फ लोकेशन जान सकते हैं।
- **Web-OPAC:** इंटरनेट/वेब ब्राउज़र के माध्यम से दुनिया के किसी भी कोने से चौबीसों घंटे (24×7) सुलभ ओपैक।

#### 2. बूलियन ऑपरेटर्स (Boolean Operators):
- **जनक:** जॉर्ज बूल (George Boole - 1847, Boolean Logic)।
- सूचना पुनर्प्राप्ति (Information Retrieval) में खोज परिणामों को सटीक बनाने के लिए 3 मुख्य बूलियन ऑपरेटर्स प्रयुक्त होते हैं:
  1. **AND (संकीर्णक - Narrowing):**
     - दोनों शब्दों का होना अनिवार्य।
     - *परिणाम:* खोज परिणाम **कम (घटते)** हो जाते हैं।
     - *उदा:* "Library AND Bihar" (केवल वे प्रलेख जिनमें दोनों शब्द हों)।
  2. **OR (विस्तारक - Broadening):**
     - दोनों में से कोई भी एक या दोनों शब्द उपस्थित हों। पर्यायवाची शब्दों के लिए उपयोगी।
     - *परिणाम:* खोज परिणाम **अधिक (बढ़ते)** हो जाते हैं।
     - *उदा:* "Library OR Information" (कोई भी एक शब्द होने पर भी प्रलेख मिलेगा)।
  3. **NOT / AND NOT (अपवर्जक - Excluding):**
     - पहले शब्द को शामिल करना और दूसरे शब्द को खोज से बाहर निकालना।
     - *परिणाम:* अवांछित परिणाम हट जाते हैं।
     - *उदा:* "Librarian NOT College" (केवल स्कूल/पब्लिक लाइब्रेरियन मिलेंगे, कॉलेज नहीं)।

#### 3. अन्य खोज तकनीकें:
- **ट्रंकेशन (Truncation - Wildcard):** मूल शब्द के बाद तारांकन (*) लगाना (उदा. Librar* = Library, Libraries, Librarian, Librarianship)।
- **वाक्यांश खोज (Phrase Searching):** दोहरे उद्धरण चिह्नों (" ") का प्रयोग (उदा. "Public Library Legislation")।
- **प्रॉक्सिमिटी ऑपरेटर्स (Proximity):** NEAR, WITH आदि।`,
          en: `### OPAC, Web-OPAC & Boolean Search Retrieval Techniques

#### 1. OPAC (Online Public Access Catalogue) & Web-OPAC
- The computerized interactive catalog replacing physical card cabinets.
- Web-OPAC extends accessibility over standard web browsers 24×7 globally.

#### 2. Boolean Operators (George Boole, 1847)
- **AND (Logical Product):** Retrieves records containing both terms. **Narrows and restricts** search results.
- **OR (Logical Sum):** Retrieves records containing either term or both. **Expands and broadens** recall (ideal for synonyms).
- **NOT (Logical Difference):** Excludes records containing the designated second term.

#### 3. Advanced Retrieval Operators
- **Truncation (* or ?):** Stem retrieval (e.g., Comput* finds Computer, Computing, Computation).
- **Phrase Searching ("..."):** Exact word sequence binding (e.g., "Colon Classification").
- **Proximity Searching:** Locates terms within a specified word distance (e.g., NEAR, ADJ).`,
        },
        keyPoints: [
          {
            hi: 'बूलियन ऑपरेटर AND खोज परिणामों को सीमित/कम (Narrow) करता है।',
            en: 'The Boolean operator AND restricts/narrows search results by requiring all terms.',
          },
          {
            hi: 'बूलियन ऑपरेटर OR खोज परिणामों को विस्तृत/अधिक (Broaden) करता है।',
            en: 'The Boolean operator OR broadens search results to include alternate synonyms.',
          },
          {
            hi: 'Web-OPAC इंटरनेट के माध्यम से दुनिया के किसी भी कोने से पुस्तकालय कैटलॉग देखने की सुविधा देता है।',
            en: 'Web-OPAC enables 24/7 global web browser access to the library\'s holdings catalogue.',
          },
        ],
      },
    ],
  },
];
