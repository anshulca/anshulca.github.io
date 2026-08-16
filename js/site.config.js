/* =========================================================================
   NAAM JAP · SITE CONFIGURATION
   -------------------------------------------------------------------------
   This file is the SINGLE source of truth for branding, navigation, footer
   and editable content (About Me / Platform). Global header, footer, mobile
   nav and footer chrome are rendered from this object by core.js — branding
   is NEVER hard-coded on individual pages.

   To re-brand the whole site, edit ONLY this file.
   ========================================================================= */
(function (global) {
  'use strict';

  var C = {
    /* ------------------------------------------------------------------
       BRAND
       ------------------------------------------------------------------ */
    brand: {
      name: 'Naam Jap',
      shortName: 'NaamJap',
      devanagari: 'नाम जप',
      byline: 'by CA Anshul Karwa',
      creator: {
        name: 'CA Anshul Karwa',
        url: 'https://www.linkedin.com/in/anshulkarwa/'
      },
      tagline: 'Pause. Remember. Repeat.',
      description:
        'A calm, private digital companion for Naam Jap, Naam Lekhan, mantra jap and daily sadhana.',
      // Visual logo mark (inline SVG, mala-bead inspired). Swap via assets/logo.svg when a real logo is ready.
      logo: {
        src: '/assets/logo.svg',
        alt: 'Naam Jap — a circle of mala beads'
      },
      favicon: '/assets/favicon.svg',
      // Canonical base URL — update once a real domain is chosen (used for SEO + sitemap).
      url: 'https://jap.studyfromnotes.com',
      // Palette for programmatic use (progress, charts). CSS tokens in css/tokens.css are the visual source of truth.
      palette: {
        accent: '#b98a3a',
        primary: '#31405f',
        success: '#41785b',
        paper: '#f6f3ec'
      }
    },

    /* ------------------------------------------------------------------
       PRIMARY TYPOGRAPHY (referenced by tokens.css; Google Fonts + fallbacks)
       ------------------------------------------------------------------ */
    type: {
      display: 'Fraunces, Georgia, "Times New Roman", serif',
      body: 'Inter, -apple-system, system-ui, "Segoe UI", sans-serif',
      devanagari: '"Tiro Devanagari Hindi", "Noto Sans Devanagari", "Nirmala UI", sans-serif'
    },

    /* ------------------------------------------------------------------
       NAVIGATION — main nav in header; CTA starts Jap
       ------------------------------------------------------------------ */
    nav: {
      primary: [
        { label: 'Home', url: '/' },
        { label: 'Jap', url: '/jap/', devanagari: 'जप' },
        { label: 'Lekhan', url: '/lekh/', devanagari: 'लेखन' },
        { label: 'Sadhana', url: '/sadhana/', devanagari: 'साधना' },
        { label: 'Mantra', url: '/mantra/', devanagari: 'मंत्र' },
        { label: 'Journey', url: '/journey/' }
      ],
      cta: { label: 'Begin Jap', url: '/jap/' },

      // Full menu (mobile drawer + footer secondary)
      secondary: [
        { label: 'Tools', url: '/tools/' },
        { label: 'About Me', url: '/about/' },
        { label: 'About the Platform', url: '/platform/' }
      ],
      legal: [
        { label: 'Privacy', url: '/privacy/' },
        { label: 'Terms', url: '/terms/' },
        { label: 'Disclaimer', url: '/disclaimer/' }
      ]
    },

    /* ------------------------------------------------------------------
       FOOTER
       ------------------------------------------------------------------ */
    footer: {
      note:
        'A small digital space to pause, remember and return — a private companion for daily jap and sadhana.',
      blurb:
        'Naam Jap keeps your practice close, calm and yours. Your data stays on your device, private by design.',
      cols: [
        {
          heading: 'Practice',
          links: [
            { label: 'Jap', url: '/jap/' },
            { label: 'Lekhan', url: '/lekh/' },
            { label: 'Sadhana', url: '/sadhana/' },
            { label: 'Mantra', url: '/mantra/' },
            { label: 'Journey', url: '/journey/' }
          ]
        },
        {
          heading: 'Tools',
          links: [
            { label: 'Mala Calculator', url: '/tools/' },
            { label: 'Jap Goal Calculator', url: '/tools/' },
            { label: '1 Lakh Challenge', url: '/tools/' },
            { label: '108 Calculator', url: '/tools/' },
            { label: 'Jap Timer', url: '/tools/' }
          ]
        },
        {
          heading: 'About',
          links: [
            { label: 'About Me', url: '/about/' },
            { label: 'About the Platform', url: '/platform/' },
            { label: 'Privacy', url: '/privacy/' },
            { label: 'Terms', url: '/terms/' },
            { label: 'Disclaimer', url: '/disclaimer/' }
          ]
        }
      ],
      copyright: '© 2026 Naam Jap · Made with care, in silence by %CREATOR%'
    },
/* ------------------------------------------------------------------
       SOCIAL / CONTACT  (configure when you have links)
       ------------------------------------------------------------------ */
    social: [
      // { label: 'Instagram', url: 'https://instagram.com/...', icon: 'instagram' },
      // { label: 'YouTube', url: 'https://youtube.com/@...', icon: 'youtube' },
      // { label: 'Email', url: 'mailto:alerts@karwaandassociates.com', icon: 'mail' }
    ],

    /* ------------------------------------------------------------------
       ABOUT ME  (editable personal content — update freely)
       ------------------------------------------------------------------ */
    aboutMe: {
      name: 'CA Anshul Karwa',
      role: 'Chartered Accountant · Maker of Naam Jap',
      location: 'India',
      shortIntro:
        'A quiet devotee who built Naam Jap to keep company with the Name — and to help others stay steady in their own daily practice.',
      photo: '', // e.g. '/assets/img/me.jpg' — empty uses an initial monogram
      story: [
        'Naam Jap began as a simple personal habit — a few malas each morning before the day began.',
        'Over time I saw how much consistency mattered, and how easy it was to lose count, lose track, or lose the thread of a daily sadhana.',
        'This space is the result: a calm, private place where the practice holds its own rhythm, without noise or distraction.'
      ],
      philosophy:
        'Technology is not the opposite of stillness. A well-made tool can hold space for the sacred — quietly, and in the background.',
      message: 'May this little space help you pause, remember and return.'
    },

    /* ------------------------------------------------------------------
       ABOUT THE PLATFORM
       ------------------------------------------------------------------ */
    platform: {
      what: [
        'Naam Jap is a private digital companion for daily spiritual practice.',
        'You can do jap, write lekhan, set a daily sadhana, explore mantras and watch your own quiet progress — all without an account, all kept on your device.'
      ],
      practices: [
        {
          name: 'Naam Jap',
          desc: 'Count malas of 108 calmly, with a digital mala that feels like the real thing.'
        },
        {
          name: 'Naam Lekhan',
          desc: 'Write the naam into a digital notebook — 108 writings per page, page after page.'
        },
        {
          name: 'Sadhana',
          desc: 'Set sankalps and daily targets, build a streak, and return day after day.'
        },
        {
          name: 'Mantra',
          desc: 'Explore a library of mantras with text, transliteration and meaning.'
        },
        {
          name: 'Journey',
          desc: 'A personal dashboard of your total jap, malas, naam written and milestones.'
        }
      ],
      privacy:
        'Your practice data is private by design. It is stored only on your device and is never sent to any server. A future account system will respect the same boundary — migration will never lock you in.'
    },

    /* ------------------------------------------------------------------
       LEGAL  (short intro lines; full text lives in the legal pages)
       ------------------------------------------------------------------ */
    legal: {
      contact: 'For questions: alerts@karwaandassociates.com',
      updated: 'Last updated: 2026'
    },

    /* ------------------------------------------------------------------
       JAP · Naam Jap Counter — default naams (editable here)
       ------------------------------------------------------------------ */
    jap: {
      malaSize: 108,
      naams: [
        { id: 'ram', english: 'Ram', dev: 'राम' },
        { id: 'radha', english: 'Radha', dev: 'राधा' },
        { id: 'shiv', english: 'Shiv', dev: 'शिव' },
        { id: 'krishna', english: 'Shree Krishna', dev: 'श्री कृष्ण' },
        { id: 'om-namah-shivay', english: 'Om Namah Shivay', dev: 'ॐ नमः शिवाय' },
        { id: 'hanuman', english: 'Hanuman', dev: 'हनुमान' },
        { id: 'ganesh', english: 'Ganesh', dev: 'गणेश' },
        { id: 'durga', english: 'Durga', dev: 'दुर्गा' }
      ],
      custom: {
        label: 'Custom Naam',
        placeholder: 'e.g. Shamb Sadashiv',
        hint: 'Enter any naam — it becomes the active naam for this counter.'
      }
    },

    /* ------------------------------------------------------------------
       MANTRA LIBRARY  (editable here — text, transliteration, meaning)
       Each entry maps to a jap naam id where possible (`japId`), so
       "Begin jap" can start the counter with the right naam selected.
       ------------------------------------------------------------------ */
    mantras: [
      {
        id: 'ram', name: 'Shree Ram', dev: 'श्री राम', japId: 'ram',
        category: 'Devotion',
        text: 'रामाय नमः',
        transliteration: 'Ramāya namah',
        meaning: 'Salutations to Ram — the one in whom all beings rest. The name carried by a million tongues, the steady heart of the bhakti tradition.',
        note: 'Often chanted as "Shree Ram, Jai Ram, Jai Jai Ram" — the mahamantra of the Ram tradition.'
      },
      {
        id: 'radha', name: 'Radha', dev: 'राधा', japId: 'radha',
        category: 'Devotion',
        text: 'राधे राधे · राधाकृष्णाय नमः',
        transliteration: 'Rādhe Rādhe · Rādhā-Kṛṣṇāya namah',
        meaning: 'The name of Radha, the embodiment of devotion itself — and salutations to Radha and Krishna together, the two that are one.',
        note: 'Chanted with pure affection ("Radhe Radhe") as a greeting of love between devotees.'
      },
      {
        id: 'krishna', name: 'Shree Krishna', dev: 'श्री कृष्ण', japId: 'krishna',
        category: 'Devotion',
        text: 'कृष्णाय वासुदेवाय हरये परमात्मने',
        transliteration: 'Kṛṣṇāya Vāsudevāya Haraye Paramātmane',
        meaning: 'To Krishna, born of Vasudeva, to Hari, the Supreme Self — one name that holds the flute, the heart, and the remover of fear.',
        note: 'The opening of the Vishnu Sahasranama, calling the Lord by name and family.'
      },
      {
        id: 'om-namah-shivay', name: 'Om Namah Shivay', dev: 'ॐ नमः शिवाय', japId: 'om-namah-shivay',
        category: 'Shiv',
        text: 'ॐ नमः शिवाय',
        transliteration: 'Om Namah Shivāya',
        meaning: 'Salutations to the auspicious one — "Om" the universal sound, "namah" the offering of the self, "Shivaya" to Shiva. The great five-syllable mantra of inner stillness.',
        note: 'The panchakshari (five-syllable) mantra of the Shaiva tradition; the core of a whole lifetime of jap.'
      },
      {
        id: 'shiv', name: 'Shiv', dev: 'शिव', japId: 'shiv',
        category: 'Shiv',
        text: 'शं च मयस्करं च माम् · शिवाय नमः',
        transliteration: 'Śivāya namah',
        meaning: 'Salutations to the auspicious one — the meditative, the still, the remover of what is not real.',
        note: 'A simple daily salutation to the Lord of meditation.'
      },
      {
        id: 'mahamrityunjaya', name: 'Mahamrityunjaya', dev: 'ॐ त्र्यम्बकम्', japId: 'om-namah-shivay',
        category: 'Shiv',
        text: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात् ॥',
        transliteration: 'Om Tryambakaṁ yajāmahe sugandhiṁ puṣṭi-vardhanam | Urvārukamiva bandhanān mṛtyor mukṣīya mā\u2019mṛtāt ||',
        meaning: 'We worship the three-eyed one, fragrant and nourishing. Like the ripened cucumber freed from its vine, may we be released from the bonds of mortality — not away from immortality, but unto it.',
        note: 'The great death-conquering mantra, offered to Shiva as the healer of all fears.'
      },
      {
        id: 'hanuman', name: 'Hanuman', dev: 'हनुमान', japId: 'hanuman',
        category: 'Protection',
        text: 'ॐ हं हनुमते नमः',
        transliteration: 'Om Haṁ Hanumate namah',
        meaning: 'Salutations to Hanuman — the son of the wind, the peerless servant of Ram, the remover of fear and the giver of strength.',
        note: 'A seed-syllable mantra (Haṁ) opening to the complete offering of self to Hanuman.'
      },
      {
        id: 'ganesh', name: 'Ganesh', dev: 'गणेश', japId: 'ganesh',
        category: 'Protection',
        text: 'ॐ गं गणपतये नमः',
        transliteration: 'Om Gaṁ Gaṇapataye namah',
        meaning: 'Salutations to the lord of the ganas — the remover of obstacles, the one who clears the way at the beginning of all beginnings.',
        note: 'Chanted before any new undertaking, its seed syllable opening the path.'
      },
      {
        id: 'durga', name: 'Durga', dev: 'दुर्गा', japId: 'durga',
        category: 'Devi',
        text: 'ॐ दुं दुर्गायै नमः',
        transliteration: 'Om Duṁ Durgāyai namah',
        meaning: 'Salutations to Durga, the protectress — the one who shelters and carries her devotees through all that is difficult.',
        note: 'A seed-syllable mantra (Duṁ) to the goddess of protection and courage.'
      },
      {
        id: 'lakshmi', name: 'Lakshmi', dev: 'महालक्ष्मी', japId: 'custom',
        category: 'Devi',
        text: 'ॐ श्रीं महालक्ष्म्यै नमः',
        transliteration: 'Om Śrīṁ Mahālakṣmyai namah',
        meaning: 'Salutations to Mahalakshmi — the radiant abundance of the divine, giver of grace, beauty and prosperity in all its forms.',
        note: 'Its seed syllable (Śrīṁ) is itself the sound of auspiciousness and wealth.'
      },
      {
        id: 'saraswati', name: 'Saraswati', dev: 'सरस्वती', japId: 'custom',
        category: 'Devi',
        text: 'ॐ ऐं सरस्वत्यै नमः',
        transliteration: 'Om Aiṁ Sarasvatyai namah',
        meaning: 'Salutations to Saraswati — the flow of speech, knowledge and wisdom, the river of learning and the clear voice of discernment.',
        note: 'A seed-syllable mantra (Aiṁ) to the goddess of learning and eloquence.'
      },
      {
        id: 'gayatri', name: 'Gayatri', dev: 'गायत्री', japId: 'custom',
        category: 'Universal',
        text: 'ॐ भूर्भुवः स्वः । तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि । धियो यो नः प्रचोदयात् ॥',
        transliteration: 'Om Bhūr Bhuvaḥ Svaḥ | Tat savitur vareṇyaṁ bhargo devasya dhīmahi | Dhiyo yo naḥ pracodayāt ||',
        meaning: 'Om — the earth, the middle worlds, the heavens. We meditate upon the magnificent light of the divine sun, that it may illuminate our intellects and impel them on the right path.',
        note: 'The most celebrated mantra of the Vedas, addressed to Savitur, the sun — the light of understanding which illumines the one who chants.'
      },
      {
        id: 'hanuman-chalisa', name: 'Hanuman Chalisa', dev: 'हनुमान चालीसा', japId: 'hanuman',
        category: 'Protection',
        text: 'श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि । बरनउँ रघुबर बिमल जसु, जो दायकु फल चारि ॥',
        transliteration: 'Śrīguru carana sarōja raja, nija manu mukuru sudhāri | Baranau Raghubara bimala jasu, jō dāyaku phala cāri ||',
        meaning: 'Cleansing the mirror of my mind with the dust of the guru\u2019s lotus feet, I sing the pure glory of Ram — the best of Raghus — which grants the four fruits of life.',
        note: 'The opening couplet of the celebrated forty verses to Hanuman composed by Goswami Tulsidas. The full Chalisa may be chanted as a daily sadhana.'
      },
      {
        id: 'om', name: 'Om', dev: 'ॐ', japId: 'custom',
        category: 'Universal',
        text: 'ॐ',
        transliteration: 'Om',
        meaning: 'The primal sound — the seed of all mantras and all speech. The universe is said to have emerged from it, and all mantras dissolve back into it.',
        note: 'Chanted slowly, aloud or in silence — one Om repeated is worth a full mala of concentration.'
      }
    ],

    /* ------------------------------------------------------------------
       SADHANA  (daily flow — targets, sankalp presets)
       ------------------------------------------------------------------ */
    sadhana: {
      targets: {
        jap: { label: 'Jap', max: 5000, step: 108, unit: 'naam' },
        malas: { label: 'Malas of 108', max: 50, step: 1, unit: 'mala' },
        naam: { label: 'Naam lekhan', max: 500, step: 108, unit: 'naam written' }
      },
      defaultTargets: { jap: 108, malas: 1, naam: 0 },
      sankalpPresets: [
        'I will turn to the Name with a quiet heart each morning.',
        'I will complete my daily jap before the first cup of tea.',
        'I will write one page of naam this week, no matter how slowly.',
        'I will not let a miss become a stop — I will only return.'
      ],
      sankalpPlaceholder: 'e.g. Two malas of Ram every morning, and one page of lekhan each Sunday.'
    },

    /* ------------------------------------------------------------------
       JOURNEY  (dashboard copy)
       ------------------------------------------------------------------ */
    journey: {
      milestones: [
        { id: 'first-jap', kind: 'jap', at: 1, label: 'The first tap', dev: '॥', desc: 'Your very first naam counted.' },
        { id: 'first-mala', kind: 'mala', at: 1, label: 'One full mala', dev: 'माला', desc: '108 — one complete round of jap.' },
        { id: 'thousand', kind: 'jap', at: 1000, label: 'One thousand', dev: '१०००', desc: 'A thousand jap stands quietly behind you.' },
        { id: 'ten-thousand', kind: 'jap', at: 10000, label: 'Ten thousand', dev: '१००००', desc: 'The discipline of ten thousand repetitions.' },
        { id: 'lakh', kind: 'jap', at: 100000, label: 'One lakh', dev: 'लक्ष', desc: 'One lakh of the Name — a true sankalp.' },
        { id: 'first-page', kind: 'page', at: 1, label: 'First written page', dev: 'पृष्ठ', desc: 'Your first completed page of lekhan.' },
        { id: 'ten-pages', kind: 'page', at: 10, label: 'Ten pages', dev: '१०', desc: 'Ten pages of the name, handwritten.' },
        { id: '108-pages', kind: 'page', at: 108, label: '108 pages', dev: '१०८', desc: 'A full notebook of the Name.' },
        { id: 'week-streak', kind: 'streak', at: 7, label: 'One week steady', dev: '७', desc: 'Seven days without a miss.' },
        { id: 'month-streak', kind: 'streak', at: 30, label: 'One month steady', dev: '३०', desc: 'Thirty days of returning, again and again.' }
      ]
    }
  };

  global.NAAM_JAP_CONFIG = C;
})(typeof window !== 'undefined' ? window : this);