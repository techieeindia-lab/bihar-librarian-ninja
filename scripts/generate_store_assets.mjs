import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const WORKSPACE = "d:\\playstore\\dev\\bihar-librarian-ninja";
const ASSETS_DIR = path.join(WORKSPACE, "assets");
const PLAYSTORE_DIR = path.join(ASSETS_DIR, "playstore_graphics");
const SCRATCH_DIR = "C:\\Users\\pc\\.gemini\\antigravity-ide\\brain\\7ad6843e-a31b-440f-9a8a-74eaa7decfcd";

const ICON_SRC = path.join(SCRATCH_DIR, "bihar_librarian_app_icon_lis_v2.jpg").replace(/\\/g, '/');
const SCREEN1_SRC = path.join(SCRATCH_DIR, "raw_screen_1_home_1788880912160.png").replace(/\\/g, '/');
const SCREEN2_SRC = path.join(SCRATCH_DIR, "raw_screen_2_quiz_1788880940253.png").replace(/\\/g, '/');
const SCREEN3_SRC = path.join(SCRATCH_DIR, "raw_screen_3_glossary_1788881007122.png").replace(/\\/g, '/');

// 1. Generate HTML for App Icon 1024x1024 and 512x512
const iconHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body, html { width: 100vw; height: 100vh; overflow: hidden; background: #0B192C; }
    img { width: 100%; height: 100%; object-fit: cover; display: block; }
  </style>
</head>
<body>
  <img src="file:///${ICON_SRC}" />
</body>
</html>`;

fs.writeFileSync(path.join(SCRATCH_DIR, "scratch", "icon.html"), iconHtml);

// 2. Helper for Screenshot HTML
function createScreenshotHtml({ bgGradient, badgeText, badgeColor, mainTitle, subTitle, highlightPill, screenImg, customInnerHtml }) {
  return `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Hind:wght@500;600;700&family=Poppins:wght@600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1080px;
      height: 1920px;
      overflow: hidden;
      background: ${bgGradient};
      font-family: 'Poppins', 'Hind', sans-serif;
      position: relative;
      color: #fff;
    }
    /* Ambient glow circles */
    .glow-top {
      position: absolute;
      top: -100px;
      left: 50%;
      transform: translateX(-50%);
      width: 800px;
      height: 400px;
      background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%);
      pointer-events: none;
    }
    .glow-phone {
      position: absolute;
      top: 600px;
      left: 50%;
      transform: translateX(-50%);
      width: 850px;
      height: 850px;
      background: radial-gradient(circle, ${badgeColor}33 0%, rgba(0,0,0,0) 70%);
      pointer-events: none;
    }
    /* Top Header Section */
    .header {
      width: 100%;
      height: 540px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 60px 40px 20px;
      z-index: 10;
      position: relative;
    }
    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 255, 255, 0.12);
      border: 1.5px solid rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(20px);
      padding: 14px 34px;
      border-radius: 999px;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: #F8FAFC;
      margin-bottom: 24px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    }
    .main-title {
      font-family: 'Hind', sans-serif;
      font-size: 64px;
      font-weight: 700;
      line-height: 1.25;
      color: #FFFFFF;
      text-shadow: 0 4px 20px rgba(0,0,0,0.5);
      margin-bottom: 14px;
      letter-spacing: -0.5px;
    }
    .sub-title {
      font-family: 'Hind', sans-serif;
      font-size: 38px;
      font-weight: 600;
      color: #E2E8F0;
      line-height: 1.35;
      margin-bottom: 24px;
      max-width: 960px;
      text-shadow: 0 2px 10px rgba(0,0,0,0.4);
    }
    .gold-tag {
      background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
      color: #1E1B4B;
      font-weight: 800;
      font-size: 22px;
      padding: 8px 26px;
      border-radius: 999px;
      letter-spacing: 1px;
      text-transform: uppercase;
      box-shadow: 0 6px 18px rgba(217, 119, 6, 0.4);
      display: inline-block;
    }

    /* Phone Mockup Frame */
    .phone-container {
      position: absolute;
      top: 510px;
      left: 50%;
      transform: translateX(-50%);
      width: 820px;
      height: 1410px;
      background: #0f172a;
      border-radius: 54px;
      padding: 14px 14px 0;
      border: 6px solid #334155;
      box-shadow: 
        0 40px 100px rgba(0,0,0,0.9),
        0 15px 35px rgba(0,0,0,0.7),
        inset 0 0 0 2px rgba(255,255,255,0.12);
      z-index: 20;
      display: flex;
      flex-direction: column;
    }
    /* Sleek Android punch hole header */
    .phone-top-bar {
      width: 100%;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .punch-hole {
      width: 14px;
      height: 14px;
      background: #020617;
      border: 1.5px solid #1e293b;
      border-radius: 50%;
    }
    .screen-viewport {
      width: 100%;
      flex: 1;
      border-radius: 38px 38px 0 0;
      overflow: hidden;
      background: #090d16;
    }
    .screen-img {
      width: 100%;
      height: 100%;
      object-fit: fill;
      display: block;
    }
  </style>
</head>
<body>
  <div class="glow-top"></div>
  <div class="glow-phone"></div>

  <div class="header">
    <div class="badge-pill">
      ${badgeText}
    </div>
    <h1 class="main-title">${mainTitle}</h1>
    <p class="sub-title">${subTitle}</p>
    <div>
      <span class="gold-tag">${highlightPill}</span>
    </div>
  </div>

  <div class="phone-container">
    <div class="phone-top-bar">
      <div class="punch-hole"></div>
    </div>
    <div class="screen-viewport">
      ${customInnerHtml ? customInnerHtml : `<img class="screen-img" src="file:///${screenImg}" />`}
    </div>
  </div>
</body>
</html>`;
}

// Screenshot 1: Hero / Home
const shot1Html = createScreenshotHtml({
  bgGradient: "linear-gradient(180deg, #0B192C 0%, #1E3A8A 40%, #0F172A 100%)",
  badgeText: "🎯 बिहार पुस्तकालयध्यक्ष भर्ती परीक्षा 2026",
  badgeColor: "#3B82F6",
  mainTitle: "कक्षा 9-12 विद्यालय लाइब्रेरियन",
  subTitle: "BSEB LET व BPSC परीक्षा हेतु 100% संपूर्ण तैयारी",
  highlightPill: "★ नवीनतम CBT परीक्षा पैटर्न ★",
  screenImg: SCREEN1_SRC,
});
fs.writeFileSync(path.join(SCRATCH_DIR, "scratch", "shot1.html"), shot1Html);

// Screenshot 2: Quiz & Mistake Bank
const shot2Html = createScreenshotHtml({
  bgGradient: "linear-gradient(180deg, #064E3B 0%, #065F46 38%, #0F172A 100%)",
  badgeText: "⚡ 70+ टॉपिक-वार CBT क्विज़ टेस्ट",
  badgeColor: "#10B981",
  mainTitle: "विस्तृत समाधान व व्याख्या",
  subTitle: "गलत प्रश्नों का ऑटोमैटिक मिस्टेक बैंक व विश्लेषण",
  highlightPill: "★ 10,000+ LIS MCQs प्रैक्टिस ★",
  screenImg: SCREEN2_SRC,
});
fs.writeFileSync(path.join(SCRATCH_DIR, "scratch", "shot2.html"), shot2Html);

// Screenshot 3: Glossary & Quick Search
const shot3Html = createScreenshotHtml({
  bgGradient: "linear-gradient(180deg, #4C1D95 0%, #312E81 38%, #0B192C 100%)",
  badgeText: "🔍 LIS शब्दावली व महत्वपूर्ण वर्ष",
  badgeColor: "#8B5CF6",
  mainTitle: "SOUL, 1933, MARC-21",
  subTitle: "2 सेकंड में खोजें 725+ फुल फॉर्म, वर्ष व अधिनियम",
  highlightPill: "★ A-Z Instant Smart Search ★",
  screenImg: SCREEN3_SRC,
});
fs.writeFileSync(path.join(SCRATCH_DIR, "scratch", "shot3.html"), shot3Html);

// Screenshot 4: 3D Flashcards & Active Recall
const flashcardMockupHtml = `
<style>
  .fc-screen {
    width: 100%;
    height: 100%;
    background: #0B132B;
    color: #F8FAFC;
    display: flex;
    flex-direction: column;
    padding: 26px 28px 24px;
    box-sizing: border-box;
    position: relative;
  }
  .fc-top-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
  }
  .fc-nav-title {
    font-size: 26px;
    font-weight: 800;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .fc-badge {
    background: rgba(99, 102, 241, 0.2);
    border: 1px solid #6366F1;
    color: #A5B4FC;
    font-size: 16px;
    font-weight: 700;
    padding: 6px 16px;
    border-radius: 999px;
  }
  .fc-progress-wrap {
    margin-bottom: 22px;
  }
  .fc-progress-bar {
    width: 100%;
    height: 8px;
    background: #1E293B;
    border-radius: 4px;
    overflow: hidden;
  }
  .fc-progress-fill {
    width: 65%;
    height: 100%;
    background: linear-gradient(90deg, #6366F1, #EC4899);
    border-radius: 4px;
  }
  .fc-stats-row {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    color: #94A3B8;
    margin-top: 8px;
    font-weight: 600;
  }
  .fc-category-pill {
    align-self: flex-start;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 8px 18px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    color: #38BDF8;
    margin-bottom: 22px;
  }
  .fc-3d-card {
    flex: 1;
    background: linear-gradient(160deg, #1E293B 0%, #0F172A 100%);
    border: 2px solid rgba(99, 102, 241, 0.5);
    border-radius: 28px;
    padding: 40px 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    position: relative;
    margin-bottom: 24px;
  }
  .fc-card-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(239, 68, 68, 0.15);
    border: 1px solid rgba(239, 68, 68, 0.4);
    color: #F87171;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 700;
    width: fit-content;
  }
  .fc-question-text {
    font-family: 'Hind', sans-serif;
    font-size: 32px;
    font-weight: 700;
    line-height: 1.45;
    color: #FFFFFF;
    margin-top: 20px;
    margin-bottom: 16px;
  }
  .fc-question-sub {
    font-size: 19px;
    color: #94A3B8;
    line-height: 1.4;
    font-weight: 500;
  }
  .fc-flip-btn {
    background: rgba(99, 102, 241, 0.15);
    border: 1.5px dashed #818CF8;
    border-radius: 16px;
    padding: 16px;
    text-align: center;
    color: #C7D2FE;
    font-size: 18px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .fc-bottom-actions {
    display: flex;
    gap: 14px;
  }
  .fc-action-btn {
    flex: 1;
    padding: 16px 10px;
    border-radius: 14px;
    text-align: center;
    font-size: 17px;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .fc-btn-hard {
    background: rgba(239, 68, 68, 0.15);
    border: 1px solid #EF4444;
    color: #FCA5A5;
  }
  .fc-btn-good {
    background: rgba(245, 158, 11, 0.15);
    border: 1px solid #F59E0B;
    color: #FCD34D;
  }
  .fc-btn-easy {
    background: rgba(16, 185, 129, 0.15);
    border: 1px solid #10B981;
    color: #6EE7B7;
  }
</style>
<div class="fc-screen">
  <div class="fc-top-nav">
    <div class="fc-nav-title">⚡ 3D एक्टिव रिकॉल कार्ड</div>
    <div class="fc-badge">कार्ड 14 / 45</div>
  </div>
  <div class="fc-progress-wrap">
    <div class="fc-progress-bar"><div class="fc-progress-fill"></div></div>
    <div class="fc-stats-row">
      <span>महारत: 65%</span>
      <span>याद हैं: 28 | रिवीजन बाकी: 17</span>
    </div>
  </div>
  <div class="fc-category-pill">📚 यूनिट 1: पुस्तकालय संगठन एवं प्रबंधन</div>
  <div class="fc-3d-card">
    <div>
      <div class="fc-card-tag">🔥 बार-बार पूछा गया प्रश्न</div>
      <div class="fc-question-text">
        "प्रत्येक पाठक को उसकी पुस्तक मिले" (Every Reader His/Her Book) पुस्तकालय विज्ञान का कौन सा सूत्र है?
      </div>
      <div class="fc-question-sub">
        यह सूत्र किसके उत्तरदायित्वों एवं कर्तव्यों (पुस्तकालय अध्यक्ष, पाठक, राज्य शासन) पर विशेष बल देता है?
      </div>
    </div>
    <div class="fc-flip-btn">
      <span>🔄</span> टैप करके उत्तर व व्याख्या देखें (Tap to Flip)
    </div>
  </div>
  <div class="fc-bottom-actions">
    <div class="fc-action-btn fc-btn-hard"><span>❌ कठिन</span><span style="font-size: 12px; font-weight: 500;">(फिर दिखाएं)</span></div>
    <div class="fc-action-btn fc-btn-good"><span>⚠️ मध्यम</span><span style="font-size: 12px; font-weight: 500;">(याद आ रहा था)</span></div>
    <div class="fc-action-btn fc-btn-easy"><span>✅ याद है!</span><span style="font-size: 12px; font-weight: 500;">(मास्टर हो गया)</span></div>
  </div>
</div>`;

const shot4Html = createScreenshotHtml({
  bgGradient: "linear-gradient(180deg, #312E81 0%, #1E1B4B 38%, #090E17 100%)",
  badgeText: "⚡ 450+ 3D इंटरेक्टिव फ्लैशकार्ड्स",
  badgeColor: "#6366F1",
  mainTitle: "स्मार्ट 3D कार्ड्स से त्वरित रिवीजन",
  subTitle: "Tap to Flip • याद रखने की वैज्ञानिक विधि • विषय-वार कार्ड्स",
  highlightPill: "★ Active Recall & Spaced Repetition ★",
  customInnerHtml: flashcardMockupHtml,
});
fs.writeFileSync(path.join(SCRATCH_DIR, "scratch", "shot4.html"), shot4Html);

// Screenshot 5: Study Notes & One-Liners
const onelinerMockupHtml = `
<style>
  .oneliner-screen {
    width: 100%;
    height: 100%;
    background: #090E17;
    color: #F8FAFC;
    display: flex;
    flex-direction: column;
    padding: 26px 26px 12px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }
  .oneliner-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }
  .oneliner-header-title {
    font-size: 26px;
    font-weight: 800;
    color: #FFFFFF;
  }
  .oneliner-count-badge {
    background: rgba(236, 72, 153, 0.15);
    border: 1px solid #EC4899;
    color: #F472B6;
    font-size: 16px;
    font-weight: 700;
    padding: 5px 14px;
    border-radius: 999px;
  }
  .oneliner-search-box {
    background: #151E2E;
    border: 1.5px solid #283548;
    border-radius: 14px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: #94A3B8;
    font-size: 18px;
    margin-bottom: 16px;
  }
  .oneliner-search-text {
    color: #F1F5F9;
    font-weight: 600;
  }
  .oneliner-chips-scroll {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    overflow-x: hidden;
  }
  .oneliner-chip {
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 700;
    white-space: nowrap;
  }
  .oneliner-chip-active {
    background: linear-gradient(135deg, #EC4899 0%, #BE185D 100%);
    color: #FFFFFF;
    box-shadow: 0 4px 14px rgba(236, 72, 153, 0.35);
  }
  .oneliner-chip-inactive {
    background: #151E2E;
    color: #94A3B8;
    border: 1px solid #283548;
  }
  .oneliner-card {
    background: #131D2D;
    border: 1px solid #243447;
    border-radius: 18px;
    padding: 20px 22px;
    margin-bottom: 16px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    position: relative;
  }
  .oneliner-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .oneliner-tag {
    font-size: 13px;
    font-weight: 800;
    padding: 4px 12px;
    border-radius: 6px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .oneliner-tag-blue { background: rgba(59, 130, 246, 0.2); color: #60A5FA; border: 1px solid rgba(59, 130, 246, 0.4); }
  .oneliner-tag-emerald { background: rgba(16, 185, 129, 0.2); color: #34D399; border: 1px solid rgba(16, 185, 129, 0.4); }
  .oneliner-tag-amber { background: rgba(245, 158, 11, 0.2); color: #FBBF24; border: 1px solid rgba(245, 158, 11, 0.4); }
  .oneliner-bookmark { font-size: 20px; color: #F59E0B; }
  .oneliner-card-title {
    font-family: 'Hind', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 6px;
  }
  .oneliner-card-desc {
    font-family: 'Hind', sans-serif;
    font-size: 17px;
    line-height: 1.45;
    color: #CBD5E1;
  }
  .oneliner-highlight {
    color: #FCD34D;
    font-weight: 700;
  }
</style>
<div class="oneliner-screen">
  <div class="oneliner-header">
    <div class="oneliner-header-title">📖 परीक्षा वन-लाइनर नोट्स</div>
    <div class="oneliner-count-badge">725+ महत्वपूर्ण तथ्य</div>
  </div>
  <div class="oneliner-search-box">
    <span>🔍</span>
    <span class="oneliner-search-text">रंगनाथन | DDC | CC | अधिनियम...</span>
  </div>
  <div class="oneliner-chips-scroll">
    <div class="oneliner-chip oneliner-chip-active">★ सभी (725)</div>
    <div class="oneliner-chip oneliner-chip-inactive">पंच सूत्र</div>
    <div class="oneliner-chip oneliner-chip-inactive">वर्गीकरण</div>
    <div class="oneliner-chip oneliner-chip-inactive">अधिनियम व वर्ष</div>
  </div>
  <div class="oneliner-card">
    <div class="oneliner-card-top">
      <span class="oneliner-tag oneliner-tag-blue">📌 पंच सूत्र • 1928 / 1931</span>
      <span class="oneliner-bookmark">★</span>
    </div>
    <div class="oneliner-card-title">पुस्तकालय विज्ञान के 5 सूत्र (Five Laws of LIS)</div>
    <div class="oneliner-card-desc">
      डॉ. एस. आर. रंगनाथन द्वारा <span class="oneliner-highlight">1928 में प्रतिपादित</span> किए गए एवं <span class="oneliner-highlight">1931 में पुस्तक</span> के रूप में प्रकाशित हुए। प्रस्तावना पी. एस. शिवस्वामी अय्यर द्वारा लिखी गई।
    </div>
  </div>
  <div class="oneliner-card">
    <div class="oneliner-card-top">
      <span class="oneliner-tag oneliner-tag-emerald">📌 वर्गीकरण पद्धति • 1933</span>
      <span class="oneliner-bookmark">★</span>
    </div>
    <div class="oneliner-card-title">द्विबिंदु वर्गीकरण (Colon Classification - CC)</div>
    <div class="oneliner-card-desc">
      विश्व की प्रथम पूर्णतया पक्षात्मक (<span class="oneliner-highlight">Freely Faceted</span>) वर्गीकरण पद्धति। डॉ. रंगनाथन द्वारा रचित, इसका 6ठा संशोधित संस्करण <span class="oneliner-highlight">1963</span> में प्रकाशित हुआ।
    </div>
  </div>
  <div class="oneliner-card">
    <div class="oneliner-card-top">
      <span class="oneliner-tag oneliner-tag-amber">📌 भारतीय संसद अधिनियम • 1954</span>
      <span class="oneliner-bookmark">★</span>
    </div>
    <div class="oneliner-card-title">डिलीवरी ऑफ बुक्स (पब्लिक लाइब्रेरीज) एक्ट 1954</div>
    <div class="oneliner-card-desc">
      भारत के <span class="oneliner-highlight">4 राष्ट्रीय धरोहर पुस्तकालयों</span> (Depository Libraries) को प्रत्येक पुस्तक की 1 प्रति 30 दिनों में भेजना अनिवार्य है। 1956 में समाचार पत्र शामिल किए गए।
    </div>
  </div>
</div>`;

const shot5Html = createScreenshotHtml({
  bgGradient: "linear-gradient(180deg, #831843 0%, #500724 38%, #090E17 100%)",
  badgeText: "📖 725+ महत्वपूर्ण वन-लाइनर नोट्स",
  badgeColor: "#EC4899",
  mainTitle: "परीक्षा-केंद्रित शॉर्ट नोट्स व फैक्ट्स",
  subTitle: "महत्वपूर्ण परिभाषाएं, वर्ष, समितियां व LIS कोड्स एक जगह",
  highlightPill: "★ 100% परीक्षा में बार-बार पूछे जाने वाले तथ्य ★",
  customInnerHtml: onelinerMockupHtml,
});
fs.writeFileSync(path.join(SCRATCH_DIR, "scratch", "shot5.html"), shot5Html);

// 3. Feature Graphic 1024x500
const featureHtml = `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Hind:wght@500;600;700;800&family=Poppins:wght@600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1024px;
      height: 500px;
      overflow: hidden;
      background: radial-gradient(circle at 75% 50%, #1E3A8A 0%, #0B192C 70%, #030712 100%);
      font-family: 'Poppins', 'Hind', sans-serif;
      position: relative;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 60px;
    }
    .left-content {
      max-width: 580px;
      z-index: 10;
    }
    .brand-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
    }
    .brand-icon {
      width: 72px;
      height: 72px;
      border-radius: 18px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      border: 1.5px solid rgba(255,255,255,0.25);
    }
    .brand-name {
      font-size: 22px;
      font-weight: 700;
      color: #93C5FD;
      letter-spacing: 0.5px;
    }
    .badge-tag {
      background: rgba(59, 130, 246, 0.25);
      border: 1px solid #3B82F6;
      color: #60A5FA;
      font-size: 13px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 6px;
    }
    .main-heading {
      font-family: 'Hind', sans-serif;
      font-size: 46px;
      font-weight: 800;
      line-height: 1.15;
      color: #FFFFFF;
      text-shadow: 0 4px 16px rgba(0,0,0,0.6);
      margin-bottom: 10px;
    }
    .sub-heading {
      font-family: 'Hind', sans-serif;
      font-size: 24px;
      font-weight: 600;
      color: #CBD5E1;
      margin-bottom: 24px;
    }
    .pill-group {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .feature-pill {
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.2);
      backdrop-filter: blur(10px);
      padding: 8px 18px;
      border-radius: 30px;
      font-size: 14px;
      font-weight: 600;
      color: #F1F5F9;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .gold-pill {
      background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
      color: #0F172A;
      border: none;
      font-weight: 800;
    }

    /* Right Dual-Phone Showcase */
    .right-showcase {
      position: relative;
      width: 390px;
      height: 480px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 5;
    }
    .phone {
      position: absolute;
      width: 205px;
      height: 420px;
      background: #0f172a;
      border-radius: 36px;
      border: 5px solid #334155;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 
        0 25px 50px rgba(0,0,0,0.85),
        0 8px 20px rgba(0,0,0,0.6),
        inset 0 0 0 1.5px rgba(255,255,255,0.15);
    }
    .phone-notch {
      width: 100%;
      height: 18px;
      background: #020617;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 10;
    }
    .phone-camera {
      width: 7px;
      height: 7px;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 50%;
    }
    .phone-screen {
      flex: 1;
      width: 100%;
      overflow: hidden;
      background: #000;
      position: relative;
    }
    .phone-screen img {
      width: 100%;
      height: 100%;
      object-fit: fill;
      display: block;
    }
    .phone-back {
      left: 12px;
      top: 35px;
      transform: rotate(-7deg) scale(0.93);
      z-index: 2;
      opacity: 0.9;
      filter: brightness(0.92);
      border-color: #1e293b;
    }
    .phone-front {
      right: 12px;
      top: 15px;
      width: 224px;
      height: 425px;
      transform: rotate(2.5deg) scale(1);
      z-index: 4;
      border-color: #475569;
      box-shadow: 
        0 30px 65px rgba(0,0,0,0.95),
        0 0 35px rgba(59, 130, 246, 0.45),
        inset 0 0 0 1.5px rgba(255,255,255,0.25);
    }
    .floating-badge {
      position: absolute;
      bottom: 12px;
      left: 35px;
      z-index: 15;
      background: rgba(15, 23, 42, 0.9);
      border: 1.5px solid rgba(245, 158, 11, 0.7);
      backdrop-filter: blur(12px);
      padding: 6px 14px;
      border-radius: 20px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 700;
      color: #FBBF24;
      transform: rotate(-3deg);
    }
    .floating-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 8px #10B981;
    }
  </style>
</head>
<body>
  <div class="left-content">
    <div class="brand-row">
      <img class="brand-icon" src="file:///${ICON_SRC}" />
      <div>
        <div class="brand-name">Bihar Librarian Ninja</div>
        <span class="badge-tag">BSEB LET & BPSC 2026</span>
      </div>
    </div>
    <h1 class="main-heading">बिहार पुस्तकालयध्यक्ष 2026</h1>
    <p class="sub-heading">विद्यालय लाइब्रेरियन पद हेतु सम्पूर्ण CBT तैयारी</p>
    <div class="pill-group">
      <div class="feature-pill gold-pill">★ 100% FREE & OFFLINE</div>
      <div class="feature-pill">📚 70+ CBT टेस्ट</div>
      <div class="feature-pill">🎯 10,000+ MCQs</div>
      <div class="feature-pill">📖 LIS शब्दावली</div>
    </div>
  </div>

  <div class="right-showcase">
    <!-- Back Phone: Quiz / Solution Screen -->
    <div class="phone phone-back">
      <div class="phone-notch">
        <div class="phone-camera"></div>
      </div>
      <div class="phone-screen">
        <img src="file:///${SCREEN2_SRC}" />
      </div>
    </div>

    <!-- Front Phone: Home Dashboard Screen -->
    <div class="phone phone-front">
      <div class="phone-notch">
        <div class="phone-camera"></div>
      </div>
      <div class="phone-screen">
        <img src="file:///${SCREEN1_SRC}" />
      </div>
    </div>

    <!-- Floating Badge -->
    <div class="floating-badge">
      <div class="floating-dot"></div>
      <span>CBT मॉक टेस्ट व व्याख्या</span>
    </div>
  </div>
</body>
</html>`;
fs.writeFileSync(path.join(SCRATCH_DIR, "scratch", "feature.html"), featureHtml);

console.log("All HTML templates generated successfully!");

const renders = [
  {
    name: "Screenshot 1 (Hero)",
    html: path.join(SCRATCH_DIR, "scratch", "shot1.html"),
    output: path.join(PLAYSTORE_DIR, "screenshot_1_hero.png"),
    width: 1080,
    height: 1920
  },
  {
    name: "Screenshot 2 (Quiz)",
    html: path.join(SCRATCH_DIR, "scratch", "shot2.html"),
    output: path.join(PLAYSTORE_DIR, "screenshot_2_quiz_mistakes.png"),
    width: 1080,
    height: 1920
  },
  {
    name: "Screenshot 3 (Glossary)",
    html: path.join(SCRATCH_DIR, "scratch", "shot3.html"),
    output: path.join(PLAYSTORE_DIR, "screenshot_3_glossary_search.png"),
    width: 1080,
    height: 1920
  },
  {
    name: "Screenshot 4 (Flashcards)",
    html: path.join(SCRATCH_DIR, "scratch", "shot4.html"),
    output: path.join(PLAYSTORE_DIR, "screenshot_4_flashcards.png"),
    width: 1080,
    height: 1920
  },
  {
    name: "Screenshot 5 (Study Notes)",
    html: path.join(SCRATCH_DIR, "scratch", "shot5.html"),
    output: path.join(PLAYSTORE_DIR, "screenshot_5_study_notes.png"),
    width: 1080,
    height: 1920
  },
  {
    name: "Feature Graphic (Play Store)",
    html: path.join(SCRATCH_DIR, "scratch", "feature.html"),
    output: path.join(PLAYSTORE_DIR, "feature_graphic_1024x500.png"),
    width: 1024,
    height: 500
  },
  {
    name: "Feature Graphic (Root assets)",
    html: path.join(SCRATCH_DIR, "scratch", "feature.html"),
    output: path.join(ASSETS_DIR, "feature-graphic.png"),
    width: 1024,
    height: 500
  },
  {
    name: "App Icon 1024 (assets/icon.png)",
    html: path.join(SCRATCH_DIR, "scratch", "icon.html"),
    output: path.join(ASSETS_DIR, "icon.png"),
    width: 1024,
    height: 1024
  },
  {
    name: "Android Foreground Icon 1024 (assets/android-icon-foreground.png)",
    html: path.join(SCRATCH_DIR, "scratch", "icon.html"),
    output: path.join(ASSETS_DIR, "android-icon-foreground.png"),
    width: 1024,
    height: 1024
  },
  {
    name: "Play Store Icon 512 (assets/playstore_graphics/app_icon_512.png)",
    html: path.join(SCRATCH_DIR, "scratch", "icon.html"),
    output: path.join(PLAYSTORE_DIR, "app_icon_512.png"),
    width: 512,
    height: 512
  },
  {
    name: "Splash Icon 512 (assets/splash-icon.png)",
    html: path.join(SCRATCH_DIR, "scratch", "icon.html"),
    output: path.join(ASSETS_DIR, "splash-icon.png"),
    width: 512,
    height: 512
  }
];

// If argument passed, filter renders
const targetArg = process.argv[2];
const itemsToRender = targetArg 
  ? renders.filter(r => r.name.toLowerCase().includes(targetArg.toLowerCase()))
  : renders;

for (const item of itemsToRender) {
  console.log(`Rendering ${item.name} -> ${item.output}...`);
  const fileUrl = 'file:///' + item.html.replace(/\\/g, '/');
  const cmd = `"${EDGE_PATH}" --headless=new --hide-scrollbars --screenshot="${item.output}" --window-size=${item.width},${item.height} "${fileUrl}"`;
  execSync(cmd, { stdio: 'inherit' });
}

console.log("\n All requested assets rendered and updated successfully!");
