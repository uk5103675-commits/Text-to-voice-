import { VoicePreset } from '../types';

export const voicePresets: VoicePreset[] = [
  // ==========================================
  // 1. Urdu (Pakistan) Voices
  // ==========================================
  {
    id: 'urdu-doc-male',
    name: 'Wajid (Urdu Documentary)',
    gender: 'Male',
    style: 'Documentary / Deep Narration',
    language: 'Urdu (Pakistan)',
    accent: 'Standard Pakistani Urdu Accent',
    prebuiltVoiceName: 'Charon',
    description: 'A deep, commanding male voice, ideal for serious documentaries, announcements, and traditional readings.',
    previewText: 'السلام علیکم۔ میں واجد ہوں۔ میری گہری اور بااثر آواز کے ساتھ اپنی تحاریر کو زندہ کریں۔',
    isPopular: true
  },
  {
    id: 'urdu-story-male',
    name: 'Sarmad (Urdu Storytelling)',
    gender: 'Male',
    style: 'Storytelling / Narration',
    language: 'Urdu (Pakistan)',
    accent: 'Expressive Pakistani Urdu Accent',
    prebuiltVoiceName: 'Fenrir',
    description: 'Engaging, storytelling medium-pitched voice, perfect for audiobooks, fairytales, and dramatic narratives.',
    previewText: 'کسی زمانے کا ذکر ہے، ایک خوبصورت اور پرسکون جزیرے پر ایک کہانی کار رہا کرتا تھا۔',
  },
  {
    id: 'urdu-islamic-male',
    name: 'Qari Bilal (Urdu Islamic)',
    gender: 'Male',
    style: 'Islamic / Respectful Narration',
    language: 'Urdu (Pakistan)',
    accent: 'Respectful Pakistani Islamic Accent',
    prebuiltVoiceName: 'Charon',
    description: 'High reverence, melodic and serene traditional Urdu style, outstanding for spiritual lessons and poetry.',
    previewText: 'بیشک ایمان والوں کے دل اللہ تعالٰی کے ذکر سے ہی سکون پاتے ہیں۔',
    isPopular: true
  },
  {
    id: 'urdu-soft-female',
    name: 'Zara (Urdu Soft)',
    gender: 'Female',
    style: 'Storytelling / Warm Soft',
    language: 'Urdu (Pakistan)',
    accent: 'Gentle Pakistani Accent',
    prebuiltVoiceName: 'Zephyr',
    description: 'Gentle, soothing, and soft female voice. Exceptional for fairytales, bedtime stories, and meditations.',
    previewText: 'خوش آمدید۔ میں زارا ہوں۔ میری نرم اور پرسکون آواز آپ کے سفر کو بہت خوبصورت بنائے گی۔',
    isPopular: true
  },
  {
    id: 'urdu-news-female',
    name: 'Hina (Urdu News Reader)',
    gender: 'Female',
    style: 'News Reader / Professional',
    language: 'Urdu (Pakistan)',
    accent: 'Formal Pakistani Accent',
    prebuiltVoiceName: 'Kore',
    description: 'Clear, articulate, high-confidence voice, suitable for news broadcasts and educational content.',
    previewText: 'آج کی تازہ ترین خبروں کے ساتھ میں ہوں حنا۔ جسٹ ٹو وائس اسٹوڈیو میں خوش آمدید۔',
  },
  {
    id: 'urdu-podcast-young',
    name: 'Zamir (Urdu Young Podcast)',
    gender: 'Male',
    style: 'Young / Podcast / Conversational',
    language: 'Urdu (Pakistan)',
    accent: 'Urban Pakistani Accent',
    prebuiltVoiceName: 'Puck',
    description: 'Lively, friendly, and highly conversational young speaker, excellent for modern podcasts, ads, and young audiences.',
    previewText: 'ہیلو دوستو! کیسے ہو آپ سب؟ آج کے اس بالکل نئے پوڈکاسٹ ایپیسوڈ میں خوش آمدید۔',
  },
  {
    id: 'urdu-elder-male',
    name: 'Abba Jaan (Urdu Elder)',
    gender: 'Male',
    style: 'Elder / Wise Storytelling',
    language: 'Urdu (Pakistan)',
    accent: 'Traditional Elder Accent',
    prebuiltVoiceName: 'Charon',
    description: 'Warm, matured, slow-paced elder voice. Reminiscent of a grandfather sharing lifetime wisdom and heritage tales.',
    previewText: 'میرے بچے! ہمیشہ سچ کا ساتھ دینا، کیونکہ سچائی ہی انسان کو سچی کامیابی دیتی ہے۔',
  },
  {
    id: 'urdu-motivation-male',
    name: 'Arslan (Urdu Motivational)',
    gender: 'Male',
    style: 'Motivational / Energetic',
    language: 'Urdu (Pakistan)',
    accent: 'Powerful Modern Accent',
    prebuiltVoiceName: 'Fenrir',
    description: 'High-energy, assertive voice crafted to inspire action, ideal for keynote speech audio and corporate motivation.',
    previewText: 'کامیابی محنت مانگتی ہے، خواب دیکھنا بند کریں اور آج ہی سے اپنے عمل کا آغاز کیجئے!',
  },

  // ==========================================
  // 2. English (US) Voices
  // ==========================================
  {
    id: 'english-us-motivation-male',
    name: 'Marcus (US Motivational)',
    gender: 'Male',
    style: 'Motivational / Deep',
    language: 'English (US)',
    accent: 'Deep American Accent',
    prebuiltVoiceName: 'Charon',
    description: 'Ultra-realistic deep male audio model with dramatic bass, ideal for high-impact advertisements and motivation.',
    previewText: "Success isn't given, it's earned. Rise up today and claim what is yours.",
    isPopular: true
  },
  {
    id: 'english-us-news-female',
    name: 'Grace (US News Reader)',
    gender: 'Female',
    style: 'News Reader / Professional',
    language: 'English (US)',
    accent: 'American Executive Accent',
    prebuiltVoiceName: 'Kore',
    description: 'Clear, sharp, corporate professional female voice designed for technology pitches, presentations, and tutorials.',
    previewText: 'Welcome to this digital interface demonstration. Real-time language synthesis starts now.',
    isPopular: true
  },
  {
    id: 'english-us-soft-female',
    name: 'Elena (US Soft Female)',
    gender: 'Female',
    style: 'Storytelling / Soft Female',
    language: 'English (US)',
    accent: 'Warm American Accent',
    prebuiltVoiceName: 'Zephyr',
    description: 'Subtle, friendly, soothing tone with soft respirations for narrative and storytelling content.',
    previewText: 'Close your eyes. Imagine a gentle breeze moving slowly over the mountain peaks.',
  },
  {
    id: 'english-us-young-podcast',
    name: 'Liam (US Podcast)',
    gender: 'Male',
    style: 'Young / Podcast / Conversational',
    language: 'English (US)',
    accent: 'Standard American Accent',
    prebuiltVoiceName: 'Puck',
    description: 'Lively, friendly, and modern colloquial male voice. Perfect for tech discussions, vlogs, and YouTube videos.',
    previewText: "Hey guys! What's going on? Today we are going to dive deep into AI technology.",
  },
  {
    id: 'english-us-elder-male',
    name: 'George (US Elder)',
    gender: 'Male',
    style: 'Elder / Documentary',
    language: 'English (US)',
    accent: 'Mellow American Accent',
    prebuiltVoiceName: 'Charon',
    description: 'Distinguished elder male voice, providing an aura of experienced trust, ideal for history lessons and audiobooks.',
    previewText: 'In the cold winter of nineteen forty-five, the world witnessed a paradigm shift like never before.',
  },

  // ==========================================
  // 3. English (UK) Voices
  // ==========================================
  {
    id: 'english-uk-doc-male',
    name: 'Tom (UK Documentary)',
    gender: 'Male',
    style: 'Documentary / Narrator',
    language: 'English (UK)',
    accent: 'British Narrator Accent',
    prebuiltVoiceName: 'Fenrir',
    description: 'Refined, sophisticated British RP accent. Excellent for complex educational courses and documentary narrations.',
    previewText: 'In deep space, countless celestial bodies swirl in an infinite ballet of physics.',
    isPopular: true
  },
  {
    id: 'english-uk-soft-female',
    name: 'Emma (UK Storytelling)',
    gender: 'Female',
    style: 'Storytelling / Soft Female',
    language: 'English (UK)',
    accent: 'Classic British Accent',
    prebuiltVoiceName: 'Zephyr',
    description: 'Sweet, reassuring British lady voice, perfect for audiobooks, classic literature reading, and children stories.',
    previewText: 'The carriage rolled steadily onto the estate, where old oak trees stood guard.',
  },
  {
    id: 'english-uk-news-female',
    name: 'Victoria (UK News Reader)',
    gender: 'Female',
    style: 'News Reader / Professional',
    language: 'English (UK)',
    accent: 'RP British Accent',
    prebuiltVoiceName: 'Kore',
    description: 'Formal, highly analytical and articulate female British broadcaster, ideal for economic and corporate bulletins.',
    previewText: 'Turning now to global financial trends, markets have responded positively to today’s announcement.',
  },
  {
    id: 'english-uk-elder-male',
    name: 'Arthur (UK Elder)',
    gender: 'Male',
    style: 'Elder / Wise Storytelling',
    language: 'English (UK)',
    accent: 'Classical British Accent',
    prebuiltVoiceName: 'Charon',
    description: 'A slow, warm, deeply textured elder British gentlemanly narrative, perfect for period audiobooks and wise speech.',
    previewText: 'Ah, those old memories are like silent pearls lying deep inside the ocean of time.',
  },

  // ==========================================
  // 4. Hindi (India) Voices
  // ==========================================
  {
    id: 'hindi-doc-male',
    name: 'Dev (Hindi Documentary)',
    gender: 'Male',
    style: 'Documentary / Deep Narration',
    language: 'Hindi (India)',
    accent: 'Standard Indian Hindi Accent',
    prebuiltVoiceName: 'Charon',
    description: 'Heavy, rich, authoritative Hindi male voice, excellent for documentary narration, commercials, and serious guides.',
    previewText: 'नमस्कार। मैं देव हूँ। मेरी गंभीर और प्रभावशाली आवाज़ में भारतीय इतिहास को करीब से सुनें।',
    isPopular: true
  },
  {
    id: 'hindi-soft-female',
    name: 'Ananya (Hindi Soft)',
    gender: 'Female',
    style: 'Storytelling / Soft Female',
    language: 'Hindi (India)',
    accent: 'Sweet Indian Accent',
    prebuiltVoiceName: 'Zephyr',
    description: 'Warm, soft, and extremely polite Hindi female voice, best suited for audiobooks, wellness, and self-care apps.',
    previewText: 'नमस्ते! मैं अनन्या हूँ। अपनी मनपसंद कविताओं और मधुर कहानियों को मेरी आवाज़ दे सकते हैं।',
  },
  {
    id: 'hindi-young-podcast',
    name: 'Kabir (Hindi Podcast)',
    gender: 'Male',
    style: 'Young / Podcast / Conversational',
    language: 'Hindi (India)',
    accent: 'Friendly Indian Accent',
    prebuiltVoiceName: 'Puck',
    description: 'Lively, friendly, and trendy conversational speaker, excellent for podcasts, YouTube, ads, and young audiences.',
    previewText: 'हे दोस्तों! कैसे हैं आप सब? आज के इस स्पेशल पॉडकास्ट एपिसोड में आप सभी का स्वागत है।',
    isPopular: true
  },
  {
    id: 'hindi-news-female',
    name: 'Pooja (Hindi News Reader)',
    gender: 'Female',
    style: 'News Reader / Professional',
    language: 'Hindi (India)',
    accent: 'Broadcasting Hindi Accent',
    prebuiltVoiceName: 'Kore',
    description: 'Flawless pronunciation, confident pace, perfect for bulletins, tutorial recordings, and e-learning courses.',
    previewText: 'मुख्य समाचारों के साथ मैं हूँ पूजा। आज देश और दुनिया की मुख्य हलचल पर एक नज़र डालते हैं।',
  },
  {
    id: 'hindi-elder-female',
    name: 'Sharda Ji (Hindi Elder)',
    gender: 'Female',
    style: 'Elder / Wise Storytelling',
    language: 'Hindi (India)',
    accent: 'Traditional Elder Accent',
    prebuiltVoiceName: 'Kore',
    description: 'Respectable, deeply matured female storytelling tone, exceptional for folktales, mythology, and ethical lessons.',
    previewText: 'बेटा, सदा याद रखना कि धर्म और सत्य की राह मुश्किल ज़रूर होती है, पर जीत उसी की होती है।',
  },
  {
    id: 'hindi-motivation-male',
    name: 'Karan (Hindi Motivational)',
    gender: 'Male',
    style: 'Motivational / Energetic',
    language: 'Hindi (India)',
    accent: 'Inspiring Indian Accent',
    prebuiltVoiceName: 'Fenrir',
    description: 'Expressive and highly commanding pitch. Best for high pressure workouts, self-help, and inspirational reels.',
    previewText: 'सफलता का कोई जादुई ताला नहीं होता, ये तो केवल कठिन परिश्रम की चाबी से ही खुलता है!',
  },

  // ==========================================
  // 5. Hindko (Pakistan) Voices
  // ==========================================
  {
    id: 'hindko-story-male',
    name: 'Sajid (Hindko Story)',
    gender: 'Male',
    style: 'Storytelling / Narration',
    language: 'Hindko (Pakistan)',
    accent: 'Hazara / Peshawar Dialect',
    prebuiltVoiceName: 'Charon',
    description: 'Warm, classic Hindko speaking male model, carrying authentic Hazara region intonations and storytelling warmth.',
    previewText: 'جی آیاں نوں۔ میں ساجد آں۔ مینڈھی ہندکو آواز نال اپنیاں گلاں سنگھارو تے انجوائے کرو۔',
    isPopular: true
  },
  {
    id: 'hindko-young-podcast',
    name: 'Zubair (Hindko Podcast)',
    gender: 'Male',
    style: 'Young / Podcast / Conversational',
    language: 'Hindko (Pakistan)',
    accent: 'Hazara Young Accent',
    prebuiltVoiceName: 'Puck',
    description: 'Engaging, cheerful Hindko young male voice, perfect for local podcast channels and informational clips.',
    previewText: 'سلام بیلیو! کیا حال اے؟ ہندکو دے اس خالص پوڈکاسٹ وچ تواڈا اپنا پرا زبیر خوش آمدید کیندا اے۔',
  },
  {
    id: 'hindko-elder-female',
    name: 'Dadi Kaneez (Hindko Elder)',
    gender: 'Female',
    style: 'Elder / Wise Storytelling',
    language: 'Hindko (Pakistan)',
    accent: 'Hazara Classic Accent',
    prebuiltVoiceName: 'Zephyr',
    description: 'Deeply comforting elder grandmother voice, perfect for local folk tales, proverbs, and traditional history.',
    previewText: 'پتر! مینڈھی گل سنو، وڈیاں دی عزت کرنا ای ساڈی اصل پونجی اے، رب راضی رہندا اے۔',
  },

  // ==========================================
  // 6. Pashto (Pakistan) Voices
  // ==========================================
  {
    id: 'pashto-motivation-male',
    name: 'Zaryab (Pashto PK)',
    gender: 'Male',
    style: 'Motivational / Powerful',
    language: 'Pashto (Pakistan)',
    accent: 'PK Pashtun Accent',
    prebuiltVoiceName: 'Charon',
    description: 'Strong, powerful male Pashto speech generator, outstanding for poetry, action stories, and bold presentations.',
    previewText: 'سلامونه۔ زما نوم زریاب دی، زه تاسو ته په پښتو ژبه کې ډک او په زړه پورې غږ وړاندې کوم۔',
    isPopular: true
  },
  {
    id: 'pashto-female-story',
    name: 'Palwasha (Pashto Dev)',
    gender: 'Female',
    style: 'Storytelling / Soft Female',
    language: 'Pashto (Pakistan)',
    accent: 'PK Khyber Dialect',
    prebuiltVoiceName: 'Zephyr',
    description: 'Graceful female Pashto speaking voice, ideal for cultural narratives, children stories, meditations, and poetry.',
    previewText: 'ستاسو هرکلي کوم۔ زما په نرم غبرګون سره د پښتو غږ کلام ریښتیني احساس کړئ۔',
  },
  {
    id: 'pashto-young-pk',
    name: 'Sarang (Pashto Podcast)',
    gender: 'Male',
    style: 'Young / Podcast / Conversational',
    language: 'Pashto (Pakistan)',
    accent: 'PK Urban Pashto',
    prebuiltVoiceName: 'Puck',
    description: 'Bright and highly conversational Pashto voice, great for tech reviews, gaming streams, and young audience reach.',
    previewText: 'څنګہ یئ ملګرو؟ پښتو تفریحي او معلوماتي پوډکاسٹونو ته راشئ چې نوې خبرې وکړو۔',
  },

  // ==========================================
  // 7. Pashto (Afghanistan) Voices
  // ==========================================
  {
    id: 'pashto-afg-male-deep',
    name: 'Ahmad (Afg Pashto Deep)',
    gender: 'Male',
    style: 'Documentary / Deep Narration',
    language: 'Pashto (Afghanistan)',
    accent: 'Kandahar / Kabul Standard Dialect',
    prebuiltVoiceName: 'Charon',
    description: 'Resonant, formal, and authoritative Afghan Pashto male voice, perfect for news, political commentary, and history.',
    previewText: 'قدرمنو هیوادوالو السلام علیکم۔ دلته کابل دی، زموږ د افغاني غږونو مرکز ته ښه راغلاست۔',
    isPopular: true
  },
  {
    id: 'pashto-afg-female',
    name: 'Mina (Afg Pashto Soft)',
    gender: 'Female',
    style: 'Storytelling / Soft Female',
    language: 'Pashto (Afghanistan)',
    accent: 'Soft Kabul Dialect',
    prebuiltVoiceName: 'Zephyr',
    description: 'Serene, sweet female voice carrying the beautiful authentic Afghan accent, amazing for literary arts and tutorials.',
    previewText: 'ښه راغلاست ملګرو۔ د افغانستان مینه والو ته په خوږه پښتو ژبه مینه ناک سلامونه وړاندې کوم۔',
  },
  {
    id: 'pashto-afg-young',
    name: 'Waseem (Afg Young)',
    gender: 'Male',
    style: 'Young / Podcast / Conversational',
    language: 'Pashto (Afghanistan)',
    accent: 'Lively Afghan Dialect',
    prebuiltVoiceName: 'Puck',
    description: 'Enthusiastic and fast speaker, capturing the fresh modern accent of young Afghan creators. Splendid for vlogs.',
    previewText: 'سلامونه او نیکی هیلی وطندارانو! هیله لرم هر چيرې چې یاست روغ او جوړ اوسئ۔',
  },

  // ==========================================
  // 8. Saraiki (Pakistan) Voices
  // ==========================================
  {
    id: 'saraiki-doc-male',
    name: 'Khizer (Saraiki Deep)',
    gender: 'Male',
    style: 'Documentary / Deep Narration',
    language: 'Saraiki (Pakistan)',
    accent: 'PK Multan Dialect',
    prebuiltVoiceName: 'Charon',
    description: 'Deeply expressive, rich, and culturally absolute Saraiki voice, marvelous for local poetry, scripts, and media.',
    previewText: 'السلام علیکم، میں خضر آں۔ سرائیکی وسیب دی مٹھی آواز نال اپنیاں گلاں کوں سجاو۔',
    isPopular: true
  },
  {
    id: 'saraiki-soft-female',
    name: 'Sania (Saraiki Soft)',
    gender: 'Female',
    style: 'Storytelling / Soft Female',
    language: 'Saraiki (Pakistan)',
    accent: 'Bahawalpur Dialect',
    prebuiltVoiceName: 'Zephyr',
    description: 'Melodious, slow and heartwarming female Saraiki voice, ideal for localized story-telling, poetry recitation.',
    previewText: 'جی آیاں نوں۔ میں ثانیہ آں۔ سرائیکی زبان دی مٹھاس تساں میڈی آواز وچ محسوس کر سگدے ہو۔',
  },
  {
    id: 'saraiki-elder-wise',
    name: 'Sufi Shakir (Saraiki Elder)',
    gender: 'Male',
    style: 'Elder / Wise Storytelling',
    language: 'Saraiki (Pakistan)',
    accent: 'Rural Sufi Style Dialect',
    prebuiltVoiceName: 'Fenrir',
    description: 'Sufiana style, highly spiritual elder voice, suited for regional folk poetry or historic folklore presentations.',
    previewText: 'میڈے بخت بیدار لال! سچی محبت تے صوفی منش ہوونڑ ای بندے کوں بندہ بنڑیندے۔',
  },

  // ==========================================
  // 9. Punjabi (Pakistan) Voices
  // ==========================================
  {
    id: 'punjabi-podcast-male',
    name: 'Gurpreet (Punjabi PK)',
    gender: 'Male',
    style: 'Young / Podcast / Conversational',
    language: 'Punjabi (Pakistan)',
    accent: 'Standard Punjabi Accent',
    prebuiltVoiceName: 'Fenrir',
    description: 'Rhythmic, highly expressive, and full of cultural character. Phenomenal for podcasts and organic community content.',
    previewText: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ। ਮੇਰਾ ਨਾਮ ਗੁਰਪ੍ਰੀਤ ਹੈ। ਮੇਰੀ ਖੁਸ਼ਮਿਜ਼ਾਜ ਪੰਜਾਬੀ ਆਵਾਜ਼ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ।',
    isPopular: true
  },
  {
    id: 'punjabi-female-soft',
    name: 'Jaspreet (Punjabi Soft)',
    gender: 'Female',
    style: 'Storytelling / Soft Female',
    language: 'Punjabi (Pakistan)',
    accent: 'Sweet Punjabi Accent',
    prebuiltVoiceName: 'Zephyr',
    description: 'Warm, charming and endearing Punjabi female voice, suitable for narration, bedtime stories, and celebrations.',
    previewText: 'ਜੀ ਆਇਆਂ ਨੂੰ ਜੀ। ਮੇਰੀ ਮਿੱਠੀ ਆਵਾਜ਼ ਰਾਹੀਂ ਆਪਣੀਆਂ ਕਵਿਤਾਵਾਂ ਤੇ ਕਹਾਣੀਆਂ ਨੂੰ ਨਵਾਂ ਰੂਪ ਦਿਓ।',
  },
  {
    id: 'punjabi-elder-male',
    name: 'Chaudhary Dara (Punjabi Elder)',
    gender: 'Male',
    style: 'Elder / Wise Storytelling',
    language: 'Punjabi (Pakistan)',
    accent: 'Heavy PK Punjabi Accent',
    prebuiltVoiceName: 'Charon',
    description: 'Heavy authority tone, traditional patriarch style, perfect for rural Punjabi stories, motivational village speeches.',
    previewText: 'ਉਏ ਸ਼ੇਰਾ! ਹਮੇਸ਼ਾ ਮਿਹਨਤ ਕਰਕੇ ਹੱਕ ਹਲਾਲ ਦੀ ਖਾਓ, ਪੰਜਾਬੀ ਕਿਸੇ ਦੇ ਅੱਗੇ ਕਦੇ ਹਾਰ ਨਹੀਂ ਮੰਨਦੇ!',
  },

  // ==========================================
  // 10. Turkish Voices
  // ==========================================
  {
    id: 'turkish-soft-female',
    name: 'Leyla (Turkish Soft)',
    gender: 'Female',
    style: 'Storytelling / Soft Female',
    language: 'Turkish',
    accent: 'Standard Istanbul Accent',
    prebuiltVoiceName: 'Zephyr',
    description: 'Delightful Turkish female voice with natural warm inflections, perfect for narrative audiobooks, and ads.',
    previewText: 'Merhaba! Ben Leyla. Just2Voice ile Türkçe metinlerinizi harika bir seslendirmeye dönüştürün.',
    isPopular: true
  },
  {
    id: 'turkish-doc-male',
    name: 'Cem (Turkish Documentary)',
    gender: 'Male',
    style: 'Documentary / Deep Narration',
    language: 'Turkish',
    accent: 'Deep Turkish Accent',
    prebuiltVoiceName: 'Charon',
    description: 'Slightly deep, highly dramatic and professional Turkish masculine vocal tone, great for historical reviews.',
    previewText: 'Hoş geldiniz. Ben Cem. Derin ve profesyonel sesimle belgesellerinize eşsiz bir soluk getirin.',
  },
  {
    id: 'turkish-young-podcast',
    name: 'Can (Turkish Podcast)',
    gender: 'Male',
    style: 'Young / Podcast / Conversational',
    language: 'Turkish',
    accent: 'Dynamic Istanbul Vocal',
    prebuiltVoiceName: 'Puck',
    description: 'A cheerful, fast-talking smart Turkish speaker, fantastic for daily podcasts and modern interactive voiceovers.',
    previewText: 'Selam millet! Bugün yepyeni bir ses teknolojisini ve harika özellikleri konuşuyoruz.',
  },

  // ==========================================
  // 11. Chinese Voices
  // ==========================================
  {
    id: 'chinese-news-female',
    name: 'Mei (Chinese News)',
    gender: 'Female',
    style: 'News Reader / Professional',
    language: 'Chinese',
    accent: 'Mandarin Accent',
    prebuiltVoiceName: 'Kore',
    description: 'Sleek, fluid Chinese Mandarin female vocal model with crystal clear articulation, perfect for formal broadcasts.',
    previewText: '您好！我是梅。很高兴为您呈现最自然、顺畅的中文智能语音合成与高保真播报。',
    isPopular: true
  },
  {
    id: 'chinese-doc-male',
    name: 'Chen (Chinese Deep)',
    gender: 'Male',
    style: 'Documentary / Deep Narration',
    language: 'Chinese',
    accent: 'Classical Deep Mandarin',
    prebuiltVoiceName: 'Charon',
    description: 'An authoritative, profound Chinese male narrative voice, exceptional for business corporate audio.',
    previewText: '欢迎来到Just2Voice智能平台。用声音传递温度，用科技谱写华章。',
  },
  {
    id: 'chinese-soft-female',
    name: 'Lin (Chinese Story)',
    gender: 'Female',
    style: 'Storytelling / Soft Female',
    language: 'Chinese',
    accent: 'Gentle Mandarin Accent',
    prebuiltVoiceName: 'Zephyr',
    description: 'Very gentle, comforting Chinese female voice, highly fitting for traditional tales and slow guided meditations.',
    previewText: '闭上双眼，感受森林深处的平静与安详。让我们一起开始这段美妙的旅程。',
  },

  // ==========================================
  // 12. Arabic Voices
  // ==========================================
  {
    id: 'arabic-islamic-male',
    name: 'Sheikh Rayan (Arabic Islamic)',
    gender: 'Male',
    style: 'Islamic / Respectful Narration',
    language: 'Arabic',
    accent: 'Standard Islamic Accent',
    prebuiltVoiceName: 'Charon',
    description: 'Deep, classical, reverent Arabic theological speaker. Perfectly trained for spiritual text, Quran recitations, and old scripts.',
    previewText: 'السلام عليكم ورحمة الله. أهلاً بكم في منصة الصوت الذكي حيث تتجلى بلاغة الفصحى.',
    isPopular: true
  },
  {
    id: 'arabic-news-female',
    name: 'Fatima (Arabic News)',
    gender: 'Female',
    style: 'News Reader / Professional',
    language: 'Arabic',
    accent: 'Standard Arabic Broadcaster Accent',
    prebuiltVoiceName: 'Kore',
    description: 'Highly clear, eloquent, professional Arabic female voice, perfect for economic, educational and global news reports.',
    previewText: 'مرحباً، أنا فاطمة. منصة جاست تو فويس تقدم لكم البلاغة العربية بأحدث تقنيات الذكاء الاصطناعي.',
    isPopular: true
  },
  {
    id: 'arabic-young-podcast',
    name: 'Yousuf (Arabic Podcast)',
    gender: 'Male',
    style: 'Young / Podcast / Conversational',
    language: 'Arabic',
    accent: 'Gulf Dialect Modern',
    prebuiltVoiceName: 'Puck',
    description: 'Modern, upbeat young Arabic voice capturing Middle Eastern podcast trends, great for technology reviews.',
    previewText: 'أهلاً بالجميع في حلقتنا اليوم! اليوم راح نكتشف كيف نغير طريقة إنتاج الصوت بالكامل.',
  },

  // ==========================================
  // 13. Persian Voices
  // ==========================================
  {
    id: 'persian-story-male',
    name: 'Reza (Persian Narration)',
    gender: 'Male',
    style: 'Storytelling / Narration',
    language: 'Persian',
    accent: 'Tehran Dialect Accent',
    prebuiltVoiceName: 'Charon',
    description: 'Classical, poetic Persian male voice. Exceptional for literary classics, Ferdowsi Shahnameh reading, and historical storytelling.',
    previewText: 'درود بر شما دوستداران ادب و فرهنگ. من رضا هستم. بیایید متون زیبای فارسی را به گوش طنین‌انداز کنیم.',
    isPopular: true
  },
  {
    id: 'persian-soft-female',
    name: 'Yasmine (Persian Soft)',
    gender: 'Female',
    style: 'Storytelling / Soft Female',
    language: 'Persian',
    accent: 'Gentle Persian',
    prebuiltVoiceName: 'Zephyr',
    description: 'Whispery, sweet, and articulate Persian lady voice, excellent for wellness, poetry recital, and lifestyle vlogs.',
    previewText: 'خوش آمدید. من یاسمین هستم، امیدوارم کلام من آرامش‌بخش دل‌ها و افکار شما باشد.',
  },
  {
    id: 'persian-young-podcast',
    name: 'Amir (Persian Podcast)',
    gender: 'Male',
    style: 'Young / Podcast / Conversational',
    language: 'Persian',
    accent: 'Modern Tehran Young',
    prebuiltVoiceName: 'Puck',
    description: 'Enthusiastic and fast speaker, capturing the fresh modern tone of young Iranian tech-vloggers.',
    previewText: 'سلام بچه‌ها! چطورید؟ امروز می‌خوایم یکی از جذاب‌ترین موتورهای هوش مصنوعی دکلمه صدا رو بررسی کنیم.',
  }
];

export const supportedLanguagesList = [
  'Urdu (Pakistan)',
  'English (US)',
  'English (UK)',
  'Hindi (India)',
  'Hindko (Pakistan)',
  'Pashto (Pakistan)',
  'Pashto (Afghanistan)',
  'Saraiki (Pakistan)',
  'Punjabi (Pakistan)',
  'Turkish',
  'Chinese',
  'Arabic',
  'Persian'
];

export const customEmotions = [
  'Neutral',
  'Happy',
  'Sad',
  'Inspirational',
  'Serious',
  'Documentary',
  'News',
  'Islamic',
  'Storytelling'
];
