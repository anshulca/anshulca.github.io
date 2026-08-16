/* =========================================================================
   NAAM JAP Â· SITE CONFIGURATION
   -------------------------------------------------------------------------
   This file is the SINGLE source of truth for branding, navigation, footer
   and editable content (About Me / Platform). Global header, footer, mobile
   nav and footer chrome are rendered from this object by core.js â€” branding
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
      devanagari: 'à¤¨à¤¾à¤® à¤œà¤ª',
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
        alt: 'Naam Jap â€” a circle of mala beads'
      },
      favicon: '/assets/favicon.svg',
      // Canonical base URL â€” update once a real domain is chosen (used for SEO + sitemap).
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
       NAVIGATION â€” main nav in header; CTA starts Jap
       ------------------------------------------------------------------ */
    nav: {
      primary: [
        { label: 'Home', url: '/' },
        { label: 'Jap', url: '/jap/', devanagari: 'à¤œà¤ª' },
        { label: 'Lekhan', url: '/lekh/', devanagari: 'à¤²à¥‡à¤–à¤¨' },
        { label: 'Sadhana', url: '/sadhana/', devanagari: 'à¤¸à¤¾à¤§à¤¨à¤¾' },
        { label: 'Mantra', url: '/mantra/', devanagari: 'à¤®à¤‚à¤¤à¥à¤°' },
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
        'A small digital space to pause, remember and return â€” a private companion for daily jap and sadhana.',
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
      copyright: 'Â© 2026 Naam Jap Â· Made with care, in silence by %CREATOR%'
    },
/* ------------------------------------------------------------------
       SOCIAL / CONTACT  (configure when you have links)
       ------------------------------------------------------------------ */
    social: [
      // { label: 'Instagram', url: 'https://instagram.com/...', icon: 'instagram' },
      // { label: 'YouTube', url: 'https://youtube.com/@...', icon: 'youtube' },
      // { label: 'Email', url: 'mailto:hello@naamjap.in', icon: 'mail' }
    ],

    /* ------------------------------------------------------------------
       ABOUT ME  (editable personal content â€” update freely)
       ------------------------------------------------------------------ */
    aboutMe: {
      name: 'CA Anshul Karwa',
      role: 'Chartered Accountant Â· Maker of Naam Jap',
      location: 'India',
      shortIntro:
        'A quiet devotee who built Naam Jap to keep company with the Name â€” and to help others stay steady in their own daily practice.',
      photo: '', // e.g. '/assets/img/me.jpg' â€” empty uses an initial monogram
      story: [
        'Naam Jap began as a simple personal habit â€” a few malas each morning before the day began.',
        'Over time I saw how much consistency mattered, and how easy it was to lose count, lose track, or lose the thread of a daily sadhana.',
        'This space is the result: a calm, private place where the practice holds its own rhythm, without noise or distraction.'
      ],
      philosophy:
        'Technology is not the opposite of stillness. A well-made tool can hold space for the sacred â€” quietly, and in the background.',
      message: 'May this little space help you pause, remember and return.'
    },

    /* ------------------------------------------------------------------
       ABOUT THE PLATFORM
       ------------------------------------------------------------------ */
    platform: {
      what: [
        'Naam Jap is a private digital companion for daily spiritual practice.',
        'You can do jap, write lekhan, set a daily sadhana, explore mantras and watch your own quiet progress â€” all without an account, all kept on your device.'
      ],
      practices: [
        {
          name: 'Naam Jap',
          desc: 'Count malas of 108 calmly, with a digital mala that feels like the real thing.'
        },
        {
          name: 'Naam Lekhan',
          desc: 'Write the naam into a digital notebook â€” 108 writings per page, page after page.'
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
        'Your practice data is private by design. It is stored only on your device and is never sent to any server. A future account system will respect the same boundary â€” migration will never lock you in.'
    },

    /* ------------------------------------------------------------------
       LEGAL  (short intro lines; full text lives in the legal pages)
       ------------------------------------------------------------------ */
    legal: {
      contact: 'For questions: hello@naamjap.in',
      updated: 'Last updated: 2026'
    },

    /* ------------------------------------------------------------------
       JAP Â· Naam Jap Counter â€” default naams (editable here)
       ------------------------------------------------------------------ */
    jap: {
      malaSize: 108,
      naams: [
        { id: 'ram', english: 'Ram', dev: 'à¤°à¤¾à¤®' },
        { id: 'radha', english: 'Radha', dev: 'à¤°à¤¾à¤§à¤¾' },
        { id: 'shiv', english: 'Shiv', dev: 'à¤¶à¤¿à¤µ' },
        { id: 'krishna', english: 'Shree Krishna', dev: 'à¤¶à¥à¤°à¥€ à¤•à¥ƒà¤·à¥à¤£' },
        { id: 'om-namah-shivay', english: 'Om Namah Shivay', dev: 'à¥ à¤¨à¤®à¤ƒ à¤¶à¤¿à¤µà¤¾à¤¯' },
        { id: 'hanuman', english: 'Hanuman', dev: 'à¤¹à¤¨à¥à¤®à¤¾à¤¨' },
        { id: 'ganesh', english: 'Ganesh', dev: 'à¤—à¤£à¥‡à¤¶' },
        { id: 'durga', english: 'Durga', dev: 'à¤¦à¥à¤°à¥à¤—à¤¾' }
      ],
      custom: {
        label: 'Custom Naam',
        placeholder: 'e.g. Shamb Sadashiv',
        hint: 'Enter any naam â€” it becomes the active naam for this counter.'
      }
    },

    /* ------------------------------------------------------------------
       MANTRA LIBRARY  (editable here â€” text, transliteration, meaning)
       Each entry maps to a jap naam id where possible (`japId`), so
       "Begin jap" can start the counter with the right naam selected.
       ------------------------------------------------------------------ */
    mantras: [
      {
        id: 'ram', name: 'Shree Ram', dev: 'à¤¶à¥à¤°à¥€ à¤°à¤¾à¤®', japId: 'ram',
        category: 'Devotion',
        text: 'à¤°à¤¾à¤®à¤¾à¤¯ à¤¨à¤®à¤ƒ',
        transliteration: 'RamÄya namah',
        meaning: 'Salutations to Ram â€” the one in whom all beings rest. The name carried by a million tongues, the steady heart of the bhakti tradition.',
        note: 'Often chanted as "Shree Ram, Jai Ram, Jai Jai Ram" â€” the mahamantra of the Ram tradition.'
      },
      {
        id: 'radha', name: 'Radha', dev: 'à¤°à¤¾à¤§à¤¾', japId: 'radha',
        category: 'Devotion',
        text: 'à¤°à¤¾à¤§à¥‡ à¤°à¤¾à¤§à¥‡ Â· à¤°à¤¾à¤§à¤¾à¤•à¥ƒà¤·à¥à¤£à¤¾à¤¯ à¤¨à¤®à¤ƒ',
        transliteration: 'RÄdhe RÄdhe Â· RÄdhÄ-Ká¹›á¹£á¹‡Äya namah',
        meaning: 'The name of Radha, the embodiment of devotion itself â€” and salutations to Radha and Krishna together, the two that are one.',
        note: 'Chanted with pure affection ("Radhe Radhe") as a greeting of love between devotees.'
      },
      {
        id: 'krishna', name: 'Shree Krishna', dev: 'à¤¶à¥à¤°à¥€ à¤•à¥ƒà¤·à¥à¤£', japId: 'krishna',
        category: 'Devotion',
        text: 'à¤•à¥ƒà¤·à¥à¤£à¤¾à¤¯ à¤µà¤¾à¤¸à¥à¤¦à¥‡à¤µà¤¾à¤¯ à¤¹à¤°à¤¯à¥‡ à¤ªà¤°à¤®à¤¾à¤¤à¥à¤®à¤¨à¥‡',
        transliteration: 'Ká¹›á¹£á¹‡Äya VÄsudevÄya Haraye ParamÄtmane',
        meaning: 'To Krishna, born of Vasudeva, to Hari, the Supreme Self â€” one name that holds the flute, the heart, and the remover of fear.',
        note: 'The opening of the Vishnu Sahasranama, calling the Lord by name and family.'
      },
      {
        id: 'om-namah-shivay', name: 'Om Namah Shivay', dev: 'à¥ à¤¨à¤®à¤ƒ à¤¶à¤¿à¤µà¤¾à¤¯', japId: 'om-namah-shivay',
        category: 'Shiv',
        text: 'à¥ à¤¨à¤®à¤ƒ à¤¶à¤¿à¤µà¤¾à¤¯',
        transliteration: 'Om Namah ShivÄya',
        meaning: 'Salutations to the auspicious one â€” "Om" the universal sound, "namah" the offering of the self, "Shivaya" to Shiva. The great five-syllable mantra of inner stillness.',
        note: 'The panchakshari (five-syllable) mantra of the Shaiva tradition; the core of a whole lifetime of jap.'
      },
      {
        id: 'shiv', name: 'Shiv', dev: 'à¤¶à¤¿à¤µ', japId: 'shiv',
        category: 'Shiv',
        text: 'à¤¶à¤‚ à¤š à¤®à¤¯à¤¸à¥à¤•à¤°à¤‚ à¤š à¤®à¤¾à¤®à¥ Â· à¤¶à¤¿à¤µà¤¾à¤¯ à¤¨à¤®à¤ƒ',
        transliteration: 'ÅšivÄya namah',
        meaning: 'Salutations to the auspicious one â€” the meditative, the still, the remover of what is not real.',
        note: 'A simple daily salutation to the Lord of meditation.'
      },
      {
        id: 'mahamrityunjaya', name: 'Mahamrityunjaya', dev: 'à¥ à¤¤à¥à¤°à¥à¤¯à¤®à¥à¤¬à¤•à¤®à¥', japId: 'om-namah-shivay',
        category: 'Shiv',
        text: 'à¥ à¤¤à¥à¤°à¥à¤¯à¤®à¥à¤¬à¤•à¤‚ à¤¯à¤œà¤¾à¤®à¤¹à¥‡ à¤¸à¥à¤—à¤¨à¥à¤§à¤¿à¤‚ à¤ªà¥à¤·à¥à¤Ÿà¤¿à¤µà¤°à¥à¤§à¤¨à¤®à¥ à¥¤ à¤‰à¤°à¥à¤µà¤¾à¤°à¥à¤•à¤®à¤¿à¤µ à¤¬à¤¨à¥à¤§à¤¨à¤¾à¤¨à¥ à¤®à¥ƒà¤¤à¥à¤¯à¥‹à¤°à¥à¤®à¥à¤•à¥à¤·à¥€à¤¯ à¤®à¤¾à¤½à¤®à¥ƒà¤¤à¤¾à¤¤à¥ à¥¥',
        transliteration: 'Om Tryambakaá¹ yajÄmahe sugandhiá¹ puá¹£á¹­i-vardhanam | UrvÄrukamiva bandhanÄn má¹›tyor muká¹£Ä«ya mÄ\u2019má¹›tÄt ||',
        meaning: 'We worship the three-eyed one, fragrant and nourishing. Like the ripened cucumber freed from its vine, may we be released from the bonds of mortality â€” not away from immortality, but unto it.',
        note: 'The great death-conquering mantra, offered to Shiva as the healer of all fears.'
      },
      {
        id: 'hanuman', name: 'Hanuman', dev: 'à¤¹à¤¨à¥à¤®à¤¾à¤¨', japId: 'hanuman',
        category: 'Protection',
        text: 'à¥ à¤¹à¤‚ à¤¹à¤¨à¥à¤®à¤¤à¥‡ à¤¨à¤®à¤ƒ',
        transliteration: 'Om Haá¹ Hanumate namah',
        meaning: 'Salutations to Hanuman â€” the son of the wind, the peerless servant of Ram, the remover of fear and the giver of strength.',
        note: 'A seed-syllable mantra (Haá¹) opening to the complete offering of self to Hanuman.'
      },
      {
        id: 'ganesh', name: 'Ganesh', dev: 'à¤—à¤£à¥‡à¤¶', japId: 'ganesh',
        category: 'Protection',
        text: 'à¥ à¤—à¤‚ à¤—à¤£à¤ªà¤¤à¤¯à¥‡ à¤¨à¤®à¤ƒ',
        transliteration: 'Om Gaá¹ Gaá¹‡apataye namah',
        meaning: 'Salutations to the lord of the ganas â€” the remover of obstacles, the one who clears the way at the beginning of all beginnings.',
        note: 'Chanted before any new undertaking, its seed syllable opening the path.'
      },
      {
        id: 'durga', name: 'Durga', dev: 'à¤¦à¥à¤°à¥à¤—à¤¾', japId: 'durga',
        category: 'Devi',
        text: 'à¥ à¤¦à¥à¤‚ à¤¦à¥à¤°à¥à¤—à¤¾à¤¯à¥ˆ à¤¨à¤®à¤ƒ',
        transliteration: 'Om Duá¹ DurgÄyai namah',
        meaning: 'Salutations to Durga, the protectress â€” the one who shelters and carries her devotees through all that is difficult.',
        note: 'A seed-syllable mantra (Duá¹) to the goddess of protection and courage.'
      },
      {
        id: 'lakshmi', name: 'Lakshmi', dev: 'à¤®à¤¹à¤¾à¤²à¤•à¥à¤·à¥à¤®à¥€', japId: 'custom',
        category: 'Devi',
        text: 'à¥ à¤¶à¥à¤°à¥€à¤‚ à¤®à¤¹à¤¾à¤²à¤•à¥à¤·à¥à¤®à¥à¤¯à¥ˆ à¤¨à¤®à¤ƒ',
        transliteration: 'Om ÅšrÄ«á¹ MahÄlaká¹£myai namah',
        meaning: 'Salutations to Mahalakshmi â€” the radiant abundance of the divine, giver of grace, beauty and prosperity in all its forms.',
        note: 'Its seed syllable (ÅšrÄ«á¹) is itself the sound of auspiciousness and wealth.'
      },
      {
        id: 'saraswati', name: 'Saraswati', dev: 'à¤¸à¤°à¤¸à¥à¤µà¤¤à¥€', japId: 'custom',
        category: 'Devi',
        text: 'à¥ à¤à¤‚ à¤¸à¤°à¤¸à¥à¤µà¤¤à¥à¤¯à¥ˆ à¤¨à¤®à¤ƒ',
        transliteration: 'Om Aiá¹ Sarasvatyai namah',
        meaning: 'Salutations to Saraswati â€” the flow of speech, knowledge and wisdom, the river of learning and the clear voice of discernment.',
        note: 'A seed-syllable mantra (Aiá¹) to the goddess of learning and eloquence.'
      },
      {
        id: 'gayatri', name: 'Gayatri', dev: 'à¤—à¤¾à¤¯à¤¤à¥à¤°à¥€', japId: 'custom',
        category: 'Universal',
        text: 'à¥ à¤­à¥‚à¤°à¥à¤­à¥à¤µà¤ƒ à¤¸à¥à¤µà¤ƒ à¥¤ à¤¤à¤¤à¥à¤¸à¤µà¤¿à¤¤à¥à¤°à¥à¤µà¤°à¥‡à¤£à¥à¤¯à¤‚ à¤­à¤°à¥à¤—à¥‹ à¤¦à¥‡à¤µà¤¸à¥à¤¯ à¤§à¥€à¤®à¤¹à¤¿ à¥¤ à¤§à¤¿à¤¯à¥‹ à¤¯à¥‹ à¤¨à¤ƒ à¤ªà¥à¤°à¤šà¥‹à¤¦à¤¯à¤¾à¤¤à¥ à¥¥',
        transliteration: 'Om BhÅ«r Bhuvaá¸¥ Svaá¸¥ | Tat savitur vareá¹‡yaá¹ bhargo devasya dhÄ«mahi | Dhiyo yo naá¸¥ pracodayÄt ||',
        meaning: 'Om â€” the earth, the middle worlds, the heavens. We meditate upon the magnificent light of the divine sun, that it may illuminate our intellects and impel them on the right path.',
        note: 'The most celebrated mantra of the Vedas, addressed to Savitur, the sun â€” the light of understanding which illumines the one who chants.'
      },
      {
        id: 'hanuman-chalisa', name: 'Hanuman Chalisa', dev: 'à¤¹à¤¨à¥à¤®à¤¾à¤¨ à¤šà¤¾à¤²à¥€à¤¸à¤¾', japId: 'hanuman',
        category: 'Protection',
        text: 'à¤¶à¥à¤°à¥€à¤—à¥à¤°à¥ à¤šà¤°à¤¨ à¤¸à¤°à¥‹à¤œ à¤°à¤œ, à¤¨à¤¿à¤œ à¤®à¤¨à¥ à¤®à¥à¤•à¥à¤°à¥ à¤¸à¥à¤§à¤¾à¤°à¤¿ à¥¤ à¤¬à¤°à¤¨à¤‰à¤ à¤°à¤˜à¥à¤¬à¤° à¤¬à¤¿à¤®à¤² à¤œà¤¸à¥, à¤œà¥‹ à¤¦à¤¾à¤¯à¤•à¥ à¤«à¤² à¤šà¤¾à¤°à¤¿ à¥¥',
        transliteration: 'ÅšrÄ«guru carana sarÅja raja, nija manu mukuru sudhÄri | Baranau Raghubara bimala jasu, jÅ dÄyaku phala cÄri ||',
        meaning: 'Cleansing the mirror of my mind with the dust of the guru\u2019s lotus feet, I sing the pure glory of Ram â€” the best of Raghus â€” which grants the four fruits of life.',
        note: 'The opening couplet of the celebrated forty verses to Hanuman composed by Goswami Tulsidas. The full Chalisa may be chanted as a daily sadhana.'
      },
      {
        id: 'om', name: 'Om', dev: 'à¥', japId: 'custom',
        category: 'Universal',
        text: 'à¥',
        transliteration: 'Om',
        meaning: 'The primal sound â€” the seed of all mantras and all speech. The universe is said to have emerged from it, and all mantras dissolve back into it.',
        note: 'Chanted slowly, aloud or in silence â€” one Om repeated is worth a full mala of concentration.'
      }
    ],

    /* ------------------------------------------------------------------
       SADHANA  (daily flow â€” targets, sankalp presets)
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
        'I will not let a miss become a stop â€” I will only return.'
      ],
      sankalpPlaceholder: 'e.g. Two malas of Ram every morning, and one page of lekhan each Sunday.'
    },

    /* ------------------------------------------------------------------
       JOURNEY  (dashboard copy)
       ------------------------------------------------------------------ */
    journey: {
      milestones: [
        { id: 'first-jap', kind: 'jap', at: 1, label: 'The first tap', dev: 'à¥¥', desc: 'Your very first naam counted.' },
        { id: 'first-mala', kind: 'mala', at: 1, label: 'One full mala', dev: 'à¤®à¤¾à¤²à¤¾', desc: '108 â€” one complete round of jap.' },
        { id: 'thousand', kind: 'jap', at: 1000, label: 'One thousand', dev: 'à¥§à¥¦à¥¦à¥¦', desc: 'A thousand jap stands quietly behind you.' },
        { id: 'ten-thousand', kind: 'jap', at: 10000, label: 'Ten thousand', dev: 'à¥§à¥¦à¥¦à¥¦à¥¦', desc: 'The discipline of ten thousand repetitions.' },
        { id: 'lakh', kind: 'jap', at: 100000, label: 'One lakh', dev: 'à¤²à¤•à¥à¤·', desc: 'One lakh of the Name â€” a true sankalp.' },
        { id: 'first-page', kind: 'page', at: 1, label: 'First written page', dev: 'à¤ªà¥ƒà¤·à¥à¤ ', desc: 'Your first completed page of lekhan.' },
        { id: 'ten-pages', kind: 'page', at: 10, label: 'Ten pages', dev: 'à¥§à¥¦', desc: 'Ten pages of the name, handwritten.' },
        { id: '108-pages', kind: 'page', at: 108, label: '108 pages', dev: 'à¥§à¥¦à¥®', desc: 'A full notebook of the Name.' },
        { id: 'week-streak', kind: 'streak', at: 7, label: 'One week steady', dev: 'à¥­', desc: 'Seven days without a miss.' },
        { id: 'month-streak', kind: 'streak', at: 30, label: 'One month steady', dev: 'à¥©à¥¦', desc: 'Thirty days of returning, again and again.' }
      ]
    }
  };

  global.NAAM_JAP_CONFIG = C;
})(typeof window !== 'undefined' ? window : this);