/* =========================================================================
   NAAM JAP · STOTRA / CHALISA DATA
   Full devotional texts with Devanagari and English transliteration.
   Each entry: { id, name, nameDev, deity, deityDev, type, verses[], meaning? }
   verses: [{ label?, dev, en }]   — label marks doha/chaupai/verse sections
   ========================================================================= */
(function (global) {
  'use strict';

  var STOTRAS = [

    /* ==================================================================
       HANUMAN
       ================================================================== */
    {
      id: 'hanuman-chalisa',
      name: 'Hanuman Chalisa',
      nameDev: 'हनुमान चालीसा',
      deity: 'hanuman',
      deityName: 'Hanuman',
      deityDev: 'हनुमान',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि ।\nबरनउँ रघुबर बिमल जसु, जो दायकु फल चारि ॥', en: 'Shrī Guru charana saroja raja, nija manu mukuru sudhāri,\nBaranau Raghubara bimala jasu, jo dāyaku phala chāri.' },
        { label: 'Doha', dev: 'बुद्धिहीन तनु जानिके, सुमिरौं पवनकुमार ।\nबल बुद्धि विद्या देहु मोहिं, हरहु कलेस विकार ॥', en: 'Buddhihīna tanu jānike, sumirau Pavana Kumāra,\nBala buddhi vidyā dehu mohiṁ, harahu kalesa vikāra.' },
        { label: 'Chaupai', dev: 'जय हनुमान ज्ञान गुन सागर ।\nजय कपीस तिहुँ लोक उजागर ॥', en: 'Jaya Hanumāna gyāna guna sāgara,\nJaya Kapīsha tihuṁ loka ujāgara.' },
        { dev: 'रामदूत अतुलित बलधामा ।\nअंजनि पुत्र पवनसुत नामा ॥', en: 'Rāmadūta atulita baladhamā,\nAnjanī putra Pavanasuta nāmā.' },
        { dev: 'महाबीर बिक्रम बजरंगी ।\nकुमति निवार सुमति के संगी ॥', en: 'Mahābīra bikrama Bajarangī,\nKumati nivāra sumati ke sangī.' },
        { dev: 'कंचन बरन बिराज सुबेसा ।\nकानन कुंडल कुंचित केसा ॥', en: 'Kanchana barana birāja subesā,\nKānana kuṇḍala kuṇchita kesā.' },
        { dev: 'हाथ बज्र औ ध्वजा बिराजै ।\nकाँधे मूँज जनेऊ साजै ॥', en: 'Hātha bajra au dhvajā birājai,\nKāṁdhe mūṁja janeu sājai.' },
        { dev: 'शंकर सुवन केसरी नंदन ।\nतेज प्रताप महा जग बंदन ॥', en: 'Shaṅkara suvana Kesarī Nandana,\nTeja pratāpa mahā jaga bandana.' },
        { dev: 'विद्यावान गुनी अति चातुर ।\nराम काज करिबे को आतुर ॥', en: 'Vidyāvāna gunī ati chātura,\nRāma kāja karibe ko ātura.' },
        { dev: 'प्रभु चरित्र सुनिबे को रसिया ।\nराम लखन सीता मन बसिया ॥', en: 'Prabhu charitra sunibe ko rasiyā,\nRāma Lakhana Sītā mana basiyā.' },
        { dev: 'सूक्ष्म रूप धरि सियहिं दिखावा ।\nबिकट रूप धरि लंक जरावा ॥', en: 'Sūkshma rūpa dhari Siyahiṁ dikhāvā,\nBikaṭa rūpa dhari Laṅka jarāvā.' },
        { dev: 'भीम रूप धरि असुर सँहारे ।\nरामचन्द्र के काज सँवारे ॥', en: 'Bhīma rūpa dhari asura saṁhāre,\nRāmachandra ke kāja saṁvāre.' },
        { dev: 'लाय सजीवन लखन जियाये ।\nश्रीरघुबीर हरषि उर लाये ॥', en: 'Lāya Sajīvana Lakhana jiyāye,\nShrī Raghubīra harashi ura lāye.' },
        { dev: 'रघुपति कीन्हीं बहुत बड़ाई ।\nतुम मम प्रिय भरतहि सम भाई ॥', en: 'Raghupati kīnhīṁ bahuta baḍāī,\nTuma mama priya Bharatahi sama bhāī.' },
        { dev: 'सहस बदन तुम्हरो जस गावैं ।\nअस कहि श्रीपति कंठ लगावैं ॥', en: 'Sahasa badana tumharo jasa gāvaiṁ,\nAsa kahi Shrīpati kaṇṭha lagāvaiṁ.' },
        { dev: 'सनकादिक ब्रह्मादि मुनीसा ।\nनारद शारद सहित अहीसा ॥', en: 'Sanakādika Brahmādi munīsā,\nNārada Shārada sahita Ahīsā.' },
        { dev: 'जम कुबेर दिगपाल जहाँ ते ।\nकबि कोबिद कहि सके कहाँ ते ॥', en: 'Jama Kubera Digapāla jahāṁ te,\nKabi kobida kahi sake kahāṁ te.' },
        { dev: 'तुम उपकार सुग्रीवहिं कीन्हा ।\nराम मिलाय राजपद दीन्हा ॥', en: 'Tuma upakāra Sugrīvahiṁ kīnhā,\nRāma milāya rājapada dīnhā.' },
        { dev: 'तुम्हरो मंत्र विभीषन माना ।\nलंकेश्वर भए सब जग जाना ॥', en: 'Tumharo mantra Vibhīshana mānā,\nLaṅkeśvara bhae saba jaga jānā.' },
        { dev: 'जुग सहस्र जोजन पर भानू ।\nलील्यो ताहि मधुर फल जानू ॥', en: 'Juga sahasra yojana para Bhānū,\nLīlyo tāhi madhura phala jānū.' },
        { dev: 'प्रभु मुद्रिका मेलि मुख माहीं ।\nजलधि लाँघि गये अचरज नाहीं ॥', en: 'Prabhu mudrikā meli mukha māhīṁ,\nJaladhi lāṁghi gaye acharaja nāhīṁ.' },
        { dev: 'दुर्गम काज जगत के जेते ।\nसुगम अनुग्रह तुम्हरे तेते ॥', en: 'Durgama kāja jagata ke jete,\nSugama anugraha tumhare tete.' },
        { dev: 'राम दुआरे तुम रखवारे ।\nहोत न आज्ञा बिनु पैसारे ॥', en: 'Rāma duāre tuma rakhavāre,\nHota na āgyā binu paisāre.' },
        { dev: 'सब सुख लहैं तुम्हारी सरना ।\nतुम रक्षक काहू को डरना ॥', en: 'Saba sukha lahaiṁ tumhārī saranā,\nTuma rakshaka kāhū ko ḍaranā.' },
        { dev: 'आपन तेज सम्हारो आपै ।\nतीनों लोक हाँक तें काँपै ॥', en: 'Āpana teja samhāro āpai,\nTīnoṁ loka hāṁka teṁ kāṁpai.' },
        { dev: 'भूत पिसाच निकट नहिं आवै ।\nमहाबीर जब नाम सुनावै ॥', en: 'Bhūta pisācha nikaṭa nahiṁ āvai,\nMahābīra jaba nāma sunāvai.' },
        { dev: 'नासै रोग हरै सब पीरा ।\nजपत निरंतर हनुमत बीरा ॥', en: 'Nāsai roga harai saba pīrā,\nJapata nirantara Hanumata bīrā.' },
        { dev: 'संकट तें हनुमान छुड़ावै ।\nमन क्रम बचन ध्यान जो लावै ॥', en: 'Saṅkaṭa teṁ Hanumāna chuḍāvai,\nMana krama bachana dhyāna jo lāvai.' },
        { dev: 'सब पर राम तपस्वी राजा ।\nतिन के काज सकल तुम साजा ॥', en: 'Saba para Rāma tapasvī rājā,\nTina ke kāja sakala tuma sājā.' },
        { dev: 'और मनोरथ जो कोई लावै ।\nसोई अमित जीवन फल पावै ॥', en: 'Aura manoratha jo koī lāvai,\nSoī amita jīvana phala pāvai.' },
        { dev: 'चारों जुग परताप तुम्हारा ।\nहै परसिद्ध जगत उजियारा ॥', en: 'Chāroṁ juga paratāpa tumhārā,\nHai parasiddha jagata ujiyārā.' },
        { dev: 'साधु संत के तुम रखवारे ।\nअसुर निकंदन राम दुलारे ॥', en: 'Sādhu santa ke tuma rakhavāre,\nAsura nikandana Rāma dulāre.' },
        { dev: 'अष्ट सिद्धि नौ निधि के दाता ।\nअस बर दीन जानकी माता ॥', en: 'Ashṭa siddhi nau nidhi ke dātā,\nAsa bara dīna Jānakī mātā.' },
        { dev: 'राम रसायन तुम्हरे पासा ।\nसदा रहो रघुपति के दासा ॥', en: 'Rāma rasāyana tumhare pāsā,\nSadā raho Raghupati ke dāsā.' },
        { dev: 'तुम्हरे भजन राम को पावै ।\nजनम जनम के दुख बिसरावै ॥', en: 'Tumhare bhajana Rāma ko pāvai,\nJanama janama ke dukha bisarāvai.' },
        { dev: 'अंत काल रघुबर पुर जाई ।\nजहाँ जन्म हरिभक्त कहाई ॥', en: 'Anta kāla Raghubara pura jāī,\nJahāṁ janma Haribhakta kahāī.' },
        { dev: 'और देवता चित्त न धरई ।\nहनुमत सेइ सर्ब सुख करई ॥', en: 'Aura devatā chitta na dharaī,\nHanumata sei sarba sukha karaī.' },
        { dev: 'संकट कटै मिटै सब पीरा ।\nजो सुमिरै हनुमत बलबीरा ॥', en: 'Saṅkaṭa kaṭai miṭai saba pīrā,\nJo sumirai Hanumata balabīrā.' },
        { dev: 'जय जय जय हनुमान गोसाईं ।\nकृपा करहु गुरुदेव की नाईं ॥', en: 'Jaya jaya jaya Hanumāna Gosāīṁ,\nKṛpā karahu Gurudeva kī nāīṁ.' },
        { dev: 'जो सत बार पाठ कर कोई ।\nछूटहि बंदि महा सुख होई ॥', en: 'Jo sata bāra pāṭha kara koī,\nChūṭahi bandi mahā sukha hoī.' },
        { dev: 'जो यह पढ़ै हनुमान चालीसा ।\nहोय सिद्धि साखी गौरीसा ॥', en: 'Jo yaha paḍhai Hanumāna Chālīsā,\nHoya siddhi sākhī Gaurīsā.' },
        { label: 'Doha', dev: 'तुलसीदास सदा हरि चेरा ।\nकीजै नाथ हृदय महँ डेरा ॥', en: 'Tulasīdāsa sadā Hari cherā,\nKījai nātha hṛdaya mahaṁ ḍerā.' },
        { label: 'Doha', dev: 'पवनतनय संकट हरन, मंगल मूरति रूप ।\nराम लखन सीता सहित, हृदय बसहु सुर भूप ॥', en: 'Pavanatanaya saṅkaṭa harana, maṅgala mūrati rūpa,\nRāma Lakhana Sītā sahita, hṛdaya basahu sura bhūpa.' }
      ]
    },

    /* ==================================================================
       LORD SHIVA
       ================================================================== */
    {
      id: 'shiv-tandav',
      name: 'Shiva Tandava Stotram',
      nameDev: 'शिव ताण्डव स्तोत्रम्',
      deity: 'shiva',
      deityName: 'Lord Shiva',
      deityDev: 'शिव',
      type: 'stotra',
      verses: [
        { dev: 'जटाटवीगलज्जलप्रवाहपावितस्थले\nगलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम् ।\nडमड्डमड्डमड्डमन्निनादवड्डमर्वयं\nचकार चण्डताण्डवं तनोतु नः शिवः शिवम् ॥', en: 'Jaṭāṭavīgalajjalapravāhapāvitasthale\nGale\'avalambya lambitāṁ bhujaṅgatuṅgamālikām,\nḌamaḍḍamaḍḍamaḍḍamannināḍavaḍḍamarvayaṁ\nChakāra chaṇḍatāṇḍavaṁ tanotu naḥ Śivaḥ śivam.' },
        { dev: 'जटा कटा हसम्भ्रम भ्रमन्निलिम्पनिर्झरी\nविलोलवीचिवल्लरी विराजमानमूर्धनि ।\nधगद्धगद्धगज्ज्वलल्ललाटपट्टपावके\nकिशोरचन्द्रशेखरे रतिः प्रतिक्षणं मम ॥', en: 'Jaṭā kaṭāhasambhrama bhramannilimpanirjharī\nVilolabīchivallari virājamānamūrdhani,\nDhagaddhagaddhagajjvalalllalāṭapaṭṭapāvake\nKiśorachandraśekhare ratiḥ pratikṣaṇaṁ mama.' },
        { dev: 'धराधरेन्द्रनंदिनीविलासबन्धुबन्धुर\nस्फुरद्दिगन्तसन्ततिप्रमोदमानमानसे ।\nकृपाकटाक्षधोरणीनिरुद्धदुर्धरापदि\nक्वचिद्दिगम्बरे मनो विनोदमेतु वस्तुनि ॥', en: 'Dharādharendranandinivilāsabandhubandhura\nSphuradddigantasantatipramodamānamānase,\nKṛpākaṭākṣadhoraṇīniruddhadurdharāpadi\nKvachiddigambare mano vinodametu vastuni.' },
        { dev: 'जटाभुजंगपिंगलस्फुरत्फणामणिप्रभा\nकदम्बकुंकुमद्रवप्रलिप्तदिग्वधूमुखे ।\nमदान्धसिन्धुरस्फुरत्त्वगुत्तरीयमेदुरे\nमनो विनोदमद्भुतं बिभर्तु भूतभर्तरि ॥', en: 'Jaṭābhujaṅgapiṅgalasphuratphaṇāmaṇiprabhā\nKadambakuṅkumadravapraliptadigvadhūmukhe,\nMadāndhasindhurasphurattvaguttarīyamedure\nMano vinodamadbhutaṁ bibhartu bhūtabhartari.' },
        { dev: 'सहस्रलोचनप्रभृत्यशेषलेखशेखर\nप्रसूनधूलिधोरणी विधूसरांघ्रिपीठभूः ।\nभुजंगराजमालया निबद्धजाटजूटक\nश्रियैचिरायजायतां चकोरबन्धुशेखरः ॥', en: 'Sahasralochanaprabhṛtyaśeṣalekhaśekhara\nPrasūnadhūlidhōraṇī vidhūsarāṅghripīṭhabhūḥ,\nBhujaṅgarājamālayā nibaddhajāṭajūṭaka\nŚriyaichirayajāyatāṁ chakorabandhuśekharaḥ.' },
        { dev: 'ललाटचत्वरज्वलद्धनंजयस्फुलिंगभा\nनिपीतपंचसायकं नमन्निलिम्पनायकम् ।\nसुधामयूखलेखया विराजमानशेखरं\nमहाकपालि सम्पदेशिरोजटालमस्तु नः ॥', en: 'Lalāṭachatvarajvaladhdhanaṁjayasphuliṅgabhā\nNipītapaṁchasāyakaṁ namannilimpanāyakam,\nSudhāmayūkhalekhayā virājamānaśekharaṁ\nMahākapāli sampadeshirojatālamastu naḥ.' },
        { dev: 'करालभालपट्टिकाधगद्धगद्धगज्ज्वल\nद्धनंजयाहुतीकृतप्रचण्डपंचसायके ।\nधराधरेन्द्रनंदिनीकुचाग्रचित्रपत्रक\nप्रकल्पनैकशिल्पिनि त्रिलोचने रतिर्मम ॥', en: 'Karālabhālapaṭṭikādhagaddhagaddhagajjvala\nDdhanaṁjayāhutīkṛtaprachaṇḍapaṁchasāyake,\nDharādharendranandināīkuchāgrachitrapātraka\nPrakalpanaikaśilpini trilochane ratirmama.' }
      ]
    },
    {
      id: 'shiv-chalisa',
      name: 'Shiv Chalisa',
      nameDev: 'शिव चालीसा',
      deity: 'shiva',
      deityName: 'Lord Shiva',
      deityDev: 'शिव',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'जय गिरिजा पति दीनदयाला ।\nसदा करत सन्तन प्रतिपाला ॥', en: 'Jaya Girijāpati dīnadayālā,\nSadā karata santana pratipālā.' },
        { dev: 'भाल चन्द्रमा सोहत नीके ।\nकानन कुंडल नागफनी के ॥', en: 'Bhāla chandramā sohata nīke,\nKānana kuṇḍala nāgaphanī ke.' },
        { dev: 'अंग गौर शिर गंग बहाए ।\nमुण्डमाल तन छार लगाए ॥', en: 'Aṅga gaura shira Gaṅga bahāe,\nMuṇḍamāla tana chhāra lagāe.' },
        { dev: 'वस्त्र खाल बाघम्बर सोहै ।\nछवि को देख नाग मुनि मोहै ॥', en: 'Vastra khāla bāghambara sohai,\nChhavi ko dekha Nāga muni mohai.' },
        { dev: 'मैना मातु की हवै दुलारी ।\nबाम अंग सोहत छवि न्यारी ॥', en: 'Mainā mātu kī havai dulārī,\nBāma aṅga sohata chhavi nyārī.' },
        { dev: 'कर त्रिशूल सोहत छवि भारी ।\nकरत सदा भक्तन हितकारी ॥', en: 'Kara trishūla sohata chhavi bhārī,\nKarata sadā bhaktana hitakārī.' },
        { dev: 'नंदी गणेश सोहैं तहँ कैसे ।\nसागर मध्य कमल हैं जैसे ॥', en: 'Nandī Gaṇesha sohaiṁ tahaṁ kaise,\nSāgara madhya kamala haiṁ jaise.' },
        { dev: 'कार्तिक श्याम और गणराऊ ।\nया छवि को कहि जात न काऊ ॥', en: 'Kārtika śyāma aura Gaṇarāū,\nYā chhavi ko kahi jāta na kāū.' },
        { dev: 'देवन जबहीं जाय पुकारा ।\nतब ही दुख प्रभु आप निवारा ॥', en: 'Devana jabahīṁ jāya pukārā,\nTaba hī dukha Prabhu āpa nivārā.' },
        { dev: 'किया उपद्रव तारक भारी ।\nदेवन सब मिलि तुमहीं जुहारी ॥', en: 'Kiyā upadrava Tāraka bhārī,\nDevana saba mili tumahīṁ juhārī.' },
        { dev: 'तुरत षडानन आप पठायउ ।\nलवनिमेष महँ मारि गिरायउ ॥', en: 'Turata Shaḍānana āpa paṭhāyau,\nLavanimēsha mahaṁ māri girāyau.' },
        { dev: 'आप जलंधर असुर सँहारा ।\nसुयश तुम्हार विदित संसारा ॥', en: 'Āpa Jalandhara asura saṁhārā,\nSuyasha tumhāra vidita saṁsārā.' },
        { dev: 'त्रिपुरासुर सन युद्ध मचाई ।\nसबहिं कृपा कर लीन बचाई ॥', en: 'Tripurāsura sana yuddha machāī,\nSabahiṁ kṛpā kara līna bachāī.' },
        { dev: 'किया तपहिं भागीरथ भारी ।\nपुरब प्रतिज्ञा तासु पुरारी ॥', en: 'Kiyā tapahiṁ Bhāgīratha bhārī,\nPuraba pratignyā tāsu Purārī.' },
        { dev: 'दानिन महँ तुम सम कोउ नाहीं ।\nसेवक स्तुति करत सदाहीं ॥', en: 'Dānina mahaṁ tuma sama kou nāhīṁ,\nSevaka stuti karata sadāhīṁ.' },
        { dev: 'वेद नाम महिमा तव गाई ।\nअकथ अनादि भेद नहिं पाई ॥', en: 'Veda nāma mahimā tava gāī,\nAkatha anādi bheda nahiṁ pāī.' },
        { dev: 'प्रगट उदधि मंथन में ज्वाला ।\nजरत सुरासुर भए विहाला ॥', en: 'Pragaṭa udadhi manthana meṁ jvālā,\nJarata surāsura bhae vihālā.' },
        { dev: 'कीन्ह दया तहँ करी सहाई ।\nनीलकंठ तब नाम कहाई ॥', en: 'Kīnha dayā tahaṁ karī sahāī,\nNīlakaṇṭha taba nāma kahāī.' },
        { dev: 'पूजन रामचन्द्र जब कीन्हा ।\nजीत के लंक विभीषण दीन्हा ॥', en: 'Pūjana Rāmachandra jaba kīnhā,\nJīta ke Laṅka Vibhīṣaṇa dīnhā.' },
        { dev: 'सहस कमल में हो रहे धारी ।\nकीन्ह परीक्षा तबहीं पुरारी ॥', en: 'Sahasa kamala meṁ ho rahe dhārī,\nKīnha parīkshā tabahīṁ Purārī.' },
        { dev: 'एक कमल प्रभु राखेउ जोई ।\nकमल नयन पूजन चहं सोई ॥', en: 'Eka kamala Prabhu rākheu joī,\nKamala nayana pūjana chahaṁ soī.' },
        { dev: 'कठिन भक्ति देखी प्रभु शंकर ।\nभए प्रसन्न दिए इच्छित वर ॥', en: 'Kaṭhina bhakti dekhī Prabhu Shaṅkara,\nBhae prasanna die ichchhita vara.' },
        { label: 'Doha', dev: 'जय जय जय अनन्त अविनाशी ।\nकरत कृपा सबके घटवासी ॥\nदुष्ट सकल निर्मूल करो महि ।\nआश्रित हेतु करो सुख लहि ॥', en: 'Jaya jaya jaya ananta avināshī,\nKarata kṛpā sabake ghaṭavāsī.\nDushṭa sakala nirmūla karo mahi,\nĀśrita hetu karo sukha lahi.' }
      ]
    },
    {
      id: 'rudrashtakam',
      name: 'Rudrashtakam',
      nameDev: 'रुद्राष्टकम्',
      deity: 'shiva',
      deityName: 'Lord Shiva',
      deityDev: 'शिव',
      type: 'stotra',
      verses: [
        { dev: 'नमामीशमीशान निर्वाणरूपं\nविभुं व्यापकं ब्रह्मवेदस्वरूपम् ।\nनिजं निर्गुणं निर्विकल्पं निरीहं\nचिदाकाशमाकाशवासं भजेऽहम् ॥', en: 'Namāmīśamīśāna nirvāṇarūpaṁ\nVibhuṁ vyāpakaṁ brahmavedasvarūpam,\nNijaṁ nirguṇaṁ nirvikalpaṁ nirīhaṁ\nChidākāśamākāśavāsaṁ bhaje\'ham.' },
        { dev: 'निराकारमोंकारमूलं तुरीयं\nगिरा ज्ञान गोतीतमीशं गिरीशम् ।\nकरालं महाकाल कालं कृपालं\nगुणागार संसारपारं नतोऽहम् ॥', en: 'Nirākāramoṁkāramūlaṁ turīyaṁ\nGirā gyāna gotītamīśaṁ girīśam,\nKarālaṁ mahākāla kālaṁ kṛpālaṁ\nGuṇāgāra saṁsārapāraṁ nato\'ham.' },
        { dev: 'तुषाराद्रि संकाश गौरं गभीरं\nमनोभूत कोटिप्रभा श्री शरीरम् ।\nस्फुरन्मौलि कल्लोलिनी चारु गंगा\nलसद्भालबालेन्दु कण्ठे भुजंगा ॥', en: 'Tuṣārādri saṅkāśa gauraṁ gabhīraṁ\nManobhūta koṭiprabhā śrī śarīram,\nSphuranmauli kallōlinī chāru Gaṅgā\nLasadbhālabālendu kaṇṭhe bhujaṅgā.' },
        { dev: 'चलत्कुण्डलं भ्रू सुनेत्रं विशालं\nप्रसन्नाननं नीलकण्ठं दयालम् ।\nमृगाधीशचर्माम्बरं मुण्डमालं\nप्रियं शंकरं सर्वनाथं भजामि ॥', en: 'Chalatkuṇḍalaṁ bhrū sunetraṁ viśālaṁ\nPrasannānanaṁ nīlakaṇṭhaṁ dayālam,\nMṛgādhīśacharmāmbaraṁ muṇḍamālaṁ\nPriyaṁ Śaṅkaraṁ sarvanāthaṁ bhajāmi.' },
        { dev: 'प्रचण्डं प्रकृष्टं प्रगल्भं परेशं\nअखण्डं अजं भानुकोटिप्रकाशम् ।\nत्रयः शूलनिर्मूलनं शूलपाणिं\nभजेऽहं भवानीपतिं भावगम्यम् ॥', en: 'Prachaṇḍaṁ prakṛṣṭaṁ pragalbhaṁ pareśaṁ\nAkhaṇḍaṁ ajaṁ bhānukoṭiprakāśam,\nTrayaḥ śūlanirmūlanaṁ śūlapāṇiṁ\nBhaje\'haṁ Bhavānīpatiṁ bhāvagamyam.' },
        { dev: 'कलातीत कल्याण कल्पान्तकारी\nसदा सज्जनानन्ददाता पुरारी ।\nचिदानन्दसंदोह मोहापहारी\nप्रसीद प्रसीद प्रभो मन्मथारी ॥', en: 'Kalātīta kalyāṇa kalpāntakārī\nSadā sajjanānandadātā Purārī,\nChidānandasandoha mohāpahārī\nPrasīda prasīda Prabho manmathārī.' },
        { dev: 'न यावद् उमानाथ पादारविन्दं\nभजन्तीह लोके परे वा नराणाम् ।\nन तावत्सुखं शान्ति सन्तापनाशं\nप्रसीद प्रभो सर्वभूताधिवासम् ॥', en: 'Na yāvad Umānātha pādāravindaṁ\nBhajantīha loke pare vā narāṇām,\nNa tāvatsukhaṁ śānti santāpanāśaṁ\nPrasīda Prabho sarvabhūtādhivāsam.' },
        { dev: 'न जानामि योगं जपं नैव पूजां\nनतोऽहं सदा सर्वदा शम्भु तुभ्यम् ।\nजरा जन्म दुःखौघ तातप्यमानं\nप्रभो पाहि आपन्नमामीश शम्भो ॥', en: 'Na jānāmi yogaṁ japaṁ naiva pūjāṁ\nNato\'haṁ sadā sarvadā Śambhu tubhyam,\nJarā janma duḥkhaugha tātapyamānaṁ\nPrabho pāhi āpannamāmīśa Śambho.' }
      ]
    },

    /* ==================================================================
       LORD VISHNU
       ================================================================== */
    {
      id: 'vishnu-chalisa',
      name: 'Vishnu Chalisa',
      nameDev: 'विष्णु चालीसा',
      deity: 'vishnu',
      deityName: 'Lord Vishnu',
      deityDev: 'विष्णु',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'श्री हरि विष्णु कृपालु दयालु ।\nदुष्ट दलन भय भंजन कालु ॥', en: 'Śrī Hari Viṣṇu kṛpālu dayālu,\nDuṣṭa dalana bhaya bhaṁjana kālu.' },
        { dev: 'जय जय विष्णु लक्ष्मी रमणा ।\nशरणागत सुख भव भय हरणा ॥', en: 'Jaya jaya Viṣṇu Lakṣmī Ramaṇā,\nŚaraṇāgata sukha bhava bhaya haraṇā.' },
        { dev: 'सिंधु सुता प्रिय संग सोहावै ।\nचारों धाम तुम्हें सुख पावै ॥', en: 'Sindhu sutā priya saṅga sohāvai,\nChāroṁ dhāma tumheṁ sukha pāvai.' },
        { dev: 'शेषनाग पर शयन तुम्हारा ।\nकरत सदा भक्तन प्रतिपारा ॥', en: 'Śeṣanāga para śayana tumhārā,\nKarata sadā bhaktana pratipārā.' },
        { dev: 'ब्रह्मा रुद्र सनातन देवा ।\nतव गुण गावत करत सदा सेवा ॥', en: 'Brahmā Rudra sanātana devā,\nTava guṇa gāvata karata sadā sevā.' },
        { dev: 'कृपा दृष्टि नर पर जब कीजै ।\nदुष्टन दूर करो बल दीजै ॥', en: 'Kṛpā dṛṣṭi nara para jaba kījai,\nDuṣṭana dūra karo bala dījai.' }
      ]
    },
    {
      id: 'vishnu-stuti',
      name: 'Vishnu Stuti',
      nameDev: 'विष्णु स्तुति',
      deity: 'vishnu',
      deityName: 'Lord Vishnu',
      deityDev: 'विष्णु',
      type: 'stuti',
      verses: [
        { dev: 'शान्ताकारं भुजगशयनं पद्मनाभं सुरेशं\nविश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम् ।\nलक्ष्मीकान्तं कमलनयनं योगिभिर्ध्यानगम्यं\nवन्दे विष्णुं भवभयहरं सर्वलोकैकनाथम् ॥', en: 'Śāntākāraṁ bhujagaśayanaṁ padmanābhaṁ sureśaṁ\nViśvādhāraṁ gaganasadṛśaṁ meghavarṇaṁ śubhāṅgam,\nLakṣmīkāntaṁ kamalanayanaṁ yogibhirdhyānagamyaṁ\nVande Viṣṇuṁ bhavabhayaharaṁ sarvalokaikanātham.' }
      ]
    },

    /* ==================================================================
       LORD KRISHNA
       ================================================================== */
    {
      id: 'krishna-chalisa',
      name: 'Krishna Chalisa',
      nameDev: 'कृष्ण चालीसा',
      deity: 'krishna',
      deityName: 'Lord Krishna',
      deityDev: 'कृष्ण',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'बांके बिहारी कृपालु, श्याम कृष्ण भगवान ।\nजय द्वारिकाधीश प्रभु, सबके करो कल्याण ॥', en: 'Bāṅke Bihārī kṛpālu, Śyāma Kṛṣṇa Bhagavāna,\nJaya Dvārikādhīśa Prabhu, sabake karo kalyāṇa.' },
        { dev: 'जय यशोदा के लाल प्रभु, नंद के आनंद ।\nब्रज में रास रचाइया, मुरली मनोहर चंद ॥', en: 'Jaya Yaśodā ke lāla Prabhu, Nanda ke ānanda,\nBraja meṁ rāsa rachāiyā, muralī manohara chanda.' },
        { dev: 'गोपियों संग खेल रचायो ।\nरासलीला में मन ललचायो ॥', en: 'Gopiyoṁ saṅga khela rachāyo,\nRāsalīlā meṁ mana lalachāyo.' },
        { dev: 'माखन चोरी तुमने कीन्हा ।\nउद्धव को ज्ञान संदेश दीन्हा ॥', en: 'Mākhana chorī tumane kīnhā,\nUddhava ko gyāna sandeśa dīnhā.' },
        { dev: 'कंस वध प्रभु तुमने कीना ।\nदीन दयालु जगत को दीना ॥', en: 'Kaṁsa vadha Prabhu tumane kīnā,\nDīna dayālu jagata ko dīnā.' },
        { dev: 'अर्जुन को गीता सुनाई ।\nकर्मयोग की राह दिखाई ॥', en: 'Arjuna ko Gītā sunāī,\nKarmayoga kī rāha dikhāī.' }
      ]
    },
    {
      id: 'madhurashtakam',
      name: 'Madhurashtakam',
      nameDev: 'मधुराष्टकम्',
      deity: 'krishna',
      deityName: 'Lord Krishna',
      deityDev: 'कृष्ण',
      type: 'stotra',
      verses: [
        { dev: 'अधरं मधुरं वदनं मधुरं\nनयनं मधुरं हसितं मधुरम् ।\nहृदयं मधुरं गमनं मधुरं\nमधुराधिपतेरखिलं मधुरम् ॥', en: 'Adharaṁ madhuraṁ vadanaṁ madhuraṁ\nNayanaṁ madhuraṁ hasitaṁ madhuram,\nHṛdayaṁ madhuraṁ gamanaṁ madhuraṁ\nMadhurādhipaterakhilaṁ madhuram.' },
        { dev: 'वचनं मधुरं चरितं मधुरं\nवसनं मधुरं वलितं मधुरम् ।\nचलितं मधुरं भ्रमितं मधुरं\nमधुराधिपतेरखिलं मधुरम् ॥', en: 'Vachanaṁ madhuraṁ charitaṁ madhuraṁ\nVasanaṁ madhuraṁ valitaṁ madhuram,\nChalitaṁ madhuraṁ bhramitaṁ madhuraṁ\nMadhurādhipaterakhilaṁ madhuram.' },
        { dev: 'वेणुर्मधुरो रेणुर्मधुरः\nपाणिर्मधुरः पादौ मधुरौ ।\nनृत्यं मधुरं सख्यं मधुरं\nमधुराधिपतेरखिलं मधुरम् ॥', en: 'Veṇurmadhuro reṇurmadhuraḥ\nPāṇirmadhuraḥ pādau madhurau,\nNṛtyaṁ madhuraṁ sakhyaṁ madhuraṁ\nMadhurādhipaterakhilaṁ madhuram.' },
        { dev: 'गीतं मधुरं पीतं मधुरं\nभुक्तं मधुरं सुप्तं मधुरम् ।\nरूपं मधुरं तिलकं मधुरं\nमधुराधिपतेरखिलं मधुरम् ॥', en: 'Gītaṁ madhuraṁ pītaṁ madhuraṁ\nBhuktaṁ madhuraṁ suptaṁ madhuram,\nRūpaṁ madhuraṁ tilakaṁ madhuraṁ\nMadhurādhipaterakhilaṁ madhuram.' },
        { dev: 'करणं मधुरं तरणं मधुरं\nहरणं मधुरं स्मरणं मधुरम् ।\nवमितं मधुरं शमितं मधुरं\nमधुराधिपतेरखिलं मधुरम् ॥', en: 'Karaṇaṁ madhuraṁ taraṇaṁ madhuraṁ\nHaraṇaṁ madhuraṁ smaraṇaṁ madhuram,\nVamitaṁ madhuraṁ śamitaṁ madhuraṁ\nMadhurādhipaterakhilaṁ madhuram.' }
      ]
    },
    {
      id: 'achyutashtakam',
      name: 'Achyutashtakam',
      nameDev: 'अच्युताष्टकम्',
      deity: 'krishna',
      deityName: 'Lord Krishna',
      deityDev: 'कृष्ण',
      type: 'stotra',
      verses: [
        { dev: 'अच्युतं केशवं रामनारायणं\nकृष्णदामोदरं वासुदेवं हरिम् ।\nश्रीधरं माधवं गोपिकावल्लभं\nजानकीनायकं रामचन्द्रं भजे ॥', en: 'Achyutaṁ Keśavaṁ Rāmanārāyaṇaṁ\nKṛṣṇaDāmodaraṁ Vāsudevaṁ Harim,\nŚrīdharaṁ Mādhavaṁ Gopikāvallabhaṁ\nJānakīnāyakaṁ Rāmachandraṁ bhaje.' },
        { dev: 'अच्युतं केशवं सत्यभामाधवं\nमाधवं श्रीधरं राधिकाराधितम् ।\nइन्दिरामन्दिरं चेतसा सुन्दरं\nदेवकीनन्दनं नन्दजं सन्दधे ॥', en: 'Achyutaṁ Keśavaṁ Satyabhāmādhavaṁ\nMādhavaṁ Śrīdharaṁ Rādhikārādhitam,\nIndirāmandiraṁ chetasā sundaraṁ\nDevakīnandanaṁ Nandajaṁ sandadhe.' }
      ]
    },

    /* ==================================================================
       LORD RAMA
       ================================================================== */
    {
      id: 'ram-chalisa',
      name: 'Ram Chalisa',
      nameDev: 'राम चालीसा',
      deity: 'rama',
      deityName: 'Lord Rama',
      deityDev: 'राम',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'श्री रघुबीर प्रताप ते, सिंधु तरे पाषान ।\nतुलसी ममता राम गुन, लुटत नित्य नव जान ॥', en: 'Śrī Raghubīra pratāpa te, sindhu tare pāṣāna,\nTulasī mamatā Rāma guna, luṭata nitya nava jāna.' },
        { dev: 'जय राम रूप अनूप राजीव नयन ।\nसीता हरण हरि राज दशरथ नंदन ॥', en: 'Jaya Rāma rūpa anūpa rājīva nayana,\nSītā haraṇa Hari Rāja Daśaratha Nandana.' },
        { dev: 'कौशल्या सुत राम दशरथ के प्यारे ।\nताड़का मारि सुबाहु संग दुष्ट संहारे ॥', en: 'Kausalyā suta Rāma Daśaratha ke pyāre,\nTāḍakā māri Subāhu saṅga duṣṭa saṁhāre.' },
        { dev: 'गौतम नारि तारन प्रभु जनक दुलारी ।\nसीता स्वयंवर जीत प्रभु धनुष तोड़ भारी ॥', en: 'Gautama nāri tāraṇa Prabhu Janaka dulārī,\nSītā svayaṁvara jīta Prabhu dhanuṣa toḍa bhārī.' },
        { dev: 'बनवास चौदह बरस लखन सिय संगा ।\nगीध मरन मुक्ति दई प्रभु सुग्रीव के अंगा ॥', en: 'Banavāsa chaudaha barasa Lakhana Siya saṅgā,\nGīdha marana mukti daī Prabhu Sugrīva ke aṅgā.' },
        { dev: 'हनुमान मिलाय सेतु बंधवायो ।\nरावण मारि राज सिंहासन पायो ॥', en: 'Hanumāna milāya setu bandhavāyo,\nRāvaṇa māri rāja siṁhāsana pāyo.' }
      ]
    },
    {
      id: 'ram-raksha',
      name: 'Ram Raksha Stotra',
      nameDev: 'राम रक्षा स्तोत्रम्',
      deity: 'rama',
      deityName: 'Lord Rama',
      deityDev: 'राम',
      type: 'stotra',
      verses: [
        { dev: 'ॐ अस्य श्रीरामरक्षास्तोत्रमन्त्रस्य\nबुधकौशिक ऋषिः ।\nश्रीसीतारामचन्द्रो देवता ।\nअनुष्टुप् छन्दः ।\nसीता शक्तिः ।\nश्रीमद्हनुमान् कीलकम् ।\nश्रीरामचन्द्रप्रीत्यर्थे रामरक्षास्तोत्रजपे विनियोगः ॥', en: 'Om asya Śrīrāmarakṣāstotramantrasya\nBudhakauśika ṛṣiḥ,\nŚrīSītārāmachandro devatā,\nAnuṣṭup chandaḥ,\nSītā śaktiḥ,\nŚrīmadHanumān kīlakam,\nŚrīRāmachandraprītyarthe rāmarakṣāstotrajape viniyogaḥ.' },
        { dev: 'चरितं रघुनाथस्य शतकोटिप्रविस्तरम् ।\nएकैकमक्षरं पुंसां महापातकनाशनम् ॥', en: 'Charitaṁ Raghunāthasya śatakoṭipravistaram,\nEkaikamakṣaraṁ puṁsāṁ mahāpātakanāśanam.' },
        { dev: 'ध्यात्वा नीलोत्पलश्यामं रामं राजीवलोचनम् ।\nजानकीलक्ष्मणोपेतं जटामुकुटमण्डितम् ॥', en: 'Dhyātvā nīlotpalaśyāmaṁ Rāmaṁ rājīvalochanam,\nJānakīLakṣmaṇopetaṁ jaṭāmukuṭamaṇḍitam.' },
        { dev: 'रामो राजमणिः सदा विजयते रामं रमेशं भजे\nरामेणाभिहता निशाचरचमू रामाय तस्मै नमः ।\nरामान्नास्ति परायणं परतरं रामस्य दासोस्म्यहं\nरामे चित्तलयः सदा भवतु मे भो राम मामुद्धर ॥', en: 'Rāmo rājamaṇiḥ sadā vijayate Rāmaṁ Rameśaṁ bhaje\nRāmeṇābhihatā niśācharachamū Rāmāya tasmai namaḥ,\nRāmānnāsti parāyaṇaṁ parataraṁ Rāmasya dāsosmy\'ahaṁ\nRāme chittalayaḥ sadā bhavatu me bho Rāma māmuddhra.' }
      ]
    },
    {
      id: 'ram-stuti',
      name: 'Shri Ram Stuti',
      nameDev: 'श्री राम स्तुति',
      deity: 'rama',
      deityName: 'Lord Rama',
      deityDev: 'राम',
      type: 'stuti',
      verses: [
        { dev: 'श्री रामचन्द्र कृपालु भजु मन हरण भवभय दारुणम् ।\nनवकंज लोचन कंज मुख कर कंज पद कंजारुणम् ॥', en: 'Śrī Rāmachandra kṛpālu bhaju mana haraṇa bhavabhaya dāruṇam,\nNavakanja lochana kanja mukha kara kanja pada kanjāruṇam.' },
        { dev: 'कन्दर्प अगणित अमित छवि नव नील नीरद सुन्दरम् ।\nपट पीत मानहुँ तडित रुचि शुचि नौमि जनक सुतावरम् ॥', en: 'Kandarpa agaṇita amita chhavi nava nīla nīrada sundaram,\nPaṭa pīta mānahuṁ taḍita ruchi śuchi naumi Janaka sutāvaram.' },
        { dev: 'भजु दीनबन्धु दिनेश दानव दैत्य वंश निकन्दनम् ।\nरघुनन्द आनन्दकन्द कोशलचन्द दशरथ नन्दनम् ॥', en: 'Bhaju dīnabandhu dineśa dānava daitya vaṁśa nikandanam,\nRaghunanda ānandakanda Kośalachanda Daśaratha nandanam.' }
      ]
    },

    /* ==================================================================
       LORD GANESHA
       ================================================================== */
    {
      id: 'ganesh-atharvashirsha',
      name: 'Ganesh Atharvashirsha',
      nameDev: 'गणेश अथर्वशीर्ष',
      deity: 'ganesha',
      deityName: 'Lord Ganesha',
      deityDev: 'गणेश',
      type: 'stotra',
      verses: [
        { dev: 'ॐ भद्रं कर्णेभिः शृणुयाम देवाः ।\nभद्रं पश्येमाक्षभिर्यजत्राः ।\nस्थिरैरंगैस्तुष्टुवांसस्तनूभिः ।\nव्यशेम देवहितं यदायुः ॥', en: 'Om bhadraṁ karṇebhiḥ śṛṇuyāma devāḥ,\nBhadraṁ paśyemākṣabhiryajatrāḥ,\nSthirairangaistuṣṭuvāṁsastanūbhiḥ,\nVyaśema devahitaṁ yadāyuḥ.' },
        { dev: 'ॐ नमस्ते गणपतये ।\nत्वमेव प्रत्यक्षं तत्त्वमसि ।\nत्वमेव केवलं कर्तासि ।\nत्वमेव केवलं धर्तासि ।\nत्वमेव केवलं हर्तासि ।\nत्वमेव सर्वं खल्विदं ब्रह्मासि ।\nत्वं साक्षादात्मासि नित्यम् ॥', en: 'Om namaste Gaṇapataye,\nTvameva pratyakṣaṁ tattvamasi,\nTvameva kevalaṁ kartāsi,\nTvameva kevalaṁ dhartāsi,\nTvameva kevalaṁ hartāsi,\nTvameva sarvaṁ khalvidaṁ brahmāsi,\nTvaṁ sākṣādātmāsi nityam.' },
        { dev: 'ऋतं वच्मि । सत्यं वच्मि ।\nअव त्वं माम् । अव वक्तारम् ।\nअव श्रोतारम् । अव दातारम् ।\nअव धातारम् । अवानूचानमव शिष्यम् ॥', en: 'Ṛtaṁ vachmi, Satyaṁ vachmi,\nAva tvaṁ mām, Ava vaktāram,\nAva śrotāram, Ava dātāram,\nAva dhātāram, Avānūchānamava śiṣyam.' },
        { dev: 'त्वं वाङ्मयस्त्वं चिन्मयः ।\nत्वमानन्दमयस्त्वं ब्रह्ममयः ।\nत्वं सच्चिदानन्दाद्वितीयोऽसि ।\nत्वं प्रत्यक्षं ब्रह्मासि ।\nत्वं ज्ञानमयो विज्ञानमयोऽसि ॥', en: 'Tvaṁ vāṅmayastvaṁ chinmayaḥ,\nTvamānandamayastvaṁ brahmamayaḥ,\nTvaṁ sachchidānandādvitīyo\'si,\nTvaṁ pratyakṣaṁ brahmāsi,\nTvaṁ jñānamayo vijñānamayo\'si.' }
      ]
    },
    {
      id: 'ganesh-chalisa',
      name: 'Ganesh Chalisa',
      nameDev: 'गणेश चालीसा',
      deity: 'ganesha',
      deityName: 'Lord Ganesha',
      deityDev: 'गणेश',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'जय गणपति सदगुणसदन, कविवर बदन कृपाल ।\nविघ्न हरण मंगल करण, जय जय गिरिजालाल ॥', en: 'Jaya Gaṇapati sadaguṇasadana, kavivara badana kṛpāla,\nVighna haraṇa maṅgala karaṇa, jaya jaya Girijālāla.' },
        { dev: 'जय जय जय गणपति गणराजू ।\nमंगल भरण करण शुभ काजू ॥', en: 'Jaya jaya jaya Gaṇapati Gaṇarājū,\nMaṅgala bharaṇa karaṇa śubha kājū.' },
        { dev: 'जय गजबदन सदन सुखदाता ।\nविश्व विनायक बुद्धि विधाता ॥', en: 'Jaya Gajabadana sadana sukhadātā,\nViśva Vināyaka buddhi vidhātā.' },
        { dev: 'वक्रतुण्ड महाकाय कोटि सूर्य समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥', en: 'Vakratuṇḍa mahākāya koṭi sūrya samaprabha,\nNirvighnaṁ kuru me deva sarvakāryeṣu sarvadā.' }
      ]
    },
    {
      id: 'sankat-nashan',
      name: 'Sankat Nashan Ganesh Stotra',
      nameDev: 'संकटनाशन गणेश स्तोत्र',
      deity: 'ganesha',
      deityName: 'Lord Ganesha',
      deityDev: 'गणेश',
      type: 'stotra',
      verses: [
        { dev: 'प्रणम्य शिरसा देवं गौरीपुत्रं विनायकम् ।\nभक्तावासं स्मरेन्नित्यमायुःकामार्थसिद्धये ॥', en: 'Praṇamya śirasā devaṁ Gaurīputraṁ Vināyakam,\nBhaktāvāsaṁ smarennityamāyuḥkāmārthasiddhaye.' },
        { dev: 'प्रथमं वक्रतुण्डं च एकदन्तं द्वितीयकम् ।\nतृतीयं कृष्णपिंगाक्षं गजवक्त्रं चतुर्थकम् ॥', en: 'Prathamaṁ Vakratuṇḍaṁ cha Ekadantaṁ dvitīyakam,\nTṛtīyaṁ Kṛṣṇapiṅgākṣaṁ Gajavaktraṁ chaturthakam.' },
        { dev: 'लम्बोदरं पञ्चमं च षष्ठं विकटमेव च ।\nसप्तमं विघ्नराजेन्द्रं धूम्रवर्णं तथाष्टमम् ॥', en: 'Lambodaraṁ pañchamaṁ cha ṣaṣṭhaṁ Vikaṭameva cha,\nSaptamaṁ Vighnarājendraṁ Dhūmravarṇaṁ tathāṣṭamam.' },
        { dev: 'नवमं भालचन्द्रं च दशमं तु विनायकम् ।\nएकादशं गणपतिं द्वादशं तु गजाननम् ॥', en: 'Navamaṁ Bhālachandraṁ cha daśamaṁ tu Vināyakam,\nEkādaśaṁ Gaṇapatiṁ dvādaśaṁ tu Gajānanam.' },
        { dev: 'द्वादशैतानि नामानि त्रिसन्ध्यं यः पठेन्नरः ।\nन च विघ्नभयं तस्य सर्वसिद्धिकरं प्रभो ॥', en: 'Dvādaśaitāni nāmāni trisandhyaṁ yaḥ paṭhennaraḥ,\nNa cha vighnabhayaṁ tasya sarvasiddhikaraṁ Prabho.' }
      ]
    },

    /* ==================================================================
       GODDESS DURGA
       ================================================================== */
    {
      id: 'durga-chalisa',
      name: 'Durga Chalisa',
      nameDev: 'दुर्गा चालीसा',
      deity: 'durga',
      deityName: 'Goddess Durga',
      deityDev: 'दुर्गा',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'नमो नमो दुर्गे सुख करनी ।\nनमो नमो अम्बे दुख हरनी ॥', en: 'Namo namo Durge sukha karanī,\nNamo namo Ambe dukha haranī.' },
        { dev: 'निरंकार है ज्योति तुम्हारी ।\nतिहूँ लोक फैली उजियारी ॥', en: 'Niraṅkāra hai jyoti tumhārī,\nTihūṁ loka phailī ujiyārī.' },
        { dev: 'शशि ललाट मुख महाविशाला ।\nनेत्र लाल भृकुटी विकराला ॥', en: 'Śaśi lalāṭa mukha mahāviśālā,\nNetra lāla bhṛkuṭī vikarālā.' },
        { dev: 'रूप मातु को अधिक सुहावे ।\nदरश करत जन अति सुख पावे ॥', en: 'Rūpa mātu ko adhika suhāve,\nDarasha karata jana ati sukha pāve.' },
        { dev: 'तुम संसार शक्ति लय कीना ।\nतिहूँ लोक में बल न तीना ॥', en: 'Tuma saṁsāra śakti laya kīnā,\nTihūṁ loka meṁ bala na tīnā.' },
        { dev: 'प्रतिपालत है जग को माता ।\nमहिषासुर की सुता विधाता ॥', en: 'Pratipālata hai jaga ko mātā,\nMahiṣāsura kī sutā vidhātā.' },
        { dev: 'सिंहासन पर विराजत रानी ।\nत्रिवर चीर फहरे नम्र ज्वानी ॥', en: 'Siṁhāsana para virājata rānī,\nTrivara chīra phahare namra jvānī.' },
        { dev: 'नमो नमो जगत माता ।\nनमो नमो जय दुर्गा दाता ॥', en: 'Namo namo jagata mātā,\nNamo namo jaya Durgā dātā.' }
      ]
    },
    {
      id: 'argala',
      name: 'Argala Stotram',
      nameDev: 'अर्गला स्तोत्रम्',
      deity: 'durga',
      deityName: 'Goddess Durga',
      deityDev: 'दुर्गा',
      type: 'stotra',
      verses: [
        { dev: 'ॐ जय त्वं देवि चामुण्डे जय भूतापहारिणि ।\nजय सर्वगते देवि कालरात्रि नमोऽस्तु ते ॥', en: 'Om jaya tvaṁ Devi Chāmuṇḍe jaya bhūtāpahāriṇi,\nJaya sarvagate Devi Kālarātri namo\'stu te.' },
        { dev: 'जयन्ती मंगला काली भद्रकाली कपालिनी ।\nदुर्गा क्षमा शिवा धात्री स्वाहा स्वधा नमोऽस्तु ते ॥', en: 'Jayantī Maṅgalā Kālī Bhadrakālī Kapālinī,\nDurgā Kṣamā Śivā Dhātrī Svāhā Svadhā namo\'stu te.' },
        { dev: 'मधुकैटभविध्वंसि विधातृवरदे नमः ।\nरूपं देहि जयं देहि यशो देहि द्विषो जहि ॥', en: 'Madhukaiṭabhavidhvaṁsi vidhātṛvarade namaḥ,\nRūpaṁ dehi jayaṁ dehi yaśo dehi dviṣo jahi.' },
        { dev: 'महिषासुरनिर्नाशि भक्तानां सुखदे नमः ।\nरूपं देहि जयं देहि यशो देहि द्विषो जहि ॥', en: 'Mahiṣāsuranirṇāśi bhaktānāṁ sukhade namaḥ,\nRūpaṁ dehi jayaṁ dehi yaśo dehi dviṣo jahi.' }
      ]
    },

    /* ==================================================================
       GODDESS LAKSHMI
       ================================================================== */
    {
      id: 'lakshmi-chalisa',
      name: 'Lakshmi Chalisa',
      nameDev: 'लक्ष्मी चालीसा',
      deity: 'lakshmi',
      deityName: 'Goddess Lakshmi',
      deityDev: 'लक्ष्मी',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'मातु लक्ष्मी करि कृपा, करो हृदय में वास ।\nमनोकामना सिद्ध करो, पूरण करो मम आस ॥', en: 'Mātu Lakṣmī kari kṛpā, karo hṛdaya meṁ vāsa,\nManokāmanā siddha karo, pūraṇa karo mama āsa.' },
        { dev: 'सिन्धु सुता मैं सुमिरौं तोही ।\nकृपा करो जगदम्बा मोही ॥', en: 'Sindhu sutā maiṁ sumirauṁ tohī,\nKṛpā karo Jagadambā mohī.' },
        { dev: 'क्षीर सिन्धु जब विष्णु मथायो ।\nचौदह रतन सिन्धु में पायो ॥', en: 'Kṣīra sindhu jaba Viṣṇu mathāyo,\nChaudaha ratana sindhu meṁ pāyo.' },
        { dev: 'चौदह रतन में तुम सुखरासी ।\nसेवा कियो प्रभु बने बिलासी ॥', en: 'Chaudaha ratana meṁ tuma sukharāsī,\nSevā kiyo Prabhu bane bilāsī.' },
        { dev: 'जिस घर तुम रहतीं तिस में हैं ।\nसदगुण धर्म सभी सुख लहैं ॥', en: 'Jisa ghara tuma rahatīṁ tisa meṁ haiṁ,\nSadaguṇa dharma sabhī sukha lahaiṁ.' }
      ]
    },
    {
      id: 'shri-suktam',
      name: 'Shri Suktam',
      nameDev: 'श्री सूक्तम्',
      deity: 'lakshmi',
      deityName: 'Goddess Lakshmi',
      deityDev: 'लक्ष्मी',
      type: 'stotra',
      verses: [
        { dev: 'ॐ हिरण्यवर्णां हरिणीं सुवर्णरजतस्रजाम् ।\nचन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह ॥', en: 'Om Hiraṇyavarṇāṁ hariṇīṁ suvarṇarajatasrajām,\nChandrāṁ hiraṇmayīṁ Lakṣmīṁ jātavedo ma āvaha.' },
        { dev: 'तां म आवह जातवेदो लक्ष्मीमनपगामिनीम् ।\nयस्यां हिरण्यं विन्देयं गामश्वं पुरुषानहम् ॥', en: 'Tāṁ ma āvaha jātavedo Lakṣmīmanapagāminīm,\nYasyāṁ hiraṇyaṁ vindeyaṁ gāmaśvaṁ puruṣānaham.' },
        { dev: 'अश्वपूर्वां रथमध्यां हस्तिनादप्रबोधिनीम् ।\nश्रियं देवीमुपह्वये श्रीर्मा देवी जुषताम् ॥', en: 'Aśvapūrvāṁ rathamadhyāṁ hastinādaprabodhinīm,\nŚriyaṁ Devīmupahvaye Śrīrmā Devī juṣatām.' }
      ]
    },
    {
      id: 'mahalakshmi-ashtakam',
      name: 'Mahalakshmi Ashtakam',
      nameDev: 'महालक्ष्मी अष्टकम्',
      deity: 'lakshmi',
      deityName: 'Goddess Lakshmi',
      deityDev: 'लक्ष्मी',
      type: 'stotra',
      verses: [
        { dev: 'नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते ।\nशंखचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते ॥', en: 'Namaste\'stu Mahāmāye Śrīpīṭhe surapūjite,\nŚaṅkhachakragadāhaste Mahālakṣmi namo\'stu te.' },
        { dev: 'नमस्ते गरुडारूढे कोलासुरभयंकरि ।\nसर्वपापहरे देवि महालक्ष्मि नमोऽस्तु ते ॥', en: 'Namaste Garuḍārūḍhe Kolāsurabhayaṁkari,\nSarvapāpahare Devi Mahālakṣmi namo\'stu te.' },
        { dev: 'सर्वज्ञे सर्ववरदे सर्वदुष्टभयंकरि ।\nसर्वदुःखहरे देवि महालक्ष्मि नमोऽस्तु ते ॥', en: 'Sarvajñe sarvavarade sarvaduṣṭabhayaṁkari,\nSarvaduḥkhahare Devi Mahālakṣmi namo\'stu te.' },
        { dev: 'सिद्धिबुद्धिप्रदे देवि भुक्तिमुक्तिप्रदायिनि ।\nमन्त्रमूर्ते सदा देवि महालक्ष्मि नमोऽस्तु ते ॥', en: 'Siddhibuddhiprade Devi bhuktimuktipradāyini,\nMantramūrte sadā Devi Mahālakṣmi namo\'stu te.' }
      ]
    },

    /* ==================================================================
       GODDESS SARASWATI
       ================================================================== */
    {
      id: 'saraswati-vandana',
      name: 'Saraswati Vandana',
      nameDev: 'सरस्वती वंदना',
      deity: 'saraswati',
      deityName: 'Goddess Saraswati',
      deityDev: 'सरस्वती',
      type: 'stotra',
      verses: [
        { dev: 'या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता\nया वीणावरदण्डमण्डितकरा या श्वेतपद्मासना ।\nया ब्रह्माच्युतशंकरप्रभृतिभिर्देवैः सदा पूजिता\nसा मां पातु सरस्वती भगवती निःशेषजाड्यापहा ॥', en: 'Yā kundendutuṣārahāradhavalā yā śubhravastrāvṛtā\nYā vīṇāvaradaṇḍamaṇḍitakarā yā śvetapadmāsanā,\nYā Brahmāchyutaśaṅkaraprabhṛtibhirdevaiḥ sadā pūjitā\nSā māṁ pātu Sarasvatī Bhagavatī niḥśeṣajāḍyāpahā.' },
        { dev: 'शुक्लां ब्रह्मविचारसारपरमामाद्यां जगद्व्यापिनीं\nवीणापुस्तकधारिणीमभयदां जाड्यान्धकारापहाम् ।\nहस्ते स्फाटिकमालिकां विदधतीं पद्मासने संस्थितां\nवन्दे तां परमेश्वरीं भगवतीं बुद्धिप्रदां शारदाम् ॥', en: 'Śuklāṁ Brahmavichārasāraparamāmādyāṁ jagadvyāpinīṁ\nVīṇāpustakadariṇīmabhayadāṁ jāḍyāndhakārāpahām,\nHaste sphāṭikamālikāṁ vidadhatīṁ padmāsane saṁsthitāṁ\nVande tāṁ Parameśvarīṁ Bhagavatīṁ buddhipradāṁ Śāradām.' }
      ]
    },
    {
      id: 'saraswati-stotram',
      name: 'Saraswati Stotram',
      nameDev: 'सरस्वती स्तोत्रम्',
      deity: 'saraswati',
      deityName: 'Goddess Saraswati',
      deityDev: 'सरस्वती',
      type: 'stotra',
      verses: [
        { dev: 'सरस्वति नमस्तुभ्यं वरदे कामरूपिणि ।\nविद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा ॥', en: 'Sarasvatī namastubhyaṁ varade kāmarūpiṇi,\nVidyārambhaṁ kariṣyāmi siddhirbhavatu me sadā.' },
        { dev: 'पद्मपत्रविशालाक्षी पद्मकेसरवर्णिनी ।\nनित्यं पद्मालया देवी सा मां पातु सरस्वती ॥', en: 'Padmapatraviśālākṣī padmakesaravarṇinī,\nNityaṁ padmālayā Devī sā māṁ pātu Sarasvatī.' }
      ]
    },

    /* ==================================================================
       GODDESS KALI
       ================================================================== */
    {
      id: 'kali-chalisa',
      name: 'Kali Chalisa',
      nameDev: 'काली चालीसा',
      deity: 'kali',
      deityName: 'Goddess Kali',
      deityDev: 'काली',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'ॐ जय महाकाली माता, जय जय दुर्गा माय ।\nरक्तबीज वध कीजो माता, भक्तन को सुख दाय ॥', en: 'Om jaya Mahākālī mātā, jaya jaya Durgā māya,\nRaktabīja vadha kījo mātā, bhaktana ko sukha dāya.' },
        { dev: 'कालिका माता शुभ करनी ।\nदुष्ट दलन दुख दारिद हरनी ॥', en: 'Kālikā mātā śubha karanī,\nDuṣṭa dalana dukha dārida haranī.' },
        { dev: 'रक्तबीज को तुमने मारा ।\nशुम्भ निशुम्भ को संहारा ॥', en: 'Raktabīja ko tumane mārā,\nŚumbha Niśumbha ko saṁhārā.' },
        { dev: 'महिषासुर जब अति अभिमानी ।\nतब माता तुम भई भवानी ॥', en: 'Mahiṣāsura jaba ati abhimānī,\nTaba mātā tuma bhaī Bhavānī.' }
      ]
    },
    {
      id: 'kali-kavacham',
      name: 'Kali Kavacham',
      nameDev: 'काली कवचम्',
      deity: 'kali',
      deityName: 'Goddess Kali',
      deityDev: 'काली',
      type: 'stotra',
      verses: [
        { dev: 'ॐ ह्रीं काल्यै नमः ।\nनमः शिवायै सौम्यायै सन्ततायै नमो नमः ।\nनमो देव्यै महादेव्यै शिवायै सततं नमः ॥', en: 'Om hrīṁ Kālyai namaḥ,\nNamaḥ Śivāyai Saumyāyai Santatāyai namo namaḥ,\nNamo Devyai Mahādevyai Śivāyai satataṁ namaḥ.' },
        { dev: 'ॐ काली रक्षतु शीर्षं ह्रीं काली रक्षतु ललाटम् ।\nक्लीं काली रक्षतु मुखं ह्रूं काली रक्षतु हृदयम् ॥', en: 'Om Kālī rakṣatu śīrṣaṁ hrīṁ Kālī rakṣatu lalāṭam,\nKlīṁ Kālī rakṣatu mukhaṁ hrūṁ Kālī rakṣatu hṛdayam.' }
      ]
    },

    /* ==================================================================
       SHANI DEV
       ================================================================== */
    {
      id: 'shani-chalisa',
      name: 'Shani Chalisa',
      nameDev: 'शनि चालीसा',
      deity: 'shani',
      deityName: 'Lord Shani',
      deityDev: 'शनि',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'जय गणेश गिरिजा सुवन, मंगल करण कृपाल ।\nदीनन के दुख हरण करू, शनि देव महाकाल ॥', en: 'Jaya Gaṇeśa Girijā suvana, maṅgala karaṇa kṛpāla,\nDīnana ke dukha haraṇa karū, Śani Deva Mahākāla.' },
        { dev: 'जय जय श्री शनिदेव प्रभु, सुनिये मेरी अर्ज ।\nकरिये कृपा हे कर्मफलदाता, करिये पाप विसर्ज ॥', en: 'Jaya jaya Śrī Śanideva Prabhu, suniye merī arja,\nKariye kṛpā he karmaphaladātā, kariye pāpa visarja.' },
        { dev: 'शनि देव जब प्रसन्न होते ।\nसुख सम्पदा भक्तन को देते ॥', en: 'Śani Deva jaba prasanna hote,\nSukha sampadā bhaktana ko dete.' },
        { dev: 'को नहिं जानत तव महिमा ।\nतव ग्रह गोचर अमित अपरिमा ॥', en: 'Ko nahiṁ jānata tava mahimā,\nTava graha gochara amita aparimā.' }
      ]
    },
    {
      id: 'shani-stotra',
      name: 'Shani Stotra',
      nameDev: 'शनि स्तोत्रम्',
      deity: 'shani',
      deityName: 'Lord Shani',
      deityDev: 'शनि',
      type: 'stotra',
      verses: [
        { dev: 'कोणस्थः पिंगलो बभ्रुः कृष्णो रौद्रोऽन्तको यमः ।\nसौरिः शनैश्चरो मन्दः पिप्पलादेन संस्तुतः ॥', en: 'Koṇasthaḥ piṅgalo babhruḥ Kṛṣṇo Raudro\'ntako Yamaḥ,\nSauriḥ Śanaiścharo Mandaḥ Pippalādena saṁstutaḥ.' },
        { dev: 'नमो नीलमयूखाय नीलोत्पलनिभाय च ।\nनमो निर्माँसदेहाय दीर्घश्मश्रुजटाय च ॥', en: 'Namo nīlamayūkhāya nīlotpala-nibhāya cha,\nNamo nirmāṁsadehāya dīrghaśmaśrujaṭāya cha.' }
      ]
    },

    /* ==================================================================
       SURYA DEV
       ================================================================== */
    {
      id: 'aditya-hridayam',
      name: 'Aditya Hridayam',
      nameDev: 'आदित्य हृदयम्',
      deity: 'surya',
      deityName: 'Surya Dev',
      deityDev: 'सूर्य',
      type: 'stotra',
      verses: [
        { dev: 'ततो युद्धपरिश्रान्तं समरे चिन्तया स्थितम् ।\nरावणं चाग्रतो दृष्ट्वा युद्धाय समुपस्थितम् ॥', en: 'Tato yuddhapariśrāntaṁ samare chintayā sthitam,\nRāvaṇaṁ chāgrato dṛṣṭvā yuddhāya samupasthitam.' },
        { dev: 'दैवतैश्च समागम्य द्रष्टुमभ्यागतो रणम् ।\nउपागम्याब्रवीद्राममगस्त्यो भगवानृषिः ॥', en: 'Daivataiścha samāgamya draṣṭumabhyāgato raṇam,\nUpāgamyābravīdrāmamagastyo bhagavānṛṣiḥ.' },
        { dev: 'राम राम महाबाहो शृणु गुह्यं सनातनम् ।\nयेन सर्वानरीन् वत्स समरे विजयिष्यसि ॥', en: 'Rāma Rāma mahābāho śṛṇu guhyaṁ sanātanam,\nYena sarvānarīn vatsa samare vijayiṣyasi.' },
        { dev: 'आदित्यहृदयं पुण्यं सर्वशत्रुविनाशनम् ।\nजयावहं जपेन्नित्यमक्षय्यं परमं शिवम् ॥', en: 'Ādityahṛdayaṁ puṇyaṁ sarvaśatruvināśanam,\nJayāvahaṁ japennityamakṣayyaṁ paramaṁ śivam.' },
        { dev: 'सर्वमङ्गलमाङ्गल्यं सर्वपापप्रणाशनम् ।\nचिन्ताशोकप्रशमनमायुर्वर्धनमुत्तमम् ॥', en: 'Sarvamaṅgalamāṅgalyaṁ sarvapāpapraṇāśanam,\nChintāśokapraśamanamāyurvardhanamuttamam.' },
        { dev: 'रश्मिमन्तं समुद्यन्तं देवासुरनमस्कृतम् ।\nपूजयस्व विवस्वन्तं भास्करं भुवनेश्वरम् ॥', en: 'Raśmimantaṁ samudyantaṁ devāsuranamaskṛtam,\nPūjayasva Vivasvantaṁ Bhāskaraṁ Bhuvaneśvaram.' }
      ]
    },
    {
      id: 'surya-chalisa',
      name: 'Surya Chalisa',
      nameDev: 'सूर्य चालीसा',
      deity: 'surya',
      deityName: 'Surya Dev',
      deityDev: 'सूर्य',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'कनक बदन कुण्डल मकर, मुकुट शीश पर राज ।\nसूर्य देव की आरती, करिये सब मिल साज ॥', en: 'Kanaka badana kuṇḍala makara, mukuṭa śīśa para rāja,\nSūrya Deva kī āratī, kariye saba mili sāja.' },
        { dev: 'जय सूर्य देव दयानिधान ।\nजय जग तिमिर निवारण भान ॥', en: 'Jaya Sūrya Deva dayānidhāna,\nJaya jaga timira nivāraṇa bhāna.' },
        { dev: 'जय जय रवि जय दिनकर स्वामी ।\nजय जय सूर्य अन्तर्यामी ॥', en: 'Jaya jaya Ravi jaya Dinakara Svāmī,\nJaya jaya Sūrya Antaryāmī.' }
      ]
    },

    /* ==================================================================
       GODDESS TULSI
       ================================================================== */
    {
      id: 'tulsi-chalisa',
      name: 'Tulsi Chalisa',
      nameDev: 'तुलसी चालीसा',
      deity: 'tulsi',
      deityName: 'Goddess Tulsi',
      deityDev: 'तुलसी',
      type: 'chalisa',
      verses: [
        { label: 'Doha', dev: 'श्री तुलसी महारानी, नमो नमो नमो नमः ।\nहरि के प्रिय है तुलसी, सुख सम्पत्ति करो सदा अमः ॥', en: 'Śrī Tulasī Mahārānī, namo namo namo namaḥ,\nHari ke priya hai Tulasī, sukha sampatti karo sadā amaḥ.' },
        { dev: 'तुलसी महिमा कहत न आवै ।\nतुलसी में हरि बसत सुहावै ॥', en: 'Tulasī mahimā kahata na āvai,\nTulasī meṁ Hari basata suhāvai.' },
        { dev: 'विष्णुप्रिया तुलसी रानी ।\nशिव शंकर की प्रेम कहानी ॥', en: 'Viṣṇupriyā Tulasī rānī,\nŚiva Śaṅkara kī prema kahānī.' }
      ]
    },
    {
      id: 'tulsi-stotram',
      name: 'Tulsi Stotram',
      nameDev: 'तुलसी स्तोत्रम्',
      deity: 'tulsi',
      deityName: 'Goddess Tulsi',
      deityDev: 'तुलसी',
      type: 'stotra',
      verses: [
        { dev: 'जगद्धात्रि नमस्तुभ्यं विष्णोश्च प्रियवल्लभे ।\nयतो ब्रह्मादयो देवाः सृष्टिस्थित्यन्तकारिणः ॥', en: 'Jagaddhātri namastubhyaṁ Viṣṇoścha priyavallabhe,\nYato Brahmādayo devāḥ sṛṣṭisthityantakāriṇaḥ.' },
        { dev: 'नमस्तुलसि कल्याणि नमो विष्णुप्रिये शुभे ।\nनमो मोक्षप्रदे देवि नमः सम्पत्प्रदायिनि ॥', en: 'Namastulasi kalyāṇi namo Viṣṇupriye śubhe,\nNamo mokṣaprade Devi namaḥ sampatpradāyini.' }
      ]
    }
  ];

  /* ---- Deity metadata for library page ------------------------------- */
  var DEITIES = [
    { id: 'hanuman', name: 'Hanuman', dev: 'हनुमान', icon: 'ॐ', color: '#c86e30' },
    { id: 'shiva', name: 'Lord Shiva', dev: 'शिव', icon: 'ॐ', color: '#5a7aa0' },
    { id: 'vishnu', name: 'Lord Vishnu', dev: 'विष्णु', icon: 'ॐ', color: '#2e6b8a' },
    { id: 'krishna', name: 'Lord Krishna', dev: 'कृष्ण', icon: 'ॐ', color: '#2b5a9e' },
    { id: 'rama', name: 'Lord Rama', dev: 'राम', icon: 'ॐ', color: '#8b6914' },
    { id: 'ganesha', name: 'Lord Ganesha', dev: 'गणेश', icon: 'ॐ', color: '#d4782f' },
    { id: 'durga', name: 'Goddess Durga', dev: 'दुर्गा', icon: 'ॐ', color: '#b33d3d' },
    { id: 'lakshmi', name: 'Goddess Lakshmi', dev: 'लक्ष्मी', icon: 'ॐ', color: '#b5852f' },
    { id: 'saraswati', name: 'Goddess Saraswati', dev: 'सरस्वती', icon: 'ॐ', color: '#e8e8e8' },
    { id: 'kali', name: 'Goddess Kali', dev: 'काली', icon: 'ॐ', color: '#3d3d5c' },
    { id: 'shani', name: 'Lord Shani', dev: 'शनि', icon: 'ॐ', color: '#2d2d3d' },
    { id: 'surya', name: 'Surya Dev', dev: 'सूर्य', icon: 'ॐ', color: '#d4a017' },
    { id: 'tulsi', name: 'Goddess Tulsi', dev: 'तुलसी', icon: 'ॐ', color: '#2e8b57' }
  ];

  global.NAAM_JAP_STOTRAS = STOTRAS;
  global.NAAM_JAP_DEITIES = DEITIES;

})(typeof window !== 'undefined' ? window : this);
